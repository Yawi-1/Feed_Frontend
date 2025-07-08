import React, { useState } from 'react';

const DuePaymentModal = ({ order, onClose }) => {
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState('Cash');

  const handleSubmit = () => {
    if (!amount || isNaN(amount)) {
      alert('Enter valid amount');
      return;
    }

    console.log(`Paid ₹${amount} for ${order.id} via ${mode}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Pay Due for {order.id}</h2>

        <p className="mb-2 text-sm text-gray-500">Party: {order.party}</p>
        <p className="mb-4 text-sm text-gray-500">Due Amount: ₹{order.due}</p>

        <input
          type="number"
          placeholder="Enter amount"
          className="w-full p-2 border rounded mb-4"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="w-full p-2 border rounded mb-4"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option>Cash</option>
          <option>UPI</option>
          <option>Bank Transfer</option>
        </select>

        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit Payment
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuePaymentModal;
