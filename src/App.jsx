import React, { useState, useEffect, useRef } from 'react'

const PROVINCES = [
  { id:'fs', name:'Free State', lang:'Sesotho', voice:'Gogo MmaTsepo', color:'#8B5A2B', greeting:'Dumela ngwanaka!' },
  { id:'kzn', name:'Durban', lang:'IsiZulu', voice:'Gogo Nomsa', color:'#0E7A6A', greeting:'Sawubona mntanami!' },
  { id:'gp', name:'Gauteng', lang:'SePitori', voice:'Gogo Lerato', color:'#1A1A1A', greeting:'Heita mntanami!' },
]

const GOGOS = [
  { id:1, name:'Nomsa', role:'Market Queen', emoji:'🛍️', color:'#FF6B9D' },
  { id:2, name:'Fikile', role:'Jobs Connector', emoji:'💼', color:'#4A90E2' },
  { id:3, name:'Lerato', role:'CV Builder', emoji:'📝', color:'#50C878' },
  { id:4, name:'Gogo MmaTsepo', role:'Church Mother', emoji:'🙏', color:'#8B5A2B' },
  { id:5, name:'Precious', role:'Tutor Connector', emoji:'📚', color:'#9B59B6' },
  { id:6, name:'Gugu', role:'Drivers', emoji:'🚗', color:'#F39C12' },
  { id:7, name:'Zanele', role:'Motivator', emoji:'✨', color:'#E74C3C' },
  { id:8, name:'Miriam', role:'Hymn Lead', emoji:'🎤', color:'#1ABC9C' },
  { id:9, name:'Busi', role:'Podcast Host', emoji:'🎙️', color:'#34495E' },
  { id:10, name:'MamKhize', role:'The Boss', emoji:'👑', color:'#FFD700' },
]

