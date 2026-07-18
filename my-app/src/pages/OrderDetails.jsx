import { useParams } from "react-router-dom";

function OrderDetail({ orders }) {
  const { id } = useParams();
  const order = orders[id];

  if (!order) return <p className="max-w-2xl mx-auto px-4 py-12 text-gray-600">Order not found.</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Order #{parseInt(id) + 1}</h1>
      <div className="text-gray-700 space-y-1 mb-6">
        <p>Date: {order.date}</p>
        <p>Name: {order.name}</p>
        <p>Shipping Address: {order.shippingAddress}</p>
        <p>Billing Address: {order.billingAddress}</p>
        <p>Payment: {order.paymentMethod}</p>
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">Items</h3>
      <div className="space-y-2 mb-6">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-gray-700">
            <span>{item.name} × {item.quantity}</span>
            <span>৳{item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold text-gray-900">Total: ৳{order.total.toFixed(2)}</h2>
    </div>
  );
}

export default OrderDetail;