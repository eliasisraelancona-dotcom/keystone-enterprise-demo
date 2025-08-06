import { useEffect, createElement } from 'react'
import type { JSX } from 'react'

import { useQuery, useMutation, gql } from '@keystone-6/core/admin-ui/apollo'
import {
  DeveloperResourcesMenu,
  NavList,
  NavContainer,
  NavFooter,
  NavItem,
  getHrefFromList,
} from '@keystone-6/core/admin-ui/components'
import type { NavigationProps } from '@keystone-6/core/admin-ui/components'

export function CustomNavigation({ lists }: NavigationProps) {
  const { data } = useQuery<{
    authenticatedItem: null | {
      name: string
      role?: {
        name: string
      }
    }
  }>(gql`
    query KsAuthFetchSession {
      authenticatedItem {
        name
        role {
          name
        }
      }
    }
  `)

  const isSuperAdmin = data?.authenticatedItem?.role?.name === 'Super Admin'
  const isContractor = data?.authenticatedItem?.role?.name === 'Contractor'

  // Debug logging
  console.log('🔍 CustomNavigation Debug:', {
    user: data?.authenticatedItem?.name,
    role: data?.authenticatedItem?.role?.name,
    isSuperAdmin,
    isContractor
  })

  // For contractors: only show Introduction and Cursor 101
  // For Super Admin: show everything
  // For regular users: show lists but not special pages
  let navItems: JSX.Element[] = []

  if (isContractor) {
    // Contractors only see Introduction and Cursor 101
    navItems = [
      createElement(NavItem, { key: 'introduction', href: '/introduction', children: 'Introduction' }),
      createElement(NavItem, { key: 'cursor101', href: '/cursor101', children: 'Cursor 101' }),
    ]
  } else if (isSuperAdmin) {
    // Super Admin sees everything
    navItems = [
      createElement(NavItem, { key: 'introduction', href: '/introduction', children: 'Introduction' }),
      createElement(NavItem, { key: 'cursor101', href: '/cursor101', children: 'Cursor 101' }),
      createElement('hr', { key: 'divider', style: { margin: '8px 0', border: 'none', borderTop: '1px solid #e5e7eb' } }),
      ...lists.map(list => 
        createElement(NavItem, { key: list.key, href: getHrefFromList(list), children: list.label })
      )
    ]
  } else {
    // Regular users see only lists (no special pages)
    navItems = lists.map(list => 
      createElement(NavItem, { key: list.key, href: getHrefFromList(list), children: list.label })
    )
  }

  return createElement(NavContainer, null,
    createElement(NavList, null,
      createElement(NavItem, { href: '/', children: 'Dashboard' }),
      createElement('hr', { style: { margin: '8px 0', border: 'none', borderTop: '1px solid #e5e7eb' } }),
      ...navItems
    ),
    createElement(NavFooter, null,
      data?.authenticatedItem && createElement(SignoutButton, { 
        authItemLabel: data.authenticatedItem.name 
      }),
      createElement(DeveloperResourcesMenu, null)
    )
  )
}

const END_SESSION = gql`
  mutation KsAuthEndSession {
    endSession
  }
`

function SignoutButton({ authItemLabel }: { authItemLabel: string }) {
  const [endSession, { data }] = useMutation(END_SESSION)
  
  useEffect(() => {
    if (data?.endSession) {
      window.location.href = '/signin'
    }
  }, [data])

  return createElement('button', {
    onClick: () => endSession(),
    title: `Signed in as ${authItemLabel}`,
    style: {
      background: 'none',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      padding: '6px 12px',
      fontSize: '14px',
      cursor: 'pointer',
      color: '#374151'
    }
  }, 'Sign out')
}
