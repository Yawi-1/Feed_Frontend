import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const SalesManagerOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrder } = useApp();

  const order = orders.find(o => o.id.toString() === id);

  const handleApprove = () => {
    updateOrder(order.id, { status: 'Confirmed' });
    alert(`Order #${order.id} approved successfully.`);
    navigate('/sales-manager/orders');
  };

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-center text-red-500 text-lg font-medium">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Back Button */}
      <div
        className="mb-6 flex items-center gap-2 text-blue-600 cursor-pointer hover:underline"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </div>

      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Order #{order.id}</h1>
      <p className="text-gray-500 mb-6">Review and take action on this order</p>

      {/* Detail Card */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Detail label="Party Name" value={order.partyName} />
          <Detail label="Product" value={order.item} />
          <Detail label="Quantity" value={`${order.quantity} kg`} />
          <Detail label="Total Amount" value={`₹${order.totalAmount.toLocaleString()}`} />
          <Detail label="Advance Paid" value={`₹${order.advancePaid.toLocaleString()}`} />
          <Detail label="Order Date" value={new Date(order.orderDate).toLocaleDateString()} />
          <Detail label="Status" value={order.status} badge />
        </div>

        {/* Notes */}
        {order.notes && (
          <div>
            <p className="text-sm text-gray-600 mb-1">Notes</p>
            <div className="bg-gray-50 p-3 rounded text-sm text-gray-800 border border-dashed border-gray-300">
              {order.notes}
            </div>
          </div>
        )}

        {/* Approve Button */}
        {order.status === 'Processing' && (
          <div className="pt-4">
            <button
              onClick={handleApprove}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2 transition-all"
            >
              <CheckCircle className="h-5 w-5" />
              Approve Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Detail Component
const Detail = ({ label, value, badge }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    {badge ? (
      <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
        {value}
      </span>
    ) : (
      <p className="mt-1 font-medium text-gray-900">{value}</p>
    )}
  </div>
);

export default SalesManagerOrderDetail;
