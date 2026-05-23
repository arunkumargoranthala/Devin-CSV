import { useEffect } from 'react'
import { C, Ic, Btn } from '../components/ui'
import { INDUSTRIES } from '../data/industries'
import CategoryHeroAnimation from '../components/CategoryHeroAnimation'

/* ════════════════════════════════════════════════════════════════════════════
 *  IndustryCategoryPage — mounted at /industries/:industrySlug
 *  ────────────────────────────────────────────────────────────────────────────
 *  Structure:
 *    1. Hero (light Global-Offices recipe) + CategoryHeroAnimation on right
 *    2. Stats strip — 4 industry-specific credibility numbers
 *    3. Solutions grid — 3 sub-item premium cards
 *    4. Industry challenges (sector pain points)
 *    5. Compliance frameworks — regulations we operate under
 *    6. Other industries — explore
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

export default function IndustryCategoryPage({ industrySlug, navigate, openConsult }) {
  useReveal()
  useEffect(() => { window.scrollTo(0,0) }, [industrySlug])

  const industry = INDUSTRIES.find(i => i.slug === industrySlug)
  if (!industry) return (
    <div style={{ paddingTop:120, textAlign:'center', minHeight:'60vh' }}>
      <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Industry not found</h2>
      <button onClick={() => navigate('/industries')} style={{ marginTop:20, color:C.blue, background:'none', border:'none', cursor:'pointer' }}>← All industries</button>
    </div>
  )

  /* Aggregate top challenges from sub-items (1 per item = 3 industry-wide pains) */
  const topChallenges = industry.items.map(it => it.challenges[0])
  /* Aggregate 1 "approach" capability per sub-item for the highlight section */
  const highlightCaps = industry.items.flatMap(it =>
    (it.approach || []).slice(0, 1).map(c => ({ ...c, parentItem: it }))
  )

  return (
    <div className="page-fade" style={{ overflowX:'hidden', maxWidth:'100vw' }}>

      {/* ─── Page-specific responsive CSS ─────────────────── */}
      <style dangerouslySetInnerHTML={{__html:`
        @media (max-width: 1023px) {
          .icp-hero-g { grid-template-columns: 1fr !important; gap: 36px !important; padding-bottom: 48px !important; }
          .icp-hero-anim { max-width: 560px; margin: 0 auto; }
          .icp-items-g, .icp-caps-g { grid-template-columns: repeat(2, 1fr) !important; }
          .icp-related-g { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .icp-hero-wrap { padding: 32px 20px 12px !important; }
          .icp-hero-title { font-size: clamp(28px, 6.5vw, 42px) !important; }
        }
        @media (max-width: 767px) {
          .icp-stats-g { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; row-gap: 28px !important; }
          .icp-stats-g > div { padding-left: 0 !important; border-left: none !important; }
          .icp-stats-g > div:nth-child(3),
          .icp-stats-g > div:nth-child(4) { padding-top: 22px !important; border-top: 1px solid #e2e8f0; }
          .icp-stats-g .stat-v { font-size: 34px !important; }
          .icp-section { padding-top: 60px !important; padding-bottom: 40px !important; padding-left: 18px !important; padding-right: 18px !important; }
          .icp-stats-section { padding: 44px 18px !important; }
          .icp-cta-section { padding: 72px 20px !important; }
          .icp-final-h2 { font-size: clamp(24px, 6vw, 34px) !important; }
        }
        @media (max-width: 640px) {
          .icp-items-g, .icp-caps-g { grid-template-columns: 1fr !important; gap: 14px !important; }
        }
        @media (max-width: 480px) {
          .icp-related-g { grid-template-columns: 1fr !important; }
          .icp-hero-title { font-size: clamp(26px, 8vw, 36px) !important; }
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

        <div className="icp-hero-wrap" style={{ maxWidth:1300, margin:'0 auto', padding:'48px 32px 84px', position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:28, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Home</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <button onClick={() => navigate('/industries')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Industries</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <span style={{ fontSize:13, color:'#0a0a14', fontWeight:600 }}>{industry.heading}</span>
          </div>

          <div className="icp-hero-g" style={{ display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:48, alignItems:'center' }}>

            {/* LEFT */}
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:`${industry.color}18`, border:`1px solid ${industry.color}40`, borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:800, color:industry.color, letterSpacing:'.06em', marginBottom:22 }}>
                <Ic n={industry.icon} s={13} style={{ color:industry.color }}/>
                {industry.heading.toUpperCase()}
              </div>

              <h1 className="icp-hero-title" style={{ fontSize:'clamp(32px, 4.6vw, 50px)', fontWeight:900, lineHeight:1.08, letterSpacing:'-0.02em', color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:18 }}>
                {industry.tagline}
              </h1>

              <p style={{ fontSize:16.5, color:'#334155', lineHeight:1.75, marginBottom:28, maxWidth:540 }}>
                {industry.overview}
              </p>

              <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:30 }}>
                {[
                  `${industry.items.length} sector solutions`,
                  'Compliance built-in',
                  'Microsoft-certified delivery',
                ].map((t,i) => (
                  <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'7px 14px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1px solid rgba(0,102,255,0.18)', backdropFilter:'blur(10px)', fontSize:12.5, fontWeight:700, color:'#0a0a14' }}>
                    <Ic n="CheckCircle" s={13} style={{ color:industry.color }}/>
                    {t}
                  </div>
                ))}
              </div>

              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <Btn onClick={openConsult}>Talk to a {industry.heading} Architect <Ic n="Arrow" s={14} style={{ color:'#fff' }}/></Btn>
                <button onClick={() => { const el = document.getElementById('industry-solutions'); if (el) el.scrollIntoView({ behavior:'smooth' }) }}
                  style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 26px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1.5px solid rgba(0,102,255,0.30)', backdropFilter:'blur(10px)', cursor:'pointer', fontSize:15, fontWeight:700, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                  See {industry.items.length} solutions <Ic n="ChevD" s={14} style={{ color:'#0066FF' }}/>
                </button>
              </div>
            </div>

            {/* RIGHT — Animation */}
            <div className="icp-hero-anim" style={{ width:'100%' }}>
              <CategoryHeroAnimation variant={industry.animVariant} color={industry.color} accent={industry.animAccent} />
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         2.  STATS STRIP — industry-specific
         ════════════════════════════════════════════════════ */}
      <section className="icp-stats-section" style={{ padding:'56px 32px', background:'#fff', borderTop:'1px solid #e2e8f0', borderBottom:'1px solid #e2e8f0' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv icp-stats-g" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:32 }}>
            {industry.industryStats.map((s,i) => (
              <div key={i} style={{ display:'flex', flexDirection:'column', position:'relative', paddingLeft:i===0?0:24, borderLeft:i===0?'none':'1px solid #e2e8f0' }}>
                <div className="stat-v" style={{ fontSize:38, fontWeight:900, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1, marginBottom:8, background:`linear-gradient(135deg, #0066FF, #003FB3)`, WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>{s.v}</div>
                <div style={{ fontSize:13.5, fontWeight:700, color:'#0a0a14', lineHeight:1.4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         3.  SOLUTIONS GRID — 3 sub-items
         ════════════════════════════════════════════════════ */}
      <section className="icp-section" id="industry-solutions" style={{ padding:'90px 32px 60px', background:'#fff' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv" style={{ marginBottom:48, maxWidth:720 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:industry.bg, border:`1px solid ${industry.color}30`, borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:industry.color, letterSpacing:'.14em', marginBottom:16 }}>
              {industry.items.length} {industry.heading.toUpperCase()} SOLUTIONS
            </div>
            <h2 style={{ fontSize:'clamp(26px, 3.5vw, 36px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14, lineHeight:1.2 }}>
              Built for the realities of {industry.heading.toLowerCase()}
            </h2>
            <p style={{ fontSize:15.5, color:'#475569', lineHeight:1.7 }}>
              Each solution addresses a specific {industry.heading.toLowerCase()} operational challenge — fully scoped, sector-compliant, ready to deploy. Click any card for the enterprise brief.
            </p>
          </div>

          <div className="rv icp-items-g" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20 }}>
            {industry.items.map((it,i) => (
              <button key={it.slug} onClick={() => navigate(`/industry/${industry.slug}/${it.slug}`)}
                style={{ display:'flex', flexDirection:'column', padding:'28px 26px 24px', borderRadius:20, border:'1px solid #e2e8f0', background:'linear-gradient(180deg, #fff 0%, #fafcff 100%)', cursor:'pointer', textAlign:'left', position:'relative', overflow:'hidden', transition:'all .25s', boxShadow:'0 1px 3px rgba(0,53,128,0.04)' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor=industry.color+'55'; e.currentTarget.style.boxShadow=`0 14px 32px ${industry.color}22` }}
                onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.boxShadow='0 1px 3px rgba(0,53,128,0.04)' }}>

                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${industry.color}, ${industry.color}55)` }} />
                <div style={{ position:'absolute', top:-40, right:-40, width:160, height:160, borderRadius:'50%', background:`radial-gradient(circle, ${industry.color}15, transparent 70%)`, pointerEvents:'none' }} />

                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16, position:'relative', zIndex:1 }}>
                  <div style={{ width:48, height:48, borderRadius:13, background:`linear-gradient(135deg, ${industry.color}, ${industry.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 6px 18px ${industry.color}38` }}>
                    <Ic n={it.n} s={22} style={{ color:'#fff' }}/>
                  </div>
                  {it.tag && (
                    <span style={{ fontSize:10, fontWeight:800, padding:'4px 10px', borderRadius:50, background: it.tag==='New' ? '#06b6d4' : (it.tag==='Most Popular' ? industry.color : '#1E40AF'), color:'#fff', letterSpacing:'.04em' }}>
                      {it.tag.toUpperCase()}
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize:18, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, letterSpacing:'-0.01em', position:'relative', zIndex:1, lineHeight:1.3 }}>{it.t}</h3>
                <p style={{ fontSize:13.5, color:'#475569', lineHeight:1.6, marginBottom:18, flex:1, position:'relative', zIndex:1 }}>{it.d}</p>

                {it.benefits && (
                  <div style={{ display:'flex', gap:18, marginBottom:18, position:'relative', zIndex:1 }}>
                    {it.benefits.slice(0,2).map((b,bi) => (
                      <div key={bi}>
                        <div style={{ fontSize:18, fontWeight:900, color:industry.color, fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1 }}>{b.v}<span style={{ fontSize:11 }}>{b.u}</span></div>
                        <div style={{ fontSize:10.5, color:'#64748b', marginTop:3, lineHeight:1.3 }}>{b.l}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative', zIndex:1, paddingTop:14, borderTop:`1px solid ${industry.color}15` }}>
                  <span style={{ fontSize:12.5, fontWeight:700, color:industry.color }}>Explore solution</span>
                  <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:30, height:30, borderRadius:'50%', background:`${industry.color}12` }}>
                    <Ic n="Arrow" s={13} style={{ color:industry.color }}/>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         4.  INDUSTRY CHALLENGES — what we hear from sector leaders
         ════════════════════════════════════════════════════ */}
      <section className="icp-section" style={{ padding:'80px 32px', background:'#f8fafc', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, right:-60, width:300, height:300, borderRadius:'50%', background:`radial-gradient(circle, ${industry.color}10, transparent 70%)`, filter:'blur(50px)', pointerEvents:'none' }} />
        <div style={{ maxWidth:1180, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:48, maxWidth:760, margin:'0 auto 48px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:industry.bg, border:`1px solid ${industry.color}30`, borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:industry.color, letterSpacing:'.14em', marginBottom:16 }}>
              WHAT WE HEAR FROM {industry.heading.toUpperCase()} LEADERS
            </div>
            <h2 style={{ fontSize:'clamp(26px, 3.5vw, 34px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:12, lineHeight:1.2 }}>
              The challenges we solve in {industry.heading.toLowerCase()}
            </h2>
            <p style={{ fontSize:15, color:'#475569', lineHeight:1.7 }}>
              Sector-specific pain points we hear repeatedly from {industry.heading.toLowerCase()} operations, technology, and compliance leaders.
            </p>
          </div>

          <div className="rv icp-caps-g" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16 }}>
            {topChallenges.map((challenge, i) => (
              <div key={i} style={{ padding:'24px 24px', borderRadius:16, background:'#fff', border:'1px solid #e2e8f0', position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:`linear-gradient(180deg, ${industry.color}, ${industry.color}55)` }}/>
                <div style={{ display:'flex', alignItems:'flex-start', gap:14, marginLeft:8 }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:industry.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Ic n="Target" s={17} style={{ color:industry.color }}/>
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
         5.  COMPLIANCE FRAMEWORKS
         ════════════════════════════════════════════════════ */}
      {industry.regulations && industry.regulations.length > 0 && (
        <section className="icp-section" style={{ padding:'80px 32px', background:'#fff', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', bottom:-80, left:-60, width:280, height:280, borderRadius:'50%', background:`radial-gradient(circle, ${industry.color}10, transparent 70%)`, filter:'blur(50px)', pointerEvents:'none' }} />
          <div style={{ maxWidth:980, margin:'0 auto', position:'relative', zIndex:1 }}>
            <div className="rv" style={{ textAlign:'center', marginBottom:36 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#06b6d418', border:'1px solid #06b6d440', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
                <Ic n="Shield" s={13} style={{ color:'#06b6d4' }}/>
                COMPLIANCE FRAMEWORKS
              </div>
              <h2 style={{ fontSize:'clamp(24px, 3.2vw, 30px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:12, lineHeight:1.2 }}>
                {industry.heading} regulations we deliver under
              </h2>
              <p style={{ fontSize:14.5, color:'#475569', lineHeight:1.7, maxWidth:680, margin:'0 auto' }}>
                Every implementation is designed to pass {industry.heading.toLowerCase()} regulator scrutiny on day one — with full audit trails, evidence retention, and regulator-format reporting.
              </p>
            </div>

            <div className="rv" style={{ display:'flex', flexWrap:'wrap', gap:10, justifyContent:'center' }}>
              {industry.regulations.map((reg, i) => (
                <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 18px', borderRadius:50, background:`linear-gradient(135deg, ${industry.bg}, #f8fafc)`, border:`1px solid ${industry.color}28`, fontSize:13, fontWeight:700, color:industry.color }}>
                  <Ic n="CheckCircle" s={13} style={{ color:industry.color }}/>
                  {reg}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ════════════════════════════════════════════════════
         6.  EXPLORE OTHER INDUSTRIES
         ════════════════════════════════════════════════════ */}
      <section className="icp-section" style={{ padding:'72px 32px', background:'#f8fafc' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv" style={{ marginBottom:28 }}>
            <h3 style={{ fontSize:22, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Explore other industries</h3>
            <p style={{ fontSize:14, color:'#64748b' }}>{INDUSTRIES.length - 1} more sectors where we deliver enterprise solutions.</p>
          </div>
          <div className="rv icp-related-g" style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap:16 }}>
            {INDUSTRIES.filter(i => i.slug !== industrySlug).map(ind => (
              <button key={ind.slug} onClick={() => navigate(`/industries/${ind.slug}`)}
                style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:12, padding:'20px 20px', borderRadius:16, border:'1px solid #e2e8f0', background:'#fff', cursor:'pointer', textAlign:'left', transition:'all .22s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=ind.color; e.currentTarget.style.background=ind.bg; e.currentTarget.style.transform='translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.background='#fff'; e.currentTarget.style.transform='none' }}>
                <div style={{ width:42, height:42, borderRadius:12, background:`linear-gradient(135deg, ${ind.color}, ${ind.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 6px 16px ${ind.color}30` }}>
                  <Ic n={ind.icon} s={20} style={{ color:'#fff' }}/>
                </div>
                <div>
                  <div style={{ fontSize:13.5, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:3 }}>{ind.heading}</div>
                  <div style={{ fontSize:11.5, color:'#64748b' }}>{ind.items.length} solutions</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         7.  FINAL CTA
         ════════════════════════════════════════════════════ */}
      <section className="icp-cta-section" style={{ padding:'90px 32px', background:'linear-gradient(135deg, #003FB3 0%, #0066FF 60%, #06b6d4 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-100, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:880, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.30)', borderRadius:50, padding:'7px 16px', fontSize:11.5, fontWeight:800, color:'#fff', letterSpacing:'.14em', marginBottom:22, backdropFilter:'blur(10px)' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#67e8f9' }}/>
            READY TO TRANSFORM YOUR {industry.heading.toUpperCase()} OPS?
          </div>
          <h2 className="icp-final-h2" style={{ fontSize:'clamp(28px, 4.5vw, 42px)', fontWeight:900, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:16, lineHeight:1.15, letterSpacing:'-0.02em' }}>
            Talk to a {industry.heading} specialist.
          </h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.85)', marginBottom:32, lineHeight:1.7, maxWidth:680, margin:'0 auto 32px' }}>
            30-minute discovery with a Solution Architect who has implemented {industry.heading.toLowerCase()} solutions for clients like yours. We'll map your priorities to {industry.items.length} specific capabilities — and give you a fixed-price scope before commitment.
          </p>

          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Btn onClick={openConsult} style={{ background:'#fff', color:'#003FB3' }}>
              Book Industry Architect Call <Ic n="Arrow" s={14} style={{ color:'#003FB3' }}/>
            </Btn>
            <Btn variant="ghost" onClick={() => navigate('/industries')} style={{ borderColor:'rgba(255,255,255,0.4)', color:'#fff' }}>
              All Industries
            </Btn>
          </div>
        </div>
      </section>

    </div>
  )
}
