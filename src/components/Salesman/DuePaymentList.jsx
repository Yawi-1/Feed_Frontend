// duePayments = array of dummy due orders
// Each row: View / Pay button

import React, { useState } from 'react';
import DuePaymentModal from './DuePaymentModal';

const dummyDues = [
  { id: 'ORD101', party: 'Party A', total: 10000, due: 3000 },
  { id: 'ORD102', party: 'Party B', total: 8000, due: 8000 },
];

const DuePaymentList = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Due Payments</h1>
      <table className="w-full border rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Order ID</th>
            <th className="p-2">Party</th>
            <th className="p-2">Total</th>
            <th className="p-2">Due</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {dummyDues.map(order => (
            <tr key={order.id} className="border-t">
              <td className="p-2">{order.id}</td>
              <td className="p-2">{order.party}</td>
              <td className="p-2">₹{order.total}</td>
              <td className="p-2 text-red-600 font-bold">₹{order.due}</td>
              <td className="p-2">
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                  Pay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <DuePaymentModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default DuePaymentList;
