import { useParams } from "react-router-dom";

function OrderDetail({ orders }) {
  const { id } = useParams();
  const order = orders[id];

  if (!order) return <p>Order not found.</p>;

  return (
    <div>
      <h1>Order #{parseInt(id) + 1}</h1>
      <p>Date: {order.date}</p>
      <p>Name: {order.name}</p>
      <p>Address: {order.address}</p>
      <p>Payment: {order.paymentMethod}</p>
      <h3>Items:</h3>
      {order.items.map((item) => (
        <div key={item.id}>
          {item.name} — Qty: {item.quantity} — ৳{item.price.toFixed(2)}
        </div>
      ))}
      <h2>Total: ৳{order.total.toFixed(2)}</h2>
    </div>
  );
}

export default OrderDetail;