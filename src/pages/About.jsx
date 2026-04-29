import React from 'react';

const About = () => {
  return (
    <div className="bg-[#0f172a] min-h-screen text-white py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-black mb-8 text-cyan-400 uppercase tracking-tighter">
          About Grapinz Credentials
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>
              Founded on <span className="text-white font-bold">August 18, 2022</span>, Grapinz Technology & Institution is a premier educational hub dedicated to leveraging technology to make learning accessible and industry-relevant.
            </p>
            <p>
              As an <span className="text-cyan-400 font-bold underline">MSME Accredited Institution</span>, our certifications are recognized for their rigorous training standards and project-based learning approach.
            </p>
            <p className="bg-gray-900/50 p-6 border-l-4 border-cyan-500 rounded-r-xl">
              This <span className="text-white font-bold">Verification Portal</span> ensures that every Grapinz certified professional possesses the genuine skills required to excel in the global tech and design market.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl text-center">
              <h3 className="text-3xl font-black text-cyan-500">99%</h3>
              <p className="text-xs uppercase text-gray-500 mt-2">Placement Record</p>
            </div>
            <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl text-center">
              <h3 className="text-3xl font-black text-cyan-500">50+</h3>
              <p className="text-xs uppercase text-gray-500 mt-2">Tech Toolbox</p>
            </div>
            <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl text-center">
              <h3 className="text-3xl font-black text-cyan-500">2022</h3>
              <p className="text-xs uppercase text-gray-500 mt-2">Founded Year</p>
            </div>
            <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl text-center">
              <h3 className="text-3xl font-black text-cyan-500">100%</h3>
              <p className="text-xs uppercase text-gray-500 mt-2">Live Interaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;