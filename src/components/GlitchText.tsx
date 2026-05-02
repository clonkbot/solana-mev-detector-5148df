import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }, 4000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className={`glitch-text ${className} ${glitching ? 'glitching' : ''}`} data-text={text}>
      {text}
    </h1>
  );
}
