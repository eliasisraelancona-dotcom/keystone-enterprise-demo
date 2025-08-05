import { useEffect, createElement } from 'react'

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

  // Create SuperADMIN-only navigation items
  const superAdminNavItems = isSuperAdmin ? [
    createElement(NavItem, { key: 'introduction', href: '/introduction', children: '(A) Introduction' }),
    createElement(NavItem, { key: 'cursor101', href: '/cursor101', children: '(B) Cursor 101' }),
  ] : []

  // Create regular list navigation items
  const listNavItems = lists.map(list => 
    createElement(NavItem, { key: list.key, href: getHrefFromList(list), children: list.label })
  )

  return createElement(NavContainer, null,
    createElement(NavList, null,
      createElement(NavItem, { href: '/', children: 'Dashboard' }),
      createElement('hr', { style: { margin: '8px 0', border: 'none', borderTop: '1px solid #e5e7eb' } }),
      // Integrate SuperADMIN tabs with regular navigation
      ...superAdminNavItems,
      ...listNavItems
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
