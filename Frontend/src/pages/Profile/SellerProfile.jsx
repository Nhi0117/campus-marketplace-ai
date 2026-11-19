import React, { useState, useMemo, useEffect } from 'react';
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Star, MessageCircle, Flag, ThumbsUp, Send, User, CheckCircle2, Clock } from 'lucide-react';
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

const SUB_FILTERS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'sell', label: 'Tin Bán' },
  { id: 'give', label: 'Tin Tặng' },
  { id: 'trade', label: 'Tin Trao đổi' },
];

const DEFAULT_REVIEWS = [
  {
    id: 'rev_1',
    author: 'Hoàng Nam',
    school: 'ĐH Bách Khoa (HCMUT)',
    rating: 5,
    date: '12/11/2026',
    comment: 'Sách còn rất mới, giữ gìn cẩn thận. Bạn hẹn đúng giờ tại KTX Khu B, giao dịch nhanh gọn và nhiệt tình!',
    initials: 'HN',
    productTitle: 'Giáo trình & Học liệu'
  },
  {
    id: 'rev_2',
    author: 'Bảo Châu',
    school: 'ĐH Khoa học Tự nhiên',
    rating: 5,
    date: '08/11/2026',
    comment: 'Đồ dùng đúng như mô tả trên tin đăng, còn tặng kèm thêm tài liệu ôn thi. Rất uy tín!',
    initials: 'BC',
    productTitle: 'Vật dụng sinh viên'
  },
  {
    id: 'rev_3',
    author: 'Minh Khang',
    school: 'ĐH Công nghệ Thông tin (UIT)',
    rating: 4,
    date: '01/11/2026',
    comment: 'Giao dịch nhanh, bạn bán thân thiện. Thiết bị xài tốt, bao test trực tiếp tại chỗ.',
    initials: 'MK',
    productTitle: 'Thiết bị học tập'
  }
];

