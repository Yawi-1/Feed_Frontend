import React, { useState } from 'react';

const PlaceNewOrder = () => {
  const [party, setParty] = useState('');
  const [productType, setProductType] = useState('');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  const handleQuantityChange = (e) => {
    const qty = e.target.value;
    setQuantity(qty);
    setTotalAmount(calculateTotal(qty));
  };

  const calculateTotal = (qty) => {
    const rate = 500; // Dummy rate
    return qty * rate;
  };

  const handleSubmit = () => {
    if (party && productType && item && quantity > 0) {
      console.log('Proceed to Advance Payment');
    } else {
      alert('All fields are required');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Place New Order</h1>

        {/* Party Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Party</label>
          <select
            value={party}
            onChange={(e) => setParty(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Party</option>
            <option value="Party A">Party A</option>
            <option value="Party B">Party B</option>
          </select>
        </div>

        {/* Product Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Product Type</option>
            <option value="Product X">Product X</option>
            <option value="Product Y">Product Y</option>
          </select>
        </div>

        {/* Item */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
          <select
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Item</option>
            <option value="Item A">Item A</option>
            <option value="Item B">Item B</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={handleQuantityChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter quantity"
          />
        </div>

        {/* Total Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
          <input
            type="text"
            value={`₹ ${totalAmount}`}
            disabled
            className="w-full border border-gray-200 bg-gray-100 rounded-md px-4 py-2 text-gray-700"
          />
        </div>

        {/* CTA Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 font-semibold text-lg"
        >
          Proceed to Advance Payment
        </button>
      </div>
    </div>
  );
};

export default PlaceNewOrder;
