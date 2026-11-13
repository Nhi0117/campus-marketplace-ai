import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Upload, X, CheckCircle2, BookOpen } from 'lucide-react';
import { formatCurrency } from '../utils/format';

export const RatingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('Sách đúng mô tả, người bán nhiệt tình, hẹn gặp đúng giờ.');
  const [submitted, setSubmitted] = useState(false);

  const ratingLabels = {
    1: 'Rất tệ',
    2: 'Không tốt',
    3: 'Bình thường',
    4: 'Tốt',
    5: 'Rất tốt',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate('/transactions');
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Đánh giá người bán</h1>
        <p className="text-xs text-slate-500 mt-1">
          Chia sẻ trải nghiệm giao dịch của bạn với người bán
        </p>
      </div>

      {submitted && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          Cảm ơn bạn đã gửi đánh giá! Đánh giá giúp nâng cao uy tín cộng đồng sinh viên ĐHQG.
        </div>
      )}

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* CỘT TRÁI: Form đánh giá */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-3">Bạn thấy giao dịch này thế nào?</h2>
            
            {/* 5 sao */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-slate-300 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating || rating) >= star
                        ? 'fill-[#1557A0] text-[#1557A0]'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <p className="text-xs font-bold text-[#1557A0] mt-2">
              {ratingLabels[hoverRating || rating]}
            </p>
          </div>

          {/* Nhận xét */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Nhận xét (không bắt buộc)
              </label>
              <span className="text-[11px] text-slate-400">{comment.length} / 300</span>
            </div>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Chia sẻ thêm về tình trạng sách, thái độ giao tiếp của người bán..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 leading-relaxed focus:outline-none focus:border-[#1557A0]"
            />
          </div>

          {/* Hình ảnh thực tế */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Hình ảnh thực tế (không bắt buộc)
            </label>
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 rounded-xl border border-slate-200 bg-blue-50/40 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#1557A0]" />
                <button
                  type="button"
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px]"
                >
                  ✕
                </button>
              </div>

              <div className="w-16 h-16 rounded-xl border-2 border-dashed border-blue-200 hover:border-[#1557A0] bg-blue-50/20 flex flex-col items-center justify-center text-center cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-[#1557A0] mb-0.5" />
                <span className="text-[10px] font-semibold text-[#1557A0]">Thêm ảnh</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('/transactions')}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
            >
              Để sau
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-[#1557A0] hover:bg-[#10437d] text-white text-xs font-semibold shadow-sm transition-all"
            >
              Gửi đánh giá
            </button>
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            Mỗi giao dịch chỉ được đánh giá một lần.
          </p>
        </div>

        {/* CỘT PHẢI: Card tóm tắt giao dịch đã hoàn tất */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900">Giao dịch đã hoàn tất</h3>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
              Đã hoàn tất
            </span>
          </div>

          {/* Product mini info */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1557A0] shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#1557A0] text-white">Bán</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-200 text-slate-700">Như mới</span>
              </div>
              <h4 className="font-bold text-xs text-slate-900">Giáo trình Kinh tế vi mô</h4>
              <span className="text-xs font-bold text-[#1557A0] mt-0.5 block">{formatCurrency(85000)}</span>
            </div>
          </div>

          {/* Seller info */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-[#1557A0] font-bold text-xs flex items-center justify-center">
                MA
              </div>
              <div>
                <span className="font-bold text-xs text-slate-800 block">Minh Anh</span>
                <span className="text-[11px] text-slate-400">ĐH Kinh tế - Luật</span>
                <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold mt-0.5">
                  ★ 4.8 · 12 đánh giá
                </div>
              </div>
            </div>

            <Link to="/seller/user_2" className="text-xs font-semibold text-[#1557A0] hover:underline">
              Xem hồ sơ
            </Link>
          </div>

          {/* Detail lines */}
          <div className="space-y-2 text-xs pt-1 border-t border-slate-100">
            <div className="flex justify-between text-slate-500">
              <span>Ngày hoàn tất</span>
              <strong className="text-slate-800">10/11/2026</strong>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Người mua</span>
              <strong className="text-slate-800">Hoàng Nam (bạn)</strong>
            </div>
          </div>

          {/* Info note */}
          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-[#1557A0] leading-relaxed">
            ℹ Điểm bạn chọn sẽ được tính vào điểm trung bình trên hồ sơ của người bán.
          </div>
        </div>

      </div>
    </div>
  );
};
