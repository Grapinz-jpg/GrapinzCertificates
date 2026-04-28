import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Admin = () => {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [code, setCode] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [certs, setCerts] = useState([]);

  const fetchCerts = async () => {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error("Error fetching:", error.message);
    else setCerts(data || []);
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first!");

    setLoading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `public/${Date.now()}_${code}.${fileExt}`;

      // ✅ A. Upload to Supabase Storage (FIXED)
      const { data: storageData, error: storageError } = await supabase.storage
        .from('certificates')
        .upload(filePath, file, {
          upsert: true
        });

      if (storageError) {
        console.error("Storage Error:", storageError);
        throw storageError;
      }

      // ✅ B. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('certificates')
        .getPublicUrl(filePath);

      // ✅ C. Save to Database
      const { error: dbError } = await supabase
        .from('certificates')
        .insert([{
          recipient_name: name,
          course_name: course,
          verification_code: code,
          certificate_url: publicUrl,
        }]);

      if (dbError) throw dbError;

      alert("Certificate Issued Successfully! ✅");
      setName('');
      setCourse('');
      setCode('');
      setFile(null);
      e.target.reset();
      fetchCerts();

    } catch (error) {
      console.error("Full Error:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCertificate = async (id, fileUrl) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        const urlParts = fileUrl.split('/certificates/');
        const storagePath = urlParts[1];

        if (!storagePath) throw new Error("Could not parse file path from URL");

        // A. Delete from DB
        const { error: dbError } = await supabase
          .from('certificates')
          .delete()
          .eq('id', id);
        if (dbError) throw dbError;

        // B. Delete from Storage
        const { error: storageError } = await supabase.storage
          .from('certificates')
          .remove([storagePath]);
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
      {/* Upload Form */}
      <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-md border-t-4 border-green-500">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Issue New Certificate
        </h2>

        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="text"
            placeholder="Student Name"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Course Name"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400 outline-none"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Unique ID (e.g. GRAPINZ-101)"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400 outline-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          <div className="bg-gray-50 p-2 border-dashed border-2 border-gray-300 rounded">
            <input
              type="file"
              accept="application/pdf,image/*"
              className="w-full cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>

          <button
            disabled={loading}
            className={`w-full p-3 rounded font-bold text-white transition ${
              loading
                ? 'bg-gray-400'
                : 'bg-green-600 hover:bg-green-700 shadow-lg'
            }`}
          >
            {loading ? "Processing..." : "Generate & Save"}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="max-w-5xl mx-auto mt-12 bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          📜 Managed Certificates ({certs.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Student</th>
                <th className="p-2">Course</th>
                <th className="p-2">Code</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {certs.map((cert) => (
                <tr key={cert.id} className="text-center border-t">
                  <td>{cert.recipient_name}</td>
                  <td>{cert.course_name}</td>
                  <td className="text-blue-600 font-bold">
                    {cert.verification_code}
                  </td>
                  <td>
                    <a
                      href={cert.certificate_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 mr-3"
                    >
                      View
                    </a>

                    <button
                      onClick={() =>
                        deleteCertificate(cert.id, cert.certificate_url)
                      }
                      className="text-red-500 font-bold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {certs.length === 0 && !loading && (
            <p className="text-center text-gray-400 mt-5">
              No certificates issued yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;