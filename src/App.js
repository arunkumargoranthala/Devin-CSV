import { useState } from 'react'
import { GS, useRouter, C, Ic } from './components/ui'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SolutionPage from './pages/SolutionPage'
import SolutionCategoryPage from './pages/SolutionCategoryPage'
import ServicePage from './pages/ServicePage'
import ServicesListPage from './pages/ServicesListPage'
import IndustriesPage from './pages/IndustriesPage'
import CompanyPage from './pages/CompanyPage'
import ResourcesPage from './pages/ResourcesPage'
import ContactPage from './pages/ContactPage'

// ── Consultation Modal ─────────────────────────────────────────────────────────
function Modal({ open, onClose, children, title }) {
  if (!open) return null
  return (
    <div style={{ position:'fixed', inset:0, zIndex:99999, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(15,23,42,.55)', backdropFilter:'blur(4px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background:'#fff', borderRadius:22, width:'90%', maxWidth:520, padding:36, boxShadow:'0 24px 80px rgba(0,0,0,.18)', position:'relative', maxHeight:'90vh', overflowY:'auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <h3 style={{ fontSize:20, fontWeight:800, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{title}</h3>
          <button onClick={onClose} style={{ background:'#f1f5f9', border:'none', borderRadius:8, width:32, height:32, cursor:'pointer', fontSize:18, color:'#64748b' }}>×</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function ConsultForm({ onSuccess }) {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name:'', email:'', company:'', message:'' })
  const handle = (k,v) => setForm(f => ({...f,[k]:v}))
  const submit = () => { setSent(true); onSuccess && setTimeout(onSuccess, 2500) }
  if (sent) return (
    <div style={{ textAlign:'center', padding:'20px 0' }}>
      <div style={{ fontSize:48, marginBottom:16 }}>✅</div>
      <h4 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:20, fontWeight:800, marginBottom:8 }}>We'll be in touch!</h4>
      <p style={{ color:'#475569' }}>A specialist will contact you within 1 business day.</p>
    </div>
  )
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      {[['name','Your full name','Name'],['email','you@company.com','Email'],['company','Company name','Company']].map(([k,ph,lbl]) => (
        <div key={k}>
          <label style={{ fontSize:12.5, fontWeight:600, color:'#475569', display:'block', marginBottom:5 }}>{lbl}</label>
          <input className="form-input" placeholder={ph} value={form[k]} onChange={e => handle(k,e.target.value)}/>
        </div>
      ))}
      <div>
        <label style={{ fontSize:12.5, fontWeight:600, color:'#475569', display:'block', marginBottom:5 }}>What can we help with?</label>
        <textarea className="form-input" placeholder="Tell us about your business and goals..." rows={4} value={form.message} onChange={e => handle('message',e.target.value)} style={{ resize:'none' }}/>
      </div>
      <button onClick={submit} style={{ padding:'13px', borderRadius:12, background:`linear-gradient(135deg,#0057B8,#6C3CE1)`, border:'none', color:'#fff', fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
        Book Free Consultation →
      </button>
      <p style={{ fontSize:11, color:'#94a3b8', textAlign:'center' }}>No spam. No obligation. Response within 1 business day.</p>
    </div>
  )
}

function ScrollTop() {
  const [show, setShow] = useState(false)
  useState(() => {
    const h = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', h, { passive:true })
    return () => window.removeEventListener('scroll', h)
  })
  if (!show) return null
  return (
    <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
      style={{ position:'fixed', bottom:28, right:28, width:44, height:44, borderRadius:'50%', background:`linear-gradient(135deg,${C.blue},${C.purple})`, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 18px rgba(0,87,184,.3)', zIndex:7000 }}>
      <Ic n="ChevU" s={18} style={{ color:'#fff' }} />
    </button>
  )
}

export default function App() {
  const { parts, navigate } = useRouter()
  const [consultOpen, setConsultOpen] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)

  const openConsult = () => setConsultOpen(true)
  const openDemo    = () => setDemoOpen(true)

  // ── Route matching ───────────────────────────────────────────────────────────
  // #/                            → HomePage
  // #/solutions/erp               → SolutionCategoryPage
  // #/solution/erp/finance        → SolutionPage
  // #/services                    → ServicesListPage
  // #/service/implementation      → ServicePage
  // #/industries                  → IndustriesPage (list)
  // #/industries/manufacturing    → IndustriesPage (detail)
  // #/contact                     → ContactPage
  // #/resources/...               → ContactPage (placeholder)
  // #/company/...                 → ContactPage (placeholder)
  let page = null

  if (parts.length === 0) {
    page = <HomePage navigate={navigate} openConsult={openConsult} openDemo={openDemo} />
  } else if (parts[0] === 'solutions' && parts[1]) {
    page = <SolutionCategoryPage categorySlug={parts[1]} navigate={navigate} openConsult={openConsult} />
  } else if (parts[0] === 'solution' && parts[1] && parts[2]) {
    page = <SolutionPage categorySlug={parts[1]} itemSlug={parts[2]} navigate={navigate} openConsult={openConsult} />
  } else if (parts[0] === 'services') {
    page = <ServicesListPage navigate={navigate} openConsult={openConsult} />
  } else if (parts[0] === 'service' && parts[1]) {
    page = <ServicePage serviceSlug={parts[1]} navigate={navigate} openConsult={openConsult} />
  } else if (parts[0] === 'industries') {
    page = <IndustriesPage navigate={navigate} slug={parts[1] || null} openConsult={openConsult} />
  } else if (parts[0] === 'contact') {
    page = <ContactPage navigate={navigate} openConsult={openConsult} />
  } else if (parts[0] === 'resources') {
    page = <ResourcesPage navigate={navigate} slug={parts[1]||null} openConsult={openConsult} />
  } else if (parts[0] === 'company') {
    page = <CompanyPage navigate={navigate} slug={parts[1]||null} openConsult={openConsult} />
  } else {
    page = <HomePage navigate={navigate} openConsult={openConsult} openDemo={openDemo} />
  }

  return (
    <>
      <GS />

      <Modal open={consultOpen} onClose={() => setConsultOpen(false)} title="Book Your Free Consultation">
        <ConsultForm onSuccess={() => setTimeout(() => setConsultOpen(false), 3000)} />
      </Modal>
      <Modal open={demoOpen} onClose={() => setDemoOpen(false)} title="Watch Dynamics 365 Demo">
        <div style={{ aspectRatio:'16/9', background:'#0f172a', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <div style={{ textAlign:'center', color:'#fff' }}>
            <div style={{ fontSize:48, marginBottom:12 }}>▶</div>
            <div style={{ fontSize:14, opacity:0.7 }}>Demo video coming soon</div>
          </div>
        </div>
      </Modal>

      <Header navigate={navigate} openConsult={openConsult} openDemo={openDemo} />

      <main style={{ minHeight:'100vh' }}>
        {page}
      </main>

      <Footer navigate={navigate} openConsult={openConsult} />
      <ScrollTop />
    </>
  )
}
