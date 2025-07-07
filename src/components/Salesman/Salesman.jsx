import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Salesman = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Salesman Dashboard</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600">
          Make Due Payment
        </button>
        <button className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600">
          View Reports
        </button>
      </div>

      {/* Dashboard Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-lg font-medium">Total Orders</h3>
          <p className="text-2xl font-bold mt-2">120</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-lg font-medium">Advance Paid</h3>
          <p className="text-2xl font-bold mt-2">₹ 50,000</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-lg font-medium">Pending Due</h3>
          <p className="text-2xl font-bold mt-2">₹ 20,000</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-lg font-medium">Commission Earned</h3>
          <p className="text-2xl font-bold mt-2">₹ 12,000</p>
        </div>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Orders */}
        <div className="lg:col-span-2 bg-white shadow-md p-4 rounded-lg">
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
              {[1, 2, 3, 4].map((id) => (
                <tr key={id} className="border-b hover:bg-gray-50">
                  <td className="p-2">ORD00{id}</td>
                  <td className="p-2">Client {id}</td>
                  <td className="p-2">₹{id * 5000}</td>
                  <td className="p-2">
                    {id % 2 === 0 ? (
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

        {/* Profile & Chart */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white shadow-md p-4 rounded-lg text-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Salesman"
              className="w-24 h-24 mx-auto rounded-full mb-2"
            />
            <h3 className="text-lg font-semibold">Rahul Sharma</h3>
            <p className="text-gray-500">Sales Executive</p>
            <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              View Profile
            </button>
          </div>

          {/* Chart Placeholder */}
          <div className="bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Monthly Performance</h2>
            <div className="h-32 flex items-center justify-center text-gray-400 italic">
              [Chart Placeholder]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salesman;
