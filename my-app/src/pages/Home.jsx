function Home() {
  const featuredProducts = [
    { id: 1, name: "Product 1", price: 10.99 },
    { id: 2, name: "Product 2", price: 15.99 },
    { id: 3, name: "Product 3", price: 20.99 },
  ];

  return (
    <div>
      <div className="bg-gray-50 py-24 text-center px-4">
        <h1 className="text-5xl font-bold text-gray-900 max-w-2xl mx-auto leading-tight">
          Welcome to our store
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mt-4 text-lg">
          Fresh picks, great prices, delivered to your door.
        </p>
      </div>

      <div className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-lg p-6 text-center shadow-sm">
              <h3 className="font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mt-1">৳{product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;