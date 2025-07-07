import React from 'react';
import { ShoppingCart, CreditCard, Package, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const CustomerDashboard = () => {
  const { currentUser, orders } = useApp();

  const customerOrders = orders.filter(order => order.customerId === currentUser.id);
  const totalOrders = customerOrders.length;
  const totalAdvancePaid = customerOrders.reduce((sum, order) => sum + order.advancePaid, 0);
  const totalDuePending = customerOrders.reduce((sum, order) => sum + order.dueAmount, 0);

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
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {currentUser.name}
        </h1>
        <p className="text-gray-600 mt-1">{currentUser.partyName}</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105">
          <ShoppingCart className="h-8 w-8 mb-3" />
          <h3 className="text-xl font-semibold">Place New Order</h3>
          <p className="text-blue-100 mt-2">Order fresh feed for your animals</p>
        </button>
        
        <button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105">
          <CreditCard className="h-8 w-8 mb-3" />
          <h3 className="text-xl font-semibold">Make Due Payment</h3>
          <p className="text-green-100 mt-2">Clear pending payments</p>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            </div>
            <Package className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Advance Paid</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalAdvancePaid.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Due Pending</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalDuePending.toLocaleString()}</p>
            </div>
            <Clock className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
        </div>
        
        <div className="p-6">
          {customerOrders.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No orders found</p>
          ) : (
            <div className="space-y-4">
              {customerOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{order.item}</h3>
                      <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Quantity</p>
                      <p className="font-medium">{order.quantity} kg</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Amount</p>
                      <p className="font-medium">₹{order.totalAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Advance Paid</p>
                      <p className="font-medium text-green-600">₹{order.advancePaid.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Due Amount</p>
                      <p className="font-medium text-orange-600">₹{order.dueAmount.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {order.dueAmount > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        Due Date: <span className="font-medium">{new Date(order.dueDate).toLocaleDateString()}</span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;