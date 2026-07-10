function OrderHistory({ orders }) {
  return (
    <div>
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <h2>Order #{index + 1}</h2>
              <p>Name: {order.name}</p>
              <p>Address: {order.address}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Total: ৳{order.total.toFixed(2)}</p>
              <p>Date: {order.date}</p>
              <h3>Items:</h3>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} - Quantity: {item.quantity} - Price: ৳{item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistory;