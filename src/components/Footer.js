import { Ic } from './ui'
import { SOLUTIONS, SERVICES } from '../data/content'
import logoFull from '../assets/DS_Logo_and_Text.png'

export default function Footer({ navigate, openConsult }) {
  const go = (path) => { navigate(path); window.scrollTo({ top:0, behavior:'instant' }) }

  return (
    <footer style={{ background:'linear-gradient(180deg, #0c4a6e 0%, #082f49 100%)', color:'#fff' }}>
      {/* CTA Banner */}
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'64px 24px 56px' }}>
        <div className="foot-cta-card" style={{ borderRadius:28, background:'linear-gradient(135deg,#0c4a6e 0%,#155e75 50%,#06b6d4 100%)', padding:'52px 48px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:28, position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-40, right:-40, width:220, height:220, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,.4), transparent 70%)', filter:'blur(20px)', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', bottom:-30, left:120, width:160, height:160, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,.12), transparent 70%)', filter:'blur(20px)', pointerEvents:'none' }}/>
          <div style={{ position:'relative', zIndex:1, minWidth:0, flex:'1 1 280px' }}>
            <div style={{ fontSize:28, fontWeight:800, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, lineHeight:1.2 }}>Ready to transform your business?</div>
            <div style={{ fontSize:15, opacity:.82, lineHeight:1.65, maxWidth:480 }}>Join 350+ businesses who chose DevinStratus for their Dynamics 365 journey.</div>
          </div>
          <div className="foot-cta-buttons" style={{ display:'flex', gap:12, position:'relative', zIndex:1, flexWrap:'wrap' }}>
            <button onClick={openConsult} style={{ padding:'14px 28px', borderRadius:50, background:'#fff', color:'#0c4a6e', border:'none', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", transition:'all .2s', whiteSpace:'nowrap' }}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
              onMouseLeave={e=>e.currentTarget.style.transform='none'}>
              Free Consultation →
            </button>
            <button onClick={()=>go('/contact')} style={{ padding:'14px 28px', borderRadius:50, background:'rgba(255,255,255,.12)', color:'#fff', border:'1.5px solid rgba(255,255,255,.3)', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", backdropFilter:'blur(8px)', transition:'all .2s', whiteSpace:'nowrap' }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,.2)'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,.12)'}>
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px 52px', borderTop:'1px solid rgba(255,255,255,.07)' }}>
        <div className="foot-g" style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:40, paddingTop:52 }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: 20 }}>
              {/* Main logo with diagonal white→dark gradient applied through CSS mask */}
              <div style={{
                width: 220,
                height: 46,
                background: 'linear-gradient(135deg, #ffffff 0%, #67e8f9 35%, #06b6d4 70%, #082f49 100%)',
                WebkitMaskImage: `url(${logoFull})`,
                maskImage: `url(${logoFull})`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'left center',
                maskPosition: 'left center',
              }} />
              <div style={{ fontSize: 8.5, letterSpacing: '.16em', color: '#94a3b8', fontWeight: 700, marginTop: 6 }}>TECHNOLOGIES</div>
            </div>
            <p style={{ fontSize:13.5, color:'#64748b', lineHeight:1.8, marginBottom:24, maxWidth:280 }}>
              Microsoft Dynamics 365 specialists — implementation, migration, support and training for ambitious businesses worldwide.
            </p>
            <div style={{ display:'flex', gap:8, marginBottom:28 }}>
              {['Linkedin','Twitter','Youtube'].map(n => (
                <button key={n} className="soc-btn" style={{ width:36, height:36, borderRadius:9, background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .18s' }}
                  onMouseEnter={e=>{ e.currentTarget.style.background='rgba(6,182,212,.3)'; e.currentTarget.style.borderColor='rgba(6,182,212,.5)' }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,.06)'; e.currentTarget.style.borderColor='rgba(255,255,255,.1)' }}>
                  <Ic n={n} s={15} style={{ color:'#64748b' }}/>
                </button>
              ))}
            </div>
            {/* Trust badges */}
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {['ISO 27001','GDPR Compliant','MS Gold Partner'].map(b => (
                <div key={b} style={{ padding:'4px 10px', borderRadius:6, background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)', fontSize:10.5, color:'#64748b', fontWeight:600 }}>{b}</div>
              ))}
            </div>
          </div>

          {/* Solutions — ERP filtered out */}
          <div>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:'#334155', marginBottom:18 }}>SOLUTIONS</div>
            {SOLUTIONS.filter(s => s.slug !== 'erp').map(s => ( // ERP hidden — remove .filter() to re-enable
              <button key={s.slug} className="foot-link" onClick={() => go(`/solutions/${s.slug}`)}
                style={{ display:'block', width:'100%', textAlign:'left', padding:'6px 0', background:'none', border:'none', cursor:'pointer', fontSize:13.5, color:'#64748b', fontFamily:'Inter,sans-serif', transition:'color .16s' }}
                onMouseEnter={e=>e.currentTarget.style.color='#67e8f9'}
                onMouseLeave={e=>e.currentTarget.style.color='#64748b'}>
                {s.heading}
              </button>
            ))}
          </div>

          {/* Services */}
          <div>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:'#334155', marginBottom:18 }}>SERVICES</div>
            {SERVICES.map(s => (
              <button key={s.slug} className="foot-link" onClick={() => go(`/service/${s.slug}`)}
                style={{ display:'block', width:'100%', textAlign:'left', padding:'6px 0', background:'none', border:'none', cursor:'pointer', fontSize:13.5, color:'#64748b', fontFamily:'Inter,sans-serif', transition:'color .16s' }}
                onMouseEnter={e=>e.currentTarget.style.color='#67e8f9'}
                onMouseLeave={e=>e.currentTarget.style.color='#64748b'}>
                {s.t}
              </button>
            ))}
          </div>

          {/* Company + Offices */}
          <div>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:'#334155', marginBottom:18 }}>COMPANY</div>
            {[['About Us','/company/about'],['Our Team','/company/team'],['Careers','/company/careers'],['Blog','/resources/blog'],['Contact','/contact']].map(([l,p]) => (
              <button key={l} className="foot-link" onClick={() => go(p)}
                style={{ display:'block', width:'100%', textAlign:'left', padding:'6px 0', background:'none', border:'none', cursor:'pointer', fontSize:13.5, color:'#64748b', fontFamily:'Inter,sans-serif', transition:'color .16s' }}
                onMouseEnter={e=>e.currentTarget.style.color='#67e8f9'}
                onMouseLeave={e=>e.currentTarget.style.color='#64748b'}>
                {l}
              </button>
            ))}
            <div style={{ marginTop:24 }}>
              <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:'#334155', marginBottom:12 }}>GLOBAL OFFICES</div>
              {[['🇬🇧','London'],['🇺🇸','New York'],['🇮🇳','New Delhi'],['🇨🇦','Toronto']].map(([f,c]) => (
                <div key={c} style={{ fontSize:13, color:'#64748b', marginBottom:7, display:'flex', alignItems:'center', gap:7 }}>
                  <span>{f}</span><span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop:'1px solid rgba(255,255,255,.05)', padding:'18px 24px', maxWidth:1280, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
        <div style={{ fontSize:12.5, color:'#334155' }}>© 2025 DevinStratus Technologies Ltd. All rights reserved.</div>
        <div style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
          {['Privacy Policy','Terms of Service','Cookie Policy'].map(l => (
            <button key={l} style={{ background:'none', border:'none', cursor:'pointer', fontSize:12.5, color:'#334155', fontFamily:'Inter,sans-serif', transition:'color .15s' }}
              onMouseEnter={e=>e.currentTarget.style.color='#67e8f9'}
              onMouseLeave={e=>e.currentTarget.style.color='#334155'}>
              {l}
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}