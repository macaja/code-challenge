# Energy Payment API

A modern Node.js API for managing energy accounts and processing payments. This service provides endpoints to fetch energy accounts with their balances and process credit card payments.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Testing Strategy](#testing-strategy)
- [Design Decisions](#design-decisions)
- [Assumptions](#assumptions)
- [Future Improvements](#future-improvements)

## Features

- ✅ Fetch energy accounts with calculated balances
- ✅ Process credit card payments
- ✅ Mock implementations of downstream services
- ✅ Comprehensive test coverage
- ✅ TypeScript for type safety
- ✅ Clean architecture with separation of concerns

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Testing**: Vitest
- **Linting**: ESLint
- **Formatting**: Prettier

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm (v10 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/energy-payment-api.git
   cd energy-payment-api

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Available Scripts

- `pnpm start` - Start the development server with hot reloading
- `pnpm build` - Build the project for production
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage reporting
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm format` - Format code with Prettier

## Testing Strategy

This project uses Vitest for testing. Tests are organized alongside the code they're testing to maintain proximity and discoverability.

### Types of Tests

- **Unit Tests**: Test individual functions and classes in isolation
- **Integration Tests**: Test the interaction between components
- **API Tests**: Test the API endpoints using Supertest

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## Design Decisions

### Why pnpm?

We chose pnpm as our package manager for several reasons:

1. **Disk Space Efficiency**: pnpm uses a content-addressable store, which saves disk space by not duplicating dependencies.
2. **Strict Dependencies**: pnpm creates a more accurate dependency tree, preventing "phantom dependencies".
3. **Performance**: pnpm is generally faster than npm and yarn for installation.
4. **Workspace Support**: Built-in support for monorepos without additional tools.


### Why Vitest?

Vitest was chosen over Jest for these reasons:

1. **Performance**: Vitest is significantly faster than Jest, especially for TypeScript projects.
2. **ESM Support**: Native support for ECMAScript modules without transpilation.
3. **Watch Mode**: Faster watch mode with hot module replacement.
4. **TypeScript Integration**: Better TypeScript support out of the box.
5. **API Compatibility**: Vitest is largely compatible with Jest's API, making migration easy.

## Assumptions

1. **Account Balances**: The balance for an account is the sum of all charges (positive and negative).
2. **Due Date**: The due date is the earliest date of any positive charge.
3. **Payment Processing**: Payments are applied to charges in chronological order.
4. **Credit Card Validation**: Basic validation is performed on credit card numbers.
5. **Negative Charges**: Negative charge amounts represent credits to the account.

## Future Improvements

1. **Authentication & Authorization**: Implement JWT-based authentication and role-based access control.
2. **Database Integration**: Replace mock services with real database connections (e.g., PostgreSQL).
3. **API Documentation**: Add OpenAPI/Swagger documentation for the API.
4. **Pagination**: Add pagination support for account and charge endpoints.
5. **Caching**: Implement response caching to improve performance.
6. **Logging**: Add structured logging
7. **Metrics**: Add metrics for monitoring.
8. **CI/CD Pipeline**: Set up GitHub Actions for continuous integration and deployment.
9. **Docker Support**: Add Docker and Docker Compose for containerization.
10. **Rate Limiting**: Implement rate limiting to prevent abuse.
11. **Add githooks**: Create some ops to validate linting, prettier and tests are satisfied before pushing.
12. **ops**: Add operation scripts so devs can easily setup local environment and get started easily.