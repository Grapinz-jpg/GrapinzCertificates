import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Verification = () => {
  const { code } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('certificates').select('*').eq('verification_code', code).single();
      if (data) setData(data);
      setLoading(false);
    };
    fetchData();
  }, [code]);

  if (loading) return <div className="flex justify-center items-center h-screen text-white">Verifying... 🔍</div>;
  if (!data) return <div className="text-center mt-20 text-red-500 font-bold">Certificate Not Found! ❌</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] py-10 px-4 flex flex-col items-center">
      {/* Detail Card */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden mb-10">
        <div className="bg-green-50 p-6 border-b border-green-100 text-center">
          <h1 className="text-2xl md:text-3xl font-black text-green-700 flex items-center justify-center gap-2">
            VALID CERTIFICATE ✅
          </h1>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
            <p className="text-xs uppercase text-gray-400 font-bold mb-1">Recipient</p>
            <p className="text-xl font-bold text-gray-800">{data.recipient_name}</p>
          </div>
          <div className="border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
            <p className="text-xs uppercase text-gray-400 font-bold mb-1">Course Domain</p>
            <p className="text-xl font-bold text-gray-800">{data.course_name}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-gray-400 font-bold mb-1">Issue Date</p>
            <p className="text-xl font-bold text-gray-800">{new Date(data.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Certificate Viewer - Centered & Responsive */}
        <div className="p-4 md:p-8 bg-gray-100 flex justify-center">
          <div className="relative w-full max-w-[800px] aspect-[1.414/1] shadow-2xl rounded-lg overflow-hidden border-4 border-white">
            <iframe 
              src={data.certificate_url} 
              className="absolute top-0 left-0 w-full h-full" 
              title="Grapinz Certificate"
            ></iframe>
          </div>
        </div>

        <div className="p-6 bg-white text-center">
          <a 
            href={data.certificate_url} 
            target="_blank" 
            rel="noreferrer" 
            className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl font-black hover:bg-blue-700 transition transform hover:scale-105 active:scale-95 shadow-lg"
          >
            DOWNLOAD OFFICIAL PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default Verification;