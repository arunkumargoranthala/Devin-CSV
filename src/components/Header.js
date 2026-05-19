import { useState, useEffect, useRef } from 'react'
import { C, Ic } from './ui'
import { SOLUTIONS, SERVICES } from '../data/content'
import { INDUSTRIES } from '../data/industries'
import logoFull from '../assets/DS_Logo_and_Text.png'

/* NAV_INDUSTRIES — derived from INDUSTRIES data so the menu always stays in sync */
const NAV_INDUSTRIES = INDUSTRIES.map(ind => ({
  n: ind.icon, t: ind.heading, d: ind.desc, c: ind.color, bg: ind.bg, slug: ind.slug,
}))
const NAV_RESOURCES = [
  // { n:'FileText', t:'Case Studies',      d:'Real results from real clients',       c:C.blue,   bg:C.blueL,   slug:'case-studies'   }, // HIDDEN — uncomment when content is ready
  // { n:'BookOpen', t:'White Papers',      d:'Deep-dive technical guides',           c:C.purple, bg:C.purpleL, slug:'white-papers'   }, // HIDDEN — uncomment when content is ready
  // { n:'Video',    t:'Webinars & Events', d:'Live & on-demand sessions',            c:C.teal,   bg:C.tealL,   slug:'webinars'       }, // HIDDEN — uncomment when content is ready
  { n:'Chart',    t:'Blog & Insights',      d:'Expert tips, news & trends',           c:C.orange, bg:C.orangeL, slug:'blog'           },
  { n:'Calc',     t:'ROI Calculator',       d:'Model your business case',             c:C.green,  bg:C.greenL,  slug:'roi-calculator' },
  { n:'Award',    t:'MS Certifications',    d:'Our Gold Partner credentials',         c:C.blue,   bg:C.blueL,   slug:'certifications' },
  // { n:'Users',    t:'Partner Programme',  d:'Become a referral partner',            c:C.purple, bg:C.purpleL, slug:'partner'        }, // HIDDEN — uncomment when content is ready
  { n:'Globe',    t:'Documentation Hub',    d:'Technical docs & integration guides',  c:C.teal,   bg:C.tealL,   slug:'docs'           },
]
const NAV_COMPANY = [
  { n:'Award',     t:'About DevinStratus', d:'Our story, mission & values',    c:C.blue,   bg:C.blueL,   slug:'about'   },
  { n:'Users',     t:'Our Team',           d:'120+ certified consultants',     c:C.purple, bg:C.purpleL, slug:'team'    },
  { n:'Globe',     t:'Global Offices',     d:'London · NYC · Toronto · Delhi', c:C.teal,   bg:C.tealL,   slug:'global'  },
  // { n:'Star',   t:'Awards',             d:'Microsoft Inner Circle 2025',    c:C.orange, bg:C.orangeL, slug:'awards'  }, // HIDDEN — uncomment to show
  { n:'Brief',     t:'Careers',            d:'Join our growing practice',      c:C.green,  bg:C.greenL,  slug:'careers' },
  // { n:'Megaphone', t:'Press & Media',   d:'News, announcements & PR',       c:C.purple, bg:C.purpleL, slug:'press'   }, // HIDDEN — uncomment to show
]

