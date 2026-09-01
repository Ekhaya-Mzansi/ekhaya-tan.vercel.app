import React, { useState, useEffect } from 'react';
const GOGOS=["Gogo Dlamini","Gogo Mokoena","MamKhize 👑","Gogo Ndlovu","Gogo Khumalo","Gogo Cele","Gogo Nkosi","Gogo Molefe","Gogo Radebe","Gogo Zwane"];
export default function App(){
const[page,setPage]=useState('home');
const[selectedGogo,setSelectedGogo]=useState(GOGOS[2]);
const[province,setProvince]=useState('Free State');
return(
<div style={{minHeight:'100vh',background:'#0f0f0f',color:'white',padding:'20px',fontFamily:'sans-serif'}}>
<header style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid gold',paddingBottom:'10px'}}>
<h1>EKHAYA 🏠 {province}</h1>
<span style={{background:'gold',color:'black',padding:'2px 8px',borderRadius:'10px',fontSize:'12px'}}>LIVE</span>
</header>
{page==='home'&&<div>
<h2 style={{marginTop:'20px'}}>QwaQwa Weather ⛅ 14°C</h2>
<p>Wipe fog, Travel by light 💡</p>
<div style={{display:'flex',gap:'5px',marginTop:'10px',overflowX:'auto'}}>
{GOGOS.map(g=><button key={g} onClick={()=>setSelectedGogo(g)} style={{background:g.includes('MamKhize')?'gold':'#333',color:g.includes('MamKhize')?'black':'white',padding:'10px',borderRadius:'15px',minWidth:'90px'}}>{g}</button>)}
</div>
<p style={{marginTop:'20px',background:'white',color:'black',padding:'15px',borderRadius:'15px'}}>{selectedGogo}: Yebo mntanami! Ekhaya is home!</p>
</div>}
{page==='market'&&<div><h2>🛍️ Market</h2><p>Shweshwe R450 - Nomsa: "Mama bought for lobola!"</p><p>Bunny Chow R85 - Best in Durban!</p></div>}
{page==='reels'&&<div><h2>🎬 Reels 22k likes</h2><button style={{background:'white',color:'black',padding:'15px 30px',borderRadius:'25px',fontWeight:'bold',marginTop:'20px'}}>👊 Smash</button></div>}
{page==='jobs'&&<div><h2>💼 Jobs</h2><p>Shoprite - R5,500 QwaQwa Mall</p><p>Spar Driver - R7,000</p></div>}
{page==='church'&&<div><h2>⛪ Church Live - {selectedGogo}</h2><p>Zion Hymn Playing 🙏 10 Gogos praying</p></div>}
<nav style={{position:'fixed',bottom:'0',left:'0',right:'0',background:'black',display:'flex',justifyContent:'space-around',padding:'10px',borderTop:'1px solid #333'}}>
<button onClick={()=>setPage('home')}>🏠</button><button onClick={()=>setPage('market')}>🛍️</button><button onClick={()=>setPage('reels')}>🎬</button><button onClick={()=>setPage('jobs')}>💼</button><button onClick={()=>setPage('church')}>⛪</button>
</nav>
</div>
)}
