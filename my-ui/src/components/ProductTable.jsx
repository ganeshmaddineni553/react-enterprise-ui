function ProductTable({ products, onAddToCart }) {
  return (
    <table border="1" cellPadding="10" cellSpacing="0" width="100%">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan="5" style={{ textAlign: "center" }}>
              No products found
            </td>
          </tr>
        ) : (
          products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => onAddToCart(product.id)}>
                  Add to Cart
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default ProductTable;