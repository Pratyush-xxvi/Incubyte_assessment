import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

export const AdminVehicleModal = ({ vehicle, onClose, onSuccess }) => {
  const isEditing = !!vehicle;
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    category: 'SUV',
    price: '',
    quantity: 1,
    year: 2024,
    vin: '',
    imageUrl: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vehicle) {
      setFormData({
        make: vehicle.make || '',
        model: vehicle.model || '',
        category: vehicle.category || 'SUV',
        price: vehicle.price || '',
        quantity: vehicle.quantity !== undefined ? vehicle.quantity : 1,
        year: vehicle.year || 2024,
        vin: vehicle.vin || '',
        imageUrl: vehicle.imageUrl || '',
        description: vehicle.description || '',
      });
    }
  }, [vehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (isEditing) {
        response = await api.put(`/vehicles/${vehicle.id}`, formData);
        addToast(`Updated ${formData.make} ${formData.model} successfully!`, 'success');
      } else {
        response = await api.post('/vehicles', formData);
        addToast(`Added ${formData.make} ${formData.model} to inventory!`, 'success');
      }
      onSuccess(response.data.data);
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || 'Operation failed.';
      addToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm"
        >
          ✕
        </button>

        <h3 className="text-2xl font-black text-white mb-2">
          {isEditing ? '✏️ Edit Vehicle Specs' : '🚗 Add New Vehicle'}
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          {isEditing ? 'Update specs, price, or inventory count.' : 'Fill in vehicle information to expand the dealership catalog.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Make *</label>
              <input
                type="text"
                name="make"
                required
                placeholder="e.g. Porsche"
                value={formData.make}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Model *</label>
              <input
                type="text"
                name="model"
                required
                placeholder="e.g. Taycan Turbo S"
                value={formData.model}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Luxury">Luxury</option>
                <option value="Electric">Electric</option>
                <option value="Sports">Sports</option>
                <option value="Truck">Truck</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Price ($) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="price"
                required
                placeholder="89000.00"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Quantity *</label>
              <input
                type="number"
                min="0"
                name="quantity"
                required
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Year</label>
              <input
                type="number"
                name="year"
                placeholder="2024"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">VIN Number</label>
              <input
                type="text"
                name="vin"
                placeholder="WP0AF2A9..."
                value={formData.vin}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              placeholder="https://images.unsplash.com/..."
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Describe performance details, specs, and features..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
            ></textarea>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 gradient-bg text-white hover:brightness-110 rounded-xl text-xs font-extrabold shadow-lg shadow-cyan-500/20 transition-all"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Vehicle' : 'Save New Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
