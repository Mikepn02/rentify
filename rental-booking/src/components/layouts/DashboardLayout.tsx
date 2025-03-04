import React, { useState } from "react";
import {
  HomeIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CalendarIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation } from "react-router-dom";
import { UserCircle, LifeBuoy, LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: HomeIcon },
  { name: "Properties", href: "/dashboard/properties", icon: BuildingOfficeIcon },
  { name: "Agents", href: "/dashboard/agents", icon: UserGroupIcon },
  { name: "Bookings", href: "/dashboard/bookings", icon: CalendarIcon },
  { name: "Settings", href: "/dashboard/settings", icon: CogIcon },
];

const bottomNavigation = [
  { name: "Support", href: "/dashboard/support", icon: LifeBuoy },
  { name: "Settings", href: "/dashboard/settings", icon: CogIcon },
];

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

const DashboardLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex">
    
    
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed inset-y-0 left-0 w-80 bg-primary-light px-6 pb-4 overflow-y-auto">
        <nav className="flex flex-1 flex-col gap-y-5">
          <Link to="/" className="text-2xl font-bold text-white italic mt-4 flex items-center">
            <img src="/icons/logo_white.svg" alt="logo" className="w-9 h-9 mr-2" />
            <p className="text-xl font-medium">RentifyProperties</p>
          </Link>
          <ul className="flex flex-1 flex-col gap-y-4 mt-4">
            {navigation.map(({ name, href, icon: Icon }) => (
              <li key={name}>
                <Link
                  to={href}
                  className={classNames(
                    location.pathname === href
                      ? "bg-blue-300 bg-opacity-50 text-white shadow-md"
                      : "text-white hover:bg-blue-200 hover:bg-opacity-50 hover:text-white",
                    "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold transition-all"
                  )}
                >
                  <Icon className="h-6 w-6" />
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-b" />
        <div className="mt-auto">
          <ul className="-mx-2 space-y-1 my-5">
            {bottomNavigation.map(({ name, href, icon: Icon }) => (
              <li key={name}>
                <Link
                  to={href}
                  className={classNames(
                    location.pathname === href
                      ? "bg-blue-300 bg-opacity-50 text-white shadow-md"
                      : "text-white hover:bg-blue-200 hover:bg-opacity-50 hover:text-white",
                    "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold transition-all"
                  )}
                >
                  <Icon className="h-6 w-6" />
                  {name}
                </Link>
              </li>
            ))}
            <li>
              <Button
                variant="outline"
                className="bg-transparent border-none text-white hover:bg-blue-200 hover:text-white group flex items-center gap-x-3 rounded-md p-2 text-md font-semibold transition-all"
              >
                <LogOut className="h-6 w-6" />
                <span>Logout</span>
              </Button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:pl-80">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <div className="lg:hidden">
            <SheetTrigger asChild>
              <Button variant="ghost">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
          </div>
          <div className="h-6 w-px bg-gray-900/10" />

          <div className="flex justify-end flex-1 gap-x-4 lg:gap-x-6 self-stretch">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="relative flex items-center p-1.5">
                <UserCircle />
                <span className="flex flex-col ml-4">
                  <span className="text-sm font-semibold text-gray-900 md:text-base">
                    John Doe
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-gray-500">
                    johndoe@example.com
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <main className="px-4 sm:px-6 lg:px-8 bg-gray-50 py-5 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
