import React, { useState } from "react";
import PasswordInput from "../Components/input/PasswordInput";
import Themetoggle from "../Components/Themetoggle";
import { validateEmail } from "../utils/helper";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Login = ({ darkMode, setDarkMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter the given fields");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError(null);
    // api
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/40 to-indigo-50/40 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/40 text-gray-900 dark:text-white flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 py-3.5 px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
          <BookOpen size={22} className="text-blue-600 dark:text-blue-400" />
          Notes App
        </Link>
        <Themetoggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </nav>

      <div className="flex flex-1 justify-center items-center px-4">
        <div className="w-full max-w-sm px-8 py-10 bg-white dark:bg-gray-800 shadow-xl shadow-blue-900/5 dark:shadow-black/30 rounded-2xl border border-gray-100 dark:border-gray-700">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl font-display font-bold mb-1">Welcome back</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-7">Login to continue to your notes</p>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-5 text-gray-600 dark:text-gray-300">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;