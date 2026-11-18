import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency, formatTimeAgo, getImageUrl } from '../../utils/format';
import { Heart, Share2, MessageCircle, Star, ShieldCheck, AlertCircle, ArrowLeft, MapPin, Flag } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { AIRecommendation } from '../../components/ai/AIRecommendation';

const ListingTypeBadge = ({ type }) => {
  const map = { sell: { label: 'Bán', cls: 'bg-[#1557A0] text-white' }, give: { label: 'Tặng', cls: 'bg-emerald-600 text-white' }, trade: { label: 'Trao đổi', cls: 'bg-slate-500 text-white' } };
  const item = map[type] || map.sell;
  return <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.cls}`}>{item.label}</span>;
};

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { isSaved, toggleSaveProduct } = useAuth();

  const product = getProductById(id);
  const [activeImg, setActiveImg] = useState(0);
  const [copied, setCopied]       = useState(false);

  if (!product) return (
    <div className="max-w-2xl mx-auto py-24 px-4 text-center space-y-4">
      <p className="text-6xl">🔍</p>
      <h2 className="text-xl font-bold text-slate-800">Không tìm thấy sản phẩm</h2>
      <p className="text-sm text-slate-500">Tin đăng có thể đã được gỡ hoặc đã giao dịch xong.</p>
      <Link to="/products"><Button variant="campus" size="md">Quay lại chợ sinh viên</Button></Link>
    </div>
  );

  const saved = isSaved(product.id);
  const handleShare = () => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const isGive  = product.listingType === 'give';
  const isTrade = product.listingType === 'trade';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-1 flex-wrap">
        <Link to="/" className="hover:text-[#1557A0]">Trang chủ</Link>
        <span>/</span>
        <Link to={`/products?category=${product.categoryId}`} className="hover:text-[#1557A0] capitalize">{product.categoryId.replace(/-/g, ' ')}</Link>
        <span>/</span>
        <span className="text-slate-700 font-medium line-clamp-1 max-w-[200px]">{product.title}</span>
      </nav>

      {/* Thông báo trạng thái tin nếu chưa active */}
      {product.status && product.status !== 'active' && (
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          product.status === 'pending'
            ? 'bg-amber-50 border-amber-200 text-amber-900'
            : product.status === 'rejected'
? 'bg-red-50 border-red-200 text-red-900'
            : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div>
              <p className="text-xs font-bold">
                Trạng thái: {product.status === 'pending' ? 'Chờ kiểm duyệt' : product.status === 'rejected' ? 'Bị từ chối duyệt' : product.status === 'deleted' ? 'Đã hủy' : product.status}
              </p>
              <p className="text-[11px] opacity-80 mt-0.5">
                {product.status === 'pending'
                  ? 'Tin của bạn đã được gửi đến BQT ĐHQG-HCM và đang chờ kiểm duyệt. Sau khi Admin duyệt, tin sẽ tự động hiển thị ra Trang chủ và Danh mục.'
                  : product.status === 'rejected'
                  ? 'Tin đăng chưa đạt tiêu chuẩn. Vui lòng kiểm tra lại hình ảnh hoặc nội dung.'
                  : 'Tin đăng hiện không công khai.'}
              </p>
            </div>
          </div>
          <Link to="/manage-listings" className="text-xs font-bold underline shrink-0 hover:opacity-80">
            Quản lý tin đăng →
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ── Left: Images + Description ── */}
        <div className="lg:col-span-7 space-y-5">
          {/* Main Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <img
              src={encodeURI(getImageUrl(product.images[activeImg] || product.images[0] || '/favicon.svg'))}
              alt={product.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = getImageUrl('/image/products/gt_kinh_te_vi_mo.jfif');
              }}
            />
            <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {activeImg + 1}/{product.images.length}
            </span>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition ${i === activeImg ? 'border-[#1557A0]' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                  <img
                    src={encodeURI(getImageUrl(img))}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = getImageUrl('/image/products/gt_kinh_te_vi_mo.jfif');
                    }}
                  />
                </button>
              ))}
            </div>
          )}
{/* Description */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-black text-slate-800">Mô tả sản phẩm</h3>
            <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">{product.description}</p>
          </div>

          {/* Detail info table */}
          {product.detailInfo && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
              <h3 className="text-base font-black text-slate-800">Thông tin chi tiết</h3>
              <table className="w-full text-sm border-collapse">
                <tbody>
                  {Object.entries({
                    'Loại tin':              product.detailInfo.listingType || '-',
                    'Danh mục':              product.detailInfo.category    || '-',
                    'Tình trạng':            product.detailInfo.condition   || '-',
                    'Ngày đăng':             product.detailInfo.postedDate  || '-',
                    'Địa điểm bán giao':     product.detailInfo.meetingPoint|| '-',
                  }).map(([label, value]) => (
                    <tr key={label} className="border-t border-slate-100">
                      <td className="py-2.5 pr-4 text-slate-500 font-medium w-40">{label}</td>
                      <td className="py-2.5 text-slate-800 font-semibold flex items-center gap-1">
                        {label.includes('Địa điểm') ? <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> : null}
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Trade variants display (from Figma) */}
          {isTrade && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
              <h3 className="text-sm font-black text-slate-700 text-[#1557A0]">Biến thể hiển thị giao dịch</h3>
              <div className="p-3 border border-slate-200 rounded-xl flex items-center justify-between">
                <span className="text-sm text-slate-600">{product.tradeFor || 'Muốn trao đổi vật phẩm khác'}</span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-semibold">Trao đổi</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Price + Seller ── */}
        <div className="lg:col-span-5 space-y-4">
          {/* Type badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <ListingTypeBadge type={product.listingType} />
            <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-full font-semibold">{product.condition}</span>
          </div>

          {/* Title */}
<h1 className="text-xl font-black text-slate-900 leading-snug">{product.title}</h1>

          {/* Price */}
          <div>
            <p className="text-xs text-slate-400">Danh mục: {product.detailInfo?.category} · Đăng ngày {product.detailInfo?.postedDate}</p>
            {isGive ? (
              <p className="text-2xl font-black text-emerald-600 mt-1">Miễn phí</p>
            ) : isTrade ? (
              <p className="text-base font-bold text-slate-500 italic mt-1">{product.tradeFor}</p>
            ) : (
              <p className="text-2xl font-black text-[#1557A0] mt-1">{formatCurrency(product.price)}</p>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-2.5">
            <Link to="/chat" className="w-full block">
              <button className="w-full bg-[#1557A0] hover:bg-[#0F3E73] text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Nhắn tin cho người bán
              </button>
            </Link>

            <button onClick={() => toggleSaveProduct(product.id)}
              className={`w-full border font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2 text-sm ${
                saved ? 'border-rose-400 bg-rose-50 text-rose-600' : 'border-slate-300 hover:bg-slate-50 text-slate-700'
              }`}>
              <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
              {saved ? 'Đã lưu tin' : 'Lưu tin'}
            </button>

            <button className="w-full text-xs text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1 transition">
              <Flag className="w-3.5 h-3.5" /> Báo cáo tin đăng
            </button>
          </div>

          {/* Safety notice */}
          <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-2 text-xs text-slate-600">
            <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <span>Giá, thanh toán và giao nhận do hai bên tự thỏa thuận ngoài hệ thống.</span>
          </div>

          {/* Seller card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
            <h4 className="text-sm font-black text-slate-800">Thông tin người bán</h4>

            <div className="flex items-center gap-3">
              {product.seller?.avatar ? (
                <img src={product.seller.avatar} alt="" className="w-12 h-12 rounded-full object-cover border border-slate-200" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#1557A0] text-white font-black flex items-center justify-center">
                  {product.seller?.name?.[0] || 'S'}
                </div>
              )}
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
{product.seller?.name}
                  {product.seller?.verified && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                </div>
                <p className="text-xs text-slate-500">{product.seller?.school}</p>
                <div className="flex items-center gap-1 mt-0.5 text-xs text-slate-600">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{product.seller?.rating || '5.0'}</span>
                  <span className="text-slate-400">· {product.seller?.reviewCount || 0} đánh giá</span>
                </div>
              </div>
            </div>

            <Link to={`/seller/${product.seller?.id}`}>
              <button className="w-full border border-[#1557A0] text-[#1557A0] text-sm font-semibold py-2 rounded-xl hover:bg-blue-50 transition">
                Xem hồ sơ người bán
              </button>
            </Link>
          </div>

          {/* Share */}
          <button onClick={handleShare} className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 transition">
            <Share2 className="w-3.5 h-3.5" /> {copied ? 'Đã sao chép link!' : 'Chia sẻ'}
          </button>
        </div>
      </div>

      {/* AI Recommendation */}
      <AIRecommendation currentProductId={product.id} title="✨ Gợi ý phù hợp" />
    </div>
  );
};
