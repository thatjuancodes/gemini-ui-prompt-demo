import React, { useState } from 'react';
import { analyzePDF } from '../services/geminiService';
import MarkdownRenderer from './MarkdownRenderer';

// Gemini Loading Animation Component
const GeminiLoadingAnimation = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: '40px 20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    minHeight: '300px'
  }}>
    <div style={{ 
      width: '80px', 
      height: '80px', 
      borderRadius: '50%',
      border: '5px solid #4285F4',
      borderTopColor: 'transparent',
      animation: 'spin 1s linear infinite',
      marginBottom: '20px'
    }} />
    
    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes pulse {
        0% { transform: scale(0.8); opacity: 0.5; }
        50% { transform: scale(1.2); opacity: 1; }
        100% { transform: scale(0.8); opacity: 0.5; }
      }
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    `}</style>
    
    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
      <div style={{ 
        width: '15px', 
        height: '15px', 
        backgroundColor: '#4285F4', 
        borderRadius: '50%',
        animation: 'bounce 0.6s ease-in-out infinite',
        animationDelay: '0s'
      }} />
      <div style={{ 
        width: '15px', 
        height: '15px', 
        backgroundColor: '#EA4335', 
        borderRadius: '50%',
        animation: 'bounce 0.6s ease-in-out infinite',
        animationDelay: '0.2s'
      }} />
      <div style={{ 
        width: '15px', 
        height: '15px', 
        backgroundColor: '#FBBC05', 
        borderRadius: '50%',
        animation: 'bounce 0.6s ease-in-out infinite',
        animationDelay: '0.4s'
      }} />
      <div style={{ 
        width: '15px', 
        height: '15px', 
        backgroundColor: '#34A853', 
        borderRadius: '50%',
        animation: 'bounce 0.6s ease-in-out infinite',
        animationDelay: '0.6s'
      }} />
    </div>
    
    <div style={{ 
      fontSize: '18px', 
      color: '#5f6368',
      fontWeight: 'bold',
      animation: 'pulse 2s ease-in-out infinite'
    }}>
      Gemini is analyzing PDF...
    </div>
  </div>
);

const PDFAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [prompt, setPrompt] = useState('Analyze this PDF and summarize its key points');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      
      // Format file size
      const size = selectedFile.size;
      let formattedSize = '';
      if (size < 1024) {
        formattedSize = `${size} bytes`;
      } else if (size < 1024 * 1024) {
        formattedSize = `${(size / 1024).toFixed(2)} KB`;
      } else {
        formattedSize = `${(size / (1024 * 1024)).toFixed(2)} MB`;
      }
      setFileSize(formattedSize);
      
      setError(null);
    } else if (selectedFile) {
      setError('Please upload a PDF file');
      setFile(null);
      setFileName('');
      setFileSize('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a PDF file first');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await analyzePDF(file, prompt);
      setAnalysis(result);
    } catch (err) {
      console.error("PDF Analysis Error:", err);
      setError(err.message || 'Error analyzing PDF');
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setFileName('');
    setFileSize('');
    setAnalysis('');
  };

  // Sample prompts specific to PDF analysis
  const samplePrompts = [
    "Analyze this PDF and summarize its key points",
    "Extract all tables from this PDF and present them in markdown format",
    "Identify key people, organizations, and dates mentioned in this document",
    "What are the main conclusions or recommendations from this document?",
    "Extract all statistical data from this document"
  ];

  // Add special prompts for extracting tables from PDFs
  const tableExtractionPrompts = [
    "Extract all tables from this PDF and format them as markdown tables",
    "Find any data tables in this PDF and convert them to markdown format",
    "Identify numerical data in this PDF and present it as a structured table"
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', textAlign: 'left' }}>
      <h2>PDF Analysis with Gemini</h2>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {/* Left Column - Input */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <div style={{ 
            padding: '25px', 
            backgroundColor: '#f5f9ff', 
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #e0e0e0',
            textAlign: 'left'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Upload PDF</h3>
            
            <div style={{ 
              marginBottom: '20px',
              padding: '30px',
              borderRadius: '8px',
              border: '2px dashed #4285F4',
              backgroundColor: '#f0f7ff',
              textAlign: 'center'
            }}>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: '#4285F4',
                  color: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                Select PDF File
              </label>
              
              <div style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
                {file ? `Selected: ${fileName}` : 'Click to choose a PDF file'}
              </div>
            </div>
            
            {file && (
              <div style={{ 
                marginBottom: '20px',
                backgroundColor: 'white',
                padding: '15px',
                borderRadius: '4px',
                border: '1px solid #e0e0e0',
                textAlign: 'left'
              }}>
                <div><strong>File:</strong> {fileName}</div>
                <div><strong>Size:</strong> {fileSize}</div>
                <button 
                  onClick={clearFile}
                  style={{
                    marginTop: '10px',
                    padding: '6px 12px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Remove File
                </button>
              </div>
            )}
            
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="prompt" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Analysis Instructions:
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                  textAlign: 'left'
                }}
                placeholder="How should Gemini analyze this PDF?"
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '10px', fontSize: '16px' }}>Sample Analysis Prompts</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {samplePrompts.map((text, index) => (
                  <button 
                    key={index}
                    onClick={() => setPrompt(text)}
                    style={{ 
                      padding: '8px 12px', 
                      backgroundColor: prompt === text ? '#4285F4' : '#f0f0f0',
                      color: prompt === text ? 'white' : 'black',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      textAlign: 'left'
                    }}
                  >
                    {text.length > 25 ? `${text.substring(0, 25)}...` : text}
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '10px', fontSize: '16px' }}>Table Extraction Prompts</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {tableExtractionPrompts.map((text, index) => (
                  <button 
                    key={index}
                    onClick={() => setPrompt(text)}
                    style={{ 
                      padding: '8px 12px', 
                      backgroundColor: prompt === text ? '#4285F4' : '#e6f7ff',
                      color: prompt === text ? 'white' : 'black',
                      border: '1px solid #91d5ff',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      textAlign: 'left'
                    }}
                  >
                    {text.length > 25 ? `${text.substring(0, 25)}...` : text}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!file || loading}
              style={{
                width: '100%',
                padding: '12px 0',
                backgroundColor: !file || loading ? '#cccccc' : '#0F9D58',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: !file || loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {loading ? 'Analyzing PDF...' : 'Analyze with Gemini'}
            </button>
          </div>
        </div>
        
        {/* Right Column - Output */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          {error && (
            <div style={{ 
              color: 'white', 
              backgroundColor: '#d32f2f',
              padding: '10px 15px',
              borderRadius: '4px',
              marginBottom: '20px',
              textAlign: 'left'
            }}>
              <strong>Error:</strong> {error}
            </div>
          )}
          
          {loading ? (
            <GeminiLoadingAnimation />
          ) : analysis && (
            <div style={{ 
              padding: '25px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              textAlign: 'left'
            }}>
              <h3>PDF Analysis Results</h3>
              <div style={{ 
                padding: '15px',
                backgroundColor: 'white',
                border: '1px solid #eee',
                borderRadius: '4px',
                maxHeight: '600px',
                overflow: 'auto',
                textAlign: 'left'
              }}>
                <MarkdownRenderer content={analysis} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFAnalyzer; 