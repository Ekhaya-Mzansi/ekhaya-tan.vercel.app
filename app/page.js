"use client"
export default function Page(){
 return(
  <div style={{minHeight:'100vh', background:'#efe9d9', paddingBottom:'80px'}}>
    <div style={{background:'#2b1d11', padding:16, display:'flex', justifyContent:'space-between', borderRadius:'0 0 20px 20px'}}>
      <div style={{color:'#ffb700', fontWeight:900}}>🛖 Ekhaya<br/><span style={{fontSize:10}}>From Kasi to Kasi</span></div>
      <div style={{color:'white'}}>🪙 R245</div>
    </div>
    <div style={{background:'white', margin:16, borderRadius:16, overflow:'hidden'}}>
      <div style={{padding:14, display:'flex', gap:10}}>
        <div style={{width:40, height:40, borderRadius:'50%', background:'#ccc'}}></div>
        <div><b>Kagiso</b><div style={{fontSize:12, color:'#666'}}>17h • Meadowlands</div></div>
      </div>
      <div style={{padding:'0 14px 10px', fontWeight:600}}>Golden hour over the ekasi rooftops, home is beautiful</div>
      <img src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800" style={{width:'100%', height:350, objectFit:'cover'}} />
    </div>
    <div style={{position:'fixed', bottom:0, left:0, right:0, background:'#2b1d11', display:'flex', justifyContent:'space-around', padding:12, borderRadius:'20px 20px 0 0', color:'#8a7a6a'}}>
      <span style={{color:'#ffb700'}}>🛖 Ekhaya</span><span>🧺 Makethe</span><span>🎬 Shutha</span><span>⛪ Isonto</span><span>👤 Wena</span>
    </div>
  </div>
 )
}
