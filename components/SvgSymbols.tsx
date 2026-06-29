export function SvgSymbols() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0"
      height="0"
      style={{ position: 'absolute', overflow: 'hidden' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8ecc4" />
          <stop offset="45%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#9a7822" />
        </linearGradient>

        <symbol
          id="motif-rosette"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="100" cy="100" r="92" />
          <circle cx="100" cy="100" r="72" />
          <rect x="42" y="42" width="116" height="116" transform="rotate(0 100 100)" />
          <rect x="42" y="42" width="116" height="116" transform="rotate(45 100 100)" />
          <circle cx="100" cy="15" r="3.4" fill="currentColor" stroke="none" />
          <circle cx="160.2" cy="39.8" r="3.4" fill="currentColor" stroke="none" />
          <circle cx="185" cy="100" r="3.4" fill="currentColor" stroke="none" />
          <circle cx="160.2" cy="160.2" r="3.4" fill="currentColor" stroke="none" />
          <circle cx="100" cy="185" r="3.4" fill="currentColor" stroke="none" />
          <circle cx="39.8" cy="160.2" r="3.4" fill="currentColor" stroke="none" />
          <circle cx="15" cy="100" r="3.4" fill="currentColor" stroke="none" />
          <circle cx="39.8" cy="39.8" r="3.4" fill="currentColor" stroke="none" />
        </symbol>

        <symbol
          id="couple-icon"
          viewBox="0 0 220 230"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="62" cy="46" r="20" />
          <path d="M44,34 Q62,18 80,34" />
          <path d="M38,200 Q38,96 62,76 Q86,96 86,200 Z" />
          <line x1="62" y1="80" x2="62" y2="196" />
          <circle cx="62" cy="104" r="2" fill="currentColor" stroke="none" />
          <circle cx="62" cy="128" r="2" fill="currentColor" stroke="none" />
          <circle cx="62" cy="152" r="2" fill="currentColor" stroke="none" />
          <circle cx="158" cy="46" r="20" />
          <path d="M134,36 Q158,4 182,36 Q186,80 168,118 Q158,104 148,118 Q130,80 134,36 Z" />
          <path d="M132,200 Q132,108 158,86 Q184,108 184,200 Z" />
          <line x1="148" y1="150" x2="148" y2="196" />
          <line x1="168" y1="150" x2="168" y2="196" />
          <circle cx="158" cy="100" r="2.6" fill="currentColor" stroke="none" />
          <path d="M86,168 Q110,182 132,168" strokeWidth="1.4" />
          <path d="M110,18 l0,12 M104,24 l12,0" strokeWidth="1.6" />
        </symbol>

        <symbol
          id="arch-icon"
          viewBox="0 0 60 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10,52 V30 Q10,10 30,10 Q50,10 50,30 V52" />
          <path d="M18,52 V32 Q18,18 30,18 Q42,18 42,32 V52" />
          <circle cx="30" cy="10" r="2.2" fill="currentColor" stroke="none" />
        </symbol>

        <symbol id="pin-icon" viewBox="0 0 24 24">
          <path
            d="M12 22s7-7.4 7-13a7 7 0 1 0-14 0c0 5.6 7 13 7 13z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="12" cy="9" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </symbol>

        <symbol id="calendar-icon" viewBox="0 0 24 24">
          <rect
            x="3"
            y="5"
            width="18"
            height="16"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M3 9h18" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 3v4M16 3v4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </symbol>
      </defs>
    </svg>
  );
}
