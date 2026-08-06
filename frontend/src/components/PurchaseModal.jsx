import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { placeOrder } from "../services/orderService";
import { formatINR, formatINRLong } from '../utils/formatters';

export const PurchaseModal = ({ vehicle, onClose, onSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const [deliveryCity, setDeliveryCity] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  if (!vehicle) return null;

  const unitPrice = parseFloat(vehicle.price || 0);
  const totalPrice = unitPrice * quantity;

  const handlePurchase = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await placeOrder(vehicle.id);
      
      const successMessage = `Purchase order submitted for ${vehicle.make} ${vehicle.model}! Total: ${formatINRLong(totalPrice)}`;
      addToast(successMessage, 'success');
      
      onClose();

      if (onSuccess) {
        onSuccess(vehicle);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to send purchase request.";
      addToast(errorMsg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm"
        >
          ✕
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl border border-amber-500/30">
            🏎️
          </div>
          <div>
            <h3 className="text-2xl font-black text-white font-heading">Confirm Purchase Order</h3>
            <p className="text-xs text-slate-400">phVault Reserve &amp; Deliver System</p>
          </div>
        </div>

        {/* Vehicle Preview Card */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 mb-6 space-y-2.5">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Vehicle Model:</span>
            <span className="font-bold text-white font-heading">{vehicle.make} {vehicle.model}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Category / Year:</span>
            <span className="font-semibold text-slate-300">{vehicle.category} • {vehicle.year || 2024}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Ex-Showroom Price:</span>
            <span className="font-bold text-amber-400 font-mono-code">
              {formatINRLong(vehicle.price)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Available Showroom Stock:</span>
            <span className="font-semibold text-emerald-400">{vehicle.quantity} units</span>
          </div>
        </div>

        <form onSubmit={handlePurchase} className="space-y-5">
          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Select Quantity:
            </label>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold hover:bg-slate-800 transition-colors"
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
                className="w-20 text-center py-2 bg-slate-950 border border-slate-800 rounded-xl text-lg font-bold text-white font-mono-code"
              />
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(vehicle.quantity, q + 1))}
                className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold hover:bg-slate-800 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Delivery Info Fields (Optional polish) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Delivery City</label>
              <input
                type="text"
                placeholder="e.g. Mumbai / Delhi / Blr"
                value={deliveryCity}
                onChange={(e) => setDeliveryCity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Mobile No.</label>
              <input
                type="text"
                placeholder="+91 9876543210"
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Total Price Banner */}
          <div className="p-4 bg-amber-950/40 border border-amber-500/30 rounded-2xl flex justify-between items-center">
            <div>
              <span className="text-xs font-bold uppercase text-amber-300 block">Total Price (INR ₹):</span>
              <span className="text-[11px] text-slate-400">Includes showroom tax &amp; handling</span>
            </div>
            <span className="text-2xl font-black text-amber-300 font-heading">
              {formatINR(totalPrice)}
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
              className="flex-1 py-3 gradient-bg text-slate-950 hover:brightness-110 rounded-xl text-xs font-black shadow-lg shadow-amber-500/20 transition-all font-heading"
            >
              {loading ? 'Processing...' : 'Confirm Order in ₹'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
