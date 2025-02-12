import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(""); // Track current main image

    useEffect(() => {
        fetch("http://localhost:5000/menu")
            .then((res) => res.json())
            .then((data) => {
                if (!Array.isArray(data)) {
                    console.error("Invalid API response: Expected an array.");
                    return;
                }

                const foundProduct = data.find((p) => p.id === parseInt(id));
                setProduct(foundProduct);
                if (!foundProduct) return;
                setSelectedSize(foundProduct.sizes ? foundProduct.sizes[0] : "");
                setMainImage(foundProduct.images ? foundProduct.images[0] : "");
            });
    }, [id]);

    if (!product) return <div>Loading...</div>;

    // 🛒 Price Calculation
    const discountAmount = (product.price * product.discountPercentage) / 100;
    const discountedPrice = product.price - discountAmount;


    const addToCart = (product) => {
        if (!product || typeof product !== "object") return;
    
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    
        existingCart.push({
            id: product.id,
            name: product.title,  // Fix: use product.title instead of product.name
            size: selectedSize,  // Fix: store the selected size
            quantity: quantity,  // Fix: store the selected quantity
            price: discountedPrice * quantity, // Fix: calculate price based on quantity
        });
    
        localStorage.setItem("cart", JSON.stringify(existingCart));
        window.location.reload(); // Refresh to update cart count
    };
    

    return (
        <div className="container mx-auto p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Product Image Slider */}
                <div className="flex flex-col items-center">
                    {/* Main Image Display */}
                    <div className="w-full h-96 bg-gray-200">
                        <img
                            src={mainImage}
                            alt={product.title}
                            className="w-full h-full object-contain rounded"
                        />
                    </div>

                    {/* Thumbnails */}
                    <div className="flex mt-3 space-x-2">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt="Thumbnail"
                                className={`w-16 h-16 object-cover border rounded cursor-pointer transition-all 
                                ${mainImage === img ? "border-2 border-blue-500" : "hover:border-blue-500"}`}
                                onClick={() => setMainImage(img)} // Change main image on click
                            />
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <h2 className="text-4xl font-bold text-black mb-8">{product.title}</h2>

                    {/* Price & Discount Details */}
                    <div>
                        <p className="text-xl text-red-500 line-through">${product.price.toFixed(2)}</p>
                        <p className="text-4xl font-bold text-green-600">${discountedPrice.toFixed(2)}</p>
                    </div>

                    {/* Select Size */}
                    <div className="mt-4">
                        <h3 className="text-md font-semibold text-black">Select Size:</h3>
                        <div className="flex space-x-2 mt-2">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 border rounded ${selectedSize === size ? "bg-black text-white" : "bg-white outline"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity Selector and Add to Cart Button */}
                    <div className="mt-4 flex flex-col md:flex-row items-center justify-start w-full gap-4">

                        {/* Quantity Selector */}
                        <div className="flex items-center space-x-3 border rounded px-6 py-1 bg-white">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="text-3xl font-bold rounded text-black">-</button>

                            <input type="text" value={quantity} readOnly
                                className="w-12 text-center border-none bg-transparent text-black font-bold text-xl" />

                            <button onClick={() => setQuantity(quantity + 1)}
                                className="text-3xl font-bold rounded text-black">+</button>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={() => addToCart(product)}
                            className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition w-full md:w-auto"
                        >
                            Add to Cart 🛒
                        </button>

                    </div>

                    <div className="divider text-black"></div>

                    <p className="text-gray-600">{product.description}</p>

                    {/* Specifications */}
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-black">Specifications:</h3>
                        <ul className="list-disc pl-8 mt-2">
                            {Object.entries(product.specifications).map(([key, value]) => (
                                <li key={key} className="text-gray-700">
                                    <strong>{key}:</strong> {value}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
