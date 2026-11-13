import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Upload, CheckCircle2, Laptop } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { formatCurrency } from '../utils/format';

export const ReportPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[10] || PRODUCTS[0];

  const [reason, setReason] = useState('misleading');
  const [description, setDescription] = useState('Tin ghi pin chai nhẹ nhưng người bán nhắn máy chỉ dùng được khoảng 30 phút khi rút sạc.');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate(-1);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Báo cáo tin đăng</h1>
        <p className="text-xs text-slate-500 mt-1">
          Báo cáo của bạn sẽ được gửi đến Admin để xem xét.
        </p>
      </div>

      {submitted && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          Báo cáo của bạn đã được ghi nhận. Ban Quản Trị ĐHQG sẽ tiến hành rà soát tin đăng này.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Tin đăng đang báo cáo */}
        <div>
          <span className="text-xs text-slate-400 block mb-2 font-medium">Bạn đang báo cáo tin đăng:</span>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-slate-700 shrink-0 text-xl font-bold">
                💻
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#1557A0] text-white">Bán</span>
                  <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-200 text-slate-700 font-medium">
                    {product.condition || 'Đã qua sử dụng'}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 truncate">{product.title}</h4>
                <span className="text-xs font-bold text-[#1557A0] mt-0.5 block">
                  {product.price > 0 ? formatCurrency(product.price) : 'Miễn phí'}
                </span>
              </div>
            </div>

            <span className="text-xs text-slate-500 shrink-0">
              Người đăng: <strong className="text-slate-800">{product.seller?.name || 'Đức Thịnh'}</strong>
            </span>
          </div>
        </div>

        {/* Lý do báo cáo */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-3">
            Lý do báo cáo <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2.5">
            {[
              { id: 'wrong_category', label: 'Nội dung không phù hợp hoặc sai danh mục' },
              { id: 'copyright', label: 'Hàng bị cấm hoặc vi phạm bản quyền' },
              { id: 'misleading', label: 'Mô tả không đúng thực tế hoặc che giấu khiếm khuyết' },
              { id: 'scam', label: 'Nghi ngờ lừa đảo' },
              { id: 'other', label: 'Lý do khác' },
            ].map((item) => (
              <label
                key={item.id}
                className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer text-xs transition-all ${
                  reason === item.id
                    ? 'border-[#1557A0] bg-blue-50/50 ring-2 ring-[#1557A0]/10 font-semibold text-slate-900'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  value={item.id}
                  checked={reason === item.id}
                  onChange={() => setReason(item.id)}
                  className="text-[#1557A0] focus:ring-[#1557A0]"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Mô tả thêm */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Mô tả thêm (không bắt buộc)
            </label>
            <span className="text-[11px] text-slate-400">{description.length} / 500</span>
          </div>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Cung cấp thêm chi tiết để Admin dễ dàng đối chiếu..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 leading-relaxed focus:outline-none focus:border-[#1557A0]"
          />
        </div>

        {/* Hình ảnh minh chứng */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Hình ảnh minh chứng (không bắt buộc)
          </label>
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center">
              <span className="text-xs text-slate-400 font-mono">Ảnh 1</span>
              <button
                type="button"
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px]"
              >
                ✕
              </button>
            </div>

            <div className="relative w-16 h-16 rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center">
              <span className="text-xs text-slate-400 font-mono">Ảnh 2</span>
              <button
                type="button"
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px]"
              >
                ✕
              </button>
            </div>

            <div className="w-20 h-16 rounded-xl border-2 border-dashed border-blue-200 hover:border-[#1557A0] bg-blue-50/20 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
              <Upload className="w-4 h-4 text-[#1557A0] mb-0.5" />
              <span className="text-[10px] font-semibold text-[#1557A0]">Tải ảnh lên</span>
              <span className="text-[9px] text-slate-400">(2/3)</span>
            </div>
          </div>
        </div>

        {/* Info notice */}
        <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center gap-2.5 text-xs text-[#1557A0]">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Báo cáo không tự động ẩn tin. Admin sẽ xem xét và cập nhật kết quả.</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#1557A0] hover:bg-[#10437d] text-white text-xs font-semibold shadow-sm transition-all"
          >
            Gửi báo cáo
          </button>
        </div>

      </form>
    </div>
  );
};
