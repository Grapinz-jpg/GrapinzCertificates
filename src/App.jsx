import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';  

import Home from './pages/Home';
import Admin from './pages/Admin';
import Verification from './pages/Verification';
import Login from './pages/Login';

import About from './pages/About';
import Courses from './pages/Courses';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      {/* 🔥 flex layout important */}
      <div className="min-h-screen flex flex-col bg-gray-50">
        
        <Navbar />

        {/* ✅ Page Content */}
        <div className="container mx-auto p-4 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify/:code" element={<Verification />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            
            <Route 
              path="/admin" 
              element={session ? <Admin /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>

        {/* ✅ Footer always bottom */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;