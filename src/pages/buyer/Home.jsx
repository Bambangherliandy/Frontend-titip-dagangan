import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Profile from "../../component/profile";
import BaseUrl from "../../constant/Url";
import Chatbot from "../../component/Chatbot";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState("products");
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [profile, setProfile] = useState(null);
  const [hasSeller, setHasSeller] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  const authHeader = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchProducts();
    fetchCart();
    fetchProfile();
    checkSeller();
  }, []);

  async function fetchProfile() {
    try {
      const { data } = await axios.get(`${BaseUrl}/user/profile`, {
        headers: authHeader,
      });
      setProfile(data.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  }

  async function fetchProducts() {
    try {
      const { data } = await axios.get(`${BaseUrl}/pub/products`);
      setProducts(data.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  async function fetchCart() {
    try {
      const { data } = await axios.get(`${BaseUrl}/cart`, {
        headers: authHeader,
      });
      setCart(data.data);
      setCartItems(data.data.items || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  }

  async function checkSeller() {
    const token = localStorage.getItem("access_token");
    try {
      await axios.get(`${BaseUrl}/seller/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHasSeller(true);
    } catch (error) {
      setHasSeller(false);
    }
  }

  async function handleAddToCart(product_id) {
    try {
      await axios.post(
        `${BaseUrl}/cart`,
        { product_id, quantity: 1 },
        { headers: authHeader }
      );
      alert("Produk berhasil ditambahkan ke cart!");
      fetchCart(); // refresh cart
    } catch (error) {
      alert(error.response?.data?.message || "Gagal menambahkan ke cart");
    }
  }

  async function handleRemoveItem(id) {
    try {
      await axios.delete(`${BaseUrl}/cart/${id}`, {
        headers: authHeader,
      });
      fetchCart();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal menghapus item");
    }
  }

  async function handleClearCart() {
    try {
      await axios.delete(`${BaseUrl}/cart/clear`, {
        headers: authHeader,
      });
      fetchCart();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal mengosongkan cart");
    }
  }

  function handleLogout() {
    localStorage.removeItem("access_token");
    navigate("/login");
  }

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div>
          <div className="p-6 font-bold text-green-700 text-2xl">
            Titip Dagangan
          </div>
          <nav className="mt-4">
            <button
              onClick={() => setActiveMenu("products")}
              className={`w-full text-left block py-3 px-6 text-gray-700 hover:bg-green-100 ${
                activeMenu === "products" ? "bg-green-100 font-semibold" : ""
              }`}
            >
              🛍️ Produk
            </button>
            <button
              onClick={() => {
                setActiveMenu("cart");
                fetchCart();
              }}
              className={`w-full text-left block py-3 px-6 text-gray-700 hover:bg-green-100 ${
                activeMenu === "cart" ? "bg-green-100 font-semibold" : ""
              }`}
            >
              🛒 Cart{" "}
              {cartItems.length > 0 && (
                <span className="ml-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveMenu("orders")}
              className={`w-full text-left block py-3 px-6 text-gray-700 hover:bg-green-100 ${
                activeMenu === "orders" ? "bg-green-100 font-semibold" : ""
              }`}
            >
              📦 Order History
            </button>
            <button
              onClick={() => setActiveMenu("profile")}
              className={`w-full text-left block py-3 px-6 text-gray-700 hover:bg-green-100 ${
                activeMenu === "profile" ? "bg-green-100 font-semibold" : ""
              }`}
            >
              👤 Profile
            </button>
            <button
              onClick={() =>
                navigate(
                  hasSeller ? "/app/seller/dashboard" : "/app/seller/register"
                )
              }
              className="w-full text-left block py-3 px-6 text-gray-700 hover:bg-green-100"
            >
              🏪 {hasSeller ? "Kelola Toko" : "Buka Toko"}
            </button>
          </nav>
        </div>
        <div className="p-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-green-700">
            {activeMenu === "products" && "Daftar Produk"}
            {activeMenu === "cart" && "Cart"}
            {activeMenu === "orders" && "Order History"}
            {activeMenu === "profile" && "Profile"}
          </h1>
          <div className="flex items-center gap-4">
            {activeMenu === "products" && (
              <input
                type="text"
                placeholder="Cari produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              />
            )}
          </div>
        </header>
        <main className="p-6">
          {/* Produk */}
          {activeMenu === "products" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.length === 0 ? (
                <p className="text-gray-500 col-span-4 text-center">
                  Tidak ada produk ditemukan
                </p>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 hover:shadow-lg transition"
                  >
                    <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        "No Image"
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-green-600 font-bold">
                      Rp {product.price?.toLocaleString("id-ID")}
                    </p>
                    <p className="text-sm text-gray-500">
                      Stok: {product.stock}
                    </p>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="mt-auto w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      + Tambah ke Cart
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Cart */}
          {activeMenu === "cart" && (
            <div className="bg-white rounded-xl shadow p-6">
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center">Cart kamu kosong</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div>
                        <p className="font-semibold">{item.Product?.name}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-green-600 font-bold">
                          Rp{" "}
                          {(
                            item.Product?.price * item.quantity
                          )?.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Hapus
                      </button>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="flex justify-between items-center pt-4">
                    <p className="font-bold text-lg">
                      Total: Rp {cart?.total_price?.toLocaleString("id-ID")}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleClearCart}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Kosongkan Cart
                      </button>
                      <button
                        onClick={() => navigate("/app/checkout")}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Checkout →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Order History */}
          {activeMenu === "orders" && (
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500 text-center">
                Order history akan ditampilkan di sini
              </p>
            </div>
          )}

          {/* Profile */}
          {/* Profile */}
          {activeMenu === "profile" && (
            <div className="bg-white rounded-xl shadow p-6">
              <div>
                {" "}
                {/* <-- ganti <p> jadi <div> */}
                {activeMenu === "profile" && (
                  <Profile
                    profile={profile}
                    onUpdate={(updatedProfile) => setProfile(updatedProfile)}
                  />
                )}
              </div>
            </div>
          )}
        </main>
      </div>
      <Chatbot />
    </div>
  );
}
