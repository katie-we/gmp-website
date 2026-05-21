const TICKER_ITEMS = [
  'Be the weather',
  'Use the cooler',
  'Inspect, don\'t expect',
  'Three to one',
  'I do, we do, you do',
  'Bad moment, great opportunity',
];

export default function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="v6-ticker" aria-hidden="true">
      <div className="v6-ticker-track">
        {items.map((item, i) => (
          <span key={i}>
            {item} <span style={{ opacity: 0.4 }}>&middot;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
