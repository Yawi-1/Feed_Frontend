import React from 'react';
import { CheckCircle, Clock, ArrowRight, Package, TrendingUp, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const SalesManagerDashboard = () => {
  const { orders, updateOrder } = useApp();

  const pendingOrders = orders.filter(order => order.status === 'Processing');
  const forwardedOrders = orders.filter(order => order.status === 'Confirmed');
  const totalOrdersToday = orders.filter(order => 
    new Date(order.orderDate).toDateString() === new Date().toDateString()
  ).length;

  const handleForwardOrder = (orderId) => {
    updateOrder(orderId, { status: 'Confirmed' });
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sales Manager Dashboard</h1>
        <p className="text-gray-600 mt-1">Review and forward orders to authorization</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-900">{pendingOrders.length}</p>
            </div>
            <Clock className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Forwarded Orders</p>
              <p className="text-2xl font-bold text-gray-900">{forwardedOrders.length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Orders</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrdersToday}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Pending Orders for Review */}
      <div className="bg-white rounded-xl shadow-md mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Orders Pending Review</h2>
        </div>
        
        <div className="p-6">
          {pendingOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No orders pending review</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{order.partyName}</h3>
                      <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Product</p>
                      <p className="font-medium">{order.item}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Quantity</p>
                      <p className="font-medium">{order.quantity} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="font-medium">₹{order.totalAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Advance Paid</p>
                      <p className="font-medium text-green-600">₹{order.advancePaid.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {order.notes && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Notes:</p>
                      <p className="text-sm bg-gray-50 p-2 rounded">{order.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Order Date: {new Date(order.orderDate).toLocaleDateString()}
                    </div>
                    <button
                      onClick={() => handleForwardOrder(order.id)}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center space-x-2"
                    >
                      <span>Forward to Authorization</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Forwarded Orders */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recently Forwarded Orders</h2>
        </div>
        
        <div className="p-6">
          {forwardedOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No forwarded orders yet</p>
          ) : (
            <div className="space-y-4">
              {forwardedOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">{order.partyName}</h3>
                      <p className="text-sm text-gray-600">Order ID: {order.id}</p>
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
        </div>
      </div>
    </div>
  );
};

export default SalesManagerDashboard;