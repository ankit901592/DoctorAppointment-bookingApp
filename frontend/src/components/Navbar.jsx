import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";
const Navbar = () => {
  const navigate = useNavigate();
  const [showMenue, setShowMenu] = useState(false);
  const {token,setToken,userData} = useContext(AppContext);
  
  const logOut = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
   <div className="flex items-center justify-between gap-4 py-4 mb-5 border-b border-gray-400">
  {/* Logo */}
  <img
    onClick={() => navigate("/")}
    className="w-36 sm:w-44 cursor-pointer shrink-0"
    src={assets.logo}
    alt="logo"
  />

  {/* Desktop Navigation */}
  <ul className="hidden md:flex items-center gap-8 font-medium">
    <NavLink to="/">
      <li className="py-1">HOME</li>
    </NavLink>

    <NavLink to="/doctors">
      <li className="py-1">ALL DOCTORS</li>
    </NavLink>

    <NavLink to="/about">
      <li className="py-1">ABOUT</li>
    </NavLink>

    <NavLink to="/contact">
      <li className="py-1">CONTACT</li>
    </NavLink>
  </ul>

  {/* Right Side */}
  <div className="flex items-center justify-end gap-3 shrink-0">
    {token && userData ? (
      <div className="flex items-center gap-2 cursor-pointer group relative">
        <img
          className="w-8 rounded-full"
          src={userData.image}
          alt="Profile"
        />
        <img
          className="w-2.5"
          src={assets.dropdown_icon}
          alt="Dropdown"
        />

        <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
          <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
            <p
              onClick={() => navigate("/my-profile")}
              className="hover:text-black cursor-pointer"
            >
              My Profile
            </p>
            <p
              onClick={() => navigate("/my-appointments")}
              className="hover:text-black cursor-pointer"
            >
              Appointments
            </p>
            <p
              onClick={logOut}
              className="hover:text-black cursor-pointer"
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    ) : (
      <button
        onClick={() => navigate("/login")}
        className="bg-primary text-white px-5 lg:px-8 py-3 rounded-full font-light whitespace-nowrap hidden md:block"
      >
        Create Account
      </button>
    )}

    {/* Mobile Menu Icon */}
    <img
      onClick={() => setShowMenu(true)}
      className="w-6 cursor-pointer md:hidden"
      src={assets.menu_icon}
      alt="Menu"
    />
  </div>

  {/* Mobile Menu */}
  <div
    className={`${
      showMenue
        ? "fixed inset-0 w-full h-screen"
        : "fixed top-0 right-0 h-0 w-0"
    } md:hidden z-20 overflow-hidden bg-white transition-all duration-300`}
  >
    <div className="flex items-center justify-between px-5 py-6">
      <img className="w-36" src={assets.logo} alt="Logo" />
      <img
        className="w-7 cursor-pointer"
        onClick={() => setShowMenu(false)}
        src={assets.cross_icon}
        alt="Close"
      />
    </div>

    <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
      <NavLink onClick={() => setShowMenu(false)} to="/">
        <p className="px-4 py-2 rounded inline-block">HOME</p>
      </NavLink>

      <NavLink onClick={() => setShowMenu(false)} to="/doctors">
        <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
      </NavLink>

      <NavLink onClick={() => setShowMenu(false)} to="/about">
        <p className="px-4 py-2 rounded inline-block">ABOUT</p>
      </NavLink>

      <NavLink onClick={() => setShowMenu(false)} to="/contact">
        <p className="px-4 py-2 rounded inline-block">CONTACT US</p>
      </NavLink>
    </ul>
  </div>
</div>
  );
};

export default Navbar;
