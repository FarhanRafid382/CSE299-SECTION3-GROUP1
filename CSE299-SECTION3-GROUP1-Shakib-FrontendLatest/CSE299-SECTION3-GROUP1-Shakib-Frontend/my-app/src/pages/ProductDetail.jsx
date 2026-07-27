import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/store/products/${id}/`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  function addToCart() {
    const token = localStorage.getItem("accessToken");
    fetch("http://127.0.0.1:8000/api/cart/cart-items/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ product: id, quantity: 1 }),
    })
      .then((response) => response.json())
      .then(() => alert("Added to cart!"))
      .catch((error) => console.error("Error adding to cart:", error));
  }

  if (!product) return <p className="max-w-2xl mx-auto px-4 py-12 text-gray-600">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
      <p className="text-xl text-gray-700 mb-4">৳{product.price}</p>
      <button
        onClick={addToCart}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetail;