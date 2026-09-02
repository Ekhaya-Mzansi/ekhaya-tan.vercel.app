"use client"
export default function Page(){
 return(
  <div className="min-h-screen bg-[#efe9d9] pb-[90px]">
    <div className="bg-[#2b1d11] p-3 flex justify-between items-center rounded-b-[20px]">
      <div className="text-center"><div className="text-2xl">🛖</div><div className="text-[#ffb700] font-black">Ekhaya</div><div className="text-[10px] text-[#ffb700]">From Kasi <span className="text-white">to Kasi</span></div></div>
      <div><div className="flex gap-2 items-center"><div className="bg-[#3d2a1a] w-9 h-9 rounded-full flex items-center justify-center">🔍</div><div className="bg-[#3d2a1a] px-3 py-1.5 rounded-full text-white text-sm border border-zinc-600">🪙 R245</div><div className="bg-[#3d2a1a] rounded-full flex overflow-hidden text-xs"><span className="px-2.5 py-1.5 text-zinc-400">EN</span><span className="px-2.5 py-1.5 bg-[#ffb700] text-black font-bold">ZU</span></div></div><div className="text-right text-zinc-400 text-[11px] mt-1">24°C • Dusty • Clear</div></div>
    </div>
    <div className="bg-white m-4 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-3.5 flex justify-between"><div className="flex gap-2.5"><img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=100" className="w-11 h-11 rounded-full object-cover"/><div><div className="font-extrabold">Kagiso</div><div className="text-xs text-zinc-500">17h • Meadowlands 🌐</div></div></div><div>•••</div></div>
      <div className="px-3.5 pb-3 font-semibold">Golden hour over the ekasi rooftops, home is beautiful</div>
      <img src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800" className="w-full h-[360px] object-cover"/>
      <div className="p-3 flex justify-between text-[13px] text-zinc-500 border-t"><span>👍 178</span><span>21 comments • 9 shares</span></div>
    </div>
    <div className="fixed bottom-0 left-0 right-0 bg-[#2b1d11] flex justify-around py-2.5 rounded-t-[20px]">
      <div className="text-center text-[#ffb700]"><div>🛖</div><div className="text-xs">Ekhaya</div><div className="text-[10px]">Home</div></div>
      <div className="text-center text-zinc-500"><div>🧺</div><div className="text-xs">Makethe</div><div className="text-[10px]">Market</div></div>
      <div className="text-center text-zinc-500"><div>🎬</div><div className="text-xs">Shutha</div><div className="text-[10px]">Reels</div></div>
      <div className="text-center text-zinc-500"><div>⛪</div><div className="text-xs">Isonto</div><div className="text-[10px]">Church</div></div>
      <div className="text-center text-zinc-500"><div>👤</div><div className="text-xs">Wena</div><div className="text-[10px]">Profile</div></div>
    </div>
  </div>
 )
}
