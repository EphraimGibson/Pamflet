import React from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  // Example user info, you can replace with props or context
  const user = {
    name: "John Doe",
    imageUrl: "https://i.pravatar.cc/48",
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg flex flex-col justify-between transform z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-hidden={!isOpen}
      >
        <div>
          <div className="p-4 font-bold border-b border-zinc-300 flex justify-between items-center">
            <span>Sidebar</span>
            <button
              onClick={onClose}
              aria-label="Close sidebar"
              className="text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
          </div>
          <nav className="p-4 flex flex-col space-y-2">
            {/* Example menu items */}
            <a href="#" className="rounded px-3 py-2 hover:bg-[#e9e9e9] hover:border-2 hover:border-[#2e2e2e] transition-all duration-300 ease-in-out"
            >
              Home
            </a>
            <a href="#" className="rounded px-3 py-2 hover:bg-[#e9e9e9] hover:border-2 hover:border-[#2e2e2e] transition-all duration-300 ease-in-out"
            >
              My Decks
            </a>
            <a href="#" className="rounded px-3 py-2 hover:bg-[#e9e9e9] hover:border-2 hover:border-[#2e2e2e] transition-all duration-300 ease-in-out"
            >
              Study
            </a>
            <a href="#" className="rounded px-3 py-2 hover:bg-[#e9e9e9] hover:border-2 hover:border-[#2e2e2e] transition-all duration-300 ease-in-out"
            >
              Settings
            </a>
            <a href="#" className="rounded px-3 py-2 hover:bg-[#e9e9e9] hover:border-2 hover:border-[#2e2e2e] transition-all duration-300 ease-in-out"
            >
              Logout
            </a>
          </nav>
        </div>

        {/* User profile at bottom */}
        <div className="flex items-center p-4 border-t border-gray-200 bg-gray-50">
          <img
            src={user.imageUrl}
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="ml-3 text-gray-700 font-medium">{user.name}</span>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
