# Keystone.js Repository Structure Guide

## 🏗️ Repository Overview

This is the main Keystone.js monorepo containing the core framework, examples, documentation, and tooling. It uses **pnpm workspaces** to manage multiple packages.

**Repository Status:** ✅ Fully set up and ready for development
- **pnpm installed:** ✅ Version 10.14.0
- **Dependencies installed:** ✅ All workspace packages
- **Development environment:** ✅ Prepared with `pnpm prepare`

---

## 📁 Directory Structure

### 🎯 **Core Development**

#### 📦 `packages/` - Published NPM Packages
The heart of Keystone - these get published to npm as `@keystone-6/*`:

```
packages/
├── core/                    # 🔥 Main Keystone framework
│   ├── src/                 # Source code
│   ├── admin-ui/           # Admin interface components
│   └── fields/             # Built-in field types
├── auth/                   # 🔐 Authentication system
├── cloudinary/             # ☁️ File/image handling
├── fields-document/        # 📝 Rich text editor field
├── document-renderer/      # 🎨 Document content renderer
└── create/                # 🚀 CLI for new projects
```

**Key Commands:**
```bash
cd packages/core && pnpm dev    # Develop core framework
pnpm build                      # Build all packages
```

---

### 🎓 **Learning & Examples**

#### 🌟 `examples/` - 50+ Working Projects
Real applications demonstrating Keystone features:

**🔰 Getting Started Examples:**
- `auth/` - Basic authentication setup
- `usecase-blog/` - Complete blog with posts/authors
- `relationships/` - Data relationships & connections

**🎨 UI & Admin Customization:**
- `custom-admin-ui-logo/` - Branding the admin panel
- `custom-admin-ui-navigation/` - Custom nav structure
- `custom-admin-ui-pages/` - Adding custom pages

**🔧 Advanced Features:**
- `custom-field/` - Creating custom field types
- `document-field/` - Rich text editor usage
- `virtual-field/` - Computed/virtual fields
- `hooks/` - Lifecycle hooks and events

**🌐 Framework Integration:**
- `framework-nextjs-app-directory/` - Next.js 13+ App Router
- `framework-nextjs-pages-directory/` - Next.js Pages Router
- `framework-remix/` - Remix framework
- `framework-astro/` - Astro framework

**🔐 Authentication & Sessions:**
- `auth-magic-link/` - Passwordless login
- `custom-session/` - Custom session handling
- `custom-session-jwt/` - JWT-based sessions
- `custom-session-redis/` - Redis session storage

**💾 Data & Storage:**
- `assets-local/` - Local file storage
- `assets-s3/` - AWS S3 file storage
- `extend-prisma-schema/` - Custom Prisma schema
- `transactions/` - Database transactions

**🏢 Real-world Use Cases:**
- `usecase-roles/` - Role-based permissions
- `usecase-versioning/` - Content versioning
- `usecase-todo/` - Task management app

**Key Commands:**
```bash
cd examples/auth && pnpm install && pnpm dev    # Run auth example
cd examples/usecase-blog && pnpm dev           # Run blog example
```

---

### 📚 **Documentation & Website**

#### 📖 `docs/` - keystonejs.com Website
Next.js application powering the official website:

```
docs/
├── app/                    # Next.js 13+ app directory
├── content/               # Markdown documentation files
│   ├── docs/             # API reference & guides
│   ├── blog/             # Blog posts
│   └── examples/         # Example descriptions
├── components/           # React components for docs
└── public/              # Static assets
```

**Key Commands:**
```bash
cd docs && pnpm install && pnpm dev    # Run docs locally
```

---

### 🧪 **Testing & Quality**

#### 🔬 `tests/` - Test Suites
Comprehensive testing infrastructure:

```
tests/
├── api-tests/              # GraphQL API functionality
├── admin-ui-tests/         # Admin interface testing
├── examples-smoke-tests/   # Ensures all examples work
├── benchmarks/            # Performance testing
├── cli-tests/             # Command-line tool tests
└── sandbox/               # Testing playground
```

#### 🧪 `tests2/` - Modern Test Suite
Newer Node.js native tests using modern testing APIs

**Key Commands:**
```bash
pnpm test                  # Run all tests
pnpm test:admin-ui        # Test admin interface
pnpm test:node            # Run modern Node tests
```

---

### 🛠️ **Development Tools**

#### ⚙️ `scripts/` - Build & Release Scripts
- `prepare-release.js` - Release preparation automation

#### 🔧 `prisma-utils/` - Database Utilities
Utilities for working with Prisma and databases

#### 📋 `.changeset/` - Release Management
Manages versioning and changelogs for releases

#### 🐳 `.devcontainer/` - Development Container
VS Code dev container configuration for consistent development environment

---

## 📄 **Important Root Files**

### 📋 **Package Management**
- `package.json` - Main project configuration
- `pnpm-workspace.yaml` - Monorepo workspace definition
- `pnpm-lock.yaml` - Dependency lock file

