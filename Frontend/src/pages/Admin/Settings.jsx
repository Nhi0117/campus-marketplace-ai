import React, { useState } from 'react';
import { Settings, Shield, Bell, Database, CheckCircle2, Save, Sparkles, AlertTriangle } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';

export const AdminSettingsPage = () => {
  const [autoApprove, setAutoApprove] = useState(false);
  const [aiFilterActive, setAiFilterActive] = useState(true);
  const [maxListingPerUser, setMaxListingPerUser] = useState(10);
  const [reportThreshold, setReportThreshold] = useState(3);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="flex bg-slate-50 min-h-[calc(100vh-64px)]">
      <AdminSidebar activeTab="settings" />

      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Cài đặt hệ thống Quản Trị</h1>
            <p className="text-xs text-slate-500 mt-1">
              Thiết lập chính sách kiểm duyệt, cơ chế quét bản quyền học liệu và ngưỡng cảnh báo AI Campus.
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-800 flex items-center gap-2 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Đã lưu các thiết lập hệ thống Quản Trị ĐHQG-HCM thành công!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
          {/* Khối 1: Quy định kiểm duyệt tin */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <Shield className="w-5 h-5 text-[#1557A0]" />
              <h2 className="text-base font-bold text-slate-800">Cơ chế Kiểm duyệt tin đăng</h2>
            </div>

            <div className="space-y-4 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoApprove}
                  onChange={(e) => setAutoApprove(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#1557A0] rounded focus:ring-0 cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Tự động duyệt tin đăng từ sinh viên đã xác thực email ĐHQG</span>
                  <span className="text-[11px] text-slate-500">Tin đăng chỉ cần qua bộ lọc từ khóa AI sẽ được hiển thị ngay mà không cần chờ Ban Quản trị phê duyệt thủ công.</span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={aiFilterActive}
                  onChange={(e) => setAiFilterActive(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#1557A0] rounded focus:ring-0 cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Kích hoạt AI quét nội dung và bản quyền giáo trình</span>
                  <span className="text-[11px] text-slate-500">AI tự động phân loại, kiểm tra hình ảnh mờ/lỗi và cảnh báo các tài liệu cấm sao chép hoặc scan trái phép.</span>
                </div>
              </label>
            </div>
          </div>

          {/* Khối 2: Giới hạn và an toàn */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold text-slate-800">Giới hạn & Kiểm soát an toàn</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Số tin tối đa đang bán cùng lúc / sinh viên
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={maxListingPerUser}
                  onChange={(e) => setMaxListingPerUser(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#1557A0]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Ngưỡng tự động tạm khóa khi nhận báo cáo vi phạm
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={reportThreshold}
                  onChange={(e) => setReportThreshold(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#1557A0]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Tài khoản sẽ bị tạm khóa khi nhận đủ số báo cáo hợp lệ này.</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#1557A0] hover:bg-[#10437d] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Lưu cấu hình hệ thống</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
