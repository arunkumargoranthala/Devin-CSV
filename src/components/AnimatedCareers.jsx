import React, { useEffect, useState } from 'react';
import { Ic, C } from './ui';

const STEPS = [
  { num: '01', title: 'Apply', icon: 'FileText', color: C.blue },
  { num: '02', title: 'Culture Chat', icon: 'Target', color: C.teal },
  { num: '03', title: 'Technical', icon: 'Cpu', color: C.purple },
  { num: '04', title: 'Offer', icon: 'Award', color: C.green },
];

export default function AnimatedCareers() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep(p => (p + 1) % 4), 3200);
    return () => clearInterval(t);
  }, []);

  const cur = STEPS[step];

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>

      {/* Ambient color-shifting glow — blends with hero gradient */}
      <div style={{ position: 'absolute', width: '50%', height: '50%', top: '20%', left: '25%', background: `radial-gradient(circle, ${cur.color}10 0%, transparent 70%)`, filter: 'blur(60px)', transition: 'background 1.2s ease', pointerEvents: 'none' }} />

      {/* ── Floating connected nodes (the "pipeline" visualization) ── */}
      <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
        <defs>
          <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={C.blue} stopOpacity="0.15" />
            <stop offset="50%" stopColor={C.teal} stopOpacity="0.25" />
            <stop offset="100%" stopColor={C.green} stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {/* Curved pipeline path */}
        <path d="M 15% 28% C 30% 20%, 40% 55%, 50% 38% S 70% 18%, 85% 45%"
          fill="none" stroke="url(#pipeGrad)" strokeWidth="1.5"
          strokeDasharray="6 6" className="ac-dash-flow" />
        {/* Traveling particle */}
        <circle r="3" fill={cur.color} opacity="0.6" className="ac-particle">
          <animateMotion dur="4s" repeatCount="indefinite"
            path="M 80 140 C 160 100, 220 275, 270 190 S 380 90, 460 225" />
        </circle>
      </svg>

      {/* ── Four floating step nodes ── */}
      {STEPS.map((s, i) => {
        const active = step === i;
        const positions = [
          { top: '22%', left: '18%' },
          { top: '14%', left: '42%' },
          { top: '32%', left: '62%' },
          { top: '20%', left: '82%' },
        ];
        return (
          <div key={i} style={{
            position: 'absolute', ...positions[i],
            transform: `translate(-50%, -50%) scale(${active ? 1.15 : 0.85})`,
            transition: 'all .8s cubic-bezier(.22,1,.36,1)',
            zIndex: active ? 10 : 3,
          }}>
            {/* Glow ring behind active node */}
            <div style={{
              position: 'absolute', inset: -12, borderRadius: '50%',
              background: `radial-gradient(circle, ${s.color}${active ? '20' : '00'} 0%, transparent 70%)`,
              transition: 'background .8s',
              animation: active ? 'acNodePulse 2s ease-in-out infinite' : 'none',
            }} />
            {/* Node circle */}
            <div style={{
              position: 'relative', width: active ? 52 : 36, height: active ? 52 : 36,
              borderRadius: '50%',
              background: active
                ? `linear-gradient(135deg, ${s.color}, ${s.color}bb)`
                : `rgba(255,255,255,0.25)`,
              backdropFilter: 'blur(8px)',
              border: `1.5px solid ${active ? s.color + '66' : 'rgba(255,255,255,0.35)'}`,
              boxShadow: active ? `0 8px 28px ${s.color}35` : '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all .8s cubic-bezier(.22,1,.36,1)',
              cursor: 'default',
            }}>
              <Ic n={s.icon} s={active ? 22 : 14} style={{ color: active ? '#fff' : 'rgba(0,0,0,0.25)', transition: 'all .6s' }} />
            </div>
            {/* Label below node */}
            <div style={{
              position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
              marginTop: 6, whiteSpace: 'nowrap', textAlign: 'center',
              opacity: active ? 1 : 0.35, transition: 'opacity .6s',
            }}>
              <div style={{ fontSize: 8, fontWeight: 800, color: active ? s.color : '#94a3b8', letterSpacing: '.08em', transition: 'color .6s' }}>STEP {s.num}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: active ? C.text : '#94a3b8', fontFamily: "'Plus Jakarta Sans',sans-serif", transition: 'color .6s' }}>{s.title}</div>
            </div>
          </div>
        );
      })}

      {/* ── Central scene illustration (fades between steps) ── */}
      <div style={{ position: 'absolute', bottom: '8%', left: '50%', transform: 'translateX(-50%)', zIndex: 5, width: 260, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Glassmorphic scene container — ultra transparent */}
        <div style={{
          width: '100%', padding: '18px 20px 14px',
          borderRadius: 18,
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.28)',
          boxShadow: '0 8px 32px rgba(0,53,128,0.06)',
        }}>
          {/* Step 0 — Apply */}
          {step === 0 && <ApplyScene />}
          {/* Step 1 — Chat */}
          {step === 1 && <ChatScene />}
          {/* Step 2 — Technical */}
          {step === 2 && <TechScene />}
          {/* Step 3 — Offer */}
          {step === 3 && <OfferScene />}
        </div>

        {/* Thin progress bar */}
        <div style={{ width: '80%', height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.15)', marginTop: 12, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 2,
            background: `linear-gradient(90deg, ${cur.color}, ${cur.color}88)`,
            width: `${((step + 1) / 4) * 100}%`,
            transition: 'width .8s cubic-bezier(.22,1,.36,1), background .6s',
          }} />
        </div>
      </div>

      {/* ── Floating micro-particles ── */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`ac-float-particle ac-fp-${i}`} style={{
          position: 'absolute', width: 3, height: 3, borderRadius: '50%',
          background: [C.blue, C.teal, C.purple, C.green, C.orange][i],
          opacity: 0.25, pointerEvents: 'none',
        }} />
      ))}

      <style>{`
        .ac-dash-flow { animation: acDash 12s linear infinite; }
        @keyframes acDash { to { stroke-dashoffset: -120; } }

        @keyframes acNodePulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.5; }
        }

        /* Floating ambient particles */
        .ac-fp-0 { top: 35%; left: 12%; animation: acFloatA 7s ease-in-out infinite; }
        .ac-fp-1 { top: 55%; left: 30%; animation: acFloatB 9s ease-in-out infinite 1s; }
        .ac-fp-2 { top: 25%; left: 55%; animation: acFloatA 8s ease-in-out infinite 2s; }
        .ac-fp-3 { top: 65%; left: 72%; animation: acFloatB 10s ease-in-out infinite 0.5s; }
        .ac-fp-4 { top: 45%; left: 88%; animation: acFloatA 7.5s ease-in-out infinite 1.5s; }
        @keyframes acFloatA {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { transform: translateY(-18px) translateX(8px); opacity: 0.45; }
        }
        @keyframes acFloatB {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.15; }
          50% { transform: translateY(14px) translateX(-10px); opacity: 0.4; }
        }

        /* Scene entrance animation */
        .ac-scene-enter {
          animation: acSceneIn .6s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes acSceneIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: none; }
        }

        /* Apply scene animations */
        .ac-cursor {
          animation: acCursor 3.2s ease-in-out infinite;
        }
        @keyframes acCursor {
          0%, 100% { transform: translate(0,0); opacity: 0.7; }
          35% { transform: translate(-16px, -10px); opacity: 1; }
          42% { transform: translate(-16px, -10px) scale(0.8); }
          50% { transform: translate(-16px, -10px) scale(1); }
          60% { transform: translate(5px, 5px); opacity: 0.5; }
        }
        .ac-send-fly {
          animation: acSendFly 3.2s ease-in-out infinite;
        }
        @keyframes acSendFly {
          0%, 50% { opacity: 0; transform: translate(0,0) scale(0.5); }
          60% { opacity: 1; transform: translate(8px, -6px) scale(1); }
          80% { opacity: 0.8; transform: translate(20px, -16px) scale(0.7) rotate(8deg); }
          100% { opacity: 0; transform: translate(30px, -24px) scale(0.3) rotate(15deg); }
        }

        /* Chat bubbles */
        .ac-bub-1 { animation: acBub 3.2s ease-in-out infinite; }
        .ac-bub-2 { animation: acBub 3.2s ease-in-out infinite .6s; }
        .ac-bub-3 { animation: acBub 3.2s ease-in-out infinite 1.2s; }
        @keyframes acBub {
          0%, 15% { opacity: 0; transform: translateY(4px) scale(0.9); }
          25%, 80% { opacity: 1; transform: none; }
          95%, 100% { opacity: 0; }
        }

        /* Code typing */
        .ac-type-1 { animation: acType 3.2s ease-out infinite 0s; }
        .ac-type-2 { animation: acType 3.2s ease-out infinite .25s; }
        .ac-type-3 { animation: acType 3.2s ease-out infinite .5s; }
        .ac-type-4 { animation: acType 3.2s ease-out infinite .75s; }
        @keyframes acType {
          0%, 5% { width: 0; opacity: 0; }
          15%, 80% { width: 100%; opacity: 1; }
          95%, 100% { opacity: 0; }
        }

        /* Offer celebration */
        .ac-offer-card {
          animation: acOfferIn .8s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes acOfferIn {
          from { opacity: 0; transform: scale(0.7) translateY(8px); }
          to { opacity: 1; transform: none; }
        }
        .ac-confetti { animation: acConfetti 2.5s ease-out infinite; }
        @keyframes acConfetti {
          0% { opacity: 0; transform: translateY(0) rotate(0); }
          10% { opacity: 0.8; }
          100% { opacity: 0; transform: translateY(40px) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* ─── Scene Components (all transparent/diluted) ─── */

function ApplyScene() {
  return (
    <div className="ac-scene-enter" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      {/* Mini laptop */}
      <div style={{ position: 'relative', width: 90, height: 60, flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: 0, left: 4, right: 4, bottom: 6, background: 'rgba(15,23,42,0.7)', border: '1.5px solid rgba(148,163,184,0.4)', borderRadius: '5px 5px 0 0', overflow: 'hidden' }}>
          <div style={{ height: 7, background: 'rgba(51,65,85,0.6)', display: 'flex', alignItems: 'center', padding: '0 3px', gap: 2 }}>
            <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#10b981' }} />
          </div>
          <div style={{ padding: 4, background: 'rgba(255,255,255,0.9)' }}>
            <div style={{ width: '50%', height: 2, background: '#e2e8f0', borderRadius: 2, marginBottom: 3 }} />
            <div style={{ width: '70%', height: 2, background: '#e2e8f0', borderRadius: 2, marginBottom: 5 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: '45%', height: 2, background: C.blue, borderRadius: 2 }} />
              <div style={{ width: 20, height: 6, background: C.green, borderRadius: 8, marginLeft: 'auto' }} />
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(148,163,184,0.5)', borderRadius: '0 0 4px 4px' }} />
        {/* Cursor */}
        <div className="ac-cursor" style={{ position: 'absolute', bottom: 14, right: 14, zIndex: 3 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(15,23,42,0.8)" stroke="rgba(255,255,255,0.8)" strokeWidth="2"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>
        </div>
      </div>
      {/* Flying document */}
      <div style={{ flex: 1, position: 'relative' }}>
        <div className="ac-send-fly" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(6px)', border: '1px solid rgba(0,102,255,0.15)', boxShadow: '0 3px 10px rgba(0,102,255,0.12)' }}>
          <Ic n="FileText" s={9} style={{ color: C.blue }} />
          <span style={{ fontSize: 7, fontWeight: 700, color: C.blue, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Resume.pdf</span>
        </div>
        <div style={{ marginTop: 8, fontSize: 9, color: 'rgba(71,85,105,0.7)', fontWeight: 600, lineHeight: 1.5 }}>
          Click Apply → <br/>We review every CV manually
        </div>
      </div>
    </div>
  );
}

function ChatScene() {
  return (
    <div className="ac-scene-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      {/* Video call avatars */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        {[{ c: C.teal, l: 'You' }, { c: C.blue, l: 'Hiring Mgr' }].map((p, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: `linear-gradient(135deg, ${p.c}33, ${p.c}11)`,
              border: `1.5px solid ${p.c}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <Ic n="Users" s={14} style={{ color: p.c }} />
              <div style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderRadius: '50%', background: C.green, border: '1.5px solid rgba(255,255,255,0.8)', animation: 'acNodePulse 2s ease-in-out infinite' }} />
            </div>
            <span style={{ fontSize: 7, fontWeight: 700, color: 'rgba(71,85,105,0.6)', marginTop: 3 }}>{p.l}</span>
          </div>
        ))}
        {/* Connection line between */}
        <div style={{ position: 'absolute', width: 20, height: 1, background: 'rgba(0,0,0,0.06)' }} />
      </div>
      {/* Chat bubbles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
        {[
          { text: 'Tell me about your goals…', align: 'flex-start', c: C.teal },
          { text: 'I want to grow with D365!', align: 'flex-end', c: C.blue },
          { text: "That's exactly our culture ✨", align: 'flex-start', c: C.teal },
        ].map((b, i) => (
          <div key={i} className={`ac-bub-${i + 1}`} style={{ alignSelf: b.align, padding: '3px 8px', borderRadius: 8, background: `${b.c}0a`, border: `1px solid ${b.c}18`, fontSize: 7.5, fontWeight: 600, color: b.c, opacity: 0 }}>{b.text}</div>
        ))}
      </div>
    </div>
  );
}

function TechScene() {
  return (
    <div className="ac-scene-enter" style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      {/* Code editor */}
      <div style={{ flex: 1, background: 'rgba(15,23,42,0.5)', borderRadius: 8, padding: 6, backdropFilter: 'blur(4px)', border: '1px solid rgba(71,85,105,0.2)' }}>
        {[
          [14, C.purple, 22, C.teal],
          [18, C.green, 10, '#f59e0b'],
          [8, '#ef4444', 24, C.teal],
          [14, C.purple, 0, ''],
        ].map((line, i) => (
          <div key={i} className={`ac-type-${i + 1}`} style={{ display: 'flex', gap: 3, marginBottom: 2, marginLeft: (i === 1 || i === 2) ? 6 : 0, overflow: 'hidden' }}>
            <span style={{ width: line[0], height: 3, background: line[1], borderRadius: 2, flexShrink: 0 }} />
            {line[2] > 0 && <span style={{ width: line[2], height: 3, background: line[3], borderRadius: 2, flexShrink: 0 }} />}
          </div>
        ))}
      </div>
      {/* Skills check */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {['D365 F&O', 'Azure', 'Power BI'].map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 6px', borderRadius: 5, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.12)', fontSize: 7, fontWeight: 700, color: 'rgba(71,85,105,0.7)', animation: `acBub 3.2s ease-in-out infinite ${i * 0.3}s` }}>
            <span style={{ color: C.green, fontSize: 8 }}>✓</span> {s}
          </div>
        ))}
      </div>
    </div>
  );
}

function OfferScene() {
  return (
    <div className="ac-scene-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      {/* Confetti pieces */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="ac-confetti" style={{
          position: 'absolute', width: 4, height: 4,
          borderRadius: i % 2 ? '50%' : 1,
          background: [C.green, C.blue, C.purple, C.teal, C.orange, '#f59e0b'][i],
          top: 0, left: `${10 + i * 15}%`,
          animationDelay: `${i * 0.15}s`,
        }} />
      ))}
      {/* Offer card */}
      <div className="ac-offer-card" style={{ padding: '10px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)', border: '1px solid rgba(16,185,129,0.2)', textAlign: 'center' }}>
        <div style={{ width: 24, height: 24, borderRadius: '50%', background: `linear-gradient(135deg, ${C.green}55, ${C.teal}44)`, margin: '0 auto 6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Ic n="Award" s={12} style={{ color: C.green }} />
        </div>
        <div style={{ fontSize: 9, fontWeight: 800, color: C.text, marginBottom: 2, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Welcome to DevinStratus!</div>
        <div style={{ fontSize: 7, color: C.green, fontWeight: 700 }}>Offer accepted · No 6-round fatigue 🎉</div>
      </div>
    </div>
  );
}
