"use client"
import dynamic from 'next/dynamic'

const MamKhizeBubble = dynamic(
  () => import('../src/components/MamKhizeBubble.jsx'),
  { ssr: false }
)

export default function Page() {
  return (
    <div style={{minHeight:'100vh', background:'#efe9d9', color:'#222', padding:20, fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
        <div>
          <h1 style={{margin:0, fontSize:28, color:'#5D4037'}}>EKHAYA</h1>
          <div style={{fontSize:12, color:'#5D4037', opacity:0.9}}>R245 • EN/ZU • 24°C Dusty Clear</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontSize:14, color:'#5D4037'}}>Kagiso</div>
        </div>
      </header>

      <main style={{maxWidth:720, margin:'0 auto 80px'}}>
        <section style={{background:'white', padding:16, borderRadius:12, boxShadow:'0 6px 12px rgba(0,0,0,0.06)'}}>
          <div style={{display:'flex', gap:12, alignItems:'center', marginBottom:8}}>
            <div style={{width:56,height:56,borderRadius:12,background:'#5D4037',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700}}>K</div>
            <div>
              <div style={{fontWeight:700, color:'#5D4037'}}>Kagiso</div>
              <div style={{fontSize:12, color:'#666'}}>2 hrs • Soweto</div>
            </div>
          </div>

          <p style={{margin:'8px 0 12px', color:'#333'}}>What a beautiful dusty morning — sharing freshly baked bread and songs with the neighbours. Life is good. 🌞</p>

          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', color:'#5D4037', fontWeight:700}}>
            <div>178 likes</div>
            <div style={{fontSize:12,color:'#666'}}>Share • Comment</div>
          </div>
        </section>
      </main>

      <nav style={{position:'fixed', left:0, right:0, bottom:0, display:'flex', justifyContent:'space-around', padding:12, background:'#fff', borderTop:'1px solid rgba(0,0,0,0.06)'}}>
        <div style={{textAlign:'center', color:'#5D4037'}}>
          <div style={{fontWeight:700}}>Ekhaya</div>
        </div>
        <div style={{textAlign:'center', color:'#5D4037'}}>
          <div style={{fontWeight:700}}>Makethe</div>
        </div>
        <div style={{textAlign:'center', color:'#5D4037'}}>
          <div style={{fontWeight:700}}>Shutha</div>
        </div>
        <div style={{textAlign:'center', color:'#5D4037'}}>
          <div style={{fontWeight:700}}>Ison to</div>
        </div>
        <div style={{textAlign:'center', color:'#5D4037'}}>
          <div style={{fontWeight:700}}>Wena</div>
        </div>
      </nav>

      <MamKhizeBubble />
    </div>
  )
}
