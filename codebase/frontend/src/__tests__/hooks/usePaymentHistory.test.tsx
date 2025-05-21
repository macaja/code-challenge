import { describe, it, expect, vi, beforeEach } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { usePaymentHistory } from "../../hooks/usePaymentHistory"
import * as paymentsService from "../../services/paymentsService"

vi.mock("../../services/paymentsService", () => ({
  fetchPaymentHistory: vi.fn(),
}))

describe("usePaymentHistory", () => {
  const mockPayments = [
    {
      id: "pay-001",
      accountId: "acc-001",
      accountName: "123 Main St",
      accountAddress: "123 Main St, Anytown, USA",
      amount: 85.42,
      date: "2023-04-15T10:30:00Z",
    },
    {
      id: "pay-002",
      accountId: "acc-002",
      accountName: "456 Oak Ave",
      accountAddress: "456 Oak Ave, Somewhere, USA",
      amount: 120.75,
      date: "2023-04-20T14:15:00Z",
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("fetches payment history and returns it", async () => {
    vi.mocked(paymentsService.fetchPaymentHistory).mockResolvedValue(mockPayments)

    const { result } = renderHook(() => usePaymentHistory())

    expect(result.current.loading).toBe(true)
    expect(result.current.payments).toEqual([])
    expect(result.current.error).toBeNull()

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.payments).toEqual(mockPayments)
    expect(result.current.error).toBeNull()
    expect(paymentsService.fetchPaymentHistory).toHaveBeenCalledTimes(1)
  })

  it("handles errors when fetching payment history", async () => {
    const errorMessage = "Failed to fetch payment history"
    vi.mocked(paymentsService.fetchPaymentHistory).mockRejectedValue(new Error(errorMessage))

    const { result } = renderHook(() => usePaymentHistory())

    expect(result.current.loading).toBe(true)
    expect(result.current.payments).toEqual([])
    expect(result.current.error).toBeNull()

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.payments).toEqual([])
    expect(result.current.error).toBe("Failed to fetch payment history")
    expect(paymentsService.fetchPaymentHistory).toHaveBeenCalledTimes(1)
  })
})
