/* ════════════════════════════════════════════════════════════════════════════
   ContactPage — DevinStratus
   Theme: cyan/teal family (matches new home page hero + footer)
   Animation: "Live Pulse" — central beacon transmits data packets to 4 offices
   Mail: EmailJS-ready (currently DEMO MODE — see comment block below)
   Responsive: desktop, tablet, mobile
   ════════════════════════════════════════════════════════════════════════════ */

import { useState, useEffect, useRef } from 'react'
import { C, Ic } from '../components/ui'

/* ─── EmailJS Setup (free 200 emails/month) ─────────────────────────────────
   1. Sign up at https://www.emailjs.com (no credit card)
   2. Add Email Service (Gmail/Outlook) → copy SERVICE_ID
   3. Email Templates → Create → add {{name}}, {{email}}, {{company}},
      {{phone}}, {{interest}}, {{message}} → copy TEMPLATE_ID
   4. Account → API Keys → copy PUBLIC_KEY
   5. Run:  npm install @emailjs/browser
   6. Replace the 3 values below. After saving, restart your dev server.
   ─────────────────────────────────────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = 'service_07t234l'
const EMAILJS_TEMPLATE_ID = 'template_6wrrquf'
const EMAILJS_PUBLIC_KEY  = '0Thqx9s95gzBPBAW-'

// A "real" key is any non-empty string that is NOT the placeholder.
// This is more forgiving than strict-equality with one fixed placeholder string.
const _isReal = v => typeof v === 'string' && v.trim().length > 4 && !v.startsWith('YOUR_')
const EMAILJS_CONFIGURED =
  _isReal(EMAILJS_SERVICE_ID) &&
  _isReal(EMAILJS_TEMPLATE_ID) &&
  _isReal(EMAILJS_PUBLIC_KEY)

// Diagnostic log — open browser DevTools (F12 → Console) to see which keys read
// as "real". Tells you instantly if a key wasn't picked up correctly.
if (typeof window !== 'undefined') {
  // eslint-disable-next-line no-console
  console.log('[ContactPage] EmailJS status:', {
    configured:       EMAILJS_CONFIGURED,
    serviceId_real:   _isReal(EMAILJS_SERVICE_ID),
    templateId_real:  _isReal(EMAILJS_TEMPLATE_ID),
    publicKey_real:   _isReal(EMAILJS_PUBLIC_KEY),
  })
}

/* ─── Cyan accent palette (used in addition to brand C) ───────────────────── */
const CY = {
  cyanDark:  '#0c4a6e',  // deep slate-cyan (footer family)
  cyanMid:   '#155e75',  // mid teal
  cyan:      '#06b6d4',  // brand teal (C.teal)
  cyanLite:  '#67e8f9',  // bright cyan for accents
  cyanGlow:  '#a5f3fc',  // pale cyan glow
  cyanWash:  '#ecfeff',  // wash-out
  bgGrad:    'linear-gradient(180deg, #f5f9ff 0%, #e0f2fe 60%, #cffafe 100%)',
}

const OFFICES = [
  { flag:'🇬🇧', city:'London',     full:'London, UK',      phone:'+44 207 193 2502', email:'london@devinstratus.com',  addr:'30 St Mary Axe, EC3A 8EP',    tz:'GMT / BST',       coords:{ x:115, y:90  } },
  { flag:'🇺🇸', city:'New York',   full:'New York, USA',   phone:'+1 800 938 7929',  email:'usa@devinstratus.com',     addr:'1700 Broadway, NY 10019',     tz:'EST / EDT',       coords:{ x:115, y:330 } },
  { flag:'🇨🇦', city:'Toronto',    full:'Toronto, Canada', phone:'+1 778 381 5388',  email:'canada@devinstratus.com',  addr:'181 Bay St, M5J 2T3',         tz:'EST / EDT',       coords:{ x:485, y:90  } },
  { flag:'🇮🇳', city:'New Delhi',  full:'New Delhi, India',phone:'+91 96503 01529',  email:'india@devinstratus.com',   addr:'Plot 5, Sector 44, Gurugram', tz:'IST (UTC +5:30)', coords:{ x:485, y:330 } },
]

const INTERESTS = [
  { icon:'Users',     label:'CRM & Customer Svc',  color:CY.cyan     },
  { icon:'Zap',       label:'Power Platform / AI', color:CY.cyanMid  },
  { icon:'Wrench',    label:'Implementation',      color:CY.cyanDark },
  { icon:'Rocket',    label:'Upgrade / Migration', color:CY.cyan     },
  { icon:'Headphones',label:'Managed Support',     color:CY.cyanMid  },
  { icon:'Chart',     label:'Analytics & BI',      color:CY.cyanDark },
  { icon:'LifeBuoy',  label:'Health Check',        color:CY.cyan     },
  { icon:'Award',     label:'Training',            color:CY.cyanMid  },
  { icon:'Globe',     label:'General Enquiry',     color:CY.cyanDark },
]

const TIMES = ['09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30']
const DAYS  = ['Mon','Tue','Wed','Thu','Fri']

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const t = setTimeout(() => {
      document.querySelectorAll('.rv').forEach(el => {
        const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('show'); ob.disconnect() } }, { threshold:.1 })
        ob.observe(el)
      })
    }, 60)
    return () => clearTimeout(t)
  })
}

