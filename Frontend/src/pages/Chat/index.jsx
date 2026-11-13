import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Info, BookOpen, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/format';
import { ProfileSidebar } from '../Profile/ProfileSidebar';

const MOCK_CONVERSATIONS = [
  {
    id: 1,
    name: 'Minh Anh',
    initials: 'MA',
    school: 'ĐH Kinh tế - Luật',
    product: 'Giáo trình Kinh tế vi mô',
    listingId: 'prod_1',
    code: '#L1',
    price: 85000,
    condition: 'Như mới',
    listingType: 'Bán',
    lastMsg: 'Ok bạn. Mình hẹn gặp trực tiếp...',
    time: '10:42',
    unread: 0,
  },
  {
    id: 2,
    name: 'Quốc Huy',
    initials: 'QH',
    school: 'ĐH Bách Khoa',
    product: 'Máy tính cầm tay Casio fx-580VN X',
    listingId: 'prod_2',
    code: '#L2',
    price: 250000,
    condition: 'Đã qua sử dụng',
    listingType: 'Bán',
    lastMsg: 'Máy còn đủ nắp bảo vệ không bạn?',
    time: '09:15',
    unread: 2,
  },
  {
    id: 3,
    name: 'Thu Hà',
    initials: 'TH',
    school: 'ĐH Khoa học Tự nhiên',
    product: 'Vở ghi chép môn Xác suất thống kê',
    listingId: 'prod_3',
    code: '#L3',
    price: 0,
    condition: 'Đã qua sử dụng',
    listingType: 'Tặng',
    lastMsg: 'Cảm ơn bạn nhiều nhé!',
    time: 'Hôm qua',
    unread: 0,
  },
  {
    id: 4,
    name: 'Gia Bảo',
    initials: 'GB',
    school: 'ĐH Công nghệ Thông tin',
    product: 'Quạt mini để bàn',
    listingId: 'prod_4',
    code: '#L4',
    price: 0,
    condition: 'Như mới',
    listingType: 'Trao đổi',
    lastMsg: 'Mình có ổ cắm điện Lioa 3 chấu muốn đổi...',
    time: 'Thứ 3',
    unread: 0,
  },
  {
    id: 5,
    name: 'Ngọc Lan',
    initials: 'NL',
    school: 'ĐH Bách Khoa',
    product: 'Bộ bút màu và dụng cụ vẽ kỹ thuật',
    listingId: 'prod_10',
    code: '#L10',
    price: 120000,
    condition: 'Mới',
    listingType: 'Bán',
    lastMsg: 'Bộ bút vẫn còn nguyên màng co...',
    time: '05/03',
    unread: 0,
  },
];

const INITIAL_MESSAGES = [
  { id: 1, sender: 'other', text: 'Chào bạn, giáo trình này còn không ạ?', time: '10:30' },
  { id: 2, sender: 'me', text: 'Chào bạn, còn nhé. Sách còn mới, chỉ có vài ghi chú ở những trang đầu.', time: '10:32' },
  { id: 3, sender: 'other', text: 'Giá 85.000đ có thương lượng được không bạn?', time: '10:35' },
];

export const ChatPage = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [activeId, setActiveId] = useState(1);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');

  const activeConv = conversations.find(c => c.id === activeId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link to="/" className="hover:text-slate-800">Trang chủ</Link>
        <span>›</span>
        <span>Quản lý tài khoản</span>
        <span>›</span>
        <span className="font-semibold text-slate-800">Hộp thư & Trao đổi</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar */}
        <ProfileSidebar activeTab="chat" />

        {/* Chat Container */}
        <div className="flex-1 w-full bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px]">
        
        {/* CỘT TRÁI: Danh sách cuộc trò chuyện */}
        <div className="md:col-span-5 lg:col-span-4 border-r border-slate-100 flex flex-col">
          <div className="p-4 border-b border-slate-100">
            <h2 className="font-bold text-base text-slate-800">Cuộc trò chuyện</h2>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {conversations.map((c) => {
              const isActive = c.id === activeId;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveId(c.id);
                    // Reset unread
                    setConversations(prev => prev.map(item => item.id === c.id ? { ...item, unread: 0 } : item));
                  }}
                  className={`w-full p-4 text-left flex items-start gap-3.5 transition-colors relative ${
                    isActive ? 'bg-[#EBF4FF]/60 border-l-4 border-[#1557A0]' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="w-11 h-11 rounded-full bg-blue-100 text-[#1557A0] font-bold text-sm flex items-center justify-center shrink-0">
                    {c.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold text-sm text-slate-900 truncate">{c.name}</span>
                      <span className="text-[11px] text-slate-400 shrink-0">{c.time}</span>
                    </div>
                    <p className="text-xs font-medium text-slate-700 truncate mb-1">
                      {c.product}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {c.lastMsg}
                    </p>
                  </div>

                  {c.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#1557A0] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-2">
                      {c.unread}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* CỘT PHẢI: Khung chat đang mở */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col">
          
          {/* Header đối tác chat */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1557A0] font-bold text-sm flex items-center justify-center">
                {activeConv.initials}
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">{activeConv.name}</h3>
                <p className="text-xs text-slate-500">{activeConv.school}</p>
              </div>
            </div>

            <Link
              to={`/products/${activeConv.listingId}`}
              className="px-3.5 py-1.5 rounded-lg border border-[#1557A0] text-[#1557A0] hover:bg-blue-50 text-xs font-semibold transition-colors"
            >
              Xem tin
            </Link>
          </div>

          {/* Product Banner đính kèm */}
          <div className="p-3.5 mx-4 mt-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                <BookOpen className="w-4 h-4 text-[#1557A0]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#1557A0] text-white">
                    {activeConv.listingType}
                  </span>
                  <span className="font-semibold text-slate-800 truncate">{activeConv.product}</span>
                  <span className="font-bold text-[#1557A0]">
                    {activeConv.price > 0 ? formatCurrency(activeConv.price) : 'Miễn phí'}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-white border border-slate-200 text-slate-600">
                    {activeConv.condition}
                  </span>
                </div>
              </div>
            </div>
            <span className="text-slate-400 font-mono text-[11px] shrink-0 ml-2">Tin {activeConv.code}</span>
          </div>

          {/* Warning banner */}
          <div className="mx-4 mt-2 p-2.5 rounded-xl bg-[#EBF4FF] border border-blue-100 flex items-center gap-2 text-xs text-[#1557A0]">
            <Info className="w-4 h-4 shrink-0" />
            <span>Giá và giao nhận do hai bên tự thỏa thuận. Website không xử lý thanh toán hay vận chuyển.</span>
          </div>

          {/* Danh sách tin nhắn */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="text-center">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[11px] font-medium">
                Hôm nay
              </span>
            </div>

            {messages.map((m) => {
              const isMe = m.sender === 'me';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isMe
                        ? 'bg-[#1557A0] text-white rounded-br-xs'
                        : 'bg-slate-100 text-slate-800 rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
                </div>
              );
            })}
          </div>

          {/* Ô nhập tin nhắn */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#1557A0] focus:ring-2 focus:ring-[#1557A0]/10 transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-5 py-2.5 rounded-xl bg-[#1557A0] hover:bg-[#10437d] text-white font-semibold text-sm flex items-center gap-1.5 transition-all disabled:opacity-40"
            >
              <span>Gửi</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>
    </div>
  </div>
  );
};
