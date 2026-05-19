import { useEffect } from 'react'
import { C, Ic, Btn } from '../components/ui'
import { RESOURCES } from '../data/resources'

/* ════════════════════════════════════════════════════════════════════════════
 *  ROIAssessmentPage — mounted at /resource/roi-assessment/:slug
 *  ────────────────────────────────────────────────────────────────────────────
 *  Microsoft ROI Calculator positioning page.
 *  Converts to a consultation booking — the actual calculator runs as part
 *  of the discovery call where a Solution Architect inputs the values.
 *
 *  1.  Hero (eyebrow + title + lede + sample output preview)
 *  2.  5 investment modules
 *  3.  What you'll input
 *  4.  What you'll get
 *  5.  Sample sensitivity / accuracy positioning
 *  6.  CTA (book the assessment call)
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

export default function ROIAssessmentPage({ categorySlug, itemSlug, navigate, openConsult }) {
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [categorySlug, itemSlug])

  const category = RESOURCES.find(c => c.slug === categorySlug)
  const item = category?.items.find(i => i.slug === itemSlug) || category?.items[0]
  if (!category || !item) return (
    <div style={{ paddingTop:120, textAlign:'center', minHeight:'60vh' }}>
      <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>ROI Assessment not found</h2>
      <button onClick={() => navigate('/resources')} style={{ marginTop:20, color:C.blue, background:'none', border:'none', cursor:'pointer', fontSize:15 }}>← Back to resources</button>
    </div>
  )

  return (
    <div className="page-fade" style={{ overflowX:'hidden', maxWidth:'100vw' }}>

      <style dangerouslySetInnerHTML={{__html:`
        .roi-section { position: relative; }
        .roi-h2 { font-size: clamp(26px, 3.4vw, 34px); font-weight:800; color:#0a0a14; font-family:'Plus Jakarta Sans',sans-serif; margin-bottom:18px; line-height:1.25; letter-spacing:-0.01em; }

        @media (max-width: 1023px) {
          .roi-hero-g { grid-template-columns: 1fr !important; gap: 36px !important; padding-bottom: 56px !important; }
          .roi-output-card { max-width: 540px; margin: 0 auto; }
          .roi-modules-g { grid-template-columns: repeat(2, 1fr) !important; }
          .roi-io-g { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 767px) {
          .roi-hero-wrap { padding: 32px 18px 0 !important; }
          .roi-hero-g h1 { font-size: clamp(28px, 6.5vw, 38px) !important; }
          .roi-section { padding-top: 60px !important; padding-bottom: 40px !important; padding-left: 18px !important; padding-right: 18px !important; }
          .roi-cta-section { padding: 72px 20px !important; }
        }
        @media (max-width: 640px) {
          .roi-modules-g { grid-template-columns: 1fr !important; gap: 14px !important; }
        }
      `}}/>


      {/* 1. HERO */}
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

        <div className="roi-hero-wrap" style={{ maxWidth:1280, margin:'0 auto', padding:'48px 24px 0', position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:28, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Home</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <button onClick={() => navigate('/resources')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Resources</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <span style={{ fontSize:13, color:'#0a0a14', fontWeight:600 }}>Microsoft ROI Assessment</span>
          </div>

          <div className="roi-hero-g" style={{ display:'grid', gridTemplateColumns:'1fr 440px', gap:56, alignItems:'center', paddingBottom:72 }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${category.color}18`, border:`1px solid ${category.color}40`, borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:800, color:category.color, marginBottom:22, letterSpacing:'.04em' }}>
                <Ic n="Calc" s={13} style={{ color:category.color }}/>
                INTERACTIVE ROI CALCULATOR
                {item.tag && <span style={{ background:'#06b6d4', color:'#fff', borderRadius:50, padding:'2px 9px', fontSize:10, fontWeight:800, marginLeft:6, letterSpacing:'.04em' }}>{item.tag.toUpperCase()}</span>}
              </div>

              <h1 style={{ fontSize:'clamp(32px,5vw,52px)', fontWeight:900, color:'#0a0a14', lineHeight:1.08, marginBottom:20, fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:'-0.02em' }}>
                {item.t}
              </h1>

              <p style={{ fontSize:17, color:'#334155', lineHeight:1.75, marginBottom:32, maxWidth:560 }}>
                {item.hero}
              </p>

              <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:32 }}>
                {['~10 min', '5 investment modules', '3-year ROI', 'Board-ready PDF'].map((t,i) => (
                  <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'7px 14px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1px solid rgba(0,102,255,0.18)', backdropFilter:'blur(10px)', fontSize:12.5, fontWeight:700, color:'#0a0a14' }}>
                    <Ic n="CheckCircle" s={13} style={{ color:category.color }}/>
                    {t}
                  </div>
                ))}
              </div>

              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <Btn onClick={openConsult}>Start Assessment <Ic n="Arrow" s={14} style={{ color:'#fff' }}/></Btn>
                <button onClick={() => { const el = document.getElementById('roi-modules'); if (el) el.scrollIntoView({ behavior:'smooth' }) }}
                  style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 26px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1.5px solid rgba(0,102,255,0.30)', backdropFilter:'blur(10px)', cursor:'pointer', fontSize:15, fontWeight:700, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                  See how it works <Ic n="ChevD" s={14} style={{ color:'#0066FF' }}/>
                </button>
              </div>
            </div>

            {/* Sample output preview */}
            <div className="roi-output-card" style={{ background:'rgba(255,255,255,0.85)', border:'1.5px solid rgba(0,102,255,0.20)', borderRadius:24, padding:28, backdropFilter:'blur(14px)', boxShadow:'0 14px 36px rgba(0,53,128,0.10)' }}>
              <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:category.color, marginBottom:8 }}>SAMPLE OUTPUT</div>
              <div style={{ fontSize:13, color:'#64748b', marginBottom:24 }}>For a 2,500-employee organisation on M365 E3</div>

              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <div style={{ padding:'14px 18px', borderRadius:14, background:`${category.color}15`, border:`1px solid ${category.color}30` }}>
                  <div style={{ fontSize:11, fontWeight:700, color:'#64748b', marginBottom:4 }}>3-YEAR ROI</div>
                  <div style={{ fontSize:28, fontWeight:900, color:category.color, fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1 }}>312%</div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  <div style={{ padding:'12px 14px', borderRadius:12, background:'#f8fafc', border:'1px solid #e2e8f0' }}>
                    <div style={{ fontSize:10, fontWeight:700, color:'#64748b', marginBottom:3 }}>PAYBACK</div>
                    <div style={{ fontSize:17, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>11.4 mo</div>
                  </div>
                  <div style={{ padding:'12px 14px', borderRadius:12, background:'#f8fafc', border:'1px solid #e2e8f0' }}>
                    <div style={{ fontSize:10, fontWeight:700, color:'#64748b', marginBottom:3 }}>SAVINGS</div>
                    <div style={{ fontSize:17, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>£8.4M</div>
                  </div>
                </div>
                <div style={{ padding:'10px 14px', borderRadius:10, background:'rgba(0,102,255,0.06)', border:'1px solid rgba(0,102,255,0.12)', fontSize:11.5, color:'#475569', display:'flex', alignItems:'center', gap:8 }}>
                  <Ic n="FileText" s={13} style={{ color:'#0066FF' }}/>
                  Full PDF report with sensitivity analysis
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 2. INVESTMENT MODULES */}
      {item.modules && item.modules.length > 0 && (
        <section className="roi-section" id="roi-modules" style={{ padding:'90px 32px', background:'#fff' }}>
          <div style={{ maxWidth:1180, margin:'0 auto' }}>
            <div className="rv" style={{ textAlign:'center', marginBottom:48, maxWidth:760, margin:'0 auto 48px' }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${category.color}15`, border:`1px solid ${category.color}30`, borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:category.color, letterSpacing:'.14em', marginBottom:14 }}>
                5 INVESTMENT MODULES
              </div>
              <h2 className="roi-h2" style={{ textAlign:'center' }}>Modules covered in the assessment</h2>
              <p style={{ fontSize:15, color:'#475569', lineHeight:1.7 }}>Calculate ROI across all major Microsoft investment areas — pick any combination relevant to your priorities.</p>
            </div>

            <div className="rv roi-modules-g" style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:14 }}>
              {item.modules.map((mod, i) => (
                <div key={mod.slug} style={{ padding:'24px 18px 22px', borderRadius:16, background:'linear-gradient(180deg, #fff, #f8fafc)', border:'1px solid #e2e8f0', textAlign:'center', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${category.color}, ${category.color}55)` }} />
                  <div style={{ width:44, height:44, borderRadius:12, background:`linear-gradient(135deg, ${category.color}, ${category.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px', boxShadow:`0 6px 16px ${category.color}30` }}>
                    <span style={{ fontSize:14, fontWeight:900, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{i + 1}</span>
                  </div>
                  <h4 style={{ fontSize:13.5, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, lineHeight:1.3 }}>{mod.t}</h4>
                  <p style={{ fontSize:11.5, color:'#64748b', lineHeight:1.5 }}>{mod.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* 3. INPUTS + OUTPUTS */}
      <section className="roi-section" style={{ padding:'90px 32px', background:'#f8fafc' }}>
        <div style={{ maxWidth:1180, margin:'0 auto' }}>
          <div className="rv roi-io-g" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>
            {/* Inputs */}
            <div style={{ padding:'32px', borderRadius:20, background:'#fff', border:'1px solid #e2e8f0' }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#0066FF15', border:'1px solid #0066FF30', borderRadius:50, padding:'5px 12px', fontSize:11, fontWeight:800, color:'#003FB3', letterSpacing:'.10em', marginBottom:18 }}>
                <Ic n="Layers" s={12} style={{ color:'#0066FF' }}/>
                WHAT YOU INPUT
              </div>
              <h3 style={{ fontSize:20, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:20, letterSpacing:'-0.005em' }}>5 inputs · ~10 minutes</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {(item.inputs||[]).map((inp, i) => (
                  <div key={inp.id} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 16px', borderRadius:12, background:'#f8fafc', border:'1px solid #e2e8f0' }}>
                    <span style={{ width:26, height:26, borderRadius:'50%', background:'#0066FF', color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, flexShrink:0, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{i + 1}</span>
                    <span style={{ fontSize:13.5, color:'#0a0a14', fontWeight:600 }}>{inp.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Outputs */}
            <div style={{ padding:'32px', borderRadius:20, background:`linear-gradient(135deg, ${category.color}, ${category.color}dd)`, color:'#fff', position:'relative', overflow:'hidden', boxShadow:`0 20px 50px ${category.color}30` }}>
              <div style={{ position:'absolute', top:-80, right:-60, width:240, height:240, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)', pointerEvents:'none' }}/>
              <div style={{ position:'relative', zIndex:1 }}>
                <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.18)', border:'1px solid rgba(255,255,255,0.30)', borderRadius:50, padding:'5px 12px', fontSize:11, fontWeight:800, color:'#fff', letterSpacing:'.10em', marginBottom:18 }}>
                  <Ic n="Chart" s={12} style={{ color:'#fff' }}/>
                  WHAT YOU GET
                </div>
                <h3 style={{ fontSize:20, fontWeight:800, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:20, letterSpacing:'-0.005em' }}>{item.outputs?.length || 5} deliverables · Board-ready</h3>
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {(item.outputs||[]).map((out, i) => (
                    <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:12, fontSize:13.5, color:'#fff', lineHeight:1.55 }}>
                      <Ic n="CheckCircle" s={15} style={{ color:'#67e8f9', flexShrink:0, marginTop:3 }}/>
                      <span style={{ paddingTop:1 }}>{out}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. HOW IT'S CALIBRATED — credibility positioning */}
      <section className="roi-section" style={{ padding:'80px 32px', background:'#fff' }}>
        <div style={{ maxWidth:780, margin:'0 auto', textAlign:'center' }}>
          <div className="rv">
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${category.color}15`, border:`1px solid ${category.color}30`, borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:category.color, letterSpacing:'.14em', marginBottom:14 }}>
              <Ic n="Award" s={13} style={{ color:category.color }}/>
              CALIBRATED FROM REAL ENGAGEMENTS
            </div>
            <h2 className="roi-h2" style={{ textAlign:'center' }}>Not a generic marketing calculator</h2>
            <p style={{ fontSize:16, color:'#334155', lineHeight:1.8 }}>
              Every assumption in this calculator comes from <strong style={{ color:'#0a0a14' }}>50+ delivered Microsoft engagements</strong>. When you input "4,000 employees in professional services with existing M365 E3", we calibrate against actual outcomes we've seen in that profile — not Microsoft's optimistic vendor marketing. The result is genuinely useful projections you can defend to your board.
            </p>
          </div>
        </div>
      </section>


      {/* 5. CTA */}
      <section className="roi-cta-section" style={{ padding:'100px 32px', background:'linear-gradient(135deg, #003FB3 0%, #0066FF 60%, #06b6d4 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-100, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:880, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.30)', borderRadius:50, padding:'7px 16px', fontSize:11.5, fontWeight:800, color:'#fff', letterSpacing:'.14em', marginBottom:22, backdropFilter:'blur(10px)' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#67e8f9' }}/>
            10 MINUTES · YOUR BOARD WILL THANK YOU
          </div>
          <h2 style={{ fontSize:'clamp(28px, 4.5vw, 42px)', fontWeight:900, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:16, lineHeight:1.15, letterSpacing:'-0.02em' }}>
            Get your Microsoft ROI numbers
          </h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.85)', marginBottom:32, lineHeight:1.7, maxWidth:680, margin:'0 auto 32px' }}>
            Book a 30-minute call with a Solution Architect. We'll run the assessment together, discuss your priorities, and deliver a customised PDF report with 3-year projections within 48 hours. No commitment.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Btn onClick={openConsult} style={{ background:'#fff', color:'#003FB3' }}>Start Assessment <Ic n="Arrow" s={14} style={{ color:'#003FB3' }}/></Btn>
            <Btn variant="ghost" onClick={() => navigate('/resources')} style={{ borderColor:'rgba(255,255,255,0.4)', color:'#fff' }}>Browse Resources</Btn>
          </div>
        </div>
      </section>

    </div>
  )
}
