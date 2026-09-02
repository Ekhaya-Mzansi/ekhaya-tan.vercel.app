'use client'
import { useState, useEffect, useRef } from 'react'

export default function MamKhizeBubble() {
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [credits, setCredits] = useState(60)
  const [glowing, setGlowing] = useState(false)
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef(null)
  const messageEndRef = useRef(null)

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
    if (typeof window === 'undefined') return

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
      let interimTranscript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          if (transcript.toLowerCase().includes('mamkhize')) {
            triggerWakeWord()
          }
        } else {
          interimTranscript += transcript
        }
      }
    }

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
    }

    // Start listening
    try {
      recognitionRef.current.start()
    } catch (e) {
      console.log('Already listening or error starting recognition')
    }

    return () => {
      try {
        recognitionRef.current?.stop()
      } catch (e) {
        console.log('Error stopping recognition')
      }
    }
  }, [])

  const triggerWakeWord = () => {
    setGlowing(true)
    setTimeout(() => setGlowing(false), 3000)

    // Play wake word response
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance("Yebo mntanami? Ndi khona")
      utterance.lang = 'zu-ZA'
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
    }

    // Open chat
    setChatOpen(true)
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: 'user', text: input }
    setMessages([...messages, userMessage])
    setInput('')

    // Simple gogo response logic
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

      // Deduct credits and speak
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
      {/* Floating Draggable Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className={`fixed w-20 h-20 rounded-full flex items-center justify-center text-4xl cursor-grab active:cursor-grabbing border-4 border-white shadow-lg transition-all duration-300 z-9999 ${
          glowing
            ? 'bg-gradient-to-br from-[#22c55e] to-[#5D4037] shadow-[0_0_30px_rgba(34,197,94,0.8)]'
            : 'bg-gradient-to-br from-[#22c55e] to-[#5D4037]'
        }`}
        style={{
          bottom: '70px',
          right: '20px',
          zIndex: 9999,
        }}
      >
        👑
        {listening && (
          <div className="absolute w-3 h-3 bg-green-400 rounded-full bottom-2 right-2 animate-pulse"></div>
        )}
      </button>

      {/* Chat Box */}
      {chatOpen && (
        <div
          className="fixed bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            bottom: '100px',
            right: '20px',
            width: '320px',
            height: '400px',
            zIndex: 9998,
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#5D4037] to-[#22c55e] text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Gogo MamKhize</h3>
              <p className="text-xs opacity-90">Credits: {credits}</p>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="text-xl font-bold hover:bg-white hover:bg-opacity-20 w-8 h-8 rounded-full flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-8">
                <p className="text-sm">Ayoba! Say "MamKhize" to start 👋</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-[#22c55e] text-white rounded-br-none'
                      : 'bg-[#5D4037] bg-opacity-10 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>

          {/* Input Section */}
          <div className="border-t p-4 bg-white">
            {credits > 0 ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type message..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#22c55e]"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-[#22c55e] to-[#5D4037] text-white px-4 py-2 rounded-full font-semibold text-sm hover:shadow-lg transition-all"
                >
                  Send
                </button>
              </div>
            ) : (
              <button className="w-full bg-[#5D4037] text-white py-2 rounded-full font-semibold text-sm hover:bg-opacity-90">
                Refill R50 to talk
              </button>
            )}
          </div>
        </div>
      )}

      {/* TODO: Replace speechSynthesis with ElevenLabs API + ChatGPT when credits system is live */}
    </>
  )
}
