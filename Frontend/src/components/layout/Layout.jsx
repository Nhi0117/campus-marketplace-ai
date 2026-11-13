import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AIChatbot } from '../ai/AIChatbot';
import { SplashScreen } from '../common/SplashScreen';
import { useAuth } from '../../context/AuthContext';

export const Layout = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Nếu tài khoản Admin đang đăng nhập và không phải đang cố tình xem trước trang sinh viên
  // thì tự động chuyển thẳng sang khu vực Quản trị Admin (/admin), bỏ qua toàn bộ trang của khách/người dùng
  const isPreviewMode = new URLSearchParams(location.search).get('view') === 'student';
  if (user?.isAdmin && !isPreviewMode) {
    return <Navigate to="/admin" replace />;
  }

  const [showSplash, setShowSplash] = useState(() => {
    // Chỉ hiện splash screen 1 lần đầu khi mở tab mới
    return !sessionStorage.getItem('has_seen_splash');
  });

  const [isPageLoading, setIsPageLoading] = useState(false);

  // Cuộn lên đầu trang và kích hoạt hiệu ứng tải trang khi đổi URL
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsPageLoading(true);
    const timer = setTimeout(() => setIsPageLoading(false), 250);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleFinishSplash = () => {
    sessionStorage.setItem('has_seen_splash', 'true');
    setShowSplash(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 relative">
      {/* Màn hình Splash Screen mở đầu */}
      {showSplash && <SplashScreen onFinish={handleFinishSplash} />}

      {/* Thanh loading bar mượt mà khi chuyển trang */}
      {isPageLoading && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-[#1557A0] via-sky-400 to-[#1557A0] animate-pulse" />
      )}

      <Navbar />

      <main className="flex-1 transition-opacity duration-200">
        <Outlet />
      </main>

      <Footer />

      {/* Floating AI Chatbot Widget (AI01) */}
      <AIChatbot />
    </div>
  );
};
