import React, { useState } from 'react';
import { analyzeImage } from '../services/geminiService';
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
      Gemini is analyzing image...
    </div>
  </div>
);

const ImageAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setAnalysis(null);
      setError(null);
    }
  };

  const handleAnalyzeImage = async () => {
    if (!image) {
      setError('Please select an image first.');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await analyzeImage(image);
      setAnalysis(result);
    } catch (err) {
      setError(err.message || 'Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
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
        Image Analysis with Gemini
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
            <h3>Upload Image</h3>
            
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ 
                marginBottom: '20px',
                width: '100%' 
              }}
            />
            
            {imagePreview && (
              <div style={{ marginBottom: '20px' }}>
                <img 
                  src={imagePreview} 
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
              onClick={handleAnalyzeImage}
              disabled={loading || !image}
              style={{ 
                backgroundColor: '#1a73e8',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: loading || !image ? 'not-allowed' : 'pointer',
                opacity: loading || !image ? 0.7 : 1,
                width: '100%'
              }}
            >
              {loading ? 'Analyzing...' : 'Analyze Image'}
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
              <h3>Image Analysis Results</h3>
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

export default ImageAnalyzer; 