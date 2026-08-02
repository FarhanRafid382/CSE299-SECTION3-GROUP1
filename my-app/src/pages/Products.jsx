import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../apiConfig";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/store/products/`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([
          { id: 1, name: "Product 1", price: 10.99 },
          { id: 2, name: "Product 2", price: 15.99 },
        ]);
      });
  }, []);

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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-950 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-wide mb-2">Catalog</p>
          <h1 className="text-4xl font-bold text-white mb-8">All Products</h1>
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/15 transition"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <Link to={`/products/${product.id}`}>
                <div className="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/5 transition"></div>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition mb-1">
                  {product.name}
                </h3>
              </Link>
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
        {filteredProducts.length === 0 && (
          <p className="text-gray-500 text-center py-16">No products match your search.</p>
        )}
      </div>
    </div>
  );
}

export default Products;