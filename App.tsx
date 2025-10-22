import React, { useState, useEffect } from 'react';
import { parsePortfolio } from './services/geminiService';
import Loader from './components/Loader';
import ProjectCard from './components/ProjectCard';
import Header from './components/Header';
import { Project } from './types';

const App = () => {
  // Fix: Add explicit types for component state for better type safety and to support the typed ProjectCard component.
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const parsedProjects = await parsePortfolio();
        setProjects(parsedProjects);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("Une erreur inconnue est survenue.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center text-red-400 bg-slate-900 px-4">
        <div>
            <h2 className="text-2xl font-bold mb-2">Oups! Une erreur est survenue.</h2>
            <p className="text-slate-400">{error}</p>
            <p className="text-slate-500 mt-4 text-sm">Veuillez vérifier que votre clé API est correctement configurée et essayez de rafraîchir la page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-cyan-300 selection:text-cyan-900">
       <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-cyan-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <Header />
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;