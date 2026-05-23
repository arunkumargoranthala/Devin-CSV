import { useEffect } from 'react'
import { C, Ic, Btn } from '../components/ui'
import { SOLUTIONS } from '../data/content'
import CategoryHeroAnimation from '../components/CategoryHeroAnimation'

/* ════════════════════════════════════════════════════════════════════════════
 *  SolutionCategoryPage — mounted at /solutions/:categorySlug
 *  ────────────────────────────────────────────────────────────────────────────
 *  Structure:
 *    1. Hero (light, Global Offices recipe) + CategoryHeroAnimation on right
 *    2. Stats strip (compact white)
 *    3. Solutions grid (6 premium cards with hover effects)
 *    4. Capabilities highlight (surfaces top capabilities across all items)
 *    5. Explore other categories (pills)
 *    6. Final CTA (brand-blue gradient)
 * ════════════════════════════════════════════════════════════════════════════ */

/* Slug → animation variant mapping */
const VARIANT_MAP = {
  'ai-copilot':              'ai',
  'intelligent-automation':  'automation',
  'business-applications':   'apps',
  'data-analytics':          'data',
  'modern-workplace':        'workplace',
}

/* Accent colour (lighter shade) per category, used by the animation */
const ACCENT_MAP = {
  'ai-copilot':              '#67e8f9',  // light cyan
  'intelligent-automation':  '#67e8f9',  // light cyan
  'business-applications':   '#a5b4fc',  // light indigo
  'data-analytics':          '#a5b4fc',  // light indigo
  'modern-workplace':        '#7dd3fc',  // light sky
}

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

