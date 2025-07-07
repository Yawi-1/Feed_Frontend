import React from 'react';

const dispatchedOrders = [
  { id: 'O002', partyName: 'XYZ Feeds',vehicleNo: 'JK01A1234', driver: 'Ramesh', item: 'Layer Feed', quantity: 150, warehouse: 'WH2', date: '2025-07-07' },
];

const DispatchSlip = () => (
  <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
    <h2 className="text-xl font-semibold mb-4">Dispatch Slips</h2>
    {dispatchedOrders.map((order) => (
      <div key={order.id} className="border rounded-lg p-4 mb-4">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Party:</strong> {order.partyName}</p>
        <p><strong>Item:</strong> {order.item}</p>
        <p><strong>Quantity:</strong> {order.quantity} kg</p>
        <p><strong>Warehouse:</strong> {order.warehouse}</p>
        <p><strong>Vehicle No.:</strong> {order.vehicleNo}</p>
        <p><strong>Driver Name:</strong> {order.driver}</p>
        <p><strong>Date:</strong> {order.date}</p>
      </div>
    ))}
  </div>
);

export default DispatchSlip;
