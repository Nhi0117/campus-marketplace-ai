import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { SCHOOLS } from '../../data/schools';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../../components/common/ProductCard';
import { AIRecommendation } from '../../components/ai/AIRecommendation';

export const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { products } = useProducts();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) navigate(`/products?q=${encodeURIComponent(searchTerm.trim())}`);
    else navigate('/products');
  };

  const newProducts = [...products]
    .filter(p => !p.status || p.status === 'active')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

  const QUICK_TAGS = ['Giáo trình', 'Máy tính cầm tay', 'Đồ ký túc xá...'];

  return (
    <div className="bg-white">
      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="bg-[#EBF4FF] border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left text */}
          <div className="space-y-5">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              Nền tảng chia sẻ học liệu và đồ dùng sinh viên ĐHQG-HCM
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              Trao đổi trực tiếp, tiết kiệm chi phí và kết nối an toàn trong cộng đồng sinh viên Làng Đại học.
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex items-center bg-white border border-slate-300 rounded-full shadow-sm overflow-hidden max-w-md">
              <Search className="w-4 h-4 text-slate-400 ml-4 shrink-0" />
              <input
                type="text"
                placeholder="Tìm giáo trình, máy tính cầm tay, đồ ký túc xa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 py-2.5 px-3 text-sm text-slate-700 bg-transparent focus:outline-none"
              />
              <button type="submit" className="px-5 py-2.5 bg-[#1557A0] hover:bg-[#0F3E73] text-white text-sm font-bold rounded-full m-1 transition">
                Tìm kiếm
              </button>
            </form>

            {/* Quick tags */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-slate-500">Gợi ý nhanh:</span>
              {QUICK_TAGS.map(tag => (
                <button key={tag} onClick={() => navigate(`/products?q=${encodeURIComponent(tag)}`)}
                  className="px-3 py-1 bg-white border border-blue-200 text-blue-700 rounded-full font-medium hover:bg-blue-50 transition">
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Right card panel */}
          <div className="space-y-3">
            {/* VNU Badge */}
            <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#1557A0] flex items-center justify-center text-white text-xs font-black">VNU</div>
                <span className="text-sm font-bold text-slate-800">Cộng đồng Sinh viên ĐHQG-HCM</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-700 font-semibold">
                <CheckCircle className="w-4 h-4" /> Xác thực email trường
              </div>
            </div>

            {/* Mission box */}
            <div className="bg-[#1557A0] text-white rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-blue-200" />
                Cho sinh viên phi lợi nhuận
              </div>
              <p className="text-xs text-blue-100 leading-relaxed">
                Giao lưu trực tiếp an toàn tại khuôn viên KTX Khu A, Khu B và các trường thành viên. Tự thỏa thuận, không phi trung gian.
              </p>
              {/* School filter chips */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {SCHOOLS.filter(s => s.id !== 'ALL').slice(0, 6).map(s => (
                  <button key={s.id} onClick={() => navigate(`/products?school=${s.id}`)}
                    className="px-2.5 py-1 bg-white/15 hover:bg-white/25 text-white text-[11px] font-semibold rounded-full transition">
                    {s.code}
                  </button>
                ))}
                <button onClick={() => navigate('/products')} className="px-2.5 py-1 bg-white/15 hover:bg-white/25 text-white text-[11px] font-semibold rounded-full transition">
                  + Xem tất cả
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-black text-slate-900">Danh mục</h2>
          <Link to="/products" className="text-xs font-semibold text-[#1557A0] flex items-center gap-1 hover:underline">
            Xem tất cả danh mục <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
            <Link key={cat.id} to={`/products?category=${cat.id}`}
              className="flex flex-col items-center gap-3 p-5 bg-[#EBF4FF] rounded-2xl hover:bg-blue-100 hover:shadow-md transition group text-center border border-blue-100">
              <span className="text-3xl">{cat.icon}</span>
              <div>
                <p className="text-sm font-bold text-slate-800 group-hover:text-[#1557A0] transition">{cat.name}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── NEW LISTINGS ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-black text-slate-900">Tin mới đăng</h2>
            <p className="text-xs text-slate-500">Các tin chỉa sẻ học liệu và đồ dùng được cập nhật từ sinh viên</p>
          </div>
          <Link to="/products" className="text-xs font-semibold text-[#1557A0] flex items-center gap-1 hover:underline">
            Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {newProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ─── AI RECOMMENDATIONS ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <AIRecommendation />
      </div>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="bg-[#EBF4FF] border-y border-blue-100 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Cách thức hoạt động</h2>
            <p className="text-sm text-slate-500 mt-1">Giao dịch dễ dàng và thuận tiện chỉ với 3 bước đơn giản</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: '1', title: 'Đăng tin nhanh chóng', desc: 'Chụp ảnh giáo trình hoặc đồ dùng, chọn hình thức Bán/Tặng/Trao đổi. Tặng miễn phí học liệu, Trao đổi học liệu.' },
              { n: '2', title: 'Admin duyệt tin',       desc: 'Đội ngũ kiểm duyệt kiểm tra chất lượng và nội dung phù hợp để đảm bảo môi trường an toàn cho sinh viên.' },
              { n: '3', title: 'Nhắn tin & Tự thỏa thuận', desc: 'Trao đổi trực tiếp, hẹn địa điểm và thỏa giao nhận thoải mái trong khuôn viên các trường hoặc KTX.' },
            ].map(item => (
              <div key={item.n} className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#1557A0] text-white text-lg font-black flex items-center justify-center mx-auto shadow-md">
                  {item.n}
                </div>
                <h3 className="text-base font-black text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#1557A0] rounded-3xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white space-y-1">
            <h3 className="text-xl font-black">Có đồ không dùng đến? Đăng tin ngay</h3>
            <p className="text-sm text-blue-200">Giúp các bạn khóa dưới tiết kiệm chi phí học tập và dọn dẹp phòng ký túc xá hôm nay.</p>
          </div>
          <Link to="/create-listing"
            className="shrink-0 px-6 py-3 bg-white text-[#1557A0] text-sm font-black rounded-xl hover:bg-blue-50 transition shadow flex items-center gap-2">
            + Đăng tin ngay
          </Link>
        </div>
      </section>
    </div>
  );
};
