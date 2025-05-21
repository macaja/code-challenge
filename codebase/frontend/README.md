### Energy Accounts Payment System - Frontend

This is a simple React application that allows users to view their energy accounts, make payments, and see payment history. It was built as part of a take-home challenge to demonstrate frontend development skills.

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **React Router** - For navigation between pages
- **ESLint & Prettier** - Code quality and formatting
- **Husky** - Git hooks for pre-commit checks


## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (v7 or higher)


### Installation

1. Clone the repository

```shellscript
git clone https://github.com/macaja/code-challenge.git
cd frontend
```


2. Install dependencies

```shellscript
pnpm install
```


3. Start the development server

```shellscript
pnpm dev
```


4. Open your browser and navigate to `http://localhost:5173`


## How to Use

### Home Page

The home page displays a list of your energy accounts. Each account is shown as a card with the following information:

- Account type (Electricity or Gas)
- Address
- Meter number
- Balance (color-coded: green for positive, red for negative, grey for zero)


You can:

- Filter accounts by energy type using the dropdown
- Search accounts by address using the search bar
- Click "Make a Payment" to pay your bill


### Payment Modal

When you click "Make a Payment", a modal appears where you can:

- See your account details and balance
- Enter your credit card information
- Submit your payment


After a successful payment, you'll see a confirmation message.

### Payment History

Click "View Payment History" to see a list of all past payments. The payment history page shows:

- Payment date
- Account information
- Payment amount


You can search through payment history by address.

## Development Notes

### Mock Data

The application uses mock data for development and testing. In a real-world scenario, this would be replaced with actual API calls.

To modify the mock data:

1. Open `src/services/accountsService.ts` for account data
2. Open `src/services/paymentsService.ts` for payment history data


### Code Quality

We use Husky to enforce code quality before commits:

- Code formatting with Prettier
- Linting with ESLint
- Running tests


To skip these checks (not recommended):

```shellscript
git commit -m "Your message" --no-verify
```

## Assumptions

During development, I made the following assumptions:

1. The backend API would follow the structure outlined in the challenge (endpoints for accounts, account by ID, and payments)
2. Users would primarily be concerned with viewing their account balance and making payments
3. The application would be used on both desktop and mobile devices
4. The color-coding of balances would help users quickly understand their account status
5. For the payment form, a simple credit card input would be sufficient (in a real app, we'd use a secure payment processor)


## Future Improvements

Given more time, I would add:

1. **Better Form Validation** - Add proper validation for credit card details with error messages
2. **Authentication** - Add user login and authentication
3. **Responsive Design Improvements** - Enhance the mobile experience
4. **Loading States** - Add loading spinners or skeleton screens
5. **Error Handling** - Improve error messages and recovery
6. **Unit Tests** - Add comprehensive test coverage
7. **Accessibility** - Ensure the app is fully accessible
8. **Dark Mode** - Add a theme toggle
9. **Payment Confirmation** - Send email confirmations for payments
10. **Account Details Page** - Add a detailed view for each account


## Project Structure

```plaintext
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── services/         # API service functions
│   ├── styles.css        # Global styles
│   ├── types.ts          # TypeScript interfaces
│   ├── utils.ts          # Utility functions
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── .eslintrc.js          # ESLint configuration
├── .prettierrc           # Prettier configuration
├── .husky/               # Git hooks
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Contributing

Feel free to submit issues or pull requests if you have suggestions for improvements.

## License

This project is licensed under the MIT License.