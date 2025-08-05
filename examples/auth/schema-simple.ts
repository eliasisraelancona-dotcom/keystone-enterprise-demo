import { list } from '@keystone-6/core'
// import { denyAll } from '@keystone-6/core/access' // Not used
import {
  text,
  password,
  relationship,
  checkbox,
  timestamp,
  select,
} from '@keystone-6/core/fields'
import type { Lists } from '.keystone/types'

// Basic permission functions
function hasSession({ session }: { session?: any }) {
  return Boolean(session)
}

function canCreateUsers({ session }: { session?: any }) {
  return Boolean(session?.data.role?.canCreateUsers)
}

function canReadUsers({ session }: { session?: any }) {
  return Boolean(session?.data.role?.canReadUsers)
}

// function canUpdateUsers({ session }: { session?: any }) {
//   return Boolean(session?.data.role?.canUpdateUsers)
// }

function canDeleteUsers({ session }: { session?: any }) {
  return Boolean(session?.data.role?.canDeleteUsers)
}

function canManageRoles({ session }: { session?: any }) {
  return Boolean(session?.data.role?.canManageRoles)
}

// function canAccessAdminUI({ session }: { session?: any }) {
//   return Boolean(session?.data.role?.canAccessAdminUI)
// }

// Todo permission functions
function canCreateTodos({ session }: { session?: any }) {
  return Boolean(session?.data.role?.canCreateUsers || session?.data.role?.canAccessAdminUI)
}

function canReadTodos({ session }: { session?: any }) {
  return Boolean(session?.data.role?.canReadUsers || session?.data.role?.canAccessAdminUI)
}

function canUpdateTodos({ session }: { session?: any }) {
  return Boolean(session?.data.role?.canUpdateUsers || session?.data.role?.canAccessAdminUI)
}

function canDeleteTodos({ session }: { session?: any }) {
  return Boolean(session?.data.role?.canDeleteUsers || session?.data.role?.canAccessAdminUI)
}

function canReadTodosFilter({ session }: { session?: any }) {
  if (!session) return false
  
  // Super Admin can see all todos
  if (session.data.role?.canManageRoles) return {}
  
  // Regular users can only see their own todos
  return {
    assignedTo: {
      id: { equals: session.itemId },
    },
  }
}

function canReadUsersOrSameUserFilter({ session }: { session?: any }) {
  // you need to have a session to do this
  if (!session) return false

  // users with read permission can see everything
  if (session.data.role?.canReadUsers) return {}

  // only yourself
  return {
    id: {
      equals: session.itemId,
    },
  }
}

export const lists = {
  User: list({
    access: {
      operation: {
        create: canCreateUsers,
        query: canReadUsers,
        update: hasSession,
        delete: canDeleteUsers,
      },
      filter: {
        update: canReadUsersOrSameUserFilter,
      },
      item: {
        update: ({ session, item }) => {
          // you need to have a session to do this
          if (!session) return false

          // users with update permission can do anything
          if (session.data.role?.canUpdateUsers) return true

          // no item? then no
          if (!item) return false

          // the authenticated user can update themselves
          return session.itemId === item.id
        },
      },
    },
    ui: {
      listView: {
        initialColumns: ['name', 'role'],
      },
      // isHidden: ({ session }) => !session?.data.role?.canReadUsers, // Hide from non-Super Admins - Not supported in current Keystone version
    },
    fields: {
      name: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        ui: {
          description: 'The name of the person using the system',
        },
      }),
      password: password({
        validation: { isRequired: true },
        ui: {
          description: 'Password for signing in (minimum 8 characters)',
        },
      }),
      role: relationship({
        ref: 'Role.users',
        ui: {
          displayMode: 'select',
          // cardFields: ['name'], // Not supported in current version
          // inlineConnect: true, // Not supported in current version
        },
      }),
    },
  }),

  Role: list({
    access: {
      operation: {
        create: canManageRoles,
        query: canManageRoles,
        update: canManageRoles,
        delete: canManageRoles,
      },
    },
    ui: {
      listView: {
        initialColumns: ['name', 'canCreateUsers', 'canManageRoles'],
      },
      // isHidden: ({ session }) => !session?.data.role?.canManageRoles, // Hide from non-Super Admins - Not supported in current Keystone version
    },
    fields: {
      name: text({ validation: { isRequired: true } }),
      canCreateUsers: checkbox({ defaultValue: false }),
      canReadUsers: checkbox({ defaultValue: false }),
      canUpdateUsers: checkbox({ defaultValue: false }),
      canDeleteUsers: checkbox({ defaultValue: false }),
      canManageRoles: checkbox({ defaultValue: false }),
      canAccessAdminUI: checkbox({ defaultValue: false }),
      users: relationship({
        ref: 'User.role',
        many: true,
        ui: {
          displayMode: 'select',
          // cardFields: ['name'], // Not supported in current version
          // inlineConnect: true, // Not supported in current version
        },
      }),
    },
  }),

  Todo: list({
    access: {
      operation: {
        create: canCreateTodos,
        query: canReadTodos,
        update: canUpdateTodos,
        delete: canDeleteTodos,
      },
      filter: {
        query: canReadTodosFilter,
        update: canReadTodosFilter,
        delete: canReadTodosFilter,
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
        ui: { description: 'Brief description of the task' }
      }),
      description: text({ 
        ui: { 
          displayMode: 'textarea',
          description: 'Detailed description of what needs to be done'
        } 
      }),
      status: select({
        options: [
          { label: 'To Do', value: 'todo' },
          { label: 'In Progress', value: 'in_progress' },
          { label: 'Completed', value: 'completed' },
          { label: 'Blocked', value: 'blocked' },
        ],
        defaultValue: 'todo',
        ui: { displayMode: 'segmented-control' },
      }),
      priority: select({
        options: [
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
          { label: 'Critical', value: 'critical' },
        ],
        defaultValue: 'medium',
        ui: { displayMode: 'segmented-control' },
      }),
      assignedTo: relationship({
        ref: 'User',
        ui: {
          displayMode: 'select',
          // cardFields: ['name'], // Not supported in current version
          // inlineConnect: true, // Not supported in current version
          // Completely hide this field from regular users - they don't need to see it
          // isHidden: ({ session }) => !session?.data?.role?.canManageRoles, // Not supported in current Keystone version
        },
        hooks: {
          resolveInput: ({ operation, resolvedData, context }) => {
            // Auto-assign new todos to the current user if no assignee is specified
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
} satisfies Lists