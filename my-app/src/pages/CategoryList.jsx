import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "Clothing" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Home Goods" },
];

function CategoryList() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.id}`}
            className="border border-gray-200 rounded-lg p-6 text-center font-semibold text-gray-800 hover:border-blue-400 hover:text-blue-600 transition"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;