import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Admin = () => {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [code, setCode] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Upload File to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${code}.${fileExt}`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from('certificates')
        .upload(fileName, file);

      if (storageError) throw storageError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('certificates')
        .getPublicUrl(fileName);

      // 3. Save details to Database
      const { error: dbError } = await supabase
        .from('certificates')
        .insert([{ 
          recipient_name: name, 
          course_name: course, 
          verification_code: code, 
          certificate_url: publicUrl 
        }]);

      if (dbError) throw dbError;

      alert("Certificate Uploaded Successfully! ✅");
      setName(''); setCourse(''); setCode(''); setFile(null);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin: Issue Certificate</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input type="text" placeholder="Student Name" className="w-full p-2 border rounded" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input type="text" placeholder="Course Name" className="w-full p-2 border rounded" value={course} onChange={(e)=>setCourse(e.target.value)} required />
        <input type="text" placeholder="Unique ID (e.g. NA-001)" className="w-full p-2 border rounded" value={code} onChange={(e)=>setCode(e.target.value)} required />
        <input type="file" accept="application/pdf,image/*" className="w-full p-2" onChange={(e)=>setFile(e.target.files[0])} required />
        <button disabled={loading} className="w-full bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700">
          {loading ? "Uploading..." : "Upload & Save"}
        </button>
      </form>
    </div>
  );
};

export default Admin;