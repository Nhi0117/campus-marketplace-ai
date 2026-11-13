import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Vui lòng nhập họ và tên.');
      return;
    }
    if (!email) {
      setError('Vui lòng nhập email trường cấp.');
      return;
    }
    if (password.length < 8) {
      setError('Mật khẩu phải có tối thiểu 8 ký tự.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(email, password);
      setLoading(false);
      navigate('/');
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
                  Xác thực thông qua email sinh viên do các trường thành viên ĐHQG-HCM cấp, loại bỏ hoàn toàn tài khoản ảo, ngăn ngừa lừa đảo và đảm bảo an toàn giao dịch tối đa.
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
                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-600">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nhập họ tên của bạn"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1557A0] focus:ring-2 focus:ring-[#1557A0]/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email ĐHQG-HCM
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Bắt buộc dùng email trường cấp (ví dụ: @st.hcmuaf...)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1557A0] focus:ring-2 focus:ring-[#1557A0]/10"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Chỉ chấp nhận đuôi email trường thuộc ĐHQG-HCM để bảo đảm an toàn cộng đồng.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Tối thiểu 8 ký tự"
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
                    Xác nhận mật khẩu
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
                  Bằng việc đăng ký, bạn đồng ý với Quy chế hoạt động của Campus Marketplace.
                </p>
              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
