import { useState, useEffect, useRef } from 'react'
import { C, Ic } from '../components/ui'

// ─── EmailJS Setup Guide (free 200 emails/month) ─────────────────────────────
// 1. Sign up at https://www.emailjs.com (no credit card)
// 2. Email Services → Add Service (Gmail/Outlook) → copy SERVICE_ID
// 3. Email Templates → Create → add {{name}},{{email}},{{company}},{{phone}},{{interest}},{{message}} → copy TEMPLATE_ID
// 4. Account → API Keys → copy PUBLIC_KEY
// 5. npm install @emailjs/browser
// 6. Replace the 3 values below, uncomment the emailjs.send block, remove the simulate block.
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

const OFFICES = [
  { flag:'🇬🇧', city:'London',     full:'London, UK',     phone:'+44 207 193 2502', addr:'30 St Mary Axe, EC3A 8EP',    tz:'GMT / BST',       color:C.blue   },
  { flag:'🇺🇸', city:'New York',   full:'New York, USA',  phone:'+1 800 938 7929',  addr:'1700 Broadway, NY 10019',     tz:'EST / EDT',       color:C.purple },
  { flag:'🇨🇦', city:'Toronto',    full:'Toronto, Canada',phone:'+1 778 381 5388',  addr:'181 Bay St, M5J 2T3',         tz:'EST / EDT',       color:C.teal   },
  { flag:'🇮🇳', city:'New Delhi',  full:'New Delhi, India',phone:'+91 96503 01529', addr:'Plot 5, Sector 44, Gurugram', tz:'IST (UTC +5:30)', color:C.orange },
]

const INTERESTS = [
  { icon:'Package',  label:'ERP Solutions',        color:C.blue   },
  { icon:'Users',    label:'CRM & Customer Svc',   color:C.purple },
  { icon:'Zap',      label:'Power Platform / AI',  color:C.teal   },
  { icon:'Wrench',   label:'Implementation',       color:C.orange },
  { icon:'Rocket',   label:'Upgrade / Migration',  color:C.green  },
  { icon:'Headphones',label:'Managed Support',     color:C.blue   },
  { icon:'Chart',    label:'Analytics & BI',       color:C.purple },
  { icon:'LifeBuoy', label:'Health Check',         color:C.teal   },
  { icon:'Award',    label:'Training',             color:C.orange },
  { icon:'Globe',    label:'General Enquiry',      color:C.green  },
]

const TIMES = ['09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30']

const DAYS = ['Mon','Tue','Wed','Thu','Fri']

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

// Animated counter
function Counter({ target, suffix='' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const ob = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      ob.disconnect()
      let start = null
      const step = ts => {
        if (!start) start = ts
        const p = Math.min((ts-start)/1400, 1)
        setVal(Math.round(p * target))
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, { threshold:.5 })
    ob.observe(ref.current)
    return () => ob.disconnect()
  }, [target])
  return <span ref={ref}>{val}{suffix}</span>
}

// Typing animation
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

