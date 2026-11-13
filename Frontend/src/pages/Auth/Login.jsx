import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, Sparkles, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { USERS } from '../../data/users';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }
    if (!password) {
      setError('Vui lòng nhập mật khẩu.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(email, password);
      setLoading(false);
      navigate('/');
    }, 400);
  };

  const handleDemoLogin = (targetEmail) => {
    setEmail(targetEmail);
    setPassword('12345678');
    setError('');
    login(targetEmail, '12345678');
    navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-slate-50 py-8 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* CỘT TRÁI: Hero & Thông tin nền tảng ĐHQG */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4FF] text-[#1557A0] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Nền tảng hỗ trợ sinh viên ĐHQG-HCM
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-slate-900 leading-tight">
              Trao đổi tri thức, kết nối sinh viên ĐHQG-HCM
            </h1>

            <p className="text-slate-600 text-base leading-relaxed max-w-2xl">
              Hệ thống mua bán, tặng và trao đổi học liệu, thiết bị học tập an toàn, nhanh chóng và tương thích dành riêng cho cộng đồng sinh viên các trường thành viên.
            </p>

            {/* Khối Hoạt động trong khuôn viên */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-semibold text-slate-800 text-sm">Hoạt động trong khuôn viên Đại học Quốc gia</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-[#1557A0] border border-[#1557A0]/30 bg-[#EBF4FF]">
                  Xác thực Email sinh viên
                </span>
              </div>

              {/* 3 cards mini */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-[#EBF4FF]/60 border border-blue-100 space-y-1.5">
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-[#1557A0] text-white">Tin Bán</span>
                  <p className="text-xs text-slate-600 leading-snug">
                    Thanh lý học liệu, máy tính, giáo trình giá sinh viên
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-500 text-white">Tin Tặng</span>
                  <p className="text-xs text-slate-600 leading-snug">
                    Chia sẻ vở ghi chép, tài liệu miễn phí cho đàn em
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold border border-slate-400 text-slate-700 bg-white">Tin Trao đổi</span>
                  <p className="text-xs text-slate-600 leading-snug">
                    Đổi đồ dùng học tập tương đương mà không tốn chi phí
                  </p>
                </div>
              </div>

              {/* AI Badge banner */}
              <div className="pt-2 flex items-start gap-3 text-xs text-slate-600">
                <div className="w-5 h-5 rounded-full bg-[#EBF4FF] text-[#1557A0] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-medium text-slate-800">AI hỗ trợ tìm kiếm tài liệu chuẩn môn học & gợi ý đồ dùng phù hợp</p>
                  <p className="text-slate-400">ĐHBK · ĐHKHTN · ĐHCNTT · ĐHKTL · ĐHQTS · ĐHKHXHNV</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-block w-3.5 h-3.5 text-slate-400">ℹ</span>
              Giao dịch trực tiếp trong khuôn viên KTX hoặc các trường thành viên ĐHQG-HCM
            </div>
          </div>

          {/* CỘT PHẢI: Card Form Đăng nhập */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-7 lg:p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#1557A0]">Đăng nhập hệ thống</h2>
                <p className="text-xs text-slate-500 mt-1.5">
                  Chưa có tài khoản?{' '}
                  <Link to="/register" className="font-semibold text-[#1557A0] hover:underline">
                    Đăng ký ngay
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email ĐHQG-HCM
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(''); }}
                      placeholder="20123456@st.hcmuaf.edu.vn"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all ${
                        error
                          ? 'border-red-400 bg-red-50/30 focus:border-red-500'
                          : 'border-slate-300 focus:border-[#1557A0] focus:ring-2 focus:ring-[#1557A0]/10'
                      }`}
                    />
                    {error && (
                      <AlertCircle className="w-4 h-4 text-red-500 absolute right-3.5 top-3" />
                    )}
                  </div>
                  {error && (
                    <p className="text-xs text-red-500 mt-1.5 font-medium">{error}</p>
                  )}
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
                      placeholder="Nhập mật khẩu của bạn"
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-[#1557A0] hover:bg-[#10437d] transition-all duration-150 shadow-sm active:scale-[0.99] disabled:opacity-50"
                >
                  {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                </button>
              </form>

              {/* Thông tin an toàn */}
              <div className="mt-5 p-3.5 rounded-xl bg-[#EBF4FF] border border-blue-100 flex items-start gap-2.5 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-[#1557A0] shrink-0 mt-0.5" />
                <span>
                  Tài khoản được liên kết với email sinh viên trường thành viên ĐHQG-HCM để đảm bảo an toàn và tin cậy.
                </span>
              </div>

              {/* Quick Login Demo */}
              <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Đăng nhập nhanh thử nghiệm
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('minhanh@uel.edu.vn')}
                    className="px-3 py-2 rounded-lg border border-slate-200 hover:border-[#1557A0] hover:bg-blue-50/50 text-xs font-medium text-slate-700 text-left transition-colors"
                  >
                    👤 Minh Anh (SV)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('admin@vnuhcm.edu.vn')}
                    className="px-3 py-2 rounded-lg border border-slate-200 hover:border-[#1557A0] hover:bg-blue-50/50 text-xs font-medium text-slate-700 text-left transition-colors"
                  >
                    🛡️ Admin ĐHQG
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
