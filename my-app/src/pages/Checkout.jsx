import { useState } from 'react';

function Checkout({ cart, placeOrder }) {
  const [name, setName] = useState('');
  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleSubmit(e) {
    e.preventDefault();
    const order = { name, shippingAddress, billingAddress, paymentMethod, items: cart, total, date: new Date().toLocaleDateString() };
    placeOrder(order);
  }

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h1>
      <div className="space-y-2 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-gray-700">
            <span>{item.name} × {item.quantity}</span>
            <span>৳{item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-8">Total: ৳{total.toFixed(2)}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Shipping Address</label>
          <input type="text" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Billing Address</label>
          <input type="text" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Payment Method</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className={inputClass} required>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bankTransfer">Bank Transfer</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;