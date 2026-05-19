import { useState, useEffect } from 'react'
import { C, Ic, Btn } from '../components/ui'
import { SOLUTIONS } from '../data/content'

/* ════════════════════════════════════════════════════════════════════════════
 *  SolutionsIndexPage — the /solutions gallery landing page
 *  ────────────────────────────────────────────────────────────────────────────
 *  Mounted at #/solutions (no second URL segment). Acts as the "front door" to
 *  the entire solutions catalogue — surfacing all 5 categories, all 30 items,
 *  trust signals, methodology, and a final CTA.
 *
 *  Structure:
 *    1. Hero               — Global-Offices-style background + headline + trust
 *    2. Stats strip        — 4 credibility metrics
 *    3. What's new         — 2 newest items (tag "New") in a featured callout
 *    4. Categories         — 5 sections, each with all 6 items in a 3-col grid
 *    5. Why DevinStratus   — 4 differentiators
 *    6. How we deliver     — 5-phase methodology
 *    7. FAQ                — 5 strategic questions about engagement
 *    8. CTA                — final call to action
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

export default function SolutionsIndexPage({ navigate, openConsult }) {
  const [openFaq, setOpenFaq] = useState(null)
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  /* Find "New" tagged items across all categories for the What's-New section */
  const newItems = SOLUTIONS.flatMap(cat =>
    cat.items.filter(it => it.tag === 'New').map(it => ({ ...it, category: cat }))
  )

  return (
    <div className="page-fade">

      {/* ─── Page-specific responsive CSS ─────────────────── */}
      <style dangerouslySetInnerHTML={{__html:`
        @media (max-width: 1023px) {
          .sip-cat-items-g { grid-template-columns: repeat(2, 1fr) !important; }
          .sip-why-g { grid-template-columns: repeat(2, 1fr) !important; }
          .sip-process-g { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
          .sip-process-line { display: none !important; }
        }
        @media (max-width: 900px) {
          .sip-cat-header { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
          .sip-hero { padding: 32px 20px 64px !important; }
          .sip-hero h1 { font-size: clamp(30px, 7vw, 46px) !important; }
        }
        @media (max-width: 767px) {
          .sip-stats-g { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; row-gap: 28px !important; }
          .sip-stats-g > div { padding-left: 0 !important; border-left: none !important; }
          .sip-stats-g > div:nth-child(3),
          .sip-stats-g > div:nth-child(4) { padding-top: 22px !important; border-top: 1px solid #e2e8f0; }
          .sip-stats-g .stat-v { font-size: 36px !important; }
          .sip-whatsnew-g { grid-template-columns: 1fr !important; }
          .sip-trust-pills > div { font-size: 12px !important; padding: 7px 13px !important; }
          .sip-cat-icon-row { gap: 12px !important; }
          .sip-cat-icon-row > div:first-child { width: 46px !important; height: 46px !important; }
          .sip-cat-title { font-size: clamp(20px, 5vw, 26px) !important; }
          .sip-section { padding-left: 18px !important; padding-right: 18px !important; }
          .sip-stats-section { padding: 56px 18px !important; }
          .sip-whatsnew-section { padding: 72px 18px 50px !important; }
          .sip-cta-section { padding: 72px 20px !important; }
          .sip-cta-section h2 { font-size: clamp(24px, 6vw, 36px) !important; }
        }
        @media (max-width: 640px) {
          .sip-cat-items-g { grid-template-columns: 1fr !important; gap: 14px !important; }
        }
        @media (max-width: 480px) {
          .sip-why-g { grid-template-columns: 1fr !important; }
          .sip-process-g { grid-template-columns: 1fr !important; }
          .sip-cat-explore-btn { width: 100%; justify-content: center; }
          .sip-hero-ctas { width: 100%; flex-direction: column !important; align-items: stretch !important; }
          .sip-hero-ctas > * { width: 100%; justify-content: center; }
        }
      `}}/>

      {/* ════════════════════════════════════════════════════
         1.  HERO  — Inner Circle Partner positioning
         ════════════════════════════════════════════════════ */}
      <section style={{
        position:'relative', paddingTop:68, overflow:'hidden',
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

        <div className="sip-hero" style={{ maxWidth:1300, margin:'0 auto', padding:'56px 32px 100px', position:'relative', zIndex:1 }}>
          {/* Breadcrumb */}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:32, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Home</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <span style={{ fontSize:13, color:'#0a0a14', fontWeight:600 }}>Solutions</span>
          </div>

          {/* Eyebrow pill */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:'rgba(6,182,212,0.10)', border:'1px solid rgba(6,182,212,0.30)', borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:800, color:'#003FB3', letterSpacing:'.06em', marginBottom:24 }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#06b6d4', boxShadow:'0 0 0 4px rgba(6,182,212,0.20)', animation:'heroFloat 2s ease-in-out infinite' }} />
            MICROSOFT INNER CIRCLE PARTNER · 30 ENTERPRISE SOLUTIONS
          </div>

          {/* Headline */}
          <h1 style={{ fontSize:'clamp(36px, 5.5vw, 64px)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.02em', color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:24, maxWidth:980 }}>
            Built on Microsoft.<br />
            <span style={{ background:'linear-gradient(135deg, #06b6d4 0%, #0066FF 50%, #003FB3 100%)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              Engineered for enterprise outcomes.
            </span>
          </h1>

          {/* Subhead */}
          <p style={{ fontSize:17.5, color:'#334155', lineHeight:1.7, maxWidth:780, marginBottom:32 }}>
            From <strong style={{ color:'#0a0a14' }}>Copilot Studio</strong> to <strong style={{ color:'#0a0a14' }}>Microsoft Fabric</strong>, from <strong style={{ color:'#0a0a14' }}>Power Apps</strong> to <strong style={{ color:'#0a0a14' }}>Foundry</strong> — we design, deliver, and operate enterprise solutions across 5 Microsoft platforms. <strong style={{ color:'#0a0a14' }}>350+ implementations.</strong> 96% on-time go-live rate. Zero failed projects since founding.
          </p>

          {/* Trust pills */}
          <div className="sip-trust-pills" style={{ display:'flex', flexWrap:'wrap', gap:14, marginBottom:40 }}>
            {[
              { icon:'Award', text:'Inner Circle (Top 1%) Partner' },
              { icon:'Target', text:'350+ Implementations Delivered' },
              { icon:'Globe', text:'UK · USA · Canada · India' },
              { icon:'CheckCircle', text:'96% On-Time Go-Live Rate' },
            ].map((t,i) => (
              <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'9px 16px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1px solid rgba(0,102,255,0.18)', backdropFilter:'blur(10px)', fontSize:13, fontWeight:700, color:'#0a0a14' }}>
                <Ic n={t.icon} s={14} style={{ color:'#0066FF' }}/>
                {t.text}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="sip-hero-ctas" style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            <Btn onClick={openConsult}>Talk to a Solution Architect <Ic n="Arrow" s={14} style={{ color:'#fff' }}/></Btn>
            <button onClick={() => { const el = document.getElementById('categories'); if (el) el.scrollIntoView({ behavior:'smooth' }) }}
              style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 26px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1.5px solid rgba(0,102,255,0.30)', backdropFilter:'blur(10px)', cursor:'pointer', fontSize:15, fontWeight:700, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
              Browse 30 Solutions <Ic n="ChevD" s={14} style={{ color:'#0066FF' }}/>
            </button>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         2.  STATS STRIP  — credibility numbers
         ════════════════════════════════════════════════════ */}
      <section className="sip-stats-section" style={{ padding:'72px 32px', background:'#fff', borderTop:'1px solid #e2e8f0', borderBottom:'1px solid #e2e8f0' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv sip-stats-g" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:32 }}>
            {[
              { v:'30',    l:'Enterprise solutions',  s:'Across 5 Microsoft platforms' },
              { v:'350+',  l:'Implementations',       s:'Delivered since 2007' },
              { v:'96%',   l:'On-time go-live',        s:'Track record every quarter' },
              { v:'100+',  l:'Certified consultants',  s:'UK · US · CA · IN' },
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
         3.  WHAT'S NEW THIS QUARTER  — featured "New" items
         ════════════════════════════════════════════════════ */}
      {newItems.length > 0 && (
        <section className="sip-whatsnew-section" style={{ padding:'90px 32px 60px', background:'#f8fafc', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-80, right:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.10), transparent 70%)', filter:'blur(50px)', pointerEvents:'none' }} />
          <div style={{ maxWidth:1300, margin:'0 auto', position:'relative', zIndex:1 }}>
            <div className="rv" style={{ marginBottom:36, textAlign:'center' }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#06b6d418', border:'1px solid #06b6d440', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#06b6d4' }}/>
                WHAT'S NEW THIS QUARTER
              </div>
              <h2 style={{ fontSize:'clamp(28px, 3.5vw, 38px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:12 }}>Newest capabilities in our catalogue</h2>
              <p style={{ fontSize:15, color:'#64748b', maxWidth:580, margin:'0 auto', lineHeight:1.6 }}>
                Microsoft ships fast. We launch new solutions the same quarter they hit GA — fully scoped, priced, and ready to deploy.
              </p>
            </div>

            <div className="rv sip-whatsnew-g" style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:24 }}>
              {newItems.map((it,i) => (
                <button key={it.slug} onClick={() => navigate(`/solution/${it.category.slug}/${it.slug}`)}
                  style={{ display:'flex', flexDirection:'column', padding:'30px 30px 28px', borderRadius:20, background:'#fff', border:'1px solid #e2e8f0', cursor:'pointer', textAlign:'left', position:'relative', overflow:'hidden', transition:'all .25s', boxShadow:'0 2px 8px rgba(15,23,42,0.04)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 12px 30px ${it.category.color}22`; e.currentTarget.style.borderColor=it.category.color+'55' }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 2px 8px rgba(15,23,42,0.04)'; e.currentTarget.style.borderColor='#e2e8f0' }}>
                  {/* Decorative corner */}
                  <div style={{ position:'absolute', top:-40, right:-40, width:160, height:160, borderRadius:'50%', background:`radial-gradient(circle, ${it.category.color}18, transparent 70%)`, pointerEvents:'none' }}/>

                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18, position:'relative', zIndex:1 }}>
                    <div style={{ width:50, height:50, borderRadius:14, background:`linear-gradient(135deg, ${it.category.color}, ${it.category.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 6px 18px ${it.category.color}38` }}>
                      <Ic n={it.n} s={22} style={{ color:'#fff' }}/>
                    </div>
                    <span style={{ fontSize:10.5, fontWeight:800, padding:'4px 10px', borderRadius:50, background:'#06b6d4', color:'#fff', letterSpacing:'.06em' }}>NEW</span>
                  </div>

                  <div style={{ fontSize:11.5, fontWeight:700, color:it.category.color, letterSpacing:'.08em', marginBottom:6, textTransform:'uppercase' }}>{it.category.heading}</div>
                  <h3 style={{ fontSize:21, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:10, letterSpacing:'-0.01em' }}>{it.t}</h3>
                  <p style={{ fontSize:14, color:'#475569', lineHeight:1.65, marginBottom:16, flex:1 }}>{it.hero.split('.').slice(0,2).join('.') + '.'}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, fontWeight:700, color:it.category.color }}>
                    Learn more <Ic n="Arrow" s={13} style={{ color:it.category.color }}/>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ════════════════════════════════════════════════════
         4.  CATEGORIES  — 5 sections, each with 6 items
         ════════════════════════════════════════════════════ */}
      <section className="sip-section" id="categories" style={{ background:'#fff', padding:'90px 32px 60px' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:60, maxWidth:780, margin:'0 auto 60px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#0066FF15', border:'1px solid #0066FF30', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              SOLUTION CATEGORIES · {SOLUTIONS.length} PLATFORMS
            </div>
            <h2 style={{ fontSize:'clamp(28px, 4vw, 42px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14, lineHeight:1.15 }}>Solutions, grouped by what they do for your business</h2>
            <p style={{ fontSize:16, color:'#475569', lineHeight:1.7 }}>
              Every solution is a complete delivery commitment — design through go-live, with hypercare and ongoing optimisation. Specific scopes. Fixed prices. Real outcomes.
            </p>
          </div>
        </div>

        {SOLUTIONS.map((cat, catIdx) => (
          <div key={cat.slug} style={{ maxWidth:1300, margin:'0 auto', paddingTop: catIdx === 0 ? 0 : 60, paddingBottom:24 }}>

            {/* Category header */}
            <div className="rv sip-cat-header" style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:24, marginBottom:36, paddingBottom:24, borderBottom:`1px solid ${cat.color}20` }}>
              <div style={{ maxWidth:720 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
                  <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:13, fontWeight:800, letterSpacing:'.14em', color:cat.color }}>0{catIdx + 1}</span>
                  <span style={{ width:32, height:1, background:cat.color, opacity:0.4 }}/>
                  <span style={{ fontSize:11.5, fontWeight:800, letterSpacing:'.14em', color:'#64748b', textTransform:'uppercase' }}>{cat.heading}</span>
                </div>
                <div className="sip-cat-icon-row" style={{ display:'flex', alignItems:'center', gap:16, marginBottom:14 }}>
                  <div style={{ width:54, height:54, borderRadius:15, background:`linear-gradient(135deg, ${cat.color}, ${cat.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 8px 22px ${cat.color}38`, flexShrink:0 }}>
                    <Ic n={cat.icon} s={24} style={{ color:'#fff' }}/>
                  </div>
                  <h3 className="sip-cat-title" style={{ fontSize:'clamp(22px, 2.8vw, 30px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:'-0.01em', lineHeight:1.2 }}>{cat.tagline}</h3>
                </div>
                <p style={{ fontSize:15, color:'#475569', lineHeight:1.7 }}>{cat.overview}</p>
              </div>

              <button onClick={() => navigate(`/solutions/${cat.slug}`)}
                className="sip-cat-explore-btn"
                style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 22px', borderRadius:50, background:cat.bg, border:`1.5px solid ${cat.color}40`, color:cat.color, fontSize:13.5, fontWeight:700, cursor:'pointer', transition:'all .2s', whiteSpace:'nowrap', fontFamily:"'Plus Jakarta Sans',sans-serif" }}
                onMouseEnter={e => { e.currentTarget.style.background=cat.color; e.currentTarget.style.color='#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background=cat.bg; e.currentTarget.style.color=cat.color }}>
                Explore {cat.heading.replace(' Solutions','').replace(' Solutions','')} <Ic n="Arrow" s={13} style={{ color:'currentColor' }}/>
              </button>
            </div>

            {/* Items grid */}
            <div className="rv sip-cat-items-g" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16 }}>
              {cat.items.map((it,i) => (
                <button key={it.slug} onClick={() => navigate(`/solution/${cat.slug}/${it.slug}`)}
                  style={{ display:'flex', flexDirection:'column', padding:'22px 22px 20px', borderRadius:16, background:'#fff', border:'1px solid #e2e8f0', cursor:'pointer', textAlign:'left', position:'relative', overflow:'hidden', transition:'all .22s', minHeight:170 }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor=cat.color+'55'; e.currentTarget.style.boxShadow=`0 10px 26px ${cat.color}1f` }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.boxShadow='none' }}>
                  <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:`linear-gradient(180deg, ${cat.color}, ${cat.color}55)`, opacity:0.6 }}/>

                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:cat.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <Ic n={it.n} s={17} style={{ color:cat.color }}/>
                    </div>
                    {it.tag && <span style={{ fontSize:9.5, fontWeight:800, padding:'3px 8px', borderRadius:50, background:it.tag==='New'?'#06b6d4':(it.tag==='Most Popular'?cat.color:'#1E40AF'), color:'#fff', letterSpacing:'.04em' }}>{it.tag.toUpperCase()}</span>}
                  </div>

                  <h4 style={{ fontSize:15, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6, letterSpacing:'-0.005em', lineHeight:1.3 }}>{it.t}</h4>
                  <p style={{ fontSize:13, color:'#475569', lineHeight:1.55, flex:1, marginBottom:12 }}>{it.d}</p>

                  <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:700, color:cat.color }}>
                    Learn more <Ic n="ChevR" s={12} style={{ color:cat.color }}/>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>


      {/* ════════════════════════════════════════════════════
         5.  WHY DEVINSTRATUS  — 4 differentiators
         ════════════════════════════════════════════════════ */}
      <section style={{ padding:'100px 32px', background:'linear-gradient(180deg, #f8fafc 0%, #f0f7ff 100%)' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:56, maxWidth:760, margin:'0 auto 56px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#0066FF15', border:'1px solid #0066FF30', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              WHY DEVINSTRATUS
            </div>
            <h2 style={{ fontSize:'clamp(28px, 4vw, 40px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14, lineHeight:1.15 }}>
              The partner enterprises choose when failure isn't an option
            </h2>
            <p style={{ fontSize:16, color:'#475569', lineHeight:1.7 }}>
              We're not a generalist consultancy with a Microsoft practice. We're a Microsoft-native firm with Inner Circle status — recognised by Redmond as one of the top 1% of partners worldwide.
            </p>
          </div>

          <div className="rv sip-why-g" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20 }}>
            {[
              { icon:'Award', accent:'#0066FF', title:'Inner Circle Partner', desc:'Top 1% of Microsoft partners worldwide. Direct line to product engineering, early access to Foundry, Fabric, and Copilot Studio releases.' },
              { icon:'Users', accent:'#003FB3', title:'100+ Certified Consultants', desc:'Functional, technical, architecture, integration, and data specialists across the full Microsoft stack. Average tenure: 7+ years in Dynamics.' },
              { icon:'Target', accent:'#06b6d4', title:'Proven Methodology', desc:'5-phase delivery framework refined over 350+ implementations. Fixed-price scope before any commitment. 96% on-time. Zero failed projects.' },
              { icon:'Globe', accent:'#0EA5E9', title:'4 Delivery Regions', desc:'UK, USA, Canada, and India teams — supporting global rollouts, follow-the-sun support, and multi-country, multi-currency operations.' },
            ].map((item,i) => (
              <div key={i} style={{ padding:'30px 26px', borderRadius:20, background:'#fff', border:'1px solid #e2e8f0', position:'relative', overflow:'hidden', transition:'all .25s' }}>
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
         6.  HOW WE DELIVER  — 5-phase methodology
         ════════════════════════════════════════════════════ */}
      <section style={{ padding:'100px 32px', background:'#fff' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:72, maxWidth:760, margin:'0 auto 72px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#003FB315', border:'1px solid #003FB330', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              5-PHASE DELIVERY METHODOLOGY
            </div>
            <h2 style={{ fontSize:'clamp(28px, 4vw, 40px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14, lineHeight:1.15 }}>
              How we deliver — without surprises
            </h2>
            <p style={{ fontSize:16, color:'#475569', lineHeight:1.7 }}>
              Refined over 350+ enterprise implementations. Fixed-price scope before commitment. Weekly demos. Quality gates at every phase. No "scope creep" surprises in week 12.
            </p>
          </div>

          <div className="rv sip-process-g" style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:18, position:'relative' }}>
            {/* Connecting line */}
            <div className="sip-process-line" style={{ position:'absolute', top:48, left:'10%', right:'10%', height:2, background:'linear-gradient(90deg, #0066FF22 0%, #003FB322 50%, #06b6d422 100%)', zIndex:0 }}/>

            {[
              { n:'01', icon:'Target',  title:'Discover',  weeks:'1–2 wk',  desc:'Process mapping, stakeholder interviews, success metrics defined. Output: fixed-price scope.' },
              { n:'02', icon:'Layers',  title:'Design',     weeks:'2–3 wk',  desc:'Solution architecture, data model, integration design — all client-approved before build.' },
              { n:'03', icon:'Cpu',      title:'Build',      weeks:'4–12 wk', desc:'Configure, customise, integrate. Weekly sprint demos. UAT environment from week 1.' },
              { n:'04', icon:'Rocket',   title:'Deliver',    weeks:'2–3 wk',  desc:'UAT, training, cutover, go-live, 4-week hypercare. We are there for every minute of week 1.' },
              { n:'05', icon:'LifeBuoy', title:'Support',    weeks:'Ongoing', desc:'Named consultant, SLA-backed managed service, monthly optimisation, quarterly roadmap.' },
            ].map((s,i) => (
              <div key={i} style={{ padding:'32px 22px 26px', borderRadius:20, background:'linear-gradient(180deg, #ffffff, #fafcff)', border:'1px solid rgba(0,102,255,0.10)', position:'relative', zIndex:1, boxShadow:'0 1px 3px rgba(0,53,128,0.04)' }}>
                <div style={{ width:56, height:56, borderRadius:'50%', background:'linear-gradient(135deg, #0066FF, #003FB3)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', boxShadow:'0 8px 22px rgba(0,102,255,0.30)' }}>
                  <Ic n={s.icon} s={22} style={{ color:'#fff' }}/>
                </div>
                <div style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:11, fontWeight:800, color:'#0066FF', letterSpacing:'.14em', marginBottom:6, textAlign:'center' }}>{s.n}</div>
                <h3 style={{ fontSize:16, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:4, textAlign:'center' }}>{s.title}</h3>
                <div style={{ fontSize:11.5, fontWeight:700, color:'#06b6d4', textAlign:'center', marginBottom:12 }}>{s.weeks}</div>
                <p style={{ fontSize:12.5, color:'#64748b', lineHeight:1.6, textAlign:'center' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         7.  FAQ  — strategic engagement questions
         ════════════════════════════════════════════════════ */}
      <section style={{ padding:'100px 32px', background:'#f8fafc' }}>
        <div style={{ maxWidth:880, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#06b6d418', border:'1px solid #06b6d440', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 style={{ fontSize:'clamp(28px, 4vw, 38px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14, lineHeight:1.15 }}>
              How we engage with enterprise clients
            </h2>
            <p style={{ fontSize:15.5, color:'#475569', lineHeight:1.7 }}>
              The questions we hear most often from CFOs, CIOs, and Heads of Transformation before signing.
            </p>
          </div>

          <div className="rv">
            {[
              { q:"How do we choose which solution to start with?",
                a:"Our Discovery phase scores your candidate use-cases on volume, time saved, error reduction, and strategic importance — producing a prioritised, ROI-ranked backlog before we build anything. We start with high-ROI, low-complexity wins to build momentum, then expand. Most clients deploy 2–4 solutions in year one." },
              { q:"How long until we see measurable ROI?",
                a:"Most workflow and approval automation projects pay back inside 4–6 months. Copilot and knowledge assistants typically pay back in 4 months from reduced helpdesk volume. Larger D365 implementations have longer ROI horizons (12–18 months) but with much bigger TCO impact. We always quote a measurable business metric upfront." },
              { q:"What's the engagement model — fixed price or time-and-materials?",
                a:"For well-scoped deliveries (most implementations, automations, Power Apps builds), we work fixed-price. We use a paid Discovery phase first to nail the scope, then commit. For exploratory work or ongoing managed services, time-and-materials with weekly sprint reviews. Either way: no surprise bills." },
              { q:"Can your solutions span multiple business units, countries, or currencies?",
                a:"Yes — multi-entity, multi-country, multi-currency is the norm in our enterprise work. We routinely deliver across 20+ country variations within a single solution. Localisation, language, tax rules, and regulatory variants are designed in from day one — not bolted on after." },
              { q:"How are projects governed and reported on?",
                a:"Every engagement has a named Solution Architect, a Project Manager, a weekly steering committee with your stakeholders, and a fortnightly executive review. We provide live RAID logs (Risks, Actions, Issues, Decisions), burndown charts, and budget tracking — all visible to you in real-time, not just at month-end." },
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
         8.  FINAL CTA
         ════════════════════════════════════════════════════ */}
      <section className="sip-cta-section" style={{ padding:'100px 32px', background:'linear-gradient(135deg, #003FB3 0%, #0066FF 60%, #06b6d4 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-100, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:880, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.30)', borderRadius:50, padding:'7px 16px', fontSize:11.5, fontWeight:800, color:'#fff', letterSpacing:'.14em', marginBottom:24, backdropFilter:'blur(10px)' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#67e8f9' }}/>
            READY WHEN YOU ARE
          </div>

          <h2 style={{ fontSize:'clamp(30px, 4.5vw, 46px)', fontWeight:900, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:18, lineHeight:1.1, letterSpacing:'-0.02em' }}>
            Tell us what's slowing your business down.
          </h2>
          <p style={{ fontSize:17, color:'rgba(255,255,255,0.85)', marginBottom:36, lineHeight:1.7, maxWidth:680, margin:'0 auto 36px' }}>
            30-minute discovery call with a Solution Architect. No sales pitch. No obligation. You'll leave with a clear sense of which capabilities will move the needle — and a rough timeline and budget for getting there.
          </p>

          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', marginBottom:32 }}>
            <Btn onClick={openConsult} style={{ background:'#fff', color:'#003FB3' }}>
              Book Solution Architect Call <Ic n="Arrow" s={14} style={{ color:'#003FB3' }}/>
            </Btn>
            <Btn variant="ghost" onClick={() => navigate('/company/team')} style={{ borderColor:'rgba(255,255,255,0.4)', color:'#fff' }}>
              Meet the Team
            </Btn>
          </div>

          <div style={{ display:'flex', gap:24, justifyContent:'center', flexWrap:'wrap', paddingTop:24, borderTop:'1px solid rgba(255,255,255,0.15)' }}>
            {[
              'Solution architect on first call',
              'Fixed-price scope before commitment',
              'Response within 1 business day',
            ].map((t,i) => (
              <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:13, color:'rgba(255,255,255,0.85)', fontWeight:600 }}>
                <Ic n="CheckCircle" s={14} style={{ color:'#67e8f9' }}/>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
