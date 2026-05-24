import React, { useState, useEffect, useRef } from 'react'
import Lottie from 'lottie-react'

// Lottie JSON assets (place the 4 files in src/assets/lottie/)
import workingData   from '../assets/lottie/working.json'
import deltaData     from '../assets/lottie/delta.json'
import interviewData from '../assets/lottie/interview.json'
import teamData      from '../assets/lottie/team.json'

const STEP_MS = 4500

/* The 5-scene hiring-journey animation for the Careers hero right column.
   Transparent background — designed to sit on the hero's own gradient. */
export default function CareersHeroAnimation() {
  const [cur, setCur] = useState(0)
  const [prev, setPrev] = useState(-1)
  const [flash, setFlash] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCur(c => {
        setPrev(c)
        setFlash(f => f + 1)
        return (c + 1) % 5
      })
    }, STEP_MS)
    return () => clearInterval(id)
  }, [])

  const sceneCls = (i) =>
    'cha-scene' + (i === cur ? ' active' : (i === prev ? ' leaving' : ''))

  return (
    <div className="cha-root">
      <style>{CSS}</style>

      {/* ambient orbs */}
      <div className="cha-orb tr" />
      <div className="cha-orb bl" />
      <div className="cha-orb mid" />

      <div className="cha-stage">
        {/* Step 1 — Apply */}
        <div className={sceneCls(0)}>
          <div className="cha-lottie"><Lottie animationData={workingData} loop autoplay /></div>
          <div className="cha-tag"><span className="cha-dot" />Apply to Devin Stratus</div>
        </div>

        {/* Step 2 — Reviewing */}
        <div className={sceneCls(1)}>
          <div className="cha-lottie"><Lottie animationData={deltaData} loop autoplay /></div>
          <div className="cha-tag"><span className="cha-dot" />Reviewing your application</div>
        </div>

        {/* Step 3 — Interview */}
        <div className={sceneCls(2)}>
          <div className="cha-lottie"><Lottie animationData={interviewData} loop autoplay /></div>
          <div className="cha-tag"><span className="cha-dot" />Meet the team — interview</div>
        </div>

        {/* Step 4 — Offer letter (custom SVG) */}
        <div className={sceneCls(3)}>
          <OfferLetterSVG />
          <div className="cha-tag amber"><span className="cha-dot" />Your offer is ready</div>
        </div>

        {/* Step 5 — Welcome */}
        <div className={sceneCls(4)}>
          <div className="cha-lottie"><Lottie animationData={teamData} loop autoplay /></div>
          <div className="cha-tag green"><span className="cha-dot" />Welcome to the team</div>
        </div>
      </div>

      <div className={'cha-flash' + (flash ? ' fire' : '')} key={flash} />
    </div>
  )
}

