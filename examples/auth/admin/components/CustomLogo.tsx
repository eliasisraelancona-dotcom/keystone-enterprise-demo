import { createElement } from 'react'

export function CustomLogo() {
  return createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px 16px',
    }
  },
    createElement('div', {
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#2563eb'
      }
    }, '🎨 Adobe'),
    createElement('div', {
      style: {
        fontSize: '14px',
        color: '#666',
        fontWeight: 'normal'
      }
    }, '×'),
    createElement('div', {
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#7c3aed'
      }
    }, '⚡ Cursor'),
    createElement('div', {
      style: {
        fontSize: '12px',
        color: '#999',
        marginLeft: '8px'
      }
    }, 'Enterprise Demo')
  )
}
