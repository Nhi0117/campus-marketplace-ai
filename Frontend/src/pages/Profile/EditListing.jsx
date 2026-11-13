import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Upload, X, AlertTriangle, Sparkles, Check, Eye, Save, MapPin, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { useAuth } from '../../context/AuthContext';

export const EditListingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  const [title, setTitle] = useState(product?.title || 'Giáo trình Kinh tế vi mô - ĐH Kinh tế - Luật (Tái bản mới nhất)');
  const [listingType, setListingType] = useState(product?.listingType || 'sell'); // sell | give | trade
  const [category, setCategory] = useState(product?.categoryId || 'hoc-lieu');
  const [condition, setCondition] = useState(product?.condition || 'Như mới');
  const [price, setPrice] = useState(product?.price || 85000);
  const [description, setDescription] = useState(product?.description || 'Giáo trình Kinh tế vi mô trường ĐH Kinh tế - Luật (UEL), ấn bản mới nhất còn rất mới do mình dùng giữ cẩn thận. Bên trong có highlight vài điểm lý thuyết quan trọng ở chương 2 và chương 4, không rách trang hay vẽ bậy. Rất phù hợp cho các bạn K23, K24 học môn Kinh tế vi mô. Mình hỗ trợ tặng kèm tài liệu tóm tắt công thức ôn thi cuối kỳ.');
  const [meetingPoints, setMeetingPoints] = useState({
    ktxb: true,
    uel: true,
    ktxa: false,
  });

  const [aiSuggestion, setAiSuggestion] = useState(
    '“Sách giáo trình Kinh tế vi mô bản mới nhất của Bộ môn Kinh tế học UEL. Sách giữ rất kỹ, gáy phẳng, sạch đẹp 95% không viết vẽ bậy. Đã highlight chuẩn xác các chương trọng tâm ôn thi cuối kỳ. Tặng kèm file slide tóm tắt đề cương bản mềm qua Zalo cho bạn nào nhận sách tại KTX Khu B hoặc sảnh UEL.”'
  );

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleApplyAi = () => {
    setDescription(aiSuggestion.replace(/“|”/g, ''));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      navigate('/manage-listings');
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link to="/" className="hover:text-slate-800">Trang chủ</Link>
        <span>›</span>
        <Link to="/manage-listings" className="hover:text-slate-800">Quản lý tin của tôi</Link>
        <span>›</span>
        <span className="font-semibold text-slate-800">Chỉnh sửa tin đăng #L1</span>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-slate-900">Chỉnh sửa tin đăng</h1>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Đang hiển thị
          </span>
          <span className="text-xs text-slate-500 font-mono">Mã tin: #L1</span>
        </div>
        <span className="text-xs text-slate-400">Lần cập nhật gần nhất: 14:20 - 24/10/2026</span>
      </div>

      {/* Warning banner */}
      <div className="mb-8 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <h4 className="font-bold text-amber-900">Quy chuẩn kiểm duyệt học thuật ĐHQG-HCM</h4>
          <p className="text-amber-800 leading-relaxed">
            Lưu ý: Việc thay đổi các thông tin quan trọng (Tên sản phẩm, Giá bán, Mô tả chi tiết hoặc Hình ảnh) sẽ tự động chuyển tin đăng về trạng thái "Chờ duyệt" để Ban quản trị ĐHQG kiểm tra lại nhằm đảm bảo an toàn học liệu sinh viên.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
        
        {/* Hình ảnh */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-bold text-slate-800">
              Hình ảnh học liệu / sản phẩm <span className="text-red-500">*</span>
            </label>
            <span className="text-xs text-slate-400">Đã tải lên 2 / 5 ảnh</span>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Khuyến khích chụp rõ gáy sách, mép trang và các ghi chú thực tế để AI hỗ trợ xếp hạng uy tín.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-square group">
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80"
                alt="Bìa"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#1557A0] text-white">
                Ảnh bìa
              </span>
              <button
                type="button"
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-square group">
              <img
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=80"
                alt="Trang trong"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="rounded-xl border-2 border-dashed border-blue-200 hover:border-[#1557A0] bg-blue-50/20 aspect-square flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-colors">
              <Upload className="w-5 h-5 text-[#1557A0] mb-1" />
              <span className="text-xs font-semibold text-[#1557A0]">+ Thêm ảnh / Thay thế</span>
              <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG (Tối đa 5MB)</span>
            </div>
          </div>
        </div>

        {/* Hình thức trao đổi */}
        <div>
          <label className="block text-sm font-bold text-slate-800 mb-3">
            Hình thức trao đổi <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setListingType('sell')}
              className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                listingType === 'sell'
                  ? 'border-[#1557A0] bg-blue-50/50 ring-2 ring-[#1557A0]/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  listingType === 'sell' ? 'border-[#1557A0]' : 'border-slate-300'
                }`}>
                  {listingType === 'sell' && <div className="w-2 h-2 rounded-full bg-[#1557A0]" />}
                </div>
                <span className="text-xs font-bold text-slate-800">Bán lại</span>
              </div>
              <span className="text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-100">Thu hồi phí</span>
            </button>

            <button
              type="button"
              onClick={() => { setListingType('give'); setPrice(0); }}
              className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                listingType === 'give'
                  ? 'border-[#1557A0] bg-blue-50/50 ring-2 ring-[#1557A0]/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  listingType === 'give' ? 'border-[#1557A0]' : 'border-slate-300'
                }`}>
                  {listingType === 'give' && <div className="w-2 h-2 rounded-full bg-[#1557A0]" />}
                </div>
                <span className="text-xs font-bold text-slate-800">Tặng miễn phí</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">0 VNĐ</span>
            </button>

            <button
              type="button"
              onClick={() => { setListingType('trade'); setPrice(0); }}
              className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                listingType === 'trade'
                  ? 'border-[#1557A0] bg-blue-50/50 ring-2 ring-[#1557A0]/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  listingType === 'trade' ? 'border-[#1557A0]' : 'border-slate-300'
                }`}>
                  {listingType === 'trade' && <div className="w-2 h-2 rounded-full bg-[#1557A0]" />}
                </div>
                <span className="text-xs font-bold text-slate-800">Trao đổi</span>
              </div>
              <span className="text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-100">Đổi học liệu</span>
            </button>
          </div>
        </div>

        {/* Danh mục & Tình trạng */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Danh mục học thuật <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#1557A0] bg-white"
            >
              <option value="hoc-lieu">Học liệu (Giáo trình, Đề cương bài giảng)</option>
              <option value="thiet-bi-hoc-tap">Thiết bị học tập (Máy tính, Laptop)</option>
              <option value="do-dung-hoc-tap">Đồ dùng học tập (Bút, thước, giáo cụ)</option>
              <option value="vat-dung-sinh-vien">Vật dụng sinh viên KTX</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Tình trạng sản phẩm <span className="text-red-500">*</span>
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#1557A0] bg-white"
            >
              <option value="Như mới">Như mới (95%, không rách, giấy sạch)</option>
              <option value="Đã qua sử dụng">Đã qua sử dụng (có ghi chú, gạch chân)</option>
              <option value="Mới">Mới 100% nguyên bản</option>
            </select>
          </div>
        </div>

        {/* Tên sản phẩm */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700">
              Tên sản phẩm / học liệu <span className="text-red-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400">{title.length} / 100 ký tự</span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#1557A0] focus:ring-2 focus:ring-[#1557A0]/10"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Nêu rõ tên sách, trường hoặc phiên bản tái bản để sinh viên dễ dàng tra cứu khóa học tương ứng.
          </p>
        </div>

        {/* Giá bán */}
        {listingType === 'sell' && (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Giá bán mong muốn <span className="text-red-500">*</span>
            </label>
            <div className="relative max-w-xs">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 font-bold focus:outline-none focus:border-[#1557A0] pr-12"
              />
              <span className="absolute right-3.5 top-2.5 text-xs font-bold text-slate-400">VNĐ</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              ℹ Giá bìa gốc: 140.000 VNĐ. Tiết kiệm 40% cho sinh viên khóa mới.
            </p>
          </div>
        )}

        {/* Mô tả chi tiết & AI Assist */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-bold text-slate-700">
              Mô tả chi tiết nội dung & tình trạng học liệu <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#1557A0] hover:bg-blue-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Nhờ AI viết lại mô tả
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                Tóm tắt ưu điểm học tập
              </button>
            </div>
          </div>

          {/* AI Suggestion box */}
          <div className="p-4 rounded-xl bg-[#EBF4FF]/70 border border-blue-200/70 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1557A0]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gợi ý tối ưu từ AI ĐHQG Engine</span>
              </div>
              <span className="text-[11px] text-[#1557A0] bg-white px-2 py-0.5 rounded border border-blue-100">
                Khuyến nghị học thuật
              </span>
            </div>

            <p className="text-xs text-slate-700 italic leading-relaxed">
              {aiSuggestion}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-blue-100 text-[11px]">
              <span className="text-slate-500">Phân tích: Bổ sung quyền lợi tặng kèm slide giúp tăng 70% tốc độ sang nhượng sách.</span>
              <button
                type="button"
                onClick={handleApplyAi}
                className="px-3.5 py-1.5 rounded-lg bg-[#1557A0] text-white font-bold hover:bg-[#10437d] transition-colors"
              >
                Áp dụng vào mô tả ↓
              </button>
            </div>
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 leading-relaxed focus:outline-none focus:border-[#1557A0] focus:ring-2 focus:ring-[#1557A0]/10"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
              <span>Tối thiểu 30 ký tự để người học hình dung đầy đủ thông tin.</span>
              <span>{description.length} / 1000 ký tự</span>
            </div>
          </div>
        </div>

        {/* Thông tin xác thực & Địa điểm giao lưu */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">
            Xác thực tài khoản & Địa điểm giao lưu học liệu
          </h3>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1557A0] text-white flex items-center justify-center font-bold text-xs">
                MA
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-800">Nguyễn Trần Minh Anh</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">
                    Đã xác thực SSO ĐHQG
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">minhanh@st.uel.edu.vn • ĐH Kinh tế - Luật</p>
              </div>
            </div>
            <span className="text-xs text-slate-500 font-medium">Thành viên K22 UEL</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Điểm hẹn giao nhận thuận tiện trong Làng Đại học:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="p-3 rounded-xl border border-slate-200 hover:border-[#1557A0] flex items-center gap-2.5 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={meetingPoints.ktxb}
                  onChange={(e) => setMeetingPoints(prev => ({ ...prev, ktxb: e.target.checked }))}
                  className="rounded text-[#1557A0] focus:ring-[#1557A0]"
                />
                <span className="font-medium text-slate-700">KTX Khu B ĐHQG-HCM</span>
              </label>

              <label className="p-3 rounded-xl border border-slate-200 hover:border-[#1557A0] flex items-center gap-2.5 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={meetingPoints.uel}
                  onChange={(e) => setMeetingPoints(prev => ({ ...prev, uel: e.target.checked }))}
                  className="rounded text-[#1557A0] focus:ring-[#1557A0]"
                />
                <span className="font-medium text-slate-700">Sảnh chính ĐH Kinh tế - Luật</span>
              </label>

              <label className="p-3 rounded-xl border border-slate-200 hover:border-[#1557A0] flex items-center gap-2.5 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={meetingPoints.ktxa}
                  onChange={(e) => setMeetingPoints(prev => ({ ...prev, ktxa: e.target.checked }))}
                  className="rounded text-[#1557A0] focus:ring-[#1557A0]"
                />
                <span className="font-medium text-slate-700">KTX Khu A ĐHQG-HCM</span>
              </label>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
          <p className="text-[11px] text-slate-400">
            Sau khi bấm "Lưu thay đổi", nếu có điều chỉnh cốt lõi, tin đăng sẽ chuyển sang "Chờ duyệt" trong tối đa 2-4 giờ.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate('/manage-listings')}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
            >
              Hủy bỏ
            </button>
            <Link
              to={`/products/${product.id}`}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-[#1557A0] text-[#1557A0] hover:bg-blue-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              Xem trước hiển thị
            </Link>
            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#1557A0] hover:bg-[#10437d] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              Lưu thay đổi
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
