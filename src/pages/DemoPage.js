import { useEffect } from 'react'
import { C, Ic, Btn } from '../components/ui'
import { RESOURCES } from '../data/resources'
import { USECASES } from '../data/usecases'

/* ════════════════════════════════════════════════════════════════════════════
 *  DemoPage — mounted at /resource/solution-demos/:slug
 *  ────────────────────────────────────────────────────────────────────────────
 *  Video demo detail page.
 *
 *  1.  Hero (eyebrow + title + lede + presenter + length + demo type)
 *  2.  Video player placeholder (large)
 *  3.  What you'll learn (6-bullet list)
 *  4.  Microsoft stack used
 *  5.  Cross-link to related use cases
 *  6.  Related demos
 *  7.  CTA
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

export default function DemoPage({ categorySlug, itemSlug, navigate, openConsult }) {
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [categorySlug, itemSlug])

  const category = RESOURCES.find(c => c.slug === categorySlug)
  const item = category?.items.find(i => i.slug === itemSlug)
  if (!category || !item) return (
    <div style={{ paddingTop:120, textAlign:'center', minHeight:'60vh' }}>
      <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Demo not found</h2>
      <button onClick={() => navigate('/resources/solution-demos')} style={{ marginTop:20, color:C.blue, background:'none', border:'none', cursor:'pointer', fontSize:15 }}>← All demos</button>
    </div>
  )

  const relUseCases = (item.relatedUseCases||[]).map(findUseCase).filter(Boolean)
  const otherDemos = category.items.filter(i => i.slug !== itemSlug).slice(0, 3)

  return (
    <div className="page-fade" style={{ overflowX:'hidden', maxWidth:'100vw' }}>

      <style dangerouslySetInnerHTML={{__html:`
        .dm-section { position: relative; }
        .dm-h2 { font-size: clamp(24px, 3.2vw, 32px); font-weight:800; color:#0a0a14; font-family:'Plus Jakarta Sans',sans-serif; margin-bottom:18px; line-height:1.25; letter-spacing:-0.01em; }

        @media (max-width: 767px) {
          .dm-hero { padding: 32px 18px 56px !important; }
          .dm-hero h1 { font-size: clamp(28px, 6.5vw, 38px) !important; }
          .dm-section { padding-top: 60px !important; padding-bottom: 40px !important; padding-left: 18px !important; padding-right: 18px !important; }
          .dm-video { padding-bottom: 56.25% !important; }
          .dm-learn-g { grid-template-columns: 1fr !important; }
          .dm-related-g { grid-template-columns: 1fr !important; gap: 14px !important; }
          .dm-cta-section { padding: 72px 20px !important; }
        }
        @media (max-width: 1023px) {
          .dm-stack-g { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .dm-stack-g { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
      `}}/>


      {/* 1. HERO */}
      <section className="dm-hero" style={{
        paddingTop:68, paddingBottom:64, position:'relative', overflow:'hidden',
        background: `
          radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.35), transparent 55%),
          radial-gradient(circle at 80% 70%, rgba(0, 102, 255, 0.20), transparent 60%),
          linear-gradient(135deg, #ffffff 0%, #f0f7ff 25%, #d6ebff 55%, #b8defa 80%, #9bd3f5 100%)
        `
      }}>
        <div style={{ position:'absolute', top:-100, right:-80, width:380, height:380, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.32), transparent 70%)', filter:'blur(48px)', animation:'heroFloat 9s ease-in-out infinite', pointerEvents:'none' }} />

        <div style={{ maxWidth:1180, margin:'0 auto', padding:'48px 32px 0', position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:32, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Home</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <button onClick={() => navigate('/resources')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Resources</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <button onClick={() => navigate(`/resources/${category.slug}`)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Solution Demos</button>
          </div>

          <div style={{ maxWidth:780 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${category.color}18`, border:`1px solid ${category.color}40`, borderRadius:50, padding:'7px 16px', fontSize:11.5, fontWeight:800, color:category.color, marginBottom:22, letterSpacing:'.06em' }}>
              <Ic n="Video" s={13} style={{ color:category.color }}/>
              {item.demoType?.toUpperCase() || 'SOLUTION DEMO'}
              {item.tag && <span style={{ background:'#06b6d4', color:'#fff', borderRadius:50, padding:'2px 9px', fontSize:10, fontWeight:800, marginLeft:6, letterSpacing:'.04em' }}>{item.tag.toUpperCase()}</span>}
            </div>

            <h1 style={{ fontSize:'clamp(32px,4.6vw,46px)', fontWeight:900, color:'#0a0a14', lineHeight:1.12, marginBottom:20, fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:'-0.02em' }}>
              {item.t}
            </h1>

            <p style={{ fontSize:17, color:'#334155', lineHeight:1.75, marginBottom:24, maxWidth:680 }}>
              {item.hero}
            </p>

            <div style={{ display:'flex', flexWrap:'wrap', gap:12 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 14px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1px solid rgba(0,102,255,0.18)', backdropFilter:'blur(10px)', fontSize:13, fontWeight:700, color:'#0a0a14' }}>
                <Ic n="Clock" s={13} style={{ color:'#0066FF' }}/>
                {item.videoLength}
              </div>
              {item.presenter && (
                <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 14px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1px solid rgba(0,102,255,0.18)', backdropFilter:'blur(10px)', fontSize:13, fontWeight:700, color:'#0a0a14' }}>
                  <Ic n="User" s={13} style={{ color:'#0066FF' }}/>
                  {item.presenter.name}
                </div>
              )}
              {item.whoFor && (
                <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 14px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1px solid rgba(0,102,255,0.18)', backdropFilter:'blur(10px)', fontSize:13, fontWeight:700, color:'#0a0a14' }}>
                  <Ic n="Target" s={13} style={{ color:'#0066FF' }}/>
                  For: {item.whoFor.split(',')[0]}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* 2. VIDEO PLAYER PLACEHOLDER */}
      <section className="dm-section" style={{ padding:'60px 32px', background:'#fff' }}>
        <div style={{ maxWidth:1180, margin:'0 auto' }}>
          <div className="rv dm-video" style={{ position:'relative', paddingBottom:'56.25%', height:0, borderRadius:24, overflow:'hidden', background:`linear-gradient(135deg, #0a0a14, ${category.color}40, #0a0a14)`, boxShadow:'0 24px 60px rgba(0,53,128,0.25)' }}>
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:20 }}>
              <button onClick={openConsult}
                style={{ width:88, height:88, borderRadius:'50%', background:'rgba(255,255,255,0.95)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', border:'none', boxShadow:'0 10px 30px rgba(0,0,0,0.30)', transition:'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform='scale(1.08)' }}
                onMouseLeave={e => { e.currentTarget.style.transform='scale(1)' }}>
                <Ic n="Play" s={36} style={{ color:category.color, marginLeft:5 }}/>
              </button>
              <div style={{ textAlign:'center', color:'#fff', maxWidth:480, padding:'0 20px' }}>
                <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:'rgba(255,255,255,0.70)', marginBottom:8 }}>WATCH THE DEMO</div>
                <div style={{ fontSize:18, fontWeight:700, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>{item.videoLength} · {item.demoType}</div>
                <div style={{ fontSize:13, color:'rgba(255,255,255,0.70)' }}>Click play or request a live walkthrough with our Solution Architect</div>
              </div>
            </div>

            {/* Subtle moving accent */}
            <div style={{ position:'absolute', top:'10%', right:'10%', width:200, height:200, borderRadius:'50%', background:`radial-gradient(circle, ${category.animAccent || '#67e8f9'}40, transparent 70%)`, filter:'blur(50px)', pointerEvents:'none' }}/>
            <div style={{ position:'absolute', bottom:'10%', left:'10%', width:160, height:160, borderRadius:'50%', background:`radial-gradient(circle, ${category.color}50, transparent 70%)`, filter:'blur(40px)', pointerEvents:'none' }}/>
          </div>
        </div>
      </section>


      {/* 3. WHAT YOU'LL LEARN */}
      {item.whatYouLearn && item.whatYouLearn.length > 0 && (
        <section className="dm-section" style={{ padding:'60px 32px 80px', background:'#fff' }}>
          <div style={{ maxWidth:1180, margin:'0 auto' }}>
            <div className="rv" style={{ textAlign:'center', marginBottom:40, maxWidth:760, margin:'0 auto 40px' }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${category.color}15`, border:`1px solid ${category.color}30`, borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:category.color, letterSpacing:'.14em', marginBottom:14 }}>
                WHAT YOU'LL LEARN
              </div>
              <h2 className="dm-h2" style={{ textAlign:'center' }}>By the end of this demo</h2>
            </div>

            <div className="rv dm-learn-g" style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:14, maxWidth:980, margin:'0 auto' }}>
              {item.whatYouLearn.map((point, i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:14, padding:'18px 22px', borderRadius:14, background:'linear-gradient(180deg, #fff, #f8fafc)', border:'1px solid #e2e8f0' }}>
                  <div style={{ width:32, height:32, borderRadius:'50%', background:category.color, color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, flexShrink:0, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{i + 1}</div>
                  <div style={{ fontSize:14, color:'#0a0a14', lineHeight:1.6, fontWeight:500, paddingTop:5 }}>{point}</div>
                </div>
              ))}
            </div>

            {item.prerequisites && (
              <div className="rv" style={{ marginTop:32, padding:'16px 24px', borderRadius:14, background:'#f0f7ff', border:'1px solid rgba(0,102,255,0.15)', maxWidth:980, margin:'32px auto 0', display:'flex', alignItems:'center', gap:14 }}>
                <Ic n="Shield" s={20} style={{ color:'#0066FF', flexShrink:0 }}/>
                <div style={{ fontSize:13, color:'#0a0a14' }}>
                  <strong>Prerequisites:</strong> {item.prerequisites}
                </div>
              </div>
            )}
          </div>
        </section>
      )}


      {/* 4. MICROSOFT STACK */}
      {item.microsoftStack && item.microsoftStack.length > 0 && (
        <section className="dm-section" style={{ padding:'80px 32px', position:'relative', overflow:'hidden', background:'linear-gradient(180deg, #f0f7ff 0%, #ecfeff 100%)' }}>
          <div style={{ position:'absolute', top:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.18), transparent 70%)', filter:'blur(50px)', pointerEvents:'none' }}/>

          <div style={{ maxWidth:1180, margin:'0 auto', position:'relative', zIndex:1 }}>
            <div className="rv" style={{ textAlign:'center', marginBottom:40, maxWidth:760, margin:'0 auto 40px' }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(0,102,255,0.10)', border:'1px solid rgba(0,102,255,0.25)', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:14 }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:'#0066FF' }}/>
                TECHNOLOGIES USED
              </div>
              <h2 className="dm-h2" style={{ textAlign:'center' }}>The Microsoft stack in this demo</h2>
            </div>

            <div className="rv dm-stack-g" style={{ display:'grid', gridTemplateColumns:`repeat(${item.microsoftStack.length}, 1fr)`, gap:14, maxWidth:1100, margin:'0 auto' }}>
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


      {/* 5. RELATED USE CASES */}
      {relUseCases.length > 0 && (
        <section className="dm-section" style={{ padding:'80px 32px', background:'#fff' }}>
          <div style={{ maxWidth:1180, margin:'0 auto' }}>
            <div className="rv" style={{ marginBottom:32, textAlign:'center' }}>
              <h2 className="dm-h2" style={{ textAlign:'center' }}>Use cases this demo applies to</h2>
              <p style={{ fontSize:14.5, color:'#475569' }}>Specific business outcomes built using the technology shown.</p>
            </div>
            <div className="rv dm-related-g" style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min(relUseCases.length, 3)}, 1fr)`, gap:18 }}>
              {relUseCases.slice(0, 3).map(uc => (
                <button key={uc.slug} onClick={() => navigate(`/use-case/${uc.category.slug}/${uc.slug}`)}
                  style={{ display:'flex', flexDirection:'column', padding:'24px 22px 20px', borderRadius:18, background:'linear-gradient(180deg, #fff, #f8fafc)', border:'1px solid #e2e8f0', cursor:'pointer', textAlign:'left', position:'relative', overflow:'hidden', transition:'all .22s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=uc.category.color+'55'; e.currentTarget.style.transform='translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.transform='none' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${uc.category.color}, ${uc.category.color}55)` }} />
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                    <div style={{ width:42, height:42, borderRadius:12, background:`linear-gradient(135deg, ${uc.category.color}, ${uc.category.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 6px 16px ${uc.category.color}38` }}>
                      <Ic n={uc.n} s={19} style={{ color:'#fff' }}/>
                    </div>
                    <span style={{ fontSize:10.5, fontWeight:800, color:uc.category.color, letterSpacing:'.08em' }}>USE CASE</span>
                  </div>
                  <h4 style={{ fontSize:15.5, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, lineHeight:1.3 }}>{uc.t}</h4>
                  <p style={{ fontSize:13, color:'#475569', lineHeight:1.6, marginBottom:14, flex:1 }}>{uc.d}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12.5, fontWeight:700, color:uc.category.color, paddingTop:12, borderTop:`1px solid ${uc.category.color}15` }}>
                    Explore use case <Ic n="Arrow" s={13} style={{ color:uc.category.color }}/>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* 6. RELATED DEMOS */}
      {otherDemos.length > 0 && (
        <section className="dm-section" style={{ padding:'72px 32px', background:'#f8fafc' }}>
          <div style={{ maxWidth:1180, margin:'0 auto' }}>
            <div className="rv" style={{ marginBottom:32 }}>
              <h3 style={{ fontSize:22, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>More demos</h3>
              <p style={{ fontSize:14, color:'#64748b' }}>Watch other Microsoft solution walkthroughs from our practice.</p>
            </div>
            <div className="rv dm-related-g" style={{ display:'grid', gridTemplateColumns:`repeat(${otherDemos.length}, 1fr)`, gap:18 }}>
              {otherDemos.map(dm => (
                <button key={dm.slug} onClick={() => navigate(`/resource/${category.slug}/${dm.slug}`)}
                  style={{ display:'flex', flexDirection:'column', padding:'22px 22px 18px', borderRadius:18, background:'#fff', border:'1px solid #e2e8f0', cursor:'pointer', textAlign:'left', position:'relative', overflow:'hidden', transition:'all .22s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=category.color+'55'; e.currentTarget.style.transform='translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.transform='none' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${category.color}, ${category.color}55)` }} />
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                    <div style={{ width:42, height:42, borderRadius:12, background:`linear-gradient(135deg, ${category.color}, ${category.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 6px 16px ${category.color}38` }}>
                      <Ic n="Play" s={18} style={{ color:'#fff', marginLeft:2 }}/>
                    </div>
                    <span style={{ fontSize:11, fontWeight:700, color:category.color }}>{dm.videoLength}</span>
                  </div>
                  <h4 style={{ fontSize:15, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, lineHeight:1.3 }}>{dm.t}</h4>
                  <p style={{ fontSize:12.5, color:'#475569', lineHeight:1.55, marginBottom:14, flex:1 }}>{dm.d}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* 7. CTA */}
      <section className="dm-cta-section" style={{ padding:'90px 32px', background:'linear-gradient(135deg, #003FB3 0%, #0066FF 60%, #06b6d4 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-100, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:880, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.30)', borderRadius:50, padding:'7px 16px', fontSize:11.5, fontWeight:800, color:'#fff', letterSpacing:'.14em', marginBottom:22, backdropFilter:'blur(10px)' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#67e8f9' }}/>
            WANT A LIVE WALKTHROUGH?
          </div>
          <h2 style={{ fontSize:'clamp(28px, 4.5vw, 42px)', fontWeight:900, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:16, lineHeight:1.15, letterSpacing:'-0.02em' }}>
            See this built for your environment
          </h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.85)', marginBottom:32, lineHeight:1.7, maxWidth:680, margin:'0 auto 32px' }}>
            30-minute custom demo with the Solution Architect from this video. We'll tailor the walkthrough to your specific industry, data sources, and integration requirements.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Btn onClick={openConsult} style={{ background:'#fff', color:'#003FB3' }}>Request Live Demo <Ic n="Arrow" s={14} style={{ color:'#003FB3' }}/></Btn>
            <Btn variant="ghost" onClick={() => navigate(`/resources/${category.slug}`)} style={{ borderColor:'rgba(255,255,255,0.4)', color:'#fff' }}>More Demos</Btn>
          </div>
        </div>
      </section>

    </div>
  )
}
