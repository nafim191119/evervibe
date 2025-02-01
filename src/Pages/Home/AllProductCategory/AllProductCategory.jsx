import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllProductCategory = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch products from API
        fetch("../../../../public/data.json")
            .then((res) => res.json())
            .then((data) => {
                // Extract unique categories from products
                const uniqueCategories = [...new Set(data.products.map((p) => p.category))];
                setCategories(uniqueCategories);
            });
    }, []);
    return (
        <div className="container mx-auto py-10 px-32">
            <h2 className="text-3xl font-bold mb-10 text-center uppercase">Product Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {categories.map((category) => (
                    <Link key={category} to={`/category/${category}`}>
                        <div className="border p-2 rounded-md shadow-md bg-white cursor-pointer hover:bg-gray-100 h-48 w-48">
                            <h3 className="text-md font-semibold capitalize text-black text-center">{category}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllProductCategory;