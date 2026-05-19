import { useEffect } from 'react'
import { C, Ic, Btn } from '../components/ui'
import { USECASES } from '../data/usecases'
import CategoryHeroAnimation from '../components/CategoryHeroAnimation'

/* ════════════════════════════════════════════════════════════════════════════
 *  UseCaseCategoryPage — mounted at /use-cases/:categorySlug
 *  ────────────────────────────────────────────────────────────────────────────
 *  Structure:
 *    1. Hero (light Global-Offices recipe) + CategoryHeroAnimation on right
 *    2. Stats strip — 4 category-credibility numbers
 *    3. Use Cases grid — 4-5 sub-item premium cards with timeline pills
 *    4. Common challenges across the category
 *    5. Why this category — outcomes & approach
 *    6. Other use case categories — cross-nav
 *    7. Final CTA
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

export default function UseCaseCategoryPage({ categorySlug, navigate, openConsult }) {
  useReveal()
  useEffect(() => { window.scrollTo(0,0) }, [categorySlug])

  const category = USECASES.find(c => c.slug === categorySlug)
  if (!category) return (
    <div style={{ paddingTop:120, textAlign:'center', minHeight:'60vh' }}>
      <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Use case category not found</h2>
      <button onClick={() => navigate('/use-cases')} style={{ marginTop:20, color:C.blue, background:'none', border:'none', cursor:'pointer' }}>← All use cases</button>
    </div>
  )

  /* Aggregate top challenges from sub-items (1 per item = 4-5 category-wide pains) */
  const topChallenges = category.items.map(it => it.challenges[0])

  return (
    <div className="page-fade" style={{ overflowX:'hidden', maxWidth:'100vw' }}>

      {/* ─── Page-specific responsive CSS ─────────────────── */}
      <style dangerouslySetInnerHTML={{__html:`
        @media (max-width: 1023px) {
          .uccp-hero-g { grid-template-columns: 1fr !important; gap: 36px !important; padding-bottom: 48px !important; }
          .uccp-hero-anim { max-width: 560px; margin: 0 auto; }
          .uccp-items-g, .uccp-challenges-g { grid-template-columns: repeat(2, 1fr) !important; }
          .uccp-related-g { grid-template-columns: repeat(2, 1fr) !important; }
          .uccp-why-g { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .uccp-hero-wrap { padding: 32px 20px 12px !important; }
          .uccp-hero-title { font-size: clamp(28px, 6.5vw, 42px) !important; }
        }
        @media (max-width: 767px) {
          .uccp-stats-g { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; row-gap: 28px !important; }
          .uccp-stats-g > div { padding-left: 0 !important; border-left: none !important; }
          .uccp-stats-g > div:nth-child(3),
          .uccp-stats-g > div:nth-child(4) { padding-top: 22px !important; border-top: 1px solid #e2e8f0; }
          .uccp-stats-g .stat-v { font-size: 34px !important; }
          .uccp-section { padding-top: 60px !important; padding-bottom: 40px !important; padding-left: 18px !important; padding-right: 18px !important; }
          .uccp-stats-section { padding: 44px 18px !important; }
          .uccp-cta-section { padding: 72px 20px !important; }
          .uccp-final-h2 { font-size: clamp(24px, 6vw, 34px) !important; }
        }
        @media (max-width: 640px) {
          .uccp-items-g, .uccp-challenges-g { grid-template-columns: 1fr !important; gap: 14px !important; }
          .uccp-why-g { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .uccp-related-g { grid-template-columns: 1fr !important; }
          .uccp-hero-title { font-size: clamp(26px, 8vw, 36px) !important; }
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
        <div style={{ position:'absolute', top:-100, right:-80, width:380, height:380, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.32), transparent 70%)', filter:'blur(48px)', animation:'heroFloat 9s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,102,255,0.20), transparent 70%)', filter:'blur(56px)', animation:'heroFloat 7s ease-in-out infinite reverse', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'40%', right:'18%', width:200, height:200, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.30), transparent 70%)', filter:'blur(40px)', animation:'heroFloat 11s ease-in-out infinite', pointerEvents:'none' }} />

        <div className="uccp-hero-wrap" style={{ maxWidth:1300, margin:'0 auto', padding:'48px 32px 84px', position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:28, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Home</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <button onClick={() => navigate('/use-cases')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Use Cases</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <span style={{ fontSize:13, color:'#0a0a14', fontWeight:600 }}>{category.heading}</span>
          </div>

          <div className="uccp-hero-g" style={{ display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:48, alignItems:'center' }}>

            {/* LEFT */}
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:`${category.color}18`, border:`1px solid ${category.color}40`, borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:800, color:category.color, letterSpacing:'.06em', marginBottom:22 }}>
                <Ic n={category.icon} s={13} style={{ color:category.color }}/>
                {category.heading.toUpperCase()}
              </div>

              <h1 className="uccp-hero-title" style={{ fontSize:'clamp(32px, 4.6vw, 50px)', fontWeight:900, lineHeight:1.08, letterSpacing:'-0.02em', color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:18 }}>
                {category.tagline}
              </h1>

              <p style={{ fontSize:16.5, color:'#334155', lineHeight:1.75, marginBottom:28, maxWidth:540 }}>
                {category.overview}
              </p>

              <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:30 }}>
                {[
                  `${category.items.length} ready use cases`,
                  'Fixed-price scope',
                  'Microsoft-native',
                ].map((t,i) => (
                  <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'7px 14px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1px solid rgba(0,102,255,0.18)', backdropFilter:'blur(10px)', fontSize:12.5, fontWeight:700, color:'#0a0a14' }}>
                    <Ic n="CheckCircle" s={13} style={{ color:category.color }}/>
                    {t}
                  </div>
                ))}
              </div>

              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <Btn onClick={openConsult}>Talk to a Use-Case Architect <Ic n="Arrow" s={14} style={{ color:'#fff' }}/></Btn>
                <button onClick={() => { const el = document.getElementById('usecase-items'); if (el) el.scrollIntoView({ behavior:'smooth' }) }}
                  style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 26px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1.5px solid rgba(0,102,255,0.30)', backdropFilter:'blur(10px)', cursor:'pointer', fontSize:15, fontWeight:700, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                  See {category.items.length} use cases <Ic n="ChevD" s={14} style={{ color:'#0066FF' }}/>
                </button>
              </div>
            </div>

            {/* RIGHT — Animation */}
            <div className="uccp-hero-anim" style={{ width:'100%' }}>
              <CategoryHeroAnimation variant={category.animVariant} color={category.color} accent={category.animAccent} />
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         2.  STATS STRIP — category-specific
         ════════════════════════════════════════════════════ */}
      <section className="uccp-stats-section" style={{ padding:'56px 32px', background:'#fff', borderTop:'1px solid #e2e8f0', borderBottom:'1px solid #e2e8f0' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv uccp-stats-g" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:32 }}>
            {category.catStats.map((s,i) => (
              <div key={i} style={{ display:'flex', flexDirection:'column', position:'relative', paddingLeft:i===0?0:24, borderLeft:i===0?'none':'1px solid #e2e8f0' }}>
                <div className="stat-v" style={{ fontSize:38, fontWeight:900, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1, marginBottom:8, background:`linear-gradient(135deg, #0066FF, #003FB3)`, WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>{s.v}</div>
                <div style={{ fontSize:13.5, fontWeight:700, color:'#0a0a14', lineHeight:1.4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         3.  USE CASES GRID — sub-items with timeline pills
         ════════════════════════════════════════════════════ */}
      <section className="uccp-section" id="usecase-items" style={{ padding:'90px 32px 60px', background:'#fff' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv" style={{ marginBottom:48, maxWidth:760 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:category.bg, border:`1px solid ${category.color}30`, borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:category.color, letterSpacing:'.14em', marginBottom:16 }}>
              {category.items.length} {category.heading.toUpperCase()}
            </div>
            <h2 style={{ fontSize:'clamp(26px, 3.5vw, 36px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14, lineHeight:1.2 }}>
              Choose a specific outcome — we'll deliver it
            </h2>
            <p style={{ fontSize:15.5, color:'#475569', lineHeight:1.7 }}>
              Each use case is fully scoped — fixed-price, fixed-timeline, ready to start. Click any card for the enterprise brief.
            </p>
          </div>

          <div className="rv uccp-items-g" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20 }}>
            {category.items.map((it,i) => (
              <button key={it.slug} onClick={() => navigate(`/use-case/${category.slug}/${it.slug}`)}
                style={{ display:'flex', flexDirection:'column', padding:'28px 26px 24px', borderRadius:20, border:'1px solid #e2e8f0', background:'linear-gradient(180deg, #fff 0%, #fafcff 100%)', cursor:'pointer', textAlign:'left', position:'relative', overflow:'hidden', transition:'all .25s', boxShadow:'0 1px 3px rgba(0,53,128,0.04)', minHeight:340 }}
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
                <p style={{ fontSize:13.5, color:'#475569', lineHeight:1.6, marginBottom:16, flex:1, position:'relative', zIndex:1 }}>{it.d}</p>

                {/* Timeline pill — unique to Use Cases */}
                {it.timeline && (
                  <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 12px', borderRadius:50, background:`${category.color}12`, border:`1px solid ${category.color}25`, fontSize:11.5, fontWeight:700, color:category.color, marginBottom:14, alignSelf:'flex-start', position:'relative', zIndex:1 }}>
                    <Ic n="Clock" s={11} style={{ color:category.color }}/>
                    {it.timeline}
                  </div>
                )}

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

                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative', zIndex:1, paddingTop:14, borderTop:`1px solid ${category.color}15` }}>
                  <span style={{ fontSize:12.5, fontWeight:700, color:category.color }}>Explore use case</span>
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
         4.  COMMON CHALLENGES across the category
         ════════════════════════════════════════════════════ */}
      <section className="uccp-section" style={{ padding:'80px 32px', background:'#f8fafc', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, right:-60, width:300, height:300, borderRadius:'50%', background:`radial-gradient(circle, ${category.color}10, transparent 70%)`, filter:'blur(50px)', pointerEvents:'none' }} />
        <div style={{ maxWidth:1180, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:48, maxWidth:760, margin:'0 auto 48px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:category.bg, border:`1px solid ${category.color}30`, borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:category.color, letterSpacing:'.14em', marginBottom:16 }}>
              COMMON CHALLENGES
            </div>
            <h2 style={{ fontSize:'clamp(26px, 3.5vw, 34px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:12, lineHeight:1.2 }}>
              The patterns we solve in {category.heading.toLowerCase()}
            </h2>
            <p style={{ fontSize:15, color:'#475569', lineHeight:1.7 }}>
              These are the recurring pain points across {category.heading.toLowerCase()} engagements — each addressed by a specific use case below.
            </p>
          </div>

          <div className="rv uccp-challenges-g" style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min(category.items.length, 3)}, 1fr)`, gap:16 }}>
            {topChallenges.map((challenge, i) => (
              <div key={i} style={{ padding:'24px 24px', borderRadius:16, background:'#fff', border:'1px solid #e2e8f0', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:`linear-gradient(180deg, ${category.color}, ${category.color}55)` }}/>
                <div style={{ display:'flex', alignItems:'flex-start', gap:14, marginLeft:8 }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:category.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Ic n="Target" s={17} style={{ color:category.color }}/>
                  </div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:13.5, color:'#0a0a14', lineHeight:1.6, fontWeight:500 }}>{challenge}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         5.  WHY THIS CATEGORY — outcomes-driven engagement
         ════════════════════════════════════════════════════ */}
      <section className="uccp-section" style={{ padding:'80px 32px', background:'#fff' }}>
        <div style={{ maxWidth:1180, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:48, maxWidth:760, margin:'0 auto 48px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(0,102,255,0.10)', border:'1px solid rgba(0,102,255,0.25)', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:'#0066FF' }}/>
              HOW WE ENGAGE
            </div>
            <h2 style={{ fontSize:'clamp(24px, 3.2vw, 30px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:12, lineHeight:1.2 }}>
              Outcome-first, fixed-price, fast delivery
            </h2>
            <p style={{ fontSize:14.5, color:'#475569', lineHeight:1.7 }}>
              {category.heading} engagements use a proven delivery model — defined outcomes, predictable cost, measurable success.
            </p>
          </div>

          <div className="rv uccp-why-g" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:18 }}>
            {[
              { icon:'Target',      title:'Outcome-defined',    desc:'Each use case is a specific business outcome with success metrics defined before contracting.' },
              { icon:'Calc',        title:'Fixed-price scope',  desc:'Written fixed-price quote after discovery call. No "time and materials" surprises.' },
              { icon:'Zap',         title:'Fast delivery',      desc:'4–14 week typical delivery. Weekly demos. Quality gates at every phase.' },
              { icon:'CheckCircle', title:'Proven approach',    desc:'Every use case delivered multiple times. Pre-validated patterns reduce risk.' },
            ].map((item,i) => (
              <div key={i} style={{ padding:'24px 22px', borderRadius:16, background:'linear-gradient(180deg, #fff, #f8fafc)', border:`1px solid ${category.color}20`, position:'relative' }}>
                <div style={{ width:42, height:42, borderRadius:12, background:`linear-gradient(135deg, ${category.color}, ${category.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14, boxShadow:`0 6px 18px ${category.color}30` }}>
                  <Ic n={item.icon} s={20} style={{ color:'#fff' }}/>
                </div>
                <h4 style={{ fontSize:15.5, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, letterSpacing:'-0.005em' }}>{item.title}</h4>
                <p style={{ fontSize:13, color:'#475569', lineHeight:1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         6.  EXPLORE OTHER USE CASE CATEGORIES
         ════════════════════════════════════════════════════ */}
      <section className="uccp-section" style={{ padding:'72px 32px', background:'#f8fafc' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv" style={{ marginBottom:28 }}>
            <h3 style={{ fontSize:22, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Explore other use case categories</h3>
            <p style={{ fontSize:14, color:'#64748b' }}>{USECASES.length - 1} more categories of pre-scoped enterprise outcomes.</p>
          </div>
          <div className="rv uccp-related-g" style={{ display:'grid', gridTemplateColumns:`repeat(${USECASES.length - 1}, 1fr)`, gap:16 }}>
            {USECASES.filter(c => c.slug !== categorySlug).map(cat => (
              <button key={cat.slug} onClick={() => navigate(`/use-cases/${cat.slug}`)}
                style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:12, padding:'20px 20px', borderRadius:16, border:'1px solid #e2e8f0', background:'#fff', cursor:'pointer', textAlign:'left', transition:'all .22s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=cat.color; e.currentTarget.style.background=cat.bg; e.currentTarget.style.transform='translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.background='#fff'; e.currentTarget.style.transform='none' }}>
                <div style={{ width:42, height:42, borderRadius:12, background:`linear-gradient(135deg, ${cat.color}, ${cat.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 6px 16px ${cat.color}30` }}>
                  <Ic n={cat.icon} s={20} style={{ color:'#fff' }}/>
                </div>
                <div>
                  <div style={{ fontSize:13.5, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:3 }}>{cat.heading}</div>
                  <div style={{ fontSize:11.5, color:'#64748b' }}>{cat.items.length} use cases</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         7.  FINAL CTA
         ════════════════════════════════════════════════════ */}
      <section className="uccp-cta-section" style={{ padding:'90px 32px', background:'linear-gradient(135deg, #003FB3 0%, #0066FF 60%, #06b6d4 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-100, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:880, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.30)', borderRadius:50, padding:'7px 16px', fontSize:11.5, fontWeight:800, color:'#fff', letterSpacing:'.14em', marginBottom:22, backdropFilter:'blur(10px)' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#67e8f9' }}/>
            READY TO DELIVER YOUR {category.heading.toUpperCase()} OUTCOME?
          </div>
          <h2 className="uccp-final-h2" style={{ fontSize:'clamp(28px, 4.5vw, 42px)', fontWeight:900, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:16, lineHeight:1.15, letterSpacing:'-0.02em' }}>
            Pick a use case. Get a fixed-price quote.
          </h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.85)', marginBottom:32, lineHeight:1.7, maxWidth:680, margin:'0 auto 32px' }}>
            30-minute discovery call. We'll match your priority outcomes to 2-3 specific use cases from {category.items.length} options in {category.heading.toLowerCase()} — with written fixed-price scope before any commitment.
          </p>

          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Btn onClick={openConsult} style={{ background:'#fff', color:'#003FB3' }}>
              Book Use-Case Architect Call <Ic n="Arrow" s={14} style={{ color:'#003FB3' }}/>
            </Btn>
            <Btn variant="ghost" onClick={() => navigate('/use-cases')} style={{ borderColor:'rgba(255,255,255,0.4)', color:'#fff' }}>
              All Use Cases
            </Btn>
          </div>
        </div>
      </section>

    </div>
  )
}
