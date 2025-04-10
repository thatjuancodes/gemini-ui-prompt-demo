import React, { useState } from 'react';
import { analyzeImage, analyzePDF } from '../services/geminiService';
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
      Gemini is analyzing...
    </div>
  </div>
);

const UnifiedFileAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [filePreview, setFilePreview] = useState(null);
  const [prompt, setPrompt] = useState('Analyze this file and describe what you see');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // File type suggestions for specific types
  const promptSuggestions = {
    image: [
      "Describe what's in this image in detail",
      "Identify objects and people in this image",
      "Analyze the composition of this image",
      "What emotions or mood does this image convey?",
      "Detect text in this image and transcribe it"
    ],
    pdf: [
      "Summarize the key points of this PDF",
      "Extract all tables from this PDF as markdown",
      "Identify key entities (people, organizations, dates) in this document",
      "What are the main conclusions of this document?",
      "Extract all statistical data from this document"
    ]
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Check if file is an image or PDF
    const isImage = selectedFile.type.includes('image');
    const isPDF = selectedFile.type === 'application/pdf';

    if (!isImage && !isPDF) {
      setError('Please upload an image or PDF file');
      clearFile();
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setFileType(selectedFile.type);
    
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
    
    // Create preview for images
    if (isImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      
      // Set default image prompt
      setPrompt('Describe what you see in this image in detail');
    } else {
      // PDF doesn't need preview
      setFilePreview(null);
      
      // Set default PDF prompt
      setPrompt('Analyze this PDF and summarize its key points');
    }
    
    setAnalysis(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      let result;
      if (file.type.includes('image')) {
        result = await analyzeImage(file, prompt);
      } else if (file.type === 'application/pdf') {
        result = await analyzePDF(file, prompt);
      } else {
        throw new Error('Unsupported file type');
      }
      
      setAnalysis(result);
    } catch (err) {
      console.error("Analysis Error:", err);
      setError(err.message || 'Error analyzing file');
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setFileName('');
    setFileType('');
    setFileSize('');
    setFilePreview(null);
    setAnalysis(null);
  };

  // Get suggestions based on file type
  const getSuggestions = () => {
    if (file?.type.includes('image')) {
      return promptSuggestions.image;
    } else if (file?.type === 'application/pdf') {
      return promptSuggestions.pdf;
    }
    return [];
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      gap: '20px'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#202124',
        marginBottom: '30px'
      }}>
        File Analysis with Gemini
      </h1>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row',
        gap: '30px',
        flexWrap: 'wrap'
      }}>
        {/* Left Column - Input */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ 
            padding: '25px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e0e0e0'
          }}>
            <h3>Upload File</h3>
            
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
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
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
                Select Image or PDF
              </label>
              
              <div style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
                {file ? `Selected: ${fileName}` : 'Click to choose an image or PDF file'}
              </div>
            </div>
            
            {file && (
              <div style={{ 
                marginBottom: '20px',
                backgroundColor: 'white',
                padding: '15px',
                borderRadius: '4px',
                border: '1px solid #e0e0e0'
              }}>
                <div><strong>File:</strong> {fileName}</div>
                <div><strong>Type:</strong> {fileType}</div>
                <div><strong>Size:</strong> {fileSize}</div>
                
                {filePreview && (
                  <div style={{ marginTop: '15px', textAlign: 'center' }}>
                    <img 
                      src={filePreview} 
                      alt="Preview" 
                      style={{ 
                        maxWidth: '100%',
                        maxHeight: '300px',
                        borderRadius: '4px'
                      }} 
                    />
                  </div>
                )}
                
                <button 
                  onClick={clearFile}
                  style={{
                    marginTop: '15px',
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
                  fontSize: '16px'
                }}
                placeholder="How should Gemini analyze this file?"
              />
            </div>
            
            {file && getSuggestions().length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ marginBottom: '10px', fontSize: '16px' }}>
                  Prompt Suggestions for {file.type.includes('image') ? 'Images' : 'PDFs'}
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {getSuggestions().map((text, index) => (
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
                        fontSize: '14px'
                      }}
                    >
                      {text.length > 25 ? `${text.substring(0, 25)}...` : text}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <button
              onClick={handleAnalyze}
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
              {loading ? 'Analyzing...' : 'Analyze with Gemini'}
            </button>
          </div>
        </div>
        
        {/* Right Column - Output */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          {error && (
            <div style={{ 
              color: 'white', 
              backgroundColor: '#d32f2f',
              padding: '10px 15px',
              borderRadius: '4px',
              marginBottom: '20px'
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
              border: '1px solid #e0e0e0'
            }}>
              <h3>Analysis Results</h3>
              <div style={{ 
                padding: '15px',
                backgroundColor: 'white',
                border: '1px solid #eee',
                borderRadius: '4px',
                maxHeight: '600px',
                overflow: 'auto'
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

export default UnifiedFileAnalyzer; 