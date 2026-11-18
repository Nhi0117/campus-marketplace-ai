import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../hooks/useProducts';
import { formatCurrency, formatTimeAgo, getImageUrl } from '../../utils/format';
import { ShieldCheck, Star, Edit, Eye, EyeOff, Trash2, RefreshCw, Sparkles, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { ProfileSidebar } from './ProfileSidebar';

const STATUS_MAP = {
  active:    { label: 'Đang hiển thị',         cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  pending:   { label: 'Chờ duyệt',             cls: 'bg-amber-100 text-amber-700 border-amber-200' },
  need_edit: { label: 'Cần chỉnh sửa',         cls: 'bg-orange-100 text-orange-700 border-orange-200' },
  rejected:  { label: 'Bị từ chối',            cls: 'bg-red-100 text-red-700 border-red-200' },
  hidden:    { label: 'Đã ẩn',                 cls: 'bg-slate-100 text-slate-600 border-slate-200' },
  done:      { label: 'Đã hoàn tất / Giao dịch', cls: 'bg-blue-100 text-blue-700 border-blue-200' },
  deleted:   { label: 'Đã xóa',               cls: 'bg-slate-100 text-slate-500 border-slate-200' },
};

const TABS = [
  { id: 'all',       label: 'Tất cả' },
  { id: 'active',    label: 'Đang hiển thị' },
  { id: 'pending',   label: 'Chờ duyệt' },
  { id: 'need_edit', label: 'Cần chỉnh sửa' },
  { id: 'rejected',  label: 'Bị từ chối' },
  { id: 'hidden',    label: 'Đã ẩn' },
  { id: 'done',      label: 'Đã hoàn tất / Giao dịch' },
  { id: 'deleted',   label: 'Đã xóa' },
];

export const ManageListingsPage = () => {
  const { user } = useAuth();
  const { products, updateProductStatus, deleteProduct } = useProducts();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const myProducts = products.filter(p => {
    if (!user) return p.seller?.id === 'guest' || p.seller?.id === 'user_1';
    return (
      p.seller?.id === user?.id ||
      p.seller?.name === user?.shortName ||
      p.seller?.name === user?.name ||
      p.seller?.email === user?.email ||
      (user?.id === 'user_1' && (p.seller?.id === 'user_1' || p.seller?.name === 'Gia Bảo'))
    );
  });

  const filtered   = activeTab === 'all' ? myProducts : myProducts.filter(p => p.status === activeTab);
  const tabCount = (id) => id === 'all' ? myProducts.length : myProducts.filter(p => p.status === id).length;

  const handleCancelListing = (id, title) => {
    if (window.confirm(`Bạn có chắc chắn muốn hủy đăng tin "${title}" không? Sau khi hủy, tin sẽ được chuyển sang danh sách Đã hủy và gỡ khỏi chợ sinh viên.`)) {
      updateProductStatus(id, 'deleted');
    }
  };

  const handlePermanentDelete = (id, title) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn tin "${title}" khỏi hệ thống không? Hành động này không thể hoàn tác.`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link to="/" className="hover:text-slate-800">Trang chủ</Link>
        <span>›</span>
        <span>Quản lý tài khoản</span>
        <span>›</span>
        <span className="font-semibold text-slate-800">Tin đăng của tôi</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar */}
        <ProfileSidebar activeTab="manage-listings" />

        {/* ── Main ── */}
        <div className="flex-1 w-full bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Tin đăng của tôi</h1>
              <p className="text-xs text-slate-500 mt-1">Theo dõi trạng thái duyệt tin, quản lý tin đang bán, tặng, trao đổi học liệu trong hệ thống ĐHQG-HCM.</p>
            </div>
            <Link
              to="/create-listing"
              className="px-4 py-2 rounded-xl bg-[#1557A0] hover:bg-[#10437d] text-white text-xs font-bold transition-all shadow-sm"
            >
              + Đăng tin mới
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1 ${
                  activeTab === tab.id ? 'bg-white text-[#1557A0] shadow-sm font-bold' : 'text-slate-600 hover:text-slate-800'
                }`}>
                {tab.label}
                {tabCount(tab.id) > 0 && (
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.id ? 'bg-[#1557A0] text-white' : 'bg-slate-200 text-slate-600'
                  }`}>{tabCount(tab.id)}</span>
                )}
              </button>
            ))}
          </div>

          {/* Search & Filter bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="text" placeholder="Tìm theo tên học liệu, mã tin #L..." className="flex-1 border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-[#1557A0]" />
            <select className="border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none">
              <option>Tất cả danh mục</option>
              <option>Học liệu</option>
              <option>Thiết bị học tập</option>
              <option>Đồ dùng học tập</option>
            </select>
            <select className="border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none">
              <option>Loại tin: Tất cả</option>
              <option>Bán</option>
              <option>Tặng</option>
              <option>Trao đổi</option>
            </select>
            <button className="text-xs text-[#1557A0] font-semibold hover:underline whitespace-nowrap">⟳ Đặt lại bộ lọc</button>
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
              <p className="text-3xl">📭</p>
              <p className="text-sm font-semibold text-slate-600">Không có tin đăng nào trong mục này</p>
              <Link to="/create-listing"><Button variant="campus" size="sm">Đăng tin mới</Button></Link>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-slate-600 font-black">Ảnh &amp; Học liệu / Sản phẩm</th>
                    <th className="text-left px-3 py-3 text-slate-600 font-black hidden sm:table-cell">Loại &amp; Danh mục</th>
                    <th className="text-left px-3 py-3 text-slate-600 font-black hidden md:table-cell">Giá / Hình thức</th>
                    <th className="text-left px-3 py-3 text-slate-600 font-black">Trạng thái tin</th>
                    <th className="text-left px-3 py-3 text-slate-600 font-black hidden lg:table-cell">Ngày cập nhật</th>
                    <th className="text-left px-3 py-3 text-slate-600 font-black">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map(prod => {
                    const st = STATUS_MAP[prod.status] || STATUS_MAP.active;
                    return (
                      <tr key={prod.id} className="hover:bg-slate-50/60 transition">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Link to={`/products/${prod.id}`} className="shrink-0 group">
                              {prod.images && prod.images.length > 0 && prod.images[0] ? (
                                <img
                                  src={encodeURI(getImageUrl(prod.images[0]))}
                                  alt=""
                                  className="w-14 h-12 rounded-xl object-cover border border-slate-200 group-hover:opacity-90 transition"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = getImageUrl('/image/products/gt_kinh_te_vi_mo.jfif');
                                  }}
                                />
                              ) : (
                                <div className="w-14 h-12 rounded-xl bg-slate-100 flex flex-col items-center justify-center text-slate-400 border border-slate-200">
                                  <ImageIcon className="w-4 h-4 text-slate-300" />
                                  <span className="text-[8px] font-medium text-slate-400 mt-0.5">Không ảnh</span>
                                </div>
                              )}
                            </Link>
                            <div className="min-w-0">
                              <Link to={`/products/${prod.id}`} className="font-bold text-slate-800 line-clamp-2 leading-snug hover:text-[#1557A0] transition">
                                {prod.title}
                              </Link>
                              <p className="text-slate-400 mt-0.5">Mã tin: #{prod.id.slice(-4).toUpperCase()}</p>
                              {prod.status === 'need_edit' && (
                                <p className="text-orange-600 text-[11px] mt-1 font-semibold">⚠ Ghi chú từ BQT: Vui lòng chụp lại ảnh rõ hơn...</p>
                              )}
                              {prod.status === 'rejected' && (
                                <p className="text-red-600 text-[11px] mt-1 font-semibold">✗ Lý do: Hình ảnh chứa link bán hàng ngoài khu ĐHQG.</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 hidden sm:table-cell">
                          <div className="space-y-1">
                            <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full ${
                              prod.listingType === 'sell' ? 'bg-[#1557A0] text-white' : prod.listingType === 'give' ? 'bg-emerald-600 text-white' : 'bg-slate-500 text-white'
                            }`}>
                              {prod.listingType === 'sell' ? 'Bán' : prod.listingType === 'give' ? 'Tặng' : 'Trao đổi'}
                            </span>
                            <p className="text-slate-500">{prod.categoryId.replace(/-/g, ' ')}</p>
                          </div>
                        </td>
                        <td className="px-3 py-3 hidden md:table-cell">
                          {prod.listingType === 'give' ? (
                            <span className="font-black text-emerald-600">0 VND<br /><span className="text-xs font-semibold text-slate-500">(Miễn phí)</span></span>
                          ) : prod.listingType === 'trade' ? (
                            <span className="text-slate-500 font-semibold">Trao đổi</span>
                          ) : (
                            <span className="font-black text-[#1557A0]">{formatCurrency(prod.price)}</span>
                          )}
                        </td>
                        <td className="px-3 py-3">
                          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${st.cls}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {st.label}
                          </span>
                          {prod.status === 'pending' && <p className="text-[11px] text-slate-400 mt-0.5">Ước tính 2–4 giờ</p>}
                        </td>
                        <td className="px-3 py-3 hidden lg:table-cell text-slate-500">{formatTimeAgo(prod.createdAt)}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {/* Cho phép user luôn bấm vào xem lại tin đăng ở bất kỳ trạng thái nào */}
                            <Link
                              to={`/products/${prod.id}`}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1557A0] bg-blue-50 border border-blue-200 px-2 py-1 rounded-lg hover:bg-blue-100 transition"
                              title="Bấm để xem lại chi tiết tin đăng"
                            >
                              <Eye className="w-3.5 h-3.5" /> Xem lại
                            </Link>

                            {/* Cho phép yêu cầu hủy / xóa tin đăng */}
                            {prod.status !== 'deleted' ? (
                              <button
                                onClick={() => handleCancelListing(prod.id, prod.title)}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-1 rounded-lg hover:bg-rose-100 transition"
                                title="Yêu cầu hủy đăng tin này"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Hủy tin
                              </button>
                            ) : (
                              <button
                                onClick={() => handlePermanentDelete(prod.id, prod.title)}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-1 rounded-lg hover:bg-slate-200 transition"
                                title="Xóa vĩnh viễn tin đăng khỏi danh sách"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Xóa hẳn
                              </button>
                            )}

                            {prod.status === 'need_edit' && (
                              <Link to={`/create-listing`} className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg hover:bg-amber-100 transition">
                                <Edit className="w-3 h-3" /> Sửa
                              </Link>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 text-xs text-slate-500">
                <span>Hiển thị 1 – {filtered.length} của {filtered.length} tin đăng</span>
                <div className="flex items-center gap-1.5">
                  <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition shadow-2xs">
                    <ChevronLeft className="w-3.5 h-3.5" /> Trước
                  </button>
                  <button className="w-8 h-8 bg-[#1557A0] text-white rounded-xl font-bold text-xs shadow-xs">1</button>
                  <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition shadow-2xs">
                    Sau <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* AI Tip Banner */}
          <div className="bg-[#EBF4FF] rounded-2xl border border-blue-100 p-4 flex items-start gap-3">
            <div className="p-1.5 bg-[#1557A0] rounded-lg shrink-0">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">AI Campus Assistant Gợi Ý</p>
              <p className="text-xs text-slate-600 mt-0.5">Các tin đăng có hình ảnh chụp rõ ràng và mô tả chi tiết được duyệt nhanh hơn 45% và tiếp cận sinh viên ĐHQG hiệu quả gấp 2 lần.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
