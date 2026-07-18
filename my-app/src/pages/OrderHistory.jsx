import { Link } from "react-router-dom";

function OrderHistory({ orders }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Order History</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders placed yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order, index) => (
            <Link
              key={index}
              to={`/orders/${index}`}
              className="block border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition"
            >
              <div className="flex justify-between text-gray-800">
                <span className="font-medium">Order #{index + 1}</span>
                <span>{order.date}</span>
                <span className="font-semibold">৳{order.total.toFixed(2)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;