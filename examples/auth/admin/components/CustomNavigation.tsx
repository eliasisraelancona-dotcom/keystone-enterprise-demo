import { useEffect, createElement } from 'react'
import { useRouter } from 'next/router'

import { ActionButton } from '@keystar/ui/button'
import { Divider } from '@keystar/ui/layout'
import { TooltipTrigger, Tooltip } from '@keystar/ui/tooltip'
import { Text } from '@keystar/ui/typography'

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
    createElement(NavItem, { key: 'introduction', href: '/introduction' }, '(A) Introduction'),
    createElement(NavItem, { key: 'cursor101', href: '/cursor101' }, '(B) Cursor 101'),
  ] : []

  // Create regular list navigation items
  const listNavItems = lists.map(list => 
    createElement(NavItem, { key: list.key, href: getHrefFromList(list) }, list.label)
  )

  return createElement(NavContainer, {},
    createElement(NavList, {},
      createElement(NavItem, { href: '/' }, 'Dashboard'),
      createElement(Divider),
      // Integrate SuperADMIN tabs with regular navigation
      ...superAdminNavItems,
      ...listNavItems
    ),
    createElement(NavFooter, {},
      data?.authenticatedItem && createElement(SignoutButton, { 
        authItemLabel: data.authenticatedItem.name 
      }),
      createElement(DeveloperResourcesMenu)
    )
  )
}

const END_SESSION = gql`
  mutation KsAuthEndSession {
    endSession
  }
`

function SignoutButton({ authItemLabel }: { authItemLabel: string }) {
  const router = useRouter()
  const [endSession, { data }] = useMutation(END_SESSION)
  
  useEffect(() => {
    if (data?.endSession) {
      router.push('/signin')
    }
  }, [data, router])

  return createElement(TooltipTrigger, {},
    createElement(ActionButton, {
      onPress: () => endSession(),
      prominence: 'low'
    }, 'Sign out'),
    createElement(Tooltip, {},
      createElement(Text, {},
        'Signed in as ',
        createElement('strong', {}, authItemLabel)
      )
    )
  )
}
