import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//2C Redux Toolkit integration for products
import { createProductApi, fetchAllProductsApi } from "../../services/productService";

const initialState = {
  products: [],
  loading: false,
  error: null,
  successMessage: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      return await fetchAllProductsApi();
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch products");
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, thunkAPI) => {
    try {
      return await createProductApi(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to create product");
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
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Error fetching products";
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
      .addCase(createProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Error creating product";
      });
  },
});

export const { clearProductMessage } = productSlice.actions;
export default productSlice.reducer;