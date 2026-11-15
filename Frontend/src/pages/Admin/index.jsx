import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, XCircle, CheckCircle2, Clock, Eye, AlertCircle, Sparkles, Filter, ChevronRight, Check } from 'lucide-react';
import { formatCurrency, formatTimeAgo } from '../../utils/format';
import { AdminSidebar } from './AdminSidebar';
import { useProducts } from '../../hooks/useProducts';

export const AdminPage = () => {
  const { products, updateProductStatus } = useProducts();
  const [selectedId, setSelectedId] = useState(null);
  const [filterTab, setFilterTab] = useState('pending'); // all | pending | approved | rejected
  const [actionAlert, setActionAlert] = useState('');

  const productList = products;
  const pendingCount = productList.filter(p => p.status === 'pending' || p.status === 'need_edit').length;
  const approvedToday = productList.filter(p => p.status === 'active').length;
  const rejectedCount = productList.filter(p => p.status === 'rejected').length;

  const filteredProducts = productList.filter(p => {
    if (filterTab === 'pending') return p.status === 'pending' || p.status === 'need_edit';
    if (filterTab === 'approved') return p.status === 'active';
    if (filterTab === 'rejected') return p.status === 'rejected';
    return true;
  });

  const currentSelectedId = selectedId && filteredProducts.some(p => p.id === selectedId)
    ? selectedId
    : (filteredProducts[0]?.id || null);

  const selectedProduct = productList.find(p => p.id === currentSelectedId) || filteredProducts[0] || null;

  const handleApprove = (id) => {
    updateProductStatus(id, 'active');
    setActionAlert('Đã duyệt và công khai tin đăng lên trang chủ & danh mục sản phẩm!');
    setTimeout(() => setActionAlert(''), 3500);
  };

  const handleReject = (id) => {
    updateProductStatus(id, 'rejected');
    setActionAlert('Đã từ chối tin đăng và ghi nhận lý do.');
    setTimeout(() => setActionAlert(''), 3500);
  };

  return (
    <div className="flex bg-slate-50 min-h-[calc(100vh-64px)]">
      {/* Sidebar Admin */}
      <AdminSidebar activeTab="listings" />

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        
        {/* Header Admin */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-slate-900">Kiểm duyệt tin đăng</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                VNUHCM Portal
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Xem xét nội dung, kiểm tra bản quyền học liệu và duyệt tin đăng trước khi hiển thị.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-bold text-slate-900 block">Admin ĐHQG</span>
              <span className="text-[11px] text-slate-400">Quản trị viên ĐHQG</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#1557A0] text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-xs font-semibold text-slate-400">Chờ duyệt</span>
            <div className="text-2xl font-bold text-amber-600 mt-1">{pendingCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-xs font-semibold text-slate-400">Đã duyệt hôm nay</span>
            <div className="text-2xl font-bold text-emerald-600 mt-1">{approvedToday}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-xs font-semibold text-slate-400">Bị từ chối</span>
            <div className="text-2xl font-bold text-red-600 mt-1">{rejectedCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-xs font-semibold text-slate-400">Tổng tin đăng</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">{productList.length}</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-5">
          <button
            onClick={() => setFilterTab('pending')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterTab === 'pending'
                ? 'bg-[#1557A0] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Chờ duyệt ({pendingCount})
          </button>
          <button
            onClick={() => setFilterTab('approved')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterTab === 'approved'
                ? 'bg-[#1557A0] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Đã duyệt
          </button>
          <button
            onClick={() => setFilterTab('rejected')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterTab === 'rejected'
                ? 'bg-[#1557A0] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Từ chối
          </button>
          <button
            onClick={() => setFilterTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterTab === 'all'
                ? 'bg-[#1557A0] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Tất cả
          </button>
        </div>

        {/* Two-Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* CỘT TRÁI: Danh sách chờ duyệt */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-2 max-h-[680px] overflow-y-auto">
            <div className="px-2 pb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Danh sách tin ({filteredProducts.length})
            </div>

            {filteredProducts.length === 0 ? (
              <p className="p-8 text-center text-xs text-slate-400">Không có tin đăng nào phù hợp bộ lọc.</p>
            ) : (
              filteredProducts.map((p) => {
                const isSelected = p.id === selectedId;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      isSelected
                        ? 'border-[#1557A0] bg-blue-50/50 ring-2 ring-[#1557A0]/10'
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                      <img src={p.images?.[0]} alt={p.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          p.listingType === 'sell' ? 'bg-[#1557A0] text-white' : 'bg-emerald-600 text-white'
                        }`}>
                          {p.listingType === 'sell' ? 'Bán' : p.listingType === 'give' ? 'Tặng' : 'Đổi'}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 truncate">{p.schoolId}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 truncate">{p.title}</h4>
                      <div className="flex items-center justify-between mt-1 text-[11px]">
                        <span className="font-bold text-[#1557A0]">
                          {p.price > 0 ? formatCurrency(p.price) : 'Miễn phí'}
                        </span>
                        <span className="text-slate-400">{formatTimeAgo(p.createdAt)}</span>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* CỘT PHẢI: Chi tiết tin đang chọn để duyệt */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
            {selectedProduct ? (
              <>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">ID: {selectedProduct.id}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      selectedProduct.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                      selectedProduct.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedProduct.status === 'active' ? 'Đã duyệt' : selectedProduct.status === 'pending' ? 'Chờ duyệt' : 'Từ chối'}
                    </span>
                  </div>

                  <Link
                    to={`/products/${selectedProduct.id}`}
                    target="_blank"
                    className="text-xs font-semibold text-[#1557A0] hover:underline inline-flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Xem trang chi tiết
                  </Link>
                </div>

                {/* Info sản phẩm */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900">{selectedProduct.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-[#1557A0]">
                      {selectedProduct.price > 0 ? formatCurrency(selectedProduct.price) : 'Miễn phí'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700 font-medium">
                      Tình trạng: {selectedProduct.condition}
                    </span>
                  </div>
                </div>

                {/* Ảnh đính kèm */}
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-2">Hình ảnh tải lên</span>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedProduct.images?.map((img, i) => (
                      <div key={i} className="aspect-video rounded-xl overflow-hidden border border-slate-200">
                        <img src={img} alt="Detail" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mô tả */}
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-1.5">Mô tả của người bán</span>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                    {selectedProduct.description}
                  </div>
                </div>

                {/* Thông tin người đăng */}
                <div className="p-3.5 rounded-xl bg-[#EBF4FF]/50 border border-blue-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#1557A0] text-white font-bold flex items-center justify-center text-xs">
                      {selectedProduct.seller?.name?.[0] || 'SV'}
                    </div>
                    <div>
                      <span className="font-bold text-slate-800">{selectedProduct.seller?.name}</span>
                      <p className="text-slate-500 text-[11px]">{selectedProduct.schoolName}</p>
                    </div>
                  </div>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                    ✓ Sinh viên đã xác thực SSO
                  </span>
                </div>

                {/* AI Safety Assessment */}
                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-800">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold">Đánh giá an toàn AI: Hợp lệ (Độ tin cậy 98%)</span>
                    <p className="text-[11px] text-emerald-700">
                      Nội dung phù hợp quy chuẩn học liệu ĐHQG-HCM. Không phát hiện từ khóa cấm hoặc hành vi spam.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleReject(selectedProduct.id)}
                    className="px-5 py-2.5 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Từ chối duyệt
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApprove(selectedProduct.id)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Phê duyệt tin đăng
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-slate-400 py-12 text-xs">Chọn một tin đăng bên trái để xem chi tiết.</p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
