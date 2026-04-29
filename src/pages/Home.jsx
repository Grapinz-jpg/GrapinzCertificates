import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Footer from '../components/Footer';
import CourseSlider from '../components/CourseSlider';

const Home = () => {
  const [code, setCode] = useState('');
  const [recentCerts, setRecentCerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecent = async () => {
      const { data } = await supabase
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (data) setRecentCerts(data);
    };

    fetchRecent();
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    if (code) navigate(`/verify/${code}`);
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-white flex flex-col select-none">

      {/* Hero */}
      <section className="py-24 px-6 text-center">
        <h1
          className="text-5xl md:text-7xl font-black mb-6"
          style={{
            background: 'linear-gradient(to right, #22d3ee, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          GRAPINZ TECHNOLOGY
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
          Official Verification Portal for Grapinz Technology &amp; Institution (MSME Accredited).
        </p>

        <form
          onSubmit={handleVerify}
          className="max-w-2xl mx-auto flex flex-col md:flex-row rounded-2xl overflow-hidden border border-gray-700 bg-gray-900/50 backdrop-blur-sm"
        >
          <input
            type="text"
            placeholder="Enter Certificate ID..."
            className="flex-1 p-5 bg-transparent outline-none text-white placeholder-gray-500 select-text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-cyan-500 text-gray-900 px-10 py-5 font-bold hover:bg-cyan-400 active:scale-95 transition-all duration-200"
          >
            VERIFY NOW
          </button>
        </form>
      </section>

      {/* Slider */}
      <CourseSlider />

      {/* Recent Verifications */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center underline decoration-cyan-500">
          Recent Verifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentCerts.map((cert) => (
            <div
              key={cert.id}
              className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl hover:border-cyan-500 transition"
            >
              <p className="text-cyan-400 font-mono text-sm mb-2">
                {cert.verification_code}
              </p>

              <h3 className="font-bold text-lg text-white">
                {cert.recipient_name}
              </h3>

              <p className="text-gray-400 text-sm mb-4">
                {cert.course_name}
              </p>

              <button
                onClick={() => navigate(`/verify/${cert.verification_code}`)}
                className="text-cyan-400 text-sm font-semibold hover:underline"
              >
                View Details →
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;