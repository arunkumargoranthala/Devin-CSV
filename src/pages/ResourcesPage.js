import { useState, useEffect } from 'react'
import { C, Ic } from '../components/ui'

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

// ── Content ───────────────────────────────────────────────────────────────────
const CASE_STUDIES = [
  { title:'How Ashford Manufacturing Cut Month-End Close from 15 Days to 3', industry:'Manufacturing', product:'D365 Finance', result:'80% faster close', color:C.blue, tag:'Finance' },
  { title:'PrimeLine Distribution: 32% Fuel Cost Reduction with D365 SCM',   industry:'Logistics',     product:'D365 Supply Chain', result:'32% cost reduction', color:C.orange, tag:'Supply Chain' },
  { title:'NovaTel Retail: 99.7% Inventory Accuracy Across 68 Stores',       industry:'Retail',        product:'D365 Commerce', result:'99.7% accuracy', color:C.purple, tag:'Commerce' },
  { title:'Crestwood Consulting: Resource Utilisation From 68% to 84%',       industry:'Professional Services', product:'D365 Project Operations', result:'+16% utilisation', color:C.teal, tag:'Projects' },
  { title:'Meridian Capital: Regulatory Reporting Automated End-to-End',     industry:'Financial Services', product:'D365 Finance', result:'Zero manual reports', color:C.green, tag:'Compliance' },
  { title:'Greenfield Health Trust: Patient Intake from 45 to 8 Minutes',    industry:'Healthcare',     product:'D365 Customer Service', result:'83% faster intake', color:C.blue, tag:'Healthcare' },
]

const WHITE_PAPERS = [
  { title:'The 2025 Dynamics 365 Buyer\'s Guide: Finance vs Business Central', pages:28, downloads:'3.4k', color:C.blue,   icon:'BookOpen', desc:'Comprehensive comparison of D365 Finance and Business Central — when to use which, total cost of ownership, and migration path analysis.' },
  { title:'AI & Copilot in Dynamics 365: What\'s Actually Useful in 2025',     pages:22, downloads:'5.1k', color:C.purple, icon:'Brain',    desc:'Cut through the hype. This guide examines which Copilot features deliver real ROI today, and which ones are still catching up.' },
  { title:'Power Platform ROI: Measuring the Business Value of No-Code',       pages:18, downloads:'2.8k', color:C.teal,   icon:'Zap',     desc:'Frameworks and real-world examples for quantifying Power Apps, Power Automate and Power BI deployments to your CFO.' },
  { title:'D365 Supply Chain Management: The Manufacturer\'s Playbook',        pages:34, downloads:'2.1k', color:C.orange, icon:'Truck',   desc:'End-to-end implementation guide covering demand forecasting, WMS configuration, IoT integration and production scheduling.' },
  { title:'Migrating from Dynamics NAV / GP: The Definitive Upgrade Guide',   pages:26, downloads:'4.2k', color:C.green,  icon:'TrendUp', desc:'Step-by-step migration methodology covering data migration, process mapping, training, and cutover planning for legacy Dynamics systems.' },
]

const WEBINARS = [
  { title:'D365 Copilot Live: Real Workflows, Real Results',       date:'Thu 20 Mar 2025 · 2pm GMT', type:'UPCOMING', color:C.blue,   speakers:'James Whitfield, CTO' },
  { title:'Power BI for Finance Teams: 10 Dashboards in 60 Mins', date:'Wed 26 Mar 2025 · 11am GMT', type:'UPCOMING', color:C.purple, speakers:'Sarah O\'Brien, Finance Lead' },
  { title:'D365 SCM: Demand Forecasting with AI — Live Demo',      date:'On-demand (recorded Feb 2025)', type:'ON-DEMAND', color:C.teal,   speakers:'Anil Kapoor, SCM Lead' },
  { title:'Upgrading from NAV to Business Central: What to Expect',date:'On-demand (recorded Jan 2025)', type:'ON-DEMAND', color:C.orange, speakers:'Marcus Chen, Delivery Lead' },
  { title:'Dynamics 365 Health Check: Diagnose Your Implementation',date:'On-demand (recorded Dec 2024)', type:'ON-DEMAND', color:C.green,  speakers:'Emma Rhodes, Finance Practice' },
]

