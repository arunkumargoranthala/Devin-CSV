import { useState, useEffect } from 'react'
import { C, Ic, Btn } from '../components/ui'
import { USECASES } from '../data/usecases'

/* ════════════════════════════════════════════════════════════════════════════
 *  UseCasesIndexPage — the /use-cases gallery landing page
 *  ────────────────────────────────────────────────────────────────────────────
 *  Structure:
 *    1. Hero (light Global-Offices recipe + use-case positioning)
 *    2. Stats strip — 4 use-case credibility numbers
 *    3. Use Cases grid — 5 category cards each showing top sub-items
 *    4. Why enterprises think in use cases — 4 reasoning cards
 *    5. Microsoft platform foundation — credibility
 *    6. FAQ — buyer questions about use-case engagements
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

export default function UseCasesIndexPage({ navigate, openConsult }) {
  const [openFaq, setOpenFaq] = useState(null)
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const totalUseCases = USECASES.reduce((sum, c) => sum + c.items.length, 0)

  return (
    <div className="page-fade" style={{ overflowX:'hidden', maxWidth:'100vw' }}>

      {/* ─── Page-specific responsive CSS ─────────────────── */}
      <style dangerouslySetInnerHTML={{__html:`
        @media (max-width: 1023px) {
          .ucip-cats-g { grid-template-columns: repeat(2, 1fr) !important; }
          .ucip-why-g { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .ucip-hero { padding: 32px 20px 64px !important; }
          .ucip-hero h1 { font-size: clamp(30px, 7vw, 46px) !important; }
        }
        @media (max-width: 767px) {
          .ucip-stats-g { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; row-gap: 28px !important; }
          .ucip-stats-g > div { padding-left: 0 !important; border-left: none !important; }
          .ucip-stats-g > div:nth-child(3),
          .ucip-stats-g > div:nth-child(4) { padding-top: 22px !important; border-top: 1px solid #e2e8f0; }
          .ucip-stats-g .stat-v { font-size: 36px !important; }
          .ucip-trust-pills > div { font-size: 12px !important; padding: 7px 13px !important; }
          .ucip-section { padding-left: 18px !important; padding-right: 18px !important; }
          .ucip-stats-section { padding: 56px 18px !important; }
          .ucip-cta-section { padding: 72px 20px !important; }
          .ucip-cta-section h2 { font-size: clamp(24px, 6vw, 36px) !important; }
        }
        @media (max-width: 640px) {
          .ucip-cats-g { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
        @media (max-width: 480px) {
          .ucip-why-g { grid-template-columns: 1fr !important; }
          .ucip-hero-ctas { width: 100%; flex-direction: column !important; align-items: stretch !important; }
          .ucip-hero-ctas > * { width: 100%; justify-content: center; }
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

        <div className="ucip-hero" style={{ maxWidth:1300, margin:'0 auto', padding:'56px 32px 100px', position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:32, flexWrap:'wrap' }}>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#475569' }}>Home</button>
            <Ic n="ChevR" s={12} style={{ color:'#94a3b8' }}/>
            <span style={{ fontSize:13, color:'#0a0a14', fontWeight:600 }}>Use Cases</span>
          </div>

          <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:'rgba(6,182,212,0.10)', border:'1px solid rgba(6,182,212,0.30)', borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:800, color:'#003FB3', letterSpacing:'.06em', marginBottom:24 }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#06b6d4', boxShadow:'0 0 0 4px rgba(6,182,212,0.20)', animation:'heroFloat 2s ease-in-out infinite' }} />
            5 CATEGORIES · {totalUseCases} ENTERPRISE USE CASES
          </div>

          <h1 style={{ fontSize:'clamp(36px, 5.5vw, 64px)', fontWeight:900, lineHeight:1.05, letterSpacing:'-0.02em', color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:24, maxWidth:980 }}>
            Real business outcomes.<br />
            <span style={{ background:'linear-gradient(135deg, #06b6d4 0%, #0066FF 50%, #003FB3 100%)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              Not generic platforms.
            </span>
          </h1>

          <p style={{ fontSize:17.5, color:'#334155', lineHeight:1.7, maxWidth:780, marginBottom:32 }}>
            Enterprise buyers don't buy "AI" or "automation" — they buy <strong style={{ color:'#0a0a14' }}>specific business outcomes</strong>: an HR assistant that actually answers policy questions, invoice processing that pays vendors on time, executive dashboards that drive decisions. {totalUseCases} pre-scoped use cases — fixed-price, ready in 4–14 weeks, built on Microsoft.
          </p>

          <div className="ucip-trust-pills" style={{ display:'flex', flexWrap:'wrap', gap:14, marginBottom:40 }}>
            {[
              { icon:'Zap',         text:'4–14 week delivery' },
              { icon:'Calc',        text:'Fixed-price scope' },
              { icon:'CheckCircle', text:'Pre-validated use cases' },
              { icon:'Award',       text:'Microsoft Inner Circle' },
            ].map((t,i) => (
              <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'9px 16px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1px solid rgba(0,102,255,0.18)', backdropFilter:'blur(10px)', fontSize:13, fontWeight:700, color:'#0a0a14' }}>
                <Ic n={t.icon} s={14} style={{ color:'#0066FF' }}/>
                {t.text}
              </div>
            ))}
          </div>

          <div className="ucip-hero-ctas" style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            <Btn onClick={openConsult}>Talk to a Use-Case Architect <Ic n="Arrow" s={14} style={{ color:'#fff' }}/></Btn>
            <button onClick={() => { const el = document.getElementById('usecases-grid'); if (el) el.scrollIntoView({ behavior:'smooth' }) }}
              style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 26px', borderRadius:50, background:'rgba(255,255,255,0.65)', border:'1.5px solid rgba(0,102,255,0.30)', backdropFilter:'blur(10px)', cursor:'pointer', fontSize:15, fontWeight:700, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
              Browse {totalUseCases} use cases <Ic n="ChevD" s={14} style={{ color:'#0066FF' }}/>
            </button>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         2.  STATS STRIP
         ════════════════════════════════════════════════════ */}
      <section className="ucip-stats-section" style={{ padding:'72px 32px', background:'#fff', borderTop:'1px solid #e2e8f0', borderBottom:'1px solid #e2e8f0' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv ucip-stats-g" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:32 }}>
            {[
              { v:totalUseCases.toString(), l:'Enterprise use cases',  s:'Pre-scoped, ready to deploy' },
              { v:'5',                       l:'Use case categories',   s:'AI, workflow, apps, analytics, workplace' },
              { v:'4–14 wk',                 l:'Typical delivery',      s:'Fixed-price, fixed-timeline' },
              { v:'350+',                    l:'Total implementations', s:'Across all use cases & sectors' },
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
         3.  USE CASES GRID — 5 categories
         ════════════════════════════════════════════════════ */}
      <section className="ucip-section" id="usecases-grid" style={{ padding:'90px 32px 60px', background:'#fff' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:56, maxWidth:780, margin:'0 auto 56px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#0066FF15', border:'1px solid #0066FF30', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              BROWSE BY OUTCOME
            </div>
            <h2 style={{ fontSize:'clamp(28px, 4vw, 42px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14, lineHeight:1.15 }}>
              Choose your outcome — we'll show you how
            </h2>
            <p style={{ fontSize:16, color:'#475569', lineHeight:1.7 }}>
              Each category contains 4–5 ready-to-deploy use cases. Click any category for the full enterprise brief.
            </p>
          </div>

          <div className="rv ucip-cats-g" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20 }}>
            {USECASES.map((cat, idx) => (
              <button key={cat.slug} onClick={() => navigate(`/use-cases/${cat.slug}`)}
                style={{
                  display:'flex', flexDirection:'column', padding:'30px 28px 26px',
                  borderRadius:22,
                  border:'1px solid rgba(0, 102, 255, 0.10)',
                  background:'linear-gradient(180deg, #ffffff 0%, #fafcff 100%)',
                  boxShadow:'0 1px 3px rgba(0, 53, 128, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                  cursor:'pointer', textAlign:'left', position:'relative', overflow:'hidden',
                  transition:'all .3s cubic-bezier(.22,1,.36,1)',
                  minHeight:380
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
                      {it.t}
                    </div>
                  ))}
                  {cat.items.length > 4 && (
                    <div style={{ fontSize:11.5, color:cat.color, fontWeight:700, fontStyle:'italic', marginTop:2 }}>
                      +{cat.items.length - 4} more use case{cat.items.length - 4 > 1 ? 's' : ''}
                    </div>
                  )}
                </div>

                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative', zIndex:1, paddingTop:14, borderTop:`1px solid ${cat.color}15` }}>
                  <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'6px 13px', borderRadius:50, background:`${cat.color}12`, fontSize:12, fontWeight:700, color:cat.color }}>
                    <span style={{ width:5, height:5, borderRadius:'50%', background:cat.color }} />
                    {cat.items.length} use cases
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
         4.  WHY USE-CASE FIRST APPROACH
         ════════════════════════════════════════════════════ */}
      <section className="ucip-section" style={{ padding:'100px 32px', background:'linear-gradient(180deg, #f8fafc 0%, #f0f7ff 100%)' }}>
        <div style={{ maxWidth:1300, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:56, maxWidth:760, margin:'0 auto 56px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#0066FF15', border:'1px solid #0066FF30', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              WHY USE CASES
            </div>
            <h2 style={{ fontSize:'clamp(28px, 4vw, 40px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14, lineHeight:1.15 }}>
              Why enterprises think in use cases — and so do we
            </h2>
            <p style={{ fontSize:16, color:'#475569', lineHeight:1.7 }}>
              "Buy a Power Platform" is a tool sale. "Build an HR Assistant" is an outcome. Use cases close the gap between technology capability and business value.
            </p>
          </div>

          <div className="rv ucip-why-g" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:20 }}>
            {[
              { icon:'Target',      accent:'#0066FF', title:'Outcome-defined',     desc:"Each use case is a specific business outcome — not a tool. You know exactly what you're getting and how to measure success before signing." },
              { icon:'Calc',        accent:'#003FB3', title:'Fixed-price scope',   desc:"Pre-scoped use cases mean fixed-price, fixed-timeline engagements. No \"we'll figure out the scope as we go\" — that approach kills enterprise budgets." },
              { icon:'Zap',         accent:'#06b6d4', title:'Fast time-to-value',  desc:"4–14 week delivery (vs 6–18 months for custom builds). Most clients see ROI within 6 months of go-live — predictable, measurable, defensible." },
              { icon:'CheckCircle', accent:'#0EA5E9', title:'Pre-validated proven', desc:"Every use case has been delivered multiple times — we know exactly what works, what's risky, and where the integration pitfalls are. No prototyping at your expense." },
            ].map((item,i) => (
              <div key={i} style={{ padding:'30px 26px', borderRadius:20, background:'#fff', border:'1px solid #e2e8f0', position:'relative', overflow:'hidden' }}>
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
         5.  MICROSOFT PLATFORM FOUNDATION
         ════════════════════════════════════════════════════ */}
      <section className="ucip-section" style={{ padding:'80px 32px', background:'#fff', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, right:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.10), transparent 70%)', filter:'blur(50px)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:1180, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:48, maxWidth:760, margin:'0 auto 48px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(0,102,255,0.10)', border:'1px solid rgba(0,102,255,0.25)', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:'#0066FF' }}/>
              BUILT ON MICROSOFT
            </div>
            <h2 style={{ fontSize:'clamp(26px, 3.5vw, 34px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:12, lineHeight:1.2 }}>
              Every use case on the Microsoft platform you already trust
            </h2>
            <p style={{ fontSize:15, color:'#475569', lineHeight:1.7 }}>
              All {totalUseCases} use cases deliver on Microsoft 365, Power Platform, Dynamics 365, Azure, and Microsoft Copilot — under your existing Microsoft governance and tenant.
            </p>
          </div>

          <div className="rv" style={{ display:'flex', flexWrap:'wrap', gap:10, justifyContent:'center', maxWidth:980, margin:'0 auto' }}>
            {[
              "Microsoft Copilot Studio",
              "Azure OpenAI",
              "Power Automate",
              "Power Apps",
              "Power BI Premium",
              "Microsoft Fabric",
              "Dynamics 365",
              "Microsoft Teams",
              "SharePoint Online",
              "Microsoft Viva Suite",
              "Azure AI Search",
              "Azure AI Document Intelligence",
              "Microsoft Entra ID",
              "Microsoft Purview",
            ].map((tech, i) => (
              <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 18px', borderRadius:50, background:'linear-gradient(135deg, #f8fafc, #f0f7ff)', border:'1px solid #0066FF22', fontSize:13, fontWeight:700, color:'#003FB3' }}>
                <Ic n="Cpu" s={13} style={{ color:'#06b6d4' }}/>
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         6.  FAQ
         ════════════════════════════════════════════════════ */}
      <section className="ucip-section" style={{ padding:'100px 32px', background:'#f8fafc' }}>
        <div style={{ maxWidth:880, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#06b6d418', border:'1px solid #06b6d440', borderRadius:50, padding:'6px 14px', fontSize:11.5, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              FREQUENTLY ASKED
            </div>
            <h2 style={{ fontSize:'clamp(28px, 4vw, 38px)', fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14, lineHeight:1.15 }}>
              How use-case engagements work
            </h2>
            <p style={{ fontSize:15.5, color:'#475569', lineHeight:1.7 }}>
              The questions buyers ask before committing to a use-case project.
            </p>
          </div>

          <div className="rv">
            {[
              { q:"Why use cases vs platform implementations?",
                a:"Platform implementations sound technical but rarely deliver business value alone. Use cases force outcome thinking: 'we will deliver an HR Assistant that resolves X% of Tier-1 tickets in Y weeks for £Z.' Specific, measurable, accountable. Most platform projects fail because outcomes weren't defined upfront." },
              { q:"How does pricing work for a use case?",
                a:"Each use case has a defined scope, deliverables, and timeline — leading to a fixed-price quote. Typical range: £40k–£250k depending on complexity, integrations, and rollout scale. We provide written fixed-price scope after a 30-minute discovery call. No 'time and materials' surprises." },
              { q:"Can we customise a use case for our specific situation?",
                a:"Yes — every use case is customised for your data sources, integrations, business rules, and brand. The pre-scoped nature speeds delivery; it doesn't constrain customisation. Most clients customise 20–40% of any given use case based on their environment." },
              { q:"What if our scenario doesn't fit one of these use cases?",
                a:"We can combine multiple use cases (e.g., HR Assistant + Employee Onboarding workflows), or build custom on our platform if needed. The 22 use cases cover 80%+ of common enterprise needs; custom builds use the same delivery methodology but with discovery-based scoping." },
              { q:"How do we get started?",
                a:"Book a 30-minute discovery call with a Solution Architect. We'll discuss your priority outcomes, existing Microsoft estate, and constraints. Within a week of the call, you'll have a written fixed-price proposal for the most relevant 2–3 use cases. No commitment to proceed." },
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
      <section className="ucip-cta-section" style={{ padding:'100px 32px', background:'linear-gradient(135deg, #003FB3 0%, #0066FF 60%, #06b6d4 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-100, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-80, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)', pointerEvents:'none' }}/>

        <div style={{ maxWidth:880, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.30)', borderRadius:50, padding:'7px 16px', fontSize:11.5, fontWeight:800, color:'#fff', letterSpacing:'.14em', marginBottom:24, backdropFilter:'blur(10px)' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:'#67e8f9' }}/>
            READY TO PICK YOUR OUTCOME?
          </div>

          <h2 style={{ fontSize:'clamp(30px, 4.5vw, 46px)', fontWeight:900, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:18, lineHeight:1.1, letterSpacing:'-0.02em' }}>
            What outcome would change your business most?
          </h2>
          <p style={{ fontSize:17, color:'rgba(255,255,255,0.85)', marginBottom:36, lineHeight:1.7, maxWidth:680, margin:'0 auto 36px' }}>
            30-minute call with a Solution Architect. We'll discuss your priority business outcomes, existing Microsoft estate, and what's possible in the next 90 days. Written fixed-price proposal within a week. No commitment required.
          </p>

          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <Btn onClick={openConsult} style={{ background:'#fff', color:'#003FB3' }}>
              Book Solution Architect Call <Ic n="Arrow" s={14} style={{ color:'#003FB3' }}/>
            </Btn>
            <Btn variant="ghost" onClick={() => navigate('/industries')} style={{ borderColor:'rgba(255,255,255,0.4)', color:'#fff' }}>
              Browse Industries Instead
            </Btn>
          </div>
        </div>
      </section>

    </div>
  )
}
