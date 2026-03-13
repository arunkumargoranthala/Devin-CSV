import { C, Ic, LogoSvg } from './ui'
import { SOLUTIONS, SERVICES } from '../data/content'

export default function Footer({ navigate, openConsult }) {
  const go = (path) => {
    navigate(path)
    window.scrollTo({ top:0, behavior:'instant' })
  }

  return (
    <footer style={{ background:'#0a0f1e', color:'#fff', paddingTop:64 }}>
      {/* CTA Banner */}
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px 64px' }}>
        <div style={{ borderRadius:24, background:`linear-gradient(135deg,${C.blue},${C.purple})`, padding:'48px 40px', display:'grid', gridTemplateColumns:'1fr auto', gap:32, alignItems:'center' }}>
          <div>
            <div style={{ fontSize:28, fontWeight:800, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:10 }}>Ready to transform your business?</div>
            <div style={{ fontSize:15, opacity:0.85, lineHeight:1.6 }}>Join 350+ businesses who chose DevinStratus for their Dynamics 365 journey.</div>
          </div>
          <div style={{ display:'flex', gap:12, flexShrink:0 }}>
            <button onClick={openConsult} style={{ padding:'13px 26px', borderRadius:50, background:'#fff', color:C.blue, border:'none', fontSize:14, fontWeight:700, cursor:'pointer' }}>
              Free Consultation
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px 48px' }}>
        <div className="foot-g" style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:40 }}>
          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
              <LogoSvg size={38} id="foot-logo" />
              <div>
                <div style={{ fontSize:16, fontWeight:800, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                  <span style={{ background:`linear-gradient(135deg,${C.blueM},#a78bfa)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Devin</span>
                  <span>Stratus</span>
                </div>
                <div style={{ fontSize:8.5, letterSpacing:'.16em', color:'#64748b', fontWeight:700 }}>TECHNOLOGIES</div>
              </div>
            </div>
            <p style={{ fontSize:13.5, color:'#94a3b8', lineHeight:1.75, marginBottom:20, maxWidth:280 }}>
              Microsoft Dynamics 365 specialists — implementation, migration, support and training for ambitious businesses.
            </p>
            <div style={{ display:'flex', gap:8 }}>
              {['Linkedin','Twitter','Youtube'].map(n => (
                <button key={n} className="soc-btn"><Ic n={n} s={15} style={{ color:'#94a3b8' }}/></button>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:'#64748b', marginBottom:16 }}>SOLUTIONS</div>
            {SOLUTIONS.map(s => (
              <button key={s.slug} className="foot-link" onClick={() => go(`/solutions/${s.slug}`)}>{s.heading}</button>
            ))}
          </div>

          {/* Services */}
          <div>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:'#64748b', marginBottom:16 }}>SERVICES</div>
            {SERVICES.map(s => (
              <button key={s.slug} className="foot-link" onClick={() => go(`/service/${s.slug}`)}>{s.t}</button>
            ))}
          </div>

          {/* Company */}
          <div>
            <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:'#64748b', marginBottom:16 }}>COMPANY</div>
            {['About Us','Careers','Blog','Contact'].map(l => (
              <button key={l} className="foot-link" onClick={() => {}}>{l}</button>
            ))}
            <div style={{ marginTop:20 }}>
              <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:'#64748b', marginBottom:12 }}>OFFICES</div>
              {[{flag:'🇬🇧',city:'London'},{flag:'🇺🇸',city:'New York'},{flag:'🇮🇳',city:'New Delhi'},{flag:'🇨🇦',city:'Toronto'}].map(o => (
                <div key={o.city} style={{ fontSize:12.5, color:'#94a3b8', marginBottom:6 }}>{o.flag} {o.city}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop:'1px solid rgba(255,255,255,.07)', padding:'20px 24px', maxWidth:1280, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ fontSize:12.5, color:'#475569' }}>© 2025 DevinStratus Technologies. All rights reserved.</div>
        <div style={{ display:'flex', gap:20 }}>
          {['Privacy Policy','Terms of Service','Cookie Policy'].map(l => (
            <button key={l} style={{ background:'none', border:'none', cursor:'pointer', fontSize:12.5, color:'#475569', fontFamily:'Inter,sans-serif' }}>{l}</button>
          ))}
        </div>
      </div>
    </footer>
  )
}
