import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, MessageSquare, ChevronDown, CheckCircle2, Clock, X, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import { CATEGORIES } from '../../data/categories';
import { CategoryIcon } from '../common/CategoryIcon';
import { getImageUrl } from '../../utils/format';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Tin đăng đã được duyệt',
    message: 'Giáo trình Kinh tế vi mô (#L1) của bạn đã được kiểm duyệt và hiển thị công khai.',
    time: '10 phút trước',
    isRead: false,
    type: 'success',
  },
  {
    id: 2,
    title: 'Tin nhắn mới',
    message: 'Hoàng Nam: "Giá 85.000đ có thương lượng được không bạn?"',
    time: '45 phút trước',
    isRead: false,
    type: 'chat',
    link: '/chat',
  },
  {
    id: 3,
    title: 'Giao dịch hoàn tất',
    message: 'Giao dịch "Vở ghi chép Xác suất thống kê" với Thu Hà đã hoàn tất. Hãy đánh giá người bán!',
    time: '2 giờ trước',
    isRead: true,
    type: 'order',
    link: '/rating/tx_2',
  },
];

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handlePostListingClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowAuthModal(true);
    }
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const initials = user?.initials || (user?.name ? user.name.split(' ').map(w => w[0]).slice(-2).join('') : 'SV');

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            
            {/* Logo chuẩn Figma */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src={getImageUrl('/logo.svg')}
                alt="Campus Marketplace AI"
                className="h-10 sm:h-11 w-auto object-contain"
              />
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
                  <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                    {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                      <Link
                        key={cat.id}
                        to={`/products?category=${cat.id}`}
                        onClick={() => setIsCategoryOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-[#1557A0] transition group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-[#1557A0] group-hover:text-white transition">
                          <CategoryIcon id={cat.id} className="w-4 h-4 text-slate-700 group-hover:text-white transition" strokeWidth={2.2} />
                        </div>
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
            <div className="hidden md:flex items-center gap-3 ml-auto">
              {user ? (
                <>
                  {/* Notification Icon & Dropdown Popup */}
                  <div className="relative">
                    <button
                      onClick={() => setIsNotifOpen(!isNotifOpen)}
                      className="relative p-2 text-slate-600 hover:text-[#1557A0] rounded-full hover:bg-slate-100 transition"
                      title="Thông báo"
                    >
                      <Bell className="w-5 h-5" />
                      {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                      )}
                    </button>

                    {/* Popup Thông báo */}
                    {isNotifOpen && (
                      <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50">
                        <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">Thông báo</span>
                            {unreadCount > 0 && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1557A0] text-white">
                                {unreadCount} mới
                              </span>
                            )}
                          </div>
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllRead}
                              className="text-[11px] text-[#1557A0] hover:underline font-semibold"
                            >
                              Đánh dấu đã đọc
                            </button>
                          )}
                        </div>

                        <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                          {notifications.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => {
                                if (item.link) {
                                  navigate(item.link);
                                  setIsNotifOpen(false);
                                }
                              }}
                              className={`p-3.5 text-xs transition-colors cursor-pointer ${
                                !item.isRead ? 'bg-blue-50/50 hover:bg-blue-50' : 'hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <span className={`font-bold ${!item.isRead ? 'text-[#1557A0]' : 'text-slate-800'}`}>
                                  {item.title}
                                </span>
                                <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                              </div>
                              <p className="text-slate-600 mt-1 leading-snug">{item.message}</p>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 px-4 border-t border-slate-100 text-center">
                          <Link
                            to="/manage-listings"
                            onClick={() => setIsNotifOpen(false)}
                            className="text-xs text-[#1557A0] font-semibold hover:underline"
                          >
                            Xem tất cả hoạt động →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Chat Icon */}
                  <Link
                    to="/chat"
                    className="p-2 text-slate-600 hover:text-[#1557A0] rounded-full hover:bg-slate-100 transition relative"
                    title="Hộp thư"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </Link>

                  {/* Post listing button */}
                  <Link to="/create-listing">
                    <Button variant="campus" size="sm">Đăng tin</Button>
                  </Link>

                  {/* Avatar dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="w-9 h-9 rounded-full bg-[#1557A0] text-white text-sm font-bold flex items-center justify-center hover:opacity-90 transition shadow-sm"
                    >
                      {user.avatar ? (
                        <img src={user.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                      ) : (
                        initials
                      )}
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                        <div className="px-4 py-2 border-b border-slate-100 mb-1">
                          <p className="text-xs font-bold text-slate-900">{user.name}</p>
                          <p className="text-[11px] text-[#1557A0] font-medium">{user.schoolName}</p>
                        </div>
                        <Link to="/settings" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">Hồ sơ cá nhân</Link>
                        <Link to="/manage-listings" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">Quản lý tin của tôi</Link>
                        <Link to="/saved" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">Tin đã lưu</Link>
                        <Link to="/transactions" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">Lịch sử giao dịch</Link>
                        
                        {user.isAdmin && (
                          <Link to="/admin" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50">
                            🛡️ Bảng điều khiển Admin
                          </Link>
                        )}

                        <div className="border-t border-slate-100 mt-1">
                          <button
                            onClick={() => { logout(); setIsUserMenuOpen(false); navigate('/'); }}
                            className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition"
                          >
                            Đăng xuất
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`inline-flex items-center justify-center font-semibold rounded-xl text-xs px-3.5 py-2 transition-all ${
                      location.pathname === '/login'
                        ? 'bg-[#1557A0] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className={`inline-flex items-center justify-center font-semibold rounded-xl text-xs px-3.5 py-2 transition-all ${
                      location.pathname === '/register'
                        ? 'bg-[#1557A0] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Đăng ký
                  </Link>
                  <button
                    onClick={handlePostListingClick}
                    className="inline-flex items-center justify-center font-semibold rounded-xl text-xs px-3.5 py-2 gap-1.5 bg-[#1557A0] text-white hover:bg-[#0F3E73] shadow-sm transition-all"
                  >
                    Đăng tin
                  </button>
                </>
              )}
            </div>

            {/* Mobile search bar */}
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

      {/* Modal yêu cầu đăng nhập khi chưa có tài khoản mà muốn đăng tin */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100 animate-slide-up">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#1557A0] font-bold text-sm">
                <AlertCircle className="w-5 h-5 text-[#1557A0]" />
                <span>Bạn chưa đăng nhập</span>
              </div>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Để đảm bảo an toàn giao dịch học liệu trong khuôn viên ĐHQG-HCM, bạn cần <strong>đăng nhập</strong> hoặc <strong>tạo tài khoản sinh viên</strong> trước khi đăng tin.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                to="/login"
                onClick={() => setShowAuthModal(false)}
                className="py-2.5 px-4 rounded-xl border border-[#1557A0] text-[#1557A0] hover:bg-blue-50 text-xs font-bold text-center transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                onClick={() => setShowAuthModal(false)}
                className="py-2.5 px-4 rounded-xl bg-[#1557A0] text-white hover:bg-[#10437d] text-xs font-bold text-center transition-colors shadow-sm"
              >
                Tạo tài khoản mới
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};