import React, { useState } from 'react';
import AssignWarehouseModal from './AssignWarehouseModal';

const dummyOrders = [
  { id: 1, product: 'Gaming Laptop', status: 'Pending' },
  { id: 2, product: 'Office Chair', status: 'Pending' },
];

const OrderList = () => {
  const [orders, setOrders] = useState(dummyOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleApprove = (order) => {
    setSelectedOrder(order);
  };

  const handleAssign = (orderId) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: 'Approved' } : order
      )
    );
    setSelectedOrder(null);
  };

  return (
    <div className="bg-white/80 backdrop-blur rounded-xl shadow-lg p-4 sm:p-6 overflow-auto">
      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2">Order ID</th>
              <th>Product</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr
                key={order.id}
                className="hover:bg-purple-50 transition duration-200 border-b"
              >
                <td className="py-3">{order.id}</td>
                <td>{order.product}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="text-center">
                  {order.status === 'Pending' ? (
                    <button
                      onClick={() => handleApprove(order)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-1.5 rounded-full shadow transition"
                    >
                      Approve & Assign
                    </button>
                  ) : (
                    <span className="text-green-600 font-medium">✔ Assigned</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <AssignWarehouseModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onAssign={handleAssign}
        />
      )}
    </div>
  );
};

export default OrderList;
