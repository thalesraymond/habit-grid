import { GoogleGenAI, Type } from "@google/genai";
import { HabitSuggestion } from "../types";

const API_KEY = process.env.API_KEY || '';

export const getHabitSuggestions = async (goal: string): Promise<HabitSuggestion[]> => {
  if (!API_KEY) {
    console.warn("No API Key provided for Gemini");
    return [];
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Suggest 3 specific, actionable habits for someone who wants to: "${goal}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Short, catchy title for the habit (max 20 chars)" },
              description: { type: Type.STRING, description: "Brief motivation (max 50 chars)" },
              targetPerWeek: { type: Type.INTEGER, description: "Recommended times per week (1-7)" },
              color: { type: Type.STRING, description: "A hex color code representing the mood of this habit" }
            },
            required: ["title", "targetPerWeek", "color", "description"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as HabitSuggestion[];
    }
    return [];

  } catch (error) {
    console.error("Gemini AI Error:", error);
    return [];
  }
};
