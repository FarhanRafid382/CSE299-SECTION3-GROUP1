import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="flex items-center gap-6 px-6 py-4 border-b border-gray-200 bg-white">
            <Link to="/" className="font-semibold text-gray-800 hover:text-blue-600">Home</Link>
            <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
            <Link to="/register" className="text-gray-600 hover:text-blue-600">Register</Link>
            <Link to="/products" className="text-gray-600 hover:text-blue-600">Products</Link>
            <Link to="/cart" className="text-gray-600 hover:text-blue-600">Cart</Link>
            <Link to="/checkout" className="text-gray-600 hover:text-blue-600">Checkout</Link>
            <Link to="/orders" className="text-gray-600 hover:text-blue-600">Order History</Link>
            <Link to="/chat" className="text-gray-600 hover:text-blue-600">Chat</Link>
            <Link to="/categories" className="text-gray-600 hover:text-blue-600">Categories</Link>
            <Link to="/profile" className="text-gray-600 hover:text-blue-600">Profile</Link>
        </nav>
    )
}

export default Navbar