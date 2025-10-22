
import React from 'react';
import GitHubIcon from './icons/GitHubIcon';
import LinkedInIcon from './icons/LinkedInIcon';

const Header = () => {
  return (
    <header className="text-center py-12">
      <h1 className="text-5xl font-extrabold text-white mb-2 tracking-tight">Notre Portfolio de Projets</h1>
      <h2 className="text-2xl font-light text-slate-300 mt-2 mb-4 tracking-wide">Azizi Bilal & Chnafa Ilyass</h2>
      <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-6">
        Une collection de nos projets et expériences, générée automatiquement à partir de nos CVs grâce à l'API Gemini.
      </p>
       <div className="flex justify-center space-x-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300" aria-label="Profil GitHub">
            <GitHubIcon className="w-8 h-8" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300" aria-label="Profil LinkedIn">
            <LinkedInIcon className="w-8 h-8" />
          </a>
       </div>
    </header>
  );
};

export default Header;