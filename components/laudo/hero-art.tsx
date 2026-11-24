import { getTranslations } from "next-intl/server"

// vértebra: [x, y, largura]; disco logo abaixo: [x, y, largura, cor]
const VERTEBRAE: [number, number, number][] = [
  [201, 28, 58], [199, 58, 62], [197, 88, 66], [195, 118, 70], [193, 148, 74],
]
const DISCS: [number, number, number, string, number][] = [
  [203, 51, 54, "#DEB036", 0.55], [201, 81, 58, "#DEB036", 0.55], [199, 111, 62, "#DEB036", 0.55],
  [197, 141, 66, "#E2574C", 1], [193, 171, 74, "#E2574C", 1],
]
const NERVE = "M262 150 C276 172 272 196 268 214 C264 236 270 262 272 290 C274 318 268 344 266 380"

export async function HeroArt() {
  const t = await getTranslations("laudo.heroTags")
  const tags: [number, number, number, string, number][] = [
    [372, 70, 186, t("hernia"), 1],
    [410, 130, 120, t("sciatic"), 1],
    [372, 190, 150, t("protrusion"), 0.6],
    [424, 250, 164, "L4-L5 · L5-S1", 0.6],
  ]

  return (
    <div className="hero-art" aria-hidden="true">
      <svg viewBox="0 0 640 380" role="presentation" focusable="false">
        <defs>
          <radialGradient id="hvGlow" cx="38%" cy="40%" r="60%">
            <stop offset="0" stopColor="#DEB036" stopOpacity=".22" />
            <stop offset="1" stopColor="#DEB036" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hvHot" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#E2574C" stopOpacity=".85" />
            <stop offset="1" stopColor="#E2574C" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hvBone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#EFE8D8" />
            <stop offset="1" stopColor="#BFB49B" />
          </linearGradient>
          <linearGradient id="hvBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2A2622" />
            <stop offset="1" stopColor="#17161A" />
          </linearGradient>
          <linearGradient id="hvFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset=".7" stopColor="#0C0C0E" stopOpacity="0" />
            <stop offset="1" stopColor="#0C0C0E" stopOpacity="1" />
          </linearGradient>
          <pattern id="hvGrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="#DEB036" strokeOpacity=".06" />
          </pattern>
        </defs>
        <rect width="640" height="380" fill="#111114" />
        <rect width="640" height="380" fill="url(#hvGrid)" />
        <rect width="640" height="380" fill="url(#hvGlow)" />
        {/* silhueta (costas) */}
        <path
          d="M150 10 C146 90 140 150 128 196 C118 236 132 262 150 276 L170 380 L222 380 L226 300 L234 300 L238 380 L290 380 L310 276 C328 262 342 236 332 196 C320 150 314 90 310 10 Z"
          fill="url(#hvBody)"
          stroke="#3A352E"
        />
        {/* pelve */}
        <path
          d="M178 186 C150 176 140 204 156 224 C170 240 196 238 212 222 Z M282 186 C310 176 320 204 304 224 C290 240 264 238 248 222 Z"
          fill="#CFC6B2"
          opacity=".55"
        />
        <path d="M206 184 L254 184 L244 236 L230 250 L216 236 Z" fill="url(#hvBone)" opacity=".9" />
        {VERTEBRAE.map(([x, y, w], i) => (
          <g key={i}>
            <rect x={x} y={y} width={w} height="22" rx="7" fill="url(#hvBone)" stroke="#C9C1AE" strokeOpacity=".35" />
            <path
              d={`M${x} ${y + 11} h-16 M${x + w} ${y + 11} h16`}
              stroke="#BDB49F"
              strokeWidth="5"
              strokeLinecap="round"
              opacity=".7"
            />
            <text x={x - 24} y={y + 15} textAnchor="end" className="hv-l">
              L{i + 1}
            </text>
          </g>
        ))}
        {DISCS.map(([x, y, w, fill, opacity], i) => (
          <rect key={i} x={x} y={y} width={w} height="6" rx="3" fill={fill} opacity={opacity} />
        ))}
        {/* ponto de dor */}
        <circle cx="258" cy="148" r="34" fill="url(#hvHot)" className="hv-pulse" />
        <path d="M262 144 q10 -2 14 6" stroke="#E2574C" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* nervo ciático */}
        <path d={NERVE} fill="none" stroke="#DEB036" strokeWidth="5" strokeLinecap="round" />
        <path
          d={NERVE}
          fill="none"
          stroke="#FF7A6E"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="10 50"
          className="hv-flow"
        />
        <ellipse cx="270" cy="300" rx="24" ry="52" fill="url(#hvHot)" opacity=".45" />
        <rect width="640" height="380" fill="url(#hvFade)" />
        <g className="hv-tags">
          {tags.map(([x, y, w, label, op]) => (
            <g key={label} transform={`translate(${x} ${y})`}>
              <rect width={w} height="40" rx="20" fill="#16161A" stroke="#DEB036" strokeOpacity={op} />
              <circle cx="22" cy="20" r="6" fill={op === 1 && y === 70 ? "#E2574C" : "#DEB036"} opacity={op === 1 ? 1 : 0.7} />
              <text x="38" y="26">
                {label}
              </text>
            </g>
          ))}
        </g>
        <path d="M300 150 C330 150 345 110 378 92" stroke="#DEB036" strokeOpacity=".5" strokeDasharray="3 5" fill="none" />
        <path d="M290 250 C340 250 370 160 408 152" stroke="#DEB036" strokeOpacity=".35" strokeDasharray="3 5" fill="none" />
      </svg>
    </div>
  )
}
