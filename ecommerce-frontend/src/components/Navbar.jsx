import { Link } from "react-router-dom";
function Navbar(){

return(

<nav className="bg-white shadow">

<div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

<h1 className="text-3xl font-bold text-blue-600">

AI Store

</h1>

<div className="space-x-6 font-medium">

<Link to="/">Home</Link>

<Link to="/products">Products</Link>

<Link to="/cart">Cart</Link>

<Link to="/orders">Orders</Link>

<Link to="/chatbot">Support</Link>

<Link to="/login">Login</Link>

</div>

</div>

</nav>

);

}

export default Navbar;