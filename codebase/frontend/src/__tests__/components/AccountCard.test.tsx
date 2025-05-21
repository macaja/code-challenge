"use client"

import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import AccountCard from "../../components/AccountCard"
import { AccountType } from "../../types"

vi.mock("../../components/PaymentModal", () => ({
  default: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="payment-modal">
      <button onClick={onClose}>Close</button>
    </div>
  ),
}))

describe("AccountCard", () => {
  const mockAccount = {
    id: "acc-001",
    type: AccountType.ELECTRICITY,
    address: "123 Main St, Anytown, USA",
    meterNumber: "E-12345",
    balance: 95.42,
  }

  it("renders account information correctly", () => {
    render(<AccountCard account={mockAccount} />)

    expect(screen.getByText(/Account acc-001/i)).toBeInTheDocument()
    expect(screen.getByText(/Type: ELECTRICITY/i)).toBeInTheDocument()
    expect(screen.getByText(/Address: 123 Main St, Anytown, USA/i)).toBeInTheDocument()
    expect(screen.getByText(/Meter Number: E-12345/i)).toBeInTheDocument()
    expect(screen.getByText(/Balance: \$95.42/i)).toBeInTheDocument()
  })

  it("displays balance in green when positive", () => {
    render(<AccountCard account={mockAccount} />)

    const balanceElement = screen.getByText(/Balance: \$95.42/i)
    expect(balanceElement).toHaveStyle("color: rgb(0, 128, 0)")
  })

  it("displays balance in red when negative", () => {
    const negativeBalanceAccount = {
      ...mockAccount,
      balance: -50.25,
    }

    render(<AccountCard account={negativeBalanceAccount} />)

    const balanceElement = screen.getByText(/Balance: \$-50.25/i)
    expect(balanceElement).toHaveStyle("color: rgb(255, 0, 0)")
  })

  it("displays balance in grey when zero", () => {
    const zeroBalanceAccount = {
      ...mockAccount,
      balance: 0,

    }

    render(<AccountCard account={zeroBalanceAccount} />)

    const balanceElement = screen.getByText(/Balance: \$0.00/i)
    expect(balanceElement).toHaveStyle("color: rgb(128, 128, 128)")
  })

  it('opens payment modal when "Make a Payment" button is clicked', () => {
    render(<AccountCard account={mockAccount} />)

    expect(screen.queryByTestId("payment-modal")).not.toBeInTheDocument()

    fireEvent.click(screen.getByText("Make a Payment"))

    expect(screen.getByTestId("payment-modal")).toBeInTheDocument()
  })

  it("closes payment modal when close button is clicked", () => {
    render(<AccountCard account={mockAccount} />)

    fireEvent.click(screen.getByText("Make a Payment"))
    expect(screen.getByTestId("payment-modal")).toBeInTheDocument()

    fireEvent.click(screen.getByText("Close"))
    expect(screen.queryByTestId("payment-modal")).not.toBeInTheDocument()
  })
})
