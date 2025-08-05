import { Fragment } from 'react'

export function Cursor101Page() {
  return (
    <Fragment>
      <div style={{ padding: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>⚙️ Cursor 101: Built for Enterprise Engineers</h1>
        
        <div style={{ paddingTop: '24px' }}>
          <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
            Cursor isn't just a coding assistant — it's an AI pair programmer purpose-built for large, complex codebases. 
            Here's how it shines in real enterprise workflows like Adobe's:
          </p>
        </div>

        <div style={{ paddingTop: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>🧠 Deep Codebase Understanding (Beyond Autocomplete)</h2>
          <div style={{ paddingTop: '16px' }}>
            <span style={{ fontWeight: 'bold' }}>Semantic Awareness:</span>
            <p style={{ marginBottom: '16px', lineHeight: '1.6' }}> Cursor understands your full codebase — not just the current file. In our Keystone.js monorepo, 
            it grasped relationships across models, access control layers, and UI components.</p>
            
            <div style={{ paddingTop: '16px', backgroundColor: '#f5f5f5', padding: '16px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                {`// Cursor instantly found role-based patterns across files
function canReadUsers({ session }: { session?: Session }) {
  return Boolean(session?.data.role?.canReadUsers)
}`}
              </span>
            </div>
            
            <div style={{ paddingTop: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>Smart Search & Architecture Insight:</span>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}> Ask, "What does this role resolver do?" — Cursor gives a contextual, structured explanation.</p>
            </div>
            
            <div style={{ paddingTop: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>Enterprise Pattern Recognition:</span>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}> Cursor detected role-based access logic and generated compliant authentication flows — 
              including secure session handling and password hashing.</p>
            </div>
            
            <div style={{ paddingTop: '16px', backgroundColor: '#f5f5f5', padding: '16px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                {`// AI recognized RBAC pattern and suggested consistent implementation
const isSuperAdmin = data?.authenticatedItem?.role?.name === 'Super Admin'

// Generated enterprise-grade permission filters
filter: session?.data.role?.name === 'Super Admin' 
  ? {} 
  : { assignedTo: { id: { equals: session?.itemId } } }`}
              </span>
            </div>
          </div>
        </div>

        <hr style={{ margin: '32px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

        <div style={{ paddingTop: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>⚡ Accelerated Development — Without Tab Switching</h2>
          <div style={{ paddingTop: '16px' }}>
            <span style={{ fontWeight: 'bold' }}>Inline Code Suggestions:</span>
            <p style={{ marginBottom: '16px', lineHeight: '1.6' }}> Get real-time, in-place edits that respect your architecture. No out-of-band suggestions 
            or full blurbs to manually clean up.</p>
            
            <div style={{ paddingTop: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>Multi-File Refactoring:</span>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}> Rename functions, move logic, or refactor safely across services, models, and resolvers — all in flow.</p>
            </div>
            
            <div style={{ paddingTop: '16px', backgroundColor: '#f5f5f5', padding: '16px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                {`# Real example: Updated 5 files simultaneously for SuperADMIN tabs
✅ CustomNavigation.tsx (role check)
✅ config.tsx (page registration) 
✅ keystone.ts (admin UI config)
✅ IntroductionPage.tsx (new component)
✅ Cursor101Page.tsx (new component)`}
              </span>
            </div>
            
            <div style={{ paddingTop: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>Ask Anything / Chat:</span>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}> Use natural language to generate helpers, explain services, or scaffold new endpoints — 
              like "Create a GraphQL mutation for assigning a role to a user."</p>
            </div>
            
            <div style={{ paddingTop: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>Test Generation:</span>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}> Cursor Copilot builds full test suites, with mocks and edge cases, 
              so your team can focus on business logic.</p>
            </div>
            
            <div style={{ paddingTop: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>Terminal & Git Integrations:</span>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}> Run commands, resolve merge conflicts, and commit — without leaving VSCode.</p>
            </div>
          </div>
        </div>

        <hr style={{ margin: '32px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

        <div style={{ paddingTop: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>🎯 Enterprise-Grade Code Quality, Baked In</h2>
          <div style={{ paddingTop: '16px' }}>
            <span style={{ fontWeight: 'bold' }}>Security Best Practices:</span>
            <p style={{ marginBottom: '16px', lineHeight: '1.6' }}> Generated code followed industry standards — hashed passwords, secure tokens, scoped access.</p>
            
            <div style={{ paddingTop: '16px', backgroundColor: '#f5f5f5', padding: '16px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                {`// Proper password hashing via Keystone's secure field
password: password({ validation: { isRequired: true } })
// vs manual bcrypt implementation

// GraphQL-level access control
query: canReadUsers,
create: canCreateUsers,
update: canUpdateUsers,
delete: canDeleteUsers,`}
              </span>
            </div>
            
            <div style={{ paddingTop: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>Scalable by Default:</span>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}> Cursor helped design a role-based permission system with clean separation of concerns and extensible architecture.</p>
            </div>
            
            <div style={{ paddingTop: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>Professional Output:</span>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}> Everything from tests to helper functions to docs is generated at the level expected for production use.</p>
            </div>
          </div>
        </div>

        <hr style={{ margin: '32px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

        <div style={{ paddingTop: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>🚀 Stay in Flow — Where You Already Work</h2>
          <div style={{ paddingTop: '16px' }}>
            <span style={{ fontWeight: 'bold' }}>Zero Context Switching:</span>
            <p style={{ marginBottom: '16px', lineHeight: '1.6' }}> Cursor is embedded inside VSCode, where your engineers already live.</p>
            
            <div style={{ paddingTop: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>Use it When You Need It:</span>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}> It's non-intrusive — ignore it entirely, or let it unblock you in seconds.</p>
            </div>
            
            <div style={{ paddingTop: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>Prompting is the Skill:</span>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}> Whether junior or senior, the real skill is in asking good questions — and Cursor responds intelligently.</p>
            </div>
          </div>
        </div>

        <hr style={{ margin: '32px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

        <div style={{ paddingTop: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>🏗️ What We Built Together: Real Enterprise Examples</h2>
          <div style={{ paddingTop: '16px' }}>
            <span style={{ fontWeight: 'bold' }}>Development Speed: From hours to minutes</span>
            <div style={{ paddingTop: '8px', paddingLeft: '16px' }}>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>• Before: Manually navigating 698-line schema.ts file to find role functions</p>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>• With Cursor: "Find role-based access control functions" → instantly located all permission functions</p>
            </div>
            
            <div style={{ paddingTop: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>Problem Solving: Real challenges we solved</span>
              <div style={{ paddingTop: '8px', paddingLeft: '16px' }}>
                <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>• Challenge: "Users can't login with 12345" → AI identified 8-character minimum → used `12345678`</p>
                <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>• Challenge: "Seeding fails with permission errors" → AI suggested `context.sudo()` for proper permission bypass</p>
                <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>• Challenge: "React imports failing in monorepo" → AI recognized Keystone conflict → used createElement approach</p>
              </div>
            </div>
            
            <div style={{ paddingTop: '16px', backgroundColor: '#f5f5f5', padding: '16px' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                {`// Permission matrix we implemented in one session:
                    | Role         | Create | Read All | Update All | Delete | Manage Roles |
                    |-------------|--------|----------|------------|--------|-------------|
                    | Super Admin | ✅     | ✅       | ✅         | ✅     | ✅          |
                    | Regular User| ❌     | ❌       | Self Only  | ❌     | ❌          |

                    // Real working demo accounts:
                    ✅ SuperADMIN: eliasisrael / 12345678 (see everything)
                    ✅ Regular: Alice Johnson / user12345 (limited view)`}
              </span>
            </div>
          </div>
        </div>

        <hr style={{ margin: '32px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

        <div style={{ paddingTop: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>🔥 Try It Right Now!</h2>
          <div style={{ paddingTop: '16px' }}>
            <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>Navigate to </p>
            <span style={{ fontFamily: 'monospace' }}>http://localhost:3000</span>
            <p style={{ marginBottom: '16px', lineHeight: '1.6' }}> and experience the difference:</p>
            
            <div style={{ paddingTop: '16px', paddingLeft: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>SuperADMIN Experience (eliasisrael/12345678):</span>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>• See ALL users, ALL todos, full administrative control</p>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>• Access to these special tabs (A) Introduction and (B) Cursor 101</p>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>• Complete CRUD operations across the entire system</p>
            </div>
            
            <div style={{ paddingTop: '16px', paddingLeft: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>Regular User Experience (Alice Johnson/user12345):</span>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>• Limited to own todos and profile only</p>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>• No access to Users, Roles, or special tabs</p>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>• Secure role-based filtering in action</p>
            </div>
            <div style={{ paddingTop: '16px', paddingLeft: '16px' }}>
              <span style={{ fontWeight: 'bold' }}>Regular User Experience (Alice Johnson/user12345):</span>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>• We can update the todo title and description quite easily</p>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>• All of this is done in one session and via the "Tab" function on Cursor.</p>
              <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>• Ideally, we would have a "Tab" function that would allow us to do this in one session.</p>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: '32px', backgroundColor: '#fafafa', padding: '24px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
            🚀 The Cursor Enterprise Difference
          </span>
          <div style={{ paddingTop: '16px' }}>
            <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
              This entire production-ready enterprise system was built in ONE development session. 
              Traditional development would take days or weeks! That's the power of AI pair programming 
              with enterprise-grade understanding.
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  )
}