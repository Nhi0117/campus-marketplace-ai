import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../utils/format';

export const VerifyTransactionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [confirmed, setConfirmed] = useState(true);
  const [success, setSuccess] = useState(false);

  const handleComplete = (e) => {
    e.preventDefault();
    if (!confirmed) return;

    // Cập nhật trạng thái giao dịch sang completed trong localStorage
    try {
      const saved = localStorage.getItem('campus_transactions');
      if (saved) {
        const list = JSON.parse(saved);
        const targetId = id || 'tx_1';
        const updated = list.map(item => item.id === targetId ? { ...item, status: 'completed' } : item);
        localStorage.setItem('campus_transactions', JSON.stringify(updated));
      }
    } catch (err) {
      console.error(err);
    }

    setSuccess(true);
    setTimeout(() => {
      navigate('/transactions');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Xác nhận hoàn tất giao dịch</h1>
        <p className="text-xs text-slate-500 mt-1">
          Xác nhận khi bạn và người bán đã trao đổi xong.
        </p>
      </div>

      {success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          Giao dịch đã được chuyển sang trạng thái "Đã hoàn tất"!
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* CỘT TRÁI: Thông tin giao dịch */}
        <div className="md:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-slate-900">Thông tin giao dịch</h2>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3.5">
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-[#1557A0] shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#1557A0] text-white">Bán</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-200 text-slate-700">Như mới</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-50 text-[#1557A0]">Học liệu</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">Giáo trình Kinh tế vi mô</h3>
              <span className="text-sm font-bold text-[#1557A0] mt-0.5 block">{formatCurrency(85000)}</span>
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500">Người bán</span>
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1557A0] text-[10px] flex items-center justify-center font-bold">MA</span>
                Minh Anh
                <Link to="/seller/user_2" className="text-[11px] text-[#1557A0] font-normal hover:underline ml-1">
                  Xem hồ sơ
                </Link>
              </div>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500">Người mua</span>
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] flex items-center justify-center font-bold">HN</span>
                Hoàng Nam (bạn)
              </div>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500">Ngày ghi nhận</span>
              <span className="font-medium text-slate-800">06/11/2026</span>
            </div>

            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500">Trạng thái</span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-[#1557A0] border border-blue-200">
                Đang trao đổi
              </span>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: Xác nhận */}
        <div className="md:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-5">
          <h3 className="font-bold text-sm text-slate-900">Xác nhận với người bán</h3>

          <label className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 flex items-center gap-3 cursor-pointer text-xs font-semibold text-slate-900">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-4 h-4 rounded text-[#1557A0] focus:ring-[#1557A0]"
            />
            <span>Xác nhận đã trao đổi xong</span>
          </label>

          <div className="space-y-2">
            <button
              type="button"
              disabled={!confirmed}
              onClick={handleComplete}
              className="w-full py-3 rounded-xl bg-[#1557A0] hover:bg-[#10437d] text-white text-xs font-bold transition-all disabled:opacity-50 shadow-sm"
            >
              Xác nhận hoàn tất
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
            >
              Quay lại
            </button>
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            Chưa trao đổi xong? Bạn có thể quay lại xác nhận sau.
          </p>
        </div>

      </div>

      {/* Khối Khi bạn xác nhận */}
      <div className="mt-8 p-6 rounded-2xl bg-[#EBF4FF]/70 border border-blue-100 space-y-3">
        <h4 className="font-bold text-sm text-[#1557A0] flex items-center gap-2">
          <span>ℹ</span>
          <span>Khi bạn xác nhận</span>
        </h4>
        <ul className="space-y-2 text-xs text-slate-700">
          <li className="flex items-center gap-2">
            <span className="text-[#1557A0] font-bold">✓</span>
            Giao dịch chuyển sang Đã hoàn tất.
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#1557A0] font-bold">✓</span>
            Tin Giáo trình Kinh tế vi mô chuyển sang Đã hoàn tất và không nhận tin nhắn mới.
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#1557A0] font-bold">✓</span>
            Bạn có thể đánh giá Minh Anh một lần cho giao dịch này.
          </li>
        </ul>
      </div>

      {/* Warning box */}
      <div className="mt-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3 text-xs text-amber-800">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          Chỉ xác nhận khi hai bên đã trao đổi xong. Website không kiểm tra việc giao nhận hay thanh toán giữa hai bên.
        </span>
      </div>

    </div>
  );
};
