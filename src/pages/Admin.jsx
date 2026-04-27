import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Admin = () => {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [code, setCode] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [certs, setCerts] = useState([]);

  // 1. Certificates-ஐ Fetch செய்யும் பங்க்ஷன்
  const fetchCerts = async () => {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false }); // புதிய சர்டிபிகேட்கள் முதலில் வர
    
    if (error) console.error("Error fetching:", error.message);
    else setCerts(data || []);
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  // 2. Upload Logic
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first!"); // ஃபைல் செக்
    
    setLoading(true);

    try {
      // ஃபைல் பெயர் உருவாக்கம் (Unique-ஆக இருக்க)
      const fileExt = file.name.split('.').pop();
      const filePath = `public/${Date.now()}_${code}.${fileExt}`; 

      // A. Supabase Storage-க்கு அப்லோட்
      const { data: storageData, error: storageError } = await supabase.storage
        .from('certificates')
        .upload(filePath, file);

      if (storageError) throw storageError;

      // B. Public URL பெறுதல்
      const { data: { publicUrl } } = supabase.storage
        .from('certificates')
        .getPublicUrl(filePath);

      // C. Database-ல் சேமித்தல்
      const { error: dbError } = await supabase
        .from('certificates')
        .insert([{ 
          recipient_name: name, 
          course_name: course, 
          verification_code: code, 
          certificate_url: publicUrl 
        }]);

      if (dbError) throw dbError;

      alert("Certificate Issued Successfully! ✅");
      
      // Form-ஐ ரீசெட் செய்தல்
      setName(''); setCourse(''); setCode(''); setFile(null);
      e.target.reset(); // File input-ஐ கிளியர் செய்ய
      fetchCerts(); 

    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Delete Logic
  const deleteCertificate = async (id, fileUrl) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        // URL-லிருந்து ஃபைல் பெயரை மட்டும் பிரித்தெடுத்தல்
        const fileName = fileUrl.split('/').pop();

        // A. Database-லிருந்து நீக்குதல்
        const { error: dbError } = await supabase.from('certificates').delete().eq('id', id);
        if (dbError) throw dbError;

        // B. Storage-லிருந்து நீக்குதல்
        const { error: storageError } = await supabase.storage.from('certificates').remove([fileName]);
        if (storageError) throw storageError;

        alert("Deleted Successfully! 🗑️");
        fetchCerts();
      } catch (error) {
        alert("Delete failed: " + error.message);
      }
    }
  };

  return (
    <div className="pb-20">
      {/* Upload Form Section */}
      <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-md border-t-4 border-green-500">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Issue New Certificate</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <input type="text" placeholder="Student Name" className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400 outline-none" value={name} onChange={(e)=>setName(e.target.value)} required />
          <input type="text" placeholder="Course Name" className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400 outline-none" value={course} onChange={(e)=>setCourse(e.target.value)} required />
          <input type="text" placeholder="Unique ID (e.g. NILAL-101)" className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400 outline-none" value={code} onChange={(e)=>setCode(e.target.value)} required />
          <div className="bg-gray-50 p-2 border-dashed border-2 border-gray-300 rounded">
            <input type="file" accept="application/pdf,image/*" className="w-full cursor-pointer" onChange={(e)=>setFile(e.target.files[0])} required />
          </div>
          <button disabled={loading} className={`w-full p-3 rounded font-bold text-white transition ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700 shadow-lg'}`}>
            {loading ? "Processing..." : "Generate & Save"}
          </button>
        </form>
      </div>

      {/* Management Table Section */}
      <div className="max-w-5xl mx-auto mt-12 bg-white p-6 rounded-lg shadow-xl overflow-hidden">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          📜 Managed Certificates <span className="text-sm font-normal bg-gray-200 px-2 py-1 rounded-full">{certs.length} total</span>
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification ID</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {certs.map((cert) => (
                <tr key={cert.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cert.recipient_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.course_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600 font-semibold">{cert.verification_code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex justify-center gap-3">
                      <a href={cert.certificate_url} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700">View</a>
                      <button 
                        onClick={() => deleteCertificate(cert.id, cert.certificate_url)}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {certs.length === 0 && !loading && (
            <div className="text-center py-10 text-gray-400 italic">No certificates issued yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;