import React from 'react';
import { Link } from 'react-router-dom';

const Salesman = () => {
  return (
    <div className="flex flex-col p-8 space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-semibold">Dashboard</h1>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Link to='/place_order' className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">Place New Order</Link>
        <button className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600">Make Due Payment</button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-xl font-medium">Total Orders Placed</h3>
          <p className="text-3xl">120</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-xl font-medium">Total Advance Paid</h3>
          <p className="text-3xl">₹ 50,000</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-xl font-medium">Total Due Pending</h3>
          <p className="text-3xl">₹ 20,000</p>
        </div>
      </div>
    </div>
  );
};

export default Salesman;
