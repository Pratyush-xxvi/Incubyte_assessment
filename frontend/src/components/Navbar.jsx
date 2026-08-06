import React from 'react';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ onOpenAuth, onOpenAddVehicle }) => {
  const { user, isAuthenticated, isAdmin, logout, loginAsDemo } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-slate-800/80 shadow-2xl backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all duration-300">
            🛡️
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-2xl font-black tracking-tight font-heading gradient-text">
                phVault
              </span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-md">
                🇮🇳 INDIA
              </span>
            </div>
            <span className="block text-[10px] text-slate-400 uppercase font-semibold tracking-widest -mt-0.5">
              Automotive Inventory Vault
            </span>
          </div>
        </div>

        {/* Action Controls & User Account */}
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              {/* Role Indicator Badge */}
              <div className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-2 border shadow-sm ${
                isAdmin 
                  ? 'bg-amber-950/60 text-amber-300 border-amber-500/40 shadow-amber-500/10' 
                  : 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40 shadow-cyan-500/10'
              }`}>
                <span>{isAdmin ? '👑 ADMIN' : '👤 CUSTOMER'}</span>
                <span className="opacity-40">|</span>
                <span className="font-medium text-slate-100">{user.username}</span>
              </div>

              {/* Admin Quick Add Vehicle Button */}
              {isAdmin && (
                <button
                  onClick={onOpenAddVehicle}
                  className="px-4 py-2 rounded-xl text-xs font-bold gradient-bg text-slate-950 font-heading hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all flex items-center space-x-1.5 active:scale-95"
                >
                  <span className="text-base leading-none">+</span>
                  <span>Add Vehicle</span>
                </button>
              )}

              {/* Logout Button */}
              <button
                onClick={logout}
                className="px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/80 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              {/* Quick Demo Login Buttons for Reviewer Convenience */}
              <div className="hidden md:flex items-center space-x-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => loginAsDemo('ADMIN')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors border border-amber-500/30"
                  title="Demo Admin Login (admin / admin123)"
                >
                  ⚡ Demo Admin
                </button>
                <button
                  onClick={() => loginAsDemo('CUSTOMER')}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors border border-cyan-500/30"
                  title="Demo Customer Login (customer / customer123)"
                >
                  👤 Demo Customer
                </button>
              </div>

              <button
                onClick={() => onOpenAuth('login')}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-700 transition-all"
              >
                Log In
              </button>

              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-2 rounded-xl text-xs font-bold gradient-bg text-slate-950 font-heading hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
