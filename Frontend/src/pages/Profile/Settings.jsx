import React, { useState } from 'react';
import { Camera, Lock, Building2, Phone, User, ShieldCheck, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ProfileSidebar } from './ProfileSidebar';

export const SettingsPage = () => {
  const { user, updateUser } = useAuth();

  const [fullName, setFullName] = useState(user?.name || 'Nguyễn Trần Minh Anh');
  const [phone, setPhone] = useState(user?.phone || '0901 234 567');
  const [email, setEmail] = useState(user?.email || 'minhanh@st.uel.edu.vn');
  const [schoolName, setSchoolName] = useState(user?.schoolName || 'Đại học Kinh tế - Luật');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (updateUser) {
      updateUser({
        name: fullName,
        phone,
        email,
        schoolName,
      });
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <span>Trang chủ</span>
        <span>›</span>
        <span>Quản lý tài khoản</span>
        <span>›</span>
        <span className="font-semibold text-slate-800">Cập nhật hồ sơ cá nhân</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar */}
        <ProfileSidebar activeTab="settings" />

        {/* Nội dung chính */}
        <div className="flex-1 w-full bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Thông tin cá nhân</h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Quản lý và cập nhật thông tin hồ sơ của bạn trên Campus Marketplace AI. Email và Trường đại học được bảo mật dựa trên tài khoản sinh viên ĐHQG-HCM.
            </p>
          </div>

          {savedSuccess && (
            <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              Đã lưu thông tin hồ sơ cá nhân thành công!
            </div>
          )}

          {/* Khối Avatar */}
          <div className="mb-8 p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-[#1557A0]">MA</span>
                )}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#1557A0] text-white flex items-center justify-center shadow hover:bg-[#10437d] transition-colors"
                title="Đổi ảnh đại diện"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-[#1557A0] text-xs font-semibold text-slate-700 transition-colors"
                >
                  Thay đổi ảnh đại diện
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors"
                >
                  Xóa ảnh
                </button>
              </div>
              <p className="text-[11px] text-slate-400 max-w-md">
                Định dạng cho phép: JPG, PNG. Dung lượng tối đa: 5MB. Khuyến nghị ảnh thẻ hoặc chân dung sinh viên rõ mặt để tạo độ tin cậy trong trao đổi.
              </p>
            </div>
          </div>

          {/* Form Thông tin */}
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Họ và tên */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#1557A0] focus:ring-2 focus:ring-[#1557A0]/10 pr-9"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Tên hiển thị công khai trên các tin đăng giáo trình và thiết bị.
                </p>
              </div>

              {/* Số điện thoại */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#1557A0] focus:ring-2 focus:ring-[#1557A0]/10 pr-9"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Dùng để liên hệ trao đổi học liệu khi cần thiết và nhận mã OTP xác nhận.
                </p>
              </div>

              {/* Email liên hệ */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email liên hệ <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#1557A0] focus:ring-2 focus:ring-[#1557A0]/10 pr-9"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Email dùng để nhận thông báo phản hồi từ người mua và người bán.
                </p>
              </div>

              {/* Trường Đại học */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Trường Đại học <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="ví dụ: ĐH Bách Khoa, ĐH Kinh tế - Luật..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#1557A0] focus:ring-2 focus:ring-[#1557A0]/10 pr-9"
                  />
                  <Building2 className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Trường đại học của bạn trong hệ thống ĐHQG-HCM hoặc lân cận.
                </p>
              </div>

            </div>

            {/* Banner xác thực cấp độ cao nhất */}
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#1557A0] text-white flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900">Tài khoản sinh viên đã xác thực cấp độ cao nhất</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bạn có thể tự do đăng tin Bán, Tặng hoặc Trao đổi học liệu trong hệ thống ĐHQG-HCM, đồng thời được gắn huy hiệu xác minh uy tín trong toàn bộ phiên trao đổi tại Ký túc xá khu A & khu B.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#1557A0] hover:bg-[#10437d] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Lưu thay đổi</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};
