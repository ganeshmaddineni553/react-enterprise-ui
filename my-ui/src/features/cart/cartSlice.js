import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCartApi,
  createCartApi,
  fetchCartItemsApi,
} from "../../services/cartService";

const initialState = {
  cart: null,
  cartItems: [],
  loading: false,
  error: null,
  successMessage: "",
};

export const createCart = createAsyncThunk(
  "cart/createCart",
  async (cartData, thunkAPI) => {
    try {
      return await createCartApi(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to create cart");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartItemData, thunkAPI) => {
    try {
      return await addToCartApi(cartItemData);
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add item to cart");
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, thunkAPI) => {
    try {
      return await fetchCartItemsApi();
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch cart items");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartMessage: (state) => {
      state.successMessage = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.successMessage = "Cart created successfully";
      })
      .addCase(createCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Item added to cart successfully";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCartMessage } = cartSlice.actions;
export default cartSlice.reducer;