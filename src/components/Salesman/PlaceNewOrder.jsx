import React, { useState } from 'react';

const PlaceNewOrder = () => {
  const [party, setParty] = useState('');
  const [productType, setProductType] = useState('');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    setTotalAmount(calculateTotal());
  };

  const calculateTotal = () => {
    // Assuming some logic to calculate total based on item and quantity
    return 500 * quantity;
  };

  const handleSubmit = () => {
    if (party && productType && item && quantity) {
      console.log('Proceed to Advance Payment');
    } else {
      alert('All fields are required');
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Place New Order</h1>

      <div className="space-y-4">
        {/* Party Selection */}
        <div>
          <label className="block text-sm">Party Selection</label>
          <select
            value={party}
            onChange={(e) => setParty(e.target.value)}
            className="border rounded-md w-full p-2"
          >
            <option value="">Select Party</option>
            <option value="Party A">Party A</option>
            <option value="Party B">Party B</option>
          </select>
        </div>

        {/* Product Type */}
        <div>
          <label className="block text-sm">Product Type</label>
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="border rounded-md w-full p-2"
          >
            <option value="">Select Product Type</option>
            <option value="Product X">Product X</option>
            <option value="Product Y">Product Y</option>
          </select>
        </div>

        {/* Item */}
        <div>
          <label className="block text-sm">Item</label>
          <select
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="border rounded-md w-full p-2"
          >
            <option value="">Select Item</option>
            <option value="Item A">Item A</option>
            <option value="Item B">Item B</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="border rounded-md w-full p-2"
          />
        </div>

        {/* Total Amount */}
        <div>
          <label className="block text-sm">Total Amount</label>
          <input
            type="text"
            value={`₹ ${totalAmount}`}
            disabled
            className="border rounded-md w-full p-2 bg-gray-200"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-3 rounded-md w-full hover:bg-blue-600"
        >
          Proceed to Advance Payment
        </button>
      </div>
    </div>
  );
};

export default PlaceNewOrder;
