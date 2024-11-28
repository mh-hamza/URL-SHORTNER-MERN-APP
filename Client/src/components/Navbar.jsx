import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [profileSubdown, setProfileSubdown] = useState(false);
  const profileSubLinks = () => {
    setProfileSubdown(!profileSubdown);
  };

  const { user } = useAuth();

  return (
    <nav
      className={"bg-white md:text-sm border-b border-gray-400 "}>

      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 flex justify-between">
        <div className="flex items-center justify-between py-5 md:block">
          <Link to="/">
            <img
              src="https://www.floatui.com/logo.svg"
              width={120}
              height={50}
              alt="Float UI logo"
            />
          </Link>
        </div>

        {/* Main Navigation Items */}
        <div
          className="md:flex-1 items-center md:mt-0 md:flex"
        >
          {/* Conditional Rendering: Show Profile Dropdown and Search Bar */}
          {user ? (
            <div className="flex-1 gap-x-6 items-center justify-end space-y-6 md:flex md:space-y-0 md:mt-0">
            
              <div className="relative">
                <div className="flex gap-4 items-center ">
                  <button
                    onClick={profileSubLinks}
                    className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
                  >
                    <img
                      src="https://randomuser.me/api/portraits/men/46.jpg"
                      className="w-full h-full rounded-full"
                    />
                  </button>
                  <div className=" hidden sm:block">
                    <span className="block">{user.name}</span>
                    <span className="block text-sm text-gray-500">
                      {user.email}
                    </span>
                  </div>
                </div>
                {profileSubdown ? (
                  <ul className="bg-white top-12 right-0 mt-5 absolute border rounded-md lg:text-sm lg:w-52 shadow-md lg:space-y-0 lg:mt-0">
                    <li>
                      <a
                        className="block text-gray-600 lg:hover:bg-gray-50 p-2.5"
                        href="#"
                      >
                        {user.name}
                      </a>
                    </li>
                    <li>
                      <a
                        className="block text-gray-600 lg:hover:bg-gray-50 p-2.5"
                        href="#"
                      >
                        {user.email}
                      </a>
                    </li>
                    <li>
                      <a
                        className="block text-red-600 font-bold lg:hover:bg-gray-50 p-2.5"
                        href="#"
                      >
                        Log out
                      </a>
                    </li>
                  </ul>
                ) : null}
              </div>
            </div>
          ) : (
            // Login/Register Buttons
            <div className="flex-1 gap-x-6 items-center justify-end mt-6 flex md:space-y-0 md:mt-0">
              <Link
                to="/register"
                className="block text-gray-700 hover:text-gray-900"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex mt-0"
              >
                Login
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
