import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Laptop, FileText, Palette, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

const MOCK_TRANSACTIONS = [
  {
    id: 'tx_1',
    type: 'Bán',
    listingType: 'sell',
    title: 'Giáo trình Kinh tế vi mô',
    price: 85000,
    condition: 'Như mới',
    categoryName: 'Giáo trình',
    icon: BookOpen,
    iconColor: 'bg-blue-50 text-[#1557A0]',
    seller: 'Minh Anh',
    sellerInitials: 'MA',
    date: '06/11/2026',
    status: 'trading', // trading | completed | cancelled | rated
    statusText: 'Đang trao đổi',
    statusBadge: 'bg-blue-50 text-[#1557A0] border border-blue-200',
  },
  {
    id: 'tx_2',
    type: 'Tặng',
    listingType: 'give',
    title: 'Vở ghi chép môn Xác suất thống kê',
    price: 0,
    condition: 'Đã qua sử dụng',
    categoryName: 'Tài liệu',
    icon: FileText,
    iconColor: 'bg-sky-50 text-sky-600',
    seller: 'Thu Hà',
    sellerInitials: 'TH',
    date: '02/11/2026',
    status: 'completed',
    statusText: 'Đã hoàn tất',
    statusBadge: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  },
  {
    id: 'tx_3',
    type: 'Bán',
    listingType: 'sell',
    title: 'Máy tính cầm tay Casio fx-580VN X',
    price: 250000,
    condition: 'Đã qua sử dụng',
    categoryName: 'Thiết bị',
    icon: Laptop,
    iconColor: 'bg-indigo-50 text-indigo-600',
    seller: 'Quốc Huy',
    sellerInitials: 'QH',
    date: '30/10/2026',
    status: 'cancelled',
    statusText: 'Đã hủy',
    statusBadge: 'bg-red-50 text-red-600 border border-red-200',
  },
  {
    id: 'tx_4',
    type: 'Bán',
    listingType: 'sell',
    title: 'Bộ bút màu và dụng cụ vẽ kỹ thuật',
    price: 120000,
    condition: 'Mới',
    categoryName: 'Dụng cụ vẽ',
    icon: Palette,
    iconColor: 'bg-purple-50 text-purple-600',
    seller: 'Ngọc Lan',
    sellerInitials: 'NL',
    date: '28/10/2026',
    status: 'rated',
    statusText: 'Đã hoàn tất',
    statusBadge: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  },
];

export const TransactionsPage = () => {
  const [activeTab, setActiveTab] = useState('sell'); // 'sell' | 'buy'
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('campus_transactions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Map icon lại vì JSON không lưu hàm component
        return parsed.map(item => {
          const original = MOCK_TRANSACTIONS.find(m => m.id === item.id);
          return {
            ...item,
            icon: original?.icon || BookOpen,
          };
        });
      } catch (e) {
        return MOCK_TRANSACTIONS;
      }
    }
    localStorage.setItem('campus_transactions', JSON.stringify(MOCK_TRANSACTIONS));
    return MOCK_TRANSACTIONS;
  });

  // Lọc theo tab Bán / Mua (cho demo hiện danh sách tương ứng)
  const displayList = transactions;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Lịch sử giao dịch</h1>
        <p className="text-xs text-slate-500 mt-1">Theo dõi các giao dịch của bạn.</p>
      </div>

      {/* Toggle Bán / Mua */}
      <div className="flex items-center justify-between mb-6 pb-2">
        <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200/80">
          <button
            onClick={() => setActiveTab('sell')}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'sell'
                ? 'bg-white text-[#1557A0] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bán
          </button>
          <button
            onClick={() => setActiveTab('buy')}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'buy'
                ? 'bg-white text-[#1557A0] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mua
          </button>
        </div>

        <span className="text-xs font-medium text-slate-500">
          4 giao dịch
        </span>
      </div>

      {/* Danh sách giao dịch */}
      <div className="space-y-4">
        {displayList.map((tx) => {
          const Icon = tx.icon;
          return (
            <div
              key={tx.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-blue-200 transition-colors"
            >
              {/* Bên trái: Icon danh mục + Thông tin tin đăng */}
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center shrink-0 border border-slate-100 ${tx.iconColor}`}>
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-semibold text-center leading-none">{tx.categoryName}</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      tx.type === 'Bán' ? 'bg-[#1557A0] text-white' : 'bg-emerald-600 text-white'
                    }`}>
                      {tx.type}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 hover:text-[#1557A0] transition-colors">
                      {tx.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-sm text-[#1557A0]">
                      {tx.price > 0 ? formatCurrency(tx.price) : 'Miễn phí'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-medium">
                      {tx.condition}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1557A0] font-bold text-[10px] flex items-center justify-center">
                      {tx.sellerInitials}
                    </span>
                    <span>Người bán: <strong className="text-slate-700">{tx.seller}</strong></span>
                    <span>•</span>
                    <span>Cập nhật {tx.date}</span>
                  </div>
                </div>
              </div>

              {/* Bên phải: Trạng thái & Hành động */}
              <div className="flex flex-col md:items-end justify-center gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold self-start md:self-end ${
                  tx.status === 'trading' ? 'bg-blue-50 text-[#1557A0] border border-blue-200' :
                  tx.status === 'completed' || tx.status === 'rated' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  'bg-red-50 text-red-600 border border-red-200'
                }`}>
                  {tx.status === 'trading' ? 'Đang trao đổi' :
                   tx.status === 'completed' ? 'Đã hoàn tất' :
                   tx.status === 'rated' ? 'Đã hoàn tất' : 'Đã hủy'}
                </span>

                {/* Nút hành động tuỳ trạng thái */}
                {tx.status === 'trading' && (
                  <div className="flex flex-col items-end gap-1 mt-1">
                    <Link
                      to={`/verify-transaction/${tx.id}`}
                      className="px-5 py-2 rounded-xl bg-[#1557A0] hover:bg-[#10437d] text-white text-xs font-bold transition-all shadow-sm"
                    >
                      Xác nhận hoàn tất
                    </Link>
                    <Link
                      to="/chat"
                      className="text-[11px] text-[#1557A0] hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      Mở trò chuyện
                    </Link>
                  </div>
                )}

                {tx.status === 'completed' && (
                  <div className="mt-1">
                    <Link
                      to={`/rating/${tx.id}`}
                      className="px-5 py-2 rounded-xl border border-slate-300 hover:border-[#1557A0] hover:bg-blue-50 text-[#1557A0] text-xs font-bold transition-all"
                    >
                      Đánh giá người bán
                    </Link>
                  </div>
                )}

                {tx.status === 'cancelled' && (
                  <p className="text-xs text-slate-400 italic">
                    Giao dịch đã hủy, không đánh giá được.
                  </p>
                )}

                {tx.status === 'rated' && (
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 mt-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>✓ Bạn đã đánh giá</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
