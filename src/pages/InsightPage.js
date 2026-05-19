import { useEffect } from 'react'
import { C, Ic, Btn } from '../components/ui'
import { RESOURCES } from '../data/resources'

/* ════════════════════════════════════════════════════════════════════════════
 *  InsightPage — mounted at /resource/insights/:slug
 *  ────────────────────────────────────────────────────────────────────────────
 *  Long-form article template — typography-focused.
 *
 *  1.  Article hero (eyebrow + headline + lede + author byline + read time)
 *  2.  Content summary (visual outline / what you'll learn)
 *  3.  Excerpt prose (the article preview body)
 *  4.  Author bio card
 *  5.  Tags + cross-links
 *  6.  Related articles
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

function fmtDate(d) {
  if (!d) return ''
  const [y, m, day] = d.split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[parseInt(m,10)-1]} ${parseInt(day,10)}, ${y}`
}

export default function InsightPage({ categorySlug, itemSlug, navigate, openConsult }) {
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [categorySlug, itemSlug])

  const category = RESOURCES.find(c => c.slug === categorySlug)
  const item = category?.items.find(i => i.slug === itemSlug)
  if (!category || !item) return (
    <div style={{ paddingTop:120, textAlign:'center', minHeight:'60vh' }}>
      <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Article not found</h2>
      <button onClick={() => navigate('/resources/insights')} style={{ marginTop:20, color:C.blue, background:'none', border:'none', cursor:'pointer', fontSize:15 }}>← All articles</button>
    </div>
  )

  const otherArticles = category.items.filter(i => i.slug !== itemSlug).slice(0, 3)

  return (
    <div className="page-fade" style={{ overflowX:'hidden', maxWidth:'100vw' }}>

      <style dangerouslySetInnerHTML={{__html:`
        .in-section { position: relative; }
        .in-h2 { font-size: clamp(24px, 3.2vw, 32px); font-weight:800; color:#0a0a14; font-family:'Plus Jakarta Sans',sans-serif; margin-bottom:18px; line-height:1.25; letter-spacing:-0.01em; }
        .in-body { font-size:16.5px; color:#334155; line-height:1.85; }
        .in-narrative { max-width:740px; margin:0 auto; }

        @media (max-width: 767px) {
          .in-section { padding-top: 56px !important; padding-bottom: 40px !important; padding-left: 18px !important; padding-right: 18px !important; }
          .in-hero { padding: 32px 18px 64px !important; }
          .in-hero h1 { font-size: clamp(28px, 6.5vw, 42px) !important; }
          .in-summary-g { grid-template-columns: 1fr !important; }
          .in-related-g { grid-template-columns: 1fr !important; gap: 14px !important; }
          .in-cta-section { padding: 72px 20px !important; }
        }
      `}}/>


      {/* 1. ARTICLE HERO */}
      <section className="in-hero" style={{
        paddingTop:68, paddingBottom:80, position:'relative', overflow:'hidden',
        background: `
          radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.35), transparent 55%),
          radial-gradient(circle at 80% 70%, rgba(0, 102, 255, 0.20), transparent 60%),
          linear-gradient(135deg, #ffffff 0%, #f0f7ff 25%, #d6ebff 55%, #b8defa 80%, #9bd3f5 100%)
        `
      }}>
        <div style={{ position:'absolute', top:-100, right:-80, width:380, height:380, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.32), transparent 70%)', filter:'blur(48px)', animation:'heroFloat 9s ease-in-out infinite', pointerEvents:'none' }} />

        <div style={{ maxWidth:840, margin:'0 auto', padding:'48px 32px 0', position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:32, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Home</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <button onClick={() => navigate('/resources')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Resources</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <button onClick={() => navigate(`/resources/${category.slug}`)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Insights</button>
          </div>

          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${category.color}18`, border:`1px solid ${category.color}40`, borderRadius:50, padding:'7px 16px', fontSize:11.5, fontWeight:800, color:category.color, marginBottom:24, letterSpacing:'.06em' }}>
            <Ic n="BookOpen" s={13} style={{ color:category.color }}/>
            {item.category ? item.category.toUpperCase() : 'ARTICLE'}
            {item.tag && <span style={{ background:'#06b6d4', color:'#fff', borderRadius:50, padding:'2px 9px', fontSize:10, fontWeight:800, marginLeft:6, letterSpacing:'.04em' }}>{item.tag.toUpperCase()}</span>}
          </div>

          <h1 style={{ fontSize:'clamp(34px, 5vw, 52px)', fontWeight:900, color:'#0a0a14', lineHeight:1.1, marginBottom:24, fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:'-0.02em' }}>
            {item.t}
          </h1>

          <p style={{ fontSize:19, color:'#334155', lineHeight:1.65, marginBottom:36, fontWeight:400 }}>
            {item.d}
          </p>

          {/* Author byline */}
          <div style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 0', borderTop:'1px solid rgba(0,102,255,0.15)', borderBottom:'1px solid rgba(0,102,255,0.15)' }}>
            <div style={{ width:48, height:48, borderRadius:'50%', background:`linear-gradient(135deg, ${category.color}, ${category.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 6px 16px ${category.color}30` }}>
              <Ic n="User" s={22} style={{ color:'#fff' }}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:700, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                {item.author?.name || 'DevinStratus'}
              </div>
              <div style={{ fontSize:12.5, color:'#64748b', marginTop:2 }}>
                {item.author?.role || 'Editorial Team'} · {fmtDate(item.publishDate)} · {item.readTime}
              </div>
            </div>
            <button onClick={() => { if (navigator.share) navigator.share({ title:item.t, url:window.location.href }) }}
              style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1px solid rgba(0,102,255,0.25)', backdropFilter:'blur(10px)', cursor:'pointer', fontSize:12.5, fontWeight:700, color:'#0a0a14' }}>
              <Ic n="ExternalLink" s={12} style={{ color:'#0066FF' }}/>
              Share
            </button>
          </div>
        </div>
      </section>


      {/* 2. EXCERPT BODY */}
      {item.excerpt && (
        <section className="in-section" style={{ padding:'80px 32px 40px', background:'#fff' }}>
          <div className="in-narrative">
            <div className="rv">
              <p style={{ fontSize:20, color:'#0a0a14', lineHeight:1.65, fontWeight:500, fontStyle:'italic', borderLeft:`4px solid ${category.color}`, paddingLeft:24, marginBottom:32 }}>
                {item.hero}
              </p>
              <p className="in-body">{item.excerpt}</p>
            </div>
          </div>
        </section>
      )}


      {/* 3. CONTENT SUMMARY — what's in this article */}
      {item.contentSummary && item.contentSummary.length > 0 && (
        <section className="in-section" style={{ padding:'56px 32px 80px', background:'#fff' }}>
          <div className="in-narrative">
            <div className="rv" style={{ padding:'36px 32px', borderRadius:20, background:`linear-gradient(135deg, ${category.bg}, #f8fafc)`, border:`1px solid ${category.color}20` }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${category.color}18`, border:`1px solid ${category.color}40`, borderRadius:50, padding:'5px 12px', fontSize:11, fontWeight:800, color:category.color, marginBottom:18, letterSpacing:'.10em' }}>
                <Ic n="Layers" s={12} style={{ color:category.color }}/>
                WHAT YOU'LL LEARN
              </div>
              <h3 style={{ fontSize:20, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:18, letterSpacing:'-0.005em' }}>This article covers:</h3>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10 }}>
                {item.contentSummary.map((point, i) => (
                  <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:12, fontSize:14.5, color:'#0a0a14', lineHeight:1.6 }}>
                    <span style={{ width:24, height:24, borderRadius:'50%', background:category.color, color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, flexShrink:0, marginTop:2, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{i + 1}</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}


      {/* 4. AUTHOR BIO + TAGS */}
      <section className="in-section" style={{ padding:'40px 32px 80px', background:'#fff' }}>
        <div className="in-narrative">
          <div className="rv" style={{ padding:'28px', borderRadius:18, background:'#f8fafc', border:'1px solid #e2e8f0' }}>
            <div style={{ display:'flex', alignItems:'flex-start', gap:18, marginBottom:18 }}>
              <div style={{ width:56, height:56, borderRadius:'50%', background:`linear-gradient(135deg, ${category.color}, ${category.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 6px 16px ${category.color}30` }}>
                <Ic n="User" s={26} style={{ color:'#fff' }}/>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.10em', color:category.color, marginBottom:5 }}>ABOUT THE AUTHOR</div>
                <div style={{ fontSize:16, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:3 }}>
                  {item.author?.name || 'DevinStratus Editorial'}
                </div>
                <div style={{ fontSize:13, color:'#64748b' }}>
                  {item.author?.role || 'Microsoft Inner Circle Partner'}
                </div>
              </div>
            </div>

            {item.tags && item.tags.length > 0 && (
              <div style={{ paddingTop:16, borderTop:'1px solid #e2e8f0' }}>
                <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.10em', color:'#64748b', marginBottom:10 }}>TAGS</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {item.tags.map((tag, i) => (
                    <span key={i} style={{ display:'inline-flex', alignItems:'center', padding:'5px 12px', borderRadius:50, background:'#fff', border:'1px solid #e2e8f0', fontSize:11.5, fontWeight:600, color:'#475569' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* 5. RELATED ARTICLES */}
      {otherArticles.length > 0 && (
        <section className="in-section" style={{ padding:'80px 32px', background:'#f8fafc' }}>
          <div style={{ maxWidth:1180, margin:'0 auto' }}>
            <div className="rv" style={{ marginBottom:32 }}>
              <h3 style={{ fontSize:22, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>More articles</h3>
              <p style={{ fontSize:14, color:'#64748b' }}>Continue reading from our editorial team.</p>
            </div>
            <div className="rv in-related-g" style={{ display:'grid', gridTemplateColumns:`repeat(${otherArticles.length}, 1fr)`, gap:18 }}>
              {otherArticles.map(art => (
                <button key={art.slug} onClick={() => navigate(`/resource/${category.slug}/${art.slug}`)}
                  style={{ display:'flex', flexDirection:'column', padding:'24px 22px 20px', borderRadius:18, background:'#fff', border:'1px solid #e2e8f0', cursor:'pointer', textAlign:'left', position:'relative', overflow:'hidden', transition:'all .22s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=category.color+'55'; e.currentTarget.style.transform='translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.transform='none' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${category.color}, ${category.color}55)` }} />
                  <div style={{ fontSize:10.5, fontWeight:800, letterSpacing:'.10em', color:category.color, marginBottom:10 }}>
                    {art.category ? art.category.toUpperCase() : 'ARTICLE'}
                  </div>
                  <h4 style={{ fontSize:15.5, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, lineHeight:1.3 }}>{art.t}</h4>
                  <p style={{ fontSize:13, color:'#475569', lineHeight:1.6, marginBottom:14, flex:1 }}>{art.d}</p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:10, borderTop:`1px solid ${category.color}15`, fontSize:11.5, color:'#64748b', fontWeight:600 }}>
                    <span>{art.readTime}</span>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:5, color:category.color, fontWeight:700 }}>Read article <Ic n="Arrow" s={11} style={{ color:category.color }}/></span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* 6. CTA */}
      <section className="in-cta-section" style={{ padding:'90px 32px', background:'linear-gradient(135deg, #003FB3 0%, #0066FF 60%, #06b6d4 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-100, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:880, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.30)', borderRadius:50, padding:'7px 16px', fontSize:11.5, fontWeight:800, color:'#fff', letterSpacing:'.14em', marginBottom:22, backdropFilter:'blur(10px)' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#67e8f9' }}/>
            FINISHED THE ARTICLE?
          </div>
          <h2 style={{ fontSize:'clamp(28px, 4.5vw, 42px)', fontWeight:900, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:16, lineHeight:1.15, letterSpacing:'-0.02em' }}>
            Want our take on your specific situation?
          </h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,0.85)', marginBottom:32, lineHeight:1.7, maxWidth:680, margin:'0 auto 32px' }}>
            30-minute discovery call with a Solution Architect. We'll discuss how the thinking in this article applies to your environment — and where it doesn't. Honest perspective; no sales pitch.
          </p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <Btn onClick={openConsult} style={{ background:'#fff', color:'#003FB3' }}>Book Architect Call <Ic n="Arrow" s={14} style={{ color:'#003FB3' }}/></Btn>
            <Btn variant="ghost" onClick={() => navigate(`/resources/${category.slug}`)} style={{ borderColor:'rgba(255,255,255,0.4)', color:'#fff' }}>More Articles</Btn>
          </div>
        </div>
      </section>

    </div>
  )
}
