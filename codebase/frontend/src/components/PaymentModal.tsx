'use client';

import type React from 'react';

import { useState } from 'react';
import type { Account } from '../types';
import { usePayment } from '../hooks/usePayment';

interface PaymentModalProps {
  account: Account;
  onClose: () => void;
}

const PaymentModal = ({ account, onClose }: PaymentModalProps) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const { makePayment, loading, error } = usePayment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await makePayment({
      accountId: account.id,
      amount: account.balance,
      cardNumber,
      expiry,
      cvv,
    });

    if (success) {
      setPaymentSuccess(true);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>Payment Successful</h2>
          </div>
          <div className="modal-body">
            <p>Your payment for ${account.balance.toFixed(2)} has been processed.</p>
          </div>
          <div className="modal-footer">
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Make a Payment</h2>
        </div>

        <div className="modal-body">
          <p>Account: {account.id}</p>
          <p style={{ marginBottom: '15px' }}>Balance: ${account.balance.toFixed(2)}</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                id="cardNumber"
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date:</label>
              <input
                id="expiryDate"
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cvv">CVV:</label>
              <input
                id="cvv"
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>

            {error && <p style={{ color: 'red', marginTop: '10px' }}>Error: {error}</p>}
          </form>
        </div>

        <div className="modal-footer">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Processing...' : 'Pay'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
