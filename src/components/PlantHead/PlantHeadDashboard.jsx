import React, { useState } from 'react';
import { Factory, Package, Truck, TrendingUp, Calendar, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const PlantHeadDashboard = () => {
  const { production, orders, updateProduction, updateOrder } = useApp();
  const [showProductionForm, setShowProductionForm] = useState(false);
  const [productionData, setProductionData] = useState({
    product: '',
    quantity: '',
    date: new Date().toISOString().split('T')[0]
  });

  const dispatchableOrders = orders.filter(order => order.status === 'Confirmed');
  const totalProductionToday = production.filter(p => p.date === new Date().toISOString().split('T')[0])
    .reduce((sum, p) => sum + p.quantity, 0);

  const handleAddProduction = () => {
    if (productionData.product && productionData.quantity) {
      const newProduction = {
        id: `PROD_ENTRY${Date.now()}`,
        ...productionData,
        quantity: parseInt(productionData.quantity),
        plantHead: 'EMP004'
      };
      updateProduction(newProduction);
      setProductionData({ product: '', quantity: '', date: new Date().toISOString().split('T')[0] });
      setShowProductionForm(false);
    }
  };

  const handleDispatchOrder = (orderId) => {
    updateOrder(orderId, { status: 'Dispatched' });
  };

  const getStatusColor = (status) => {
    const colors = {
      'Confirmed': 'bg-blue-100 text-blue-800',
      'Dispatched': 'bg-green-100 text-green-800',
      'Delivered': 'bg-emerald-100 text-emerald-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Plant Head Dashboard</h1>
        <p className="text-gray-600 mt-1">Track production and manage dispatch operations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Production</p>
              <p className="text-2xl font-bold text-gray-900">{totalProductionToday} kg</p>
            </div>
            <Factory className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ready for Dispatch</p>
              <p className="text-2xl font-bold text-gray-900">{dispatchableOrders.length}</p>
            </div>
            <Package className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Production</p>
              <p className="text-2xl font-bold text-gray-900">{production.reduce((sum, p) => sum + p.quantity, 0)} kg</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Dispatched Orders</p>
              <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === 'Dispatched').length}</p>
            </div>
            <Truck className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Production Entry */}
      <div className="bg-white rounded-xl shadow-md mb-8">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Production Entry</h2>
          <button
            onClick={() => setShowProductionForm(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Production</span>
          </button>
        </div>
        
        {showProductionForm && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
                <select
                  value={productionData.product}
                  onChange={(e) => setProductionData({...productionData, product: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Product</option>
                  <option value="Broiler Starter">Broiler Starter</option>
                  <option value="Broiler Finisher">Broiler Finisher</option>
                  <option value="Layer Feed">Layer Feed</option>
                  <option value="Dairy Concentrate">Dairy Concentrate</option>
                  <option value="Calf Starter">Calf Starter</option>
                  <option value="Buffalo Feed">Buffalo Feed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (kg)</label>
                <input
                  type="number"
                  value={productionData.quantity}
                  onChange={(e) => setProductionData({...productionData, quantity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter quantity"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={productionData.date}
                  onChange={(e) => setProductionData({...productionData, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <button
                onClick={handleAddProduction}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
              >
                Save Production
              </button>
              <button
                onClick={() => setShowProductionForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        <div className="p-6">
          <div className="space-y-4">
            {production.slice(-5).reverse().map((prod) => (
              <div key={prod.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{prod.product}</p>
                  <p className="text-sm text-gray-600">{new Date(prod.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{prod.quantity} kg</p>
                  <p className="text-sm text-gray-600">Production</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dispatch Management */}
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Dispatch Management</h2>
        </div>
        
        <div className="p-6">
          {dispatchableOrders.length === 0 ? (
            <div className="text-center py-12">
              <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No orders ready for dispatch</p>
            </div>
          ) : (
            <div className="space-y-4">
              {dispatchableOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6">
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
                      <p className="text-sm text-gray-600">Warehouse</p>
                      <p className="font-medium">{order.warehouse || 'Not assigned'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Due Date</p>
                      <p className="font-medium">{new Date(order.dueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDispatchOrder(order.id)}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all flex items-center space-x-2"
                    >
                      <Truck className="h-4 w-4" />
                      <span>Mark as Dispatched</span>
                    </button>
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

export default PlantHeadDashboard;