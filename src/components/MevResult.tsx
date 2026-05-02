import { useState, useEffect } from 'react';
import { type MevAnalysis } from '../utils/mevDetector';

interface MevResultProps {
  analysis: MevAnalysis;
}

export function MevResult({ analysis }: MevResultProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!analysis.isSandwiched) {
    return (
      <div className={`result-container safe ${revealed ? 'revealed' : ''}`}>
        <div className="result-header safe-header">
          <div className="result-icon safe-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h2 className="result-title safe-title">NO MEV DETECTED</h2>
            <p className="result-subtitle">Transaction appears clean</p>
          </div>
        </div>

        <div className="safe-details">
          <div className="detail-row">
            <span className="detail-label">Status</span>
            <span className="detail-value safe-value">Protected</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Sandwich Risk</span>
            <span className="detail-value safe-value">None Found</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`result-container attacked ${revealed ? 'revealed' : ''}`}>
      <div className="attack-warning">
        <div className="warning-stripes" />
        <div className="warning-content">
          <span className="warning-icon">!</span>
          <span className="warning-text">SANDWICH ATTACK DETECTED</span>
        </div>
        <div className="warning-stripes" />
      </div>

      <div className="attack-summary">
        <div className="summary-card loss-card">
          <div className="card-header">
            <span className="card-icon loss-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </span>
            <span className="card-label">YOUR LOSS</span>
          </div>
          <div className="card-value loss-value">
            -{analysis.userLoss?.toFixed(4)} SOL
          </div>
          <div className="card-usd">
            ≈ ${((analysis.userLoss || 0) * 150).toFixed(2)} USD
          </div>
        </div>

        <div className="attack-flow">
          <div className="flow-line" />
          <div className="flow-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-red-400">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
            </svg>
          </div>
        </div>

        <div className="summary-card profit-card">
          <div className="card-header">
            <span className="card-icon profit-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </span>
            <span className="card-label">ATTACKER PROFIT</span>
          </div>
          <div className="card-value profit-value">
            +{analysis.attackerProfit?.toFixed(4)} SOL
          </div>
          <div className="card-usd">
            ≈ ${((analysis.attackerProfit || 0) * 150).toFixed(2)} USD
          </div>
        </div>
      </div>

      <div className="transaction-breakdown">
        <h3 className="breakdown-title">
          <span className="bracket">[</span>
          ATTACK SEQUENCE
          <span className="bracket">]</span>
        </h3>

        <div className="tx-sequence">
          <div className="tx-item front-run">
            <div className="tx-order">1</div>
            <div className="tx-details">
              <div className="tx-type">FRONT-RUN (BUY)</div>
              <div className="tx-info">
                <span className="tx-label">Amount:</span>
                <span className="tx-amount buy">{analysis.frontRunBuy?.amount.toFixed(4)} {analysis.frontRunBuy?.token}</span>
              </div>
              <div className="tx-info">
                <span className="tx-label">Price:</span>
                <span className="tx-amount">${analysis.frontRunBuy?.price.toFixed(6)}</span>
              </div>
              <div className="tx-hash">
                {analysis.frontRunBuy?.txHash}
              </div>
            </div>
          </div>

          <div className="tx-connector">
            <div className="connector-line" />
            <span className="connector-label">YOUR TX</span>
            <div className="connector-line" />
          </div>

          <div className="tx-item victim-tx">
            <div className="tx-order victim">V</div>
            <div className="tx-details">
              <div className="tx-type">VICTIM TRANSACTION</div>
              <div className="tx-info">
                <span className="tx-label">Amount:</span>
                <span className="tx-amount">{analysis.victimTx?.amount.toFixed(4)} {analysis.victimTx?.token}</span>
              </div>
              <div className="tx-info">
                <span className="tx-label">Expected Price:</span>
                <span className="tx-amount">${analysis.victimTx?.expectedPrice.toFixed(6)}</span>
              </div>
              <div className="tx-info">
                <span className="tx-label">Actual Price:</span>
                <span className="tx-amount worse">${analysis.victimTx?.actualPrice.toFixed(6)}</span>
              </div>
            </div>
          </div>

          <div className="tx-connector">
            <div className="connector-line" />
            <span className="connector-label">BACK-RUN</span>
            <div className="connector-line" />
          </div>

          <div className="tx-item back-run">
            <div className="tx-order">3</div>
            <div className="tx-details">
              <div className="tx-type">BACK-RUN (SELL)</div>
              <div className="tx-info">
                <span className="tx-label">Amount:</span>
                <span className="tx-amount sell">{analysis.backRunSell?.amount.toFixed(4)} {analysis.backRunSell?.token}</span>
              </div>
              <div className="tx-info">
                <span className="tx-label">Price:</span>
                <span className="tx-amount">${analysis.backRunSell?.price.toFixed(6)}</span>
              </div>
              <div className="tx-hash">
                {analysis.backRunSell?.txHash}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="attacker-info">
        <h3 className="breakdown-title">
          <span className="bracket">[</span>
          ATTACKER WALLET
          <span className="bracket">]</span>
        </h3>
        <div className="attacker-address">
          <span className="address-label">Address:</span>
          <code className="address-value">{analysis.attackerWallet}</code>
        </div>
      </div>
    </div>
  );
}
