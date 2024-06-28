import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex-1"></div>
      <div className="flex items-center">
        <span className="text-gray-600">Hello, {user.username}</span>
      </div>
    </header>
  );
};

export default Header;
