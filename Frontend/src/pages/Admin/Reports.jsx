import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flag, Info, Eye, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';

const MOCK_REPORTS = [
  {
    id: '#128',
    targetType: 'Tin đăng',
    targetTitle: 'Laptop văn phòng cũ, RAM 8GB (pin chai nhẹ)',
    reason: 'Mô tả không đúng thực tế hoặc che giấu khiếm khuyết',
    reporter: 'Hoàng Nam',
    date: '10/11/2026',
    time: '09:50',
    status: 'new', // new | reviewing | resolved | dismissed
    statusText: 'Mới gửi',
    statusBadge: 'bg-amber-50 text-amber-700 border border-amber-200',
    hasActionBtn: true,
  },
  {
    id: '#127',
    targetType: 'Tài khoản',
    targetTitle: 'Gia Bảo',
    reason: 'Nghi ngờ lừa đảo',
    reporter: 'Ngọc Lan',
    date: '10/11/2026',
    time: '08:30',
    status: 'new',
    statusText: 'Mới gửi',
    statusBadge: 'bg-amber-50 text-amber-700 border border-amber-200',
    hasActionBtn: true,
  },
  {
    id: '#126',
    targetType: 'Tin đăng',
    targetTitle: 'Quạt mini để bàn',
    reason: 'Nội dung không phù hợp hoặc sai danh mục',
    reporter: 'Quốc Huy',
    date: '09/11/2026',
    time: '16:05',
    status: 'reviewing',
    statusText: 'Đang xem xét',
    statusBadge: 'bg-blue-50 text-[#1557A0] border border-blue-200',
    hasActionBtn: true,
  },
  {
    id: '#125',
    targetType: 'Tin đăng',
    targetTitle: 'Máy tính cầm tay Casio fx-580VN X',
    reason: 'Hàng bị cấm hoặc vi phạm bản quyền',
    reporter: 'Thu Hà',
    date: '08/11/2026',
    time: '11:20',
    status: 'resolved',
    statusText: 'Đã xử lý',
    statusBadge: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    hasActionBtn: false,
  },
  {
    id: '#124',
    targetType: 'Tài khoản',
    targetTitle: 'Quốc Huy',
    reason: 'Lý do khác',
    reporter: 'Bảo Châu',
    date: '07/11/2026',
    time: '14:40',
    status: 'dismissed',
    statusText: 'Không xác nhận',
    statusBadge: 'bg-slate-100 text-slate-600 border border-slate-200',
    hasActionBtn: false,
  },
  {
    id: '#123',
    targetType: 'Tin đăng',
    targetTitle: 'Bộ bút màu và dụng cụ vẽ kỹ thuật',
    reason: 'Nghi ngờ lừa đảo',
    reporter: 'Hoàng Nam',
    date: '05/11/2026',
    time: '10:15',
    status: 'resolved',
    statusText: 'Đã xử lý',
    statusBadge: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    hasActionBtn: false,
  },
];

export const AdminReportsPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = MOCK_REPORTS.filter(r => {
    if (activeTab === 'new') return r.status === 'new';
    if (activeTab === 'reviewing') return r.status === 'reviewing';
    if (activeTab === 'resolved') return r.status === 'resolved';
    if (activeTab === 'dismissed') return r.status === 'dismissed';
    return true;
  });

  return (
    <div className="flex bg-slate-50 min-h-[calc(100vh-64px)]">
      <AdminSidebar activeTab="reports" />

      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Xử lý báo cáo</h1>
          <p className="text-xs text-slate-500 mt-1">
            Xem xét báo cáo từ người dùng và cập nhật kết quả xử lý.
          </p>
        </div>

        {/* Info banner */}
        <div className="mb-6 p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/70 flex items-center gap-2.5 text-xs text-[#1557A0]">
          <Info className="w-4 h-4 shrink-0" />
          <span>Báo cáo không tự động ẩn tin hay khóa tài khoản. Hãy xem xét trước khi xử lý.</span>
        </div>

        {/* Filter tabs & dropdown */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-[#1557A0] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Tất cả 6
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'new'
                  ? 'bg-[#1557A0] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Mới gửi 2
            </button>
            <button
              onClick={() => setActiveTab('reviewing')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'reviewing'
                  ? 'bg-[#1557A0] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Đang xem xét 1
            </button>
            <button
              onClick={() => setActiveTab('resolved')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'resolved'
                  ? 'bg-[#1557A0] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Đã xử lý 2
            </button>
            <button
              onClick={() => setActiveTab('dismissed')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'dismissed'
                  ? 'bg-[#1557A0] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Không xác nhận 1
            </button>
          </div>

          <div className="text-xs">
            <select className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:border-[#1557A0]">
              <option>Đối tượng: Tất cả đối tượng</option>
              <option>Đối tượng: Tin đăng</option>
              <option>Đối tượng: Tài khoản</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Mã</th>
                  <th className="py-3 px-4">Đối tượng</th>
                  <th className="py-3 px-4">Lý do</th>
                  <th className="py-3 px-4">Người báo cáo</th>
                  <th className="py-3 px-4">Ngày gửi</th>
                  <th className="py-3 px-4">Trạng thái</th>
                  <th className="py-3 px-4 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">{r.id}</td>
                    
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          r.targetType === 'Tin đăng' ? 'bg-blue-100 text-[#1557A0]' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {r.targetType}
                        </span>
                        <p className="font-semibold text-slate-900 max-w-xs truncate">{r.targetTitle}</p>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 max-w-xs">{r.reason}</td>
                    
                    <td className="py-3.5 px-4 font-medium text-slate-700">{r.reporter}</td>
                    
                    <td className="py-3.5 px-4 text-slate-500">
                      <div>{r.date}</div>
                      <div className="text-[10px] text-slate-400">{r.time}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${r.statusBadge}`}>
                        {r.statusText}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {r.hasActionBtn ? (
                        <Link
                          to={`/admin/reports/${r.id.replace('#', '')}`}
                          className="px-4 py-1.5 rounded-lg bg-[#1557A0] hover:bg-[#10437d] text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                        >
                          Xem xét
                        </Link>
                      ) : (
                        <Link
                          to={`/admin/reports/${r.id.replace('#', '')}`}
                          className="px-4 py-1.5 rounded-lg border border-slate-300 hover:border-[#1557A0] text-slate-700 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                        >
                          Kết quả
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
