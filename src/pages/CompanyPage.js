import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { C, Ic } from '../components/ui'
import { OFFICES } from '../data/offices'
import Leader_1 from '../assets/Leader_1.png'
import Leader_2 from '../assets/Leader_2.jpg'
import Leader_3 from '../assets/Leader_3.jpg'
import Leader_4 from '../assets/Leader_4.jpg'
import Aboutus_Img from '../assets/Aboutus_Img.png'
import Team_Img from '../assets/Team_Img.png'
import Global_Img from '../assets/Global_Img.png'
import Careers_Img from '../assets/Careers_Img.png'
import AnimatedMap from '../components/AnimatedMap'
import AnimatedCareers from '../components/AnimatedCareers'
import CareersHeroAnimation from '../components/CareersHeroAnimation'

function useReveal() {
  useEffect(() => {
    const t = setTimeout(() => {
      document.querySelectorAll('.rv').forEach(el => {
        const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('show'); ob.disconnect() } }, { threshold: .1 })
        ob.observe(el)
      })
    }, 60)
    return () => clearTimeout(t)
  })
}

function AnimatedStat({ valueStr, label }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  
  const numMatch = valueStr.match(/\d+/);
  const targetNum = numMatch ? parseInt(numMatch[0], 10) : 0;
  const prefix = valueStr.substring(0, numMatch ? numMatch.index : 0);
  const suffix = valueStr.substring(numMatch ? numMatch.index + numMatch[0].length : valueStr.length);

  useEffect(() => {
    if (!targetNum || !ref.current) {
      if (!targetNum) setCount(valueStr);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        let start = 0;
        const duration = 2000;
        const increment = Math.ceil(targetNum / (duration / 16));
        const timer = setInterval(() => {
          start += increment;
          if (start >= targetNum) {
            setCount(targetNum);
            clearInterval(timer);
          } else {
            setCount(start);
          }
        }, 16);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [targetNum, hasAnimated]);

  return (
    <div ref={ref} style={{ textAlign: 'left' }}>
      <div style={{ fontSize: 26, fontWeight: 900, color: '#0a0a14', fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: '-0.02em', display: 'flex', alignItems: 'center' }}>
        {targetNum ? <>{prefix}{count}{suffix}</> : valueStr}
      </div>
      <div style={{ fontSize: 11, color: '#64748b', marginTop: 3, fontWeight: 600, letterSpacing: '.04em' }}>{label}</div>
    </div>
  )
}

// ── Content data ────────────────────────────────────────────────────────────────
const TIMELINE = [
  { year: '2023', title: 'Founded in Barrie, Ontario', desc: 'DevinStratus Technologies Inc incorporated in Canada to build enterprise AI orchestration on the Microsoft platform — moving beyond isolated tools toward unified, intelligent architectures.' },
  { year: '2024', title: 'First Enterprise Engagements', desc: 'Delivered early AI-driven integration and ITSM intelligence projects for North American clients, proving the orchestration-first approach in production.' },
  { year: '2025', title: 'AI Practice Deepens', desc: 'Copilot Studio, Azure AI, and Microsoft Fabric became core to the delivery model, with structured AI processing layers for classification, prediction, and workflow automation.' },
  { year: '2026', title: 'Hyderabad Delivery Centre Opens', desc: 'DevinStratus Technologies Pvt Ltd established in Hitech City, Hyderabad — scaling delivery capacity and enabling cross-timezone coverage between Canada and India.' },
]

const VALUES = [
  { icon: 'Shield', title: 'Client-First Always', color: C.blue, desc: 'Every decision we make is evaluated against one question: does this deliver more value for our clients? Our success metrics are measured by theirs.' },
  { icon: 'Star', title: 'Uncompromising Quality', color: C.purple, desc: 'We hold ourselves to the same standard on day 100 of an engagement as on day 1. Every deliverable is reviewed, tested, and signed off before it reaches you.' },
  { icon: 'Users', title: 'People-Led Delivery', color: C.teal, desc: 'Technology is only as good as the people configuring it. We invest heavily in our team\'s continuous certification, training and wellbeing.' },
  { icon: 'Globe', title: 'Transparent Partnership', color: C.orange, desc: 'No surprises. We tell you what\'s working, what isn\'t, and what we\'re doing about it. Honest communication is non-negotiable.' },
  { icon: 'Zap', title: 'Outcome Obsessed', color: C.green, desc: 'We\'re not satisfied with a system that\'s technically delivered. We measure success by the business outcomes it drives — efficiency, revenue, insight.' },
  { icon: 'Award', title: 'Continuous Innovation', color: C.blue, desc: 'We track every Microsoft release, test every AI feature, and proactively bring new capabilities to clients before they even know to ask for them.' },
]

const TEAM = [
  {
    name: 'Deepakteja', role: 'Founder & CTO', loc: 'Barrie, CA', exp: 'AI Architecture', cert: 'AI-102 · DP-600', initials: 'DT', color: C.blue,
    about: 'Deepakteja founded DevinStratus in 2023 with a vision to make enterprise AI deliver real, measurable business outcomes. He sets technical strategy, designs the AI orchestration architectures at the heart of every engagement, and leads the Microsoft technology partnerships the firm is built on.',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Vinay Kumar', role: 'Co-Founder & COO', loc: 'Barrie, CA', exp: 'Operations', cert: 'SC-300 · AB-103', initials: 'VK', color: C.green,
    about: 'Vinay Kumar co-founded DevinStratus in 2023 alongside Deepakteja. As Chief Operating Officer he runs delivery governance, security and access architecture, and customer success — ensuring every engagement lands on time, on budget, and on outcome.',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Manideepa', role: 'Director of Finance & HR', loc: 'Hyderabad, IN', exp: 'Finance & People', cert: 'CA · MBA-HR', initials: 'MD', color: C.purple,
    about: 'Manideepa leads finance, people operations, and corporate governance across DevinStratus. She manages financial planning, compliance, and the talent strategy that has grown the firm into a focused AI engineering team across our Canada and India offices.',
    linkedin: 'https://linkedin.com'
  },
  {
    name: 'Vineeth', role: 'Director of Sales & Marketing', loc: 'Barrie, CA', exp: 'Growth', cert: 'AB-103 · AI-900', initials: 'VN', color: C.teal,
    about: 'Vineeth heads sales and marketing, owning revenue growth, brand positioning, and strategic account development. He translates the firm\'s deep AI engineering capability into outcomes enterprise buyers can act on.',
    linkedin: 'https://linkedin.com'
  },
]

// ── Microsoft certifications held across the team (real codes, client-confirmed) ──
const CERTIFICATIONS = [
  { code: 'DP-600', name: 'Fabric Analytics Engineer',        tier: 'Associate', icon: 'BarChart', color: C.blue },
  { code: 'AI-102', name: 'Azure AI Engineer',                tier: 'Associate', icon: 'Brain',    color: C.purple },
  { code: 'AB-103', name: 'Azure AI Apps & Agents Developer', tier: 'Associate', icon: 'Cpu',      color: C.teal },
  { code: 'SC-300', name: 'Identity & Access Administrator',  tier: 'Associate', icon: 'Shield',   color: C.orange },
  { code: 'AB-731', name: 'Microsoft Certified Specialist',   tier: 'Specialist', icon: 'Award',   color: C.green },
  { code: 'AB-100', name: 'Microsoft Certified',              tier: 'Fundamentals', icon: 'CheckCircle', color: C.blue },
]

// OFFICES now imported from shared data — see top of file

const JOBS = [
  { title: 'Senior AI Solutions Engineer (Azure AI)', loc: 'Hyderabad / Remote', type: 'Full-time', dept: 'AI Practice', color: C.blue },
  { title: 'Power Platform Developer', loc: 'Hyderabad / Remote', type: 'Full-time', dept: 'Technical', color: C.purple },
  { title: 'Dynamics 365 Functional Consultant', loc: 'Hyderabad / Remote', type: 'Full-time', dept: 'Delivery', color: C.teal },
  { title: 'Azure Integration & Orchestration Architect', loc: 'Hyderabad / Remote', type: 'Full-time', dept: 'Technical', color: C.orange },
  { title: 'Business Development Manager', loc: 'Barrie / Hybrid', type: 'Full-time', dept: 'Sales', color: C.green },
  { title: 'Microsoft Copilot Solution Architect', loc: 'Remote (Any)', type: 'Full-time', dept: 'AI Practice', color: C.blue },
]

// ── Shared Hero ─────────────────────────────────────────────────────────────────
function CompanyHero({ section, navigate }) {
  const cfg = {
    about: { color: C.blue, title: 'About DevinStratus', sub: 'Enterprise AI orchestration, built on Microsoft', img: Aboutus_Img, alt: 'DevinStratus team at work', stat1Icon: 'Award', stat1Color: C.blue, stat1Title: 'Microsoft Partner', stat1Sub: 'Power Platform · Azure AI', stat2Icon: 'Users', stat2Color: C.teal, stat2Title: 'Canada · India', stat2Sub: 'Two-Country Team' },
    team: { color: C.purple, title: 'Meet Our Team', sub: 'A focused AI engineering team across Canada & India', img: Team_Img, alt: 'Diverse professional team collaborating', stat1Icon: 'Award', stat1Color: C.purple, stat1Title: 'Certified Experts', stat1Sub: 'Microsoft Stack', stat2Icon: 'Target', stat2Color: C.blue, stat2Title: 'AI Engineers', stat2Sub: 'Orchestration-First' },
    global: { color: C.teal, title: 'Global Offices', sub: 'Barrie · Hyderabad', animatedMap: true },
    careers: { color: C.green, title: 'Where you work matters less than when.', sub: 'Two offices · one team · 18+ hours of daily coverage', animatedCareers: true, stat1Icon: 'Globe', stat1Color: C.green, stat1Title: 'Canada · India', stat1Sub: 'Two-Office Model', stat2Icon: 'Clock', stat2Color: C.orange, stat2Title: 'Follow-the-Sun', stat2Sub: 'Always-On Delivery' },
  }[section] || { color: C.blue, title: 'Company', sub: '' }

  return (
    <section style={{
      background: `
        radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.35), transparent 55%),
        radial-gradient(circle at 80% 70%, rgba(0, 102, 255, 0.20), transparent 60%),
        linear-gradient(135deg, #ffffff 0%, #f0f7ff 25%, #d6ebff 55%, #b8defa 80%, #9bd3f5 100%)
      `,
      paddingTop: 0, position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(0, 102, 255, 0.10)'
    }}>
      {/* Soft floating decorative orbs */}
      <div style={{ position: 'absolute', top: '15%', right: '-5%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6, 182, 212, 0.30), transparent 70%)', filter: 'blur(50px)', animation: 'heroFloat 8s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-15%', left: '-5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 102, 255, 0.18), transparent 70%)', filter: 'blur(50px)', animation: 'heroFloat 11s ease-in-out infinite reverse', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', right: '25%', width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${cfg.color}25, transparent 70%)`, filter: 'blur(40px)', animation: 'heroFloat 13s ease-in-out infinite 2s', pointerEvents: 'none' }} />
      {/* Subtle grid pattern overlay (hidden when animatedMap or animatedCareers is true to avoid visual noise) */}
      {(!cfg.animatedMap && !cfg.animatedCareers) && (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0, 102, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 102, 255, 0.04) 1px, transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse at center, #000 30%, transparent 75%)', pointerEvents: 'none' }} />
      )}

      <div className={cfg.animatedCareers ? 'company-hero-grid careers-hero-grid' : 'company-hero-grid'} style={{ maxWidth: 1400, margin: '0 auto', padding: '62px 24px 48px', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: cfg.animatedCareers ? '1fr 1fr' : ((cfg.img || cfg.animatedMap) ? '0.5fr 1.5fr' : '1fr'), gap: 40, alignItems: 'center', height: 560 }}>
        {/* LEFT — content */}
        <div>
          <button onClick={() => navigate('/company/about')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0, 102, 255, 0.18)', borderRadius: 50, padding: '7px 16px', fontSize: 12, fontWeight: 600, color: '#475569', cursor: 'pointer', marginBottom: 24, backdropFilter: 'blur(8px)', transition: 'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'rgba(0, 102, 255, 0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(0, 102, 255, 0.18)' }}>
            <Ic n="ChevD" s={12} style={{ transform: 'rotate(90deg)', color: '#0066FF' }} /> Company
          </button>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${cfg.color}14`, border: `1px solid ${cfg.color}33`, borderRadius: 50, padding: '7px 16px', fontSize: 12, fontWeight: 700, color: cfg.color, marginBottom: 18, backdropFilter: 'blur(6px)' }}>
            <Ic n="Award" s={12} style={{ color: cfg.color }} /> Microsoft Technology Partner · Est. 2023
          </div>
          <h1 style={{ fontSize: 'clamp(30px,4.6vw,48px)', fontWeight: 900, color: '#0a0a14', lineHeight: 1.1, marginBottom: 14, fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: '-0.02em' }}>
            {cfg.title.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="grad-text" style={{ background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}aa)`, display: 'inline-block' }}>
              {cfg.title.split(' ').slice(-1)[0]}
            </span>
          </h1>
          <p style={{ fontSize: 16, color: '#475569', maxWidth: 520, lineHeight: 1.6 }}>{cfg.sub}</p>
          
          {section === 'careers' && (
            <div style={{ display: 'flex', gap: 14, marginTop: 24 }}>
              <button className="careers-cta-btn" onClick={() => {
                document.getElementById('current-openings')?.scrollIntoView({ behavior: 'smooth' });
              }} style={{ position: 'relative', overflow: 'hidden', padding: '14px 28px', borderRadius: 50, background: `linear-gradient(135deg, ${C.green}, ${C.teal})`, color: '#fff', fontSize: 15, fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: `0 8px 24px ${C.green}40`, transition: 'all .3s', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                Explore Open Roles
              </button>
              <button onClick={() => navigate('/company/team')} style={{ padding: '14px 28px', borderRadius: 50, background: 'rgba(255,255,255,0.8)', color: C.text, fontSize: 15, fontWeight: 700, border: `2px solid rgba(0, 102, 255, 0.15)`, cursor: 'pointer', transition: 'all .2s', fontFamily: "'Plus Jakarta Sans',sans-serif" }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.color = C.blue }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.8)'; e.currentTarget.style.borderColor = `rgba(0, 102, 255, 0.15)`; e.currentTarget.style.color = C.text }}>
                Meet the Team
              </button>
            </div>
          )}

          {/* Quick stats bar */}
          <div style={{ display: 'flex', gap: 32, marginTop: 32, flexWrap: 'wrap' }}>
            {[['2', 'Offices'], ['2', 'Countries'], ['30+', 'Specialists'], ['AI', 'First']].map(([v, l]) => (
              <AnimatedStat key={l} valueStr={v} label={l} />
            ))}
          </div>
        </div>

        {/* RIGHT — Animated Map (for Global Offices) */}
        {cfg.animatedMap && (
          <div className="company-hero-image" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '55vw', pointerEvents: 'none' }}>
            <AnimatedMap />
          </div>
        )}

        {/* RIGHT — Follow-the-Sun Ribbon (for Careers) */}
        {cfg.animatedCareers && (
          <div className="careers-hero-image" style={{ position: 'relative', width: '100%', height: 520 }}>
            <CareersHeroAnimation />
          </div>
        )}

        {/* RIGHT — Image */}
        {cfg.img && (
          <div className="company-hero-image" style={{ position: 'relative', width: '100%', height: '80%' }}>
            {/* Back frame — offset top-right */}
            <div style={{ position: 'absolute', top: -14, right: -14, left: 14, bottom: 14, borderRadius: 20, background: `linear-gradient(135deg, ${cfg.color}3a, ${C.teal}3a)`, border: `1px solid ${cfg.color}25`, zIndex: 0 }} />

            {/* Second back frame — offset bottom-left */}
            <div style={{ position: 'absolute', top: 14, right: 14, left: -14, bottom: -14, borderRadius: 20, background: `linear-gradient(135deg, ${cfg.color}28, ${C.purple}20)`, zIndex: 0 }} />

            {/* Image fills 100% width × 100% height of wrapper */}
            <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden', zIndex: 1, boxShadow: '0 24px 56px rgba(0, 53, 128, 0.20), inset 0 1px 0 rgba(255,255,255,0.9)', border: `1px solid ${cfg.color}33` }}>
              <img src={cfg.img} alt={cfg.alt}
                style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
            </div>

            {/* Floating stat 1 — top-right (overhanging image edge) */}
            <div className="hero-float-stat hero-float-stat-tr" style={{ position: 'absolute', top: 18, right: -22, padding: '12px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: `1px solid ${cfg.color}22`, boxShadow: '0 16px 36px rgba(0, 53, 128, 0.22)', zIndex: 3, display: 'flex', alignItems: 'center', gap: 11 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${cfg.stat1Color}, ${C.purple})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 14px ${cfg.stat1Color}48`, flexShrink: 0 }}>
                <Ic n={cfg.stat1Icon} s={18} style={{ color: '#fff' }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 900, color: '#0a0a14', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.05, letterSpacing: '-0.01em' }}>{cfg.stat1Title}</div>
                <div style={{ fontSize: 10, color: '#64748b', marginTop: 3, fontWeight: 600, letterSpacing: '.04em' }}>{cfg.stat1Sub}</div>
              </div>
            </div>

            {/* Floating stat 2 — bottom-left (overhanging image edge) */}
            <div className="hero-float-stat hero-float-stat-bl" style={{ position: 'absolute', bottom: 18, left: -22, padding: '12px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: `1px solid ${cfg.color}22`, boxShadow: '0 16px 36px rgba(0, 53, 128, 0.22)', zIndex: 3, display: 'flex', alignItems: 'center', gap: 11 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${cfg.stat2Color}, ${C.blue})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 14px ${cfg.stat2Color}48`, flexShrink: 0 }}>
                <Ic n={cfg.stat2Icon} s={18} style={{ color: '#fff' }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 900, color: '#0a0a14', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.05, letterSpacing: '-0.01em' }}>{cfg.stat2Title}</div>
                <div style={{ fontSize: 10, color: '#64748b', marginTop: 3, fontWeight: 600, letterSpacing: '.04em' }}>{cfg.stat2Sub}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ── Themed visual for non-photo Company sections ─────────────────────────────────
// Each section gets a unique enterprise-style card with relevant data + iconography.
function SectionVisual({ section, color }) {
  const visuals = {
    global: {
      icon: 'Globe',
      title: 'Two Offices · One Team',
      subtitle: '72 consultants · 12-hour overlap',
      items: [
        { icon: 'Pin', label: 'Ontario, Canada', sub: 'Head of Operations · 24 staff' },
        { icon: 'Pin', label: 'Hyderabad, India', sub: 'Delivery Center · 48 staff' },
        { icon: 'Clock', label: 'EST + IST overlap', sub: '12 hours of joint working time' },
        { icon: 'Globe', label: '24-hour coverage', sub: 'Follow-the-sun for Managed clients' },
      ],
    },
    careers: {
      icon: 'Users',
      title: "We're Hiring",
      subtitle: '6 open positions · remote-friendly',
      items: [
        { icon: 'Brain', label: 'Senior AI Solutions Engineer', sub: 'Hyderabad · Remote' },
        { icon: 'Cloud', label: 'Azure Orchestration Architect', sub: 'Hyderabad · Remote' },
        { icon: 'Cpu', label: 'Power Platform Developer', sub: 'Hyderabad · Remote' },
        { icon: 'Users', label: 'Business Development Manager', sub: 'Barrie · Hybrid' },
      ],
    },
  }
  const v = visuals[section] || visuals.global

  return (
    <div className="company-hero-image" style={{ position: 'relative', paddingRight: 32 }}>
      {/* Soft glow */}
      <div style={{ position: 'absolute', top: '8%', left: '8%', right: '8%', bottom: '8%', borderRadius: 32, background: `radial-gradient(circle, ${color}28, transparent 70%)`, filter: 'blur(40px)', zIndex: 0 }} />
      {/* Subtle gradient frame */}
      <div style={{ position: 'absolute', top: -10, right: -10, bottom: -10, left: -10, borderRadius: 28, background: `linear-gradient(135deg, ${color}, ${C.teal})`, opacity: 0.14, zIndex: 0 }} />

      {/* Main themed card */}
      <div style={{ position: 'relative', zIndex: 1, padding: '32px 30px 28px', borderRadius: 24, background: 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(245,249,255,0.94) 100%)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: `1px solid ${color}22`, boxShadow: '0 32px 80px rgba(0, 53, 128, 0.18), inset 0 1px 0 rgba(255,255,255,0.9)', overflow: 'hidden' }}>

        {/* Decorative corner blob */}
        <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${color}1f, transparent 70%)`, pointerEvents: 'none' }} />

        {/* Header — big icon + title + subtitle */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 24, position: 'relative', zIndex: 1 }}>
          <div style={{ width: 54, height: 54, borderRadius: 14, background: `linear-gradient(135deg, ${color}, ${color}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 10px 22px ${color}45, inset 0 1px 0 rgba(255,255,255,0.25)` }}>
            <Ic n={v.icon} s={26} style={{ color: '#fff' }} />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#0a0a14', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.18, letterSpacing: '-0.02em' }}>{v.title}</div>
            <div style={{ fontSize: 12.5, color: '#475569', marginTop: 6, fontWeight: 600, letterSpacing: '.02em' }}>{v.subtitle}</div>
          </div>
        </div>

        {/* Items list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative', zIndex: 1 }}>
          {v.items.map((it, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, background: 'rgba(0, 102, 255, 0.04)', border: '1px solid rgba(0, 102, 255, 0.08)', transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = `${color}10`; e.currentTarget.style.borderColor = `${color}30`; e.currentTarget.style.transform = 'translateX(4px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0, 102, 255, 0.04)'; e.currentTarget.style.borderColor = 'rgba(0, 102, 255, 0.08)'; e.currentTarget.style.transform = 'none' }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: `${color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Ic n={it.icon} s={16} style={{ color: color }} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 800, color: '#0a0a14', fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: '-0.01em', lineHeight: 1.3 }}>{it.label}</div>
                <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 2, fontWeight: 500 }}>{it.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── About Section ───────────────────────────────────────────────────────────────
function AboutSection({ navigate, openConsult }) {
  useReveal()
  return (
    <div>
      <section className="company-section" style={{ padding: '72px 24px', background: '#fff' }}>
        <div className="company-about-g" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          <div className="rv">
            <div style={{ width: 4, height: 40, borderRadius: 4, background: `linear-gradient(180deg,${C.blue},${C.purple})`, marginBottom: 16 }} />
            <h2 style={{ fontSize: 32, fontWeight: 800, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 16, lineHeight: 1.2 }}>
              We Engineer Enterprise AI That <span className="grad-text" style={{ background: `linear-gradient(135deg,${C.blue},${C.purple})`, display: 'inline-block' }}>Works as One System</span>
            </h2>
            <p style={{ fontSize: 15.5, color: C.textM, lineHeight: 1.85, marginBottom: 20 }}>
              DevinStratus Technologies engineers enterprise-grade AI systems that transform how organisations integrate, operate, and scale. We don't deploy isolated tools or one-off automations — we design intelligent orchestration architectures that unify enterprise ecosystems and embed AI directly into business workflows.
            </p>
            <p style={{ fontSize: 15.5, color: C.textM, lineHeight: 1.85, marginBottom: 20 }}>
              Modern enterprises run across interconnected landscapes of ITSM, CRM, ERP, analytics, automation, and cloud platforms — yet these systems too often work in silos, limiting visibility and slowing decisions. We build structured AI orchestration layers that standardise data models, connect cross-platform processes, and bring predictive intelligence into core operational pipelines.
            </p>
            <p style={{ fontSize: 15.5, color: C.textM, lineHeight: 1.85, marginBottom: 32 }}>
              Founded in Barrie, Ontario in 2023 and expanded with a Hyderabad delivery centre in 2026, we build on Microsoft technologies — Power Platform, Dynamics 365, Copilot Studio, Azure AI, and Microsoft Fabric — to deliver intelligent workflow engines, automation frameworks, and analytics structured for production environments.
            </p>
            <button onClick={openConsult} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 50, background: `linear-gradient(135deg,${C.blue},${C.purple})`, border: 'none', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", boxShadow: `0 8px 24px ${C.blue}33`, transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 14px 32px ${C.blue}44` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 8px 24px ${C.blue}33` }}>
              Talk to Our Team <Ic n="Arrow" s={14} style={{ color: '#fff' }} />
            </button>
          </div>
          <div className="rv">
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 16 }}>Our Mission</h3>
              <div style={{ background: `linear-gradient(135deg,${C.blue},${C.purple})`, borderRadius: 18, padding: 28, color: '#fff', position: 'relative', overflow: 'hidden', boxShadow: `0 12px 32px ${C.blue}28` }}>
                <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)', pointerEvents: 'none' }} />
                <Ic n="Target" s={28} style={{ color: 'rgba(255,255,255,.6)', marginBottom: 12 }} />
                <p style={{ fontSize: 16, lineHeight: 1.8, fontWeight: 500, position: 'relative', zIndex: 1 }}>
                  "To unify fragmented enterprise systems into one intelligent, governed architecture — so AI doesn't just assist teams, it orchestrates how the whole business runs."
                </p>
              </div>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 14 }}>Our Values</h3>
            <div className="company-values-g" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {VALUES.map(v => (
                <div key={v.title} style={{ padding: '18px', borderRadius: 14, border: '1px solid rgba(0, 102, 255, 0.10)', background: 'linear-gradient(180deg, #ffffff 0%, #fafcff 100%)', boxShadow: '0 1px 3px rgba(0, 53, 128, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)', transition: 'all .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = v.color + '45'; e.currentTarget.style.boxShadow = `0 10px 24px ${v.color}1a, inset 0 1px 0 rgba(255,255,255,0.9)`; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0, 102, 255, 0.10)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 53, 128, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)'; e.currentTarget.style.transform = 'none' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(135deg, ${v.color}, ${v.color}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, boxShadow: `0 4px 12px ${v.color}30` }}>
                    <Ic n={v.icon} s={16} style={{ color: '#fff' }} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 4, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{v.title}</div>
                  <div style={{ fontSize: 11.5, color: C.textM, lineHeight: 1.6 }}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="company-section" style={{ padding: '72px 24px', background: C.bgSoft }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="rv" style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ display: 'inline-flex', background: C.blueL, color: C.blue, borderRadius: 50, padding: '6px 16px', fontSize: 12, fontWeight: 700, marginBottom: 16 }}>OUR JOURNEY</div>
            <h2 style={{ fontSize: 'clamp(26px,4vw,38px)', fontWeight: 800, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>From Barrie to Hyderabad</h2>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: `linear-gradient(180deg,${C.blue},${C.purple})`, transform: 'translateX(-50%)', opacity: .3 }} />
            {TIMELINE.map((t, i) => (
              <div key={t.year} className="rv" style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', marginBottom: 32, position: 'relative' }}>
                <div style={{ width: '44%', padding: '22px 24px', background: '#fff', borderRadius: 18, border: `1.5px solid ${C.border}`, boxShadow: '0 4px 20px rgba(0,0,0,.06)', animation: `fadeUp .4s ease both ${i * 60}ms` }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: C.blue, marginBottom: 6, letterSpacing: '.08em' }}>{t.year}</div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 8 }}>{t.title}</h4>
                  <p style={{ fontSize: 13.5, color: C.textM, lineHeight: 1.65 }}>{t.desc}</p>
                </div>
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 14, height: 14, borderRadius: '50%', background: `linear-gradient(135deg,${C.blue},${C.purple})`, border: '3px solid #fff', boxShadow: '0 2px 8px rgba(0,87,184,.3)', zIndex: 1 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications band */}
      <CertificationsSection />
    </div>
  )
}

// ── Team Section — final design (Style 03 Minimal Grid + bio modal) ─────────────
function TeamSection() {
  useReveal()
  const [bioFor, setBioFor] = useState(null)  // member object when modal open, null otherwise

  // 4 leaders — already ordered in TEAM array: Deepak, Vinay, Deepa, Vineeth
  // Photo mapping: Leader_1=Deepak, Leader_4=Vinay, Leader_2=Deepa, Leader_3=Vineeth
  const LEADERS = [
    { ...TEAM[0], color: C.blue, photo: Leader_1 },  // Deepak — Founder & CEO
    { ...TEAM[1], color: C.green, photo: Leader_4 },  // Vinay — Co-Founder & COO
    { ...TEAM[2], color: C.purple, photo: Leader_2 },  // Deepa — Director of Finance & HR
    { ...TEAM[3], color: C.teal, photo: Leader_3 },  // Vineeth — Director of Sales & Marketing
  ]

  // Lock body scroll when modal is open
  useEffect(() => {
    if (bioFor) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      const onKey = (e) => { if (e.key === 'Escape') setBioFor(null) }
      window.addEventListener('keydown', onKey)
      return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
    }
  }, [bioFor])

  return (
    <section className="company-section" style={{ padding: '72px 24px', background: 'linear-gradient(180deg,#f5f9ff 0%,#fff 35%)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Section header */}
        <div className="rv" style={{ marginBottom: 48 }}>
          <div style={{ width: 4, height: 40, borderRadius: 4, background: `linear-gradient(180deg,${C.blue},${C.purple})`, marginBottom: 16 }} />
          <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', fontWeight: 900, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 10, letterSpacing: '-0.02em' }}>Leadership Team</h2>
          <p style={{ color: C.textM, fontSize: 16, maxWidth: 600, lineHeight: 1.65 }}>The people steering DevinStratus — deep enterprise AI and Microsoft platform expertise, real architecture experience, and an obsession with client outcomes.</p>
        </div>

        {/* Cards grid */}
        <div className="leaders-grid-final">
          {LEADERS.map((m, i) => (
            <div key={`lf-${m.name}`} className="rv leader-final"
              style={{
                position: 'relative',
                paddingBottom: 24,
                borderRadius: 22,
                background: '#ffffff',
                border: '1px solid rgba(0, 102, 255, 0.10)',
                boxShadow: '0 4px 16px rgba(0, 53, 128, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                overflow: 'hidden',
                cursor: 'default', transition: 'all .35s cubic-bezier(.22,1,.36,1)',
                animation: `fadeUp .55s ease both ${i * 70}ms`,
                textAlign: 'center',
                display: 'flex', flexDirection: 'column'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${m.color}45`; e.currentTarget.style.boxShadow = `0 18px 44px ${m.color}20, inset 0 1px 0 rgba(255, 255, 255, 0.9)`; e.currentTarget.style.transform = 'translateY(-5px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0, 102, 255, 0.10)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 53, 128, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)'; e.currentTarget.style.transform = 'none' }}>

              {/* Top section with soft gradient backdrop (borrowed from Style 6) */}
              <div style={{ position: 'relative', padding: '36px 22px 0', background: `linear-gradient(160deg, ${m.color}14 0%, transparent 75%)` }}>
                {/* Decorative corner shape */}
                <div style={{ position: 'absolute', top: 0, right: 0, width: 90, height: 90, background: `linear-gradient(225deg, ${m.color}18, transparent)`, borderRadius: '0 22px 0 90px', pointerEvents: 'none' }} />

                {/* FOUNDING TEAM badge — only for founders */}
                {m.role.toLowerCase().includes('founder') && (
                  <div style={{ position: 'absolute', top: 14, left: 14, display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px 4px 8px', borderRadius: 50, background: `linear-gradient(135deg, ${m.color}, ${m.color}cc)`, boxShadow: `0 4px 10px ${m.color}40`, zIndex: 3 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 6.5 7 1-5 4.5 1.5 7L12 17.5 5.5 21 7 14 2 9.5l7-1z" /></svg>
                    <span style={{ fontSize: 8.5, fontWeight: 800, color: '#fff', letterSpacing: '.12em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Founder</span>
                  </div>
                )}

                {/* Circular photo 160×160 with gradient ring */}
                <div style={{ position: 'relative', width: 160, height: 160, margin: '0 auto 20px', zIndex: 1 }}>
                  {/* Gradient ring */}
                  <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', background: `linear-gradient(135deg, ${m.color}, ${m.color}66)`, padding: 4, boxShadow: `0 10px 28px ${m.color}38` }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#fff' }}>
                      <Portrait member={m} variant="circle" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '0 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 6, letterSpacing: '-0.01em', lineHeight: 1.25 }}>{m.name}</h3>
                <div style={{ fontSize: 13, fontWeight: 600, color: m.color, marginBottom: 16, lineHeight: 1.4 }}>{m.role}</div>

                {/* Single divider */}
                <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${m.color}30, transparent)`, margin: '0 0 16px' }} />

                {/* Quick meta */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 14, fontSize: 11.5, color: C.textM, marginBottom: 18, flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Ic n="Pin" s={11} style={{ color: C.textL }} />{m.loc}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Ic n="Clock" s={11} style={{ color: C.textL }} />{m.exp}</span>
                </div>

                {/* Action buttons row */}
                <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                  <button onClick={() => setBioFor(m)}
                    style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 14px', borderRadius: 50, background: `${m.color}10`, color: m.color, fontSize: 12, fontWeight: 700, border: `1px solid ${m.color}25`, cursor: 'pointer', transition: 'all .2s', fontFamily: "'Plus Jakarta Sans',sans-serif" }}
                    onMouseEnter={e => { e.currentTarget.style.background = m.color; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = m.color }}
                    onMouseLeave={e => { e.currentTarget.style.background = `${m.color}10`; e.currentTarget.style.color = m.color; e.currentTarget.style.borderColor = `${m.color}25` }}>
                    <Ic n="FileText" s={11} />
                    Read Bio
                  </button>
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px 16px', borderRadius: 50, background: `linear-gradient(135deg, ${m.color}, ${m.color}cc)`, color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none', boxShadow: `0 4px 12px ${m.color}33`, transition: 'all .2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="rv" style={{ marginTop: 48, padding: '36px 40px', borderRadius: 24, background: 'linear-gradient(135deg, #f5f9ff 0%, #ffffff 100%)', border: '1px solid rgba(0, 102, 255, 0.10)', boxShadow: '0 4px 20px rgba(0, 53, 128, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 6, letterSpacing: '-0.01em' }}>Plus 100+ More Certified Consultants</h3>
            <p style={{ color: C.textM, fontSize: 14, marginBottom: 16, maxWidth: 540, lineHeight: 1.6 }}>Our full team includes specialists in D365 Finance, SCM, CRM, Power Platform, Azure, and AI — all Microsoft certified.</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['MB-300', 'MB-310', 'MB-320', 'MB-330', 'MB-800', 'MB-910', 'PL-400', 'AI-102'].map(cert => (
                <span key={cert} style={{ padding: '5px 12px', borderRadius: 50, background: 'rgba(0,102,255,0.10)', color: C.blue, fontSize: 11, fontWeight: 700, border: '1px solid rgba(0,102,255,0.15)' }}>{cert}</span>
              ))}
            </div>
          </div>
          <a href="mailto:careers@devinstratus.com"
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 50, background: `linear-gradient(135deg, #003580, #0066FF)`, color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(0, 53, 128, 0.30)', transition: 'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 32px rgba(0, 53, 128, 0.40)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 53, 128, 0.30)' }}>
            Join Our Team <Ic n="Arrow" s={14} style={{ color: '#fff' }} />
          </a>
        </div>
      </div>

      {/* ─────────── Bio Modal — portaled to body so it escapes any transformed ancestor ─────────── */}
      {bioFor && createPortal(
        <div onClick={() => setBioFor(null)}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999, background: 'rgba(10, 14, 30, 0.65)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, animation: 'bioFadeIn .25s ease' }}>
          <div onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', width: '100%', maxWidth: 560, maxHeight: '88vh', overflowY: 'auto', borderRadius: 22, background: 'linear-gradient(180deg, #ffffff 0%, #fafcff 100%)', border: `1px solid ${bioFor.color}30`, boxShadow: `0 28px 64px rgba(0, 14, 40, 0.40), 0 0 0 1px rgba(255,255,255,0.6) inset`, animation: 'bioPopIn .35s cubic-bezier(.22,1,.36,1)', margin: 'auto' }}>

            {/* Close button */}
            <button onClick={() => setBioFor(null)}
              aria-label="Close"
              style={{ position: 'absolute', top: 14, right: 14, width: 34, height: 34, borderRadius: '50%', background: 'rgba(0, 14, 40, 0.06)', border: '1px solid rgba(0, 14, 40, 0.10)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0, 14, 40, 0.12)'; e.currentTarget.style.transform = 'rotate(90deg)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0, 14, 40, 0.06)'; e.currentTarget.style.transform = 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>

            {/* Header band — color-tinted backdrop */}
            <div style={{ padding: '40px 32px 24px', background: `linear-gradient(160deg, ${bioFor.color}14 0%, transparent 75%)`, borderRadius: '22px 22px 0 0', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', background: `radial-gradient(circle, ${bioFor.color}1c, transparent 70%)`, pointerEvents: 'none' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 18, position: 'relative', zIndex: 1 }}>
                {/* Bigger photo in modal */}
                <div style={{ position: 'relative', width: 96, height: 96, flexShrink: 0 }}>
                  <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: `linear-gradient(135deg, ${bioFor.color}, ${bioFor.color}66)`, padding: 3, boxShadow: `0 8px 22px ${bioFor.color}40` }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#fff' }}>
                      <Portrait member={bioFor} variant="circle" />
                    </div>
                  </div>
                </div>

                <div style={{ minWidth: 0 }}>
                  {bioFor.role.toLowerCase().includes('founder') && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px 3px 7px', borderRadius: 50, background: `linear-gradient(135deg, ${bioFor.color}, ${bioFor.color}cc)`, boxShadow: `0 3px 8px ${bioFor.color}40`, marginBottom: 8 }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 6.5 7 1-5 4.5 1.5 7L12 17.5 5.5 21 7 14 2 9.5l7-1z" /></svg>
                      <span style={{ fontSize: 8, fontWeight: 800, color: '#fff', letterSpacing: '.12em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Founder</span>
                    </div>
                  )}
                  <h3 style={{ fontSize: 24, fontWeight: 900, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 4, letterSpacing: '-0.02em', lineHeight: 1.15 }}>{bioFor.name}</h3>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: bioFor.color, lineHeight: 1.4 }}>{bioFor.role}</div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '8px 32px 32px' }}>
              {/* Meta pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 50, background: `${bioFor.color}10`, fontSize: 11.5, fontWeight: 700, color: bioFor.color }}>
                  <Ic n="Pin" s={11} style={{ color: bioFor.color }} />{bioFor.loc}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 50, background: 'rgba(0,14,40,0.05)', fontSize: 11.5, fontWeight: 700, color: C.textM }}>
                  <Ic n="Clock" s={11} style={{ color: C.textL }} />{bioFor.exp} experience
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 50, background: `${bioFor.color}10`, fontSize: 11.5, fontWeight: 700, color: bioFor.color }}>
                  <Ic n="Award" s={11} style={{ color: bioFor.color }} />{bioFor.cert}
                </span>
              </div>

              {/* Bio text */}
              <p style={{ fontSize: 14.5, color: C.textM, lineHeight: 1.8, marginBottom: 24 }}>{bioFor.about}</p>

              {/* CTA row */}
              <div style={{ display: 'flex', gap: 10, paddingTop: 16, borderTop: `1px solid ${bioFor.color}15` }}>
                <a href={bioFor.linkedin} target="_blank" rel="noopener noreferrer"
                  style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '12px 20px', borderRadius: 50, background: `linear-gradient(135deg, ${bioFor.color}, ${bioFor.color}cc)`, color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: `0 6px 16px ${bioFor.color}38`, transition: 'all .2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  Connect on LinkedIn
                </a>
                <button onClick={() => setBioFor(null)}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '12px 22px', borderRadius: 50, background: 'transparent', border: `1.5px solid ${bioFor.color}40`, color: bioFor.color, fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${bioFor.color}10`; e.currentTarget.style.borderColor = bioFor.color }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = `${bioFor.color}40` }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ─────────── Inline styles ─────────── */}
      <style>{`
        @keyframes bioFadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes bioPopIn  { from { opacity:0; transform: translateY(20px) scale(.96) } to { opacity:1; transform: none } }

        .leaders-grid-final { display:grid; grid-template-columns:repeat(4, 1fr); gap:20px; }

        @media(max-width:1024px) {
          .leaders-grid-final { grid-template-columns:repeat(2, 1fr); gap:16px; }
        }
        @media(max-width:680px) {
          .leaders-grid-final { grid-template-columns:1fr; gap:14px; }
        }
      `}</style>
    </section>
  )
}

// ── Helper: portrait that shows photo if available, otherwise initials placeholder ──
function Portrait({ member, variant }) {
  if (member.photo) {
    return (
      <img
        src={member.photo}
        alt={member.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
      />
    )
  }
  // Placeholder: gradient bg + initials
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(135deg, ${member.color}, ${member.color}aa)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Subtle decorative pattern */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)', backgroundSize: '18px 18px', opacity: 0.6 }} />
      <span style={{
        fontSize: variant === 'circle' ? 38 : 56,
        fontWeight: 800, color: '#fff',
        fontFamily: "'Plus Jakarta Sans',sans-serif",
        textShadow: '0 2px 8px rgba(0,0,0,0.15)',
        letterSpacing: '-0.02em',
        position: 'relative', zIndex: 1
      }}>{member.initials}</span>
      {/* "Photo pending" tiny badge */}
      <span style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: '.14em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Photo Pending</span>
    </div>
  )
}


function GlobalSection({ navigate }) {
  useReveal()
  const ontario = OFFICES.find(o => o.slug === 'ontario')
  const hyderabad = OFFICES.find(o => o.slug === 'hyderabad')

  return (
    <>
      {/* ──── Global responsive overrides ─────────────────────────────────
          The company hero uses position:absolute for AnimatedMap/AnimatedCareers
          on desktop (width: 55vw). Below 1024px we flip it to flow inline so
          the animation drops BELOW the text instead of overlapping. */}
      <style>{`
        @media (max-width: 1023px) {
          .company-hero-grid {
            grid-template-columns: 1fr !important;
            height: auto !important;
            padding-top: 64px !important;
            padding-bottom: 32px !important;
            gap: 28px !important;
          }
          .company-hero-image {
            position: relative !important;
            width: 100% !important;
            max-width: 720px !important;
            margin: 0 auto !important;
            top: auto !important;
            right: auto !important;
            bottom: auto !important;
            height: 320px !important;
            pointer-events: auto !important;
          }
        }
        @media (max-width: 767px) {
          .company-hero-grid {
            padding-top: 48px !important;
            padding-left: 18px !important;
            padding-right: 18px !important;
          }
          .company-hero-image { height: 260px !important; }
        }
        @media (max-width: 480px) {
          .company-hero-image { height: 220px !important; }
        }

        /* Careers hero — animation sits beside text on desktop (1fr 1fr),
           and drops BELOW the full text block on tablet/mobile. Own class so the
           shared .company-hero-image rules never fight it (was causing overlap).
           Heights hug the animation and the careers-only gap is tightened so the
           illustration sits right under the stats (less empty space / scrolling). */
        @media (max-width: 1023px) {
          .careers-hero-image { height: 340px !important; }
          .company-hero-grid.careers-hero-grid { gap: 16px !important; }
        }
        @media (max-width: 767px) {
          .careers-hero-image { height: 260px !important; }
        }
        @media (max-width: 480px) {
          .careers-hero-image { height: 220px !important; }
        }

        /* GlobalSection-specific responsive */
        @media (max-width: 1023px) {
          .gs-stats-g { grid-template-columns: repeat(2, 1fr) !important; }
          .gs-cards-g { grid-template-columns: 1fr !important; }
          .gs-split-g { grid-template-columns: 1fr !important; gap: 18px !important; }
          .gs-sun-g { flex-direction: column !important; gap: 24px !important; align-items: flex-start !important; }
        }
        @media (max-width: 767px) {
          .gs-section { padding: 56px 18px !important; }
          .gs-stats-g { gap: 16px !important; row-gap: 28px !important; }
          .gs-stats-g > div { padding-left: 0 !important; border-left: none !important; }
          .gs-stats-g > div:nth-child(3),
          .gs-stats-g > div:nth-child(4) { padding-top: 22px !important; border-top: 1px solid #e2e8f0; }
          .gs-stats-g .stat-v { font-size: 32px !important; }
          .gs-sun-times { gap: 18px !important; flex-wrap: wrap; }
          .gs-cta-g { flex-direction: column !important; align-items: stretch !important; }
          .gs-cta-g > * { width: 100% !important; justify-content: center !important; }
        }
        @media (max-width: 480px) {
          .gs-stats-g { grid-template-columns: 1fr !important; }
          .gs-stats-g > div:nth-child(n) { padding-top: 18px; border-top: 1px solid #e2e8f0; }
          .gs-stats-g > div:nth-child(1) { padding-top: 0; border-top: none; }
        }
      `}</style>

      {/* ════════════════════════════════════════════════════
         1.  SECTION HEADING
         ════════════════════════════════════════════════════ */}
      <section className="company-section gs-section" style={{ padding: '72px 24px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="rv" style={{ marginBottom: 36, maxWidth: 760 }}>
            <div style={{ width: 4, height: 40, borderRadius: 4, background: `linear-gradient(180deg,${C.teal},${C.blue})`, marginBottom: 16 }} />
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(6,182,212,0.10)', border:'1px solid rgba(6,182,212,0.30)', borderRadius:50, padding:'5px 13px', fontSize:11, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:16 }}>
              <Ic n="Globe" s={12} style={{ color:'#06b6d4' }}/>
              WHERE WE OPERATE
            </div>
            <h2 style={{ fontSize:'clamp(26px, 3.6vw, 36px)', fontWeight: 800, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 12, lineHeight:1.2, letterSpacing:'-0.01em' }}>
              Two offices. One team. <span style={{ background:'linear-gradient(135deg, #06b6d4, #0066FF)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>Always-on delivery.</span>
            </h2>
            <p style={{ color: C.textM, fontSize: 16, lineHeight:1.7, maxWidth: 640 }}>
              Operations in Ontario, delivery from Hyderabad. The 12-hour overlap between EST and IST means work continues around the clock — and your team always has someone ready to pick up where the last shift left off.
            </p>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         2.  TRUST STRIP
         ════════════════════════════════════════════════════ */}
      <section style={{ padding:'48px 24px', background:'#fff', borderTop:'1px solid #e2e8f0', borderBottom:'1px solid #e2e8f0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div className="rv gs-stats-g" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:32 }}>
            {[
              { v:'2023',           l:'Founded',                   s:'Barrie, Ontario · Canada' },
              { v:'2',              l:'Global offices',             s:'Canada · India' },
              { v:'30+',            l:'Specialists',                s:'AI · Microsoft platform' },
              { v:'24 hr',          l:'Coverage window',           s:'Cross-timezone delivery' },
            ].map((s,i) => (
              <div key={i} style={{ display:'flex', flexDirection:'column', position:'relative', paddingLeft:i===0?0:24, borderLeft:i===0?'none':'1px solid #e2e8f0' }}>
                <div className="stat-v" style={{ fontSize:38, fontWeight:900, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1, marginBottom:8, background:'linear-gradient(135deg, #0066FF, #003FB3)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>{s.v}</div>
                <div style={{ fontSize:13.5, fontWeight:700, color:'#0a0a14', marginBottom:4 }}>{s.l}</div>
                <div style={{ fontSize:12.5, color:'#64748b', lineHeight:1.45 }}>{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         3.  OFFICE CARDS
         ════════════════════════════════════════════════════ */}
      <section className="company-section gs-section" style={{ padding: '72px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="rv gs-cards-g" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {OFFICES.map((o, i) => (
              <div key={o.slug} className="rv" style={{
                borderRadius: 22, overflow: 'hidden',
                border: `1.5px solid ${C.border}`, background: '#fff',
                transition: 'all .25s',
                animation: `fadeUp .4s ease both ${i * 90}ms`,
                position:'relative',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,87,184,.12)`; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = (o.isHQ ? C.blue : C.teal) + '55' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = C.border }}>

                {/* Top accent strip */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background: o.isHQ ? `linear-gradient(90deg, ${C.blue}, ${C.teal})` : `linear-gradient(90deg, ${C.teal}, ${C.blue})` }} />

                <div style={{ padding: '28px 26px 0', background: `linear-gradient(135deg, ${o.isHQ ? '#f0f7ff' : '#ecfeff'}, #fff)` }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ fontSize: 44, lineHeight: 1 }}>{o.flag}</div>
                      <div>
                        <h3 style={{ fontSize: 22, fontWeight: 800, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 4, letterSpacing:'-0.005em' }}>{o.full}</h3>
                        <div style={{ fontSize: 12.5, color: C.textM }}>Est. {o.founded} · {o.headcount}</div>
                      </div>
                    </div>
                    <span style={{ fontSize:10.5, fontWeight:800, padding:'5px 11px', borderRadius:50, background: o.isHQ ? '#0066FF' : '#06b6d4', color:'#fff', letterSpacing:'.06em', whiteSpace:'nowrap' }}>
                      {o.role.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '4px 26px 26px' }}>
                  {[
                    [Ic, 'Pin',   o.addr],
                    [Ic, 'Phone', o.phone],
                    [Ic, 'Mail',  o.email],
                    [Ic, 'Clock', `Timezone: ${o.tz}`],
                  ].map(([Icon, icon, val]) => (
                    <div key={val} style={{ display: 'flex', gap: 11, alignItems: 'flex-start', marginBottom: 11 }}>
                      <Icon n={icon} s={13} style={{ color: C.textL, flexShrink: 0, marginTop: 3 }} />
                      <span style={{ fontSize: 13.5, color: C.textM, lineHeight:1.5 }}>{val}</span>
                    </div>
                  ))}
                  <button onClick={() => navigate('/contact')}
                    style={{ marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13.5, fontWeight: 700, color: C.blue, background: C.blueL, border: 'none', borderRadius: 50, padding: '10px 20px', cursor: 'pointer' }}>
                    Get in touch <Ic n="Arrow" s={12} style={{ color: C.blue }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         4.  HOW WE WORK ACROSS TWO OFFICES
         ════════════════════════════════════════════════════ */}
      <section className="company-section gs-section" style={{ padding: '72px 24px', background: 'linear-gradient(180deg, #f8fafc 0%, #f0f7ff 100%)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom: 40, maxWidth: 720, margin:'0 auto 40px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#0066FF15', border:'1px solid #0066FF30', borderRadius:50, padding:'5px 13px', fontSize:11, fontWeight:800, color:'#003FB3', letterSpacing:'.14em', marginBottom:14 }}>
              HOW WE WORK
            </div>
            <h3 style={{ fontSize:'clamp(22px, 3vw, 30px)', fontWeight: 800, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 12, lineHeight:1.2 }}>
              Operations in Canada, delivery in India
            </h3>
            <p style={{ color: C.textM, fontSize: 15, lineHeight:1.7 }}>
              Two offices, clear responsibilities. North American account ownership and architecture leadership from Ontario; delivery, engineering, and consultant capacity from Hyderabad. The 12-hour overlap is when teams collaborate live.
            </p>
          </div>

          <div className="rv gs-split-g" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 20 }}>
            {[
              { color: C.blue, accent:'#003FB3', flag:'🇨🇦', city:'Ontario', role:'Head of Operations',
                points: [
                  'Client relationships and account ownership',
                  'Solution architecture and discovery calls',
                  'North American sales and partnerships',
                  'Microsoft partner ecosystem co-ordination',
                ]
              },
              { color: C.teal, accent:'#0EA5E9', flag:'🇮🇳', city:'Hyderabad', role:'Delivery Center',
                points: [
                  'Engineering, build, and configuration teams',
                  'Day-to-day project delivery',
                  'Microsoft-certified consultant pool',
                  'Managed Support and platform operations',
                ]
              },
            ].map((b, i) => (
              <div key={b.city} style={{ padding:'30px 28px', borderRadius:22, background:'#fff', border:`1.5px solid ${b.color}25`, position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background: `linear-gradient(90deg, ${b.color}, ${b.accent})` }} />
                <div style={{ position:'absolute', top:-50, right:-50, width:180, height:180, borderRadius:'50%', background:`radial-gradient(circle, ${b.color}18, transparent 70%)`, pointerEvents:'none' }}/>

                <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:18, position:'relative', zIndex:1 }}>
                  <div style={{ fontSize:34, lineHeight:1 }}>{b.flag}</div>
                  <div>
                    <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.10em', color:b.color, marginBottom:3 }}>{b.role.toUpperCase()}</div>
                    <div style={{ fontSize:18, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:'-0.005em' }}>{b.city}</div>
                  </div>
                </div>

                <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:10, position:'relative', zIndex:1 }}>
                  {b.points.map((p, j) => (
                    <li key={j} style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:13.5, color:C.textM, lineHeight:1.55 }}>
                      <Ic n="CheckCircle" s={15} style={{ color:b.color, flexShrink:0, marginTop:2 }}/>
                      <span style={{ color:'#0a0a14' }}>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         5.  FOLLOW-THE-SUN SUPPORT
         ════════════════════════════════════════════════════ */}
      <section className="company-section gs-section" style={{ padding: '64px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className="rv gs-sun-g" style={{ padding:'36px 36px', borderRadius: 22, background: `linear-gradient(135deg, ${C.blue}, ${C.purple})`, color: '#fff', display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', position:'relative', overflow:'hidden', boxShadow:'0 20px 50px rgba(0, 102, 255, 0.25)' }}>
            <div style={{ position:'absolute', top:-100, right:-80, width:380, height:380, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)', pointerEvents:'none' }}/>
            <div style={{ position:'absolute', bottom:-80, left:-60, width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)', pointerEvents:'none' }}/>

            <div style={{ position:'relative', zIndex:1, maxWidth: 560 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.30)', borderRadius:50, padding:'5px 13px', fontSize:11, fontWeight:800, color:'#fff', letterSpacing:'.14em', marginBottom:14, backdropFilter:'blur(10px)' }}>
                <Ic n="Clock" s={12} style={{ color:'#67e8f9' }}/>
                24-HOUR COVERAGE
              </div>
              <h3 style={{ fontSize: 24, fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 10, letterSpacing:'-0.01em' }}>Follow-the-Sun Support</h3>
              <p style={{ opacity: .90, fontSize: 14.5, lineHeight:1.65 }}>
                EST and IST give us a 12-hour collaborative overlap and round-the-clock coverage for Managed Support clients. Your named consultant is always within four hours of waking up.
              </p>
            </div>

            <div className="gs-sun-times" style={{ display: 'flex', gap: 28, flexShrink: 0, position:'relative', zIndex:1 }}>
              {[
                { flag:'🇨🇦', tz:'EST', city:'Ontario', hours:'09:00 – 18:00' },
                { flag:'🇮🇳', tz:'IST', city:'Hyderabad', hours:'09:00 – 18:00' },
              ].map(t => (
                <div key={t.tz} style={{ textAlign:'center', padding:'14px 18px', borderRadius:14, background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.20)', backdropFilter:'blur(10px)', minWidth:120 }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{t.flag}</div>
                  <div style={{ fontSize: 15, fontWeight:800, marginBottom:2, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{t.tz}</div>
                  <div style={{ fontSize: 11, opacity: .80, marginBottom:6 }}>{t.city}</div>
                  <div style={{ fontSize: 10.5, color:'#67e8f9', fontWeight:700, fontFamily:"'JetBrains Mono', monospace" }}>{t.hours}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         6.  CTA
         ════════════════════════════════════════════════════ */}
      <section className="company-section gs-section" style={{ padding: '72px 24px 80px', background: '#fff' }}>
        <div style={{ maxWidth: 880, margin: '0 auto', textAlign:'center' }}>
          <div className="rv">
            <h3 style={{ fontSize:'clamp(24px, 3.4vw, 32px)', fontWeight: 800, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 14, lineHeight:1.2, letterSpacing:'-0.01em' }}>
              Want to talk to someone in your timezone?
            </h3>
            <p style={{ color: C.textM, fontSize: 15.5, lineHeight:1.7, marginBottom: 28, maxWidth:620, margin:'0 auto 28px' }}>
              Book a 30-minute call with the Solution Architect closest to your working hours. We'll route to Ontario or Hyderabad based on your timezone — first call is always with an architect, never a salesperson.
            </p>
            <div className="gs-cta-g" style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
              <button onClick={() => navigate('/contact')}
                style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 28px', borderRadius:50, background:'linear-gradient(135deg, #0066FF, #003FB3)', border:'none', cursor:'pointer', fontSize:14.5, fontWeight:700, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif", boxShadow:'0 10px 26px rgba(0,102,255,0.30)' }}>
                Book a discovery call <Ic n="Arrow" s={14} style={{ color:'#fff' }}/>
              </button>
              <button onClick={() => navigate('/resources/case-studies')}
                style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 24px', borderRadius:50, background:'#fff', border:'1.5px solid #e2e8f0', cursor:'pointer', fontSize:14, fontWeight:700, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                Read case studies
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ── Awards Section ────────────────────────────────────────────────────────────────
function CertificationsSection() {
  useReveal()
  return (
    <section className="company-section" style={{ padding: '72px 24px', background: C.bgSoft }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div className="rv" style={{ textAlign: 'center', marginBottom: 44, maxWidth: 700, margin: '0 auto 44px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,102,255,0.10)', border: '1px solid rgba(0,102,255,0.30)', borderRadius: 50, padding: '5px 13px', fontSize: 11, fontWeight: 800, color: '#003FB3', letterSpacing: '.14em', marginBottom: 14 }}>
            <Ic n="Award" s={12} style={{ color: '#0066FF' }} /> MICROSOFT CERTIFIED
          </div>
          <h2 style={{ fontSize: 'clamp(26px,3.4vw,34px)', fontWeight: 800, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 12, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            Certified across the Microsoft AI stack
          </h2>
          <p style={{ color: C.textM, fontSize: 15, lineHeight: 1.7 }}>
            Our team holds current Microsoft certifications spanning AI engineering, data analytics, identity, and agent development — the foundations of every orchestration architecture we build.
          </p>
        </div>

        <div className="rv certs-g" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {CERTIFICATIONS.map((c, i) => (
            <div key={c.code} style={{ display: 'flex', gap: 16, padding: '22px 24px', borderRadius: 18, border: `1.5px solid ${C.border}`, background: '#fff', transition: 'all .25s', animation: `fadeUp .4s ease both ${i * 60}ms`, position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = c.color + '55'; e.currentTarget.style.boxShadow = `0 10px 28px ${c.color}14`; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: `linear-gradient(180deg, ${c.color}, ${c.color}55)` }} />
              <div style={{ width: 48, height: 48, borderRadius: 13, background: c.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Ic n={c.icon} s={22} style={{ color: c.color }} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: c.color, marginBottom: 4, letterSpacing: '.06em', fontFamily: "'JetBrains Mono', monospace" }}>{c.code}</div>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: C.text, lineHeight: 1.4, marginBottom: 3 }}>{c.name}</div>
                <div style={{ fontSize: 11.5, color: C.textL, fontWeight: 600 }}>Microsoft Certified: {c.tier}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="rv" style={{ marginTop: 32, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 24px', borderRadius: 50, background: '#fff', border: `1.5px solid ${C.border}` }}>
            <Ic n="Shield" s={16} style={{ color: '#0078d4' }} />
            <span style={{ fontSize: 13.5, fontWeight: 700, color: C.text }}>Microsoft Technology Partner · Power Platform · Azure AI · Dynamics 365 · Fabric</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Hiring Timeline Animation ────────────────────────────────────────────────────────
function HiringTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 4);
    }, 2500); // changes every 2.5 seconds
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { num: '01', title: 'Application', desc: 'Send us your CV. We review every single application manually.', icon: 'FileText', color: C.blue },
    { num: '02', title: 'Culture Chat', desc: 'A 30-min call to understand your goals and see if we click.', icon: 'Target', color: C.teal },
    { num: '03', title: 'Technical Fit', desc: 'Meet the team leads to discuss your experience and approach.', icon: 'Cpu', color: C.purple },
    { num: '04', title: 'The Offer', desc: 'If it\'s a match, we move fast. No 6-round interview fatigue.', icon: 'Award', color: C.green },
  ];

  return (
    <section className="company-section rv" style={{ padding: '72px 24px', background: 'linear-gradient(180deg, #fff 0%, #f5f9ff 100%)', borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 800, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 48 }}>How We Hire</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, position: 'relative' }}>
          {/* Base Horizontal Line */}
          <div style={{ position: 'absolute', top: 32, left: '12%', right: '12%', height: 4, background: '#e2e8f0', zIndex: 0, borderRadius: 2 }} className="timeline-line-base" />
          
          {/* Animated Progress Line */}
          <div style={{ position: 'absolute', top: 32, left: '12%', width: `${(activeStep / 3) * 76}%`, height: 4, background: `linear-gradient(90deg, ${C.blue}, ${C.green})`, zIndex: 1, borderRadius: 2, transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }} className="timeline-line-progress" />

          {steps.map((step, idx) => {
            const isActive = activeStep >= idx;
            const isCurrent = activeStep === idx;
            return (
              <div key={step.num} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fff', padding: '32px 20px', borderRadius: 24, boxShadow: isCurrent ? `0 16px 40px ${step.color}25` : '0 12px 32px rgba(0,0,0,0.04)', border: `1px solid ${isCurrent ? step.color : C.border}`, transition: 'all 0.4s ease', transform: isCurrent ? 'translateY(-8px)' : 'none' }}>
                
                {/* Connecting Node */}
                <div style={{ position: 'absolute', top: -38, width: 16, height: 16, borderRadius: '50%', background: isActive ? step.color : '#cbd5e1', border: '3px solid #fff', boxShadow: isActive ? `0 0 0 4px ${step.color}33` : 'none', transition: 'all 0.4s ease', zIndex: 3 }} className="timeline-node" />

                <div style={{ width: 64, height: 64, borderRadius: '50%', background: isActive ? `linear-gradient(135deg, ${step.color}, ${step.color}aa)` : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: isActive ? `0 8px 24px ${step.color}40` : 'none', color: isActive ? '#fff' : '#94a3b8', fontSize: 24, transition: 'all 0.4s ease' }}>
                  <Ic n={step.icon} s={28} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: isActive ? step.color : '#94a3b8', marginBottom: 4, letterSpacing: '.05em', transition: 'color 0.4s ease' }}>STEP {step.num}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: isActive ? C.text : '#64748b', marginBottom: 12, fontFamily: "'Plus Jakarta Sans',sans-serif", transition: 'color 0.4s ease' }}>{step.title}</div>
                <div style={{ fontSize: 13.5, color: C.textM, lineHeight: 1.6 }}>{step.desc}</div>
              </div>
            )
          })}
        </div>
      </div>
      <style>{`
        @media(min-width: 768px) {
          .timeline-line-base, .timeline-line-progress, .timeline-node { display: block !important; }
        }
        @media(max-width: 767px) {
          .timeline-line-base, .timeline-line-progress, .timeline-node { display: none !important; }
        }
      `}</style>
    </section>
  )
}

// ── Careers Section ────────────────────────────────────────────────────────────────
function CareersSection({ navigate }) {
  useReveal()

  /* Helper: derive a brand-aligned accent color per job based on its location */
  const getLocColor = (loc) => {
    if (/Barrie|Ontario|Canada/i.test(loc)) return C.blue
    if (/Hyderabad|India/i.test(loc)) return C.teal
    return C.purple   /* Remote / Any */
  }

  return (
    <div>

      {/* ════════════════════════════════════════════════════
         STATS STRIP — quick credibility right after hero
         ════════════════════════════════════════════════════ */}
      <section className="careers-sec" style={{ padding: '48px 24px', background: '#fff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="rv cs-stats-g" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
            {[
              { v: `${JOBS.length}`, l: 'Open roles',           s: 'Across delivery, sales, and AI practice' },
              { v: '2',              l: 'Global offices',        s: 'Barrie + Hyderabad' },
              { v: '18 hrs',         l: 'Daily coverage',        s: 'Hand-off model · live overlap window' },
              { v: '100%',           l: 'Cert fees covered',     s: 'MS exams · training · re-attempts' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', position: 'relative', paddingLeft: i === 0 ? 0 : 24, borderLeft: i === 0 ? 'none' : '1px solid #e2e8f0' }}>
                <div className="stat-v" style={{ fontSize: 38, fontWeight: 900, color: '#0a0a14', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1, marginBottom: 8, background: 'linear-gradient(135deg, #0066FF, #003FB3)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.v}</div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0a0a14', marginBottom: 4 }}>{s.l}</div>
                <div style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.45 }}>{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         STORYTELLING + JOB LISTINGS — sticky-left two-column
         ════════════════════════════════════════════════════ */}
      <section className="company-section careers-sec" style={{ padding: '72px 24px', background: '#fff' }}>
        <div className="svc-body-g" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'start' }}>

          {/* Left Column: Storytelling */}
          <div className="rv" style={{ position: 'sticky', top: 120 }}>
            <div style={{ width: 4, height: 40, borderRadius: 4, background: `linear-gradient(180deg,${C.blue},${C.teal})`, marginBottom: 16 }} />
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(6,182,212,0.30)', borderRadius: 50, padding: '5px 13px', fontSize: 11, fontWeight: 800, color: '#003FB3', letterSpacing: '.14em', marginBottom: 16 }}>
              <Ic n="Users" s={12} style={{ color: '#06b6d4' }} />
              WORK WITH US
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 800, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 16, lineHeight: 1.15, letterSpacing: '-0.01em' }}>
              Microsoft work, with real ownership.
            </h2>
            <p style={{ fontSize: 15.5, color: C.textM, lineHeight: 1.85, marginBottom: 20 }}>
              We're a Microsoft technology partner building enterprise AI orchestration across <strong style={{ color: C.text }}>Canada (operations)</strong> and <strong style={{ color: C.text }}>India (delivery)</strong>. The cross-timezone coverage window isn't a marketing line — it's how every engagement runs.
            </p>
            <p style={{ fontSize: 15.5, color: C.textM, lineHeight: 1.85, marginBottom: 28 }}>
              We hire for talent and judgement first, certifications second. If you're senior enough to own the work and humble enough to learn from a teammate 10,000km away, we'd like to meet you.
            </p>

            <div className="company-values-g" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14, marginBottom: 28, background: 'linear-gradient(135deg, rgba(6,182,212,0.06), rgba(0,102,255,0.04))', border: '1px solid rgba(0,102,255,0.10)', padding: 24, borderRadius: 20 }}>
              {[
                { icon: 'Star',   text: 'Founder-led · direct access to the people who decide' },
                { icon: 'Globe',  text: 'Remote-friendly · most roles flex location' },
                { icon: 'Award',  text: 'Microsoft cert fees fully covered (including re-attempts)' },
                { icon: 'Users',  text: 'Real mentorship from senior architects on Day 1' },
                { icon: 'Zap',    text: 'No timesheet padding · no SDR call-quota culture' },
              ].map(b => (
                <div key={b.text} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 14, fontWeight: 600, color: C.text }}>
                  <div style={{ width: 30, height: 30, borderRadius: 9, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Ic n={b.icon} s={14} style={{ color: C.blue }} />
                  </div>
                  <span style={{ lineHeight: 1.45 }}>{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Job Cards */}
          <div id="current-openings" className="rv">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", display: 'flex', alignItems: 'center', gap: 10 }}>
                Current Openings <span style={{ padding: '4px 10px', background: `${C.blue}15`, color: C.blue, fontSize: 12, fontWeight: 800, borderRadius: 50, letterSpacing: '.04em' }}>{JOBS.length} OPEN</span>
              </h3>
              <a href="mailto:careers@devinstratus.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: C.blue, textDecoration: 'none' }}>
                <Ic n="Mail" s={13} style={{ color: C.blue }} /> careers@devinstratus.com
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {JOBS.map((j, i) => {
                const accent = getLocColor(j.loc)
                return (
                  <div key={j.title} id={`job-${i}`} className="job-card-interactive rv" style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '22px 24px', borderRadius: 18, border: `1.5px solid ${C.border}`, background: '#fff', transition: 'all .3s cubic-bezier(0.2, 0.8, 0.2, 1)', cursor: 'pointer', animation: `fadeUp .5s ease both ${i * 80}ms`, position: 'relative', overflow: 'hidden' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = accent + '55'; e.currentTarget.style.boxShadow = `0 14px 32px ${accent}22`; e.currentTarget.style.transform = 'translateY(-3px)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}>

                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${accent}, ${accent}55)` }} />

                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 17.5, fontWeight: 800, color: C.text, marginBottom: 8, fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: '-0.005em' }}>{j.title}</div>
                        <div style={{ display: 'flex', gap: 14, fontSize: 13, color: C.textM, flexWrap: 'wrap', alignItems: 'center' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 50, background: `${accent}12`, color: accent, fontWeight: 700, fontSize: 11.5 }}>
                            <Ic n="Pin" s={11} style={{ color: accent }} /> {j.loc}
                          </span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Ic n="Brief" s={13} /> {j.type}</span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: j.color, fontWeight: 700 }}><Ic n="Users" s={13} style={{ color: j.color }} /> {j.dept}</span>
                        </div>
                      </div>
                      <a href={`mailto:careers@devinstratus.com?subject=${encodeURIComponent('Application: ' + j.title)}`}
                        style={{ width: 40, height: 40, borderRadius: '50%', background: `${accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .3s', textDecoration: 'none' }}
                        title={`Apply for ${j.title}`}
                      >
                        <Ic n="Arrow" s={14} style={{ color: accent }} />
                      </a>
                    </div>

                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ padding: '4px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 11, fontWeight: 600, color: '#475569' }}>Competitive salary</span>
                      <span style={{ padding: '4px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 11, fontWeight: 600, color: '#475569' }}>Remote / Hybrid</span>
                      <span style={{ padding: '4px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 11, fontWeight: 600, color: '#475569' }}>Microsoft cert fees covered</span>
                      <span style={{ padding: '4px 10px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 11, fontWeight: 600, color: '#475569' }}>AI-first engineering</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Speculative CV CTA */}
            <div className="rv" style={{ marginTop: 28, padding: '20px 24px', borderRadius: 16, border: `1.5px dashed ${C.blue}40`, background: 'linear-gradient(135deg, rgba(6,182,212,0.04), rgba(0,102,255,0.04))', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 800, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 3 }}>Don't see your role?</div>
                <div style={{ fontSize: 13, color: C.textM }}>We hire continuously for strong senior consultants. Send us your CV.</div>
              </div>
              <a href="mailto:careers@devinstratus.com?subject=Speculative%20Application"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 50, background: `linear-gradient(135deg, ${C.blue}, ${C.teal})`, color: '#fff', fontSize: 13.5, fontWeight: 700, textDecoration: 'none', boxShadow: `0 8px 20px ${C.blue}30`, fontFamily: "'Plus Jakarta Sans',sans-serif", whiteSpace: 'nowrap' }}>
                Email your CV <Ic n="Arrow" s={13} style={{ color: '#fff' }} />
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         HOW WE HIRE TIMELINE (existing component)
         ════════════════════════════════════════════════════ */}
      <HiringTimeline />


      {/* ════════════════════════════════════════════════════
         WHY PEOPLE STAY — 3-card retention section
         ════════════════════════════════════════════════════ */}
      <section className="company-section careers-sec" style={{ padding: '90px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div className="rv" style={{ textAlign: 'center', marginBottom: 48, maxWidth: 720, margin: '0 auto 48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#0066FF15', border: '1px solid #0066FF30', borderRadius: 50, padding: '5px 13px', fontSize: 11, fontWeight: 800, color: '#003FB3', letterSpacing: '.14em', marginBottom: 14 }}>
              WHY PEOPLE STAY
            </div>
            <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 34px)', fontWeight: 800, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 12, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
              The work is the reason people join.
            </h2>
            <p style={{ color: C.textM, fontSize: 15, lineHeight: 1.7 }}>
              Three things separate us from the body shops and the Big 4 alternatives.
            </p>
          </div>

          <div className="rv cs-why-g" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { icon: 'Award',  color: C.blue, accent: '#003FB3', title: 'Architecture-level AI work',
                desc: 'You won\'t configure tools — you\'ll design AI orchestration layers across ITSM, CRM, ERP, and cloud. Real platform decisions on Power Platform, Copilot Studio, Azure AI, and Fabric.' },
              { icon: 'Users',  color: C.teal, accent: '#0EA5E9', title: 'Ownership, not staff augmentation',
                desc: 'Every consultant owns scope, decisions, and client relationship from day one. No timesheet babysitting. No 6-layer org chart between you and the customer.' },
              { icon: 'Globe',  color: C.green, accent: '#003FB3', title: 'Two-office, one-team culture',
                desc: 'Barrie and Hyderabad collaborate live during the daily overlap window. Not "us and them" — same delivery standards, same comp bands, same career paths.' },
            ].map((r, i) => (
              <div key={i} style={{ padding: '28px 26px', borderRadius: 20, background: 'linear-gradient(180deg, #fff, #fafcff)', border: `1.5px solid ${r.color}20`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${r.color}, ${r.accent})` }} />
                <div style={{ position: 'absolute', top: -50, right: -50, width: 160, height: 160, borderRadius: '50%', background: `radial-gradient(circle, ${r.color}18, transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${r.color}, ${r.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, boxShadow: `0 8px 20px ${r.color}30`, position: 'relative', zIndex: 1 }}>
                  <Ic n={r.icon} s={22} style={{ color: '#fff' }} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: C.text, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 10, letterSpacing: '-0.005em', position: 'relative', zIndex: 1, lineHeight: 1.3 }}>{r.title}</h3>
                <p style={{ fontSize: 13.5, color: C.textM, lineHeight: 1.65, position: 'relative', zIndex: 1 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════
         FINAL CTA
         ════════════════════════════════════════════════════ */}
      <section className="careers-sec" style={{ padding: '90px 24px', background: 'linear-gradient(135deg, #003FB3 0%, #0066FF 60%, #06b6d4 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.10), transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)', pointerEvents: 'none' }} />

        <div className="rv" style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.30)', borderRadius: 50, padding: '7px 16px', fontSize: 11.5, fontWeight: 800, color: '#fff', letterSpacing: '.14em', marginBottom: 22, backdropFilter: 'blur(10px)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#67e8f9' }} />
            ALWAYS HIRING SENIOR TALENT
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', fontWeight: 900, color: '#fff', fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 16, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Ready when you are.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', marginBottom: 32, lineHeight: 1.7, maxWidth: 640, margin: '0 auto 32px' }}>
            Send your CV and a few lines about what you're looking for. We'll respond within 5 working days — every application reviewed by a human.
          </p>
          <div className="cs-cta-row" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:careers@devinstratus.com?subject=Application"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 28px', borderRadius: 50, background: '#fff', color: '#003FB3', fontSize: 14.5, fontWeight: 800, textDecoration: 'none', fontFamily: "'Plus Jakarta Sans',sans-serif", justifyContent: 'center' }}>
              Email careers@devinstratus.com <Ic n="Arrow" s={14} style={{ color: '#003FB3' }} />
            </a>
            <button onClick={() => navigate('/company/team')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 24px', borderRadius: 50, background: 'transparent', color: '#fff', fontSize: 14, fontWeight: 700, border: '1.5px solid rgba(255,255,255,0.40)', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", justifyContent: 'center' }}>
              Meet the team first
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .job-card-interactive:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 20px 40px rgba(0, 102, 255, 0.08) !important;
          border-color: rgba(0, 102, 255, 0.2) !important;
        }
        .job-card-interactive:hover .job-card-accent {
          opacity: 1 !important;
        }
        .job-card-interactive:hover .job-arrow {
          background: #0066FF !important;
          color: #fff !important;
        }
        .job-card-interactive:hover .job-arrow svg {
          color: #fff !important;
        }

        /* ──── Careers Section responsive overrides ──── */
        @media (max-width: 1023px) {
          .cs-stats-g { grid-template-columns: repeat(2, 1fr) !important; row-gap: 28px !important; }
          .cs-stats-g > div:nth-child(3),
          .cs-stats-g > div:nth-child(4) { padding-top: 22px; border-top: 1px solid #e2e8f0; padding-left: 0 !important; border-left: none !important; }
          .cs-stats-g > div:nth-child(3) { padding-left: 0 !important; border-left: none !important; }
          .svc-body-g { grid-template-columns: 1fr !important; gap: 36px !important; }
          .svc-body-g > div:first-child { position: relative !important; top: auto !important; }
          .cs-why-g { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 767px) {
          .cs-stats-g { gap: 16px !important; }
          .cs-stats-g > div { padding-left: 0 !important; border-left: none !important; }
          .cs-stats-g > div:nth-child(n+2) { padding-top: 22px; border-top: 1px solid #e2e8f0; }
          .cs-stats-g .stat-v { font-size: 32px !important; }
          .cs-why-g { grid-template-columns: 1fr !important; }
          /* tighten heavy section padding on phones */
          .careers-sec { padding-top: 52px !important; padding-bottom: 52px !important; padding-left: 18px !important; padding-right: 18px !important; }
          /* full-width stacked CTA buttons */
          .cs-cta-row { flex-direction: column !important; }
          .cs-cta-row > * { width: 100% !important; }
        }
        @media (max-width: 480px) {
          .cs-stats-g { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

// ── Press Section ────────────────────────────────────────────────────────────────
// ── Main Export ────────────────────────────────────────────────────────────────────
export default function CompanyPage({ navigate, slug, openConsult }) {
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  const section = slug || 'about'

  const SECTIONS_INDEX = [
    { slug: 'about', title: 'About Us', icon: 'Award', color: C.blue, desc: 'Our story, mission and AI-first approach' },
    { slug: 'team', title: 'Our Team', icon: 'Users', color: C.purple, desc: 'AI engineering team · Canada & India' },
    { slug: 'global', title: 'Global Offices', icon: 'Globe', color: C.teal, desc: 'Ontario · Hyderabad · 12-hour overlap' },
    { slug: 'careers', title: 'Careers', icon: 'Brief', color: C.green, desc: 'Join a team that grows with you' },
  ]

  return (
    <div className="page-fade">
      <CompanyHero section={section} navigate={navigate} />

      {/* Sub-nav */}
      <div style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%)', borderBottom: '1px solid rgba(0, 102, 255, 0.08)', position: 'sticky', top: 68, zIndex: 100, backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 4, overflowX: 'auto' }}>
          {SECTIONS_INDEX.map(s => (
            <button key={s.slug} onClick={() => navigate(`/company/${s.slug}`)}
              style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '14px 16px', borderBottom: `2.5px solid ${section === s.slug ? s.color : 'transparent'}`, background: 'none', border: 'none', borderBottom: `2.5px solid ${section === s.slug ? s.color : 'transparent'}`, cursor: 'pointer', fontSize: 13.5, fontWeight: section === s.slug ? 700 : 500, color: section === s.slug ? s.color : C.textM, whiteSpace: 'nowrap', transition: 'all .18s', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              <Ic n={s.icon} s={14} style={{ color: section === s.slug ? s.color : C.textL }} />
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {section === 'about' && <AboutSection navigate={navigate} openConsult={openConsult} />}
      {section === 'team' && <TeamSection />}
      {section === 'global' && <GlobalSection navigate={navigate} />}
      {section === 'careers' && <CareersSection navigate={navigate} />}
    </div>
  )
}