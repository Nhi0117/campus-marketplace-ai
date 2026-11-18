import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { getImageUrl } from '../../utils/format';

export const Footer = () => (
  <footer className="bg-[#EBF4FF] border-t border-blue-200/60 mt-16 text-slate-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Col 1: Brand Logo & Slogan */}
        <div className="space-y-3.5">
          <Link to="/" className="inline-block">
            <img
              src={getImageUrl('/logo.svg')}
              alt="Campus Marketplace AI"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
            Nền tảng mua bán, tặng và trao đổi học liệu, đồ dùng dành riêng cho cộng đồng sinh viên ĐHQG-HCM.
          </p>
        </div>

        {/* Col 2: Quick links */}
        <div>
          <h4 className="text-xs font-bold text-slate-800 mb-3.5 uppercase tracking-wider">
            Liên kết nhanh
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li><Link to="/" className="hover:text-[#1557A0] transition-colors">Trang chủ</Link></li>
            <li><Link to="/products?category=hoc-lieu" className="hover:text-[#1557A0] transition-colors">Danh mục học liệu</Link></li>
            <li><Link to="/products?category=thiet-bi-hoc-tap" className="hover:text-[#1557A0] transition-colors">Đồ dùng học tập</Link></li>
            <li><Link to="/products?listingType=give" className="hover:text-[#1557A0] transition-colors">Góc tặng &amp; trao đổi</Link></li>
          </ul>
        </div>

        {/* Col 3: Contact */}
        <div>
          <h4 className="text-xs font-bold text-slate-800 mb-3.5 uppercase tracking-wider">
            Liên Hệ &amp; Hỗ Trợ
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#1557A0] shrink-0" />
              <span>hotro@campusai.vnuhcm.edu.vn</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#1557A0] shrink-0" />
              <span>(028) 3724 2160 (Nhánh 104)</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="mt-10 pt-6 border-t border-blue-200/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
        <p>© 2026 Campus Marketplace AI. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link to="#" className="hover:text-[#1557A0] transition-colors">Điều khoản dịch vụ</Link>
          <Link to="#" className="hover:text-[#1557A0] transition-colors">Chính sách bảo mật sinh viên</Link>
          <Link to="#" className="hover:text-[#1557A0] transition-colors">Quy chuẩn học liệu nội bộ</Link>
        </div>
      </div>
    </div>
  </footer>
);
