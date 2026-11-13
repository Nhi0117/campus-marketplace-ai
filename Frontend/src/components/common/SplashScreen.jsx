import React, { useState, useEffect } from 'react';

export const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 500); // Đợi fade-out 500ms
    }, 1200); // Hiện 1.2s

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      onClick={() => {
        setFadeOut(true);
        setTimeout(() => { if (onFinish) onFinish(); }, 300);
      }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between py-12 px-4 bg-gradient-to-b from-[#EFF6FF] via-[#E0EFFF] to-[#D5E7FF] transition-opacity duration-500 cursor-pointer ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div />

      {/* Trung tâm: Logo đầy đủ */}
      <div className="flex flex-col items-center justify-center text-center animate-fade-in">
        <img
          src="/logo.svg"
          alt="Campus Marketplace AI"
          className="h-24 sm:h-32 md:h-40 w-auto object-contain drop-shadow-sm mb-4"
        />
        <div className="flex items-center gap-2 mt-4 text-[#1557A0] text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#1557A0] animate-ping" />
          <span>Đang tải nền tảng trao đổi sinh viên ĐHQG-HCM...</span>
        </div>
      </div>

      {/* Dưới đáy: Copyright */}
      <p className="text-[12px] text-slate-500 font-medium">
        © 2026 Campus Marketplace AI. All rights reserved.
      </p>
    </div>
  );
};
