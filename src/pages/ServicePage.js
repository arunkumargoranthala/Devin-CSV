import { useState, useEffect } from 'react'
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

export default function ServicePage({ serviceSlug, navigate, openConsult }) {
  const [openFaq, setOpenFaq] = useState(null)
  useReveal()
  useEffect(() => { window.scrollTo(0,0) }, [serviceSlug])

  const service = SERVICES.find(s => s.slug === serviceSlug)
  if (!service) return (
    <div style={{ paddingTop:120, textAlign:'center', minHeight:'60vh' }}>
      <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", color:C.text }}>Service not found</h2>
      <button onClick={() => navigate('/')} style={{ marginTop:20, color:C.blue, background:'none', border:'none', cursor:'pointer', fontSize:15 }}>← Back to home</button>
    </div>
  )

  return (
    <div className="page-fade">
      {/* ── DARK HERO ── */}
      <section style={{ background:'linear-gradient(135deg,#060d24 0%,#0d1a40 50%,#140828 100%)', paddingTop:68, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, right:-60, width:380, height:380, borderRadius:'50%', background:service.color+'1a', animation:'heroFloat 9s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, left:-40, width:200, height:200, borderRadius:'50%', background:`${C.purple}14`, animation:'heroFloat 6s ease-in-out infinite reverse', pointerEvents:'none' }} />

        <div style={{ maxWidth:1280, margin:'0 auto', padding:'56px 24px 0', position:'relative', zIndex:1 }}>
          {/* Breadcrumb */}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:28 }}>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'rgba(255,255,255,.45)' }}>Home</button>
            <Ic n="ChevR" s={12} style={{ color:'rgba(255,255,255,.25)' }}/>
            <button onClick={() => navigate('/services')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'rgba(255,255,255,.45)' }}>Services</button>
            <Ic n="ChevR" s={12} style={{ color:'rgba(255,255,255,.25)' }}/>
            <span style={{ fontSize:13, color:'rgba(255,255,255,.85)', fontWeight:600 }}>{service.t}</span>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 420px', gap:56, alignItems:'center', paddingBottom:64 }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:service.color+'22', border:`1px solid ${service.color}44`, borderRadius:50, padding:'6px 14px', fontSize:12, fontWeight:700, color:service.color, marginBottom:20 }}>
                <Ic n={service.n} s={13} style={{ color:service.color }}/>
                Service
              </div>
              <h1 style={{ fontSize:'clamp(30px,5vw,50px)', fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:14, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                {service.t}
              </h1>
              <p style={{ fontSize:19, fontWeight:700, color:service.color, marginBottom:14, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                {service.tagline}
              </p>
              <p style={{ fontSize:16, color:'rgba(255,255,255,.7)', lineHeight:1.8, marginBottom:36, maxWidth:560 }}>
                {service.overview}
              </p>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <Btn onClick={openConsult}>Get Started <Ic n="Arrow" s={14} style={{ color:'#fff' }}/></Btn>
                <Btn variant="ghost" onClick={() => navigate('/services')}>All Services</Btn>
              </div>
            </div>

            {/* Stats + testimonial */}
            <div style={{ background:'rgba(255,255,255,.06)', border:'1.5px solid rgba(255,255,255,.12)', borderRadius:24, padding:28, backdropFilter:'blur(12px)' }}>
              <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.14em', color:'rgba(255,255,255,.4)', marginBottom:18 }}>BY THE NUMBERS</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:18 }}>
                {(service.stats || []).map((s,i) => (
                  <div key={i} style={{ background: i===0 ? service.color+'22' : 'rgba(255,255,255,.05)', borderRadius:14, padding:'16px 14px', border:`1px solid ${i===0?service.color+'44':'rgba(255,255,255,.08)'}` }}>
                    <div style={{ fontSize:24, fontWeight:900, color:i===0?service.color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1 }}>{s.v}</div>
                    <div style={{ fontSize:11.5, color:'rgba(255,255,255,.5)', marginTop:5 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              {service.testimonial && (
                <div style={{ background:'rgba(255,255,255,.05)', borderRadius:14, padding:16 }}>
                  <div style={{ fontSize:13, color:'rgba(255,255,255,.7)', lineHeight:1.6, marginBottom:10, fontStyle:'italic' }}>
                    "{service.testimonial.q}"
                  </div>
                  <div style={{ fontSize:12, fontWeight:700, color:'#fff' }}>{service.testimonial.name}</div>
                  <div style={{ fontSize:11, color:'rgba(255,255,255,.45)' }}>{service.testimonial.role}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bullets/process */}
      <section style={{ padding:'80px 24px', background:'#fff' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64 }}>
          <div className="rv">
            <div style={{ width:4, height:36, borderRadius:4, background:`linear-gradient(180deg,${service.color},${service.color}44)`, marginBottom:14 }} />
            <h2 style={{ fontSize:30, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>What's included</h2>
            <p style={{ color:C.textM, fontSize:14.5, lineHeight:1.7, marginBottom:24 }}>Every engagement covers these core activities.</p>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {(service.features || service.bullets || []).map((b,i) => (
                <div key={i} style={{ display:'flex', gap:14, alignItems:'flex-start', padding:'16px 18px', borderRadius:14, border:`1.5px solid ${C.border}`, background:'#fff', transition:'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=service.color+'44'; e.currentTarget.style.background=service.bg; e.currentTarget.style.transform='translateX(4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background='#fff'; e.currentTarget.style.transform='none' }}>
                  <div style={{ width:30, height:30, borderRadius:8, background:service.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Ic n="CheckCircle" s={15} style={{ color:service.color }}/>
                  </div>
                  <span style={{ fontSize:14, color:C.text, lineHeight:1.6 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rv">
            <div style={{ width:4, height:36, borderRadius:4, background:`linear-gradient(180deg,${C.blue},${C.purple})`, marginBottom:14 }} />
            <h2 style={{ fontSize:30, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Our process</h2>
            <p style={{ color:C.textM, fontSize:14.5, lineHeight:1.7, marginBottom:24 }}>A clear, structured approach — no surprises.</p>
            <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
              {['Discovery & scoping','Solution design','Build & configure','Test & validate','Go-live & handover','Ongoing optimisation'].map((step,i) => (
                <div key={i} className="process-step">
                  <div style={{ width:36, height:36, borderRadius:'50%', background:`linear-gradient(135deg,${service.color},${service.color}88)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span style={{ fontSize:13, fontWeight:800, color:'#fff' }}>{i+1}</span>
                  </div>
                  <div>
                    <div style={{ fontSize:15, fontWeight:700, color:C.text }}>{step}</div>
                    <div style={{ fontSize:13, color:C.textM, marginTop:3 }}>Documented deliverables at every stage</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {service.faq && (
        <section style={{ padding:'80px 24px', background:C.bgSoft }}>
          <div style={{ maxWidth:800, margin:'0 auto' }}>
            <div className="rv" style={{ textAlign:'center', marginBottom:40 }}>
              <h2 style={{ fontSize:34, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Common questions</h2>
              <p style={{ color:C.textM, fontSize:15 }}>About {service.t}</p>
            </div>
            {service.faq.map((f,i) => (
              <div key={i} className={`acc-item ${openFaq===i?'open':''}`}>
                <button className="acc-trigger" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                  {f.q}
                  <Ic n={openFaq===i?'ChevU':'ChevD'} s={18} style={{ color:C.textL, flexShrink:0 }}/>
                </button>
                {openFaq===i && <div className="acc-body">{f.a}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding:'80px 24px', background:`linear-gradient(135deg,${C.blue},${C.purple})` }}>
        <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center' }}>
          <h2 style={{ fontSize:36, fontWeight:800, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14 }}>Ready to get started?</h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,.85)', marginBottom:36, lineHeight:1.7 }}>Let's scope your project together — free, no obligation.</p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <Btn onClick={openConsult} style={{ background:'#fff', color:C.blue }}>Book Free Consultation <Ic n="Arrow" s={14} style={{ color:C.blue }}/></Btn>
            <Btn variant="ghost" onClick={() => navigate('/services')}>All Services</Btn>
          </div>
        </div>
      </section>
    </div>
  )
}