export default function SolutionCategoryPage({ categorySlug, navigate, openConsult }) {
  useReveal()
  useEffect(() => { window.scrollTo(0,0) }, [categorySlug])

  const category = SOLUTIONS.find(s => s.slug === categorySlug)
  if (!category) return (
    <div style={{ paddingTop:120, textAlign:'center', minHeight:'60vh' }}>
      <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Category not found</h2>
      <button onClick={() => navigate('/')} style={{ marginTop:20, color:C.blue, background:'none', border:'none', cursor:'pointer' }}>← Home</button>
    </div>
  )

  const variant = VARIANT_MAP[categorySlug] || 'automation'
  const accent  = ACCENT_MAP[categorySlug]  || '#67e8f9'

  /* Aggregate "highlight" capabilities (1 per sub-item) for the section below */
  const highlightCaps = category.items.flatMap(it =>
    (it.capabilities || []).slice(0, 1).map(c => ({ ...c, parentItem: it }))
  ).slice(0, 6)

  return (
    <div className="page-fade">

      {/* ─── Page-specific responsive CSS ─────────────────── */}
      <style dangerouslySetInnerHTML={{__html:`
        @media (max-width: 1023px) {
          .cat-hero-g { grid-template-columns: 1fr !important; gap: 36px !important; padding-bottom: 48px !important; }
          .cat-hero-anim { max-width: 560px; margin: 0 auto; }
          .cat-cards-g, .cat-caps-g { grid-template-columns: repeat(2, 1fr) !important; }
          .cat-related-g { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .cat-hero-wrap { padding: 32px 20px 12px !important; }
          .cat-hero-title { font-size: clamp(28px, 6.5vw, 42px) !important; }
        }
        @media (max-width: 767px) {
          .cat-stats-g { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; row-gap: 28px !important; }
          .cat-stats-g > div { padding-left: 0 !important; border-left: none !important; }
          .cat-stats-g > div:nth-child(3),
          .cat-stats-g > div:nth-child(4) { padding-top: 20px !important; border-top: 1px solid #e2e8f0; }
          .cat-stats-g .stat-v { font-size: 34px !important; }
          .cat-section { padding-top: 60px !important; padding-bottom: 40px !important; padding-left: 18px !important; padding-right: 18px !important; }
          .cat-stats-section { padding: 44px 18px !important; }
          .cat-cta-section { padding: 72px 20px !important; }
          .cat-final-h2 { font-size: clamp(24px, 6vw, 34px) !important; }
        }
        @media (max-width: 640px) {
          .cat-cards-g, .cat-caps-g { grid-template-columns: 1fr !important; gap: 14px !important; }
        }
        @media (max-width: 480px) {
          .cat-related-g { grid-template-columns: 1fr !important; }
          .cat-hero-title { font-size: clamp(26px, 8vw, 36px) !important; }
          .cat-trust-pills > div { font-size: 11.5px !important; padding: 6px 11px !important; }
        }
      `}}/>


      {/* ════════════════════════════════════════════════════
         1.  HERO  — light Global-Offices recipe + animation
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

        <div className="cat-hero-wrap" style={{ maxWidth:1300, margin:'0 auto', padding:'48px 32px 84px', position:'relative', zIndex:1 }}>
          {/* Breadcrumb */}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:28, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Home</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <button onClick={() => navigate('/solutions')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Solutions</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <span style={{ fontSize:13, color:'#0a0a14', fontWeight:600 }}>{category.heading}</span>
          </div>

          {/* Two columns: text left, animation right */}
          <div className="cat-hero-g" style={{ display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:48, alignItems:'center' }}>

            {/* LEFT — text content */}
            <div>
              {/* Category eyebrow pill (cyan accent) */}
              <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:`${category.color}18`, border:`1px solid ${category.color}40`, borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:800, color:category.color, letterSpacing:'.06em', marginBottom:22 }}>
                <Ic n={category.icon} s={13} style={{ color:category.color }}/>
                {category.heading.toUpperCase()}
              </div>

              {/* Heading: the category tagline becomes the H1 */}
              <h1 className="cat-hero-title" style={{ fontSize:'clamp(32px, 4.6vw, 50px)', fontWeight:900, lineHeight:1.08, letterSpacing:'-0.02em', color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:18 }}>
                {category.tagline}
              </h1>

              {/* Overview */}
              <p style={{ fontSize:16.5, color:'#334155', lineHeight:1.75, marginBottom:28, maxWidth:540 }}>
                {category.overview}
              </p>

              {/* Trust pills */}
              <div className="cat-trust-pills" style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:30 }}>
                {[
                  `${category.items.length} solutions in this category`,
                  'Microsoft-certified team',
                  'Microsoft-native delivery',
                ].map((t,i) => (
                  <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'7px 14px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1px solid rgba(0,102,255,0.18)', backdropFilter:'blur(10px)', fontSize:12.5, fontWeight:700, color:'#0a0a14' }}>
                    <Ic n="CheckCircle" s={13} style={{ color:category.color }}/>
                    {t}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <Btn onClick={openConsult}>Talk to a Solution Architect <Ic n="Arrow" s={14} style={{ color:'#fff' }}/></Btn>
                <button onClick={() => { const el = document.getElementById('solutions-grid'); if (el) el.scrollIntoView({ behavior:'smooth' }) }}
                  style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 26px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1.5px solid rgba(0,102,255,0.30)', backdropFilter:'blur(10px)', cursor:'pointer', fontSize:15, fontWeight:700, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                  See all {category.items.length} solutions <Ic n="ChevD" s={14} style={{ color:'#0066FF' }}/>
                </button>
              </div>
            </div>

            {/* RIGHT — Animation (cat-hero-anim is responsive wrapper) */}
            <div className="cat-hero-anim" style={{ width:'100%' }}>
              <CategoryHeroAnimation variant={variant} color={category.color} accent={accent} />
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         2.  STATS STRIP
         ════════════════════════════════════════════════════ */}
      <section className="cat-stats-section" style={{ padding:'56px 32px', background:'#fff', borderTop:'1px solid #e2e8f0', borderBottom:'1px solid #e2e8f0' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv cat-stats-g" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:32 }}>
            {[
              { v:category.items.length, l:'Solutions in this category',  s:'Fully scoped & priced' },
              { v:'6',                     l:'Microsoft certifications',    s:'AI · data · identity' },
              { v:'AI',                    l:'Orchestration-first',         s:'Beyond point tooling' },
              { v:'2',                     l:'Delivery countries',          s:'Canada · India' },
            ].map((s,i) => (
              <div key={i} style={{ display:'flex', flexDirection:'column', position:'relative', paddingLeft:i===0?0:24, borderLeft:i===0?'none':'1px solid #e2e8f0' }}>
                <div className="stat-v" style={{ fontSize:42, fontWeight:900, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1, marginBottom:8, background:`linear-gradient(135deg, #0066FF, #003FB3)`, WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>{s.v}</div>
                <div style={{ fontSize:13.5, fontWeight:700, color:'#0a0a14', marginBottom:4 }}>{s.l}</div>
                <div style={{ fontSize:12.5, color:'#64748b' }}>{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         3.  SOLUTIONS GRID — 6 premium cards
         ════════════════════════════════════════════════════ */}
      <section className="cat-section" id="solutions-grid" style={{ padding:'90px 32px 60px', background:'#fff' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv" style={{ marginBottom:48, maxWidth:720 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:category.bg, border:`1px solid ${category.color}30`, borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:category.color, letterSpacing:'.14em', marginBottom:16 }}>
              {category.items.length} ENTERPRISE SOLUTIONS
            </div>
            <h2 style={{ fontSize:'clamp(26px, 3.5vw, 36px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14, lineHeight:1.2 }}>
              Every capability in {category.heading.replace(' Solutions','')}
            </h2>
            <p style={{ fontSize:15.5, color:'#475569', lineHeight:1.7 }}>
              Each solution is a complete delivery commitment — design through go-live, with hypercare and ongoing optimisation. Click any card for the full enterprise brief.
            </p>
          </div>

          <div className="rv cat-cards-g" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20 }}>
            {category.items.map((it,i) => (
              <button key={it.slug} onClick={() => navigate(`/solution/${category.slug}/${it.slug}`)}
                style={{ display:'flex', flexDirection:'column', padding:'28px 26px 24px', borderRadius:20, border:'1px solid #e2e8f0', background:'linear-gradient(180deg, #fff 0%, #fafcff 100%)', cursor:'pointer', textAlign:'left', position:'relative', overflow:'hidden', transition:'all .25s', boxShadow:'0 1px 3px rgba(0,53,128,0.04)' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor=category.color+'55'; e.currentTarget.style.boxShadow=`0 14px 32px ${category.color}22` }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.boxShadow='0 1px 3px rgba(0,53,128,0.04)' }}>

                {/* Top accent bar */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${category.color}, ${category.color}55)` }} />
                {/* Decorative corner */}
                <div style={{ position:'absolute', top:-40, right:-40, width:160, height:160, borderRadius:'50%', background:`radial-gradient(circle, ${category.color}15, transparent 70%)`, pointerEvents:'none' }} />

                {/* Header: icon + tag */}
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

                {/* Title */}
                <h3 style={{ fontSize:18, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, letterSpacing:'-0.01em', position:'relative', zIndex:1, lineHeight:1.3 }}>{it.t}</h3>

                {/* Description */}
                <p style={{ fontSize:13.5, color:'#475569', lineHeight:1.6, marginBottom:18, flex:1, position:'relative', zIndex:1 }}>{it.d}</p>

                {/* Benefits: top 2 metrics inline */}
                {it.benefits && (
                  <div style={{ display:'flex', gap:18, marginBottom:18, position:'relative', zIndex:1 }}>
                    {it.benefits.slice(0,2).map((b,bi) => (
                      <div key={bi}>
                        <div style={{ fontSize:18, fontWeight:900, color:category.color, fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1 }}>{b.v}<span style={{ fontSize:11 }}>{b.u}</span></div>
                        <div style={{ fontSize:10.5, color:'#64748b', marginTop:3, lineHeight:1.3 }}>{b.l}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer: Learn more arrow */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative', zIndex:1, paddingTop:14, borderTop:`1px solid ${category.color}15` }}>
                  <span style={{ fontSize:12.5, fontWeight:700, color:category.color }}>Explore solution</span>
                  <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:30, height:30, borderRadius:'50%', background:`${category.color}12` }}>
                    <Ic n="Arrow" s={13} style={{ color:category.color }}/>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         4.  CAPABILITIES HIGHLIGHT — surfaces depth of expertise
         ════════════════════════════════════════════════════ */}
      <section className="cat-section" style={{ padding:'80px 32px', background:'#f8fafc', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, right:-60, width:300, height:300, borderRadius:'50%', background:`radial-gradient(circle, ${category.color}10, transparent 70%)`, filter:'blur(50px)', pointerEvents:'none' }} />
        <div style={{ maxWidth:1300, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:48, maxWidth:760, margin:'0 auto 48px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:category.bg, border:`1px solid ${category.color}30`, borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:category.color, letterSpacing:'.14em', marginBottom:16 }}>
              CAPABILITIES AT A GLANCE
            </div>
            <h2 style={{ fontSize:'clamp(26px, 3.5vw, 34px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:12, lineHeight:1.2 }}>
              What clients actually get when they engage us
            </h2>
            <p style={{ fontSize:15, color:'#475569', lineHeight:1.7 }}>
              A snapshot of the depth across {category.items.length} solutions. Click any to see the full capability map.
            </p>
          </div>

          <div className="rv cat-caps-g" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16 }}>
            {highlightCaps.map((cap, i) => (
              <button key={i} onClick={() => navigate(`/solution/${category.slug}/${cap.parentItem.slug}`)}
                style={{ display:'flex', alignItems:'flex-start', gap:14, padding:'20px 20px', borderRadius:16, background:'#fff', border:'1px solid #e2e8f0', cursor:'pointer', textAlign:'left', transition:'all .22s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=category.color+'55'; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.transform='none' }}>
                <div style={{ width:38, height:38, borderRadius:11, background:category.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Ic n={cap.n} s={18} style={{ color:category.color }}/>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:4, letterSpacing:'-0.005em' }}>{cap.t}</div>
                  <div style={{ fontSize:12.5, color:'#64748b', lineHeight:1.5, marginBottom:6 }}>{cap.d}</div>
                  <div style={{ fontSize:11, fontWeight:700, color:category.color, letterSpacing:'.04em' }}>{cap.parentItem.t.toUpperCase()}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         5.  EXPLORE OTHER CATEGORIES
         ════════════════════════════════════════════════════ */}
      <section className="cat-section" style={{ padding:'72px 32px', background:'#fff' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv" style={{ marginBottom:28 }}>
            <h3 style={{ fontSize:22, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Explore other solution areas</h3>
            <p style={{ fontSize:14, color:'#64748b' }}>{SOLUTIONS.length - 1} more enterprise categories in the Microsoft platform.</p>
          </div>
          <div className="rv cat-related-g" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16 }}>
            {SOLUTIONS.filter(s => s.slug !== categorySlug).map(s => (
              <button key={s.slug} onClick={() => navigate(`/solutions/${s.slug}`)}
                style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:12, padding:'20px 20px', borderRadius:16, border:'1px solid #e2e8f0', background:'#fff', cursor:'pointer', textAlign:'left', transition:'all .22s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=s.color; e.currentTarget.style.background=s.bg; e.currentTarget.style.transform='translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.background='#fff'; e.currentTarget.style.transform='none' }}>
                <div style={{ width:42, height:42, borderRadius:12, background:`linear-gradient(135deg, ${s.color}, ${s.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 6px 16px ${s.color}30` }}>
                  <Ic n={s.icon} s={20} style={{ color:'#fff' }}/>
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:3 }}>{s.heading}</div>
                  <div style={{ fontSize:12, color:'#64748b' }}>{s.items.length} solutions</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         6.  FINAL CTA — brand-blue gradient (matches SolutionsIndexPage)
         ════════════════════════════════════════════════════ */}
      <section className="cat-cta-section" style={{ padding:'90px 32px', background:'linear-gradient(135deg, #003FB3 0%, #0066FF 60%, #06b6d4 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-100, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:880, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.30)', borderRadius:50, padding:'7px 16px', fontSize:11.5, fontWeight:800, color:'#fff', letterSpacing:'.14em', marginBottom:22, backdropFilter:'blur(10px)' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#67e8f9' }}/>
            READY TO START?
          </div>
          <h2 className="cat-final-h2" style={{ fontSize:'clamp(28px, 4.5vw, 42px)', fontWeight:900, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:16, lineHeight:1.15, letterSpacing:'-0.02em' }}>
            Let's talk about your {category.heading.toLowerCase()} priorities.
          </h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.85)', marginBottom:32, lineHeight:1.7, maxWidth:680, margin:'0 auto 32px' }}>
            30-minute call with a Solution Architect who specialises in {category.heading.toLowerCase()}. No sales pitch. We'll map your priorities to specific capabilities — and give you a fixed-price scope before any commitment.
          </p>

          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Btn onClick={openConsult} style={{ background:'#fff', color:'#003FB3' }}>
              Book Solution Architect Call <Ic n="Arrow" s={14} style={{ color:'#003FB3' }}/>
            </Btn>
            <Btn variant="ghost" onClick={() => navigate('/solutions')} style={{ borderColor:'rgba(255,255,255,0.4)', color:'#fff' }}>
              Browse All Solutions
            </Btn>
          </div>
        </div>
      </section>

    </div>
  )
}
