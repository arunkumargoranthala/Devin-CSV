import { useState, useEffect } from 'react'
import { C, Ic, Btn } from '../components/ui'
import { SOLUTIONS } from '../data/content'

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

export default function SolutionPage({ categorySlug, itemSlug, navigate, openConsult }) {
  const [openFaq, setOpenFaq] = useState(null)
  useReveal()
  useEffect(() => { window.scrollTo(0,0) }, [itemSlug])

  const category = SOLUTIONS.find(s => s.slug === categorySlug)
  const item = category?.items.find(it => it.slug === itemSlug)

  if (!category || !item) return (
    <div style={{ paddingTop:120, textAlign:'center', minHeight:'60vh' }}>
      <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:C.text }}>Page not found</h2>
      <button onClick={() => navigate('/')} style={{ marginTop:20, color:C.blue, background:'none', border:'none', cursor:'pointer', fontSize:15 }}>← Back to home</button>
    </div>
  )

  return (
    <div className="page-fade">

      {/* ─── Page-specific responsive CSS ─────────────────── */}
      <style dangerouslySetInnerHTML={{__html:`
        @media (max-width: 1023px) {
          .sp-hero-g { grid-template-columns: 1fr !important; gap: 36px !important; padding-bottom: 56px !important; }
          .sp-stats-card { max-width: 540px; margin: 0 auto; }
        }
        @media (max-width: 767px) {
          .sp-hero-wrap { padding: 32px 18px 0 !important; }
          .sp-hero-g { padding-bottom: 48px !important; }
          .sp-hero-g h1 { font-size: clamp(28px, 6.5vw, 40px) !important; }
          .sp-stats-card { padding: 22px !important; }
          .sp-cta-section { padding: 72px 20px !important; }
          .sp-cta-section h2 { font-size: clamp(24px, 6vw, 36px) !important; }
          .sp-cta-section p { font-size: 15px !important; }
          .sp-cta-buttons { width: 100%; flex-direction: column !important; align-items: stretch !important; }
          .sp-cta-buttons > * { width: 100%; justify-content: center; }
        }
        @media (max-width: 480px) {
          .sp-hero-g h1 { font-size: clamp(26px, 8vw, 34px) !important; }
        }
      `}}/>

      {/* ── LIGHT HERO (Global Offices recipe) ── */}
      <section style={{
        paddingTop:68, position:'relative', overflow:'hidden',
        background: `
          radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.35), transparent 55%),
          radial-gradient(circle at 80% 70%, rgba(0, 102, 255, 0.20), transparent 60%),
          linear-gradient(135deg, #ffffff 0%, #f0f7ff 25%, #d6ebff 55%, #b8defa 80%, #9bd3f5 100%)
        `
      }}>
        {/* Floating orbs */}
        <div style={{ position:'absolute', top:-100, right:-80, width:380, height:380, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.32), transparent 70%)', filter:'blur(48px)', animation:'heroFloat 9s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,102,255,0.20), transparent 70%)', filter:'blur(56px)', animation:'heroFloat 7s ease-in-out infinite reverse', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'40%', right:'18%', width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.30), transparent 70%)', filter:'blur(40px)', animation:'heroFloat 11s ease-in-out infinite', pointerEvents:'none' }} />

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
                  Delivered by Microsoft Inner Circle consultants
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding:'80px 24px', background:'#fff' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'inline-flex', background:category.bg, color:category.color, borderRadius:50, padding:'6px 16px', fontSize:12, fontWeight:700, marginBottom:16 }}>WHAT'S INCLUDED</div>
            <h2 style={{ fontSize:36, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Full feature set</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:16 }}>
            {(item.features||[]).map((f,i) => (
              <div key={i} className="rv feat-card" style={{ display:'flex', gap:12, padding:20, animationDelay:`${i*40}ms` }}>
                <div style={{ width:36, height:36, borderRadius:10, background:category.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Ic n="CheckCircle" s={16} style={{ color:category.color }}/>
                </div>
                <div style={{ fontSize:14, fontWeight:600, color:C.text, lineHeight:1.5 }}>{f}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases + Related */}
      <section style={{ padding:'80px 24px', background:C.bgSoft }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'start' }}>
          <div className="rv">
            <div style={{ display:'inline-flex', background:category.bg, color:category.color, borderRadius:50, padding:'6px 16px', fontSize:12, fontWeight:700, marginBottom:16 }}>WHO IS IT FOR?</div>
            <h2 style={{ fontSize:32, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:12 }}>Built for businesses like yours</h2>
            <p style={{ fontSize:15, color:C.textM, lineHeight:1.7, marginBottom:28 }}>{item.t} delivers the most value for these types of organisations.</p>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {(item.useCases||[]).map((u,i) => (
                <div key={i} className="use-case-card" style={{ animationDelay:`${i*60}ms` }}>
                  <div style={{ width:32, height:32, borderRadius:9, background:category.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Ic n="CheckCircle" s={14} style={{ color:category.color }}/>
                  </div>
                  <div style={{ fontSize:14.5, color:C.text, fontWeight:500, lineHeight:1.5 }}>{u}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rv">
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:C.textL, marginBottom:18 }}>MORE {category.heading.toUpperCase()} SOLUTIONS</div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {category.items.filter(it => it.slug !== itemSlug).map(rel => (
                <button key={rel.slug}
                  onClick={() => navigate(`/solution/${category.slug}/${rel.slug}`)}
                  style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 18px', borderRadius:16, border:`1.5px solid ${C.border}`, background:'#fff', cursor:'pointer', textAlign:'left', transition:'all .18s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=category.color+'55'; e.currentTarget.style.boxShadow=`0 4px 16px ${category.color}12`; e.currentTarget.style.transform='translateX(4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:category.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Ic n={rel.n} s={18} style={{ color:category.color }}/>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:C.text }}>{rel.t}</div>
                    <div style={{ fontSize:12, color:C.textL, marginTop:2 }}>{rel.d}</div>
                  </div>
                  <Ic n="ChevR" s={14} style={{ color:category.color, opacity:0.5 }}/>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {item.faq && (
        <section style={{ padding:'80px 24px', background:'#fff' }}>
          <div style={{ maxWidth:800, margin:'0 auto' }}>
            <div className="rv" style={{ textAlign:'center', marginBottom:40 }}>
              <h2 style={{ fontSize:34, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Frequently asked questions</h2>
              <p style={{ color:C.textM, fontSize:15 }}>Everything you need to know about {item.t}</p>
            </div>
            {item.faq.map((f,i) => (
              <div key={i} className={`acc-item ${openFaq===i?'open':''}`}>
                <button className="acc-trigger" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                  {f.q}
                  <Ic n={openFaq===i?'ChevU':'ChevD'} s={18} style={{ color:C.textL, flexShrink:0 }}/>
                </button>
                {openFaq===i && <div className="acc-body">{f.a}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA — premium 3-stop brand gradient */}
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
