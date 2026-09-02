import React, { useEffect, useRef, useState } from "react";

// TODO: Replace speechSynthesis with ElevenLabs API + ChatGPT when credits system is live

export default function MamKhizeBubble() {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [glowing, setGlowing] = useState(false);
  const [messages, setMessages] = useState([
    { from: "gogo", text: "Sawubona! NginguMamKhize — ubani lona?" },
  ]);
  const [input, setInput] = useState("");
  const [credits, setCredits] = useState(() => {
    try {
      const v = localStorage.getItem("gogoCredits");
      return v ? Number(v) : 60;
    } catch (e) {
      return 60;
    }
  });

  // position for draggable button (translate from bottom-right)
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const pointerRef = useRef(null);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const recognitionRef = useRef(null);

  useEffect(() => {
    // persist credits
    try {
      localStorage.setItem("gogoCredits", String(credits));
    } catch (e) {
      // ignore
    }
  }, [credits]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const r = new SpeechRecognition();
    r.continuous = true;
    r.interimResults = false;
    r.lang = "en-US"; // recognition language — wake word is handled case-insensitively

    r.onstart = () => setListening(true);
    r.onend = () => setListening(false);

    r.onerror = (e) => {
      // console.debug("SpeechRecognition error", e);
      // attempt restart
      try {
        r.start();
      } catch (err) {
        // ignore
      }
    };

    r.onresult = (event) => {
      try {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript || "";
          const cleaned = transcript.toLowerCase();
          if (cleaned.includes("mamkhize") || cleaned.includes("mam khize")) {
            triggerWakeWordResponse();
            break;
          }
        }
      } catch (e) {
        // ignore
      }
    };

    try {
      r.start();
      recognitionRef.current = r;
    } catch (e) {
      // ignore
    }

    return () => {
      try {
        r.onresult = null;
        r.onend = null;
        r.onerror = null;
        r.stop();
      } catch (e) {}
    };
  }, []);

  function triggerWakeWordResponse() {
    setGlowing(true);
    setTimeout(() => setGlowing(false), 3000);
    // Speak the wake response
    speak("Yebo mntanami? Ndi khona", { lang: "zu-ZA", rate: 0.9 });
  }

  function speak(text, opts = {}) {
    if (!window.speechSynthesis) return;
    // If no credits, do not speak
    if (credits <= 0) return;

    const utt = new SpeechSynthesisUtterance(text);
    if (opts.lang) utt.lang = opts.lang;
    if (opts.rate) utt.rate = opts.rate;
    // play
    try {
      window.speechSynthesis.speak(utt);
      // deduct one credit per speech
      setCredits((c) => Math.max(0, c - 1));
    } catch (e) {
      // ignore
    }
  }

  function handleSend() {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((m) => [...m, { from: "user", text: userText }]);
    setInput("");

    // Simple Gogo reply logic
    let reply = "Ngiyakuva.";
    const lowered = userText.toLowerCase();
    if (lowered.includes("hello") || lowered.includes("hi") || lowered.includes("sawubona")) {
      reply = "Sawubona mntanami! Unjani namuhla?";
    } else if (lowered.includes("how are you") || lowered.includes("unjani")) {
      reply = "Ngikhona, ngiyabonga. Wena unjani?";
    } else if (lowered.includes("help") || lowered.includes("assist") || lowered.includes("ngisize")) {
      reply = "Ngiyakwazi ukusiza — shono nje ukuthi ufunani.";
    } else if (lowered.includes("thank")) {
      reply = "Ngiyabonga kuwe!";
    } else {
      // gentle echo / friendly message
      reply = `Kulungile — ${userText}`;
    }

    setTimeout(() => {
      setMessages((m) => [...m, { from: "gogo", text: reply }]);
      speak(reply, { lang: "zu-ZA", rate: 0.95 });
    }, 500);
  }

  // draggable handlers using pointer events
  function onPointerDown(e) {
    pointerRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    (e.target || e.srcElement).setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e) {
    if (!pointerRef.current) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    setPos((p) => ({ x: p.x + dx, y: p.y + dy }));
  }

  function onPointerUp(e) {
    pointerRef.current = false;
    try {
      (e.target || e.srcElement).releasePointerCapture?.(e.pointerId);
    } catch (err) {}
  }

  // keyboard send (enter)
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  function handleRefill() {
    // simple simulated refill — in real app integrate payment
    setCredits((c) => c + 60);
  }

  // styles
  const accent = "#22c55e"; // green
  const brown = "#5D4037";

  const bubbleStyle = {
    position: "fixed",
    right: 20,
    bottom: 20,
    width: 70,
    height: 70,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `linear-gradient(135deg, ${accent}, ${brown})`,
    border: "3px solid white",
    boxShadow: glowing
      ? "0 8px 30px rgba(255,215,0,0.7), 0 4px 10px rgba(0,0,0,0.3)"
      : "0 6px 18px rgba(0,0,0,0.25)",
    zIndex: 9999,
    cursor: "grab",
    transform: `translate(${pos.x}px, ${pos.y}px)`,
    userSelect: "none",
  };

  const crownStyle = {
    fontSize: 28,
    transform: "translateY(-2px)",
    filter: "drop-shadow(0 1px 0 rgba(0,0,0,0.2))",
  };

  const greenDotStyle = {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 12,
    background: accent,
    right: 6,
    bottom: 6,
    boxShadow: "0 0 6px rgba(34,197,94,0.9)",
    border: "2px solid white",
  };

  const chatStyle = {
    position: "fixed",
    right: 20,
    bottom: 100,
    width: 320,
    height: 400,
    background: "white",
    borderRadius: 20,
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    zIndex: 9998,
    display: open ? "flex" : "none",
    flexDirection: "column",
    overflow: "hidden",
    border: `1px solid rgba(0,0,0,0.06)`,
  };

  const headerStyle = {
    padding: "12px 16px",
    background: `linear-gradient(90deg, ${brown}, ${accent})`,
    color: "white",
    fontWeight: 700,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const messagesStyle = {
    padding: 12,
    flex: 1,
    overflowY: "auto",
    background: "linear-gradient(180deg, rgba(245,245,245,0.9), white)",
  };

  const inputRowStyle = {
    padding: 12,
    borderTop: "1px solid rgba(0,0,0,0.05)",
    display: "flex",
    gap: 8,
    alignItems: "center",
    background: "white",
  };

  return (
    <>
      <div
        role="button"
        aria-label="MamKhize bubble"
        style={bubbleStyle}
        onClick={() => setOpen((s) => !s)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={crownStyle}>👑</span>
          {listening && <span style={greenDotStyle} />}
        </div>
      </div>

      <div style={chatStyle}>
        <div style={headerStyle}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 18 }}>👵</span>
            </div>
            <div>
              <div style={{ fontSize: 14 }}>Gogo MamKhize</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>Izinzuzo: use this chat to ask</div>
            </div>
          </div>

          <div style={{ fontSize: 13, fontWeight: 700 }}>{credits} credits</div>
        </div>

        <div style={messagesStyle}>
          {messages.map((m, idx) => (
            <div key={idx} style={{ marginBottom: 10, display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "80%",
                background: m.from === "user" ? accent : brown,
                color: "white",
                padding: "8px 12px",
                borderRadius: 12,
                borderTopLeftRadius: m.from === "user" ? 12 : 4,
                borderTopRightRadius: m.from === "user" ? 4 : 12,
                boxShadow: "0 3px 10px rgba(0,0,0,0.06)",
                fontSize: 14,
              }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div style={inputRowStyle}>
          {credits <= 0 ? (
            <button onClick={handleRefill} style={{ flex: 1, padding: "10px 12px", borderRadius: 10, background: accent, color: "white", border: "none", fontWeight: 700 }}>
              Refill R50 to talk
            </button>
          ) : (
            <>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Thumela umbhalo..."
                style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid rgba(0,0,0,0.06)" }}
              />
              <button onClick={handleSend} style={{ padding: "10px 14px", borderRadius: 10, background: brown, color: "white", border: "none", fontWeight: 700 }}>
                Send
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
