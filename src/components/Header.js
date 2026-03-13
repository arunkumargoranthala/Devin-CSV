import { useState, useEffect, useRef } from 'react'
import { C, Ic, LogoSvg } from './ui'
import { SOLUTIONS, SERVICES } from '../data/content'

const NAV_INDUSTRIES = [
  { n:'Truck',    t:'Manufacturing',         d:'Smart factory & production ops',        c:C.blue,   bg:C.blueL,   slug:'manufacturing'  },
  { n:'Cart',     t:'Retail & Commerce',     d:'Omnichannel retail & eCommerce',        c:C.orange, bg:C.orangeL, slug:'retail'         },
  { n:'Shield',   t:'Financial Services',    d:'Compliance, risk & banking',            c:C.purple, bg:C.purpleL, slug:'financial'      },
  { n:'Brief',    t:'Professional Services', d:'Project billing & delivery',            c:C.teal,   bg:C.tealL,   slug:'professional'   },
  { n:'Users',    t:'Healthcare',            d:'Patient ops & regulatory mgmt',         c:C.green,  bg:C.greenL,  slug:'healthcare'     },
  { n:'Globe',    t:'Logistics & Transport', d:'Fleet, freight & supply tracking',      c:C.blue,   bg:C.blueL,   slug:'logistics'      },
]
const NAV_RESOURCES = [
  { n:'FileText', t:'Case Studies',         d:'Real results from real clients',       c:C.blue,   bg:C.blueL,   slug:'case-studies'   },
  { n:'BookOpen', t:'White Papers',         d:'Deep-dive technical guides',           c:C.purple, bg:C.purpleL, slug:'white-papers'   },
  { n:'Video',    t:'Webinars & Events',    d:'Live & on-demand sessions',            c:C.teal,   bg:C.tealL,   slug:'webinars'       },
  { n:'Chart',    t:'Blog & Insights',      d:'Expert tips, news & trends',           c:C.orange, bg:C.orangeL, slug:'blog'           },
  { n:'Calc',     t:'ROI Calculator',       d:'Model your business case',             c:C.green,  bg:C.greenL,  slug:'roi-calculator' },
  { n:'Award',    t:'MS Certifications',    d:'Our Gold Partner credentials',         c:C.blue,   bg:C.blueL,   slug:'certifications' },
  { n:'Users',    t:'Partner Programme',    d:'Become a referral partner',            c:C.purple, bg:C.purpleL, slug:'partner'        },
  { n:'Globe',    t:'Documentation Hub',    d:'Technical docs & integration guides',  c:C.teal,   bg:C.tealL,   slug:'docs'           },
]
const NAV_COMPANY = [
  { n:'Award',     t:'About DevinStratus', d:'Our story, mission & values',    c:C.blue,   bg:C.blueL,   slug:'about'   },
  { n:'Users',     t:'Our Team',           d:'120+ certified consultants',     c:C.purple, bg:C.purpleL, slug:'team'    },
  { n:'Globe',     t:'Global Offices',     d:'London · NYC · Toronto · Delhi', c:C.teal,   bg:C.tealL,   slug:'global'  },
  { n:'Star',      t:'Awards',             d:'Microsoft Inner Circle 2025',    c:C.orange, bg:C.orangeL, slug:'awards'  },
  { n:'Brief',     t:'Careers',            d:'Join our growing practice',      c:C.green,  bg:C.greenL,  slug:'careers' },
  { n:'Megaphone', t:'Press & Media',      d:'News, announcements & PR',       c:C.purple, bg:C.purpleL, slug:'press'   },
]

