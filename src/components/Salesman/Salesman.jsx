import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  dashboardStats,
  latestOrders,
  salesmanProfile,
} from './salesmanDummyData';

const monthlyPerformance = [
  { month: 'Jan', orders: 12 },
  { month: 'Feb', orders: 18 },
  { month: 'Mar', orders: 22 },
  { month: 'Apr', orders: 15 },
  { month: 'May', orders: 25 },
  { month: 'Jun', orders: 30 },
  { month: 'Jul', orders: 28 },
];

const Salesman = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Title + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">Salesman Dashboard</h1>
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search orders..."
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiSearch className="absolute top-2.5 left-3 text-gray-400" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Link
          to="/place_order"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
        >
          Place New Order
        </Link>
        <Link
          to="/due_payments"
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
        >
          Make Due Payment
        </Link>
        <Link
          to="/reports"
          className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600"
        >
          View Reports
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: dashboardStats.totalOrders },
          { label: 'Advance Paid', value: `₹ ${dashboardStats.advancePaid.toLocaleString()}` },
          { label: 'Pending Due', value: `₹ ${dashboardStats.pendingDue.toLocaleString()}` },
          { label: 'Commission Earned', value: `₹ ${dashboardStats.commissionEarned.toLocaleString()}` },
        ].map((item, idx) => (
          <div key={idx} className="bg-white shadow-md p-4 rounded-lg">
            <h3 className="text-lg font-medium">{item.label}</h3>
            <p className="text-2xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Profile + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile */}
        <div className="bg-white shadow-md p-4 rounded-lg text-center">
          <img
            src={salesmanProfile.profileImage}
            alt="Salesman"
            className="w-24 h-24 mx-auto rounded-full mb-2 object-cover"
          />
          <h3 className="text-lg font-semibold">{salesmanProfile.name}</h3>
          <p className="text-gray-500 mb-2">{salesmanProfile.role}</p>
          <Link
            to="/salesman/profile"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 inline-block"
          >
            View Profile
          </Link>
        </div>

        {/* Chart */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Monthly Performance</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#4f46e5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest Orders */}
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Latest Orders</h2>
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Order ID</th>
              <th className="p-2">Client</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {latestOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.client}</td>
                <td className="p-2">₹{order.amount.toLocaleString()}</td>
                <td className="p-2">
                  {order.status === 'Paid' ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Salesman;
