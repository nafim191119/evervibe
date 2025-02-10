import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from '../../providers/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const isAdmin = true;

    useEffect(() => {
        const updateCartCount = () => {
            const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCartCount(storedCart.length);
        };
        updateCartCount(); // Initial load
        // Listen for cart updates
        window.addEventListener("cartUpdated", updateCartCount);
        return () => {
            window.removeEventListener("cartUpdated", updateCartCount);
        };
    }, []);

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-end gap-6">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img
                        src="https://i.ibb.co/v47v1GxC/Logo-EV-removebg-preview.png"
                        alt="Logo"
                        className="w-16"
                    />
                </Link>

                {/* Desktop Navigation Links */}
                {
                    isAdmin ?
                        <div className="hidden md:flex space-x-6">
                            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
                            <Link to="/products" className="text-gray-700 hover:text-blue-600 transition">Products</Link>
                            <Link to="/offers" className="text-gray-700 hover:text-blue-600 transition">Offers</Link>
                            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition">Dashboard</Link>
                        </div>
                        :
                        <div className="hidden md:flex space-x-8">
                            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
                            <Link to="/products" className="text-gray-700 hover:text-blue-600 transition">Products</Link>
                            <Link to="/offers" className="text-gray-700 hover:text-blue-600 transition">Offers</Link>
                        </div>
                }

                {/* Search Bar */}
                <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-96">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="bg-transparent outline-none w-full"
                    />
                    <IoSearch className="text-gray-500 ml-2" />
                </div>

                {/* Cart & Profile */}
                <div className="flex items-center gap-6">
                    {/* Cart Icon */}
                    <Link to="/cart" className="relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Profile */}
                    <div className="relative group">
                        <img
                            src={user?.photoURL || "https://i.ibb.co/kDq7DST/male-user-filled-icon-man-icon-115533970576b3erfsss1.png"}
                            alt="Profile"
                            className="h-8 w-8 rounded-full cursor-pointer"
                        />
                        <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-lg p-4 min-w-[200px]">
                            {user ?
                                (
                                    <button onClick={logOut} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Logout</button>
                                )
                                :
                                (
                                    <>
                                        <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                                            Login
                                        </Link>
                                        <Link to="/signup" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                                            Sign Up
                                        </Link>
                                    </>
                                )
                            }
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <HiX className="w-7 h-7" /> : <HiMenu className="w-7 h-7" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <div className="flex flex-col items-center py-4 space-y-4">
                        <Link to="/" className="text-gray-700 hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/products" className="text-gray-700 hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>Products</Link>
                        <Link to="/offers" className="text-gray-700 hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>Offers</Link>
                        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
