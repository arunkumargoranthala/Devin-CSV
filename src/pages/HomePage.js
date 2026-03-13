// HomePage simply re-exports all original home sections from the v3 single-file.
// We embed the entire original home content here as a self-contained component.
import { useState, useEffect, useRef, useCallback } from 'react'
import { C, Ic } from '../components/ui'
import { SOLUTIONS, SERVICES } from '../data/content'

// ── Hooks ──────────────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const els = ref.current.querySelectorAll ? [ref.current, ...ref.current.querySelectorAll('.rv')] : [ref.current]
    const ob = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); ob.unobserve(e.target) } })
    }, { threshold:0.12 })
    els.forEach(el => { el.classList.add('vis'); ob.observe(el) })
    return () => ob.disconnect()
  }, [])
  return ref
}

function useCounter(target) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const ob = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      ob.disconnect()
      let start = null
      const step = (ts) => {
        if (!start) start = ts
        const progress = Math.min((ts - start) / 1400, 1)
        setVal(Math.round(progress * target))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, { threshold:0.5 })
    ob.observe(ref.current)
    return () => ob.disconnect()
  }, [target])
  return { val, ref }
}

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior:'smooth' })
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero({ openConsult, openDemo, navigate }) {
  const [bv, setBv] = useState(false)
  const bars = [45,62,38,78,55,68,42,88,60,95,72,85]
  useEffect(() => { setTimeout(() => setBv(true), 300) }, [])

  return (
    <section id="hero" style={{ background:'linear-gradient(160deg,#f0f7ff 0%,#faf5ff 50%,#fff 100%)', padding:'0 24px', paddingTop:68 }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div className="hero-g" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center', padding:'72px 0 56px' }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:C.blueL, borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:700, color:C.blue, marginBottom:24, border:`1px solid rgba(0,87,184,.15)` }}>
              <span style={{ width:7, height:7, borderRadius:'50%', background:C.green, display:'inline-block' }}/>
              Microsoft Gold Partner · Trusted by 350+ businesses
            </div>
            <h1 style={{ fontSize:'clamp(2rem,4.2vw,3.2rem)', fontWeight:800, color:C.text, marginBottom:20, lineHeight:1.15, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
              Empower Your Business with{' '}
              <span style={{ background:`linear-gradient(135deg,${C.blue},${C.purple})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>AI-Enabled ERP</span>
              {' '}&amp;{' '}
              <span style={{ background:`linear-gradient(135deg,${C.orange},${C.purple})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>CRM Solutions</span>
            </h1>
            <p style={{ fontSize:15.5, color:C.textM, lineHeight:1.78, marginBottom:32, maxWidth:510 }}>
              Unify finance, operations, sales and service on one intelligent Dynamics 365 platform — cutting manual work, automating decisions, and giving every team real-time visibility.
            </p>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:36 }}>
              <button onClick={openConsult} style={{ display:'flex', alignItems:'center', gap:8, padding:'13px 26px', borderRadius:50, background:`linear-gradient(135deg,${C.blue},${C.purple})`, border:'none', color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                Free Consultation <Ic n="Arrow" s={14} style={{ color:'#fff' }}/>
              </button>
              <button onClick={openDemo} style={{ display:'flex', alignItems:'center', gap:8, padding:'13px 26px', borderRadius:50, background:'#fff', border:`2px solid ${C.border}`, color:C.text, fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                <Ic n="Play" s={13} style={{ color:C.blue }}/> Watch Demo
              </button>
            </div>
            <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
              {[{v:'350+',l:'Happy Clients',bg:C.blueL,c:C.blue},{v:'150+',l:'Consultants',bg:C.purpleL,c:C.purple},{v:'Gold',l:'MS Partner',bg:C.orangeL,c:C.orange},{v:'99.9%',l:'Uptime SLA',bg:C.tealL,c:C.teal}].map(b => (
                <div key={b.l} style={{ background:b.bg, borderRadius:13, padding:'11px 16px', textAlign:'center', minWidth:72 }}>
                  <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:20, color:b.c }}>{b.v}</div>
                  <div style={{ fontSize:10.5, fontWeight:600, color:C.textM, marginTop:1, whiteSpace:'nowrap' }}>{b.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position:'relative' }}>
            <div style={{ position:'absolute', top:-20, left:-10, zIndex:10, background:'#fff', borderRadius:13, padding:'9px 14px', boxShadow:'0 6px 28px rgba(0,87,184,.14)', border:`1.5px solid ${C.border}`, display:'flex', alignItems:'center', gap:7 }}>
              <div style={{ width:7, height:7, borderRadius:'50%', background:C.green }}/><span style={{ fontSize:12, fontWeight:700, color:C.text }}>✨ AI Copilot Active</span>
            </div>
            <div style={{ position:'absolute', bottom:20, right:-14, zIndex:10, background:'#fff', borderRadius:13, padding:'9px 14px', boxShadow:'0 6px 28px rgba(108,60,225,.13)', border:`1.5px solid ${C.border}`, display:'flex', alignItems:'center', gap:7 }}>
              <Ic n="Shield" s={13} style={{ color:C.purple }}/><span style={{ fontSize:12, fontWeight:700, color:C.text }}>Azure-Secured</span>
            </div>
            <div style={{ background:'#fff', borderRadius:22, boxShadow:'0 18px 70px rgba(0,87,184,.13)', border:`1.5px solid ${C.border}`, overflow:'hidden' }}>
              <div style={{ padding:'16px 20px', background:`linear-gradient(135deg,${C.blue},${C.purple})`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <div style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,.7)', letterSpacing:'.1em' }}>DYNAMICS 365 LIVE DASHBOARD</div>
                  <div style={{ fontSize:14, fontWeight:700, color:'#fff', marginTop:2 }}>Business Intelligence Overview</div>
                </div>
                <div style={{ background:'rgba(255,255,255,.2)', borderRadius:7, padding:'3px 9px', fontSize:10, color:'#fff', fontWeight:700, display:'flex', alignItems:'center', gap:5 }}>
                  <span style={{ width:6, height:6, borderRadius:'50%', background:'#4ade80', display:'inline-block' }}/> LIVE
                </div>
              </div>
              <div style={{ padding:'16px 20px' }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
                  {[{l:'Total Revenue',v:'$8.4M',d:'+23%',c:C.blue,bg:C.blueL},{l:'Active Customers',v:'3,214',d:'+11%',c:C.purple,bg:C.purpleL},{l:'Efficiency Rate',v:'97.1%',d:'+8%',c:C.teal,bg:C.tealL},{l:'Cost Reduction',v:'54%',d:'+54%',c:C.orange,bg:C.orangeL}].map(k => (
                    <div key={k.l} style={{ background:k.bg, borderRadius:12, padding:'12px 14px' }}>
                      <div style={{ fontSize:10, fontWeight:600, color:C.textM, marginBottom:3 }}>{k.l}</div>
                      <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:20, color:k.c }}>{k.v}</div>
                      <div style={{ fontSize:10, fontWeight:700, color:C.green, marginTop:2 }}>▲ {k.d}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background:C.bgSoft, borderRadius:12, padding:'12px 14px' }}>
                  <div style={{ fontSize:10, fontWeight:700, color:C.textM, marginBottom:8 }}>MONTHLY PERFORMANCE</div>
                  <div style={{ display:'flex', alignItems:'flex-end', gap:4, height:52 }}>
                    {bars.map((h,i) => (
                      <div key={i} style={{ flex:1, borderRadius:3, background:i===9?`linear-gradient(180deg,${C.blue},${C.purple})`:`rgba(0,87,184,${0.1+h/400})`, height:`${bv?h:0}%`, transition:`height .8s cubic-bezier(.34,1.56,.64,1) ${i*60}ms` }}/>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Trust bar ──────────────────────────────────────────────────────────────────
function Trust() {
  const logos = ["Contoso Ltd","Fabrikam Inc","NorthWind Corp","Alpine Skis","Tailwind Traders","Relecloud","A. Perry & Co","DataCove","TechNorth","BluePeak","Greenfield Ltd","Horizon Group"]
  const doubled = [...logos,...logos]
  return (
    <section id="trust" style={{ background:'#fff', borderTop:`1.5px solid ${C.border}`, borderBottom:`1.5px solid ${C.border}`, padding:'22px 0', overflow:'hidden' }}>
      <div style={{ textAlign:'center', fontSize:10, fontWeight:700, letterSpacing:'.14em', color:C.textL, marginBottom:14, textTransform:'uppercase' }}>Trusted by businesses across Manufacturing · Retail · Finance · Healthcare · Logistics</div>
      <div style={{ overflow:'hidden' }}>
        <div className="track">
          {doubled.map((l,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:9, padding:'7px 20px', borderRadius:9, border:`1px solid ${C.border}`, whiteSpace:'nowrap', flexShrink:0 }}>
              <div style={{ width:24, height:24, borderRadius:6, background:`linear-gradient(135deg,${C.blue},${C.purple})`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ color:'#fff', fontSize:10, fontWeight:800 }}>{l[0]}</span>
              </div>
              <span style={{ fontSize:12.5, fontWeight:600, color:C.textM }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Stats ──────────────────────────────────────────────────────────────────────
function Stats() {
  const items = [
    {target:50,suffix:'%+',label:'Lower Operating Costs',color:C.blue},
    {target:350,suffix:'+',label:'Clients Served',color:C.orange},
    {target:99,suffix:'.9%',label:'Platform Uptime',color:C.teal},
    {target:3,suffix:'x',label:'Average ROI',color:C.purple},
    {target:40,suffix:'%',label:'Faster Financial Close',color:C.green},
    {target:150,suffix:'+',label:'Certified Consultants',color:C.blue},
  ]
  return (
    <section id="stats" style={{ background:`linear-gradient(160deg,${C.blueLL},#faf5ff)`, padding:'88px 0' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px' }}>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <h2 style={{ fontSize:'clamp(1.7rem,3.2vw,2.4rem)', fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
            Numbers That <span style={{ background:`linear-gradient(135deg,${C.blue},${C.purple})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Speak for Themselves</span>
          </h2>
        </div>
        <div className="stats-g" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(155px,1fr))', gap:16 }}>
          {items.map(it => {
            const { val, ref } = useCounter(it.target)
            return (
              <div key={it.label} ref={ref} style={{ background:'#fff', borderRadius:18, padding:'28px 20px', textAlign:'center', border:`1px solid ${C.border}` }}>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:38, color:it.color, lineHeight:1 }}>{val}{it.suffix}</div>
                <div style={{ fontWeight:700, fontSize:13, color:C.text, marginTop:8 }}>{it.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Solutions overview ─────────────────────────────────────────────────────────
function SolutionsSection({ navigate }) {
  return (
    <section id="solutions" style={{ padding:'88px 24px', background:'#fff' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <div style={{ display:'inline-flex', background:C.blueL, color:C.blue, borderRadius:50, padding:'6px 16px', fontSize:12, fontWeight:700, marginBottom:16 }}>OUR SOLUTIONS</div>
          <h2 style={{ fontSize:'clamp(1.7rem,3vw,2.4rem)', fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:12 }}>
            One platform. Every business function.
          </h2>
          <p style={{ fontSize:16, color:C.textM, maxWidth:560, margin:'0 auto' }}>Click any solution category to explore the full product range.</p>
        </div>
        <div className="sol-g" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
          {SOLUTIONS.map(s => (
            <button key={s.slug}
              onClick={() => navigate(`/solutions/${s.slug}`)}
              style={{ display:'flex', flexDirection:'column', padding:'28px', borderRadius:20, border:`1.5px solid ${C.border}`, background:'#fff', cursor:'pointer', textAlign:'left', transition:'all .22s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=s.color+'55'; e.currentTarget.style.boxShadow=`0 10px 40px ${s.color}12`; e.currentTarget.style.transform='translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
              <div style={{ width:52, height:52, borderRadius:14, background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
                <Ic n={s.icon} s={24} style={{ color:s.color }}/>
              </div>
              <h3 style={{ fontSize:18, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>{s.heading}</h3>
              <p style={{ fontSize:13.5, color:C.textM, lineHeight:1.6, marginBottom:16, flex:1 }}>{s.tagline}</p>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, fontWeight:700, color:s.color }}>
                {s.items.length} solutions <Ic n="Arrow" s={13} style={{ color:s.color }}/>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Services overview ──────────────────────────────────────────────────────────
function ServicesSection({ navigate }) {
  return (
    <section id="process" style={{ padding:'88px 24px', background:C.bgSoft }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <div style={{ display:'inline-flex', background:C.blueL, color:C.blue, borderRadius:50, padding:'6px 16px', fontSize:12, fontWeight:700, marginBottom:16 }}>OUR SERVICES</div>
          <h2 style={{ fontSize:'clamp(1.7rem,3vw,2.4rem)', fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
            End-to-end Dynamics 365 expertise
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16 }}>
          {SERVICES.map(s => (
            <button key={s.slug}
              onClick={() => navigate(`/service/${s.slug}`)}
              style={{ display:'flex', gap:16, padding:'20px', borderRadius:16, border:`1.5px solid ${C.border}`, background:'#fff', cursor:'pointer', textAlign:'left', transition:'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=s.color+'55'; e.currentTarget.style.boxShadow=`0 6px 24px ${s.color}12`; e.currentTarget.style.transform='translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
              <div style={{ width:44, height:44, borderRadius:12, background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Ic n={s.n} s={20} style={{ color:s.color }}/>
              </div>
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:4 }}>{s.t}</div>
                <div style={{ fontSize:12.5, color:C.textL, lineHeight:1.5 }}>{s.tagline.split('—')[0].trim()}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Testimonials ──────────────────────────────────────────────────────────────
function Testimonials() {
  const tms = [
    {q:"DevinStratus transformed our entire finance operation. Month-end close went from 15 days to 5 days.",name:"Sarah Mitchell",role:"CFO, Ashford Manufacturing",star:5},
    {q:"The implementation was flawless. We went live on time and on budget — the first time we'd ever experienced that with an ERP project.",name:"Raj Patel",role:"IT Director, PrimeLine Distribution",star:5},
    {q:"Our sales team now has AI telling them which deals to focus on. Win rates are up 28% in six months.",name:"James Whitmore",role:"Sales Director, Crestwood Group",star:5},
    {q:"The managed support team feels like an extension of our own IT. Named consultants who know our system inside out.",name:"Emma Clarke",role:"CTO, NovaTel Retail",star:5},
  ]
  return (
    <section id="testimonials" style={{ padding:'88px 24px', background:'#fff' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:52 }}>
          <div style={{ display:'inline-flex', background:C.purpleL, color:C.purple, borderRadius:50, padding:'6px 16px', fontSize:12, fontWeight:700, marginBottom:16 }}>CLIENT STORIES</div>
          <h2 style={{ fontSize:'clamp(1.7rem,3vw,2.4rem)', fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>What our clients say</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:20 }}>
          {tms.map((t,i) => (
            <div key={i} style={{ background:C.bgSoft, borderRadius:18, padding:'28px', border:`1px solid ${C.border}` }}>
              <div style={{ display:'flex', gap:2, marginBottom:14 }}>
                {[...Array(t.star)].map((_,j) => <Ic key={j} n="Star" s={14} style={{ color:'#f59e0b' }}/>)}
              </div>
              <p style={{ fontSize:14.5, color:C.textM, lineHeight:1.7, marginBottom:18, fontStyle:'italic' }}>"{t.q}"</p>
              <div style={{ fontWeight:700, color:C.text, fontSize:13 }}>{t.name}</div>
              <div style={{ fontSize:12, color:C.textL }}>{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Contact CTA ────────────────────────────────────────────────────────────────
function ContactCTA({ openConsult }) {
  return (
    <section id="contact" style={{ padding:'88px 24px', background:`linear-gradient(135deg,${C.blue},${C.purple})` }}>
      <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center' }}>
        <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)', fontWeight:800, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:16 }}>
          Ready to get started?
        </h2>
        <p style={{ fontSize:17, color:'rgba(255,255,255,.85)', marginBottom:36, lineHeight:1.7 }}>
          Book a free 30-minute consultation with a Dynamics 365 specialist. No obligation. Just clear, honest advice.
        </p>
        <button onClick={openConsult} style={{ padding:'15px 36px', borderRadius:50, background:'#fff', color:C.blue, border:'none', fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
          Book Free Consultation
        </button>
      </div>
    </section>
  )
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function HomePage({ navigate, openConsult, openDemo }) {
  return (
    <div className="page-fade">
      <Hero openConsult={openConsult} openDemo={openDemo} navigate={navigate}/>
      <Trust/>
      <Stats/>
      <SolutionsSection navigate={navigate}/>
      <ServicesSection navigate={navigate}/>
      <Testimonials/>
      <ContactCTA openConsult={openConsult}/>
    </div>
  )
}
