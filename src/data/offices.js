/* ════════════════════════════════════════════════════════════════════════════
 *  OFFICES — single source of truth for DevinStratus global offices
 *  ────────────────────────────────────────────────────────────────────────────
 *  Used by ContactPage, CompanyPage, and anywhere offices are referenced.
 *
 *  Per-office shape:
 *    slug, flag, city, country, full
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
    city: 'Ontario',
    country: 'Canada',
    full: 'Ontario, Canada',
    role: 'Head of Operations',
    phone: '+1 778 381 5388',
    email: 'canada@devinstratus.com',
    addr: '181 Bay St, Brookfield Place, M5J 2T3',
    tz: 'EST / EDT',
    tzOffset: -5,
    headcount: '24 staff',
    founded: '2019',
    isHQ: true,
  },
  {
    slug: 'hyderabad',
    flag: '🇮🇳',
    city: 'Hyderabad',
    country: 'India',
    full: 'Hyderabad, India',
    role: 'Delivery Center',
    phone: '+91 96503 01529',
    email: 'india@devinstratus.com',
    addr: 'Hyderabad, Telangana, India',
    tz: 'IST (UTC +5:30)',
    tzOffset: 5.5,
    headcount: '48 staff',
    founded: '2019',
    isHQ: false,
  },
]

/* ─── Solution focus options for the Contact flow ──────────────────────────
 * Maps to the SOLUTIONS categories + a "Multiple/Other" fallback.
 * Used in step 1 of the contact flow + the ConsultForm modal.
 * ────────────────────────────────────────────────────────────────────────── */
export const CONTACT_FOCUS = [
  { slug:'ai-copilot',             label:'AI & Copilot Solutions',   icon:'Brain',    desc:'Enterprise copilots, AI assistants, multi-agent systems'         },
  { slug:'intelligent-automation', label:'Intelligent Automation',    icon:'Zap',      desc:'Workflow, approval, finance and HR automation'                    },
  { slug:'business-applications',  label:'Business Applications',     icon:'Layers',   desc:'Power Apps, Dynamics 365, employee self-service platforms'        },
  { slug:'data-analytics',         label:'Data & Analytics',          icon:'Chart',    desc:'Microsoft Fabric, executive dashboards, enterprise reporting'     },
  { slug:'multiple-or-other',      label:'Multiple / Not sure yet',   icon:'Globe',    desc:"We'll help you scope the right starting point on the call"        },
]
