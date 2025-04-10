import React, { useState } from 'react';
import { generateContent } from '../services/geminiService';
import PDFAnalyzer from './PDFAnalyzer';
import MarkdownRenderer from './MarkdownRenderer';

// Add table-specific sample prompts
const tableSamplePrompts = [
  "Create a table comparing the top 5 programming languages by popularity",
  "Make a table of planets in our solar system with their key properties",
  "Generate a markdown table of chemical elements with their atomic number, symbol, and properties",
  "Create a comparison table of different machine learning algorithms with their pros and cons",
  "Make a table of top 10 countries by GDP with their population and growth rate",
  "Generate a table comparing different database types (SQL, NoSQL, etc.)"
];

// Add markdown-specific prompts
const markdownPrompts = [
  "Create a well-formatted markdown document about artificial intelligence with headers, lists, and emphasis",
  "Write a tutorial on Python basics with code blocks, headers, and bullet points",
  "Generate a markdown FAQ about climate change with collapsible sections",
  "Create a markdown product specification with tables, lists and emphasis"
];

const GeminiTester = () => {
  // Add a tab state to switch between text and PDF analysis
  const [activeTab, setActiveTab] = useState('text');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const result = await generateContent(prompt);
      
      // Add to history
      const newEntry = {
        id: Date.now(),
        prompt,
        response: result,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setHistory([newEntry, ...history]);
      setResponse(result);
      setPrompt(''); // Clear input after successful submission
    } catch (err) {
      console.error("API Error:", err);
      let errorMessage = err.message || 'Error connecting to Gemini API';
      
      // Check for specific model-related errors
      if (errorMessage.includes("models") && errorMessage.includes("not found")) {
        errorMessage = "Model not found or not available. Please check the README for model information.";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Sample prompts to quickly test
  const samplePrompts = [
    "Write a short poem about technology",
    "Explain quantum computing in simple terms",
    "Create a short story about a robot learning to paint",
    "List 5 interesting facts about space"
  ];

  const handleSamplePrompt = (text) => {
    setPrompt(text);
  };

  // Tab button component
  const TabButton = ({ id, label, isActive }) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        padding: '10px 20px',
        backgroundColor: isActive ? '#4285F4' : '#f1f1f1',
        color: isActive ? 'white' : '#333',
        border: 'none',
        borderRadius: isActive ? '4px 4px 0 0' : '4px',
        cursor: 'pointer',
        fontWeight: isActive ? 'bold' : 'normal',
        borderBottom: isActive ? 'none' : '1px solid #ddd',
        marginRight: '5px',
        fontSize: '16px'
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <TabButton id="text" label="Text Prompts" isActive={activeTab === 'text'} />
        <TabButton id="pdf" label="PDF Analysis" isActive={activeTab === 'pdf'} />
      </div>

      {activeTab === 'text' ? (
        // Text prompts UI
        <>
          <h2>Gemini Text Prompts</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <h3>Sample Prompts</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {samplePrompts.map((text, index) => (
                <button 
                  key={index}
                  onClick={() => handleSamplePrompt(text)}
                  style={{ 
                    padding: '8px 12px', 
                    backgroundColor: '#f0f0f0', 
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {text.substring(0, 30)}...
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h3>Table Prompts</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {tableSamplePrompts.map((text, index) => (
                <button 
                  key={index}
                  onClick={() => handleSamplePrompt(text)}
                  style={{ 
                    padding: '8px 12px', 
                    backgroundColor: '#e6f7ff', 
                    border: '1px solid #91d5ff',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {text.substring(0, 30)}...
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h3>Markdown Formatting Prompts</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {markdownPrompts.map((text, index) => (
                <button 
                  key={index}
                  onClick={() => handleSamplePrompt(text)}
                  style={{ 
                    padding: '8px 12px', 
                    backgroundColor: '#f0f2ff', 
                    border: '1px solid #d6e4ff',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {text.substring(0, 30)}...
                </button>
              ))}
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="prompt" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Enter Prompt:
              </label>
              <textarea 
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your prompt here..."
                rows={5}
                style={{ 
                  width: '100%', 
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  fontFamily: 'inherit',
                  fontSize: '16px'
                }}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading || !prompt.trim()}
              style={{ 
                padding: '10px 16px', 
                backgroundColor: '#4285F4', 
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {loading ? 'Processing...' : 'Test Prompt'}
            </button>
          </form>

          {error && (
            <div style={{ 
              color: 'white', 
              backgroundColor: '#d32f2f',
              padding: '10px 15px',
              borderRadius: '4px',
              marginTop: '20px'
            }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {response && (
            <div style={{ 
              marginTop: '30px',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <h3>Latest Response:</h3>
              <div style={{ 
                backgroundColor: 'white',
                border: '1px solid #eee',
                borderRadius: '4px',
                maxHeight: '500px',
                overflow: 'auto',
                padding: '15px'
              }}>
                <MarkdownRenderer content={response} />
              </div>
            </div>
          )}

          {history.length > 0 && (
            <div style={{ marginTop: '40px' }}>
              <h3>Test History</h3>
              <div style={{ maxHeight: '400px', overflow: 'auto' }}>
                {history.map(entry => (
                  <div 
                    key={entry.id} 
                    style={{
                      marginBottom: '15px',
                      padding: '15px',
                      backgroundColor: '#f0f7ff',
                      borderRadius: '8px',
                      border: '1px solid #d0e1f9'
                    }}
                  >
                    <div style={{ fontSize: '12px', color: '#666', textAlign: 'right' }}>
                      {entry.timestamp}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <strong>Prompt:</strong>
                      <div style={{ 
                        padding: '8px', 
                        backgroundColor: '#e6f2ff',
                        borderRadius: '4px' 
                      }}>
                        {entry.prompt}
                      </div>
                    </div>
                    <div>
                      <strong>Response:</strong>
                      <div style={{ 
                        padding: '8px', 
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        maxHeight: '200px',
                        overflow: 'auto'
                      }}>
                        <MarkdownRenderer content={entry.response} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        // PDF Analysis UI
        <PDFAnalyzer />
      )}
    </div>
  );
};

export default GeminiTester; 