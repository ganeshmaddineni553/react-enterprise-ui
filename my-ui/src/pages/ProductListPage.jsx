import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";
import { addToCart, createCart } from "../features/cart/cartSlice";
import ProductTable from "../components/ProductTable";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router-dom";

function ProductListPage() {
  const dispatch = useDispatch();

  const { products, loading, error, page, totalPages } = useSelector(
    (state) => state.products
  );

  const cartState = useSelector((state) => state.cart);

  const [searchText, setSearchText] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    dispatch(fetchProducts({ page: 0, size: 5, sortBy: "id" }));
  }, [dispatch]);

  useEffect(() => {
    if (!cartState.cart) {
      dispatch(createCart({ userId: 101 }));
    }
  }, [dispatch, cartState.cart]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesPrice =
        maxPrice === "" || Number(product.price) <= Number(maxPrice);

      return matchesName && matchesPrice;
    });
  }, [products, searchText, maxPrice]);

  const handlePreviousPage = () => {
    if (page > 0) {
      dispatch(fetchProducts({ page: page - 1, size: 5, sortBy: "id" }));
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      dispatch(fetchProducts({ page: page + 1, size: 5, sortBy: "id" }));
    }
  };

  const handlePageNumberClick = (pageNumber) => {
    dispatch(fetchProducts({ page: pageNumber, size: 5, sortBy: "id" }));
  };

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

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by product name"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          style={{ marginRight: "10px", padding: "8px" }}
        />

        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(event) => setMaxPrice(event.target.value)}
          style={{ marginRight: "10px", padding: "8px" }}
        />

        <button
          onClick={() => {
            setSearchText("");
            setMaxPrice("");
          }}
        >
          Clear Filters
        </button>
      </div>

      <ErrorMessage message={error} />
      <ErrorMessage message={cartState.error} />

      {loading && <LoadingSpinner message="Loading products..." />}

      {cartState.loading && (
        <LoadingSpinner message="Processing cart request..." />
      )}

      {!loading && !error && (
        <>
          <ProductTable
            products={filteredProducts}
            onAddToCart={handleAddToCart}
          />

          <div style={{ marginTop: "20px" }}>
            <button onClick={handlePreviousPage} disabled={page === 0}>
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageNumberClick(index)}
                style={{
                  marginLeft: "5px",
                  marginRight: "5px",
                  fontWeight: page === index ? "bold" : "normal",
                }}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={page === totalPages - 1}
            >
              Next
            </button>

            <span style={{ marginLeft: "15px" }}>
              Page {page + 1} of {totalPages}
            </span>
          </div>
        </>
      )}

      {cartState.successMessage && (
        <p style={{ color: "green" }}>{cartState.successMessage}</p>
      )}
    </div>
  );
}

export default ProductListPage;