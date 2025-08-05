import { config } from '@keystone-6/core'
import { statelessSessions } from '@keystone-6/core/session'
import { createAuth } from '@keystone-6/auth'
import { type Session, lists } from './schema-simple'
import type { TypeInfo } from '.keystone/types'
// import { components } from './admin/config' // Temporarily disabled due to React import issues

// WARNING: this example is for demonstration purposes only
//   as with each of our examples, it has not been vetted
//   and should not be used in a production system.

let sessionSecret = process.env.SESSION_SECRET

if (!sessionSecret) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'The SESSION_SECRET environment variable must be set in production'
    )
  } else {
    sessionSecret = 'development-only-session-secret-change-this-in-production'
  }
}

let sessionMaxAge = 60 * 60 * 24 * 30 // 30 days

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'name',
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
  secretField: 'password',
})

// Database seeding function
async function seedDatabase(context: any) {
  const sudo = context.sudo()
  
  console.log('🌱 Seeding database...')

  // Create Super Admin role
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
    await sudo.query.User.createOne({
      data: {
        name: 'eliasisrael',
        password: '12345678', // 8 characters minimum required
        role: { connect: { id: roleId } },
      },
    })
    console.log('✅ Created admin user: eliasisrael (password: 12345678)')
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
    { name: 'Jaime Israel', role: regularRoleId }, // ← NEW USER
    { name: 'Jose Gonzalez', role: regularRoleId },
  ]
  
  for (const userInfo of regularUsers) {
    const existingUser = await sudo.query.User.findMany({
      where: { name: { equals: userInfo.name } },
    })
    
    if (existingUser.length === 0) {
      await sudo.query.User.createOne({
        data: {
          name: userInfo.name,
          password: 'user12345', // 9 characters - Default password for demo users
          role: { connect: { id: userInfo.role } },
        },
      })
      console.log(`✅ Created demo user: ${userInfo.name} (password: user12345)`)
    }
  }

  // Create sample todos for demonstration
  const aliceUser = await sudo.query.User.findMany({
    where: { name: { equals: 'Alice Johnson' } },
  })
  const bobUser = await sudo.query.User.findMany({
    where: { name: { equals: 'Bob Smith' } },
  })
  
  // Get the newly created users for todo assignment
  const jaimeUser = await sudo.query.User.findMany({
    where: { name: { equals: 'Jaime Israel' } },
  })
  const joseUser = await sudo.query.User.findMany({
    where: { name: { equals: 'Jose Gonzalez' } },
  })
  
  const sampleTodos = [
    { title: 'Complete Adobe integration project', description: 'Finalize API integration with Adobe services', assignedTo: aliceUser[0]?.id, status: 'in_progress', priority: 'high' },
    { title: 'Review Cursor AI implementation', description: 'Test and optimize AI features for enterprise use', assignedTo: bobUser[0]?.id, status: 'todo', priority: 'medium' },
    { title: 'Setup user onboarding flow', description: 'Create comprehensive onboarding experience', assignedTo: jaimeUser[0]?.id, status: 'completed', priority: 'medium' },
    { title: 'Test enterprise authentication', description: 'Verify RBAC and security features', assignedTo: joseUser[0]?.id, status: 'todo', priority: 'low' },
  ]
  
  for (const todoInfo of sampleTodos) {
    if (todoInfo.assignedTo) {
      const existingTodo = await sudo.query.Todo.findMany({
        where: { title: { equals: todoInfo.title } },
      })
      
      if (existingTodo.length === 0) {
        await sudo.query.Todo.createOne({
          data: {
            title: todoInfo.title,
            description: todoInfo.description,
            status: todoInfo.status,
            priority: todoInfo.priority,
            assignedTo: { connect: { id: todoInfo.assignedTo } },
          },
        })
        console.log(`✅ Created sample todo: "${todoInfo.title}"`)
      }
    }
  }

  console.log('🎉 Database seeding completed!')
}

export default withAuth(
  config<TypeInfo>({
    db: {
      // you can choose to use sqlite, mysql or postgresql
      provider: 'sqlite',
      url: 'file:./keystone-example.db',
      
      // Seed the database on connect
      onConnect: seedDatabase,
    },
    lists,
    ui: {
      // Only users with admin UI access can view the AdminUI
      isAccessAllowed: context => {
        return Boolean(context.session?.data?.role?.canAccessAdminUI)
      },
      // components, // Temporarily disabled due to React import issues
    },
    // you can find out more at https://keystonejs.com/docs/apis/session#session-api
    session: statelessSessions({
      // the maxAge option controls how long session cookies are valid for before they expire
      maxAge: sessionMaxAge,
      // the secret is used to encrypt cookie data (should be an environment variable)
      secret: sessionSecret!,
    }),
  })
)