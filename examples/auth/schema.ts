import { list } from '@keystone-6/core'
// import { denyAll } from '@keystone-6/core/access' // Not used
import { text, checkbox, relationship, timestamp, select, integer } from '@keystone-6/core/fields'
import type { Lists } from '.keystone/types'

// WARNING: this example is for demonstration purposes only
//   as with each of our examples, it has not been vetted
//   or tested for any particular usage

export type Session = {
  itemId: string
  data: {
    name: string
    role?: {
      id: string
      name: string
      canCreateUsers: boolean
      canReadUsers: boolean
      canUpdateUsers: boolean
      canDeleteUsers: boolean
      canManageRoles: boolean
      canAccessAdminUI: boolean
    }
  }
}

function hasSession({ session }: { session?: Session }) {
  return Boolean(session)
}

// Permission check functions
// Commented out unused functions - can be restored if needed
// function canCreateUsers({ session }: { session?: Session }) {
//   return Boolean(session?.data.role?.canCreateUsers)
// }

// function canReadUsers({ session }: { session?: Session }) {
//   return Boolean(session?.data.role?.canReadUsers)
// }

// function canUpdateUsers({ session }: { session?: Session }) {
//   return Boolean(session?.data.role?.canUpdateUsers)
// }

// function canDeleteUsers({ session }: { session?: Session }) {
//   return Boolean(session?.data.role?.canDeleteUsers)
// }

function canManageRoles({ session }: { session?: Session }) {
  return Boolean(session?.data.role?.canManageRoles)
}

function canAccessAdminUI({ session }: { session?: Session }) {
  return Boolean(session?.data.role?.canAccessAdminUI)
}

// function canUpdateUsersOrSameUser({ session, item }: { session?: Session; item: Lists.User.Item | null }) {
//   // you need to have a session to do this
//   if (!session) return false

//   // users with update permission can do anything
//   if (session.data.role?.canUpdateUsers) return true

//   // no item? then no
//   if (!item) return false

//   // the authenticated user can update themselves
//   return session.itemId === item.id
// }

// function canReadUsersOrSameUserFilter({ session }: { session?: Session }) {
//   // you need to have a session to do this
//   if (!session) return false

//   // users with read permission can see everything
//   if (session.data.role?.canReadUsers) return {}

//   // only yourself
//   return {
//     id: {
//       equals: session.itemId,
//     },
//   }
// }

// Todo permission functions
function canCreateTodos({ session }: { session?: Session }) {
  return Boolean(session) // Any authenticated user can create todos
}

function canReadTodos({ session }: { session?: Session }) {
  return Boolean(session) // Any authenticated user can read todos (filtered by ownership)
}

function canUpdateTodos({ session, item }: { session?: Session; item: Lists.Todo.Item | null }) {
  if (!session) return false
  if (!item) return false
  
  // Super Admin can update any todo
  if (session.data.role?.canReadUsers) return true
  
  // Users can only update their own todos
  return session.itemId === item.assignedToId
}

function canDeleteTodos({ session, item }: { session?: Session; item: Lists.Todo.Item | null }) {
  if (!session) return false
  if (!item) return false
  
  // Super Admin can delete any todo
  if (session.data.role?.canDeleteUsers) return true
  
  // Users can only delete their own todos
  return session.itemId === item.assignedToId
}

function canReadTodosFilter({ session }: { session?: Session }) {
  if (!session) return false
  
  // Super Admin can see all todos
  if (session.data.role?.canReadUsers) return {}
  
  // Regular users can only see their own todos
  return {
    assignedTo: {
      id: {
        equals: session.itemId,
      },
    },
  }
}

// Audit Log access functions (Super Admin only)
function canCreateAuditLogs({ session }: { session?: Session }) {
  return Boolean(session?.data.role?.canManageRoles) // Super Admin only
}

function canReadAuditLogs({ session }: { session?: Session }) {
  const canRead = Boolean(session?.data.role?.canManageRoles) // Super Admin only
  console.log(`🔍 canReadAuditLogs: user=${session?.data?.name}, canManageRoles=${session?.data?.role?.canManageRoles}, result=${canRead}`)
  return canRead
}

