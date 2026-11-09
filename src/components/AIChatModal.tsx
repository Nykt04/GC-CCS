import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  MessageSquare,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProgram?: (progId: string) => void;
}

const PRESET_QUESTIONS = [
  'What is the difference between BSCS and BSIT at Gordon College?',
  'What are the freshman admission requirements for AY 2026-2027?',
  'Can an ACT graduate ladderize directly into 3rd Year BSIT?',
  'What programming languages and engines are taught in BSEMC?',
  'What industry certifications (Cisco, AWS, Oracle) are included in tuition?'
];

export default function AIChatModal({ isOpen, onClose, onSelectProgram }: AIChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hello! I am **Turing**, the AI Academic and Admissions Advisor for **Gordon College - College of Computer Studies (CCS)**.\n\nOur motto is *"Making IT Happen."* I can help you with degree curricula, admission requirements, transfer credentials, faculty consultation schedules, and career trajectories for **BSCS**, **BSIT**, **BSEMC**, and **ACT**.\n\nHow can I guide your computing journey today?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const historyPayload = [...messages, userMessage].map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyPayload }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const botReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.reply || 'I could not process that inquiry at this moment. Please reach out to info.ccs@gordoncollege.edu.ph.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err: any) {
      console.warn('Chat request failed, providing fallback response:', err?.message);
      const fallbackReply: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: `**Gordon College CCS Advisory**\n\nThank you for your question! For specific inquiries on admission tests, curriculum prerequisites, or ladderization, you may also visit the **CCS Dean's Office** at the 3rd Floor of the Olongapo City Sports Complex or email us at **info.ccs@gordoncollege.edu.ph**.\n\nAll four programs (BSCS, BSIT, BSEMC, and ACT) are covered under the **RA 10931 Free Higher Education** scheme for qualified students.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        text: `Conversation refreshed. What would you like to know regarding Gordon College CCS programs, admissions, or faculty?`,
        timestamp: 'Just now',
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        className="bg-white border border-slate-200 w-full max-w-2xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-900"
      >
        {/* Header */}
        <div className="bg-orange-600 px-5 py-4 flex items-center justify-between shrink-0 text-white shadow-xs">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-xs shrink-0">
              <img
                src="/assets/ccs_logo_transparent.png"
                alt="Gordon College CCS Seal"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heading font-extrabold text-white text-base">
                  Turing Academic Advisor
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                  Gemini 3.8 Flash
                </span>
              </div>
              <p className="text-xs text-orange-100 mt-0.5">
                Gordon College College of Computer Studies • Institutional Advisor
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleResetChat}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
              title="Reset conversation"
              aria-label="Reset conversation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close AI Advisor"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Chat Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/70">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${
                msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs shrink-0 font-medium ${
                  msg.role === 'user'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-white text-orange-600 border border-slate-200 shadow-2xs'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] p-4 rounded-xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-2xs'
                }`}
              >
                <div className={`text-[10px] font-semibold tracking-wider mb-1 flex justify-between ${
                  msg.role === 'user' ? 'text-orange-100' : 'text-slate-400'
                }`}>
                  <span>{msg.role === 'user' ? 'You' : 'Turing Academic Advisor'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Message Body with Markdown formatting support */}
                <div className="space-y-2 text-xs sm:text-sm">
                  {msg.text.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx}>
                      {paragraph.split('**').map((chunk, cIdx) =>
                        cIdx % 2 === 1 ? (
                          <strong key={cIdx} className={msg.role === 'user' ? 'font-bold underline' : 'text-orange-700 font-bold'}>
                            {chunk}
                          </strong>
                        ) : (
                          chunk
                        )
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-3 text-xs text-orange-600">
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-orange-600 shadow-2xs">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="px-4 py-3 bg-white rounded-xl border border-slate-200 flex items-center space-x-2 text-slate-600 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-orange-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-orange-300 animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-slate-500 ml-1">Consulting Gordon College curriculum base...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="bg-white border-t border-slate-200 px-4 py-2.5 overflow-x-auto flex space-x-2 shrink-0">
          <span className="text-[11px] font-bold text-slate-500 shrink-0 self-center mr-1">
            Inquire:
          </span>
          {PRESET_QUESTIONS.map((question, qIdx) => (
            <button
              key={qIdx}
              onClick={() => handleSendMessage(question)}
              className="text-xs bg-slate-50 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors"
            >
              {question}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Turing about BSCS, BSIT, BSEMC, ACT, admission requirements, tuition..."
              className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-orange-600 placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm shadow-sm flex items-center space-x-1.5 transition-all"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Inquire</span>
            </button>
          </form>
          <div className="text-[10px] text-slate-400 text-center mt-2.5">
            Official Academic Intelligence of Gordon College College of Computer Studies • Powered by Gemini 3.8 Flash
          </div>
        </div>
      </motion.div>
    </div>
  );
}
