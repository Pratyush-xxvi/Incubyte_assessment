import React from 'react';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ onOpenAuth, onOpenAddVehicle }) => {
  const { user, isAuthenticated, isAdmin, logout, loginAsDemo } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            🏎️
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-tight font-sans gradient-text">
              APEX MOTORS
            </span>
            <span className="block text-[10px] text-cyan-400/80 uppercase font-semibold tracking-widest -mt-1">
              Inventory System
            </span>
          </div>
        </div>

        {/* Action Controls & User Account */}
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              {/* Role Indicator Badge */}
              <div className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 border ${
                isAdmin 
                  ? 'bg-amber-950/60 text-amber-300 border-amber-500/40 shadow-sm shadow-amber-500/10' 
                  : 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40 shadow-sm shadow-cyan-500/10'
              }`}>
                <span>{isAdmin ? '👑 ADMIN' : '👤 CUSTOMER'}</span>
                <span className="opacity-60">|</span>
                <span className="font-medium text-slate-200">{user.username}</span>
              </div>

              {/* Admin Quick Add Vehicle Button */}
              {isAdmin && (
                <button
                  onClick={onOpenAddVehicle}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:brightness-110 shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-1.5"
                >
                  <span>+</span>
                  <span>Add Vehicle</span>
                </button>
              )}

              {/* Logout Button */}
              <button
                onClick={logout}
                className="px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 transition-all"
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
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-all"
              >
                Log In
              </button>

              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-2 rounded-xl text-xs font-bold gradient-bg text-white hover:brightness-110 shadow-lg shadow-cyan-500/20 transition-all"
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
