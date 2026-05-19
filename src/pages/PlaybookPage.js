import { useEffect } from 'react'
import { C, Ic, Btn } from '../components/ui'
import { RESOURCES } from '../data/resources'
import { INDUSTRIES } from '../data/industries'

/* ════════════════════════════════════════════════════════════════════════════
 *  PlaybookPage — mounted at /resource/playbooks/:slug
 *  ────────────────────────────────────────────────────────────────────────────
 *  Industry playbook detail page.
 *
 *  1.  Hero (eyebrow + title + pages/format pill + audience + download CTA)
 *  2.  What's inside (excerpt)
 *  3.  Table of contents (full TOC)
 *  4.  Who this is for + cross-link to industry
 *  5.  Related playbooks
 *  6.  CTA
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

function findIndustry(slug) { return INDUSTRIES.find(i => i.slug === slug) || null }

export default function PlaybookPage({ categorySlug, itemSlug, navigate, openConsult }) {
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [categorySlug, itemSlug])

  const category = RESOURCES.find(c => c.slug === categorySlug)
  const item = category?.items.find(i => i.slug === itemSlug)
  if (!category || !item) return (
    <div style={{ paddingTop:120, textAlign:'center', minHeight:'60vh' }}>
      <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Playbook not found</h2>
      <button onClick={() => navigate('/resources/playbooks')} style={{ marginTop:20, color:C.blue, background:'none', border:'none', cursor:'pointer', fontSize:15 }}>← All playbooks</button>
    </div>
  )

  const relIndustry = (item.relatedIndustries||[])[0] && findIndustry(item.relatedIndustries[0])
  const otherPlaybooks = category.items.filter(i => i.slug !== itemSlug).slice(0, 3)

  return (
    <div className="page-fade" style={{ overflowX:'hidden', maxWidth:'100vw' }}>

      <style dangerouslySetInnerHTML={{__html:`
        .pb-section { position: relative; }
        .pb-h2 { font-size: clamp(24px, 3.2vw, 32px); font-weight:800; color:#0a0a14; font-family:'Plus Jakarta Sans',sans-serif; margin-bottom:18px; line-height:1.25; letter-spacing:-0.01em; }

        @media (max-width: 1023px) {
          .pb-hero-g { grid-template-columns: 1fr !important; gap: 36px !important; padding-bottom: 56px !important; }
          .pb-download-card { max-width: 540px; margin: 0 auto; }
        }
        @media (max-width: 767px) {
          .pb-hero-wrap { padding: 32px 18px 0 !important; }
          .pb-hero-g h1 { font-size: clamp(28px, 6.5vw, 38px) !important; }
          .pb-section { padding-top: 60px !important; padding-bottom: 40px !important; padding-left: 18px !important; padding-right: 18px !important; }
          .pb-toc-card { padding: 28px 22px !important; }
          .pb-related-g { grid-template-columns: 1fr !important; gap: 14px !important; }
          .pb-cta-section { padding: 72px 20px !important; }
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

        <div className="pb-hero-wrap" style={{ maxWidth:1280, margin:'0 auto', padding:'48px 24px 0', position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:28, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Home</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <button onClick={() => navigate('/resources')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Resources</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <button onClick={() => navigate(`/resources/${category.slug}`)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Playbooks</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <span style={{ fontSize:13, color:'#0a0a14', fontWeight:600 }}>{item.t}</span>
          </div>

          <div className="pb-hero-g" style={{ display:'grid', gridTemplateColumns:'1fr 380px', gap:48, alignItems:'center', paddingBottom:72 }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${category.color}18`, border:`1px solid ${category.color}40`, borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:800, color:category.color, marginBottom:22, letterSpacing:'.04em' }}>
                <Ic n="FileText" s={13} style={{ color:category.color }}/>
                INDUSTRY PLAYBOOK · {item.pages} PAGES
                {item.tag && <span style={{ background:'#06b6d4', color:'#fff', borderRadius:50, padding:'2px 9px', fontSize:10, fontWeight:800, marginLeft:6, letterSpacing:'.04em' }}>{item.tag.toUpperCase()}</span>}
              </div>

              <h1 style={{ fontSize:'clamp(32px,4.6vw,46px)', fontWeight:900, color:'#0a0a14', lineHeight:1.12, marginBottom:20, fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:'-0.02em' }}>
                {item.t}
              </h1>

              <p style={{ fontSize:17, color:'#334155', lineHeight:1.75, marginBottom:28, maxWidth:580 }}>
                {item.hero}
              </p>

              {item.audience && (
                <div style={{ marginBottom:32 }}>
                  <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.10em', color:category.color, marginBottom:10 }}>WRITTEN FOR</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {item.audience.split(',').map((a, i) => (
                      <span key={i} style={{ display:'inline-flex', alignItems:'center', padding:'7px 14px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:`1px solid ${category.color}30`, backdropFilter:'blur(10px)', fontSize:13, fontWeight:700, color:'#0a0a14' }}>
                        {a.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Download card */}
            <div className="pb-download-card" style={{ background:`linear-gradient(135deg, ${category.color}, ${category.color}dd)`, borderRadius:24, padding:32, boxShadow:`0 20px 50px ${category.color}30`, color:'#fff', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:-80, right:-60, width:240, height:240, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)', pointerEvents:'none' }}/>
              <div style={{ position:'relative', zIndex:1 }}>
                <Ic n="FileText" s={32} style={{ color:'#fff', marginBottom:14 }}/>
                <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:'rgba(255,255,255,0.80)', marginBottom:8 }}>FREE DOWNLOAD</div>
                <h3 style={{ fontSize:22, fontWeight:900, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, letterSpacing:'-0.01em' }}>{item.pages}-page playbook</h3>
                <p style={{ fontSize:13.5, color:'rgba(255,255,255,0.85)', lineHeight:1.55, marginBottom:24 }}>
                  {item.downloadFormat || 'PDF'} format · {item.readTime} · No registration required
                </p>
                <button onClick={openConsult}
                  style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, width:'100%', padding:'14px 22px', borderRadius:50, background:'#fff', color:category.color, border:'none', cursor:'pointer', fontSize:14, fontWeight:800, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:10 }}>
                  Request Playbook <Ic n="Arrow" s={14} style={{ color:category.color }}/>
                </button>
                <button onClick={openConsult}
                  style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, width:'100%', padding:'12px 18px', borderRadius:50, background:'rgba(255,255,255,0.15)', color:'#fff', border:'1px solid rgba(255,255,255,0.30)', cursor:'pointer', fontSize:13, fontWeight:700, backdropFilter:'blur(10px)' }}>
                  Discuss with Architect
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 2. WHAT'S INSIDE */}
      {item.excerpt && (
        <section className="pb-section" style={{ padding:'80px 32px', background:'#fff' }}>
          <div style={{ maxWidth:780, margin:'0 auto' }}>
            <div className="rv">
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${category.color}15`, border:`1px solid ${category.color}30`, borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:category.color, letterSpacing:'.14em', marginBottom:18 }}>
                WHAT'S INSIDE
              </div>
              <h2 className="pb-h2">A practical playbook — not theory</h2>
              <p style={{ fontSize:16, color:'#334155', lineHeight:1.8 }}>{item.excerpt}</p>
            </div>
          </div>
        </section>
      )}


      {/* 3. TABLE OF CONTENTS */}
      {item.tableOfContents && item.tableOfContents.length > 0 && (
        <section className="pb-section" style={{ padding:'80px 32px', background:'#f8fafc' }}>
          <div style={{ maxWidth:880, margin:'0 auto' }}>
            <div className="rv" style={{ textAlign:'center', marginBottom:32 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${category.color}15`, border:`1px solid ${category.color}30`, borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:category.color, letterSpacing:'.14em', marginBottom:14 }}>
                <Ic n="BookOpen" s={13} style={{ color:category.color }}/>
                TABLE OF CONTENTS
              </div>
              <h2 className="pb-h2" style={{ textAlign:'center' }}>What's in the {item.pages} pages</h2>
            </div>

            <div className="rv pb-toc-card" style={{ padding:'40px 36px', borderRadius:20, background:'#fff', border:`1px solid ${category.color}20`, boxShadow:'0 4px 20px rgba(0,53,128,0.05)' }}>
              {item.tableOfContents.map((chapter, i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:14, padding:'14px 0', borderBottom: i < item.tableOfContents.length - 1 ? '1px solid #f0f7ff' : 'none' }}>
                  <span style={{ fontSize:11, fontWeight:800, color:category.color, fontFamily:"'JetBrains Mono', monospace", letterSpacing:'.04em', minWidth:30, paddingTop:2 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize:14.5, color:'#0a0a14', lineHeight:1.55, fontWeight: chapter.startsWith('Appendix') ? 600 : 700 }}>
                    {chapter}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* 4. CROSS-LINK TO INDUSTRY */}
      {relIndustry && (
        <section className="pb-section" style={{ padding:'80px 32px', background:'#fff' }}>
          <div style={{ maxWidth:880, margin:'0 auto' }}>
            <div className="rv" style={{ marginBottom:24 }}>
              <h3 style={{ fontSize:20, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Need sector-specific solutions?</h3>
              <p style={{ fontSize:14, color:'#64748b' }}>Browse our enterprise solutions for this sector.</p>
            </div>
            <button onClick={() => navigate(`/industries/${relIndustry.slug}`)}
              className="rv"
              style={{ display:'flex', alignItems:'center', gap:20, padding:'24px 26px', borderRadius:18, background:'linear-gradient(135deg, #f8fafc, #f0f7ff)', border:`1px solid ${relIndustry.color}30`, cursor:'pointer', textAlign:'left', width:'100%', transition:'all .22s' }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 14px 32px ${relIndustry.color}1f` }}
              onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none' }}>
              <div style={{ width:56, height:56, borderRadius:14, background:`linear-gradient(135deg, ${relIndustry.color}, ${relIndustry.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 8px 20px ${relIndustry.color}40` }}>
                <Ic n={relIndustry.icon} s={26} style={{ color:'#fff' }}/>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.10em', color:relIndustry.color, marginBottom:4 }}>EXPLORE INDUSTRY</div>
                <div style={{ fontSize:18, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:4 }}>{relIndustry.heading}</div>
                <div style={{ fontSize:13, color:'#475569' }}>{relIndustry.items.length} sector-specific solutions ready to deploy</div>
              </div>
              <Ic n="Arrow" s={18} style={{ color:relIndustry.color, flexShrink:0 }}/>
            </button>
          </div>
        </section>
      )}


      {/* 5. RELATED PLAYBOOKS */}
      {otherPlaybooks.length > 0 && (
        <section className="pb-section" style={{ padding:'80px 32px', background:'#f8fafc' }}>
          <div style={{ maxWidth:1180, margin:'0 auto' }}>
            <div className="rv" style={{ marginBottom:32 }}>
              <h3 style={{ fontSize:22, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Other playbooks</h3>
              <p style={{ fontSize:14, color:'#64748b' }}>Sector-specific guides from our practice.</p>
            </div>
            <div className="rv pb-related-g" style={{ display:'grid', gridTemplateColumns:`repeat(${otherPlaybooks.length}, 1fr)`, gap:18 }}>
              {otherPlaybooks.map(pb => (
                <button key={pb.slug} onClick={() => navigate(`/resource/${category.slug}/${pb.slug}`)}
                  style={{ display:'flex', flexDirection:'column', padding:'24px 22px 20px', borderRadius:18, background:'#fff', border:'1px solid #e2e8f0', cursor:'pointer', textAlign:'left', position:'relative', overflow:'hidden', transition:'all .22s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=category.color+'55'; e.currentTarget.style.transform='translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.transform='none' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${category.color}, ${category.color}55)` }} />
                  <div style={{ width:42, height:42, borderRadius:12, background:`linear-gradient(135deg, ${category.color}, ${category.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14, boxShadow:`0 6px 16px ${category.color}38` }}>
                    <Ic n={pb.n} s={19} style={{ color:'#fff' }}/>
                  </div>
                  <h4 style={{ fontSize:15, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, lineHeight:1.3 }}>{pb.t}</h4>
                  <p style={{ fontSize:12.5, color:'#475569', lineHeight:1.55, marginBottom:14, flex:1 }}>{pb.d}</p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:10, borderTop:`1px solid ${category.color}15`, fontSize:11.5, color:'#64748b', fontWeight:600 }}>
                    <span>{pb.pages} pages</span>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:5, color:category.color, fontWeight:700 }}>Download <Ic n="Arrow" s={11} style={{ color:category.color }}/></span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* 6. CTA */}
      <section className="pb-cta-section" style={{ padding:'90px 32px', background:'linear-gradient(135deg, #003FB3 0%, #0066FF 60%, #06b6d4 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-100, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:880, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.30)', borderRadius:50, padding:'7px 16px', fontSize:11.5, fontWeight:800, color:'#fff', letterSpacing:'.14em', marginBottom:22, backdropFilter:'blur(10px)' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#67e8f9' }}/>
            READY TO ACTION THIS?
          </div>
          <h2 style={{ fontSize:'clamp(28px, 4.5vw, 42px)', fontWeight:900, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:16, lineHeight:1.15, letterSpacing:'-0.02em' }}>
            Need help putting this playbook into action?
          </h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.85)', marginBottom:32, lineHeight:1.7, maxWidth:680, margin:'0 auto 32px' }}>
            30-minute discovery call with the Solution Architect who wrote this playbook. We'll discuss your specific environment and give you a fixed-price proposal for the relevant work within a week.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Btn onClick={openConsult} style={{ background:'#fff', color:'#003FB3' }}>Book Architect Call <Ic n="Arrow" s={14} style={{ color:'#003FB3' }}/></Btn>
            <Btn variant="ghost" onClick={() => navigate(`/resources/${category.slug}`)} style={{ borderColor:'rgba(255,255,255,0.4)', color:'#fff' }}>More Playbooks</Btn>
          </div>
        </div>
      </section>

    </div>
  )
}
