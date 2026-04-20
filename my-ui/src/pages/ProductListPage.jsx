import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";
import ProductTable from "../components/ProductTable";
import { Link } from "react-router-dom";

function ProductListPage() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product List</h1>

      <div style={{ marginBottom: "20px" }}>
        <Link to="/add-product">Go to Add Product</Link>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && <ProductTable products={products} />}
    </div>
  );
}

export default ProductListPage;