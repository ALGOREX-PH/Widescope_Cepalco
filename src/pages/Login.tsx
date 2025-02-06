import React, { useState } from 'react';
import { Shield, Terminal, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [terminalId, setTerminalId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!username || !password || !terminalId) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (signInError) {
        throw signInError;
      }

      if (data?.user) {
        // Store terminal ID in session
        await supabase
          .from('teller_sessions')
          .insert([
            {
              user_id: data.user.id,
              terminal_id: terminalId,
              status: 'active'
            }
          ]);

        navigate('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <Shield className="h-12 w-12 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-yellow-500">CEPALCO Payment Collection System</h2>
          <p className="text-gray-400 mt-2">Teller Authentication Portal</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-emerald-900/50 rounded-lg p-8 shadow-xl border border-emerald-700">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded flex items-center gap-2 text-red-500">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Terminal ID */}
            <div>
              <label htmlFor="terminalId" className="block text-sm font-medium text-gray-300 mb-1">
                Terminal ID
              </label>
              <div className="relative">
                <Terminal className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="terminalId"
                  type="text"
                  value={terminalId}
                  onChange={(e) => setTerminalId(e.target.value)}
                  className="w-full bg-emerald-950 border border-emerald-700 rounded-lg py-2 pl-10 pr-4 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter Terminal ID"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-emerald-950 border border-emerald-700 rounded-lg px-4 py-2 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-emerald-950 border border-emerald-700 rounded-lg px-4 py-2 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 text-emerald-950 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-yellow-500 hover:text-yellow-400">
              Forgot password?
            </a>
          </div>
        </form>

        {/* Security Notice */}
        <p className="mt-8 text-center text-sm text-gray-400">
          This is a secure system. All actions are logged and monitored.
        </p>
      </div>
    </div>
  );
}