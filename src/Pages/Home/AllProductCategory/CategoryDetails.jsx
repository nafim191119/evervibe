import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CategoryDetails = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/menu")
            .then((res) => res.json())
            .then((data) => {
                if (!Array.isArray(data)) {
                    console.error("Invalid API response: Expected an array.");
                    return;
                }
                
                // Filter products that belong to the selected category
                const filteredProducts = data.filter((product) => product.category === category);
                setProducts(filteredProducts);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [category]);

    return (
        <div className="container mx-auto p-16 mb-24">
            <h2 className="text-3xl font-bold mb-10 text-center uppercase">{category} Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {products.length > 0 ? (
                    products.map((product) => {
                        // Calculate the original price before discount
                        const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
                        const amountSaved = (originalPrice - product.price).toFixed(2);

                        return (
                            <div key={product.id} className="border rounded-lg shadow-md bg-white transition-transform hover:scale-105 flex flex-col h-full">
                                <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover mb-2 rounded" />
                                <div className="flex-grow mx-auto">
                                    <h4 className="text-lg min-h-[40px] text-center text-black font-bold">{product.title}</h4>
                                    <div>
                                        <p className="text-white bg-black px-2 py-[2px] text-[12px] mx-16 rounded-md text-center font-semibold">Save: ${amountSaved}</p> {/* Savings */}
                                    </div>
                                    {/* Price Display */}
                                    <div className="mt-1 flex gap-2 justify-center">
                                        <p className="text-red-500 line-through text-sm text-center">${originalPrice}</p> {/* Original Price */}
                                        <p className="text-gray-800 font-semibold text-2xl text-center">${product.price}</p> {/* Discounted Price */}
                                    </div>

                                    {/* Star Rating Display */}
                                    <div className="text-yellow-500 flex justify-center">
                                        {Array.from({ length: Math.round(product.rating) }).map((_, index) => (
                                            <span key={index}>⭐</span>
                                        ))}
                                    </div>
                                </div>

                                <button className="w-full mt-3 bg-black text-white py-2 transition duration-300 hover:bg-gray-900 active:scale-95">
                                    <Link to={`/product/${product.id}`} className="block w-full h-full">Buy Now 🛒</Link>
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-600">No products available in this category.</p>
                )}
            </div>
        </div>

    );
};

export default CategoryDetails;