function canUpdateAuditLogs({ session }: { session?: Session }) {
  return false // Audit logs should never be updated
}

function canDeleteAuditLogs({ session }: { session?: Session }) {
  return Boolean(session?.data.role?.canManageRoles) // Super Admin only for cleanup
}

// Enterprise Features access functions (Super Admin only)
function canCreateEnterpriseFeatures({ session }: { session?: Session }) {
  return Boolean(session?.data.role?.canManageRoles) // Super Admin only
}

function canReadEnterpriseFeatures({ session }: { session?: Session }) {
  return Boolean(session?.data.role?.canAccessAdminUI) // All users can read features
}

function canUpdateEnterpriseFeatures({ session }: { session?: Session }) {
  return Boolean(session?.data.role?.canManageRoles) // Super Admin only
}

function canDeleteEnterpriseFeatures({ session }: { session?: Session }) {
  return Boolean(session?.data.role?.canManageRoles) // Super Admin only
}

// Login Banner access functions
function canCreateLoginBanner({ session }: { session?: Session }) {
  return Boolean(session?.data.role?.canManageRoles) // Super Admin only
}

function canReadLoginBanner({ session }: { session?: Session }) {
  const canRead = Boolean(session?.data.role?.canManageRoles) // Super Admin only
  console.log(`🔍 canReadLoginBanner: user=${session?.data?.name}, canManageRoles=${session?.data?.role?.canManageRoles}, result=${canRead}`)
  return canRead
}

function canUpdateLoginBanner({ session }: { session?: Session }) {
  return Boolean(session?.data.role?.canManageRoles) // Super Admin only
}

function canDeleteLoginBanner({ session }: { session?: Session }) {
  return Boolean(session?.data.role?.canManageRoles) // Super Admin only
}

