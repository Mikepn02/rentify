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

const navigation = [
  { name: "Overview", href: "/dashboard", icon: HomeIcon },
  {
    name: "Properties",
    href: "/dashboard/properties",
    icon: BuildingOfficeIcon,
  },
  { name: "Agents", href: "/dashboard/agents", icon: UserGroupIcon },
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
  const { user , logout } = useAuth()

  return (
    <div className="flex">
      <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent
          forceMount
          side="right"
          className="w-72 bg-primary-light px-6 pb-6 overflow-y-auto"
        >
          <nav className="flex flex-col gap-y-5">
            <Link
              to="/"
              className="text-2xl font-bold text-white italic mt-4 flex items-center"
            >
              <img
                src="/icons/logo_white.svg"
                alt="logo"
                className="w-9 h-9 mr-2"
              />
              <p className="text-xl font-medium">Rentify Properties</p>
            </Link>

            <ul className="flex flex-col gap-y-4 mt-4">
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
                    <Icon className="h-6 w-6" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>

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
                      onClick={() => setSidebarOpen(false)}
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
          </nav>
        </SheetContent>
      </Sheet>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-80 bg-primary-light px-6 pb-4 overflow-y-auto">
        <nav className="flex flex-1 flex-col gap-y-5">
          <Link
            to="/"
            className="text-2xl font-bold text-white italic mt-4 flex items-center"
          >
            <img
              src="/icons/logo_white.svg"
              alt="logo"
              className="w-9 h-9 mr-2"
            />
            <p className="text-xl font-medium">Rentify Properties</p>
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
                className="bg-transparent border-none text-white hover:bg-transparent hover:text-white group flex items-center gap-x-3 rounded-md p-2 text-md font-semibold transition-all"
                onClick={logout}
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
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-2  border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div
            className="h-6 w-px bg-gray-900/10 lg:hidden"
            aria-hidden="true"
          />

          <div className="flex justify-end flex-1 gap-x-4 lg:gap-x-6 self-stretch">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="relative flex items-center p-1.5">
                <UserCircle />
                <span className="flex flex-col ml-4">
                  <span className="text-sm font-semibold text-gray-900 md:text-base">
                    {user?.firstName+ " " + user?.lastName}
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-gray-500">
                    {user?.email}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <main className="px-4 sm:px-6 lg:px-8 bg-gray-50 py-5 min-h-screen scrollbar-hide">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
