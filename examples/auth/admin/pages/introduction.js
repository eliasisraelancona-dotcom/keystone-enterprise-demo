import React from 'react'
import { PageContainer } from '@keystone-6/core/admin-ui/components'
import { Heading } from '@keystar/ui/typography'

export default function IntroductionPage() {
  return (
    <PageContainer
      title="Introduction"
      header={<Heading size="large">👋 Welcome to Cursor at Adobe</Heading>}
    >
      <div style={{ padding: '32px 48px' }}>
        <div style={{ fontSize: '18px', marginBottom: '24px', fontWeight: '500' }}>
          Hi, I'm Elias Israel — Adobe's Technical Account Manager here at Cursor.
        </div>
        
        <div style={{ marginBottom: '32px', lineHeight: '1.6' }}>
          Before Cursor, I spent over 4 years as a TAM at Stripe helping engineering teams ship high-impact work. 
          I joined Cursor because I saw how it changes the way engineers build — especially in complex environments like Adobe.
        </div>

        <hr style={{ margin: '32px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

        <div style={{ marginBottom: '24px', lineHeight: '1.6' }}>
          You're currently piloting tools like Copilot and Codeium. My goal today is simple: 
          <strong> show you how Cursor solves real developer pain through actual workflows.</strong>
        </div>

        <div style={{ marginBottom: '24px', lineHeight: '1.6' }}>
          Cursor doesn't try to replace engineers — it amplifies them. It handles the repetitive, manual work 
          so your team can focus on solving real problems.
        </div>

        <div style={{ marginBottom: '32px', lineHeight: '1.6' }}>
          What makes Cursor different is that it lives inside VSCode. No new tools, no new interfaces. 
          It's there when you need it — and invisible when you don't.
        </div>

        <hr style={{ margin: '32px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Real Engineer Stories</h2>
        <div style={{ marginBottom: '16px' }}>Two engineers I worked with at Stripe use Cursor every day:</div>
        
        <div style={{ backgroundColor: '#f8f9fa', padding: '24px', borderRadius: '8px', marginBottom: '32px' }}>
          <div style={{ marginBottom: '16px' }}>
            <strong>Roger:</strong> called its test generation "magic" and said refactoring is now dramatically safer.
          </div>
          <div>
            <strong>Carlos:</strong> uses it to understand undocumented legacy code in seconds.
          </div>
        </div>

        <hr style={{ margin: '32px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>🚀 Live Demo Environment</h2>
        <div style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          Let me show you what that looks like — in a live environment, built using Cursor itself.
        </div>
        
        <div style={{ marginBottom: '24px', lineHeight: '1.6' }}>
          This entire enterprise demo system you're exploring right now was built in a single development session 
          using Cursor Enterprise. It includes:
        </div>
        
        <div style={{ marginLeft: '24px', marginBottom: '24px' }}>
          <div>• Complete role-based access control system</div>
          <div>• Secure authentication with password hashing</div>
          <div>• Enterprise todo management with permissions</div>
          <div>• Custom admin UI with role-based navigation</div>
          <div>• Auto-seeding database with persistent admin account</div>
        </div>
        
        <div style={{ backgroundColor: '#f0f9ff', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
          <div style={{ fontWeight: '600', marginBottom: '8px' }}>Ready to see Cursor in action?</div>
          <div style={{ marginBottom: '16px' }}>
            Navigate to the <strong>(B) Cursor 101</strong> tab to see exactly how we built this system together, 
            with real code examples and enterprise features demonstrated.
          </div>
          
          <div style={{ marginBottom: '8px' }}>
            Then try logging in as different users to experience the role-based permissions in action:
          </div>
          <div style={{ marginLeft: '16px', fontFamily: 'monospace', fontSize: '14px' }}>
            <div>SuperADMIN: eliasisrael / 12345678</div>
            <div>Regular User: Alice Johnson / user12345</div>
          </div>
        </div>

        <div style={{ fontSize: '20px', fontWeight: '700', marginTop: '48px' }}>
          This is just the beginning. Let's dive deeper into what Cursor can do for Adobe's engineering teams.
        </div>
      </div>
    </PageContainer>
  )
}
