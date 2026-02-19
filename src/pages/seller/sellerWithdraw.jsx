import { useEffect, useState } from "react";
import axios from "axios";
import BaseUrl from "../../constant/Url";

export default function SellerWithdraw({ seller }) {
  const [history, setHistory] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    bank_name: "",
    account_number: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    const token = localStorage.getItem("access_token");
    try {
      const { data } = await axios.get(`${BaseUrl}/withdraw/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(data.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleWithdraw(e) {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    setLoading(true);
    try {
      await axios.post(`${BaseUrl}/withdraw`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Permintaan withdrawal berhasil dibuat!");
      setForm({ amount: "", bank_name: "", account_number: "" });
      fetchHistory();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal membuat withdrawal");
    } finally {
      setLoading(false);
    }
  }

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Penarikan Saldo</h2>

      {/* SALDO */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-gray-500">Saldo Tersedia</p>
        <p className="text-2xl font-bold text-green-600">
          {formatRupiah(seller?.balance || 0)}
        </p>
      </div>

      {/* FORM WITHDRAW */}
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-3">Ajukan Penarikan</h3>
        <form onSubmit={handleWithdraw} className="space-y-3">
          <div>
            <label className="text-sm text-gray-500">Jumlah Penarikan</label>
            <input
              type="number"
              className="w-full border p-2 rounded mt-1"
              placeholder="Masukkan jumlah"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm text-gray-500">Nama Bank</label>
            <select
              className="w-full border p-2 rounded mt-1"
              value={form.bank_name}
              onChange={(e) => setForm({ ...form, bank_name: e.target.value })}
            >
              <option value="">Pilih Bank</option>
              <option value="BCA">BCA</option>
              <option value="BRI">BRI</option>
              <option value="BNI">BNI</option>
              <option value="Mandiri">Mandiri</option>
              <option value="CIMB">CIMB Niaga</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-500">Nomor Rekening</label>
            <input
              type="text"
              className="w-full border p-2 rounded mt-1"
              placeholder="Masukkan nomor rekening"
              value={form.account_number}
              onChange={(e) =>
                setForm({ ...form, account_number: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded font-semibold disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Ajukan Penarikan"}
          </button>
        </form>
      </div>

      {/* HISTORY */}
      <div>
        <h3 className="font-medium mb-3">Riwayat Penarikan</h3>
        {history.length === 0 ? (
          <p className="text-sm text-gray-400">Belum ada riwayat penarikan</p>
        ) : (
          <div className="space-y-3">
            {history.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{formatRupiah(item.amount)}</p>
                  <p className="text-sm text-gray-500">
                    {item.bank_name} - {item.account_number}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    item.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : item.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
