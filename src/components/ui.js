import { useState, useEffect, useCallback } from 'react'

// ─── PALETTE ──────────────────────────────────────────────────────────────────
export const C = {
  blue:"#0057B8", blueM:"#0071f3", blueL:"#e8f2ff", blueLL:"#f0f7ff",
  purple:"#6C3CE1", purpleL:"#f0ebff",
  teal:"#00A99D", tealL:"#e6f9f8",
  orange:"#FF6B2B", orangeL:"#fff1eb",
  green:"#16A34A", greenL:"#dcfce7",
  text:"#0f172a", textM:"#475569", textL:"#94a3b8",
  bg:"#ffffff", bgSoft:"#f8fafc", bgAlt:"#f1f5f9",
  border:"#e2e8f0", borderM:"#cbd5e1",
}

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
  Rocket:["M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z","M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z","M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0","M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"],
  Database:["M12 2a9 3 0 110 6 9 3 0 010-6z","M3 5v4c0 1.66 4.03 3 9 3s9-1.34 9-3V5","M3 9v4c0 1.66 4.03 3 9 3s9-1.34 9-3V9","M3 13v4c0 1.66 4.03 3 9 3s9-1.34 9-3v-4"],
  BarChart:["M12 20V10","M18 20V4","M6 20v-6"],
  Clock:["M12 22a10 10 0 100-20 10 10 0 000 20z","M12 6v6l4 2"],
  Award:["M12 15a7 7 0 100-14 7 7 0 000 14z","M8.21 13.89L7 23l5-3 5 3-1.21-9.12"],
  Layers:["M12 2L2 7l10 5 10-5-10-5z","M2 17l10 5 10-5","M2 12l10 5 10-5"],
  LifeBuoy:["M12 22a10 10 0 100-20 10 10 0 000 20z","M4.93 4.93l4.24 4.24","M14.83 14.83l4.24 4.24","M4.93 19.07l4.24-4.24","M14.83 9.17l4.24-4.24"],
  Megaphone:["M3 11l19-9-9 19-2-8-8-2z"],
  PieChart:["M21.21 15.89A10 10 0 118 2.83","M22 12A10 10 0 0012 2v10z"],
  Cpu:["M9 2H6a2 2 0 00-2 2v3","M15 2h3a2 2 0 012 2v3","M9 22H6a2 2 0 01-2-2v-3","M15 22h3a2 2 0 002-2v-3","M2 9h3","M2 15h3","M22 9h-3","M22 15h-3","M9 9h6v6H9z"],
  Settings:["M12 15a3 3 0 100-6 3 3 0 000 6z","M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"],
  BookOpen:["M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z","M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"],
  Linkedin:["M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z","M2 9h4v12H2z","M4 6a2 2 0 100-4 2 2 0 000 4z"],
  Twitter:["M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"],
  Youtube:["M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z","M9.75 15.02l5.75-3.02-5.75-3.02v6.04z"],
  Calc:["M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z","M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h8"],
  ExternalLink:["M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6","M15 3h6v6","M10 14L21 3"],
  Heart:["M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"],
  Video:["M23 7l-7 5 7 5V7z","M1 5h14a2 2 0 012 2v10a2 2 0 01-2 2H1a2 2 0 01-2-2V7a2 2 0 012-2z"],
  FileText:["M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z","M14 2v6h6","M16 13H8","M16 17H8","M10 9H8"],
}

export const Ic = ({ n, s = 16, style = {}, className = "" }) => {
  const d = P[n]; if (!d) return null
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={style} className={className}>
      {(Array.isArray(d) ? d : [d]).map((p, i) => <path key={i} d={p} />)}
    </svg>
  )
}

