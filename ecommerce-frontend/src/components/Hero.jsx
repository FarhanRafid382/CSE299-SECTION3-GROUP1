import { Link } from "react-router-dom";
function Hero(){

return(

<section className="py-20 text-center bg-gray-100">

<h2 className="text-5xl font-bold">

AI Powered E-Commerce

</h2>

<p className="mt-5 text-gray-600 text-lg">

Browse products with intelligent customer support.

</p>

<Link to="/products">
  <button className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
    Shop Now
  </button>
</Link>

</section>

);

}

export default Hero;