import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BaseUrl from "../../constant/Url";

export const fetchProfile = createAsyncThunk("auth/fetchProfile", async () => {
  const token = localStorage.getItem("access_token");
  const { data } = await axios.get(`${BaseUrl}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.profile = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
