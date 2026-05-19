import { useEffect } from 'react'
import { C, Ic, Btn } from '../components/ui'
import { RESOURCES } from '../data/resources'
import CategoryHeroAnimation from '../components/CategoryHeroAnimation'

/* ════════════════════════════════════════════════════════════════════════════
 *  ResourceCategoryPage — mounted at /resources/:categorySlug
 *  ────────────────────────────────────────────────────────────────────────────
 *  Generic category landing for any of the 5 resource types.
 *  Adapts item cards based on category.resourceType:
 *    case-study → shows metrics + client sector
 *    demo       → shows video length + demo type
 *    insight    → shows read time + publish date
 *    tool       → shows modules
 *    playbook   → shows pages + audience
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

/* Format publish date for display */
function fmtDate(d) {
  if (!d) return ''
  const [y, m] = d.split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[parseInt(m,10)-1]} ${y}`
}

export default function ResourceCategoryPage({ categorySlug, navigate, openConsult }) {
  useReveal()
  useEffect(() => { window.scrollTo(0,0) }, [categorySlug])

  const category = RESOURCES.find(c => c.slug === categorySlug)
  if (!category) return (
    <div style={{ paddingTop:120, textAlign:'center', minHeight:'60vh' }}>
      <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Resource category not found</h2>
      <button onClick={() => navigate('/resources')} style={{ marginTop:20, color:C.blue, background:'none', border:'none', cursor:'pointer' }}>← All resources</button>
    </div>
  )

  /* Type-specific metadata renderer for each card */
  const renderMeta = (it) => {
    switch (category.resourceType) {
      case 'case-study':
        return it.client?.sector && (
          <div style={{ fontSize:11.5, color:'#64748b', fontWeight:600 }}>
            {it.client.sector} · {it.client.headcount?.split(' ')[0]} employees
          </div>
        )
      case 'demo':
        return it.videoLength && (
          <div style={{ fontSize:11.5, color:'#64748b', fontWeight:600, display:'flex', alignItems:'center', gap:6 }}>
            <Ic n="Play" s={11} style={{ color:category.color }}/>
            {it.videoLength} · {it.demoType}
          </div>
        )
      case 'insight':
        return (
          <div style={{ fontSize:11.5, color:'#64748b', fontWeight:600 }}>
            {it.readTime} · {fmtDate(it.publishDate)}
          </div>
        )
      case 'tool':
        return it.modules && (
          <div style={{ fontSize:11.5, color:'#64748b', fontWeight:600 }}>
            {it.modules.length} modules · ~10 min
          </div>
        )
      case 'playbook':
        return it.pages && (
          <div style={{ fontSize:11.5, color:'#64748b', fontWeight:600, display:'flex', alignItems:'center', gap:6 }}>
            <Ic n="FileText" s={11} style={{ color:category.color }}/>
            {it.pages} pages · {it.downloadFormat || 'PDF'}
          </div>
        )
      default:
        return null
    }
  }

  /* Type-specific tertiary line */
  const renderTertiary = (it) => {
    if (category.resourceType === 'case-study' && it.keyMetrics?.[0]) {
      const m = it.keyMetrics[0]
      return (
        <div style={{ display:'flex', alignItems:'baseline', gap:6, marginBottom:14 }}>
          <span style={{ fontSize:24, fontWeight:900, color:category.color, fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1 }}>{m.v}</span>
          <span style={{ fontSize:11, color:'#64748b' }}>{m.l}</span>
        </div>
      )
    }
    if (category.resourceType === 'playbook' && it.audience) {
      return (
        <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 10px', borderRadius:50, background:`${category.color}12`, fontSize:10.5, fontWeight:700, color:category.color, marginBottom:14 }}>
          For: {it.audience.split(',')[0]}
        </div>
      )
    }
    return null
  }

  return (
    <div className="page-fade" style={{ overflowX:'hidden', maxWidth:'100vw' }}>

      <style dangerouslySetInnerHTML={{__html:`
        @media (max-width: 1023px) {
          .rcp-hero-g { grid-template-columns: 1fr !important; gap: 36px !important; padding-bottom: 48px !important; }
          .rcp-hero-anim { max-width: 560px; margin: 0 auto; }
          .rcp-items-g { grid-template-columns: repeat(2, 1fr) !important; }
          .rcp-related-g { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .rcp-hero-wrap { padding: 32px 20px 12px !important; }
          .rcp-hero-title { font-size: clamp(28px, 6.5vw, 42px) !important; }
        }
        @media (max-width: 767px) {
          .rcp-stats-g { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; row-gap: 28px !important; }
          .rcp-stats-g > div { padding-left: 0 !important; border-left: none !important; }
          .rcp-stats-g > div:nth-child(3),
          .rcp-stats-g > div:nth-child(4) { padding-top: 22px !important; border-top: 1px solid #e2e8f0; }
          .rcp-stats-g .stat-v { font-size: 34px !important; }
          .rcp-section { padding-top: 60px !important; padding-bottom: 40px !important; padding-left: 18px !important; padding-right: 18px !important; }
          .rcp-stats-section { padding: 44px 18px !important; }
          .rcp-cta-section { padding: 72px 20px !important; }
        }
        @media (max-width: 640px) {
          .rcp-items-g { grid-template-columns: 1fr !important; gap: 14px !important; }
        }
        @media (max-width: 480px) {
          .rcp-related-g { grid-template-columns: 1fr !important; }
        }
      `}}/>


      {/* HERO */}
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

        <div className="rcp-hero-wrap" style={{ maxWidth:1300, margin:'0 auto', padding:'48px 32px 84px', position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:28, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Home</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <button onClick={() => navigate('/resources')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Resources</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <span style={{ fontSize:13, color:'#0a0a14', fontWeight:600 }}>{category.heading}</span>
          </div>

          <div className="rcp-hero-g" style={{ display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:48, alignItems:'center' }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:`${category.color}18`, border:`1px solid ${category.color}40`, borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:800, color:category.color, letterSpacing:'.06em', marginBottom:22 }}>
                <Ic n={category.icon} s={13} style={{ color:category.color }}/>
                {category.heading.toUpperCase()}
              </div>

              <h1 className="rcp-hero-title" style={{ fontSize:'clamp(32px, 4.6vw, 50px)', fontWeight:900, lineHeight:1.08, letterSpacing:'-0.02em', color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:18 }}>
                {category.tagline}
              </h1>

              <p style={{ fontSize:16.5, color:'#334155', lineHeight:1.75, marginBottom:28, maxWidth:540 }}>
                {category.overview}
              </p>

              <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:30 }}>
                {[
                  `${category.items.length} ${category.items.length === 1 ? category.resourceType : (category.resourceType === 'case-study' ? 'case studies' : category.resourceType === 'insight' ? 'articles' : category.resourceType === 'playbook' ? 'playbooks' : category.resourceType + 's')}`,
                  'No registration required',
                  'Free to access',
                ].map((t,i) => (
                  <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'7px 14px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1px solid rgba(0,102,255,0.18)', backdropFilter:'blur(10px)', fontSize:12.5, fontWeight:700, color:'#0a0a14' }}>
                    <Ic n="CheckCircle" s={13} style={{ color:category.color }}/>
                    {t}
                  </div>
                ))}
              </div>

              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <button onClick={() => { const el = document.getElementById('resource-items'); if (el) el.scrollIntoView({ behavior:'smooth' }) }}
                  style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 26px', borderRadius:50, background:`linear-gradient(135deg, ${category.color}, ${category.color}dd)`, border:'none', cursor:'pointer', fontSize:15, fontWeight:700, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", boxShadow:`0 8px 22px ${category.color}40` }}>
                  Browse {category.items.length} {category.items.length === 1 ? 'resource' : 'resources'} <Ic n="ChevD" s={14} style={{ color:'#fff' }}/>
                </button>
                <button onClick={openConsult}
                  style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 26px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1.5px solid rgba(0,102,255,0.30)', backdropFilter:'blur(10px)', cursor:'pointer', fontSize:15, fontWeight:700, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                  Talk to an Architect <Ic n="Arrow" s={14} style={{ color:'#0066FF' }}/>
                </button>
              </div>
            </div>

            <div className="rcp-hero-anim" style={{ width:'100%' }}>
              <CategoryHeroAnimation variant={category.animVariant} color={category.color} accent={category.animAccent} />
            </div>
          </div>
        </div>
      </section>


      {/* STATS STRIP */}
      <section className="rcp-stats-section" style={{ padding:'56px 32px', background:'#fff', borderTop:'1px solid #e2e8f0', borderBottom:'1px solid #e2e8f0' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv rcp-stats-g" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:32 }}>
            {category.catStats.map((s,i) => (
              <div key={i} style={{ display:'flex', flexDirection:'column', position:'relative', paddingLeft:i===0?0:24, borderLeft:i===0?'none':'1px solid #e2e8f0' }}>
                <div className="stat-v" style={{ fontSize:38, fontWeight:900, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1, marginBottom:8, background:`linear-gradient(135deg, #0066FF, #003FB3)`, WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>{s.v}</div>
                <div style={{ fontSize:13.5, fontWeight:700, color:'#0a0a14', lineHeight:1.4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* RESOURCE ITEMS GRID */}
      <section className="rcp-section" id="resource-items" style={{ padding:'90px 32px 60px', background:'#fff' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv" style={{ marginBottom:48, maxWidth:760 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:category.bg, border:`1px solid ${category.color}30`, borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:category.color, letterSpacing:'.14em', marginBottom:16 }}>
              {category.items.length} {category.heading.toUpperCase()}
            </div>
            <h2 style={{ fontSize:'clamp(26px, 3.5vw, 36px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14, lineHeight:1.2 }}>
              All {category.heading.toLowerCase()}
            </h2>
            <p style={{ fontSize:15.5, color:'#475569', lineHeight:1.7 }}>
              Click any card to read the full {category.resourceType.replace('-',' ')}. Free access — no registration required.
            </p>
          </div>

          <div className="rv rcp-items-g" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20 }}>
            {category.items.map(it => (
              <button key={it.slug} onClick={() => navigate(`/resource/${category.slug}/${it.slug}`)}
                style={{ display:'flex', flexDirection:'column', padding:'28px 26px 22px', borderRadius:20, border:'1px solid #e2e8f0', background:'linear-gradient(180deg, #fff 0%, #fafcff 100%)', cursor:'pointer', textAlign:'left', position:'relative', overflow:'hidden', transition:'all .25s', boxShadow:'0 1px 3px rgba(0,53,128,0.04)', minHeight:320 }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor=category.color+'55'; e.currentTarget.style.boxShadow=`0 14px 32px ${category.color}22` }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.boxShadow='0 1px 3px rgba(0,53,128,0.04)' }}>

                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${category.color}, ${category.color}55)` }} />
                <div style={{ position:'absolute', top:-40, right:-40, width:160, height:160, borderRadius:'50%', background:`radial-gradient(circle, ${category.color}15, transparent 70%)`, pointerEvents:'none' }} />

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16, position:'relative', zIndex:1 }}>
                  <div style={{ width:48, height:48, borderRadius:13, background:`linear-gradient(135deg, ${category.color}, ${category.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 6px 18px ${category.color}38` }}>
                    <Ic n={it.n} s={22} style={{ color:'#fff' }}/>
                  </div>
                  {it.tag && (
                    <span style={{ fontSize:10, fontWeight:800, padding:'4px 10px', borderRadius:50, background: it.tag==='New' ? '#06b6d4' : (it.tag==='Most Popular' ? category.color : '#1E40AF'), color:'#fff', letterSpacing:'.04em' }}>
                      {it.tag.toUpperCase()}
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize:18, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, letterSpacing:'-0.01em', position:'relative', zIndex:1, lineHeight:1.3 }}>{it.t}</h3>
                <p style={{ fontSize:13.5, color:'#475569', lineHeight:1.6, marginBottom:14, flex:1, position:'relative', zIndex:1 }}>{it.d}</p>

                {renderTertiary(it)}

                <div style={{ position:'relative', zIndex:1, marginBottom:14 }}>
                  {renderMeta(it)}
                </div>

                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative', zIndex:1, paddingTop:14, borderTop:`1px solid ${category.color}15` }}>
                  <span style={{ fontSize:12.5, fontWeight:700, color:category.color }}>{category.ctaLabel}</span>
                  <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:30, height:30, borderRadius:'50%', background:`${category.color}12` }}>
                    <Ic n="Arrow" s={13} style={{ color:category.color }}/>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* OTHER RESOURCE CATEGORIES */}
      <section className="rcp-section" style={{ padding:'72px 32px', background:'#f8fafc' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv" style={{ marginBottom:28 }}>
            <h3 style={{ fontSize:22, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Explore other resource categories</h3>
            <p style={{ fontSize:14, color:'#64748b' }}>{RESOURCES.length - 1} more categories of free content.</p>
          </div>
          <div className="rv rcp-related-g" style={{ display:'grid', gridTemplateColumns:`repeat(${RESOURCES.length - 1}, 1fr)`, gap:16 }}>
            {RESOURCES.filter(c => c.slug !== categorySlug).map(cat => (
              <button key={cat.slug} onClick={() => navigate(`/resources/${cat.slug}`)}
                style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:12, padding:'20px 20px', borderRadius:16, border:'1px solid #e2e8f0', background:'#fff', cursor:'pointer', textAlign:'left', transition:'all .22s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=cat.color; e.currentTarget.style.background=cat.bg; e.currentTarget.style.transform='translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.background='#fff'; e.currentTarget.style.transform='none' }}>
                <div style={{ width:42, height:42, borderRadius:12, background:`linear-gradient(135deg, ${cat.color}, ${cat.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 6px 16px ${cat.color}30` }}>
                  <Ic n={cat.icon} s={20} style={{ color:'#fff' }}/>
                </div>
                <div>
                  <div style={{ fontSize:13.5, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:3 }}>{cat.heading}</div>
                  <div style={{ fontSize:11.5, color:'#64748b' }}>{cat.items.length} {cat.items.length === 1 ? 'resource' : 'resources'}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* FINAL CTA */}
      <section className="rcp-cta-section" style={{ padding:'90px 32px', background:'linear-gradient(135deg, #003FB3 0%, #0066FF 60%, #06b6d4 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-100, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:880, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.30)', borderRadius:50, padding:'7px 16px', fontSize:11.5, fontWeight:800, color:'#fff', letterSpacing:'.14em', marginBottom:22, backdropFilter:'blur(10px)' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#67e8f9' }}/>
            READY TO TALK?
          </div>
          <h2 style={{ fontSize:'clamp(28px, 4.5vw, 42px)', fontWeight:900, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:16, lineHeight:1.15, letterSpacing:'-0.02em' }}>
            Apply what you've read.
          </h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.85)', marginBottom:32, lineHeight:1.7, maxWidth:680, margin:'0 auto 32px' }}>
            30-minute discovery call with a Solution Architect who has delivered the outcomes you've been reading about. Written fixed-price proposal within a week.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Btn onClick={openConsult} style={{ background:'#fff', color:'#003FB3' }}>Book Architect Call <Ic n="Arrow" s={14} style={{ color:'#003FB3' }}/></Btn>
            <Btn variant="ghost" onClick={() => navigate('/resources')} style={{ borderColor:'rgba(255,255,255,0.4)', color:'#fff' }}>All Resources</Btn>
          </div>
        </div>
      </section>

    </div>
  )
}
