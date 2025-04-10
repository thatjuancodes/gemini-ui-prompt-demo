import './App.css';
import GeminiTester from './components/GeminiTester';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Gemini API Testing Interface</h1>
        <p style={{ fontSize: '16px', margin: '0', fontWeight: 'normal' }}>
          <span style={{ backgroundColor: '#0F9D58', color: 'white', padding: '2px 8px', borderRadius: '4px', marginRight: '6px' }}>New!</span>
          Test with text prompts or upload PDF files for analysis
        </p>
      </header>
      <main>
        <GeminiTester />
      </main>
      <footer style={{ textAlign: 'center', padding: '20px', marginTop: '40px', borderTop: '1px solid #eee', color: '#666', fontSize: '14px' }}>
        Powered by Google Gemini API • Built with React
      </footer>
    </div>
  );
}

export default App;
