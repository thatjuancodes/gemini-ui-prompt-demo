import React, { useState } from 'react';
import { generateContent } from '../services/geminiService';

const GeminiChat = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const result = await generateContent(prompt);
      setResponse(result);
    } catch (err) {
      setError(err.message || 'Error connecting to Gemini API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gemini-chat">
      <h2>Gemini AI Chat</h2>
      
      <form onSubmit={handleSubmit}>
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          rows={4}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <button 
          type="submit" 
          disabled={loading || !prompt.trim()}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#4285F4', 
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Generating...' : 'Send to Gemini'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', margin: '10px 0' }}>
          {error}
        </div>
      )}

      {response && (
        <div className="response" style={{ marginTop: '20px' }}>
          <h3>Response:</h3>
          <div style={{ 
            whiteSpace: 'pre-wrap',
            backgroundColor: '#f5f5f5',
            padding: '10px',
            borderRadius: '4px'
          }}>
            {response}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiChat; 