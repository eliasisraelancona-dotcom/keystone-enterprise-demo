# 🚀 Complete Workflow: Code Change → Testing → PR

## Overview
Let's walk through adding a new regular user "Jaime Israel" to the backend, following enterprise development best practices from code change to pull request.

---

## **Step 1: Create Feature Branch** 🌿

```bash
# Start from main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/add-jaime-israel-user
```

---

## **Step 2: Make Code Changes** ✏️

### **A. Update the Seeding Function**

Edit `examples/auth/keystone.ts` around line 123-126:

```typescript:examples/auth/keystone.ts
// ... existing code ...

// Create sample users with regular user role for demo
const regularUsers = [
  { name: 'Alice Johnson', role: regularRoleId },
  { name: 'Bob Smith', role: regularRoleId },
  { name: 'Jaime Israel', role: regularRoleId }, // ← NEW USER
]

// ... existing code ...
```

### **B. Update Documentation**

Update `examples/auth/README.md` to reflect the new user:

```markdown:examples/auth/README.md
<code_block_to_apply_changes_from>
```

---

## **Step 3: Local Testing** 🧪

### **A. Manual Testing**

```bash
# Navigate to auth example
cd examples/auth

# Clear existing database to test seeding
rm -f keystone-example.db

# Start development server
npm run dev
```

**Verification Steps:**
1. ✅ Server starts without errors
2. ✅ Visit `http://localhost:3000`
3. ✅ Check seeding logs show "Created demo user: Jaime Israel"
4. ✅ Login with `Jaime Israel` / `user12345`
5. ✅ Verify user can only see their own todos
6. ✅ Verify user cannot access Users or Roles sections

### **B. Automated Testing**

```bash
# Run from root directory
cd /Users/jaimeisraelcampeas/keystone

# Run auth-specific tests
npm test -- tests/api-tests/auth.test.ts
npm test -- tests/examples-smoke-tests/auth.test.ts

# Run full test suite
npm test
```

### **C. Create Unit Test for New User**

Create `examples/auth/tests/user-seeding.test.ts`:

```typescript:examples/auth/tests/user-seeding.test.ts
import { getContext } from '@keystone-6/core/context';
import { resetDatabase } from '@keystone-6/core/testing';
import * as PrismaModule from '.prisma/client';
import baseConfig from '../keystone';

const dbUrl = `file:./test-${process.env.JEST_WORKER_ID}.db`;
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

beforeEach(async () => {
  await resetDatabase(dbUrl, 'schema.prisma');
});

const context = getContext(config, PrismaModule);

describe('User Seeding', () => {
  test('Jaime Israel user is created with correct role', async () => {
    // Trigger seeding by accessing context
    const users = await context.query.User.findMany({
      where: { name: { equals: 'Jaime Israel' } },
      query: 'id name role { name }'
    });

    expect(users).toHaveLength(1);
    expect(users[0].name).toBe('Jaime Israel');
    expect(users[0].role.name).toBe('Regular User');
  });

  test('Jaime Israel can authenticate', async () => {
    const result = await context.graphql.raw({
      query: `
        mutation {
          authenticateUserWithPassword(name: "Jaime Israel", password: "user12345") {
            ... on UserAuthenticationWithPasswordSuccess {
              sessionToken
              item { id name }
            }
            ... on UserAuthenticationWithPasswordFailure {
              message
            }
          }
        }
      `
    });

    expect(result.data.authenticateUserWithPassword.item).toBeDefined();
    expect(result.data.authenticateUserWithPassword.item.name).toBe('Jaime Israel');
  });
});
```

---

## **Step 4: Code Quality Checks** 🔍

### **A. Linting & Formatting**

```bash
# Run linting
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Check formatting
npm run format:check

# Auto-format code
npm run format
```

### **B. Type Checking**

```bash
# TypeScript compilation check
npm run test:types
```

### **C. Build Test**

```bash
# Ensure code builds successfully
npm run build
```

---

## **Step 5: Commit Changes** 📝

```bash
# Stage changes
git add examples/auth/keystone.ts
git add examples/auth/README.md
git add examples/auth/tests/user-seeding.test.ts

# Commit with descriptive message
git commit -m "feat: add Jaime Israel as regular user

- Add Jaime Israel to user seeding in keystone.ts
- Update README.md with new user credentials
- Add unit tests for user creation and authentication
- Maintains existing RBAC permissions for regular users

Closes #123"
```

---

## **Step 6: Push and Create PR** 🚀

### **A. Push Branch**

```bash
# Push feature branch
git push origin feature/add-jaime-israel-user
```

