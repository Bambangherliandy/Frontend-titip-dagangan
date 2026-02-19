import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProvinces, fetchCities } from "../../store/slices/locationSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BaseUrl from "../../constant/Url";

export default function SellerRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { provinces, cities } = useSelector((state) => state.location);
  const [form, setForm] = useState({
    store_name: "",
    store_description: "",
    store_address: "",
    city_id: "",
  });

  useEffect(() => {
    dispatch(fetchProvinces());
  }, []);

  function handleProvinceChange(provinceId) {
    dispatch(fetchCities(provinceId));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      await axios.post(`${BaseUrl}/seller/register`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Toko berhasil didaftarkan!");
      navigate("/app/seller/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Gagal mendaftar toko");
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Daftarkan Toko</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-500">Nama Toko</label>
          <input
            type="text"
            className="w-full border p-2 rounded mt-1"
            value={form.store_name}
            onChange={(e) => setForm({ ...form, store_name: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm text-gray-500">Deskripsi Toko</label>
          <textarea
            className="w-full border p-2 rounded mt-1"
            value={form.store_description}
            onChange={(e) =>
              setForm({ ...form, store_description: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-sm text-gray-500">Alamat Toko</label>
          <input
            type="text"
            className="w-full border p-2 rounded mt-1"
            value={form.store_address}
            onChange={(e) =>
              setForm({ ...form, store_address: e.target.value })
            }
          />
        </div>

        {/* PROVINCE */}
        <div>
          <label className="text-sm text-gray-500">Provinsi</label>
          <select
            className="w-full border p-2 rounded mt-1"
            onChange={(e) => handleProvinceChange(e.target.value)}
          >
            <option value="">Pilih Provinsi</option>
            {provinces.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* CITY */}
        <div>
          <label className="text-sm text-gray-500">Kota</label>
          <select
            className="w-full border p-2 rounded mt-1"
            value={form.city_id}
            onChange={(e) => setForm({ ...form, city_id: e.target.value })}
          >
            <option value="">Pilih Kota</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
        >
          Daftarkan Toko
        </button>
      </form>
    </div>
  );
}
