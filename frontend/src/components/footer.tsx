import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-[#e3e3e3] rounded-tl-[3rem] rounded-tr-[3rem] border-t border-[#2e2e2e] px-20 py-16 -mt-[3vw]">
      <div className="flex flex-col md:flex-row justify-between gap-10">

        {/* Brand Info */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <h1 className="text-[4vw] font-extrabold uppercase text-[#2e2e2e] leading-tight tracking-tighter">
            Pamflet
          </h1>
          <p className="mt-2 text-[#4e4e4e] text-base max-w-sm">
            Memorize anything with interactive flashcards. Create, study, and share your decks.
          </p>
        </div>

        {/* Navigation + Social */}
        <div className="md:w-1/2 flex flex-col gap-6">
          {/* Navigation */}
          <div>
            <h2 className="text-[#4e4e4e] font-semibold mb-2 text-lg">Explore</h2>
            <ul className="flex flex-col space-y-1 text-sm text-[#6e6e6e]">
              <li><a href="#features" className="hover:underline">Features</a></li>
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="/login" className="hover:underline">Login</a></li>
              <li><a href="/signup" className="hover:underline">Signup</a></li>
            </ul>
          </div>

          {/* Social links (optional) */}
          <div>
            <h2 className="text-[#4e4e4e] font-semibold mb-2 text-lg">Connect</h2>
            <div className="flex space-x-4 text-[#6e6e6e] text-sm">
              <a href="https://github.com/your-org" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
              <a href="#" className="hover:underline">Twitter</a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mt-10 pt-6 text-gray-500 text-xs text-center">
        © {new Date().getFullYear()} Pamflet. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
