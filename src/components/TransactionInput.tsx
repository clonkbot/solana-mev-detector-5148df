interface TransactionInputProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export function TransactionInput({ value, onChange, onAnalyze, isAnalyzing }: TransactionInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isAnalyzing) {
      onAnalyze();
    }
  };

  return (
    <div className="input-section">
      <label className="input-label">
        <span className="label-bracket">[</span>
        TRANSACTION HASH
        <span className="label-bracket">]</span>
      </label>

      <div className="input-container">
        <span className="input-prefix">TX://</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter Solana transaction signature..."
          className="tx-input"
          disabled={isAnalyzing}
          spellCheck={false}
        />
      </div>

      <button
        onClick={onAnalyze}
        disabled={isAnalyzing || !value.trim()}
        className="analyze-button"
      >
        <span className="button-content">
          {isAnalyzing ? (
            <>
              <span className="spinner" />
              SCANNING...
            </>
          ) : (
            <>
              <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              DETECT MEV
            </>
          )}
        </span>
      </button>

      <p className="input-hint">
        Paste a Solana transaction hash to analyze for sandwich attacks
      </p>
    </div>
  );
}
