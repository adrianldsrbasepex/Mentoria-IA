import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, MentorshipPlan } from "../types";

// Always use process.env.API_KEY directly as required by guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeEdital = async (text: string, profile: UserProfile): Promise<MentorshipPlan> => {
  const prompt = `
    Como um arquiteto pedagógico sênior, analise o seguinte texto de edital/diretriz educacional:
    ---
    ${text}
    ---
    Com base no perfil do aluno:
    - Objetivo: ${profile.target}
    - Disponibilidade: ${profile.dailyHours} horas/dia
    - Nível: ${profile.expertiseLevel}
    
    Gere um plano de estudos personalizado seguindo a metodologia de carga cognitiva distribuída e revisões intervaladas.
  `;

  // Use gemini-3-flash-preview for text analysis tasks
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          extractedSubjects: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          recommendations: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          weeklySchedule: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                topics: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      title: { type: Type.STRING },
                      subject: { type: Type.STRING },
                      weight: { type: Type.NUMBER },
                      relevance: { type: Type.STRING }
                    }
                  }
                }
              }
            }
          }
        },
        required: ["title", "extractedSubjects", "weeklySchedule"]
      },
    },
  });

  try {
    // response.text is a property, not a method
    const textOutput = response.text;
    return JSON.parse(textOutput || '{}');
  } catch (e) {
    throw new Error("Falha ao processar resposta da IA.");
  }
};