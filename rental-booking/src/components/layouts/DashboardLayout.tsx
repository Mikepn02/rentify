import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Bars3Icon,
  BuildingOfficeIcon,
  CalendarIcon,
  CogIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { LifeBuoy, LogOut, UserCircle } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import useAuth from "@/hooks/useAuth";

// Role-specific navigation
const hostNavigation = [
  { name: "Overview", href: "/dashboard", icon: HomeIcon },
  { name: "Properties", href: "/dashboard/properties", icon: BuildingOfficeIcon },
  { name: "Agents", href: "/dashboard/agents", icon: UserGroupIcon },
  { name: "Bookings", href: "/dashboard/bookings", icon: CalendarIcon },
];

const renterNavigation = [
  { name: "Overview", href: "/dashboard", icon: HomeIcon },
  { name: "Bookings", href: "/dashboard/bookings", icon: CalendarIcon },
];

const bottomNavigation = [
  { name: "Support", href: "/dashboard/support", icon: LifeBuoy },
  { name: "Settings", href: "/dashboard/settings", icon: CogIcon },
];

const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  console.log("User: ", user); 

  const navigation = user?.role === "HOST"
    ? hostNavigation
    : user?.role === "RENTER"
    ? renterNavigation
    : [];

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent
          forceMount
          side="left"
          className="w-64 sm:w-72 bg-primary-light px-4 py-6 overflow-y-auto"
        >
          <div className="flex flex-col h-full">
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold text-white italic flex items-center"
              onClick={() => setSidebarOpen(false)}
            >
              <img
                src="/icons/logo_white.svg"
                alt="logo"
                className="w-7 h-7 sm:w-9 sm:h-9 mr-2"
              />
              <p className="text-lg sm:text-xl font-medium">Rentify Properties</p>
            </Link>

            <nav className="flex flex-col flex-1 gap-y-5 mt-6">
              <ul className="flex flex-col gap-y-2 sm:gap-y-4">
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
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="border-b mt-auto" />

              <ul className="space-y-1 my-3">
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
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      {name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-none text-white hover:bg-blue-200 hover:text-white group flex justify-start items-center gap-x-3 rounded-md p-2 text-sm font-semibold transition-all"
                    onClick={() => {
                      logout();
                      setSidebarOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span>Logout</span>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed inset-y-0 left-0 w-64 xl:w-72 bg-primary-light px-4 xl:px-6 pb-4 overflow-y-auto z-20">
        <nav className="flex flex-1 flex-col gap-y-5 mt-4">
          <Link
            to="/"
            className="text-xl xl:text-2xl font-bold text-white italic flex items-center"
          >
            <img
              src="/icons/logo_white.svg"
              alt="logo"
              className="w-7 h-7 xl:w-9 xl:h-9 mr-2"
            />
            <p className="text-lg xl:text-xl font-medium">Rentify Properties</p>
          </Link>
          <ul className="flex flex-1 flex-col gap-y-2 xl:gap-y-4 mt-4">
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
                  <Icon className="h-5 w-5 xl:h-6 xl:w-6" />
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-b mt-auto" />
          <ul className="space-y-1 my-3 xl:my-5">
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
                  <Icon className="h-5 w-5 xl:h-6 xl:w-6" />
                  {name}
                </Link>
              </li>
            ))}
            <li>
              <Button
                variant="outline"
                className="w-full bg-transparent border-none text-white hover:bg-transparent hover:text-white group flex justify-start items-center gap-x-3 rounded-md p-2 text-sm font-semibold transition-all"
                onClick={logout}
              >
                <LogOut className="h-5 w-5 xl:h-6 xl:w-6" />
                <span>Logout</span>
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden lg:pl-64 xl:pl-72">
        {/* Topbar */}
        <div className="sticky top-0 z-10 flex h-14 sm:h-16 items-center gap-x-2 border-b border-gray-200 bg-white px-3 sm:px-6 shadow-sm">
          <button
            type="button"
            className="p-2 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </button>

          <div className="flex justify-end flex-1 gap-x-2 sm:gap-x-4 self-stretch">
            <div className="flex items-center">
              <div className="relative flex items-center p-1">
                <UserCircle className="h-6 w-6 hidden xs:block" />
                <span className="flex flex-col ml-0 xs:ml-2 sm:ml-4">
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 truncate max-w-32 sm:max-w-none">
                    {user?.firstName + " " + user?.lastName}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 truncate max-w-32 sm:max-w-none">
                    {user?.email}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 bg-gray-50 py-4 sm:py-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
