import React from 'react';

export const HeroBanner = ({ vehicles = [] }) => {
  const totalVehicles = vehicles.length;
  const totalStockCount = vehicles.reduce((sum, v) => sum + (v.quantity || 0), 0);
  const outOfStockCount = vehicles.filter((v) => (v.quantity || 0) === 0).length;
  const totalFleetValue = vehicles.reduce(
    (sum, v) => sum + (v.price ? parseFloat(v.price) * (v.quantity || 1) : 0),
    0
  );

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900/60 border border-slate-800 p-8 md:p-10 mb-8 backdrop-blur-xl">
      {/* Glow Orbs */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Heading & Tagline */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold uppercase tracking-wider">
            <span>✨ TDD Kata Dealership Suite</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Next-Gen Luxury &amp; Performance <span className="gradient-text">Inventory Management</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
            Real-time stock tracking, automated purchase processing, instant admin restocking, and full RESTful API security with JWT token authentication.
          </p>
        </div>

        {/* Right Column: Key Inventory Metrics */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner">
            <span className="block text-slate-400 text-xs font-medium uppercase tracking-wider">Total Models</span>
            <span className="text-3xl font-extrabold text-white mt-1 block">{totalVehicles}</span>
            <span className="text-[11px] text-cyan-400 font-medium">Available catalog</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner">
            <span className="block text-slate-400 text-xs font-medium uppercase tracking-wider">Total Units in Stock</span>
            <span className="text-3xl font-extrabold text-emerald-400 mt-1 block">{totalStockCount}</span>
            <span className="text-[11px] text-emerald-400/80 font-medium">Ready to ship</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner">
            <span className="block text-slate-400 text-xs font-medium uppercase tracking-wider">Out of Stock Alert</span>
            <span className="text-3xl font-extrabold text-rose-400 mt-1 block">{outOfStockCount}</span>
            <span className="text-[11px] text-rose-400/80 font-medium">{outOfStockCount > 0 ? 'Requires admin restock' : 'All in stock'}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner">
            <span className="block text-slate-400 text-xs font-medium uppercase tracking-wider">Inventory Value</span>
            <span className="text-xl md:text-2xl font-extrabold text-cyan-300 mt-1 block">
              ${totalFleetValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
            <span className="text-[11px] text-cyan-400/80 font-medium">Total valuation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
