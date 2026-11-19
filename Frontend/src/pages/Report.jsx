import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AlertCircle, Upload, CheckCircle2, Image as ImageIcon, ShieldAlert, LogIn, ArrowLeft, User } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { formatCurrency, getImageUrl } from '../utils/format';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../hooks/useProducts';

const LISTING_REASONS = [
  { id: 'wrong_category', label: 'Nội dung không phù hợp hoặc sai danh mục' },
  { id: 'copyright', label: 'Hàng bị cấm hoặc vi phạm bản quyền' },
  { id: 'misleading', label: 'Mô tả không đúng thực tế hoặc che giấu khiếm khuyết' },
  { id: 'scam', label: 'Nghi ngờ lừa đảo' },
  { id: 'other', label: 'Lý do khác' },
];

const USER_REASONS = [
  { id: 'scam_user', label: 'Nghi ngờ hành vi gian lận / lừa đảo tiền cọc' },
  { id: 'harassment', label: 'Ngôn từ khiếm nhã, xúc phạm hoặc quấy rối' },
  { id: 'fake_profile', label: 'Mạo danh sinh viên trường khác' },
  { id: 'no_show', label: 'Hẹn giao dịch nhiều lần nhưng không đến (bỏ bom)' },
  { id: 'other_user', label: 'Lý do khác' },
];

export const ReportPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { products } = useProducts();

  const isUserReport = searchParams.get('type') === 'user' || id?.startsWith('user_') || id?.startsWith('seller_');
  const targetUserName = searchParams.get('name') || 'Người bán';

  // Tìm sản phẩm nếu là báo cáo tin đăng
  const product = useMemo(() => {
    if (isUserReport) return null;
    const all = [...(products || []), ...PRODUCTS];
    return all.find(p => String(p.id) === String(id)) || all[0];
  }, [id, isUserReport, products]);

  const reasons = isUserReport ? USER_REASONS : LISTING_REASONS;

  const [reason, setReason] = useState(reasons[0].id);
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // NẾU CHƯA ĐĂNG NHẬP: Chặn không cho báo cáo, bắt buộc đăng nhập
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Yêu cầu đăng nhập</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Để đảm bảo tính xác thực và phòng chống báo cáo ảo/quấy rối, chỉ sinh viên <strong>đã đăng nhập tài khoản ĐHQG-HCM</strong> mới có thể gửi báo cáo tới Ban Quản Trị.
          </p>
          <div className="pt-2 space-y-2">
            <button
              onClick={() => navigate('/login')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#1557A0] hover:bg-[#10437d] text-white text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Đăng nhập tài khoản ngay
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full py-2 px-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const reasonObj = reasons.find(r => r.id === reason);
    const targetTitle = isUserReport
      ? targetUserName
      : (product?.title || 'Tin đăng');

    const newReport = {
      id: `#${Math.floor(100 + Math.random() * 900)}`,
      targetType: isUserReport ? 'Tài khoản' : 'Tin đăng',
      targetTitle,
      targetId: id,
      reason: reasonObj ? reasonObj.label : 'Lý do khác',
      description: description.trim() || 'Người dùng gửi báo cáo kiểm tra.',
      reporter: user.name + (user.schoolName ? ` (${user.schoolName})` : ''),
      reporterEmail: user.email,
      date: new Date().toLocaleDateString('vi-VN'),
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      status: 'new',
      statusText: 'Mới gửi',
      statusBadge: 'bg-amber-50 text-amber-700 border border-amber-200',
      hasActionBtn: true,
      product: product ? {
        id: product.id,
        title: product.title,
        price: product.price,
        condition: product.condition,
        seller: product.seller?.name || 'Người bán',
        images: product.images || [],
      } : null
    };

    try {
      const existing = JSON.parse(localStorage.getItem('campus_reports_list') || '[]');
      localStorage.setItem('campus_reports_list', JSON.stringify([newReport, ...existing]));
      window.dispatchEvent(new Event('campus_reports_updated'));
    } catch (err) {
      console.error(err);
    }

    setSubmitted(true);
    setTimeout(() => {
      navigate(-1);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {isUserReport ? 'Báo cáo tài khoản người dùng' : 'Báo cáo tin đăng'}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Báo cáo của bạn sẽ được gửi thẳng đến Cổng Quản Trị (Admin) để xem xét và xử lý vi phạm.
        </p>
      </div>

      {submitted && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Báo cáo của bạn đã được chuyển đến Ban Quản Trị ĐHQG-HCM thành công! Đang quay lại...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Đối tượng đang báo cáo */}
        <div>
          <span className="text-xs text-slate-400 block mb-2 font-medium">Đối tượng báo cáo:</span>
          
          {isUserReport ? (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-[#1557A0] font-black flex items-center justify-center shrink-0 text-base">
                {targetUserName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">Tài khoản</span>
                <h4 className="font-bold text-sm text-slate-900 mt-0.5">{targetUserName}</h4>
                <p className="text-[11px] text-slate-500">Mã tài khoản: {id}</p>
              </div>
            </div>
          ) : product ? (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-14 h-14 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                  {product.images && product.images.length > 0 && product.images[0] ? (
                    <img
                      src={encodeURI(getImageUrl(product.images[0]))}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getImageUrl('/image/products/gt_kinh_te_vi_mo.jfif');
                      }}
                    />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-slate-300" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#1557A0] text-white">Bán</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-200 text-slate-700 font-medium">
                      {product.condition || 'Đã qua sử dụng'}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 truncate">{product.title}</h4>
                  <span className="text-xs font-bold text-[#1557A0] mt-0.5 block">
                    {product.price > 0 ? formatCurrency(product.price) : 'Miễn phí'}
                  </span>
                </div>
              </div>

              <span className="text-xs text-slate-500 shrink-0">
                Người đăng: <strong className="text-slate-800">{product.seller?.name || 'Người bán'}</strong>
              </span>
            </div>
          ) : null}
        </div>

        {/* Thông tin người gửi */}
        <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <User className="w-4 h-4 text-[#1557A0]" />
            <span>Người gửi báo cáo: <strong className="text-slate-900">{user.name}</strong></span>
          </div>
          <span className="text-[11px] text-[#1557A0] font-medium">{user.email}</span>
        </div>

        {/* Lý do báo cáo */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-3">
            Lý do báo cáo <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2.5">
            {reasons.map((item) => (
              <label
                key={item.id}
                className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer text-xs transition-all ${
                  reason === item.id
                    ? 'border-[#1557A0] bg-blue-50/50 ring-2 ring-[#1557A0]/10 font-semibold text-slate-900'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="reason"
                  value={item.id}
                  checked={reason === item.id}
                  onChange={() => setReason(item.id)}
                  className="text-[#1557A0] focus:ring-[#1557A0]"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Mô tả thêm */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Mô tả chi tiết sự việc (không bắt buộc)
            </label>
            <span className="text-[11px] text-slate-400">{description.length} / 500</span>
          </div>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Cung cấp thêm chi tiết hoặc tình huống cụ thể để Admin dễ dàng đối chiếu..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 leading-relaxed focus:outline-none focus:border-[#1557A0]"
          />
        </div>

        {/* Info notice */}
        <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center gap-2.5 text-xs text-[#1557A0]">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Báo cáo của bạn được gửi trực tiếp tới Ban Quản Trị ĐHQG-HCM và được xử lý theo quy chế nội bộ.</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#1557A0] hover:bg-[#10437d] text-white text-xs font-semibold shadow-sm transition-all"
          >
            Gửi báo cáo đến Admin
          </button>
        </div>

      </form>
    </div>
  );
};
