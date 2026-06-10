const TICKER_ITEMS = [
  'Three sons',
  '14 years teaching',
  'One newsletter, weekly',
  'Six Middle Skills',
  '1,000+ Students taught',
  '3.2M monthly views',
  'Austin, TX',
];

export default function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
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
