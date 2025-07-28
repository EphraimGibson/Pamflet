import React, { useState } from 'react';

interface SignupProps {
  onSignup: (username: string, email: string, password: string) => void;
  loading?: boolean;
  error?: string;
}

const Signup: React.FC<SignupProps> = ({ onSignup, loading = false, error }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const validateEmail = (email: string) =>
    /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password)
      return setFormError('Please fill out all required fields.');

    if (!validateEmail(email))
      return setFormError('Please enter a valid email address.');

    if (password !== confirmPassword)
      return setFormError('Passwords do not match.');

    setFormError(null);
    onSignup(username.trim(), email.trim(), password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#e2e2e2] to-[#e9e9e9] px-4">
      <div className="bg-[#e2e2e2] border-2 border-[#2e2e2e] shadow-xl rounded-3xl max-w-md w-full p-10">
        <h2 className="text-center text-3xl font-extrabold mb-8 text-gray-800">
          Create your account
        </h2>

        {(error || formError) && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded">
            {formError || error}
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
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition border-2 border-[#2e2e2e]"
              placeholder="Choose a username"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition border-2 border-[#2e2e2e]"
              placeholder="you@example.com"
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
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition border-2 border-[#2e2e2e]"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0121 12c0-4.97-4.03-9-9-9-3.315 0-6.16 1.685-7.875 4.275M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition border-2 border-[#2e2e2e]"
                placeholder="Confirm password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0121 12c0-4.97-4.03-9-9-9-3.315 0-6.16 1.685-7.875 4.275M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition ${
              loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        {/* New "Already have an account?" link */}
        <div className="mt-6 text-center">
          <a
            href="/login"  // update this to your login page route or handler
            className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 cursor-pointer"
          >
            Already have an account?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
