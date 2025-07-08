import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Search, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SalesManagerOrders = () => {
  const { orders } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.partyName.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toString().includes(search);
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Orders</h1>
        <p className="text-gray-600">Browse and manage orders handled by Sales Manager</p>
      </div>

      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
        <div className="flex items-center gap-2 w-full md:w-3/5">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Party or Order ID"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="border border-gray-300 px-3 py-2 rounded-md w-full md:w-2/5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Processing">Processing</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>


      {/* Scrollable Table */}
      <div className=" border-gray-300 rounded-lg shadow overflow-hidden">
        <div className="bg-gray-100 sticky top-0 z-10">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Party</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Item</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Qty</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          <table className="min-w-full">
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t  border-gray-300 hover:bg-gray-50 transition">
                    <td className="px-4 py-3">#{order.id}</td>
                    <td className="px-4 py-3">{order.partyName}</td>
                    <td className="px-4 py-3">{order.item}</td>
                    <td className="px-4 py-3">{order.quantity} kg</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                      <Link
                        to={`/sales-manager/orders/${order.id}`}
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        View <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                      <button
                        className="inline-flex items-center text-sm text-yellow-500 hover:text-yellow-600"
                        onClick={() => alert(`Edit Order ${order.id}`)}
                      >
                        <Pencil className="h-4 w-4 mr-1" /> Approve
                      </button>
                      <button
                        className="inline-flex items-center text-sm text-red-500 hover:text-red-600"
                        onClick={() => confirm('Delete this order?') && alert(`Delete Order ${order.id}`)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Cancel
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesManagerOrders;