// ─── SIMPLE HASH ROUTER ───────────────────────────────────────────────────────
// Route format:  #/         → home
//                #/solution/erp/business-central
//                #/service/implementation
export function useRouter() {
  const [route, setRoute] = useState(() => window.location.hash || '#/')

  useEffect(() => {
    const h = () => setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', h)
    return () => window.removeEventListener('hashchange', h)
  }, [])

  const navigate = useCallback((path) => {
    window.location.hash = path
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // parse route
  const parts = route.replace('#/', '').split('/').filter(Boolean)
  // parts[0] = section ('solution'|'service'), parts[1] = category slug, parts[2] = item slug
  return { route, parts, navigate }
}

// ─── LOGO SVG ─────────────────────────────────────────────────────────────────
export function LogoSvg({ size = 40, id = "lg" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0057B8"/><stop offset="1" stopColor="#6C3CE1"/>
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill={`url(#${id})`}/>
      <path d="M8 18 Q10 11 20 11 Q27 11 30 16 Q33 16 33 20 Q33 24 29 24 H10 Q7 24 7 20 Q7 18 8 18Z" fill="white" opacity="0.92"/>
      <rect x="10" y="27" width="20" height="2.5" rx="1.25" fill="white" opacity="0.75"/>
      <rect x="13" y="31" width="14" height="2.5" rx="1.25" fill="white" opacity="0.5"/>
      <rect x="16" y="35" width="8" height="2" rx="1" fill="white" opacity="0.3"/>
    </svg>
  )
}

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
export function GS() {
  return (
    <style>{`
      *{box-sizing:border-box;margin:0;padding:0}
      body{font-family:'Inter',sans-serif;color:${C.text};background:#fff;-webkit-font-smoothing:antialiased}
      h1,h2,h3,h4,h5,h6{font-family:'Plus Jakarta Sans',sans-serif}
      button{font-family:'Inter',sans-serif}

      @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
      @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      @keyframes dropIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
      @keyframes solPanelIn{from{opacity:0;transform:translateX(8px)}to{opacity:1;transform:none}}
      @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
      @keyframes countUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
      @keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
      @keyframes slideRight{from{width:0}to{width:100%}}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
      @keyframes popIn{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}

      .vis{opacity:0}.vis.show{animation:fadeUp .6s ease forwards}

      .mega{position:absolute;top:calc(100% + 10px);background:#fff;border-radius:18px;box-shadow:0 8px 48px rgba(0,0,0,.13),0 1.5px 6px rgba(0,0,0,.07);border:1px solid ${C.border};overflow:hidden;z-index:5000;animation:fadeIn .16s ease}

      .mi{display:flex;align-items:flex-start;gap:10px;width:100%;padding:9px 10px;border-radius:10px;border:none;background:none;cursor:pointer;transition:background .15s;text-align:left}
      .mi:hover{background:${C.blueLL}}

      .sol-cat-btn{display:flex;align-items:center;gap:11px;width:100%;padding:11px 14px;border-radius:12px;border:none;background:none;cursor:pointer;text-align:left;transition:background .15s;position:relative}
      .sol-cat-btn:hover{background:${C.blueLL}}
      .sol-cat-btn.sol-active{background:linear-gradient(135deg,${C.blue}14,${C.purple}08)}
      .sol-cat-btn.sol-active::after{content:'';position:absolute;right:-1px;top:50%;transform:translateY(-50%);width:3px;height:60%;border-radius:2px;background:linear-gradient(180deg,${C.blue},${C.purple})}
      .sol-items-panel{animation:solPanelIn .2s cubic-bezier(.4,0,.2,1)}

      .nav-wrapper{position:relative;display:flex;align-items:center;gap:4px;flex:1;justify-content:center}

      .page-fade{animation:fadeUp .45s ease forwards}

      .feat-card{border-radius:18px;padding:28px;border:1.5px solid ${C.border};background:#fff;transition:all .28s}
      .feat-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,87,184,.1);border-color:rgba(0,87,184,.2)}

      .benefit-stat{text-align:center;padding:28px 20px;border-radius:18px;background:${C.bgSoft};border:1px solid ${C.border}}

      .process-step{display:flex;gap:20px;align-items:flex-start;padding:22px 0;border-bottom:1px solid ${C.border}}
      .process-step:last-child{border-bottom:none}

      .use-case-card{padding:18px 20px;border-radius:14px;background:${C.bgSoft};border:1px solid ${C.border};display:flex;gap:12px;align-items:flex-start}

      .tab-btn{padding:9px 20px;border-radius:50px;font-size:13px;font-weight:600;cursor:pointer;border:2px solid transparent;font-family:'Plus Jakarta Sans',sans-serif;transition:all .2s}
      .tab-active{background:linear-gradient(135deg,${C.blue},${C.purple});color:#fff;box-shadow:0 4px 14px rgba(0,87,184,.26)}
      .tab-inactive{background:#fff;color:${C.textM};border-color:${C.border}}
      .tab-inactive:hover{border-color:${C.blue};color:${C.blue}}

      .form-input{width:100%;padding:12px 16px;border-radius:12px;border:1.5px solid ${C.border};font-size:14px;color:${C.text};outline:none;transition:border-color .2s;background:#fff;font-family:'Inter',sans-serif}
      .form-input:focus{border-color:${C.blue}}
      .form-input::placeholder{color:${C.textL}}

      .foot-link{background:none;border:none;cursor:pointer;text-align:left;font-size:13px;color:#94a3b8;font-family:'Inter',sans-serif;transition:color .16s;padding:3px 0;display:block}
      .foot-link:hover{color:${C.blueM}}

      .soc-btn{width:34px;height:34px;border-radius:8px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s}
      .soc-btn:hover{background:rgba(255,255,255,.15)}

      .track{display:flex;gap:32px;animation:marquee 26s linear infinite;width:max-content}
      .track:hover{animation-play-state:paused}

      .acc-item{border:1.5px solid ${C.border};border-radius:14px;overflow:hidden;margin-bottom:10px;transition:border-color .2s}
      .acc-item.open{border-color:${C.blue}}
      .acc-trigger{display:flex;justify-content:space-between;align-items:center;padding:18px 20px;cursor:pointer;background:none;border:none;width:100%;text-align:left;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;color:${C.text}}
      .acc-body{padding:0 20px 18px;font-size:14px;color:${C.textM};line-height:1.75}

      .mob-link{display:block;width:100%;text-align:left;padding:12px 0;font-size:14px;font-weight:500;color:${C.textM};background:none;border:none;border-bottom:1px solid ${C.border};cursor:pointer;font-family:'Inter',sans-serif;transition:color .16s}
      .mob-link:hover{color:${C.blue}}

      .show-mob{display:none!important}
      @media(max-width:1100px){.show-mob{display:flex!important}.hide-desk{display:none!important}}
      @media(max-width:768px){
        .hero-g,.proc-g{grid-template-columns:1fr!important}
        .stats-g{grid-template-columns:1fr 1fr!important}
        .foot-g{grid-template-columns:1fr 1fr!important;gap:28px!important}
        .sol-g,.why-g{grid-template-columns:1fr 1fr!important}
        .page-hero-g{grid-template-columns:1fr!important}
        .features-g{grid-template-columns:1fr 1fr!important}
      }
      @media(max-width:480px){
        .sol-g,.why-g,.stats-g,.foot-g,.features-g{grid-template-columns:1fr!important}
      }
    `}</style>
  )
}

// ─── REUSABLE BUTTON ──────────────────────────────────────────────────────────
export function Btn({ children, onClick, variant = 'primary', style: sx = {}, ...rest }) {
  const base = { display:'inline-flex', alignItems:'center', gap:8, padding:'13px 26px', borderRadius:50, fontSize:14, fontWeight:700, cursor:'pointer', border:'none', transition:'all .22s', fontFamily:"'Plus Jakarta Sans',sans-serif", textDecoration:'none' }
  const variants = {
    primary: { background:`linear-gradient(135deg,${C.blue},${C.purple})`, color:'#fff', boxShadow:'0 4px 18px rgba(0,87,184,.28)' },
    outline: { background:'transparent', color:C.blue, border:`2px solid ${C.blue}` },
    ghost:   { background:'rgba(255,255,255,.12)', color:'#fff', border:'1.5px solid rgba(255,255,255,.25)' },
    soft:    { background:C.blueL, color:C.blue },
  }
  return (
    <button onClick={onClick} style={{ ...base, ...variants[variant], ...sx }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(0,87,184,.32)' }}
      onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=variants[variant].boxShadow||'' }}
      {...rest}>
      {children}
    </button>
  )
}
