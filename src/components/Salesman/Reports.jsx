import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
const Reports = () => {
  const prodVsDispatch = [
  { month: 'Jan', production: 500, dispatch: 450 },
  { month: 'Feb', production: 600, dispatch: 500 },
  { month: 'Mar', production: 700, dispatch: 650 },
  { month: 'Apr', production: 550, dispatch: 500 },
  { month: 'May', production: 750, dispatch: 700 },
  { month: 'Jun', production: 800, dispatch: 760 },
];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow-md p-4 rounded-lg text-center">
          <h3 className="text-lg font-medium">Today’s Sales</h3>
          <p className="text-2xl font-bold text-blue-600">₹ 25,000</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg text-center">
          <h3 className="text-lg font-medium">Dispatch Completed</h3>
          <p className="text-2xl font-bold text-green-600">15</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg text-center">
          <h3 className="text-lg font-medium">Total Due</h3>
          <p className="text-2xl font-bold text-red-600">₹ 12,000</p>
        </div>
      </div>

        <div className="bg-white p-6 rounded shadow">
  <h2 className="text-lg font-semibold mb-4">Production vs Dispatch</h2>
  <ResponsiveContainer width="100%" height={200}>
    <LineChart data={prodVsDispatch}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="production"
        stroke="#3b82f6"
        strokeWidth={2}
        name="Production"
      />
      <Line
        type="monotone"
        dataKey="dispatch"
        stroke="#10b981"
        strokeWidth={2}
        name="Dispatch"
      />
    </LineChart>
  </ResponsiveContainer>
</div>

    </div>
  );
};

export default Reports;
