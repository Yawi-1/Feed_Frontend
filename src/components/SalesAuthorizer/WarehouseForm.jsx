import React, { useState } from 'react';

const WarehouseForm = () => {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitted(true);
    setName('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur rounded-xl shadow-md p-4 sm:p-6 w-full max-w-2xl"
    >
      <label className="block mb-2 text-gray-700 font-semibold text-sm sm:text-base">
        Warehouse Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. Chennai Storage"
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 mb-4"
      />

      <button
        type="submit"
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded hover:scale-105 shadow-lg transition"
      >
        Request Addition
      </button>

      {submitted && (
        <p className="mt-3 text-sm text-green-600">
          ✅ Sent to Admin. Will be visible on approval.
        </p>
      )}
    </form>
  );
};

export default WarehouseForm;