const BLOG_POSTS = [
  { title:'5 Signs Your Dynamics 365 Implementation Is Underperforming',     date:'3 Mar 2025', readTime:'7 min', color:C.blue,   tag:'Implementation' },
  { title:'Microsoft Copilot for Finance: Honest Review After 6 Months',     date:'24 Feb 2025', readTime:'9 min', color:C.purple, tag:'AI & Copilot' },
  { title:'Power Automate vs Logic Apps: Which One for D365?',                date:'17 Feb 2025', readTime:'6 min', color:C.teal,   tag:'Power Platform' },
  { title:'How to Run a D365 Health Check in 3 Days',                         date:'10 Feb 2025', readTime:'8 min', color:C.orange, tag:'Health Check' },
  { title:'Dynamics 365 vs SAP S/4HANA: Mid-Market Decision Guide 2025',     date:'3 Feb 2025',  readTime:'12 min', color:C.green,  tag:'ERP Selection' },
  { title:'The Real Cost of a Failed ERP Implementation (and How to Avoid It)',date:'27 Jan 2025', readTime:'10 min', color:C.blue,   tag:'Risk' },
]

const CERTS = [
  { name:'Microsoft Gold Partner — Business Applications', issuer:'Microsoft', year:'2023', desc:'Highest tier Microsoft partnership, requiring 150+ certified staff and multiple customer success references.', color:C.blue },
  { name:'Microsoft Inner Circle 2025',        issuer:'Microsoft', year:'2025', desc:'Top 1% of Microsoft partners globally — recognises exceptional performance, innovation, and customer impact.', color:C.purple },
  { name:'FastTrack Recognised Partner',        issuer:'Microsoft', year:'2022', desc:'Certified to deliver Microsoft FastTrack rapid deployment programmes for Dynamics 365 customers.', color:C.teal },
  { name:'Azure Expert Managed Service Provider', issuer:'Microsoft', year:'2023', desc:'Validated expertise in managing Azure infrastructure and cloud workloads at enterprise scale.', color:C.orange },
  { name:'ISO 9001:2015 Quality Management',    issuer:'BSI Group', year:'2020', desc:'Independently audited quality management processes covering the full delivery and support lifecycle.', color:C.green },
  { name:'Cyber Essentials Plus Certified',     issuer:'NCSC (UK)', year:'2024', desc:'UK government-backed cybersecurity certification covering infrastructure, access control and patching.', color:C.blue },
]

// ── Shared Hero ────────────────────────────────────────────────────────────────
function ResourcesHero({ section, navigate }) {
  const cfg = {
    'case-studies':  { color:C.blue,   icon:'FileText', title:'Case Studies',       sub:'Real transformations. Measurable results.' },
    'white-papers':  { color:C.purple, icon:'BookOpen', title:'White Papers',        sub:'Deep-dive guides from our practice leads.' },
    'webinars':      { color:C.teal,   icon:'Video',    title:'Webinars & Events',   sub:'Live sessions and on-demand recordings.' },
    'blog':          { color:C.orange, icon:'Chart',    title:'Blog & Insights',     sub:'Expert commentary on Dynamics 365 & AI.' },
    'roi-calculator':{ color:C.green,  icon:'Calc',     title:'ROI Calculator',      sub:'Model your Dynamics 365 business case.' },
    'certifications':{ color:C.blue,   icon:'Award',    title:'Certifications',      sub:'Independently verified expertise.' },
    'partner':       { color:C.purple, icon:'Users',    title:'Partner Programme',   sub:'Grow your business with DevinStratus.' },
    'docs':          { color:C.teal,   icon:'Globe',    title:'Documentation Hub',   sub:'Technical guides & integration docs.' },
  }[section] || { color:C.blue, icon:'BookOpen', title:'Resource Hub', sub:'Everything you need to evaluate, plan and succeed with Dynamics 365.' }

  return (
    <section style={{ background:'linear-gradient(135deg,#060d24 0%,#0d1a40 55%,#140828 100%)', paddingTop:68, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:-80, right:-80, width:380, height:380, borderRadius:'50%', background:cfg.color+'18', animation:'heroFloat 8s ease-in-out infinite', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:-60, left:-40, width:200, height:200, borderRadius:'50%', background:'rgba(108,60,225,.12)', animation:'heroFloat 6s ease-in-out infinite reverse', pointerEvents:'none' }} />
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'64px 24px 56px', position:'relative', zIndex:1 }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${cfg.color}22`, border:`1px solid ${cfg.color}44`, borderRadius:50, padding:'6px 14px', fontSize:12, fontWeight:700, color:cfg.color, marginBottom:20 }}>
          <Ic n={cfg.icon} s={12} style={{ color:cfg.color }} /> Knowledge Hub
        </div>
        <h1 style={{ fontSize:'clamp(32px,5vw,52px)', fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:16, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
          {cfg.title.split(' ')[0]}{' '}
          <span style={{ background:`linear-gradient(135deg,${cfg.color},${cfg.color}99)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            {cfg.title.split(' ').slice(1).join(' ')}
          </span>
        </h1>
        <p style={{ fontSize:17, color:'rgba(255,255,255,.72)', maxWidth:520, lineHeight:1.8 }}>{cfg.sub}</p>
      </div>
    </section>
  )
}

