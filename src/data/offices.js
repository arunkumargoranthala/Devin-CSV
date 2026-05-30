/* ════════════════════════════════════════════════════════════════════════════
 *  OFFICES — single source of truth for DevinStratus global offices
 *  ────────────────────────────────────────────────────────────────────────────
 *  Real data confirmed by client (May 2026).
 *
 *  Per-office shape:
 *    slug, flag, city, country, full, legalName
 *    role         — 'Head of Operations' | 'Delivery Center'
 *    phone, email, addr
 *    tz, tzOffset (hours from UTC)
 *    headcount, founded
 *    isHQ — boolean (the Head of Operations office)
 * ════════════════════════════════════════════════════════════════════════════ */

export const OFFICES = [
  {
    slug: 'ontario',
    flag: '🇨🇦',
    city: 'Barrie',
    country: 'Canada',
    full: 'Barrie, Ontario',
    legalName: 'DevinStratus Technologies Inc',
    role: 'Head of Operations',
    phone: '+1 705 241 6260',
    email: 'canada@devinstratus.com',
    addr: '4 Cedar Pointe Dr, Unit C, Barrie ON L4N 5R7, Canada',
    tz: 'EST / EDT',
    tzOffset: -5,
    headcount: '8 staff',
    founded: '2023',
    isHQ: true,
  },
  {
    slug: 'hyderabad',
    flag: '🇮🇳',
    city: 'Hyderabad',
    country: 'India',
    full: 'Hyderabad, India',
    legalName: 'DevinStratus Technologies Pvt Ltd',
    role: 'Delivery Center',
    phone: '+91 81792 97878',
    email: 'india@devinstratus.com',
    addr: 'Office 1521, Regus, Asian Suncity, SY Nos 38–42, Kothaguda, Hitech City, Hyderabad, Telangana 500064',
    tz: 'IST (UTC +5:30)',
    tzOffset: 5.5,
    headcount: '22 staff',
    founded: '2026',
    isHQ: false,
  },
]

/* ─── Solution focus options for the Contact flow ──────────────────────────
 * Derived directly from data/content.js SOLUTIONS — single source of truth.
 * Edit content.js once, and both the site's nav mega-menu AND the Contact
 * wizard pick up the change. Each main category gets an "Other / not sure"
 * sub-option appended; a final "Multiple / Not sure yet" main is added.
 * ────────────────────────────────────────────────────────────────────────── */
import { SOLUTIONS } from './content'

export const CONTACT_FOCUS = [
  ...SOLUTIONS.map(s => ({
    slug: s.slug,
    label: s.heading,
    icon: s.icon,
    desc: s.desc,
    color: s.color,         // brand accent per category (teal / blue / purple / orange / green)
  })),
  {
    slug: 'multiple-or-other',
    label: 'Multiple / Not sure yet',
    icon: 'Globe',
    desc: "We'll help you scope the right starting point on the call",
    color: '#0066FF',
  },
]

export const CONTACT_SUB_FOCUS = SOLUTIONS.reduce((acc, s) => {
  acc[s.slug] = [
    ...s.items.map(it => ({
      slug: it.slug,
      label: it.t,
      desc: it.d,
      icon: it.n,                       // mega-menu icon name (Cpu / BookOpen / Layers / …)
      tag: it.tag || null,              // optional pill ("Most Popular" / "New" / "Enterprise")
      color: s.color,                   // inherit the category's accent for visual continuity
    })),
    {
      slug: `other-${s.slug}`,
      label: 'Something else / not sure yet',
      desc: "We'll help you scope on the call",
      icon: 'Globe',
      tag: null,
      color: s.color,
    },
  ]
  return acc
}, { 'multiple-or-other': [] })   // intentionally empty — Step 1b is skipped
