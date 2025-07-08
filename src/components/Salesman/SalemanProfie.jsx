import React from 'react';
import { salesmanProfile, dashboardStats } from './salesmanDummyData';

const SalesmanProfile = () => {
  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-2 text-center sm:text-left">Salesman Profile</h1>

      {/* Profile Card */}
      <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-8 border border-gray-100">
        {/* Profile Image */}
        <div className="flex-shrink-0 flex flex-col items-center w-full md:w-auto">
          <img
            src={salesmanProfile.profileImage}
            alt="Profile"
            className="rounded-full w-32 h-32 border-4 border-blue-200 shadow"
          />
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full md:w-auto">
            Edit Profile
          </button>
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-4 w-full">
          <h2 className="text-2xl font-semibold text-center md:text-left">{salesmanProfile.name}</h2>
          <p className="text-gray-600 text-center md:text-left">{salesmanProfile.role}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mt-4">
            <div>
              <p className="font-medium">Email:</p>
              <p>{salesmanProfile.email}</p>
            </div>
            <div>
              <p className="font-medium">Phone:</p>
              <p>{salesmanProfile.phone}</p>
            </div>
            <div>
              <p className="font-medium">Address:</p>
              <p>{salesmanProfile.address}</p>
            </div>
            <div>
              <p className="font-medium">Joining Date:</p>
              <p>{salesmanProfile.joiningDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center border border-blue-200">
          <h3 className="text-lg font-medium text-blue-800">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{dashboardStats.totalOrders}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg text-center border border-green-200">
          <h3 className="text-lg font-medium text-green-800">Advance Collected</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">₹ {dashboardStats.advancePaid.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg text-center border border-red-200">
          <h3 className="text-lg font-medium text-red-800">Pending Dues</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">₹ {dashboardStats.pendingDue.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg text-center border border-purple-200">
          <h3 className="text-lg font-medium text-purple-800">Commission Earned</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">₹ {dashboardStats.commissionEarned.toLocaleString()}</p>
        </div>
      </div>

      {/* Placeholder for more details */}
      <div className="bg-white shadow rounded-xl p-6 mt-2 border border-gray-100">
        <h2 className="text-xl font-semibold mb-2">Performance Summary</h2>
        <p className="text-gray-600">
          {salesmanProfile.name} has consistently achieved sales targets and demonstrated strong
          customer relationship skills. He is responsible for managing key
          clients and resolving order-related issues efficiently.
        </p>
      </div>
    </div>
  );
};

export default SalesmanProfile;
