"use client";

import { useState, useRef, useEffect } from "react";

const API = "";

interface Source {
  id: string;
  score: number;
  question: string;
  category: string;
  product: string;
}

interface Message {
  role: "user" | "bot";
  text: string;
  sources?: Source[];
  time: string;
  error?: boolean;
}

const PRODUCTS = [
  { value: "", label: "All Products" },
  { value: "general", label: "General" },
  { value: "shifter", label: "Shîfter" },
  { value: "flexer", label: "Flexer" },
  { value: "decentenergy", label: "Decent Energy" },
  { value: "trade", label: "Trade" },
];

const SUGGESTIONS = [
  "How does Shîfter save money?",
  "What is a flexibility event?",
  "Which inverters are compatible?",
  "How are Flexer earnings calculated?",
  "Is my battery protected?",
  "Which energy markets do you trade?",
];

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function SourcesPanel({ sources }: { sources: Source[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2">
      <button
        onClick={() => setOpen(o => !o)}
        style={{ color: "var(--text-muted)", fontSize: 11, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}
      >
        <span style={{ transition: "transform .2s", display: "inline-block", transform: open ? "rotate(90deg)" : "none", fontSize: 8 }}>▶</span>
        {sources.length} source{sources.length > 1 ? "s" : ""} used
      </button>
      {open && (
        <div className="flex flex-wrap gap-1 mt-2">
          {sources.map(s => (
            <div key={s.id} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 6, fontSize: 11, background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text-sub)" }}>
              <span>{s.question.length > 42 ? s.question.slice(0, 42) + "…" : s.question}</span>
              <span style={{ padding: "1px 6px", borderRadius: 4, fontSize: 10, fontWeight: 600, background: "rgba(0,208,132,0.12)", color: "var(--accent)" }}>
                {Math.round(s.score * 100)}%
              </span>
              <span style={{ padding: "1px 6px", borderRadius: 4, fontSize: 10, background: "var(--surface)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                {s.product}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BotMessage({ msg }: { msg: Message }) {
  return (
    <div className="anim-fade-up" style={{ display: "flex", gap: 13, padding: "14px 0", maxWidth: 780, width: "100%", margin: "0 auto" }}>
      <div style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0, background: "linear-gradient(135deg,#00d084,#00a86b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "white", marginTop: 2 }}>
        DE
      </div>
      <div style={{ maxWidth: "calc(100% - 45px)" }}>
        {msg.error ? (
          <div style={{ padding: "12px 15px", borderRadius: 8, fontSize: 13, background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.18)", color: "#fca5a5", lineHeight: 1.5 }}>
            ⚠ {msg.text}
          </div>
        ) : (
          <div style={{ padding: "13px 16px", fontSize: 14, lineHeight: 1.65, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px 14px 14px 14px", color: "var(--text)" }}
            dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>") }}
          />
        )}
        {msg.sources && msg.sources.length > 0 && <SourcesPanel sources={msg.sources} />}
        <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 5, paddingLeft: 2 }}>{msg.time}</div>
      </div>
    </div>
  );
}

function UserMessage({ msg }: { msg: Message }) {
  return (
    <div className="anim-fade-up" style={{ display: "flex", flexDirection: "row-reverse", gap: 13, padding: "14px 0", maxWidth: 780, width: "100%", margin: "0 auto" }}>
      <div style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0, background: "linear-gradient(135deg,#3b82f6,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, marginTop: 2 }}>
        🧑
      </div>
      <div style={{ maxWidth: "calc(100% - 45px)" }}>
        <div style={{ padding: "13px 16px", fontSize: 14, lineHeight: 1.65, background: "linear-gradient(135deg,#2563eb,#1e40af)", color: "#fff", borderRadius: "14px 4px 14px 14px", marginLeft: "auto" }}>
          {msg.text}
        </div>
        <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 5, paddingRight: 2, textAlign: "right" }}>{msg.time}</div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", gap: 13, padding: "14px 0", maxWidth: 780, width: "100%", margin: "0 auto" }}>
      <div style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0, background: "linear-gradient(135deg,#00d084,#00a86b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "white", marginTop: 2 }}>
        DE
      </div>
      <div style={{ padding: "13px 16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px 14px 14px 14px", display: "flex", alignItems: "center", gap: 4 }}>
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState<boolean | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch(`${API}/api/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "hi" }),
      signal: AbortSignal.timeout(6000),
    })
      .then(r => setOnline(r.ok || r.status < 500))
      .catch(() => setOnline(false));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const send = async (q?: string) => {
    const question = (q ?? input).trim();
    if (!question || loading) return;

    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setLoading(true);
    setMessages(prev => [...prev, { role: "user", text: question, time: now() }]);

    try {
      const body: Record<string, unknown> = { question, topK: 5, minScore: 0.3 };
      if (product) body.product = product;

      const res = await fetch(`${API}/api/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setMessages(prev => [...prev, { role: "bot", text: err.message || `Server error ${res.status}`, error: true, time: now() }]);
      } else {
        const data = await res.json();
        setMessages(prev => [...prev, { role: "bot", text: data.answer, sources: data.sources, time: now() }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "bot", text: "Cannot reach the server.", error: true, time: now() }]);
    }

    setLoading(false);
  };

  const activeProductLabel = PRODUCTS.find(p => p.value === product)?.label ?? "All Products";

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--bg)" }}>

      {/* ── Sidebar ── */}
      <aside style={{ width: 252, minWidth: 252, background: "var(--sidebar)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column" }} className="hidden sm:flex">
        {/* Logo */}
        <div style={{ padding: "22px 18px 16px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#00d084,#00a86b)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px rgba(0,208,132,0.25)", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>DE Bot</div>
              <div style={{ fontSize: 11, color: "var(--text-sub)", marginTop: 1 }}>Decent Energy Assistant</div>
            </div>
          </div>
          <button
            onClick={() => setMessages([])}
            style={{ marginTop: 14, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, padding: "9px 14px", borderRadius: 8, background: "var(--accent-glow)", border: "1px solid rgba(0,208,132,0.25)", color: "var(--accent)", fontSize: 13, fontWeight: 500, cursor: "pointer" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New conversation
          </button>
        </div>

        {/* Filter */}
        <div style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-muted)", padding: "0 6px", marginBottom: 8 }}>Filter product</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {PRODUCTS.map(p => (
              <button
                key={p.value}
                onClick={() => setProduct(p.value)}
                style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", borderRadius: 8, border: "none", background: product === p.value ? "var(--surface2)" : "none", textAlign: "left", width: "100%", fontSize: 13, color: product === p.value ? "var(--accent)" : "var(--text-sub)", cursor: "pointer", fontWeight: product === p.value ? 500 : 400 }}
              >
                <span style={{ width: 7, height: 7, borderRadius: "50%", flexShrink: 0, background: product === p.value ? "var(--accent)" : "var(--text-muted)", opacity: product === p.value ? 1 : 0.5 }} />
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 18px", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 11, color: "var(--text-muted)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: online === null ? "#737373" : online ? "var(--accent)" : "#ef4444", boxShadow: online ? "0 0 6px rgba(0,208,132,0.5)" : "none", flexShrink: 0 }} />
            {online === null ? "Connecting…" : online ? "Live · 95 vectors" : "Server offline"}
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {["gemini-2.5-flash", "gemini-embedding-001"].map(b => (
              <span key={b} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, background: "var(--surface2)", color: "var(--text-sub)", border: "1px solid var(--border)", fontWeight: 500 }}>{b}</span>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Topbar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px", borderBottom: "1px solid var(--border)", background: "rgba(12,12,15,0.8)", backdropFilter: "blur(12px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#00d084,#00a86b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "white" }}>DE</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>DE Bot</div>
              <div style={{ fontSize: 11, color: "var(--text-sub)", marginTop: 1 }}>
                {product ? `Filtering: ${activeProductLabel}` : "Decent Energy FAQ Assistant"}
              </div>
            </div>
            {product && (
              <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 500, background: "var(--accent-glow)", border: "1px solid rgba(0,208,132,0.25)", color: "var(--accent)" }}>
                {activeProductLabel}
              </span>
            )}
          </div>
          <button
            onClick={() => setMessages([])}
            style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--border)", background: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-sub)" }}
            title="New chat"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 12px" }}>
          {messages.length === 0 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "32px 16px", minHeight: 300, gap: 0 }}>
              <div style={{ width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg,#00d084,#00a86b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, marginBottom: 20, boxShadow: "0 8px 32px rgba(0,208,132,0.25)" }}>⚡</div>
              <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-.02em", marginBottom: 8 }}>Hi, I&apos;m DE Bot</h2>
              <p style={{ fontSize: 14, color: "var(--text-sub)", maxWidth: 360, lineHeight: 1.65, marginBottom: 28 }}>
                Your Decent Energy assistant. Ask me anything about our products, tariffs, flexibility trading, or how to save on your energy bills.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 560 }}>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    style={{ padding: "8px 16px", borderRadius: 20, fontSize: 12.5, border: "1px solid var(--border2)", background: "var(--surface)", cursor: "pointer", color: "var(--text-sub)", fontFamily: "inherit" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) =>
            msg.role === "user"
              ? <UserMessage key={i} msg={msg} />
              : <BotMessage key={i} msg={msg} />
          )}

          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding: "14px 28px 20px", background: "var(--bg)" }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 20, padding: "12px 14px" }}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask DE Bot anything…"
                rows={1}
                style={{ flex: 1, background: "none", border: "none", outline: "none", resize: "none", color: "var(--text)", fontSize: 14, lineHeight: 1.55, minHeight: 22, maxHeight: 140, fontFamily: "inherit" }}
              />
              <button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: loading || !input.trim() ? "var(--surface2)" : "linear-gradient(135deg,#00d084,#00b371)", border: "none", cursor: loading || !input.trim() ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: loading || !input.trim() ? "none" : "0 2px 12px rgba(0,208,132,0.25)" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/></svg>
              </button>
            </div>
            <div style={{ textAlign: "center", fontSize: 11, color: "var(--text-muted)", marginTop: 9 }}>
              Press <kbd style={{ display: "inline-block", padding: "1px 5px", borderRadius: 4, border: "1px solid var(--border2)", fontSize: 10, background: "var(--surface2)", fontFamily: "inherit" }}>Enter</kbd> to send &nbsp;·&nbsp; <kbd style={{ display: "inline-block", padding: "1px 5px", borderRadius: 4, border: "1px solid var(--border2)", fontSize: 10, background: "var(--surface2)", fontFamily: "inherit" }}>Shift+Enter</kbd> for new line
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
