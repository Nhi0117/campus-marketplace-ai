import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ListFilter, Bookmark, MessageSquare, History, Sparkles, Shield, LogOut } from 'lucide-react';
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

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
      {/* Box user info mini */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 border-2 border-[#1557A0]/20 flex items-center justify-center overflow-hidden mb-3">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xl font-bold text-[#1557A0]">{user?.initials || 'SV'}</span>
          )}
        </div>
        <h3 className="font-bold text-base text-slate-900">{user?.name || 'Sinh viên ĐHQG'}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{user?.schoolName || 'Đại học Quốc gia TP.HCM'}</p>

        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-[#1557A0] bg-[#EBF4FF]">
          <Shield className="w-3 h-3 text-[#1557A0]" />
          Đã xác thực email sinh viên ĐHQG
        </div>
      </div>

      {/* Navigation menu */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-2 shadow-sm">
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
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#EBF4FF] text-[#1557A0] border-l-4 border-[#1557A0]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
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
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors mt-2 text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất</span>
          </button>
        </nav>
      </div>

      {/* Info card sinh viên */}
      <div className="p-4 rounded-2xl bg-[#EBF4FF]/60 border border-blue-100 text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <Shield className="w-4 h-4 text-[#1557A0]" />
          <span>Sinh viên ĐHQG</span>
        </div>
        <p className="text-slate-600 text-[11px] leading-relaxed">
          Tài khoản sinh viên đã xác thực SSO ĐHQG-HCM.
        </p>
      </div>

      {/* Hỗ trợ */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 text-xs space-y-1.5">
        <div className="font-semibold text-slate-800">Cần hỗ trợ hồ sơ?</div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Liên hệ phòng hỗ trợ sinh viên ĐHQG nếu phát hiện sai lệch dữ liệu học vụ.
        </p>
      </div>
    </aside>
  );
};