// ── Sub-nav ────────────────────────────────────────────────────────────────────
const SUB_SECTIONS = [
  { slug:'case-studies',   title:'Case Studies',   icon:'FileText', color:C.blue   },
  { slug:'white-papers',   title:'White Papers',   icon:'BookOpen', color:C.purple },
  { slug:'webinars',       title:'Webinars',        icon:'Video',    color:C.teal   },
  { slug:'blog',           title:'Blog',            icon:'Chart',    color:C.orange },
  { slug:'roi-calculator', title:'ROI Calculator',  icon:'Calc',     color:C.green  },
  { slug:'certifications', title:'Certifications',  icon:'Award',    color:C.blue   },
  { slug:'partner',        title:'Partner Programme',icon:'Users',   color:C.purple },
  { slug:'docs',           title:'Docs',            icon:'Globe',    color:C.teal   },
]

function SubNav({ section, navigate }) {
  return (
    <div style={{ background:'#fff', borderBottom:`1px solid ${C.border}`, position:'sticky', top:68, zIndex:100 }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px', display:'flex', gap:2, overflowX:'auto' }}>
        {SUB_SECTIONS.map(s => (
          <button key={s.slug} onClick={() => navigate(`/resources/${s.slug}`)}
            style={{ display:'flex', alignItems:'center', gap:6, padding:'13px 14px', borderBottom:`2.5px solid ${section===s.slug?s.color:'transparent'}`, background:'none', border:'none', borderBottom:`2.5px solid ${section===s.slug?s.color:'transparent'}`, cursor:'pointer', fontSize:13, fontWeight:section===s.slug?700:500, color:section===s.slug?s.color:C.textM, whiteSpace:'nowrap', transition:'all .18s', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
            <Ic n={s.icon} s={13} style={{ color:section===s.slug?s.color:C.textL }} />
            {s.title}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Sections ──────────────────────────────────────────────────────────────────
function CaseStudies() {
  useReveal()
  return (
    <section style={{ padding:'64px 24px' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(360px,1fr))', gap:20 }}>
          {CASE_STUDIES.map((cs, i) => (
            <div key={cs.title} className="rv" style={{ borderRadius:22, border:`1.5px solid ${C.border}`, background:'#fff', overflow:'hidden', transition:'all .25s', cursor:'pointer', animation:`fadeUp .4s ease both ${i*60}ms` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=cs.color+'55'; e.currentTarget.style.boxShadow=`0 16px 48px ${cs.color}14`; e.currentTarget.style.transform='translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
              <div style={{ height:5, background:`linear-gradient(90deg,${cs.color},${cs.color}55)` }} />
              <div style={{ padding:'24px' }}>
                <div style={{ display:'flex', gap:8, marginBottom:14 }}>
                  <span style={{ padding:'4px 12px', borderRadius:50, background:cs.color+'15', fontSize:11, fontWeight:700, color:cs.color }}>{cs.tag}</span>
                  <span style={{ padding:'4px 12px', borderRadius:50, background:C.bgSoft, fontSize:11, fontWeight:600, color:C.textM }}>{cs.industry}</span>
                </div>
                <h3 style={{ fontSize:16.5, fontWeight:700, color:C.text, lineHeight:1.45, marginBottom:14 }}>{cs.title}</h3>
                <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', borderRadius:12, background:cs.color+'0c', border:`1px solid ${cs.color}22` }}>
                  <Ic n="TrendUp" s={16} style={{ color:cs.color, flexShrink:0 }} />
                  <div>
                    <div style={{ fontSize:12, color:C.textM }}>Key Result</div>
                    <div style={{ fontSize:14, fontWeight:800, color:cs.color }}>{cs.result}</div>
                  </div>
                </div>
                <div style={{ marginTop:14, display:'flex', alignItems:'center', gap:4, fontSize:12, color:C.textL }}><Ic n="Package" s={12} style={{ color:C.textL }} /> {cs.product}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhitePapers() {
  useReveal()
  return (
    <section style={{ padding:'64px 24px' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', display:'flex', flexDirection:'column', gap:16 }}>
        {WHITE_PAPERS.map((wp, i) => (
          <div key={wp.title} className="rv" style={{ display:'flex', gap:20, alignItems:'flex-start', padding:'28px', borderRadius:20, border:`1.5px solid ${C.border}`, background:'#fff', transition:'all .25s', cursor:'pointer', animation:`fadeUp .4s ease both ${i*60}ms` }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=wp.color+'55'; e.currentTarget.style.boxShadow=`0 12px 40px ${wp.color}12`; e.currentTarget.style.transform='translateX(6px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
            <div style={{ width:56, height:56, borderRadius:16, background:wp.color+'15', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Ic n={wp.icon} s={26} style={{ color:wp.color }} />
            </div>
            <div style={{ flex:1 }}>
              <h3 style={{ fontSize:17, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8, lineHeight:1.4 }}>{wp.title}</h3>
              <p style={{ fontSize:13.5, color:C.textM, lineHeight:1.65, marginBottom:12 }}>{wp.desc}</p>
              <div style={{ display:'flex', gap:16, fontSize:12.5, color:C.textL }}>
                <span style={{ display:'flex', alignItems:'center', gap:4 }}><Ic n="FileText" s={12} style={{ color:C.textL }} />{wp.pages} pages</span>
                <span style={{ display:'flex', alignItems:'center', gap:4 }}><Ic n="Users" s={12} style={{ color:C.textL }} />{wp.downloads} downloads</span>
              </div>
            </div>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8, flexShrink:0 }}>
              <div style={{ padding:'8px 18px', borderRadius:50, background:`linear-gradient(135deg,${wp.color},${wp.color}cc)`, color:'#fff', fontSize:12.5, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' }}>
                Download PDF
              </div>
              <div style={{ fontSize:11, color:C.textL }}>Free download</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function WebinarsSection() {
  useReveal()
  return (
    <section style={{ padding:'64px 24px' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {WEBINARS.map((w, i) => (
            <div key={w.title} className="rv" style={{ display:'flex', gap:20, alignItems:'center', padding:'24px 28px', borderRadius:18, border:`1.5px solid ${C.border}`, background:'#fff', transition:'all .25s', cursor:'pointer', animation:`fadeUp .4s ease both ${i*60}ms` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=w.color+'55'; e.currentTarget.style.boxShadow=`0 8px 28px ${w.color}12`; e.currentTarget.style.transform='translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
              <div style={{ width:52, height:52, borderRadius:14, background:w.color+'15', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Ic n="Video" s={22} style={{ color:w.color }} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:6 }}>
                  <span style={{ padding:'3px 10px', borderRadius:50, background: w.type==='UPCOMING' ? C.green+'18' : C.bgSoft, color: w.type==='UPCOMING' ? C.green : C.textM, fontSize:11, fontWeight:700 }}>
                    {w.type === 'UPCOMING' ? '🔴 LIVE UPCOMING' : '⏺ ON-DEMAND'}
                  </span>
                </div>
                <h3 style={{ fontSize:16, fontWeight:700, color:C.text, marginBottom:4 }}>{w.title}</h3>
                <div style={{ display:'flex', gap:14, fontSize:12.5, color:C.textM }}>
                  <span style={{ display:'flex', alignItems:'center', gap:4 }}><Ic n="Clock" s={12} style={{ color:C.textL }} />{w.date}</span>
                  <span style={{ display:'flex', alignItems:'center', gap:4 }}><Ic n="User" s={12} style={{ color:C.textL }} />{w.speakers}</span>
                </div>
              </div>
              <div style={{ padding:'10px 20px', borderRadius:50, background:`linear-gradient(135deg,${w.color},${w.color}cc)`, color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', flexShrink:0, whiteSpace:'nowrap' }}>
                {w.type === 'UPCOMING' ? 'Register Free' : 'Watch Now'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BlogSection() {
  useReveal()
  return (
    <section style={{ padding:'64px 24px' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:20 }}>
        {BLOG_POSTS.map((b, i) => (
          <div key={b.title} className="rv" style={{ borderRadius:20, border:`1.5px solid ${C.border}`, background:'#fff', overflow:'hidden', transition:'all .25s', cursor:'pointer', animation:`fadeUp .4s ease both ${i*60}ms` }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=b.color+'55'; e.currentTarget.style.boxShadow=`0 12px 36px ${b.color}12`; e.currentTarget.style.transform='translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
            <div style={{ height:4, background:`linear-gradient(90deg,${b.color},${b.color}55)` }} />
            <div style={{ padding:'22px' }}>
              <div style={{ display:'flex', gap:8, marginBottom:12 }}>
                <span style={{ padding:'4px 12px', borderRadius:50, background:b.color+'15', fontSize:11, fontWeight:700, color:b.color }}>{b.tag}</span>
              </div>
              <h3 style={{ fontSize:15.5, fontWeight:700, color:C.text, lineHeight:1.5, marginBottom:14 }}>{b.title}</h3>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:12, color:C.textL }}>
                <span>{b.date}</span>
                <span style={{ display:'flex', alignItems:'center', gap:4 }}><Ic n="Clock" s={11} style={{ color:C.textL }} />{b.readTime} read</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ROICalculator({ openConsult }) {
  const [users, setUsers] = useState(50)
  const [modules, setModules] = useState(3)
  const [industry, setIndustry] = useState('manufacturing')

  const multipliers = { manufacturing:1.3, retail:1.1, financial:1.25, professional:1.2, healthcare:1.15, logistics:1.2 }
  const baseROI = users * modules * 2200 * (multipliers[industry] || 1)
  const yr1Savings = Math.round(baseROI * 0.45)
  const yr3Savings = Math.round(baseROI * 1.8)
  const payback = Math.round(12 / (multipliers[industry] || 1))

  useReveal()
  return (
    <section style={{ padding:'64px 24px' }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>
        <div className="rv" style={{ padding:'40px', borderRadius:24, border:`1.5px solid ${C.border}`, background:'#fff', boxShadow:'0 8px 40px rgba(0,0,0,.06)' }}>
          <h2 style={{ fontSize:26, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>Dynamics 365 ROI Calculator</h2>
          <p style={{ color:C.textM, fontSize:14, marginBottom:32 }}>Estimate the financial impact of a Dynamics 365 transformation for your business. Based on benchmarks from 500+ deployments.</p>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:24, marginBottom:32 }}>
            <div>
              <label style={{ fontSize:13, fontWeight:700, color:C.text, display:'block', marginBottom:8 }}>Number of Users: <span style={{ color:C.blue }}>{users}</span></label>
              <input type="range" min={10} max={500} value={users} onChange={e => setUsers(+e.target.value)} style={{ width:'100%', accentColor:C.blue }} />
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:C.textL, marginTop:4 }}><span>10</span><span>500</span></div>
            </div>
            <div>
              <label style={{ fontSize:13, fontWeight:700, color:C.text, display:'block', marginBottom:8 }}>D365 Modules: <span style={{ color:C.purple }}>{modules}</span></label>
              <input type="range" min={1} max={8} value={modules} onChange={e => setModules(+e.target.value)} style={{ width:'100%', accentColor:C.purple }} />
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:C.textL, marginTop:4 }}><span>1</span><span>8</span></div>
            </div>
            <div>
              <label style={{ fontSize:13, fontWeight:700, color:C.text, display:'block', marginBottom:8 }}>Industry</label>
              <select className="form-input" value={industry} onChange={e => setIndustry(e.target.value)} style={{ fontSize:13 }}>
                {[['manufacturing','Manufacturing'],['retail','Retail'],['financial','Financial Services'],['professional','Professional Services'],['healthcare','Healthcare'],['logistics','Logistics']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:14 }}>
            {[
              { label:'Year 1 Savings', value:`£${(yr1Savings/1000).toFixed(0)}k`, color:C.blue, icon:'Dollar' },
              { label:'3-Year Total ROI', value:`£${(yr3Savings/1000).toFixed(0)}k`, color:C.purple, icon:'TrendUp' },
              { label:'Payback Period', value:`${payback} months`, color:C.teal, icon:'Clock' },
              { label:'Estimated ROI %', value:`${Math.round(yr3Savings/baseROI*100)}%`, color:C.green, icon:'PieChart' },
            ].map(s => (
              <div key={s.label} style={{ padding:'20px 18px', borderRadius:16, background:s.color+'0c', border:`1.5px solid ${s.color}22`, textAlign:'center' }}>
                <Ic n={s.icon} s={20} style={{ color:s.color, marginBottom:8 }} />
                <div style={{ fontSize:22, fontWeight:800, color:s.color, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{s.value}</div>
                <div style={{ fontSize:12, color:C.textM, marginTop:4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop:24, padding:'16px 20px', borderRadius:12, background:C.bgSoft, border:`1px solid ${C.border}`, fontSize:12.5, color:C.textM }}>
            ⚠️ This is an indicative estimate only, based on benchmarks from similar deployments. A detailed business case requires discovery work with your specific processes and data. <button onClick={openConsult} style={{ background:'none', border:'none', color:C.blue, cursor:'pointer', fontWeight:700, fontSize:12.5 }}>Book a free business case review →</button>
          </div>
        </div>
      </div>
    </section>
  )
}

function CertificationsSection() {
  useReveal()
  return (
    <section style={{ padding:'64px 24px' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(360px,1fr))', gap:20 }}>
          {CERTS.map((cert, i) => (
            <div key={cert.name} className="rv" style={{ padding:'28px', borderRadius:20, border:`1.5px solid ${C.border}`, background:'#fff', transition:'all .25s', animation:`fadeUp .4s ease both ${i*60}ms` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=cert.color+'55'; e.currentTarget.style.boxShadow=`0 12px 36px ${cert.color}12`; e.currentTarget.style.transform='translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
              <div style={{ display:'flex', gap:14, alignItems:'flex-start', marginBottom:14 }}>
                <div style={{ width:52, height:52, borderRadius:14, background:cert.color+'15', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Ic n="Award" s={24} style={{ color:cert.color }} />
                </div>
                <div>
                  <div style={{ fontSize:11, fontWeight:700, color:cert.color, marginBottom:4 }}>{cert.issuer} · {cert.year}</div>
                  <h3 style={{ fontSize:15, fontWeight:800, color:C.text, lineHeight:1.35 }}>{cert.name}</h3>
                </div>
              </div>
              <p style={{ fontSize:13.5, color:C.textM, lineHeight:1.65 }}>{cert.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PartnerSection({ navigate }) {
  useReveal()
  return (
    <section style={{ padding:'64px 24px' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:56 }}>
        <div className="rv">
          <div style={{ width:4, height:40, borderRadius:4, background:`linear-gradient(180deg,${C.purple},${C.blue})`, marginBottom:16 }} />
          <h2 style={{ fontSize:32, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:16 }}>Grow Your Business with Our Partner Programme</h2>
          <p style={{ fontSize:15.5, color:C.textM, lineHeight:1.85, marginBottom:20 }}>Refer clients, co-deliver projects, or white-label our Dynamics 365 expertise. Our partner programme is designed for accountants, consultants, IT resellers and business advisors who want to add enterprise ERP to their offering.</p>
          <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:28 }}>
            {[['Dollar','Earn up to 15% referral commission per deal, paid on contract signature'],['Users','Access to co-delivery resources, training, and our certified team'],['Award','Use the DevinStratus partner badge and Microsoft partner credentials'],['Globe','Joint marketing opportunities — webinars, case studies, events'],['Shield','No minimum volumes — earn on every referral you send'],].map(([icon, text]) => (
              <div key={text} style={{ display:'flex', gap:10, alignItems:'flex-start', padding:'14px 16px', borderRadius:12, border:`1px solid ${C.border}` }}>
                <Ic n={icon} s={16} style={{ color:C.purple, flexShrink:0, marginTop:1 }} />
                <span style={{ fontSize:14, color:C.text }}>{text}</span>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/contact')} style={{ display:'flex', alignItems:'center', gap:8, padding:'13px 28px', borderRadius:50, background:`linear-gradient(135deg,${C.purple},${C.blue})`, border:'none', color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
            Apply to the Programme <Ic n="Arrow" s={14} style={{ color:'#fff' }} />
          </button>
        </div>
        <div className="rv">
          <h3 style={{ fontSize:20, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:20 }}>Partner Tiers</h3>
          {[
            { tier:'Referral Partner', commission:'8%',  reqs:'No minimum. Simply refer qualified opportunities.', color:C.blue },
            { tier:'Silver Partner',   commission:'11%', reqs:'5+ referrals per year. Access to co-marketing.',   color:C.purple },
            { tier:'Gold Partner',     commission:'15%', reqs:'Co-deliver projects. Joint go-to-market plan.',     color:C.orange },
          ].map((p, i) => (
            <div key={p.tier} style={{ padding:'22px', borderRadius:16, border:`1.5px solid ${p.color}33`, background:`${p.color}06`, marginBottom:12, transition:'all .22s', animation:`fadeUp .4s ease both ${i*80}ms` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=p.color+'66'; e.currentTarget.style.boxShadow=`0 8px 24px ${p.color}12` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=p.color+'33'; e.currentTarget.style.boxShadow='none' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                <h4 style={{ fontSize:16, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{p.tier}</h4>
                <span style={{ fontSize:20, fontWeight:900, color:p.color, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{p.commission}</span>
              </div>
              <p style={{ fontSize:13, color:C.textM }}>{p.reqs}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DocsSection() {
  const DOCS = [
    { title:'D365 Finance Integration Architecture Guide', type:'Technical', pages:42, color:C.blue },
    { title:'Power Platform ALM & DevOps Playbook',        type:'DevOps',    pages:28, color:C.purple },
    { title:'Azure Service Bus + D365 SCM Integration',   type:'Integration',pages:18, color:C.teal },
    { title:'Business Central API Reference (v24)',        type:'API',       pages:64, color:C.orange },
    { title:'D365 CRM Data Migration Toolkit Guide',       type:'Migration', pages:22, color:C.green },
    { title:'Dual-Write Setup & Troubleshooting',          type:'Technical', pages:16, color:C.blue },
  ]
  useReveal()
  return (
    <section style={{ padding:'64px 24px' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:16 }}>
        {DOCS.map((d, i) => (
          <div key={d.title} className="rv" style={{ display:'flex', gap:14, padding:'22px', borderRadius:18, border:`1.5px solid ${C.border}`, background:'#fff', transition:'all .22s', cursor:'pointer', animation:`fadeUp .4s ease both ${i*60}ms` }}
            onMouseEnter={e => { e.currentTarget.style.borderColor=d.color+'55'; e.currentTarget.style.boxShadow=`0 8px 24px ${d.color}10`; e.currentTarget.style.transform='translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
            <div style={{ width:44, height:44, borderRadius:12, background:d.color+'15', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Ic n="FileText" s={20} style={{ color:d.color }} />
            </div>
            <div>
              <span style={{ fontSize:10.5, fontWeight:700, color:d.color, background:d.color+'12', padding:'3px 8px', borderRadius:50, display:'inline-block', marginBottom:6 }}>{d.type}</span>
              <h3 style={{ fontSize:14, fontWeight:700, color:C.text, lineHeight:1.4, marginBottom:6 }}>{d.title}</h3>
              <span style={{ fontSize:12, color:C.textL }}>{d.pages} pages · PDF</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Main Export ────────────────────────────────────────────────────────────────
export default function ResourcesPage({ navigate, slug, openConsult }) {
  useReveal()
  useEffect(() => { window.scrollTo(0,0) }, [slug])
  const section = slug || 'case-studies'

  return (
    <div className="page-fade" style={{ paddingTop:68 }}>
      <ResourcesHero section={section} navigate={navigate} />
      <SubNav section={section} navigate={navigate} />
      {section === 'case-studies'   && <CaseStudies />}
      {section === 'white-papers'   && <WhitePapers />}
      {section === 'webinars'       && <WebinarsSection />}
      {section === 'blog'           && <BlogSection />}
      {section === 'roi-calculator' && <ROICalculator openConsult={openConsult} />}
      {section === 'certifications' && <CertificationsSection />}
      {section === 'partner'        && <PartnerSection navigate={navigate} />}
      {section === 'docs'           && <DocsSection />}
    </div>
  )
}
