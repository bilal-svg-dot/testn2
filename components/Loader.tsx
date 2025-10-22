import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
        <p className="mt-4 text-lg text-slate-400">Génération du portfolio en cours...</p>
    </div>
  );
};

export default Loader;