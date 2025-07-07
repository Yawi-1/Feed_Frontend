import React from 'react';
import OrderList from './OrderList';
import WarehouseForm from './WarehouseForm';

const SalesAuthorizer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          🚀 Sales Authorizer Dashboard
        </h1>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-700">
            📦 Forwarded Orders
          </h2>
          <OrderList />
        </section>

        <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-700">
            🏢 Add New Warehouse
          </h2>
          <WarehouseForm />
        </section>
      </div>
    </div>
  );
};

export default SalesAuthorizer;
