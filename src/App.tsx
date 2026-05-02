import { useState, useEffect } from 'react';
import { ScanLines } from './components/ScanLines';
import { GlitchText } from './components/GlitchText';
import { TransactionInput } from './components/TransactionInput';
import { MevResult } from './components/MevResult';
import { detectMev, type MevAnalysis } from './utils/mevDetector';
import './styles.css';

function App() {
  const [txHash, setTxHash] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<MevAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!txHash.trim()) return;

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    // Simulate analysis delay for dramatic effect
    await new Promise(resolve => setTimeout(resolve, 2000));

    const analysis = detectMev(txHash.trim());

    if (analysis.error) {
      setError(analysis.error);
    } else {
      setResult(analysis);
    }

    setIsAnalyzing(false);
  };

  return (
    <div className="app-container">
      <ScanLines />

      <div className="noise-overlay" />

      <main className="main-content">
        <header className="header">
          <div className="logo-container">
            <div className="logo-icon">
              <svg viewBox="0 0 40 40" className="w-10 h-10 md:w-12 md:h-12">
                <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400" />
                <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400 opacity-60" />
                <circle cx="20" cy="20" r="6" fill="currentColor" className="text-red-500 animate-pulse" />
                <line x1="20" y1="2" x2="20" y2="8" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
                <line x1="20" y1="32" x2="20" y2="38" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
                <line x1="2" y1="20" x2="8" y2="20" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
                <line x1="32" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
              </svg>
            </div>
            <div>
              <GlitchText text="MEV DETECTOR" className="title" />
              <p className="subtitle">SOLANA SANDWICH ATTACK ANALYZER</p>
            </div>
          </div>

          <div className="status-indicators">
            <div className="status-item">
              <span className="status-dot online" />
              <span className="status-label">MAINNET</span>
            </div>
            <div className="status-item">
              <span className="status-dot active" />
              <span className="status-label">SCANNING</span>
            </div>
          </div>
        </header>

        <div className="content-area">
          <TransactionInput
            value={txHash}
            onChange={setTxHash}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
          />

          {isAnalyzing && (
            <div className="analyzing-state">
              <div className="scanner-animation">
                <div className="scanner-line" />
              </div>
              <p className="analyzing-text">
                <span className="blink">[</span>
                ANALYZING TRANSACTION BUNDLE
                <span className="blink">]</span>
              </p>
              <div className="progress-bar">
                <div className="progress-fill" />
              </div>
            </div>
          )}

          {error && (
            <div className="error-display">
              <span className="error-icon">!</span>
              <span>{error}</span>
            </div>
          )}

          {result && !isAnalyzing && (
            <MevResult analysis={result} />
          )}
        </div>

        <footer className="footer">
          <p className="footer-text">
            Requested by <span className="footer-handle">@eternal_sol</span> · Built by <span className="footer-handle">@clonkbot</span>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
