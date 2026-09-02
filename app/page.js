"use client"
export default function Page(){
 return(
  <div style={{minHeight:'100vh', background:'#efe9d9', paddingBottom:'80px'}}>
    
    {/* 1. HEADER - LOGO COLORS KEEP SAME */}
    <div style={{background:'#2b1d11', padding:16, display:'flex', justifyContent:'space-between', borderRadius:'0 0 20px 20px'}}>
      <div style={{color:'#ffb700', fontWeight:900}}>🛖 Ekhaya<br/><span style={{fontSize:10}}>From Kasi to Kasi</span></div>
      <div style={{color:'white'}}>🪙 R245</div>
    </div>

    {/* 2. KAGISO POST - KEEP SAME */}
    <div style={{background:'white', margin:16, borderRadius:16, overflow:'hidden'}}>
      <div style={{padding:14, display:'flex', gap:10}}>
        <div style={{width:40, height:40, borderRadius:'50%', background:'#ccc'}}></div>
        <div><b>Kagiso</b><div style={{fontSize:12, color:'#666'}}>17h • Meadowlands</div></div>
      </div>
      <div style={{padding:'0 14px 10px', fontWeight:600}}>Golden hour over the ekasi rooftops, home is beautiful</div>
      <img src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800" style={{width:'100%', height:350, objectFit:'cover'}} />
    </div>

    {/* 3. PROFILE.INFO - THIS IS THE NEW PART AT THE END */}
    <div style={{background:'white', margin:16, borderRadius:16, padding:16}}>
      <div style={{fontWeight:900, fontSize:18}}>My Profile Info 🛖</div>
      <div style={{fontSize:12, color:'#888', marginTop:4}}>From Kasi to Kasi - Create profile</div>
      <input placeholder="Your Name" style={{width:'100%', padding:12, background:'#efe9d9', borderRadius:12, marginTop:12, border:'none'}} />
      <input placeholder="Kasi - e.g. Phuthaditjhaba" style={{width:'100%', padding:12, background:'#efe9d9', borderRadius:12, marginTop:8, border:'none'}} />
      <input placeholder="What you sell / do" style={{width:'100%', padding:12, background:'#efe9d9', borderRadius:12, marginTop:8, border:'none'}} />
      <textarea placeholder="Bio - Tell kasi about you" style={{width:'100%', padding:12, background:'#efe9d9', borderRadius:12, marginTop:8, border:'none', height:70}}></textarea>
      <button style={{width:'100%', background:'#2b1d11', color:'#ffb700', padding:12, borderRadius:12, fontWeight:900, marginTop:12}}>Save Profile ✅</button>
    </div>

    {/* 4. BOTTOM NAV - KEEP SAME */}
    <div style={{position:'fixed', bottom:0, left:0, right:0, background:'#2b1d11', display:'flex', justifyContent:'space-around', padding:12, borderRadius:'20px 20px 0 0', color:'#8a7a6a'}}>
      <span style={{color:'#ffb700'}}>🛖 Ekhaya</span><span>🧺 Makethe</span><span>🎬 Shutha</span><span>⛪ Isonto</span><span>👤 Uwena</span>
    </div>

  </div>
 )
}
