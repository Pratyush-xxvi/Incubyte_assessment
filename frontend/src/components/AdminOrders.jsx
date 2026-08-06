import { useEffect, useState } from "react";
import {
  getOrders,
  approveOrder,
  rejectOrder,
} from "../services/orderService";
import { formatINR } from "../utils/formatters";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await getOrders();
      console.log("Orders API Response:", res.data);

      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else if (Array.isArray(res.data?.data)) {
        setOrders(res.data.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveOrder(id);
      loadOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectOrder(id);
      loadOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-10 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 shadow-2xl backdrop-blur-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-white font-heading">
            🛡️ phVault Customer Purchase Orders
          </h2>
          <p className="text-xs text-slate-400">
            Review and approve customer vehicle reservation and purchase requests.
          </p>
        </div>
        <button
          onClick={loadOrders}
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-950 text-slate-300 hover:text-white border border-slate-800 transition-colors"
        >
          🔄 Refresh Orders
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950 text-slate-400 text-xs uppercase tracking-wider font-semibold">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Vehicle Model</th>
              <th className="p-4">Price (₹ INR)</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Admin Decision</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
            {loading ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-400">
                  Loading orders data...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-slate-400">
                  <div className="text-3xl mb-2">📦</div>
                  <p className="font-semibold text-white">No Purchase Orders Found</p>
                  <p className="text-xs text-slate-400 mt-1">Customer purchase requests will appear here for admin review.</p>
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-slate-800/60 transition-colors"
                >
                  <td className="p-4 text-xs font-mono-code text-slate-400">
                    #{order.id}
                  </td>

                  <td className="p-4 font-semibold text-white">
                    {order.user?.username || 'Customer'}
                    <span className="block text-[11px] font-normal text-slate-400">{order.user?.email}</span>
                  </td>

                  <td className="p-4 font-bold text-amber-300 font-heading">
                    {order.vehicle?.make} {order.vehicle?.model}
                    <span className="block text-[11px] font-normal text-slate-400">{order.vehicle?.category}</span>
                  </td>

                  <td className="p-4 font-mono-code text-white">
                    {order.vehicle?.price ? formatINR(order.vehicle.price) : '₹ INR'}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${
                        order.status === "PENDING"
                          ? "bg-amber-950/80 text-amber-300 border-amber-500/40"
                          : order.status === "APPROVED"
                          ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
                          : "bg-rose-950/80 text-rose-300 border-rose-500/40"
                      }`}
                    >
                      {order.status === "PENDING" ? '⌛ PENDING' : order.status === "APPROVED" ? '✓ APPROVED' : '✕ REJECTED'}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    {order.status === "PENDING" ? (
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleApprove(order.id)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs transition-all shadow-md shadow-emerald-600/20"
                        >
                          ✓ Approve
                        </button>

                        <button
                          onClick={() => handleReject(order.id)}
                          className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs transition-all shadow-md shadow-rose-600/20"
                        >
                          ✕ Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500 font-medium">Action Completed</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}