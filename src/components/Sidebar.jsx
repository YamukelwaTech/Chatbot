import React, { useState } from "react";
import {
  FiSearch,
  FiUsers,
  FiSettings,
  FiDollarSign,
  FiUserPlus,
  FiMenu,
} from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative lg:w-64 bg-gray-100 border-r border-gray-200">
      <div className="flex justify-between items-center p-4 lg:hidden">
        <h1 className="text-2xl font-bold text-purple-600">Superpage</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          <FiMenu className="text-gray-600" />
        </button>
      </div>
      <nav
        className={`fixed top-0 left-0 h-full bg-gray-100 p-4 transition-transform transform lg:transform-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:flex lg:flex-col`}
      >
        <h1 className="text-2xl font-bold text-purple-600 mb-6 hidden lg:block">
          Superpage
        </h1>
        <ul>
          <li className="flex items-center p-4 text-gray-600 hover:bg-gray-200 cursor-pointer">
            <FiSearch className="mr-4" />
            <span className="hidden lg:inline">AI Chat</span>
          </li>
          <li className="flex items-center p-4 text-gray-600 hover:bg-gray-200 cursor-pointer">
            <FiUsers className="mr-4" />
            <span className="hidden lg:inline">Members</span>
          </li>
          <li className="flex items-center p-4 text-gray-600 hover:bg-gray-200 cursor-pointer">
            <FiSettings className="mr-4" />
            <span className="hidden lg:inline">Integrations</span>
          </li>
          <li className="flex items-center p-4 text-gray-600 hover:bg-gray-200 cursor-pointer">
            <FiUserPlus className="mr-4" />
            <span className="hidden lg:inline">Refer Friends</span>
          </li>
          <li className="flex items-center p-4 text-gray-600 hover:bg-gray-200 cursor-pointer">
            <FiDollarSign className="mr-4" />
            <span className="hidden lg:inline">Pricing Plans</span>
          </li>
          <li className="flex items-center p-4 text-gray-600 hover:bg-gray-200 cursor-pointer">
            <FiSettings className="mr-4" />
            <span className="hidden lg:inline">Settings</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
