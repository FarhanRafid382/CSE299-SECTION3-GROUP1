import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE } from "../apiConfig";

function CategoryDetail() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/store/products/?category=${id}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error("Error fetching category products:", error);
        setProducts([]);
      });
  }, [id]);

  function addToCart(product) {
    const token = localStorage.getItem("accessToken");
    fetch(`${API_BASE}/api/cart/cart-items/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product: product.id, quantity: 1 }),
    })
      .then((response) => response.json())
      .then(() => alert(`${product.name} added to cart!`))
      .catch((error) => console.error("Error adding to cart:", error));
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-950 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <Link to="/categories" className="text-indigo-400 text-sm font-semibold hover:underline mb-2 inline-block">
            ← Back to Categories
          </Link>
          <h1 className="text-4xl font-bold text-white">Category Products</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {products.length === 0 ? (
          <p className="text-gray-500 text-center py-16">No products in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/5 transition"></div>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition mb-1">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-gray-900 font-bold">৳{product.price}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="text-sm font-semibold bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryDetail;