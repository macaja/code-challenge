import type { Payment } from '../types';

interface PaymentHistoryProps {
  payments: Payment[];
}

const PaymentHistory = ({ payments }: PaymentHistoryProps) => {
  return (
    <div>
      {payments.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>No payment history found</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Account</th>
              <th>Address</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{new Date(payment.date).toLocaleDateString()}</td>
                <td>{payment.accountName}</td>
                <td>{payment.accountAddress}</td>
                <td>${payment.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
