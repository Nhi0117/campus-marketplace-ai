import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Heart, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../../components/common/ProductCard';
import { ProfileSidebar } from './ProfileSidebar';

export const SavedListingsPage = () => {
  const { savedProducts } = useAuth();

  const savedList = PRODUCTS.filter(p => savedProducts.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link to="/" className="hover:text-slate-800">Trang chủ</Link>
        <span>›</span>
        <span>Quản lý tài khoản</span>
        <span>›</span>
        <span className="font-semibold text-slate-800">Danh sách đã lưu</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar */}
        <ProfileSidebar activeTab="saved" />

        {/* Nội dung chính */}
        <div className="flex-1 w-full bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Danh sách đã lưu</h1>
              <p className="text-xs text-slate-500 mt-1">
                Các học liệu và thiết bị học tập bạn quan tâm để trao đổi sau.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#EBF4FF] text-[#1557A0] text-xs font-bold">
              {savedList.length} tin đã lưu
            </span>
          </div>

          {savedList.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                <Bookmark className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-700">Chưa có tin đăng nào được lưu</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Bấm vào biểu tượng trái tim ở góc thẻ sản phẩm để lưu lại học liệu bạn quan tâm.
              </p>
              <Link
                to="/products"
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1557A0] text-white text-xs font-semibold hover:bg-[#10437d] transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Khám phá học liệu ngay
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">
              {savedList.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