export const SellerProfilePage = () => {
  const [tab, setTab] = useState('listings');
  const [subFilter, setSubFilter] = useState('all');
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const nameParam = searchParams.get('name') || '';
  const navigate = useNavigate();
  const { products } = useProducts();
  const { user, usersList } = useAuth();

  // Lọc đúng các tin đăng của người bán: khớp id và (nếu có) khớp tên
  const sellerProducts = useMemo(() => {
    const byId = products.filter(p => String(p.seller?.id) === String(id));
    if (!nameParam) return byId;
    const target = normalize(nameParam);
    const byIdAndName = byId.filter(p => normalize(p.seller?.name) === target);
    if (byIdAndName.length > 0) return byIdAndName;
    return products.filter(p => normalize(p.seller?.name) === target);
  }, [products, id, nameParam]);

  const seller = useMemo(() => {
    const sampleSeller = sellerProducts[0]?.seller || {};
    const displayName = nameParam || sampleSeller.name || '';

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
      rating: sampleSeller.rating ?? account?.rating ?? 4.9,
      reviewCount: sampleSeller.reviewCount ?? account?.reviewCount ?? 14,
      listingCount: sellerProducts.length,
      positiveRate: account?.positiveRate ?? 100,
      joinedDate: account?.joinedDate || '2024-09-01',
    };
  }, [sellerProducts, usersList, id, nameParam]);

  // Quản lý danh sách đánh giá từ người nhận (lưu theo từng người bán)
  const storageKey = `campus_reviews_${seller.id || seller.shortName}`;
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_REVIEWS;
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setReviews(JSON.parse(saved));
      } else {
        setReviews(DEFAULT_REVIEWS);
      }
    } catch (e) {
      setReviews(DEFAULT_REVIEWS);
    }
  }, [storageKey]);

  // Form đánh giá
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Lọc tin hiển thị
  const sellerListings = sellerProducts.filter(p => !p.status || p.status === 'active');
  const displayedListings = useMemo(() => {
    if (subFilter === 'all') return sellerListings;
    return sellerListings.filter(p => p.listingType === subFilter);
  }, [sellerListings, subFilter]);

  // Báo cáo tài khoản
  const handleReportUser = () => {
    if (!user) {
      alert('Vui lòng đăng nhập tài khoản sinh viên ĐHQG-HCM để gửi báo cáo tài khoản!');
      navigate('/login');
      return;
    }
    navigate(`/report/user_${seller.id || 'sv'}?type=user&name=${encodeURIComponent(seller.name)}`);
  };

  // Gửi đánh giá
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Vui lòng đăng nhập tài khoản sinh viên ĐHQG-HCM để đánh giá người bán!');
      navigate('/login');
      return;
    }

    if (!newComment.trim()) {
      alert('Vui lòng nhập nhận xét của bạn về trải nghiệm giao dịch!');
      return;
    }

    const reviewObj = {
      id: `rev_${Date.now()}`,
      author: user.name,
      school: user.schoolName || 'Đại học Quốc gia TP.HCM',
      rating: newRating,
      date: new Date().toLocaleDateString('vi-VN'),
      comment: newComment.trim(),
      initials: getInitials(user.name),
      productTitle: sellerProducts[0]?.title || 'Giao dịch học liệu sinh viên',
      isNew: true,
    };

    const updated = [reviewObj, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setReviewSubmitted(true);
    setNewComment('');
    setTimeout(() => {
      setReviewSubmitted(false);
      setShowReviewForm(false);
    }, 1500);
  };

  // Tính điểm đánh giá trung bình thực tế
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : seller.rating;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex gap-1">
        <Link to="/" className="hover:text-[#1557A0]">Trang chủ</Link><span>/</span>
        <span>Người bán</span><span>/</span>
        <span className="text-slate-800 font-medium">{seller.name}</span>
      </nav>

      {/* Profile card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar viết tắt */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full bg-[#1557A0] text-white text-2xl font-black flex items-center justify-center shadow-inner">
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
                {avgRating} / 5.0 ({totalReviews} đánh giá từ sinh viên ĐHQG)
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
            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
              <Link to="/chat">
                <button className="bg-[#1557A0] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#0F3E73] transition flex items-center gap-2 shadow-xs">
                  <MessageCircle className="w-4 h-4" /> Nhắn tin qua hệ thống
                </button>
              </Link>
              <button
                onClick={handleReportUser}
                className="border border-slate-300 text-slate-700 hover:text-red-600 hover:border-red-300 text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-red-50/40 transition flex items-center gap-2"
              >
                <Flag className="w-4 h-4" /> Báo cáo tài khoản
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setTab('listings')}
          className={`pb-3 text-sm font-bold border-b-2 transition-all ${
            tab === 'listings'
              ? 'border-[#1557A0] text-[#1557A0]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Tin đang hiển thị ({sellerListings.length})
        </button>
        <button
          onClick={() => setTab('reviews')}
          className={`pb-3 text-sm font-bold border-b-2 transition-all ${
            tab === 'reviews'
              ? 'border-[#1557A0] text-[#1557A0]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Đánh giá từ người nhận ({totalReviews})
        </button>
      </div>

      {/* Tab content: Tin đăng */}
      {tab === 'listings' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-base font-black text-slate-900">Danh sách tin đăng của {seller.shortName}</h2>
            <span className="text-xs text-slate-400">Hiển thị {displayedListings.length} tin phù hợp</span>
          </div>

          {/* Sub-filters hoạt động mượt mà */}
          <div className="flex gap-2 flex-wrap">
            {SUB_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setSubFilter(f.id)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
                  subFilter === f.id
                    ? 'bg-[#1557A0] text-white border-[#1557A0] shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid tin đăng */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedListings.map(p => <ProductCard key={p.id} product={p} />)}
          </div>

          {displayedListings.length === 0 && (
            <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl p-6">
              <p className="text-sm font-semibold text-slate-600">Không có tin đăng nào thuộc mục này.</p>
              <button
                onClick={() => setSubFilter('all')}
                className="mt-2 text-xs font-bold text-[#1557A0] hover:underline"
              >
                Xem tất cả tin đăng →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab content: Đánh giá */}
      {tab === 'reviews' && (
        <div className="space-y-5">
          {/* Header đánh giá & Nút thêm đánh giá */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-black text-lg text-slate-800">Đánh giá & Uy tín cộng đồng</h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${Number(avgRating) >= s ? 'fill-amber-400' : 'text-slate-200'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-black text-slate-900">{avgRating} / 5.0</span>
                <span className="text-xs text-slate-400">({totalReviews} nhận xét từ sinh viên đã giao dịch)</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (!user) {
                  alert('Vui lòng đăng nhập tài khoản sinh viên ĐHQG-HCM để viết đánh giá!');
                  navigate('/login');
                  return;
                }
                setShowReviewForm(!showReviewForm);
              }}
              className="bg-[#1557A0] hover:bg-[#10437d] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-xs shrink-0"
            >
              <Star className="w-3.5 h-3.5 fill-white" />
              {showReviewForm ? 'Đóng form' : 'Viết đánh giá cho người bán'}
            </button>
          </div>

          {/* Form viết đánh giá tương tác */}
          {showReviewForm && (
            <form onSubmit={handleAddReview} className="bg-white border-2 border-blue-100 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-sm text-slate-900">Gửi đánh giá trải nghiệm giao dịch</h3>
                <span className="text-xs text-slate-500">Người đánh giá: <strong>{user?.name}</strong></span>
              </div>

              {reviewSubmitted && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Đã ghi nhận đánh giá của bạn thành công!
                </div>
              )}

              {/* Chọn số sao */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Bạn đánh giá người bán mấy sao? <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewRating(s)}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          (hoverRating || newRating) >= s
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#1557A0] ml-2">
                    {['Rất tệ', 'Chưa tốt', 'Bình thường', 'Tốt', 'Rất hài lòng!'][((hoverRating || newRating) - 1)]}
                  </span>
                </div>
              </div>

              {/* Nhận xét */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Nội dung nhận xét <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Chia sẻ về độ trung thực của tin đăng, thời gian hẹn gặp, thái độ giao tiếp..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:border-[#1557A0]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1557A0] hover:bg-[#10437d] text-white text-xs font-bold shadow-xs transition"
                >
                  Đăng đánh giá
                </button>
              </div>
            </form>
          )}

          {/* Danh sách các đánh giá mẫu & đánh giá mới */}
          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1557A0] font-bold text-xs flex items-center justify-center shrink-0">
                      {r.initials || 'SV'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{r.author}</span>
                        {r.isNew && (
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Mới đăng
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 block">{r.school}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="flex items-center justify-end text-amber-400 mb-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${r.rating >= s ? 'fill-amber-400' : 'text-slate-200'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400">{r.date}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {r.comment}
                </p>

                {r.productTitle && (
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <span>Giao dịch về:</span>
                    <strong className="text-slate-600 truncate">{r.productTitle}</strong>
                  </div>
                )}
              </div>
            ))}
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
