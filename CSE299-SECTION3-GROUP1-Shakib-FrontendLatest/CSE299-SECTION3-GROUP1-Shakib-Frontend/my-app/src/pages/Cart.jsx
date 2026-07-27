import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    fetch("http://127.0.0.1:8000/api/cart/cart-items/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => {
        console.error("Error fetching cart:", error);
        setCart([]);
      });
  }, []);

  function removeFromCart(id) {
    const token = localStorage.getItem("accessToken");
    fetch(`http://127.0.0.1:8000/api/cart/cart-items/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setCart(cart.filter((item) => item.id !== id)))
      .catch((error) => console.error("Error removing item:", error));
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-950 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-wide mb-2">Your Selection</p>
          <h1 className="text-4xl font-bold text-white">Cart</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-6">Your cart is empty.</p>
            <Link to="/products" className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-600 transition">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-10">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-gray-500 text-sm">৳{item.price} × {item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-sm font-semibold text-red-500 hover:text-red-700 transition">
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center border-t border-gray-200 pt-6">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">৳{total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="mt-8 block text-center bg-gray-950 text-white py-4 rounded-full font-semibold hover:bg-indigo-600 transition">
              Proceed to Checkout
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;