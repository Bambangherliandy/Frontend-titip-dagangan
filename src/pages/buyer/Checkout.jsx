import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../../constant/Url";

export default function Checkout() {
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [services, setServices] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [form, setForm] = useState({
    shipping_address: "",
    payment_method: "bank_transfer",
    courier: "",
    courier_service: "",
    origin: "501",
    destination: "",
  });

  useEffect(() => {
    fetchProvinces();
    fetchCart();
  }, []);

  useEffect(() => {
    if (!Array.isArray(cartItems)) return;
    const total = cartItems.reduce(
      (acc, item) => acc + item.Product.price * item.quantity,
      0
    );
    setSubtotal(total);
  }, [cartItems]);

  async function fetchCart() {
    const token = localStorage.getItem("access_token");
    try {
      const { data } = await axios.get(`${BaseUrl}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(data.data.items);
    } catch (error) {
      console.log("Cart error:", error.response?.data);
    }
  }

  async function fetchProvinces() {
    const token = localStorage.getItem("access_token");
    try {
      const { data } = await axios.get(`${BaseUrl}/orders/cities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProvinces(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCities(provinceId) {
    const token = localStorage.getItem("access_token");
    try {
      const { data } = await axios.get(
        `${BaseUrl}/orders/cities?province_id=${provinceId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCities(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGetShipping() {
    const token = localStorage.getItem("access_token");
    if (!form.destination) {
      alert("Please select a destination city first!");
      return;
    }
    if (!form.courier) {
      alert("Please select a courier first!");
      return;
    }
    try {
      const { data } = await axios.get(`${BaseUrl}/orders/shipping-cost`, {
        params: {
          origin: form.origin,
          destination: form.destination,
          courier: form.courier,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(data.data.services);
      setSelectedShipping(null);
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to calculate shipping cost");
    }
  }

  async function handleCheckout(e) {
    const token = localStorage.getItem("access_token");
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BaseUrl}/orders/checkout`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Order placed successfully!");
      navigate(`/app/payment/${data.data.order_id}`);
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message);
    }
  }

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);

  const shippingCost = selectedShipping ? selectedShipping.cost : 0;
  const grandTotal = subtotal + shippingCost;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white py-6 px-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <span className="text-2xl">🛒</span>
          <div>
            <h1 className="text-xl font-extrabold">Checkout</h1>
            <p className="text-slate-400 text-sm">Complete your order</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid lg:grid-cols-5 gap-8">
        {/* LEFT — Form */}
        <div className="lg:col-span-3 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-7 w-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                1
              </span>
              <h2 className="font-extrabold text-lg">Shipping Address</h2>
            </div>
            <textarea
              placeholder="Enter your full shipping address..."
              className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
              rows={3}
              value={form.shipping_address}
              onChange={(e) =>
                setForm({ ...form, shipping_address: e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">
                  Province
                </label>
                <select
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                  onChange={(e) => fetchCities(e.target.value)}
                >
                  <option value="">Select Province</option>
                  {provinces.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">
                  City
                </label>
                <select
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                  onChange={(e) =>
                    setForm({ ...form, destination: e.target.value })
                  }
                >
                  <option value="">Select City</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Courier */}
          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-7 w-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                2
              </span>
              <h2 className="font-extrabold text-lg">Shipping Method</h2>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {["jne", "jnt", "tiki"].map((courier) => (
                <button
                  key={courier}
                  type="button"
                  onClick={() => setForm({ ...form, courier })}
                  className={`py-3 rounded-2xl border-2 font-bold text-sm transition ${
                    form.courier === courier
                      ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {courier === "jnt" ? "J&T" : courier.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleGetShipping}
              className="w-full py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:opacity-90 transition"
            >
              🚚 Calculate Shipping Cost
            </button>

            {/* Services */}
            {services.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs font-bold text-slate-500">
                  Select Service:
                </p>
                {services.map((s, i) => (
                  <label
                    key={i}
                    className={`flex items-center justify-between p-3 rounded-2xl border-2 cursor-pointer transition ${
                      selectedShipping?.service === s.service
                        ? "border-emerald-400 bg-emerald-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="courier_service"
                        value={s.service}
                        onChange={() => {
                          setSelectedShipping(s);
                          setForm({ ...form, courier_service: s.service });
                        }}
                        className="accent-emerald-500"
                      />
                      <div>
                        <div className="font-bold text-sm">{s.service}</div>
                        {s.etd && (
                          <div className="text-xs text-slate-400">
                            Est. {s.etd} days
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-sm text-emerald-600">
                      {formatRupiah(s.cost)}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-3xl border shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-7 w-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                3
              </span>
              <h2 className="font-extrabold text-lg">Payment Method</h2>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl border-2 border-emerald-400 bg-emerald-50">
              <span className="text-2xl">💳</span>
              <div>
                <div className="font-bold text-sm">Midtrans Secure Payment</div>
                <div className="text-xs text-slate-500">
                  Bank Transfer, E-Wallet, Credit Card & more
                </div>
              </div>
              <span className="ml-auto text-xs bg-emerald-400 text-slate-900 font-bold px-2 py-1 rounded-full">
                Selected
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — Order Summary */}
        <div className="lg:col-span-2">
          <div className="sticky top-6 space-y-4">
            <div className="bg-white rounded-3xl border shadow-sm p-6">
              <h2 className="font-extrabold text-lg mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-4">
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl shrink-0">
                        🛍
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold truncate">
                          {item.Product.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          x{item.quantity}
                        </div>
                      </div>
                      <div className="text-sm font-bold text-right shrink-0">
                        {formatRupiah(item.Product.price * item.quantity)}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400 text-center py-4">
                    No items in cart
                  </p>
                )}
              </div>

              <hr className="border-slate-100 my-4" />

              {/* Price breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>
                    Shipping
                    {selectedShipping
                      ? ` (${form.courier.toUpperCase()} - ${
                          selectedShipping.service
                        })`
                      : ""}
                  </span>
                  <span
                    className={
                      selectedShipping ? "text-slate-800" : "text-slate-400"
                    }
                  >
                    {selectedShipping
                      ? formatRupiah(shippingCost)
                      : "Not selected"}
                  </span>
                </div>
              </div>

              <hr className="border-slate-100 my-4" />

              <div className="flex justify-between items-center">
                <span className="font-extrabold">Total</span>
                <span className="font-extrabold text-xl text-emerald-600">
                  {formatRupiah(grandTotal)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-5 w-full py-4 rounded-2xl bg-emerald-400 text-slate-900 font-extrabold text-base hover:opacity-90 transition shadow-lg shadow-emerald-200"
              >
                Place Order →
              </button>

              <p className="text-xs text-center text-slate-400 mt-3">
                🔒 Secured by Midtrans Payment Gateway
              </p>
            </div>

            {/* Info */}
            <div className="bg-slate-900 rounded-3xl p-5 text-white text-sm space-y-2">
              <div className="flex items-center gap-2">
                <span>✅</span>
                <span className="text-white/80">
                  Verified sellers & products
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>🚚</span>
                <span className="text-white/80">JNE, J&T, TIKI available</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🔒</span>
                <span className="text-white/80">
                  Secure & encrypted payment
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
