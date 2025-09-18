import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isDoctor } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="flex  items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => {
          navigate("/");
        }}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <li className="py-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active-link" : undefined)}
          >
            Home
          </NavLink>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </li>

        <li className="py-1">
          <NavLink
            to="/doctors"
            end
            className={({ isActive }) => (isActive ? "active-link" : undefined)}
          >
            All Doctors
          </NavLink>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </li>

        <li className="py-1">
          <NavLink
            to="/about"
            end
            className={({ isActive }) => (isActive ? "active-link" : undefined)}
          >
            About
          </NavLink>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </li>

        <li className="py-1">
          <NavLink
            to="/contact"
            end
            className={({ isActive }) => (isActive ? "active-link" : undefined)}
          >
            Contact Us
          </NavLink>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </li>
        {isDoctor && (
          <li className="py-1">
            <NavLink
              to="/doctor-dashboard"
              end
              className={({ isActive }) => (isActive ? "active-link" : undefined)}
            >
              Doctor Dashboard
            </NavLink>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </li>
        )}
      </ul>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-2 cursor-pointer relative">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Hello, {user?.name}</span>
                <img
                  className="w-8 rounded-full"
                  src={assets.profile_pic}
                  alt=""
                />
              </div>
              <img className="w-2.5" src={assets.dropdown_icon} alt="" />
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-50 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg">
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="hover:text-blue-500 cursor-pointer"
                  >
                    My Profile
                  </p>
                  {!isDoctor && (
                    <p
                      onClick={() => navigate("/my-appointments")}
                      className="hover:text-blue-500 cursor-pointer"
                    >
                      My Appointments
                    </p>
                  )}
                  {isDoctor && (
                    <p
                      onClick={() => navigate("/doctor-dashboard")}
                      className="hover:text-blue-500 cursor-pointer"
                    >
                      Dashboard
                    </p>
                  )}
                  <p
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="hover:text-red-500 cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />
      </div>
    </div>
  );
};

export default Navbar;
