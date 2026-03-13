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
      {/* ── DARK HERO ── */}
      <section style={{ background:'linear-gradient(135deg,#060d24 0%,#0d1a40 50%,#140828 100%)', paddingTop:68, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, right:-60, width:400, height:400, borderRadius:'50%', background:category.color+'1a', animation:'heroFloat 9s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, left:-40, width:220, height:220, borderRadius:'50%', background:`${C.purple}14`, animation:'heroFloat 6s ease-in-out infinite reverse', pointerEvents:'none' }} />

        <div style={{ maxWidth:1280, margin:'0 auto', padding:'56px 24px 0', position:'relative', zIndex:1 }}>
          {/* Breadcrumb */}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:28, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'rgba(255,255,255,.45)' }}>Home</button>
            <Ic n="ChevR" s={12} style={{ color:'rgba(255,255,255,.25)' }}/>
            <button onClick={() => navigate(`/solutions/${category.slug}`)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'rgba(255,255,255,.45)' }}>{category.heading}</button>
            <Ic n="ChevR" s={12} style={{ color:'rgba(255,255,255,.25)' }}/>
            <span style={{ fontSize:13, color:'rgba(255,255,255,.85)', fontWeight:600 }}>{item.t}</span>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 420px', gap:56, alignItems:'center', paddingBottom:64 }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:category.color+'22', border:`1px solid ${category.color}44`, borderRadius:50, padding:'6px 14px', fontSize:12, fontWeight:700, color:category.color, marginBottom:20 }}>
                <Ic n={category.icon} s={13} style={{ color:category.color }}/>
                {category.heading}
                {item.tag && <span style={{ background:C.orange, color:'#fff', borderRadius:50, padding:'2px 8px', fontSize:10, fontWeight:800, marginLeft:4 }}>{item.tag}</span>}
              </div>
              <h1 style={{ fontSize:'clamp(32px,5vw,52px)', fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:20, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                {item.t}
              </h1>
              <p style={{ fontSize:17, color:'rgba(255,255,255,.72)', lineHeight:1.8, marginBottom:36, maxWidth:560 }}>
                {item.hero}
              </p>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <Btn onClick={openConsult}>Get a Free Consultation <Ic n="Arrow" s={14} style={{ color:'#fff' }}/></Btn>
                <Btn variant="ghost" onClick={() => navigate(`/solutions/${category.slug}`)}>View all {category.heading}</Btn>
              </div>
            </div>

            {/* Stats card */}
            <div style={{ background:'rgba(255,255,255,.06)', border:'1.5px solid rgba(255,255,255,.12)', borderRadius:24, padding:28, backdropFilter:'blur(12px)' }}>
              <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:'rgba(255,255,255,.4)', marginBottom:18 }}>KEY RESULTS</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:18 }}>
                {(item.benefits||[]).map((b,i) => (
                  <div key={i} style={{ background: i===0 ? category.color+'22' : 'rgba(255,255,255,.05)', borderRadius:14, padding:'16px 14px', border:`1px solid ${i===0?category.color+'44':'rgba(255,255,255,.08)'}` }}>
                    <div style={{ fontSize:26, fontWeight:900, color: i===0 ? category.color : '#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1 }}>
                      {b.v}<span style={{ fontSize:13 }}>{b.u}</span>
                    </div>
                    <div style={{ fontSize:11.5, color:'rgba(255,255,255,.55)', marginTop:6 }}>{b.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:category.color+'22', border:`1px solid ${category.color}33`, borderRadius:12, padding:'13px 16px', display:'flex', alignItems:'center', gap:10 }}>
                <Ic n="CheckCircle" s={18} style={{ color:category.color, flexShrink:0 }}/>
                <div style={{ fontSize:12.5, color:category.color, fontWeight:600, lineHeight:1.4 }}>
                  Delivered by certified Microsoft Dynamics 365 specialists
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

      {/* CTA */}
      <section style={{ padding:'80px 24px', background:`linear-gradient(135deg,${C.blue},${C.purple})` }}>
        <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontSize:36, fontWeight:800, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14 }}>Ready to explore {item.t}?</h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,.85)', marginBottom:36, lineHeight:1.7 }}>Talk to a specialist who has implemented this exact solution dozens of times.</p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <Btn onClick={openConsult} style={{ background:'#fff', color:C.blue }}>Book Free Consultation <Ic n="Arrow" s={14} style={{ color:C.blue }}/></Btn>
            <Btn variant="ghost" onClick={() => navigate('/')}>Explore all solutions</Btn>
          </div>
        </div>
      </section>
    </div>
  )
}
