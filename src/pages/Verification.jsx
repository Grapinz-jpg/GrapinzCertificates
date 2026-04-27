import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Verification = () => {
  const { code } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('verification_code', code)
        .single();
      if (data) setData(data);
    };
    fetchData();
  }, [code]);

  if (!data) return <div className="text-center mt-20">Searching Certificate... 🔍</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg border-t-8 border-blue-600 text-center">
      <h1 className="text-3xl font-bold text-green-600">Verified Certificate ✅</h1>
      <div className="mt-6 space-y-2 text-lg text-gray-700">
        <p><strong>Recipient:</strong> {data.recipient_name}</p>
        <p><strong>Course:</strong> {data.course_name}</p>
        <p><strong>Date:</strong> {new Date(data.created_at).toLocaleDateString()}</p>
      </div>
      <iframe src={data.certificate_url} className="w-full h-[600px] mt-8 border rounded" title="Certificate Preview"></iframe>
      <a href={data.certificate_url} target="_blank" rel="noreferrer" className="inline-block mt-6 bg-blue-600 text-white px-6 py-2 rounded">Download PDF</a>
    </div>
  );
};

export default Verification;