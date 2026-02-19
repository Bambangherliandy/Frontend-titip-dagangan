import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BaseUrl from "../../constant/Url";

export const fetchProvinces = createAsyncThunk(
  "location/fetchProvinces",
  async () => {
    const token = localStorage.getItem("access_token");
    const { data } = await axios.get(`${BaseUrl}/orders/cities`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  }
);

export const fetchCities = createAsyncThunk(
  "location/fetchCities",
  async (provinceId) => {
    const token = localStorage.getItem("access_token");
    const { data } = await axios.get(
      `${BaseUrl}/orders/cities?province_id=${provinceId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data.data;
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState: {
    provinces: [],
    cities: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetCities: (state) => {
      state.cities = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProvinces.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProvinces.fulfilled, (state, action) => {
        state.loading = false;
        state.provinces = action.payload;
      })
      .addCase(fetchProvinces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetCities } = locationSlice.actions;
export default locationSlice.reducer;
