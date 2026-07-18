import { useParams } from "react-router-dom";

const products = [
  { id: 1, name: "Product 1", price: 10.99, images: ["img1a.jpg", "img1b.jpg"] },
  { id: 2, name: "Product 2", price: 15.99, images: ["img2a.jpg"] },
  { id: 3, name: "Product 3", price: 20.99, images: ["img3a.jpg"] },
  { id: 4, name: "Product 4", price: 25.99, images: ["img4a.jpg"] },
  { id: 5, name: "Product 5", price: 30.99, images: ["img5a.jpg"] },
];

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p className="max-w-2xl mx-auto px-4 py-12 text-gray-600">Product not found.</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
      <div className="flex gap-3 mb-4">
        {product.images.map((img, index) => (
          <img key={index} src={img} alt={product.name} className="w-32 h-32 object-cover rounded-lg border border-gray-200" />
        ))}
      </div>
      <p className="text-xl text-gray-700 mb-4">৳{product.price.toFixed(2)}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetail;