import { useEffect, useState } from "react";
import {
  getOrders,
  approveOrder,
  rejectOrder,
} from "../services/orderService";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
  try {
    const res = await getOrders();

    console.log("Orders API Response:", res.data);

    if (Array.isArray(res.data)) {
      setOrders(res.data);
    } else if (Array.isArray(res.data.data)) {
      setOrders(res.data.data);
    } else {
      setOrders([]);
    }
  } catch (err) {
    console.error(err);
    setOrders([]);
  }
};

  useEffect(() => {
    loadOrders();
  }, []);

  const handleApprove = async (id) => {
    await approveOrder(id);
    loadOrders();
  };

  const handleReject = async (id) => {
    await rejectOrder(id);
    loadOrders();
  };

  return (
  <div className="mt-10 bg-slate-900 rounded-2xl border border-slate-800 p-6">
    <h2 className="text-2xl font-bold text-white mb-6">
      Purchase Requests
    </h2>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-800 text-slate-300">
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Vehicle</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="p-6 text-center text-slate-400"
              >
                No Orders Found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-slate-800 hover:bg-slate-800"
              >
                <td className="p-3 text-white">
                  {order.user?.username}
                </td>

                <td className="p-3 text-white">
                  {order.vehicle?.make} {order.vehicle?.model}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === "PENDING"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : order.status === "APPROVED"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-3 text-center">
                  {order.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleApprove(order.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mr-2"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(order.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Reject
                      </button>
                    </>
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