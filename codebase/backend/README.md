# ⚡ Energy Payment API

A modern Node.js API for managing energy accounts and handling payments. This project offers endpoints to fetch energy accounts (with balances) and process credit card payments — all built with performance and simplicity in mind.

## ✨ Features

- ✅ Fetch energy accounts with up-to-date balances  
- ✅ Handle credit card payments  
- ✅ Use mock services to simulate external dependencies  
- ✅ Full test coverage  
- ✅ Written in TypeScript for safety and clarity  
- ✅ Clean and modular architecture

---

## 🛠️ Tech Stack

- **Node.js** – Runtime  
- **Express.js** – API framework  
- **TypeScript** – Static typing  
- **pnpm** – Package manager  
- **Vitest** – Testing framework  
- **ESLint & Prettier** – Code quality and formatting

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- pnpm v10+

### Installation

```bash
git clone https://github.com/macaja/code-challenge.git
cd backend
pnpm install
```
## 📜 Scripts

Here are the common scripts you’ll use while developing:

| Command               | Description                            |
|-----------------------|----------------------------------------|
| `pnpm start`          | Run the dev server (with hot reload)   |
| `pnpm build`          | Build for production                   |
| `pnpm test`           | Run all tests                          |
| `pnpm test:watch`     | Run tests in watch mode                |
| `pnpm test:coverage`  | Run tests and see coverage report      |
| `pnpm lint`           | Run ESLint to catch issues             |
| `pnpm lint:fix`       | Auto-fix lint issues                   |
| `pnpm format`         | Format code with Prettier              |

---

## 🧪 Testing Approach

We use **Vitest** for testing. All tests are colocated with the code they test for better organization and discoverability.

### Types of Tests

- **Unit Tests** – For isolated functions and logic  
- **Integration Tests** – To test interaction between components  
- **API Tests** – Verify endpoint behavior using Supertest

### Run Tests

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# With coverage
pnpm test:coverage
```

## 🎯 Design Decisions

### Why pnpm?

- 🧠 Smarter dependency management with better disk efficiency  
- 🚫 Prevents hidden dependencies (phantom deps)  
- ⚡ Faster installs  
- 🧩 Built-in monorepo/workspace support  

### Why Vitest?

- 🚀 Extremely fast (especially for TypeScript)  
- 🧪 Great ESM and TypeScript support  
- 🔁 Smooth watch mode with HMR  
- 🔧 Easy migration from Jest  

---

## 🔍 Assumptions

- **Account balance** = sum of all charges (positive or negative)  
- **Due date** = earliest date of any positive charge  
- **Payments** are applied in chronological order of charges  
- **Credit card validation** is basic (format checks only)  
- **Negative charges** represent credits to the account  

---

## 🔮 Future Improvements

- 🔐 Add JWT auth + RBAC  
- 🗃️ Connect to a real database (e.g. PostgreSQL)  
- 📖 Add Swagger/OpenAPI docs  
- 📦 Add pagination for account/charges  
- ⚡ Introduce caching  
- 📈 Add structured logging and monitoring  
- 🧪 Integrate CI/CD (GitHub Actions)  
- 🐳 Add Docker/Docker Compose support  
- 🚦 Rate limiting for abuse prevention  
- 🧩 Add Git hooks for pre-push validations (lint, format, tests)  
- 🧰 Add scripts to bootstrap local dev setup quickly  

## 🤔 Considerations

I have not much experience with Node.js but I decided to do it with Express as a learning opportunity for the challenge.
