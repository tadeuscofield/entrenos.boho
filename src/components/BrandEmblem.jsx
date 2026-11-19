import React from 'react';

/**
 * Vector emblem faithful to the @entrenos.boho crest:
 * warm blush-cream circle, olive leaf sprig, EN monogram intertwined with cord,
 * and delicate mini macrame wall-hanging silhouette.
 */
export function BrandEmblem({ size = 48, showWordmark = true }) {
  return (
    <div className="brand-lockup" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="60" cy="60" r="58" fill="#F6E5D6" stroke="#D8BFA8" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="53" stroke="#9B826B" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.55" />

        {/* Olive branch left */}
        <path
          d="M42 56C33 47 30 34 34 22"
          stroke="#6A7050"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <ellipse cx="30" cy="40" rx="5.5" ry="2.6" transform="rotate(-35 30 40)" fill="#6A7050" opacity="0.88" />
        <ellipse cx="38" cy="34" rx="5" ry="2.4" transform="rotate(35 38 34)" fill="#6A7050" opacity="0.88" />
        <ellipse cx="29" cy="29" rx="5" ry="2.4" transform="rotate(-25 29 29)" fill="#6A7050" opacity="0.88" />
        <ellipse cx="36" cy="24" rx="4.2" ry="2.1" transform="rotate(40 36 24)" fill="#6A7050" opacity="0.88" />

        {/* Monogram E N */}
        <text
          x="45"
          y="53"
          fill="#5C4433"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="30"
          fontWeight="600"
          letterSpacing="-2"
        >
          E
        </text>
        <text
          x="59"
          y="56"
          fill="#5C4433"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="30"
          fontWeight="600"
        >
          N
        </text>

        {/* Knotted cord weaving through monogram */}
        <path
          d="M42 42C51 39 58 46 67 43C75 40 82 44 85 50"
          stroke="#C58B37"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="60" cy="43.5" r="2.1" fill="#C58B37" />

        {/* Delicate mini macrame silhouette below */}
        <line x1="40" y1="81" x2="80" y2="81" stroke="#6E5542" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M46 81L60 95L74 81" stroke="#8C6D55" strokeWidth="1.2" fill="none" />
        <path d="M51 81L60 90L69 81" stroke="#8C6D55" strokeWidth="1.1" fill="none" />
        <line x1="47" y1="82" x2="47" y2="96" stroke="#A6876E" strokeWidth="1" />
        <line x1="53" y1="87" x2="53" y2="100" stroke="#A6876E" strokeWidth="1" />
        <line x1="60" y1="95" x2="60" y2="104" stroke="#A6876E" strokeWidth="1.1" />
        <line x1="67" y1="87" x2="67" y2="100" stroke="#A6876E" strokeWidth="1" />
        <line x1="73" y1="82" x2="73" y2="96" stroke="#A6876E" strokeWidth="1" />
      </svg>

      {showWordmark && (
        <div className="brand-wordmark">
          <span className="brand-title">Entre Nós</span>
          <span className="brand-subtitle">ATELIÊ · MACRAMÊ AUTORAL</span>
        </div>
      )}
    </div>
  );
}
