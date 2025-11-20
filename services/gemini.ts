import { GoogleGenAI, SchemaType } from "@google/genai";
import { HabitSuggestion } from "../types";

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

export const getHabitSuggestions = async (goal: string): Promise<HabitSuggestion[]> => {
  if (!API_KEY) {
    console.warn("No API Key provided for Gemini");
    return [];
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Suggest 3 specific, actionable habits for someone who wants to: "${goal}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              title: { type: SchemaType.STRING, description: "Short, catchy title for the habit (max 20 chars)" },
              description: { type: SchemaType.STRING, description: "Brief motivation (max 50 chars)" },
              targetPerWeek: { type: SchemaType.INTEGER, description: "Recommended times per week (1-7)" },
              color: { type: SchemaType.STRING, description: "A hex color code representing the mood of this habit" }
            },
            required: ["title", "targetPerWeek", "color", "description"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text()) as HabitSuggestion[];
    }
    return [];

  } catch (error) {
    console.error("Gemini AI Error:", error);
    return [];
  }
};
