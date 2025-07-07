import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Make sure it's at the top

import {
  CheckCircle,
  Clock,
  ArrowRight,
  Package,
  TrendingUp,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const SalesManagerDashboard = () => {
  const { orders, updateOrder } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Filters
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.partyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm);
    const matchesDate = selectedDate
      ? new Date(order.orderDate).toDateString() === new Date(selectedDate).toDateString()
      : true;
    return matchesSearch && matchesDate;
  });

  const pendingOrders = filteredOrders.filter(order => order.status === 'Processing');
  const forwardedOrders = filteredOrders.filter(order => order.status === 'Confirmed');

  const totalOrdersToday = orders.filter(order =>
    new Date(order.orderDate).toDateString() === new Date().toDateString()
  ).length;

  const handleForwardOrder = (orderId) => {
    updateOrder(orderId, { status: 'Confirmed' });
    alert(`Order ${orderId} forwarded successfully!`);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Processing': 'bg-yellow-100 text-yellow-800',
      'Confirmed': 'bg-blue-100 text-blue-800',
      'Dispatched': 'bg-green-100 text-green-800',
      'Delivered': 'bg-emerald-100 text-emerald-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}



      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Manager Dashboard</h1>
          <p className="text-gray-600 mt-1">Review and forward orders to authorization</p>
        </div>
        <Link
          to="/sales-manager/orders"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
        >
          View All Orders
        </Link>
      </div>


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card title="Pending Orders" count={pendingOrders.length} icon={<Clock className="h-8 w-8 text-orange-500" />} />
        <Card title="Forwarded Orders" count={forwardedOrders.length} icon={<CheckCircle className="h-8 w-8 text-green-500" />} />
        <Card title="Today's Orders" count={totalOrdersToday} icon={<TrendingUp className="h-8 w-8 text-blue-500" />} />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 w-full">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Party or Order ID"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <input
          type="date"
          className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Pending Orders */}
      <Section title="Orders Pending Review">
        {pendingOrders.length === 0 ? (
          <EmptyState message="No orders pending review" />
        ) : (
          <div className="space-y-4">
            {pendingOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onForward={handleForwardOrder}
                getStatusColor={getStatusColor}
              />
            ))}
          </div>
        )}
      </Section>

      {/* Forwarded Orders */}
      <Section title="Recently Forwarded Orders">
        {forwardedOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No forwarded orders yet</p>
        ) : (
          <div className="space-y-4">
            {forwardedOrders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900">{order.partyName}</h3>
                    <p className="text-sm text-gray-600">Order ID: #{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{order.totalAmount.toLocaleString()}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
};

export default SalesManagerDashboard;

const Card = ({ title, count, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center border border-gray-100">
    <div>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{count}</p>
    </div>
    {icon}
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-md mb-8">
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const EmptyState = ({ message }) => (
  <div className="text-center py-12">
    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <p className="text-gray-500">{message}</p>
  </div>
);

const OrderCard = ({ order, onForward, getStatusColor }) => (
  <div className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="font-semibold text-gray-900 text-lg">{order.partyName}</h3>
        <p className="text-sm text-gray-600">Order ID: #{order.id}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
        {order.status}
      </span>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <Detail label="Product" value={order.item} />
      <Detail label="Quantity" value={`${order.quantity} kg`} />
      <Detail label="Total Amount" value={`₹${order.totalAmount.toLocaleString()}`} />
      <Detail label="Advance Paid" value={`₹${order.advancePaid.toLocaleString()}`} className="text-green-600" />
    </div>

    {order.notes && (
      <div className="mb-4 bg-gray-50 p-3 rounded-md border border-dashed border-gray-200">
        <p className="text-sm text-gray-600">Notes:</p>
        <p className="text-sm text-gray-800">{order.notes}</p>
      </div>
    )}

    <div className="flex justify-between items-center mt-4">
      <p className="text-sm text-gray-500">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
      <button
        onClick={() => onForward(order.id)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-md transition-all duration-200"
      >
        Forward to Authorization <ArrowRight className="inline h-4 w-4 ml-1" />
      </button>
    </div>

    {/* Progress Steps */}
    <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 font-medium">
      <Step label="Processing" active={order.status === 'Processing'} />
      <ArrowRight className="h-3 w-3" />
      <Step label="Confirmed" active={order.status === 'Confirmed'} />
      <ArrowRight className="h-3 w-3" />
      <Step label="Dispatched" active={order.status === 'Dispatched'} />
    </div>
  </div>
);

const Step = ({ label, active }) => (
  <span className={`px-2 py-1 rounded-full ${active ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-400'}`}>
    {label}
  </span>
);

const Detail = ({ label, value, className }) => (
  <div>
    <p className="text-sm text-gray-600">{label}</p>
    <p className={`font-medium ${className}`}>{value}</p>
  </div>
);
