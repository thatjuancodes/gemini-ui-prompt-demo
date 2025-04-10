import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

// Get the generative model for text prompts
// For backward compatibility, we keep gemini-pro for text-only prompts
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Update to the recommended model for multimodal content (including PDFs)
// gemini-pro-vision has been deprecated as of July 12, 2024
const visionModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

/**
 * Convert a file to a GoogleGenerativeAI.Part
 * @param {File} file - The file to convert
 * @returns {Promise<{inlineData: {data: string, mimeType: string}}>} - The file data as a part
 */
const fileToGenerativePart = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // The result will be a data URL like: data:application/pdf;base64,JVBERi0xLjQKJ...
      const base64Data = reader.result.split(",")[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Analyze a PDF file with Gemini vision model
 * @param {File} file - The PDF file to analyze
 * @param {string} prompt - The prompt describing what to do with the file
 * @returns {Promise<string>} - The analysis result
 */
export const analyzePDF = async (file, prompt) => {
  try {
    if (!file || !file.type.includes("pdf")) {
      throw new Error("Please provide a valid PDF file");
    }

    const filePart = await fileToGenerativePart(file);
    
    const result = await visionModel.generateContent([
      prompt,
      filePart
    ]);
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error analyzing PDF:", error);
    throw error;
  }
};

// Create a service object before exporting
const geminiService = {
  generateContent,
  analyzePDF
};

export default geminiService; 