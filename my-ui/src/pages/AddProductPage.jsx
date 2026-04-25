import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProductMessage,
  createProduct,
} from "../features/product/productSlice";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function AddProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, successMessage } = useSelector(
    (state) => state.products
  );

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    return () => {
      dispatch(clearProductMessage());
    };
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      name: formData.name,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    const resultAction = await dispatch(createProduct(payload));

    if (createProduct.fulfilled.match(resultAction)) {
      setFormData({
        name: "",
        price: "",
        stock: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Product</h1>

      <div style={{ marginBottom: "20px" }}>
        <Link to="/">Go to Product List</Link>
      </div>

      <ErrorMessage message={error} />

      {loading && <LoadingSpinner message="Creating product..." />}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Price: </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Stock: </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Create Product"}
        </button>
      </form>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}

export default AddProductPage;