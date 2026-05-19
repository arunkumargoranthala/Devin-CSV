import { useEffect, useState } from 'react'
import { C, Ic, Btn } from '../components/ui'
import { INDUSTRIES } from '../data/industries'
import { SOLUTIONS } from '../data/content'

/* ════════════════════════════════════════════════════════════════════════════
 *  IndustryPage — mounted at /industry/:industrySlug/:itemSlug
 *  ────────────────────────────────────────────────────────────────────────────
 *  Full-depth industry-specific deliverable page. Renders EVERY field:
 *
 *  1.  Hero          (light Global-Offices recipe + key results card)
 *  2.  Challenges    (4 industry pain points this addresses)
 *  3.  Approach      (4 capability blocks — how we solve it)
 *  4.  Features      (6-8 deliverables — what's included)
 *  5.  MS stack      (Microsoft products powering this)
 *  6.  Process       (5-step delivery timeline)
 *  7.  Outcomes      (concrete client case study line — INDUSTRY-ONLY)
 *  8.  Related Solutions (cross-linked to SOLUTIONS catalogue — INDUSTRY-ONLY)
 *  9.  FAQ           (3 expandable questions)
 *  10. CTA           (brand-blue gradient final call)
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

/* Look up a solution by its slug across all categories */
function findSolution(slug) {
  for (const cat of SOLUTIONS) {
    const item = cat.items.find(i => i.slug === slug)
    if (item) return { ...item, category: cat }
  }
  return null
}

