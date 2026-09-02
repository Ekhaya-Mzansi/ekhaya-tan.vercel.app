"use client"
import dynamic from 'next/dynamic'

const MamKhizeBubble = dynamic(
  () => import('../src/components/MamKhizeBubble.jsx'),
  { ssr: false }
)

export default function Page() {
  return (
    <div style={{minHeight:'100vh', background:'#111', color:'white', padding:20}}>
      <h1>EKHAYA MZANSI - LIVE</h1>
      <p>Gogo Bubble loading...</p>
      <MamKhizeBubble />
    </div>
  )
}
