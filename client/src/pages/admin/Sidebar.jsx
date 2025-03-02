import { ChartLine, BookOpen, Settings, User, LogOut } from "lucide-react";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`hidden lg:flex flex-col ${isOpen ? "w-64" : "w-20"} bg-gray-900 text-white h-screen transition-all duration-300 p-5 shadow-lg fixed`}>
        {/* Toggle Button */}
        <button
          className="absolute top-5 right-[-15px] bg-gray-800 p-2 rounded-full hover:bg-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "<" : ">"}
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <ChartLine size={26} />
          {isOpen && <h1 className="text-xl font-bold">Dashboard</h1>}
        </div>

        {/* Menu Items */}
        <nav className="space-y-4">
          <SidebarItem to="dashboard" icon={<ChartLine size={22} />} text="Dashboard" isOpen={isOpen} />
          <SidebarItem to="course" icon={<BookOpen size={22} />} text="Courses" isOpen={isOpen} />
          <SidebarItem to="settings" icon={<Settings size={22} />} text="Settings" isOpen={isOpen} />
          <SidebarItem to="/profile" icon={<User size={22} />} text="Profile" isOpen={isOpen} />
          <SidebarItem to="/logout" icon={<LogOut size={22} />} text="Logout" isOpen={isOpen} />
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 p-10 transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"}`}>
        <Outlet />
      </div>
    </div>
  );
};

// Sidebar Menu Item Component
const SidebarItem = ({ to, icon, text, isOpen }) => (
  <Link to={to} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition duration-300">
    {icon}
    {isOpen && <span>{text}</span>}
  </Link>
);

export default Sidebar;
