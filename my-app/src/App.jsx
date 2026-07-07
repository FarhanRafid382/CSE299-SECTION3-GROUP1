import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import { useState } from "react";
import Cart from "./pages/Cart";



function App() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
}


  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/products" element={<Products addToCart={addToCart} />} />
    <Route path="/cart" element={<Cart cart={cart} />} />
    </Routes>
    </BrowserRouter>
  );  
}

export default App

