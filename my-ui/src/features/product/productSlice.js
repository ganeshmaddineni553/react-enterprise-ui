import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProductApi,
  fetchProductsByPageApi,
} from "../../services/productService";

const initialState = {
  products: [],
  loading: false,
  error: null,
  successMessage: "",
  page: 0,
  totalPages: 0,
  totalElements: 0,
  pageSize: 5,
  sortBy: "id",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, size, sortBy }, thunkAPI) => {
    try {
      return await fetchProductsByPageApi(page, size, sortBy);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching products"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, thunkAPI) => {
    try {
      return await createProductApi(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error creating product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductMessage: (state) => {
      state.successMessage = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.content || [];
        state.page = action.payload.number || 0;
        state.totalPages = action.payload.totalPages || 0;
        state.totalElements = action.payload.totalElements || 0;
        state.pageSize = action.payload.size || 5;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching products";
      })

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = "";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.successMessage = "Product created successfully";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error creating product";
      });
  },
});

export const { clearProductMessage } = productSlice.actions;
export default productSlice.reducer;