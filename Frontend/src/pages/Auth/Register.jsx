import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();

  // Nhận email truyền từ trang Login sang (nếu có)
  const searchParams = new URLSearchParams(location.search);
  const initialEmail = searchParams.get('email') || '';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const [schoolName, setSchoolName] = useState('Đại học Bách Khoa');
  const [customSchoolName, setCustomSchoolName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!fullName.trim()) {
      setError('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }
    if (schoolName === 'Khác' && !customSchoolName.trim()) {
      setError('Vui lòng nhập tên trường đại học/cao đẳng của bạn.');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có tối thiểu 6 ký tự.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    const finalSchoolName = schoolName === 'Khác' ? customSchoolName.trim() : schoolName;

    setLoading(true);
    setTimeout(() => {
      const res = register({
        name: fullName,
        email,
        schoolName: finalSchoolName,
        phone,
        password,
      });

      setLoading(false);

      if (!res.success) {
        setError(res.message);
      } else {
        setSuccessMessage('Bạn đã tạo tài khoản thành công! Đang chuyển hướng sang trang đăng nhập...');
        setTimeout(() => {
          navigate(`/login?registered=success&email=${encodeURIComponent(email)}`);
        }, 1200);
      }
    }, 400);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-slate-50 py-8 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* CỘT TRÁI */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4FF] text-[#1557A0] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Campus Marketplace AI
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-slate-900 leading-tight">
              Gia nhập cộng đồng trao đổi học liệu ĐHQG-HCM
            </h1>

            <p className="text-slate-600 text-base leading-relaxed max-w-2xl">
              Nền tảng công nghệ thông minh hỗ trợ mua bán, trao đổi giáo trình, đồ dùng và thiết bị học tập dành riêng cho cộng đồng sinh viên các trường: ĐHBK, ĐHKHTN, ĐHCNTT, ĐHKTL, ĐHQTS, ĐHKHXHNV.
            </p>

            {/* Khối Xác thực tài khoản chính chủ */}
            <div className="bg-[#EBF4FF]/80 border border-blue-200/60 rounded-2xl p-5 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#1557A0] text-white flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-800">Xác thực tài khoản sinh viên chính chủ</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Đăng ký tài khoản để quản lý tin đăng, lưu học liệu quan tâm và trao đổi trực tiếp với sinh viên cùng trường.
                </p>
              </div>
            </div>

            {/* 3 cards mini */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Tin Bán</span>
                  <span className="w-2 h-2 rounded-full bg-[#1557A0]"></span>
                </div>
                <p className="text-xs text-slate-500 leading-snug">
                  Thanh lý giáo trình cũ, máy tính casio và dụng cụ học tập giá sinh viên.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#EBF4FF]/50 border border-blue-100 space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Tin Tặng</span>
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                </div>
                <p className="text-xs text-slate-500 leading-snug">
                  Tặng lại tài liệu ôn thi, đề cương môn học và đồ dùng cho khóa dưới.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Tin Trao đổi</span>
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                </div>
                <p className="text-xs text-slate-500 leading-snug">
                  Hoán đổi sách chuyên ngành, giáo trình ngoại ngữ tương đương giữa các khoa.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-block w-3.5 h-3.5 text-slate-400">📍</span>
              Giao dịch trực tiếp trong khuôn viên KTX hoặc các trường thành viên ĐHQG-HCM
            </div>
          </div>

          {/* CỘT PHẢI: Form Đăng ký */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-7 lg:p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Tạo tài khoản sinh viên</h2>
                <p className="text-xs text-slate-500 mt-1.5">
                  Đã có tài khoản?{' '}
                  <Link to="/login" className="font-semibold text-[#1557A0] hover:underline">
                    Đăng nhập tại đây
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {successMessage && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center gap-2 text-xs font-bold text-emerald-800 shadow-xs animate-pulse">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{successMessage}</span>
                  </div>
                )}

                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-600">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="ví dụ: Nguyễn Trần Bích Nhi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1557A0] focus:ring-2 focus:ring-[#1557A0]/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Trường Đại học <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 bg-white focus:outline-none focus:border-[#1557A0] focus:ring-2 focus:ring-[#1557A0]/10"
                  >
                    <option value="Đại học Bách Khoa">Đại học Bách Khoa (HCMUT)</option>
                    <option value="Đại học Khoa học Tự nhiên">Đại học Khoa học Tự nhiên (HCMUS)</option>
                    <option value="Đại học Công nghệ Thông tin">Đại học Công nghệ Thông tin (UIT)</option>
                    <option value="Đại học Kinh tế - Luật">Đại học Kinh tế - Luật (UEL)</option>
                    <option value="Đại học KHXH & Nhân văn">Đại học KHXH & Nhân văn (USSH)</option>
                    <option value="Đại học Quốc Tế">Đại học Quốc Tế (IU)</option>
                    <option value="Trường Đại học Khoa học Sức khỏe">Trường Đại học Khoa học Sức khỏe (UHS)</option>
                    <option value="Đại học An Giang">Đại học An Giang (AGU)</option>
                    <option value="Khác">Khác (Trường ngoài hệ thống ĐHQG-HCM)</option>
                  </select>

                  {schoolName === 'Khác' && (
                    <div className="mt-2.5 space-y-1 animate-fadeIn">
                      <label className="block text-xs font-semibold text-slate-700">
                        Nhập tên trường của bạn <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={customSchoolName}
                        onChange={(e) => setCustomSchoolName(e.target.value)}
                        placeholder="ví dụ: ĐH Sư phạm Kỹ thuật, ĐH Sài Gòn,..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-blue-400 bg-blue-50/30 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1557A0] focus:ring-2 focus:ring-[#1557A0]/10"
                        autoFocus
                      />
                      <p className="text-[11px] text-slate-500">
                        Bạn có thể nhập tên trường của mình nếu không nằm trong danh sách ĐHQG-HCM.
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email liên hệ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ví dụ: bプレイnhi@uel.edu.vn hoặc gmail"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1557A0] focus:ring-2 focus:ring-[#1557A0]/10"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Dùng để đăng nhập và trao đổi học liệu với sinh viên khác.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Tối thiểu 6 ký tự"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1557A0] focus:ring-2 focus:ring-[#1557A0]/10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Xác nhận mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1557A0] focus:ring-2 focus:ring-[#1557A0]/10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-[#1557A0] hover:bg-[#10437d] transition-all duration-150 shadow-sm active:scale-[0.99] disabled:opacity-50"
                >
                  {loading ? 'Đang tạo tài khoản...' : 'Đăng ký tài khoản'}
                </button>

                <p className="text-[11px] text-slate-400 text-center mt-3 leading-relaxed">
                  Bằng việc đăng ký, bạn đồng ý với Quy chế hoạt động của Campus Marketplace AI.
                </p>
              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
