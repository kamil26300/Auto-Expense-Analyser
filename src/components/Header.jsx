import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-dark-blue text-off-white px-8 flex items-center justify-between shadow-md fixed w-full z-10 p-4">
      {/* Logo Section */}
      <Link to="/" className="w-24 rounded-full">
        <img src={logo} alt="logo.png" />
      </Link>

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
