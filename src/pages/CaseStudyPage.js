import { useEffect } from 'react'
import { C, Ic, Btn } from '../components/ui'
import { RESOURCES } from '../data/resources'
import { INDUSTRIES } from '../data/industries'
import { USECASES } from '../data/usecases'
import { SOLUTIONS } from '../data/content'

/* ════════════════════════════════════════════════════════════════════════════
 *  CaseStudyPage — mounted at /resource/case-studies/:slug
 *  ────────────────────────────────────────────────────────────────────────────
 *  Full long-form case study detail page.
 *
 *  1.  Hero (light + tag eyebrow + client metadata + key results card)
 *  2.  Challenge narrative (long-form section)
 *  3.  Approach narrative (long-form section)
 *  4.  Outcome narrative (long-form section + metrics banner)
 *  5.  Microsoft stack used
 *  6.  Pull quote (large stylized quote card)
 *  7.  Cross-links — relevant use case, industry, solutions
 *  8.  Related case studies
 *  9.  CTA
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

function findUseCase(slug) {
  for (const cat of USECASES) {
    const item = cat.items.find(i => i.slug === slug)
    if (item) return { ...item, category: cat }
  }
  return null
}
function findIndustry(slug) { return INDUSTRIES.find(i => i.slug === slug) || null }
function findSolution(slug) {
  for (const cat of SOLUTIONS) {
    const item = cat.items.find(i => i.slug === slug)
    if (item) return { ...item, category: cat }
  }
  return null
}

export default function CaseStudyPage({ categorySlug, itemSlug, navigate, openConsult }) {
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [categorySlug, itemSlug])

  const category = RESOURCES.find(c => c.slug === categorySlug)
  const item = category?.items.find(i => i.slug === itemSlug)
  if (!category || !item) return (
    <div style={{ paddingTop:120, textAlign:'center', minHeight:'60vh' }}>
      <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Case study not found</h2>
      <button onClick={() => navigate('/resources/case-studies')} style={{ marginTop:20, color:C.blue, background:'none', border:'none', cursor:'pointer', fontSize:15 }}>← All case studies</button>
    </div>
  )

  const relUseCase  = (item.relatedUseCases||[])[0] && findUseCase(item.relatedUseCases[0])
  const relIndustry = (item.relatedIndustries||[])[0] && findIndustry(item.relatedIndustries[0])
  const relSols     = (item.relatedSolutions||[]).map(findSolution).filter(Boolean)
  const otherCases  = category.items.filter(i => i.slug !== itemSlug).slice(0, 3)

  return (
    <div className="page-fade" style={{ overflowX:'hidden', maxWidth:'100vw' }}>

      <style dangerouslySetInnerHTML={{__html:`
        .cs-section { position: relative; }
        .cs-eyebrow { display:inline-flex; align-items:center; gap:8px; border-radius:50px; padding:6px 14px; font-size:11.5px; font-weight:800; letter-spacing:.14em; margin-bottom:16px; }
        .cs-h2 { font-size: clamp(26px, 3.4vw, 34px); font-weight:800; color:#0a0a14; font-family:'Plus Jakarta Sans',sans-serif; margin-bottom:18px; line-height:1.25; letter-spacing:-0.01em; }
        .cs-body { font-size:16px; color:#334155; line-height:1.8; }
        .cs-narrative { max-width:780px; margin:0 auto; }

        @media (max-width: 1023px) {
          .cs-hero-g { grid-template-columns: 1fr !important; gap: 36px !important; padding-bottom: 56px !important; }
          .cs-stats-card { max-width: 540px; margin: 0 auto; }
        }
        @media (max-width: 767px) {
          .cs-hero-wrap { padding: 32px 18px 0 !important; }
          .cs-hero-g h1 { font-size: clamp(28px, 6.5vw, 38px) !important; }
          .cs-stats-card { padding: 22px !important; }
          .cs-section { padding-top: 60px !important; padding-bottom: 40px !important; padding-left: 18px !important; padding-right: 18px !important; }
          .cs-metrics-banner { padding: 36px 20px !important; }
          .cs-metrics-g { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
          .cs-quote-card { padding: 28px 22px !important; }
          .cs-quote-text { font-size: 18px !important; }
          .cs-crosslinks-g { grid-template-columns: 1fr !important; gap: 14px !important; }
          .cs-related-g { grid-template-columns: 1fr !important; gap: 14px !important; }
          .cs-cta-section { padding: 72px 20px !important; }
        }
        @media (max-width: 1023px) {
          .cs-stack-g { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .cs-stack-g { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
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

        <div className="cs-hero-wrap" style={{ maxWidth:1280, margin:'0 auto', padding:'48px 24px 0', position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:28, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Home</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <button onClick={() => navigate('/resources')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Resources</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <button onClick={() => navigate(`/resources/${category.slug}`)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Case Studies</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <span style={{ fontSize:13, color:'#0a0a14', fontWeight:600 }}>{item.t}</span>
          </div>

          <div className="cs-hero-g" style={{ display:'grid', gridTemplateColumns:'1fr 420px', gap:56, alignItems:'center', paddingBottom:72 }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${category.color}18`, border:`1px solid ${category.color}40`, borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:800, color:category.color, marginBottom:22, letterSpacing:'.04em' }}>
                <Ic n="Award" s={13} style={{ color:category.color }}/>
                CASE STUDY
                {item.tag && <span style={{ background:'#06b6d4', color:'#fff', borderRadius:50, padding:'2px 9px', fontSize:10, fontWeight:800, marginLeft:6, letterSpacing:'.04em' }}>{item.tag.toUpperCase()}</span>}
              </div>

              <h1 style={{ fontSize:'clamp(32px,4.6vw,46px)', fontWeight:900, color:'#0a0a14', lineHeight:1.12, marginBottom:18, fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:'-0.02em' }}>
                {item.t}
              </h1>

              <p style={{ fontSize:16.5, color:'#334155', lineHeight:1.75, marginBottom:28, maxWidth:560 }}>
                {item.hero}
              </p>

              {/* Client metadata */}
              {item.client && (
                <div style={{ display:'flex', flexWrap:'wrap', gap:14, marginBottom:30 }}>
                  {[
                    { l:'Sector',    v:item.client.sector },
                    { l:'Size',      v:item.client.headcount },
                    { l:'Region',    v:item.client.region },
                    { l:'Timeline',  v:item.client.timeline },
                  ].filter(x => x.v).map((m,i) => (
                    <div key={i} style={{ background:'rgba(255,255,255,0.65)', border:'1px solid rgba(0,102,255,0.18)', backdropFilter:'blur(10px)', borderRadius:12, padding:'10px 14px' }}>
                      <div style={{ fontSize:10, color:'#64748b', fontWeight:700, letterSpacing:'.08em', marginBottom:3 }}>{m.l.toUpperCase()}</div>
                      <div style={{ fontSize:13, color:'#0a0a14', fontWeight:700 }}>{m.v}</div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <Btn onClick={openConsult}>Discuss similar outcome <Ic n="Arrow" s={14} style={{ color:'#fff' }}/></Btn>
                <button onClick={() => navigate(`/resources/${category.slug}`)}
                  style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 26px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1.5px solid rgba(0,102,255,0.30)', backdropFilter:'blur(10px)', cursor:'pointer', fontSize:15, fontWeight:700, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                  More Case Studies <Ic n="ChevR" s={13} style={{ color:'#0066FF' }}/>
                </button>
              </div>
            </div>

            {/* Key Results card */}
            <div className="cs-stats-card" style={{ background:'rgba(255,255,255,0.65)', border:'1.5px solid rgba(0,102,255,0.18)', borderRadius:24, padding:28, backdropFilter:'blur(14px)', boxShadow:'0 14px 36px rgba(0,53,128,0.10)' }}>
              <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:category.color, marginBottom:18 }}>KEY RESULTS</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                {(item.keyMetrics||[]).map((m,i) => (
                  <div key={i} style={{ background: i===0 ? category.color+'18' : 'rgba(255,255,255,0.85)', borderRadius:14, padding:'16px 14px', border:`1px solid ${i===0?category.color+'40':'rgba(0,102,255,0.10)'}` }}>
                    <div style={{ fontSize:24, fontWeight:900, color: i===0 ? category.color : '#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1 }}>
                      {m.v}
                    </div>
                    <div style={{ fontSize:11, color:'#475569', marginTop:6, lineHeight:1.3 }}>{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 2. CHALLENGE */}
      {item.challenge && (
        <section className="cs-section" style={{ padding:'90px 32px', background:'#fff' }}>
          <div className="cs-narrative">
            <div className="rv">
              <div className="cs-eyebrow" style={{ background:`${category.color}15`, border:`1px solid ${category.color}30`, color:category.color }}>
                THE CHALLENGE
              </div>
              <h2 className="cs-h2">The problem we were brought in to solve</h2>
              <p className="cs-body">{item.challenge}</p>
            </div>
          </div>
        </section>
      )}


      {/* 3. APPROACH */}
      {item.approach && (
        <section className="cs-section" style={{ padding:'90px 32px', background:'#f8fafc' }}>
          <div className="cs-narrative">
            <div className="rv">
              <div className="cs-eyebrow" style={{ background:`${category.color}15`, border:`1px solid ${category.color}30`, color:category.color }}>
                OUR APPROACH
              </div>
              <h2 className="cs-h2">How we delivered the outcome</h2>
              <p className="cs-body">{item.approach}</p>
            </div>
          </div>
        </section>
      )}


      {/* 4. OUTCOME + METRICS BANNER */}
      {item.outcome && (
        <>
          <section className="cs-section" style={{ padding:'90px 32px 56px', background:'#fff' }}>
            <div className="cs-narrative">
              <div className="rv">
                <div className="cs-eyebrow" style={{ background:`${category.color}15`, border:`1px solid ${category.color}30`, color:category.color }}>
                  THE OUTCOME
                </div>
                <h2 className="cs-h2">What was delivered, measurably</h2>
                <p className="cs-body">{item.outcome}</p>
              </div>
            </div>
          </section>

          {/* Metrics banner */}
          {item.keyMetrics && item.keyMetrics.length > 0 && (
            <section className="cs-metrics-banner" style={{ padding:'56px 32px 96px', background:'#fff' }}>
              <div className="rv" style={{ maxWidth:1180, margin:'0 auto' }}>
                <div className="cs-metrics-g" style={{ display:'grid', gridTemplateColumns:`repeat(${item.keyMetrics.length}, 1fr)`, gap:24, padding:'40px 32px', background:`linear-gradient(135deg, ${category.color}, ${category.color}dd)`, borderRadius:24, position:'relative', overflow:'hidden', boxShadow:`0 20px 50px ${category.color}30` }}>
                  <div style={{ position:'absolute', top:-80, right:-60, width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)', pointerEvents:'none' }}/>
                  <div style={{ position:'absolute', bottom:-60, left:-40, width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)', pointerEvents:'none' }}/>
                  {item.keyMetrics.map((m,i) => (
                    <div key={i} style={{ textAlign:'center', position:'relative', zIndex:1, borderRight: i < item.keyMetrics.length - 1 ? '1px solid rgba(255,255,255,0.20)' : 'none', paddingRight: i < item.keyMetrics.length - 1 ? 16 : 0 }}>
                      <div style={{ fontSize:'clamp(32px, 4vw, 48px)', fontWeight:900, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1, marginBottom:8, letterSpacing:'-0.02em' }}>{m.v}</div>
                      <div style={{ fontSize:13, color:'rgba(255,255,255,0.90)', fontWeight:600, lineHeight:1.3 }}>{m.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}


      {/* 5. MICROSOFT STACK */}
      {item.microsoftStack && item.microsoftStack.length > 0 && (
        <section className="cs-section" style={{ padding:'80px 32px', position:'relative', overflow:'hidden', background:'linear-gradient(180deg, #f0f7ff 0%, #ecfeff 100%)' }}>
          <div style={{ position:'absolute', top:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.18), transparent 70%)', filter:'blur(50px)', pointerEvents:'none' }}/>

          <div style={{ maxWidth:1180, margin:'0 auto', position:'relative', zIndex:1 }}>
            <div className="rv" style={{ textAlign:'center', marginBottom:40, maxWidth:760, margin:'0 auto 40px' }}>
              <div className="cs-eyebrow" style={{ background:'rgba(0,102,255,0.10)', border:'1px solid rgba(0,102,255,0.25)', color:'#003FB3', display:'inline-flex' }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:'#0066FF' }}/>
                BUILT ON MICROSOFT
              </div>
              <h2 className="cs-h2" style={{ textAlign:'center' }}>The Microsoft stack that delivered this</h2>
            </div>

            <div className="rv cs-stack-g" style={{ display:'grid', gridTemplateColumns:`repeat(${item.microsoftStack.length}, 1fr)`, gap:14, maxWidth:1100, margin:'0 auto' }}>
              {item.microsoftStack.map((tech,i) => (
                <div key={i} style={{ padding:'22px 18px', borderRadius:16, background:'rgba(255,255,255,0.85)', border:'1px solid rgba(0,102,255,0.18)', backdropFilter:'blur(10px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg, #0066FF, #06b6d4)' }}/>
                  <div style={{ width:44, height:44, borderRadius:12, background:'linear-gradient(135deg, #0066FF, #003FB3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px', boxShadow:'0 6px 18px rgba(0,102,255,0.30)' }}>
                    <Ic n="Cpu" s={20} style={{ color:'#fff' }}/>
                  </div>
                  <div style={{ fontSize:13, fontWeight:800, color:'#003FB3', fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1.35 }}>{tech}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* 6. PULL QUOTE */}
      {item.quote && (
        <section className="cs-section" style={{ padding:'90px 32px', background:'#fff' }}>
          <div style={{ maxWidth:980, margin:'0 auto' }}>
            <div className="rv cs-quote-card" style={{ position:'relative', padding:'48px 48px 40px', borderRadius:24, background:`linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 60%, ${category.color}aa 100%)`, overflow:'hidden', boxShadow:`0 20px 50px ${category.color}30` }}>
              <div style={{ position:'absolute', top:-100, right:-80, width:380, height:380, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)', pointerEvents:'none' }}/>
              <div style={{ position:'absolute', bottom:-80, left:-40, width:240, height:240, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)', pointerEvents:'none' }}/>

              <div style={{ position:'relative', zIndex:1 }}>
                <Ic n="Quote" s={48} style={{ color:'rgba(255,255,255,0.40)', marginBottom:20 }}/>
                <p className="cs-quote-text" style={{ fontSize:24, color:'#fff', lineHeight:1.5, fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, marginBottom:24, letterSpacing:'-0.005em' }}>
                  "{item.quote.text}"
                </p>
                <div style={{ display:'flex', alignItems:'center', gap:14, paddingTop:20, borderTop:'1px solid rgba(255,255,255,0.20)' }}>
                  <div style={{ width:44, height:44, borderRadius:'50%', background:'rgba(255,255,255,0.18)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, backdropFilter:'blur(10px)' }}>
                    <Ic n="User" s={20} style={{ color:'#fff' }}/>
                  </div>
                  <div style={{ fontSize:14, color:'rgba(255,255,255,0.95)', fontWeight:600 }}>
                    {item.quote.author}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}


      {/* 7. CROSS-LINKS — Use Case, Industry, Solutions */}
      {(relUseCase || relIndustry || relSols.length > 0) && (
        <section className="cs-section" style={{ padding:'90px 32px', background:'#f8fafc' }}>
          <div style={{ maxWidth:1180, margin:'0 auto' }}>
            <div className="rv" style={{ textAlign:'center', marginBottom:48 }}>
              <div className="cs-eyebrow" style={{ background:`${category.color}15`, border:`1px solid ${category.color}30`, color:category.color, display:'inline-flex' }}>
                EXPLORE FURTHER
              </div>
              <h2 className="cs-h2" style={{ textAlign:'center' }}>Want to deliver a similar outcome?</h2>
              <p style={{ fontSize:15, color:'#475569', lineHeight:1.7, maxWidth:640, margin:'0 auto' }}>The use case, sector approach, and Microsoft solutions behind this case study.</p>
            </div>

            <div className="rv cs-crosslinks-g" style={{ display:'grid', gridTemplateColumns:`repeat(3, 1fr)`, gap:18 }}>
              {/* Use Case */}
              {relUseCase && (
                <button onClick={() => navigate(`/use-case/${relUseCase.category.slug}/${relUseCase.slug}`)}
                  style={{ display:'flex', flexDirection:'column', padding:'24px 22px 20px', borderRadius:18, background:'#fff', border:'1px solid #e2e8f0', cursor:'pointer', textAlign:'left', position:'relative', overflow:'hidden', transition:'all .22s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=relUseCase.category.color+'55'; e.currentTarget.style.boxShadow=`0 14px 32px ${relUseCase.category.color}1f`; e.currentTarget.style.transform='translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${relUseCase.category.color}, ${relUseCase.category.color}55)` }} />
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:`linear-gradient(135deg, ${relUseCase.category.color}, ${relUseCase.category.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 6px 16px ${relUseCase.category.color}38` }}>
                      <Ic n={relUseCase.n} s={20} style={{ color:'#fff' }}/>
                    </div>
                    <span style={{ fontSize:10.5, fontWeight:800, color:relUseCase.category.color, letterSpacing:'.08em' }}>USE CASE</span>
                  </div>
                  <h4 style={{ fontSize:16, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, lineHeight:1.3 }}>{relUseCase.t}</h4>
                  <p style={{ fontSize:13, color:'#475569', lineHeight:1.6, marginBottom:14, flex:1 }}>{relUseCase.d}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12.5, fontWeight:700, color:relUseCase.category.color, paddingTop:12, borderTop:`1px solid ${relUseCase.category.color}15` }}>
                    Explore use case <Ic n="Arrow" s={13} style={{ color:relUseCase.category.color }}/>
                  </div>
                </button>
              )}

              {/* Industry */}
              {relIndustry && (
                <button onClick={() => navigate(`/industries/${relIndustry.slug}`)}
                  style={{ display:'flex', flexDirection:'column', padding:'24px 22px 20px', borderRadius:18, background:'#fff', border:'1px solid #e2e8f0', cursor:'pointer', textAlign:'left', position:'relative', overflow:'hidden', transition:'all .22s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=relIndustry.color+'55'; e.currentTarget.style.boxShadow=`0 14px 32px ${relIndustry.color}1f`; e.currentTarget.style.transform='translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${relIndustry.color}, ${relIndustry.color}55)` }} />
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:`linear-gradient(135deg, ${relIndustry.color}, ${relIndustry.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 6px 16px ${relIndustry.color}38` }}>
                      <Ic n={relIndustry.icon} s={20} style={{ color:'#fff' }}/>
                    </div>
                    <span style={{ fontSize:10.5, fontWeight:800, color:relIndustry.color, letterSpacing:'.08em' }}>INDUSTRY</span>
                  </div>
                  <h4 style={{ fontSize:16, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, lineHeight:1.3 }}>{relIndustry.heading}</h4>
                  <p style={{ fontSize:13, color:'#475569', lineHeight:1.6, marginBottom:14, flex:1 }}>{relIndustry.desc}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12.5, fontWeight:700, color:relIndustry.color, paddingTop:12, borderTop:`1px solid ${relIndustry.color}15` }}>
                    {relIndustry.items.length} sector solutions <Ic n="Arrow" s={13} style={{ color:relIndustry.color }}/>
                  </div>
                </button>
              )}

              {/* First Solution */}
              {relSols[0] && (
                <button onClick={() => navigate(`/solution/${relSols[0].category.slug}/${relSols[0].slug}`)}
                  style={{ display:'flex', flexDirection:'column', padding:'24px 22px 20px', borderRadius:18, background:'#fff', border:'1px solid #e2e8f0', cursor:'pointer', textAlign:'left', position:'relative', overflow:'hidden', transition:'all .22s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=relSols[0].category.color+'55'; e.currentTarget.style.boxShadow=`0 14px 32px ${relSols[0].category.color}1f`; e.currentTarget.style.transform='translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${relSols[0].category.color}, ${relSols[0].category.color}55)` }} />
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:`linear-gradient(135deg, ${relSols[0].category.color}, ${relSols[0].category.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 6px 16px ${relSols[0].category.color}38` }}>
                      <Ic n={relSols[0].n} s={20} style={{ color:'#fff' }}/>
                    </div>
                    <span style={{ fontSize:10.5, fontWeight:800, color:relSols[0].category.color, letterSpacing:'.08em' }}>SOLUTION</span>
                  </div>
                  <h4 style={{ fontSize:16, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, lineHeight:1.3 }}>{relSols[0].t}</h4>
                  <p style={{ fontSize:13, color:'#475569', lineHeight:1.6, marginBottom:14, flex:1 }}>{relSols[0].d}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12.5, fontWeight:700, color:relSols[0].category.color, paddingTop:12, borderTop:`1px solid ${relSols[0].category.color}15` }}>
                    Explore solution <Ic n="Arrow" s={13} style={{ color:relSols[0].category.color }}/>
                  </div>
                </button>
              )}
            </div>
          </div>
        </section>
      )}


      {/* 8. RELATED CASE STUDIES */}
      {otherCases.length > 0 && (
        <section className="cs-section" style={{ padding:'80px 32px', background:'#fff' }}>
          <div style={{ maxWidth:1180, margin:'0 auto' }}>
            <div className="rv" style={{ marginBottom:32 }}>
              <h3 style={{ fontSize:22, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>More case studies</h3>
              <p style={{ fontSize:14, color:'#64748b' }}>Other client outcomes from our engagement portfolio.</p>
            </div>
            <div className="rv cs-related-g" style={{ display:'grid', gridTemplateColumns:`repeat(${otherCases.length}, 1fr)`, gap:18 }}>
              {otherCases.map(oc => (
                <button key={oc.slug} onClick={() => navigate(`/resource/${category.slug}/${oc.slug}`)}
                  style={{ display:'flex', flexDirection:'column', padding:'22px 22px 18px', borderRadius:18, background:'linear-gradient(180deg, #fff, #f8fafc)', border:'1px solid #e2e8f0', cursor:'pointer', textAlign:'left', position:'relative', overflow:'hidden', transition:'all .22s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=category.color+'55'; e.currentTarget.style.transform='translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.transform='none' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${category.color}, ${category.color}55)` }} />
                  <div style={{ width:42, height:42, borderRadius:12, background:`linear-gradient(135deg, ${category.color}, ${category.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14, boxShadow:`0 6px 16px ${category.color}38` }}>
                    <Ic n={oc.n} s={19} style={{ color:'#fff' }}/>
                  </div>
                  <h4 style={{ fontSize:15, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, lineHeight:1.3 }}>{oc.t}</h4>
                  <p style={{ fontSize:12.5, color:'#475569', lineHeight:1.55, marginBottom:14, flex:1 }}>{oc.d}</p>
                  {oc.keyMetrics?.[0] && (
                    <div style={{ display:'flex', alignItems:'baseline', gap:5, marginTop:'auto', paddingTop:10, borderTop:`1px solid ${category.color}15` }}>
                      <span style={{ fontSize:18, fontWeight:900, color:category.color, fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1 }}>{oc.keyMetrics[0].v}</span>
                      <span style={{ fontSize:11, color:'#64748b' }}>{oc.keyMetrics[0].l}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* 9. CTA */}
      <section className="cs-cta-section" style={{ padding:'90px 32px', background:'linear-gradient(135deg, #003FB3 0%, #0066FF 60%, #06b6d4 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-100, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:880, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.30)', borderRadius:50, padding:'7px 16px', fontSize:11.5, fontWeight:800, color:'#fff', letterSpacing:'.14em', marginBottom:22, backdropFilter:'blur(10px)' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#67e8f9' }}/>
            YOUR STORY COULD BE NEXT
          </div>
          <h2 style={{ fontSize:'clamp(28px, 4.5vw, 42px)', fontWeight:900, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:16, lineHeight:1.15, letterSpacing:'-0.02em' }}>
            Want a similar outcome?
          </h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.85)', marginBottom:32, lineHeight:1.7, maxWidth:680, margin:'0 auto 32px' }}>
            30-minute discovery call with the Solution Architect who delivered this case study. We'll discuss whether the same approach would work for your situation — with written fixed-price scope within a week. No commitment.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Btn onClick={openConsult} style={{ background:'#fff', color:'#003FB3' }}>Book Architect Call <Ic n="Arrow" s={14} style={{ color:'#003FB3' }}/></Btn>
            <Btn variant="ghost" onClick={() => navigate('/resources/case-studies')} style={{ borderColor:'rgba(255,255,255,0.4)', color:'#fff' }}>More Case Studies</Btn>
          </div>
        </div>
      </section>

    </div>
  )
}
