import React, { useEffect, useRef, useState } from 'react'
import { Ic } from './ui'

/* ════════════════════════════════════════════════════════════════════════════
   FollowTheSunRibbon — 24-hour live ribbon visualization
   ────────────────────────────────────────────────────────────────────────────
   Shows Ontario (EST, UTC-5) and Hyderabad (IST, UTC+5:30) working hours
   converted to the VISITOR'S local timezone. Updates every minute.

   • Two horizontal "workday bars" stacked vertically
   • Glowing overlap region where both teams are active
   • Vertical "now" line shows visitor's current local time
   • Role count badges per office (clickable → scrolls to job listing)
   • Live status caption updates with current handoff state
   • Mobile-responsive: ribbon stays horizontal but compacts; viewBox scales

   Brand colors:
   • Ontario:    #0066FF → #003FB3 (blue)
   • Hyderabad:  #06b6d4 → #0EA5E9 (cyan)
   • Overlap:    cyan glow (#67e8f9)
   ════════════════════════════════════════════════════════════════════════════ */

/* Office definitions — work hours in LOCAL time of that office */
const OFFICES = [
  {
    slug: 'ontario',
    flag: '🇨🇦',
    name: 'Ontario',
    role: 'Head of Operations',
    tzOffset: -5,        // EST = UTC-5
    workStart: 8,        // 08:00 local
    workEnd: 17,         // 17:00 local
    roles: 1,
    color: '#0066FF',
    accent: '#003FB3',
    barY: 175,           // SVG y-coordinate for top of bar
  },
  {
    slug: 'hyderabad',
    flag: '🇮🇳',
    name: 'Hyderabad',
    role: 'Delivery Center',
    tzOffset: 5.5,       // IST = UTC+5:30
    workStart: 9,        // 09:00 local
    workEnd: 19,         // 19:00 local (extended for handoff overlap)
    roles: 4,
    color: '#06b6d4',
    accent: '#0EA5E9',
    barY: 255,
  },
]

const RIBBON_X      = 60      // ribbon starts at x=60
const RIBBON_W      = 680     // ribbon width
const HOUR_W        = RIBBON_W / 24  // ~28.3 px per hour
const BAR_HEIGHT    = 40
const VIEWBOX_W     = 800
const VIEWBOX_H     = 480

/* Convert visitor's local hour-of-day from an office's work hour */
function officeHourToVisitorLocal(officeHour, officeOffset, visitorOffset) {
  const utcHour = officeHour - officeOffset
  let visitorHour = utcHour + visitorOffset
  // Normalize to 0-24 range
  while (visitorHour < 0)  visitorHour += 24
  while (visitorHour >= 24) visitorHour -= 24
  return visitorHour
}

/* Build array of {start, end} segments for a bar in visitor-local time.
 * If the bar crosses midnight in visitor time, returns 2 segments. */
function getBarSegments(office, visitorOffset) {
  const start = officeHourToVisitorLocal(office.workStart, office.tzOffset, visitorOffset)
  const end   = officeHourToVisitorLocal(office.workEnd,   office.tzOffset, visitorOffset)
  if (end > start) return [{ start, end }]
  // crosses midnight
  return [{ start, end: 24 }, { start: 0, end }]
}

/* Compute overlap segments between two bars (visitor-local hours).
 * Returns array of {start, end} ranges where both bars are active. */
function getOverlapSegments(segsA, segsB) {
  const out = []
  for (const a of segsA) {
    for (const b of segsB) {
      const start = Math.max(a.start, b.start)
      const end   = Math.min(a.end, b.end)
      if (end > start) out.push({ start, end })
    }
  }
  return out
}

/* Live status caption based on which offices are currently working */
function liveStatus(now, segsByOffice) {
  const hour = now.getHours() + now.getMinutes() / 60
  const active = []
  for (const [slug, segs] of Object.entries(segsByOffice)) {
    if (segs.some(s => hour >= s.start && hour < s.end)) active.push(slug)
  }
  if (active.length === 2) return { text: 'Both teams collaborating live · handoff window', tone: 'overlap' }
  if (active.length === 1) {
    const o = OFFICES.find(o => o.slug === active[0])
    return { text: `${o.flag} ${o.name} team is working right now`, tone: 'active' }
  }
  return { text: 'Both teams off — picking up at their next shift', tone: 'rest' }
}

/* Format a fractional hour back to "HH:MM" local */
function fmtTime(h) {
  const hh = Math.floor(h)
  const mm = Math.round((h - hh) * 60)
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
}

