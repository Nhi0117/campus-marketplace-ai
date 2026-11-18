import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ImagePlus, Info, ArrowLeft, ShieldCheck, X, UploadCloud, CheckCircle2 } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { SCHOOLS } from '../../data/schools';
import { useProducts } from '../../hooks/useProducts';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { generateProductDescription } from '../../services/ai.service';

const LISTING_TYPES = [
  { id: 'sell',  label: 'Bán' },
  { id: 'trade', label: 'Trao đổi / Tặng' },
  { id: 'give',  label: 'Tặng miễn phí' },
  { id: 'want',  label: 'Cần mua' },
];
const CONDITIONS = ['Mới 100%', 'Như mới', 'Đã qua sử dụng'];

export const CreateListingPage = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const { user }       = useAuth();

  const [step, setStep] = useState(1); // step 1 (info) | step 2 (review)
  const [form, setForm] = useState({
    listingType: 'sell', title: '', categoryId: 'hoc-lieu',
    schoolId: user?.schoolId || 'HCMUT', price: '', condition: 'Như mới',
    imageUrl: '', description: '', tradeFor: '', tags: '',
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [aiLoading,   setAILoading]   = useState(false);
  const [aiHighlight, setAiHighlight] = useState('');
  const [aiDraft,     setAiDraft]     = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);
  const [draftNotice, setDraftNotice] = useState(false);

  const set = (name, value) => setForm(prev => ({ ...prev, [name]: value }));

  // Xử lý tải nhiều ảnh từ máy tính
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (indexToRemove) => {
    setUploadedImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Nếu chưa đăng nhập, hiển thị màn hình yêu cầu đăng nhập
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 text-[#1557A0] flex items-center justify-center shadow-sm">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Yêu cầu đăng nhập tài khoản</h1>
        <p className="text-sm text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
          Để đăng tin trao đổi học liệu và thiết bị học tập trong cộng đồng sinh viên ĐHQG-HCM, bạn cần đăng nhập tài khoản trước.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1557A0] text-white text-sm font-bold hover:bg-[#10437d] transition-all shadow-sm"
          >
            Đăng nhập ngay
          </button>
          <button
            onClick={() => navigate('/register')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            Tạo tài khoản sinh viên mới
          </button>
        </div>
      </div>
    );
  }

  const handleAIGenerate = async () => {
    setAILoading(true);
    try {
      const text = await generateProductDescription({
        title: form.title, condition: form.condition,
        category: form.categoryId, highlights: aiHighlight,
      });
      setAiDraft(text);
    } finally { setAILoading(false); }
  };

  const applyDraft = () => {
    setForm(prev => ({ ...prev, description: aiDraft }));
    setAiDraft('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) { alert('Vui lòng nhập tên sản phẩm!'); return; }
    if (form.listingType === 'sell' && !form.price) { alert('Vui lòng nhập giá bán!'); return; }
    setLoading(true);

    const school = SCHOOLS.find(s => s.id === form.schoolId) || SCHOOLS[1];
    const finalImages = uploadedImages.length > 0 
      ? uploadedImages 
      : (form.imageUrl ? [form.imageUrl] : []);

    const created = addProduct({
      ...form,
      price: form.listingType === 'sell' ? Number(form.price) : 0,
      schoolName: school.shortName,
      location: `KTX / ${school.name}`,
      images: finalImages,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : ['học liệu', 'sinh viên'],
      detailInfo: {
        listingType: LISTING_TYPES.find(t => t.id === form.listingType)?.label,
        category: CATEGORIES.find(c => c.id === form.categoryId)?.name,
        condition: form.condition,
        postedDate: new Date().toLocaleDateString('vi-VN'),
        meetingPoint: 'Trực tiếp tại Làng Đại học / KTX',
      },
      status: 'pending', // Luôn ở trạng thái chờ Admin duyệt
      seller: { 
        id: user?.id || 'guest', 
        name: user?.name || user?.shortName || 'Sinh viên', 
        school: user?.schoolName || school.shortName, 
        rating: 5.0, 
        reviewCount: 0, 
        avatar: user?.avatar || null, 
        verified: user?.verifiedStudent ?? true 
      },
    });

    setSubmittedNotice(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/manage-listings');
    }, 1200);
  };

  const handleSaveDraft = (e) => {
    e?.preventDefault();
    if (!form.title.trim()) {
      alert('Vui lòng nhập tên sản phẩm trước khi lưu bản nháp!');
      return;
    }
    setLoading(true);

    const school = SCHOOLS.find(s => s.id === form.schoolId) || SCHOOLS[1];
    const finalImages = uploadedImages.length > 0 
      ? uploadedImages 
      : (form.imageUrl ? [form.imageUrl] : []);

    addProduct({
      ...form,
      price: form.listingType === 'sell' ? (Number(form.price) || 0) : 0,
      schoolName: school.shortName,
      location: `KTX / ${school.name}`,
      images: finalImages,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : ['bản nháp', 'học liệu'],
      detailInfo: {
        listingType: LISTING_TYPES.find(t => t.id === form.listingType)?.label || 'Bán',
        category: CATEGORIES.find(c => c.id === form.categoryId)?.name || 'Học liệu',
        condition: form.condition,
        postedDate: new Date().toLocaleDateString('vi-VN'),
        meetingPoint: 'Trực tiếp tại Làng Đại học / KTX',
      },
      status: 'need_edit', // Lưu vào mục "Cần chỉnh sửa" (Bản nháp) - chưa gửi admin duyệt
      seller: { 
        id: user?.id || 'guest', 
        name: user?.name || user?.shortName || 'Sinh viên', 
        school: user?.schoolName || school.shortName, 
        rating: 5.0, 
        reviewCount: 0, 
        avatar: user?.avatar || null, 
        verified: user?.verifiedStudent ?? true 
      },
    });

    setDraftNotice(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/manage-listings');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 mb-4 flex items-center gap-1">
        <a href="/" className="hover:text-[#1557A0]">Trang chủ</a>
        <span>/</span>
        <span className="text-slate-800 font-medium">Đăng tin mới</span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Đăng tin mới</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="text-xs text-slate-500">Bước {step} / 2 — {step === 1 ? 'Chi tiết tin đăng' : 'Hoàn thiện mô tả'}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4" /> Khu vực ĐHQG-HCM Verified
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ── Left: Form ── */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-100">
              <span>☰</span> Chi tiết tin đăng
            </h3>

            {/* Loại tin toggle */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700">Loại tin đăng <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {LISTING_TYPES.map(lt => (
                  <button key={lt.id} type="button" onClick={() => set('listingType', lt.id)}
                    className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition flex items-center justify-center gap-1.5 ${
                      form.listingType === lt.id
                        ? 'bg-[#1557A0] text-white border-[#1557A0]'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-[#1557A0] hover:text-[#1557A0]'
                    }`}>
                    {lt.id === 'sell'  && '💲'}
                    {lt.id === 'trade' && '🔄'}
                    {lt.id === 'give'  && '🎁'}
                    {lt.id === 'want'  && '🔍'}
                    {lt.label}
                  </button>
                ))}
              </div>
            </div>

            <Input label="Tên sản phẩm / Tiêu đề tin *" name="title" placeholder="VD: Giáo trình Marketing căn bản" value={form.title} onChange={e => set('title', e.target.value)} required />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-700">Danh mục *</label>
                <select value={form.categoryId} onChange={e => set('categoryId', e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#1557A0]">
                  {CATEGORIES.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              {form.listingType === 'sell' && (
                <Input label="Giá bán (VNĐ) *" name="price" type="number" placeholder="VD: 65.000" value={form.price} onChange={e => set('price', e.target.value)} required />
              )}
              {form.listingType === 'trade' && (
                <Input label="Muốn đổi lấy gì?" name="tradeFor" placeholder="VD: đèn bàn, ổ cắm điện..." value={form.tradeFor} onChange={e => set('tradeFor', e.target.value)} />
              )}
            </div>

            {/* Condition */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700">Tình trạng vật phẩm *</label>
              <div className="flex gap-3">
                {CONDITIONS.map(c => (
                  <label key={c} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border text-xs font-semibold cursor-pointer transition ${
                    form.condition === c ? 'bg-[#1557A0] text-white border-[#1557A0]' : 'border-slate-200 text-slate-600 hover:border-blue-300'
                  }`}>
                    <input type="radio" name="condition" value={c} checked={form.condition === c} onChange={() => set('condition', c)} className="sr-only" />
                    {c}
                  </label>
                ))}
              </div>
            </div>

            {/* Hình ảnh sản phẩm (Hỗ trợ tải nhiều ảnh thực tế) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-700">
                  Hình ảnh sản phẩm <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-slate-500 font-medium">
                  Đã chọn {uploadedImages.length} ảnh
                </span>
              </div>

              {/* Khu vực bấm chọn tải ảnh từ máy tính */}
              <label className="border-2 border-dashed border-blue-200 hover:border-[#1557A0] bg-blue-50/40 hover:bg-blue-50/80 rounded-2xl p-6 text-center text-xs text-slate-600 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs">
                <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-[#1557A0]">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-[#1557A0] text-sm block">Bấm để tải ảnh từ máy tính</span>
                  <span className="text-[11px] text-slate-500">Hỗ trợ JPG, PNG, WEBP (Có thể chọn nhiều ảnh cùng lúc)</span>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Danh sách ảnh đã tải lên xem trước */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 pt-1">
                  {uploadedImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group shadow-2xs">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      {idx === 0 && (
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#1557A0] text-white">
                          Ảnh bìa
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shadow opacity-90 hover:opacity-100 transition-opacity"
                        title="Xóa ảnh này"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Tùy chọn dán URL ảnh bổ sung */}
              <div className="pt-1">
                <input 
                  type="url" 
                  placeholder="Hoặc dán URL hình ảnh online (https://...)" 
                  value={form.imageUrl} 
                  onChange={e => set('imageUrl', e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#1557A0] placeholder-slate-400" 
                />
              </div>
            </div>

            {/* Description + AI trigger */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-700">Nội dung mô tả chi tiết *</label>
                <span className="text-[11px] text-slate-400">Đang đồng bộ cùng AI Trợ lý bên phải</span>
              </div>
              <textarea name="description" rows={5} placeholder="Nội dung mô tả chi tiết sản phẩm sẽ xuất hiện ở đây sau khi bạn phê duyệt bản nháp từ Trợ lý AI hoặc bạn có thể tự nhập tay tại đây..."
                value={form.description} onChange={e => set('description', e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1557A0]" />
            </div>

            {/* Confirm checkbox */}
            <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
              <input type="checkbox" required className="accent-[#1557A0]" />
              Tôi đã đọc và xác nhận nội dung mô tả
            </label>

            {/* Thông báo gửi duyệt thành công */}
            {submittedNotice && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-800 flex items-center gap-2.5 shadow-xs animate-pulse">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Gửi duyệt tin thành công! Tin của bạn đã được chuyển tới Ban Quản Trị ĐHQG để phê duyệt. Đang chuyển hướng...</span>
              </div>
            )}

            {/* Thông báo lưu bản nháp thành công */}
            {draftNotice && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs font-bold text-amber-900 flex items-center gap-2.5 shadow-xs animate-pulse">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                <span>Đã lưu bản nháp thành công! Tin được lưu tại mục "Cần chỉnh sửa" trong Tin đăng của tôi và chưa gửi cho Admin duyệt. Đang chuyển hướng...</span>
              </div>
            )}

            {/* Footer buttons */}
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <Button variant="campus" size="md" type="submit" loading={loading} className="flex-1">
                Gửi duyệt
              </Button>
              <Button variant="outline" size="md" type="button" onClick={handleSaveDraft} disabled={loading}>
                Lưu bản nháp
              </Button>
            </div>
            <p className="text-[11px] text-slate-400 text-center">
              Tin sẽ ở trạng thái Chờ duyệt và chỉ hiển thị công khai sau khi Admin duyệt.
            </p>
          </div>

          {/* ── Right: AI03 Panel ── */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 h-fit sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#1557A0] rounded-lg">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                <h3 className="text-sm font-black text-slate-800">Trợ lý viết mô tả</h3>
              </div>
              <span className="text-[11px] bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-full">🤖 MarketAI Gen</span>
            </div>

            {/* Data summary */}
            <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Dữ liệu trích xuất từ biểu mẫu</p>
              <div className="flex justify-between">
                <span className="text-slate-600">Tên tin:</span>
                <span className="font-semibold text-slate-800 text-right max-w-[60%] line-clamp-1">{form.title || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Danh mục:</span>
                <span className="font-semibold text-slate-800">{CATEGORIES.find(c => c.id === form.categoryId)?.name || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Tình trạng:</span>
                <span className={`font-semibold ${form.condition === 'Như mới' ? 'text-emerald-700' : 'text-slate-800'}`}>{form.condition}</span>
              </div>
            </div>

            {/* Highlight input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Đặc điểm bạn đã biết <span className="text-slate-400 font-normal">(tùy chọn)</span></label>
              <div className="relative">
                <input type="text" placeholder="VD: còn mới 90%, có ghi chú bút chì"
                  value={aiHighlight} onChange={e => setAiHighlight(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1557A0] pr-10" />
                <Info className="w-4 h-4 text-slate-300 absolute right-3.5 top-3" />
              </div>
              <p className="text-[11px] text-slate-400">Đã khóa tham số để hệ thống tạo mô tả chuẩn xác.</p>
            </div>

            {/* Generate button */}
            <button type="button" onClick={handleAIGenerate} disabled={!form.title.trim() || aiLoading}
              className="w-full bg-[#1557A0] hover:bg-[#0F3E73] disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2">
              {aiLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Đang tạo...
                </>
              ) : (
                <><Sparkles className="w-4 h-4 text-amber-300" /> Tạo mô tả bằng AI</>
              )}
            </button>

            {/* Draft output */}
            {aiDraft && (
              <div className="space-y-3">
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-3">
                  <p className="text-[11px] font-bold text-slate-500 mb-2 flex items-center gap-1.5">
                    <span>📄</span> Bản nháp thông minh đang tạo
                    <span className="text-emerald-600">● Đang sinh từ ngữ...</span>
                  </p>
                  <textarea rows={6} value={aiDraft} onChange={e => setAiDraft(e.target.value)}
                    className="w-full text-xs bg-transparent border-none outline-none resize-none text-slate-700 leading-relaxed" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  Nội dung do AI tạo từ thông tin bạn cung cấp. Hãy kiểm tra và chỉnh sửa trước khi gửi duyệt.
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={applyDraft}
                    className="flex-1 bg-[#1557A0] text-white text-xs font-bold py-2 rounded-xl hover:bg-[#0F3E73] transition">
                    Áp dụng vào bài đăng
                  </button>
                  <button type="button" onClick={handleAIGenerate}
                    className="flex-1 border border-slate-300 text-slate-700 text-xs font-bold py-2 rounded-xl hover:bg-slate-50 transition">
                    Tạo lại
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
