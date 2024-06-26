import React from "react";

const Header = () => {
  return (
    <header className="flex justify-end items-center p-4 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <span className="text-gray-700">Johnson Doe</span>
        <img
          src="https://via.placeholder.com/40"
          alt="User avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
