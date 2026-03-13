import { useEffect } from 'react'
import { C, Ic, Btn } from '../components/ui'
import { SERVICES } from '../data/content'

function useReveal() {
  useEffect(() => {
    const t = setTimeout(() => {
      document.querySelectorAll('.rv').forEach(el => {
        const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('show'); ob.disconnect() } }, { threshold:.1 })
        ob.observe(el)
      })
    }, 60)
    return () => clearTimeout(t)
  })
}

export default function ServicesListPage({ navigate, openConsult }) {
  useReveal()
  useEffect(() => { window.scrollTo(0,0) }, [])

  return (
    <div className="page-fade">
      {/* Dark hero */}
      <section style={{ background:'linear-gradient(135deg,#060d24 0%,#0d1a40 50%,#140828 100%)', paddingTop:68, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, right:-60, width:400, height:400, borderRadius:'50%', background:`${C.blue}18`, animation:'heroFloat 9s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, left:60, width:220, height:220, borderRadius:'50%', background:`${C.purple}12`, animation:'heroFloat 6s ease-in-out infinite reverse', pointerEvents:'none' }} />

        <div style={{ maxWidth:1280, margin:'0 auto', padding:'64px 24px 72px', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-flex', background:'rgba(0,87,184,.2)', border:'1px solid rgba(0,87,184,.4)', borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:700, color:'#60a5fa', marginBottom:22, letterSpacing:'.05em' }}>
            WHAT WE DO
          </div>
          <h1 style={{ fontSize:'clamp(32px,5vw,54px)', fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:18, fontFamily:"'Plus Jakarta Sans',sans-serif", maxWidth:720 }}>
            Dynamics 365 services for<br/>every stage of your journey
          </h1>
          <p style={{ fontSize:17, color:'rgba(255,255,255,.7)', lineHeight:1.8, maxWidth:600, marginBottom:40 }}>
            From first implementation through to ongoing managed support — DevinStratus delivers every service you need to maximise your Microsoft Dynamics 365 investment.
          </p>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <Btn onClick={openConsult}>Book a Free Consultation <Ic n="Arrow" s={14} style={{ color:'#fff' }}/></Btn>
            <Btn variant="ghost" onClick={() => navigate('/contact')}>Talk to a specialist</Btn>
          </div>

          {/* Stats strip */}
          <div style={{ display:'flex', gap:32, marginTop:48, paddingTop:40, borderTop:'1px solid rgba(255,255,255,.1)', flexWrap:'wrap' }}>
            {[['8','Specialist services'],['500+','Projects delivered'],['150+','Certified consultants'],['99.9%','SLA uptime guarantee']].map(([v,l]) => (
              <div key={l}>
                <div style={{ fontSize:28, fontWeight:900, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{v}</div>
                <div style={{ fontSize:12, color:'rgba(255,255,255,.5)', marginTop:3 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section style={{ padding:'80px 24px', background:'#fff' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div className="rv" style={{ marginBottom:44 }}>
            <div style={{ width:4, height:36, borderRadius:4, background:`linear-gradient(180deg,${C.blue},${C.purple})`, marginBottom:12 }} />
            <h2 style={{ fontSize:32, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>All 8 Services</h2>
            <p style={{ color:C.textM, fontSize:15 }}>Click any service to see full scope, pricing approach, and what to expect.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:24 }}>
            {SERVICES.map((s,i) => (
              <button key={s.slug} className="rv"
                onClick={() => navigate(`/service/${s.slug}`)}
                style={{ display:'flex', flexDirection:'column', padding:0, borderRadius:22, border:`1.5px solid ${C.border}`, background:'#fff', cursor:'pointer', textAlign:'left', transition:'all .28s', overflow:'hidden', animationDelay:`${i*50}ms` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=s.color+'55'; e.currentTarget.style.boxShadow=`0 16px 48px ${s.color}12`; e.currentTarget.style.transform='translateY(-5px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
                <div style={{ padding:'28px 28px 22px', background:`linear-gradient(135deg,${s.color}12,${s.color}05)`, borderBottom:`1px solid ${s.color}18`, position:'relative' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${s.color},${s.color}55)` }} />
                  <div style={{ width:52, height:52, borderRadius:14, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16, boxShadow:`0 4px 14px ${s.color}20` }}>
                    <Ic n={s.n} s={24} style={{ color:s.color }}/>
                  </div>
                  <h3 style={{ fontSize:19, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>{s.t}</h3>
                  <p style={{ fontSize:13, color:s.color, fontWeight:700 }}>{s.tagline}</p>
                </div>
                <div style={{ padding:'18px 28px', flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                  <p style={{ fontSize:13.5, color:C.textM, lineHeight:1.6, marginBottom:16 }}>{s.overview.slice(0,110)}…</p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div style={{ display:'flex', gap:16 }}>
                      {s.stats.slice(0,2).map((st,i) => (
                        <div key={i}>
                          <div style={{ fontSize:17, fontWeight:800, color:s.color, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{st.v}</div>
                          <div style={{ fontSize:10.5, color:C.textL }}>{st.l}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:13, fontWeight:700, color:s.color }}>
                      Details <Ic n="Arrow" s={13} style={{ color:s.color }}/>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding:'80px 24px', background:`linear-gradient(135deg,${C.blue},${C.purple})` }}>
        <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontSize:36, fontWeight:800, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14 }}>Not sure which service you need?</h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,.85)', marginBottom:36, lineHeight:1.7 }}>Our free consultation will map your current situation to the right service mix — in 30 minutes or less.</p>
          <Btn onClick={openConsult} style={{ background:'#fff', color:C.blue }}>Book Free 30-Min Consultation <Ic n="Arrow" s={14} style={{ color:C.blue }}/></Btn>
        </div>
      </section>
    </div>
  )
}
