import dynamic from 'next/dynamic'
const MamKhizeBubble = dynamic(() => import('../src/components/MamKhizeBubble.jsx'), { ssr: false })
export default function Page(){ return (<div style={{padding:20}}><h1>EKHAYA MZANSI</h1><MamKhizeBubble /></div>) }