export const lists = {
  User: list({
    access: {
      operation: {
        create: canCreateLoginBanner,
        query: canReadLoginBanner,
        update: canUpdateLoginBanner,
        delete: canDeleteLoginBanner,
      },
    },
    ui: {
      label: 'Login Page Banner',
      // description: 'Customizable banner content for the login page', // Not supported in UI config
      // isHidden: ({ session }: { session?: any }) => { // Not supported in current version
      //   const canManage = session?.data?.role?.canManageRoles
      //   const shouldHide = !canManage
      //   console.log(`🔍 LoginBanner isHidden: user=${session?.data?.name}, canManageRoles=${canManage}, hiding=${shouldHide}`)
      //   return shouldHide
      // }, // Hide from non-Super Admins
      listView: {
                initialColumns: ['name'],
        // defaultFieldMode: ({ session }: { session?: any }) =>
        //   session?.data.role?.canManageRoles ? 'edit' : 'read',
      },
    },
    fields: {
      title: text({
        validation: { isRequired: true },
        ui: {
          description: 'Banner title or identifier',
        },
      }),
      
      content: text({
        validation: { isRequired: true },
        ui: {
          displayMode: 'textarea',
          description: 'Main banner content (supports basic HTML)',
        },
      }),
      
      isActive: checkbox({
        defaultValue: true,
        ui: {
          description: 'Show this banner on the login page',
        },
      }),
      
      displayOrder: integer({
        defaultValue: 1,
        ui: {
          description: 'Order in which banners appear (lower numbers first)',
        },
      }),
      
      backgroundColor: text({
        ui: {
          description: 'CSS background color (e.g., #f3f4f6, transparent)',
        },
      }),
      
      textColor: text({
        ui: {
          description: 'CSS text color (e.g., #1f2937, #ffffff)',
        },
      }),
      
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        },
      }),
      
      updatedAt: timestamp({
        db: { updatedAt: true },
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        },
      }),
    },
  }),

  EnterpriseFeature: list({
    access: {
      operation: {
        create: canCreateEnterpriseFeatures,
        query: canReadEnterpriseFeatures,
        update: canUpdateEnterpriseFeatures,
        delete: canDeleteEnterpriseFeatures,
      },
    },
    ui: {
      label: 'Enterprise 101: Cursor Features',
      // description: 'Showcase of enterprise development capabilities and team productivity gains', // Description not supported in UI config
      listView: {
        initialColumns: ['title', 'category', 'status', 'impact'],
        defaultFieldMode: 'read',
      },
      itemView: {
        defaultFieldMode: ({ session }) => 
          session?.data.role?.canManageRoles ? 'edit' : 'read',
      },
    },
    fields: {
      title: text({
        validation: { isRequired: true },
        ui: {
          description: 'Feature or accomplishment title',
        },
      }),
      
      category: select({
        options: [
          { label: '🎯 Core Development', value: 'development' },
          { label: '🛡️ Security & Access', value: 'security' },
          { label: '📊 Enterprise Features', value: 'enterprise' },
          { label: '⚡ Productivity Gains', value: 'productivity' },
          { label: '🎨 UI/UX Enhancements', value: 'ui_ux' },
          { label: '🔧 System Architecture', value: 'architecture' },
        ],
        defaultValue: 'development',
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      
      description: text({
        ui: {
          displayMode: 'textarea',
          description: 'Detailed description of the feature or what was accomplished',
        },
      }),
      
      technicalDetails: text({
        ui: {
          displayMode: 'textarea',
          description: 'Technical implementation details and code changes',
        },
      }),
      
      businessValue: text({
        ui: {
          displayMode: 'textarea',
          description: 'Business impact and value delivered',
        },
      }),
      
      cursorFeatures: text({
        ui: {
          displayMode: 'textarea',
          description: 'Specific Cursor AI features that enabled this work',
        },
      }),
      
      status: select({
        options: [
          { label: '✅ Implemented', value: 'implemented' },
          { label: '🚧 In Progress', value: 'in_progress' },
          { label: '📋 Planned', value: 'planned' },
          { label: '💡 Concept', value: 'concept' },
        ],
        defaultValue: 'implemented',
        ui: {
          displayMode: 'select',
        },
      }),
      
      impact: select({
        options: [
          { label: '🔥 High Impact', value: 'high' },
          { label: '📈 Medium Impact', value: 'medium' },
          { label: '📊 Low Impact', value: 'low' },
        ],
        defaultValue: 'medium',
        ui: {
          displayMode: 'select',
        },
      }),
      
      teamFeedback: text({
        ui: {
          displayMode: 'textarea',
          description: 'Quotes and feedback from team members (Roger, Carlos, etc.)',
        },
      }),
      
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        },
      }),
      
      updatedAt: timestamp({
        db: { updatedAt: true },
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        },
      }),
    },
  }),

  Role: list({
    access: {
      operation: {
        create: canManageRoles,
        query: canAccessAdminUI,
        update: canManageRoles,
        delete: canManageRoles,
      },
    },
    ui: {
      listView: {
        initialColumns: ['name', 'canCreateUsers', 'canReadUsers', 'canUpdateUsers', 'canDeleteUsers'],
      },
    },
    fields: {
      name: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      canCreateUsers: checkbox({
        defaultValue: false,
        // label: 'Can Create Users', // Labels not supported in field config
      }),
      canReadUsers: checkbox({
        defaultValue: false,
        // label: 'Can Read Users', // Labels not supported in field config
      }),
      canUpdateUsers: checkbox({
        defaultValue: false,
        // label: 'Can Update Users', // Labels not supported in field config
      }),
      canDeleteUsers: checkbox({
        defaultValue: false,
        // label: 'Can Delete Users', // Labels not supported in field config
      }),
      canManageRoles: checkbox({
        defaultValue: false,
        // label: 'Can Manage Roles', // Labels not supported in field config
      }),
      canAccessAdminUI: checkbox({
        defaultValue: false,
        // label: 'Can Access Admin UI', // Labels not supported in field config
      }),
      users: relationship({
        ref: 'User.role',
        many: true,
        ui: {
          displayMode: 'select',
          itemView: { fieldMode: 'read' },
        },
      }),
    },
  }),



  Todo: list({
    access: {
      operation: {
        create: canCreateTodos,
        query: canReadTodos,
        update: hasSession,
        delete: hasSession,
      },
      filter: {
        query: canReadTodosFilter,
        update: canReadTodosFilter,
        delete: canReadTodosFilter,
      },
      item: {
        update: canUpdateTodos,
        delete: canDeleteTodos,
      },
    },
    ui: {
      listView: {
        initialColumns: ['title', 'status', 'priority', 'assignedTo', 'createdAt'],
      },
    },
    fields: {
      title: text({
        validation: { isRequired: true },
        // label: 'Task Title', // Labels not supported in field config
      }),
      
      description: text({
        ui: { displayMode: 'textarea' },
        // label: 'Description', // Labels not supported in field config
      }),
      
      status: select({
        options: [
          { label: 'To Do', value: 'todo' },
          { label: 'In Progress', value: 'in_progress' },
          { label: 'Completed', value: 'completed' },
          { label: 'Blocked', value: 'blocked' },
        ],
        defaultValue: 'todo',
        ui: {
          displayMode: 'segmented-control',
        },
      }),
      
      priority: select({
        options: [
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
          { label: 'Critical', value: 'critical' },
        ],
        defaultValue: 'medium',
        ui: {
          displayMode: 'select',
        },
      }),
      
      assignedTo: relationship({
        ref: 'User.todos',
        ui: {
          displayMode: 'select',
          labelField: 'name',
        },
        hooks: {
          resolveInput: ({ operation, resolvedData, context }) => {
            // Auto-assign to current user when creating a new todo
            if (operation === 'create' && !resolvedData.assignedTo && context.session?.itemId) {
              return { connect: { id: context.session.itemId } }
            }
            return resolvedData.assignedTo
          },
        },
      }),
      
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        },
      }),
      
      updatedAt: timestamp({
        db: { updatedAt: true },
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        },
      }),
    },
  }),
  
  AuditLog: list({
    access: {
      operation: {
        create: canCreateAuditLogs,
        query: canReadAuditLogs,
        update: canUpdateAuditLogs,
        delete: canDeleteAuditLogs,
      },
    },
    ui: {
      // isHidden: ({ session }: { session?: any }) => { // Not supported in current version
      //   const canManage = session?.data?.role?.canManageRoles
      //   const shouldHide = !canManage
      //   console.log(`🔍 AuditLog isHidden: user=${session?.data?.name}, canManageRoles=${canManage}, hiding=${shouldHide}`)
      //   return shouldHide
      // }, // Hide from non-Super Admins
      hideCreate: true, // Don't show manual create button - logs are auto-generated
      listView: {
        initialColumns: ['user', 'action', 'timestamp', 'ipAddress'],
        defaultFieldMode: 'read', // Make all fields read-only
      },
      itemView: {
        defaultFieldMode: 'read', // Make all fields read-only
      },
    },
    fields: {
      user: relationship({
        ref: 'User',
        ui: {
          displayMode: 'select',
          // cardFields: ['name'], // Not supported in current version
          // inlineConnect: false, // Not supported in current version
          // inlineCreate: { fields: [] }, // Not supported in current version
          // inlineEdit: { fields: [] }, // Not supported in current version
        },
      }),
      
      action: text({
        validation: { isRequired: true },
        ui: {
          description: 'The action performed (e.g., LOGIN, LOGOUT)',
        },
      }),
      
      timestamp: timestamp({
        defaultValue: { kind: 'now' },
        ui: {
          createView: { fieldMode: 'hidden' },
          itemView: { fieldMode: 'read' },
        },
      }),
      
      ipAddress: text({
        ui: {
          description: 'IP address of the user',
        },
      }),
      
      userAgent: text({
        ui: {
          description: 'Browser/device information',
          displayMode: 'textarea',
        },
      }),
      
      sessionId: text({
        ui: {
          description: 'Session identifier',
        },
      }),
    },
  }),
} satisfies Lists<Session>
