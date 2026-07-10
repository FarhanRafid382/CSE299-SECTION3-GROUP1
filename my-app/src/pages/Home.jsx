function Home() {
  const featuredProducts = [
    { id: 1, name: "Product 1", price: 10.99 },
    { id: 2, name: "Product 2", price: 15.99 },
    { id: 3, name: "Product 3", price: 20.99 },
  ];

  return (
    <div>
      <h1>Welcome to our store</h1>
      <h2>Featured Products</h2>
      <div>
        {featuredProducts.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>৳{product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;