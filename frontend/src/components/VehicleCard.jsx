import React from 'react';

export const VehicleCard = ({
  vehicle,
  onPurchase,
  onEdit,
  onRestock,
  onDelete,
  isAdmin,
  isAuthenticated
}) => {
  const { id, make, model, category, price, quantity, year, imageUrl, description } = vehicle;
  const isOutOfStock = quantity === 0;

  const defaultImage = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80";

  return (
    <div className={`group relative rounded-3xl overflow-hidden glass-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between ${
      isOutOfStock ? 'border-rose-900/40 bg-slate-950/90' : 'border-slate-800'
    }`}>
      <div>
        {/* Card Header & Image */}
        <div className="relative h-52 w-full overflow-hidden bg-slate-900">
          <img
            src={imageUrl || defaultImage}
            alt={`${make} ${model}`}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
              isOutOfStock ? 'grayscale opacity-60' : ''
            }`}
            onError={(e) => { e.target.src = defaultImage; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

          {/* Category Pill */}
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
            {category}
          </span>

          {/* Stock Level Badge */}
          <span
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider border backdrop-blur-md ${
              isOutOfStock
                ? 'bg-rose-950/90 text-rose-300 border-rose-500/50 shadow-lg shadow-rose-950/50'
                : quantity <= 2
                ? 'bg-amber-950/90 text-amber-300 border-amber-500/50'
                : 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50'
            }`}
          >
            {isOutOfStock ? '⚠️ Out of Stock' : `${quantity} in Stock`}
          </span>

          {/* Price Banner */}
          <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
            <div>
              <span className="text-[11px] font-medium text-slate-400 block">{year || 2024} Edition</span>
              <h3 className="text-xl font-black text-white tracking-tight drop-shadow-md">
                {make} <span className="font-light text-slate-300">{model}</span>
              </h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-cyan-300 drop-shadow-md">
                ${parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
            {description || `${year || 2024} ${make} ${model} high performance vehicle.`}
          </p>
        </div>
      </div>

      {/* Footer & Actions */}
      <div className="p-5 pt-0 space-y-3">
        {/* Customer Purchase Action */}
        <button
          disabled={isOutOfStock || !isAuthenticated}
          onClick={() => onPurchase(vehicle)}
          className={`w-full py-3 px-4 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg ${
            isOutOfStock
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50 shadow-none'
              : !isAuthenticated
              ? 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
              : 'gradient-bg text-white hover:brightness-110 shadow-cyan-500/20 active:scale-[0.98]'
          }`}
        >
          <span>🏎️</span>
          <span>
            {isOutOfStock
              ? 'OUT OF STOCK'
              : !isAuthenticated
              ? 'Log in to Purchase'
              : 'Purchase Vehicle'}
          </span>
        </button>

        {/* Admin Management Toolbar */}
        {isAdmin && (
          <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-slate-800/80">
            <button
              onClick={() => onRestock(vehicle)}
              className="flex-1 py-1.5 px-2 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60 border border-emerald-500/30 rounded-lg text-[11px] font-semibold transition-colors"
              title="Restock Inventory"
            >
              📦 Restock
            </button>
            <button
              onClick={() => onEdit(vehicle)}
              className="flex-1 py-1.5 px-2 bg-blue-950/40 text-blue-300 hover:bg-blue-900/60 border border-blue-500/30 rounded-lg text-[11px] font-semibold transition-colors"
              title="Edit Vehicle"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => onDelete(vehicle)}
              className="flex-1 py-1.5 px-2 bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 border border-rose-500/30 rounded-lg text-[11px] font-semibold transition-colors"
              title="Delete Vehicle"
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
