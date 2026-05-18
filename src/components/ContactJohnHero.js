/* ════════════════════════════════════════════════════════════════════════════
   CONTACT JOHN HERO — Animated character walks through the 4-step contact journey.
   
   • Desktop (≥768px): landscape layout, John walks horizontally L→R through 4 cards
   • Mobile (<768px):  portrait layout,  John walks vertically T→B through 4 cards
   • Each 16-second cycle picks random Service + Profile + Slot; Card 4 reflects them
   • IntersectionObserver pauses animation when hero is off-screen
   • All configurable arrays at the top of the file — easy to edit
   ════════════════════════════════════════════════════════════════════════════ */

import React, { useEffect, useRef, useState } from 'react'

/* ═══ EDITABLE CONFIG — swap these arrays anytime ═══ */
const SERVICES = [
  'Implementation',
  'Power Platform / AI',
  'Upgrade & Migration',
  'CRM & Customer Service',
  'Integration & APIs',
]

const PROFILES = [
  { name: 'Sarah Mitchell', email: 'sarah@acme.io' },
  { name: 'Raj Patel',      email: 'raj@nexus.co' },
  { name: 'Emma Chen',      email: 'emma@flux.io' },
  { name: 'James Walker',   email: 'james@orbit.co' },
]

const SLOTS = [
  'MON 09:30', 'MON 14:00',
  'TUE 11:00', 'TUE 15:30',
  'WED 10:00', 'WED 16:00',
  'THU 09:00', 'FRI 11:30',
]

const CYCLE = 16 // seconds per loop

/* ═══ BRAND COLORS — matches logo + home hero (no off-palette green) ═══ */
const C = {
  blue: '#0066FF', navy: '#003FB3', navyDeep: '#003580',
  cyanDark: '#0c4a6e', cyanMid: '#155e75',
  cyan: '#06B6D4', cyanLite: '#67e8f9', cyanGlow: '#a5f3fc',
  text: '#0a0a14', textM: '#475569', textL: '#94a3b8',
  skin: '#f5d4ad', hair: '#3a2818',
  // Aliases kept for code below — all blue/cyan family (NO GREEN)
  accent: '#0066FF',     // primary actions, borders, confirmed
  accentDeep: '#003580', // hover/active darker shade
  step: '#0c4a6e',       // step labels, subdued cyan-dark
}

/* ═══ HELPERS ═══ */
const lerp = (a, b, t) => a + (b - a) * t
const easeInOut = (t) => (t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2)/2)
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

