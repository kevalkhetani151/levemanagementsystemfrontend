"use client";
import { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isOpen ? 'w-[268px]' : 'w-16'
      } bg-gradient-to-b from-blue-900 to-blue-700 text-white h-screen flex flex-col shadow-lg`}
    >
      <div className="p-4 flex items-center justify-between border-b border-blue-700 ">
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          <i className="fas fa-bars text-xl"></i>
        </button>
        {isOpen && (
          <span className="text-lg font-bold">Menu</span>
        )}
      </div>

      <nav className="flex-1 space-y-1 mt-4">
        {[
          { icon: 'fas fa-tachometer-alt', label: 'Dashboard', link: '/dashboard' },
          { icon: 'fas fa-users', label: 'Customer Master', link: '/customerservice' },
          { icon: 'fas fa-users', label: 'All Customer', link: '/customer' },
          { icon: 'fas fa-chart-line', label: 'CRM', link: '/pipelines' },
          { icon: 'fas fa-network-wired', label: 'Roopya Network', link: '/network' },
          { icon: 'fas fa-cogs', label: 'Business Rules', link: '/busenessrules' }, // Fix label and link here
          { icon: 'fas fa-handshake', label: 'Partners', link: '/parteners' }, // Fixed link for 'Partners'
          { icon: 'fas fa-code-branch', label: 'Branch', link: '/branch' },
        ].map((item, index) => (
          item.link ? (
            <Link
              href={item.link}
              key={index}
              className="flex items-center p-2 mx-2 rounded-lg pb-6 hover:bg-blue-600 hover:shadow-md transition-all duration-300"
            >
              <i className={`${item.icon} mr-4 text-lg `}></i>
              <span
                className={`text-sm font-medium transition-opacity duration-300 ${
                  isOpen ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {item.label}
              </span>
            </Link>
          ) : (
            <div
              key={index}
              className="flex items-center p-2 mx-2 rounded-lg opacity-50"
            >
              <i className={`${item.icon} mr-4 text-lg`}></i>
              <span
                className={`text-sm font-semibold transition-opacity duration-300 ${
                  isOpen ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {item.label} (Link not defined)
              </span>
            </div>
          )
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
