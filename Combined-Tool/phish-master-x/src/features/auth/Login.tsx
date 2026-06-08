import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password }); 
    navigate('/');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login to PhishMasterX</h2>
        <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};