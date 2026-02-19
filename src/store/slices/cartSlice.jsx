import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BaseUrl from "../../constant/Url";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const token = localStorage.getItem("access_token");
  const { data } = await axios.get(`${BaseUrl}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product_id) => {
    const token = localStorage.getItem("access_token");
    await axios.post(
      `${BaseUrl}/cart`,
      { product_id, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.cartItems = action.payload?.items || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export default cartSlice.reducer;
