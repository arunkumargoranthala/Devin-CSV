/* ════════════════════════════════════════════════════════════════════════════
 *  CategoryHeroAnimation
 *  ────────────────────────────────────────────────────────────────────────────
 *  Reusable SVG animation component for solution category hero sections.
 *  All 5 variants share the same structural pattern (slow → engine → fast)
 *  but each tells a different story through category-specific iconography.
 *
 *  Usage:
 *    <CategoryHeroAnimation variant="ai|automation|apps|data|workplace"
 *                           color="#06b6d4" accent="#67e8f9" />
 *
 *  Structure of every variant:
 *    1. Top atmosphere (soft grey)            — "before" zone
 *    2. Slow-moving icons (top)               — category-specific
 *    3. Energy beam + horizontal streaks      — the engine
 *    4. Central pulsing core                  — category-coloured
 *    5. Fast-moving icons (bottom)            — category-specific
 *    6. Bottom outcome labels                 — category-specific
 * ════════════════════════════════════════════════════════════════════════════ */

export default function CategoryHeroAnimation({
  variant = 'automation',
  color = '#06b6d4',
  accent = '#67e8f9',
}) {
  /* Deterministic id suffix per variant so multiple animations on a page don't clash */
  const id = variant

  /* Per-variant configuration: labels and which sub-renderer to use */
  const VARIANTS = {
    ai: {
      beforeLabel: 'BEFORE · MANUAL · SCATTERED',
      engineLabel: '◆  ENTERPRISE  COPILOT  ◆',
      afterLabel:  'AFTER · GROUNDED · INSTANT',
      pill: 'INSTANT',
      outcomes: ['CITED ANSWERS', 'GROUNDED IN DATA', 'ROLE-AWARE', '24/7 AVAILABLE'],
    },
    automation: {
      beforeLabel: 'BEFORE · MANUAL · SLOW',
      engineLabel: '◆  AUTOMATION  ENGINE  ◆',
      afterLabel:  'AFTER · AUTOMATED · INSTANT',
      pill: '10× FASTER',
      outcomes: ['ZERO ERRORS', '24/7 UPTIME', 'INSTANT DECISIONS', 'INFINITE SCALE'],
    },
    apps: {
      beforeLabel: 'BEFORE · FRAGMENTED · LEGACY',
      engineLabel: '◆  POWER  PLATFORM  ◆',
      afterLabel:  'AFTER · UNIFIED · MOBILE',
      pill: '4–6 WK BUILD',
      outcomes: ['MOBILE-FIRST', 'GOVERNED', 'INTEGRATED', 'SCALABLE'],
    },
    data: {
      beforeLabel: 'BEFORE · FRAGMENTED · STALE',
      engineLabel: '◆  MICROSOFT  FABRIC  ◆',
      afterLabel:  'AFTER · UNIFIED · LIVE',
      pill: 'REAL-TIME',
      outcomes: ['ONE SOURCE', 'AI-READY', 'GOVERNED', 'SELF-SERVE'],
    },
    workplace: {
      beforeLabel: 'BEFORE · SCATTERED · SILOED',
      engineLabel: '◆  MICROSOFT  365  ◆',
      afterLabel:  'AFTER · CONNECTED · CONTEXTUAL',
      pill: 'UNIFIED',
      outcomes: ['CONNECTED', 'AI-POWERED', 'MOBILE', 'GOVERNED'],
    },
  }

  const cfg = VARIANTS[variant] || VARIANTS.automation

  /* Each variant supplies its own slow-row icons (top), fast-row icons (bottom),
     and the central engine glyph. The frame, beam, atmospheres, and labels stay
     identical across variants — that's the "surprise without chaos" balance.   */

  return (
    <svg viewBox="0 0 700 440" preserveAspectRatio="xMidYMid meet"
      style={{ width:'100%', height:'auto', display:'block', filter:'drop-shadow(0 12px 32px rgba(0, 53, 128, 0.10))' }}>

      {/* ───────── Defs: gradients & filters ───────── */}
      <defs>
        <radialGradient id={`topAtmo-${id}`} cx="50%" cy="50%" r="55%">
          <stop offset="0%"   stopColor="#94a3b8" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id={`btmAtmo-${id}`} cx="50%" cy="50%" r="55%">
          <stop offset="0%"   stopColor={color}  stopOpacity="0.26"/>
          <stop offset="100%" stopColor={color}  stopOpacity="0"/>
        </radialGradient>
        <linearGradient id={`beam-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={color} stopOpacity="0"/>
          <stop offset="18%"  stopColor={color} stopOpacity="0.55"/>
          <stop offset="50%"  stopColor={color} stopOpacity="0.85"/>
          <stop offset="82%"  stopColor={accent} stopOpacity="0.55"/>
          <stop offset="100%" stopColor={accent} stopOpacity="0"/>
        </linearGradient>
        <radialGradient id={`core-${id}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%"   stopColor={accent} stopOpacity="1"/>
          <stop offset="50%"  stopColor={color}  stopOpacity="0.65"/>
          <stop offset="100%" stopColor="#003FB3" stopOpacity="1"/>
        </radialGradient>
        <filter id={`glow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ───────── Soft atmospheres ───────── */}
      <ellipse cx="350" cy="105" rx="345" ry="100" fill={`url(#topAtmo-${id})`}/>
      <ellipse cx="350" cy="335" rx="345" ry="100" fill={`url(#btmAtmo-${id})`}/>

      {/* ───────── Top zone label + "slow" indicator on right ───────── */}
      <text x="40" y="38" fontSize="15" fontWeight="800" letterSpacing="0.22em"
            fill="#64748b" fontFamily="'JetBrains Mono', monospace">
        {cfg.beforeLabel}
      </text>
      <g>
        <text x="640" y="48" textAnchor="middle" fontSize="12" fontWeight="800"
              letterSpacing="0.20em" fill="#64748b" fontFamily="'JetBrains Mono', monospace">SLOW</text>
        <text x="640" y="72" textAnchor="middle" fontSize="22" fontWeight="900" fill="#94a3b8">. . .</text>
      </g>

      {/* ───────── TOP ZONE: variant-specific slow icons (3 rows) ───────── */}
      {variant === 'ai'         && <SlowAI/>}
      {variant === 'automation' && <SlowAutomation/>}
      {variant === 'apps'       && <SlowApps/>}
      {variant === 'data'       && <SlowData/>}
      {variant === 'workplace'  && <SlowWorkplace/>}

      {/* ───────── CENTER: beam + engine ───────── */}
      <rect x="0" y="217" width="700" height="6" fill={`url(#beam-${id})`}/>

      {/* Animated horizontal streaks on the beam */}
      <g>
        {[0, 0.5, 1, 1.5].map((delay, i) => (
          <line key={i} x1="0" y1={219 + (i % 2 === 0 ? -2 : 1)} x2="40" y2={219 + (i % 2 === 0 ? -2 : 1)}
                stroke={i % 2 === 0 ? accent : color} strokeWidth={i % 2 === 0 ? 1.5 : 1}
                opacity={i % 2 === 0 ? 0.75 : 0.6}>
            <animate attributeName="x1" values="-50;700" dur="2s" begin={`${delay}s`} repeatCount="indefinite"/>
            <animate attributeName="x2" values="-10;740" dur="2s" begin={`${delay}s`} repeatCount="indefinite"/>
          </line>
        ))}
      </g>

      {/* Engine label */}
      <text x="350" y="200" textAnchor="middle" fontSize="15" fontWeight="800"
            letterSpacing="0.22em" fill="#003FB3" fontFamily="'JetBrains Mono', monospace">
        {cfg.engineLabel}
      </text>

      {/* Pulsing engine core */}
      <g transform="translate(350, 220)">
        <circle r="46" fill={`${color}30`}>
          <animate attributeName="r" values="46;52;46" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle r="36" fill={`url(#core-${id})`} filter={`url(#glow-${id})`}/>
        <circle r="25" fill="#003FB3">
          <animate attributeName="r" values="25;28;25" dur="2.2s" repeatCount="indefinite"/>
        </circle>
        <ellipse cx="-9" cy="-12" rx="11" ry="6" fill="rgba(255,255,255,0.35)"/>
        {/* Variant-specific glyph inside engine */}
        {variant === 'ai'         && <path d="M -10 -2 Q -5 -10 0 -2 Q 5 -10 10 -2 M -8 4 Q 0 12 8 4" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round"/>}
        {variant === 'automation' && <path d="M 3 -13 L -7 2 L 0 2 L -3 14 L 7 -1 L 0 -1 Z" fill={accent}/>}
        {variant === 'apps'       && <g><rect x="-9" y="-9" width="7" height="7" rx="1.5" fill={accent}/><rect x="2" y="-9" width="7" height="7" rx="1.5" fill={accent}/><rect x="-9" y="2" width="7" height="7" rx="1.5" fill={accent}/><rect x="2" y="2" width="7" height="7" rx="1.5" fill={accent}/></g>}
        {variant === 'data'       && <g><rect x="-10" y="0" width="3" height="9" fill={accent}/><rect x="-3" y="-6" width="3" height="15" fill={accent}/><rect x="4" y="-10" width="3" height="19" fill={accent}/></g>}
        {variant === 'workplace'  && <g><circle cx="-7" cy="-3" r="3.5" fill={accent}/><circle cx="7" cy="-3" r="3.5" fill={accent}/><circle cx="0" cy="5" r="3.5" fill={accent}/><line x1="-5" y1="-1" x2="-2" y2="3" stroke={accent} strokeWidth="1.2"/><line x1="5" y1="-1" x2="2" y2="3" stroke={accent} strokeWidth="1.2"/></g>}
      </g>

      {/* ───────── BOTTOM ZONE label ───────── */}
      <text x="40" y="288" fontSize="15" fontWeight="800" letterSpacing="0.22em"
            fill="#003FB3" fontFamily="'JetBrains Mono', monospace">
        {cfg.afterLabel}
      </text>

      {/* Bottom zone: variant-specific fast icons */}
      {variant === 'ai'         && <FastAI color={color} accent={accent}/>}
      {variant === 'automation' && <FastAutomation color={color} accent={accent}/>}
      {variant === 'apps'       && <FastApps color={color} accent={accent}/>}
      {variant === 'data'       && <FastData color={color} accent={accent}/>}
      {variant === 'workplace'  && <FastWorkplace color={color} accent={accent}/>}

      {/* ───────── Speed pill on the right ───────── */}
      <g transform="translate(605, 308)">
        <rect x="-44" y="-15" width="88" height="30" rx="15" fill="#003FB3"/>
        <text y="4" textAnchor="middle" fontSize="15" fontWeight="900" fill={accent}
              fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="0.04em">{cfg.pill}</text>
      </g>

      {/* ───────── Bottom outcome labels ───────── */}
      <g fontFamily="'Plus Jakarta Sans', sans-serif">
        {cfg.outcomes.map((o, i) => (
          <text key={i} x={[100, 265, 430, 600][i] || 100} y="425" textAnchor="middle"
                fontSize="13" fontWeight="800" letterSpacing="0.14em" fill="#003FB3">{o}</text>
        ))}
      </g>
    </svg>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 *  SLOW (top) zone sub-components — one per variant
 *  Generic grey/neutral, slow-moving (14s linear loops)
 * ════════════════════════════════════════════════════════════════════════════ */

function SlowAI() {
  return (
    <>
      {/* Person silhouette typing slowly */}
      <g>
        <g>
          <circle cx="0" cy="-12" r="7" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.3"/>
          <rect x="-6" y="-3" width="12" height="16" rx="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.3"/>
          <rect x="-12" y="14" width="24" height="4" rx="1" fill="#94a3b8"/>
          <text x="9" y="-15" fontSize="14" fontWeight="800" fill="#94a3b8">?</text>
        </g>
        <animateTransform attributeName="transform" type="translate" values="60 100; 540 100" dur="14s" repeatCount="indefinite"/>
      </g>
      {/* Loading-dots search bar */}
      <g>
        <g>
          <rect x="-32" y="-10" width="64" height="20" rx="10" fill="#fff" stroke="#cbd5e1" strokeWidth="1.4"/>
          <circle cx="-20" cy="0" r="2" fill="#94a3b8"><animate attributeName="opacity" values="1;0.2;1" dur="1.4s" repeatCount="indefinite"/></circle>
          <circle cx="-12" cy="0" r="2" fill="#94a3b8"><animate attributeName="opacity" values="1;0.2;1" dur="1.4s" begin="0.4s" repeatCount="indefinite"/></circle>
          <circle cx="-4" cy="0" r="2" fill="#94a3b8"><animate attributeName="opacity" values="1;0.2;1" dur="1.4s" begin="0.8s" repeatCount="indefinite"/></circle>
        </g>
        <animateTransform attributeName="transform" type="translate" values="120 135; 600 135" dur="14s" begin="3s" repeatCount="indefinite"/>
      </g>
      {/* Stack of scattered PDFs */}
      <g>
        <g>
          <rect x="-12" y="-12" width="20" height="24" rx="2" fill="#fff" stroke="#cbd5e1" strokeWidth="1.4" transform="rotate(-6)"/>
          <rect x="-10" y="-10" width="20" height="24" rx="2" fill="#fff" stroke="#cbd5e1" strokeWidth="1.4" transform="rotate(2)"/>
          <rect x="-8" y="-8"  width="20" height="24" rx="2" fill="#fff" stroke="#cbd5e1" strokeWidth="1.4" transform="rotate(8)"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="160 168; 600 168" dur="14s" begin="1.5s" repeatCount="indefinite"/>
      </g>
    </>
  )
}

function SlowAutomation() {
  return (
    <>
      {/* Stack of papers drifting */}
      <g>
        <g>
          <rect x="-2" y="-15" width="36" height="24" rx="3" fill="#fff" stroke="#cbd5e1" strokeWidth="1.4"/>
          <rect x="-4" y="-12" width="36" height="24" rx="3" fill="#fff" stroke="#cbd5e1" strokeWidth="1.4"/>
          <rect x="-6" y="-9"  width="36" height="24" rx="3" fill="#fff" stroke="#cbd5e1" strokeWidth="1.4"/>
          <line x1="-2" y1="-3" x2="22" y2="-3" stroke="#94a3b8" strokeWidth="1.2"/>
          <line x1="-2" y1="2"  x2="22" y2="2"  stroke="#94a3b8" strokeWidth="1.2"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="60 100; 540 100" dur="14s" repeatCount="indefinite"/>
      </g>
      {/* Person figure */}
      <g>
        <g>
          <circle cx="0" cy="-12" r="7" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.3"/>
          <rect x="-6" y="-3" width="12" height="16" rx="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.3"/>
          <line x1="-3" y1="13" x2="-5" y2="22" stroke="#64748b" strokeWidth="1.6" strokeLinecap="round"/>
          <line x1="3"  y1="13" x2="5"  y2="22" stroke="#64748b" strokeWidth="1.6" strokeLinecap="round"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="100 135; 580 135" dur="14s" begin="3s" repeatCount="indefinite"/>
      </g>
      {/* Clock — minute hand sweeps slowly */}
      <g>
        <g>
          <circle r="15" fill="#fff" stroke="#cbd5e1" strokeWidth="1.4"/>
          <line x1="0" y1="0" x2="0" y2="-9" stroke="#64748b" strokeWidth="1.6" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="8s" repeatCount="indefinite"/>
          </line>
          <line x1="0" y1="0" x2="6" y2="0" stroke="#64748b" strokeWidth="2" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="60s" repeatCount="indefinite"/>
          </line>
          <circle r="2" fill="#64748b"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="160 168; 600 168" dur="14s" begin="1.5s" repeatCount="indefinite"/>
      </g>
    </>
  )
}

function SlowApps() {
  return (
    <>
      {/* Cracked / disconnected card */}
      <g>
        <g>
          <rect x="-18" y="-12" width="36" height="24" rx="3" fill="#fff" stroke="#cbd5e1" strokeWidth="1.4"/>
          <line x1="-2" y1="-15" x2="2" y2="15" stroke="#94a3b8" strokeWidth="1.4" strokeDasharray="3 2"/>
          <rect x="-14" y="-8" width="10" height="4" rx="1" fill="#cbd5e1"/>
          <rect x="4"   y="-8" width="10" height="4" rx="1" fill="#cbd5e1"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="60 100; 540 100" dur="14s" repeatCount="indefinite"/>
      </g>
      {/* Old-style monitor */}
      <g>
        <g>
          <rect x="-14" y="-12" width="28" height="20" rx="2" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.4"/>
          <rect x="-11" y="-10" width="22" height="14" fill="#fff"/>
          <line x1="-4" y1="8" x2="4" y2="8" stroke="#64748b" strokeWidth="2"/>
          <line x1="-7" y1="12" x2="7" y2="12" stroke="#64748b" strokeWidth="2"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="100 135; 580 135" dur="14s" begin="3s" repeatCount="indefinite"/>
      </g>
      {/* Floppy / legacy icon */}
      <g>
        <g>
          <rect x="-12" y="-12" width="24" height="24" rx="2" fill="#94a3b8"/>
          <rect x="-8" y="-12" width="16" height="9" fill="#cbd5e1"/>
          <rect x="-6" y="2" width="12" height="6" fill="#fff"/>
          <line x1="-3" y1="4" x2="3" y2="4" stroke="#94a3b8" strokeWidth="0.8"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="160 168; 600 168" dur="14s" begin="1.5s" repeatCount="indefinite"/>
      </g>
    </>
  )
}

function SlowData() {
  return (
    <>
      {/* Spreadsheet rows */}
      <g>
        <g>
          <rect x="-22" y="-14" width="44" height="28" fill="#fff" stroke="#cbd5e1" strokeWidth="1.4"/>
          <line x1="-22" y1="-7" x2="22" y2="-7" stroke="#cbd5e1"/>
          <line x1="-22" y1="0"  x2="22" y2="0"  stroke="#cbd5e1"/>
          <line x1="-22" y1="7"  x2="22" y2="7"  stroke="#cbd5e1"/>
          <line x1="-7" y1="-14" x2="-7" y2="14" stroke="#cbd5e1"/>
          <line x1="7"  y1="-14" x2="7"  y2="14" stroke="#cbd5e1"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="60 100; 540 100" dur="14s" repeatCount="indefinite"/>
      </g>
      {/* CSV file */}
      <g>
        <g>
          <rect x="-12" y="-15" width="22" height="28" rx="2" fill="#fff" stroke="#cbd5e1" strokeWidth="1.4"/>
          <path d="M 4 -15 L 4 -9 L 10 -9" fill="none" stroke="#cbd5e1" strokeWidth="1.4"/>
          <text x="-1" y="3" fontSize="7" fontWeight="800" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">CSV</text>
        </g>
        <animateTransform attributeName="transform" type="translate" values="100 135; 580 135" dur="14s" begin="3s" repeatCount="indefinite"/>
      </g>
      {/* Empty graph */}
      <g>
        <g>
          <rect x="-15" y="-12" width="30" height="22" fill="#fff" stroke="#cbd5e1" strokeWidth="1.4"/>
          <line x1="-12" y1="6" x2="12" y2="6" stroke="#cbd5e1"/>
          <line x1="-12" y1="-9" x2="-12" y2="6" stroke="#cbd5e1"/>
          <polyline points="-10,4 -5,-2 0,1 5,-5 10,-3" fill="none" stroke="#cbd5e1" strokeWidth="1.4"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="160 168; 600 168" dur="14s" begin="1.5s" repeatCount="indefinite"/>
      </g>
    </>
  )
}

function SlowWorkplace() {
  return (
    <>
      {/* Isolated chat bubble */}
      <g>
        <g>
          <rect x="-14" y="-10" width="28" height="18" rx="9" fill="#fff" stroke="#cbd5e1" strokeWidth="1.4"/>
          <path d="M -8 8 L -10 13 L -3 8" fill="#fff" stroke="#cbd5e1" strokeWidth="1.4"/>
          <circle cx="-6" cy="-1" r="1.5" fill="#94a3b8"/>
          <circle cx="0" cy="-1" r="1.5" fill="#94a3b8"/>
          <circle cx="6" cy="-1" r="1.5" fill="#94a3b8"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="60 100; 540 100" dur="14s" repeatCount="indefinite"/>
      </g>
      {/* Email envelope */}
      <g>
        <g>
          <rect x="-14" y="-10" width="28" height="20" rx="2" fill="#fff" stroke="#cbd5e1" strokeWidth="1.4"/>
          <path d="M -14 -10 L 0 2 L 14 -10" fill="none" stroke="#cbd5e1" strokeWidth="1.4"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="100 135; 580 135" dur="14s" begin="3s" repeatCount="indefinite"/>
      </g>
      {/* Document file */}
      <g>
        <g>
          <rect x="-10" y="-14" width="22" height="28" rx="2" fill="#fff" stroke="#cbd5e1" strokeWidth="1.4"/>
          <path d="M 6 -14 L 6 -8 L 12 -8" fill="none" stroke="#cbd5e1" strokeWidth="1.4"/>
          <line x1="-6" y1="-3" x2="8" y2="-3" stroke="#cbd5e1" strokeWidth="1.2"/>
          <line x1="-6" y1="2"  x2="8" y2="2"  stroke="#cbd5e1" strokeWidth="1.2"/>
          <line x1="-6" y1="7"  x2="4" y2="7"  stroke="#cbd5e1" strokeWidth="1.2"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="160 168; 600 168" dur="14s" begin="1.5s" repeatCount="indefinite"/>
      </g>
    </>
  )
}


/* ════════════════════════════════════════════════════════════════════════════
 *  FAST (bottom) zone sub-components — one per variant
 *  Vivid category-coloured, fast-moving (3.5s linear loops)
 * ════════════════════════════════════════════════════════════════════════════ */

function FastAI({ color, accent }) {
  return (
    <>
      {/* Chat reply bubble */}
      <g>
        <g>
          <rect x="-22" y="-12" width="44" height="22" rx="11" fill={color}/>
          <path d="M -8 -1 L -2 5 L 8 -6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M -32 -7 L -24 -7 M -36 -1 L -22 -1 M -32 5 L -24 5" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="60 320; 660 320" dur="3.5s" repeatCount="indefinite"/>
      </g>
      {/* Lightning answer */}
      <g>
        <g>
          <path d="M 3 -13 L -7 2 L 0 2 L -3 14 L 7 -1 L 0 -1 Z" fill={color}/>
          <path d="M -28 -2 L -16 -2 M -32 4 L -18 4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="60 360; 660 360" dur="3.5s" begin="0.9s" repeatCount="indefinite"/>
      </g>
      {/* Citation/check */}
      <g>
        <g>
          <circle r="13" fill="#003FB3"/>
          <path d="M -6 -1 L -2 4 L 6 -5" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M -30 0 L -18 0 M -34 -6 L -20 -6 M -34 6 L -20 6" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.75"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="100 395; 700 395" dur="3.5s" begin="1.7s" repeatCount="indefinite"/>
      </g>
    </>
  )
}

function FastAutomation({ color, accent }) {
  return (
    <>
      {/* Cyan checkmark badge */}
      <g>
        <g>
          <rect x="-19" y="-12" width="38" height="24" rx="6" fill={color}/>
          <path d="M -8 -1 L -2 5 L 8 -6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M -28 -8 L -22 -8 M -34 -2 L -24 -2 M -30 4 L -22 4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="60 320; 660 320" dur="3.5s" repeatCount="indefinite"/>
      </g>
      <g>
        <g>
          <rect x="-19" y="-12" width="38" height="24" rx="6" fill={color}/>
          <path d="M -8 -1 L -2 5 L 8 -6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M -28 -8 L -22 -8 M -34 -2 L -24 -2 M -30 4 L -22 4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="60 360; 660 360" dur="3.5s" begin="0.9s" repeatCount="indefinite"/>
      </g>
      {/* Robot/automation glyph */}
      <g>
        <g>
          <path d="M 0 -16 L -7 -2 L -9 7 L -3 7 L -3 13 L 3 13 L 3 7 L 9 7 L 7 -2 Z" fill="#003FB3"/>
          <path d="M -7 9 L -11 16 M 7 9 L 11 16 M 0 13 L 0 20" stroke={accent} strokeWidth="1.6" strokeLinecap="round" opacity="0.85"/>
          <path d="M -28 0 L -14 0 M -34 -7 L -18 -7 M -34 7 L -18 7" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.75"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="100 395; 700 395" dur="3.5s" begin="1.7s" repeatCount="indefinite"/>
      </g>
    </>
  )
}

function FastApps({ color, accent }) {
  return (
    <>
      {/* Mobile phone showing unified app */}
      <g>
        <g>
          <rect x="-9" y="-15" width="18" height="30" rx="3" fill={color}/>
          <rect x="-7" y="-12" width="14" height="22" fill="#fff"/>
          <rect x="-5" y="-10" width="4" height="4" rx="0.5" fill={color}/>
          <rect x="1" y="-10" width="4" height="4" rx="0.5" fill={color}/>
          <rect x="-5" y="-4" width="4" height="4" rx="0.5" fill={color}/>
          <rect x="1" y="-4" width="4" height="4" rx="0.5" fill={color}/>
          <path d="M -26 -8 L -14 -8 M -30 -2 L -16 -2 M -28 4 L -14 4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="60 320; 660 320" dur="3.5s" repeatCount="indefinite"/>
      </g>
      {/* App grid */}
      <g>
        <g>
          <rect x="-15" y="-12" width="30" height="24" rx="4" fill={color}/>
          <rect x="-12" y="-9"  width="7" height="7" rx="1.5" fill="#fff"/>
          <rect x="-3"  y="-9"  width="7" height="7" rx="1.5" fill="#fff"/>
          <rect x="6"   y="-9"  width="7" height="7" rx="1.5" fill="#fff"/>
          <rect x="-12" y="0"   width="7" height="7" rx="1.5" fill="#fff"/>
          <rect x="-3"  y="0"   width="7" height="7" rx="1.5" fill="#fff"/>
          <rect x="6"   y="0"   width="7" height="7" rx="1.5" fill="#fff"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="60 360; 660 360" dur="3.5s" begin="0.9s" repeatCount="indefinite"/>
      </g>
      {/* Tablet horizontal */}
      <g>
        <g>
          <rect x="-18" y="-12" width="36" height="24" rx="3" fill="#003FB3"/>
          <rect x="-15" y="-9" width="30" height="18" fill={accent}/>
          <path d="M -8 -3 L -3 2 L 6 -5" fill="none" stroke="#003FB3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M -30 -6 L -22 -6 M -34 0 L -22 0 M -32 6 L -22 6" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.75"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="100 395; 700 395" dur="3.5s" begin="1.7s" repeatCount="indefinite"/>
      </g>
    </>
  )
}

function FastData({ color, accent }) {
  return (
    <>
      {/* Bar chart card */}
      <g>
        <g>
          <rect x="-16" y="-13" width="32" height="26" rx="3" fill={color}/>
          <rect x="-12" y="-2" width="4" height="9" fill="#fff"/>
          <rect x="-5" y="-7"  width="4" height="14" fill="#fff"/>
          <rect x="2" y="-10"  width="4" height="17" fill="#fff"/>
          <rect x="9" y="-4"   width="4" height="11" fill="#fff"/>
          <path d="M -26 -8 L -20 -8 M -30 -2 L -20 -2 M -28 4 L -20 4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="60 320; 660 320" dur="3.5s" repeatCount="indefinite"/>
      </g>
      {/* Pie chart */}
      <g>
        <g>
          <circle r="13" fill="#003FB3"/>
          <path d="M 0 0 L 0 -13 A 13 13 0 0 1 11.3 6.5 Z" fill={accent}/>
          <path d="M -26 -8 L -18 -8 M -30 -2 L -18 -2 M -28 4 L -18 4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="60 360; 660 360" dur="3.5s" begin="0.9s" repeatCount="indefinite"/>
      </g>
      {/* Trend up arrow */}
      <g>
        <g>
          <rect x="-16" y="-13" width="32" height="26" rx="3" fill={color}/>
          <polyline points="-11,7 -5,1 0,4 6,-3 11,-7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M 8 -7 L 11 -7 L 11 -4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          <path d="M -30 0 L -22 0 M -34 -6 L -22 -6 M -34 6 L -22 6" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.75"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="100 395; 700 395" dur="3.5s" begin="1.7s" repeatCount="indefinite"/>
      </g>
    </>
  )
}

function FastWorkplace({ color, accent }) {
  return (
    <>
      {/* Connected chat with check */}
      <g>
        <g>
          <rect x="-19" y="-12" width="38" height="22" rx="11" fill={color}/>
          <path d="M -10 8 L -12 13 L -5 8" fill={color}/>
          <path d="M -8 -1 L -3 4 L 6 -5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M -30 -7 L -22 -7 M -34 -1 L -22 -1 M -30 5 L -22 5" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="60 320; 660 320" dur="3.5s" repeatCount="indefinite"/>
      </g>
      {/* Connected people */}
      <g>
        <g>
          <circle cx="-9" cy="-4" r="5" fill={color}/>
          <circle cx="9"  cy="-4" r="5" fill={color}/>
          <circle cx="0"  cy="7"  r="5" fill={color}/>
          <line x1="-6" y1="-1" x2="-2" y2="4" stroke={accent} strokeWidth="2"/>
          <line x1="6"  y1="-1" x2="2"  y2="4" stroke={accent} strokeWidth="2"/>
          <line x1="-5" y1="-4" x2="5"  y2="-4" stroke={accent} strokeWidth="2"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="60 360; 660 360" dur="3.5s" begin="0.9s" repeatCount="indefinite"/>
      </g>
      {/* Unified workspace grid (Teams-like) */}
      <g>
        <g>
          <rect x="-17" y="-12" width="34" height="24" rx="3" fill="#003FB3"/>
          <rect x="-14" y="-9"  width="9"  height="9" rx="1.5" fill={color}/>
          <rect x="-3"  y="-9"  width="9"  height="9" rx="1.5" fill={accent}/>
          <rect x="-14" y="2"   width="9"  height="7" rx="1.5" fill={accent}/>
          <rect x="-3"  y="2"   width="9"  height="7" rx="1.5" fill={color}/>
          <path d="M -32 -7 L -22 -7 M -34 0 L -22 0 M -32 7 L -22 7" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.75"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="100 395; 700 395" dur="3.5s" begin="1.7s" repeatCount="indefinite"/>
      </g>
    </>
  )
}