function TypeWriter({ text, speed=40 }) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    setDisplayed('')
    let i = 0
    const id = setInterval(() => {
      setDisplayed(text.slice(0, ++i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return <span>{displayed}<span style={{ borderRight:'2px solid currentColor', marginLeft:1, animation:'blink 1s step-end infinite' }}>‌</span></span>
}

/* ════════════════════════════════════════════════════════════════════════════
   MANUAL → AUTOMATED — the contact-page hero animation.
   Top half: muted-gray manual world (drifting paperwork, slow clock, walking person).
   Center: AI Automation Engine (glowing orb on an energy beam).
   Bottom half: vibrant cyan automated world (zooming tasks, rocket, "10× FASTER").

   Design choices:
   - NO hard rectangles. Top/bottom zones are soft elliptical "atmospheres" that
     fade to transparent so the page background shows through naturally.
   - Energy beam is a thin gradient that fades at both ends — no boxed look.
   - Larger SVG font sizes so labels stay readable on phones.
   - Pure SMIL animations — no JS render loop, no extra weight.
   ════════════════════════════════════════════════════════════════════════════ */
function ManualToAutomated() {
  return (
    <svg viewBox="0 0 700 440" className="m2a-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        {/* Soft top atmosphere — muted gray, fades to transparent */}
        <radialGradient id="m2a-topAtmo" cx="50%" cy="50%" r="55%">
          <stop offset="0%"   stopColor="#94a3b8" stopOpacity="0.20"/>
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0"/>
        </radialGradient>
        {/* Soft bottom atmosphere — cyan, fades to transparent */}
        <radialGradient id="m2a-bottomAtmo" cx="50%" cy="50%" r="55%">
          <stop offset="0%"   stopColor="#06b6d4" stopOpacity="0.26"/>
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
        </radialGradient>
        {/* Energy beam — gradient with fade at both ends */}
        <linearGradient id="m2a-beam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#06b6d4" stopOpacity="0"/>
          <stop offset="18%"  stopColor="#0c4a6e" stopOpacity="0.55"/>
          <stop offset="50%"  stopColor="#06b6d4" stopOpacity="0.85"/>
          <stop offset="82%"  stopColor="#67e8f9" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#67e8f9" stopOpacity="0"/>
        </linearGradient>
        {/* Engine orb gradient (3D liquid look) */}
        <radialGradient id="m2a-engineCore" cx="35%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#a5f3fc" stopOpacity="1"/>
          <stop offset="50%"  stopColor="#06b6d4" stopOpacity="0.65"/>
          <stop offset="100%" stopColor="#0c4a6e" stopOpacity="1"/>
        </radialGradient>
        <filter id="m2a-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── SOFT ATMOSPHERES (no hard edges, blend with page bg) ── */}
      <ellipse cx="350" cy="105" rx="345" ry="100" fill="url(#m2a-topAtmo)"/>
      <ellipse cx="350" cy="335" rx="345" ry="100" fill="url(#m2a-bottomAtmo)"/>

      {/* ════════════════ TOP ZONE — MANUAL / SLOW ════════════════ */}
      <text x="40" y="38" fontSize="14" fontWeight="800" letterSpacing="0.22em" fill="#64748b" fontFamily="'JetBrains Mono', monospace">
        BEFORE  ·  MANUAL  ·  SLOW
      </text>

      {/* "..." SLOW indicator floating top-right */}
      <g>
        <text x="640" y="48" textAnchor="middle" fontSize="11" fontWeight="800" letterSpacing="0.20em" fill="#64748b" fontFamily="'JetBrains Mono', monospace">SLOW</text>
        <text x="640" y="72" textAnchor="middle" fontSize="22" fontWeight="900" fill="#94a3b8">. . .</text>
      </g>

      {/* Drifting manual icons (slow loop, gray) */}
      {/* 1) Stack of papers */}
      <g>
        <g transform="translate(0,0)">
          <rect x="-2" y="-15" width="36" height="24" rx="3" fill="#fff" stroke="#cbd5e1" strokeWidth="1.4"/>
          <rect x="-4" y="-12" width="36" height="24" rx="3" fill="#fff" stroke="#cbd5e1" strokeWidth="1.4"/>
          <rect x="-6" y="-9"  width="36" height="24" rx="3" fill="#fff" stroke="#cbd5e1" strokeWidth="1.4"/>
          <line x1="-2" y1="-3" x2="22" y2="-3" stroke="#94a3b8" strokeWidth="1.2"/>
          <line x1="-2" y1="2"  x2="22" y2="2"  stroke="#94a3b8" strokeWidth="1.2"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="60 100; 540 100" dur="14s" repeatCount="indefinite"/>
      </g>

      {/* 2) Walking person */}
      <g>
        <g>
          <circle cx="0" cy="-12" r="7" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.3"/>
          <rect x="-6" y="-3" width="12" height="16" rx="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.3"/>
          <line x1="-3" y1="13" x2="-5" y2="22" stroke="#64748b" strokeWidth="1.6" strokeLinecap="round"/>
          <line x1="3"  y1="13" x2="5"  y2="22" stroke="#64748b" strokeWidth="1.6" strokeLinecap="round"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="100 135; 580 135" dur="14s" begin="3s" repeatCount="indefinite"/>
      </g>

      {/* 3) Slow clock with rotating hands */}
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

      {/* ════════════════ CENTER — ENERGY BEAM + ENGINE ════════════════ */}
      {/* Energy beam (transparent at ends, no rectangle) */}
      <rect x="0" y="217" width="700" height="6" fill="url(#m2a-beam)"/>

      {/* Speed lines streaking through */}
      <g>
        <line x1="0" y1="217" x2="40" y2="217" stroke="#a5f3fc" strokeWidth="1.5" opacity="0.75">
          <animate attributeName="x1" values="-50;700" dur="2s" begin="0s" repeatCount="indefinite"/>
          <animate attributeName="x2" values="-10;740" dur="2s" begin="0s" repeatCount="indefinite"/>
        </line>
        <line x1="0" y1="222" x2="40" y2="222" stroke="#67e8f9" strokeWidth="1" opacity="0.6">
          <animate attributeName="x1" values="-50;700" dur="2s" begin="0.5s" repeatCount="indefinite"/>
          <animate attributeName="x2" values="-10;740" dur="2s" begin="0.5s" repeatCount="indefinite"/>
        </line>
        <line x1="0" y1="220" x2="40" y2="220" stroke="#a5f3fc" strokeWidth="1.5" opacity="0.75">
          <animate attributeName="x1" values="-50;700" dur="2s" begin="1s" repeatCount="indefinite"/>
          <animate attributeName="x2" values="-10;740" dur="2s" begin="1s" repeatCount="indefinite"/>
        </line>
        <line x1="0" y1="223" x2="40" y2="223" stroke="#67e8f9" strokeWidth="1" opacity="0.6">
          <animate attributeName="x1" values="-50;700" dur="2s" begin="1.5s" repeatCount="indefinite"/>
          <animate attributeName="x2" values="-10;740" dur="2s" begin="1.5s" repeatCount="indefinite"/>
        </line>
      </g>

      {/* Engine label above orb */}
      <text x="350" y="200" textAnchor="middle" fontSize="14" fontWeight="800" letterSpacing="0.22em" fill="#0c4a6e" fontFamily="'JetBrains Mono', monospace">
        ◆  AI  AUTOMATION  ENGINE  ◆
      </text>

      {/* Engine orb — the focal showpiece */}
      <g transform="translate(350, 220)">
        {/* Outer breathing halo */}
        <circle r="46" fill="rgba(6,182,212,0.18)">
          <animate attributeName="r" values="46;52;46" dur="3s" repeatCount="indefinite"/>
        </circle>
        {/* Liquid gradient sphere */}
        <circle r="36" fill="url(#m2a-engineCore)" filter="url(#m2a-glow)"/>
        {/* Inner pulsing core */}
        <circle r="25" fill="#0c4a6e">
          <animate attributeName="r" values="25;28;25" dur="2.2s" repeatCount="indefinite"/>
        </circle>
        {/* Highlight reflection */}
        <ellipse cx="-9" cy="-12" rx="11" ry="6" fill="rgba(255,255,255,0.35)"/>
        {/* Lightning bolt — the transformation symbol */}
        <path d="M 3 -13 L -7 2 L 0 2 L -3 14 L 7 -1 L 0 -1 Z" fill="#a5f3fc"/>
      </g>

      {/* ════════════════ BOTTOM ZONE — AUTOMATED / FAST ════════════════ */}
      <text x="40" y="288" fontSize="14" fontWeight="800" letterSpacing="0.22em" fill="#0c4a6e" fontFamily="'JetBrains Mono', monospace">
        AFTER  ·  AUTOMATED  ·  INSTANT
      </text>

      {/* Auto-flowing tasks (fast, with checkmarks + speed trails) */}
      {/* Task lane 1 */}
      <g>
        <g>
          <rect x="-19" y="-12" width="38" height="24" rx="6" fill="#06b6d4"/>
          <path d="M -8 -1 L -2 5 L 8 -6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Trailing speed marks */}
          <path d="M -28 -8 L -22 -8 M -34 -2 L -24 -2 M -30 4 L -22 4" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="60 320; 660 320" dur="3.5s" repeatCount="indefinite"/>
      </g>
      {/* Task lane 2 */}
      <g>
        <g>
          <rect x="-19" y="-12" width="38" height="24" rx="6" fill="#06b6d4"/>
          <path d="M -8 -1 L -2 5 L 8 -6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M -28 -8 L -22 -8 M -34 -2 L -24 -2 M -30 4 L -22 4" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="60 360; 660 360" dur="3.5s" begin="0.9s" repeatCount="indefinite"/>
      </g>
      {/* Rocket lane */}
      <g>
        <g>
          <path d="M 0 -16 L -7 -2 L -9 7 L -3 7 L -3 13 L 3 13 L 3 7 L 9 7 L 7 -2 Z" fill="#0c4a6e"/>
          <path d="M -7 9 L -11 16 M 7 9 L 11 16 M 0 13 L 0 20" stroke="#67e8f9" strokeWidth="1.6" strokeLinecap="round" opacity="0.85"/>
          <path d="M -28 0 L -14 0 M -34 -7 L -18 -7 M -34 7 L -18 7" stroke="#a5f3fc" strokeWidth="1.5" strokeLinecap="round" opacity="0.75"/>
        </g>
        <animateTransform attributeName="transform" type="translate" values="100 395; 700 395" dur="3.5s" begin="1.7s" repeatCount="indefinite"/>
      </g>

      {/* "10× FASTER" badge — punctuates the difference */}
      <g transform="translate(605, 308)">
        <rect x="-44" y="-15" width="88" height="30" rx="15" fill="#0c4a6e"/>
        <text y="4" textAnchor="middle" fontSize="13" fontWeight="900" fill="#67e8f9" fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="0.04em">10× FASTER</text>
      </g>

      {/* Bottom outcomes row */}
      <g fontFamily="'Plus Jakarta Sans', sans-serif">
        <text x="100" y="425" textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="0.16em" fill="#0c4a6e">ZERO ERRORS</text>
        <text x="265" y="425" textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="0.16em" fill="#0c4a6e">24/7 UPTIME</text>
        <text x="430" y="425" textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="0.16em" fill="#0c4a6e">INSTANT DECISIONS</text>
        <text x="600" y="425" textAnchor="middle" fontSize="12" fontWeight="800" letterSpacing="0.16em" fill="#0c4a6e">INFINITE SCALE</text>
      </g>
    </svg>
  )
}

/* ════════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════════════════════════ */
export default function ContactPage({ navigate, openConsult }) {
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const [step, setStep]               = useState(0)
  const [form, setForm]               = useState({ name:'', email:'', company:'', phone:'', interest:'', day:'', time:'', message:'' })
  const [status, setStatus]           = useState('idle') // idle | sending | sent | error | demo
  const [err, setErr]                 = useState('')
  const [activeOffice, setActiveOffice] = useState(0)
  const [chatOpen, setChatOpen]       = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { from:'bot', text:"Hi! I'm the DevinStratus assistant. What are you looking for today?" },
  ])
  const [chatInput, setChatInput]     = useState('')
  const chatEndRef                    = useRef(null)

  const h = (k, v) => setForm(f => ({ ...f, [k]:v }))

  const sendChat = () => {
    if (!chatInput.trim()) return
    const msg = chatInput.trim()
    setChatMessages(m => [...m, { from:'user', text:msg }])
    setChatInput('')
    setTimeout(() => {
      const lower = msg.toLowerCase()
      let reply = "Happy to help! Our team typically responds within 2 hours during business hours."
      if (lower.includes('price') || lower.includes('cost'))         reply = "Pricing varies by module and company size. We offer free scoping calls — want me to book one?"
      else if (lower.includes('erp') || lower.includes('finance'))   reply = "Dynamics 365 Finance and Business Central are our most-deployed ERP modules. Typical go-live: 8–14 weeks."
      else if (lower.includes('crm') || lower.includes('sales'))     reply = "Dynamics 365 Sales + Customer Insights is our most popular CRM combo. We've delivered 80+ implementations."
      else if (lower.includes('support') || lower.includes('help'))  reply = "Managed support starts at £2,500/month with named consultants and 24/7 monitoring."
      else if (lower.includes('demo'))                                reply = "Happy to arrange a personalised demo — fill in the form on the left and pick your area of interest."
      setChatMessages(m => [...m, { from:'bot', text:reply }])
    }, 900)
  }

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:'smooth' }) }, [chatMessages])

  const STEPS = [
    { label:'Your Interest', icon:'Target' },
    { label:'Your Details',  icon:'User'   },
    { label:'Pick a Slot',   icon:'Clock'  },
    { label:'Confirm',       icon:'Check'  },
  ]

  const canNext = () => {
    if (step === 0) return !!form.interest
    if (step === 1) return !!(form.name && form.email)
    return true
  }

  /* ─── FORM SUBMISSION ──────────────────────────────────────────────────────
     If EmailJS is configured → real send via @emailjs/browser.
     Otherwise → DEMO MODE: status is 'demo' (NOT 'sent'), shows a clear
     "captured but not actually emailed" message. This was the original bug.
     PREREQUISITE: run `npm install @emailjs/browser` once.
     ──────────────────────────────────────────────────────────────────────── */
  const sendForm = async () => {
    setStatus('sending'); setErr('')
    if (EMAILJS_CONFIGURED) {
      try {
        const { default: emailjs } = await import('@emailjs/browser')
        const result = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            name:     form.name,
            email:    form.email,
            company:  form.company || '—',
            phone:    form.phone   || '—',
            interest: form.interest,
            message:  form.message || '(no message)',
            day:      form.day     || 'Flexible',
            time:     form.time    || 'Flexible',
          },
          EMAILJS_PUBLIC_KEY
        )
        // eslint-disable-next-line no-console
        console.log('[ContactPage] EmailJS send OK:', result)
        setStatus('sent')
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('[ContactPage] EmailJS send FAILED:', e)
        setStatus('error')
        const detail = e?.text || e?.message || (typeof e === 'string' ? e : 'Unknown error')
        setErr(`Couldn't send: ${detail}. Please email us directly at hello@devinstratus.com`)
      }
    } else {
      await new Promise(r => setTimeout(r, 1000))
      setStatus('demo')
    }
  }

  return (
    <div className="page-fade" style={{ paddingTop:68, background:CY.bgGrad, minHeight:'100vh' }}>

      <style>{`
        @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes slideUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
        @keyframes pulseGlow { 0%,100%{box-shadow:0 0 0 0 rgba(6,182,212,.55)} 50%{box-shadow:0 0 0 18px rgba(6,182,212,0)} }
        @keyframes drift     { 0%,100%{transform:translate(0,0)} 50%{transform:translate(0,-10px)} }
        .step-content { animation: slideUp .3s ease }
        .chat-msg     { animation: slideUp .25s ease }
        .contact-card { transition: transform .22s, box-shadow .22s, border-color .22s }
        .contact-card:hover { transform: translateY(-3px) }
        .interest-btn { transition: all .2s }
        .interest-btn:hover { transform: translateY(-2px) }
        .slot-btn     { transition: all .15s }
        .slot-btn:hover { transform: scale(1.04) }
        .rv           { opacity:0; transform: translateY(20px); transition: all .55s ease }
        .rv.show      { opacity:1; transform:none }
        .form-input {
          width:100%; padding:11px 14px; font-size:14px; border-radius:10px;
          border:1.5px solid #cbd5e1; background:#fff; color:${C.text};
          transition: border-color .18s, box-shadow .18s;
          font-family: 'Inter', sans-serif;
        }
        .form-input:focus {
          outline:none; border-color:${CY.cyan};
          box-shadow: 0 0 0 3px rgba(6,182,212,.15);
        }
        .live-status-dot {
          width:8px; height:8px; border-radius:50%; background:#10b981;
          display:inline-block; animation: pulseGlow 2s ease-in-out infinite;
        }

        /* ─── RESPONSIVE ─── */
        /* Padding-bottom hack maintains 700:440 aspect ratio (440/700 = 62.857%).
           Works in every browser ever made — much more reliable than aspect-ratio CSS. */
        .m2a-wrap {
          width: 100%; position: relative;
          padding-bottom: 62.857%; height: 0;
          overflow: visible;
        }
        .m2a-wrap .m2a-svg {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%; display: block;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 1023px) {
          .contact-hero-g  { grid-template-columns: 1fr !important; gap: 36px !important; text-align: center !important; }
          .contact-hero-g .hero-trust { justify-content: center !important; }
          .contact-main-g  { grid-template-columns: 1fr !important; gap: 32px !important; }
          .m2a-wrap { max-width: 620px; margin: 0 auto !important; width: 100%; }
        }
        @media (max-width: 767px) {
          .contact-hero-section { padding: 56px 18px 56px !important; }
          .contact-main-section { padding: 56px 18px !important; }
          .contact-h1           { font-size: clamp(28px, 7vw, 38px) !important; }
          .contact-sub          { font-size: 14.5px !important; }
          .contact-form-grid-2  { grid-template-columns: 1fr !important; gap:12px !important; }
          .interest-grid        { grid-template-columns: 1fr !important; }
          .why-us-grid          { grid-template-columns: 1fr !important; }
          .why-us-section       { padding: 48px 18px !important; }
          .step-indicator-label { display: none !important; }
          .office-tabs          { gap:6px !important; }
          .office-tabs button   { padding:7px 11px !important; font-size:12px !important; }
          .m2a-wrap             { max-width: 540px; }
        }
        @media (max-width: 480px) {
          .contact-hero-section { padding: 44px 14px 44px !important; }
          .contact-main-section { padding: 44px 14px !important; }
          .why-us-section       { padding: 40px 14px !important; }
          .contact-form-grid-2  { gap:10px !important; }
          .m2a-wrap             { max-width: 100%; }
        }
      `}</style>

      {/* ════ HERO ════ */}
      <section className="contact-hero-section" style={{ padding:'80px 24px 70px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-120, right:-100, width:480, height:480, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.12), transparent 70%)', filter:'blur(60px)', pointerEvents:'none', animation:'drift 11s ease-in-out infinite' }}/>
        <div style={{ position:'absolute', bottom:-100, left:-80,  width:380, height:380, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)', filter:'blur(60px)', pointerEvents:'none', animation:'drift 9s ease-in-out infinite reverse' }}/>

        <div style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div className="contact-hero-g" style={{ display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:48, alignItems:'center' }}>

            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:9, background:'rgba(6,182,212,.10)', border:`1px solid ${CY.cyan}40`, borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:800, color:CY.cyanDark, marginBottom:24, letterSpacing:'.06em' }}>
                <span className="live-status-dot"/> START THE CONVERSATION
              </div>
              <h1 className="contact-h1" style={{ fontSize:'clamp(32px, 4.6vw, 54px)', fontWeight:900, color:C.text, lineHeight:1.08, marginBottom:20, fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:'-0.02em' }}>
                Tell us what's slowing you{' '}
                <span style={{ background:`linear-gradient(135deg, ${CY.cyan}, ${CY.cyanDark})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  <TypeWriter text="down." speed={120}/>
                </span>
              </h1>
              <p className="contact-sub" style={{ fontSize:16.5, color:C.textM, lineHeight:1.75, marginBottom:32, maxWidth:520 }}>
                From repetitive workflows to system upgrades, share your challenge with a Microsoft-certified solution architect. We'll respond with a real plan — not a sales deck.
              </p>

              <div className="hero-trust" style={{ display:'flex', gap:18, flexWrap:'wrap' }}>
                {[
                  { icon:'Users',       text:'Solution Architect on first call', color:CY.cyanDark },
                  { icon:'CheckCircle', text:'No obligation, no pressure',       color:CY.cyan     },
                  { icon:'Shield',      text:'Confidential by default',          color:CY.cyanMid  },
                ].map(t => (
                  <div key={t.text} style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:C.textM, fontWeight:600 }}>
                    <Ic n={t.icon} s={15} style={{ color:t.color }}/> {t.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="m2a-wrap" style={{ position:'relative', background:'transparent' }}>
              <ManualToAutomated/>
            </div>
          </div>
        </div>
      </section>

      {/* ════ MAIN CONTENT ════ */}
      <section className="contact-main-section" style={{ padding:'80px 24px', background:'transparent', position:'relative' }}>
        <div className="contact-main-g" style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'start' }}>

          {/* LEFT: FORM */}
          <div className="rv">
            {status === 'sent' ? (
              <div className="contact-card" style={{ padding:48, borderRadius:24, background:`linear-gradient(135deg, rgba(16,185,129,.08), #fff)`, border:'2px solid rgba(16,185,129,.35)', textAlign:'center', animation:'slideUp .4s ease' }}>
                <div style={{ width:72, height:72, borderRadius:'50%', background:'#10b981', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', boxShadow:'0 8px 32px rgba(16,185,129,.4)' }}>
                  <Ic n="Check" s={32} style={{ color:'#fff' }}/>
                </div>
                <h2 style={{ fontSize:26, fontWeight:900, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>You're booked in!</h2>
                <p style={{ color:C.textM, fontSize:16, lineHeight:1.7, marginBottom:8 }}>
                  Hi <strong>{form.name}</strong>, thank you. A certified specialist will confirm your{form.day ? ` ${form.day} ${form.time}` : ''} slot within the hour.
                </p>
                <p style={{ color:C.textL, fontSize:13, marginBottom:28 }}>Check your inbox at <strong>{form.email}</strong></p>
                <button onClick={() => { setStatus('idle'); setStep(0); setForm({ name:'',email:'',company:'',phone:'',interest:'',day:'',time:'',message:'' }) }}
                  style={{ padding:'12px 26px', borderRadius:50, background:'#10b981', border:'none', color:'#fff', fontWeight:700, cursor:'pointer', fontSize:14, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                  Submit Another Enquiry
                </button>
              </div>
            ) : status === 'demo' ? (
              <div className="contact-card" style={{ padding:40, borderRadius:24, background:'linear-gradient(135deg, #fffbeb, #fff)', border:'2px solid #fbbf24', textAlign:'left', animation:'slideUp .4s ease' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
                  <div style={{ width:48, height:48, borderRadius:14, background:'#fbbf24', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Ic n="Brief" s={22} style={{ color:'#fff' }}/>
                  </div>
                  <div>
                    <h2 style={{ fontSize:20, fontWeight:900, color:'#78350f', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:2 }}>Form captured (Demo Mode)</h2>
                    <p style={{ fontSize:13, color:'#92400e' }}>Email integration is not yet configured.</p>
                  </div>
                </div>
                <div style={{ background:'#fff', borderRadius:14, padding:'14px 18px', border:'1px solid #fde68a', marginBottom:18 }}>
                  <p style={{ fontSize:13, color:'#78350f', lineHeight:1.7, marginBottom:8 }}>
                    <strong>What happened:</strong> Your form data was captured but no email was actually sent — the EmailJS keys at the top of <code style={{ background:'#fef3c7', padding:'1px 5px', borderRadius:4 }}>ContactPage.js</code> are still placeholders.
                  </p>
                  <p style={{ fontSize:13, color:'#78350f', lineHeight:1.7, marginBottom:0 }}>
                    <strong>To fix:</strong> Add EmailJS credentials (or wire up your own backend), then real submissions will deliver. See the developer guide below.
                  </p>
                </div>
                <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                  <a href={`mailto:hello@devinstratus.com?subject=Enquiry: ${encodeURIComponent(form.interest||'General')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nPhone: ${form.phone}\nInterest: ${form.interest}\n\nMessage: ${form.message}`)}`}
                    style={{ padding:'11px 22px', borderRadius:50, background:`linear-gradient(135deg, ${CY.cyan}, ${CY.cyanDark})`, color:'#fff', textDecoration:'none', fontWeight:700, fontSize:13.5, display:'inline-flex', alignItems:'center', gap:6, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                    <Ic n="Mail" s={14} style={{ color:'#fff' }}/> Email it manually
                  </a>
                  <button onClick={() => { setStatus('idle'); setStep(0); setForm({ name:'',email:'',company:'',phone:'',interest:'',day:'',time:'',message:'' }) }}
                    style={{ padding:'11px 22px', borderRadius:50, background:'#fff', border:`2px solid ${C.border}`, color:C.text, fontWeight:600, cursor:'pointer', fontSize:13.5 }}>
                    Reset Form
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Step indicator */}
                <div style={{ display:'flex', alignItems:'center', marginBottom:32 }}>
                  {STEPS.map((s, i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', flex: i < STEPS.length-1 ? 1 : 0 }}>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
                        <div style={{
                          width:40, height:40, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                          background: i < step ? '#10b981' : i === step ? `linear-gradient(135deg, ${CY.cyan}, ${CY.cyanDark})` : '#fff',
                          border:    `2px solid ${i < step ? '#10b981' : i === step ? 'transparent' : C.border}`,
                          boxShadow: i === step ? `0 4px 18px rgba(6,182,212,.45)` : 'none',
                          transition:'all .3s', cursor: i < step ? 'pointer' : 'default',
                        }}
                          onClick={() => i < step && setStep(i)}>
                          {i < step
                            ? <Ic n="Check" s={16} style={{ color:'#fff' }}/>
                            : <Ic n={s.icon} s={16} style={{ color: i === step ? '#fff' : C.textL }}/>
                          }
                        </div>
                        <span className="step-indicator-label" style={{ fontSize:10, fontWeight:700, color: i === step ? CY.cyanDark : i < step ? '#10b981' : C.textL, whiteSpace:'nowrap' }}>{s.label}</span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div style={{ flex:1, height:2, margin:'0 8px', marginBottom:18, background: i < step ? '#10b981' : C.border, transition:'background .3s' }}/>
                      )}
                    </div>
                  ))}
                </div>

                <div className="contact-card step-content" key={step} style={{ background:'#fff', borderRadius:22, padding:'28px 26px', border:`1.5px solid ${C.border}`, boxShadow:'0 8px 30px rgba(15,23,42,.05)' }}>
                  {step === 0 && (
                    <div>
                      <h2 style={{ fontSize:22, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>What can we help you with?</h2>
                      <p style={{ color:C.textM, fontSize:14, marginBottom:22 }}>Pick the area most relevant to your needs.</p>
                      <div className="interest-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                        {INTERESTS.map(int => (
                          <button key={int.label} className="interest-btn"
                            onClick={() => h('interest', int.label)}
                            style={{
                              display:'flex', alignItems:'center', gap:12, padding:'13px 16px',
                              borderRadius:14, border:`2px solid ${form.interest === int.label ? int.color : C.border}`,
                              background: form.interest === int.label ? `${int.color}10` : '#fff',
                              cursor:'pointer', textAlign:'left',
                              boxShadow: form.interest === int.label ? `0 4px 20px ${int.color}28` : 'none',
                            }}>
                            <div style={{ width:36, height:36, borderRadius:10, background:`${int.color}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                              <Ic n={int.icon} s={16} style={{ color:int.color }}/>
                            </div>
                            <span style={{ fontSize:13, fontWeight: form.interest === int.label ? 700 : 600, color: form.interest === int.label ? int.color : C.text }}>{int.label}</span>
                            {form.interest === int.label && <Ic n="CheckCircle" s={16} style={{ color:int.color, marginLeft:'auto' }}/>}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <h2 style={{ fontSize:22, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>Tell us about yourself</h2>
                      <p style={{ color:C.textM, fontSize:14, marginBottom:22 }}>We'll match you with a specialist for <strong style={{ color:CY.cyanDark }}>{form.interest}</strong>.</p>
                      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                        <div className="contact-form-grid-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                          {[['name','Full Name *','text','Sarah Mitchell'], ['company','Company Name','text','Acme Ltd']].map(([k, l, t, ph]) => (
                            <div key={k}>
                              <label style={{ fontSize:12.5, fontWeight:600, color:C.text, display:'block', marginBottom:5 }}>{l}</label>
                              <input className="form-input" type={t} placeholder={ph} value={form[k]} onChange={e => h(k, e.target.value)}/>
                            </div>
                          ))}
                        </div>
                        <div className="contact-form-grid-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                          {[['email','Work Email *','email','sarah@acmeltd.com'], ['phone','Phone Number','tel','+44 7700 900000']].map(([k, l, t, ph]) => (
                            <div key={k}>
                              <label style={{ fontSize:12.5, fontWeight:600, color:C.text, display:'block', marginBottom:5 }}>{l}</label>
                              <input className="form-input" type={t} placeholder={ph} value={form[k]} onChange={e => h(k, e.target.value)}/>
                            </div>
                          ))}
                        </div>
                        <div>
                          <label style={{ fontSize:12.5, fontWeight:600, color:C.text, display:'block', marginBottom:5 }}>Tell us more (optional)</label>
                          <textarea className="form-input" rows={4} placeholder="Current systems, team size, key challenges, timeline..." value={form.message} onChange={e => h('message', e.target.value)} style={{ resize:'vertical' }}/>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h2 style={{ fontSize:22, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>Pick a consultation slot</h2>
                      <p style={{ color:C.textM, fontSize:14, marginBottom:22 }}>30-minute slots, UK time. Or skip and we'll email you options.</p>
                      <div style={{ marginBottom:20 }}>
                        <div style={{ fontSize:11, fontWeight:700, color:C.textL, letterSpacing:'.12em', marginBottom:12 }}>SELECT DAY (THIS WEEK)</div>
                        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                          {DAYS.map(d => (
                            <button key={d} className="slot-btn"
                              onClick={() => h('day', d)}
                              style={{ flex:'1 1 60px', padding:'12px 6px', borderRadius:12, border:`2px solid ${form.day === d ? CY.cyan : C.border}`, background: form.day === d ? `${CY.cyan}15` : '#fff', cursor:'pointer', fontSize:13, fontWeight:700, color: form.day === d ? CY.cyanDark : C.textM }}>
                              {d}
                            </button>
                          ))}
                        </div>
                      </div>
                      {form.day && (
                        <div style={{ animation:'slideUp .25s ease' }}>
                          <div style={{ fontSize:11, fontWeight:700, color:C.textL, letterSpacing:'.12em', marginBottom:12 }}>AVAILABLE TIMES ({form.day})</div>
                          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(72px, 1fr))', gap:8 }}>
                            {TIMES.map(t => (
                              <button key={t} className="slot-btn"
                                onClick={() => h('time', t)}
                                style={{ padding:'10px', borderRadius:10, border:`2px solid ${form.time === t ? CY.cyan : C.border}`, background: form.time === t ? `${CY.cyan}15` : '#fff', cursor:'pointer', fontSize:13, fontWeight:700, color: form.time === t ? CY.cyanDark : C.textM }}>
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {!form.day && (
                        <div style={{ padding:20, borderRadius:14, background:CY.cyanWash, border:`1.5px dashed ${CY.cyan}`, textAlign:'center' }}>
                          <p style={{ color:CY.cyanDark, fontSize:13, fontWeight:600 }}>Pick a day above to see available times — or skip and we'll email you options.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h2 style={{ fontSize:22, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>Review &amp; confirm</h2>
                      <p style={{ color:C.textM, fontSize:14, marginBottom:22 }}>Looks good? Hit confirm to book your consultation.</p>
                      <div style={{ background:CY.cyanWash, borderRadius:18, padding:22, marginBottom:18, border:`1.5px solid ${CY.cyan}30` }}>
                        {[
                          ['Area of Interest', form.interest, 'Target'],
                          ['Your Name',        form.name,     'User'],
                          ['Work Email',       form.email,    'Mail'],
                          ['Company',          form.company || '—', 'Brief'],
                          ['Phone',            form.phone || '—',   'Phone'],
                          ['Preferred Slot',   form.day && form.time ? `${form.day} at ${form.time} UK time` : 'Flexible / TBC', 'Clock'],
                        ].map(([label, val, icon]) => (
                          <div key={label} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:`1px solid ${CY.cyan}22` }}>
                            <Ic n={icon} s={15} style={{ color:CY.cyanDark, flexShrink:0 }}/>
                            <div style={{ flex:1 }}>
                              <div style={{ fontSize:11, fontWeight:600, color:C.textL, marginBottom:1 }}>{label}</div>
                              <div style={{ fontSize:14, fontWeight:600, color:C.text }}>{val}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {form.message && (
                        <div style={{ padding:'14px 18px', borderRadius:14, background:'#fff', border:`1.5px solid ${C.border}`, marginBottom:14 }}>
                          <div style={{ fontSize:11, fontWeight:700, color:C.textL, marginBottom:6 }}>YOUR MESSAGE</div>
                          <p style={{ fontSize:13.5, color:C.textM, lineHeight:1.6 }}>{form.message}</p>
                        </div>
                      )}
                      {err && <div style={{ padding:'12px 16px', borderRadius:10, background:'#fef2f2', border:'1px solid #fecaca', fontSize:13, color:'#dc2626', marginBottom:12 }}>{err}</div>}
                      <div style={{ padding:'13px 18px', borderRadius:12, background:`${CY.cyan}12`, border:`1px solid ${CY.cyan}30`, fontSize:12.5, color:C.textM }}>
                        🔒 Your information is processed securely and never shared with third parties.
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ display:'flex', gap:10, marginTop:20 }}>
                  {step > 0 && (
                    <button onClick={() => setStep(s => s - 1)}
                      style={{ padding:'12px 24px', borderRadius:12, background:'#fff', border:`2px solid ${C.border}`, color:C.text, fontSize:14, fontWeight:600, cursor:'pointer' }}>
                      ← Back
                    </button>
                  )}
                  <button
                    onClick={() => { if (step < 3) setStep(s => s + 1); else sendForm() }}
                    disabled={!canNext() || status === 'sending'}
                    style={{
                      flex:1, padding:'14px', borderRadius:12,
                      background: canNext() && status !== 'sending' ? `linear-gradient(135deg, ${CY.cyan}, ${CY.cyanDark})` : '#e2e8f0',
                      border:'none', color: canNext() ? '#fff' : C.textL,
                      fontSize:15, fontWeight:700, cursor: canNext() ? 'pointer' : 'not-allowed',
                      fontFamily:"'Plus Jakarta Sans',sans-serif",
                      boxShadow: canNext() ? `0 6px 24px rgba(6,182,212,.4)` : 'none',
                      transition:'all .2s',
                    }}>
                    {status === 'sending' ? '⏳ Sending...' : step === 3 ? '✓ Confirm Booking' : step === 2 ? (form.day && form.time ? 'Confirm Slot →' : 'Skip & Continue →') : 'Continue →'}
                  </button>
                </div>
                {step === 0 && !form.interest && (
                  <p style={{ fontSize:12, color:C.textL, textAlign:'center', marginTop:10 }}>Select an area of interest above to continue</p>
                )}
              </>
            )}
          </div>

          {/* RIGHT: OFFICES + CHAT + URGENT */}
          <div style={{ display:'flex', flexDirection:'column', gap:22 }}>

            <div className="rv">
              <h3 style={{ fontSize:20, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14 }}>Our Offices</h3>
              <div className="office-tabs" style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
                {OFFICES.map((o, i) => (
                  <button key={o.city} onClick={() => setActiveOffice(i)}
                    style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:50,
                      border:`2px solid ${activeOffice === i ? CY.cyan : C.border}`,
                      background: activeOffice === i ? `${CY.cyan}12` : '#fff',
                      cursor:'pointer', fontSize:13, fontWeight:700,
                      color: activeOffice === i ? CY.cyanDark : C.textM,
                      transition:'all .18s' }}>
                    <span style={{ fontSize:14 }}>{o.flag}</span> {o.city}
                  </button>
                ))}
              </div>

              <div className="contact-card" style={{ background:`linear-gradient(135deg, ${CY.cyan}08, #fff)`, border:`2px solid ${CY.cyan}30`, borderRadius:22, padding:'24px 26px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:18 }}>
                  <div style={{ fontSize:36 }}>{OFFICES[activeOffice].flag}</div>
                  <div>
                    <h4 style={{ fontSize:19, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{OFFICES[activeOffice].full}</h4>
                    <span style={{ fontSize:12, fontWeight:600, color:CY.cyanDark, background:`${CY.cyan}18`, padding:'3px 10px', borderRadius:50 }}>{OFFICES[activeOffice].tz}</span>
                  </div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {[
                    { icon:'Pin',   val:OFFICES[activeOffice].addr  },
                    { icon:'Phone', val:OFFICES[activeOffice].phone },
                    { icon:'Mail',  val:OFFICES[activeOffice].email },
                  ].map(row => (
                    <div key={row.val} style={{ display:'flex', gap:10, alignItems:'center' }}>
                      <div style={{ width:34, height:34, borderRadius:9, background:`${CY.cyan}15`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <Ic n={row.icon} s={15} style={{ color:CY.cyanDark }}/>
                      </div>
                      <span style={{ fontSize:13.5, color:C.textM, wordBreak:'break-word' }}>{row.val}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:18 }}>
                  <a href={`tel:${OFFICES[activeOffice].phone.replace(/\s/g, '')}`}
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7, padding:'11px', borderRadius:12, background:`linear-gradient(135deg, ${CY.cyan}, ${CY.cyanDark})`, textDecoration:'none', color:'#fff', fontSize:13, fontWeight:700 }}>
                    <Ic n="Phone" s={14} style={{ color:'#fff' }}/> Call Now
                  </a>
                  <a href={`mailto:${OFFICES[activeOffice].email}`}
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7, padding:'11px', borderRadius:12, background:'#fff', border:`2px solid ${CY.cyan}40`, textDecoration:'none', color:CY.cyanDark, fontSize:13, fontWeight:700 }}>
                    <Ic n="Mail" s={14} style={{ color:CY.cyanDark }}/> Email Us
                  </a>
                </div>
              </div>
            </div>

            <div className="rv">
              <div style={{ border:`1.5px solid ${C.border}`, borderRadius:22, overflow:'hidden', boxShadow:'0 8px 32px rgba(0,0,0,.06)', background:'#fff' }}>
                <button
                  onClick={() => setChatOpen(o => !o)}
                  style={{ width:'100%', display:'flex', alignItems:'center', gap:12, padding:'16px 20px', background:`linear-gradient(135deg, ${CY.cyan}, ${CY.cyanDark})`, border:'none', cursor:'pointer', textAlign:'left' }}>
                  <div style={{ position:'relative' }}>
                    <div style={{ width:38, height:38, borderRadius:'50%', background:'rgba(255,255,255,.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <Ic n="Megaphone" s={18} style={{ color:'#fff' }}/>
                    </div>
                    <div style={{ position:'absolute', bottom:0, right:0, width:11, height:11, borderRadius:'50%', background:'#10b981', border:'2px solid white' }}/>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:'#fff' }}>DevinStratus Assistant</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,.75)' }}>Online · Ask anything</div>
                  </div>
                  <Ic n="ChevD" s={18} style={{ color:'rgba(255,255,255,.7)', transition:'transform .2s', transform: chatOpen ? 'rotate(180deg)' : 'none' }}/>
                </button>

                {chatOpen && (
                  <div style={{ animation:'slideUp .25s ease' }}>
                    <div style={{ height:220, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:10, background:CY.cyanWash }}>
                      {chatMessages.map((m, i) => (
                        <div key={i} className="chat-msg" style={{ display:'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                          <div style={{
                            maxWidth:'82%', padding:'10px 14px',
                            borderRadius: m.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                            background: m.from === 'user' ? `linear-gradient(135deg, ${CY.cyan}, ${CY.cyanDark})` : '#fff',
                            color: m.from === 'user' ? '#fff' : C.text,
                            fontSize:13.5, lineHeight:1.5,
                            boxShadow: m.from === 'bot' ? '0 2px 8px rgba(0,0,0,.06)' : 'none',
                          }}>
                            {m.text}
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef}/>
                    </div>
                    <div style={{ display:'flex', gap:0, padding:12, background:'#fff', borderTop:`1px solid ${C.border}` }}>
                      <input
                        value={chatInput} onChange={e => setChatInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && sendChat()}
                        placeholder="Type a message..."
                        style={{ flex:1, padding:'10px 14px', border:`1.5px solid ${C.border}`, borderRight:'none', borderRadius:'12px 0 0 12px', fontSize:13.5, outline:'none', fontFamily:'Inter, sans-serif', color:C.text, background:'#fff' }}
                      />
                      <button onClick={sendChat}
                        style={{ padding:'10px 18px', background:`linear-gradient(135deg, ${CY.cyan}, ${CY.cyanDark})`, border:'none', borderRadius:'0 12px 12px 0', cursor:'pointer', display:'flex', alignItems:'center' }}>
                        <Ic n="Arrow" s={16} style={{ color:'#fff' }}/>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="rv contact-card" style={{ background:`linear-gradient(135deg, ${CY.cyanDark} 0%, ${CY.cyanMid} 60%, ${CY.cyan} 100%)`, borderRadius:20, padding:'24px 26px', color:'#fff', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:-30, right:-30, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,.10)', pointerEvents:'none' }}/>
              <div style={{ position:'absolute', bottom:-20, left:60, width:80, height:80, borderRadius:'50%', background:'rgba(103,232,249,.18)', pointerEvents:'none' }}/>
              <div style={{ position:'relative', zIndex:1 }}>
                <Ic n="Rocket" s={24} style={{ color:'rgba(255,255,255,.7)', marginBottom:10 }}/>
                <h3 style={{ fontSize:18, fontWeight:800, marginBottom:8, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Need urgent help?</h3>
                <p style={{ fontSize:13.5, opacity:.9, marginBottom:16, lineHeight:1.6 }}>For critical system issues, our emergency support line is staffed 24/7 by certified Dynamics 365 consultants.</p>
                <a href="tel:+442071932502"
                  style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'11px 20px', borderRadius:50, background:'rgba(255,255,255,.18)', border:'1.5px solid rgba(255,255,255,.3)', color:'#fff', textDecoration:'none', fontSize:13.5, fontWeight:700, backdropFilter:'blur(8px)' }}>
                  <Ic n="Phone" s={15} style={{ color:'#fff' }}/> +44 207 193 2502
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════ WHY US ════ */}
      <section className="why-us-section" style={{ padding:'72px 24px', background:'rgba(255,255,255,0.4)', borderTop:`1px solid ${CY.cyan}25`, borderBottom:`1px solid ${CY.cyan}25`, backdropFilter:'blur(8px)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:44 }}>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.2em', color:CY.cyanDark, marginBottom:14, textTransform:'uppercase' }}>WHY DEVINSTRATUS</div>
            <h2 style={{ fontSize:'clamp(26px, 3.4vw, 36px)', fontWeight:900, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
              Trusted by <span style={{ background:`linear-gradient(135deg, ${CY.cyan}, ${CY.cyanDark})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>3,200+ professionals</span>
            </h2>
          </div>
          <div className="why-us-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:18 }}>
            {[
              { icon:'Clock',       title:'Same-Day Response',      desc:'Every enquiry answered within business hours — no queues, no bots.' },
              { icon:'Users',       title:'Named Consultant',       desc:'A dedicated specialist who knows your stack and your goals.' },
              { icon:'Award',       title:'Gold Partner Certified', desc:'Microsoft Inner Circle — top 1% of partners globally.' },
              { icon:'Shield',      title:'No Lock-In Contracts',   desc:'Month-to-month support. Stay because we deliver, not because you\'re trapped.' },
              { icon:'Globe',       title:'4 Global Offices',       desc:'Local expertise across UK, USA, Canada and India.' },
              { icon:'CheckCircle', title:'94% Client Retention',   desc:'Our retention rate speaks for itself. We keep clients for years.' },
            ].map((card, i) => (
              <div key={card.title} className="rv contact-card" style={{ background:'#fff', borderRadius:18, padding:'22px 20px', border:`1.5px solid ${C.border}`, animation:`fadeUp .4s ease both ${i * 60}ms` }}>
                <div style={{ width:44, height:44, borderRadius:13, background:`${CY.cyan}15`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14, border:`1px solid ${CY.cyan}30` }}>
                  <Ic n={card.icon} s={20} style={{ color:CY.cyanDark }}/>
                </div>
                <h4 style={{ fontSize:15, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>{card.title}</h4>
                <p style={{ fontSize:13, color:C.textM, lineHeight:1.65 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ DEV GUIDE (auto-hides once email is wired up) ════ */}
      {!EMAILJS_CONFIGURED && (
        <section style={{ padding:'40px 24px', background:'transparent' }}>
          <div style={{ maxWidth:900, margin:'0 auto' }}>
            <div style={{ background:'#fffbeb', border:'1.5px solid #fbbf24', borderRadius:16, padding:'18px 24px' }}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:'#fbbf24', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Ic n="Brief" s={18} style={{ color:'#fff' }}/>
                </div>
                <div style={{ flex:1 }}>
                  <h3 style={{ fontSize:15, fontWeight:800, color:'#78350f', marginBottom:6 }}>Developer note: Activate real email delivery</h3>
                  <p style={{ fontSize:13, color:'#92400e', lineHeight:1.65, margin:0 }}>
                    The form is currently in <strong>Demo Mode</strong> — submissions are captured but no email is sent. To activate:
                    (1) Sign up free at <strong>emailjs.com</strong> · (2) Add a service → copy SERVICE_ID · (3) Create a template with <code style={{ background:'#fef3c7', padding:'1px 5px', borderRadius:4 }}>{'{{name}}'} {'{{email}}'} {'{{company}}'} {'{{phone}}'} {'{{interest}}'} {'{{message}}'}</code> → copy TEMPLATE_ID · (4) Account → API Keys → copy PUBLIC_KEY · (5) Run <code style={{ background:'#fef3c7', padding:'1px 5px', borderRadius:4 }}>npm install @emailjs/browser</code>, replace the 3 constants at the top of <code>ContactPage.js</code>, and uncomment the real send block. This banner disappears automatically once configured.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}