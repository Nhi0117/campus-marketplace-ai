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
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (updateUser) {
      updateUser({
        name: fullName,
        phone,
        email,
        schoolName,
        avatar,
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
              <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-slate-200 shadow-inner flex items-center justify-center overflow-hidden">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-extrabold text-[#1557A0]">
                    {user?.initials || fullName.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#1557A0] text-white flex items-center justify-center shadow hover:bg-[#10437d] transition-colors cursor-pointer"
                title="Tải ảnh đại diện từ máy"
              >
                <Camera className="w-4 h-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <label
                  htmlFor="avatar-upload"
                  className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-[#1557A0] text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  Thay đổi ảnh đại diện
                </label>
                {avatar && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors"
                  >
                    Xóa ảnh
                  </button>
                )}
              </div>
              <p className="text-[11px] text-slate-400 max-w-md">
                Mặc định hệ thống hiển thị tên viết tắt. Bạn có thể tự chọn ảnh từ máy tính (JPG, PNG tối đa 5MB) để tăng tính tin cậy khi trao đổi.
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
