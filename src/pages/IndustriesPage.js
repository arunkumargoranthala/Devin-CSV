import { useState, useEffect, useRef } from 'react'
import { C, Ic } from '../components/ui'

const INDUSTRIES = [
  {
    slug:'manufacturing', icon:'Truck', label:'Manufacturing', color:C.blue, bg:C.blueL,
    tagline:'Smart factory operations from procurement to delivery',
    stat1:'68%', stat1l:'Fewer stock-outs', stat2:'40%', stat2l:'Procurement savings', stat3:'2x', stat3l:'Warehouse throughput',
    challenges:['Disconnected shop floor & finance systems','Manual production scheduling causing delays','Poor supplier visibility & late deliveries','Inventory imbalances — overstocked & out-of-stock simultaneously','Compliance with ISO, quality & traceability standards'],
    solutions:['D365 Supply Chain Management with IoT-enabled tracking','D365 Finance for real-time plant P&L','AI-driven demand forecasting & replenishment','Supplier collaboration portal','Power BI production dashboards'],
    quote:{text:'Production planning that used to take 2 days now runs overnight automatically.',name:'Operations Director, Midlands Engineering',},
  },
  {
    slug:'retail', icon:'Cart', label:'Retail & Commerce', color:C.orange, bg:C.orangeL,
    tagline:'Unified commerce across every channel your customers use',
    stat1:'25%', stat1l:'Higher order value', stat2:'40%', stat2l:'Faster inventory turn', stat3:'360°', stat3l:'Customer view',
    challenges:['Split inventory between online & in-store','No single view of the customer across channels','Manual loyalty & promotions management','Returns processing causing margin leakage','Seasonal demand forecasting accuracy'],
    solutions:['D365 Commerce — unified POS & eCommerce','D365 Customer Insights for unified customer profiles','AI-powered product recommendations','Automated promotions engine','Power BI retail analytics'],
    quote:{text:'We went from 12 disconnected systems to one. Our stock accuracy is now 99.7%.',name:'CTO, NovaTel Retail',},
  },
  {
    slug:'financial', icon:'Shield', label:'Financial Services', color:C.purple, bg:C.purpleL,
    tagline:'Compliance-first finance operations with full auditability',
    stat1:'100%', stat1l:'Audit trail coverage', stat2:'80%', stat2l:'Less manual entry', stat3:'60+', stat3l:'Countries supported',
    challenges:['GDPR, FCA, SOX compliance complexity','Manual reconciliation across multiple entities','Client onboarding taking weeks not hours','Real-time risk exposure visibility','Multi-currency consolidation errors'],
    solutions:['D365 Finance with multi-entity consolidation','Automated regulatory reporting','Client onboarding workflows','Real-time risk dashboards in Power BI','Azure Security Center integration'],
    quote:{text:'Our month-end close went from 12 working days to 3. Audit prep is now painless.',name:'CFO, Meridian Capital Group',},
  },
  {
    slug:'professional', icon:'Brief', label:'Professional Services', color:C.teal, bg:C.tealL,
    tagline:'Project delivery and billing precision for service firms',
    stat1:'35%', stat1l:'Better utilisation', stat2:'50%', stat2l:'Faster invoicing', stat3:'Zero', stat3l:'Revenue leakage',
    challenges:['Resource over/underutilisation hurting margins','Time & expense tracking still done in spreadsheets','Billing delays of 30+ days after project close','No real-time project P&L visibility','Disconnected CRM and delivery systems'],
    solutions:['D365 Project Operations — CRM to billing unified','AI-assisted resource scheduling','Automated milestone-based invoicing','Real-time project health dashboards','Integration with Microsoft Teams & Outlook'],
    quote:{text:'Resource utilisation jumped from 68% to 84% in the first quarter after go-live.',name:'Managing Director, Crestwood Consulting',},
  },
  {
    slug:'healthcare', icon:'Users', label:'Healthcare', color:C.green, bg:C.greenL,
    tagline:'Patient-centric operations with full regulatory compliance',
    stat1:'60%', stat1l:'Less admin time', stat2:'100%', stat2l:'Audit ready', stat3:'2x', stat3l:'Faster onboarding',
    challenges:['Patient data privacy (HIPAA/NHS/GDPR)','Manual appointment & bed management','Medical supply chain fragility','Staff rostering & compliance gaps','Lengthy patient & staff onboarding'],
    solutions:['D365 Customer Service with patient journey automation','D365 Supply Chain for medical inventory','Power Apps patient & staff portals','Dataverse for Healthcare compliance framework','Azure security & data residency controls'],
    quote:{text:'Patient intake that took 45 minutes is now 8 minutes. Staff love it.',name:'Head of Digital, Greenfield Health Trust',},
  },
  {
    slug:'logistics', icon:'Globe', label:'Logistics & Transport', color:C.blue, bg:C.blueL,
    tagline:'Real-time visibility from depot to last-mile delivery',
    stat1:'Real-time', stat1l:'Fleet tracking', stat2:'32%', stat2l:'Fuel cost reduction', stat3:'99%', stat3l:'Delivery accuracy',
    challenges:['No real-time cargo & fleet location visibility','Manual route planning wasting fuel and time','Cross-border customs documentation delays','Driver compliance & regulatory reporting','Customer ETAs inaccurate, causing complaints'],
    solutions:['D365 Supply Chain with IoT fleet integration','Azure IoT Hub for real-time asset tracking','Power Automate for customs document workflows','Power BI logistics KPI dashboards','D365 Field Service for driver scheduling'],
    quote:{text:'We cut empty miles by 28% in 6 months. The ROI paid for the whole project.',name:'Fleet Director, PrimeLine Distribution',},
  },
]

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rv')
    const ob = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); ob.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => ob.observe(el))
    return () => ob.disconnect()
  })
}

