import React, { useState } from 'react'
export default function App() {
  const [page, setPage] = useState('home')
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="min-h-screen bg-[#fcf9f7]">
      <nav className="flex justify-between items-center p-4 bg-white shadow-sm sticky top-0 z-50">
        <b className="text-xl text-[#8B5A2B] cursor-pointer" onClick={()=>setPage('home')}>Ekhaya</b>
        <div className="flex gap-2">
          <button onClick={()=>setPage('home')} className="px-3 py-1 bg-[#8B5A2B] text-white rounded-full text-sm">Home</button>
          <button onClick={()=>setPage('rooms')} className="px-3 py-1 border rounded-full text-sm">Rooms</button>
          <button onClick={()=>setShowModal(true)} className="px-3 py-1 border rounded-full text-sm">Book</button>
        </div>
      </nav>

      {page==='home' && (
        <div className="p-6">
          <div className="max-w-4xl mx-auto text-center py-12">
            <h1 className="text-4xl font-bold mb-4">Where Heritage<br/>Meets <span className="text-[#8B5A2B]">Hospitality</span></h1>
            <p className="text-gray-600 mb-6">Experience authentic South African luxury in QwaQwa. Your home away from home.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={()=>setPage('rooms')} className="px-6 py-3 bg-[#8B5A2B] text-white rounded-full font-semibold">Explore Rooms</button>
              <button onClick={()=>setShowModal(true)} className="px-6 py-3 border-2 rounded-full font-semibold">Book Now</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="bg-white p-4 rounded-2xl shadow"><p className="text-2xl font-bold text-[#8B5A2B]">12</p><p className="text-xs">Luxury Rooms</p></div>
              <div className="bg-white p-4 rounded-2xl shadow"><p className="text-2xl font-bold text-[#8B5A2B]">4.9</p><p className="text-xs">Guest Rating</p></div>
              <div className="bg-white p-4 rounded-2xl shadow"><p className="text-2xl font-bold text-[#8B5A2B]">100%</p><p className="text-xs">Authentic</p></div>
              <div className="bg-white p-4 rounded-2xl shadow"><p className="text-2xl font-bold text-[#8B5A2B]">24/7</p><p className="text-xs">Support</p></div>
            </div>
          </div>
        </div>
      )}

      {page==='rooms' && (
        <div className="p-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Rooms</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {name:'Deluxe Heritage',price:'R1,450',img:'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'},
              {name:'Executive Suite',price:'R2,200',img:'https://images.unsplash.com/photo-1566669437688-88b6c84f43a9?w=400'},
              {name:'Family Lodge',price:'R3,100',img:'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400'},
            ].map(r=>(
              <div key={r.name} className="bg-white rounded-3xl overflow-hidden shadow-lg">
                <img src={r.img} className="h-48 w-full object-cover"/>
                <div className="p-4"><h3 className="font-bold">{r.name}</h3><p className="text-[#8B5A2B] font-bold">{r.price} / night</p><button onClick={()=>setShowModal(true)} className="mt-3 w-full bg-[#8B5A2B] text-white py-2 rounded-full">Book Now</button></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[99] p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Book Your Stay - Ekhaya</h3>
            <input placeholder="Full Name" className="w-full border p-3 rounded-xl mb-3"/>
            <input placeholder="WhatsApp Number" className="w-full border p-3 rounded-xl mb-3"/>
            <input type="date" className="w-full border p-3 rounded-xl mb-3"/>
            <div className="flex gap-2">
              <button onClick={()=>setShowModal(false)} className="flex-1 border py-3 rounded-full">Cancel</button>
              <button onClick={()=>{alert('Booking request sent! We will WhatsApp you shortly!');setShowModal(false)}} className="flex-1 bg-[#25D366] text-white py-3 rounded-full font-bold">WhatsApp Us</button>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center py-8 text-sm text-gray-500">© 2026 Ekhaya Tan - QwaQwa, Free State. Made with ❤️ in Phuthaditjhaba</footer>
    </div>
  )
}
