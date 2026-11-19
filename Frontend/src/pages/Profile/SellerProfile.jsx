import React, { useState, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ShieldCheck, Star, MessageCircle, Flag } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { useAuth } from '../../context/AuthContext';
import { USERS } from '../../data/users';
import { ProductCard } from '../../components/common/ProductCard';

const normalize = (s) => (s || '').toString().trim().toLowerCase();

const getInitials = (name) =>
  (name || 'SV')
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .slice(-2)
    .join('')
    .toUpperCase();

export const SellerProfilePage = () => {
  const [tab, setTab] = useState('listings');
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const nameParam = searchParams.get('name') || '';
  const { products } = useProducts();
  const { usersList } = useAuth();

  // Lọc đúng các tin đăng của người bán: khớp id và (nếu có) khớp tên
  const sellerProducts = useMemo(() => {
    const byId = products.filter(p => String(p.seller?.id) === String(id));
    if (!nameParam) return byId;
    const target = normalize(nameParam);
    const byIdAndName = byId.filter(p => normalize(p.seller?.name) === target);
    if (byIdAndName.length > 0) return byIdAndName;
    // Trường hợp id không khớp nhưng tên khớp
    return products.filter(p => normalize(p.seller?.name) === target);
  }, [products, id, nameParam]);

  const seller = useMemo(() => {
    const sampleSeller = sellerProducts[0]?.seller || {};
    const displayName = nameParam || sampleSeller.name || '';

    // Tìm tài khoản trong hệ thống khớp cả id và tên (tránh nhầm sang tài khoản khác)
    const allUsers = [...(usersList || []), ...USERS];
    const account = allUsers.find(u =>
      String(u.id) === String(id) &&
      (!displayName ||
        normalize(u.name) === normalize(displayName) ||
        normalize(u.shortName) === normalize(displayName))
    );

    const name = account?.name || displayName || 'Sinh viên ĐHQG-HCM';
    return {
      id,
      name,
      shortName: account?.shortName || sampleSeller.name || name,
      schoolName: account?.schoolName || sampleSeller.school || sellerProducts[0]?.schoolName || 'Đại học Quốc gia TP.HCM',
      avatar: null,
      initials: getInitials(sampleSeller.name || name),
      rating: sampleSeller.rating ?? account?.rating ?? 5.0,
      reviewCount: sampleSeller.reviewCount ?? account?.reviewCount ?? 0,
      listingCount: sellerProducts.length,
      positiveRate: account?.positiveRate ?? 100,
      joinedDate: account?.joinedDate || '2024-09-01',
    };
  }, [sellerProducts, usersList, id, nameParam]);

  const sellerListings = sellerProducts.filter(p => !p.status || p.status === 'active');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex gap-1">
        <Link to="/" className="hover:text-[#1557A0]">Trang chủ</Link><span>/</span>
        <span>Người bán</span><span>/</span>
        <span className="text-slate-800 font-medium">{seller.name}</span>
      </nav>

      {/* Profile card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full bg-[#1557A0] text-white text-2xl font-black flex items-center justify-center">
              {seller.initials}
            </div>
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-xl font-black text-slate-900">{seller.name}</h1>
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200">
                🎓 {seller.schoolName}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs">
              <span className="text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" /> Đã xác thực email sinh viên ĐHQG-HCM
              </span>
              <span className="flex items-center gap-1 text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {seller.rating} / 5.0 ({seller.reviewCount} đánh giá từ sinh viên ĐHQG)
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto sm:mx-0 mt-3">
              {[
                { label: 'Tin đã đăng',           value: seller.listingCount },
                { label: 'Phản hồi tích cực',     value: `${seller.positiveRate}%` },
                { label: 'Thành viên từ',         value: `T${seller.joinedDate?.slice(5, 7)}/${seller.joinedDate?.slice(0, 4)}` },
              ].map(s => (
                <div key={s.label} className="text-center bg-blue-50 rounded-xl p-2.5 border border-blue-100">
                  <p className="text-base font-black text-[#1557A0]">{s.value}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 mt-3">
              <Link to="/chat">
                <button className="bg-[#1557A0] text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-[#0F3E73] transition flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Nhắn tin qua hệ thống
                </button>
              </Link>
              <button className="border border-slate-300 text-slate-700 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition flex items-center gap-2">
                <Flag className="w-4 h-4" /> Báo cáo tài khoản
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        <button onClick={() => setTab('listings')}
          className={`pb-2.5 text-sm font-bold border-b-2 transition ${tab === 'listings' ? 'border-[#1557A0] text-[#1557A0]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
          Tin đang hiển thị ({sellerListings.length})
        </button>
        <button onClick={() => setTab('reviews')}
          className={`pb-2.5 text-sm font-bold border-b-2 transition ${tab === 'reviews' ? 'border-[#1557A0] text-[#1557A0]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
          Đánh giá từ người nhận ({seller.reviewCount})
        </button>
      </div>

      {/* Tab content */}
      {tab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900">Danh sách tin đăng của {seller.shortName}</h2>
            <span className="text-xs text-slate-400">Hiển thị {sellerListings.length} học liệu &amp; tài sản sinh viên</span>
          </div>
          {/* Sub-filter */}
          <div className="flex gap-2 flex-wrap">
            {['Tất cả', 'Tin Bán', 'Tin Tặng', 'Tin Trao đổi'].map((f, i) => (
              <button key={f} className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition ${
                i === 0 ? 'bg-[#1557A0] text-white border-[#1557A0]' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}>{f}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sellerListings.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          {sellerListings.length === 0 && (
            <p className="text-center text-sm text-slate-400 py-10">Người bán này hiện chưa có tin đăng nào đang hiển thị.</p>
          )}
        </div>
      )}

      {tab === 'reviews' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <h2 className="font-black text-slate-800">Đánh giá từ người nhận</h2>
          <div className="text-center py-8 text-slate-400">
            <Star className="w-10 h-10 text-amber-300 fill-amber-300 mx-auto mb-2" />
            <p className="text-sm font-semibold">Chưa có đánh giá nào được hiển thị</p>
          </div>
        </div>
      )}

      {/* Safety banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-700">
        <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <p><strong>Lời khuyên an toàn:</strong> Giao dịch trực tiếp tại KTX Khu A, KTX Khu B hoặc sảnh chính các trường thành viên ĐHQG-HCM. Luôn kiểm tra kỹ tình trạng học liệu trước khi nhận. Tuyệt đối không chuyển cọc trước dưới mọi hình thức.</p>
      </div>
    </div>
  );
};
