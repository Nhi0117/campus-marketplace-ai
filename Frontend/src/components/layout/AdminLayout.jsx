import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, LogOut, ExternalLink, GraduationCap, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AdminSidebar } from '../../pages/Admin/AdminSidebar';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Topbar riêng biệt của Ban Quản Trị Admin */}
      <header className="bg-[#1557A0] text-white h-16 px-4 sm:px-6 flex items-center justify-between shadow-md z-30 shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight block leading-none">
                CampusMarket Admin
              </span>
              <span className="text-[10px] text-blue-200 font-medium">
                Cổng quản trị nội bộ ĐHQG-HCM
              </span>
            </div>
          </Link>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
            ● VNUHCM Portal
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/?view=student"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Mở trang sinh viên</span>
          </Link>

          <div className="flex items-center gap-2.5 pl-3 border-l border-white/20">
            <div className="w-8 h-8 rounded-full bg-white text-[#1557A0] font-bold text-xs flex items-center justify-center shadow-xs">
              AD
            </div>
            <div className="hidden md:block text-left text-xs">
              <strong className="block leading-tight font-bold">Admin ĐHQG</strong>
              <span className="text-[10px] text-blue-200">Quản trị viên hệ thống</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Đăng xuất quản trị"
            className="p-2 rounded-lg bg-white/10 hover:bg-red-500 text-white transition-colors ml-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Thân Admin: Sidebar trái + Outlet nội dung bên phải */}
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
