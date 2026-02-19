import { useEffect, useState } from "react";
import axios from "axios";
import BaseUrl from "../../constant/Url";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

export default function SellerProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    weight: "",
    category_id: "",
    commission_percentage: 0,
    image: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  async function fetchProducts() {
    const token = localStorage.getItem("access_token");
    try {
      const { data } = await axios.get(`${BaseUrl}/seller/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(data.data.Products || []);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCategories() {
    const token = localStorage.getItem("access_token");
    try {
      const { data } = await axios.get(`${BaseUrl}/category`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(data.data || []);
    } catch (error) {
      console.log(error);
    }
  }

  function handleEdit(product) {
    setEditProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      weight: product.weight,
      category_id: product.category_id,
      commission_percentage: product.commission_percentage,
      image: product.image || "",
    });
    setShowForm(true);
  }

  function resetForm() {
    setEditProduct(null);
    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      weight: "",
      category_id: "",
      commission_percentage: 0,
      image: "",
    });
    setShowForm(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      if (editProduct) {
        await axios.put(`${BaseUrl}/products/${editProduct.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Produk berhasil diupdate!");
      } else {
        await axios.post(`${BaseUrl}/products`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Produk berhasil ditambahkan!");
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal menyimpan produk");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    const token = localStorage.getItem("access_token");
    try {
      await axios.delete(`${BaseUrl}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Produk berhasil dihapus!");
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal menghapus produk");
    }
  }

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Produk Saya</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          {showForm ? "Batal" : "+ Tambah Produk"}
        </button>
      </div>

      {showForm && (
        <div className="border rounded-lg p-4 mb-6 bg-gray-50">
          <h3 className="font-medium mb-3">
            {editProduct ? "Edit Produk" : "Tambah Produk Baru"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Nama Produk"
              className="w-full border p-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <textarea
              placeholder="Deskripsi Produk"
              className="w-full border p-2 rounded"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Harga"
                className="w-full border p-2 rounded"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              <input
                type="number"
                placeholder="Stok"
                className="w-full border p-2 rounded"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />
              <input
                type="number"
                placeholder="Berat (gram)"
                className="w-full border p-2 rounded"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
              />
              <select
                className="w-full border p-2 rounded"
                value={form.category_id}
                onChange={(e) =>
                  setForm({ ...form, category_id: e.target.value })
                }
              >
                <option value="">Pilih Kategori</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* UPLOAD FOTO */}
            <div>
              <label className="text-sm text-gray-500 block mb-1">
                Foto Produk
              </label>
              {form.image && (
                <img
                  src={form.image}
                  alt="preview"
                  className="w-32 h-32 object-cover rounded mb-2"
                />
              )}
              <FileUploaderRegular
                pubkey="f175522ebe5846404f77"
                onFileUploadSuccess={(file) => {
                  setForm({ ...form, image: file.cdnUrl });
                }}
                imgOnly
                multiple={false}
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded text-sm"
              >
                {editProduct ? "Update Produk" : "Simpan Produk"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded text-sm"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {products.length === 0 ? (
        <p className="text-gray-400 text-sm">Belum ada produk</p>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                    No Image
                  </div>
                )}
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatRupiah(product.price)} · Stok: {product.stock} ·
                    Berat: {product.weight}g
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      product.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-sm bg-yellow-400 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