### **B. Create Pull Request**

**PR Title:** `feat: Add Jaime Israel as regular user`

**PR Description:**
```markdown
## 🎯 Summary
Adds "Jaime Israel" as a new regular user to the authentication demo, maintaining existing RBAC permissions and security patterns.

## 📋 Changes Made
- ✅ Added Jaime Israel to user seeding in `keystone.ts`
- ✅ Updated documentation in `README.md`
- ✅ Added comprehensive unit tests
- ✅ Verified authentication and permissions work correctly

## 🧪 Testing
- [x] Manual testing: User creation, login, and permission verification
- [x] Unit tests: Authentication and role assignment
- [x] Integration tests: Full auth flow
- [x] Smoke tests: Example project functionality

## 🔒 Security Considerations
- Uses same secure password pattern as existing users
- Maintains Regular User role restrictions
- Cannot access admin functions or other users' data
- Password properly hashed via Keystone's secure field

## 📊 Demo Impact
New user available for demonstrations:
- **Username:** Jaime Israel
- **Password:** user12345
- **Role:** Regular User
- **Access:** Own todos only

## ✅ Checklist
- [x] Code follows project conventions
- [x] Tests pass locally
- [x] Documentation updated
- [x] No breaking changes
- [x] Security best practices followed
```

---

## **Step 7: CI/CD Pipeline** ⚙️

The automated CI will run:

### **A. Linting & Type Checking**
```yaml
- TypeScript compilation
- ESLint checks
- Prettier formatting
- Preconstruct build
```

### **B. Test Suites**
```yaml
- Unit tests (Jest)
- API tests (PostgreSQL/SQLite/MySQL)
- Integration tests (Playwright)
- Example smoke tests
```

### **C. Security Checks**
```yaml
- Dependency vulnerability scan
- Code quality analysis
- Permission verification tests
```

---

## **Step 8: Code Review Process** 👥

### **A. Automated Checks**
- ✅ All CI tests pass
- ✅ No merge conflicts
- ✅ Branch up to date with main

### **B. Manual Review**
**Reviewer checklist:**
- [ ] Code follows established patterns
- [ ] Security implications considered
- [ ] Tests provide adequate coverage
- [ ] Documentation is accurate
- [ ] No performance regressions

### **C. Review Feedback**
```markdown
**Example Review Comments:**

✅ **Approved:** "LGTM! Clean implementation following existing patterns."

🔄 **Request Changes:** "Please add test for password validation edge case."

💭 **Suggestion:** "Consider adding JSDoc comments for the seeding function."
```

---

## **Step 9: Merge & Deploy** 🎉

### **A. Merge Options**
```bash
# Squash and merge (recommended for features)
git checkout main
git merge --squash feature/add-jaime-israel-user
git commit -m "feat: add Jaime Israel as regular user"

# Or use GitHub's merge button with squash option
```

### **B. Post-Merge**
```bash
# Clean up feature branch
git branch -d feature/add-jaime-israel-user
git push origin --delete feature/add-jaime-israel-user

# Pull latest main
git pull origin main
```

### **C. Deployment**
```bash
# Production deployment (if applicable)
npm run build
npm run start

# Verify in production environment
curl https://your-domain.com/api/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ users { name } }"}'
```

---

## **📊 Workflow Summary**

| Phase | Duration | Key Activities |
|-------|----------|----------------|
| **Planning** | 5 min | Branch creation, requirement analysis |
| **Development** | 15 min | Code changes, local testing |
| **Testing** | 10 min | Unit tests, integration tests |
| **Quality** | 5 min | Linting, formatting, type checking |
| **Review** | 30 min | PR creation, peer review, feedback |
| **Deployment** | 10 min | Merge, cleanup, production deploy |

**Total Time:** ~75 minutes for a simple user addition

---

## **🔧 Tools Used**

- **Version Control:** Git, GitHub
- **Testing:** Jest, Playwright, Keystone Testing Utils
- **Quality:** ESLint, Prettier, TypeScript
- **CI/CD:** GitHub Actions
- **Database:** SQLite (dev), PostgreSQL (prod)
- **Framework:** Keystone.js, Node.js

This workflow ensures enterprise-grade quality, security, and maintainability for even simple changes like adding a user! 🚀

## 🔐 Demo Accounts

| User | Password | Role | Access |
|------|----------|------|--------|
| `eliasisrael` | `12345678` | Super Admin | Full Access + Custom Tabs |
| `Alice Johnson` | `user12345` | Regular User | Limited to Own Data |
| `Jaime Israel` | `user12345` | Regular User | Limited to Own Data | 