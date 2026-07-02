import React, { useState } from "react";
import PasswordInput from "../Components/input/PasswordInput";
import Themetoggle from "../Components/Themetoggle";
import { BookOpen } from "lucide-react";
import { validateEmail } from "../utils/helper";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ darkMode, setDarkMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setError(null);
    // Backend API will come here
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

      <div className="w-full flex justify-center items-center flex-1 px-4 py-16">
        <div className="w-full max-w-sm px-8 py-10 bg-white dark:bg-gray-800 shadow-xl shadow-blue-900/5 dark:shadow-black/30 rounded-2xl border border-gray-100 dark:border-gray-700">
          <form onSubmit={handleSignup}>
            <h4 className="text-2xl font-display font-bold mb-1">Create your account</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-7">Start organizing your notes today</p>

            <input
              type="text"
              placeholder="Username"
              className="input-box"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
              Signup
            </button>

            <p className="text-sm text-center mt-5 text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;