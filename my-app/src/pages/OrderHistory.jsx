import { Link } from "react-router-dom";

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
              <Link to={`/orders/${index}`}>
                Order #{index + 1} — {order.date} — ৳{order.total.toFixed(2)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistory;