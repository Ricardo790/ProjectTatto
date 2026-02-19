
import { GoogleGenAI, Type } from "@google/genai";
import { TattooIdea } from "../types";

// Verificación segura de la API Key
const getApiKey = () => {
  try {
    return process.env.API_KEY || "";
  } catch (e) {
    return "";
  }
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export const getTattooConsultation = async (description: string): Promise<TattooIdea> => {
  if (!getApiKey()) {
    throw new Error("API_KEY_NOT_CONFIGURED");
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Suggest a professional tattoo concept based on this description: "${description}". Focus on artistic elements, symbolism, and technical execution.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          style: { type: Type.STRING },
          placement_suggestion: { type: Type.STRING },
        },
        required: ["title", "description", "style", "placement_suggestion"]
      },
    },
  });

  try {
    return JSON.parse(response.text.trim());
  } catch (e) {
    throw new Error("Failed to parse tattoo idea");
  }
};

export const generateTattooSketch = async (prompt: string): Promise<string | null> => {
  if (!getApiKey()) return null;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `A professional tattoo flash sketch, high contrast, black and gray ink style on white parchment: ${prompt}`,
          },
        ],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (e) {
    console.error("Error generating sketch:", e);
  }
  return null;
};
