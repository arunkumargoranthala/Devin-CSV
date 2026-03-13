import { useEffect } from 'react'
import { C, Ic, Btn } from '../components/ui'
import { SOLUTIONS } from '../data/content'

function useReveal() {
  useEffect(() => {
    const run = () => {
      document.querySelectorAll('.rv').forEach(el => {
        const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('show'); ob.disconnect() } }, { threshold:.1 })
        ob.observe(el)
      })
    }
    const t = setTimeout(run, 60)
    return () => clearTimeout(t)
  })
}

export default function SolutionCategoryPage({ categorySlug, navigate, openConsult }) {
  useReveal()
  useEffect(() => { window.scrollTo(0,0) }, [categorySlug])

  const category = SOLUTIONS.find(s => s.slug === categorySlug)
  if (!category) return (
    <div style={{ paddingTop:120, textAlign:'center', minHeight:'60vh' }}>
      <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Category not found</h2>
      <button onClick={() => navigate('/')} style={{ marginTop:20, color:C.blue, background:'none', border:'none', cursor:'pointer' }}>← Home</button>
    </div>
  )

  return (
    <div className="page-fade">
      {/* Dark hero — matches Industries/Services style */}
      <section style={{ background:'linear-gradient(135deg,#060d24 0%,#0d1a40 50%,#140828 100%)', paddingTop:68, position:'relative', overflow:'hidden' }}>
        {/* Animated blobs */}
        <div style={{ position:'absolute', top:-100, right:-60, width:460, height:460, borderRadius:'50%', background:category.color+'18', animation:'heroFloat 9s ease-in-out infinite', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-80, left:-40, width:260, height:260, borderRadius:'50%', background:category.color+'0e', animation:'heroFloat 7s ease-in-out infinite reverse', pointerEvents:'none' }} />
        <div style={{ position:'absolute', top:'30%', left:'40%', width:180, height:180, borderRadius:'50%', background:`${C.purple}12`, animation:'heroFloat 11s ease-in-out infinite', pointerEvents:'none' }} />

        <div style={{ maxWidth:1280, margin:'0 auto', padding:'60px 24px 64px', position:'relative', zIndex:1 }}>
          {/* Breadcrumb */}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:28 }}>
            <button onClick={() => navigate('/')} style={{ background:'none', border:'none', cursor:'pointer', fontSize:13, color:'rgba(255,255,255,.5)', fontFamily:'Inter,sans-serif' }}>Home</button>
            <Ic n="ChevR" s={12} style={{ color:'rgba(255,255,255,.3)' }}/>
            <span style={{ fontSize:13, color:'rgba(255,255,255,.5)' }}>Solutions</span>
            <Ic n="ChevR" s={12} style={{ color:'rgba(255,255,255,.3)' }}/>
            <span style={{ fontSize:13, color:'rgba(255,255,255,.85)', fontWeight:600 }}>{category.heading}</span>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:48, alignItems:'center' }}>
            <div>
              {/* Badge */}
              <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:category.color+'22', border:`1px solid ${category.color}44`, borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:700, color:category.color, marginBottom:22, letterSpacing:'.05em' }}>
                <Ic n={category.icon} s={13} style={{ color:category.color }} />
                SOLUTIONS PORTFOLIO
              </div>
              <h1 style={{ fontSize:'clamp(32px,5vw,54px)', fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:18, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                {category.heading}
              </h1>
              <p style={{ fontSize:19, fontWeight:700, color:category.color, marginBottom:14, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                {category.tagline}
              </p>
              <p style={{ fontSize:16, color:'rgba(255,255,255,.7)', lineHeight:1.8, maxWidth:620, marginBottom:36 }}>
                {category.overview}
              </p>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <Btn onClick={openConsult}>Get a Free Consultation <Ic n="Arrow" s={14} style={{ color:'#fff' }}/></Btn>
                <Btn variant="ghost" onClick={() => navigate('/solutions')}>All Solutions</Btn>
              </div>
            </div>

            {/* Stat card */}
            <div style={{ background:'rgba(255,255,255,.06)', border:`1.5px solid rgba(255,255,255,.12)`, borderRadius:22, padding:'28px 32px', backdropFilter:'blur(10px)', minWidth:200, textAlign:'center' }}>
              <div style={{ fontSize:42, fontWeight:900, color:category.color, fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1 }}>{category.items.length}</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,.6)', marginTop:6 }}>Solutions in this category</div>
              <div style={{ height:1, background:'rgba(255,255,255,.1)', margin:'16px 0' }} />
              <div style={{ fontSize:11, color:'rgba(255,255,255,.4)', fontWeight:700, letterSpacing:'.1em' }}>MICROSOFT DYNAMICS 365</div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions grid */}
      <section style={{ padding:'72px 24px', background:'#fff' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div className="rv" style={{ marginBottom:44 }}>
            <div style={{ width:4, height:36, borderRadius:4, background:`linear-gradient(180deg,${category.color},${category.color}44)`, marginBottom:12 }} />
            <h2 style={{ fontSize:32, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>
              {category.items.length} solutions in {category.heading}
            </h2>
            <p style={{ color:C.textM, fontSize:15 }}>Click any solution to see full features, implementation details and case studies.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:22 }}>
            {category.items.map((it,i) => (
              <button key={it.slug} className="rv"
                onClick={() => navigate(`/solution/${category.slug}/${it.slug}`)}
                style={{ display:'flex', flexDirection:'column', padding:0, borderRadius:22, border:`1.5px solid ${C.border}`, background:'#fff', cursor:'pointer', textAlign:'left', transition:'all .28s', overflow:'hidden', animationDelay:`${i*60}ms` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=category.color+'55'; e.currentTarget.style.boxShadow=`0 16px 48px ${category.color}14`; e.currentTarget.style.transform='translateY(-5px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
                {/* Card top — colored */}
                <div style={{ padding:'24px 24px 20px', background:`linear-gradient(135deg,${category.color}12,${category.color}06)`, borderBottom:`1px solid ${category.color}18`, position:'relative' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${category.color},${category.color}55)` }} />
                  <div style={{ display:'flex', alignItems:'flex-start', gap:14, marginBottom:14 }}>
                    <div style={{ width:48, height:48, borderRadius:14, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 4px 16px ${category.color}20`, flexShrink:0 }}>
                      <Ic n={it.n} s={22} style={{ color:category.color }}/>
                    </div>
                    <div>
                      <div style={{ fontSize:17, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:4 }}>{it.t}</div>
                      {it.tag && <span style={{ fontSize:9.5, fontWeight:700, padding:'3px 9px', borderRadius:50, background:C.orange, color:'#fff' }}>{it.tag}</span>}
                    </div>
                  </div>
                  <p style={{ fontSize:13.5, color:C.textM, lineHeight:1.6 }}>{it.d}</p>
                </div>
                {/* Card bottom */}
                <div style={{ padding:'16px 24px', display:'flex', justifyContent:'space-between', alignItems:'center', flex:1 }}>
                  <div style={{ display:'flex', gap:20 }}>
                    {it.benefits?.slice(0,2).map((b,i) => (
                      <div key={i}>
                        <div style={{ fontSize:17, fontWeight:800, color:category.color, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{b.v}{b.u}</div>
                        <div style={{ fontSize:10.5, color:C.textL }}>{b.l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, fontWeight:700, color:category.color }}>
                    Explore <Ic n="Arrow" s={13} style={{ color:category.color }}/>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Other categories */}
      <section style={{ padding:'56px 24px', background:C.bgSoft }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <h3 style={{ fontSize:24, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:20 }}>Explore other solution areas</h3>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            {SOLUTIONS.filter(s => s.slug !== categorySlug).map(s => (
              <button key={s.slug}
                onClick={() => navigate(`/solutions/${s.slug}`)}
                style={{ display:'flex', alignItems:'center', gap:10, padding:'11px 20px', borderRadius:50, border:`1.5px solid ${C.border}`, background:'#fff', cursor:'pointer', transition:'all .18s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=s.color; e.currentTarget.style.background=s.bg; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background='#fff'; e.currentTarget.style.transform='none' }}>
                <Ic n={s.icon} s={15} style={{ color:s.color }}/>
                <span style={{ fontSize:13.5, fontWeight:600, color:C.text }}>{s.heading}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