export default function ContactPage({ navigate, openConsult }) {
  useReveal()
  useEffect(() => { window.scrollTo(0,0) }, [])

  // Multi-step form state
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name:'', email:'', company:'', phone:'', interest:'', day:'', time:'', message:'' })
  const [status, setStatus] = useState('idle') // idle|sending|sent|error
  const [err, setErr] = useState('')
  const [activeOffice, setActiveOffice] = useState(0)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { from:'bot', text:"Hi! I'm the DevinStratus assistant. What are you looking for today?" }
  ])
  const [chatInput, setChatInput] = useState('')
  const chatEndRef = useRef(null)

  const h = (k,v) => setForm(f => ({...f,[k]:v}))

  // Simulate bot replies
  const sendChat = () => {
    if (!chatInput.trim()) return
    const msg = chatInput.trim()
    setChatMessages(m => [...m, { from:'user', text:msg }])
    setChatInput('')
    setTimeout(() => {
      const lower = msg.toLowerCase()
      let reply = "Happy to help! Our team typically responds within 2 hours during business hours."
      if (lower.includes('price') || lower.includes('cost')) reply = "Pricing varies by module and company size. We offer free scoping calls where we discuss options. Want me to book one for you?"
      else if (lower.includes('erp') || lower.includes('finance')) reply = "Great choice — Dynamics 365 Finance or Business Central are our most popular ERP implementations. Typical go-live is 8-14 weeks. Shall I connect you with a specialist?"
      else if (lower.includes('crm') || lower.includes('sales')) reply = "Dynamics 365 Sales + Customer Insights is a fantastic combination. We've delivered 80+ CRM implementations. Would a demo be helpful?"
      else if (lower.includes('support') || lower.includes('help')) reply = "For managed support, our team provides 24/7 monitoring with named consultants. Plans start from £2,500/month. Want full details?"
      else if (lower.includes('demo')) reply = "I can arrange a personalised demo with a consultant. Just fill in the contact form below and choose 'Implementation' or your area of interest!"
      setChatMessages(m => [...m, { from:'bot', text:reply }])
    }, 900)
  }

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:'smooth' }) }, [chatMessages])

  const STEPS = [
    { label:'Your Interest', icon:'Target' },
    { label:'Your Details', icon:'User'   },
    { label:'Pick a Slot',  icon:'Clock'  },
    { label:'Confirm',      icon:'Check'  },
  ]

  const canNext = () => {
    if (step===0) return !!form.interest
    if (step===1) return !!(form.name && form.email)
    if (step===2) return true
    return true
  }

  const sendForm = async () => {
    setStatus('sending')
    try {
      // ── Uncomment when EmailJS keys added ──
      // import emailjs from '@emailjs/browser'
      // await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { ...form }, EMAILJS_PUBLIC_KEY)

      // Demo simulate:
      await new Promise(r => setTimeout(r, 1500))
      setStatus('sent')
    } catch {
      setStatus('error')
      setErr('Something went wrong. Please email us directly at hello@devinstratus.com')
    }
  }

  const accentColor = form.interest ? (INTERESTS.find(i=>i.label===form.interest)?.color || C.blue) : C.blue

  return (
    <div className="page-fade" style={{ paddingTop:68 }}>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        @keyframes pulseRing { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(1.6);opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .step-content { animation: slideUp .3s ease }
        .chat-msg { animation: slideUp .25s ease }
        .contact-card:hover { transform:translateY(-3px) }
        .contact-card { transition:transform .22s, box-shadow .22s }
        .slot-btn:hover { transform:scale(1.05) }
        .slot-btn { transition:all .15s }
        .interest-btn { transition:all .2s }
        .interest-btn:hover { transform:translateY(-2px) }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ background:'linear-gradient(135deg,#060d24 0%,#0d1a40 55%,#140828 100%)', paddingTop:0, padding:'80px 24px 70px', position:'relative', overflow:'hidden' }}>
        {/* Animated orbs */}
        <div style={{ position:'absolute', top:-100, right:-80, width:500, height:500, borderRadius:'50%', background:`${C.blue}16`, animation:'float 9s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:`${C.purple}12`, animation:'float 7s ease-in-out infinite reverse', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'40%', left:'30%', width:200, height:200, borderRadius:'50%', background:`${C.teal}10`, animation:'float 11s ease-in-out infinite', pointerEvents:'none' }} />

        <div style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:72, alignItems:'center' }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(74,222,128,.12)', border:'1px solid rgba(74,222,128,.25)', borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:700, color:'#4ade80', marginBottom:24 }}>
                <span style={{ width:7, height:7, borderRadius:'50%', background:'#4ade80', display:'inline-block', animation:'pulseRing 2s ease-out infinite' }} />
                Usually responds within 2 hours
              </div>
              <h1 style={{ fontSize:'clamp(32px,4.5vw,52px)', fontWeight:900, color:'#fff', lineHeight:1.12, marginBottom:20, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                Let's Build<br/>
                <span style={{ background:`linear-gradient(135deg,${C.blue},${C.purple},${C.teal})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                  <TypeWriter text="Something Brilliant." speed={55} />
                </span>
              </h1>
              <p style={{ fontSize:17, color:'rgba(255,255,255,.72)', lineHeight:1.8, marginBottom:36, maxWidth:480 }}>
                Whether you need a complete Dynamics 365 transformation or just honest advice — book a free 30-minute call with a certified specialist. No sales scripts. Just value.
              </p>

              {/* Trust signals */}
              <div style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
                {[
                  { icon:'CheckCircle', text:'Free consultation, no obligation',   color:'#4ade80' },
                  { icon:'Clock',       text:'Same-day response guaranteed',       color:C.teal   },
                  { icon:'Shield',      text:'Your data is always confidential',   color:C.blue   },
                ].map(t => (
                  <div key={t.text} style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'rgba(255,255,255,.8)' }}>
                    <Ic n={t.icon} s={15} style={{ color:t.color }} />{t.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Animated stats */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              {[
                { val:500, suf:'+', label:'Projects Delivered', icon:'Rocket',  color:C.blue   },
                { val:350, suf:'+', label:'Happy Clients',      icon:'Users',   color:C.purple },
                { val:16,  suf:'yrs',label:'In Business',       icon:'Award',   color:C.teal   },
                { val:99,  suf:'%', label:'Client Retention',   icon:'Heart',   color:C.orange },
              ].map(s => (
                <div key={s.label} style={{ background:'rgba(255,255,255,.06)', border:'1.5px solid rgba(255,255,255,.1)', borderRadius:20, padding:'28px 20px', textAlign:'center', backdropFilter:'blur(8px)' }}>
                  <div style={{ width:44, height:44, borderRadius:13, background:`${s.color}22`, border:`1px solid ${s.color}33`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px' }}>
                    <Ic n={s.icon} s={20} style={{ color:s.color }} />
                  </div>
                  <div style={{ fontSize:34, fontWeight:900, color:'#fff', lineHeight:1, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                    <Counter target={s.val} suffix={s.suf} />
                  </div>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,.55)', marginTop:6, fontWeight:600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section style={{ padding:'72px 24px', background:'#fff' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'start' }}>

          {/* ── MULTI-STEP FORM ── */}
          <div className="rv">
            {status === 'sent' ? (
              <div style={{ padding:48, borderRadius:24, background:`linear-gradient(135deg,${C.green}10,#fff)`, border:`2px solid ${C.green}44`, textAlign:'center', animation:'slideUp .4s ease' }}>
                <div style={{ width:72, height:72, borderRadius:'50%', background:C.green, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', boxShadow:`0 8px 32px ${C.green}44` }}>
                  <Ic n="Check" s={32} style={{ color:'#fff' }} />
                </div>
                <h2 style={{ fontSize:26, fontWeight:900, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>You're booked in!</h2>
                <p style={{ color:C.textM, fontSize:16, lineHeight:1.7, marginBottom:8 }}>
                  Hi <strong>{form.name}</strong>, thank you! A certified specialist will confirm your{form.day ? ` ${form.day} ${form.time}` : ''} slot within the hour.
                </p>
                <p style={{ color:C.textL, fontSize:13, marginBottom:28 }}>Check your inbox at <strong>{form.email}</strong></p>
                <div style={{ display:'flex', gap:10, justifyContent:'center' }}>
                  <button onClick={() => { setStatus('idle'); setStep(0); setForm({name:'',email:'',company:'',phone:'',interest:'',day:'',time:'',message:''}) }}
                    style={{ padding:'11px 22px', borderRadius:50, background:C.green, border:'none', color:'#fff', fontWeight:700, cursor:'pointer', fontSize:14, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                    Submit Another Enquiry
                  </button>
                  <button onClick={() => navigate('/')}
                    style={{ padding:'11px 22px', borderRadius:50, background:'#fff', border:`2px solid ${C.border}`, color:C.text, fontWeight:600, cursor:'pointer', fontSize:14 }}>
                    Back to Home
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Step indicator */}
                <div style={{ display:'flex', alignItems:'center', marginBottom:32 }}>
                  {STEPS.map((s, i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', flex: i<STEPS.length-1 ? 1 : 0 }}>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
                        <div style={{
                          width:40, height:40, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
                          background: i<step ? C.green : i===step ? `linear-gradient(135deg,${C.blue},${C.purple})` : C.bgSoft,
                          border: `2px solid ${i<step ? C.green : i===step ? 'transparent' : C.border}`,
                          transition:'all .3s', cursor: i<step ? 'pointer' : 'default',
                          boxShadow: i===step ? `0 4px 16px ${C.blue}44` : 'none',
                        }}
                          onClick={() => i < step && setStep(i)}>
                          {i < step
                            ? <Ic n="Check" s={16} style={{ color:'#fff' }} />
                            : <Ic n={s.icon} s={16} style={{ color: i===step ? '#fff' : C.textL }} />
                          }
                        </div>
                        <span style={{ fontSize:10, fontWeight:700, color: i===step ? C.blue : i<step ? C.green : C.textL, whiteSpace:'nowrap' }}>{s.label}</span>
                      </div>
                      {i < STEPS.length-1 && (
                        <div style={{ flex:1, height:2, margin:'0 8px', marginBottom:18, background: i<step ? C.green : C.border, transition:'background .3s' }} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step content */}
                <div className="step-content" key={step}>
                  {step === 0 && (
                    <div>
                      <h2 style={{ fontSize:24, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>What can we help you with?</h2>
                      <p style={{ color:C.textM, fontSize:14, marginBottom:22 }}>Select the area most relevant to your needs.</p>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                        {INTERESTS.map(int => (
                          <button key={int.label} className="interest-btn"
                            onClick={() => h('interest', int.label)}
                            style={{
                              display:'flex', alignItems:'center', gap:12, padding:'13px 16px',
                              borderRadius:14, border:`2px solid ${form.interest===int.label ? int.color : C.border}`,
                              background: form.interest===int.label ? `${int.color}10` : '#fff',
                              cursor:'pointer', textAlign:'left',
                              boxShadow: form.interest===int.label ? `0 4px 20px ${int.color}20` : 'none',
                            }}>
                            <div style={{ width:36, height:36, borderRadius:10, background:`${int.color}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                              <Ic n={int.icon} s={16} style={{ color:int.color }} />
                            </div>
                            <span style={{ fontSize:13, fontWeight:form.interest===int.label?700:600, color: form.interest===int.label ? int.color : C.text }}>{int.label}</span>
                            {form.interest===int.label && <Ic n="CheckCircle" s={16} style={{ color:int.color, marginLeft:'auto' }} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <h2 style={{ fontSize:24, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>Tell us about yourself</h2>
                      <p style={{ color:C.textM, fontSize:14, marginBottom:22 }}>We'll assign the right specialist for <strong style={{ color:accentColor }}>{form.interest}</strong>.</p>
                      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                          {[['name','Full Name *','text','Sarah Mitchell'],['company','Company Name','text','Acme Ltd']].map(([k,l,t,ph]) => (
                            <div key={k}>
                              <label style={{ fontSize:12.5, fontWeight:600, color:C.text, display:'block', marginBottom:5 }}>{l}</label>
                              <input className="form-input" type={t} placeholder={ph} value={form[k]} onChange={e=>h(k,e.target.value)} />
                            </div>
                          ))}
                        </div>
                        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                          {[['email','Work Email *','email','sarah@acmeltd.com'],['phone','Phone Number','tel','+44 7700 900000']].map(([k,l,t,ph]) => (
                            <div key={k}>
                              <label style={{ fontSize:12.5, fontWeight:600, color:C.text, display:'block', marginBottom:5 }}>{l}</label>
                              <input className="form-input" type={t} placeholder={ph} value={form[k]} onChange={e=>h(k,e.target.value)} />
                            </div>
                          ))}
                        </div>
                        <div>
                          <label style={{ fontSize:12.5, fontWeight:600, color:C.text, display:'block', marginBottom:5 }}>Tell us more (optional)</label>
                          <textarea className="form-input" rows={4} placeholder="Current systems, team size, key challenges, timeline..." value={form.message} onChange={e=>h('message',e.target.value)} style={{ resize:'vertical' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h2 style={{ fontSize:24, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>Pick a consultation slot</h2>
                      <p style={{ color:C.textM, fontSize:14, marginBottom:22 }}>Choose a 30-minute slot for your free call (UK time). Or skip and we'll contact you.</p>
                      <div style={{ marginBottom:20 }}>
                        <div style={{ fontSize:12, fontWeight:700, color:C.textL, letterSpacing:'.1em', marginBottom:12 }}>SELECT DAY (THIS WEEK)</div>
                        <div style={{ display:'flex', gap:8 }}>
                          {DAYS.map(d => (
                            <button key={d} className="slot-btn"
                              onClick={() => h('day', d)}
                              style={{ flex:1, padding:'12px 6px', borderRadius:12, border:`2px solid ${form.day===d ? accentColor : C.border}`, background: form.day===d ? `${accentColor}12` : '#fff', cursor:'pointer', fontSize:13, fontWeight:700, color: form.day===d ? accentColor : C.textM }}>
                              {d}
                            </button>
                          ))}
                        </div>
                      </div>
                      {form.day && (
                        <div style={{ animation:'slideUp .25s ease' }}>
                          <div style={{ fontSize:12, fontWeight:700, color:C.textL, letterSpacing:'.1em', marginBottom:12 }}>AVAILABLE TIMES ({form.day})</div>
                          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
                            {TIMES.map(t => (
                              <button key={t} className="slot-btn"
                                onClick={() => h('time', t)}
                                style={{ padding:'10px', borderRadius:10, border:`2px solid ${form.time===t ? accentColor : C.border}`, background: form.time===t ? `${accentColor}12` : '#fff', cursor:'pointer', fontSize:13, fontWeight:700, color: form.time===t ? accentColor : C.textM }}>
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      {!form.day && (
                        <div style={{ padding:'20px', borderRadius:14, background:C.bgSoft, border:`1.5px dashed ${C.border}`, textAlign:'center' }}>
                          <p style={{ color:C.textL, fontSize:13 }}>Select a day above to see available times, or skip this step and we'll email you time options.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h2 style={{ fontSize:24, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>Review & Confirm</h2>
                      <p style={{ color:C.textM, fontSize:14, marginBottom:22 }}>Everything look good? Hit confirm to book your consultation.</p>
                      <div style={{ background:C.bgSoft, borderRadius:18, padding:24, marginBottom:20 }}>
                        {[
                          ['Area of Interest', form.interest, 'Target'],
                          ['Your Name',        form.name,     'User'],
                          ['Work Email',       form.email,    'Mail'],
                          ['Company',          form.company || '—', 'Brief'],
                          ['Phone',            form.phone || '—',   'Phone'],
                          ['Preferred Slot',   form.day && form.time ? `${form.day} at ${form.time} UK time` : 'Flexible / TBC', 'Clock'],
                        ].map(([label, val, icon]) => (
                          <div key={label} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 0', borderBottom:`1px solid ${C.border}` }}>
                            <Ic n={icon} s={15} style={{ color:accentColor, flexShrink:0 }} />
                            <div style={{ flex:1 }}>
                              <div style={{ fontSize:11, fontWeight:600, color:C.textL, marginBottom:1 }}>{label}</div>
                              <div style={{ fontSize:14, fontWeight:600, color:C.text }}>{val}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {form.message && (
                        <div style={{ padding:'14px 18px', borderRadius:14, background:'#fff', border:`1.5px solid ${C.border}`, marginBottom:16 }}>
                          <div style={{ fontSize:11, fontWeight:700, color:C.textL, marginBottom:6 }}>YOUR MESSAGE</div>
                          <p style={{ fontSize:13.5, color:C.textM, lineHeight:1.6 }}>{form.message}</p>
                        </div>
                      )}
                      {err && <div style={{ padding:'12px 16px', borderRadius:10, background:'#fef2f2', border:'1px solid #fecaca', fontSize:13, color:'#dc2626', marginBottom:12 }}>{err}</div>}
                      <div style={{ padding:'14px 18px', borderRadius:14, background:`${accentColor}10`, border:`1px solid ${accentColor}30`, marginBottom:16, fontSize:13, color:C.textM }}>
                        🔒 Your information is processed securely and never shared with third parties.
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation buttons */}
                <div style={{ display:'flex', gap:10, marginTop:24 }}>
                  {step > 0 && (
                    <button onClick={() => setStep(s=>s-1)}
                      style={{ padding:'12px 24px', borderRadius:12, background:'#fff', border:`2px solid ${C.border}`, color:C.text, fontSize:14, fontWeight:600, cursor:'pointer' }}>
                      ← Back
                    </button>
                  )}
                  <button
                    onClick={() => { if(step < 3) setStep(s=>s+1); else sendForm() }}
                    disabled={!canNext() || status==='sending'}
                    style={{
                      flex:1, padding:'14px', borderRadius:12,
                      background: canNext() && status!=='sending' ? `linear-gradient(135deg,${C.blue},${C.purple})` : '#e2e8f0',
                      border:'none', color: canNext() ? '#fff' : C.textL,
                      fontSize:15, fontWeight:700, cursor: canNext() ? 'pointer' : 'not-allowed',
                      fontFamily:"'Plus Jakarta Sans',sans-serif",
                      boxShadow: canNext() ? `0 6px 24px ${C.blue}33` : 'none',
                      transition:'all .2s',
                    }}>
                    {status==='sending' ? '⏳ Sending...' : step === 3 ? '✓ Confirm Booking' : step === 2 ? (form.day&&form.time ? 'Confirm Slot →' : 'Skip & Continue →') : 'Continue →'}
                  </button>
                </div>
                {step === 0 && !form.interest && (
                  <p style={{ fontSize:12, color:C.textL, textAlign:'center', marginTop:10 }}>Select an area of interest above to continue</p>
                )}
              </>
            )}
          </div>

          {/* ── RIGHT: Offices + Chat ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:24 }}>

            {/* Office selector */}
            <div className="rv">
              <h3 style={{ fontSize:20, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14 }}>Our Offices</h3>
              <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
                {OFFICES.map((o, i) => (
                  <button key={o.city} onClick={() => setActiveOffice(i)}
                    style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:50, border:`2px solid ${activeOffice===i ? o.color : C.border}`, background: activeOffice===i ? `${o.color}10` : '#fff', cursor:'pointer', fontSize:13, fontWeight:700, color: activeOffice===i ? o.color : C.textM, transition:'all .18s' }}>
                    <span style={{ fontSize:14 }}>{o.flag}</span> {o.city}
                  </button>
                ))}
              </div>

              {/* Active office card */}
              <div className="contact-card" style={{ background:`linear-gradient(135deg,${OFFICES[activeOffice].color}08,#fff)`, border:`2px solid ${OFFICES[activeOffice].color}30`, borderRadius:22, padding:'24px 26px', transition:'all .3s' }}>
                <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:18 }}>
                  <div style={{ fontSize:36 }}>{OFFICES[activeOffice].flag}</div>
                  <div>
                    <h4 style={{ fontSize:20, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{OFFICES[activeOffice].full}</h4>
                    <span style={{ fontSize:12, fontWeight:600, color:OFFICES[activeOffice].color, background:`${OFFICES[activeOffice].color}15`, padding:'3px 10px', borderRadius:50 }}>{OFFICES[activeOffice].tz}</span>
                  </div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {[
                    { icon:'Pin',   val:OFFICES[activeOffice].addr  },
                    { icon:'Phone', val:OFFICES[activeOffice].phone },
                    { icon:'Mail',  val:'hello@devinstratus.com'    },
                  ].map(row => (
                    <div key={row.val} style={{ display:'flex', gap:10, alignItems:'center' }}>
                      <div style={{ width:34, height:34, borderRadius:9, background:`${OFFICES[activeOffice].color}15`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <Ic n={row.icon} s={15} style={{ color:OFFICES[activeOffice].color }} />
                      </div>
                      <span style={{ fontSize:14, color:C.textM }}>{row.val}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:18 }}>
                  <a href={`tel:${OFFICES[activeOffice].phone.replace(/\s/g,'')}`}
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7, padding:'11px', borderRadius:12, background:`linear-gradient(135deg,${OFFICES[activeOffice].color},${OFFICES[activeOffice].color}cc)`, textDecoration:'none', color:'#fff', fontSize:13, fontWeight:700 }}>
                    <Ic n="Phone" s={14} style={{ color:'#fff' }} /> Call Now
                  </a>
                  <a href="mailto:hello@devinstratus.com"
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7, padding:'11px', borderRadius:12, background:'#fff', border:`2px solid ${C.border}`, textDecoration:'none', color:C.text, fontSize:13, fontWeight:600 }}>
                    <Ic n="Mail" s={14} style={{ color:OFFICES[activeOffice].color }} /> Email Us
                  </a>
                </div>
              </div>
            </div>

            {/* Chat widget */}
            <div className="rv">
              <div style={{ border:`1.5px solid ${C.border}`, borderRadius:22, overflow:'hidden', boxShadow:'0 8px 32px rgba(0,0,0,.08)' }}>
                {/* Chat header */}
                <button
                  onClick={() => setChatOpen(o => !o)}
                  style={{ width:'100%', display:'flex', alignItems:'center', gap:12, padding:'16px 20px', background:`linear-gradient(135deg,${C.blue},${C.purple})`, border:'none', cursor:'pointer', textAlign:'left' }}>
                  <div style={{ position:'relative' }}>
                    <div style={{ width:38, height:38, borderRadius:'50%', background:'rgba(255,255,255,.2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <Ic n="Megaphone" s={18} style={{ color:'#fff' }} />
                    </div>
                    <div style={{ position:'absolute', bottom:0, right:0, width:11, height:11, borderRadius:'50%', background:'#4ade80', border:'2px solid white' }} />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:'#fff' }}>DevinStratus Assistant</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,.7)' }}>Online · Ask anything</div>
                  </div>
                  <Ic n="ChevD" s={18} style={{ color:'rgba(255,255,255,.7)', transition:'transform .2s', transform: chatOpen ? 'rotate(180deg)' : 'none' }} />
                </button>

                {chatOpen && (
                  <div style={{ animation:'slideUp .25s ease' }}>
                    {/* Messages */}
                    <div style={{ height:220, overflowY:'auto', padding:'16px', display:'flex', flexDirection:'column', gap:10, background:'#f8fafc' }}>
                      {chatMessages.map((m, i) => (
                        <div key={i} className="chat-msg" style={{ display:'flex', justifyContent: m.from==='user' ? 'flex-end' : 'flex-start' }}>
                          <div style={{
                            maxWidth:'82%', padding:'10px 14px', borderRadius: m.from==='user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                            background: m.from==='user' ? `linear-gradient(135deg,${C.blue},${C.purple})` : '#fff',
                            color: m.from==='user' ? '#fff' : C.text,
                            fontSize:13.5, lineHeight:1.5,
                            boxShadow: m.from==='bot' ? '0 2px 8px rgba(0,0,0,.08)' : 'none',
                          }}>
                            {m.text}
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                    {/* Input */}
                    <div style={{ display:'flex', gap:0, padding:'12px', background:'#fff', borderTop:`1px solid ${C.border}` }}>
                      <input
                        value={chatInput} onChange={e => setChatInput(e.target.value)}
                        onKeyDown={e => e.key==='Enter' && sendChat()}
                        placeholder="Type a message..."
                        style={{ flex:1, padding:'10px 14px', border:`1.5px solid ${C.border}`, borderRight:'none', borderRadius:'12px 0 0 12px', fontSize:13.5, outline:'none', fontFamily:'Inter,sans-serif', color:C.text, background:'#fff' }}
                      />
                      <button onClick={sendChat}
                        style={{ padding:'10px 18px', background:`linear-gradient(135deg,${C.blue},${C.purple})`, border:'none', borderRadius:'0 12px 12px 0', cursor:'pointer', display:'flex', alignItems:'center' }}>
                        <Ic n="Arrow" s={16} style={{ color:'#fff' }} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick CTA */}
            <div className="rv" style={{ background:`linear-gradient(135deg,${C.blue},${C.purple})`, borderRadius:20, padding:'24px 26px', color:'#fff', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:-20, right:-20, width:100, height:100, borderRadius:'50%', background:'rgba(255,255,255,.08)', pointerEvents:'none' }} />
              <Ic n="Rocket" s={24} style={{ color:'rgba(255,255,255,.6)', marginBottom:10 }} />
              <h3 style={{ fontSize:18, fontWeight:800, marginBottom:8, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Need urgent help?</h3>
              <p style={{ fontSize:13.5, opacity:.85, marginBottom:16, lineHeight:1.6 }}>For critical system issues, our emergency support line is staffed 24/7 by certified Dynamics 365 consultants.</p>
              <a href="tel:+442071932502"
                style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'11px 20px', borderRadius:50, background:'rgba(255,255,255,.18)', border:'1.5px solid rgba(255,255,255,.3)', color:'#fff', textDecoration:'none', fontSize:13.5, fontWeight:700 }}>
                <Ic n="Phone" s={15} style={{ color:'#fff' }} /> +44 207 193 2502
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHY US STRIP ── */}
      <section style={{ padding:'56px 24px', background:C.bgSoft, borderTop:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <h2 style={{ fontSize:28, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", textAlign:'center', marginBottom:40 }}>
            Why <span style={{ background:`linear-gradient(135deg,${C.blue},${C.purple})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>3,200+ professionals</span> trust DevinStratus
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:20 }}>
            {[
              { icon:'Clock',       title:'Same-Day Response',       desc:'Every enquiry answered within business hours — no queues, no bots.',  color:C.blue   },
              { icon:'Users',       title:'Named Consultant',        desc:'You get a dedicated specialist who knows your stack and your goals.', color:C.purple },
              { icon:'Award',       title:'Gold Partner Certified',  desc:'Microsoft Inner Circle — top 1% of partners globally.',              color:C.orange },
              { icon:'Shield',      title:'No Lock-In Contracts',    desc:'Month-to-month support options. Stay because we\'re great, not trapped.', color:C.teal },
              { icon:'Globe',       title:'4 Global Offices',        desc:'Local expertise across UK, USA, Canada and India.',                  color:C.green  },
              { icon:'CheckCircle', title:'94% Client Retention',    desc:'Our retention rate speaks for itself. We keep clients for years.',   color:C.blue   },
            ].map((card, i) => (
              <div key={card.title} className="rv contact-card" style={{ background:'#fff', borderRadius:18, padding:'24px 20px', border:`1.5px solid ${C.border}`, animation:`fadeUp .4s ease both ${i*60}ms` }}>
                <div style={{ width:46, height:46, borderRadius:14, background:`${card.color}15`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
                  <Ic n={card.icon} s={22} style={{ color:card.color }} />
                </div>
                <h4 style={{ fontSize:15, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>{card.title}</h4>
                <p style={{ fontSize:13, color:C.textM, lineHeight:1.65 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EmailJS setup developer guide ── */}
      <section style={{ padding:'48px 24px', background:'#fff', borderTop:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <div style={{ background:'#fffbeb', border:'1.5px solid #fcd34d', borderRadius:16, padding:'20px 24px', marginBottom:20 }}>
            <h3 style={{ fontSize:16, fontWeight:800, color:'#92400e', marginBottom:8 }}>📧 Developer: Activate Real Email (EmailJS — Free, 200 emails/month)</h3>
            <p style={{ fontSize:13, color:'#78350f', lineHeight:1.6, marginBottom:0 }}>
              <strong>5 steps:</strong> (1) Sign up free at emailjs.com · (2) Add Email Service → copy SERVICE_ID · (3) Create Template with {'{{name}}'}, {'{{email}}'}, {'{{company}}'}, {'{{phone}}'}, {'{{interest}}'}, {'{{message}}'} → copy TEMPLATE_ID · (4) Account → API Keys → copy PUBLIC_KEY · (5) Run <code style={{ background:'#fef3c7', padding:'1px 5px', borderRadius:4 }}>npm install @emailjs/browser</code>, replace the 3 constants at top of ContactPage.js, uncomment the emailjs.send block, delete the simulate block.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