function OfferLetterSVG() {
  return (
    <svg className="cha-offer" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chaHdr" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#0066FF" /><stop offset="1" stopColor="#06b6d4" /></linearGradient>
        <radialGradient id="chaSeal" cx="40%" cy="35%" r="70%"><stop offset="0" stopColor="#22c55e" /><stop offset="1" stopColor="#16a34a" /></radialGradient>
      </defs>
      {/* sparkles */}
      <g fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="20" fontWeight="900">
        <text x="46" y="70" fill="#0066FF" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="2.2s" repeatCount="indefinite" />✦</text>
        <text x="300" y="96" fill="#16a34a" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="2.8s" begin="0.6s" repeatCount="indefinite" />✦</text>
        <text x="312" y="250" fill="#06b6d4" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="2.5s" begin="1.1s" repeatCount="indefinite" />✦</text>
      </g>
      {/* letter */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 40; 0 0" dur="0.9s" fill="freeze" />
        <rect x="78" y="84" width="204" height="186" rx="10" fill="#ffffff" style={{ filter: 'drop-shadow(0 10px 22px rgba(0,53,128,0.2))' }} />
        <rect x="78" y="84" width="204" height="40" rx="10" fill="url(#chaHdr)" />
        <rect x="78" y="110" width="204" height="14" fill="url(#chaHdr)" />
        <text x="98" y="152" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="15" fontWeight="900" fill="#0a0a14" letterSpacing="1">OFFER LETTER</text>
        <text x="98" y="170" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="10" fontWeight="700" fill="#16a34a" letterSpacing="1.5">CONGRATULATIONS</text>
        <rect x="98" y="180" width="164" height="30" rx="6" fill="rgba(0,102,255,0.08)" />
        <text x="106" y="194" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="9" fontWeight="800" fill="#0066FF">Your Role · Confirmed</text>
        <text x="106" y="205" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="8" fontWeight="600" fill="#475569">Full-time · Devin Stratus</text>
        <rect x="98" y="216" width="164" height="30" rx="6" fill="rgba(22,163,74,0.10)" />
        <text x="106" y="230" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="9" fontWeight="800" fill="#16a34a">Start Date · Confirmed</text>
        <text x="106" y="241" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="8" fontWeight="600" fill="#475569">Benefits · Growth · Certifications</text>
        <path d="M98 258 q8 -7 16 0 t16 0 t16 0" stroke="#0066FF" strokeWidth="2" fill="none" strokeLinecap="round" />
        <g transform="translate(250,250)">
          <circle r="22" fill="url(#chaSeal)"><animate attributeName="r" values="20;23;20" dur="1.8s" repeatCount="indefinite" /></circle>
          <path d="M-9 0 l6 6 12 -13" stroke="#fff" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      {/* envelope */}
      <g>
        <rect x="64" y="220" width="232" height="110" rx="14" fill="#bfdbfe" />
        <path d="M64 234 L180 300 L296 234" fill="#93c5fd" />
        <path d="M64 330 L150 268 L64 230 Z" fill="#dbeafe" />
        <path d="M296 330 L210 268 L296 230 Z" fill="#bfdbfe" />
        <g>
          <animateTransform attributeName="transform" type="rotate" values="0 180 234; -28 180 234; 0 180 234" dur="3.5s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" />
          <path d="M64 234 L180 158 L296 234 Z" fill="#60a5fa" />
        </g>
      </g>
    </svg>
  )
}

const CSS = `
.cha-root{ position:absolute; inset:0; overflow:hidden; font-family:'Plus Jakarta Sans',sans-serif; }
.cha-orb{ position:absolute; border-radius:50%; pointer-events:none; z-index:1; }
.cha-orb.tr{ top:-50px; right:-30px; width:340px; height:340px; filter:blur(50px); background:radial-gradient(circle,rgba(6,182,212,0.28),transparent 70%); animation:chaFloat 9s ease-in-out infinite; }
.cha-orb.bl{ bottom:-30px; left:-20px; width:280px; height:280px; filter:blur(50px); background:radial-gradient(circle,rgba(0,102,255,0.16),transparent 70%); animation:chaFloatR 11s ease-in-out infinite; }
.cha-orb.mid{ top:42%; left:46%; width:200px; height:200px; filter:blur(40px); background:radial-gradient(circle,rgba(34,197,94,0.13),transparent 70%); animation:chaFloat 13s ease-in-out infinite; }
@keyframes chaFloat{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-22px)} }
@keyframes chaFloatR{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(20px)} }

.cha-stage{ position:absolute; inset:0; z-index:3; }
.cha-scene{ position:absolute; inset:0; display:flex; align-items:center; justify-content:center; padding-bottom:20px;
  opacity:0; transform:translateX(40px); transition:opacity .7s ease, transform .7s ease; pointer-events:none; }
.cha-scene.active{ opacity:1; transform:translateX(0); }
.cha-scene.leaving{ opacity:0; transform:translateX(-40px); }
.cha-lottie{ width:100%; max-width:520px; transform:scale(1.1); filter:drop-shadow(0 12px 40px rgba(0,102,255,0.12)); }
.cha-offer{ width:92%; max-width:430px; filter:drop-shadow(0 12px 40px rgba(0,102,255,0.12)); }

.cha-tag{ position:absolute; bottom:24px; left:50%; transform:translateX(-50%); display:inline-flex; align-items:center; gap:9px;
  background:linear-gradient(135deg,#003580,#0066FF); border:1px solid rgba(255,255,255,0.22); border-radius:50px;
  padding:11px 22px; font-size:13.5px; font-weight:800; color:#fff; letter-spacing:.02em;
  box-shadow:0 8px 24px rgba(0,53,128,0.32), inset 0 1px 0 rgba(255,255,255,0.18); z-index:7; white-space:nowrap; }
.cha-dot{ width:8px; height:8px; border-radius:50%; background:#67e8f9; box-shadow:0 0 10px #67e8f9; animation:chaBlink 1.6s ease-in-out infinite; }
@keyframes chaBlink{ 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.7)} }
.cha-tag.amber .cha-dot{ background:#fbbf24; box-shadow:0 0 10px #fbbf24; }
.cha-tag.green .cha-dot{ background:#4ade80; box-shadow:0 0 10px #4ade80; }

.cha-flash{ position:absolute; inset:0; background:#fff; opacity:0; z-index:9; pointer-events:none; }
.cha-flash.fire{ animation:chaFlash .55s ease-out; }
@keyframes chaFlash{ 0%{opacity:0} 30%{opacity:.06} 100%{opacity:0} }

@media (max-width:1023px){
  .cha-lottie{ max-width:440px; transform:scale(1.04); }
  .cha-offer{ max-width:360px; }
}
@media (max-width:767px){
  .cha-lottie{ max-width:340px; transform:scale(1); }
  .cha-offer{ max-width:280px; }
  .cha-tag{ bottom:14px; font-size:12px; padding:9px 16px; }
  .cha-orb.tr{ width:220px; height:220px; } .cha-orb.bl{ width:180px; height:180px; }
}
@media (max-width:480px){
  .cha-lottie{ max-width:260px; }
  .cha-offer{ max-width:230px; }
  .cha-tag{ font-size:11px; padding:8px 14px; }
}
`
