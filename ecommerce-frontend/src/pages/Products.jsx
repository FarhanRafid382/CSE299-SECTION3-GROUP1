import Navbar from "../components/Navbar";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";

function Products() {
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto py-10 px-6">
        <h1 className="text-4xl font-bold mb-8">
          All Products
        </h1>

        <FeaturedProducts />
      </div>

      <Footer />
    </>
  );
}

export default Products;