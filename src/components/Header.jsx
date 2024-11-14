import React from "react";
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <header className="bg-dark-blue text-off-white py-4 px-8 flex items-center justify-between shadow-md fixed w-full z-10">
      {/* Logo Section */}
      <div className="w-12">
        <img src={logo} alt="logo.png" />
      </div>

      {/* Buttons */}
      <div className="space-x-4">
        <button className="bg-light-blue px-4 py-2 rounded-small hover:bg-light-blue/70 transition">
          Register
        </button>
        <button className="border border-off-white px-4 py-2 rounded-small hover:bg-off-white hover:text-gray-900 transition">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
