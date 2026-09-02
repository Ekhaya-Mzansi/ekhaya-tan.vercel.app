'use client'
import { useState, useEffect, useRef } from 'react'

export default function MamKhizeBubble() {
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [credits, setCredits] = useState(60)
  const [glowing, setGlowing] = useState(false)
  const [listening, setListening] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const recognitionRef = useRef(null)
  const messageEndRef = useRef(null)

  // Set client flag
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load credits from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCredits = localStorage.getItem('gogoCredits')
      if (savedCredits) {
        setCredits(parseInt(savedCredits))
      }
    }
  }, [])

  // Save credits to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gogoCredits', credits.toString())
    }
  }, [credits])

  // Auto scroll to latest message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Initialize Web Speech API
  useEffect(() => {
    if (typeof window === 'undefined' || !isClient) return

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      console.warn('Web Speech API not supported')
      return
    }

    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true

    recognitionRef.current.onstart = () => {
      setListening(true)
    }

    recognitionRef.current.onend = () => {
      setListening(false)
    }

    recognitionRef.current.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          if (transcript.toLowerCase().includes('mamkhize')) {
            triggerWakeWord()
          }
        }
      }
    }

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
    }

    try {
      recognitionRef.current.start()
    } catch (e) {
      console.log('Recognition already started')
    }

    return () => {
      try {
        recognitionRef.current?.stop()
      } catch (e) {
        console.log('Error stopping recognition')
      }
    }
  }, [isClient])

  const triggerWakeWord = () => {
    setGlowing(true)
    setTimeout(() => setGlowing(false), 3000)

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance("Yebo mntanami? Ndi khona")
      utterance.lang = 'zu-ZA'
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
    }

    setChatOpen(true)
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', text: input }
    setMessages([...messages, userMessage])
    setInput('')

    const gogoResponses = [
      'Ayoba ngubani, uxolo ukuthula impilo yakho',
      'Uyagonda kahle mntanami',
      'Ngiyakuxolela kodwa ayikho indlela',
      'Eish, kukhona izinto ezikhuluma umuntu',
      'Uthule mkhulu, izinsizwa ziyagula',
    ]

    const response = gogoResponses[Math.floor(Math.random() * gogoResponses.length)]
    
    setTimeout(() => {
      const gogoMessage = { role: 'gogo', text: response }
      setMessages((prev) => [...prev, gogoMessage])

      if (credits > 0) {
        setCredits(credits - 1)
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance(response)
          utterance.lang = 'zu-ZA'
          utterance.rate = 0.9
          window.speechSynthesis.speak(utterance)
        }
      }
    }, 500)
  }

  return (
    <>
      {/* Floating Button */}
      <div
        style={{
          position: 'fixed',
          bottom: '70px',
          right: '20px',
          zIndex: 50,
        }}
      >
        <button
          onClick={() => setChatOpen(!chatOpen)}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '4px solid white',
            background: glowing
              ? 'linear-gradient(135deg, #22c55e 0%, #5D4037 100%)'
              : 'linear-gradient(135deg, #22c55e 0%, #5D4037 100%)',
            boxShadow: glowing
              ? '0 0 30px rgba(34,197,94,0.8), 0 4px 6px rgba(0,0,0,0.1)'
              : '0 4px 6px rgba(0,0,0,0.1)',
            fontSize: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'grab',
            transition: 'all 0.3s ease',
          }}
        >
          👑
          {listening && isClient && (
            <div
              style={{
                position: 'absolute',
                width: '12px',
                height: '12px',
                backgroundColor: '#22c55e',
                borderRadius: '50%',
                bottom: '8px',
                right: '8px',
                animation: 'pulse 1s infinite',
              }}
            />
          )}
        </button>
      </div>

      {/* Chat Box */}
      {chatOpen && isClient && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '20px',
            width: '320px',
            height: '400px',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 49,
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(90deg, #5D4037 0%, #22c55e 100%)',
              color: 'white',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontWeight: 'bold', fontSize: '18px' }}>Gogo MamKhize</h3>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>Credits: {credits}</p>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                padding: '8px',
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              backgroundColor: '#f9fafb',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', color: '#9ca3af', marginTop: '32px' }}>
                <p style={{ fontSize: '14px' }}>Ayoba! Say "MamKhize" to start 👋</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '70%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    backgroundColor: msg.role === 'user' ? '#22c55e' : '#5D4037',
                    backgroundOpacity: msg.role === 'gogo' ? 0.1 : 1,
                    color: msg.role === 'user' ? 'white' : '#1f2937',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          {/* Input */}
          <div style={{ borderTop: '1px solid #e5e7eb', padding: '16px', backgroundColor: 'white' }}>
            {credits > 0 ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type message..."
                  style={{
                    flex: 1,
                    border: '1px solid #d1d5db',
                    borderRadius: '20px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  style={{
                    background: 'linear-gradient(90deg, #22c55e 0%, #5D4037 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 16px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  Send
                </button>
              </div>
            ) : (
              <button
                style={{
                  width: '100%',
                  backgroundColor: '#5D4037',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Refill R50 to talk
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {/* TODO: Replace speechSynthesis with ElevenLabs API + ChatGPT when credits system is live */}
    </>
  )
}
