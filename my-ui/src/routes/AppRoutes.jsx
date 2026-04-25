import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductListPage from "../pages/ProductListPage";
import AddProductPage from "../pages/AddProductPage";
import CartPage from "../pages/CartPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;