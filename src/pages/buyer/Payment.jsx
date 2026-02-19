import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BaseUrl from "../../constant/Url";

export default function Payment() {
  const { order_id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingPay, setLoadingPay] = useState(false);

  useEffect(() => {
    fetchOrderDetail();
    console.log("Client key:", import.meta.env.VITE_MIDTRANS_CLIENT_KEY); // cek key

    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    );
    script.async = true;
    script.onload = () => console.log("Snap loaded, window.snap:", window.snap);
    script.onerror = () => console.log("Gagal load script Midtrans");
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  async function fetchOrderDetail() {
    const token = localStorage.getItem("access_token");
    try {
      const { data } = await axios.get(`${BaseUrl}/orders/${order_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrder(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePay() {
    const token = localStorage.getItem("access_token");
    setLoadingPay(true);
    try {
      const { data } = await axios.post(
        `${BaseUrl}/payment/create-transaction`,
        {
          order_id,
          amount: order.grand_total,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // cek apakah snap sudah tersedia
      if (!window.snap) {
        alert("Midtrans belum siap, coba refresh halaman");
        return;
      }

      window.snap.pay(data.data.token, {
        onSuccess: function () {
          alert("Pembayaran berhasil!");
          navigate("/app/home");
        },
        onPending: function () {
          alert("Menunggu pembayaran...");
          navigate("/app/home");
        },
        onError: function () {
          alert("Pembayaran gagal, coba lagi");
        },
        onClose: function () {
          alert("Kamu menutup popup pembayaran");
        },
      });
    } catch (error) {
      console.log(error);
      alert("Gagal membuat transaksi, coba lagi");
    } finally {
      setLoadingPay(false);
    }
  }

  async function handleCancel() {
    if (!confirm("Yakin ingin membatalkan pesanan ini?")) return;
    const token = localStorage.getItem("access_token");
    try {
      await axios.put(
        `${BaseUrl}/orders/${order_id}/status`,
        { status: "cancelled" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Pesanan berhasil dibatalkan");
      navigate("/app/home");
    } catch (error) {
      alert(error.response?.data?.message || "Gagal membatalkan pesanan");
    }
  }

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!order) return <p className="text-center mt-10">Order tidak ditemukan</p>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Detail Pembayaran</h1>

      <div className="bg-gray-50 border rounded-lg p-4 mb-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Order ID</span>
          <span className="font-medium">#{order.id}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Status Order</span>
          <span className="font-medium capitalize">{order.status}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Status Pembayaran</span>
          <span
            className={`font-medium capitalize ${
              order.payment_status === "paid"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {order.payment_status}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Alamat Pengiriman</span>
          <span className="font-medium text-right">
            {order.shipping_address}
          </span>
        </div>

        <hr />

        {order.OrderItems?.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>
              {item.Product.name} x{item.quantity}
            </span>
            <span>{formatRupiah(item.price * item.quantity)}</span>
          </div>
        ))}

        <hr />

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal Produk</span>
          <span>{formatRupiah(order.total_price)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Ongkos Kirim</span>
          <span>{formatRupiah(order.shipping_cost)}</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-base">
          <span>Total Pembayaran</span>
          <span className="text-green-600">
            {formatRupiah(order.grand_total)}
          </span>
        </div>
      </div>

      {order.payment_status !== "paid" ? (
        <div className="space-y-3">
          <button
            onClick={handlePay}
            disabled={loadingPay}
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold disabled:opacity-50"
          >
            {loadingPay ? "Memproses..." : "Bayar Sekarang"}
          </button>
          <button
            onClick={handleCancel}
            className="w-full bg-red-500 text-white py-3 rounded font-semibold hover:bg-red-600"
          >
            Batalkan Pesanan
          </button>
        </div>
      ) : (
        <div className="text-center text-green-600 font-semibold">
          ✓ Pembayaran sudah selesai
        </div>
      )}
    </div>
  );
}