### ⚙️ **Configuration**
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - Code linting rules
- `babel.config.js` - JavaScript transpilation
- `.prettierrc.json` - Code formatting rules

### 📖 **Documentation**
- `README.md` - Project overview
- `CONTRIBUTING.md` - Contribution guidelines
- `CODE-OF-CONDUCT.md` - Community standards
- `SECURITY.md` - Security policies

---

## 🚀 **Getting Started Paths**

### 👨‍💻 **For Developers Using Keystone**
```bash
# Create a new project (recommended)
npm create keystone-app@latest my-project

# Or explore examples
cd examples/auth && pnpm install && pnpm dev
```

### 👨‍🔬 **For Contributors**
```bash
# Set up development environment
pnpm install && pnpm prepare

# Run tests
pnpm test

# Work on core
cd packages/core
```

### 📚 **For Documentation**
```bash
# Run docs site locally
cd docs && pnpm install && pnpm dev
```

---

## 🎯 **Quick Navigation**

| What you want to do | Where to go |
|-------------------|-------------|
| Learn authentication | `examples/auth/` |
| Build a blog | `examples/usecase-blog/` |
| Customize admin UI | `examples/custom-admin-ui-*/` |
| Create custom fields | `examples/custom-field/` |
| Integrate with Next.js | `examples/framework-nextjs-*/` |
| Understand core code | `packages/core/` |
| Run tests | `tests/` |
| Read documentation | `docs/content/` |
| Contribute code | `CONTRIBUTING.md` |

---

## 📝 **Session Log & Changes**

### 🎯 **Setup Phase (Completed)**
- **Issue:** `npm install -g pnpm` failed with EACCES permission error
  - **Solution:** Used `sudo npm install -g pnpm` to install with admin privileges
  - **Result:** ✅ pnpm@10.14.0 installed successfully

- **Repository Setup:**
  - ✅ `pnpm install` - Installed all workspace dependencies  
  - ✅ `pnpm prepare` - Set up development environment with preconstruct
  - ✅ Repository tour completed - All major folders explored and documented

### 🗺️ **Exploration Phase (Current)**
- **Documentation:** Created comprehensive repository structure guide
- **Enterprise Demo Prep:** ✅ Analyzing enterprise-ready features for Adobe engineers demo
- **Live Demo:** 🚀 Role-based access control example running at localhost:3000
- **Status:** Enterprise showcase ready

---

## 💡 **Pro Tips**

1. **Start with examples** - They're the fastest way to understand features
2. **Use `pnpm dev`** in any example to run it locally
3. **Check `package.json`** in each directory for available scripts
4. **The `packages/core`** folder contains the main framework logic
5. **Tests are your friend** - They show expected behavior

---

## 🎯 **ENTERPRISE DEMO: Adobe Engineers Showcase**

### 🚀 **Live Demo Running**
**Role-Based Access Control:** `localhost:3000` 
- Advanced permission system with granular controls
- Multi-tenant user management
- Dynamic UI based on user roles

### 💼 **Enterprise Features Demonstrated**

#### 🔐 **Advanced Security & Access Control**
- **Granular RBAC:** 7 different permission levels (canCreateTodos, canManageAllTodos, canSeeOtherPeople, etc.)
- **Session-based Security:** Permission caching for performance
- **Field-level Security:** Dynamic UI hiding/showing based on permissions
- **Admin UI Access Control:** Role-based admin interface access

#### ⚡ **Production-Ready Architecture**
- **TypeScript-First:** Full type safety across the entire stack
- **GraphQL API:** Auto-generated, strongly-typed APIs
- **Monorepo Structure:** 50+ examples, comprehensive testing
- **Database Agnostic:** PostgreSQL, SQLite, MySQL support

#### 🎛️ **Enterprise Customization**
- **White-Label Admin UI:** Complete branding customization
- **Custom Pages:** Embed custom React components seamlessly
- **GraphQL Schema Extensions:** Add custom business logic
- **Extensible Fields:** Create domain-specific field types

#### 🧪 **Enterprise Testing & Quality**
- **Comprehensive Test Suite:** API, UI, and integration tests
- **Performance Benchmarks:** Built-in performance monitoring
- **Code Quality Tools:** ESLint, Prettier, TypeScript strict mode
- **CI/CD Ready:** GitHub Actions integration

## 📋 **Next Steps & TODOs**

- [x] Enterprise role-based access control demo ✅
- [x] 🚨 INCIDENT: Analyst role configuration for vendor access ✅
- [x] Custom admin UI branding with company logos ✅
- [ ] Scale testing with performance benchmarks
- [ ] GraphQL schema extension showcase
- [ ] Production deployment strategies

---

*Generated for the Keystone.js repository - Your guide to navigating the codebase!* 🗺️
*Last updated: $(date) - Repository fully set up and ready for development*