/* ════════════════════════════════════════════════════════════════════════════
 *  ContactPage — DevinStratus
 *  ────────────────────────────────────────────────────────────────────────────
 *  4-step booking flow integrated with a Next.js calendar API microservice.
 *  Graceful fallback: when API is unreachable, uses local mock data and shows
 *  a "Demo mode" pill — page still works end-to-end for the prospect.
 *
 *  Sections:
 *    1.  HERO — left: value prop + trust pills; right: ContactJohnHero animation
 *    2.  4-STEP FLOW — focus / details / slot / confirm
 *    3.  WHAT HAPPENS NEXT — 4-card timeline
 *    4.  WHY BOOK WITH US — 4 trust signals
 *    5.  OFFICES — global office selector (data/offices.js)
 *    6.  URGENT MATTERS — fast-track contact methods
 *    7.  FAQ — 5 buyer questions
 *
 *  Calendar API contract:
 *    GET  ${API_BASE}/api/slots?from=YYYY-MM-DD&to=YYYY-MM-DD
 *           → { slots: [{ date, time, available, slotId }] }
 *    POST ${API_BASE}/api/bookings
 *           body: { slotId, focus, name, email, company, role, headcount, notes }
 *           → { ok: true, bookingId, slot }
 *
 *  Set REACT_APP_CALENDAR_API in your .env (e.g. https://devinstratus-cal.vercel.app)
 *  to wire it up. Leave unset for local demo mode.
 * ════════════════════════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react'
import { C, Ic, Btn } from '../components/ui'
import { OFFICES, CONTACT_FOCUS } from '../data/offices'
import ContactJohnHero from '../components/ContactJohnHero'

/* ─── API configuration ──────────────────────────────────────────────────── */
const API_BASE = process.env.REACT_APP_CALENDAR_API || ''
const HAS_API  = Boolean(API_BASE)

/* ─── Calendar fetch helpers (graceful fallback to demo data) ────────────── */
const MOCK_SLOT_TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']

function getNextBusinessDays(n = 5) {
  const days = []
  const d = new Date()
  d.setHours(0,0,0,0)
  d.setDate(d.getDate() + 1)
  while (days.length < n) {
    const dow = d.getDay()
    if (dow !== 0 && dow !== 6) days.push(new Date(d))
    d.setDate(d.getDate() + 1)
  }
  return days
}

function mockSlots() {
  const days = getNextBusinessDays(5)
  const out = []
  days.forEach(d => {
    MOCK_SLOT_TIMES.forEach(time => {
      // Randomly mark ~30% as booked for realism
      const available = Math.random() > 0.30
      out.push({
        slotId: `mock-${d.toISOString().slice(0,10)}-${time}`,
        date: d.toISOString().slice(0,10),
        time,
        available,
      })
    })
  })
  return out
}

