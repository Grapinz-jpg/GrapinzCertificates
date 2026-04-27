import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    if (code) navigate(`/verify/${code}`);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Certificate Verification</h1>
      <form onSubmit={handleVerify} className="w-full max-w-md">
        <input 
          type="text" 
          placeholder="Enter Certificate ID (e.g. NA-001)" 
          className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit" className="w-full mt-4 bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700 transition">
          Verify Now
        </button>
      </form>
    </div>
  );
};

export default Home;