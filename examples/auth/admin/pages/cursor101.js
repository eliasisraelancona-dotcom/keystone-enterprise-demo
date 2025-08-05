import React from 'react'
import { PageContainer } from '@keystone-6/core/admin-ui/components'
import { Heading } from '@keystar/ui/typography'

export default function Cursor101Page() {
  return (
    <PageContainer
      title="Cursor 101"
      header={<Heading size="large">⚙️ Cursor 101: Built for Enterprise Engineers</Heading>}
    >
      <div style={{ padding: '32px 48px' }}>
        <div style={{ marginBottom: '24px', lineHeight: '1.6' }}>
          Cursor isn't just a coding assistant — it's an AI pair programmer purpose-built for large, complex codebases. 
          Here's how it shines in real enterprise workflows like Adobe's:
        </div>

        <h2 style={{ fontSize: '24px', marginBottom: '16px', marginTop: '48px' }}>🧠 Deep Codebase Understanding (Beyond Autocomplete)</h2>
        
        <div style={{ marginBottom: '16px' }}>
          <strong>Semantic Awareness:</strong> Cursor understands your full codebase — not just the current file. In our Keystone.js monorepo, 
          it grasped relationships across models, access control layers, and UI components.
        </div>
        
        <div style={{ backgroundColor: '#f8f9fa', padding: '16px', borderRadius: '4px', marginBottom: '16px', fontFamily: 'monospace', fontSize: '14px' }}>
          {`// Cursor instantly found role-based patterns across files
function canReadUsers({ session }) {
  return Boolean(session?.data.role?.canReadUsers)
}`}
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <strong>Smart Search & Architecture Insight:</strong> Ask, "What does this role resolver do?" — Cursor gives a contextual, structured explanation.
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <strong>Enterprise Pattern Recognition:</strong> Cursor detected role-based access logic and generated compliant authentication flows — 
          including secure session handling and password hashing.
        </div>

        <hr style={{ margin: '32px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>⚡ Accelerated Development — Without Tab Switching</h2>
        
        <div style={{ marginBottom: '16px' }}>
          <strong>Inline Code Suggestions:</strong> Get real-time, in-place edits that respect your architecture. No out-of-band suggestions 
          or full blurbs to manually clean up.
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <strong>Multi-File Refactoring:</strong> Rename functions, move logic, or refactor safely across services, models, and resolvers — all in flow.
        </div>
        
        <div style={{ backgroundColor: '#f8f9fa', padding: '16px', borderRadius: '4px', marginBottom: '16px', fontFamily: 'monospace', fontSize: '14px' }}>
          {`# Real example: Updated 5 files simultaneously for SuperADMIN tabs
✅ CustomNavigation.tsx (role check)
✅ config.tsx (page registration) 
✅ keystone.ts (admin UI config)
✅ IntroductionPage.tsx (new component)
✅ Cursor101Page.tsx (new component)`}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <strong>Ask Anything / Chat:</strong> Use natural language to generate helpers, explain services, or scaffold new endpoints — 
          like "Create a GraphQL mutation for assigning a role to a user."
        </div>

        <hr style={{ margin: '32px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>🎯 Enterprise-Grade Code Quality, Baked In</h2>
        
        <div style={{ marginBottom: '16px' }}>
          <strong>Security Best Practices:</strong> Generated code followed industry standards — hashed passwords, secure tokens, scoped access.
        </div>
        
        <div style={{ backgroundColor: '#f8f9fa', padding: '16px', borderRadius: '4px', marginBottom: '16px', fontFamily: 'monospace', fontSize: '14px' }}>
          {`// Proper password hashing via Keystone's secure field
password: password({ validation: { isRequired: true } })
// vs manual bcrypt implementation

// GraphQL-level access control
query: canReadUsers,
create: canCreateUsers,
update: canUpdateUsers,
delete: canDeleteUsers,`}
        </div>

        <hr style={{ margin: '32px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>🚀 Stay in Flow — Where You Already Work</h2>
        
        <div style={{ marginBottom: '16px' }}>
          <strong>Zero Context Switching:</strong> Cursor is embedded inside VSCode, where your engineers already live.
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <strong>Use it When You Need It:</strong> It's non-intrusive — ignore it entirely, or let it unblock you in seconds.
        </div>
        
        <div style={{ marginBottom: '32px' }}>
          <strong>Prompting is the Skill:</strong> Whether junior or senior, the real skill is in asking good questions — and Cursor responds intelligently.
        </div>

        <hr style={{ margin: '32px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>🏗️ What We Built Together: Real Enterprise Examples</h2>
        
        <div style={{ marginBottom: '8px' }}>
          <strong>Development Speed: From hours to minutes</strong>
        </div>
        <div style={{ marginLeft: '16px', marginBottom: '16px' }}>
          <div>• Before: Manually navigating 698-line schema.ts file to find role functions</div>
          <div>• With Cursor: "Find role-based access control functions" → instantly located all permission functions</div>
        </div>
        
        <div style={{ marginBottom: '8px' }}>
          <strong>Problem Solving: Real challenges we solved</strong>
        </div>
        <div style={{ marginLeft: '16px', marginBottom: '16px' }}>
          <div>• Challenge: "Users can't login with 12345" → AI identified 8-character minimum → used `12345678`</div>
          <div>• Challenge: "Seeding fails with permission errors" → AI suggested `context.sudo()` for proper permission bypass</div>
          <div>• Challenge: "React imports failing in monorepo" → AI recognized Keystone conflict → used createElement approach</div>
        </div>

        <hr style={{ margin: '32px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>🔥 Try It Right Now!</h2>
        <div style={{ marginBottom: '16px' }}>
          Navigate to <code style={{ backgroundColor: '#f8f9fa', padding: '2px 6px', borderRadius: '3px' }}>http://localhost:3000</code> and experience the difference:
        </div>
        
        <div style={{ marginLeft: '16px', marginBottom: '16px' }}>
          <div style={{ fontWeight: '600' }}>SuperADMIN Experience (eliasisrael/12345678):</div>
          <div>• See ALL users, ALL todos, full administrative control</div>
          <div>• Access to these special tabs (A) Introduction and (B) Cursor 101</div>
          <div>• Complete CRUD operations across the entire system</div>
        </div>
        
        <div style={{ marginLeft: '16px', marginBottom: '32px' }}>
          <div style={{ fontWeight: '600' }}>Regular User Experience (Alice Johnson/user12345):</div>
          <div>• Limited to own todos and profile only</div>
          <div>• No access to Users, Roles, or special tabs</div>
          <div>• Secure role-based filtering in action</div>
        </div>

        <div style={{ backgroundColor: '#f0f9ff', padding: '24px', borderRadius: '8px', marginTop: '48px' }}>
          <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
            🚀 The Cursor Enterprise Difference
          </div>
          <div style={{ lineHeight: '1.6' }}>
            This entire production-ready enterprise system was built in ONE development session. 
            Traditional development would take days or weeks! That's the power of AI pair programming 
            with enterprise-grade understanding.
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
