import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SellerProfile from "./SellerProfile";
import SellerProducts from "./SellerProducts";
import SellerOrders from "./SellerOrders";
import SellerWithdraw from "./sellerWithdraw";
import BaseUrl from "../../constant/Url";

export default function SellerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const token = localStorage.getItem("access_token");
    try {
      const { data } = await axios.get(`${BaseUrl}/seller/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSeller(data.data);
    } catch (error) {
      if (error.response?.status === 404) {
        navigate("/app/seller/register");
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  const tabs = [
    { key: "products", label: "Produk" },
    { key: "orders", label: "Pesanan" },
    { key: "withdraw", label: "Penarikan" },
    { key: "profile", label: "Profil Toko" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{seller?.store_name}</h1>
          <p className="text-gray-500 text-sm">{seller?.store_address}</p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-2 border-b mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === tab.key
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {activeTab === "products" && <SellerProducts />}
      {activeTab === "orders" && <SellerOrders />}
      {activeTab === "profile" && (
        <SellerProfile seller={seller} onUpdate={fetchProfile} />
      )}
      {activeTab === "withdraw" && <SellerWithdraw seller={seller} />}
    </div>
  );
}
