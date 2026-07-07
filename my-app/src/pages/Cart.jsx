function Cart({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  return (
    <div>
      <h1>Your Cart</h1>
      {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>${item.price.toFixed(2)}</p>
          <p>Qty: {item.quantity}</p>
        </div>
      ))}
      <h2>Total: ${total.toFixed(2)}</h2>
    </div>
  );
}

export default Cart;