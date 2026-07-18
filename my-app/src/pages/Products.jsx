import { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Product 1", price: 10.99, categoryId: 1 },
  { id: 2, name: "Product 2", price: 15.99, categoryId: 2 },
  { id: 3, name: "Product 3", price: 20.99, categoryId: 1 },
  { id: 4, name: "Product 4", price: 25.99, categoryId: 3 },
  { id: 5, name: "Product 5", price: 30.99, categoryId: 2 },
];

function Products({ addToCart }) {
  const [search, setSearch] = useState("");
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Products</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm border border-gray-300 rounded-lg px-4 py-2 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border border-gray-200 rounded-lg p-6 shadow-sm">
            <Link to={`/products/${product.id}`}>
              <h3 className="font-semibold text-gray-800 hover:text-blue-600">{product.name}</h3>
            </Link>
            <p className="text-gray-600 mt-1">৳{product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;