import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../constant/Url";

export default function RegisterUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    address: "",
    city_id: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProvinces() {
      try {
        const { data } = await axios.get(`${BaseUrl}/shipping/provinces`);
        setProvinces(data.data);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
      }
    }
    fetchProvinces();
  }, []);

  async function handleProvinceChange(e) {
    const province_id = e.target.value;
    setSelectedProvince(province_id);
    setForm({ ...form, city_id: "" });
    setCities([]);

    if (!province_id) return;

    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BaseUrl}/shipping/cities?province_id=${province_id}`
      );
      setCities(data.data);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        city_id: form.city_id ? Number(form.city_id) : null,
      };

      const { data } = await axios.post(`${BaseUrl}/auth/register`, payload);

      console.log("Register success:", data);
      navigate("/login");
    } catch (error) {
      console.error("Register failed:", error.response?.data);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-3/4 max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
          Sign up
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter your full address"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Dropdown Provinsi */}
          <div className="mb-4">
            <label className="block text-sm mb-2">Province</label>
            <select
              value={selectedProvince}
              onChange={handleProvinceChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Select Province</option>
              {provinces.map((prov) => (
                <option key={prov.id} value={prov.id}>
                  {prov.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown Kota */}
          <div className="mb-4">
            <label className="block text-sm mb-2">City</label>
            <select
              name="city_id"
              value={form.city_id}
              onChange={handleChange}
              disabled={!selectedProvince || loading}
              className="w-full px-4 py-2 border rounded-lg disabled:bg-gray-100"
            >
              <option value="">
                {loading ? "Loading cities..." : "Select City"}
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
