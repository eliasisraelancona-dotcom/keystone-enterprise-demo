import { config } from '@keystone-6/core'
import { statelessSessions } from '@keystone-6/core/session'
import { createAuth } from '@keystone-6/auth'
import { lists } from './schema-simple'
// import { components } from './admin/config' // Temporarily disabled due to React import issues
import type { TypeInfo } from '.keystone/types'

// WARNING: this example is for demonstration purposes only
//   as with each of our examples, it has not been vetted
//   or tested for any particular usage

// WARNING: you need to change this
const sessionSecret = '-- DEV COOKIE SECRET; CHANGE ME --'

// statelessSessions uses cookies for session tracking
//   these cookies have an expiry, in seconds
//   we use an expiry of one hour for this example
const sessionMaxAge = 60 * 60

// withAuth is a function we can use to wrap our base configuration
const { withAuth } = createAuth({
  // this is the list that contains our users
  listKey: 'User',

  // an identity field, typically a username or an email address
  identityField: 'name',

  // a secret field must be a password field type
  secretField: 'password',

  // Note: We've replaced initFirstItem with automatic seeding below
  // This ensures "Elias Israel" is always available as the admin user

  // include role data in the session
  sessionData: `
    name
    role {
      id
      name
      canCreateUsers
      canReadUsers
      canUpdateUsers
      canDeleteUsers
      canManageRoles
      canAccessAdminUI
    }`,
})

// Function to log audit events
export async function logAuditEvent(context: any, userId: string, action: string, req?: any) {
  try {
    await context.sudo().query.AuditLog.createOne({
      data: {
        user: { connect: { id: userId } },
        action,
        ipAddress: req?.ip || req?.connection?.remoteAddress || 'unknown',
        userAgent: req?.get?.('User-Agent') || 'unknown',
        sessionId: userId + '_' + Date.now(),
      },
    })
    console.log(`🔍 Audit: User action logged - ${action}`)
  } catch (error) {
    console.error('Failed to log audit entry:', error)
  }
}

