import { useState, useEffect } from 'react'
import { C, Ic, Btn } from '../components/ui'
import { INDUSTRIES } from '../data/industries'

/* ════════════════════════════════════════════════════════════════════════════
 *  IndustriesIndexPage — the /industries gallery landing page
 *  ────────────────────────────────────────────────────────────────────────────
 *  Structure:
 *    1. Hero (light Global-Offices recipe + sector positioning)
 *    2. Stats strip — 4 sector credibility numbers
 *    3. Industries grid — 6 industry cards each showing top-3 sub-items
 *    4. Why DevinStratus for your industry — 4 differentiator cards
 *    5. Compliance & regulations — frameworks across industries
 *    6. FAQ — industry-specific engagement questions
 *    7. Final CTA
 * ════════════════════════════════════════════════════════════════════════════ */

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

export default function IndustriesIndexPage({ navigate, openConsult }) {
  const [openFaq, setOpenFaq] = useState(null)
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  /* Aggregate all unique compliance frameworks across industries */
  const allRegs = [...new Set(INDUSTRIES.flatMap(i => i.regulations || []))]

  return (
    <div className="page-fade" style={{ overflowX:'hidden', maxWidth:'100vw' }}>

      {/* ─── Page-specific responsive CSS ─────────────────── */}
      <style dangerouslySetInnerHTML={{__html:`
        @media (max-width: 1023px) {
          .iip-industries-g { grid-template-columns: repeat(2, 1fr) !important; }
          .iip-why-g { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .iip-hero { padding: 32px 20px 64px !important; }
          .iip-hero h1 { font-size: clamp(30px, 7vw, 46px) !important; }
        }
        @media (max-width: 767px) {
          .iip-stats-g { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; row-gap: 28px !important; }
          .iip-stats-g > div { padding-left: 0 !important; border-left: none !important; }
          .iip-stats-g > div:nth-child(3),
          .iip-stats-g > div:nth-child(4) { padding-top: 22px !important; border-top: 1px solid #e2e8f0; }
          .iip-stats-g .stat-v { font-size: 36px !important; }
          .iip-trust-pills > div { font-size: 12px !important; padding: 7px 13px !important; }
          .iip-section { padding-left: 18px !important; padding-right: 18px !important; }
          .iip-stats-section { padding: 56px 18px !important; }
          .iip-cta-section { padding: 72px 20px !important; }
          .iip-cta-section h2 { font-size: clamp(24px, 6vw, 36px) !important; }
          .iip-regs-section { padding: 56px 18px !important; }
        }
        @media (max-width: 640px) {
          .iip-industries-g { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
        @media (max-width: 480px) {
          .iip-why-g { grid-template-columns: 1fr !important; }
          .iip-hero-ctas { width: 100%; flex-direction: column !important; align-items: stretch !important; }
          .iip-hero-ctas > * { width: 100%; justify-content: center; }
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
        <div style={{ position:'absolute', top:'40%', right:'18%', width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.30), transparent 70%)', filter:'blur(40px)', animation:'heroFloat 11s ease-in-out infinite', pointerEvents:'none' }} />

        <div className="iip-hero" style={{ maxWidth:1300, margin:'0 auto', padding:'56px 32px 100px', position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:32, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Home</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <span style={{ fontSize:13, color:'#0a0a14', fontWeight:600 }}>Industries</span>
          </div>

          <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:'rgba(6,182,212,0.10)', border:'1px solid rgba(6,182,212,0.30)', borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:800, color:'#003FB3', letterSpacing:'.06em', marginBottom:24 }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#06b6d4', boxShadow:'0 0 0 4px rgba(6,182,212,0.20)', animation:'heroFloat 2s ease-in-out infinite' }} />
            6 INDUSTRIES · 18 SECTOR-SPECIFIC SOLUTIONS
          </div>

          <h1 style={{ fontSize:'clamp(36px, 5.5vw, 64px)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.02em', color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:24, maxWidth:980 }}>
            Built for your sector.<br />
            <span style={{ background:'linear-gradient(135deg, #06b6d4 0%, #0066FF 50%, #003FB3 100%)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              Compliant with your regulators.
            </span>
          </h1>

          <p style={{ fontSize:17.5, color:'#334155', lineHeight:1.7, maxWidth:780, marginBottom:32 }}>
            From <strong style={{ color:'#0a0a14' }}>manufacturing</strong> shop floors to <strong style={{ color:'#0a0a14' }}>healthcare</strong> patient workflows, from <strong style={{ color:'#0a0a14' }}>financial services</strong> compliance to <strong style={{ color:'#0a0a14' }}>retail</strong> omnichannel — we deliver Microsoft solutions designed for your sector's specific operations, regulations, and outcomes. Built for your sector's specific operations, regulations, and outcomes — with compliance designed in from day one.
          </p>

          <div className="iip-trust-pills" style={{ display:'flex', flexWrap:'wrap', gap:14, marginBottom:40 }}>
            {[
              { icon:'Award',       text:'Microsoft-certified team' },
              { icon:'Shield',      text:'Sector compliance built-in' },
              { icon:'Globe',       text:'UK · USA · CA · IN delivery' },
              { icon:'CheckCircle', text:'Structured, on-time delivery' },
            ].map((t,i) => (
              <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'9px 16px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1px solid rgba(0,102,255,0.18)', backdropFilter:'blur(10px)', fontSize:13, fontWeight:700, color:'#0a0a14' }}>
                <Ic n={t.icon} s={14} style={{ color:'#0066FF' }}/>
                {t.text}
              </div>
            ))}
          </div>

          <div className="iip-hero-ctas" style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            <Btn onClick={openConsult}>Talk to an Industry Architect <Ic n="Arrow" s={14} style={{ color:'#fff' }}/></Btn>
            <button onClick={() => { const el = document.getElementById('industries-grid'); if (el) el.scrollIntoView({ behavior:'smooth' }) }}
              style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 26px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1.5px solid rgba(0,102,255,0.30)', backdropFilter:'blur(10px)', cursor:'pointer', fontSize:15, fontWeight:700, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
              Browse 6 industries <Ic n="ChevD" s={14} style={{ color:'#0066FF' }}/>
            </button>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         2.  STATS STRIP
         ════════════════════════════════════════════════════ */}
      <section className="iip-stats-section" style={{ padding:'72px 32px', background:'#fff', borderTop:'1px solid #e2e8f0', borderBottom:'1px solid #e2e8f0' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv iip-stats-g" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:32 }}>
            {[
              { v:'6',     l:'Industries served',       s:'With deep sector expertise' },
              { v:'18',    l:'Industry-specific solutions', s:'Pre-scoped, ready to deploy' },
              { v:'AI',    l:'Orchestration-first',     s:'Manufacturing to professional services' },
              { v:'12+',   l:'Compliance frameworks',   s:'HIPAA, FCA, ISO, SOC2 & more' },
            ].map((s,i) => (
              <div key={i} style={{ display:'flex', flexDirection:'column', position:'relative', paddingLeft:i===0?0:24, borderLeft:i===0?'none':'1px solid #e2e8f0' }}>
                <div className="stat-v" style={{ fontSize:48, fontWeight:900, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1, marginBottom:8, background:'linear-gradient(135deg, #0066FF, #003FB3)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>{s.v}</div>
                <div style={{ fontSize:14, fontWeight:700, color:'#0a0a14', marginBottom:4 }}>{s.l}</div>
                <div style={{ fontSize:13, color:'#64748b' }}>{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         3.  INDUSTRIES GRID — 6 cards, each shows top-3 sub-items
         ════════════════════════════════════════════════════ */}
      <section className="iip-section" id="industries-grid" style={{ padding:'90px 32px 60px', background:'#fff' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:56, maxWidth:780, margin:'0 auto 56px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#0066FF15', border:'1px solid #0066FF30', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              SECTOR EXPERTISE
            </div>
            <h2 style={{ fontSize:'clamp(28px, 4vw, 42px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14, lineHeight:1.15 }}>
              Industries we modernise
            </h2>
            <p style={{ fontSize:16, color:'#475569', lineHeight:1.7 }}>
              Each industry has 3 specialised solutions — designed around sector-specific challenges, integrations, and compliance.
            </p>
          </div>

          <div className="rv iip-industries-g" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20 }}>
            {INDUSTRIES.map((ind, idx) => (
              <button key={ind.slug} onClick={() => navigate(`/industries/${ind.slug}`)}
                style={{
                  display:'flex', flexDirection:'column', padding:'30px 28px 26px',
                  borderRadius:22,
                  border:'1px solid rgba(0, 102, 255, 0.10)',
                  background:'linear-gradient(180deg, #ffffff 0%, #fafcff 100%)',
                  boxShadow:'0 1px 3px rgba(0, 53, 128, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                  cursor:'pointer', textAlign:'left', position:'relative', overflow:'hidden',
                  transition:'all .3s cubic-bezier(.22,1,.36,1)',
                  minHeight:360
                }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor=ind.color+'55'; e.currentTarget.style.boxShadow=`0 14px 32px ${ind.color}22` }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='rgba(0,102,255,0.10)'; e.currentTarget.style.boxShadow='0 1px 3px rgba(0, 53, 128, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)' }}>

                <div style={{ position:'absolute', top:-50, right:-50, width:180, height:180, borderRadius:'50%', background:`radial-gradient(circle, ${ind.color}22, transparent 70%)`, pointerEvents:'none' }} />

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18, position:'relative', zIndex:1 }}>
                  <div style={{ width:52, height:52, borderRadius:15, background:`linear-gradient(135deg, ${ind.color}, ${ind.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 8px 22px ${ind.color}38` }}>
                    <Ic n={ind.icon} s={24} style={{ color:'#fff' }} />
                  </div>
                  <span style={{ fontSize:10.5, fontWeight:800, letterSpacing:'.14em', color:'#94a3b8', fontFamily:"'JetBrains Mono', monospace" }}>0{idx + 1}</span>
                </div>

                <h3 style={{ fontSize:20, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:10, position:'relative', zIndex:1, letterSpacing:'-0.01em', lineHeight:1.2 }}>{ind.heading}</h3>
                <p style={{ fontSize:13.5, color:'#475569', lineHeight:1.6, marginBottom:18, position:'relative', zIndex:1 }}>{ind.desc}</p>

                <div style={{ flex:1, display:'flex', flexDirection:'column', gap:9, marginBottom:18, position:'relative', zIndex:1 }}>
                  {ind.items.map((it, i) => (
                    <div key={it.slug} style={{ display:'flex', alignItems:'center', gap:10, fontSize:12.5, color:'#0a0a14', fontWeight:600, lineHeight:1.35 }}>
                      <span style={{ width:5, height:5, borderRadius:'50%', background:ind.color, flexShrink:0, opacity:0.9 - (i * 0.15) }} />
                      {it.t}
                    </div>
                  ))}
                </div>

                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative', zIndex:1, paddingTop:14, borderTop:`1px solid ${ind.color}15` }}>
                  <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'6px 13px', borderRadius:50, background:`${ind.color}12`, fontSize:12, fontWeight:700, color:ind.color }}>
                    <span style={{ width:5, height:5, borderRadius:'50%', background:ind.color }} />
                    {ind.items.length} solutions
                  </span>
                  <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:32, height:32, borderRadius:'50%', background:`${ind.color}12` }}>
                    <Ic n="Arrow" s={14} style={{ color:ind.color }} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         4.  WHY DEVINSTRATUS FOR YOUR INDUSTRY
         ════════════════════════════════════════════════════ */}
      <section className="iip-section" style={{ padding:'100px 32px', background:'linear-gradient(180deg, #f8fafc 0%, #f0f7ff 100%)' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:56, maxWidth:760, margin:'0 auto 56px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#0066FF15', border:'1px solid #0066FF30', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              WHY DEVINSTRATUS
            </div>
            <h2 style={{ fontSize:'clamp(28px, 4vw, 40px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14, lineHeight:1.15 }}>
              The partner enterprises in your sector choose
            </h2>
            <p style={{ fontSize:16, color:'#475569', lineHeight:1.7 }}>
              Generalist consultancies don't know your sector. Boutique sector specialists don't have Microsoft depth. We have both — a Microsoft-certified engineering team and deep sector expertise.
            </p>
          </div>

          <div className="rv iip-why-g" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20 }}>
            {[
              { icon:'Brain',  accent:'#0066FF', title:'Sector-fluent architects', desc:'Solution architects with prior experience in your industry. We speak your language — MES, HL7, FINREP, SLAs — not generic IT-consultant jargon.' },
              { icon:'Shield', accent:'#003FB3', title:'Compliance built-in', desc:'HIPAA, FCA, ISO 9001, SOC2, GDPR, PCI — we design for your regulators from day one, with full audit documentation.' },
              { icon:'Layers', accent:'#06b6d4', title:'Industry integrations',  desc:"We integrate with Epic, Cerner, Aderant, Wonderware, Manhattan, D365 — the systems specific to your sector. No \"we'll figure it out\" approach." },
              { icon:'Award',  accent:'#0EA5E9', title:'Reference clients',     desc:'Reference clients in your industry, willing to talk to you. Real outcomes, real numbers, real challenges they overcame with us.' },
            ].map((item,i) => (
              <div key={i} style={{ padding:'30px 26px', borderRadius:20, background:'#fff', border:'1px solid #e2e8f0', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:-50, right:-50, width:160, height:160, borderRadius:'50%', background:`radial-gradient(circle, ${item.accent}15, transparent 70%)`, pointerEvents:'none' }}/>
                <div style={{ width:50, height:50, borderRadius:14, background:`linear-gradient(135deg, ${item.accent}, ${item.accent}cc)`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18, boxShadow:`0 8px 22px ${item.accent}30`, position:'relative', zIndex:1 }}>
                  <Ic n={item.icon} s={22} style={{ color:'#fff' }}/>
                </div>
                <h3 style={{ fontSize:17, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:10, letterSpacing:'-0.01em', position:'relative', zIndex:1 }}>{item.title}</h3>
                <p style={{ fontSize:13.5, color:'#475569', lineHeight:1.65, position:'relative', zIndex:1 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         5.  COMPLIANCE FRAMEWORKS WE OPERATE UNDER
         ════════════════════════════════════════════════════ */}
      <section className="iip-regs-section" style={{ padding:'80px 32px', background:'#fff', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, right:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.10), transparent 70%)', filter:'blur(50px)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:1180, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:36, maxWidth:760, margin:'0 auto 36px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#06b6d418', border:'1px solid #06b6d440', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              <Ic n="Shield" s={13} style={{ color:'#06b6d4' }}/>
              COMPLIANCE & REGULATIONS
            </div>
            <h2 style={{ fontSize:'clamp(24px, 3.4vw, 32px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:12, lineHeight:1.2 }}>
              Frameworks we deliver under
            </h2>
            <p style={{ fontSize:15, color:'#475569', lineHeight:1.7 }}>
              Every implementation designed to pass auditors on day one. Compliance isn't an afterthought — it's architecture.
            </p>
          </div>

          <div className="rv" style={{ display:'flex', flexWrap:'wrap', gap:10, justifyContent:'center' }}>
            {allRegs.map((reg, i) => (
              <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'9px 18px', borderRadius:50, background:'linear-gradient(135deg, #f8fafc, #f0f7ff)', border:'1px solid #0066FF22', fontSize:13, fontWeight:700, color:'#003FB3' }}>
                <Ic n="CheckCircle" s={13} style={{ color:'#06b6d4' }}/>
                {reg}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         6.  FAQ
         ════════════════════════════════════════════════════ */}
      <section className="iip-section" style={{ padding:'100px 32px', background:'#f8fafc' }}>
        <div style={{ maxWidth:880, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#06b6d418', border:'1px solid #06b6d440', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              FREQUENTLY ASKED
            </div>
            <h2 style={{ fontSize:'clamp(28px, 4vw, 38px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14, lineHeight:1.15 }}>
              How industry engagements work
            </h2>
            <p style={{ fontSize:15.5, color:'#475569', lineHeight:1.7 }}>
              The questions sector leaders ask before engaging.
            </p>
          </div>

          <div className="rv">
            {[
              { q:"Do you have prior experience in our specific sector?",
                a:"We bring deep Microsoft platform expertise and sector-specific solution design. We're happy to walk through our approach and relevant work during the discovery stage — before any commitment." },
              { q:"How do you handle our specific compliance regime?",
                a:"Compliance is designed in from day one, not bolted on. Our solution architects work directly with your compliance team during Discovery. We deliver to FCA, PRA, HIPAA, GDPR, ISO 9001, SOC2, PCI, FDA Part 11, and more — with full audit documentation for your regulators." },
              { q:"Will the solution integrate with our existing industry systems?",
                a:"Yes — our solutions sit on top of and integrate with your existing operational systems (Epic, Cerner, Aderant, Wonderware, Manhattan, etc). We don't rip and replace what works; we orchestrate, modernise interfaces, and add Microsoft-native capabilities around your existing estate." },
              { q:"What about multi-country, multi-currency, multi-entity rollouts?",
                a:"Our solutions are built for multi-country, multi-entity rollouts — handling localisation, regulatory variation, currency, and language within a single solution. Most enterprise rollouts span 8–24 weeks depending on number of sites and complexity." },
              { q:"How long until we see industry-relevant ROI?",
                a:"Most industry implementations have measurable ROI within 6–9 months. Workflow automation and approval projects pay back in 4–6 months. Larger initiatives (full warehouse management, clinical workflow transformation) reach ROI in 12–18 months but deliver multi-year TCO impact." },
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
         7.  FINAL CTA
         ════════════════════════════════════════════════════ */}
      <section className="iip-cta-section" style={{ padding:'100px 32px', background:'linear-gradient(135deg, #003FB3 0%, #0066FF 60%, #06b6d4 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-100, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:880, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.30)', borderRadius:50, padding:'7px 16px', fontSize:11.5, fontWeight:800, color:'#fff', letterSpacing:'.14em', marginBottom:24, backdropFilter:'blur(10px)' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#67e8f9' }}/>
            READY WHEN YOU ARE
          </div>

          <h2 style={{ fontSize:'clamp(30px, 4.5vw, 46px)', fontWeight:900, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:18, lineHeight:1.1, letterSpacing:'-0.02em' }}>
            What's the biggest operational pain in your sector?
          </h2>
          <p style={{ fontSize:17, color:'rgba(255,255,255,0.85)', marginBottom:36, lineHeight:1.7, maxWidth:680, margin:'0 auto 36px' }}>
            30 minutes with a sector-experienced Solution Architect. No sales pitch. We'll discuss your specific operational challenges, regulatory constraints, and existing system landscape — and tell you honestly what we'd recommend.
          </p>

          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <Btn onClick={openConsult} style={{ background:'#fff', color:'#003FB3' }}>
              Book Industry Architect Call <Ic n="Arrow" s={14} style={{ color:'#003FB3' }}/>
            </Btn>
            <Btn variant="ghost" onClick={() => navigate('/solutions')} style={{ borderColor:'rgba(255,255,255,0.4)', color:'#fff' }}>
              Browse All Solutions
            </Btn>
          </div>
        </div>
      </section>

    </div>
  )
}
