import React, { useState } from 'react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

export const PurchaseModal = ({ vehicle, onClose, onSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  if (!vehicle) return null;

  const totalPrice = parseFloat(vehicle.price) * quantity;

  const handlePurchase = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(`/vehicles/${vehicle.id}/purchase`, { quantity });
      addToast(
        `🎉 Successfully purchased ${quantity} x ${vehicle.make} ${vehicle.model}!`,
        'success'
      );
      onSuccess(response.data.data);
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to complete purchase.';
      addToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm"
        >
          ✕
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xl">
            🏎️
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Purchase Vehicle</h3>
            <p className="text-xs text-slate-400">Confirm order details below</p>
          </div>
        </div>

        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Model:</span>
            <span className="font-bold text-white">{vehicle.make} {vehicle.model}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Unit Price:</span>
            <span className="font-semibold text-cyan-300">
              ${parseFloat(vehicle.price).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Stock Available:</span>
            <span className="font-semibold text-emerald-400">{vehicle.quantity} units</span>
          </div>
        </div>

        <form onSubmit={handlePurchase} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Select Quantity:
            </label>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold hover:bg-slate-700 transition-colors"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={vehicle.quantity}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.min(vehicle.quantity, Math.max(1, parseInt(e.target.value) || 1)))
                }
                className="w-20 text-center py-2 bg-slate-950 border border-slate-800 rounded-xl text-lg font-bold text-white"
              />
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(vehicle.quantity, q + 1))}
                className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold hover:bg-slate-700 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="p-4 bg-cyan-950/40 border border-cyan-500/30 rounded-2xl flex justify-between items-center">
            <span className="text-xs font-semibold uppercase text-cyan-300">Total Price:</span>
            <span className="text-2xl font-black text-cyan-300">
              ${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex space-x-3">
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
              {loading ? 'Processing...' : 'Confirm Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
