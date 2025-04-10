import './App.css';
import { useState } from 'react';
import GeminiTester from './components/GeminiTester';
import ImageAnalyzer from './components/ImageAnalyzer';
import PDFAnalyzer from './components/PDFAnalyzer';
import UnifiedFileAnalyzer from './components/UnifiedFileAnalyzer';

// Tab component for application navigation
const Tab = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '12px 20px',
      backgroundColor: active ? '#4285F4' : '#f1f3f4',
      color: active ? 'white' : '#5f6368',
      border: 'none',
      borderRadius: active ? '8px 8px 0 0' : '8px 8px 0 0',
      cursor: 'pointer',
      fontWeight: active ? 'bold' : 'normal',
      margin: '0 5px',
      fontSize: '16px',
      transition: 'all 0.2s ease'
    }}
  >
    {label}
  </button>
);

function App() {
  const [activeTab, setActiveTab] = useState('unified');

  const renderContent = () => {
    switch (activeTab) {
      case 'tester':
        return <GeminiTester />;
      case 'image':
        return <ImageAnalyzer />;
      case 'pdf':
        return <PDFAnalyzer />;
      case 'unified':
      default:
        return <UnifiedFileAnalyzer />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gemini API Testing Interface</h1>
        <p style={{ fontSize: '16px', margin: '0 0 20px 0', fontWeight: 'normal' }}>
          <span style={{ backgroundColor: '#0F9D58', color: 'white', padding: '2px 8px', borderRadius: '4px', marginRight: '6px' }}>New!</span>
          Upload images, PDFs, or test with text prompts to explore Gemini's capabilities
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '-1px' }}>
          <Tab 
            label="Unified File Analyzer" 
            active={activeTab === 'unified'} 
            onClick={() => setActiveTab('unified')} 
          />
          <Tab 
            label="Image Analyzer" 
            active={activeTab === 'image'} 
            onClick={() => setActiveTab('image')} 
          />
          <Tab 
            label="PDF Analyzer" 
            active={activeTab === 'pdf'} 
            onClick={() => setActiveTab('pdf')} 
          />
          <Tab 
            label="Text Tester" 
            active={activeTab === 'tester'} 
            onClick={() => setActiveTab('tester')} 
          />
        </div>
      </header>
      
      <main style={{ borderTop: '1px solid #dadce0' }}>
        {renderContent()}
      </main>
      
      <footer style={{ 
        textAlign: 'center', 
        padding: '20px', 
        marginTop: '40px', 
        borderTop: '1px solid #eee', 
        color: '#666', 
        fontSize: '14px' 
      }}>
        Powered by Google Gemini API • Built with React
      </footer>
    </div>
  );
}

export default App;
