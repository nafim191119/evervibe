import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const removeItem = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const totalAmount = cart.reduce((total, item) => total + item.price, 0);

    return (
        <div className="container mx-auto px-4 md:px-20 lg:px-44 py-10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center uppercase">🛒 Your Shopping Cart</h1>

            {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center">
                    <img 
                        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" 
                        alt="Empty Cart"
                        className="w-40 md:w-48 opacity-75 mb-4"
                    />
                    <p className="text-gray-600 text-lg">Your cart is empty.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {cart.map((item, index) => (
                        <div 
                            key={index} 
                            className="flex flex-col md:flex-row items-center md:justify-between p-5 bg-blue-50 shadow-md rounded-lg transition duration-300 hover:shadow-xl"
                        >
                            <div className="text-center md:text-left">
                                <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
                                <p className="text-gray-600">Size: <span className="font-medium">{item.size}</span></p>
                                <p className="text-gray-600">Quantity: <span className="font-medium">{item.quantity}</span></p>
                                <p className="text-gray-800 font-bold text-xl mt-2">${item.price.toFixed(2)}</p>
                            </div>
                            <button
                                onClick={() => removeItem(index)}
                                className="mt-4 md:mt-0 btn btn-md bg-white border border-red-500 text-red-500 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {cart.length > 0 && (
                <div className="mt-8 flex flex-col md:items-end">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                        Grand Total: <span className="text-green-600">${totalAmount.toFixed(2)}</span>
                    </h2>
                    <button className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-md transition duration-300 w-full md:w-auto">
                        <Link to={'/checkout'}>🛍️ Check out</Link>
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
