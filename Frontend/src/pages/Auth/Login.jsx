import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, Sparkles, AlertCircle, ArrowRight, UserPlus, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const searchParams = new URLSearchParams(location.search);
  const registeredSuccess = searchParams.get('registered') === 'success';
  const queryEmail = searchParams.get('email') || '';

  const isUnauthorized = searchParams.get('unauthorized') === 'true';

  const [loginRole, setLoginRole] = useState(
    searchParams.get('role') === 'admin' ? 'admin' : 'student'
  );
  const [email, setEmail] = useState(searchParams.get('role') === 'admin' ? 'admin@vnuhcm.edu.vn' : queryEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(isUnauthorized ? 'Khu vực này yêu cầu đăng nhập bằng tài khoản Quản trị viên dự án.' : '');
  const [needRegister, setNeedRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [justRegistered, setJustRegistered] = useState(registeredSuccess);

  useEffect(() => {
    if (queryEmail && loginRole === 'student') {
      setEmail(queryEmail);
    }
    if (registeredSuccess) {
      setJustRegistered(true);
    }
  }, [queryEmail, registeredSuccess, loginRole]);

  const handleRoleChange = (role) => {
    setLoginRole(role);
    setError('');
    setNeedRegister(false);
    if (role === 'admin') {
      setEmail('admin@vnuhcm.edu.vn');
      setPassword(''); // Bắt buộc tự gõ mật khẩu bí mật của nhóm
    } else {
      setEmail('');
      setPassword('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setNeedRegister(false);

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
      const res = login(email, password);
      setLoading(false);

      if (!res.success) {
        setError(res.message);
        if (res.error === 'USER_NOT_FOUND') {
          setNeedRegister(true);
        } else {
          setNeedRegister(false);
        }
      } else {
        // Nếu là tài khoản Admin, chuyển thẳng vào Giao diện Quản trị Admin (bỏ qua trang chủ guest/user)
        if (res.user?.isAdmin || res.user?.email?.toLowerCase().includes('admin')) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    }, 300);
  };

  const handleDemoLogin = (targetEmail) => {
    setEmail(targetEmail);
    setPassword('12345678');
    setError('');
    setNeedRegister(false);
    const res = login(targetEmail, '12345678');
    if (res.success) {
      if (res.user?.isAdmin || targetEmail.toLowerCase().includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
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
              {/* Tab chọn vai trò đăng nhập */}
              <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 mb-6 border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => handleRoleChange('student')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    loginRole === 'student'
                      ? 'bg-white text-[#1557A0] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  🎓 Sinh viên ĐHQG
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleChange('admin')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    loginRole === 'admin'
                      ? 'bg-[#1557A0] text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  🛡️ Ban Quản Trị (Admin)
                </button>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#1557A0]">
                  {loginRole === 'admin' ? 'Đăng nhập Cổng Quản Trị' : 'Đăng nhập hệ thống'}
                </h2>
                <p className="text-xs text-slate-500 mt-1.5">
                  {loginRole === 'admin' ? (
                    <span className="text-slate-600 font-medium">
                      Truy cập trực tiếp khu vực kiểm duyệt tin đăng và quản lý tài khoản ĐHQG.
                    </span>
                  ) : (
                    <>
                      Chưa có tài khoản?{' '}
                      <Link to="/register" className="font-semibold text-[#1557A0] hover:underline">
                        Đăng ký ngay
                      </Link>
                    </>
                  )}
                </p>
              </div>

              {/* Thông báo tạo tài khoản thành công */}
              {justRegistered && !error && (
                <div className="p-4 rounded-xl mb-4 bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 space-y-1 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Bạn đã tạo tài khoản thành công!</span>
                  </div>
                  <p className="text-[11px] text-emerald-700">
                    Vui lòng nhập mật khẩu bạn vừa đăng ký để đăng nhập vào hệ thống.
                  </p>
                </div>
              )}

              {/* Thông báo lỗi khi tài khoản chưa tồn tại */}
              {error && (
                <div className={`p-4 rounded-xl mb-4 text-xs space-y-2 border ${
                  needRegister
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-red-50 border-red-200 text-red-600'
                }`}>
                  <div className="flex items-center gap-2 font-bold">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                  {needRegister && (
                    <div className="pt-1">
                      <Link
                        to={`/register?email=${encodeURIComponent(email)}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1557A0] text-white font-bold hover:bg-[#10437d] transition-colors"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Tạo tài khoản với email này ngay</span>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email đăng nhập
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); setNeedRegister(false); }}
                    placeholder="ví dụ: minhanh@uel.edu.vn hoặc gmail"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1557A0] focus:ring-2 focus:ring-[#1557A0]/10"
                  />
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
                  className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-[#1557A0] hover:bg-[#10437d] transition-all duration-150 shadow-sm active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    'Đang kiểm tra...'
                  ) : loginRole === 'admin' ? (
                    '🛡️ Đăng nhập Cổng Quản Trị ĐHQG'
                  ) : (
                    'Đăng nhập'
                  )}
                </button>
              </form>

              {/* Thông tin an toàn */}
              <div className="mt-5 p-3.5 rounded-xl bg-[#EBF4FF] border border-blue-100 flex items-start gap-2.5 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-[#1557A0] shrink-0 mt-0.5" />
                <span>
                  {loginRole === 'admin'
                    ? 'Tài khoản Quản trị viên được phân quyền bảo mật cao. Sau khi đăng nhập sẽ vào thẳng Cổng Quản trị nội bộ.'
                    : 'Tài khoản được liên kết với email sinh viên trường thành viên ĐHQG-HCM để đảm bảo an toàn và tin cậy.'}
                </span>
              </div>

              {/* Quick Login Demo */}
              <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Tài khoản sinh viên trải nghiệm (Demo)
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('minhanh@uel.edu.vn')}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 hover:border-[#1557A0] hover:bg-blue-50/50 text-xs font-medium text-slate-700 text-left transition-colors flex items-center justify-between"
                  >
                    <span>👤 Minh Anh (ĐH Kinh tế - Luật)</span>
                    <span className="text-[10px] text-slate-400">Đăng nhập thử 1 chạm →</span>
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
