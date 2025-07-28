import React, { useState } from 'react';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  loading?: boolean;
  error?: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, loading = false, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) return;
    onLogin(username.trim(), password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#e2e2e2] to-[#e9e9e9] px-4">
      <div className="bg-[#e2e2e2] rounded-3xl max-w-md w-full p-10 border-2 border-[#2e2e2e]">
        <h2 className="text-center text-3xl font-extrabold mb-8 text-[#2e2e2e]">
          Welcome to Pamflet
        </h2>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-400 bg-red-100 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              autoComplete="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#2e2e2e] focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#2e2e2e] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0121 12c0-4.97-4.03-9-9-9-3.315 0-6.16 1.685-7.875 4.275M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-[#2e2e2e] font-bold border-2 border-[#2e2e2e] transition ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-300 hover:bg-blue-400'}`}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {/* Link for creating a new account */}
        <div className="mt-6 text-center">
          <a
            href="/signup"  // change this to your signup route or handler
            className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 cursor-pointer"
          >
            Create a new account
          </a>
        </div>
        <div className='flex items-center justify-center'>
            <button
                className="w-full p-3 m-5 flex items-center justify-center rounded-xl border-2 border-[#2e2e2e] bg-white text-[#2e2e2e] hover:bg-gray-100 font-semibold mb-4"
                // onClick={handleGoogleAuth}
                type="button"
                >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/300px-Google_%22G%22_logo.svg.png" alt="Google" className="w-5 h-5 mr-2"/>
                Continue with Google
            </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
