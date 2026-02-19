// src/components/Profile.jsx
import { useState } from "react";
import axios from "axios";
import BaseUrl from "../constant/Url";

export default function Profile({ profile, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: profile?.name || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
  });

  const token = localStorage.getItem("access_token");

  async function handleUpdateProfile() {
    try {
      const { data } = await axios.put(`${BaseUrl}/user/profile`, profileForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUpdate(data.data); // kirim data terbaru ke Home
      setIsEditing(false);
      alert("Profile berhasil diupdate!");
    } catch (error) {
      alert(error.response?.data?.message || "Gagal update profile");
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-green-700 mb-6">Profile Saya</h2>

      {profile ? (
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Nama</label>
            {isEditing ? (
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            ) : (
              <p className="font-semibold">{profile.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>
            <p className="font-semibold">{profile.email}</p>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">Phone</label>
            {isEditing ? (
              <input
                type="text"
                value={profileForm.phone}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, phone: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            ) : (
              <p className="font-semibold">{profile.phone || "-"}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">Address</label>
            {isEditing ? (
              <input
                type="text"
                value={profileForm.address}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, address: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
            ) : (
              <p className="font-semibold">{profile.address || "-"}</p>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdateProfile}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Simpan
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Batal
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center">Loading...</p>
      )}
    </div>
  );
}
