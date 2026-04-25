import axios from "axios";

const CART_BASE_URL = "http://localhost:8082/carts";
const CART_ITEMS_URL = "http://localhost:8082/carts/items";

export const createCartApi = async (cartData) => {
  const response = await axios.post(CART_BASE_URL, cartData);
  return response.data;
};

export const addToCartApi = async (cartItemData) => {
  const response = await axios.post(CART_ITEMS_URL, cartItemData);
  return response.data;
};

export const fetchCartItemsApi = async () => {
  const response = await axios.get(CART_ITEMS_URL);
  return response.data;
};