import React from 'react';

export const FilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  categories,
  onReset
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 mb-8 space-y-4 backdrop-blur-md">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Search Input */}
        <div className="md:col-span-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            🔍
          </div>
          <input
            type="text"
            placeholder="Search by Make, Model, or VIN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Max Price Range Slider */}
        <div className="md:col-span-4 space-y-1">
          <div className="flex justify-between text-xs font-medium text-slate-400">
            <span>Max Price Filter</span>
            <span className="text-cyan-400 font-bold">
              ${parseInt(maxPrice).toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="20000"
            max="300000"
            step="5000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
        </div>

        {/* Reset Filters Button */}
        <div className="md:col-span-2 flex justify-end">
          <button
            onClick={onReset}
            className="w-full md:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 items-center pt-2 border-t border-slate-800/60">
        <span className="text-xs font-semibold text-slate-400 mr-2">Category:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === cat
                ? 'gradient-bg text-white shadow-md shadow-cyan-500/20 font-bold scale-105'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
