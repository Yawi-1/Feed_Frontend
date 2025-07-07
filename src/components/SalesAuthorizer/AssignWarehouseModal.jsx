import React, { useState } from 'react';

const warehouses = ['Delhi Central', 'Mumbai South', 'Bangalore Hub'];

const AssignWarehouseModal = ({ order, onClose, onAssign }) => {
  const [selected, setSelected] = useState('');

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl animate-fade-in">
        <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-4">
          Assign Warehouse for{' '}
          <span className="text-indigo-600">#{order.product}</span>
        </h3>

        <select
          className="w-full border border-gray-300 p-2 rounded mb-4 focus:ring-2 focus:ring-indigo-300"
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">-- Select Warehouse --</option>
          {warehouses.map((wh, i) => (
            <option key={i} value={wh}>
              {wh}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="text-gray-600 hover:underline"
          >
            Cancel
          </button>
          <button
            disabled={!selected}
            onClick={() => selected && onAssign(order.id)}
            className={`px-4 py-2 rounded text-white transition ${
              selected
                ? 'bg-indigo-500 hover:bg-indigo-600'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignWarehouseModal;
