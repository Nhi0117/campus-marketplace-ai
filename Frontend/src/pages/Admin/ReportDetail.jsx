import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, ExternalLink, Trash2, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { formatCurrency } from '../../utils/format';

export const AdminReportDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [decision, setDecision] = useState('dismissed'); // reviewing | resolved | dismissed
  const [note, setNote] = useState('Tin đã ghi rõ pin chai nhẹ. Chưa đủ căn cứ kết luận vi phạm.');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveResult = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      navigate('/admin/reports');
    }, 1200);
  };

  return (
    <div className="flex bg-slate-50 min-h-[calc(100vh-64px)]">
      <AdminSidebar activeTab="reports" />

      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/admin/reports" className="hover:text-slate-800">Xử lý báo cáo</Link>
            <span>›</span>
            <span className="font-semibold text-slate-800">Chi tiết #{id || '128'}</span>
          </div>

          <Link
            to="/admin/reports"
            className="text-xs font-semibold text-[#1557A0] hover:underline inline-flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Quay lại danh sách
          </Link>
        </div>

        {/* Heading */}
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Chi tiết báo cáo #{id || '128'}</h1>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            Đang xem xét
          </span>
        </div>

        {isSaved && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Đã lưu kết quả xử lý báo cáo thành công!
          </div>
        )}

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* CỘT TRÁI: Thông tin đối tượng bị báo cáo */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Card đối tượng bị báo cáo */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Đối tượng bị báo cáo</span>
                <span className="text-xs text-slate-500">Trạng thái tin: <strong className="text-emerald-600">Đang hiển thị</strong></span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3.5">
                <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 text-xl font-bold text-[#1557A0]">
                  💻
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1557A0] text-white">Bán</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-200 text-slate-700">Đã qua sử dụng</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 truncate">Laptop văn phòng cũ, RAM 8GB (pin chai nhẹ)</h3>
                  <div className="flex items-center justify-between mt-1 text-xs">
                    <span className="font-bold text-[#1557A0]">{formatCurrency(4500000)}</span>
                    <span className="text-slate-500">Người đăng: <strong className="text-slate-700">Đức Thịnh</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <Link to="/products/prod_11" className="text-[#1557A0] font-semibold hover:underline inline-flex items-center gap-1">
                  Xem chi tiết tin đăng →
                </Link>
                <Link to="/seller/user_3" className="text-[#1557A0] font-semibold hover:underline inline-flex items-center gap-1">
                  Xem hồ sơ người bán →
                </Link>
              </div>
            </div>

            {/* Card Nội dung báo cáo */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Nội dung báo cáo</span>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">Lý do</span>
                  <p className="font-semibold text-slate-800">Mô tả không đúng thực tế hoặc che giấu khiếm khuyết</p>
                </div>

                <div>
                  <span className="text-slate-400 block mb-0.5">Mô tả thêm</span>
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    Tin ghi pin chai nhẹ nhưng người bán nhắn máy chỉ dùng được khoảng 30 phút khi rút sạc.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Người báo cáo</span>
                    <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1557A0] text-[10px] flex items-center justify-center font-bold">HN</span>
                      Hoàng Nam
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-0.5">Thời điểm gửi</span>
                    <span className="font-medium text-slate-700">10/11/2026 09:50</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center gap-2 text-xs text-[#1557A0]">
                <Info className="w-4 h-4 shrink-0" />
                <span>Báo cáo chỉ là thông tin tham khảo từ người dùng, chưa phải kết luận vi phạm chính thức.</span>
              </div>
            </div>

            {/* Card Hình ảnh đính kèm */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hình ảnh đính kèm</span>
                <span className="text-xs text-slate-400">Người báo cáo đính kèm</span>
              </div>
              <p className="text-xs text-slate-500">
                Bằng chứng người báo cáo tải lên khi gửi báo cáo vi phạm giúp đối chiếu tình trạng thực tế.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-center">
                  <div className="aspect-video rounded-lg bg-slate-200 mb-2 flex items-center justify-center text-slate-400 text-xs">
                    laptop_desk.jpg
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">laptop_desk.jpg</span>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-center">
                  <div className="aspect-video rounded-lg bg-slate-200 mb-2 flex items-center justify-center text-slate-400 text-xs">
                    battery_report.jpg
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">battery_report.jpg</span>
                </div>
              </div>
            </div>

          </div>

          {/* CỘT PHẢI: Xử lý báo cáo */}
          <div className="lg:col-span-5 space-y-6">
            
            <form onSubmit={handleSaveResult} className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-900">Xử lý báo cáo</h3>
                <span className="text-xs text-slate-400">Người xử lý: <strong>Admin Khoa</strong></span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2.5">
                  Kết quả xử lý <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <label className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 flex items-start gap-2.5 cursor-pointer text-xs">
                    <input
                      type="radio"
                      name="decision"
                      value="reviewing"
                      checked={decision === 'reviewing'}
                      onChange={() => setDecision('reviewing')}
                      className="mt-0.5 text-[#1557A0]"
                    />
                    <div>
                      <strong className="text-slate-800 block">Đang xem xét</strong>
                      <span className="text-slate-500 text-[11px]">Tiếp tục kiểm tra, chưa có kết luận</span>
                    </div>
                  </label>

                  <label className="p-3 rounded-xl border border-slate-200 hover:border-slate-300 flex items-start gap-2.5 cursor-pointer text-xs">
                    <input
                      type="radio"
                      name="decision"
                      value="resolved"
                      checked={decision === 'resolved'}
                      onChange={() => setDecision('resolved')}
                      className="mt-0.5 text-[#1557A0]"
                    />
                    <div>
                      <strong className="text-slate-800 block">Đã xử lý</strong>
                      <span className="text-slate-500 text-[11px]">Báo cáo có căn cứ và đã có biện pháp</span>
                    </div>
                  </label>

                  <label className="p-3 rounded-xl border border-[#1557A0] bg-blue-50/50 flex items-start gap-2.5 cursor-pointer text-xs">
                    <input
                      type="radio"
                      name="decision"
                      value="dismissed"
                      checked={decision === 'dismissed'}
                      onChange={() => setDecision('dismissed')}
                      className="mt-0.5 text-[#1557A0]"
                    />
                    <div>
                      <strong className="text-[#1557A0] block">Không xác nhận</strong>
                      <span className="text-slate-600 text-[11px]">Chưa đủ căn cứ kết luận vi phạm</span>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Ghi chú kết quả <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400">{note.length} / 500</span>
                </div>
                <textarea
                  rows={4}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 leading-relaxed focus:outline-none focus:border-[#1557A0]"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-[11px] text-[#1557A0]">
                ℹ Lưu kết quả không tự động ẩn tin. Thao tác gỡ tin được thực hiện riêng bên dưới.
              </div>

              {/* Thao tác kiểm duyệt */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <span className="text-xs font-bold text-slate-700 block">Thao tác kiểm duyệt</span>
                <p className="text-[11px] text-slate-400">
                  Nếu tin vi phạm, bạn có thể gỡ tin. Lý do và người xử lý sẽ được ghi lại trong nhật ký hệ thống.
                </p>

                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Gỡ tin đăng
                  </button>
                  <Link
                    to="/products/prod_11"
                    className="text-xs font-semibold text-[#1557A0] hover:underline inline-flex items-center gap-1"
                  >
                    Mở trang tin gốc →
                  </Link>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => navigate('/admin/reports')}
                  className="px-5 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#1557A0] hover:bg-[#10437d] text-white text-xs font-semibold shadow-sm transition-all"
                >
                  Lưu kết quả
                </button>
              </div>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
