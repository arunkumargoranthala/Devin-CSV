import { Ic } from './ui'
import { SOLUTIONS } from '../data/content'
import { RESOURCES } from '../data/resources'
import logoFull from '../assets/DS_Logo_and_Text.png'

/* ─────────────────────────────────────────────────────────────────────────────
 * Footer — LIGHT THEME matching Global Offices / Contact hero recipe.
 * Background uses the exact same multi-gradient as the Company hero so the
 * page-to-footer transition is seamless. Text colors are dark slate. Section
 * headers use brand navy (#003FB3). Hover states snap to brand blue/cyan.
 * The CTA banner keeps a dark cyan gradient as the focal anchor.
 * ───────────────────────────────────────────────────────────────────────── */
export default function Footer({ navigate, openConsult }) {
  const go = (path) => { navigate(path); window.scrollTo({ top:0, behavior:'instant' }) }

  return (
    <footer style={{
      position: 'relative',
      overflow: 'hidden',
      background: `
        radial-gradient(circle at 100% 0%, rgba(6,182,212,0.28), transparent 55%),
        radial-gradient(circle at 0% 60%, rgba(0,102,255,0.16), transparent 60%),
        linear-gradient(180deg, #ffffff 0%, #f0f7ff 25%, #d6ebff 55%, #b8defa 85%, #9bd3f5 100%)
      `,
      color: '#0a0a14',
      borderTop: '1px solid rgba(0,102,255,0.10)',
    }}>
      {/* Soft floating decorative orbs */}
      <div style={{ position:'absolute', top:'5%', right:'-3%', width:340, height:340, borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.22), transparent 70%)', filter:'blur(50px)', animation:'heroFloat 9s ease-in-out infinite', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:'-10%', left:'10%', width:260, height:260, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,102,255,0.14), transparent 70%)', filter:'blur(40px)', animation:'heroFloat 12s ease-in-out infinite reverse', pointerEvents:'none' }}/>

      {/* CTA Banner — brand-blue gradient anchors the light footer */}
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'64px 24px 56px', position:'relative', zIndex:1 }}>
        <div className="foot-cta-card" style={{ borderRadius:28, background:'linear-gradient(135deg, #003FB3 0%, #0066FF 60%, #06b6d4 100%)', padding:'52px 48px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:28, position:'relative', overflow:'hidden', boxShadow:'0 24px 64px -16px rgba(0, 53, 128, 0.35)' }}>
          <div style={{ position:'absolute', top:-40, right:-40, width:220, height:220, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,.4), transparent 70%)', filter:'blur(20px)', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', bottom:-30, left:120, width:160, height:160, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,.12), transparent 70%)', filter:'blur(20px)', pointerEvents:'none' }}/>
          <div style={{ position:'relative', zIndex:1, minWidth:0, flex:'1 1 280px', color:'#fff' }}>
            <div style={{ fontSize:28, fontWeight:800, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, lineHeight:1.2 }}>Ready to transform your business?</div>
            <div style={{ fontSize:15, opacity:.85, lineHeight:1.65, maxWidth:480 }}>Engineering enterprise AI orchestration on Microsoft — from Canada and India.</div>
          </div>
          <div className="foot-cta-buttons" style={{ display:'flex', gap:12, position:'relative', zIndex:1, flexWrap:'wrap' }}>
            <button onClick={openConsult} style={{ padding:'14px 28px', borderRadius:50, background:'#fff', color:'#003FB3', border:'none', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", transition:'all .2s', whiteSpace:'nowrap', boxShadow:'0 8px 20px rgba(0,0,0,0.15)' }}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
              onMouseLeave={e=>e.currentTarget.style.transform='none'}>
              Free Consultation →
            </button>
            <button onClick={()=>go('/contact')} style={{ padding:'14px 28px', borderRadius:50, background:'rgba(255,255,255,.12)', color:'#fff', border:'1.5px solid rgba(255,255,255,.3)', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", backdropFilter:'blur(8px)', transition:'all .2s', whiteSpace:'nowrap' }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,.22)'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,.12)'}>
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Main footer columns — LIGHT bg, dark text */}
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px 52px', borderTop:'1px solid rgba(0,102,255,0.10)', position:'relative', zIndex:1 }}>
        <div className="foot-g" style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:40, paddingTop:52 }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: 20 }}>
              {/* Logo with cyan gradient mask — palette adjusted for light bg readability */}
              <div style={{
                width: 220,
                height: 46,
                background: 'linear-gradient(135deg, #003FB3 0%, #0066FF 45%, #06b6d4 100%)',
                WebkitMaskImage: `url(${logoFull})`,
                maskImage: `url(${logoFull})`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'left center',
                maskPosition: 'left center',
              }} />
              <div style={{ fontSize: 8.5, letterSpacing: '.16em', color: '#475569', fontWeight: 700, marginTop: 6 }}>TECHNOLOGIES</div>
            </div>
            <p style={{ fontSize:13.5, color:'#475569', lineHeight:1.8, marginBottom:24, maxWidth:280 }}>
              Microsoft Dynamics 365 specialists — implementation, migration, support and training for ambitious businesses worldwide.
            </p>
            <div style={{ display:'flex', gap:8, marginBottom:28 }}>
              {['Linkedin','Twitter','Youtube'].map(n => (
                <button key={n} className="soc-btn" style={{ width:36, height:36, borderRadius:9, background:'rgba(255,255,255,.7)', border:'1px solid rgba(0,102,255,0.18)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .18s', backdropFilter:'blur(6px)' }}
                  onMouseEnter={e=>{ e.currentTarget.style.background='rgba(6,182,212,.18)'; e.currentTarget.style.borderColor='rgba(6,182,212,.5)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,.7)'; e.currentTarget.style.borderColor='rgba(0,102,255,0.18)' }}>
                  <Ic n={n} s={15} style={{ color:'#003FB3' }}/>
                </button>
              ))}
            </div>
            {/* Trust badges */}
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {['GDPR Compliant','Microsoft Partner','Azure AI'].map(b => (
                <div key={b} style={{ padding:'4px 10px', borderRadius:6, background:'rgba(255,255,255,.6)', border:'1px solid rgba(0,102,255,0.15)', fontSize:10.5, color:'#475569', fontWeight:600, backdropFilter:'blur(4px)' }}>{b}</div>
              ))}
            </div>
          </div>

          {/* Solutions — ERP filtered out */}
          <div>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:'#003FB3', marginBottom:18 }}>SOLUTIONS</div>
            {SOLUTIONS.filter(s => s.slug !== 'erp').map(s => (
              <button key={s.slug} className="foot-link" onClick={() => go(`/solutions/${s.slug}`)}
                style={{ display:'block', width:'100%', textAlign:'left', padding:'6px 0', background:'none', border:'none', cursor:'pointer', fontSize:13.5, color:'#475569', fontFamily:'Inter,sans-serif', transition:'color .16s' }}
                onMouseEnter={e=>e.currentTarget.style.color='#0066FF'}
                onMouseLeave={e=>e.currentTarget.style.color='#475569'}>
                {s.heading}
              </button>
            ))}
          </div>

          {/* Resources */}
          <div>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:'#003FB3', marginBottom:18 }}>RESOURCES</div>
            {RESOURCES.map(r => (
              <button key={r.slug} className="foot-link" onClick={() => go(`/resources/${r.slug}`)}
                style={{ display:'block', width:'100%', textAlign:'left', padding:'6px 0', background:'none', border:'none', cursor:'pointer', fontSize:13.5, color:'#475569', fontFamily:'Inter,sans-serif', transition:'color .16s' }}
                onMouseEnter={e=>e.currentTarget.style.color='#0066FF'}
                onMouseLeave={e=>e.currentTarget.style.color='#475569'}>
                {r.heading}
              </button>
            ))}
          </div>

          {/* Company + Offices */}
          <div>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:'#003FB3', marginBottom:18 }}>COMPANY</div>
            {[['About Us','/company/about'],['Our Team','/company/team'],['Careers','/company/careers'],['Blog','/resources/blog'],['Contact','/contact']].map(([l,p]) => (
              <button key={l} className="foot-link" onClick={() => go(p)}
                style={{ display:'block', width:'100%', textAlign:'left', padding:'6px 0', background:'none', border:'none', cursor:'pointer', fontSize:13.5, color:'#475569', fontFamily:'Inter,sans-serif', transition:'color .16s' }}
                onMouseEnter={e=>e.currentTarget.style.color='#0066FF'}
                onMouseLeave={e=>e.currentTarget.style.color='#475569'}>
                {l}
              </button>
            ))}
            <div style={{ marginTop:24 }}>
              <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:'#003FB3', marginBottom:12 }}>GLOBAL OFFICES</div>
              {[['🇨🇦','Barrie, Canada'],['🇮🇳','Hyderabad, India']].map(([f,c]) => (
                <div key={c} style={{ fontSize:13, color:'#475569', marginBottom:7, display:'flex', alignItems:'center', gap:7 }}>
                  <span>{f}</span><span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop:'1px solid rgba(0,102,255,0.10)', padding:'18px 24px', maxWidth:1280, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12, position:'relative', zIndex:1 }}>
        <div style={{ fontSize:12.5, color:'#64748b' }}>© 2026 DevinStratus Technologies Inc. All rights reserved.</div>
        <div style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
          {['Privacy Policy','Terms of Service','Cookie Policy'].map(l => (
            <button key={l} style={{ background:'none', border:'none', cursor:'pointer', fontSize:12.5, color:'#64748b', fontFamily:'Inter,sans-serif', transition:'color .15s' }}
              onMouseEnter={e=>e.currentTarget.style.color='#0066FF'}
              onMouseLeave={e=>e.currentTarget.style.color='#64748b'}>
              {l}
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}