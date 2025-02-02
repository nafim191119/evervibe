import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllProductCategory = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch products from API
        fetch("/data.json") // Public folder files should be accessed like this
            .then((res) => res.json())
            .then((data) => {
                // Extract unique categories with their respective first product thumbnail
                const categoryMap = {};
                data.products.forEach((product) => {
                    if (!categoryMap[product.category]) {
                        categoryMap[product.category] = product.thumbnail;
                    }
                });

                // Convert to array format
                const categoryArray = Object.entries(categoryMap).map(([category, thumbnail]) => ({
                    category,
                    thumbnail,
                }));

                setCategories(categoryArray);
            });
    }, []);

    return (
        <div className="container mx-auto py-10 px-32">
            <h2 className="text-3xl font-bold mb-10 text-center uppercase">Product Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {categories.map(({ category, thumbnail }) => (
                    <Link key={category} to={`/category/${category}`}>
                        <div className="relative bg-white rounded-lg shadow-lg w-48 h-56 transition-all hover:shadow-xl overflow-hidden flex items-center justify-center">
                            {/* Product Image */}
                            <img src={thumbnail} alt={category} className="w-full h-full object-cover" />

                            {/* Category Name Overlay */}
                            <div className="absolute top-[-5px] bg-white shadow-md px-3 py-1 rounded-md text-sm font-semibold text-black">
                                {category}
                            </div>
                        </div>
                    </Link>
                ))}


            </div>
        </div>
    );
};

export default AllProductCategory;
