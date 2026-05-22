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
 * AI-orchestration focus areas matching the company's real positioning.
 * Used in step 1 of the contact flow + the ConsultForm modal.
 * ────────────────────────────────────────────────────────────────────────── */
export const CONTACT_FOCUS = [
  { slug:'ai-orchestration',     label:'AI Orchestration',          icon:'Brain',    desc:'Intelligent orchestration layers that unify enterprise systems'   },
  { slug:'itsm-intelligence',    label:'ITSM Intelligence',         icon:'Zap',      desc:'AI-driven incident triage, SLA forecasting, agent assistance'     },
  { slug:'platform-integration', label:'Platform Integration',      icon:'Layers',   desc:'Cross-platform frameworks across ITSM, CRM, ERP, and cloud'        },
  { slug:'data-analytics',       label:'Data & Analytics',          icon:'Chart',    desc:'Microsoft Fabric, canonical data models, predictive intelligence' },
  { slug:'multiple-or-other',    label:'Multiple / Not sure yet',   icon:'Globe',    desc:"We'll help you scope the right starting point on the call"        },
]
