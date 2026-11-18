import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckSquare, Flag, Users, Settings, LogOut, ShieldCheck, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getImageUrl } from '../../utils/format';

export const AdminSidebar = ({ activeTab = 'listings' }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { id: 'listings', label: 'Duyệt tin đăng', path: '/admin', icon: CheckSquare },
    { id: 'reports', label: 'Xử lý báo cáo', path: '/admin/reports', icon: Flag },
    { id: 'users', label: 'Quản lý tài khoản', path: '/admin/users', icon: Users },
    { id: 'settings', label: 'Cài đặt hệ thống', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-64px)] flex flex-col justify-between shrink-0">
      <div className="p-4 space-y-6">
        {/* Logo Admin */}
        <Link to="/admin" className="block px-2">
          <img src={getImageUrl('/logo.svg')} alt="Campus Marketplace" className="h-9 w-auto object-contain mb-1" />
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Khu vực Quản Trị ĐHQG</span>
        </Link>

        {/* Navigation list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#EBF4FF] text-[#1557A0] border-l-4 border-[#1557A0]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Sidebar */}
      <div className="p-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Hệ thống AI sẵn sàng</span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};
