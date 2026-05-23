import { useState, useEffect } from 'react'
import { C, Ic, Btn } from '../components/ui'
import { RESOURCES } from '../data/resources'

/* ════════════════════════════════════════════════════════════════════════════
 *  ResourcesIndexPage — the /resources gallery landing
 *  ────────────────────────────────────────────────────────────────────────────
 *  Structure:
 *    1. Hero (light Global-Offices recipe + knowledge hub positioning)
 *    2. Stats strip — 4 credibility numbers
 *    3. Resource categories grid — 5 category cards with top items
 *    4. Featured resources — latest/featured from each category
 *    5. Why our resources — 4 trust signals
 *    6. FAQ — buyer questions about resource access
 *    7. Final CTA — book a discovery call or browse
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

export default function ResourcesIndexPage({ navigate, openConsult }) {
  const [openFaq, setOpenFaq] = useState(null)
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const totalResources = RESOURCES.reduce((sum, c) => sum + c.items.length, 0)

  /* Featured: take 1 'Featured' or 'Most Popular' item from each category, else the first */
  const featured = RESOURCES.map(cat => {
    const tagged = cat.items.find(i => i.tag === 'Featured' || i.tag === 'Most Popular')
    return { ...(tagged || cat.items[0]), category: cat }
  })

  return (
    <div className="page-fade" style={{ overflowX:'hidden', maxWidth:'100vw' }}>

      {/* ─── Page-specific responsive CSS ─────────────────── */}
      <style dangerouslySetInnerHTML={{__html:`
        @media (max-width: 1023px) {
          .rip-cats-g { grid-template-columns: repeat(2, 1fr) !important; }
          .rip-featured-g { grid-template-columns: repeat(2, 1fr) !important; }
          .rip-why-g { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .rip-hero { padding: 32px 20px 64px !important; }
          .rip-hero h1 { font-size: clamp(30px, 7vw, 46px) !important; }
        }
        @media (max-width: 767px) {
          .rip-stats-g { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; row-gap: 28px !important; }
          .rip-stats-g > div { padding-left: 0 !important; border-left: none !important; }
          .rip-stats-g > div:nth-child(3),
          .rip-stats-g > div:nth-child(4) { padding-top: 22px !important; border-top: 1px solid #e2e8f0; }
          .rip-stats-g .stat-v { font-size: 36px !important; }
          .rip-trust-pills > div { font-size: 12px !important; padding: 7px 13px !important; }
          .rip-section { padding-left: 18px !important; padding-right: 18px !important; }
          .rip-stats-section { padding: 56px 18px !important; }
          .rip-cta-section { padding: 72px 20px !important; }
          .rip-cta-section h2 { font-size: clamp(24px, 6vw, 36px) !important; }
        }
        @media (max-width: 640px) {
          .rip-cats-g { grid-template-columns: 1fr !important; gap: 16px !important; }
          .rip-featured-g { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
        @media (max-width: 480px) {
          .rip-why-g { grid-template-columns: 1fr !important; }
          .rip-hero-ctas { width: 100%; flex-direction: column !important; align-items: stretch !important; }
          .rip-hero-ctas > * { width: 100%; justify-content: center; }
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

        <div className="rip-hero" style={{ maxWidth:1300, margin:'0 auto', padding:'56px 32px 100px', position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:32, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Home</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <span style={{ fontSize:13, color:'#0a0a14', fontWeight:600 }}>Resources</span>
          </div>

          <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:'rgba(6,182,212,0.10)', border:'1px solid rgba(6,182,212,0.30)', borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:800, color:'#003FB3', letterSpacing:'.06em', marginBottom:24 }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#06b6d4', boxShadow:'0 0 0 4px rgba(6,182,212,0.20)', animation:'heroFloat 2s ease-in-out infinite' }} />
            KNOWLEDGE HUB · {totalResources} FREE RESOURCES
          </div>

          <h1 style={{ fontSize:'clamp(36px, 5.5vw, 64px)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.02em', color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:24, maxWidth:980 }}>
            Sharp thinking.<br />
            <span style={{ background:'linear-gradient(135deg, #06b6d4 0%, #0066FF 50%, #003FB3 100%)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              Real client outcomes.
            </span>
          </h1>

          <p style={{ fontSize:17.5, color:'#334155', lineHeight:1.7, maxWidth:780, marginBottom:32 }}>
            Case studies, solution demos, thought leadership, ROI tools, and industry playbooks — built from hands-on enterprise Microsoft engagements. No gated content. No registration walls. Everything free to access.
          </p>

          <div className="rip-trust-pills" style={{ display:'flex', flexWrap:'wrap', gap:14, marginBottom:40 }}>
            {[
              { icon:'CheckCircle', text:'No registration required' },
              { icon:'Award',       text:'Field-tested insights' },
              { icon:'FileText',    text:'Downloadable PDFs' },
              { icon:'Zap',         text:'Updated weekly' },
            ].map((t,i) => (
              <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'9px 16px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1px solid rgba(0,102,255,0.18)', backdropFilter:'blur(10px)', fontSize:13, fontWeight:700, color:'#0a0a14' }}>
                <Ic n={t.icon} s={14} style={{ color:'#0066FF' }}/>
                {t.text}
              </div>
            ))}
          </div>

          <div className="rip-hero-ctas" style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            <Btn onClick={() => { const el = document.getElementById('resource-categories'); if (el) el.scrollIntoView({ behavior:'smooth' }) }}>
              Browse {totalResources} resources <Ic n="ChevD" s={14} style={{ color:'#fff' }}/>
            </Btn>
            <button onClick={openConsult}
              style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 26px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1.5px solid rgba(0,102,255,0.30)', backdropFilter:'blur(10px)', cursor:'pointer', fontSize:15, fontWeight:700, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
              Talk to an Architect <Ic n="Arrow" s={14} style={{ color:'#0066FF' }}/>
            </button>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         2.  STATS STRIP
         ════════════════════════════════════════════════════ */}
      <section className="rip-stats-section" style={{ padding:'72px 32px', background:'#fff', borderTop:'1px solid #e2e8f0', borderBottom:'1px solid #e2e8f0' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv rip-stats-g" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:32 }}>
            {[
              { v:totalResources.toString(), l:'Free resources',         s:'Case studies, demos, playbooks' },
              { v:'5',                        l:'Resource categories',    s:'Across the buyer journey' },
              { v:'50+',                      l:'Engagements behind them', s:'Real outcomes, not marketing fluff' },
              { v:'£28M+',                    l:'Documented client savings', s:'Across case study portfolio' },
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
         3.  RESOURCE CATEGORIES GRID
         ════════════════════════════════════════════════════ */}
      <section className="rip-section" id="resource-categories" style={{ padding:'90px 32px 60px', background:'#fff' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:56, maxWidth:780, margin:'0 auto 56px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#0066FF15', border:'1px solid #0066FF30', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              BROWSE BY TYPE
            </div>
            <h2 style={{ fontSize:'clamp(28px, 4vw, 42px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14, lineHeight:1.15 }}>
              Pick a category — start reading or watching
            </h2>
            <p style={{ fontSize:16, color:'#475569', lineHeight:1.7 }}>
              Each category contains in-depth content built from real client engagements. Click any category to browse all resources.
            </p>
          </div>

          <div className="rv rip-cats-g" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20 }}>
            {RESOURCES.map((cat, idx) => (
              <button key={cat.slug} onClick={() => navigate(`/resources/${cat.slug}`)}
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
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor=cat.color+'55'; e.currentTarget.style.boxShadow=`0 14px 32px ${cat.color}22` }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='rgba(0,102,255,0.10)'; e.currentTarget.style.boxShadow='0 1px 3px rgba(0, 53, 128, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)' }}>

                <div style={{ position:'absolute', top:-50, right:-50, width:180, height:180, borderRadius:'50%', background:`radial-gradient(circle, ${cat.color}22, transparent 70%)`, pointerEvents:'none' }} />

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18, position:'relative', zIndex:1 }}>
                  <div style={{ width:52, height:52, borderRadius:15, background:`linear-gradient(135deg, ${cat.color}, ${cat.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 8px 22px ${cat.color}38` }}>
                    <Ic n={cat.icon} s={24} style={{ color:'#fff' }} />
                  </div>
                  <span style={{ fontSize:10.5, fontWeight:800, letterSpacing:'.14em', color:'#94a3b8', fontFamily:"'JetBrains Mono', monospace" }}>0{idx + 1}</span>
                </div>

                <h3 style={{ fontSize:20, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:10, position:'relative', zIndex:1, letterSpacing:'-0.01em', lineHeight:1.2 }}>{cat.heading}</h3>
                <p style={{ fontSize:13.5, color:'#475569', lineHeight:1.6, marginBottom:18, position:'relative', zIndex:1 }}>{cat.desc}</p>

                <div style={{ flex:1, display:'flex', flexDirection:'column', gap:9, marginBottom:18, position:'relative', zIndex:1 }}>
                  {cat.items.slice(0, 4).map((it, i) => (
                    <div key={it.slug} style={{ display:'flex', alignItems:'center', gap:10, fontSize:12.5, color:'#0a0a14', fontWeight:600, lineHeight:1.35 }}>
                      <span style={{ width:5, height:5, borderRadius:'50%', background:cat.color, flexShrink:0, opacity:0.95 - (i * 0.12) }} />
                      <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{it.t}</span>
                    </div>
                  ))}
                  {cat.items.length > 4 && (
                    <div style={{ fontSize:11.5, color:cat.color, fontWeight:700, fontStyle:'italic', marginTop:2 }}>
                      +{cat.items.length - 4} more
                    </div>
                  )}
                </div>

                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative', zIndex:1, paddingTop:14, borderTop:`1px solid ${cat.color}15` }}>
                  <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'6px 13px', borderRadius:50, background:`${cat.color}12`, fontSize:12, fontWeight:700, color:cat.color }}>
                    <span style={{ width:5, height:5, borderRadius:'50%', background:cat.color }} />
                    {cat.items.length} {cat.items.length === 1 ? 'resource' : 'resources'}
                  </span>
                  <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:32, height:32, borderRadius:'50%', background:`${cat.color}12` }}>
                    <Ic n="Arrow" s={14} style={{ color:cat.color }} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         4.  FEATURED RESOURCES — top pick from each category
         ════════════════════════════════════════════════════ */}
      <section className="rip-section" style={{ padding:'90px 32px', background:'linear-gradient(180deg, #f8fafc 0%, #f0f7ff 100%)' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv" style={{ marginBottom:48, display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:16 }}>
            <div style={{ maxWidth:560 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(6,182,212,0.12)', border:'1px solid rgba(6,182,212,0.30)', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
                <Ic n="Star" s={13} style={{ color:'#06b6d4' }}/>
                EDITOR PICKS
              </div>
              <h2 style={{ fontSize:'clamp(26px, 3.6vw, 36px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1.2 }}>
                Most popular this month
              </h2>
            </div>
            <button onClick={() => { const el = document.getElementById('resource-categories'); if (el) el.scrollIntoView({ behavior:'smooth' }) }}
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', borderRadius:50, background:'#fff', border:'1px solid #e2e8f0', cursor:'pointer', fontSize:13, fontWeight:700, color:'#0a0a14' }}>
              Browse all {totalResources} <Ic n="Arrow" s={13} style={{ color:'#0066FF' }}/>
            </button>
          </div>

          <div className="rv rip-featured-g" style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:16 }}>
            {featured.map((res, i) => (
              <button key={res.slug} onClick={() => navigate(`/resource/${res.category.slug}/${res.slug}`)}
                style={{ display:'flex', flexDirection:'column', padding:'22px 20px 20px', borderRadius:18, border:'1px solid #e2e8f0', background:'#fff', cursor:'pointer', textAlign:'left', position:'relative', overflow:'hidden', transition:'all .22s', minHeight:300 }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor=res.category.color+'55'; e.currentTarget.style.boxShadow=`0 12px 28px ${res.category.color}1f` }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.boxShadow='none' }}>

                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${res.category.color}, ${res.category.color}55)` }} />

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                  <div style={{ width:42, height:42, borderRadius:12, background:`linear-gradient(135deg, ${res.category.color}, ${res.category.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 6px 16px ${res.category.color}38` }}>
                    <Ic n={res.n} s={19} style={{ color:'#fff' }}/>
                  </div>
                  {res.tag && (
                    <span style={{ fontSize:9.5, fontWeight:800, padding:'3px 9px', borderRadius:50, background:'#06b6d4', color:'#fff', letterSpacing:'.04em' }}>
                      {res.tag.toUpperCase()}
                    </span>
                  )}
                </div>

                <div style={{ fontSize:10.5, fontWeight:800, letterSpacing:'.10em', color:res.category.color, marginBottom:8 }}>
                  {res.category.heading.toUpperCase()}
                </div>

                <h4 style={{ fontSize:14.5, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, lineHeight:1.3, flex:'0 1 auto' }}>{res.t}</h4>
                <p style={{ fontSize:12.5, color:'#475569', lineHeight:1.55, marginBottom:12, flex:1, display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{res.d}</p>

                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:10, borderTop:`1px solid ${res.category.color}15`, fontSize:11, color:'#64748b' }}>
                  {res.readTime && <span>{res.readTime}</span>}
                  <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontWeight:700, color:res.category.color }}>
                    {res.category.ctaLabel} <Ic n="Arrow" s={11} style={{ color:res.category.color }}/>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         5.  WHY OUR RESOURCES — 4 trust signals
         ════════════════════════════════════════════════════ */}
      <section className="rip-section" style={{ padding:'90px 32px', background:'#fff' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:48, maxWidth:760, margin:'0 auto 48px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#0066FF15', border:'1px solid #0066FF30', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              WHY OUR RESOURCES ARE DIFFERENT
            </div>
            <h2 style={{ fontSize:'clamp(26px, 3.6vw, 36px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14, lineHeight:1.2 }}>
              Built from real engagements — not marketing fluff
            </h2>
            <p style={{ fontSize:15.5, color:'#475569', lineHeight:1.7 }}>
              Every case study, demo, and playbook comes from work we've actually delivered for enterprise clients.
            </p>
          </div>

          <div className="rv rip-why-g" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20 }}>
            {[
              { icon:'Award',       accent:'#0066FF', title:'Field-tested',          desc:'Every insight comes from 50+ real Microsoft engagements. Numbers are exact; case study names anonymised when confidentiality required.' },
              { icon:'CheckCircle', accent:'#003FB3', title:'No registration walls', desc:"Everything free to access. No email gate before the case study. No lead form before the demo. We respect your time — and your inbox." },
              { icon:'Star',        accent:'#06b6d4', title:'Honest perspectives',    desc:"We tell you when Microsoft isn't the answer, when Power Platform isn't worth it, when a partner tool beats us. Trust comes from honesty." },
              { icon:'Zap',         accent:'#0EA5E9', title:'Updated weekly',        desc:'New case studies, articles, and demos published continuously. Microsoft moves fast; our content keeps pace with what actually ships vs. what stays vaporware.' },
            ].map((item,i) => (
              <div key={i} style={{ padding:'28px 24px', borderRadius:20, background:'linear-gradient(180deg, #ffffff, #fafcff)', border:'1px solid #e2e8f0', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:-50, right:-50, width:160, height:160, borderRadius:'50%', background:`radial-gradient(circle, ${item.accent}15, transparent 70%)`, pointerEvents:'none' }}/>
                <div style={{ width:48, height:48, borderRadius:14, background:`linear-gradient(135deg, ${item.accent}, ${item.accent}cc)`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16, boxShadow:`0 8px 20px ${item.accent}30`, position:'relative', zIndex:1 }}>
                  <Ic n={item.icon} s={22} style={{ color:'#fff' }}/>
                </div>
                <h3 style={{ fontSize:16.5, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:10, letterSpacing:'-0.005em', position:'relative', zIndex:1 }}>{item.title}</h3>
                <p style={{ fontSize:13, color:'#475569', lineHeight:1.65, position:'relative', zIndex:1 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         6.  FAQ
         ════════════════════════════════════════════════════ */}
      <section className="rip-section" style={{ padding:'100px 32px', background:'#f8fafc' }}>
        <div style={{ maxWidth:880, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#06b6d418', border:'1px solid #06b6d440', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              FREQUENTLY ASKED
            </div>
            <h2 style={{ fontSize:'clamp(28px, 4vw, 38px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14, lineHeight:1.15 }}>
              About our resources
            </h2>
          </div>

          <div className="rv">
            {[
              { q:"Why don't you require registration to access content?",
                a:"Because gated content is the most reliable way to ensure no one reads it. We'd rather have 10,000 people read a case study than 200 people enter their email to access it. If we earn your interest, you'll find your way to a conversation. We don't need a lead form to start." },
              { q:"How anonymised are the case studies?",
                a:"Client names anonymised when confidentiality is required (~70% of cases). Sector, size, region, timeline, and especially numbers are exact. We will not publish content that materially misrepresents outcomes — if a client agrees to a case study, we report what actually happened, including the parts that were harder than planned." },
              { q:"Can I cite your articles / case studies in my internal materials?",
                a:"Yes — please do. All content is intended for use in internal decision making, board materials, and stakeholder discussions. Light attribution is appreciated but not required. If you're presenting case study numbers, reference DevinStratus so colleagues can check sources." },
              { q:"Can I get a demo of the solutions in the case studies?",
                a:"Yes — most of our Solution Demos category is exactly that. For deeper walkthroughs (e.g., your specific industry / data / requirements), book a 30-minute discovery call. We're happy to do a live demo tailored to your context." },
              { q:"How often is new content published?",
                a:"Roughly: 1-2 case studies per month, 1-2 articles per week, 1 demo per month, 1 playbook per quarter. Newsletter subscribers get weekly summaries. Most popular pieces get refreshed annually if the underlying technology has shifted." },
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
      <section className="rip-cta-section" style={{ padding:'100px 32px', background:'linear-gradient(135deg, #003FB3 0%, #0066FF 60%, #06b6d4 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-100, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:880, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.30)', borderRadius:50, padding:'7px 16px', fontSize:11.5, fontWeight:800, color:'#fff', letterSpacing:'.14em', marginBottom:24, backdropFilter:'blur(10px)' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#67e8f9' }}/>
            FINISHED READING? READY TO TALK?
          </div>

          <h2 style={{ fontSize:'clamp(30px, 4.5vw, 46px)', fontWeight:900, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:18, lineHeight:1.1, letterSpacing:'-0.02em' }}>
            Your outcome could be the next case study.
          </h2>
          <p style={{ fontSize:17, color:'rgba(255,255,255,0.85)', marginBottom:36, lineHeight:1.7, maxWidth:680, margin:'0 auto 36px' }}>
            30-minute discovery call with a Solution Architect who has delivered similar outcomes. We'll discuss your specific priorities and give you a fixed-price proposal within a week. No commitment.
          </p>

          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <Btn onClick={openConsult} style={{ background:'#fff', color:'#003FB3' }}>
              Book Architect Call <Ic n="Arrow" s={14} style={{ color:'#003FB3' }}/>
            </Btn>
            <Btn variant="ghost" onClick={() => navigate('/use-cases')} style={{ borderColor:'rgba(255,255,255,0.4)', color:'#fff' }}>
              Browse Use Cases
            </Btn>
          </div>
        </div>
      </section>

    </div>
  )
}
