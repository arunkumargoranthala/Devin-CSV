import { useEffect, useState } from 'react'
import { C, Ic, Btn } from '../components/ui'
import { SOLUTIONS } from '../data/content'

/* ════════════════════════════════════════════════════════════════════════════
 *  SolutionPage — mounted at /solution/:categorySlug/:itemSlug
 *  ────────────────────────────────────────────────────────────────────────────
 *  Full-depth enterprise solution page. Renders EVERY field from content.js:
 *
 *  1.  Hero          (light Global-Offices recipe + benefits card)
 *  2.  Problem       (the pain this solves — quote-style)
 *  3.  Capabilities  (4 capability blocks — what we build)
 *  4.  Features      (6-8 deliverables — what's included)
 *  5.  MS stack      (Microsoft products powering this)
 *  6.  Process       (5-step "how we deliver" timeline)
 *  7.  ROI           (concrete ROI statement)
 *  8.  Use cases     (4 "who is this for" + related solutions)
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

export default function SolutionPage({ categorySlug, itemSlug, navigate, openConsult }) {
  const [openFaq, setOpenFaq] = useState(null)
  useReveal()
  useEffect(() => { window.scrollTo(0,0) }, [categorySlug, itemSlug])

  const category = SOLUTIONS.find(s => s.slug === categorySlug)
  const item     = category?.items.find(i => i.slug === itemSlug)
  if (!category || !item) return (
    <div style={{ paddingTop:120, textAlign:'center', minHeight:'60vh' }}>
      <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Solution not found</h2>
      <button onClick={() => navigate('/')} style={{ marginTop:20, color:C.blue, background:'none', border:'none', cursor:'pointer', fontSize:15 }}>← Back to home</button>
    </div>
  )

  /* Related solutions = other items in the same category */
  const related = category.items.filter(it => it.slug !== itemSlug).slice(0, 5)

  return (
    <div className="page-fade" style={{ overflowX:'hidden', maxWidth:'100vw' }}>

      {/* ─── Page-specific responsive CSS ─────────────────── */}
      <style dangerouslySetInnerHTML={{__html:`
        .sp-section { position: relative; }
        .sp-eyebrow { display:inline-flex; align-items:center; gap:8px; border-radius:50px; padding:6px 14px; font-size:11.5px; font-weight:800; letter-spacing:.14em; margin-bottom:16px; }
        .sp-h2 { font-size: clamp(26px, 3.6vw, 38px); font-weight:800; color:#0a0a14; font-family:'Plus Jakarta Sans',sans-serif; margin-bottom:14px; line-height:1.2; letter-spacing:-0.01em; }
        .sp-lead { font-size:15.5px; color:#475569; line-height:1.75; }
        .sp-section-head { max-width:760px; margin:0 auto 48px; text-align:center; }

        /* Hero */
        @media (max-width: 1023px) {
          .sp-hero-g { grid-template-columns: 1fr !important; gap: 36px !important; padding-bottom: 56px !important; }
          .sp-stats-card { max-width: 540px; margin: 0 auto; }
        }
        @media (max-width: 767px) {
          .sp-hero-wrap { padding: 32px 18px 0 !important; }
          .sp-hero-g { padding-bottom: 48px !important; }
          .sp-hero-g h1 { font-size: clamp(28px, 6.5vw, 40px) !important; }
          .sp-stats-card { padding: 22px !important; }
        }
        @media (max-width: 480px) {
          .sp-hero-g h1 { font-size: clamp(26px, 8vw, 34px) !important; }
        }

        /* Capabilities grid 2x2 → 1 col */
        @media (max-width: 767px) {
          .sp-caps-g { grid-template-columns: 1fr !important; gap: 14px !important; }
        }

        /* Features 2-col → 1 col */
        @media (max-width: 767px) {
          .sp-features-g { grid-template-columns: 1fr !important; gap: 12px !important; }
        }

        /* MS stack — 5 cols → 3 → 2 → 1 */
        @media (max-width: 1023px) {
          .sp-stack-g { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .sp-stack-g { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
        @media (max-width: 380px) {
          .sp-stack-g { grid-template-columns: 1fr !important; }
        }

        /* Process: 5 → 3 → 2 → 1 */
        @media (max-width: 1023px) {
          .sp-process-g { grid-template-columns: repeat(3, 1fr) !important; gap: 14px !important; }
          .sp-process-line { display: none !important; }
        }
        @media (max-width: 767px) {
          .sp-process-g { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .sp-process-g { grid-template-columns: 1fr !important; }
        }

        /* Use cases + Related: 1fr 1fr → stack */
        @media (max-width: 900px) {
          .sp-uc-g { grid-template-columns: 1fr !important; gap: 40px !important; }
        }

        /* All sections — reduce padding on mobile */
        @media (max-width: 767px) {
          .sp-section { padding-top: 60px !important; padding-bottom: 40px !important; padding-left: 18px !important; padding-right: 18px !important; }
          .sp-section-head { margin-bottom: 32px !important; }
          .sp-roi-section { padding: 56px 20px !important; }
          .sp-cta-section { padding: 72px 20px !important; }
          .sp-cta-section h2 { font-size: clamp(24px, 6vw, 36px) !important; }
          .sp-cta-buttons { width: 100%; flex-direction: column !important; align-items: stretch !important; }
          .sp-cta-buttons > * { width: 100%; justify-content: center; }
        }

        /* Card hover micro-interactions */
        .sp-cap-card, .sp-feat-card, .sp-stack-card, .sp-rel-card { transition: all .22s cubic-bezier(.22,1,.36,1); }
        .sp-cap-card:hover, .sp-feat-card:hover, .sp-stack-card:hover { transform: translateY(-3px); }
      `}}/>


      {/* ════════════════════════════════════════════════════
         1.  HERO  — light Global-Offices recipe
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

        <div className="sp-hero-wrap" style={{ maxWidth:1280, margin:'0 auto', padding:'48px 24px 0', position:'relative', zIndex:1 }}>
          {/* Breadcrumb */}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:28, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Home</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <button onClick={() => navigate('/solutions')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Solutions</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <button onClick={() => navigate(`/solutions/${category.slug}`)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>{category.heading}</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <span style={{ fontSize:13, color:'#0a0a14', fontWeight:600 }}>{item.t}</span>
          </div>

          <div className="sp-hero-g" style={{ display:'grid', gridTemplateColumns:'1fr 420px', gap:56, alignItems:'center', paddingBottom:72 }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${category.color}18`, border:`1px solid ${category.color}40`, borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:800, color:category.color, marginBottom:22, letterSpacing:'.04em' }}>
                <Ic n={category.icon} s={13} style={{ color:category.color }}/>
                {category.heading.toUpperCase()}
                {item.tag && <span style={{ background:'#06b6d4', color:'#fff', borderRadius:50, padding:'2px 9px', fontSize:10, fontWeight:800, marginLeft:6, letterSpacing:'.04em' }}>{item.tag.toUpperCase()}</span>}
              </div>
              <h1 style={{ fontSize:'clamp(32px,5vw,52px)', fontWeight:900, color:'#0a0a14', lineHeight:1.08, marginBottom:20, fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:'-0.02em' }}>
                {item.t}
              </h1>
              <p style={{ fontSize:17, color:'#334155', lineHeight:1.75, marginBottom:36, maxWidth:560 }}>
                {item.hero}
              </p>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <Btn onClick={openConsult}>Talk to a Solution Architect <Ic n="Arrow" s={14} style={{ color:'#fff' }}/></Btn>
                <button onClick={() => navigate(`/solutions/${category.slug}`)}
                  style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 26px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1.5px solid rgba(0,102,255,0.30)', backdropFilter:'blur(10px)', cursor:'pointer', fontSize:15, fontWeight:700, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                  View all {category.heading} <Ic n="ChevR" s={13} style={{ color:'#0066FF' }}/>
                </button>
              </div>
            </div>

            {/* Stats card — light glassmorphic */}
            <div className="sp-stats-card" style={{ background:'rgba(255,255,255,0.65)', border:'1.5px solid rgba(0,102,255,0.18)', borderRadius:24, padding:28, backdropFilter:'blur(14px)', boxShadow:'0 14px 36px rgba(0,53,128,0.10)' }}>
              <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:category.color, marginBottom:18 }}>KEY RESULTS</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:18 }}>
                {(item.benefits||[]).map((b,i) => (
                  <div key={i} style={{ background: i===0 ? category.color+'18' : 'rgba(255,255,255,0.85)', borderRadius:14, padding:'16px 14px', border:`1px solid ${i===0?category.color+'40':'rgba(0,102,255,0.10)'}` }}>
                    <div style={{ fontSize:26, fontWeight:900, color: i===0 ? category.color : '#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1 }}>
                      {b.v}<span style={{ fontSize:13 }}>{b.u}</span>
                    </div>
                    <div style={{ fontSize:11.5, color:'#475569', marginTop:6, lineHeight:1.3 }}>{b.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:category.color+'12', border:`1px solid ${category.color}28`, borderRadius:12, padding:'13px 16px', display:'flex', alignItems:'center', gap:10 }}>
                <Ic n="CheckCircle" s={18} style={{ color:category.color, flexShrink:0 }}/>
                <div style={{ fontSize:12.5, color:category.color, fontWeight:700, lineHeight:1.4 }}>
                  Delivered by Microsoft-certified engineers
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         2.  PROBLEM STATEMENT — the pain we solve
         ════════════════════════════════════════════════════ */}
      {item.problem && (
        <section className="sp-section" style={{ padding:'90px 32px', background:'#fff' }}>
          <div style={{ maxWidth:880, margin:'0 auto' }}>
            <div className="rv sp-section-head">
              <div className="sp-eyebrow" style={{ background:`${category.color}15`, border:`1px solid ${category.color}30`, color:category.color }}>
                THE CHALLENGE
              </div>
              <h2 className="sp-h2">Why this matters</h2>
            </div>

            <div className="rv" style={{ position:'relative', padding:'36px 36px 36px 48px', borderRadius:20, background:'linear-gradient(180deg, #f8fafc 0%, #f0f7ff 100%)', border:`1px solid ${category.color}20`, overflow:'hidden' }}>
              {/* Left accent bar */}
              <div style={{ position:'absolute', left:0, top:0, bottom:0, width:5, background:`linear-gradient(180deg, ${category.color}, ${category.color}55)` }}/>
              {/* Quote glyph */}
              <div style={{ position:'absolute', top:14, right:20, fontSize:64, fontFamily:'Georgia, serif', color:`${category.color}25`, lineHeight:1, fontWeight:900 }}>"</div>

              <p style={{ fontSize:18, color:'#0a0a14', lineHeight:1.75, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, position:'relative', zIndex:1 }}>
                {item.problem}
              </p>
            </div>
          </div>
        </section>
      )}


      {/* ════════════════════════════════════════════════════
         3.  CAPABILITIES — 4 capability blocks
         ════════════════════════════════════════════════════ */}
      {item.capabilities && item.capabilities.length > 0 && (
        <section className="sp-section" style={{ padding:'90px 32px', background:'#f8fafc', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-80, right:-60, width:300, height:300, borderRadius:'50%', background:`radial-gradient(circle, ${category.color}10, transparent 70%)`, filter:'blur(50px)', pointerEvents:'none' }}/>
          <div style={{ maxWidth:1180, margin:'0 auto', position:'relative', zIndex:1 }}>
            <div className="rv sp-section-head">
              <div className="sp-eyebrow" style={{ background:`${category.color}15`, border:`1px solid ${category.color}30`, color:category.color }}>
                WHAT WE BUILD
              </div>
              <h2 className="sp-h2">Capabilities engineered for {category.heading.replace(' Solutions','').toLowerCase()}</h2>
              <p className="sp-lead">{item.capabilities.length} core capabilities — each one a defined, measurable, deliverable outcome.</p>
            </div>

            <div className="rv sp-caps-g" style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:18 }}>
              {item.capabilities.map((cap,i) => (
                <div key={i} className="sp-cap-card" style={{ padding:'30px 28px', borderRadius:20, background:'#fff', border:'1px solid #e2e8f0', position:'relative', overflow:'hidden' }}>
                  {/* Top accent line */}
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${category.color}, ${category.color}55)` }}/>
                  {/* Decorative corner */}
                  <div style={{ position:'absolute', top:-40, right:-40, width:140, height:140, borderRadius:'50%', background:`radial-gradient(circle, ${category.color}15, transparent 70%)`, pointerEvents:'none' }}/>

                  <div style={{ display:'flex', gap:18, alignItems:'flex-start', position:'relative', zIndex:1 }}>
                    <div style={{ width:52, height:52, borderRadius:14, background:`linear-gradient(135deg, ${category.color}, ${category.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 8px 20px ${category.color}40` }}>
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
         4.  FEATURES — what's included (checklist)
         ════════════════════════════════════════════════════ */}
      {item.features && item.features.length > 0 && (
        <section className="sp-section" style={{ padding:'90px 32px', background:'#fff' }}>
          <div style={{ maxWidth:1180, margin:'0 auto' }}>
            <div className="rv sp-section-head">
              <div className="sp-eyebrow" style={{ background:`${category.color}15`, border:`1px solid ${category.color}30`, color:category.color }}>
                WHAT'S INCLUDED
              </div>
              <h2 className="sp-h2">Everything in the engagement</h2>
              <p className="sp-lead">{item.features.length} deliverables, no surprises. Fully scoped before commitment.</p>
            </div>

            <div className="rv sp-features-g" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, maxWidth:980, margin:'0 auto' }}>
              {item.features.map((f,i) => (
                <div key={i} className="sp-feat-card" style={{ display:'flex', alignItems:'flex-start', gap:14, padding:'18px 20px', borderRadius:14, background:'#fff', border:'1px solid #e2e8f0' }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:category.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Ic n="CheckCircle" s={16} style={{ color:category.color }}/>
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
        <section className="sp-section" style={{ padding:'90px 32px', position:'relative', overflow:'hidden', background:'linear-gradient(180deg, #f0f7ff 0%, #ecfeff 100%)' }}>
          <div style={{ position:'absolute', top:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.18), transparent 70%)', filter:'blur(50px)', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', bottom:-80, right:-60, width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,102,255,0.12), transparent 70%)', filter:'blur(50px)', pointerEvents:'none' }}/>

          <div style={{ maxWidth:1180, margin:'0 auto', position:'relative', zIndex:1 }}>
            <div className="rv sp-section-head">
              <div className="sp-eyebrow" style={{ background:'rgba(0,102,255,0.10)', border:'1px solid rgba(0,102,255,0.25)', color:'#003FB3' }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:'#0066FF' }}/>
                BUILT ON MICROSOFT
              </div>
              <h2 className="sp-h2">Powered by the Microsoft enterprise stack</h2>
              <p className="sp-lead">Native Microsoft technologies — secure, scalable, fully governed under your Azure tenant.</p>
            </div>

            <div className="rv sp-stack-g" style={{ display:'grid', gridTemplateColumns:`repeat(${item.microsoftStack.length}, 1fr)`, gap:14, maxWidth:1100, margin:'0 auto' }}>
              {item.microsoftStack.map((tech,i) => (
                <div key={i} className="sp-stack-card" style={{ padding:'22px 18px', borderRadius:16, background:'rgba(255,255,255,0.75)', border:'1px solid rgba(0,102,255,0.18)', backdropFilter:'blur(10px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
                  {/* Subtle gradient overlay */}
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
         6.  HOW WE DELIVER — 5-step process timeline
         ════════════════════════════════════════════════════ */}
      {item.process && item.process.length > 0 && (
        <section className="sp-section" style={{ padding:'90px 32px', background:'#fff' }}>
          <div style={{ maxWidth:1280, margin:'0 auto' }}>
            <div className="rv sp-section-head">
              <div className="sp-eyebrow" style={{ background:`${category.color}15`, border:`1px solid ${category.color}30`, color:category.color }}>
                HOW WE DELIVER
              </div>
              <h2 className="sp-h2">From kick-off to go-live — without surprises</h2>
              <p className="sp-lead">Fixed-price scope before commitment. Weekly demos. Quality gates at every phase.</p>
            </div>

            <div className="rv sp-process-g" style={{ display:'grid', gridTemplateColumns:`repeat(${item.process.length}, 1fr)`, gap:18, position:'relative' }}>
              {/* Connecting line (hidden on tablet/mobile) */}
              <div className="sp-process-line" style={{ position:'absolute', top:32, left:'8%', right:'8%', height:2, background:`linear-gradient(90deg, ${category.color}22 0%, ${category.color}66 50%, ${category.color}22 100%)`, zIndex:0 }}/>

              {item.process.map((step,i) => (
                <div key={i} style={{ position:'relative', zIndex:1, padding:'28px 18px 22px', borderRadius:16, background:'linear-gradient(180deg, #ffffff, #fafcff)', border:`1px solid ${category.color}20`, boxShadow:'0 1px 3px rgba(0,53,128,0.04)' }}>
                  {/* Numbered circle */}
                  <div style={{ width:48, height:48, borderRadius:'50%', background:`linear-gradient(135deg, ${category.color}, ${category.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', boxShadow:`0 8px 20px ${category.color}40`, color:'#fff', fontWeight:900, fontSize:18, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
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
         7.  ROI BLOCK — concrete value statement
         ════════════════════════════════════════════════════ */}
      {item.roi && (
        <section className="sp-roi-section" style={{ padding:'70px 32px', background:'linear-gradient(135deg, #003FB3 0%, #0066FF 60%, #06b6d4 100%)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-80, right:-60, width:320, height:320, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', bottom:-60, left:-40, width:240, height:240, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.20), transparent 70%)', pointerEvents:'none' }}/>

          <div className="rv" style={{ maxWidth:980, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.18)', border:'1px solid rgba(255,255,255,0.30)', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#fff', letterSpacing:'.14em', marginBottom:20, backdropFilter:'blur(10px)' }}>
              <Ic n="TrendUp" s={13} style={{ color:'#67e8f9' }}/>
              EXPECTED ROI
            </div>
            <p style={{ fontSize:'clamp(20px, 2.6vw, 26px)', color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, lineHeight:1.45, letterSpacing:'-0.005em' }}>
              "{item.roi}"
            </p>
          </div>
        </section>
      )}


      {/* ════════════════════════════════════════════════════
         8.  USE CASES + RELATED SOLUTIONS
         ════════════════════════════════════════════════════ */}
      <section className="sp-section" style={{ padding:'90px 32px', background:'#f8fafc' }}>
        <div className="sp-uc-g" style={{ maxWidth:1180, margin:'0 auto', display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:56, alignItems:'flex-start' }}>

          {/* LEFT: Use cases */}
          <div className="rv">
            <div className="sp-eyebrow" style={{ background:`${category.color}15`, border:`1px solid ${category.color}30`, color:category.color }}>
              WHO IS THIS FOR
            </div>
            <h2 className="sp-h2" style={{ textAlign:'left' }}>Built for businesses like yours</h2>
            <p className="sp-lead" style={{ marginBottom:28 }}>{item.t} delivers the most value for these scenarios.</p>

            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {(item.useCases||[]).map((u,i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:14, padding:'18px 20px', borderRadius:14, background:'#fff', border:'1px solid #e2e8f0' }}>
                  <div style={{ width:34, height:34, borderRadius:10, background:category.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Ic n="Users" s={15} style={{ color:category.color }}/>
                  </div>
                  <div style={{ fontSize:14.5, color:'#0a0a14', lineHeight:1.55, paddingTop:5, fontWeight:500 }}>{u}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Related solutions */}
          <div className="rv">
            <div className="sp-eyebrow" style={{ background:'#f1f5f9', border:'1px solid #e2e8f0', color:'#64748b' }}>
              MORE IN THIS CATEGORY
            </div>
            <h3 style={{ fontSize:20, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, letterSpacing:'-0.005em' }}>{category.heading}</h3>
            <p style={{ fontSize:13.5, color:'#64748b', marginBottom:20, lineHeight:1.6 }}>{related.length} more solutions in this category.</p>

            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {related.map(rel => (
                <button key={rel.slug} className="sp-rel-card"
                  onClick={() => navigate(`/solution/${category.slug}/${rel.slug}`)}
                  style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px', borderRadius:14, border:'1px solid #e2e8f0', background:'#fff', cursor:'pointer', textAlign:'left' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=category.color+'55'; e.currentTarget.style.transform='translateX(4px)'; e.currentTarget.style.boxShadow=`0 8px 22px ${category.color}1a` }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:category.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Ic n={rel.n} s={16} style={{ color:category.color }}/>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13.5, fontWeight:700, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:2 }}>{rel.t}</div>
                    <div style={{ fontSize:12, color:'#64748b', lineHeight:1.4, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{rel.d}</div>
                  </div>
                  <Ic n="ChevR" s={14} style={{ color:category.color, flexShrink:0 }}/>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         9.  FAQ — accordion
         ════════════════════════════════════════════════════ */}
      {item.faq && item.faq.length > 0 && (
        <section className="sp-section" style={{ padding:'90px 32px', background:'#fff' }}>
          <div style={{ maxWidth:880, margin:'0 auto' }}>
            <div className="rv sp-section-head">
              <div className="sp-eyebrow" style={{ background:'#06b6d418', border:'1px solid #06b6d440', color:'#003FB3' }}>
                FREQUENTLY ASKED
              </div>
              <h2 className="sp-h2">Common questions about {item.t}</h2>
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
         10.  FINAL CTA — premium brand gradient
         ════════════════════════════════════════════════════ */}
      <section className="sp-cta-section" style={{ padding:'90px 32px', background:'linear-gradient(135deg, #003FB3 0%, #0066FF 60%, #06b6d4 100%)', position:'relative', overflow:'hidden' }}>
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
            30-minute call with a Solution Architect who has implemented this exact solution dozens of times. We'll map your specific scenario and give you a fixed-price scope before any commitment.
          </p>
          <div className="sp-cta-buttons" style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Btn onClick={openConsult} style={{ background:'#fff', color:'#003FB3' }}>Book Solution Architect Call <Ic n="Arrow" s={14} style={{ color:'#003FB3' }}/></Btn>
            <Btn variant="ghost" onClick={() => navigate(`/solutions/${category.slug}`)} style={{ borderColor:'rgba(255,255,255,0.4)', color:'#fff' }}>View all {category.heading}</Btn>
          </div>
        </div>
      </section>

    </div>
  )
}
