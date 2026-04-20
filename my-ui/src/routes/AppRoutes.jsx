import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductListPage from "../pages/ProductListPage";
import AddProductPage from "../pages/AddProductPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;