import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import FilterByEnergyType from "../../components/FilterByEnergyType"
import { AccountType } from "../../types"

describe("FilterByEnergyType", () => {
  it("renders the filter dropdown", () => {
    const mockOnFilterChange = vi.fn()
    render(<FilterByEnergyType onFilterChange={mockOnFilterChange} />)

    expect(screen.getByRole("combobox")).toBeInTheDocument()
    expect(screen.getByText("All Energy Types")).toBeInTheDocument()
  })

  it("displays all energy type options", () => {
    const mockOnFilterChange = vi.fn()
    render(<FilterByEnergyType onFilterChange={mockOnFilterChange} />)

    const selectElement = screen.getByRole("combobox")
    expect(selectElement).toBeInTheDocument()

    expect(screen.getByText("All Energy Types")).toBeInTheDocument()
    expect(screen.getByText(AccountType.ELECTRICITY)).toBeInTheDocument()
    expect(screen.getByText(AccountType.GAS)).toBeInTheDocument()
  })

  it("calls onFilterChange with the selected value", () => {
    const mockOnFilterChange = vi.fn()
    render(<FilterByEnergyType onFilterChange={mockOnFilterChange} />)

    const selectElement = screen.getByRole("combobox")

    fireEvent.change(selectElement, { target: { value: AccountType.ELECTRICITY } })
    expect(mockOnFilterChange).toHaveBeenCalledWith(AccountType.ELECTRICITY)

    fireEvent.change(selectElement, { target: { value: AccountType.GAS } })
    expect(mockOnFilterChange).toHaveBeenCalledWith(AccountType.GAS)

    fireEvent.change(selectElement, { target: { value: "" } })
    expect(mockOnFilterChange).toHaveBeenCalledWith(undefined)
  })
})