function IndustryCard({ ind, navigate }) {
  return (
    <button
      onClick={() => navigate(`/industries/${ind.slug}`)}
      style={{ display:'flex', flexDirection:'column', padding:28, borderRadius:22, border:`1.5px solid ${C.border}`, background:'#fff', cursor:'pointer', textAlign:'left', transition:'all .28s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor=ind.color+'55'; e.currentTarget.style.boxShadow=`0 16px 48px ${ind.color}14`; e.currentTarget.style.transform='translateY(-5px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
      <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
        <div style={{ width:52, height:52, borderRadius:16, background:ind.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <Ic n={ind.icon} s={24} style={{ color:ind.color }} />
        </div>
        <div>
          <h3 style={{ fontSize:18, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:4 }}>{ind.label}</h3>
          <p style={{ fontSize:12.5, color:C.textM }}>{ind.tagline}</p>
        </div>
      </div>
      <div style={{ display:'flex', gap:10, marginBottom:16 }}>
        {[[ind.stat1, ind.stat1l],[ind.stat2, ind.stat2l],[ind.stat3, ind.stat3l]].map(([v,l]) => (
          <div key={l} style={{ flex:1, background:ind.bg, borderRadius:12, padding:'10px 8px', textAlign:'center' }}>
            <div style={{ fontSize:16, fontWeight:800, color:ind.color, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{v}</div>
            <div style={{ fontSize:10, color:C.textM, marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:13, fontWeight:700, color:ind.color, marginTop:'auto' }}>
        Explore solution <Ic n="Arrow" s={13} style={{ color:ind.color }} />
      </div>
    </button>
  )
}

function IndustryDetail({ ind, navigate, openConsult }) {
  useReveal()
  useEffect(() => { window.scrollTo(0,0) }, [ind.slug])

  return (
    <div className="page-fade" style={{ paddingTop:68 }}>
      {/* Hero */}
      <section style={{ background:`linear-gradient(135deg,#0a0f2e,#0d1940,#1a0838)`, padding:'80px 24px 64px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, right:-80, width:400, height:400, borderRadius:'50%', background:ind.color+'18', animation:'heroFloat 8s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, left:-60, width:200, height:200, borderRadius:'50%', background:ind.color+'10', animation:'heroFloat 6s ease-in-out infinite reverse', pointerEvents:'none' }} />
        <div style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:1 }}>
          <button onClick={() => navigate('/industries')} style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, fontWeight:600, color:'rgba(255,255,255,.6)', background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.15)', borderRadius:50, padding:'6px 14px', cursor:'pointer', marginBottom:28 }}>
            <Ic n="ChevD" s={13} style={{ transform:'rotate(90deg)', color:'rgba(255,255,255,.6)' }} /> All Industries
          </button>
          <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:20 }}>
            <div style={{ width:56, height:56, borderRadius:16, background:ind.bg, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 4px 20px ${ind.color}44` }}>
              <Ic n={ind.icon} s={26} style={{ color:ind.color }} />
            </div>
            <div style={{ fontSize:12, fontWeight:700, color:ind.color, letterSpacing:'.1em', textTransform:'uppercase', background:`${ind.color}18`, padding:'5px 14px', borderRadius:50 }}>Industry Solution</div>
          </div>
          <h1 style={{ fontSize:'clamp(32px,5vw,52px)', fontWeight:800, color:'#fff', marginBottom:20, lineHeight:1.15, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
            Dynamics 365 for<br/><span style={{ background:`linear-gradient(135deg,${ind.color},${ind.color}bb)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{ind.label}</span>
          </h1>
          <p style={{ fontSize:17, color:'rgba(255,255,255,.75)', maxWidth:580, lineHeight:1.8, marginBottom:36 }}>{ind.tagline} — pre-configured industry accelerator included, 40% faster go-live guaranteed.</p>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <button onClick={openConsult} style={{ display:'flex', alignItems:'center', gap:8, padding:'13px 26px', borderRadius:50, background:`linear-gradient(135deg,${C.blue},${C.purple})`, border:'none', color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
              Get Industry Demo <Ic n="Arrow" s={14} style={{ color:'#fff' }} />
            </button>
            <button onClick={() => navigate('/contact')} style={{ display:'flex', alignItems:'center', gap:8, padding:'13px 26px', borderRadius:50, background:'rgba(255,255,255,.1)', border:'1.5px solid rgba(255,255,255,.3)', color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer' }}>
              Download Industry Guide
            </button>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div style={{ background:C.bgSoft, borderBottom:`1px solid ${C.border}`, padding:'24px 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
          {[[ind.stat1,ind.stat1l],[ind.stat2,ind.stat2l],[ind.stat3,ind.stat3l]].map(([v,l]) => (
            <div key={l} style={{ textAlign:'center', padding:12 }}>
              <div style={{ fontSize:32, fontWeight:800, color:ind.color, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{v}</div>
              <div style={{ fontSize:13, color:C.textM, marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Challenges & Solutions */}
      <section style={{ padding:'72px 24px', background:'#fff' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'start' }}>
          <div className="rv">
            <div style={{ width:4, height:40, borderRadius:4, background:`linear-gradient(180deg,${C.blue},${C.purple})`, marginBottom:16 }} />
            <h2 style={{ fontSize:28, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Common Challenges</h2>
            <p style={{ color:C.textM, fontSize:15, lineHeight:1.7, marginBottom:24 }}>We've solved these same problems across 80+ {ind.label.toLowerCase()} companies.</p>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {ind.challenges.map((ch, i) => (
                <div key={i} style={{ display:'flex', gap:14, alignItems:'flex-start', padding:'16px 18px', borderRadius:14, border:`1.5px solid ${C.border}`, background:'#fff', animation:`fadeUp .4s ease both ${i*80}ms` }}>
                  <div style={{ width:30, height:30, borderRadius:8, background:ind.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span style={{ fontSize:13, fontWeight:800, color:ind.color }}>{i+1}</span>
                  </div>
                  <span style={{ fontSize:14, color:C.text, lineHeight:1.6, paddingTop:3 }}>{ch}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rv">
            <div style={{ width:4, height:40, borderRadius:4, background:`linear-gradient(180deg,${ind.color},${ind.color}55)`, marginBottom:16 }} />
            <h2 style={{ fontSize:28, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Our Solution Stack</h2>
            <p style={{ color:C.textM, fontSize:15, lineHeight:1.7, marginBottom:24 }}>Pre-configured for {ind.label.toLowerCase()} — deployed in weeks, not months.</p>
            <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:24 }}>
              {ind.solutions.map((sol, i) => (
                <div key={i} style={{ display:'flex', gap:12, alignItems:'center', padding:'14px 18px', borderRadius:14, background:`linear-gradient(135deg,${ind.bg},#fff)`, border:`1px solid ${ind.color}22`, animation:`fadeUp .4s ease both ${i*80}ms` }}>
                  <Ic n="CheckCircle" s={18} style={{ color:ind.color, flexShrink:0 }} />
                  <span style={{ fontSize:14, fontWeight:600, color:C.text }}>{sol}</span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div style={{ background:`linear-gradient(135deg,${ind.color},${ind.color}cc)`, borderRadius:18, padding:24, color:'#fff' }}>
              <Ic n="Quote" s={20} style={{ color:'rgba(255,255,255,.4)', marginBottom:10 }} />
              <p style={{ fontSize:15, lineHeight:1.7, marginBottom:14, fontStyle:'italic' }}>"{ind.quote.text}"</p>
              <div style={{ fontSize:13, fontWeight:700, opacity:.9 }}>— {ind.quote.name}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry accelerator CTA */}
      <section style={{ padding:'64px 24px', background:C.bgSoft }}>
        <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center' }}>
          <div className="rv">
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:ind.bg, borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:700, color:ind.color, marginBottom:20, border:`1px solid ${ind.color}22` }}>
              ⚡ INDUSTRY ACCELERATOR AVAILABLE
            </div>
            <h2 style={{ fontSize:'clamp(26px,4vw,38px)', fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14 }}>
              Save 40% on Implementation Time
            </h2>
            <p style={{ color:C.textM, fontSize:16, lineHeight:1.7, marginBottom:32 }}>
              Our {ind.label} accelerator includes pre-built templates, workflows, reports, and integrations — so you go live faster and with less risk.
            </p>
            <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
              <button onClick={openConsult} style={{ display:'flex', alignItems:'center', gap:8, padding:'13px 28px', borderRadius:50, background:`linear-gradient(135deg,${C.blue},${C.purple})`, border:'none', color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                Request the Accelerator Pack <Ic n="Arrow" s={14} style={{ color:'#fff' }} />
              </button>
              <button onClick={() => navigate('/contact')} style={{ display:'flex', alignItems:'center', gap:8, padding:'13px 24px', borderRadius:50, background:'#fff', border:`2px solid ${C.border}`, color:C.text, fontSize:14, fontWeight:600, cursor:'pointer' }}>
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Other industries */}
      <section style={{ padding:'48px 24px', background:'#fff' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <h3 style={{ fontSize:22, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:20 }}>Other Industries</h3>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {INDUSTRIES.filter(i => i.slug !== ind.slug).map(i => (
              <button key={i.slug} onClick={() => navigate(`/industries/${i.slug}`)}
                style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 18px', borderRadius:50, border:`1.5px solid ${C.border}`, background:'#fff', cursor:'pointer', fontSize:13, fontWeight:600, color:C.text, transition:'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=i.color; e.currentTarget.style.color=i.color; e.currentTarget.style.background=i.bg }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.text; e.currentTarget.style.background='#fff' }}>
                <Ic n={i.icon} s={14} style={{ color:i.color }} /> {i.label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default function IndustriesPage({ navigate, slug, openConsult }) {
  useReveal()
  useEffect(() => { window.scrollTo(0,0) }, [slug])

  if (slug) {
    const ind = INDUSTRIES.find(i => i.slug === slug)
    if (ind) return <IndustryDetail ind={ind} navigate={navigate} openConsult={openConsult} />
  }

  return (
    <div className="page-fade" style={{ paddingTop:68 }}>
      <section style={{ background:`linear-gradient(135deg,#0a0f2e,#0d1940)`, padding:'72px 24px 56px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(0,169,157,.15)', border:'1px solid rgba(0,169,157,.3)', borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:700, color:C.teal, marginBottom:20 }}>INDUSTRIES WE SERVE</div>
          <h1 style={{ fontSize:'clamp(32px,5vw,50px)', fontWeight:800, color:'#fff', lineHeight:1.15, marginBottom:16, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
            Dynamics 365 Built for <span style={{ background:`linear-gradient(135deg,${C.teal},${C.blue})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Your Sector</span>
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,.72)', maxWidth:560, lineHeight:1.8 }}>
            Every industry has unique processes, compliance needs and KPIs. Our industry accelerators cut implementation time by 40% by starting from a pre-configured baseline built for your sector.
          </p>
        </div>
      </section>
      <section style={{ padding:'64px 24px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:20 }}>
          {INDUSTRIES.map(ind => <div className="rv" key={ind.slug}><IndustryCard ind={ind} navigate={navigate} /></div>)}
        </div>
      </section>
    </div>
  )
}
