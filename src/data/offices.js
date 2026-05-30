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

/* ──────────────────────────────────────────────────────────────────────────
   CONTACT_SUB_FOCUS
   Sub-solution options shown in Step 1b of the Contact wizard, after the
   visitor picks a main CONTACT_FOCUS. Maps the focus slug → its sub-options.
   "multiple-or-other" intentionally has no sub-options (Step 1b is skipped).
   Sent as enquiry.focusArea to the booking API, so the Solution Architect
   sees the specific area on the booking email + calendar event.
   ────────────────────────────────────────────────────────────────────────── */
export const CONTACT_SUB_FOCUS = {
  'ai-orchestration': [
    { slug: 'document-intelligence',      label: 'Document Intelligence',                  desc: 'Extract structured data from invoices, contracts, forms' },
    { slug: 'custom-ai-assistants',       label: 'Custom AI Assistants (Copilot Studio)',  desc: 'Domain-grounded assistants for HR, IT, sales, knowledge' },
    { slug: 'workflow-automation-ai',     label: 'Workflow Automation with AI',            desc: 'Power Automate + AI for end-to-end process automation' },
    { slug: 'knowledge-mining',           label: 'Intelligent Search & Knowledge Mining',  desc: 'Azure AI Search across SharePoint, Teams, file shares' },
    { slug: 'multi-system-orchestration', label: 'Multi-system Orchestration',             desc: 'AI layer that unifies ITSM, CRM, ERP, and cloud workflows' },
    { slug: 'other-ai-orchestration',     label: 'Other / not sure yet',                   desc: "We'll help you scope on the call" },
  ],
  'itsm-intelligence': [
    { slug: 'incident-triage',  label: 'Incident Triage & Routing',     desc: 'AI-driven classification, priority, and assignment' },
    { slug: 'sla-forecasting',  label: 'SLA Forecasting',               desc: 'Predict breaches before they happen, plan capacity' },
    { slug: 'agent-assistance', label: 'Agent Assistance / Copilot',    desc: 'In-flow suggestions, KB surfacing, ticket summarisation' },
    { slug: 'major-incident',   label: 'Major Incident Management',     desc: 'Faster detection, war-room workflows, post-mortems' },
    { slug: 'kb-automation',    label: 'Knowledge Base Automation',     desc: 'Auto-generate KB articles from resolved tickets' },
    { slug: 'other-itsm',       label: 'Other / not sure yet',          desc: "We'll help you scope on the call" },
  ],
  'platform-integration': [
    { slug: 'itsm-crm',             label: 'ITSM ↔ CRM Integration',         desc: 'Bidirectional sync — ServiceNow / Dynamics / Salesforce' },
    { slug: 'erp-integration',      label: 'ERP Integration',                desc: 'Connect Dynamics 365 / SAP / Oracle with surrounding systems' },
    { slug: 'legacy-modernisation', label: 'Legacy System Modernisation',    desc: 'API-fy legacy apps, gradual cloud migration patterns' },
    { slug: 'api-hub',              label: 'API Gateway / Hub',              desc: 'Azure API Management for a unified internal/external API layer' },
    { slug: 'data-sync-mdm',        label: 'Data Sync & Master Data',        desc: 'Canonical data model + sync pipelines between systems' },
    { slug: 'other-integration',    label: 'Other / not sure yet',           desc: "We'll help you scope on the call" },
  ],
  'data-analytics': [
    { slug: 'fabric-implementation', label: 'Microsoft Fabric Implementation', desc: 'OneLake, lakehouse, end-to-end Fabric platform setup' },
    { slug: 'power-bi',              label: 'Power BI Dashboards',             desc: 'Executive and operational reporting at scale' },
    { slug: 'predictive-analytics',  label: 'Predictive Analytics / ML',       desc: 'Forecasting, churn, anomaly detection on Azure ML' },
    { slug: 'data-modelling',        label: 'Canonical Data Models',           desc: 'Unified schema across operational systems' },
    { slug: 'realtime-reporting',    label: 'Real-time Operational Reporting', desc: 'Streaming pipelines, live dashboards, alerts' },
    { slug: 'other-data',            label: 'Other / not sure yet',            desc: "We'll help you scope on the call" },
  ],
  'multiple-or-other': [],  // intentionally empty — Step 1b is skipped
}
