import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, User, Clock, Image as ImageIcon } from 'lucide-react';
import { formatCurrency, formatTimeAgo, getImageUrl } from '../../utils/format';
import { useAuth } from '../../context/AuthContext';

// Badge loại tin
const ListingBadge = ({ type }) => {
  const map = {
    sell:  { label: 'Bán',      cls: 'bg-[#1557A0] text-white' },
    give:  { label: 'Tặng',     cls: 'bg-emerald-600 text-white' },
    trade: { label: 'Trao đổi', cls: 'bg-slate-500 text-white' },
    want:  { label: 'Cần mua',  cls: 'bg-amber-500 text-white' },
  };
  const item = map[type] || map.sell;
  return (
    <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full ${item.cls}`}>
      {item.label}
    </span>
  );
};

// Badge tình trạng
const ConditionBadge = ({ condition }) => (
  <span className="inline-block text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full">
    {condition}
  </span>
);

export const ProductCard = ({ product }) => {
  const { isSaved, toggleSaveProduct } = useAuth();
  const saved = isSaved(product.id);

  const handleHeart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveProduct(product.id);
  };

  const isGive  = product.listingType === 'give';
  const isTrade = product.listingType === 'trade';

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <Link to={`/products/${product.id}`} className="relative aspect-[4/3] block overflow-hidden bg-slate-100 shrink-0">
        {product.images && product.images.length > 0 && product.images[0] ? (
          <img
            src={encodeURI(getImageUrl(product.images[0]))}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = getImageUrl('/image/products/gt_kinh_te_vi_mo.jfif');
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 text-slate-400 gap-1.5 p-4 text-center">
            <ImageIcon className="w-9 h-9 text-slate-300" strokeWidth={1.5} />
            <span className="text-[11px] font-medium text-slate-400">Chưa có hình ảnh</span>
          </div>
        )}

        {/* Badges top-left: loại tin + tình trạng */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
          <ListingBadge type={product.listingType} />
        </div>

        {/* Heart top-right */}
        <button
          onClick={handleHeart}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow text-slate-400 hover:text-rose-500 transition"
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Condition bottom-left over image */}
        {product.condition && (
          <div className="absolute bottom-2 left-2.5 flex gap-1.5 flex-wrap">
            <ConditionBadge condition={product.condition} />
            <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full">
              {product.schoolName}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between gap-2">
        {/* Title */}
        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#1557A0] transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Price & Posted Date */}
        <div className="flex items-center justify-between gap-2">
          {isGive ? (
            <p className="text-base font-black text-emerald-600">Miễn phí</p>
          ) : isTrade ? (
            <p className="text-sm font-bold text-slate-500 italic">{product.tradeFor || 'Trao đổi'}</p>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-base font-black text-[#1557A0]">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">{formatCurrency(product.originalPrice)}</span>
              )}
            </div>
          )}

          {product.createdAt && (
            <div className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0 font-medium">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{formatTimeAgo(product.createdAt)}</span>
            </div>
          )}
        </div>

        {/* Seller + School */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1.5 min-w-0">
            <User className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-500 font-medium truncate">
              {product.seller?.name} <span className="text-slate-400">({product.seller?.school})</span>
            </span>
          </div>
          {product.seller?.rating && (
            <div className="flex items-center gap-0.5 shrink-0 text-xs text-slate-500">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.seller.rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