export default function IndustryPage({ industrySlug, itemSlug, navigate, openConsult }) {
  const [openFaq, setOpenFaq] = useState(null)
  useReveal()
  useEffect(() => { window.scrollTo(0,0) }, [industrySlug, itemSlug])

  const industry = INDUSTRIES.find(i => i.slug === industrySlug)
  const item     = industry?.items.find(i => i.slug === itemSlug)
  if (!industry || !item) return (
    <div style={{ paddingTop:120, textAlign:'center', minHeight:'60vh' }}>
      <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Solution not found</h2>
      <button onClick={() => navigate('/industries')} style={{ marginTop:20, color:C.blue, background:'none', border:'none', cursor:'pointer', fontSize:15 }}>← All industries</button>
    </div>
  )

  /* Resolve cross-linked Microsoft Solutions */
  const relatedMSSolutions = (item.relatedSolutions || [])
    .map(slug => findSolution(slug))
    .filter(Boolean)

  return (
    <div className="page-fade" style={{ overflowX:'hidden', maxWidth:'100vw' }}>

      {/* ─── Page-specific responsive CSS ─────────────────── */}
      <style dangerouslySetInnerHTML={{__html:`
        .ip-section { position: relative; }
        .ip-eyebrow { display:inline-flex; align-items:center; gap:8px; border-radius:50px; padding:6px 14px; font-size:11.5px; font-weight:800; letter-spacing:.14em; margin-bottom:16px; }
        .ip-h2 { font-size: clamp(26px, 3.6vw, 38px); font-weight:800; color:#0a0a14; font-family:'Plus Jakarta Sans',sans-serif; margin-bottom:14px; line-height:1.2; letter-spacing:-0.01em; }
        .ip-lead { font-size:15.5px; color:#475569; line-height:1.75; }
        .ip-section-head { max-width:760px; margin:0 auto 48px; text-align:center; }

        @media (max-width: 1023px) {
          .ip-hero-g { grid-template-columns: 1fr !important; gap: 36px !important; padding-bottom: 56px !important; }
          .ip-stats-card { max-width: 540px; margin: 0 auto; }
        }
        @media (max-width: 767px) {
          .ip-hero-wrap { padding: 32px 18px 0 !important; }
          .ip-hero-g { padding-bottom: 48px !important; }
          .ip-hero-g h1 { font-size: clamp(28px, 6.5vw, 40px) !important; }
          .ip-stats-card { padding: 22px !important; }
        }
        @media (max-width: 480px) {
          .ip-hero-g h1 { font-size: clamp(26px, 8vw, 34px) !important; }
        }

        @media (max-width: 767px) {
          .ip-challenges-g, .ip-approach-g { grid-template-columns: 1fr !important; gap: 14px !important; }
        }

        @media (max-width: 767px) {
          .ip-features-g { grid-template-columns: 1fr !important; gap: 12px !important; }
        }

        @media (max-width: 1023px) {
          .ip-stack-g { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .ip-stack-g { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
        @media (max-width: 380px) {
          .ip-stack-g { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 1023px) {
          .ip-process-g { grid-template-columns: repeat(3, 1fr) !important; gap: 14px !important; }
          .ip-process-line { display: none !important; }
        }
        @media (max-width: 767px) {
          .ip-process-g { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .ip-process-g { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 900px) {
          .ip-rel-g { grid-template-columns: 1fr !important; gap: 14px !important; }
        }

        @media (max-width: 767px) {
          .ip-section { padding-top: 60px !important; padding-bottom: 40px !important; padding-left: 18px !important; padding-right: 18px !important; }
          .ip-section-head { margin-bottom: 32px !important; }
          .ip-outcomes-section { padding: 56px 20px !important; }
          .ip-cta-section { padding: 72px 20px !important; }
          .ip-cta-section h2 { font-size: clamp(24px, 6vw, 36px) !important; }
          .ip-cta-buttons { width: 100%; flex-direction: column !important; align-items: stretch !important; }
          .ip-cta-buttons > * { width: 100%; justify-content: center; }
        }

        .ip-card { transition: all .22s cubic-bezier(.22,1,.36,1); }
        .ip-card:hover { transform: translateY(-3px); }
      `}}/>


      {/* ════════════════════════════════════════════════════
         1.  HERO
         ════════════════════════════════════════════════════ */}
      <section style={{
        paddingTop:68, position:'relative', overflow:'hidden',
        background: `
          radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.35), transparent 55%),
          radial-gradient(circle at 80% 70%, rgba(0, 102, 255, 0.20), transparent 60%),
          linear-gradient(135deg, #ffffff 0%, #f0f7ff 25%, #d6ebff 55%, #b8defa 80%, #9bd3f5 100%)
        `
      }}>
        <div style={{ position:'absolute', top:-100, right:-80, width:380, height:380, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.32), transparent 70%)', filter:'blur(48px)', animation:'heroFloat 9s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,102,255,0.20), transparent 70%)', filter:'blur(56px)', animation:'heroFloat 7s ease-in-out infinite reverse', pointerEvents:'none' }} />

        <div className="ip-hero-wrap" style={{ maxWidth:1280, margin:'0 auto', padding:'48px 24px 0', position:'relative', zIndex:1 }}>
          {/* Breadcrumb */}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:28, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Home</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <button onClick={() => navigate('/industries')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Industries</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <button onClick={() => navigate(`/industries/${industry.slug}`)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>{industry.heading}</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <span style={{ fontSize:13, color:'#0a0a14', fontWeight:600 }}>{item.t}</span>
          </div>

          <div className="ip-hero-g" style={{ display:'grid', gridTemplateColumns:'1fr 420px', gap:56, alignItems:'center', paddingBottom:72 }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${industry.color}18`, border:`1px solid ${industry.color}40`, borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:800, color:industry.color, marginBottom:22, letterSpacing:'.04em' }}>
                <Ic n={industry.icon} s={13} style={{ color:industry.color }}/>
                {industry.heading.toUpperCase()}
                {item.tag && <span style={{ background:'#06b6d4', color:'#fff', borderRadius:50, padding:'2px 9px', fontSize:10, fontWeight:800, marginLeft:6, letterSpacing:'.04em' }}>{item.tag.toUpperCase()}</span>}
              </div>
              <h1 style={{ fontSize:'clamp(32px,5vw,52px)', fontWeight:900, color:'#0a0a14', lineHeight:1.08, marginBottom:20, fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:'-0.02em' }}>
                {item.t}
              </h1>
              <p style={{ fontSize:17, color:'#334155', lineHeight:1.75, marginBottom:36, maxWidth:560 }}>
                {item.hero}
              </p>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <Btn onClick={openConsult}>Talk to a {industry.heading} Architect <Ic n="Arrow" s={14} style={{ color:'#fff' }}/></Btn>
                <button onClick={() => navigate(`/industries/${industry.slug}`)}
                  style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 26px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1.5px solid rgba(0,102,255,0.30)', backdropFilter:'blur(10px)', cursor:'pointer', fontSize:15, fontWeight:700, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                  View all {industry.heading} <Ic n="ChevR" s={13} style={{ color:'#0066FF' }}/>
                </button>
              </div>
            </div>

            {/* Stats card */}
            <div className="ip-stats-card" style={{ background:'rgba(255,255,255,0.65)', border:'1.5px solid rgba(0,102,255,0.18)', borderRadius:24, padding:28, backdropFilter:'blur(14px)', boxShadow:'0 14px 36px rgba(0,53,128,0.10)' }}>
              <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:industry.color, marginBottom:18 }}>KEY RESULTS</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:18 }}>
                {(item.benefits||[]).map((b,i) => (
                  <div key={i} style={{ background: i===0 ? industry.color+'18' : 'rgba(255,255,255,0.85)', borderRadius:14, padding:'16px 14px', border:`1px solid ${i===0?industry.color+'40':'rgba(0,102,255,0.10)'}` }}>
                    <div style={{ fontSize:24, fontWeight:900, color: i===0 ? industry.color : '#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1 }}>
                      {b.v}<span style={{ fontSize:12 }}>{b.u}</span>
                    </div>
                    <div style={{ fontSize:11, color:'#475569', marginTop:6, lineHeight:1.3 }}>{b.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:industry.color+'12', border:`1px solid ${industry.color}28`, borderRadius:12, padding:'13px 16px', display:'flex', alignItems:'center', gap:10 }}>
                <Ic n="Shield" s={18} style={{ color:industry.color, flexShrink:0 }}/>
                <div style={{ fontSize:12.5, color:industry.color, fontWeight:700, lineHeight:1.4 }}>
                  {industry.heading} compliance built in
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         2.  CHALLENGES — sector pain points this solves
         ════════════════════════════════════════════════════ */}
      {item.challenges && item.challenges.length > 0 && (
        <section className="ip-section" style={{ padding:'90px 32px', background:'#fff' }}>
          <div style={{ maxWidth:1180, margin:'0 auto' }}>
            <div className="rv ip-section-head">
              <div className="ip-eyebrow" style={{ background:`${industry.color}15`, border:`1px solid ${industry.color}30`, color:industry.color }}>
                THE CHALLENGES
              </div>
              <h2 className="ip-h2">What we hear from {industry.heading.toLowerCase()} leaders</h2>
              <p className="ip-lead">These are the specific pain points {item.t.toLowerCase()} addresses — direct from clients in your sector.</p>
            </div>

            <div className="rv ip-challenges-g" style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:18 }}>
              {item.challenges.map((challenge, i) => (
                <div key={i} className="ip-card" style={{ padding:'24px 26px', borderRadius:16, background:'linear-gradient(180deg, #f8fafc 0%, #f0f7ff 100%)', border:`1px solid ${industry.color}20`, position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', left:0, top:0, bottom:0, width:4, background:`linear-gradient(180deg, ${industry.color}, ${industry.color}55)` }}/>
                  <div style={{ display:'flex', alignItems:'flex-start', gap:14, marginLeft:10 }}>
                    <div style={{ width:38, height:38, borderRadius:11, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:`1px solid ${industry.color}30` }}>
                      <Ic n="Target" s={17} style={{ color:industry.color }}/>
                    </div>
                    <p style={{ fontSize:14.5, color:'#0a0a14', lineHeight:1.6, fontWeight:500, paddingTop:6 }}>{challenge}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ════════════════════════════════════════════════════
         3.  APPROACH — how we solve it (4 capability blocks)
         ════════════════════════════════════════════════════ */}
      {item.approach && item.approach.length > 0 && (
        <section className="ip-section" style={{ padding:'90px 32px', background:'#f8fafc', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-80, right:-60, width:300, height:300, borderRadius:'50%', background:`radial-gradient(circle, ${industry.color}10, transparent 70%)`, filter:'blur(50px)', pointerEvents:'none' }}/>
          <div style={{ maxWidth:1180, margin:'0 auto', position:'relative', zIndex:1 }}>
            <div className="rv ip-section-head">
              <div className="ip-eyebrow" style={{ background:`${industry.color}15`, border:`1px solid ${industry.color}30`, color:industry.color }}>
                OUR APPROACH
              </div>
              <h2 className="ip-h2">How we solve it for {industry.heading.toLowerCase()}</h2>
              <p className="ip-lead">{item.approach.length} capability blocks — each one a defined, measurable, deliverable outcome.</p>
            </div>

            <div className="rv ip-approach-g" style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:18 }}>
              {item.approach.map((cap,i) => (
                <div key={i} className="ip-card" style={{ padding:'30px 28px', borderRadius:20, background:'#fff', border:'1px solid #e2e8f0', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${industry.color}, ${industry.color}55)` }}/>
                  <div style={{ position:'absolute', top:-40, right:-40, width:140, height:140, borderRadius:'50%', background:`radial-gradient(circle, ${industry.color}15, transparent 70%)`, pointerEvents:'none' }}/>

                  <div style={{ display:'flex', gap:18, alignItems:'flex-start', position:'relative', zIndex:1 }}>
                    <div style={{ width:52, height:52, borderRadius:14, background:`linear-gradient(135deg, ${industry.color}, ${industry.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 8px 20px ${industry.color}40` }}>
                      <Ic n={cap.n} s={24} style={{ color:'#fff' }}/>
                    </div>
                    <div>
                      <h3 style={{ fontSize:17, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, letterSpacing:'-0.005em' }}>{cap.t}</h3>
                      <p style={{ fontSize:14, color:'#475569', lineHeight:1.65 }}>{cap.d}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ════════════════════════════════════════════════════
         4.  FEATURES — what's included
         ════════════════════════════════════════════════════ */}
      {item.features && item.features.length > 0 && (
        <section className="ip-section" style={{ padding:'90px 32px', background:'#fff' }}>
          <div style={{ maxWidth:1180, margin:'0 auto' }}>
            <div className="rv ip-section-head">
              <div className="ip-eyebrow" style={{ background:`${industry.color}15`, border:`1px solid ${industry.color}30`, color:industry.color }}>
                WHAT'S INCLUDED
              </div>
              <h2 className="ip-h2">Everything in the engagement</h2>
              <p className="ip-lead">{item.features.length} deliverables — fully scoped, fixed-price, ready to begin.</p>
            </div>

            <div className="rv ip-features-g" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, maxWidth:980, margin:'0 auto' }}>
              {item.features.map((f,i) => (
                <div key={i} className="ip-card" style={{ display:'flex', alignItems:'flex-start', gap:14, padding:'18px 20px', borderRadius:14, background:'#fff', border:'1px solid #e2e8f0' }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:industry.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Ic n="CheckCircle" s={16} style={{ color:industry.color }}/>
                  </div>
                  <div style={{ fontSize:14.5, color:'#0a0a14', lineHeight:1.55, paddingTop:6, fontWeight:500 }}>{f}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ════════════════════════════════════════════════════
         5.  MICROSOFT TECH STACK
         ════════════════════════════════════════════════════ */}
      {item.microsoftStack && item.microsoftStack.length > 0 && (
        <section className="ip-section" style={{ padding:'90px 32px', position:'relative', overflow:'hidden', background:'linear-gradient(180deg, #f0f7ff 0%, #ecfeff 100%)' }}>
          <div style={{ position:'absolute', top:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.18), transparent 70%)', filter:'blur(50px)', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', bottom:-80, right:-60, width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,102,255,0.12), transparent 70%)', filter:'blur(50px)', pointerEvents:'none' }}/>

          <div style={{ maxWidth:1180, margin:'0 auto', position:'relative', zIndex:1 }}>
            <div className="rv ip-section-head">
              <div className="ip-eyebrow" style={{ background:'rgba(0,102,255,0.10)', border:'1px solid rgba(0,102,255,0.25)', color:'#003FB3' }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:'#0066FF' }}/>
                BUILT ON MICROSOFT
              </div>
              <h2 className="ip-h2">Powered by the Microsoft enterprise stack</h2>
              <p className="ip-lead">Native Microsoft technologies — secure, scalable, fully governed under your Azure tenant.</p>
            </div>

            <div className="rv ip-stack-g" style={{ display:'grid', gridTemplateColumns:`repeat(${item.microsoftStack.length}, 1fr)`, gap:14, maxWidth:1100, margin:'0 auto' }}>
              {item.microsoftStack.map((tech,i) => (
                <div key={i} className="ip-card" style={{ padding:'22px 18px', borderRadius:16, background:'rgba(255,255,255,0.75)', border:'1px solid rgba(0,102,255,0.18)', backdropFilter:'blur(10px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg, #0066FF, #06b6d4)' }}/>
                  <div style={{ width:44, height:44, borderRadius:12, background:'linear-gradient(135deg, #0066FF, #003FB3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px', boxShadow:'0 6px 18px rgba(0,102,255,0.30)' }}>
                    <Ic n="Cpu" s={20} style={{ color:'#fff' }}/>
                  </div>
                  <div style={{ fontSize:13, fontWeight:800, color:'#003FB3', fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1.35, letterSpacing:'-0.005em' }}>{tech}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ════════════════════════════════════════════════════
         6.  HOW WE DELIVER — process timeline
         ════════════════════════════════════════════════════ */}
      {item.process && item.process.length > 0 && (
        <section className="ip-section" style={{ padding:'90px 32px', background:'#fff' }}>
          <div style={{ maxWidth:1280, margin:'0 auto' }}>
            <div className="rv ip-section-head">
              <div className="ip-eyebrow" style={{ background:`${industry.color}15`, border:`1px solid ${industry.color}30`, color:industry.color }}>
                HOW WE DELIVER
              </div>
              <h2 className="ip-h2">From discovery to operational excellence</h2>
              <p className="ip-lead">Fixed-price scope before commitment. Weekly demos. Quality gates at every phase.</p>
            </div>

            <div className="rv ip-process-g" style={{ display:'grid', gridTemplateColumns:`repeat(${item.process.length}, 1fr)`, gap:18, position:'relative' }}>
              <div className="ip-process-line" style={{ position:'absolute', top:32, left:'8%', right:'8%', height:2, background:`linear-gradient(90deg, ${industry.color}22 0%, ${industry.color}66 50%, ${industry.color}22 100%)`, zIndex:0 }}/>

              {item.process.map((step,i) => (
                <div key={i} style={{ position:'relative', zIndex:1, padding:'28px 18px 22px', borderRadius:16, background:'linear-gradient(180deg, #ffffff, #fafcff)', border:`1px solid ${industry.color}20`, boxShadow:'0 1px 3px rgba(0,53,128,0.04)' }}>
                  <div style={{ width:48, height:48, borderRadius:'50%', background:`linear-gradient(135deg, ${industry.color}, ${industry.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', boxShadow:`0 8px 20px ${industry.color}40`, color:'#fff', fontWeight:900, fontSize:18, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize:13, color:'#334155', lineHeight:1.6, textAlign:'center', fontWeight:500 }}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ════════════════════════════════════════════════════
         7.  OUTCOMES — concrete client case study line
         ════════════════════════════════════════════════════ */}
      {item.outcomes && (
        <section className="ip-outcomes-section" style={{ padding:'70px 32px', background:'linear-gradient(135deg, #003FB3 0%, #0066FF 60%, #06b6d4 100%)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-80, right:-60, width:320, height:320, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', bottom:-60, left:-40, width:240, height:240, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.20), transparent 70%)', pointerEvents:'none' }}/>

          <div className="rv" style={{ maxWidth:980, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.18)', border:'1px solid rgba(255,255,255,0.30)', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#fff', letterSpacing:'.14em', marginBottom:20, backdropFilter:'blur(10px)' }}>
              <Ic n="Award" s={13} style={{ color:'#67e8f9' }}/>
              CLIENT OUTCOMES
            </div>
            <p style={{ fontSize:'clamp(20px, 2.6vw, 26px)', color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, lineHeight:1.45, letterSpacing:'-0.005em' }}>
              "{item.outcomes}"
            </p>
          </div>
        </section>
      )}


      {/* ════════════════════════════════════════════════════
         8.  RELATED MICROSOFT SOLUTIONS — cross-linking
         ════════════════════════════════════════════════════ */}
      {relatedMSSolutions.length > 0 && (
        <section className="ip-section" style={{ padding:'90px 32px', background:'#f8fafc' }}>
          <div style={{ maxWidth:1180, margin:'0 auto' }}>
            <div className="rv ip-section-head">
              <div className="ip-eyebrow" style={{ background:'rgba(0,102,255,0.10)', border:'1px solid rgba(0,102,255,0.25)', color:'#003FB3' }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:'#0066FF' }}/>
                BACKED BY MICROSOFT SOLUTIONS
              </div>
              <h2 className="ip-h2">The underlying capabilities powering this</h2>
              <p className="ip-lead">{item.t} is delivered using these proven Microsoft solution capabilities from our catalogue.</p>
            </div>

            <div className="rv ip-rel-g" style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min(relatedMSSolutions.length, 3)}, 1fr)`, gap:18 }}>
              {relatedMSSolutions.map((sol, i) => (
                <button key={sol.slug} onClick={() => navigate(`/solution/${sol.category.slug}/${sol.slug}`)}
                  className="ip-card"
                  style={{ display:'flex', flexDirection:'column', padding:'24px 22px 20px', borderRadius:18, background:'#fff', border:'1px solid #e2e8f0', cursor:'pointer', textAlign:'left', position:'relative', overflow:'hidden' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=sol.category.color+'55'; e.currentTarget.style.boxShadow=`0 14px 32px ${sol.category.color}1f` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.boxShadow='none' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${sol.category.color}, ${sol.category.color}55)` }} />

                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:`linear-gradient(135deg, ${sol.category.color}, ${sol.category.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 6px 16px ${sol.category.color}38` }}>
                      <Ic n={sol.n} s={20} style={{ color:'#fff' }}/>
                    </div>
                    <span style={{ fontSize:10.5, fontWeight:800, color:sol.category.color, letterSpacing:'.08em' }}>{sol.category.heading.replace(' Solutions','').toUpperCase()}</span>
                  </div>

                  <h4 style={{ fontSize:16, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, letterSpacing:'-0.005em', lineHeight:1.3 }}>{sol.t}</h4>
                  <p style={{ fontSize:13, color:'#475569', lineHeight:1.6, marginBottom:14, flex:1 }}>{sol.d}</p>

                  <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12.5, fontWeight:700, color:sol.category.color, paddingTop:12, borderTop:`1px solid ${sol.category.color}15` }}>
                    Explore solution <Ic n="Arrow" s={13} style={{ color:sol.category.color }}/>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ════════════════════════════════════════════════════
         9.  FAQ
         ════════════════════════════════════════════════════ */}
      {item.faq && item.faq.length > 0 && (
        <section className="ip-section" style={{ padding:'90px 32px', background:'#fff' }}>
          <div style={{ maxWidth:880, margin:'0 auto' }}>
            <div className="rv ip-section-head">
              <div className="ip-eyebrow" style={{ background:'#06b6d418', border:'1px solid #06b6d440', color:'#003FB3' }}>
                FREQUENTLY ASKED
              </div>
              <h2 className="ip-h2">Common questions about {item.t}</h2>
            </div>

            <div className="rv">
              {item.faq.map((f, i) => (
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
      )}


      {/* ════════════════════════════════════════════════════
         10.  FINAL CTA
         ════════════════════════════════════════════════════ */}
      <section className="ip-cta-section" style={{ padding:'90px 32px', background:'linear-gradient(135deg, #003FB3 0%, #0066FF 60%, #06b6d4 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-100, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:880, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.30)', borderRadius:50, padding:'7px 16px', fontSize:11.5, fontWeight:800, color:'#fff', letterSpacing:'.14em', marginBottom:22, backdropFilter:'blur(10px)' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#67e8f9' }}/>
            READY TO START?
          </div>
          <h2 style={{ fontSize:'clamp(28px, 4.5vw, 42px)', fontWeight:900, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:16, lineHeight:1.15, letterSpacing:'-0.02em' }}>
            Let's talk about {item.t}.
          </h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.85)', marginBottom:32, lineHeight:1.7, maxWidth:680, margin:'0 auto 32px' }}>
            30-minute call with a Solution Architect who has implemented this exact solution for {industry.heading.toLowerCase()} clients. We'll map your specific scenario and give you a fixed-price scope before any commitment.
          </p>
          <div className="ip-cta-buttons" style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Btn onClick={openConsult} style={{ background:'#fff', color:'#003FB3' }}>Book {industry.heading} Architect Call <Ic n="Arrow" s={14} style={{ color:'#003FB3' }}/></Btn>
            <Btn variant="ghost" onClick={() => navigate(`/industries/${industry.slug}`)} style={{ borderColor:'rgba(255,255,255,0.4)', color:'#fff' }}>View all {industry.heading}</Btn>
          </div>
        </div>
      </section>

    </div>
  )
}
