import { useEffect, useState } from "react";
import axios from "axios";
import BaseUrl from "../../constant/Url";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const token = localStorage.getItem("access_token");
    try {
      const { data } = await axios.get(`${BaseUrl}/orders/seller/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateStatus(orderId, status) {
    const token = localStorage.getItem("access_token");
    try {
      await axios.put(
        `${BaseUrl}/orders/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Status berhasil diupdate!");
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal update status");
    }
  }

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);

  if (loading) return <p className="text-sm text-gray-400">Loading...</p>;
  if (orders.length === 0)
    return <p className="text-sm text-gray-400">Belum ada pesanan</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Pesanan Masuk</h2>
      {orders.map((item, index) => (
        <div key={index} className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="font-medium">Order #{item.Order?.id}</p>
              <p className="text-sm text-gray-500">
                {item.Order?.shipping_address}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">
                {formatRupiah(item.Order?.grand_total)}
              </p>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  item.Order?.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : item.Order?.status === "shipped"
                    ? "bg-blue-100 text-blue-700"
                    : item.Order?.status === "processing"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {item.Order?.status}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            {item.Product?.name} x{item.quantity} -{" "}
            {formatRupiah(item.price * item.quantity)}
          </p>

          {item.Order?.status !== "completed" && (
            <select
              className="border p-1 rounded text-sm mt-3"
              value={item.Order?.status}
              onChange={(e) =>
                handleUpdateStatus(item.Order?.id, e.target.value)
              }
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
            </select>
          )}
        </div>
      ))}
    </div>
  );
}
