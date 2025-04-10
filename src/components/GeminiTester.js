import React, { useState } from 'react';
import { generateContent } from '../services/geminiService';

const GeminiTester = () => {
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

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Gemini API Tester</h2>
      
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
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            padding: '15px',
            backgroundColor: 'white',
            border: '1px solid #eee',
            borderRadius: '4px',
            maxHeight: '300px',
            overflow: 'auto'
          }}>
            {response}
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
                    maxHeight: '150px',
                    overflow: 'auto',
                    fontSize: '14px'
                  }}>
                    {entry.response}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiTester; 