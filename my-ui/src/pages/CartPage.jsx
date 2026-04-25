import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../features/cart/cartSlice";
import CartTable from "../components/CartTable";
import { Link } from "react-router-dom";

function CartPage() {
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cart Items</h1>

      <div style={{ marginBottom: "20px" }}>
        <Link to="/">Go to Product List</Link>
      </div>

      {loading && <p>Loading cart items...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && <CartTable cartItems={cartItems} />}
    </div>
  );
}

export default CartPage;