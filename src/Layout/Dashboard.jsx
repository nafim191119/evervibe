import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="lg:w-64 bg-indigo-900 lg:min-h-screen py-4 px-2 md:py-6 md:px-4">
        <div className="mb-4 md:mb-8 px-2 md:px-4">
          <h1 className="text-xl md:text-3xl font-bold text-white text-center">
            <p>⭐⭐⭐</p>
            <span className="text-indigo-300"> Ever</span>vibe
          </h1>
        </div>

        {/* Navigation - Horizontal on mobile, Vertical on desktop */}
        <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible space-x-2 md:space-x-0 md:space-y-2">
          <Link
            to="/"
            className="flex items-center px-2 py-2 md:px-4 md:py-2 text-gray-200 hover:bg-indigo-800 rounded-lg transition-colors duration-200 whitespace-nowrap flex-shrink-0"
          >
            <span className="md:mx-2">🏠</span>
            <span className="text-sm font-medium">Home</span>
          </Link>
          <Link
            to="orderedProducts"
            className="flex items-center px-2 py-2 md:px-4 md:py-2 text-gray-200 hover:bg-indigo-800 rounded-lg transition-colors duration-200 whitespace-nowrap flex-shrink-0"
          >
            <span className="md:mx-2">📦</span>
            <span className="text-sm font-medium">Ordered</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
