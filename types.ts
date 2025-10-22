// Fix: Define a new Project interface to be used for type-checking project data.
export interface Project {
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  owner: string;
}