const MARKET_ITEMS = [
  { id:1, cat:'Clothing', name:'Shweshwe Dress Pro', price:'R450', img:'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300', gossip:'Nomsa: "Yhooo this one is fire, last 3 left!"' },
  { id:2, cat:'Clothing', name:'Kasi Street Tee', price:'R180', img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300', gossip:'Nomsa: "Cheap but clean, trust me"' },
  { id:3, cat:'Home Deco', name:'Basotho Blanket Chair', price:'R1200', img:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300', gossip:'Nomsa: "Your gogo will approve"' },
  { id:4, cat:'FOOD', name:'Mogodu Monday Special', price:'R95', img:'https://images.unsplash.com/photo-1547592180-85f173990554?w=300', gossip:'Nomsa: "Eat like a king"' },
  { id:5, cat:'FOOD', name:'Bunny Chow Durban', price:'R110', img:'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300', gossip:'Nomsa: "Extra chilli if you disrespect"' },
]

const REELS = [
  { id:1, user:'@thando_styles', likes:'12.4k', title:'Fashion Week Prep 🔥', video:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=700' },
  { id:2, user:'@kasi_king', likes:'8.9k', title:'QwaQwa drip check', video:'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=700' },
  { id:3, user:'@gogo_nomsa', likes:'22k', title:'How to price your hustle', video:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=700' },
]

const JOBS_MOCK = [
  { id:1, title:'Retail Assistant - Shoprite QwaQwa', site:'PNet', salary:'R5.5k', type:'Full-time' },
  { id:2, title:'Driver Code 10 - Phuthaditjhaba', site:'Indeed', salary:'R8k', type:'Contract' },
  { id:3, title:'Tutor - Maths & Science', site:'LinkedIn', salary:'R150/hr', type:'Part-time' },
  { id:4, title:'Waitress - Ekhaya Lodge', site:'Careers24', salary:'R4.5k + Tips', type:'Full-time' },
]

export default function App(){
  const [tab,setTab] = useState('home')
  const [province,setProvince] = useState(PROVINCES[0])
  const [showProvince,setShowProvince] = useState(false)
  const [showWeatherWipe,setShowWeatherWipe] = useState(true)
  const [fallAnim,setFallAnim] = useState(false)
  const [notifCount,setNotifCount] = useState(3)
  const [marketCat,setMarketCat] = useState('All')
  const [showGogoWheel,setShowGogoWheel] = useState(false)
  const [mamListening,setMamListening] = useState(false)
  const [mamText,setMamText] = useState('')
  const [bubblePos,setBubblePos] = useState({x: 280, y: 500})
  const [dragging,setDragging] = useState(false)
  const [cvText,setCvText] = useState('')
  const [showPodcast,setShowPodcast] = useState(false)

  useEffect(()=>{ const t=setTimeout(()=>setShowWeatherWipe(false),2200); return ()=>clearTimeout(t)},[])
  useEffect(()=>{ if(showProvince){ setFallAnim(true); setTimeout(()=>setFallAnim(false),1800)}},[province])

  const handleBubbleMove = (e) => {
    if(!dragging) return
    const cx = e.touches? e.touches[0].clientX : e.clientX
    const cy = e.touches? e.touches[0].clientY : e.clientY
    setBubblePos({x: cx-25, y: cy-25})
  }

  const triggerVoice = () => {
    setMamListening(true)
    setMamText('Yebo mntanami? 👑')
    setTimeout(()=>{
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition
      if(SR){
        const rec = new SR(); rec.lang='en-ZA'
        rec.onresult = (ev)=>{
          const cmd = ev.results[0][0].transcript.toLowerCase()
          setMamText(You said: "${cmd}")
          if(cmd.includes('clothes')||cmd.includes('cheap')){ setTab('market'); setMarketCat('Clothing'); setMamText('Taking you to cheap clothes! 🛍️') }
          else if(cmd.includes('job')){ setTab('jobs'); setMamText('Opening jobs! 💼') }
          else if(cmd.includes('church')||cmd.includes('pray')){ setTab('church'); setMamText('Going to church 🙏') }
          else if(cmd.includes('reels')){ setTab('reels'); setMamText('Reels time! 🔥') }
          else { setMamText('Try: take me to cheap clothes') }
          setTimeout(()=>setMamListening(false),2000)
        }
        rec.onerror = ()=>{ setMamText('Click: take me to cheap clothes') }
        rec.start()
      } else { setMamText('Say: take me to cheap clothes (buttons below)') }
    },500)
  }

  return (
    <div className="min-h-screen bg-[#fcf9f7] font-[Poppins] relative" onMouseMove={handleBubbleMove} onTouchMove={handleBubbleMove}>
      {showWeatherWipe && (
        <div className="fixed inset-0 z-[100] bg-gradient-to-br from-[#8B5A2B] to-[#D4A574] flex items-center justify-center animate-[wipe_2s_ease-in-out_forwards]">
          <div className="text-white text-center"><div className="text-6xl mb-4 animate-bounce">⛅</div><h2 className="text-2xl font-bold">QwaQwa 18°C • Light Breeze</h2><p className="opacity-80">Ekhaya warming up...</p></div>
          <style>{@keyframes wipe{0%{clip-path:circle(150% at 50% 50%)}100%{clip-path:circle(0% at 50% 50%)}}}</style>
        </div>
      )}
      {fallAnim && (
        <div className="fixed inset-0 pointer-events-none z-[60]">
          {[...Array(20)].map((_,i)=><div key={i} className="absolute animate-[fall_1.8s_linear]" style={{left:${i*5}%, top:'-10px', animationDelay:${i*0.08}s}}>🍂</div>)}
          <style>{@keyframes fall{to{transform:translateY(110vh) rotate(720deg)}}}</style>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#8B5A2B] flex items-center justify-center text-white font-bold">E</div>
          <span className="font-bold text-[#8B5A2B]">Ekhaya</span>
          <span className="text-[10px] bg-[#8B5A2B]/10 text-[#8B5A2B] px-2 py-0.5 rounded-full">{province.name} • {province.lang}</span>
        </div>
        <button className="relative" onClick={()=>setNotifCount(0)}><span className="text-xl">🔔</span>{notifCount>0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{notifCount}</span>}</button>
      </header>

      {tab==='home' && (
        <div className="pb-24">
          <div className="p-4">
            <button onClick={()=>setShowProvince(!showProvince)} className="w-full relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#1A1A1A] to-[#8B5A2B] p-[1px]">
              <div className="bg-gradient-to-br from-[#1A1A1A] to-[#3a2512] rounded-[23px] p-4 flex justify-between items-center">
                <div className="text-left"><p className="text-white/60 text-xs">Tap the light to travel</p><p className="text-white font-bold text-lg">{province.greeting} - {province.voice}</p><p className="text-white/70 text-xs">{province.name} Mode</p></div>
                <div className="w-14 h-14 rounded-full bg-[#FFD700] shadow-[0_0_30px_#FFD700] animate-pulse flex items-center justify-center text-2xl">💡</div>
              </div>
            </button>
            {showProvince && (
              <div className="grid grid-cols-3 gap-2 mt-3">
                {PROVINCES.map(p=><button key={p.id} onClick={()=>{setProvince(p); setShowProvince(false)}} className={p-3 rounded-2xl border-2 text-left ${province.id===p.id?'border-[#8B5A2B] bg-[#8B5A2B]/10':'border-gray-100 bg-white'}}><p className="font-bold text-sm">{p.name}</p><p className="text-[10px] opacity-70">{p.lang}</p><p className="text-[10px] mt-1">{p.voice}</p></button>)}
              </div>
            )}
          </div>
          <div className="px-4">
            <h3 className="font-bold mb-3">Featured • {province.name}</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[
                {name:'Thando', age:22, img:'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300', video:true},
                {name:'Lerato', age:24, img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300', video:false},
                {name:'Nomsa', age:26, img:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300', video:true},
              ].map(g=><div key={g.name} className="min-w-[160px] bg-white rounded-[20px] overflow-hidden shadow-sm border"><div className="relative"><img src={g.img} className="h-[180px] w-full object-cover"/><span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full">{g.video?'🎥 LIVE':''} {g.name}</span></div><div className="p-2 flex justify-between items-center"><span className="text-xs font-semibold">{province.voice} approved</span><span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full">Online</span></div></div>)}
            </div>
            <div className="mt-5">
              <h3 className="font-bold mb-2">Kasi YouTube • Auto-scroll</h3>
              <div className="flex gap-3 overflow-x-auto">
                {['dQw4w9WgXcQ','jNQXAC9IVRw','9bZkp7q19f0'].map((id,i)=><div key={id} className="min-w-[300px] bg-black rounded-2xl overflow-hidden"><img src={https://img.youtube.com/vi/${id}/mqdefault.jpg} className="w-full h-[170px] object-cover"/><div className="p-2 bg-white"><p className="text-xs font-bold">Ekhaya Vlog #{i+1} - {province.name}</p><p className="text-[10px] text-gray-500">12k views • Auto-play</p></div></div>)}
              </div>
            </div>
          </div>
        </div>
      )}

      {tab==='market' && (
        <div className="pb-24 p-4">
          <div className="bg-[#FFF0F5] border border-[#FF6B9D]/20 rounded-2xl p-3 flex gap-3 items-center">
            <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100" className="w-12 h-12 rounded-full object-cover"/>
            <div><p className="font-bold text-sm">Nomsa's Gossip Specials 🛍️</p><p className="text-xs text-gray-600">"Mntanami, these prices too cheap! If you disrespect, I rost you!"</p></div>
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {['All','Clothing','Home Deco','FOOD'].map(c=><button key={c} onClick={()=>setMarketCat(c)} className={px-4 py-2 rounded-full text-sm whitespace-nowrap ${marketCat===c?'bg-[#8B5A2B] text-white':'bg-white border'}}>{c}</button>)}
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {MARKET_ITEMS.filter(i=>marketCat==='All'||i.cat===marketCat).map(item=><div key={item.id} className="bg-white rounded-[20px] overflow-hidden shadow-sm border"><img src={item.img} className="h-32 w-full object-cover"/><div className="p-3"><p className="font-bold text-sm">{item.name}</p><p className="text-xs text-gray-500">{item.cat}</p><p className="text-[#8B5A2B] font-bold">{item.price}</p><p className="text-[10px] mt-1 bg-yellow-50 p-1 rounded">{item.gossip}</p></div></div>)}
          </div>
        </div>
      )}

      {tab==='reels' && (
        <div className="pb-24 h-[calc(100vh-120px)] bg-black relative overflow-hidden">
          <div className="h-full snap-y snap-mandatory overflow-y-scroll">
            {REELS.map(reel=><div key={reel.id} className="h-full snap-start relative"><img src={reel.video} className="w-full h-full object-cover"/><div className="absolute bottom-20 left-3 right-16 text-white"><p className="font-bold">{reel.user}</p><p className="text-sm">{reel.title}</p><p className="text-xs opacity-70">❤️ {reel.likes} • Fashion Week</p></div><div className="absolute right-3 bottom-24 flex flex-col gap-4"><button className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">❤️</button><button className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center font-black text-[10px]">SMASH<br/>👊</button><button className="w-12 h-12 bg-white rounded-full flex items-center justify-center">👤+</button></div></div>)}
          </div>
          <button className="absolute top-3 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full text-xs font-bold">📤 Upload (mock Cloudinary)</button>
        </div>
      )}

      {tab==='jobs' && (
        <div className="pb-24 p-4">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex gap-2"><div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">F</div><div><p className="font-bold text-sm">Fikile pulled 10 sites → 1 list 💼</p><p className="text-xs">PNet, Indeed, LinkedIn, Careers24, etc</p></div></div>
          <div className="mt-4 space-y-2">
            {JOBS_MOCK.map(j=><div key={j.id} className="bg-white p-3 rounded-2xl border flex justify-between items-center"><div><p className="font-bold text-sm">{j.title}</p><p className="text-[10px] text-gray-500">{j.site} • {j.type} • {j.salary}</p></div><button className="bg-[#8B5A2B] text-white px-4 py-2 rounded-full text-xs">Apply</button></div>)}
          </div>
          <div className="mt-6 bg-white rounded-[20px] p-4 border">
            <h4 className="font-bold">Lerato CV Builder by Talking 🎙️</h4>
            <p className="text-xs text-gray-500">Talk, template, PDF - auto apply</p>
            <textarea value={cvText} onChange={e=>setCvText(e.target.value)} placeholder="Tap mic and talk... 'Shoprite 2 years, matric...'" className="w-full border rounded-xl p-3 mt-3 text-sm h-24"></textarea>
            <div className="flex gap-2 mt-2"><button className="flex-1 bg-gray-900 text-white py-2 rounded-full text-sm">🎤 Voice (mock)</button><button className="flex-1 bg-[#8B5A2B] text-white py-2 rounded-full text-sm">📄 Download PDF</button></div>
          </div>
        </div>
      )}

      {tab==='church' && (
        <div className="pb-24 p-4">
          <div className="bg-gradient-to-br from-[#8B5A2B] to-[#3a2512] rounded-[24px] p-4 text-white">
            <p className="text-xs opacity-70">SUNDAY LIVE • Mock Live 🔴</p><h3 className="font-bold text-lg">Pastor Mthembu & 10 Gogos</h3>
            <div className="flex gap-1 mt-2">{GOGOS.slice(0,10).map(g=><div key={g.id} className="w-7 h-7 rounded-full flex items-center justify-center text-[10px]" style={{background:g.color}}>{g.emoji}</div>)}</div>
            <div className="mt-3 flex gap-2"><button className="bg-white text-black px-3 py-1 rounded-full text-xs">🙏 Pray Now</button><button className="bg-white/20 px-3 py-1 rounded-full text-xs">🎵 Hymn 342</button></div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white p-3 rounded-2xl border"><p className="font-bold text-sm">🎙️ Podcast: 3 Gogos</p><p className="text-[10px] text-gray-500">Business Kasi Stories</p><button onClick={()=>setShowPodcast(!showPodcast)} className="mt-2 text-xs bg-black text-white px-3 py-1 rounded-full">Play Latest</button></div>
            <div className="bg-white p-3 rounded-2xl border"><p className="font-bold text-sm">📚 Precious - Tutoring</p><p className="text-[10px]">Connects tutors in {province.name}</p><button className="mt-2 text-xs border px-3 py-1 rounded-full">Find Tutor</button></div>
            <div className="bg-white p-3 rounded-2xl border"><p className="font-bold text-sm">🚗 Gugu - Drivers</p><p className="text-[10px]">Verified drivers notify</p><div className="mt-2 text-[10px] bg-green-50 p-1 rounded">✅ 3 near Phuthaditjhaba</div></div>
            <div className="bg-white p-3 rounded-2xl border bg-gradient-to-br from-yellow-50 to-orange-50"><p className="font-bold text-sm">✨ Zanele Daily</p><p className="text-xs italic mt-1">"Vuka mntanami! Ancestors with you!"</p></div>
          </div>
          {showPodcast && <div className="mt-4 bg-black text-white p-3 rounded-2xl text-xs">🎧 Playing: Gogo Busi, Miriam & Zanele - "Survived 2020 with R200" [32:14]</div>}
        </div>
      )}

      <div className="fixed z-[80] w-[56px] h-[56px] rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] shadow-[0_8px_30px_rgba(255,215,0,0.6)] flex items-center justify-center text-2xl cursor-grab select-none" style={{left:bubblePos.x, top:bubblePos.y, touchAction:'none'}} onMouseDown={()=>setDragging(true)} onMouseUp={()=>setDragging(false)} onTouchStart={()=>setDragging(true)} onTouchEnd={()=>setDragging(false)} onClick={()=>{ if(!dragging) setShowGogoWheel(!showGogoWheel)}} onDoubleClick={triggerVoice}>👑<div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div></div>

      {mamListening && (
        <div className="fixed z-[85] bottom-[100px] left-4 right-4 bg-[#1A1A1A] text-white rounded-[20px] p-4 shadow-2xl">
          <p className="font-bold">MamKhize Listening... 👑🎤</p><p className="text-sm mt-1">{mamText}</p>
          <div className="mt-3 flex gap-2"><button onClick={()=>{setTab('market'); setMarketCat('Clothing'); setMamListening(false)}} className="text-[10px] bg-white text-black px-3 py-1 rounded-full">Take me to cheap clothes</button><button onClick={()=>{setTab('jobs'); setMamListening(false)}} className="text-[10px] bg-white/20 px-3 py-1 rounded-full">Jobs</button><button onClick={()=>setMamListening(false)} className="text-[10px] bg-white/20 px-3 py-1 rounded-full">Close</button></div>
          <p className="text-[10px] opacity-60 mt-2">Wake word: "MamKhize" → Yebo mntanami?</p>
        </div>
      )}

      {showGogoWheel && (
        <div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=>setShowGogoWheel(false)}>
          <div className="bg-white rounded-[32px] p-5 w-full max-w-sm" onClick={e=>e.stopPropagation()}>
            <h3 className="font-bold text-center">Choose Your Gogo 👑</h3>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {GOGOS.map(g=><button key={g.id} onClick={()=>{setShowGogoWheel(false); if(g.role.includes('Market')) setTab('market'); else if(g.role.includes('Jobs')||g.role.includes('CV')) setTab('jobs'); else if(g.role.includes('Church')||g.role.includes('Motiv')||g.role.includes('Tutor')||g.role.includes('Driver')||g.role.includes('Hymn')||g.role.includes('Podcast')) setTab('church'); else triggerVoice()}} className="flex flex-col items-center gap-1 p-2 rounded-2xl bg-gray-50 border"><div className="w-12 h-12 rounded-full flex items-center justify-center text-xl" style={{background:g.color+'30'}}>{g.emoji}</div><p className="text-[10px] font-bold">{g.name}</p><p className="text-[8px] text-gray-500">{g.role}</p></button>)}
            </div>
            <button onClick={triggerVoice} className="w-full mt-4 bg-[#FFD700] text-black py-3 rounded-full font-bold text-sm">🎤 Say "MamKhize" - Voice Command</button>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t flex justify-around items-center py-2">
        {[
          {id:'home', icon:'🏠', label:'Home'},
          {id:'market', icon:'🛍️', label:'Market'},
          {id:'jobs', icon:'💼', label:'Jobs'},
          {id:'reels', icon:'🎬', label:'Reels'},
          {id:'church', icon:'⛪', label:'Church'},
        ].map(t=><button key={t.id} onClick={()=>setTab(t.id)} className={flex flex-col items-center px-4 py-1 rounded-2xl ${tab===t.id?'text-[#8B5A2B] bg-[#8B5A2B]/10':'text-gray-400'}}><span className="text-xl">{t.icon}</span><span className="text-[10px] font-semibold">{t.label}</span>{tab===t.id && <div className="w-1 h-1 bg-[#8B5A2B] rounded-full mt-0.5"></div>}</button>)}
      </nav>
    </div>
  )
}
