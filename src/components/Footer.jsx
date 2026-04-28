import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-16 border-t border-gray-900">
      
      {/* FIXED WIDTH CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* FLEX ROW (MAIN FIX) */}
        <div className="flex flex-row justify-between items-start gap-10">

          {/* Column 1 */}
          <div className="w-1/3">
            <h2 className="text-white font-black text-3xl mb-4">GRAPINZ</h2>
            <p className="text-sm leading-relaxed mb-4">
              An accredited certification institution recognized by MSME. 
              We provide industry-standard technology education.
            </p>

            <div className="flex gap-3 opacity-50">
              <span className="text-xs border px-2 py-1 border-gray-700 rounded">ISO Certified</span>
              <span className="text-xs border px-2 py-1 border-gray-700 rounded">MSME Reg</span>
            </div>
          </div>

          {/* Column 2 */}
          <div className="w-1/3">
            <h4 className="text-white font-bold uppercase text-sm mb-6">Our Solutions</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-cyan-400 cursor-pointer">Learning Courses</li>
              <li className="hover:text-cyan-400 cursor-pointer">Web Solutions</li>
              <li className="hover:text-cyan-400 cursor-pointer">Academic Achievements</li>
              <li className="hover:text-cyan-400 cursor-pointer">VFX & 3D Animation</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="w-1/3">
            <h4 className="text-white font-bold uppercase text-sm mb-6">Support</h4>
            <p className="text-sm mb-2">📧 info@grapinz.com</p>
            <p className="text-sm mb-4">📍 Tamil Nadu, India</p>

            <div className="flex gap-4">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-500 cursor-pointer">f</div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-500 cursor-pointer">in</div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-500 cursor-pointer">X</div>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="mt-16 pt-8 border-t border-gray-900 text-center">
          <p className="text-[10px] uppercase tracking-[4px] text-gray-600">
            © {new Date().getFullYear()} Grapinz Technology & Institution. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;