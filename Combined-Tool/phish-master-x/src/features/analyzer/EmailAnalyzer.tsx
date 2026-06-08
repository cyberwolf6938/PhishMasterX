import { useState } from 'react';
import axios from 'axios';

export const EmailAnalyzer = () => {
  const [emailContent, setEmailContent] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/analyze', { content: emailContent });
      setResult(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Analyze Your Email</h2>
      <textarea 
        className="w-full h-40 p-4 border rounded" 
        placeholder="Paste your email content here..."
        onChange={(e) => setEmailContent(e.target.value)}
      />
      <button 
        onClick={handleAnalyze}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Analyze Email
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-bold">Result: {result.phishing_score > 50 ? "Phishing!" : "Safe"}</h3>
          <p>Score: {result.phishing_score}/100</p>
        </div>
      )}
    </div>
  );
};