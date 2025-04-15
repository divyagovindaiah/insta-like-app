import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";

interface NavigationBarProps {
  className?: string;
}

const NavigationBar = ({ className = "" }: NavigationBarProps) => {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Search", path: "/search" },
    { icon: PlusSquare, label: "Create", path: "/create" },
    { icon: Heart, label: "Notifications", path: "/notifications" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 md:py-0 md:top-0 md:bottom-auto md:left-0 md:w-16 md:h-screen md:border-r md:border-t-0 z-10 ${className}`}
    >
      <div className="flex justify-around items-center md:flex-col md:h-full md:py-8">
        {navItems.map((item) => {
          const isActive = path === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${isActive ? "text-black" : "text-gray-500 hover:text-gray-900"}`}
            >
              <item.icon size={24} className={isActive ? "fill-black" : ""} />
              <span className="text-xs mt-1 md:text-[0.65rem]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavigationBar;
