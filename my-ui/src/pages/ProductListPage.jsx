import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";
import { addToCart, createCart } from "../features/cart/cartSlice";
import ProductTable from "../components/ProductTable";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router-dom";

function ProductListPage() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);
  const cartState = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!cartState.cart) {
      dispatch(createCart({ userId: 101 }));
    }
  }, [dispatch, cartState.cart]);

  const handleAddToCart = async (productId) => {
    if (!cartState.cart?.id) {
      alert("Cart is not ready yet. Please wait and try again.");
      return;
    }

    const payload = {
      cartId: cartState.cart.id,
      productId: productId,
      quantity: 1,
    };

    const resultAction = await dispatch(addToCart(payload));

    if (addToCart.fulfilled.match(resultAction)) {
      alert("Item added to cart successfully");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product List</h1>

      <div style={{ marginBottom: "20px" }}>
        <Link to="/add-product" style={{ marginRight: "20px" }}>
          Go to Add Product
        </Link>

        <Link to="/cart">Go to Cart</Link>
      </div>

      <ErrorMessage message={error} />
      <ErrorMessage message={cartState.error} />

      {loading && <LoadingSpinner message="Loading products..." />}
      {cartState.loading && <LoadingSpinner message="Processing cart request..." />}

      {!loading && !error && (
        <ProductTable products={products} onAddToCart={handleAddToCart} />
      )}

      {cartState.successMessage && (
        <p style={{ color: "green" }}>{cartState.successMessage}</p>
      )}
    </div>
  );
}

export default ProductListPage;