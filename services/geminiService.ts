
import { GoogleGenAI, Type } from "@google/genai";
import { cvText } from '../constants';
import { Project } from "../types";

// Fix: Specify the return type of the function and use a type assertion on the parsed JSON.
// This ensures that the data returned by the service conforms to the Project interface.
export async function parsePortfolio(): Promise<Project[]> {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
    Tu es un recruteur technique expert analysant des CVs. Ta mission est d'extraire les projets et expériences professionnelles clés des CVs ci-dessous et de les formater en un tableau JSON unique.

    Pour chaque projet, tu dois inclure :
    - title: Le nom du projet ou du rôle.
    - tagline: Une phrase d'accroche courte et percutante qui résume le projet.
    - description: Une description plus détaillée des responsabilités et des réalisations.
    - technologies: Un tableau de chaînes de caractères listant les technologies clés utilisées.
    - owner: Le nom de la personne à qui appartient le projet ('Bilal Azizi' ou 'Ilyass Chnafa').

    Voici les CVs à analyser :
    ---
    ${cvText}
    ---

    Formate ta réponse exclusivement en JSON, en suivant le schéma fourni. Ne fournis aucune explication ou texte supplémentaire en dehors du JSON.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        tagline: { type: Type.STRING },
                        description: { type: Type.STRING },
                        technologies: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                        },
                        owner: { type: Type.STRING },
                    },
                    required: ["title", "tagline", "description", "technologies", "owner"],
                },
            },
        },
    });

    try {
        const jsonText = response.text.trim();
        const parsedProjects = JSON.parse(jsonText);
        return parsedProjects as Project[];
    } catch (e) {
        console.error("Failed to parse Gemini response:", response.text);
        throw new Error("The portfolio data could not be parsed. The API may have returned an unexpected format.");
    }
}