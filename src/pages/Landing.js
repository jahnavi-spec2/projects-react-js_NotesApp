import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { BookOpen, PenLine, Search, Star } from "lucide-react";
import Themetoggle from "../Components/Themetoggle";

const Landing = ({ darkMode, setDarkMode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/40 to-indigo-50/40 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/40 text-gray-900 dark:text-white flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 py-3.5 px-4 sm:px-6 flex items-center">
        <div className="flex items-center gap-2 font-display font-bold text-xl">
          <BookOpen size={22} className="text-blue-600 dark:text-blue-400" />
          Notes App
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Themetoggle  darkMode={darkMode}
  setDarkMode={setDarkMode}/>
          <Link
            to="/login"
            className="px-4 py-2 rounded text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-md text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <span className="text-xs tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-4 font-semibold">
          Your thoughts, organized
        </span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl max-w-2xl mb-5 ">
          A quiet place for your notes
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mb-10">
          Capture ideas, organize them your way, and find them again in seconds.
        </p>
        <div className="flex gap-4">
          <Link to="/signup" className="btn-primary !w-auto px-8 inline-block text-center">
            Start writing
          </Link>
          <Link
            to="/login"
            className="px-8 py-2.5 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 transition-colors font-medium"
          >
            I have an account
          </Link>
        </div>

        <div className="grid grid-cols-1  gap-6 mt-24 max-w-3xl">
          {[
            { icon: PenLine, title: "Write freely", desc: "Simple, distraction-free note editor" },
            { icon: Search, title: "Find instantly", desc: "Search across titles and content" },
            { icon: Star, title: "Favourite", desc: "Pin the notes that matter most" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6 text-left hover:-translate-y-1 transition-transform duration-200">
              <Icon size={20} className="text-blue-600 dark:text-blue-400 mb-3" />
              <h3 className="font-display font-semibold text-lg mb-1">{title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Landing;