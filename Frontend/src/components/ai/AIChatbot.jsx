import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, ArrowRight, CornerDownLeft } from 'lucide-react';
import { chatWithAI } from '../../services/ai.service';
import { formatCurrency } from '../../utils/format';
import { Link } from 'react-router-dom';

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Chào bạn! Mình là Campus AI 🎓. Bạn đang cần tìm sách giáo trình, đồ KTX hay muốn gợi ý đồ dùng gì ở Làng Đại Học?',
      products: []
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: query.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithAI(query);
      setMessages(prev => [
        ...prev,
        {
          id: 'ai_' + Date.now(),
          sender: 'ai',
          text: response.reply,
          products: response.recommendedProducts || []
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: 'ai_' + Date.now(),
          sender: 'ai',
          text: 'Xin lỗi bạn, kết nối AI đang chập chờn một chút. Bạn thử hỏi lại lần nữa nhé!',
          products: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'Tìm giáo trình Giải tích Bách Khoa',
    'Cần mua quạt KTX Khu B',
    'Đồ dưới 100k cho sinh viên'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4 py-3 rounded-full shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          <span className="font-bold text-sm tracking-wide">Campus AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[380px] sm:w-[420px] h-[560px] bg-white rounded-3xl shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm flex items-center gap-1.5">
                  Campus AI Assistant
                  <span className="text-[10px] bg-emerald-500/90 text-white px-1.5 py-0.5 rounded-full font-semibold">Online</span>
                </h3>
                <p className="text-[11px] text-blue-200">Trợ lý tìm kiếm thông minh ĐHQG-HCM</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 transition text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[82%] space-y-2`}>
                  <div
                    className={`rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Render Products Attached to AI Response */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {msg.products.map(prod => (
                        <Link
                          key={prod.id}
                          to={`/products/${prod.id}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2.5 p-2 bg-white rounded-xl border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition text-left group"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.title}
                            className="w-12 h-12 rounded-lg object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[11px] font-bold text-slate-800 truncate group-hover:text-blue-600">
                              {prod.title}
                            </h4>
                            <p className="text-[11px] font-extrabold text-blue-600">
                              {formatCurrency(prod.price)}
                            </p>
                            <span className="text-[10px] text-slate-400 block truncate">
                              📍 {prod.location}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-xs text-slate-400 italic py-1">
                <Bot className="w-4 h-4 animate-spin text-blue-600" />
                <span>Campus AI đang suy nghĩ và tìm món đồ phù hợp...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="text-[11px] bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 px-2.5 py-1 rounded-full whitespace-nowrap transition"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              placeholder="Hỏi AI bất kỳ điều gì về đồ sinh viên..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 text-xs bg-slate-100 rounded-xl px-3.5 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
