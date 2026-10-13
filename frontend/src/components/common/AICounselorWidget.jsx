import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Sparkles,
  Send,
  X,
  User,
  CheckCircle2,
  PhoneCall,
  Building2,
  Calculator,
  ShieldCheck,
  RotateCcw
} from "lucide-react";
import { universitiesData } from "../../data/universitiesData";
import { askAICounselorAPI } from "../../services/api";

const defaultAiKnowledge = [
  {
    keywords: ["fee", "cost", "budget", "price", "expense", "lakh"],
    reply: "MBBS in Uzbekistan costs between $3,200 and $3,900 USD per year for tuition (~₹2.7L to ₹3.3L/yr) in top government universities. The complete 6-year package (including tuition, hostel, and Indian mess) is approximately ₹18 Lakhs to ₹26 Lakhs INR."
  },
  {
    keywords: ["tashkent", "tma"],
    reply: "Tashkent Medical Academy (TMA) is Uzbekistan's Rank #1 government medical academy (est. 1919). It has over 3,500+ hospital beds across republican specialized centers, 100% English medium faculty, and tuition is ~$3,900 USD/year."
  },
  {
    keywords: ["samarkand", "ssmu"],
    reply: "Samarkand State Medical University (est. 1930) is one of the oldest in Central Asia with over 1,500+ Indian students, a newly renovated digital campus, 2,800+ beds, and tuition of ~$3,600 USD/year."
  },
  {
    keywords: ["bukhara", "bsmi"],
    reply: "Bukhara State Medical Institute (named after Avicenna) features a brand-new 11-hectare 2023 campus with an on-site 400-bed hospital and hostel complex. Tuition is ~$3,400 USD/year."
  },
  {
    keywords: ["nmc", "fmgl", "next", "fmge", "rule", "valid"],
    reply: "Uzbekistan medical programs are 100% compliant with NMC FMGL 2021 regulations: 54 months of academic coursework + 12 months of mandatory clinical internship in the same university teaching hospital, taught entirely in English."
  },
  {
    keywords: ["neet", "score", "cutoff", "qualify", "mark"],
    reply: "NEET qualification is legally mandatory for Indian citizens as per NMC rules. General category requires ~137+ marks, and Reserved categories (OBC/SC/ST) require ~107+ marks. A valid NEET score is usable for 3 years."
  },
  {
    keywords: ["food", "mess", "indian", "veg", "halal", "hostel"],
    reply: "All partner medical universities in Tashkent, Samarkand, and Bukhara have dedicated on-campus Indian messes operated by Indian chefs, serving authentic North & South Indian meals (veg & non-veg halal) 3 times daily."
  },
  {
    keywords: ["duration", "year", "time", "internship"],
    reply: "The MD Physician program in Uzbekistan is 6 years in total (5 years of theoretical/clinical coursework + 1 year of mandatory clinical internship in university hospitals), strictly fulfilling NMC requirements."
  }
];

export function AICounselorWidget({ onOpenLeadModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I am the **MH GLOBAL EDUCATION CONSULTANT AI Admissions Advisor**. Ask me anything about MBBS in Uzbekistan, university fees, NMC FMGL 2021 rules, or NEET eligibility!",
      time: "Just now"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg = {
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Async query handling
    (async () => {
      let matchedReply = null;
      try {
        const apiResponse = await askAICounselorAPI(text);
        if (apiResponse && apiResponse.reply) {
          matchedReply = apiResponse.reply;
        }
      } catch (e) {
        // Ignore and fallback
      }

      if (!matchedReply) {
        const lowerText = text.toLowerCase();
        for (const item of defaultAiKnowledge) {
          if (item.keywords.some((kw) => lowerText.includes(kw))) {
            matchedReply = item.reply;
            break;
          }
        }
      }

      if (!matchedReply) {
        matchedReply = "Great question! Medical university seats, specific hostel availability, and tuition structures vary by university. I recommend speaking directly with our senior human counsellor who can share official university prospectuses.";
      }

      const botMsg = {
        sender: "bot",
        text: matchedReply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    })();
  };

  const quickPrompts = [
    "What is the total 6-year fee?",
    "Is Tashkent Medical Academy government?",
    "Is Indian food available in hostels?",
    "Explain NMC FMGL 2021 rules"
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans print:hidden">
      {isOpen ? (
        <div className="bg-white w-80 sm:w-96 rounded-3xl shadow-2xl border border-[#D9E2EC] overflow-hidden flex flex-col h-[500px] animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-linear-to-r from-[#063280] via-[#0E438D] to-[#1558A9] text-white p-4 flex items-center justify-between shadow-xs border-b border-[#0B2D64]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#9ABAD9] animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-white leading-none">MH GLOBAL AI Advisor</h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <p className="text-[10px] text-[#9ABAD9] mt-0.5">Instant Medical Education Advisor</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F7FAFC] text-xs">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-[#063280] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-3.5 h-3.5 text-[#9ABAD9]" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#063280] text-white rounded-br-xs"
                      : "bg-white text-[#0F172A] border border-[#D9E2EC] shadow-2xs rounded-bl-xs"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`block text-[9px] mt-1 ${msg.sender === "user" ? "text-slate-300 text-right" : "text-[#475569]"}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-[#475569] text-[11px] italic pl-8">
                <span className="w-1.5 h-1.5 bg-[#063280] rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-[#063280] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-[#063280] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span>AI Counselor is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Chips */}
          <div className="p-2 bg-[#EBF3FA] border-t border-[#D9E2EC] overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white hover:bg-[#063280] hover:text-white text-[#063280] text-[10px] font-semibold border border-[#D9E2EC] shadow-2xs transition-colors shrink-0 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#D9E2EC] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about fees, NMC rules, TMA..."
              className="flex-1 text-xs px-3 py-2 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-2 focus:ring-[#063280] focus:outline-hidden"
            />
            <button
              type="submit"
              className="p-2 bg-[#063280] hover:bg-[#1558A9] text-white rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Connect Human Advisor Footer */}
          <div className="bg-[#EBF3FA] px-3 py-1.5 border-t border-[#D9E2EC] text-[10px] text-[#063280] flex items-center justify-between">
            <span>Need official university letter?</span>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenLeadModal("AI Widget Connect to Senior Counselor");
              }}
              className="font-bold underline text-[#063280] hover:text-[#9B193A] cursor-pointer"
            >
              Talk to Human Advisor
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 bg-linear-to-r from-[#063280] via-[#0E438D] to-[#1558A9] text-white px-4 py-3 rounded-full shadow-xl hover:shadow-blue-950/30 transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 cursor-pointer"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-[#9ABAD9] group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9B193A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#9B193A]"></span>
              </span>
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold leading-tight">AI Medical Counselor</p>
              <p className="text-[10px] text-[#9ABAD9]">Instant Answers & Fee Check</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
