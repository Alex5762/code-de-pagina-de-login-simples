import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available. In a real app, this is handled via environment variables.
const apiKey = process.env.API_KEY || 'MISSING_API_KEY';

export const generateWelcomeMessage = async (userName: string): Promise<string> => {
  try {
    if (apiKey === 'MISSING_API_KEY') {
        return "Bem-vindo! (Adicione sua API Key para ver recursos de IA)";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Using flash model for quick response
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere uma mensagem de boas-vindas curta, motivadora e futurista em PORTUGUÊS para um usuário chamado "${userName}" que acabou de entrar em um painel seguro. Mantenha com menos de 20 palavras.`,
    });

    return response.text || "Bem-vindo ao seu painel!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Bem-vindo de volta, ${userName}!`;
  }
};