import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllProductCategory = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/menu")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched Data:", data); // Debugging

                if (!Array.isArray(data)) {
                    console.error("Invalid API response: Expected an array.");
                    return;
                }

                const categoryMap = {};
                data.forEach((product) => {
                    if (product?.category && product?.thumbnail) {
                        if (!categoryMap[product.category]) {
                            categoryMap[product.category] = product.thumbnail;
                        }
                    }
                });

                const categoryArray = Object.entries(categoryMap).map(([category, thumbnail]) => ({
                    category,
                    thumbnail,
                }));

                setCategories(categoryArray);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="container mx-auto py-10 px-60">
            <h2 className="text-3xl font-bold mb-10 text-center uppercase text-black">Products Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-3">
                {categories.length > 0 ? (
                    categories.map(({ category, thumbnail }) => (
                        <Link key={category} to={`/category/${category}`}>
                            <div className="relative bg-white rounded-lg shadow-lg w-48 h-56 transition-all hover:shadow-xl overflow-hidden flex items-center justify-center">
                                <img src={thumbnail} alt={category} className="w-full h-full object-cover" />
                                <div className="absolute top-[-5px] bg-white shadow-md px-3 py-1 rounded-md text-sm font-semibold text-black">
                                    {category}
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No categories found.</p>
                )}
            </div>
        </div>
    );
};

export default AllProductCategory;
