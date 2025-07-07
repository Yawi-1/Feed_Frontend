import React, { useState } from 'react';

const dummyTransports = [
  { id: 'T001', vehicleNo: 'JK01A1234', driver: 'Ramesh', photo: 'truck.jpg', date: '2025-07-07' }
];

const TransportEntry = () => {
  const [form, setForm] = useState({ vehicleNo: '', driver: '', photo: '' });
  const [transports, setTransports] = useState(dummyTransports);

  const handleAdd = () => {
    if (form.vehicleNo && form.driver) {
      const newEntry = { ...form, id: `TRANS${Date.now()}`, date: new Date().toISOString().split('T')[0] };
      setTransports(prev => [...prev, newEntry]);
      setForm({ vehicleNo: '', driver: '', photo: '' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Transport Entry</h2>
      <div className="space-y-4 mb-6">
        <input placeholder="Vehicle Number" value={form.vehicleNo} onChange={e => setForm({...form, vehicleNo: e.target.value})} className="w-full border p-2 rounded" />
        <input placeholder="Driver Name" value={form.driver} onChange={e => setForm({...form, driver: e.target.value})} className="w-full border p-2 rounded" />
        <input type="file" onChange={e => setForm({...form, photo: e.target.files[0]?.name || ''})} className="w-full border p-2 rounded" />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">Add Transport</button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Recent Entries</h3>
        <ul>
          {transports.map(t => (
            <li key={t.id} className="flex justify-between border-b py-2">
              <span>{t.vehicleNo} ({t.driver})</span>
              <span className="text-sm text-gray-500">{t.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransportEntry;
