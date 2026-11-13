import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-white border-t border-slate-200 mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Col 1: Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1557A0] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-[#1557A0] text-base">
              Campus Marketplace<sup className="text-[9px]">AI</sup>
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
            Nền tảng mua bán, tặng và trao đổi học liệu, đồ dùng dành riêng cho cộng đồng sinh viên ĐHQG-HCM.
          </p>
        </div>

        {/* Col 2: Quick links */}
        <div>
          <h4 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wide">Liên kết nhanh</h4>
          <ul className="space-y-2 text-xs text-slate-500">
            <li><Link to="/" className="hover:text-[#1557A0] transition">Trang chủ</Link></li>
            <li><Link to="/products?category=hoc-lieu" className="hover:text-[#1557A0] transition">Danh mục học liệu</Link></li>
            <li><Link to="/products?category=thiet-bi-hoc-tap" className="hover:text-[#1557A0] transition">Đồ dùng học tập</Link></li>
            <li><Link to="/products?listingType=give" className="hover:text-[#1557A0] transition">Góc tặng &amp; trao đổi</Link></li>
          </ul>
        </div>

        {/* Col 3: Contact */}
        <div>
          <h4 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wide">Liên Hệ &amp; Hỗ Trợ</h4>
          <ul className="space-y-2 text-xs text-slate-500">
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#1557A0]" />
              <span>hotro@campusai.vnuhcm.edu.vn</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#1557A0]" />
              <span>(028) 3724 2160 (Nhánh 104)</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
        <p>© 2026 Campus Marketplace AI. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link to="#" className="hover:text-slate-600 transition">Điều khoản dịch vụ</Link>
          <Link to="#" className="hover:text-slate-600 transition">Chính sách bảo mật sinh viên</Link>
          <Link to="#" className="hover:text-slate-600 transition">Quy chuẩn học liệu nội bộ</Link>
        </div>
      </div>
    </div>
  </footer>
);