export default function Header({ navigate, openConsult }) {
  const [sc,  setSc]  = useState(false)
  const [mob, setMob] = useState(false)
  const [mobSection, setMobSection] = useState(null)
  const [open, setOpen] = useState(null)
  const [activeSolSection, setActiveSolSection] = useState(0)
  const timers = useRef({})

  useEffect(() => {
    const h = () => setSc(window.scrollY > 8)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  useEffect(() => {
    document.body.style.overflow = mob ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mob])

  const openM  = k => { clearTimeout(timers.current[k]); setOpen(k) }
  const closeM = k => { timers.current[k] = setTimeout(() => setOpen(o => o===k?null:o), 180) }

  const go = path => {
    setOpen(null); setMob(false); setMobSection(null)
    if (path.startsWith('#')) {
      navigate('/')
      setTimeout(() => { const el = document.getElementById(path.slice(1)); if (el) el.scrollIntoView({ behavior:'smooth' }) }, 100)
    } else { navigate(path) }
  }

  // NavItem — mega aligns left:0 under its own trigger button
  const NavItem = ({ label, k, children }) => (
    <div onMouseEnter={() => openM(k)} onMouseLeave={() => closeM(k)} style={{ position:'relative' }}>
      <button style={{ display:'flex', alignItems:'center', gap:4, padding:'8px 12px', borderRadius:8, background:open===k?C.blueLL:'transparent', border:'none', cursor:'pointer', fontSize:14, fontWeight:600, color:open===k?C.blue:C.text, transition:'all .15s', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
        {label}
        <Ic n="ChevD" s={13} style={{ color:open===k?C.blue:C.textL, transition:'transform .2s', transform:open===k?'rotate(180deg)':'none' }} />
      </button>
      {open===k && children}
    </div>
  )

  // Mega — pure left:0 anchored under its own trigger button. 'right' anchors right:0 for last items.
  const mega = (w, side='left', extra={}) => ({
    position:'absolute', top:'calc(100% + 8px)', ...(side==='right' ? { right:0 } : { left:0 }),
    width:w, background:'#fff',
    border:`1.5px solid ${C.border}`, borderRadius:20,
    boxShadow:'0 20px 70px rgba(0,0,0,.13)',
    overflow:'hidden', zIndex:9999,
    animation:'dropIn .18s ease',
    ...extra
  })

  const cardBtn = (color) => ({
    display:'flex', alignItems:'center', gap:11, padding:'11px 13px',
    borderRadius:13, border:`1.5px solid ${C.border}`, background:'#fff',
    cursor:'pointer', textAlign:'left', transition:'all .16s',
    position:'relative', overflow:'hidden'
  })
  const onCH = (e,c) => { e.currentTarget.style.borderColor=c+'55'; e.currentTarget.style.boxShadow=`0 4px 16px ${c}14`; e.currentTarget.style.transform='translateY(-2px)' }
  const offCH = e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }

  const sec = SOLUTIONS[activeSolSection]

  // ── Mobile accordion sections ──
  const MOB_SECTIONS = [
    { key:'solutions',  label:'Solutions',  icon:'Package', items: SOLUTIONS.map(s => ({ label:s.heading, path:`/solutions/${s.slug}`, color:s.color, icon:s.icon })) },
    { key:'services',   label:'Services',   icon:'Wrench',  items: SERVICES.map(s =>  ({ label:s.t,       path:`/service/${s.slug}`,   color:s.color, icon:s.n    })) },
    { key:'industries', label:'Industries', icon:'Globe',   items: NAV_INDUSTRIES.map(i => ({ label:i.t, path:`/industries/${i.slug}`, color:i.c, icon:i.n })) },
    { key:'resources',  label:'Resources',  icon:'BookOpen',items: NAV_RESOURCES.map(r  => ({ label:r.t, path:`/resources/${r.slug}`,  color:r.c, icon:r.n })) },
    { key:'company',    label:'Company',    icon:'Award',   items: NAV_COMPANY.map(c    => ({ label:c.t, path:`/company/${c.slug}`,    color:c.c, icon:c.n })) },
  ]

  return (
    <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:9000, background:sc?'rgba(255,255,255,.97)':'#fff', borderBottom:`1px solid ${sc?C.border:'transparent'}`, boxShadow:sc?'0 2px 20px rgba(0,0,0,.07)':'none', backdropFilter:sc?'blur(12px)':'none', transition:'all .25s' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px', height:68, display:'flex', alignItems:'center', gap:24 }}>

        {/* Logo */}
        <button onClick={() => go('/')} style={{ display:'flex', alignItems:'center', gap:10, background:'none', border:'none', cursor:'pointer', flexShrink:0 }}>
          <LogoSvg size={40} id="hdr-logo" />
          <div>
            <div style={{ fontSize:17, fontWeight:800, fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1.1 }}>
              <span style={{ background:`linear-gradient(135deg,${C.blue},${C.purple})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Devin</span>
              <span style={{ color:C.text }}>Stratus</span>
            </div>
            <div style={{ fontSize:8.5, fontWeight:700, letterSpacing:'.16em', color:C.textL }}>TECHNOLOGIES</div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="nav-wrapper hide-desk" style={{ display:'flex', alignItems:'center', gap:2, flex:1, justifyContent:'center' }}>

          {/* SOLUTIONS */}
          <NavItem label="Solutions" k="solutions">
            <div style={{ ...mega(780), display:'flex', flexDirection:'column' }}>
              <div style={{ display:'grid', gridTemplateColumns:'220px 1fr' }}>
                <div style={{ background:C.bgSoft, borderRight:`1px solid ${C.border}`, padding:'14px 10px', display:'flex', flexDirection:'column', gap:2, maxHeight:460, overflowY:'auto', scrollbarWidth:'thin' }}>
                  <div style={{ fontSize:9, fontWeight:800, letterSpacing:'.14em', color:C.textL, padding:'4px 8px 8px', textTransform:'uppercase' }}>All Solutions</div>
                  {SOLUTIONS.map((s,i) => (
                    <button key={s.slug} className={`sol-cat-btn ${activeSolSection===i?'sol-active':''}`} onMouseEnter={() => setActiveSolSection(i)} onClick={() => go(`/solutions/${s.slug}`)}>
                      <div style={{ width:32, height:32, borderRadius:9, flexShrink:0, background:activeSolSection===i?s.bg:C.bgAlt, display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <Ic n={s.icon} s={14} style={{ color:activeSolSection===i?s.color:C.textL }} />
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:12.5, fontWeight:700, color:activeSolSection===i?s.color:C.text, lineHeight:1.2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.heading}</div>
                        <div style={{ fontSize:10.5, color:C.textL, marginTop:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.desc}</div>
                      </div>
                      <Ic n="ChevR" s={11} style={{ color:activeSolSection===i?s.color:C.border, flexShrink:0 }} />
                    </button>
                  ))}
                </div>
                <div key={activeSolSection} className="sol-items-panel" style={{ padding:'18px 16px', display:'flex', flexDirection:'column' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14, paddingBottom:12, borderBottom:`1px solid ${C.border}` }}>
                    <div style={{ width:38, height:38, borderRadius:11, background:sec.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <Ic n={sec.icon} s={18} style={{ color:sec.color }} />
                    </div>
                    <div>
                      <div style={{ fontSize:14, fontWeight:800, color:C.text }}>{sec.heading}</div>
                      <div style={{ fontSize:11, color:C.textL, marginTop:1 }}>{sec.items.length} solutions · {sec.desc}</div>
                    </div>
                    <button onClick={() => go(`/solutions/${sec.slug}`)} style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:5, fontSize:11.5, fontWeight:700, color:sec.color, background:sec.bg, border:'none', borderRadius:50, padding:'6px 14px', cursor:'pointer', flexShrink:0 }}>
                      View all <Ic n="Arrow" s={11} style={{ color:sec.color }} />
                    </button>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, alignContent:'start' }}>
                    {sec.items.map((it,idx) => {
                      const isLastOdd = sec.items.length%2!==0 && idx===sec.items.length-1
                      return (
                        <button key={it.slug} onClick={() => go(`/solution/${sec.slug}/${it.slug}`)}
                          style={{ ...cardBtn(sec.color), gridColumn:isLastOdd?'1 / -1':'auto', animation:`solPanelIn .22s cubic-bezier(.4,0,.2,1) both ${idx*38}ms` }}
                          onMouseEnter={e=>onCH(e,sec.color)} onMouseLeave={offCH}>
                          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:`linear-gradient(180deg,${sec.color},${sec.color}55)`, borderRadius:'13px 0 0 13px', opacity:.7 }} />
                          <div style={{ width:40, height:40, borderRadius:11, background:sec.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginLeft:4 }}>
                            <Ic n={it.n} s={18} style={{ color:sec.color }} />
                          </div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
                              <span style={{ fontSize:13, fontWeight:700, color:C.text }}>{it.t}</span>
                              {it.tag && <span style={{ fontSize:9, fontWeight:700, padding:'2px 7px', borderRadius:50, background:C.orange+'18', color:C.orange, whiteSpace:'nowrap' }}>{it.tag}</span>}
                            </div>
                            <div style={{ fontSize:11.5, color:C.textM, lineHeight:1.45 }}>{it.d}</div>
                          </div>
                          <Ic n="ChevR" s={13} style={{ color:sec.color, flexShrink:0, opacity:.4 }} />
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div style={{ padding:'10px 20px', background:C.bgSoft, borderTop:`1px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:11.5, color:C.textM }}><span style={{ fontWeight:700, color:C.text }}>{SOLUTIONS.length} categories</span> · Browse full portfolio</span>
                <button onClick={() => go('/solutions')} style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:700, color:C.blue, background:'none', border:'none', cursor:'pointer' }}>View all <Ic n="Arrow" s={12} /></button>
              </div>
            </div>
          </NavItem>

          {/* SERVICES */}
          <NavItem label="Services" k="services">
            <div style={mega(660)}>
              <div style={{ padding:'18px 16px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                  <div style={{ fontSize:10, fontWeight:800, letterSpacing:'.14em', color:C.blue }}>8 SPECIALIST SERVICES</div>
                  <span style={{ fontSize:11, color:C.textL }}>Full D365 lifecycle coverage</span>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                  {SERVICES.map(s => (
                    <button key={s.slug} onClick={() => go(`/service/${s.slug}`)} style={cardBtn(s.color)} onMouseEnter={e=>onCH(e,s.color)} onMouseLeave={offCH}>
                      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:`linear-gradient(180deg,${s.color},${s.color}55)`, borderRadius:'13px 0 0 13px' }} />
                      <div style={{ width:38, height:38, borderRadius:10, background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginLeft:4 }}>
                        <Ic n={s.n} s={17} style={{ color:s.color }} />
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:2 }}>{s.t}</div>
                        <div style={{ fontSize:11, color:C.textL, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.tagline.split('—')[0].trim()}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ padding:'10px 20px', background:C.bgSoft, borderTop:`1px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:11.5, color:C.textM }}>Implementation through managed support</span>
                <button onClick={() => go('/services')} style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:700, color:C.blue, background:'none', border:'none', cursor:'pointer' }}>All services <Ic n="Arrow" s={12} /></button>
              </div>
            </div>
          </NavItem>

          {/* INDUSTRIES */}
          <NavItem label="Industries" k="industries">
            <div style={mega(620)}>
              <div style={{ padding:'18px 16px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                  <div style={{ fontSize:10, fontWeight:800, letterSpacing:'.14em', color:C.teal }}>INDUSTRIES WE SERVE</div>
                  <span style={{ fontSize:11, color:C.textL }}>40% faster go-live with accelerators</span>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                  {NAV_INDUSTRIES.map(ind => (
                    <button key={ind.t} onClick={() => go(`/industries/${ind.slug}`)} style={cardBtn(ind.c)} onMouseEnter={e=>onCH(e,ind.c)} onMouseLeave={offCH}>
                      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:`linear-gradient(180deg,${ind.c},${ind.c}55)`, borderRadius:'13px 0 0 13px' }} />
                      <div style={{ width:38, height:38, borderRadius:10, background:ind.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginLeft:4 }}>
                        <Ic n={ind.n} s={17} style={{ color:ind.c }} />
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:2 }}>{ind.t}</div>
                        <div style={{ fontSize:11, color:C.textL }}>{ind.d}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ padding:'10px 20px', background:C.bgSoft, borderTop:`1px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:11.5, color:C.textM }}>Purpose-built for your sector</span>
                <button onClick={() => go('/industries')} style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:700, color:C.blue, background:'none', border:'none', cursor:'pointer' }}>All industries <Ic n="Arrow" s={12} /></button>
              </div>
            </div>
          </NavItem>

          {/* RESOURCES */}
          <NavItem label="Resources" k="resources">
            <div style={mega(620,'right')}>
              <div style={{ padding:'18px 16px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                  <div style={{ fontSize:10, fontWeight:800, letterSpacing:'.14em', color:C.orange }}>KNOWLEDGE HUB</div>
                  <span style={{ fontSize:11, color:C.textL }}>Free resources to evaluate & plan</span>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                  {NAV_RESOURCES.map(r => (
                    <button key={r.t} onClick={() => go(`/resources/${r.slug}`)} style={cardBtn(r.c)} onMouseEnter={e=>onCH(e,r.c)} onMouseLeave={offCH}>
                      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:`linear-gradient(180deg,${r.c},${r.c}55)`, borderRadius:'13px 0 0 13px' }} />
                      <div style={{ width:38, height:38, borderRadius:10, background:r.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginLeft:4 }}>
                        <Ic n={r.n} s={17} style={{ color:r.c }} />
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:2 }}>{r.t}</div>
                        <div style={{ fontSize:11, color:C.textL }}>{r.d}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ padding:'10px 20px', background:C.bgSoft, borderTop:`1px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:11.5, color:C.textM }}>Guides, webinars & expert insights</span>
                <button onClick={() => go('/resources')} style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:700, color:C.blue, background:'none', border:'none', cursor:'pointer' }}>All resources <Ic n="Arrow" s={12} /></button>
              </div>
            </div>
          </NavItem>

          {/* COMPANY */}
          <NavItem label="Company" k="company">
            <div style={mega(580,'right')}>
              <div style={{ padding:'18px 16px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                  <div style={{ fontSize:10, fontWeight:800, letterSpacing:'.14em', color:C.purple }}>OUR COMPANY</div>
                  <span style={{ fontSize:11, color:C.textL }}>Microsoft Gold Partner since 2009</span>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:12 }}>
                  {NAV_COMPANY.map(r => (
                    <button key={r.t} onClick={() => go(`/company/${r.slug}`)} style={cardBtn(r.c)} onMouseEnter={e=>onCH(e,r.c)} onMouseLeave={offCH}>
                      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:`linear-gradient(180deg,${r.c},${r.c}55)`, borderRadius:'13px 0 0 13px' }} />
                      <div style={{ width:38, height:38, borderRadius:10, background:r.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginLeft:4 }}>
                        <Ic n={r.n} s={17} style={{ color:r.c }} />
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:2 }}>{r.t}</div>
                        <div style={{ fontSize:11, color:C.textL }}>{r.d}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div style={{ background:`linear-gradient(135deg,${C.blue},${C.purple})`, borderRadius:12, padding:'12px 16px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
                  {[['🇬🇧','London'],['🇺🇸','New York'],['🇮🇳','New Delhi'],['🇨🇦','Toronto']].map(([f,city]) => (
                    <div key={city} style={{ display:'flex', alignItems:'center', gap:7 }}>
                      <span style={{ fontSize:16 }}>{f}</span>
                      <span style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,.9)' }}>{city}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </NavItem>

          <button onClick={() => go('/contact')} style={{ padding:'8px 12px', border:'none', background:'transparent', fontSize:14, fontWeight:600, color:C.text, cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Contact</button>
        </nav>

        {/* Desktop CTA */}
        <div className="hide-desk" style={{ display:'flex', gap:10, marginLeft:'auto', flexShrink:0 }}>
          <button onClick={openConsult} style={{ padding:'9px 18px', borderRadius:50, background:`linear-gradient(135deg,${C.blue},${C.purple})`, border:'none', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' }}>Free Consultation</button>
        </div>

        {/* Hamburger */}
        <button className="show-mob" onClick={() => { setMob(!mob); setMobSection(null) }} style={{ marginLeft:'auto', background:'none', border:'none', cursor:'pointer', padding:8 }}>
          <Ic n={mob?'X':'Menu'} s={22} style={{ color:C.text }} />
        </button>
      </div>

      {/* ── MOBILE DRAWER ── */}
      {mob && (
        <div style={{ position:'fixed', top:68, left:0, right:0, bottom:0, background:'#fff', overflowY:'auto', zIndex:8999 }}>
          {/* Header strip */}
          <div style={{ padding:'16px 20px', borderBottom:`1px solid ${C.border}`, background:C.bgSoft, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div style={{ fontSize:13, fontWeight:700, color:C.text }}>Navigation</div>
            <button onClick={openConsult} style={{ padding:'8px 16px', borderRadius:50, background:`linear-gradient(135deg,${C.blue},${C.purple})`, border:'none', color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer' }}>
              Free Consultation
            </button>
          </div>

          <div style={{ padding:'12px 16px' }}>
            {MOB_SECTIONS.map(sec => (
              <div key={sec.key} style={{ marginBottom:4 }}>
                {/* Section header button */}
                <button
                  onClick={() => setMobSection(mobSection===sec.key ? null : sec.key)}
                  style={{ width:'100%', display:'flex', alignItems:'center', gap:12, padding:'14px 16px', borderRadius:14, background:mobSection===sec.key?C.blueLL:'#fff', border:`1.5px solid ${mobSection===sec.key?C.blue+'44':C.border}`, cursor:'pointer', textAlign:'left', transition:'all .18s' }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:mobSection===sec.key?`linear-gradient(135deg,${C.blue},${C.purple})`:`linear-gradient(135deg,${C.bgAlt},${C.bgSoft})`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all .18s' }}>
                    <Ic n={sec.icon} s={16} style={{ color:mobSection===sec.key?'#fff':C.textM }} />
                  </div>
                  <span style={{ flex:1, fontSize:15, fontWeight:700, color:mobSection===sec.key?C.blue:C.text }}>{sec.label}</span>
                  <Ic n="ChevD" s={15} style={{ color:mobSection===sec.key?C.blue:C.textL, transition:'transform .2s', transform:mobSection===sec.key?'rotate(180deg)':'none' }} />
                </button>

                {/* Section items */}
                {mobSection===sec.key && (
                  <div style={{ padding:'8px 8px 8px 16px', display:'flex', flexDirection:'column', gap:2 }}>
                    {sec.items.map(item => (
                      <button key={item.path} onClick={() => go(item.path)}
                        style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 14px', borderRadius:11, border:'none', background:'transparent', cursor:'pointer', textAlign:'left', transition:'background .15s' }}
                        onMouseEnter={e => e.currentTarget.style.background=C.bgSoft}
                        onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                        <div style={{ width:30, height:30, borderRadius:8, background:item.color+'15', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <Ic n={item.icon} s={14} style={{ color:item.color }} />
                        </div>
                        <span style={{ fontSize:14, fontWeight:600, color:C.text }}>{item.label}</span>
                        <Ic n="ChevR" s={12} style={{ color:C.textL, marginLeft:'auto' }} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Contact direct link */}
            <button onClick={() => go('/contact')}
              style={{ width:'100%', display:'flex', alignItems:'center', gap:12, padding:'14px 16px', borderRadius:14, background:'#fff', border:`1.5px solid ${C.border}`, cursor:'pointer', textAlign:'left', marginBottom:4 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:C.bgAlt, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Ic n="Mail" s={16} style={{ color:C.textM }} />
              </div>
              <span style={{ fontSize:15, fontWeight:700, color:C.text }}>Contact Us</span>
              <Ic n="ChevR" s={15} style={{ color:C.textL, marginLeft:'auto' }} />
            </button>
          </div>

          {/* Bottom CTA */}
          <div style={{ padding:'16px 20px', borderTop:`1px solid ${C.border}`, background:C.bgSoft }}>
            <button onClick={() => { openConsult(); setMob(false) }} style={{ width:'100%', padding:'15px', borderRadius:14, background:`linear-gradient(135deg,${C.blue},${C.purple})`, border:'none', color:'#fff', fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
              Book Free Consultation →
            </button>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:10 }}>
              <a href="tel:+442071932502" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, padding:'10px', borderRadius:10, background:'#fff', border:`1.5px solid ${C.border}`, textDecoration:'none', fontSize:12, fontWeight:600, color:C.text }}>
                <Ic n="Phone" s={13} style={{ color:C.blue }} /> Call UK
              </a>
              <a href="mailto:hello@devinstratus.com" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, padding:'10px', borderRadius:10, background:'#fff', border:`1.5px solid ${C.border}`, textDecoration:'none', fontSize:12, fontWeight:600, color:C.text }}>
                <Ic n="Mail" s={13} style={{ color:C.purple }} /> Email Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
