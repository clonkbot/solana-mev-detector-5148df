export function ScanLines() {
  return (
    <div className="scan-lines" aria-hidden="true">
      {Array.from({ length: 100 }).map((_, i) => (
        <div key={i} className="scan-line" style={{ top: `${i}%` }} />
      ))}
    </div>
  );
}
