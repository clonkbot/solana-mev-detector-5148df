export interface MevAnalysis {
  isSandwiched: boolean;
  userLoss?: number;
  attackerProfit?: number;
  frontRunBuy?: {
    txHash: string;
    amount: number;
    token: string;
    price: number;
  };
  backRunSell?: {
    txHash: string;
    amount: number;
    token: string;
    price: number;
  };
  victimTx?: {
    amount: number;
    token: string;
    expectedPrice: number;
    actualPrice: number;
  };
  attackerWallet?: string;
  error?: string;
}

// Simulated MEV detection - in production this would call Solana RPC
export function detectMev(txHash: string): MevAnalysis {
  // Validate hash format (Solana tx signatures are base58, 87-88 chars)
  if (txHash.length < 40) {
    return {
      isSandwiched: false,
      error: 'Invalid transaction hash format. Please enter a valid Solana transaction signature.'
    };
  }

  // For demo purposes, simulate detection based on hash characteristics
  // In production, this would:
  // 1. Fetch the transaction from Solana RPC
  // 2. Analyze the block for sandwich patterns
  // 3. Identify front-run and back-run transactions

  // Use hash to deterministically generate "results" for demo
  const hashSum = txHash.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const isSandwiched = hashSum % 3 !== 0; // ~66% chance of "detecting" MEV for demo

  if (!isSandwiched) {
    return { isSandwiched: false };
  }

  // Generate realistic-looking MEV data
  const userLoss = 0.05 + (hashSum % 100) / 100;
  const attackerProfit = userLoss * 0.95; // Attacker keeps most

  const tokens = ['BONK', 'WIF', 'POPCAT', 'MEW', 'BOME', 'JUP'];
  const tokenIndex = hashSum % tokens.length;
  const token = tokens[tokenIndex];

  const basePrice = 0.00001 + (hashSum % 1000) / 10000000;
  const priceImpact = basePrice * 0.03;

  // Generate fake but realistic-looking hashes
  const generateFakeHash = (seed: number) => {
    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let hash = '';
    for (let i = 0; i < 88; i++) {
      hash += chars[(seed * (i + 1) * 7) % chars.length];
    }
    return hash;
  };

  const generateFakeWallet = (seed: number) => {
    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let wallet = '';
    for (let i = 0; i < 44; i++) {
      wallet += chars[(seed * (i + 1) * 13) % chars.length];
    }
    return wallet;
  };

  return {
    isSandwiched: true,
    userLoss,
    attackerProfit,
    frontRunBuy: {
      txHash: generateFakeHash(hashSum * 2),
      amount: 5000 + (hashSum % 10000),
      token,
      price: basePrice,
    },
    backRunSell: {
      txHash: generateFakeHash(hashSum * 3),
      amount: 5000 + (hashSum % 10000),
      token,
      price: basePrice + priceImpact,
    },
    victimTx: {
      amount: 100 + (hashSum % 500),
      token,
      expectedPrice: basePrice,
      actualPrice: basePrice + (priceImpact * 0.8),
    },
    attackerWallet: generateFakeWallet(hashSum),
  };
}