export default function FollowTheSunRibbon({ onJumpToRoles }) {
  const [now, setNow] = useState(new Date())
  const [hoveredOffice, setHoveredOffice] = useState(null)

  useEffect(() => {
    /* Tick every 30 seconds — granular enough for a smoothly-moving NOW line */
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const visitorOffset = -now.getTimezoneOffset() / 60
  const currentHour = now.getHours() + now.getMinutes() / 60
  const nowX = RIBBON_X + currentHour * HOUR_W

  /* Per-office segments in visitor-local time */
  const segsByOffice = {}
  for (const o of OFFICES) segsByOffice[o.slug] = getBarSegments(o, visitorOffset)
  const overlapSegs = getOverlapSegments(segsByOffice.ontario, segsByOffice.hyderabad)
  const status = liveStatus(now, segsByOffice)

  const handleJumpToRoles = (slug) => {
    if (onJumpToRoles) onJumpToRoles(slug)
    const el = document.getElementById('current-openings')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          {/* Ribbon background gradient — dawn/midday/dusk feel */}
          <linearGradient id="ribbonBg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#0a0a14" stopOpacity="0.08"/>
            <stop offset="25%"  stopColor="#0066FF" stopOpacity="0.04"/>
            <stop offset="50%"  stopColor="#67e8f9" stopOpacity="0.08"/>
            <stop offset="75%"  stopColor="#0066FF" stopOpacity="0.04"/>
            <stop offset="100%" stopColor="#0a0a14" stopOpacity="0.08"/>
          </linearGradient>

          {/* Ontario bar gradient */}
          <linearGradient id="ontarioBar" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#003FB3"/>
            <stop offset="50%" stopColor="#0066FF"/>
            <stop offset="100%" stopColor="#003FB3"/>
          </linearGradient>

          {/* Hyderabad bar gradient */}
          <linearGradient id="hyderabadBar" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0EA5E9"/>
            <stop offset="50%" stopColor="#06b6d4"/>
            <stop offset="100%" stopColor="#0EA5E9"/>
          </linearGradient>

          {/* Overlap glow */}
          <linearGradient id="overlapGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0"/>
            <stop offset="50%" stopColor="#67e8f9" stopOpacity="0.40"/>
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0"/>
          </linearGradient>

          {/* Soft drop shadow filter for bars */}
          <filter id="barShadow" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="3" result="off"/>
            <feComponentTransfer><feFuncA type="linear" slope="0.30"/></feComponentTransfer>
            <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          {/* Pulse for badges */}
          <radialGradient id="badgeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.50"/>
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* ─── Live status header pill ─── */}
        <g transform="translate(60, 50)">
          <rect x="0" y="0" rx="22" ry="22" width="320" height="44"
            fill="rgba(255,255,255,0.50)"
            stroke="rgba(0,102,255,0.20)" strokeWidth="1"
            style={{ filter: 'drop-shadow(0 6px 16px rgba(0,53,128,0.08))' }}
          />
          <circle cx="22" cy="22" r="5" fill={status.tone === 'overlap' ? '#06b6d4' : status.tone === 'active' ? '#0066FF' : '#94a3b8'}>
            <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="22" cy="22" r="10" fill={status.tone === 'overlap' ? '#06b6d4' : status.tone === 'active' ? '#0066FF' : '#94a3b8'} opacity="0.25">
            <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.35;0;0.35" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x="40" y="28" fontSize="13" fontWeight="800" fill="#0a0a14"
            fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="0.02em">
            {status.text}
          </text>
        </g>

        {/* ─── Time scale labels ─── */}
        {[0, 6, 12, 18, 24].map(h => (
          <g key={h} transform={`translate(${RIBBON_X + h * HOUR_W}, 130)`}>
            <line x1="0" y1="0" x2="0" y2="6" stroke="#94a3b8" strokeWidth="1" />
            <text x="0" y="-6" textAnchor="middle" fontSize="11" fill="#64748b"
              fontFamily="'JetBrains Mono', monospace" fontWeight="600">
              {String(h).padStart(2, '0')}:00
            </text>
          </g>
        ))}

        {/* ─── Ribbon background ─── */}
        <rect x={RIBBON_X} y="145" width={RIBBON_W} height="160" rx="10" fill="url(#ribbonBg)" />

        {/* ─── Subtle hour grid lines ─── */}
        {Array.from({ length: 23 }, (_, i) => i + 1).map(h => (
          <line key={h}
            x1={RIBBON_X + h * HOUR_W} y1="145"
            x2={RIBBON_X + h * HOUR_W} y2="305"
            stroke="rgba(0,102,255,0.05)" strokeWidth="1"
          />
        ))}

        {/* ─── Overlap glow regions (drawn BEFORE bars so bars sit on top) ─── */}
        {overlapSegs.map((seg, i) => {
          const x = RIBBON_X + seg.start * HOUR_W
          const w = (seg.end - seg.start) * HOUR_W
          return (
            <g key={`overlap-${i}`}>
              <rect x={x} y="145" width={w} height="160" rx="6" fill="url(#overlapGlow)">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
              </rect>
              <text x={x + w / 2} y="160" textAnchor="middle" fontSize="9" fontWeight="800"
                fill="#0c4a6e" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.10em">
                OVERLAP
              </text>
            </g>
          )
        })}

        {/* ─── Ontario bars ─── */}
        {segsByOffice.ontario.map((seg, i) => {
          const x = RIBBON_X + seg.start * HOUR_W
          const w = (seg.end - seg.start) * HOUR_W
          const o = OFFICES[0]
          return (
            <g key={`ontario-${i}`}>
              <rect x={x} y={o.barY} width={w} height={BAR_HEIGHT} rx="10"
                fill="url(#ontarioBar)" filter="url(#barShadow)"
                onMouseEnter={() => setHoveredOffice('ontario')}
                onMouseLeave={() => setHoveredOffice(null)}
                style={{ cursor: 'pointer' }}
              />
              {/* Label inside bar (only first segment) */}
              {i === 0 && w > 80 && (
                <text x={x + 14} y={o.barY + 25} fontSize="12" fontWeight="800" fill="#fff"
                  fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="0.04em">
                  ONTARIO · {fmtTime(seg.start)}–{fmtTime(seg.end)}
                </text>
              )}
            </g>
          )
        })}

        {/* ─── Hyderabad bars ─── */}
        {segsByOffice.hyderabad.map((seg, i) => {
          const x = RIBBON_X + seg.start * HOUR_W
          const w = (seg.end - seg.start) * HOUR_W
          const o = OFFICES[1]
          return (
            <g key={`hyderabad-${i}`}>
              <rect x={x} y={o.barY} width={w} height={BAR_HEIGHT} rx="10"
                fill="url(#hyderabadBar)" filter="url(#barShadow)"
                onMouseEnter={() => setHoveredOffice('hyderabad')}
                onMouseLeave={() => setHoveredOffice(null)}
                style={{ cursor: 'pointer' }}
              />
              {i === 0 && w > 80 && (
                <text x={x + 14} y={o.barY + 25} fontSize="12" fontWeight="800" fill="#fff"
                  fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="0.04em">
                  HYDERABAD · {fmtTime(seg.start)}–{fmtTime(seg.end)}
                </text>
              )}
            </g>
          )
        })}

        {/* ─── NOW vertical line ─── */}
        <g>
          <line x1={nowX} y1="135" x2={nowX} y2="320"
            stroke="#fff" strokeWidth="3" strokeDasharray="0" opacity="0.95" />
          <line x1={nowX} y1="135" x2={nowX} y2="320"
            stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 2" />
          <circle cx={nowX} cy="135" r="7" fill="#06b6d4" stroke="#fff" strokeWidth="2">
            <animate attributeName="r" values="6;9;6" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x={nowX} y="125" textAnchor="middle" fontSize="10" fontWeight="800"
            fill="#0066FF" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.04em">
            NOW · {fmtTime(currentHour)}
          </text>
        </g>

        {/* ─── Role count badges (clickable) ─── */}
        {OFFICES.map((o) => {
          const seg = segsByOffice[o.slug][0]
          const x = RIBBON_X + ((seg.start + seg.end) / 2) * HOUR_W
          const y = o.barY + BAR_HEIGHT + 24
          return (
            <g key={`badge-${o.slug}`}
              transform={`translate(${x}, ${y})`}
              style={{ cursor: 'pointer' }}
              onClick={() => handleJumpToRoles(o.slug)}
            >
              {/* Subtle glow */}
              <circle cx="0" cy="0" r="32" fill="url(#badgeGlow)">
                <animate attributeName="r" values="28;36;28" dur="3s" repeatCount="indefinite" />
              </circle>
              <rect x="-65" y="-15" width="130" height="30" rx="15"
                fill="rgba(255,255,255,0.95)"
                stroke={o.color} strokeWidth="1.5"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(0,53,128,0.12))' }}
              />
              <text x="-50" y="5" fontSize="14" fontFamily="sans-serif">{o.flag}</text>
              <text x="-30" y="5" fontSize="11" fontWeight="800" fill="#0a0a14"
                fontFamily="'Plus Jakarta Sans', sans-serif" letterSpacing="0.02em">
                {o.roles} {o.roles === 1 ? 'open role' : 'open roles'} →
              </text>
            </g>
          )
        })}

        {/* ─── Bottom caption ─── */}
        <g transform="translate(400, 430)">
          <text x="0" y="0" textAnchor="middle" fontSize="12" fill="#64748b"
            fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600">
            Shown in your local time · Updates live · Click any role badge to jump to listings
          </text>
        </g>
      </svg>

      {/* Floating ambient orbs behind ribbon — adds depth without distraction */}
      <div style={{
        position: 'absolute', top: '10%', left: '8%',
        width: '38%', height: '32%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.18), transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: -1,
      }} />
      <div style={{
        position: 'absolute', bottom: '8%', right: '8%',
        width: '32%', height: '28%',
        background: 'radial-gradient(circle, rgba(0,102,255,0.16), transparent 70%)',
        filter: 'blur(54px)', pointerEvents: 'none', zIndex: -1,
      }} />
    </div>
  )
}
