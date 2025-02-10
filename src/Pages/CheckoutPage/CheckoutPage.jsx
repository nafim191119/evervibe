import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const [cart, setCart] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        backupPhone: "",
        coupon: "",
        insideDhaka: true,
    });

    const [discount, setDiscount] = useState(0);
    const navigate = useNavigate();

    // Predefined coupon codes
    const validCoupons = ["SAVE10", "DISCOUNT10", "OFFER10"];

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const applyCoupon = () => {
        if (validCoupons.includes(formData.coupon.trim().toUpperCase())) {
            setDiscount(0.1); // 10% discount
        } else {
            setDiscount(0);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        applyCoupon();

        const response = await fetch("http://localhost:5000/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData, cart }),
        });

        if (response.ok) {
            alert("Order placed successfully!");
            navigate("/");
        } else {
            alert("Failed to place order!");
        }
    };

    const productTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryCharge = formData.insideDhaka ? 80 : 160;
    const discountAmount = discount * productTotal;
    const totalAmount = productTotal - discountAmount + deliveryCharge;

    return (
        <div className="max-w-6xl mx-auto px-2 py-10">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 uppercase">Checkout</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Left Side: Order Form */}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-black">Shipping Information</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text" name="name" placeholder="Full Name"
                            value={formData.name} onChange={handleChange}
                            className="w-full p-3 border rounded-lg bg-gray-100" required
                        />
                        <input
                            type="email" name="email" placeholder="Email"
                            value={formData.email} onChange={handleChange}
                            className="w-full p-3 border rounded-lg bg-gray-100" required
                        />
                        <input
                            type="text" name="phone" placeholder="Phone Number"
                            value={formData.phone} onChange={handleChange}
                            className="w-full p-3 border rounded-lg bg-gray-100" required
                        />
                        <textarea
                            name="address" placeholder="Shipping Address"
                            value={formData.address} onChange={handleChange}
                            className="w-full p-3 border rounded-lg bg-gray-100" required
                        />
                        <input
                            type="text" name="backupPhone" placeholder="Backup Phone (Optional)"
                            value={formData.backupPhone} onChange={handleChange}
                            className="w-full p-3 border rounded-lg bg-gray-100"
                        />
                        <div className="divider h-10"></div>
                        {/* Coupon Code */}
                        <h1 className="text-black font-bold text-lg">Got any Coupon Code?</h1>
                        <div className="flex gap-2">
                            <input
                                type="text" name="coupon" placeholder="Coupon Code (Optional)"
                                value={formData.coupon} onChange={handleChange}
                                className="w-full p-3 border rounded-lg bg-gray-100"
                            />
                            <button
                                type="button"
                                onClick={applyCoupon}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300"
                            >
                                Apply
                            </button>
                        </div>
                        {discount > 0 && <p className="text-green-600 font-semibold">Coupon Applied! 10% Discount</p>}

                        {/* Delivery Location */}
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox" name="insideDhaka" value="true"
                                    checked={formData.insideDhaka} onChange={() => setFormData({ ...formData, insideDhaka: true })}
                                    className="checkbox checkbox-primary"
                                />
                                <span className="text-gray-800">Inside Dhaka (+$80)</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox" name="insideDhaka" value="false"
                                    checked={!formData.insideDhaka} onChange={() => setFormData({ ...formData, insideDhaka: false })}
                                    className="checkbox checkbox-primary"
                                />
                                <span className="text-gray-800">Outside Dhaka (+$160)</span>
                            </label>
                        </div>
                        {/* TODO: Terms and Condition */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
                        >
                            🛍️ Place Order
                        </button>
                    </form>
                </div>

                {/* Right Side: Order Summary */}
                <div className="bg-gray-100 shadow-lg rounded-lg p-6 text-black">
                    <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>

                    {cart.length > 0 ? (
                        <>
                            <ul className="divide-y">
                                {cart.map((item, index) => (
                                    <li key={index} className="flex justify-between py-3 text-sm">
                                        <span>{item.name} x {item.quantity}</span>
                                        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4">
                                <p className="flex justify-between font-semibold">
                                    <span>Product Total:</span>
                                    <span>${productTotal.toFixed(2)}</span>
                                </p>
                                {discount > 0 && (
                                    <p className="flex justify-between text-green-600 font-semibold">
                                        <span>Discount (10%):</span>
                                        <span>-${discountAmount.toFixed(2)}</span>
                                    </p>
                                )}
                                <p className="flex justify-between font-semibold">
                                    <span>Delivery Charge:</span>
                                    <span>${deliveryCharge.toFixed(2)}</span>
                                </p>
                                <p className="flex justify-between text-xl font-bold text-blue-600 mt-2">
                                    <span>Total:</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </p>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-red-500">Your cart is empty!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
