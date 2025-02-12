import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaLocationDot,
  FaTruck,
  FaBangladeshiTakaSign,
  FaBoxOpen,
} from "react-icons/fa6";

const OrderProduct = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to manage modal visibility

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/orders");
        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();

        const formattedOrders = data.map((order) => {
          const productTotal =
            order.cart?.reduce((sum, product) => sum + product.price, 0) || 0;
          const discountAmount = order.discount
            ? (productTotal * order.discount) / 100
            : 0;
          const deliveryCharge = order.insideDhaka ? 80 : 160;
          const totalAmount = productTotal - discountAmount + deliveryCharge;

          return {
            ...order,
            totalAmount,
            status: order.orderStatus || "pending",
            insideDhaka:
              typeof order.insideDhaka === "boolean" ? order.insideDhaka : true,
            orderDate: order.createdAt || new Date().toISOString(),
          };
        });

        setOrders(formattedOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order
      )
    );
    if (selectedOrder) {
      setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const updatePaidStatus = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === id ? { ...order, paid: "yes" } : order
      )
    );
    if (selectedOrder?._id === id) {
      setSelectedOrder((prev) => ({ ...prev, paid: "yes" }));
    }
  };

  const formatAmount = (amount) => (amount || 0).toFixed(2);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "N/A";
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg max-w-2xl mx-auto">
        Error: {error}
      </div>
    );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <FaBoxOpen className="text-indigo-600" /> Order Management
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Showing {orders.length} orders
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-indigo-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-900">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-900">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-900">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-900">
                Total (৳)
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-900">
                Location
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-900">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-900">
                Actions
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-indigo-900">
                Paid
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                  #{order._id ? order._id.slice(-6).toUpperCase() : "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {formatDate(order.orderDate)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex flex-col">
                    <span className="font-medium">{order.name || "N/A"}</span>
                    <span className="text-gray-500 text-sm">
                      {order.email || "N/A"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                  <FaBangladeshiTakaSign className="inline mr-1 text-green-600" />
                  {formatAmount(order.totalAmount)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaLocationDot className="text-red-500" />
                    {order.insideDhaka ? "Inside Dhaka" : "Outside Dhaka"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openModal(order)}
                    className="text-indigo-600 hover:text-indigo-900 font-medium text-sm"
                  >
                    Details
                  </button>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.paid === "yes"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.paid || "no"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-gray-800">
              Order Details
            </h2>
            <p className="text-sm text-gray-600">
              Order ID: #{selectedOrder._id.slice(-6)}
            </p>

            <div className="mt-4 border-b pb-4">
              <h3 className="text-lg font-medium text-gray-700">
                Customer Info
              </h3>
              <p className="text-gray-700">Name: {selectedOrder.name}</p>
              <p className="text-gray-700">Email: {selectedOrder.email}</p>
              <p className="text-gray-700 font-bold">
                Phone: {selectedOrder.phone || "N/A"}
              </p>
              {selectedOrder.backupPhone && (
                <p className="text-gray-700 font-bold">
                  Alt. Phone: {selectedOrder.backupPhone}
                </p>
              )}
              <p className="text-gray-700 font-bold">
                Address: {selectedOrder.address || "N/A"}
              </p>
              <p className="text-gray-700">
                Location:{" "}
                {selectedOrder.insideDhaka ? "Inside Dhaka" : "Outside Dhaka"}
              </p>
            </div>

            <div className="mt-4 border-b pb-4">
              <h3 className="text-lg font-medium text-gray-700">Products</h3>
              <div className="space-y-3 mt-2">
                {selectedOrder.cart.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 border p-3 rounded-md"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: ৳{product.price.toFixed(2)} ×{" "}
                        {product.quantity || 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-700">
                Order Summary
              </h3>
              <p className="text-gray-700">
                Subtotal: ৳
                {selectedOrder.cart
                  .reduce(
                    (sum, product) =>
                      sum + product.price * (product.quantity || 1),
                    0
                  )
                  .toFixed(2)}
              </p>
              <p className="text-gray-700">
                Discount:{" "}
                {selectedOrder.discount ? `${selectedOrder.discount}%` : "N/A"}
              </p>
              <p className="text-gray-700">
                Delivery Charge: ৳{selectedOrder.insideDhaka ? "80" : "160"}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                Total: ৳{selectedOrder.totalAmount.toFixed(2)}
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-700">Status</h3>
              <p className="text-gray-700">
                Current Status: {selectedOrder.status}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() =>
                    updateOrderStatus(selectedOrder._id, "delivered")
                  }
                  className="bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  Delivered to Pathao
                </button>
                <button
                  onClick={() => updatePaidStatus(selectedOrder._id)}
                  className={`bg-green-600 text-white py-2 px-4 rounded-md ${
                    selectedOrder.paid === "yes"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={selectedOrder.paid === "yes"}
                >
                  {selectedOrder.paid === "yes"
                    ? "Payment Confirmed"
                    : "Mark as Paid"}
                </button>
              </div>
            </div>

            <button
              onClick={closeModal}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderProduct;