// Seed the database with admin user and role using Keystone context (proper password hashing)
async function seedDatabase(context: any) {
  console.log('🌱 Seeding database...')
  
  // Use sudo context to bypass access controls for seeding
  const sudo = context.sudo()
  
  // Check if Super Admin role exists
  const superAdminRole = await sudo.query.Role.findMany({
    where: { name: { equals: 'Super Admin' } },
  })

  let roleId: string
  
  if (superAdminRole.length === 0) {
    // Create Super Admin role
    const newRole = await sudo.query.Role.createOne({
      data: {
        name: 'Super Admin',
        canCreateUsers: true,
        canReadUsers: true,
        canUpdateUsers: true,
        canDeleteUsers: true,
        canManageRoles: true,
        canAccessAdminUI: true,
      },
    })
    roleId = newRole.id
    console.log('✅ Created Super Admin role')
  } else {
    roleId = superAdminRole[0].id
    console.log('✅ Super Admin role already exists')
  }

  // Check if admin user exists
  const adminUser = await sudo.query.User.findMany({
    where: { name: { equals: 'eliasisrael' } },
  })

  if (adminUser.length === 0) {
    // Create admin user using Keystone's API (this will properly hash the password)
    // EXPLICITLY connect to Super Admin role
    await sudo.query.User.createOne({
      data: {
        name: 'eliasisrael',
        password: '12345678', // 8 characters minimum required - This will be hashed automatically by Keystone's password field
        role: { connect: { id: roleId } }, // roleId = Super Admin role ID
      },
    })
    console.log(`✅ Created admin user: eliasisrael (password: 12345678) with Super Admin role ID: ${roleId}`)
  } else {
    console.log('✅ Admin user eliasisrael already exists')
  }

  // Create Regular User role
  const regularRole = await sudo.query.Role.findMany({
    where: { name: { equals: 'Regular User' } },
  })

  let regularRoleId: string
  
  if (regularRole.length === 0) {
    const newRegularRole = await sudo.query.Role.createOne({
      data: {
        name: 'Regular User',
        canCreateUsers: false,
        canReadUsers: false,
        canUpdateUsers: false,
        canDeleteUsers: false,
        canManageRoles: false,
        canAccessAdminUI: true, // They can access admin UI but with limited permissions
      },
    })
    regularRoleId = newRegularRole.id
    console.log('✅ Created Regular User role')
  } else {
    regularRoleId = regularRole[0].id
    console.log('✅ Regular User role already exists')
  }

  // Create sample users with regular user role for demo
  const regularUsers = [
    { name: 'Alice Johnson', role: regularRoleId },
    { name: 'Bob Smith', role: regularRoleId },
    { name: 'Carol Davis', role: regularRoleId }
  ]
  
  for (const userInfo of regularUsers) {
    const existingUser = await sudo.query.User.findMany({
      where: { name: { equals: userInfo.name } },
    })
    
    if (existingUser.length === 0) {
      await sudo.query.User.createOne({
        data: {
          name: userInfo.name,
          password: 'user12345', // 9 characters - Default password for demo users (will be hashed)
          role: { connect: { id: userInfo.role } }, // userInfo.role = Regular User role ID
        },
      })
      console.log(`✅ Created demo user: ${userInfo.name} (password: user12345) with Regular User role ID: ${userInfo.role}`)
    }
  }

  // Create sample todos for demonstration
  const sampleTodos = [
    { title: 'Complete Adobe integration project', description: 'Integrate Adobe Creative Cloud APIs with the enterprise platform', assignedTo: 'Alice Johnson', status: 'in_progress', priority: 'high' },
    { title: 'Review Cursor AI implementation', description: 'Test and validate the new AI-powered code completion features', assignedTo: 'Bob Smith', status: 'todo', priority: 'medium' },
    { title: 'Update security protocols', description: 'Review and update security measures for enterprise deployment', assignedTo: 'Carol Davis', status: 'completed', priority: 'critical' },
    { title: 'Setup user onboarding flow', description: 'Create streamlined onboarding process for new enterprise users', assignedTo: 'eliasisrael', status: 'in_progress', priority: 'high' },
  ]

  for (const todoData of sampleTodos) {
    const existingTodo = await sudo.query.Todo.findMany({
      where: { title: { equals: todoData.title } },
    })
    
    if (existingTodo.length === 0) {
      // Find the user to assign to
      const assignedUser = await sudo.query.User.findMany({
        where: { name: { equals: todoData.assignedTo } },
      })
      
      if (assignedUser.length > 0) {
        await sudo.query.Todo.createOne({
          data: {
            title: todoData.title,
            description: todoData.description,
            status: todoData.status,
            priority: todoData.priority,
            assignedTo: { connect: { id: assignedUser[0].id } },
          },
        })
        console.log(`✅ Created sample todo: "${todoData.title}" for ${todoData.assignedTo}`)
      }
    }
  }

  // Create sample audit log entries
  console.log('📊 Creating sample audit logs...')
  try {
    // Create some sample login entries for demo purposes
    const auditLogEntries = [
      {
        user: { connect: { id: adminUser.id } },
        action: 'LOGIN',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        sessionId: `${adminUser.id}_${Date.now() - 3600000}`, // 1 hour ago
      },
      {
        user: { connect: { id: adminUser.id } },
        action: 'SYSTEM_SETUP',
        ipAddress: '192.168.1.100',
        userAgent: 'Keystone Admin',
        sessionId: `${adminUser.id}_${Date.now()}`,
      }
    ]

    // Add login entries for demo users if they exist
    const aliceUser = await sudo.query.User.findMany({
      where: { name: { equals: 'Alice Johnson' } },
    })
    if (aliceUser.length > 0) {
      auditLogEntries.push({
        user: { connect: { id: aliceUser[0].id } },
        action: 'LOGIN',
        ipAddress: '192.168.1.101',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        sessionId: `${aliceUser[0].id}_${Date.now() - 1800000}`, // 30 min ago
      })
    }

    const bobUser = await sudo.query.User.findMany({
      where: { name: { equals: 'Bob Smith' } },
    })
    if (bobUser.length > 0) {
      auditLogEntries.push({
        user: { connect: { id: bobUser[0].id } },
        action: 'LOGIN',
        ipAddress: '192.168.1.102',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
        sessionId: `${bobUser[0].id}_${Date.now() - 900000}`, // 15 min ago
      })
    }

    for (const logEntry of auditLogEntries) {
      await sudo.query.AuditLog.createOne({
        data: logEntry,
      })
    }

    console.log('✅ Created sample audit log entries')
  } catch (error) {
    console.log('ℹ️  Audit logs already exist or failed to create')
  }

  // Create Enterprise Features showcase entries
  console.log('🚀 Creating Enterprise 101: Cursor Features showcase...')
  try {
    const enterpriseFeatures = [
      {
        title: 'Role-Based Access Control (RBAC) Implementation',
        category: 'security',
        description: 'Built comprehensive RBAC system with Super Admin and Regular User roles, granular permissions for CRUD operations, and dynamic UI access control.',
        technicalDetails: 'Created Role and User models with relationship mapping, implemented permission functions (canCreateUsers, canReadUsers, etc.), and applied access controls across all lists and operations.',
        businessValue: 'Enables secure enterprise-grade access management, allows administrators to control user permissions precisely, and ensures data security compliance.',
        cursorFeatures: 'Cursor\'s inline code suggestions streamlined permission function creation. File-aware refactoring helped apply access controls across multiple files safely.',
        status: 'implemented',
        impact: 'high',
        teamFeedback: 'Roger: "Refactoring is SO much better" — Cursor handles cross-file changes perfectly for complex permission systems.',
      },
      {
        title: 'Enterprise Todo Management with User Assignment',
        category: 'enterprise',
        description: 'Developed task management system where Super Admin sees all todos while regular users only see their assigned tasks. Auto-assignment of todos to current user.',
        technicalDetails: 'Implemented Todo model with assignedTo relationship, canReadTodosFilter for row-level security, resolveInput hooks for auto-assignment, and priority/status tracking.',
        businessValue: 'Provides enterprise-level task visibility and management. Enables team coordination while maintaining user privacy and appropriate access levels.',
        cursorFeatures: 'Used Cursor\'s chat functionality to understand complex filtering requirements. Terminal integration helped debug GraphQL queries in real-time.',
        status: 'implemented',
        impact: 'high',
        teamFeedback: 'Carlos: "Cursor is amazing at reading weird internal tools" — perfect for understanding KeystoneJS\'s unique patterns.',
      },
      {
        title: 'Persistent Admin User with Database Seeding',
        category: 'architecture',
        description: 'Automated creation of admin user "eliasisrael" that persists across database resets. Includes sample users and data for comprehensive testing.',
        technicalDetails: 'Built seedDatabase function using context.sudo() to bypass access controls, proper password hashing with Keystone auth, and idempotent seeding logic.',
        businessValue: 'Eliminates manual setup steps, ensures consistent demo environment, and provides reliable admin access for enterprise demonstrations.',
        cursorFeatures: 'Cursor\'s Ask Anything helped debug authentication hooks and password validation. Inline suggestions caught edge cases in seeding logic.',
        status: 'implemented',
        impact: 'medium',
        teamFeedback: 'Team feedback: "The only thing that matters is how good your prompts are" — Cursor responds perfectly to specific technical queries.',
      },
      {
        title: 'Real-Time Audit Logging System',
        category: 'enterprise',
        description: 'Comprehensive audit trail tracking user logins, IP addresses, user agents, and session data. Super Admin exclusive access with read-only interface.',
        technicalDetails: 'Created AuditLog model with user relationships, automatic timestamping, IP/browser detection, and access-controlled UI with hidden create buttons.',
        businessValue: 'Provides enterprise compliance capabilities, security monitoring, and user activity tracking required for audit trails and security investigations.',
        cursorFeatures: 'File-aware refactoring enabled safe schema changes across multiple files. Test generation would help validate audit log capture.',
        status: 'implemented',
        impact: 'high',
        teamFeedback: 'Perfect example of staying in flow — no context switching between security requirements and implementation.',
      },
      {
        title: 'Custom Adobe/Cursor Enterprise Branding',
        category: 'ui_ux',
        description: 'Customized admin interface with Adobe and Cursor logos, enterprise title, and branded user experience while maintaining core functionality.',
        technicalDetails: 'Attempted custom React components for Logo and Navigation overrides, worked around monorepo React/JSX import challenges with creative solutions.',
        businessValue: 'Provides professional enterprise appearance, reinforces brand identity, and creates polished demo environment for stakeholder presentations.',
        cursorFeatures: 'Cursor\'s React expertise helped navigate complex JSX runtime issues in monorepo setup. Multiple solution approaches suggested.',
        status: 'in_progress',
        impact: 'medium',
        teamFeedback: 'Roger: "PMs and designers can prototype without full-stack support" — Cursor enables rapid UI iteration.',
      },
      {
        title: 'Terminal Integration & Development Workflow',
        category: 'productivity',
        description: 'Seamless server management, debugging, and deployment through integrated terminal commands. Real-time error diagnosis and resolution.',
        technicalDetails: 'Used terminal integration for npm scripts, server lifecycle management, port checking, process management, and live debugging of Keystone development server.',
        businessValue: 'Accelerated development velocity, reduced debugging time, and enabled rapid iteration cycles essential for enterprise development timelines.',
        cursorFeatures: 'Terminal + Git integration provided seamless development flow. Real-time command suggestions and error interpretation.',
        status: 'implemented',
        impact: 'high',
        teamFeedback: 'Staying in flow with no context switching — exactly what enterprise development teams need for productivity.',
      },
      {
        title: 'Cross-File Refactoring & Code Architecture',
        category: 'development',
        description: 'Safe refactoring across schema.ts, keystone.ts, and admin components. Complex interdependencies managed without breaking changes.',
        technicalDetails: 'Coordinated changes across multiple TypeScript files, maintained type safety, and ensured consistent imports/exports throughout the codebase.',
        businessValue: 'Enables confident code evolution, reduces technical debt, and supports maintainable enterprise codebases that scale with business needs.',
        cursorFeatures: 'File-aware refactoring as core capability. Multi-file safe edits prevented breaking changes during complex architecture updates.',
        status: 'implemented',
        impact: 'high',
        teamFeedback: 'Roger: "Refactoring is SO much better" — Cursor\'s cross-file awareness is game-changing for enterprise codebases.',
      }
    ]

    for (const featureData of enterpriseFeatures) {
      const existingFeature = await sudo.query.EnterpriseFeature.findMany({
        where: { title: { equals: featureData.title } },
      })
      
      if (existingFeature.length === 0) {
        await sudo.query.EnterpriseFeature.createOne({
          data: featureData,
        })
        console.log(`✅ Created enterprise feature: "${featureData.title}"`)
      }
    }

    console.log('✅ Created Enterprise Features showcase')
  } catch (error) {
    console.log('ℹ️  Enterprise features already exist or failed to create')
  }

  // Create Login Banner content
  console.log('📢 Creating Login Banner content...')
  try {
    const loginBannerContent = {
      title: 'Elias Israel - Adobe Technical Account Manager Introduction',
      content: `👋 Welcome to the Cursor Enterprise Demo!

I'm Elias Israel, Adobe's Technical Account Manager here at Cursor. With over 4 years at Stripe supporting engineering teams, I've seen how AI coding tools can transform complex, high-stakes development environments.

🎯 **Today's Focus**: Real workflows, real developer pain points, real solutions.

**What Makes Cursor Different:**
• Lives directly inside VSCode - no disruption to your workflow
• Full control over when and how you use it
• Amplifies productivity without replacing engineers
• Focus on engineering problems that actually matter

**From Real Users:**
Roger: "Test generation feels like magic - refactoring is SO much better"
Carlos: "Amazing at reading weird internal tools and legacy architecture"

Let's explore how Cursor solves the workflows you face every day. 🚀`,
      isActive: true,
      displayOrder: 1,
      backgroundColor: '#f8fafc',
      textColor: '#1f2937',
    }

    const existingBanner = await sudo.query.LoginBanner.findMany({
      where: { title: { equals: loginBannerContent.title } },
    })
    
    if (existingBanner.length === 0) {
      await sudo.query.LoginBanner.createOne({
        data: loginBannerContent,
      })
      console.log('✅ Created login banner with introduction')
    } else {
      console.log('✅ Login banner already exists')
    }
  } catch (error) {
    console.log('ℹ️  Login banner already exists or failed to create')
  }

  console.log('🎉 Database seeding completed!')
}

export default withAuth<TypeInfo>(
  config<TypeInfo>({
    db: {
      provider: 'sqlite',
      url: process.env.DATABASE_URL ?? 'file:./keystone-example.db',

      // WARNING: this is only needed for our monorepo examples, dont do this
      prismaClientPath: 'node_modules/myprisma',
      
      // Seed the database on connect
      onConnect: seedDatabase,
    },
    lists,
    ui: {
      // Only users with admin UI access can view the AdminUI
      isAccessAllowed: context => {
        return Boolean(context.session?.data?.role?.canAccessAdminUI)
      },
      // components, // Temporarily disabled
    },
    // you can find out more at https://keystonejs.com/docs/apis/session#session-api
    session: statelessSessions({
      // the maxAge option controls how long session cookies are valid for before they expire
      maxAge: sessionMaxAge,
      // the session secret is used to encrypt cookie data
      secret: sessionSecret,
    }),
  })
)
