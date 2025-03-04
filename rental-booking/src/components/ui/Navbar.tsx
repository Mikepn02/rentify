import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../../constants"; // Assuming you have a 'constants' file with navLinks defined.
import { Button } from "./button"; // Button component that you already have.
import { Bars3Icon } from "@heroicons/react/24/outline"; // Mobile menu icon from Heroicons.
import { Sheet, SheetContent } from "./sheet"; // Assuming you're using a sheet component for mobile menu.

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative w-full shadow-xl">
      {/* MOBILE NAVBAR */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent className="w-80 bg-primary-light flex flex-col justify-center px-6 pb-6 overflow-y-auto space-y-5">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            <div className="flex items-center cursor-pointer -ml-2">
              <img src="/icons/logo_white.svg" alt="logo" className="w-10 h-10 mr-2" />
              <p className="text-[18px] text-white lg:text-black lg:text-xl font-bold">
                Rentify Properties
              </p>
            </div>
          </Link>
          <div className="flex flex-col items-start space-y-10">
            {navLinks.slice(0, 6).map((link, index) => (
              <Link
                to={link.href}
                key={index}
                className="font-bold hover:text-blue-500 text-white"
              >
                {link.title}
              </Link>
            ))}
            <Link to={"/login"} className="w-full">
              <Button className="bg-blue-600 text-white px-4 py-2 rounded-full w-full md:w-auto">
                Sign in
              </Button>
            </Link>
            <Link to={"/signup"} className="w-full">
              <Button className="bg-transparent text-white lg:text-black border-2 border-white lg:border-black px-4 py-2 rounded-full w-full md:w-auto">
                Sign up
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex justify-between items-center py-4 xl:px-60 lg:px-40 md:px-12 px-2">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          <div className="flex items-center cursor-pointer">
            <img src="/logo.svg" alt="logo" className="w-10 h-10 mr-2" />
            <p className="text-[18px] lg:text-xl font-bold">
              Rentify Properties
            </p>
          </div>
        </Link>

        {/* MOBILE MENU ICON */}
        <button
          type="button"
          className="-m2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        {/* DESKTOP NAVBAR */}
        <div className="hidden md:flex space-x-4 items-center">
          {navLinks.slice(0, 6).map((link, index) => (
            <Link
              to={link.href}
              key={index}
              className="text-heading-1 font-bold hover:text-blue-500"
            >
              {link.title}
            </Link>
          ))}
          <Link to={"/login"}>
            <Button className="bg-blue-600 text-white px-4 py-2 rounded-full">
              Sign in
            </Button>
          </Link>
          <Link to={"/signup"}>
            <Button className="bg-transparent text-black border-2 border-black px-4 py-2 rounded-full">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
