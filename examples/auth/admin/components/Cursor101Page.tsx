import { Fragment } from 'react'
import { Heading, Text } from '@keystar/ui/typography'
import { Box, Divider } from '@keystar/ui/layout'

export function Cursor101Page() {
  return (
    <Fragment>
      <Box padding="xlarge">
        <Heading size="large">⚙️ Cursor 101: Built for Enterprise Engineers</Heading>
        
        <Box paddingTop="large">
          <Text>
            Cursor isn't just a coding assistant — it's an AI pair programmer purpose-built for large, complex codebases. 
            Here's how it shines in real enterprise workflows like Adobe's:
          </Text>
        </Box>

        <Box paddingTop="xlarge">
          <Heading size="medium">🧠 Deep Codebase Understanding (Beyond Autocomplete)</Heading>
          <Box paddingTop="medium">
            <Text weight="semibold">Semantic Awareness:</Text>
            <Text> Cursor understands your full codebase — not just the current file. In our Keystone.js monorepo, 
            it grasped relationships across models, access control layers, and UI components.</Text>
            
            <Box paddingTop="medium" backgroundColor="neutral" padding="medium">
              <Text family="code" size="small">
                {`// Cursor instantly found role-based patterns across files
function canReadUsers({ session }: { session?: Session }) {
  return Boolean(session?.data.role?.canReadUsers)
}`}
              </Text>
            </Box>
            
            <Box paddingTop="medium">
              <Text weight="semibold">Smart Search & Architecture Insight:</Text>
              <Text> Ask, "What does this role resolver do?" — Cursor gives a contextual, structured explanation.</Text>
            </Box>
            
            <Box paddingTop="medium">
              <Text weight="semibold">Enterprise Pattern Recognition:</Text>
              <Text> Cursor detected role-based access logic and generated compliant authentication flows — 
              including secure session handling and password hashing.</Text>
            </Box>
            
            <Box paddingTop="medium" backgroundColor="neutral" padding="medium">
              <Text family="code" size="small">
                {`// AI recognized RBAC pattern and suggested consistent implementation
const isSuperAdmin = data?.authenticatedItem?.role?.name === 'Super Admin'

// Generated enterprise-grade permission filters
filter: session?.data.role?.name === 'Super Admin' 
  ? {} 
  : { assignedTo: { id: { equals: session?.itemId } } }`}
              </Text>
            </Box>
          </Box>
        </Box>

        <Divider marginY="xlarge" />

        <Box paddingTop="large">
          <Heading size="medium">⚡ Accelerated Development — Without Tab Switching</Heading>
          <Box paddingTop="medium">
            <Text weight="semibold">Inline Code Suggestions:</Text>
            <Text> Get real-time, in-place edits that respect your architecture. No out-of-band suggestions 
            or full blurbs to manually clean up.</Text>
            
            <Box paddingTop="medium">
              <Text weight="semibold">Multi-File Refactoring:</Text>
              <Text> Rename functions, move logic, or refactor safely across services, models, and resolvers — all in flow.</Text>
            </Box>
            
            <Box paddingTop="medium" backgroundColor="neutral" padding="medium">
              <Text family="code" size="small">
                {`# Real example: Updated 5 files simultaneously for SuperADMIN tabs
✅ CustomNavigation.tsx (role check)
✅ config.tsx (page registration) 
✅ keystone.ts (admin UI config)
✅ IntroductionPage.tsx (new component)
✅ Cursor101Page.tsx (new component)`}
              </Text>
            </Box>
            
            <Box paddingTop="medium">
              <Text weight="semibold">Ask Anything / Chat:</Text>
              <Text> Use natural language to generate helpers, explain services, or scaffold new endpoints — 
              like "Create a GraphQL mutation for assigning a role to a user."</Text>
            </Box>
            
            <Box paddingTop="medium">
              <Text weight="semibold">Test Generation:</Text>
              <Text> Cursor Copilot builds full test suites, with mocks and edge cases, 
              so your team can focus on business logic.</Text>
            </Box>
            
            <Box paddingTop="medium">
              <Text weight="semibold">Terminal & Git Integrations:</Text>
              <Text> Run commands, resolve merge conflicts, and commit — without leaving VSCode.</Text>
            </Box>
          </Box>
        </Box>

        <Divider marginY="xlarge" />

        <Box paddingTop="large">
          <Heading size="medium">🎯 Enterprise-Grade Code Quality, Baked In</Heading>
          <Box paddingTop="medium">
            <Text weight="semibold">Security Best Practices:</Text>
            <Text> Generated code followed industry standards — hashed passwords, secure tokens, scoped access.</Text>
            
            <Box paddingTop="medium" backgroundColor="neutral" padding="medium">
              <Text family="code" size="small">
                {`// Proper password hashing via Keystone's secure field
password: password({ validation: { isRequired: true } })
// vs manual bcrypt implementation

// GraphQL-level access control
query: canReadUsers,
create: canCreateUsers,
update: canUpdateUsers,
delete: canDeleteUsers,`}
              </Text>
            </Box>
            
            <Box paddingTop="medium">
              <Text weight="semibold">Scalable by Default:</Text>
              <Text> Cursor helped design a role-based permission system with clean separation of concerns and extensible architecture.</Text>
            </Box>
            
            <Box paddingTop="medium">
              <Text weight="semibold">Professional Output:</Text>
              <Text> Everything from tests to helper functions to docs is generated at the level expected for production use.</Text>
            </Box>
          </Box>
        </Box>

        <Divider marginY="xlarge" />

        <Box paddingTop="large">
          <Heading size="medium">🚀 Stay in Flow — Where You Already Work</Heading>
          <Box paddingTop="medium">
            <Text weight="semibold">Zero Context Switching:</Text>
            <Text> Cursor is embedded inside VSCode, where your engineers already live.</Text>
            
            <Box paddingTop="medium">
              <Text weight="semibold">Use it When You Need It:</Text>
              <Text> It's non-intrusive — ignore it entirely, or let it unblock you in seconds.</Text>
            </Box>
            
            <Box paddingTop="medium">
              <Text weight="semibold">Prompting is the Skill:</Text>
              <Text> Whether junior or senior, the real skill is in asking good questions — and Cursor responds intelligently.</Text>
            </Box>
          </Box>
        </Box>

        <Divider marginY="xlarge" />

        <Box paddingTop="large">
          <Heading size="medium">🏗️ What We Built Together: Real Enterprise Examples</Heading>
          <Box paddingTop="medium">
            <Text weight="semibold">Development Speed: From hours to minutes</Text>
            <Box paddingTop="small" paddingLeft="medium">
              <Text>• Before: Manually navigating 698-line schema.ts file to find role functions</Text>
              <Text>• With Cursor: "Find role-based access control functions" → instantly located all permission functions</Text>
            </Box>
            
            <Box paddingTop="medium">
              <Text weight="semibold">Problem Solving: Real challenges we solved</Text>
              <Box paddingTop="small" paddingLeft="medium">
                <Text>• Challenge: "Users can't login with 12345" → AI identified 8-character minimum → used `12345678`</Text>
                <Text>• Challenge: "Seeding fails with permission errors" → AI suggested `context.sudo()` for proper permission bypass</Text>
                <Text>• Challenge: "React imports failing in monorepo" → AI recognized Keystone conflict → used createElement approach</Text>
              </Box>
            </Box>
            
            <Box paddingTop="medium" backgroundColor="neutral" padding="medium">
              <Text family="code" size="small">
                {`// Permission matrix we implemented in one session:
                    | Role         | Create | Read All | Update All | Delete | Manage Roles |
                    |-------------|--------|----------|------------|--------|-------------|
                    | Super Admin | ✅     | ✅       | ✅         | ✅     | ✅          |
                    | Regular User| ❌     | ❌       | Self Only  | ❌     | ❌          |

                    // Real working demo accounts:
                    ✅ SuperADMIN: eliasisrael / 12345678 (see everything)
                    ✅ Regular: Alice Johnson / user12345 (limited view)`}
              </Text>
            </Box>
          </Box>
        </Box>

        <Divider marginY="xlarge" />

        <Box paddingTop="large">
          <Heading size="medium">🔥 Try It Right Now!</Heading>
          <Box paddingTop="medium">
            <Text>Navigate to </Text>
            <Text family="code">http://localhost:3000</Text>
            <Text> and experience the difference:</Text>
            
            <Box paddingTop="medium" paddingLeft="medium">
              <Text weight="semibold">SuperADMIN Experience (eliasisrael/12345678):</Text>
              <Text>• See ALL users, ALL todos, full administrative control</Text>
              <Text>• Access to these special tabs (A) Introduction and (B) Cursor 101</Text>
              <Text>• Complete CRUD operations across the entire system</Text>
            </Box>
            
            <Box paddingTop="medium" paddingLeft="medium">
              <Text weight="semibold">Regular User Experience (Alice Johnson/user12345):</Text>
              <Text>• Limited to own todos and profile only</Text>
              <Text>• No access to Users, Roles, or special tabs</Text>
              <Text>• Secure role-based filtering in action</Text>
            </Box>
            <Box paddingTop="medium" paddingLeft="medium">
              <Text weight="semibold">Regular User Experience (Alice Johnson/user12345):</Text>
              <Text>• We can update the todo title and description quite easily</Text>
              <Text>• All of this is done in one session and via the "Tab" function on Cursor.</Text>
              <Text>• Ideally, we would have a "Tab" function that would allow us to do this in one session.</Text>
            </Box>
          </Box>
        </Box>

        <Box paddingTop="xlarge" backgroundColor="surface" padding="large">
          <Text weight="bold" size="large">
            🚀 The Cursor Enterprise Difference
          </Text>
          <Box paddingTop="medium">
            <Text>
              This entire production-ready enterprise system was built in ONE development session. 
              Traditional development would take days or weeks! That's the power of AI pair programming 
              with enterprise-grade understanding.
            </Text>
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}