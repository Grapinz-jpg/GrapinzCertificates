import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Supabase Auth மூலம் லாகின் செய்தல்
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("Login Failed: " + error.message);
    } else {
      alert("Login Success! ✅");
      navigate('/admin'); // லாகின் ஆனவுடன் அட்மின் பக்கத்திற்குச் செல்லும்
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-2xl rounded-xl border-t-4 border-blue-600">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Admin Email</label>
          <input type="email" className="w-full p-2 border rounded mt-1 outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" className="w-full p-2 border rounded mt-1 outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        <button disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 transition">
          {loading ? "Verifying..." : "Login to Dashboard"}
        </button>
      </form>
    </div>
  );
};

export default Login;