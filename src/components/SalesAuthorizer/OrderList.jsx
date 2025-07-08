import React, { useState } from 'react';
import AssignWarehouseModal from './AssignWarehouseModal';

const dummyOrders = [
  { id: 1, product: 'Broiler Starter', status: 'Pending' },
  { id: 2, product: 'Duck Feed', status: 'Pending' },
  { id: 3, product: 'Layer Producer', status: 'Approved' },
  { id: 4, product: 'Duck Feed', status: 'Pending' },
  { id: 5, product: 'Broiler Starter', status: 'Approved' },
  { id: 6, product: 'Cattle Feed', status: 'Pending' },
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
    <div className="bg-white/30 backdrop-blur-md shadow-2xl rounded-3xl p-4 sm:p-6 overflow-x-auto transition-all duration-300">
      <div className="min-w-full">
        <table className="w-full text-sm sm:text-base text-left text-gray-800">
          <thead className="border-b-2 border-gray-200 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`border-b border-gray-300 ${
                  index % 2 === 0 ? 'bg-white/50' : 'bg-white/70'
                } hover:bg-gray-200 transition duration-200`}
              >
                <td className="py-3 px-4 font-medium">{order.id}</td>
                <td className="py-3 px-4">{order.product}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                      order.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  {order.status === 'Pending' ? (
                    <button
                      onClick={() => handleApprove(order)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-2 py-1 rounded-full text-[10px] shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Approve & Assign
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold text-sm">
                      ✔ Assigned
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
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