import React, { useState, useEffect, useCallback } from 'react';
import api from './services/api';
import { useAuth } from './context/AuthContext';
import { useToast } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { VehicleGrid } from './components/VehicleGrid';
import { PurchaseModal } from './components/PurchaseModal';
import { AdminVehicleModal } from './components/AdminVehicleModal';
import { AdminRestockModal } from './components/AdminRestockModal';
import { AuthModal } from './components/AuthModal';

const INITIAL_CATEGORIES = ['All', 'SUV', 'Sedan', 'Luxury', 'Electric', 'Sports', 'Truck'];

const SAMPLE_VEHICLES = [
  {
    id: 1,
    make: 'Tesla',
    model: 'Model S Plaid',
    category: 'Electric',
    price: '89990.00',
    quantity: 5,
    year: 2024,
    vin: '5YJSA1E28MF123456',
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    description: 'Tri-motor all-wheel drive, 1020 horsepower, 0-60 mph in 1.99s.',
  },
  {
    id: 2,
    make: 'Porsche',
    model: '911 GT3 RS',
    category: 'Sports',
    price: '241300.00',
    quantity: 2,
    year: 2024,
    vin: 'WP0AF2A91RS987654',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
    description: 'Naturally aspirated 4.0L flat-6 engine producing 518 hp with extreme aerodynamics.',
  },
  {
    id: 3,
    make: 'BMW',
    model: 'M5 Competition',
    category: 'Luxury',
    price: '107900.00',
    quantity: 4,
    year: 2023,
    vin: 'WBS83CH050CJ11223',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    description: 'High-performance executive sedan with 617 hp twin-turbo V8.',
  },
  {
    id: 4,
    make: 'Ford',
    model: 'F-150 Lightning',
    category: 'Truck',
    price: '62990.00',
    quantity: 0,
    year: 2024,
    vin: '1FTVW1EL8NW334455',
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
    description: 'All-electric pickup truck with 580 hp and mega power frunk.',
  },
  {
    id: 5,
    make: 'Mercedes-Benz',
    model: 'G 63 AMG',
    category: 'SUV',
    price: '179000.00',
    quantity: 3,
    year: 2024,
    vin: 'W4N0409211X556677',
    imageUrl: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic luxury off-roader with handcrafted AMG 4.0L V8 Biturbo engine.',
  },
  {
    id: 6,
    make: 'Audi',
    model: 'RS e-tron GT',
    category: 'Electric',
    price: '147100.00',
    quantity: 6,
    year: 2024,
    vin: 'WAUZZZF88P1998877',
    imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
    description: 'Electric grand tourer with dual electric motors and 637 hp boost mode.',
  },
];

export function AppContent() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { addToast } = useToast();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState('300000');

  // Modal States
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' });
  const [purchaseModal, setPurchaseModal] = useState({ open: false, vehicle: null });
  const [adminModal, setAdminModal] = useState({ open: false, vehicle: null });
  const [restockModal, setRestockModal] = useState({ open: false, vehicle: null });

  // Fetch Vehicles from Backend API
  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    try {
      let url = '/vehicles';
      const params = new URLSearchParams();
      if (searchQuery) params.append('make', searchQuery);
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (maxPrice && maxPrice !== '300000') params.append('maxPrice', maxPrice);

      if (params.toString()) {
        url = `/vehicles/search?${params.toString()}`;
      }

      const res = await api.get(url);
      setVehicles(res.data.data || []);
    } catch (err) {
      console.warn('Backend API connection failed, loading local demonstration stock.', err);
      // Fallback local filtering for standalone presentation
      let filtered = SAMPLE_VEHICLES;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (v) => v.make.toLowerCase().includes(q) || v.model.toLowerCase().includes(q)
        );
      }
      if (selectedCategory !== 'All') {
        filtered = filtered.filter((v) => v.category === selectedCategory);
      }
      if (maxPrice) {
        filtered = filtered.filter((v) => parseFloat(v.price) <= parseFloat(maxPrice));
      }
      setVehicles(filtered);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, maxPrice]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles, isAuthenticated]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setMaxPrice('300000');
  };

  const handleVehiclePurchased = (updatedVehicle) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === updatedVehicle.id ? updatedVehicle : v))
    );
    fetchVehicles();
  };

  const handleVehicleUpdated = (updatedVehicle) => {
    setVehicles((prev) => {
      const exists = prev.some((v) => v.id === updatedVehicle.id);
      if (exists) {
        return prev.map((v) => (v.id === updatedVehicle.id ? updatedVehicle : v));
      } else {
        return [updatedVehicle, ...prev];
      }
    });
    fetchVehicles();
  };

  const handleDeleteVehicle = async (vehicle) => {
    if (window.confirm(`Are you sure you want to delete ${vehicle.make} ${vehicle.model}?`)) {
      try {
        await api.delete(`/vehicles/${vehicle.id}`);
        addToast(`Deleted ${vehicle.make} ${vehicle.model} from inventory.`, 'info');
        setVehicles((prev) => prev.filter((v) => v.id !== vehicle.id));
      } catch (err) {
        const msg = err.response?.data?.message || 'Failed to delete vehicle.';
        addToast(msg, 'error');
        // Local state fallback
        setVehicles((prev) => prev.filter((v) => v.id !== vehicle.id));
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Navigation Header */}
      <Navbar
        onOpenAuth={(mode) => setAuthModal({ open: true, mode })}
        onOpenAddVehicle={() => setAdminModal({ open: true, vehicle: null })}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Showcase & Real-time Metrics Banner */}
        <HeroBanner vehicles={vehicles} />

        {/* Search & Multi-Filter Control Panel */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          categories={INITIAL_CATEGORIES}
          onReset={handleResetFilters}
        />

        {/* Vehicles Grid Catalog */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                Available Inventory ({vehicles.length})
              </h2>
              <p className="text-xs text-slate-400">
                Showing luxury, sports, SUV, and electric models currently in showroom.
              </p>
            </div>
            {isAdmin && (
              <button
                onClick={() => setAdminModal({ open: true, vehicle: null })}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors"
              >
                + Add Vehicle Record
              </button>
            )}
          </div>

          <VehicleGrid
            vehicles={vehicles}
            loading={loading}
            onPurchase={(v) => setPurchaseModal({ open: true, vehicle: v })}
            onEdit={(v) => setAdminModal({ open: true, vehicle: v })}
            onRestock={(v) => setRestockModal({ open: true, vehicle: v })}
            onDelete={handleDeleteVehicle}
            isAdmin={isAdmin}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <p>© 2026 Apex Motors Inventory System • Built with Spring Boot, React &amp; Tailwind CSS (TDD Kata)</p>
      </footer>

      {/* Modals */}
      {authModal.open && (
        <AuthModal
          initialMode={authModal.mode}
          onClose={() => setAuthModal({ open: false, mode: 'login' })}
        />
      )}

      {purchaseModal.open && (
        <PurchaseModal
          vehicle={purchaseModal.vehicle}
          onClose={() => setPurchaseModal({ open: false, vehicle: null })}
          onSuccess={handleVehiclePurchased}
        />
      )}

      {adminModal.open && (
        <AdminVehicleModal
          vehicle={adminModal.vehicle}
          onClose={() => setAdminModal({ open: false, vehicle: null })}
          onSuccess={handleVehicleUpdated}
        />
      )}

      {restockModal.open && (
        <AdminRestockModal
          vehicle={restockModal.vehicle}
          onClose={() => setRestockModal({ open: false, vehicle: null })}
          onSuccess={handleVehicleUpdated}
        />
      )}
    </div>
  );
}
