import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ListFilter, Bookmark, MessageSquare, History, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProfileSidebar = ({ activeTab = 'settings' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { id: 'settings', label: 'Hồ sơ cá nhân', path: '/settings', icon: User },
    { id: 'manage-listings', label: 'Tin đăng của tôi', path: '/manage-listings', icon: ListFilter },
    { id: 'saved', label: 'Danh sách đã lưu', path: '/saved', icon: Bookmark },
    { id: 'chat', label: 'Hộp thư & Trao đổi', path: '/chat', icon: MessageSquare, badge: 3 },
    { id: 'transactions', label: 'Lịch sử giao dịch', path: '/transactions', icon: History },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Tạo tên viết tắt (Initials) - Mặc định chỉ hiển thị tên viết tắt, không để avatar người mẫu
  const displayName = user?.name || 'Sinh viên ĐHQG';
  const displaySchool = user?.schoolName || 'Đại học Quốc gia TP.HCM';
  const initials = user?.initials || displayName.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase();

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-4 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* KHỐI 1: Thông tin người dùng (Khớp đúng ảnh người dùng gửi) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs text-center space-y-3">
        {/* Vòng tròn hiển thị chữ viết tắt, bỏ ảnh mẫu */}
        <div className="w-24 h-24 mx-auto rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center overflow-hidden shadow-inner">
          {user?.avatar ? (
            <img src={user.avatar} alt={displayName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-extrabold text-[#1557A0] tracking-wider">
              {initials}
            </span>
          )}
        </div>

        <div>
          <h3 className="font-bold text-lg text-slate-900 tracking-tight">{displayName}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{displaySchool}</p>
        </div>

        <div className="pt-1">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#1557A0] bg-[#EBF4FF] border border-blue-100">
            <Shield className="w-3.5 h-3.5 text-[#1557A0] shrink-0" />
            <span>Đã xác thực email sinh viên ĐHQG</span>
          </div>
        </div>
      </div>

      {/* KHỐI 2: Menu Quản lý tài khoản (Khớp đúng ảnh người dùng gửi) */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-xs">
        <div className="px-3 py-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
          Quản lý tài khoản
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#EBF4FF] text-[#1557A0] font-bold border-l-4 border-[#1557A0]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="w-5 h-5 rounded-full bg-[#1557A0] text-white text-[10px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors mt-2 text-left"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Đăng xuất</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};
