import React from 'react';
import { formatINR } from '../utils/formatters';

export const HeroBanner = ({ vehicles = [] }) => {
  const totalVehicles = vehicles.length;
  const totalStockCount = vehicles.reduce((sum, v) => sum + (v.quantity || 0), 0);
  const outOfStockCount = vehicles.filter((v) => (v.quantity || 0) === 0).length;
  const totalFleetValue = vehicles.reduce(
    (sum, v) => sum + (v.price ? parseFloat(v.price) * (v.quantity || 1) : 0),
    0
  );

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 p-8 md:p-10 mb-8 backdrop-blur-xl shadow-2xl">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Title & Subtitle */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
            <span>🛡️ phVault • India's Premier Automotive Platform</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight font-heading">
            Exclusive Indian &amp; Luxury <span className="gradient-text font-black">Automotive Vault</span>
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-xl leading-relaxed">
            Discover Mahindra, Tata, Toyota, BMW, and Luxury Supercars. Real-time stock tracking, purchase orders in Indian Rupees (₹), admin inventory restocking, and JWT security.
          </p>
          <div className="pt-2 flex flex-wrap gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="text-amber-400">⚡</span> INR (₹) Live Pricing
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="text-emerald-400">✓</span> Instant Reserve Orders
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="text-cyan-400">🔒</span> JWT Role Security
            </span>
          </div>
        </div>

        {/* Right Column: Live Metrics Cards */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-inner hover:border-amber-500/30 transition-colors">
            <span className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Models</span>
            <span className="text-3xl font-black text-white mt-1 block font-heading">{totalVehicles}</span>
            <span className="text-[11px] text-amber-400 font-medium">Available models</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-inner hover:border-emerald-500/30 transition-colors">
            <span className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Showroom Stock</span>
            <span className="text-3xl font-black text-emerald-400 mt-1 block font-heading">{totalStockCount}</span>
            <span className="text-[11px] text-emerald-400/80 font-medium">Units available</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-inner hover:border-rose-500/30 transition-colors">
            <span className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Out of Stock</span>
            <span className="text-3xl font-black text-rose-400 mt-1 block font-heading">{outOfStockCount}</span>
            <span className="text-[11px] text-rose-400/80 font-medium">{outOfStockCount > 0 ? 'Requires admin restock' : 'All available'}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 shadow-inner hover:border-amber-500/30 transition-colors">
            <span className="block text-slate-400 text-xs font-semibold uppercase tracking-wider">Vault Valuation</span>
            <span className="text-xl md:text-2xl font-black text-amber-300 mt-1 block font-heading">
              {formatINR(totalFleetValue)}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Total INR stock value</span>
          </div>
        </div>
      </div>
    </div>
  );
};
