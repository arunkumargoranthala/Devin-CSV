import React, { useState, useEffect, useRef } from "react"

// ─── ICONS ────────────────────────────────────────────────────────────────────
const P = {
  Package:["M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z","M3.27 6.96L12 12.01l8.73-5.05","M12 22.08V12"],
  Dollar:["M12 1v22","M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"],
  Truck:["M1 3h15v13H1z","M16 8h4l3 3v5h-7V8z","M5.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z","M18.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"],
  Cart:["M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z","M3 6h18","M16 10a4 4 0 01-8 0"],
  Brief:["M20 7H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z","M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"],
  Users:["M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2","M23 21v-2a4 4 0 00-3-3.87","M16 3.13a4 4 0 010 7.75","M9 7a4 4 0 100 8 4 4 0 000-8z"],
  User:["M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2","M12 11a4 4 0 100-8 4 4 0 000 8z"],
  Headphones:["M3 18v-6a9 9 0 0118 0v6","M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z","M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"],
  Target:["M12 22a10 10 0 100-20 10 10 0 000 20z","M12 18a6 6 0 100-12 6 6 0 000 12z","M12 14a2 2 0 100-4 2 2 0 000 4z"],
  Wrench:["M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"],
  Brain:["M9.5 2A2.5 2.5 0 007 4.5A2.5 2.5 0 004.5 7A2.5 2.5 0 002 9.5v5A2.5 2.5 0 004.5 17A2.5 2.5 0 007 19.5A2.5 2.5 0 009.5 22h5a2.5 2.5 0 002.5-2.5 2.5 2.5 0 002.5-2.5 2.5 2.5 0 002.5-2.5v-5A2.5 2.5 0 0019.5 7 2.5 2.5 0 0017 4.5 2.5 2.5 0 0014.5 2z"],
  Chart:["M18 20V10","M12 20V4","M6 20v-6"],
  Globe:["M12 22a10 10 0 100-20 10 10 0 000 20z","M2 12h20","M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"],
  Shield:["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
  Cloud:["M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"],
  Zap:["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
  Trend:["M23 6l-9.5 9.5-5-5L1 18","M17 6h6v6"],
  TrendUp:["M22 7l-8.5 8.5-5-5L1 18","M16 7h6v6"],
  Check:["M22 11.08V12a10 10 0 11-5.93-9.14","M22 4L12 14.01l-3-3"],
  CheckCircle:["M22 11.08V12a10 10 0 11-5.93-9.14","M9 11l3 3L22 4"],
  Star:["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"],
  Arrow:["M5 12h14","M12 5l7 7-7 7"],
  ChevD:["M6 9l6 6 6-6"],
  ChevR:["M9 18l6-6-6-6"],
  ChevU:["M18 15l-6-6-6 6"],
  Menu:["M3 12h18","M3 6h18","M3 18h18"],
  X:["M18 6L6 18","M6 6l12 12"],
  Phone:["M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"],
  Mail:["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z","M22 6l-10 7L2 6"],
  Pin:["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z","M12 10a1 1 0 100-2 1 1 0 000 2z"],
  Play:["M5 3l14 9-14 9V3z"],
  Quote:["M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z","M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"],
  Linkedin:["M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z","M2 9h4v12H2z","M4 6a2 2 0 100-4 2 2 0 000 4z"],
  Twitter:["M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"],
  Youtube:["M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z","M9.75 15.02l5.75-3.02-5.75-3.02v6.04z"],
  Cpu:["M9 2H6a2 2 0 00-2 2v3","M15 2h3a2 2 0 012 2v3","M9 22H6a2 2 0 01-2-2v-3","M15 22h3a2 2 0 002-2v-3","M2 9h3","M2 15h3","M22 9h-3","M22 15h-3","M9 9h6v6H9z"],
  Settings:["M12 15a3 3 0 100-6 3 3 0 000 6z","M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"],
  BookOpen:["M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z","M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"],
  Video:["M23 7l-7 5 7 5V7z","M1 5h14a2 2 0 012 2v10a2 2 0 01-2 2H1a2 2 0 01-2-2V7a2 2 0 012-2z"],
  FileText:["M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z","M14 2v6h6","M16 13H8","M16 17H8","M10 9H8"],
  Calc:["M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z","M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h8"],
  Award:["M12 15a7 7 0 100-14 7 7 0 000 14z","M8.21 13.89L7 23l5-3 5 3-1.21-9.12"],
  Layers:["M12 2L2 7l10 5 10-5-10-5z","M2 17l10 5 10-5","M2 12l10 5 10-5"],
  LifeBuoy:["M12 22a10 10 0 100-20 10 10 0 000 20z","M4.93 4.93l4.24 4.24","M14.83 14.83l4.24 4.24","M4.93 19.07l4.24-4.24","M14.83 9.17l4.24-4.24"],
  Megaphone:["M3 11l19-9-9 19-2-8-8-2z"],
  PieChart:["M21.21 15.89A10 10 0 118 2.83","M22 12A10 10 0 0012 2v10z"],
  Rocket:["M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z","M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z","M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0","M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"],
  Database:["M12 2a9 3 0 110 6 9 3 0 010-6z","M3 5v4c0 1.66 4.03 3 9 3s9-1.34 9-3V5","M3 9v4c0 1.66 4.03 3 9 3s9-1.34 9-3V9","M3 13v4c0 1.66 4.03 3 9 3s9-1.34 9-3v-4"],
  BarChart:["M12 20V10","M18 20V4","M6 20v-6"],
  Clock:["M12 22a10 10 0 100-20 10 10 0 000 20z","M12 6v6l4 2"],
  Plus:["M12 5v14","M5 12h14"],
  Minus:["M5 12h14"],
  Eye:["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 12a3 3 0 100-6 3 3 0 000 6z"],
  Map:["M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z","M8 2v16","M16 6v16"],
  ExternalLink:["M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6","M15 3h6v6","M10 14L21 3"],
}
const Ic = ({ n, s = 16, style = {}, cls = "" }) => {
  const d = P[n]; if (!d) return null
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={style} className={cls}>
      {(Array.isArray(d) ? d : [d]).map((p, i) => <path key={i} d={p} />)}
    </svg>
  )
}

// ─── PALETTE ─────────────────────────────────────────────────────────────────
const C = {
  blue:"#0057B8",blueM:"#0071f3",blueL:"#e8f2ff",blueLL:"#f0f7ff",
  purple:"#6C3CE1",purpleL:"#f0ebff",
  teal:"#00A99D",tealL:"#e6f9f8",
  orange:"#FF6B2B",orangeL:"#fff1eb",
  green:"#16A34A",greenL:"#dcfce7",
  text:"#0f172a",textM:"#475569",textL:"#94a3b8",
  bg:"#ffffff",bgSoft:"#f8fafc",bgAlt:"#f1f5f9",
  border:"#e2e8f0",borderM:"#cbd5e1",
}

// ─── SCROLL HELPER ────────────────────────────────────────────────────────────
const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
}

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useCounter(target, dur = 2000) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; obs.disconnect()
      let frame, start
      const tick = now => {
        if (!start) start = now
        const p = Math.min((now - start) / dur, 1)
        setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target))
        if (p < 1) frame = requestAnimationFrame(tick); else setVal(target)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, dur])
  return { val, ref }
}

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("vis"); obs.unobserve(e.target) } })
    }, { threshold: 0.06, rootMargin: "0px 0px -30px 0px" })
    el.querySelectorAll(".rv").forEach(t => obs.observe(t))
    return () => obs.disconnect()
  }, [])
  return ref
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])
  if (!open) return null
  return (
    <div onClick={onClose} style={{ position:"fixed",inset:0,zIndex:99999,background:"rgba(15,23,42,.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background:"#fff",borderRadius:22,maxWidth:560,width:"100%",boxShadow:"0 24px 80px rgba(0,0,0,.18)",overflow:"hidden",animation:"modalPop .22s ease" }}>
        <div style={{ padding:"20px 24px",borderBottom:`1.5px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",background:`linear-gradient(135deg,${C.blue},${C.purple})` }}>
          <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:16,color:"#fff" }}>{title}</span>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,.2)",border:"none",borderRadius:8,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#fff" }}>
            <Ic n="X" s={16} />
          </button>
        </div>
        <div style={{ padding:"28px 24px" }}>{children}</div>
      </div>
    </div>
  )
}

// ─── CONTACT FORM (shared) ────────────────────────────────────────────────────
function ContactForm({ onSuccess }) {
  const [form, setForm] = useState({ name:"",email:"",company:"",phone:"",module:"",message:"" })
  const [sent, setSent] = useState(false)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const submit = () => { if (form.name && form.email) { setSent(true); onSuccess && onSuccess() } }
  if (sent) return (
    <div style={{ textAlign:"center",padding:"20px 0" }}>
      <div style={{ width:60,height:60,borderRadius:"50%",background:C.greenL,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px" }}>
        <Ic n="CheckCircle" s={30} style={{ color:C.green }} />
      </div>
      <h3 style={{ fontSize:20,fontWeight:800,color:C.text,marginBottom:8 }}>Thanks, {form.name}!</h3>
      <p style={{ fontSize:14,color:C.textM,lineHeight:1.7 }}>A certified consultant will be in touch within 1 business day.</p>
    </div>
  )
  return (
    <div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
        {[["name","Full Name","Your name"],["email","Business Email","you@company.com"],["company","Company","Company name"],["phone","Phone","+44 ..."]].map(([k,l,p]) => (
          <div key={k}>
            <label style={{ fontSize:11,fontWeight:700,color:C.textM,display:"block",marginBottom:4 }}>{l}</label>
            <input className="form-input" placeholder={p} value={form[k]} onChange={set(k)} />
          </div>
        ))}
      </div>
      <div style={{ marginBottom:12 }}>
        <label style={{ fontSize:11,fontWeight:700,color:C.textM,display:"block",marginBottom:4 }}>Module of Interest</label>
        <select className="form-input" value={form.module} onChange={set("module")}>
          <option value="">Select an application...</option>
          {["Business Central","Finance","Supply Chain","Commerce","Project Operations","Human Resources","Customer Service","Sales","Field Service","Customer Insights","Power Platform"].map(m => <option key={m}>{m}</option>)}
        </select>
      </div>
      <div style={{ marginBottom:18 }}>
        <label style={{ fontSize:11,fontWeight:700,color:C.textM,display:"block",marginBottom:4 }}>Tell us about your challenge</label>
        <textarea className="form-input" rows={3} placeholder="What are you hoping to solve?" value={form.message} onChange={set("message")} style={{ resize:"vertical" }} />
      </div>
      <button className="btn-pri" style={{ width:"100%",justifyContent:"center" }} onClick={submit}>
        Book Free Consultation <Ic n="Arrow" s={14} />
      </button>
      <p style={{ fontSize:11,color:C.textL,textAlign:"center",marginTop:10 }}>No commitment. Response within 1 business day.</p>
    </div>
  )
}

// ─── DEMO MODAL CONTENT ───────────────────────────────────────────────────────
function DemoContent() {
  return (
    <div>
      <p style={{ fontSize:14,color:C.textM,marginBottom:20,lineHeight:1.7 }}>
        Get your hands-on with an AI-driven ERP solution; Maximize ROI, Accelerate Business Growth, and Bring Automation - Your Path to Success Starts Here.
      </p>
      <div style={{ background:C.bgSoft,borderRadius:16,aspectRatio:"16/9",display:"flex",alignItems:"center",justifyContent:"center",border:`1.5px solid ${C.border}`,marginBottom:20,cursor:"pointer",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,background:`linear-gradient(135deg,${C.blue}18,${C.purple}18)` }} />
        <div style={{ width:64,height:64,borderRadius:"50%",background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 28px rgba(0,87,184,.35)",position:"relative" }}>
          <Ic n="Play" s={24} style={{ color:"#fff",marginLeft:3 }} />
        </div>
      </div>
      <p style={{ fontSize:12,color:C.textL,textAlign:"center" }}>Or book a personalised live demo with a certified consultant.</p>
      <button className="btn-pri" style={{ width:"100%",justifyContent:"center",marginTop:12 }} onClick={() => scrollTo("contact")}>
        Book Live Demo <Ic n="Arrow" s={13} />
      </button>
    </div>
  )
}

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const GS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
    body{font-family:'Inter',sans-serif;background:#fff;color:${C.text};overflow-x:hidden}
    h1,h2,h3,h4,h5{font-family:'Plus Jakarta Sans',sans-serif;line-height:1.18}
    ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#f1f5f9}
    ::-webkit-scrollbar-thumb{background:linear-gradient(${C.blue},${C.purple});border-radius:5px}

    .rv{opacity:0;transform:translateY(26px);transition:opacity .6s cubic-bezier(.4,0,.2,1),transform .6s cubic-bezier(.4,0,.2,1)}
    .rv.vis{opacity:1;transform:none}
    .rv.d1{transition-delay:.08s}.rv.d2{transition-delay:.16s}.rv.d3{transition-delay:.24s}
    .rv.d4{transition-delay:.32s}.rv.d5{transition-delay:.4s}.rv.d6{transition-delay:.48s}

    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-11px)}}
    @keyframes floatR{0%,100%{transform:translateY(0)}50%{transform:translateY(11px)}}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(0,87,184,.22)}50%{box-shadow:0 0 0 14px rgba(0,87,184,0)}}
    @keyframes dropIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
    @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    @keyframes badgePop{0%{opacity:0;transform:scale(.82)}70%{transform:scale(1.04)}100%{opacity:1;transform:scale(1)}}
    @keyframes modalPop{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}

    .gtext{background:linear-gradient(135deg,${C.blue},${C.purple});-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .gtextO{background:linear-gradient(135deg,${C.orange},#ff9f1c);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .gtextT{background:linear-gradient(135deg,${C.teal},#00c6b3);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

    .btn-pri{display:inline-flex;align-items:center;gap:8px;padding:13px 26px;border-radius:50px;font-size:14px;font-weight:700;font-family:'Plus Jakarta Sans',sans-serif;color:#fff;background:linear-gradient(135deg,${C.blue},${C.purple});border:none;cursor:pointer;transition:all .26s ease;box-shadow:0 4px 18px rgba(0,87,184,.26)}
    .btn-pri:hover{transform:translateY(-3px);box-shadow:0 8px 32px rgba(0,87,184,.4)}
    .btn-pri:active{transform:translateY(-1px)}
    .btn-sec{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:50px;font-size:14px;font-weight:600;font-family:'Plus Jakarta Sans',sans-serif;color:${C.blue};background:#fff;border:2px solid ${C.blue};cursor:pointer;transition:all .26s ease}
    .btn-sec:hover{background:${C.blueL};transform:translateY(-2px)}
    .btn-sec:active{transform:translateY(0)}
    .btn-ghost{display:inline-flex;align-items:center;gap:6px;padding:10px 20px;border-radius:50px;font-size:13px;font-weight:600;color:${C.textM};background:transparent;border:1.5px solid ${C.border};cursor:pointer;transition:all .22s ease;font-family:'Plus Jakarta Sans',sans-serif}
    .btn-ghost:hover{border-color:${C.blue};color:${C.blue};background:${C.blueLL}}
    .btn-white{display:inline-flex;align-items:center;gap:8px;padding:13px 26px;border-radius:50px;font-size:14px;font-weight:700;font-family:'Plus Jakarta Sans',sans-serif;color:${C.blue};background:#fff;border:none;cursor:pointer;transition:all .26s ease;box-shadow:0 4px 18px rgba(0,0,0,.14)}
    .btn-white:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.2)}
    .btn-outline-white{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:50px;font-size:14px;font-weight:600;font-family:'Plus Jakarta Sans',sans-serif;color:#fff;background:rgba(255,255,255,.15);border:2px solid rgba(255,255,255,.4);cursor:pointer;transition:all .26s ease}
    .btn-outline-white:hover{background:rgba(255,255,255,.25);transform:translateY(-2px)}

    .card{background:#fff;border:1.5px solid ${C.border};border-radius:18px;transition:all .28s ease}
    .card:hover{border-color:${C.blueM};box-shadow:0 14px 44px rgba(0,87,184,.12);transform:translateY(-5px)}
    .card-flat{background:#fff;border:1.5px solid ${C.border};border-radius:18px}

    .chip{display:inline-flex;align-items:center;gap:6px;padding:5px 13px;border-radius:50px;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase}

    .nl{font-size:13.5px;font-weight:600;color:${C.textM};background:none;border:none;cursor:pointer;padding:6px 2px;position:relative;font-family:'Inter',sans-serif;transition:color .18s;display:flex;align-items:center;gap:3px;white-space:nowrap}
    .nl::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:2px;background:linear-gradient(135deg,${C.blue},${C.purple});transform:scaleX(0);transform-origin:left;transition:transform .2s;border-radius:2px}
    .nl:hover{color:${C.blue}}.nl:hover::after,.nl.active-nav::after{transform:scaleX(1)}
    .nl.active-nav{color:${C.blue}}

    .ann-bar{background:linear-gradient(135deg,${C.blue},${C.purple});color:#fff;text-align:center;padding:9px 16px;font-size:12px;font-weight:600;letter-spacing:.02em;font-family:'Plus Jakarta Sans',sans-serif;display:flex;align-items:center;justify-content:center;gap:12px}

    .mega{animation:dropIn .18s ease;position:absolute;top:calc(100% + 10px);background:#fff;border:1.5px solid ${C.border};border-radius:20px;box-shadow:0 20px 70px rgba(0,0,0,.12);overflow:hidden;z-index:9999}
    .mi{border-radius:11px;padding:9px 11px;cursor:pointer;transition:background .14s;display:flex;align-items:flex-start;gap:10px;background:none;border:none;width:100%;text-align:left}
    .mi:hover{background:${C.blueLL}}.mi-p:hover{background:${C.purpleL}!important}.mi-t:hover{background:${C.tealL}!important}.mi-o:hover{background:${C.orangeL}!important}
    .mega-feat{background:linear-gradient(135deg,${C.blue},${C.purple});border-radius:14px;padding:20px;color:#fff}

    .tab-btn{padding:9px 20px;border-radius:50px;font-size:13px;font-weight:600;cursor:pointer;border:2px solid transparent;font-family:'Plus Jakarta Sans',sans-serif;transition:all .2s}
    .tab-active{background:linear-gradient(135deg,${C.blue},${C.purple});color:#fff;box-shadow:0 4px 14px rgba(0,87,184,.26)}
    .tab-inactive{background:#fff;color:${C.textM};border-color:${C.border}}
    .tab-inactive:hover{border-color:${C.blue};color:${C.blue}}

    .step-dot{width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:17px;flex-shrink:0}

    .mob-link{display:block;width:100%;text-align:left;padding:12px 0;font-size:14px;font-weight:500;color:${C.textM};background:none;border:none;border-bottom:1px solid ${C.border};cursor:pointer;font-family:'Inter',sans-serif;transition:color .16s}
    .mob-link:hover{color:${C.blue}}

    .show-mob{display:none!important}
    @media(max-width:1100px){.show-mob{display:flex!important}.hide-desk{display:none!important}}
    @media(max-width:768px){
      .hero-g,.proc-g{grid-template-columns:1fr!important}
      .stats-g{grid-template-columns:1fr 1fr!important}
      .foot-g{grid-template-columns:1fr 1fr!important;gap:28px!important}
      .sol-g,.why-g,.chal-g{grid-template-columns:1fr 1fr!important}
      .ind-sel{grid-template-columns:1fr!important}
      .pbi-g{grid-template-columns:1fr!important}
    }
    @media(max-width:480px){
      .sol-g,.why-g,.chal-g,.stats-g,.foot-g{grid-template-columns:1fr!important}
    }

    .track{display:flex;gap:32px;animation:marquee 26s linear infinite;width:max-content}
    .track:hover{animation-play-state:paused}

    .foot-link{background:none;border:none;cursor:pointer;text-align:left;font-size:13px;color:#94a3b8;font-family:'Inter',sans-serif;transition:color .16s;padding:3px 0;display:block}
    .foot-link:hover{color:${C.blueM}}

    .acc-item{border:1.5px solid ${C.border};border-radius:14px;overflow:hidden;margin-bottom:10px;transition:border-color .2s}
    .acc-item.open{border-color:${C.blue}}
    .acc-trigger{display:flex;justify-content:space-between;align-items:center;padding:18px 20px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:${C.text}}
    .acc-body{padding:0 20px 18px;font-size:14px;color:${C.textM};line-height:1.75}

    .pricing-card{border-radius:22px;padding:32px 28px;border:2px solid ${C.border};background:#fff;transition:all .3s;position:relative}
    .pricing-card:hover{transform:translateY(-6px);box-shadow:0 20px 60px rgba(0,87,184,.14)}
    .pricing-card.featured{border-color:${C.blue};background:linear-gradient(160deg,${C.blueLL},#faf5ff)}

    .blog-card{border-radius:18px;overflow:hidden;border:1.5px solid ${C.border};background:#fff;transition:all .28s;cursor:pointer}
    .blog-card:hover{transform:translateY(-5px);box-shadow:0 14px 40px rgba(0,87,184,.1);border-color:${C.blueM}}

    .form-input{width:100%;padding:12px 16px;border-radius:12px;border:1.5px solid ${C.border};font-size:14px;color:${C.text};outline:none;transition:border-color .2s;background:#fff;font-family:'Inter',sans-serif}
    .form-input:focus{border-color:${C.blue}}
    .form-input::placeholder{color:${C.textL}}

    .soc-btn{width:34px;height:34px;border-radius:8px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s}
    .soc-btn:hover{background:rgba(255,255,255,.15)}

    .ind-sel-btn{display:flex;align-items:center;gap:12px;padding:14px 18px;border-radius:14px;border:2px solid transparent;cursor:pointer;text-align:left;transition:all .22s;width:100%;background:${C.bgSoft}}
    .ind-sel-btn:hover{border-color:rgba(0,87,184,.3)}
    .ind-sel-btn.active{border:2px solid var(--ic)}

    .learn-more-btn{display:flex;align-items:center;gap:5px;font-size:13px;font-weight:700;background:none;border:none;cursor:pointer;padding:0;transition:gap .2s}
    .learn-more-btn:hover{gap:9px}
  `}</style>
)

// ─── NAV DATA ─────────────────────────────────────────────────────────────────
const NAV = {
  solutions: {
    sections: [
      { heading:"ERP Solutions", color:C.blue, items:[
        {n:"Package",t:"Business Central",d:"An all-in-one business management solution for SMBs that offers a 360-degree holistic view of the entire business",tag:"Most Popular",section:"solutions"},
        {n:"Dollar",t:"Finance",d:"Simplify complex financial operations while getting real-time data analytics and accurate insights",section:"solutions"},
        {n:"Truck",t:"Supply Chain",d:"Automate your entire supply chain process, boost efficiency, cut costs, and gain real-time insights",section:"solutions"},
        {n:"Cart",t:"Commerce",d:"Unified omnichannel retail experience connecting sales, customers, and partners",section:"solutions"},
        {n:"Brief",t:"Project Operations",d:"Delivery, billing & resourcing for project-based businesses",section:"solutions"},
        {n:"Users",t:"Human Resources",d:"Modern HR, payroll & workforce management",section:"solutions"},
      ]},
      { heading:"CRM Solutions", color:C.purple, itemCls:"mi-p", items:[
        {n:"Headphones",t:"Customer Service",d:"Omnichannel support with AI-powered insights",section:"solutions"},
        {n:"Target",t:"Sales",d:"Track sales pipeline, get insights, maximize profit, and close more deals",section:"solutions"},
        {n:"Wrench",t:"Field Service",d:"Smart scheduling & predictive maintenance",section:"solutions"},
        {n:"Brain",t:"Customer Insights",d:"Unified profiles & AI-driven customer journeys",section:"solutions"},
        {n:"Megaphone",t:"Marketing",d:"Multi-channel campaigns and lead management",section:"solutions"},
      ]},
      { heading:"Power Platform", color:C.teal, itemCls:"mi-t", items:[
        {n:"Cpu",t:"Power Apps",d:"No-code / low-code app development",section:"solutions"},
        {n:"Zap",t:"Power Automate",d:"Automate workflows across 1000+ services",section:"solutions"},
        {n:"PieChart",t:"Power BI",d:"Analyze and visualize data with interactive graphical representations",section:"powerbi"},
        {n:"Globe",t:"Power Pages",d:"External-facing portals and websites",section:"solutions"},
      ]},
    ],
  },
  services:[
    {n:"Rocket",t:"D365 Implementation",d:"End-to-end deployment and go-live support",section:"process"},
    {n:"Layers",t:"Upgrade & Migration",d:"Move from NAV, AX, GP to modern Dynamics 365",section:"process"},
    {n:"Settings",t:"Customisation",d:"Extend D365 to match your unique processes",section:"process"},
    {n:"Globe",t:"Integration Services",d:"Connect with existing systems and third-party apps",section:"process"},
    {n:"LifeBuoy",t:"Managed Support",d:"24/7 SLA-backed support with named consultants",section:"process"},
    {n:"Users",t:"User Training",d:"Role-based training to maximize adoption",section:"process"},
    {n:"Award",t:"Health Check",d:"Audit & gap analysis of your current systems",section:"process"},
    {n:"Chart",t:"Analytics & BI",d:"Power BI dashboards and data visualization",section:"powerbi"},
  ],
  industries:[
    {n:"Truck",t:"Manufacturing",c:C.blue,bg:C.blueL,section:"industries"},
    {n:"Cart",t:"Retail & Commerce",c:C.orange,bg:C.orangeL,section:"industries"},
    {n:"Shield",t:"Financial Services",c:C.purple,bg:C.purpleL,section:"industries"},
    {n:"Brief",t:"Professional Services",c:C.teal,bg:C.tealL,section:"industries"},
    {n:"User",t:"Healthcare",c:C.green,bg:C.greenL,section:"industries"},
    {n:"Globe",t:"Logistics & Distribution",c:C.blue,bg:C.blueL,section:"industries"},
  ],
  company:[
    {n:"Award",t:"About Us",section:"about"},
    {n:"Users",t:"Our Team",section:"about"},
    {n:"Globe",t:"Global Presence",section:"contact"},
    {n:"Star",t:"Awards & Recognition",section:"about"},
    {n:"Brief",t:"Careers",section:"about"},
    {n:"Megaphone",t:"Press & Media",section:"blog"},
    {n:"LifeBuoy",t:"Partner Program",section:"contact"},
  ],
  offices:[
    {flag:"🇺🇸",city:"New York, USA",phone:"+1 800 938 7929"},
    {flag:"🇬🇧",city:"London, UK",phone:"+44 207 193 2502"},
    {flag:"🇨🇦",city:"Toronto, Canada",phone:"+1 778 381 5388"},
    {flag:"🇮🇳",city:"New Delhi, India",phone:"+91 96503 01529"},
  ],
}

// ─── HEADER ───────────────────────────────────────────────────────────────────
function Header({ openConsult, openDemo }) {
  const [sc, setSc] = useState(false)
  const [mob, setMob] = useState(false)
  const [open, setOpen] = useState(null)
  const [mobSec, setMobSec] = useState(null)
  const [ann, setAnn] = useState(true)
  const timers = useRef({})

  useEffect(() => {
    const h = () => setSc(window.scrollY > 8)
    window.addEventListener("scroll", h, { passive:true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mob ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mob])

  const openM  = k => { clearTimeout(timers.current[k]); setOpen(k) }
  const closeM = k => { timers.current[k] = setTimeout(() => setOpen(o => o===k?null:o), 160) }

  const navLink = (sectionId, label, e) => {
    e && e.preventDefault()
    setOpen(null); setMob(false)
    scrollTo(sectionId)
  }

  const iconBg = c => ({ background: c + "18" })

  // ── Mega: Solutions
  const MegaSolutions = () => (
    <div className="mega" style={{ left:0, transform:"none", width:900 }}>
      <div style={{ display:"grid", gridTemplateColumns:"1.1fr 1fr 0.9fr 230px" }}>
        {NAV.solutions.sections.map(sec => (
          <div key={sec.heading} style={{ padding:"22px 16px", borderRight:`1px solid ${C.border}` }}>
            <div style={{ fontSize:10, fontWeight:800, letterSpacing:".15em", color:sec.color, marginBottom:10 }}>{sec.heading.toUpperCase()}</div>
            {sec.items.map(it => (
              <button key={it.t} className={`mi ${sec.itemCls||""}`} onClick={() => navLink(it.section)}>
                <div style={{ width:30, height:30, borderRadius:8, ...iconBg(sec.color), display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Ic n={it.n} s={13} style={{ color:sec.color }} />
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:C.text, display:"flex", alignItems:"center", gap:6 }}>
                    {it.t}
                    {it.tag && <span style={{ fontSize:9, fontWeight:700, padding:"2px 6px", borderRadius:4, background:C.orange+"18", color:C.orange }}>{it.tag}</span>}
                  </div>
                  <div style={{ fontSize:11, color:C.textL, marginTop:1 }}>{it.d}</div>
                </div>
              </button>
            ))}
          </div>
        ))}
        <div style={{ padding:"22px 18px", background:C.bgSoft }}>
          <div className="mega-feat">
            <div style={{ fontSize:10, fontWeight:800, letterSpacing:".12em", color:"rgba(255,255,255,.7)", marginBottom:8 }}>✨ AI-POWERED</div>
            <div style={{ fontSize:15, fontWeight:800, color:"#fff", marginBottom:8, lineHeight:1.3 }}>AI-Driven ERP Solutions</div>
            <div style={{ fontSize:11.5, color:"rgba(255,255,255,.82)", lineHeight:1.6, marginBottom:14 }}>Get your hands-on with an AI-driven ERP solution; Maximize ROI, Accelerate Business Growth, and Bring Automation.</div>
            <button style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, fontWeight:700, color:"#fff", background:"rgba(255,255,255,.2)", border:"1.5px solid rgba(255,255,255,.35)", borderRadius:50, padding:"8px 14px", cursor:"pointer" }}
              onClick={() => navLink("solutions")}>
              Explore AI Solutions <Ic n="Arrow" s={11} />
            </button>
          </div>
          <div style={{ marginTop:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.textM, marginBottom:8 }}>QUICK LINKS</div>
            {[["Free Consultation","contact"],["Watch Demo","hero"],["View Pricing","solutions"]].map(([l,s]) => (
              <button key={l} onClick={() => l==="Free Consultation"?openConsult():l==="Watch Demo"?openDemo():navLink(s)}
                style={{ display:"flex", alignItems:"center", gap:6, fontSize:12.5, color:C.blue, background:"none", border:"none", cursor:"pointer", padding:"5px 0", fontWeight:500 }}>
                <Ic n="ChevR" s={11} /> {l}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding:"10px 20px", background:C.bgSoft, borderTop:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:11.5, color:C.textM }}>Browse all 15+ Microsoft Dynamics 365 applications</span>
        <button onClick={() => navLink("solutions")} style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, fontWeight:700, color:C.blue, background:"none", border:"none", cursor:"pointer" }}>
          View full portfolio <Ic n="Arrow" s={12} />
        </button>
      </div>
    </div>
  )

  // ── Mega: Services
  const MegaServices = () => (
    <div className="mega" style={{ left:0, transform:"none", width:640 }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
        {[NAV.services.slice(0,4), NAV.services.slice(4)].map((grp, gi) => (
          <div key={gi} style={{ padding:"22px 16px", borderRight: gi===0?`1px solid ${C.border}`:"none" }}>
            <div style={{ fontSize:10, fontWeight:800, letterSpacing:".15em", color:C.blue, marginBottom:10 }}>{gi===0?"IMPLEMENTATION":"SUPPORT & TRAINING"}</div>
            {grp.map(it => (
              <button key={it.t} className="mi" onClick={() => navLink(it.section)}>
                <div style={{ width:30, height:30, borderRadius:8, background:C.blueL, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Ic n={it.n} s={13} style={{ color:C.blue }} />
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{it.t}</div>
                  <div style={{ fontSize:11, color:C.textL, marginTop:1 }}>{it.d}</div>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
      <div style={{ padding:"14px 20px", background:C.bgSoft, borderTop:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontSize:12, color:C.textM }}>Free implementation assessment — 60 minutes, no commitment</span>
        <button className="btn-pri" style={{ padding:"8px 16px", fontSize:12 }} onClick={openConsult}>Book Free <Ic n="Arrow" s={11} /></button>
      </div>
    </div>
  )

  // ── Mega: Industries
  const MegaIndustries = () => (
    <div className="mega" style={{ left:"50%", transform:"translateX(-60%)", width:560 }}>
      <div style={{ padding:"20px 16px" }}>
        <div style={{ fontSize:10, fontWeight:800, letterSpacing:".15em", color:C.purple, marginBottom:12 }}>INDUSTRIES WE SERVE</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4 }}>
          {NAV.industries.map(it => (
            <button key={it.t} className="mi mi-p" onClick={() => navLink(it.section)}>
              <div style={{ width:30, height:30, borderRadius:8, background:it.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Ic n={it.n} s={13} style={{ color:it.c }} />
              </div>
              <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{it.t}</div>
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding:"12px 20px", borderTop:`1px solid ${C.border}`, background:C.bgSoft, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:11.5, color:C.textM }}>Tailored solutions across 12+ verticals</span>
        <button onClick={() => navLink("industries")} style={{ fontSize:12, fontWeight:700, color:C.purple, background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>See all <Ic n="Arrow" s={12} /></button>
      </div>
    </div>
  )

  // ── Mega: Resources
  const MegaResources = () => (
    <div className="mega" style={{ left:"50%", transform:"translateX(-50%)", width:560 }}>
      <div style={{ padding:"20px 16px" }}>
        <div style={{ fontSize:10, fontWeight:800, letterSpacing:".15em", color:C.teal, marginBottom:12 }}>RESOURCES</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4 }}>
          {[
            {n:"BookOpen",t:"Blog & Insights",s:"blog"},{n:"Video",t:"Webinars & Events",s:"blog"},
            {n:"FileText",t:"Case Studies",s:"testimonials"},{n:"Award",t:"White Papers",s:"blog"},
            {n:"Calc",t:"ERP Price Calculator",s:"contact"},{n:"PieChart",t:"ROI Calculator",s:"contact"},
            {n:"Rocket",t:"Migration Checklist",s:"process"},{n:"Check",t:"Implementation Guide",s:"process"},
          ].map(it => (
            <button key={it.t} className="mi mi-t" onClick={() => navLink(it.s)}>
              <div style={{ width:28, height:28, borderRadius:7, background:C.tealL, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Ic n={it.n} s={12} style={{ color:C.teal }} />
              </div>
              <div style={{ fontSize:12.5, fontWeight:600, color:C.text }}>{it.t}</div>
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding:"12px 20px", borderTop:`1px solid ${C.border}`, background:C.bgSoft, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize:11.5, color:C.textM }}>Free personalised Dynamics 365 demo</span>
        <button onClick={openDemo} style={{ fontSize:12, fontWeight:700, color:C.teal, background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>Book Demo <Ic n="Arrow" s={12} /></button>
      </div>
    </div>
  )

  // ── Mega: Company
  const MegaCompany = () => (
    <div className="mega" style={{ left:"50%", transform:"translateX(-50%)", width:540 }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 200px" }}>
        <div style={{ padding:"20px 16px", borderRight:`1px solid ${C.border}` }}>
          <div style={{ fontSize:10, fontWeight:800, letterSpacing:".15em", color:C.orange, marginBottom:10 }}>ABOUT US</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4 }}>
            {NAV.company.map(it => (
              <button key={it.t} className="mi mi-o" onClick={() => navLink(it.section)}>
                <div style={{ width:28, height:28, borderRadius:7, background:C.orangeL, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Ic n={it.n} s={12} style={{ color:C.orange }} />
                </div>
                <div style={{ fontSize:12, fontWeight:600, color:C.text }}>{it.t}</div>
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding:"20px 16px", background:C.bgSoft }}>
          <div style={{ fontSize:10, fontWeight:800, letterSpacing:".14em", color:C.textL, marginBottom:12 }}>OUR OFFICES</div>
          {NAV.offices.map(o => (
            <div key={o.city} onClick={() => navLink("contact")} style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:10, padding:"8px 10px", borderRadius:10, background:"#fff", border:`1px solid ${C.border}`, cursor:"pointer" }}>
              <span style={{ fontSize:18 }}>{o.flag}</span>
              <div>
                <div style={{ fontSize:12.5, fontWeight:700, color:C.text }}>{o.city}</div>
                <div style={{ fontSize:11, color:C.textM, marginTop:2 }}>{o.phone}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const megas = { solutions:<MegaSolutions/>, services:<MegaServices/>, industries:<MegaIndustries/>, resources:<MegaResources/>, company:<MegaCompany/> }
  const navItems = [
    {key:"solutions",label:"Solutions"},
    {key:"services",label:"Services"},
    {key:"industries",label:"Industries"},
    {key:"resources",label:"Resources"},
    {key:"company",label:"Company"},
  ]
  const MOB_SECS = [
    {label:"ERP Solutions",items:NAV.solutions.sections[0].items,c:C.blue},
    {label:"CRM Solutions",items:NAV.solutions.sections[1].items,c:C.purple},
    {label:"Power Platform",items:NAV.solutions.sections[2].items,c:C.teal},
    {label:"Services",items:NAV.services,c:C.blue},
    {label:"Industries",items:NAV.industries,c:C.orange},
    {label:"Company",items:NAV.company,c:C.orange},
  ]

  return (
    <>
      {ann && (
        <div className="ann-bar">
          <span>🚀 New: AI-powered Microsoft Cloud Solutions — helping 500+ worldwide businesses grow —</span>
          <button onClick={() => navLink("solutions")} style={{ background:"none",border:"none",color:"#fff",cursor:"pointer",textDecoration:"underline",fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,fontSize:12 }}>Learn more →</button>
          <button onClick={() => setAnn(false)} style={{ background:"none",border:"none",color:"rgba(255,255,255,.7)",cursor:"pointer",marginLeft:4,display:"flex",alignItems:"center" }}><Ic n="X" s={13}/></button>
        </div>
      )}

      <header style={{ position:"sticky",top:0,left:0,right:0,zIndex:8000,background:sc?"rgba(255,255,255,.97)":"#fff",borderBottom:`1.5px solid ${C.border}`,backdropFilter:sc?"blur(16px)":"none",boxShadow:sc?"0 2px 20px rgba(0,0,0,.07)":"none",transition:"all .28s" }}>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px",height:66,display:"flex",alignItems:"center",gap:20 }}>

          {/* Logo */}
          <button onClick={() => scrollTo("hero")} style={{ display:"flex",alignItems:"center",gap:10,textDecoration:"none",flexShrink:0,background:"none",border:"none",cursor:"pointer" }}>
            <div style={{ width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(0,87,184,.28)",flexShrink:0 }}>
              <span style={{ color:"#fff",fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:16 }}>D</span>
            </div>
            <div>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:15,letterSpacing:"-.2px",lineHeight:1 }}>
                <span className="gtext">DYNAMICS</span><span style={{ color:C.text }}> SQUARE™</span>
              </div>
              <div style={{ fontSize:9,fontWeight:700,color:C.textL,letterSpacing:".1em",marginTop:1 }}>MICROSOFT DYNAMICS PARTNER</div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hide-desk" style={{ display:"flex",alignItems:"center",gap:4,flex:1,justifyContent:"center" }}>
            {navItems.map(item => (
              <div key={item.key} style={{ position:"relative" }} onMouseEnter={() => openM(item.key)} onMouseLeave={() => closeM(item.key)}>
                <button className={`nl ${open===item.key?"active-nav":""}`}>
                  {item.label}
                  <Ic n="ChevD" s={12} style={{ transition:"transform .18s",transform:open===item.key?"rotate(180deg)":"none",marginTop:1 }} />
                </button>
                {open===item.key && (
                  <div onMouseEnter={() => openM(item.key)} onMouseLeave={() => closeM(item.key)}>
                    {megas[item.key]}
                  </div>
                )}
              </div>
            ))}
            <button className="nl" style={{ marginLeft:4 }} onClick={() => navLink("contact")}>Contact</button>
          </nav>

          {/* Desktop CTAs */}
          <div className="hide-desk" style={{ display:"flex",alignItems:"center",gap:10,flexShrink:0 }}>
            <a href="tel:+18009387929" className="btn-ghost"><Ic n="Phone" s={13} /> +1 800 938 7929</a>
            <button className="btn-pri" style={{ padding:"10px 20px",fontSize:13 }} onClick={openConsult}>Free Consultation <Ic n="Arrow" s={13} /></button>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMob(o => !o)} className="show-mob" style={{ marginLeft:"auto",padding:"7px 8px",borderRadius:10,background:C.bgAlt,border:`1.5px solid ${C.border}`,color:C.textM,cursor:"pointer" }}>
            <Ic n={mob?"X":"Menu"} s={20} />
          </button>
        </div>

        {/* Mobile drawer */}
        <div style={{ maxHeight:mob?"85vh":0,overflow:"auto",transition:"max-height .32s ease",background:"#fff",borderTop:mob?`1.5px solid ${C.border}`:"none" }}>
          <div style={{ padding:"12px 20px 32px" }}>
            {MOB_SECS.map(sec => (
              <div key={sec.label}>
                <button onClick={() => setMobSec(mobSec===sec.label?null:sec.label)} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",background:"none",border:"none",borderBottom:`1px solid ${C.border}`,cursor:"pointer",padding:"12px 0" }}>
                  <span style={{ fontSize:13,fontWeight:700,color:sec.c }}>{sec.label}</span>
                  <Ic n="ChevD" s={14} style={{ color:C.textL,transition:"transform .2s",transform:mobSec===sec.label?"rotate(180deg)":"none" }} />
                </button>
                {mobSec===sec.label && (
                  <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,padding:"10px 0 6px" }}>
                    {sec.items.map(it => (
                      <button key={it.t} onClick={() => { navLink(it.section||"solutions"); setMobSec(null) }}
                        style={{ display:"flex",alignItems:"center",gap:7,padding:"8px 10px",borderRadius:10,background:C.bgSoft,border:`1px solid ${C.border}`,cursor:"pointer",textAlign:"left" }}>
                        <Ic n={it.n} s={12} style={{ color:sec.c,flexShrink:0 }} />
                        <span style={{ fontSize:11.5,fontWeight:500,color:C.textM }}>{it.t}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button className="mob-link" onClick={() => navLink("contact")}>Contact Us</button>
            <div style={{ display:"flex",flexDirection:"column",gap:10,marginTop:16 }}>
              <button className="btn-pri" style={{ justifyContent:"center" }} onClick={openConsult}>Free Consultation <Ic n="Arrow" s={14} /></button>
              <a href="tel:+18009387929" className="btn-sec" style={{ justifyContent:"center",textDecoration:"none" }}><Ic n="Phone" s={13} /> +1 800 938 7929</a>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ openConsult, openDemo }) {
  const bars = [55,80,42,92,68,97,58,76,88,63]
  const [bv, setBv] = useState(false)
  useEffect(() => { setTimeout(() => setBv(true), 600) }, [])

  return (
    <section id="hero" style={{ background:"linear-gradient(160deg,#f0f7ff 0%,#faf5ff 50%,#fff7f2 100%)",minHeight:"90vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",top:-100,right:-60,width:520,height:520,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,113,243,.07),transparent 70%)",pointerEvents:"none" }} />
      <div style={{ position:"absolute",bottom:-80,left:-60,width:440,height:440,borderRadius:"50%",background:"radial-gradient(circle,rgba(108,60,225,.06),transparent 70%)",pointerEvents:"none" }} />
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"60px 24px",width:"100%" }}>
        <div className="hero-g" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,alignItems:"center" }}>
          <div>
            <div style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"5px 14px",borderRadius:50,background:C.blueL,border:`1.5px solid ${C.blue}22`,fontSize:12,fontWeight:700,color:C.blue,marginBottom:20,animation:"badgePop .5s ease" }}>
              <span style={{ background:`linear-gradient(135deg,${C.blue},${C.purple})`,borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <Ic n="Star" s={9} style={{ color:"#fff",fill:"#fff" }} />
              </span>
              Microsoft Dynamics Partner · Connected with 500+ Global Businesses
            </div>
            <h1 style={{ fontSize:"clamp(2rem,4.2vw,3.2rem)",fontWeight:800,color:C.text,marginBottom:20,lineHeight:1.15 }}>
              USA's Leading <span className="gtext">Microsoft Dynamics Partner</span>
            </h1>
            <p style={{ fontSize:15.5,color:C.textM,lineHeight:1.78,marginBottom:32,maxWidth:510 }}>
              Get your hands-on with an AI-driven ERP solution; Maximize ROI, Accelerate Business Growth, and Bring Automation - Your Path to Success Starts Here.
            </p>
            <div style={{ display:"flex",gap:12,flexWrap:"wrap",marginBottom:36 }}>
              <button className="btn-pri" onClick={openConsult}>Free Consultation <Ic n="Arrow" s={14} /></button>
              <button className="btn-sec" onClick={openDemo}><Ic n="Play" s={13} /> Watch Demo</button>
            </div>
            <div style={{ display:"flex",gap:14,flexWrap:"wrap" }}>
              {[{v:"500+",l:"Global Businesses",bg:C.blueL,c:C.blue},{v:"150+",l:"Consultants",bg:C.purpleL,c:C.purple},{v:"Gold",l:"MS Partner",bg:C.orangeL,c:C.orange},{v:"99.9%",l:"Uptime SLA",bg:C.tealL,c:C.teal}].map(b => (
                <div key={b.l} style={{ background:b.bg,borderRadius:13,padding:"11px 16px",textAlign:"center",minWidth:72 }}>
                  <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:20,color:b.c }}>{b.v}</div>
                  <div style={{ fontSize:10.5,fontWeight:600,color:C.textM,marginTop:1,whiteSpace:"nowrap" }}>{b.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute",top:-20,left:-10,zIndex:10,background:"#fff",borderRadius:13,padding:"9px 14px",boxShadow:"0 6px 28px rgba(0,87,184,.14)",border:`1.5px solid ${C.border}`,animation:"float 3.5s ease-in-out infinite",display:"flex",alignItems:"center",gap:7 }}>
              <div style={{ width:7,height:7,borderRadius:"50%",background:C.green,animation:"pulse 2s infinite" }} />
              <span style={{ fontSize:12,fontWeight:700,color:C.text }}>✨ AI-Driven ERP</span>
            </div>
            <div style={{ position:"absolute",bottom:20,right:-14,zIndex:10,background:"#fff",borderRadius:13,padding:"9px 14px",boxShadow:"0 6px 28px rgba(108,60,225,.13)",border:`1.5px solid ${C.border}`,animation:"floatR 3.8s ease-in-out infinite",display:"flex",alignItems:"center",gap:7 }}>
              <Ic n="Shield" s={13} style={{ color:C.purple }} /> <span style={{ fontSize:12,fontWeight:700,color:C.text }}>Azure-Secured</span>
            </div>
            <div style={{ background:"#fff",borderRadius:22,boxShadow:"0 18px 70px rgba(0,87,184,.13)",border:`1.5px solid ${C.border}`,overflow:"hidden" }}>
              <div style={{ padding:"16px 20px",background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:10,fontWeight:700,color:"rgba(255,255,255,.7)",letterSpacing:".1em" }}>DYNAMICS 365 LIVE DASHBOARD</div>
                  <div style={{ fontSize:14,fontWeight:700,color:"#fff",marginTop:2 }}>AI-Driven Business Overview</div>
                </div>
                <div style={{ background:"rgba(255,255,255,.2)",borderRadius:7,padding:"3px 9px",fontSize:10,color:"#fff",fontWeight:700,display:"flex",alignItems:"center",gap:5 }}>
                  <span style={{ width:6,height:6,borderRadius:"50%",background:"#4ade80",display:"inline-block",animation:"pulse 2s infinite" }} /> LIVE
                </div>
              </div>
              <div style={{ padding:"16px 20px" }}>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14 }}>
                  {[{l:"Total Revenue",v:"$8.4M",d:"+23%",c:C.blue,bg:C.blueL},{l:"Active Customers",v:"3,214",d:"+11%",c:C.purple,bg:C.purpleL},{l:"Efficiency Rate",v:"97.1%",d:"+8%",c:C.teal,bg:C.tealL},{l:"Cost Reduction",v:"54%",d:"+54%",c:C.orange,bg:C.orangeL}].map(k => (
                    <div key={k.l} style={{ background:k.bg,borderRadius:12,padding:"12px 14px" }}>
                      <div style={{ fontSize:10,fontWeight:600,color:C.textM,marginBottom:3 }}>{k.l}</div>
                      <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:20,color:k.c }}>{k.v}</div>
                      <div style={{ fontSize:10,fontWeight:700,color:C.green,marginTop:2 }}>▲ {k.d}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background:C.bgSoft,borderRadius:12,padding:"12px 14px" }}>
                  <div style={{ fontSize:10,fontWeight:700,color:C.textM,marginBottom:8 }}>MONTHLY PERFORMANCE</div>
                  <div style={{ display:"flex",alignItems:"flex-end",gap:4,height:52 }}>
                    {bars.map((h,i) => (
                      <div key={i} style={{ flex:1,borderRadius:3,background:i===9?`linear-gradient(180deg,${C.blue},${C.purple})`:`rgba(0,87,184,${0.1+h/400})`,height:`${bv?h:0}%`,transition:`height .8s cubic-bezier(.34,1.56,.64,1) ${i*60}ms` }} />
                    ))}
                  </div>
                  <div style={{ fontSize:10,color:C.green,fontWeight:700,marginTop:7,display:"flex",alignItems:"center",gap:5 }}>
                    <span style={{ width:6,height:6,borderRadius:"50%",background:C.green,display:"inline-block" }} /> All modules running — 99.9% uptime
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll cue */}
        <div style={{ textAlign:"center",marginTop:48,display:"flex",flexDirection:"column",alignItems:"center",gap:8 }}>
          <span style={{ fontSize:11,fontWeight:600,color:C.textL,letterSpacing:".1em",textTransform:"uppercase" }}>Scroll to explore</span>
          <button onClick={() => scrollTo("trust")} style={{ background:"none",border:`1.5px solid ${C.border}`,borderRadius:"50%",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",animation:"float 2s ease-in-out infinite" }}>
            <Ic n="ChevD" s={16} style={{ color:C.textM }} />
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── TRUST BAR ────────────────────────────────────────────────────────────────
function Trust() {
  const logos = ["Manufacturing Today","Clutch","Forbes Technology Council","Tech Partner Awards","ERPSoftwareBlog","Microsoft Partner","Global Businesses","Digital Transformation"]
  const doubled = [...logos,...logos]
  return (
    <section id="trust" style={{ background:"#fff",borderTop:`1.5px solid ${C.border}`,borderBottom:`1.5px solid ${C.border}`,padding:"22px 0",overflow:"hidden" }}>
      <div style={{ textAlign:"center",fontSize:10,fontWeight:700,letterSpacing:".14em",color:C.textL,marginBottom:14,textTransform:"uppercase" }}>Featured On Respected Platforms</div>
      <div style={{ overflow:"hidden" }}>
        <div className="track">
          {doubled.map((l,i) => (
            <div key={i} style={{ display:"flex",alignItems:"center",gap:9,padding:"7px 20px",borderRadius:9,border:`1px solid ${C.border}`,whiteSpace:"nowrap",flexShrink:0 }}>
              <div style={{ width:24,height:24,borderRadius:6,background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <span style={{ color:"#fff",fontSize:10,fontWeight:800 }}>{l[0]}</span>
              </div>
              <span style={{ fontSize:12.5,fontWeight:600,color:C.textM }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function Stats() {
  const ref = useReveal()
  const items = [
    {target:82,suffix:"%",label:"Businesses Meet Expected ROI",sub:"Post-implementation success rate",color:C.blue},
    {target:2,suffix:"x",label:"Productivity Increase",sub:"Due to centralized data structure",color:C.purple},
    {target:46,suffix:"%",label:"Improved Cost Saving",sub:"After upgrading to Microsoft ERP",color:C.orange},
    {target:350,suffix:"+",label:"Clients Served",sub:"Across 12+ industry verticals",color:C.teal},
    {target:99,suffix:".9%",label:"Platform Uptime",sub:"Azure-backed SLA guarantee",color:C.green},
    {target:150,suffix:"+",label:"Certified Consultants",sub:"ERP, CRM & Power Platform",color:C.blue},
    {target:3,suffix:"x",label:"Average First-Year ROI",sub:"Post-implementation surveys",color:C.purple},
  ]
  return (
    <section id="stats" ref={ref} style={{ background:`linear-gradient(160deg,${C.blueLL},#faf5ff)`,padding:"88px 0" }}>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <div className="rv" style={{ textAlign:"center",marginBottom:48 }}>
          <div className="chip" style={{ background:C.blueL,color:C.blue,marginBottom:12 }}>Proven Track Record</div>
          <h2 style={{ fontSize:"clamp(1.7rem,3.2vw,2.4rem)",fontWeight:800,color:C.text }}>Businesses Got <span className="gtext">Exclusive Results</span></h2>
        </div>
        <div className="stats-g rv" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))",gap:16 }}>
          {items.map(it => {
            const { val, ref: r } = useCounter(it.target)
            return (
              <div key={it.label} ref={r} className="card" style={{ padding:"28px 20px",textAlign:"center" }}>
                <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:38,color:it.color,lineHeight:1 }}>{val}{it.suffix}</div>
                <div style={{ fontWeight:700,fontSize:13,color:C.text,marginTop:8 }}>{it.label}</div>
                <div style={{ fontSize:11.5,color:C.textL,marginTop:4 }}>{it.sub}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── SOLUTIONS ────────────────────────────────────────────────────────────────
function Solutions({ openConsult }) {
  const [tab, setTab] = useState("erp")
  const ref = useReveal()
  const data = {
    erp:[
      {n:"Package",t:"Business Central",d:"An all-in-one business management solution specifically designed for SMBs and startups that offers a 360-degree holistic view of the entire business with full transparency.",c:C.blue,bg:C.blueL,tag:"Most Popular"},
      {n:"Dollar",t:"Finance",d:"Simplify complex financial operations while getting real-time data analytics and accurate insights. Avail automation, minimize investment costs, and monitor financial processes.",c:C.purple,bg:C.purpleL},
      {n:"Truck",t:"Supply Chain",d:"Automate your entire supply chain process. Boost efficiency, cut costs, enhance accuracy, gain real-time insights, and improve customer service.",c:C.teal,bg:C.tealL},
      {n:"Cart",t:"Commerce",d:"POS, e-commerce, back-office stock and loyalty programmes all in real time. Consistent experience wherever customers shop.",c:C.orange,bg:C.orangeL},
      {n:"Brief",t:"Project Operations",d:"Connect your CRM pipeline to project delivery — resource allocation, timesheets, subcontractor billing and client invoicing.",c:C.blue,bg:C.blueL},
      {n:"Users",t:"Human Resources",d:"Full employee lifecycle — benefits, performance reviews, learning paths and absence tracking.",c:C.purple,bg:C.purpleL},
    ],
    crm:[
      {n:"Headphones",t:"Customer Service",d:"Routes cases intelligently across email, chat, voice and social — with AI surfacing the right answers before your agent even has to search.",c:C.blue,bg:C.blueL},
      {n:"Target",t:"Sales",d:"Get an omnichannel connection between the sales team, customers, and partners. Track the sales pipeline, get insights, maximize profit, and close more deals.",c:C.purple,bg:C.purpleL},
      {n:"Wrench",t:"Field Service",d:"Intelligent scheduling, predictive maintenance alerts and a mobile app technicians will actually use.",c:C.teal,bg:C.tealL},
      {n:"Brain",t:"Customer Insights",d:"Unify CRM, ERP, e-commerce and marketing into consent-based profiles. AI segmentation and journey orchestration at scale.",c:C.orange,bg:C.orangeL},
      {n:"Megaphone",t:"Marketing",d:"Personalised multi-channel campaigns, lead scoring, event management and real-time customer journey orchestration.",c:C.blue,bg:C.blueL},
    ],
    power:[
      {n:"Cpu",t:"Power Apps",d:"Build custom business apps with no-code/low-code tools. Extend Dynamics 365 exactly the way your business works.",c:C.blue,bg:C.blueL},
      {n:"Zap",t:"Power Automate",d:"Automate approval chains, data sync, notifications and complex multi-step workflows across 1000+ services.",c:C.purple,bg:C.purpleL},
      {n:"PieChart",t:"Power BI",d:"Analyze and visualize the huge stack of data with interactive graphical representations to make data-driven decisions in real-time.",c:C.teal,bg:C.tealL},
      {n:"Globe",t:"Power Pages",d:"Build secure, data-driven external websites — partner portals, customer self-service hubs — with no-code tools.",c:C.orange,bg:C.orangeL},
    ],
  }
  const items = data[tab]
  return (
    <section id="solutions" ref={ref} style={{ background:"#fff",padding:"88px 0" }}>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <div className="rv" style={{ textAlign:"center",marginBottom:44 }}>
          <div className="chip" style={{ background:C.blueL,color:C.blue,marginBottom:12 }}>Get the Best Solutions</div>
          <h2 style={{ fontSize:"clamp(1.7rem,3.2vw,2.4rem)",fontWeight:800,color:C.text }}>Microsoft Dynamics 365 <span className="gtext">Solutions for Business Growth</span></h2>
          <p style={{ fontSize:15,color:C.textM,marginTop:10,maxWidth:540,margin:"10px auto 0" }}>Automate your business, simplify operations, and redefine the way you deal with new opportunities.</p>
        </div>
        <div className="rv" style={{ display:"flex",gap:10,justifyContent:"center",marginBottom:36,flexWrap:"wrap" }}>
          {[{id:"erp",l:"ERP Solutions"},{id:"crm",l:"CRM Solutions"},{id:"power",l:"Power Platform"}].map(t => (
            <button key={t.id} className={`tab-btn ${tab===t.id?"tab-active":"tab-inactive"}`} onClick={() => setTab(t.id)}>{t.l}</button>
          ))}
        </div>
        <div className="sol-g rv" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:20 }}>
          {items.map(it => (
            <div key={it.t} className="card" style={{ padding:"26px 24px",display:"flex",flexDirection:"column",gap:12 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                <div style={{ width:46,height:46,borderRadius:13,background:it.bg,display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <Ic n={it.n} s={21} style={{ color:it.c }} />
                </div>
                {it.tag && <span style={{ fontSize:9.5,fontWeight:800,padding:"3px 8px",borderRadius:6,background:C.orangeL,color:C.orange }}>{it.tag}</span>}
              </div>
              <h3 style={{ fontSize:15.5,fontWeight:700,color:C.text }}>{it.t}</h3>
              <p style={{ fontSize:13,color:C.textM,lineHeight:1.7 }}>{it.d}</p>
              <button className="learn-more-btn" style={{ color:it.c,marginTop:"auto" }} onClick={openConsult}>
                Get Started <Ic n="Arrow" s={12} style={{ color:it.c }} />
              </button>
            </div>
          ))}
        </div>
        <div className="rv" style={{ textAlign:"center",marginTop:36 }}>
          <button className="btn-sec" onClick={openConsult}>Talk to a specialist about your specific needs <Ic n="Arrow" s={13} /></button>
        </div>
      </div>
    </section>
  )
}

// ─── INDUSTRIES ───────────────────────────────────────────────────────────────
function Industries({ openConsult }) {
  const [active, setActive] = useState(0)
  const ref = useReveal()
  const items = [
    {n:"Truck",t:"Manufacturing",d:"Production planning, BOM management, shop floor tracking, quality control and procurement automation.",points:["Bill of Materials & production scheduling","MRP & demand forecasting","Quality control & traceability","Procurement & supplier portals","Real-time shop floor visibility","Cost accounting & variance analysis"],c:C.blue,bg:C.blueL},
    {n:"Cart",t:"Retail & Commerce",d:"Unified POS, e-commerce, supply chain and loyalty programmes. One back-office for every channel.",points:["Unified POS & e-commerce","Multi-channel inventory management","Customer loyalty programmes","Promotions & pricing engine","Supplier collaboration","Returns & refund management"],c:C.orange,bg:C.orangeL},
    {n:"Shield",t:"Financial Services",d:"Automated compliance, precise CRM, real-time portfolio visibility and a full audit trail.",points:["Client relationship management","Regulatory compliance automation","Portfolio & investment tracking","Full audit trail & reporting","KYC & AML workflows","Real-time financial dashboards"],c:C.purple,bg:C.purpleL},
    {n:"Brief",t:"Professional Services",d:"Win bids, staff projects optimally, track every hour, invoice accurately and understand profitability.",points:["Opportunity & bid management","Resource scheduling","Time & expense tracking","Project P&L visibility","Client invoicing automation","Subcontractor management"],c:C.teal,bg:C.tealL},
    {n:"User",t:"Healthcare",d:"Patient engagement, admin workflow automation, medical supply chain and HIPAA-compliant data handling.",points:["Patient relationship management","Medical supply chain","Admin workflow automation","HIPAA-compliant data","Appointment scheduling","Staff management & compliance"],c:C.green,bg:C.greenL},
    {n:"Globe",t:"Logistics & Distribution",d:"Real-time freight visibility, intelligent WMS, automated replenishment and resilient supplier networks.",points:["Real-time freight tracking","Warehouse management system","Automated stock replenishment","Supplier network management","Route optimisation","Returns & reverse logistics"],c:C.blue,bg:C.blueL},
  ]
  return (
    <section id="industries" ref={ref} style={{ background:C.bgSoft,padding:"88px 0" }}>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <div className="rv" style={{ textAlign:"center",marginBottom:48 }}>
          <div className="chip" style={{ background:C.tealL,color:C.teal,marginBottom:12 }}>Industry Expertise</div>
          <h2 style={{ fontSize:"clamp(1.7rem,3.2vw,2.4rem)",fontWeight:800,color:C.text }}>Tailored for <span className="gtextT">Your Industry</span></h2>
          <p style={{ fontSize:15,color:C.textM,marginTop:10,maxWidth:520,margin:"10px auto 0" }}>Deep sector knowledge matters as much as technical skill. We know your pain points before the first call.</p>
        </div>
        <div className="ind-sel rv" style={{ display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:28 }}>
          <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
            {items.map((it,i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{ display:"flex",alignItems:"center",gap:12,padding:"14px 18px",borderRadius:14,background:active===i?it.c+"12":C.bgSoft,border:`2px solid ${active===i?it.c:"transparent"}`,cursor:"pointer",textAlign:"left",transition:"all .22s",width:"100%" }}>
                <div style={{ width:36,height:36,borderRadius:10,background:active===i?it.bg:"rgba(0,0,0,.05)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .22s" }}>
                  <Ic n={it.n} s={16} style={{ color:active===i?it.c:C.textL }} />
                </div>
                <span style={{ fontSize:14,fontWeight:700,color:active===i?it.c:C.text }}>{it.t}</span>
                <Ic n="ChevR" s={14} style={{ color:active===i?it.c:C.textL,marginLeft:"auto" }} />
              </button>
            ))}
          </div>
          <div style={{ background:"#fff",borderRadius:22,padding:"32px 28px",border:`1.5px solid ${C.border}` }}>
            <div style={{ width:52,height:52,borderRadius:14,background:items[active].bg,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:18 }}>
              <Ic n={items[active].n} s={26} style={{ color:items[active].c }} />
            </div>
            <h3 style={{ fontSize:22,fontWeight:800,color:C.text,marginBottom:12 }}>{items[active].t}</h3>
            <p style={{ fontSize:14,color:C.textM,lineHeight:1.75,marginBottom:22 }}>{items[active].d}</p>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24 }}>
              {items[active].points.map((pt,j) => (
                <div key={j} style={{ display:"flex",alignItems:"flex-start",gap:8 }}>
                  <div style={{ width:20,height:20,borderRadius:"50%",background:items[active].bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1 }}>
                    <Ic n="Check" s={10} style={{ color:items[active].c }} />
                  </div>
                  <span style={{ fontSize:13,color:C.textM,lineHeight:1.5 }}>{pt}</span>
                </div>
              ))}
            </div>
            <button className="btn-pri" onClick={openConsult}
              style={{ background:`linear-gradient(135deg,${items[active].c},${items[active].c}cc)` }}>
              Explore {items[active].t} Solutions <Ic n="Arrow" s={13} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── PROCESS ─────────────────────────────────────────────────────────────────
function Process({ openConsult }) {
  const [active, setActive] = useState(0)
  const ref = useReveal()
  const steps = [
    {num:"01",n:"Brain",t:"Discover & Plan",c:C.blue,pts:["In-depth audit of your current business processes","Identify operational gaps and high-impact opportunities","Define project scope, KPIs and success criteria","Build a realistic, phased implementation roadmap"]},
    {num:"02",n:"Settings",t:"Design Blueprint",c:C.purple,pts:["Map your processes to the right Dynamics 365 modules","Design data architecture and migration strategy","Define integration points and automation workflows","Sign off on solution design with all stakeholders"]},
    {num:"03",n:"Cpu",t:"Build & Configure",c:C.teal,pts:["Configure Dynamics 365 to your blueprint","Build any extensions and integrations required","Migrate and validate your historical data","Internal QA at every stage — not just at the end"]},
    {num:"04",n:"Check",t:"Test & Launch",c:C.orange,pts:["User acceptance testing with your actual team","Performance and security load testing","Role-based training delivered in your context","Dedicated go-live support — we're there on the day"]},
    {num:"05",n:"Trend",t:"Optimise Ongoing",c:C.green,pts:["24/7 post go-live monitoring and incident response","Regular system health reviews and proactive upgrades","Monthly optimisation sessions as your business evolves","SLA-backed support — a named person, not a ticket queue"]},
  ]
  return (
    <section id="process" ref={ref} style={{ background:"#fff",padding:"88px 0" }}>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <div className="rv" style={{ textAlign:"center",marginBottom:52 }}>
          <div className="chip" style={{ background:C.tealL,color:C.teal,marginBottom:12 }}>Our Process</div>
          <h2 style={{ fontSize:"clamp(1.7rem,3.2vw,2.4rem)",fontWeight:800,color:C.text }}>A Proven Path from <span className="gtext">Vision to Value</span></h2>
          <p style={{ fontSize:15,color:C.textM,marginTop:10,maxWidth:520,margin:"10px auto 0" }}>Refined across 350+ deployments. No surprises — structured delivery that gets you live on time.</p>
        </div>
        <div className="proc-g rv" style={{ display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:44 }}>
          <div style={{ display:"flex",flexDirection:"column",gap:5 }}>
            {steps.map((s,i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{ display:"flex",alignItems:"center",gap:14,padding:"14px 18px",borderRadius:14,background:active===i?s.c+"12":C.bgSoft,border:`2px solid ${active===i?s.c:"transparent"}`,cursor:"pointer",textAlign:"left",transition:"all .22s" }}>
                <div className="step-dot" style={{ background:active===i?s.c:C.bgAlt,color:active===i?"#fff":C.textM,fontSize:14,transition:"all .22s" }}>{s.num}</div>
                <span style={{ fontSize:14,fontWeight:700,color:active===i?s.c:C.text }}>{s.t}</span>
                <Ic n="ChevR" s={14} style={{ color:active===i?s.c:C.textL,marginLeft:"auto" }} />
              </button>
            ))}
          </div>
          <div style={{ background:C.bgSoft,borderRadius:22,padding:"32px 28px",border:`1.5px solid ${C.border}` }}>
            <div style={{ width:50,height:50,borderRadius:14,background:steps[active].c+"18",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16 }}>
              <Ic n={steps[active].n} s={24} style={{ color:steps[active].c }} />
            </div>
            <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:10,color:steps[active].c,letterSpacing:".12em",marginBottom:5 }}>STEP {steps[active].num}</div>
            <h3 style={{ fontSize:21,fontWeight:800,color:C.text,marginBottom:18 }}>{steps[active].t}</h3>
            <div style={{ display:"flex",flexDirection:"column",gap:11 }}>
              {steps[active].pts.map((pt,j) => (
                <div key={j} style={{ display:"flex",alignItems:"flex-start",gap:10 }}>
                  <div style={{ width:20,height:20,borderRadius:"50%",background:steps[active].c+"18",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1 }}>
                    <Ic n="Check" s={11} style={{ color:steps[active].c }} />
                  </div>
                  <span style={{ fontSize:13.5,color:C.textM,lineHeight:1.65 }}>{pt}</span>
                </div>
              ))}
            </div>
            <button className="btn-pri" style={{ marginTop:24 }} onClick={openConsult}>Start Your Journey <Ic n="Arrow" s={13} /></button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── POWER BI ─────────────────────────────────────────────────────────────────
function PowerBI({ openConsult }) {
  const ref = useReveal()
  const plans = [
    {name:"Power BI Desktop",badge:"FREE TO START",badgeC:C.green,badgeBg:C.greenL,cta:"Get Started Free",featured:false,features:["Self-service data prep — no code required","100+ chart types, visuals and mapping options","Connect to Excel, SQL, Dynamics 365 and 100+ more","Publish reports directly to Power BI Service","Daily scheduled refresh","Share reports internally"]},
    {name:"Power BI Premium",badge:"ENTERPRISE",badgeC:C.blue,badgeBg:C.blueL,cta:"Talk to Our BI Team",featured:true,features:["Unlimited report sharing — no per-user licence limits","AI-powered natural language Q&A across all data","Paginated reports for pixel-perfect financial printing","Advanced dataflows & composite models","Real-time streaming dashboards with alerts","Dedicated capacity — 99.9% SLA guaranteed"]},
  ]
  return (
    <section id="powerbi" ref={ref} style={{ background:`linear-gradient(160deg,${C.blueLL},#faf5ff)`,padding:"88px 0" }}>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <div className="rv" style={{ textAlign:"center",marginBottom:52 }}>
          <div className="chip" style={{ background:C.orangeL,color:C.orange,marginBottom:12 }}>Analytics & Intelligence</div>
          <h2 style={{ fontSize:"clamp(1.7rem,3.2vw,2.4rem)",fontWeight:800,color:C.text }}>
            Transform Your Data with <span className="gtextO">Microsoft Power BI</span>
          </h2>
          <p style={{ fontSize:15,color:C.textM,marginTop:12,maxWidth:560,margin:"12px auto 0" }}>
            Analyze and visualize the huge stack of data with interactive graphical representations to make data-driven decisions in real-time. Transform your data to make it accessible and valuable.
          </p>
        </div>
        <div className="pbi-g rv" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,maxWidth:900,margin:"0 auto" }}>
          {plans.map(p => (
            <div key={p.name} className={`pricing-card${p.featured?" featured":""}`}>
              {p.featured && <div style={{ position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:`linear-gradient(135deg,${C.blue},${C.purple})`,color:"#fff",fontSize:10,fontWeight:800,padding:"4px 16px",borderRadius:50,letterSpacing:".08em",whiteSpace:"nowrap" }}>MOST POPULAR</div>}
              <div style={{ display:"inline-flex",alignItems:"center",gap:6,padding:"4px 12px",borderRadius:50,background:p.badgeBg,marginBottom:16 }}>
                <span style={{ fontSize:10,fontWeight:800,color:p.badgeC }}>{p.badge}</span>
              </div>
              <h3 style={{ fontSize:20,fontWeight:800,color:C.text,marginBottom:20 }}>{p.name}</h3>
              <div style={{ display:"flex",flexDirection:"column",gap:11,marginBottom:28 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display:"flex",alignItems:"flex-start",gap:10 }}>
                    <div style={{ width:18,height:18,borderRadius:"50%",background:p.featured?C.blueL:C.bgAlt,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1 }}>
                      <Ic n="Check" s={10} style={{ color:p.featured?C.blue:C.teal }} />
                    </div>
                    <span style={{ fontSize:13,color:C.textM,lineHeight:1.55 }}>{f}</span>
                  </div>
                ))}
              </div>
              <button className={p.featured?"btn-pri":"btn-sec"} style={{ width:"100%",justifyContent:"center" }} onClick={openConsult}>
                {p.cta} <Ic n="Arrow" s={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Testimonials() {
  const [active, setActive] = useState(0)
  const ref = useReveal()
  const items = [
    {q:"We were using an outgrown legacy system with potential chances of errors, data loss, and cyber-attacks. These are some of the reasons that pushed us to upgrade to Dynamics 365 Finance and Operations with a cloud deployment. The team at Dynamics Square has successfully implemented this solution in the stated time without any after-sales cost.",name:"Chief Financial Officer",role:"Non-profit organization",industry:"Non-profit"},
    {q:"The NAV to Business Central upgrade was our best choice when it comes to business growth, simplified operations, and establishing communication between different teams in different departments. Dynamics Square has made the entire process smooth and efficient.",name:"Vice Principal",role:"Leading College",industry:"Education"},
    {q:"Dynamics Square understood our requirements and suggested Microsoft Power BI for our data analytics needs. They also integrated this with our existing ERP solution for a continuous data flow.",name:"Head of Marketing",role:"Renowned Clothing Brand",industry:"Retail"},
    {q:"Dynamics Square is a fantastic partner and helped us move from an existing CRM to Dynamics 365. The process improvement for our business was significant, and the visibility to our company performance was exactly what we needed. They took the time to understand our needs.",name:"Sina Moatamed",role:"Client",industry:"Professional Services"},
    {q:"We had an excellent experience with Dynamics Square. Arish was incredibly helpful and responsive, ensuring our needs were met quickly. The development and project teams expertly translated our requirements into effective solutions, exceeding our expectations.",name:"David Karpiak",role:"Client",industry:"Technology"},
    {q:"Good pricing and quick response from our account manager. They helped us with troubleshooting and trainings.",name:"Emma Liang",role:"Client",industry:"Business Services"},
  ]
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a+1)%items.length), 5500)
    return () => clearInterval(t)
  }, [])
  return (
    <section id="testimonials" ref={ref} style={{ background:"#fff",padding:"88px 0" }}>
      <div style={{ maxWidth:1100,margin:"0 auto",padding:"0 24px" }}>
        <div className="rv" style={{ textAlign:"center",marginBottom:44 }}>
          <div className="chip" style={{ background:C.orangeL,color:C.orange,marginBottom:12 }}>Client Stories</div>
          <h2 style={{ fontSize:"clamp(1.7rem,3.2vw,2.4rem)",fontWeight:800,color:C.text }}>What Businesses Say About <span className="gtextO">Dynamics Square</span></h2>
        </div>
        <div className="rv" style={{ background:C.bgSoft,borderRadius:26,padding:"40px",border:`1.5px solid ${C.border}` }}>
          <div className="hero-g" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"center" }}>
            <div>
              <Ic n="Quote" s={40} style={{ color:C.blue,opacity:.12,marginBottom:16 }} />
              <div style={{ display:"flex",gap:4,marginBottom:16 }}>
                {[...Array(5)].map((_,i) => <Ic key={i} n="Star" s={16} style={{ color:C.orange,fill:C.orange }} />)}
              </div>
              <p style={{ fontSize:16,color:C.text,lineHeight:1.8,fontStyle:"italic",marginBottom:24 }}>"{items[active].q}"</p>
              <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                <div style={{ width:46,height:46,borderRadius:"50%",background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <span style={{ color:"#fff",fontWeight:800,fontSize:18 }}>{items[active].name[0]}</span>
                </div>
                <div>
                  <div style={{ fontWeight:700,color:C.text,fontSize:14 }}>{items[active].name}</div>
                  <div style={{ fontSize:12,color:C.textM }}>{items[active].role}</div>
                </div>
                <div style={{ marginLeft:"auto",padding:"4px 12px",borderRadius:50,background:C.blueL,fontSize:10,fontWeight:700,color:C.blue }}>{items[active].industry}</div>
              </div>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
              {items.map((it,i) => (
                <button key={i} onClick={() => setActive(i)}
                  style={{ padding:"16px 18px",borderRadius:14,border:`2px solid ${active===i?C.blue:C.border}`,background:active===i?C.blueLL:"#fff",cursor:"pointer",textAlign:"left",transition:"all .22s" }}>
                  <div style={{ fontSize:13,fontWeight:700,color:active===i?C.blue:C.text,marginBottom:3 }}>{it.name}</div>
                  <div style={{ fontSize:11.5,color:C.textM }}>{it.role}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display:"flex",justifyContent:"center",gap:8,marginTop:20 }}>
          {items.map((_,i) => (
            <button key={i} onClick={() => setActive(i)}
              style={{ width:active===i?26:9,height:9,borderRadius:5,background:active===i?C.blue:C.border,border:"none",cursor:"pointer",transition:"all .26s" }} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── BLOG ─────────────────────────────────────────────────────────────────────
function Blog({ openConsult }) {
  const ref = useReveal()
  const posts = [
    {tag:"ERP Guide",tagC:C.blue,tagBg:C.blueL,title:"Business Central vs Dynamics NAV: What's the Difference and Which Is Right for You?",date:"Feb 28, 2026",read:"8 min",n:"Package"},
    {tag:"AI & Automation",tagC:C.purple,tagBg:C.purpleL,title:"AI-Driven ERP: How Microsoft Copilot Is Transforming Business Operations",date:"Feb 20, 2026",read:"6 min",n:"Brain"},
    {tag:"Implementation",tagC:C.teal,tagBg:C.tealL,title:"The 7 Biggest Mistakes Businesses Make When Implementing Dynamics 365",date:"Feb 12, 2026",read:"10 min",n:"Rocket"},
    {tag:"Supply Chain",tagC:C.orange,tagBg:C.orangeL,title:"How Real-Time Supply Chain Visibility Reduces Costs and Improves Customer Satisfaction",date:"Feb 5, 2026",read:"7 min",n:"Truck"},
  ]
  return (
    <section id="blog" ref={ref} style={{ background:C.bgSoft,padding:"88px 0" }}>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <div className="rv" style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:44,flexWrap:"wrap",gap:16 }}>
          <div>
            <div className="chip" style={{ background:C.blueL,color:C.blue,marginBottom:12 }}>Latest Insights</div>
            <h2 style={{ fontSize:"clamp(1.7rem,3.2vw,2.4rem)",fontWeight:800,color:C.text }}>Expert <span className="gtext">Resources & Guides</span></h2>
          </div>
          <button className="btn-sec" onClick={openConsult}>See all articles <Ic n="Arrow" s={13} /></button>
        </div>
        <div className="rv sol-g" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20 }}>
          {posts.map(p => (
            <div key={p.title} className="blog-card" onClick={openConsult}>
              <div style={{ height:130,background:`linear-gradient(135deg,${p.tagBg},${p.tagBg}99)`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <div style={{ width:52,height:52,borderRadius:14,background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 14px ${p.tagC}22` }}>
                  <Ic n={p.n} s={24} style={{ color:p.tagC }} />
                </div>
              </div>
              <div style={{ padding:"20px" }}>
                <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10 }}>
                  <span style={{ fontSize:10,fontWeight:700,color:p.tagC,background:p.tagBg,padding:"3px 9px",borderRadius:50 }}>{p.tag}</span>
                  <span style={{ fontSize:11,color:C.textL }}>{p.read} read</span>
                </div>
                <h3 style={{ fontSize:14.5,fontWeight:700,color:C.text,lineHeight:1.45,marginBottom:12 }}>{p.title}</h3>
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                  <span style={{ fontSize:11,color:C.textL }}>{p.date}</span>
                  <span style={{ fontSize:12,fontWeight:700,color:p.tagC,display:"flex",alignItems:"center",gap:4 }}>Read <Ic n="Arrow" s={11} style={{ color:p.tagC }} /></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(0)
  const ref = useReveal()
  const faqs = [
    {q:"How long does a Dynamics 365 implementation typically take?",a:"Timelines vary by scope and modules. A Business Central implementation for an SMB typically takes 6–12 weeks. Multi-module deployments across Finance, Supply Chain and CRM can take 3–6 months. We'll give you a precise estimate during your free assessment."},
    {q:"What's the difference between Business Central and Finance & Operations?",a:"Business Central is designed for SMBs — covering finance, sales, purchasing, inventory and projects. Finance & Supply Chain (formerly F&O) is Microsoft's enterprise-grade ERP for larger organisations with complex, global, high-volume requirements."},
    {q:"Can Dynamics 365 integrate with our existing systems?",a:"Yes. Dynamics 365 has native integration with the full Microsoft ecosystem (Teams, Outlook, SharePoint, Azure) and supports hundreds of third-party connectors via Power Platform. We also build bespoke integrations using the Dynamics 365 API for legacy systems."},
    {q:"What are the benefits of AI-driven ERP solutions?",a:"AI-driven ERP solutions bring automation to complex financial operations, provide real-time data analytics and accurate insights, minimize investment costs, and help you monitor financial processes with data-driven insights."},
    {q:"What ongoing support do you provide after go-live?",a:"We offer SLA-backed managed support with named consultants — not anonymous ticket queues. Packages include 24/7 incident response, proactive health monitoring, quarterly business reviews and regular update testing."},
    {q:"How much does Dynamics 365 cost?",a:"Pricing is modular — you pay for the applications and user licences you need. Business Central starts from approximately £52.80 per user/month for Essentials. Enterprise applications are priced differently. We'll provide a transparent cost breakdown based on your specific requirements during your free consultation."},
  ]
  return (
    <section id="faq" ref={ref} style={{ background:"#fff",padding:"88px 0" }}>
      <div style={{ maxWidth:860,margin:"0 auto",padding:"0 24px" }}>
        <div className="rv" style={{ textAlign:"center",marginBottom:48 }}>
          <div className="chip" style={{ background:C.purpleL,color:C.purple,marginBottom:12 }}>FAQ</div>
          <h2 style={{ fontSize:"clamp(1.7rem,3.2vw,2.4rem)",fontWeight:800,color:C.text }}>Frequently Asked <span className="gtext">Questions</span></h2>
        </div>
        <div className="rv">
          {faqs.map((f,i) => (
            <div key={i} className={`acc-item${open===i?" open":""}`}>
              <button className="acc-trigger" onClick={() => setOpen(open===i?-1:i)}>
                <span>{f.q}</span>
                <div style={{ width:28,height:28,borderRadius:8,background:open===i?C.blueL:C.bgAlt,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s" }}>
                  <Ic n={open===i?"Minus":"Plus"} s={14} style={{ color:open===i?C.blue:C.textM }} />
                </div>
              </button>
              {open===i && <div className="acc-body">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  const ref = useReveal()
  return (
    <section id="contact" ref={ref} style={{ background:C.bgSoft,padding:"88px 0" }}>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <div className="rv" style={{ textAlign:"center",marginBottom:52 }}>
          <div className="chip" style={{ background:C.blueL,color:C.blue,marginBottom:12 }}>Get in Touch</div>
          <h2 style={{ fontSize:"clamp(1.7rem,3.2vw,2.4rem)",fontWeight:800,color:C.text }}>Talk to a <span className="gtext">Dynamics 365 Expert</span></h2>
          <p style={{ fontSize:15,color:C.textM,marginTop:10,maxWidth:480,margin:"10px auto 0" }}>No commitment. No sales pressure. Just an honest conversation about what Dynamics 365 can do for your business.</p>
        </div>
        <div className="hero-g" style={{ display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:48,alignItems:"start" }}>
          <div className="rv">
            <h3 style={{ fontSize:20,fontWeight:800,color:C.text,marginBottom:20 }}>Our Global Offices</h3>
            <div style={{ display:"flex",flexDirection:"column",gap:12,marginBottom:28 }}>
              {NAV.offices.map(o => (
                <div key={o.city} style={{ display:"flex",alignItems:"center",gap:14,padding:"16px 18px",borderRadius:14,border:`1.5px solid ${C.border}`,background:"#fff" }}>
                  <span style={{ fontSize:28 }}>{o.flag}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700,color:C.text,fontSize:14 }}>{o.city}</div>
                    <a href={`tel:${o.phone.replace(/\s/g,"")}`} style={{ fontSize:13,color:C.blueM,marginTop:2,display:"block",textDecoration:"none",fontWeight:500 }}>{o.phone}</a>
                  </div>
                  <Ic n="Phone" s={16} style={{ color:C.blue }} />
                </div>
              ))}
            </div>
            <div style={{ padding:"20px",borderRadius:16,background:`linear-gradient(135deg,${C.blueLL},${C.purpleL})`,border:`1.5px solid ${C.blue}22` }}>
              <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
                <Ic n="Mail" s={16} style={{ color:C.blue }} />
                <a href="mailto:contact@dynamicssquare.com" style={{ fontSize:13,fontWeight:600,color:C.text,textDecoration:"none" }}>contact@dynamicssquare.com</a>
              </div>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <Ic n="Clock" s={16} style={{ color:C.blue }} />
                <span style={{ fontSize:13,fontWeight:600,color:C.text }}>Mon–Fri 9am–6pm (GMT/EST/IST)</span>
              </div>
            </div>
          </div>
          <div className="rv card-flat" style={{ padding:"36px 32px" }}>
            <h3 style={{ fontSize:20,fontWeight:800,color:C.text,marginBottom:4 }}>Book Your Free Consultation</h3>
            <p style={{ fontSize:13,color:C.textM,marginBottom:22 }}>A certified consultant will review your requirements and respond within 1 business day.</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA BANNER ───────────────────────────────────────────────────────────────
function CtaBanner({ openConsult }) {
  const ref = useReveal()
  return (
    <section ref={ref} style={{ padding:"72px 24px",background:"#fff" }}>
      <div className="rv" style={{ maxWidth:960,margin:"0 auto",background:`linear-gradient(135deg,${C.blue},${C.purple})`,borderRadius:26,padding:"56px 48px",textAlign:"center",boxShadow:"0 18px 70px rgba(0,87,184,.26)",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:-50,right:-50,width:260,height:260,borderRadius:"50%",background:"rgba(255,255,255,.06)",pointerEvents:"none" }} />
        <div style={{ position:"absolute",bottom:-60,left:-40,width:220,height:220,borderRadius:"50%",background:"rgba(255,255,255,.04)",pointerEvents:"none" }} />
        <div className="chip" style={{ background:"rgba(255,255,255,.2)",color:"#fff",marginBottom:16,display:"inline-flex" }}>Ready to Transform?</div>
        <h2 style={{ fontSize:"clamp(1.5rem,2.8vw,2.3rem)",fontWeight:800,color:"#fff",marginBottom:12 }}>
          Roar ahead with AI-Powered Solutions
        </h2>
        <p style={{ fontSize:15,color:"rgba(255,255,255,.82)",maxWidth:500,margin:"0 auto 32px",lineHeight:1.7 }}>
          Fear no business competition, conquer endless opportunities, acquire great strength, and become a fierce brand with Dynamics Square, your trusted Microsoft Dynamics partner.
        </p>
        <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:24 }}>
          <button className="btn-white" onClick={openConsult}>Get a Free Consultation <Ic n="Arrow" s={13} /></button>
          <button className="btn-outline-white" onClick={() => scrollTo("contact")}>Contact Us</button>
        </div>
        <div style={{ display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap" }}>
          {["✅ No commitment required","✅ 150+ certified consultants","✅ Response within 1 business day"].map(t => (
            <span key={t} style={{ fontSize:12,color:"rgba(255,255,255,.82)",fontWeight:600 }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ABOUT STRIP ─────────────────────────────────────────────────────────────
function About() {
  const ref = useReveal()
  const badges = [
    {label:"Microsoft Dynamics Partner",sub:"ERP & CRM Solutions",n:"Award",c:C.blue,bg:C.blueL},
    {label:"ISO 27001 Certified",sub:"Information Security",n:"Shield",c:C.purple,bg:C.purpleL},
    {label:"Clutch Top Company",sub:"UK & USA 2025",n:"Star",c:C.orange,bg:C.orangeL},
    {label:"Forbes Technology Council",sub:"Member Since 2022",n:"Globe",c:C.teal,bg:C.tealL},
  ]
  return (
    <section id="about" ref={ref} style={{ background:C.bgSoft,padding:"72px 0",borderTop:`1.5px solid ${C.border}` }}>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px" }}>
        <div className="rv" style={{ textAlign:"center",marginBottom:36 }}>
          <div style={{ fontSize:12,fontWeight:700,letterSpacing:".12em",color:C.textL,textTransform:"uppercase",marginBottom:8 }}>Featured On</div>
          <h3 style={{ fontSize:22,fontWeight:800,color:C.text }}>Respected Platforms Trust <span className="gtext">Dynamics Square</span></h3>
        </div>
        <div className="rv" style={{ display:"flex",justifyContent:"center",gap:16,flexWrap:"wrap" }}>
          {badges.map(b => (
            <div key={b.label} style={{ display:"flex",alignItems:"center",gap:12,padding:"16px 22px",borderRadius:16,background:"#fff",border:`1.5px solid ${C.border}`,boxShadow:"0 2px 12px rgba(0,0,0,.05)" }}>
              <div style={{ width:40,height:40,borderRadius:11,background:b.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <Ic n={b.n} s={18} style={{ color:b.c }} />
              </div>
              <div>
                <div style={{ fontSize:13.5,fontWeight:700,color:C.text }}>{b.label}</div>
                <div style={{ fontSize:11.5,color:C.textM,marginTop:1 }}>{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ openConsult }) {
  const cols = {
    "ERP Solutions": { links:["Business Central","Finance","Supply Chain","Commerce","Project Operations","Human Resources"], section:"solutions" },
    "CRM Solutions": { links:["Customer Service","Sales","Field Service","Customer Insights","Marketing"], section:"solutions" },
    "Services":      { links:["D365 Implementation","Upgrade & Migration","Managed Support","Training & Adoption","Power BI Analytics","Power Platform Dev"], section:"process" },
    "Company":       { links:["About Dynamics Square","Our Team","Careers","Blog & Insights","Case Studies","Partner Program"], section:"about" },
  }
  return (
    <footer style={{ background:C.text,color:"#fff" }}>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"60px 24px 0" }}>
        <div className="foot-g" style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr",gap:36,marginBottom:48 }}>
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:9,marginBottom:14 }}>
              <div style={{ width:34,height:34,borderRadius:9,background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <span style={{ color:"#fff",fontWeight:800,fontSize:15 }}>D</span>
              </div>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:14,color:"#fff" }}>DYNAMICS SQUARE™</span>
            </div>
            <p style={{ fontSize:13,color:"#94a3b8",lineHeight:1.75,marginBottom:18,maxWidth:250 }}>Microsoft Dynamics partner delivering AI-driven business solutions since 2017. Connected with 500+ global businesses leveraging digital transformation.</p>
            <div style={{ display:"flex",gap:8,marginBottom:20 }}>
              {["Linkedin","Twitter","Youtube"].map(s => (
                <button key={s} className="soc-btn">
                  <Ic n={s} s={14} style={{ color:"#94a3b8" }} />
                </button>
              ))}
            </div>
            {[{n:"Mail",t:"contact@dynamicssquare.com",href:"mailto:contact@dynamicssquare.com"},{n:"Phone",t:"+1 800 938 7929",href:"tel:+18009387929"},{n:"Pin",t:"USA · UK · Canada · India",href:null}].map(c => (
              <div key={c.t} style={{ display:"flex",alignItems:"center",gap:7,marginBottom:7 }}>
                <Ic n={c.n} s={12} style={{ color:C.blueM }} />
                {c.href
                  ? <a href={c.href} style={{ fontSize:12,color:"#94a3b8",textDecoration:"none" }}>{c.t}</a>
                  : <span style={{ fontSize:12,color:"#94a3b8" }}>{c.t}</span>}
              </div>
            ))}
          </div>
          {Object.entries(cols).map(([heading, col]) => (
            <div key={heading}>
              <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:12.5,color:"#fff",marginBottom:14 }}>{heading}</div>
              <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                {col.links.map(l => (
                  <button key={l} className="foot-link" onClick={() => scrollTo(col.section)}>{l}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,.07)",padding:"18px 0",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10 }}>
          <span style={{ fontSize:12,color:"#64748b" }}>© {new Date().getFullYear()} Dynamics Square™. All rights reserved. Independent Microsoft Dynamics partner.</span>
          <div style={{ display:"flex",gap:18 }}>
            {["Privacy Policy","Terms of Service","Cookie Preferences"].map(l => (
              <button key={l} style={{ background:"none",border:"none",cursor:"pointer",fontSize:12,color:"#64748b",fontFamily:"'Inter',sans-serif",transition:"color .16s" }}
                onMouseEnter={e => e.currentTarget.style.color=C.blueM}
                onMouseLeave={e => e.currentTarget.style.color="#64748b"}>{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── SCROLL TO TOP ─────────────────────────────────────────────────────────────
function ScrollTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const h = () => setShow(window.scrollY > 500)
    window.addEventListener("scroll", h, { passive:true })
    return () => window.removeEventListener("scroll", h)
  }, [])
  if (!show) return null
  return (
    <button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
      style={{ position:"fixed",bottom:28,right:28,width:44,height:44,borderRadius:"50%",background:`linear-gradient(135deg,${C.blue},${C.purple})`,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 18px rgba(0,87,184,.3)",zIndex:7000,transition:"transform .26s ease" }}
      onMouseEnter={e => e.currentTarget.style.transform="scale(1.12) translateY(-2px)"}
      onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
      <Ic n="ChevU" s={18} style={{ color:"#fff" }} />
    </button>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [consultOpen, setConsultOpen] = useState(false)
  const [demoOpen,    setDemoOpen]    = useState(false)

  const openConsult = () => setConsultOpen(true)
  const openDemo    = () => setDemoOpen(true)

  return (
    <>
      <GS />

      {/* ── Global Modals ── */}
      <Modal open={consultOpen} onClose={() => setConsultOpen(false)} title="Book Your Free Consultation">
        <ContactForm onSuccess={() => setTimeout(() => setConsultOpen(false), 3000)} />
      </Modal>
      <Modal open={demoOpen} onClose={() => setDemoOpen(false)} title="Watch Dynamics 365 Demo">
        <DemoContent />
      </Modal>

      <Header openConsult={openConsult} openDemo={openDemo} />

      <main>
        <Hero        openConsult={openConsult} openDemo={openDemo} />
        <Trust />
        <Stats />
        <Solutions   openConsult={openConsult} />
        <Industries  openConsult={openConsult} />
        <Process     openConsult={openConsult} />
        <PowerBI     openConsult={openConsult} />
        <Testimonials />
        <Blog        openConsult={openConsult} />
        <About />
        <FAQ />
        <Contact />
        <CtaBanner   openConsult={openConsult} />
      </main>

      <Footer openConsult={openConsult} />
      <ScrollTop />
    </>
  )
}