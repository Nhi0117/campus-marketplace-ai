import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, MessageSquare, ChevronDown, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import { CATEGORIES } from '../../data/categories';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const initials = user?.initials || (user?.name ? user.name.split(' ').map(w => w[0]).slice(-2).join('') : 'SV');

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#1557A0] flex items-center justify-center shadow-md">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <span className="font-black text-sm text-[#1557A0] tracking-tight block">
                Campus Marketplace<sup className="text-[9px] font-bold text-blue-400">AI</sup>
              </span>
              <span className="text-[9px] text-slate-500 font-medium tracking-wide block">Buy • Sell • Connect</span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 ml-2">
            <Link
              to="/"
              className={`text-sm font-semibold px-3 py-2 rounded-lg transition ${
                location.pathname === '/' ? 'text-[#1557A0]' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Trang chủ
            </Link>

            {/* Danh mục dropdown */}
            <div className="relative" onMouseLeave={() => setIsCategoryOpen(false)}>
              <button
                onMouseEnter={() => setIsCategoryOpen(true)}
                className="flex items-center gap-1 text-sm font-semibold px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 transition"
              >
                Danh mục <ChevronDown className="w-4 h-4" />
              </button>

              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                  {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                    <Link
                      key={cat.id}
                      to={`/products?category=${cat.id}`}
                      onClick={() => setIsCategoryOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#1557A0] transition"
                    >
                      <span className="text-base">{cat.icon}</span>
                      <div>
                        <div className="font-semibold text-sm">{cat.name}</div>
                        <div className="text-[11px] text-slate-400">{cat.description}</div>
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <Link
                      to="/products"
                      onClick={() => setIsCategoryOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#1557A0] font-semibold hover:bg-blue-50 transition"
                    >
                      Xem tất cả danh mục →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-lg hidden md:flex">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm giáo trình, máy tính, đồ dùng sinh viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm text-slate-800 focus:bg-white focus:border-[#1557A0] focus:ring-2 focus:ring-[#1557A0]/15 focus:outline-none transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            </div>
          </form>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2 ml-auto">
            {user ? (
              <>
                {/* Notification */}
                <button className="relative p-2 text-slate-600 hover:text-[#1557A0] rounded-full hover:bg-slate-100 transition">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* Chat */}
                <Link to="/chat" className="p-2 text-slate-600 hover:text-[#1557A0] rounded-full hover:bg-slate-100 transition">
                  <MessageSquare className="w-5 h-5" />
                </Link>

                {/* Post listing */}
                <Link to="/create-listing">
                  <Button variant="campus" size="sm">Đăng tin</Button>
                </Link>

                {/* Avatar dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="w-9 h-9 rounded-full bg-[#1557A0] text-white text-sm font-bold flex items-center justify-center hover:opacity-90 transition"
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                    ) : (
                      initials
                    )}
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-slate-100 mb-1">
                        <p className="text-xs font-bold text-slate-800">{user.name}</p>
                        <p className="text-[11px] text-[#1557A0]">{user.schoolName}</p>
                      </div>
                      <Link to="/settings" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">Hồ sơ cá nhân</Link>
                      <Link to="/manage-listings" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">Quản lý tin của tôi</Link>
                      <Link to="/saved" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">Tin đã lưu</Link>
                      <Link to="/transactions" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">Lịch sử giao dịch</Link>
                      {user.isAdmin && (
                        <Link to="/admin" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50">Bảng điều khiển Admin</Link>
                      )}
                      <div className="border-t border-slate-100 mt-1">
                        <button onClick={() => { logout(); setIsUserMenuOpen(false); navigate('/'); }} className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition">
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">Đăng nhập</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="sm">Đăng ký</Button>
                </Link>
                <Link to="/create-listing">
                  <Button variant="campus" size="sm">Đăng tin</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile search */}
          <form onSubmit={handleSearch} className="flex-1 md:hidden">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-9 pr-3 text-sm"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};
