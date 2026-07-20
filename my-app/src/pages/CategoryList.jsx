import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/store/categories/")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([
          { id: 1, name: "Clothing" },
          { id: 2, name: "Electronics" },
          { id: 3, name: "Home Goods" },
        ]);
      });
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-950 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-wide mb-2">Browse</p>
          <h1 className="text-4xl font-bold text-white">Categories</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="group relative h-48 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-700 flex items-end p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <h3 className="relative text-white text-xl font-bold group-hover:text-indigo-300 transition">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryList;