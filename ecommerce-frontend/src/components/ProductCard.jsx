import { Link } from "react-router-dom";
function ProductCard({product}){

return(

<div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">

<Link to={`/product/${product.id}`}>
<img

src={product.image}

alt={product.name}

className="w-full h-56 object-cover rounded-lg"

/>

<h3 className="text-xl font-semibold mt-4">

{product.name}

</h3>
</Link>

<p className="text-blue-600 font-bold mt-2">

৳ {product.price}

</p>

<button className="mt-4 w-full bg-blue-600 text-white py-2 rounded">

Add to Cart

</button>

</div>

);

}

export default ProductCard;