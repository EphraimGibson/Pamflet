import React from "react";

interface NavbarProps {
  onToggleSidebar?: () => void;
  showSidebarToggle?: boolean; // <--- add this prop, default true
}

const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  showSidebarToggle = true,
}) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#E0E0E2] py-4 flex justify-between items-center px-6 text-zinc-400 font-semibold text-xl shadow-md">
      {showSidebarToggle ? (
        <button
          className="text-3xl font-bold focus:outline-none"
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
        >
          &#9776; {/* Burger icon */}
        </button>
      ) : (
        <div style={{ width: 32 }} /> // maintain layout spacing (optional)
      )}
      <div>Navbar</div>
      <div style={{ width: 24 }} />
    </nav>
  );
};

export default Navbar;
