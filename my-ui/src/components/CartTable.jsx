function CartTable({ cartItems }) {
    return (
      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cart ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
          </tr>
        </thead>
  
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No cart items found
              </td>
            </tr>
          ) : (
            cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.cartId}</td>
                <td>{item.productId}</td>
                <td>{item.quantity}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }
  
  export default CartTable;