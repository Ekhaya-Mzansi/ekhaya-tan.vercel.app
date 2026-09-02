"use client"
import MamKhizeBubble from './components/MamKhizeBubble'

export default function Page(){
 return(
  <div className="min-h-screen bg-[#efe9d9] pb-[90px]">
    <div className="bg-[#2b1d11] p-3 flex justify-between items-center rounded-b-[20px]">
      <div className="text-center"><div className="text-2xl">🛖</div><div className="text-[#ffb700] font-black">Ekhaya</div><div className="text-[10px] text-[#ffb700]">From Kasi <span className="[...]
      <div><div className="flex gap-2 items-center"><div className="bg-[#3d2a1a] w-9 h-9 rounded-full flex items-center justify-center">🔍</div><div className="bg-[#3d2a1a] px-3 py-1.5 rounded-fu[...]
    </div>
    
    {/* Scrollable Stories/Bubbles Section */}
    <div className="bg-white m-4 rounded-2xl shadow-sm overflow-x-auto">
      <div className="flex gap-3 p-4 min-w-max">
        {/* Mamkhize Story Bubble */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80" className="w-16 h-16 rounded-full object-cover border-4 border-[#ffb700]"/>
            <div className="absolute bottom-0 right-0 bg-[#ffb700] w-4 h-4 rounded-full border-2 border-white"></div>
          </div>
          <span className="text-xs font-semibold text-center max-w-16 truncate">Mamkhize</span>
        </div>
        
        {/* Other Stories */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" className="w-16 h-16 rounded-full object-cover border-4 border-gray-300"/>
          </div>
          <span className="text-xs font-semibold text-center max-w-16 truncate">Thandi</span>
        </div>
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80" className="w-16 h-16 rounded-full object-cover border-4 border-gray-300"/>
          </div>
          <span className="text-xs font-semibold text-center max-w-16 truncate">Sizwe</span>
        </div>
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1491528323269-c05e5b6827d7?w=80" className="w-16 h-16 rounded-full object-cover border-4 border-gray-300"/>
          </div>
          <span className="text-xs font-semibold text-center max-w-16 truncate">Zuri</span>
        </div>
      </div>
    </div>
    
    <div className="bg-white m-4 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-3.5 flex justify-between"><div className="flex gap-2.5"><img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=100" className="w-11 h-11 rounded-full obje[...]
      <div className="px-3.5 pb-3 font-semibold">Golden hour over the ekasi rooftops, home is beautiful</div>
      <img src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800" className="w-full h-[360px] object-cover"/>
      <div className="p-3 flex justify-between text-[13px] text-zinc-500 border-t"><span>👍 178</span><span>21 comments • 9 shares</span></div>
    </div>
    
    <MamKhizeBubble />
    
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
