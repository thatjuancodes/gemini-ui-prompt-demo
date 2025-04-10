import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

// Get the generative model (using the updated model name)
// The error indicated we need to use a different model name compatible with the current API version
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

/**
 * Send a prompt to Gemini and get a response
 * @param {string} prompt - The text prompt to send to Gemini
 * @returns {Promise<string>} - The generated response text
 */
export const generateContent = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};

// Create a service object before exporting
const geminiService = {
  generateContent
};

export default geminiService; 