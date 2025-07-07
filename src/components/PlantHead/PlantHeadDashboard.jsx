import React, { useState } from 'react';
import { Factory, Package, Truck, TrendingUp, Plus, TruckIcon } from 'lucide-react';
import DispatchSlip from './DispatchSlip';
import TransportEntry from './TransportEntry';
const PlantHeadDashboard = () => {
  const [showProductionForm, setShowProductionForm] = useState(false);
  const [dispatch,setDispatch] = useState(false);
  const [production, setProduction] = useState([
    { id: 'P001', product: 'Layer Feed', quantity: 100, date: '2025-07-07' },
    { id: 'P002', product: 'Dairy Concentrate', quantity: 50, date: '2025-07-07' }
  ]);
  const [orders, setOrders] = useState([
    { id: 'O001', partyName: 'ABC Traders', item: 'Broiler Starter', quantity: 200, status: 'Confirmed', dueDate: '2025-07-09', warehouse: 'WH1' },
    { id: 'O002', partyName: 'XYZ Feeds', item: 'Layer Feed', quantity: 150, status: 'Dispatched', dueDate: '2025-07-08', warehouse: 'WH2' }
  ]);
  const [productionData, setProductionData] = useState({ product: '', quantity: '', date: new Date().toISOString().split('T')[0] });

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
      setProduction(prev => [...prev, newProduction]);
      setProductionData({ product: '', quantity: '', date: new Date().toISOString().split('T')[0] });
      setShowProductionForm(false);
    }
  };

  const handleDispatchOrder = (orderId) => {
    setOrders(prev => prev.map(order => order.id === orderId ? { ...order, status: 'Dispatched' } : order));
  };

  const getStatusColor = (status) => {
    const colors = {
      'Confirmed': 'bg-blue-100 text-blue-800',
      'Dispatched': 'bg-green-100 text-green-800',
      'Delivered': 'bg-emerald-100 text-emerald-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const [transport,setTransport] = useState(false)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Plant Head Dashboard</h1>
      <p className="text-gray-600 mb-6">Track production and manage dispatch operations</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Today's Production" value={`${totalProductionToday} kg`} icon={<Factory className="h-8 w-8 text-blue-500" />} />
        <StatCard title="Ready for Dispatch" value={dispatchableOrders.length} icon={<Package className="h-8 w-8 text-green-500" />} />
        <StatCard title="Total Production" value={`${production.reduce((sum, p) => sum + p.quantity, 0)} kg`} icon={<TrendingUp className="h-8 w-8 text-purple-500" />} />
        <StatCard title="Dispatched Orders" value={orders.filter(o => o.status === 'Dispatched').length} icon={<Truck className="h-8 w-8 text-orange-500" />} />
      </div>

      <div className="bg-white rounded-xl shadow-md mb-8">
      
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Production Entry</h2>
          <button onClick={() => setShowProductionForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
            <Plus className="h-4 w-4 mr-1" /> Add Production
          </button>
        </div>
        {showProductionForm && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Product</label>
                <select value={productionData.product} onChange={(e) => setProductionData({...productionData, product: e.target.value})} className="w-full border rounded px-3 py-2">
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
                <label className="block text-sm font-medium mb-2">Quantity (kg)</label>
                <input type="number" value={productionData.quantity} onChange={(e) => setProductionData({...productionData, quantity: e.target.value})} className="w-full border rounded px-3 py-2" placeholder="Enter quantity" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input type="date" value={productionData.date} onChange={(e) => setProductionData({...productionData, date: e.target.value})} className="w-full border rounded px-3 py-2" />
              </div>
            </div>
            <div className="mt-4 flex space-x-3">
              <button onClick={handleAddProduction} className="bg-green-600 text-white px-4 py-2 rounded">Save Production</button>
              <button onClick={() => setShowProductionForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        )}
        <div className="p-6">
          {production.slice(-5).reverse().map(p => (
            <div key={p.id} className="flex justify-between p-4 bg-gray-50 rounded-lg mb-2">
              <div>
                <p className="font-medium">{p.product}</p>
                <p className="text-sm text-gray-600">{new Date(p.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{p.quantity} kg</p>
                <p className="text-sm text-gray-600">Production</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Dispatch Management</h2>
        </div>
         <button onClick={() => setTransport(!transport)} className=" m-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
            <TruckIcon className="h-4 w-4 mr-1" /> Add Transport
          </button>
         {transport && <TransportEntry/>}
        <div className="p-6">
          {dispatchableOrders.length === 0 ? (
            <div className="text-center py-12">
              <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <DispatchSlip/>
            </div>
          ) : (
            dispatchableOrders.map(order => (
              <div key={order.id} className="border rounded-lg p-6 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{order.partyName}</h3>
                    <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>{order.status}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div><p className="text-sm text-gray-600">Product</p><p className="font-medium">{order.item}</p></div>
                  <div><p className="text-sm text-gray-600">Quantity</p><p className="font-medium">{order.quantity} kg</p></div>
                  <div><p className="text-sm text-gray-600">Warehouse</p><p className="font-medium">{order.warehouse}</p></div>
                  <div><p className="text-sm text-gray-600">Due Date</p><p className="font-medium">{new Date(order.dueDate).toLocaleDateString()}</p></div>
                </div>
                <div className="flex justify-end">
                  <button onClick={() => handleDispatchOrder(order.id)} className="bg-green-600 text-white px-4 py-2 rounded flex items-center">
                    <Truck className="h-4 w-4 mr-1" /> Mark as Dispatched
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
       
      </div>

    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      {icon}
    </div>
  </div>
);

export default PlantHeadDashboard;