export default function Header({ navigate, openConsult }) {
  const [sc,  setSc]  = useState(false)
  const [mob, setMob] = useState(false)
  const [mobSection, setMobSection] = useState(null)
  const [open, setOpen] = useState(null)
  const [activeSlug, setActiveSlug] = useState(SOLUTIONS[0]?.slug)
  const timers = useRef({})

  useEffect(() => {
    const h = () => setSc(window.scrollY > 8)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  useEffect(() => {
    // iOS-safe scroll lock
    if (mob) {
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${window.scrollY}px`
    } else {
      const top = document.body.style.top
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      if (top) window.scrollTo(0, -parseInt(top || '0'))
    }
    return () => {
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
    }
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
    width:w,
    background:'linear-gradient(180deg, rgba(238, 245, 255, 0.96) 0%, rgba(225, 237, 255, 0.94) 100%)',
    backdropFilter:'blur(40px) saturate(180%)',
    WebkitBackdropFilter:'blur(40px) saturate(180%)',
    border:`1.5px solid rgba(0, 102, 255, 0.18)`, borderRadius:20,
    boxShadow:'0 24px 80px rgba(0, 53, 128, 0.22), 0 4px 20px rgba(0, 53, 128, 0.10), inset 0 1px 0 rgba(255,255,255,0.6)',
    overflow:'hidden', zIndex:9999,
    animation:'dropIn .18s ease',
    ...extra
  })

  const cardBtn = (color) => ({
    display:'flex', alignItems:'center', gap:11, padding:'12px 14px',
    borderRadius:13,
    border:`1px solid rgba(0, 102, 255, 0.08)`,
    background:'linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(232, 242, 255, 0.45) 100%)',
    boxShadow:'inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 2px rgba(0,53,128,0.04)',
    cursor:'pointer', textAlign:'left', transition:'all .2s cubic-bezier(.2,.8,.2,1)',
    position:'relative', overflow:'hidden', backdropFilter:'blur(8px)'
  })
  const onCH = (e,c) => { e.currentTarget.style.borderColor=c+'66'; e.currentTarget.style.boxShadow=`inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 24px ${c}22`; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.background='linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(240, 247, 255, 0.85) 100%)' }
  const offCH = e => { e.currentTarget.style.borderColor='rgba(0, 102, 255, 0.08)'; e.currentTarget.style.boxShadow='inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 2px rgba(0,53,128,0.04)'; e.currentTarget.style.transform='none'; e.currentTarget.style.background='linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(232, 242, 255, 0.45) 100%)' }

  const sec = SOLUTIONS.find(s => s.slug === activeSlug) || SOLUTIONS[0]

  // ── Mobile accordion sections ──
  // NOTE: Industries hidden for now — uncomment the industries entry below to re-enable it in mobile nav
  const MOB_SECTIONS = [
    { key:'solutions',  label:'Solutions',  icon:'Package', items: SOLUTIONS.map(s => ({ label:s.heading, path:`/solutions/${s.slug}`, color:s.color, icon:s.icon })) },
    { key:'services',   label:'Services',   icon:'Wrench',  items: SERVICES.map(s =>  ({ label:s.t,       path:`/service/${s.slug}`,   color:s.color, icon:s.n    })) },
    { key:'industries', label:'Industries', icon:'Globe',   items: NAV_INDUSTRIES.map(i => ({ label:i.t, path:`/industries/${i.slug}`, color:i.c, icon:i.n })) },
    { key:'resources',  label:'Resources',  icon:'BookOpen',items: NAV_RESOURCES.map(r  => ({ label:r.t, path:`/resources/${r.slug}`,  color:r.c, icon:r.n })) },
    { key:'company',    label:'Company',    icon:'Award',   items: NAV_COMPANY.map(c    => ({ label:c.t, path: `/company/${c.slug}`,    color:c.c, icon:c.n })) },
  ]

  return (
    <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:10000, background:sc?'rgba(232, 242, 255, 0.55)':'transparent', borderBottom:`1px solid ${sc?'rgba(0, 102, 255, 0.10)':'transparent'}`, boxShadow:sc?'0 4px 24px rgba(0, 63, 179, 0.06)':'none', backdropFilter:sc?'blur(20px) saturate(180%)':'none', WebkitBackdropFilter:sc?'blur(20px) saturate(180%)':'none', transition:'all .25s' }}>
      <div className="ds-header-bar" style={{ padding:'0 56px', height:68, display:'flex', alignItems:'center', gap:24 }}>

        {/* Logo */}
        <button onClick={() => go('/')} style={{ display:'flex', alignItems:'center', background:'none', border:'none', cursor:'pointer', flexShrink:0, padding:0 }}>
          {/* Full logo with text — visible on desktop, hidden on mobile */}
          <img
            src={logoFull}
            alt="DevinStratus"
            className="hide-desk"
            style={{ height:50, width:'auto', display:'block', objectFit:'contain' }}
          />
          {/* Full logo with text — also shown on mobile (smaller) for brand prominence */}
          <img
            src={logoFull}
            alt="DevinStratus"
            className="show-mob ds-header-logo-mob"
            style={{ height:38, width:'auto', display:'block', objectFit:'contain' }}
          />
        </button>

        {/* Desktop nav */}
        <nav className="nav-wrapper hide-desk" style={{ display:'flex', alignItems:'center', gap:2, marginLeft:'auto', justifyContent:'flex-end' }}>

          {/* SOLUTIONS */}
          <NavItem label="Solutions" k="solutions">
            <div style={{ ...mega(780,'right'), display:'flex', flexDirection:'column' }}>
              <div style={{ display:'grid', gridTemplateColumns:'220px 1fr' }}>
                <div style={{ background:'rgba(0, 102, 255, 0.04)', borderRight:'1px solid rgba(0, 102, 255, 0.08)', padding:'14px 10px', display:'flex', flexDirection:'column', gap:2, maxHeight:460, overflowY:'auto', scrollbarWidth:'thin' }}>
                  <div style={{ fontSize:9, fontWeight:800, letterSpacing:'.14em', color:C.textL, padding:'4px 8px 8px', textTransform:'uppercase' }}>All Solutions</div>
                  {SOLUTIONS.map((s) => (
                    <button key={s.slug} className={`sol-cat-btn ${activeSlug===s.slug?'sol-active':''}`} onMouseEnter={() => setActiveSlug(s.slug)} onClick={() => go(`/solutions/${s.slug}`)}>
                      <div style={{ width:32, height:32, borderRadius:9, flexShrink:0, background:activeSlug===s.slug?s.bg:C.bgAlt, display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <Ic n={s.icon} s={14} style={{ color:activeSlug===s.slug?s.color:C.textL }} />
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:12.5, fontWeight:700, color:activeSlug===s.slug?s.color:C.text, lineHeight:1.2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.heading}</div>
                        <div style={{ fontSize:10.5, color:C.textL, marginTop:1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.desc}</div>
                      </div>
                      <Ic n="ChevR" s={11} style={{ color:activeSlug===s.slug?s.color:C.border, flexShrink:0 }} />
                    </button>
                  ))}
                </div>
                <div key={activeSlug} className="sol-items-panel" style={{ padding:'18px 16px', display:'flex', flexDirection:'column' }}>
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
              <div style={{ padding:'10px 20px', background:'rgba(0, 102, 255, 0.04)', borderTop:'1px solid rgba(0, 102, 255, 0.08)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:11.5, color:C.textM }}><span style={{ fontWeight:700, color:C.text }}>{SOLUTIONS.length} categories</span> · Browse full portfolio</span>
                <button onClick={() => go('/solutions')} style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:700, color:C.blue, background:'none', border:'none', cursor:'pointer' }}>View all <Ic n="Arrow" s={12} /></button>
              </div>
            </div>
          </NavItem>

          {/* SERVICES */}
          <NavItem label="Services" k="services">
            <div style={mega(660,'right')}>
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
              <div style={{ padding:'10px 20px', background:'rgba(0, 102, 255, 0.04)', borderTop:'1px solid rgba(0, 102, 255, 0.08)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:11.5, color:C.textM }}>Implementation through managed support</span>
                <button onClick={() => go('/services')} style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:700, color:C.blue, background:'none', border:'none', cursor:'pointer' }}>All services <Ic n="Arrow" s={12} /></button>
              </div>
            </div>
          </NavItem>

          {/* INDUSTRIES */}
          <NavItem label="Industries" k="industries">
            <div style={mega(720,'right')}>
              <div style={{ padding:'18px 16px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                  <div style={{ fontSize:10, fontWeight:800, letterSpacing:'.14em', color:C.teal }}>INDUSTRIES WE SERVE</div>
                  <span style={{ fontSize:11, color:C.textL }}>18 industry-specific solutions</span>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                  {INDUSTRIES.map(ind => (
                    <button key={ind.slug} onClick={() => go(`/industries/${ind.slug}`)} style={cardBtn(ind.color)} onMouseEnter={e=>onCH(e,ind.color)} onMouseLeave={offCH}>
                      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:`linear-gradient(180deg,${ind.color},${ind.color}55)`, borderRadius:'13px 0 0 13px' }} />
                      <div style={{ width:38, height:38, borderRadius:10, background:ind.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginLeft:4 }}>
                        <Ic n={ind.icon} s={17} style={{ color:ind.color }} />
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:2 }}>{ind.heading}</div>
                        <div style={{ fontSize:11, color:C.textL, marginBottom:4 }}>{ind.desc}</div>
                        <div style={{ fontSize:10.5, color:ind.color, fontWeight:700, letterSpacing:'.02em' }}>{ind.items.length} solutions →</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ padding:'10px 20px', background:'rgba(0, 102, 255, 0.04)', borderTop:'1px solid rgba(0, 102, 255, 0.08)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
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
              <div style={{ padding:'10px 20px', background:'rgba(0, 102, 255, 0.04)', borderTop:'1px solid rgba(0, 102, 255, 0.08)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
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

        {/* Hamburger */}
        <button className="show-mob ds-burger" onClick={e => { e.stopPropagation(); setMob(m => !m); setMobSection(null) }} style={{ marginLeft:'auto', background:'transparent', border:'none', cursor:'pointer', padding:'8px', position:'relative', zIndex:10002, flexShrink:0, WebkitTapHighlightColor:'transparent', touchAction:'manipulation', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:10, transition:'background .18s' }}>
          <Ic n={mob?'X':'Menu'} s={26} style={{ color:'#0a0a14', strokeWidth:2 }} />
        </button>
      </div>

      {/* ── MOBILE DRAWER ── */}
      {mob && (
        <div style={{ position:'fixed', top:0, left:0, right:0, bottom:0, background:'linear-gradient(170deg, #f5f9ff 0%, #e8f2ff 50%, #dde9ff 100%)', overflowY:'auto', zIndex:10001, paddingTop:68, WebkitOverflowScrolling:'touch' }}>
          {/* Decorative orb (matches hero) */}
          <div style={{ position:'absolute', top:-80, right:-80, width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,102,255,0.18), transparent 70%)', filter:'blur(60px)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', bottom:-60, left:-60, width:240, height:240, borderRadius:'50%', background:'radial-gradient(circle, rgba(0,53,128,0.12), transparent 70%)', filter:'blur(60px)', pointerEvents:'none' }} />

          {/* Header strip */}
          <div style={{ padding:'14px 20px 10px', position:'relative', zIndex:1 }}>
            <div style={{ fontSize:13, fontWeight:700, color:'#475569' }}>Navigation</div>
          </div>

          <div style={{ padding:'4px 16px 16px', position:'relative', zIndex:1 }}>
            {MOB_SECTIONS.map(sec => (
              <div key={sec.key} style={{ marginBottom:8 }}>
                {/* Section header button */}
                <button
                  onClick={() => setMobSection(mobSection===sec.key ? null : sec.key)}
                  style={{
                    width:'100%', display:'flex', alignItems:'center', gap:14, padding:'15px 16px',
                    borderRadius:16,
                    background: mobSection===sec.key
                      ? 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(232,242,255,0.85) 100%)'
                      : 'linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(245,249,255,0.55) 100%)',
                    border: `1px solid ${mobSection===sec.key ? 'rgba(0,102,255,0.30)' : 'rgba(0,102,255,0.10)'}`,
                    boxShadow: mobSection===sec.key
                      ? 'inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 24px rgba(0,102,255,0.15)'
                      : 'inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 2px rgba(0,53,128,0.04)',
                    backdropFilter:'blur(10px)',
                    cursor:'pointer', textAlign:'left', transition:'all .22s cubic-bezier(.2,.8,.2,1)'
                  }}>
                  <div style={{
                    width:40, height:40, borderRadius:11,
                    background: mobSection===sec.key
                      ? 'linear-gradient(135deg, #0066FF, #003580)'
                      : 'linear-gradient(135deg, rgba(0,102,255,0.10), rgba(0,53,128,0.06))',
                    display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                    boxShadow: mobSection===sec.key ? '0 4px 12px rgba(0,102,255,0.35)' : 'none',
                    transition:'all .22s'
                  }}>
                    <Ic n={sec.icon} s={18} style={{ color: mobSection===sec.key ? '#fff' : '#0066FF' }} />
                  </div>
                  <span style={{ flex:1, fontSize:16, fontWeight:700, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{sec.label}</span>
                  <Ic n="ChevD" s={16} style={{ color:'#0066FF', transition:'transform .25s', transform:mobSection===sec.key?'rotate(180deg)':'none' }} />
                </button>

                {/* Section items */}
                {mobSection===sec.key && (
                  <div style={{ padding:'10px 6px 4px 8px', display:'flex', flexDirection:'column', gap:4 }}>
                    {sec.items.map(item => (
                      <button key={item.path} onClick={() => go(item.path)}
                        style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:11, border:'none', background:'transparent', cursor:'pointer', textAlign:'left', transition:'all .15s' }}
                        onMouseEnter={e => { e.currentTarget.style.background='rgba(0,102,255,0.06)'; e.currentTarget.style.transform='translateX(2px)' }}
                        onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.transform='none' }}>
                        <div style={{ width:32, height:32, borderRadius:9, background:'rgba(0,102,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <Ic n={item.icon} s={14} style={{ color:'#0066FF' }} />
                        </div>
                        <span style={{ fontSize:14.5, fontWeight:600, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{item.label}</span>
                        <Ic n="ChevR" s={13} style={{ color:'#94a3b8', marginLeft:'auto' }} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Contact direct link */}
            <button onClick={() => go('/contact')}
              style={{
                width:'100%', display:'flex', alignItems:'center', gap:14, padding:'15px 16px',
                borderRadius:16,
                background:'linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(245,249,255,0.55) 100%)',
                border:'1px solid rgba(0,102,255,0.10)',
                boxShadow:'inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 2px rgba(0,53,128,0.04)',
                backdropFilter:'blur(10px)',
                cursor:'pointer', textAlign:'left', marginBottom:8, transition:'all .22s'
              }}>
              <div style={{ width:40, height:40, borderRadius:11, background:'linear-gradient(135deg, rgba(0,102,255,0.10), rgba(0,53,128,0.06))', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Ic n="Mail" s={18} style={{ color:'#0066FF' }} />
              </div>
              <span style={{ flex:1, fontSize:16, fontWeight:700, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Contact Us</span>
              <Ic n="ChevR" s={16} style={{ color:'#0066FF' }} />
            </button>
          </div>

          {/* Bottom CTA panel */}
          <div style={{ padding:'8px 16px 24px', position:'relative', zIndex:1 }}>
            <button onClick={() => { navigate('/contact'); setMob(false) }} style={{ width:'100%', padding:'15px', borderRadius:14, background:'linear-gradient(135deg,#003580 0%,#0066FF 100%)', border:'none', color:'#fff', fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", boxShadow:'0 8px 24px rgba(0,53,128,0.30)', transition:'all .2s' }}>
              Contact Us →
            </button>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:10 }}>
              <a href="tel:+442071932502" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, padding:'11px', borderRadius:11, background:'linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(245,249,255,0.55) 100%)', border:'1px solid rgba(0,102,255,0.12)', textDecoration:'none', fontSize:12.5, fontWeight:700, color:'#0a0a14', backdropFilter:'blur(8px)' }}>
                <Ic n="Phone" s={13} style={{ color:'#0066FF' }} /> Call UK
              </a>
              <a href="mailto:hello@devinstratus.com" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, padding:'11px', borderRadius:11, background:'linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(245,249,255,0.55) 100%)', border:'1px solid rgba(0,102,255,0.12)', textDecoration:'none', fontSize:12.5, fontWeight:700, color:'#0a0a14', backdropFilter:'blur(8px)' }}>
                <Ic n="Mail" s={13} style={{ color:'#0066FF' }} /> Email Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}