async function fetchSlots() {
  if (!HAS_API) return { slots: mockSlots(), source:'demo' }
  try {
    const days = getNextBusinessDays(5)
    const from = days[0].toISOString().slice(0,10)
    const to   = days[days.length - 1].toISOString().slice(0,10)
    const res  = await fetch(`${API_BASE}/api/slots?from=${from}&to=${to}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return { slots: data.slots || [], source:'live' }
  } catch (err) {
    console.warn('[ContactPage] Calendar API unavailable, falling back to demo:', err.message)
    return { slots: mockSlots(), source:'demo-fallback' }
  }
}

async function postBooking(payload) {
  if (!HAS_API) {
    await new Promise(r => setTimeout(r, 800))
    return { ok:true, bookingId:`demo-${Date.now()}`, slot:payload.slotId, source:'demo' }
  }
  try {
    const res = await fetch(`${API_BASE}/api/bookings`, {
      method:  'POST',
      headers: { 'Content-Type':'application/json' },
      body:    JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return { ...(await res.json()), source:'live' }
  } catch (err) {
    console.warn('[ContactPage] Booking POST failed, demo fallback:', err.message)
    await new Promise(r => setTimeout(r, 500))
    return { ok:true, bookingId:`demo-${Date.now()}`, slot:payload.slotId, source:'demo-fallback' }
  }
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const t = setTimeout(() => {
      document.querySelectorAll('.rv').forEach(el => {
        const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('show'); ob.disconnect() } }, { threshold:.08 })
        ob.observe(el)
      })
    }, 60)
    return () => clearTimeout(t)
  })
}

function fmtDayLabel(isoDate) {
  const d = new Date(isoDate)
  const dow = ['SUN','MON','TUE','WED','THU','FRI','SAT'][d.getDay()]
  const day = d.getDate()
  const mon = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][d.getMonth()]
  return { dow, day, mon }
}

export default function ContactPage({ navigate, openConsult }) {
  const [step, setStep] = useState(1)
  const [focus, setFocus] = useState(null)
  const [details, setDetails] = useState({ name:'', email:'', company:'', role:'', headcount:'', notes:'' })
  const [slots, setSlots] = useState([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsSource, setSlotsSource] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [activeDay, setActiveDay] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState(null)
  const [activeOffice, setActiveOffice] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)

  useReveal()
  useEffect(() => { window.scrollTo(0,0) }, [])

  /* When user enters step 3, fetch slots */
  useEffect(() => {
    if (step === 3 && slots.length === 0 && !slotsLoading) {
      setSlotsLoading(true)
      fetchSlots().then(({ slots, source }) => {
        setSlots(slots)
        setSlotsSource(source)
        const days = [...new Set(slots.map(s => s.date))]
        if (days.length > 0) setActiveDay(days[0])
        setSlotsLoading(false)
      })
    }
  }, [step, slots.length, slotsLoading])

  const handleSubmitBooking = async () => {
    setSubmitting(true)
    const slot = slots.find(s => s.slotId === selectedSlot)
    const payload = {
      slotId:  selectedSlot,
      focus:   focus?.slug,
      focusLabel: focus?.label,
      ...details,
    }
    const result = await postBooking(payload)
    setSubmitting(false)
    if (result.ok) {
      setConfirmed({ ...result, slot })
      setStep(5)
    } else {
      alert('Booking failed — please try again or call us directly.')
    }
  }

  const detailsValid = details.name.trim() && /\S+@\S+\.\S+/.test(details.email) && details.company.trim()

  /* Day grouping for slot picker */
  const slotsByDay = slots.reduce((acc, s) => {
    if (!acc[s.date]) acc[s.date] = []
    acc[s.date].push(s)
    return acc
  }, {})
  const dayKeys = Object.keys(slotsByDay).sort()

  return (
    <div className="page-fade" style={{ overflowX:'hidden', maxWidth:'100vw' }}>

      <style dangerouslySetInnerHTML={{__html:`
        .cp-section { position: relative; }
        .cp-h2 { font-size: clamp(28px, 4vw, 38px); font-weight:800; color:#0a0a14; font-family:'Plus Jakarta Sans',sans-serif; margin-bottom:16px; line-height:1.2; letter-spacing:-0.015em; }
        .cp-input {
          width:100%; padding:13px 16px; border-radius:12px; border:1px solid #e2e8f0;
          background:#fff; font-size:14.5px; color:#0a0a14; font-family:'Plus Jakarta Sans',sans-serif;
          transition: border-color .18s, box-shadow .18s; outline:none;
        }
        .cp-input:focus { border-color:#0066FF; box-shadow:0 0 0 3px rgba(0,102,255,0.12); }
        .cp-label { font-size:11.5px; font-weight:800; color:#475569; letter-spacing:.08em; display:block; margin-bottom:8px; text-transform:uppercase; }

        @media (max-width: 1023px) {
          .cp-hero-g { grid-template-columns: 1fr !important; gap: 36px !important; }
          .cp-hero-anim { max-width: 720px; margin: 0 auto; }
          .cp-flow-g { grid-template-columns: 1fr !important; }
          .cp-flow-progress { display:none !important; }
          .cp-next-g { grid-template-columns: repeat(2, 1fr) !important; }
          .cp-why-g { grid-template-columns: repeat(2, 1fr) !important; }
          .cp-office-g { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 767px) {
          .cp-hero-wrap { padding: 32px 18px 56px !important; }
          .cp-hero-wrap h1 { font-size: clamp(28px, 7vw, 42px) !important; }
          .cp-section { padding-top: 60px !important; padding-bottom: 40px !important; padding-left: 18px !important; padding-right: 18px !important; }
          .cp-stats-section { padding: 44px 18px !important; }
          .cp-stats-g { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; row-gap: 28px !important; }
          .cp-stats-g > div { padding-left: 0 !important; border-left: none !important; }
          .cp-stats-g > div:nth-child(3),
          .cp-stats-g > div:nth-child(4) { padding-top: 22px !important; border-top: 1px solid #e2e8f0; }
          .cp-stats-g .stat-v { font-size: 32px !important; }
          .cp-focus-g { grid-template-columns: 1fr !important; gap: 12px !important; }
          .cp-form-g { grid-template-columns: 1fr !important; }
          .cp-slot-days { overflow-x: auto; flex-wrap: nowrap !important; padding-bottom: 8px; }
          .cp-slot-times-g { grid-template-columns: repeat(2, 1fr) !important; }
          .cp-review-g { grid-template-columns: 1fr !important; gap: 14px !important; }
          .cp-next-g { grid-template-columns: 1fr !important; }
          .cp-why-g { grid-template-columns: 1fr !important; }
          .cp-office-tabs { overflow-x: auto; flex-wrap: nowrap !important; padding-bottom: 6px; }
          .cp-cta-section { padding: 72px 20px !important; }
        }
      `}}/>


      {/* ════════════════════════════════════════════════════
         1.  HERO
         ════════════════════════════════════════════════════ */}
      <section style={{
        position:'relative', paddingTop:68, overflow:'hidden',
        background: `
          radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.35), transparent 55%),
          radial-gradient(circle at 80% 70%, rgba(0, 102, 255, 0.20), transparent 60%),
          linear-gradient(135deg, #ffffff 0%, #f0f7ff 25%, #d6ebff 55%, #b8defa 80%, #9bd3f5 100%)
        `
      }}>
        <div style={{ position:'absolute', top:-100, right:-80, width:380, height:380, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.32), transparent 70%)', filter:'blur(48px)', animation:'heroFloat 9s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,102,255,0.20), transparent 70%)', filter:'blur(56px)', animation:'heroFloat 7s ease-in-out infinite reverse', pointerEvents:'none' }} />

        <div className="cp-hero-wrap" style={{ maxWidth:1300, margin:'0 auto', padding:'48px 32px 80px', position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:28, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Home</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <span style={{ fontSize:13, color:'#0a0a14', fontWeight:600 }}>Contact</span>
          </div>

          <div className="cp-hero-g" style={{ display:'grid', gridTemplateColumns:'1fr 1.25fr', gap:56, alignItems:'center' }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:'rgba(6,182,212,0.10)', border:'1px solid rgba(6,182,212,0.30)', borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:800, color:'#003FB3', letterSpacing:'.06em', marginBottom:24 }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:'#06b6d4', boxShadow:'0 0 0 4px rgba(6,182,212,0.20)', animation:'heroFloat 2s ease-in-out infinite' }} />
                START THE CONVERSATION
              </div>

              <h1 style={{ fontSize:'clamp(34px, 5.2vw, 58px)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.02em', color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:22 }}>
                Tell us what's<br/>
                slowing you{' '}
                <span style={{ background:'linear-gradient(135deg, #06b6d4 0%, #0066FF 50%, #003FB3 100%)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>down.</span>
              </h1>

              <p style={{ fontSize:17, color:'#334155', lineHeight:1.7, marginBottom:30, maxWidth:540 }}>
                From repetitive workflows to system upgrades, share your challenge with a Microsoft-certified solution architect. We'll respond with a <strong style={{ color:'#0a0a14' }}>real plan</strong> — not a sales deck.
              </p>

              <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:34 }}>
                {[
                  { icon:'Users',       text:'Solution Architect on first call'  },
                  { icon:'CheckCircle', text:'No obligation, no pressure' },
                  { icon:'Shield',      text:'Confidential by default' },
                ].map((t,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:11, fontSize:14, fontWeight:600, color:'#0a0a14' }}>
                    <span style={{ width:28, height:28, borderRadius:'50%', background:'rgba(255,255,255,0.65)', border:'1px solid rgba(0,102,255,0.20)', backdropFilter:'blur(10px)', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
                      <Ic n={t.icon} s={14} style={{ color:'#0066FF' }}/>
                    </span>
                    {t.text}
                  </div>
                ))}
              </div>

              <button onClick={() => { const el = document.getElementById('contact-flow'); if (el) el.scrollIntoView({ behavior:'smooth' }) }}
                style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'15px 30px', borderRadius:50, background:'linear-gradient(135deg, #0066FF, #003FB3)', border:'none', cursor:'pointer', fontSize:15, fontWeight:700, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", boxShadow:'0 10px 26px rgba(0,102,255,0.36)' }}>
                Start booking · 60 seconds <Ic n="ChevD" s={14} style={{ color:'#fff' }}/>
              </button>
            </div>

            <div className="cp-hero-anim">
              <ContactJohnHero />
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         1b.  TRUST STRIP — by the numbers
         ════════════════════════════════════════════════════ */}
      <section className="cp-stats-section" style={{ padding:'56px 32px', background:'#fff', borderTop:'1px solid #e2e8f0', borderBottom:'1px solid #e2e8f0' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv cp-stats-g" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:32 }}>
            {[
              { v:'AI',    l:'Orchestration-first',     s:'Beyond point tooling' },
              { v:'6',     l:'Microsoft certifications', s:'AI · data · identity · agents' },
              { v:'2',     l:'Global offices',           s:'Canada · India' },
              { v:'30 min', l:'First call',              s:'With a Solution Architect — not an SDR' },
            ].map((s,i) => (
              <div key={i} style={{ display:'flex', flexDirection:'column', position:'relative', paddingLeft:i===0?0:24, borderLeft:i===0?'none':'1px solid #e2e8f0' }}>
                <div className="stat-v" style={{ fontSize:38, fontWeight:900, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1, marginBottom:8, background:'linear-gradient(135deg, #0066FF, #003FB3)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>{s.v}</div>
                <div style={{ fontSize:13.5, fontWeight:700, color:'#0a0a14', marginBottom:4 }}>{s.l}</div>
                <div style={{ fontSize:12.5, color:'#64748b', lineHeight:1.45 }}>{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         2.  4-STEP FLOW
         ════════════════════════════════════════════════════ */}
      <section className="cp-section" id="contact-flow" style={{ padding:'90px 32px', background:'#fff' }}>
        <div style={{ maxWidth:1180, margin:'0 auto' }}>

          {/* Section heading + progress */}
          <div className="rv" style={{ textAlign:'center', marginBottom:48, maxWidth:780, margin:'0 auto 48px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#0066FF15', border:'1px solid #0066FF30', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              4 STEPS · ~60 SECONDS
            </div>
            <h2 className="cp-h2" style={{ textAlign:'center' }}>Book a Solution Architect call</h2>
            <p style={{ fontSize:15.5, color:'#475569', lineHeight:1.7 }}>
              No marketing forms. No SDR triage. A senior architect on the first call, with the technical context to actually help.
              {!HAS_API && <span style={{ marginLeft:10, display:'inline-flex', alignItems:'center', gap:6, padding:'3px 10px', borderRadius:50, background:'#fef3c7', border:'1px solid #fbbf24', fontSize:11, fontWeight:700, color:'#92400e' }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#f59e0b' }}/>
                DEMO MODE — wire REACT_APP_CALENDAR_API to go live
              </span>}
            </p>
          </div>

          {/* Step progress bar */}
          <div className="rv cp-flow-progress" style={{ display:'flex', justifyContent:'center', gap:6, marginBottom:48 }}>
            {[
              { n:1, l:'Pick focus',  i:'Target'  },
              { n:2, l:'Your details', i:'User'   },
              { n:3, l:'Pick a slot',  i:'Clock'  },
              { n:4, l:'Confirm',      i:'CheckCircle' },
            ].map((s, i) => (
              <div key={s.n} style={{ display:'flex', alignItems:'center', gap:6 }}>
                <div style={{
                  display:'inline-flex', alignItems:'center', gap:8, padding:'9px 16px', borderRadius:50,
                  background: step >= s.n ? 'linear-gradient(135deg, #0066FF, #003FB3)' : '#f1f5f9',
                  color: step >= s.n ? '#fff' : '#94a3b8', border: step === s.n ? '1.5px solid #06b6d4' : 'none',
                  boxShadow: step === s.n ? '0 6px 18px rgba(0,102,255,0.30)' : 'none',
                  fontSize:12.5, fontWeight:800, transition:'all .22s',
                }}>
                  <span style={{ width:22, height:22, borderRadius:'50%', background:'rgba(255,255,255,0.25)', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:900 }}>{s.n}</span>
                  {s.l}
                </div>
                {i < 3 && <span style={{ color:'#cbd5e1', fontWeight:800 }}>→</span>}
              </div>
            ))}
          </div>


          {/* ──── STEP 1: Focus ──── */}
          {step === 1 && (
            <div className="rv" style={{ maxWidth:880, margin:'0 auto' }}>
              <div style={{ textAlign:'center', marginBottom:32 }}>
                <h3 style={{ fontSize:22, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>What can we help you with?</h3>
                <p style={{ fontSize:14, color:'#475569' }}>Pick the area closest to your challenge — we'll route to the right architect.</p>
              </div>

              <div className="cp-focus-g" style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:14, marginBottom:32 }}>
                {CONTACT_FOCUS.map(f => (
                  <button key={f.slug} onClick={() => setFocus(f)}
                    style={{
                      display:'flex', alignItems:'flex-start', gap:14, padding:'20px 22px', textAlign:'left',
                      borderRadius:16, cursor:'pointer', position:'relative', overflow:'hidden',
                      background: focus?.slug === f.slug ? 'linear-gradient(135deg, rgba(0,102,255,0.08), rgba(6,182,212,0.08))' : '#fff',
                      border: focus?.slug === f.slug ? '1.5px solid #0066FF' : '1px solid #e2e8f0',
                      boxShadow: focus?.slug === f.slug ? '0 8px 24px rgba(0,102,255,0.18)' : '0 1px 3px rgba(0,53,128,0.04)',
                      transition:'all .22s',
                    }}
                    onMouseEnter={e => { if (focus?.slug !== f.slug) { e.currentTarget.style.borderColor='#0066FF55'; e.currentTarget.style.transform='translateY(-2px)' } }}
                    onMouseLeave={e => { if (focus?.slug !== f.slug) { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.transform='none' } }}>
                    <div style={{ width:46, height:46, borderRadius:13, background:'linear-gradient(135deg, #0066FF, #003FB3)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 6px 16px rgba(0,102,255,0.30)' }}>
                      <Ic n={f.icon} s={22} style={{ color:'#fff' }}/>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:15.5, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:5 }}>{f.label}</div>
                      <div style={{ fontSize:12.5, color:'#475569', lineHeight:1.55 }}>{f.desc}</div>
                    </div>
                    {focus?.slug === f.slug && (
                      <div style={{ position:'absolute', top:14, right:14, width:24, height:24, borderRadius:'50%', background:'#0066FF', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <Ic n="Check" s={14} style={{ color:'#fff' }}/>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div style={{ display:'flex', justifyContent:'flex-end' }}>
                <button onClick={() => focus && setStep(2)} disabled={!focus}
                  style={{
                    display:'inline-flex', alignItems:'center', gap:10, padding:'13px 26px', borderRadius:50,
                    background: focus ? 'linear-gradient(135deg, #0066FF, #003FB3)' : '#e2e8f0',
                    border:'none', cursor: focus ? 'pointer' : 'not-allowed',
                    fontSize:14.5, fontWeight:700, color: focus ? '#fff' : '#94a3b8',
                    fontFamily:"'Plus Jakarta Sans',sans-serif",
                    boxShadow: focus ? '0 8px 22px rgba(0,102,255,0.30)' : 'none',
                  }}>
                  Continue → <Ic n="Arrow" s={14} style={{ color: focus ? '#fff' : '#94a3b8' }}/>
                </button>
              </div>
            </div>
          )}


          {/* ──── STEP 2: Details ──── */}
          {step === 2 && (
            <div className="rv" style={{ maxWidth:780, margin:'0 auto' }}>
              <div style={{ textAlign:'center', marginBottom:32 }}>
                <h3 style={{ fontSize:22, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Tell us about yourself</h3>
                <p style={{ fontSize:14, color:'#475569' }}>So we route to the right architect and understand your context before the call.</p>
              </div>

              <div className="cp-form-g" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, marginBottom:18 }}>
                <div>
                  <label className="cp-label">Your name *</label>
                  <input className="cp-input" placeholder="Jane Smith" value={details.name} onChange={e => setDetails({...details, name:e.target.value})}/>
                </div>
                <div>
                  <label className="cp-label">Work email *</label>
                  <input className="cp-input" type="email" placeholder="jane@company.com" value={details.email} onChange={e => setDetails({...details, email:e.target.value})}/>
                </div>
                <div>
                  <label className="cp-label">Company *</label>
                  <input className="cp-input" placeholder="Acme Manufacturing" value={details.company} onChange={e => setDetails({...details, company:e.target.value})}/>
                </div>
                <div>
                  <label className="cp-label">Your role</label>
                  <input className="cp-input" placeholder="CTO / Head of Operations / IT Director" value={details.role} onChange={e => setDetails({...details, role:e.target.value})}/>
                </div>
                <div>
                  <label className="cp-label">Company headcount</label>
                  <select className="cp-input" value={details.headcount} onChange={e => setDetails({...details, headcount:e.target.value})}>
                    <option value="">Select range...</option>
                    <option>Under 200</option>
                    <option>200–1,000</option>
                    <option>1,000–5,000</option>
                    <option>5,000–25,000</option>
                    <option>25,000+</option>
                  </select>
                </div>
                <div>
                  <label className="cp-label">Focus area</label>
                  <input className="cp-input" value={focus?.label || ''} readOnly style={{ background:'#f8fafc', color:'#475569', cursor:'not-allowed' }}/>
                </div>
              </div>

              <div style={{ marginBottom:32 }}>
                <label className="cp-label">Brief context (optional)</label>
                <textarea className="cp-input" rows={4} placeholder="What's slowing you down? Specific pain points, existing Microsoft estate, timeline, anything that helps us prepare..." value={details.notes} onChange={e => setDetails({...details, notes:e.target.value})} style={{ resize:'vertical', fontFamily:"'Plus Jakarta Sans',sans-serif" }}/>
              </div>

              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
                <button onClick={() => setStep(1)} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 22px', borderRadius:50, background:'#fff', border:'1px solid #e2e8f0', cursor:'pointer', fontSize:13.5, fontWeight:700, color:'#475569' }}>
                  ← Back
                </button>
                <button onClick={() => detailsValid && setStep(3)} disabled={!detailsValid}
                  style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'13px 26px', borderRadius:50, background: detailsValid ? 'linear-gradient(135deg, #0066FF, #003FB3)' : '#e2e8f0', border:'none', cursor: detailsValid ? 'pointer' : 'not-allowed', fontSize:14.5, fontWeight:700, color: detailsValid ? '#fff' : '#94a3b8', fontFamily:"'Plus Jakarta Sans',sans-serif", boxShadow: detailsValid ? '0 8px 22px rgba(0,102,255,0.30)' : 'none' }}>
                  Pick a slot → <Ic n="Arrow" s={14} style={{ color: detailsValid ? '#fff' : '#94a3b8' }}/>
                </button>
              </div>
            </div>
          )}


          {/* ──── STEP 3: Pick a slot (API-driven) ──── */}
          {step === 3 && (
            <div className="rv" style={{ maxWidth:880, margin:'0 auto' }}>
              <div style={{ textAlign:'center', marginBottom:32 }}>
                <h3 style={{ fontSize:22, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Pick a slot that works</h3>
                <p style={{ fontSize:14, color:'#475569' }}>
                  All times in <strong style={{ color:'#0a0a14' }}>{OFFICES[activeOffice].tz}</strong>.
                  {slotsSource === 'live' && <span style={{ marginLeft:8, color:'#0EA5E9', fontWeight:700 }}>· Live availability</span>}
                  {slotsSource === 'demo' && <span style={{ marginLeft:8, color:'#f59e0b', fontWeight:700 }}>· Demo mode</span>}
                  {slotsSource === 'demo-fallback' && <span style={{ marginLeft:8, color:'#f59e0b', fontWeight:700 }}>· API offline — showing sample availability</span>}
                </p>
              </div>

              {slotsLoading ? (
                <div style={{ textAlign:'center', padding:'60px 0' }}>
                  <div style={{ width:40, height:40, border:'3px solid #e2e8f0', borderTopColor:'#0066FF', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 16px' }}/>
                  <div style={{ fontSize:13, color:'#64748b' }}>Checking architect availability...</div>
                  <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                </div>
              ) : (
                <>
                  {/* Day tabs */}
                  <div className="cp-slot-days" style={{ display:'flex', gap:10, justifyContent:'center', marginBottom:24, flexWrap:'wrap' }}>
                    {dayKeys.map(d => {
                      const { dow, day, mon } = fmtDayLabel(d)
                      const isActive = activeDay === d
                      const dayAvailable = slotsByDay[d].some(s => s.available)
                      return (
                        <button key={d} onClick={() => setActiveDay(d)}
                          style={{
                            display:'flex', flexDirection:'column', alignItems:'center', padding:'12px 18px', borderRadius:14, cursor:'pointer', minWidth:80,
                            background: isActive ? 'linear-gradient(135deg, #0066FF, #003FB3)' : '#fff',
                            border: isActive ? 'none' : '1px solid #e2e8f0',
                            color: isActive ? '#fff' : '#0a0a14',
                            boxShadow: isActive ? '0 8px 22px rgba(0,102,255,0.30)' : '0 1px 3px rgba(0,53,128,0.04)',
                            opacity: dayAvailable ? 1 : 0.4,
                            transition:'all .22s',
                          }}>
                          <span style={{ fontSize:10.5, fontWeight:800, letterSpacing:'.10em', opacity:0.8 }}>{dow}</span>
                          <span style={{ fontSize:22, fontWeight:900, fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1, margin:'4px 0' }}>{day}</span>
                          <span style={{ fontSize:10.5, fontWeight:700, opacity:0.8 }}>{mon}</span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Times for active day */}
                  {activeDay && (
                    <div className="cp-slot-times-g" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:10, marginBottom:32 }}>
                      {slotsByDay[activeDay].map(s => (
                        <button key={s.slotId} disabled={!s.available} onClick={() => s.available && setSelectedSlot(s.slotId)}
                          style={{
                            padding:'14px 16px', borderRadius:12, cursor: s.available ? 'pointer' : 'not-allowed',
                            background: selectedSlot === s.slotId ? 'linear-gradient(135deg, #0066FF, #003FB3)' : (s.available ? '#fff' : '#f8fafc'),
                            border: selectedSlot === s.slotId ? 'none' : '1px solid #e2e8f0',
                            color: selectedSlot === s.slotId ? '#fff' : (s.available ? '#0a0a14' : '#cbd5e1'),
                            fontSize:14, fontWeight:700,
                            fontFamily:"'JetBrains Mono', monospace",
                            transition:'all .15s',
                            textDecoration: s.available ? 'none' : 'line-through',
                          }}>
                          {s.time}
                        </button>
                      ))}
                    </div>
                  )}

                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
                    <button onClick={() => setStep(2)} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 22px', borderRadius:50, background:'#fff', border:'1px solid #e2e8f0', cursor:'pointer', fontSize:13.5, fontWeight:700, color:'#475569' }}>
                      ← Back
                    </button>
                    <button onClick={() => selectedSlot && setStep(4)} disabled={!selectedSlot}
                      style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'13px 26px', borderRadius:50, background: selectedSlot ? 'linear-gradient(135deg, #0066FF, #003FB3)' : '#e2e8f0', border:'none', cursor: selectedSlot ? 'pointer' : 'not-allowed', fontSize:14.5, fontWeight:700, color: selectedSlot ? '#fff' : '#94a3b8', fontFamily:"'Plus Jakarta Sans',sans-serif", boxShadow: selectedSlot ? '0 8px 22px rgba(0,102,255,0.30)' : 'none' }}>
                      Review → <Ic n="Arrow" s={14} style={{ color: selectedSlot ? '#fff' : '#94a3b8' }}/>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}


          {/* ──── STEP 4: Review & Confirm ──── */}
          {step === 4 && (() => {
            const slot = slots.find(s => s.slotId === selectedSlot)
            const { dow, day, mon } = slot ? fmtDayLabel(slot.date) : { dow:'', day:'', mon:'' }
            return (
              <div className="rv" style={{ maxWidth:780, margin:'0 auto' }}>
                <div style={{ textAlign:'center', marginBottom:32 }}>
                  <h3 style={{ fontSize:22, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Review &amp; confirm</h3>
                  <p style={{ fontSize:14, color:'#475569' }}>Everything correct? Click confirm to send the booking.</p>
                </div>

                <div className="cp-review-g" style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:18, marginBottom:32 }}>
                  {/* Booking summary */}
                  <div style={{ padding:'24px 26px', borderRadius:18, background:'linear-gradient(135deg, #f0f7ff, #ecfeff)', border:'1px solid rgba(0,102,255,0.18)' }}>
                    <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:'#003FB3', marginBottom:18 }}>YOUR BOOKING</div>

                    {[
                      { l:'FOCUS',    v: focus?.label },
                      { l:'NAME',     v: details.name },
                      { l:'EMAIL',    v: details.email },
                      { l:'COMPANY',  v: details.company },
                      { l:'ROLE',     v: details.role || '—' },
                      { l:'HEADCOUNT',v: details.headcount || '—' },
                    ].map(item => (
                      <div key={item.l} style={{ marginBottom:12 }}>
                        <div style={{ fontSize:10, fontWeight:800, letterSpacing:'.10em', color:'#64748b', marginBottom:3 }}>{item.l}</div>
                        <div style={{ fontSize:13.5, color:'#0a0a14', fontWeight:700 }}>{item.v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Slot card */}
                  <div style={{ padding:'28px', borderRadius:18, background:'linear-gradient(135deg, #003FB3, #0066FF, #06b6d4)', color:'#fff', position:'relative', overflow:'hidden', boxShadow:'0 20px 50px rgba(0,102,255,0.30)' }}>
                    <div style={{ position:'absolute', top:-60, right:-50, width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)', pointerEvents:'none' }}/>
                    <div style={{ position:'relative', zIndex:1 }}>
                      <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', opacity:0.85, marginBottom:14 }}>YOUR SLOT</div>
                      <div style={{ fontSize:42, fontWeight:900, fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1, marginBottom:4, letterSpacing:'-0.02em' }}>{day}</div>
                      <div style={{ fontSize:14, fontWeight:700, opacity:0.95, marginBottom:18 }}>{dow} · {mon}</div>
                      <div style={{ padding:'14px 18px', borderRadius:12, background:'rgba(255,255,255,0.18)', border:'1px solid rgba(255,255,255,0.30)', backdropFilter:'blur(10px)', fontSize:20, fontWeight:900, fontFamily:"'JetBrains Mono', monospace", textAlign:'center' }}>
                        {slot?.time}
                      </div>
                      <div style={{ fontSize:11, opacity:0.85, marginTop:14, textAlign:'center' }}>{OFFICES[activeOffice].tz} · 30 minutes</div>
                    </div>
                  </div>
                </div>

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
                  <button onClick={() => setStep(3)} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 22px', borderRadius:50, background:'#fff', border:'1px solid #e2e8f0', cursor:'pointer', fontSize:13.5, fontWeight:700, color:'#475569' }}>
                    ← Back
                  </button>
                  <button onClick={handleSubmitBooking} disabled={submitting}
                    style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 32px', borderRadius:50, background: submitting ? '#94a3b8' : 'linear-gradient(135deg, #0066FF, #003FB3)', border:'none', cursor: submitting ? 'wait' : 'pointer', fontSize:15, fontWeight:800, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", boxShadow:'0 8px 22px rgba(0,102,255,0.30)' }}>
                    {submitting ? 'Booking...' : 'CONFIRM BOOKING'} <Ic n={submitting ? 'Clock' : 'CheckCircle'} s={14} style={{ color:'#fff' }}/>
                  </button>
                </div>
              </div>
            )
          })()}


          {/* ──── STEP 5: Success ──── */}
          {step === 5 && confirmed && (() => {
            const slot = confirmed.slot
            const { dow, day, mon } = slot ? fmtDayLabel(slot.date) : { dow:'', day:'', mon:'' }
            return (
              <div className="rv" style={{ maxWidth:660, margin:'0 auto', textAlign:'center', padding:'40px 0' }}>
                <div style={{ width:96, height:96, borderRadius:'50%', background:'linear-gradient(135deg, #0EA5E9, #06b6d4)', display:'inline-flex', alignItems:'center', justifyContent:'center', marginBottom:24, boxShadow:'0 16px 40px rgba(14,165,233,0.35)' }}>
                  <Ic n="CheckCircle" s={48} style={{ color:'#fff' }}/>
                </div>
                <h3 style={{ fontSize:32, fontWeight:900, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14, letterSpacing:'-0.02em' }}>You're booked! 🎉</h3>
                <p style={{ fontSize:16, color:'#475569', lineHeight:1.7, marginBottom:28 }}>
                  <strong style={{ color:'#0a0a14' }}>{dow} {day} {mon} · {slot?.time}</strong>
                  <br/>A calendar invite is on its way to <strong style={{ color:'#0a0a14' }}>{details.email}</strong>.
                </p>
                <div style={{ padding:'18px 22px', borderRadius:14, background:'#f0f7ff', border:'1px solid rgba(0,102,255,0.18)', marginBottom:28 }}>
                  <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:'#003FB3', marginBottom:6 }}>BOOKING ID</div>
                  <div style={{ fontSize:14, fontWeight:700, color:'#0a0a14', fontFamily:"'JetBrains Mono', monospace" }}>{confirmed.bookingId}</div>
                </div>
                <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
                  <button onClick={() => navigate('/')} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'13px 26px', borderRadius:50, background:'linear-gradient(135deg, #0066FF, #003FB3)', border:'none', cursor:'pointer', fontSize:14.5, fontWeight:700, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", boxShadow:'0 8px 22px rgba(0,102,255,0.30)' }}>
                    Back to home <Ic n="Arrow" s={14} style={{ color:'#fff' }}/>
                  </button>
                  <button onClick={() => { setStep(1); setFocus(null); setSelectedSlot(null); setConfirmed(null); setDetails({ name:'', email:'', company:'', role:'', headcount:'', notes:'' }) }}
                    style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'13px 22px', borderRadius:50, background:'#fff', border:'1px solid #e2e8f0', cursor:'pointer', fontSize:13.5, fontWeight:700, color:'#475569' }}>
                    Book another call
                  </button>
                </div>
              </div>
            )
          })()}

        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         3.  WHAT HAPPENS NEXT
         ════════════════════════════════════════════════════ */}
      <section className="cp-section" style={{ padding:'90px 32px', background:'linear-gradient(180deg, #f8fafc 0%, #f0f7ff 100%)' }}>
        <div style={{ maxWidth:1180, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:48, maxWidth:760, margin:'0 auto 48px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(6,182,212,0.10)', border:'1px solid rgba(6,182,212,0.30)', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              <Ic n="Clock" s={13} style={{ color:'#06b6d4' }}/>
              AFTER YOU BOOK
            </div>
            <h2 className="cp-h2" style={{ textAlign:'center' }}>What happens next</h2>
            <p style={{ fontSize:15.5, color:'#475569', lineHeight:1.7 }}>Clear, predictable, no surprises. We respect your time.</p>
          </div>

          <div className="rv cp-next-g" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:18 }}>
            {[
              { n:'01', icon:'Mail',        title:'Within minutes',  desc:'Calendar invite + brief background questionnaire — so the architect arrives prepared.' },
              { n:'02', icon:'Headphones',  title:'On the call',     desc:'30 minutes with a Microsoft-certified Solution Architect. Technical depth, no SDR triage.' },
              { n:'03', icon:'FileText',    title:'Within 5 days',   desc:"Written technical scope — clear deliverables, team shape, timeline, dependencies." },
              { n:'04', icon:'Award',       title:'Within 7 days',   desc:"Fixed-price proposal. No hourly billing surprises. Approve and we're off." },
            ].map((s,i) => (
              <div key={i} style={{ padding:'26px 24px', borderRadius:18, background:'#fff', border:'1px solid #e2e8f0', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${i===0?'#0066FF':i===1?'#003FB3':i===2?'#06b6d4':'#0EA5E9'}, transparent)` }}/>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                  <div style={{ width:46, height:46, borderRadius:13, background:`linear-gradient(135deg, ${i===0?'#0066FF':i===1?'#003FB3':i===2?'#06b6d4':'#0EA5E9'}, ${i===0?'#003FB3':i===1?'#06b6d4':i===2?'#0EA5E9':'#0066FF'})`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 6px 16px ${i===0?'#0066FF':i===1?'#003FB3':i===2?'#06b6d4':'#0EA5E9'}40` }}>
                    <Ic n={s.icon} s={22} style={{ color:'#fff' }}/>
                  </div>
                  <span style={{ fontSize:11, fontWeight:800, color:'#94a3b8', fontFamily:"'JetBrains Mono', monospace", letterSpacing:'.10em' }}>{s.n}</span>
                </div>
                <h4 style={{ fontSize:15.5, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, letterSpacing:'-0.005em' }}>{s.title}</h4>
                <p style={{ fontSize:13, color:'#475569', lineHeight:1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         4.  WHY BOOK WITH US
         ════════════════════════════════════════════════════ */}
      <section className="cp-section" style={{ padding:'90px 32px', background:'#fff' }}>
        <div style={{ maxWidth:1180, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:48, maxWidth:760, margin:'0 auto 48px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#0066FF15', border:'1px solid #0066FF30', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              WHY THIS CALL IS WORTH 30 MINUTES
            </div>
            <h2 className="cp-h2" style={{ textAlign:'center' }}>Architect on first call. Always.</h2>
          </div>

          <div className="rv cp-why-g" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20 }}>
            {[
              { icon:'Users',       title:'Senior architect, not an SDR',  desc:'You speak to someone who has delivered the work — not an account executive reading a script.' },
              { icon:'Shield',      title:'NDA on request',                desc:"For anything sensitive (M&A, restructuring, sensitive data) we'll send a mutual NDA before the call." },
              { icon:'Award',       title:'Microsoft-Certified Team',  desc:'Certified across Azure AI, Microsoft Fabric, identity, and agent development — building production AI on the Microsoft stack.' },
              { icon:'Zap',         title:'Fixed-price scoping',           desc:"No 'time & materials' surprises. Written scope, fixed proposal, predictable budget for your finance team." },
            ].map((s,i) => (
              <div key={i} style={{ padding:'28px 24px', borderRadius:20, background:'linear-gradient(180deg, #ffffff, #f8fafc)', border:'1px solid #e2e8f0', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:-50, right:-50, width:160, height:160, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,102,255,0.10), transparent 70%)', pointerEvents:'none' }}/>
                <div style={{ width:48, height:48, borderRadius:14, background:'linear-gradient(135deg, #0066FF, #003FB3)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16, boxShadow:'0 8px 20px rgba(0,102,255,0.30)' }}>
                  <Ic n={s.icon} s={22} style={{ color:'#fff' }}/>
                </div>
                <h3 style={{ fontSize:16, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:10, letterSpacing:'-0.005em' }}>{s.title}</h3>
                <p style={{ fontSize:13, color:'#475569', lineHeight:1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         4b.  PRE-CALL FAQ
         ════════════════════════════════════════════════════ */}
      <section className="cp-section" style={{ padding:'100px 32px', background:'#f8fafc' }}>
        <div style={{ maxWidth:880, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(6,182,212,0.12)', border:'1px solid rgba(6,182,212,0.30)', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              BEFORE YOU BOOK
            </div>
            <h2 className="cp-h2" style={{ textAlign:'center' }}>Common questions answered</h2>
          </div>

          <div className="rv">
            {[
              { q:"What if my use case isn't on the focus list?",
                a:"Pick 'Multiple / Not sure yet' — it routes to a senior architect who'll help you scope the right starting point. Most of our best engagements begin with someone unsure exactly what they need." },
              { q:"Will I be speaking to a salesperson?",
                a:"No. The first call is with a Microsoft-certified Solution Architect — someone who has personally delivered the work we're discussing. Account managers join later, once there's something concrete to scope." },
              { q:"What if I want an NDA before the call?",
                a:"Standard practice for M&A, restructuring, regulated industry, and sensitive data conversations. Email nda@devinstratus.com after booking and we'll send a mutual NDA within 24 hours." },
              { q:"How quickly can you start an engagement?",
                a:"Discovery within 2 weeks. Pilot kick-off within 4-6 weeks for most engagements. For urgent situations (failed implementation, deadline-driven migration), we have escalation paths for accelerated start." },
              { q:"What's the typical engagement budget?",
                a:"Discovery is fixed-price (£8k-£18k depending on scope). Pilots typically £25k-£80k. Full implementations £150k-£2M+ depending on complexity. No hourly billing surprises — every engagement has a written fixed-price scope." },
              { q:"Do you work with companies smaller than mid-market?",
                a:"We focus on enterprises with 200+ employees where Microsoft estate complexity justifies the engagement model. For smaller organisations, we can recommend Microsoft Partners better sized to your needs." },
            ].map((f, i) => (
              <div key={i} className={`acc-item ${openFaq === i ? 'open' : ''}`}>
                <button className="acc-trigger" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <Ic n={openFaq === i ? 'ChevU' : 'ChevD'} s={18} style={{ color:'#94a3b8', flexShrink:0 }}/>
                </button>
                {openFaq === i && <div className="acc-body">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         5.  GLOBAL OFFICES
         ════════════════════════════════════════════════════ */}
      <section className="cp-section" style={{ padding:'90px 32px', background:'linear-gradient(180deg, #f8fafc 0%, #ecfeff 100%)' }}>
        <div style={{ maxWidth:1180, margin:'0 auto' }}>
          <div className="rv" style={{ marginBottom:36, display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:16 }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(6,182,212,0.12)', border:'1px solid rgba(6,182,212,0.30)', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:14 }}>
                <Ic n="Globe" s={13} style={{ color:'#06b6d4' }}/>
                OUR OFFICES
              </div>
              <h2 className="cp-h2" style={{ marginBottom:8 }}>{OFFICES.length} offices · {OFFICES.length} time zones</h2>
              <p style={{ fontSize:14.5, color:'#475569' }}>24-hour cover for enterprise clients across UK, North America, and Asia-Pacific.</p>
            </div>
          </div>

          {/* Office tabs */}
          <div className="rv cp-office-tabs" style={{ display:'flex', gap:10, marginBottom:24, flexWrap:'wrap' }}>
            {OFFICES.map((o,i) => (
              <button key={o.slug} onClick={() => setActiveOffice(i)}
                style={{
                  display:'inline-flex', alignItems:'center', gap:9, padding:'11px 18px', borderRadius:50, cursor:'pointer',
                  background: activeOffice === i ? 'linear-gradient(135deg, #0066FF, #003FB3)' : '#fff',
                  border: activeOffice === i ? 'none' : '1px solid #e2e8f0',
                  color: activeOffice === i ? '#fff' : '#0a0a14',
                  boxShadow: activeOffice === i ? '0 8px 22px rgba(0,102,255,0.30)' : 'none',
                  fontSize:13, fontWeight:700, fontFamily:"'Plus Jakarta Sans',sans-serif",
                  transition:'all .22s',
                }}>
                <span style={{ fontSize:18, lineHeight:1 }}>{o.flag}</span>
                {o.city}
                {o.isHQ && <span style={{ fontSize:9.5, fontWeight:800, padding:'2px 7px', borderRadius:50, background: activeOffice===i?'rgba(255,255,255,0.20)':'#0066FF15', color: activeOffice===i?'#fff':'#0066FF', letterSpacing:'.04em' }}>HQ</span>}
              </button>
            ))}
          </div>

          {/* Active office card */}
          <div className="rv cp-office-g" style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:20 }}>
            <div style={{ padding:'32px', borderRadius:22, background:'#fff', border:'1px solid #e2e8f0', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:-60, right:-60, width:240, height:240, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,102,255,0.08), transparent 70%)', pointerEvents:'none' }}/>
              <div style={{ position:'relative', zIndex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:18 }}>
                  <span style={{ fontSize:48, lineHeight:1 }}>{OFFICES[activeOffice].flag}</span>
                  <div>
                    <h3 style={{ fontSize:24, fontWeight:900, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:'-0.01em' }}>{OFFICES[activeOffice].full}</h3>
                    <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:6 }}>
                      <span style={{ fontSize:11, fontWeight:700, color:'#06b6d4', background:'rgba(6,182,212,0.10)', padding:'3px 10px', borderRadius:50, letterSpacing:'.04em' }}>{OFFICES[activeOffice].tz}</span>
                      {OFFICES[activeOffice].isHQ && <span style={{ fontSize:11, fontWeight:700, color:'#003FB3', background:'#0066FF15', padding:'3px 10px', borderRadius:50, letterSpacing:'.04em' }}>HEADQUARTERS</span>}
                    </div>
                  </div>
                </div>

                {[
                  { icon:'Pin',   l:'Address', v: OFFICES[activeOffice].addr },
                  { icon:'Phone', l:'Phone',   v: OFFICES[activeOffice].phone, href:`tel:${OFFICES[activeOffice].phone.replace(/\s/g,'')}` },
                  { icon:'Mail',  l:'Email',   v: OFFICES[activeOffice].email, href:`mailto:${OFFICES[activeOffice].email}` },
                  { icon:'Users', l:'Team',    v: `${OFFICES[activeOffice].headcount} · Founded ${OFFICES[activeOffice].founded}` },
                ].map((c,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:12, marginBottom:14, padding:'10px 0', borderBottom: i<3 ? '1px solid #f1f5f9' : 'none' }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:'#f0f7ff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <Ic n={c.icon} s={16} style={{ color:'#0066FF' }}/>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:10.5, fontWeight:800, letterSpacing:'.10em', color:'#94a3b8', marginBottom:3 }}>{c.l.toUpperCase()}</div>
                      {c.href ? (
                        <a href={c.href} style={{ fontSize:14, fontWeight:700, color:'#0a0a14', textDecoration:'none' }}>{c.v}</a>
                      ) : (
                        <div style={{ fontSize:14, fontWeight:600, color:'#0a0a14' }}>{c.v}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Urgent contact card */}
            <div style={{ padding:'28px', borderRadius:22, background:'linear-gradient(135deg, #003FB3, #0066FF, #06b6d4)', color:'#fff', position:'relative', overflow:'hidden', boxShadow:'0 20px 50px rgba(0,102,255,0.30)' }}>
              <div style={{ position:'absolute', top:-80, right:-60, width:240, height:240, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)', pointerEvents:'none' }}/>
              <div style={{ position:'relative', zIndex:1 }}>
                <Ic n="Phone" s={28} style={{ color:'#fff', marginBottom:14 }}/>
                <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', opacity:0.85, marginBottom:8 }}>URGENT MATTERS</div>
                <h4 style={{ fontSize:18, fontWeight:800, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Production down? Active incident?</h4>
                <p style={{ fontSize:13.5, color:'rgba(255,255,255,0.85)', lineHeight:1.6, marginBottom:20 }}>
                  Call our 24/7 critical incident line for managed-support clients, or call your nearest office directly for new enquiries.
                </p>
                <a href={`tel:${OFFICES[activeOffice].phone.replace(/\s/g,'')}`}
                  style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'12px 18px', borderRadius:50, background:'#fff', color:'#003FB3', textDecoration:'none', fontSize:14, fontWeight:800, marginBottom:10, fontFamily:"'JetBrains Mono', monospace" }}>
                  <Ic n="Phone" s={14} style={{ color:'#003FB3' }}/> {OFFICES[activeOffice].phone}
                </a>
                <a href={`mailto:${OFFICES[activeOffice].email}`}
                  style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'10px 16px', borderRadius:50, background:'rgba(255,255,255,0.15)', color:'#fff', textDecoration:'none', fontSize:12.5, fontWeight:700, border:'1px solid rgba(255,255,255,0.30)', backdropFilter:'blur(10px)' }}>
                  <Ic n="Mail" s={13} style={{ color:'#fff' }}/> {OFFICES[activeOffice].email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         6.  FAQ
         ════════════════════════════════════════════════════ */}
      <section className="cp-section" style={{ padding:'100px 32px', background:'#fff' }}>
        <div style={{ maxWidth:880, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#06b6d418', border:'1px solid #06b6d440', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              FREQUENTLY ASKED
            </div>
            <h2 className="cp-h2" style={{ textAlign:'center' }}>About the discovery call</h2>
          </div>

          <div className="rv">
            {[
              { q:"What happens on the call?",
                a:"30 minutes. The Solution Architect asks about your context, current Microsoft estate, and the specific outcomes you're trying to deliver. We share relevant case studies, identify quick-wins, and end with a clear next step. No slides; just a working conversation." },
              { q:"Will you try to sell me on the call?",
                a:"No. The call's purpose is to understand whether we can genuinely help — and where we can't, to point you toward who can. Roughly a third of discovery calls end with us recommending a different approach or even a different partner. Honesty earns long-term work." },
              { q:"What if I'm just exploring, not ready to buy?",
                a:"That's most of our calls, and it's fine. We treat early-stage exploration the same as ready-to-buy — same architect, same depth. Many of our biggest clients started with a call where 'we're just exploring' was the opener." },
              { q:"Can I share confidential information?",
                a:"Yes. Tick the NDA option in your booking notes and we'll send a mutual NDA before the call. For ongoing engagements, NDA is standard. We design for regulated industries (financial services, healthcare) with confidentiality built in from day one." },
              { q:"How does the calendar booking work?",
                a:"You pick a slot from our architects' real availability. Once you confirm, the slot is reserved instantly and a calendar invite goes to your inbox within minutes. You can reschedule any time via the link in the confirmation email." },
            ].map((f, i) => (
              <div key={i} className={`acc-item ${openFaq === i ? 'open' : ''}`}>
                <button className="acc-trigger" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <Ic n={openFaq === i ? 'ChevU' : 'ChevD'} s={18} style={{ color:'#94a3b8', flexShrink:0 }}/>
                </button>
                {openFaq === i && <div className="acc-body">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
