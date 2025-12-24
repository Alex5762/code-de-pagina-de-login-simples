import { GoogleGenAI } from "@google/genai";

// Safe access to process.env to prevent ReferenceError in pure browser environments
const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // Ignore error if process is not defined
  }
  return 'MISSING_API_KEY';
};

const apiKey = getApiKey();

export const generateWelcomeMessage = async (userName: string): Promise<string> => {
  // Return immediate fallback if key is missing to avoid API call overhead
  if (apiKey === 'MISSING_API_KEY') {
    console.warn("API Key is missing. Using fallback message.");
    return "Bem-vindo! (Adicione sua API Key)";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Using flash model for quick response
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere uma mensagem de boas-vindas curta, motivadora e futurista em PORTUGUÊS para um usuário chamado "${userName}" que acabou de entrar em um painel seguro. Mantenha com menos de 20 palavras.`,
    });

    return response.text || "Bem-vindo ao seu painel!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback message in case of quota limit or network error
    return `Bem-vindo de volta, ${userName}!`;
  }
};