/* ═══════════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
export default function ContactJohnHero() {
  const svgRef = useRef(null)
  const wrapRef = useRef(null)
  const refs = useRef({})              // SVG element refs by id
  const cycleData = useRef(null)        // current cycle's random picks
  const eventsFired = useRef(new Set()) // one-shot events
  const lastCycleStart = useRef(0)
  const rafId = useRef(null)
  const isVisible = useRef(true)

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  /* Listen for viewport changes */
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* IntersectionObserver — pause animation when off-screen */
  useEffect(() => {
    if (!wrapRef.current) return
    const obs = new IntersectionObserver(
      (entries) => { isVisible.current = entries[0].isIntersecting },
      { threshold: 0.1 }
    )
    obs.observe(wrapRef.current)
    return () => obs.disconnect()
  }, [])

  /* Pick random data for a new cycle */
  const newCycleData = () => ({
    service: pick(SERVICES),
    profile: pick(PROFILES),
    slot: pick(SLOTS),
    slotIdx: 0, // computed below
  })

  /* ═══════════════════════════════════════════════════════════════════
     LAYOUT-DEPENDENT POSITIONS
     ═══════════════════════════════════════════════════════════════════ */
  const getLayout = (mobile) => {
    if (mobile) {
      // PORTRAIT: cards stack vertically on the LEFT, John walks DOWN the RIGHT side.
      // ViewBox 460×980 (was 460×740) — taller to give each card breathing room so
      // content (5 options on card 1, 4-line summary + button on card 4) never
      // overflows the card border.
      // Card sizes: cards 1-3 h=215 (fits 5 options), card 4 h=240 (fits summary + button).
      // John at x=400 (right side). Floor is the vertical line he walks along.
      return {
        viewBox: '0 0 460 980',
        floor: { x1: 400, y1: 50, x2: 400, y2: 960, axis: 'y' },
        cards: [
          { cx: 160, cy: 125, w: 290, h: 215, num: '01', label: 'CHOOSE',  type: 'choose' },
          { cx: 160, cy: 365, w: 290, h: 215, num: '02', label: 'TYPING',  type: 'who' },
          { cx: 160, cy: 605, w: 290, h: 215, num: '03', label: 'PICKING', type: 'when' },
          { cx: 160, cy: 845, w: 290, h: 240, num: '04', label: 'BOOKED',  type: 'done' },
        ],
        johnStart: { x: 400, y: 55 },
        johnAtCard: (i) => ({ x: 400, y: [125, 365, 605, 845][i] }),
      }
    }
    // LANDSCAPE: COMPACT layout — viewBox 1200×450 (aspect 2.67).
    // ALL cards are now the same size (260×300) for visual uniformity. Earlier Card 4
    // was wider+taller which the client flagged as inconsistent. Even outer margins (32px),
    // gaps (32px between cards). Cards span y=20-320, John at y=425, floor y=440.
    return {
      viewBox: '0 0 1200 450',
      floor: { x1: 0, y1: 440, x2: 1200, y2: 440, axis: 'x' },
      cards: [
        { cx: 162,  cy: 170, w: 260, h: 300, num: '01', label: 'CHOOSE',  type: 'choose' },
        { cx: 454,  cy: 170, w: 260, h: 300, num: '02', label: 'TYPING',  type: 'who' },
        { cx: 746,  cy: 170, w: 260, h: 300, num: '03', label: 'PICKING', type: 'when' },
        { cx: 1038, cy: 170, w: 260, h: 300, num: '04', label: 'BOOKED',  type: 'done' },
      ],
      johnStart: { x: 60, y: 425 },
      johnAtCard: (i) => ({ x: [132, 424, 716, 1008][i], y: 425 }),
    }
  }

  /* ═══════════════════════════════════════════════════════════════════
     ANIMATION LOOP
     ═══════════════════════════════════════════════════════════════════ */
  useEffect(() => {
    const layout = getLayout(isMobile)
    const startTime = performance.now() / 1000
    lastCycleStart.current = -1 // force fresh cycle data on first frame

    /* Build per-phase timeline based on layout */
    const buildPhases = () => {
      const c = layout.cards
      const pAt = (i) => layout.johnAtCard(i)
      // For mobile (vertical walking), we set yAxis flag
      const ax = isMobile ? 'y' : 'x'
      // Walking goes from previous position to next card's position
      const walks = []
      for (let i = 0; i < 4; i++) {
        const from = i === 0 ? layout.johnStart : pAt(i - 1)
        const to = pAt(i)
        walks.push({ from, to })
      }

      return [
        // 0-1.6s: walk to Card 1
        { start: 0.0,  end: 1.6,  type: 'walk', from: walks[0].from, to: walks[0].to,  phaseI: 0 },
        // 1.6-4.0s: choose at Card 1
        { start: 1.6,  end: 4.0,  type: 'point', at: walks[0].to, cardI: 0, phaseI: 0 },
        // 4.0-5.4s: walk to Card 2
        { start: 4.0,  end: 5.4,  type: 'walk', from: walks[1].from, to: walks[1].to,  phaseI: 1 },
        // 5.4-8.6s: type at Card 2
        { start: 5.4,  end: 8.6,  type: 'type', at: walks[1].to, cardI: 1, phaseI: 1 },
        // 8.6-9.8s: walk to Card 3
        { start: 8.6,  end: 9.8,  type: 'walk', from: walks[2].from, to: walks[2].to,  phaseI: 2 },
        // 9.8-12.4s: think + pick at Card 3
        { start: 9.8,  end: 12.4, type: 'think', at: walks[2].to, cardI: 2, phaseI: 2 },
        // 12.4-13.4s: walk to Card 4
        { start: 12.4, end: 13.4, type: 'walk', from: walks[3].from, to: walks[3].to,  phaseI: 3 },
        // 13.4-16s: confirm + celebrate
        { start: 13.4, end: CYCLE,type: 'celebrate', at: walks[3].to, cardI: 3, phaseI: 3 },
      ]
    }

    let phases = buildPhases()

    /* Card reset on cycle start */
    const resetCards = () => {
      eventsFired.current.clear()
      const r = refs.current

      // Card 1 reset
      const newSvc = cycleData.current.service
      const svcIdx = SERVICES.indexOf(newSvc)
      // Highlight which option will be picked
      r.choose_pickedIdx = svcIdx
      SERVICES.forEach((s, i) => {
        const optBg = r[`opt${i}_bg`]
        const optRing = r[`opt${i}_ring`]
        const optDot = r[`opt${i}_dot`]
        const optText = r[`opt${i}_text`]
        const optCheck = r[`opt${i}_check`]
        if (!optBg) return
        optBg.setAttribute('fill', 'rgba(255,255,255,0.75)')
        optBg.setAttribute('stroke', 'rgba(148,163,184,0.30)')
        optBg.setAttribute('stroke-width', '0.8')
        optRing.setAttribute('fill', 'none')
        optRing.setAttribute('stroke', '#94a3b8')
        optDot.setAttribute('opacity', '0')
        optText.setAttribute('fill', C.textM)
        if (optCheck) optCheck.setAttribute('opacity', '0')
        // Also: update text content for any future label changes
        optText.textContent = s
      })

      // Card 2 reset
      if (r.who_name) r.who_name.textContent = ''
      if (r.who_email) r.who_email.textContent = ''
      if (r.who_nameCursor) r.who_nameCursor.setAttribute('opacity', '0')
      if (r.who_emailCursor) r.who_emailCursor.setAttribute('opacity', '0')

      // Card 3 reset
      if (r.when_slotText) r.when_slotText.textContent = cycleData.current.slot
      // Reset all slot pills (we only show 1 active slot in the simple version)
      if (r.when_slotBg) {
        r.when_slotBg.setAttribute('fill', 'rgba(255,255,255,0.75)')
        r.when_slotBg.setAttribute('stroke', 'rgba(148,163,184,0.30)')
        r.when_slotText.setAttribute('fill', C.textM)
        if (r.when_slotCheck) r.when_slotCheck.setAttribute('opacity', '0')
      }

      // Card 4 reset
      if (r.done_title) r.done_title.textContent = 'Review & confirm'
      if (r.done_service) r.done_service.textContent = cycleData.current.service
      if (r.done_name) r.done_name.textContent = cycleData.current.profile.name
      if (r.done_email) r.done_email.textContent = cycleData.current.profile.email
      if (r.done_slot) r.done_slot.textContent = cycleData.current.slot
      if (r.done_btnBg) r.done_btnBg.setAttribute('fill', C.blue)
      if (r.done_btnText) r.done_btnText.textContent = 'CONFIRM'
      if (r.confetti) r.confetti.innerHTML = ''

      // All cards: dim active glow
      ;[0,1,2,3].forEach(i => {
        const active = r[`card${i}_active`]
        const spot = r[`card${i}_spot`]
        if (active) active.setAttribute('opacity', '0')
        if (spot) { spot.setAttribute('rx', '0'); spot.setAttribute('ry', '0') }
      })
      // Hide bubble
      if (r.john_bubble) r.john_bubble.setAttribute('opacity', '0')
    }

    const fireOnce = (key, fn) => {
      if (!eventsFired.current.has(key)) {
        eventsFired.current.add(key)
        fn()
      }
    }

    /* ═══ Walk cycle (limb swing while moving) ═══ */
    const applyWalkCycle = (t, mobileWalking) => {
      const r = refs.current
      const cycleSpeed = 7
      const legAngle = Math.sin(t * cycleSpeed) * 25
      const armAngle = -Math.sin(t * cycleSpeed) * 18
      if (r.john_legL) r.john_legL.setAttribute('transform', `rotate(${legAngle.toFixed(1)})`)
      if (r.john_legR) r.john_legR.setAttribute('transform', `rotate(${(-legAngle).toFixed(1)})`)
      if (r.john_armL) r.john_armL.setAttribute('transform', `translate(-10,-19) rotate(${armAngle.toFixed(1)})`)
      if (r.john_armR) r.john_armR.setAttribute('transform', `translate(10,-19) rotate(${(-armAngle).toFixed(1)})`)
      const bob = Math.abs(Math.sin(t * cycleSpeed * 2)) * 1.2
      if (r.john_body) r.john_body.setAttribute('transform', `translate(0, ${-28 - bob})`)
      if (r.john_head) r.john_head.setAttribute('transform', 'translate(0,-32)')
      if (r.john_bubble) r.john_bubble.setAttribute('opacity', '0')
    }

    /* ═══ Set John's overall position ═══ */
    const setJohnAt = (x, y) => {
      const r = refs.current
      if (r.john) r.john.setAttribute('transform', `translate(${x.toFixed(1)}, ${y.toFixed(1)})`)
    }

    /* ═══ Card spotlight + active border ═══ */
    const setCardActive = (cardI, progress) => {
      const r = refs.current
      const active = r[`card${cardI}_active`]
      const spot = r[`card${cardI}_spot`]
      if (active) active.setAttribute('opacity', Math.min(progress * 3, 1).toFixed(2))
      if (spot) {
        const sr = Math.min(progress * 2, 1) * (isMobile ? 130 : 110)
        spot.setAttribute('rx', sr.toFixed(0))
        spot.setAttribute('ry', (sr * 0.7).toFixed(0))
      }
    }

    /* ═══ Phase: WALK ═══ */
    const applyWalk = (p, t) => {
      const localT = (t - p.start) / (p.end - p.start)
      const eased = easeInOut(localT)
      const x = lerp(p.from.x, p.to.x, eased)
      const y = lerp(p.from.y, p.to.y, eased)
      setJohnAt(x, y)
      applyWalkCycle(t)
    }

    /* ═══ Phase: POINT (select option at Card 1) ═══ */
    const applyPoint = (p, t) => {
      setJohnAt(p.at.x, p.at.y)
      const r = refs.current
      r.john_legL.setAttribute('transform', 'rotate(0)')
      r.john_legR.setAttribute('transform', 'rotate(0)')
      const localT = (t - p.start) / (p.end - p.start)
      // Arm direction: point UP (mobile) or to the side (desktop) toward card
      // For desktop, card is above & right → arm rotates -85
      // For mobile, card is above-left → arm rotates -85 too (still points up-forward)
      const armA = Math.min(localT * 3, 1) * -85
      r.john_armR.setAttribute('transform', `translate(10,-19) rotate(${armA.toFixed(1)})`)
      r.john_armL.setAttribute('transform', 'translate(-10,-19) rotate(0)')
      r.john_body.setAttribute('transform', 'translate(0,-28)')
      r.john_head.setAttribute('transform', 'translate(0,-32)')

      setCardActive(p.cardI, localT)

      // At localT > 0.45, highlight the chosen option + show bubble
      if (localT > 0.45) {
        fireOnce('c1-select', () => {
          const idx = refs.current.choose_pickedIdx
          const bg = refs.current[`opt${idx}_bg`]
          const ring = refs.current[`opt${idx}_ring`]
          const dot = refs.current[`opt${idx}_dot`]
          const text = refs.current[`opt${idx}_text`]
          const check = refs.current[`opt${idx}_check`]
          if (bg) {
            bg.setAttribute('fill', 'rgba(0,102,255,0.10)')
            bg.setAttribute('stroke', C.accent)
            bg.setAttribute('stroke-width', '1.5')
            ring.setAttribute('fill', C.accent)
            ring.setAttribute('stroke', C.accent)
            dot.setAttribute('opacity', '1')
            text.setAttribute('fill', C.navyDeep)
            if (check) check.setAttribute('opacity', '1')
          }
          refs.current.john_bubble.setAttribute('opacity', '1')
          refs.current.john_bubbleText.textContent = 'Got it'
        })
      }
      if (localT > 0.85) refs.current.john_bubble.setAttribute('opacity', '0')
    }

    /* ═══ Phase: TYPE (fill name + email at Card 2) ═══ */
    const applyType = (p, t) => {
      setJohnAt(p.at.x, p.at.y)
      const r = refs.current
      r.john_legL.setAttribute('transform', 'rotate(0)')
      r.john_legR.setAttribute('transform', 'rotate(0)')
      const localT = (t - p.start) / (p.end - p.start)
      // Typing arm jitter
      const armBase = -55
      const jit = Math.sin(t * 12) * 8
      r.john_armL.setAttribute('transform', `translate(-10,-19) rotate(${(armBase + jit).toFixed(1)})`)
      r.john_armR.setAttribute('transform', `translate(10,-19) rotate(${(-armBase - jit).toFixed(1)})`)
      r.john_body.setAttribute('transform', 'translate(0,-27)')
      r.john_head.setAttribute('transform', 'translate(0,-32) rotate(5)')

      setCardActive(p.cardI, localT)

      const NAME = cycleData.current.profile.name
      const EMAIL = cycleData.current.profile.email

      if (localT < 0.4) {
        const chars = Math.floor((localT / 0.4) * NAME.length)
        r.who_name.textContent = NAME.slice(0, chars)
        r.who_nameCursor.setAttribute('opacity', Math.sin(t * 8) > 0 ? '1' : '0')
        r.who_email.textContent = ''
        r.who_emailCursor.setAttribute('opacity', '0')
      } else if (localT < 0.88) {
        r.who_name.textContent = NAME
        r.who_nameCursor.setAttribute('opacity', '0')
        const chars = Math.floor(((localT - 0.4) / 0.48) * EMAIL.length)
        r.who_email.textContent = EMAIL.slice(0, chars)
        r.who_emailCursor.setAttribute('opacity', Math.sin(t * 8) > 0 ? '1' : '0')
      } else {
        r.who_name.textContent = NAME
        r.who_email.textContent = EMAIL
        r.who_nameCursor.setAttribute('opacity', '0')
        r.who_emailCursor.setAttribute('opacity', '0')
        fireOnce('c2-done', () => {
          r.john_bubble.setAttribute('opacity', '1')
          r.john_bubbleText.textContent = 'Done'
        })
      }
      if (localT > 0.97) r.john_bubble.setAttribute('opacity', '0')
    }

    /* ═══ Phase: THINK + PICK (at Card 3) ═══ */
    const applyThink = (p, t) => {
      setJohnAt(p.at.x, p.at.y)
      const r = refs.current
      r.john_legL.setAttribute('transform', 'rotate(0)')
      r.john_legR.setAttribute('transform', 'rotate(0)')
      const localT = (t - p.start) / (p.end - p.start)

      if (localT < 0.55) {
        // Thinking pose
        r.john_armR.setAttribute('transform', 'translate(10,-19) rotate(-145)')
        r.john_armL.setAttribute('transform', 'translate(-10,-19) rotate(0)')
        r.john_body.setAttribute('transform', 'translate(0,-28)')
        const tilt = Math.sin(t * 1.5) * 7
        r.john_head.setAttribute('transform', `translate(0,-32) rotate(${tilt.toFixed(1)})`)
        fireOnce('c3-think', () => {
          r.john_bubble.setAttribute('opacity', '1')
          r.john_bubbleText.textContent = 'Hmm…'
        })
      } else if (localT < 0.78) {
        // Point at slot
        r.john_armR.setAttribute('transform', 'translate(10,-19) rotate(-95)')
        r.john_armL.setAttribute('transform', 'translate(-10,-19) rotate(0)')
        r.john_head.setAttribute('transform', 'translate(0,-32)')
        r.john_bubble.setAttribute('opacity', '0')
        fireOnce('c3-pick', () => {
          r.when_slotBg.setAttribute('fill', 'rgba(0,102,255,0.12)')
          r.when_slotBg.setAttribute('stroke', C.accent)
          r.when_slotBg.setAttribute('stroke-width', '1.5')
          r.when_slotText.setAttribute('fill', C.navyDeep)
          if (r.when_slotCheck) r.when_slotCheck.setAttribute('opacity', '1')
        })
      } else {
        r.john_armR.setAttribute('transform', 'translate(10,-19) rotate(0)')
        r.john_armL.setAttribute('transform', 'translate(-10,-19) rotate(0)')
        r.john_head.setAttribute('transform', 'translate(0,-32)')
        fireOnce('c3-done', () => {
          r.john_bubble.setAttribute('opacity', '1')
          r.john_bubbleText.textContent = 'Perfect'
        })
      }
      if (localT > 0.95) r.john_bubble.setAttribute('opacity', '0')
      setCardActive(p.cardI, localT)
    }

    /* ═══ Phase: CELEBRATE (confirm at Card 4) ═══ */
    const applyCelebrate = (p, t) => {
      setJohnAt(p.at.x, p.at.y)
      const r = refs.current
      r.john_legL.setAttribute('transform', 'rotate(0)')
      r.john_legR.setAttribute('transform', 'rotate(0)')
      const localT = (t - p.start) / (p.end - p.start)

      if (localT < 0.25) {
        // Reach toward button
        const armProg = localT / 0.25
        r.john_armR.setAttribute('transform', `translate(10,-19) rotate(${(-90 * armProg).toFixed(1)})`)
        r.john_armL.setAttribute('transform', 'translate(-10,-19) rotate(0)')
        r.john_body.setAttribute('transform', 'translate(0,-28)')
        r.john_head.setAttribute('transform', 'translate(0,-32)')
      } else if (localT < 0.40) {
        fireOnce('c4-confirm', () => {
          r.done_btnBg.setAttribute('fill', C.navyDeep)
          r.done_btnText.textContent = 'CONFIRMED ✓'
          r.done_title.textContent = 'Booked!'
          // Spawn confetti
          if (r.confetti) {
            const colors = [C.blue, C.navy, C.cyanLite, C.cyanGlow, C.navyDeep]
            for (let i = 0; i < 20; i++) {
              const c = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
              const w = 3 + Math.random() * 3
              c.setAttribute('x', (Math.random() * 200 - 100).toFixed(1))
              c.setAttribute('y', '0')
              c.setAttribute('width', w)
              c.setAttribute('height', w)
              c.setAttribute('fill', colors[Math.floor(Math.random() * colors.length)])
              c.setAttribute('opacity', '0.9')
              c.style.transformOrigin = 'center'
              c.style.animation = `johnConfettiUp ${1.4 + Math.random()}s ease-out forwards`
              c.style.animationDelay = `${Math.random() * 0.4}s`
              r.confetti.appendChild(c)
            }
          }
        })
        r.john_armR.setAttribute('transform', 'translate(10,-19) rotate(-90)')
      } else {
        // Victory pose — arms up
        const victP = Math.min((localT - 0.40) / 0.25, 1)
        const armUp = lerp(-90, -160, victP)
        const otherArm = lerp(0, 160, victP)
        r.john_armR.setAttribute('transform', `translate(10,-19) rotate(${armUp.toFixed(1)})`)
        r.john_armL.setAttribute('transform', `translate(-10,-19) rotate(${otherArm.toFixed(1)})`)
        const hop = Math.abs(Math.sin((localT - 0.40) * 12)) * 4
        r.john_body.setAttribute('transform', `translate(0, ${-28 - hop})`)
        r.john_head.setAttribute('transform', 'translate(0,-32)')
        fireOnce('c4-cheer', () => {
          r.john_bubble.setAttribute('opacity', '1')
          r.john_bubbleText.textContent = 'Booked!'
        })
      }
      if (localT > 0.92) r.john_bubble.setAttribute('opacity', '0')
      setCardActive(p.cardI, localT)
    }

    /* ═══ MAIN ANIMATION LOOP ═══ */
    const loop = () => {
      rafId.current = requestAnimationFrame(loop)
      if (!isVisible.current) return

      const now = performance.now() / 1000
      const elapsed = now - startTime
      const cycleNum = Math.floor(elapsed / CYCLE)
      const t = elapsed % CYCLE

      // New cycle? Pick new random data + reset cards
      if (cycleNum !== lastCycleStart.current) {
        lastCycleStart.current = cycleNum
        cycleData.current = newCycleData()
        resetCards()
      }

      // Find current phase
      const phase = phases.find(p => t >= p.start && t < p.end)
      if (!phase) return

      switch (phase.type) {
        case 'walk':      applyWalk(phase, t); break
        case 'point':     applyPoint(phase, t); break
        case 'type':      applyType(phase, t); break
        case 'think':     applyThink(phase, t); break
        case 'celebrate': applyCelebrate(phase, t); break
        default: break
      }
    }

    rafId.current = requestAnimationFrame(loop)
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [isMobile])

  /* ═══════════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════════ */
  const layout = getLayout(isMobile)
  const setR = (key) => (el) => { if (el) refs.current[key] = el }

  /* ═══ Build CARDS ═══ */
  const renderCard = (card, i) => {
    const halfW = card.w / 2
    const halfH = card.h / 2
    return (
      <g key={i} transform={`translate(${card.cx}, ${card.cy})`}>
        {/* Spotlight when active */}
        <ellipse ref={setR(`card${i}_spot`)} cx="0" cy="0" rx="0" ry="0" fill="url(#cardSpot)"/>
        {/* Card body + active border with deep shadow */}
        <g filter="url(#cardShadow)">
          <rect x={-halfW} y={-halfH} width={card.w} height={card.h} rx="16" fill="url(#cardGlass)" stroke="rgba(0,102,255,0.18)" strokeWidth="1"/>
          {/* Top accent bar — premium visual cue */}
          <rect x={-halfW + 8} y={-halfH} width={card.w - 16} height="3" rx="1.5" fill={C.accent} opacity="0.7"/>
          <rect ref={setR(`card${i}_active`)} x={-halfW} y={-halfH} width={card.w} height={card.h} rx="16" fill="none" stroke={C.accent} strokeWidth="2" opacity="0"/>
        </g>
        {/* Step header */}
        <text x={-halfW + 16} y={-halfH + 22} fontSize="10" fontWeight="900" fill={C.step} letterSpacing="0.18em" fontFamily="'JetBrains Mono', monospace">
          {card.num} · {card.label}
        </text>
        {/* Content per type */}
        {card.type === 'choose' && renderChooseContent(card)}
        {card.type === 'who' && renderWhoContent(card)}
        {card.type === 'when' && renderWhenContent(card)}
        {card.type === 'done' && renderDoneContent(card)}
      </g>
    )
  }

  const renderChooseContent = (card) => {
    const halfW = card.w / 2
    const yStart = -card.h / 2 + 62
    const optY = (i) => yStart + i * 28
    return (
      <>
        <text x={-halfW + 16} y={-card.h/2 + 46} fontSize="15" fontWeight="900" fill={C.navyDeep} fontFamily="'Plus Jakarta Sans', sans-serif">Pick your focus</text>
        {SERVICES.map((s, i) => (
          <g key={i} transform={`translate(${-halfW + 14}, ${optY(i)})`}>
            <rect ref={setR(`opt${i}_bg`)} width={card.w - 28} height="24" rx="7" fill="rgba(255,255,255,0.75)" stroke="rgba(148,163,184,0.30)" strokeWidth="0.8"/>
            <circle ref={setR(`opt${i}_ring`)} cx="13" cy="12" r="4.5" fill="none" stroke="#94a3b8" strokeWidth="1.2"/>
            <circle ref={setR(`opt${i}_dot`)} cx="13" cy="12" r="2.2" fill="#fff" opacity="0"/>
            <text ref={setR(`opt${i}_text`)} x="24" y="16" fontSize="10.5" fontWeight="700" fill={C.textM} fontFamily="'Plus Jakarta Sans', sans-serif">{s}</text>
            <g ref={setR(`opt${i}_check`)} transform={`translate(${card.w - 42}, 12)`} opacity="0">
              <circle r="7" fill={C.accent}/>
              <path d="M-3 0 L-1 2 L3 -2.5" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </g>
        ))}
      </>
    )
  }

  const renderWhoContent = (card) => {
    const halfW = card.w / 2
    return (
      <>
        <text x={-halfW + 16} y={-card.h/2 + 46} fontSize="15" fontWeight="900" fill={C.navyDeep} fontFamily="'Plus Jakarta Sans', sans-serif">Your details</text>
        {/* Avatar */}
        <g transform={`translate(${-halfW + 36}, 8)`}>
          <circle r="24" fill="rgba(0,102,255,0.10)" stroke={C.accent} strokeWidth="1.8"/>
          <circle cy="-7" r="7" fill={C.accent}/>
          <path d="M -13 11 Q 0 -1 13 11" fill={C.accent}/>
        </g>
        {/* Name field */}
        <g transform={`translate(${-halfW + 76}, -14)`}>
          <text fontSize="9" fontWeight="700" fill={C.textL} fontFamily="'JetBrains Mono', monospace" letterSpacing="0.10em">NAME</text>
          <text ref={setR('who_name')} y="16" fontSize="13" fontWeight="900" fill={C.navyDeep} fontFamily="'Plus Jakarta Sans', sans-serif"/>
          <text ref={setR('who_nameCursor')} y="16" fontSize="13" fontWeight="900" fill={C.accent} fontFamily="'Plus Jakarta Sans', sans-serif" opacity="0">|</text>
        </g>
        {/* Email field */}
        <g transform={`translate(${-halfW + 76}, 32)`}>
          <text fontSize="9" fontWeight="700" fill={C.textL} fontFamily="'JetBrains Mono', monospace" letterSpacing="0.10em">EMAIL</text>
          <text ref={setR('who_email')} y="16" fontSize="11" fontWeight="700" fill={C.textM} fontFamily="'JetBrains Mono', monospace"/>
          <text ref={setR('who_emailCursor')} y="16" fontSize="11" fontWeight="700" fill={C.accent} fontFamily="'JetBrains Mono', monospace" opacity="0">|</text>
        </g>
      </>
    )
  }

  const renderWhenContent = (card) => {
    const halfW = card.w / 2
    return (
      <>
        <text x={-halfW + 16} y={-card.h/2 + 46} fontSize="15" fontWeight="900" fill={C.navyDeep} fontFamily="'Plus Jakarta Sans', sans-serif">Pick a slot</text>
        <text x={-halfW + 16} y={-card.h/2 + 64} fontSize="10" fontWeight="600" fill={C.textM} fontFamily="'Plus Jakarta Sans', sans-serif">When works best?</text>
        {/* Selected slot pill — large, prominent */}
        <g transform="translate(0, 5)">
          <rect ref={setR('when_slotBg')} x={-halfW + 18} y="-22" width={card.w - 36} height="44" rx="10" fill="rgba(255,255,255,0.75)" stroke="rgba(148,163,184,0.30)" strokeWidth="0.8"/>
          <text ref={setR('when_slotText')} x="0" y="9" textAnchor="middle" fontSize="17" fontWeight="900" fill={C.textM} fontFamily="'JetBrains Mono', monospace">MON 09:30</text>
          <g ref={setR('when_slotCheck')} transform={`translate(${halfW - 32}, 0)`} opacity="0">
            <circle r="8" fill={C.accent}/>
            <path d="M-3 0 L-1 2 L3 -2.5" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </g>
        <text x="0" y={card.h/2 - 22} textAnchor="middle" fontSize="10" fontWeight="700" fill={C.textL} fontFamily="'JetBrains Mono', monospace" letterSpacing="0.14em">UK TIME · BST</text>
      </>
    )
  }

  const renderDoneContent = (card) => {
    const halfW = card.w / 2
    const xL = -halfW + 18
    return (
      <>
        <text ref={setR('done_title')} x={xL} y={-card.h/2 + 46} fontSize="16" fontWeight="900" fill={C.navyDeep} fontFamily="'Plus Jakarta Sans', sans-serif">Review &amp; confirm</text>
        {/* Summary fields */}
        <g transform={`translate(${xL}, ${-card.h/2 + 68})`} fontFamily="'Plus Jakarta Sans', sans-serif">
          <text fontSize="8" fontWeight="700" fill={C.textL} fontFamily="'JetBrains Mono', monospace" letterSpacing="0.10em">SERVICE</text>
          <text ref={setR('done_service')} y="13" fontSize="11.5" fontWeight="900" fill={C.text}>Implementation</text>

          <text y="32" fontSize="8" fontWeight="700" fill={C.textL} fontFamily="'JetBrains Mono', monospace" letterSpacing="0.10em">NAME</text>
          <text ref={setR('done_name')} y="45" fontSize="11.5" fontWeight="900" fill={C.text}>Sarah Mitchell</text>

          <text y="64" fontSize="8" fontWeight="700" fill={C.textL} fontFamily="'JetBrains Mono', monospace" letterSpacing="0.10em">EMAIL</text>
          <text ref={setR('done_email')} y="77" fontSize="10" fontWeight="700" fill={C.textM} fontFamily="'JetBrains Mono', monospace">sarah@acme.io</text>

          <text y="96" fontSize="8" fontWeight="700" fill={C.textL} fontFamily="'JetBrains Mono', monospace" letterSpacing="0.10em">SLOT</text>
          <text ref={setR('done_slot')} y="109" fontSize="11.5" fontWeight="900" fill={C.text}>MON 09:30</text>
        </g>
        {/* CONFIRM button */}
        <g transform={`translate(0, ${card.h/2 - 28})`}>
          <rect ref={setR('done_btnBg')} x={-halfW + 24} y="-14" width={card.w - 48} height="28" rx="14" fill={C.blue}/>
          <text ref={setR('done_btnText')} y="5" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fff" letterSpacing="0.16em" fontFamily="'Plus Jakarta Sans', sans-serif">CONFIRM</text>
        </g>
        {/* Confetti container */}
        <g ref={setR('confetti')}/>
      </>
    )
  }

  /* ═══ John character SVG ═══
   * On MOBILE, the entire body (legs/torso/arms/head) is wrapped in scale(-1,1)
   * so John faces LEFT — his right arm (which the pointing animations control)
   * visually appears on his left side, pointing toward the cards.
   * The speech bubble is OUTSIDE the flip group so the text reads normally,
   * and we redraw it on the left side of John on mobile.
   */
  const renderJohn = () => (
    <g ref={setR('john')} transform={`translate(${layout.johnStart.x}, ${layout.johnStart.y})`}>
      {/* Inner group scaled 1.4× for visual prominence */}
      <g transform="scale(1.4)">
      <ellipse cx="0" cy="2" rx="14" ry="2.5" fill="rgba(0,0,0,0.18)"/>
      {/* BODY — flipped horizontally on mobile so John faces the cards (left) */}
      <g transform={isMobile ? 'scale(-1, 1)' : ''}>
      <g ref={setR('john_body')} transform="translate(0,-28)">
        {/* Legs */}
        <g ref={setR('john_legL')} transform="rotate(0)">
          <rect x="-6" y="0" width="6" height="22" rx="2.5" fill="#001233"/>
          <ellipse cx="-3" cy="24" rx="5" ry="2.5" fill="#0a0a14"/>
        </g>
        <g ref={setR('john_legR')} transform="rotate(0)">
          <rect x="0" y="0" width="6" height="22" rx="2.5" fill="#001233"/>
          <ellipse cx="3" cy="24" rx="5" ry="2.5" fill="#0a0a14"/>
        </g>
        {/* Torso */}
        <rect x="-11" y="-22" width="22" height="26" rx="6" fill="url(#bodyGrad)"/>
        <polygon points="0,-22 -2.5,-16 0,2 2.5,-16" fill={C.cyan}/>
        <polygon points="-8,-22 -3,-15 0,-18 3,-15 8,-22" fill="#fff" opacity="0.85"/>
        {/* Arms */}
        <g ref={setR('john_armL')} transform="translate(-10,-19) rotate(0)">
          <rect x="-3" y="0" width="6" height="22" rx="2.5" fill="url(#bodyGrad)"/>
          <circle cx="0" cy="22" r="3.5" fill={C.skin}/>
        </g>
        <g ref={setR('john_armR')} transform="translate(10,-19) rotate(0)">
          <rect x="-3" y="0" width="6" height="22" rx="2.5" fill="url(#bodyGrad)"/>
          <circle cx="0" cy="22" r="3.5" fill={C.skin}/>
        </g>
        {/* Head */}
        <g ref={setR('john_head')} transform="translate(0,-32)">
          <circle r="11" fill={C.skin}/>
          <path d="M -10 -4 Q -10 -12 -3 -11 Q 0 -13 3 -11 Q 10 -12 10 -4 L 9 1 Q 7 -4 5 -5 Q 0 -6 -5 -5 Q -7 -4 -9 1 Z" fill={C.hair}/>
          <ellipse className="john-eye-blink" cx="-3" cy="-1" rx="1" ry="1.4" fill="#0a0a14"/>
          <ellipse className="john-eye-blink" cx="3" cy="-1" rx="1" ry="1.4" fill="#0a0a14"/>
          <path d="M -2.5 4 Q 0 6 2.5 4" stroke="#0a0a14" strokeWidth="1" fill="none" strokeLinecap="round"/>
          <ellipse cx="-11" cy="0" rx="1.5" ry="2" fill="#e8c697"/>
          <ellipse cx="11" cy="0" rx="1.5" ry="2" fill="#e8c697"/>
        </g>
      </g>
      </g>
      {/* Speech bubble — OUTSIDE the flip group so the text reads normally.
       * On mobile, the bubble sits on John's LEFT (toward cards) with the tail pointing right.
       * On desktop, the bubble sits on John's RIGHT with the tail pointing left.
       * Position is (±15, -73) — equivalent to the original (15, -45) inside the body group
       * which itself had translate(0, -28), so combined y = -45 + -28 = -73. */}
      <g ref={setR('john_bubble')} transform={isMobile ? 'translate(-15,-73)' : 'translate(15,-73)'} opacity="0">
        <rect x={isMobile ? -43 : -3} y="-12" width="46" height="20" rx="10" fill={C.accent}/>
        <polygon points={isMobile ? '3,-3 10,4 3,2' : '-3,-3 -10,4 -3,2'} fill={C.accent}/>
        <text ref={setR('john_bubbleText')} x={isMobile ? -20 : 20} y="2" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff" fontFamily="'Plus Jakarta Sans', sans-serif">Hi</text>
      </g>
      </g>
    </g>
  )

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'relative', width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <style>{`
        @keyframes johnConfettiUp {
          0% { transform: translateY(0) rotate(0); opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        @keyframes johnBlink {
          0%, 92%, 100% { transform: scaleY(1); }
          96% { transform: scaleY(0.1); }
        }
        .john-eye-blink {
          transform-origin: center;
          transform-box: fill-box;
          animation: johnBlink 4s ease-in-out infinite;
        }
      `}</style>

      <svg
        ref={svgRef}
        viewBox={layout.viewBox}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <linearGradient id="cardGlass" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95"/>
            <stop offset="100%" stopColor="#f0f9ff" stopOpacity="0.85"/>
          </linearGradient>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={C.blue}/>
            <stop offset="100%" stopColor={C.navy}/>
          </linearGradient>
          <linearGradient id="floorGrad" x1="0%" y1="0%" x2={layout.floor.axis === 'y' ? '0%' : '100%'} y2={layout.floor.axis === 'y' ? '100%' : '0%'}>
            <stop offset="0%" stopColor={C.cyan} stopOpacity="0"/>
            <stop offset="20%" stopColor={C.cyan} stopOpacity="0.4"/>
            <stop offset="80%" stopColor={C.cyan} stopOpacity="0.4"/>
            <stop offset="100%" stopColor={C.cyan} stopOpacity="0"/>
          </linearGradient>
          <radialGradient id="cardSpot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={C.cyanLite} stopOpacity="0.30"/>
            <stop offset="100%" stopColor={C.cyan} stopOpacity="0"/>
          </radialGradient>
          <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5"/>
            <feOffset dx="0" dy="6" result="off"/>
            <feComponentTransfer><feFuncA type="linear" slope="0.25"/></feComponentTransfer>
            <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Floor / walkway */}
        <line
          x1={layout.floor.x1} y1={layout.floor.y1}
          x2={layout.floor.x2} y2={layout.floor.y2}
          stroke="url(#floorGrad)" strokeWidth="2" strokeDasharray="6 8"
        />

        {/* Ambient particles — in the breathing space between cards (left) and John (right) on mobile,
            and in the top decorative band on desktop. */}
        <g opacity="0.55">
          <circle cx={isMobile ? 340 : 80} cy={isMobile ? 65 : 12} r="2.5" fill={C.cyanLite}>
            <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx={isMobile ? 425 : 340} cy={isMobile ? 285 : 8} r="2" fill={C.cyanGlow}>
            <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" begin="0.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx={isMobile ? 340 : 600} cy={isMobile ? 510 : 14} r="2.5" fill={C.cyanLite}>
            <animate attributeName="opacity" values="0.3;1;0.3" dur="3.5s" begin="1s" repeatCount="indefinite"/>
          </circle>
          <circle cx={isMobile ? 425 : 870} cy={isMobile ? 735 : 8} r="2" fill={C.cyanGlow}>
            <animate attributeName="opacity" values="0.3;1;0.3" dur="4.5s" begin="1.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx={isMobile ? 340 : 1130} cy={isMobile ? 950 : 12} r="2.5" fill={C.cyanLite}>
            <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin="2s" repeatCount="indefinite"/>
          </circle>
        </g>

        {/* Cards */}
        {layout.cards.map((card, i) => renderCard(card, i))}

        {/* John */}
        {renderJohn()}
      </svg>
    </div>
  )
}