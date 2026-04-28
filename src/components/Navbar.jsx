import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#0f172a] text-white sticky top-0 z-50 border-b border-gray-800 shadow-xl">
      <div className="container mx-auto px-4 md:px-10 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span
            className="text-2xl font-black uppercase tracking-wider"
            style={{
              background: 'linear-gradient(to right, #22d3ee, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            GRAPINZ
          </span>
        </Link>

        {/* Menus */}
        <div className="flex space-x-4 md:space-x-8 text-[12px] md:text-sm font-bold uppercase tracking-widest">
          <Link to="/" className="hover:text-cyan-400 transition">Verify</Link>
          <Link to="/courses" className="hover:text-cyan-400 transition">Courses</Link>
          <Link to="/about" className="hover:text-cyan-400 transition">About</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;