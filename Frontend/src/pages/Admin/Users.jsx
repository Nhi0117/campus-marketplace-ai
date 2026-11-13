import React, { useState } from 'react';
import { Search, Lock, Unlock, ShieldCheck, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';

const MOCK_USERS = [
  {
    id: 1,
    name: 'Nguyễn Trần Minh Anh',
    initials: 'MA',
    mssv: '2154010834',
    email: 'minhanh@st.uel.edu.vn',
    school: 'Đại học Kinh tế - Luật',
    isVerified: true,
    status: 'active', // active | locked
    statusText: 'Hoạt động',
  },
  {
    id: 2,
    name: 'Lê Văn B',
    initials: 'LB',
    mssv: '2011892110',
    email: 'levanb@hcmut.edu.vn',
    school: 'Đại học Bách Khoa',
    isVerified: false,
    status: 'locked',
    statusText: 'Bị khóa',
  },
  {
    id: 3,
    name: 'Quốc Huy',
    initials: 'QH',
    mssv: '1914205',
    note: 'Đăng tin L2 Casio fx-580',
    email: 'quochuy@hcmut.edu.vn',
    school: 'Đại học Bách Khoa',
    isVerified: false,
    status: 'active',
    statusText: 'Hoạt động',
  },
  {
    id: 4,
    name: 'Thu Hà',
    initials: 'TH',
    mssv: '2212004',
    note: 'Đăng tin L3 Vở XSTK',
    email: 'thuha@hcmus.edu.vn',
    school: 'Đại học Khoa học Tự nhiên',
    isVerified: false,
    status: 'active',
    statusText: 'Hoạt động',
  },
  {
    id: 5,
    name: 'Gia Bảo',
    initials: 'GB',
    mssv: '2152190',
    note: 'Đăng tin L4 Quạt mini',
    email: 'giabao@uit.edu.vn',
    school: 'Đại học Công nghệ Thông tin',
    isVerified: false,
    status: 'active',
    statusText: 'Hoạt động',
  },
  {
    id: 6,
    name: 'Trần Hoàng Nam',
    initials: 'TN',
    mssv: '2052011',
    note: 'Báo cáo gian lận đặt cọc',
    email: 'namth@uit.edu.vn',
    school: 'Đại học Công nghệ Thông tin',
    isVerified: false,
    status: 'locked',
    statusText: 'Bị khóa',
    warning: true,
  },
];

export const AdminUsersPage = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState('all'); // all | active | locked

  const toggleLock = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'active' ? 'locked' : 'active';
        return {
          ...u,
          status: nextStatus,
          statusText: nextStatus === 'active' ? 'Hoạt động' : 'Bị khóa',
        };
      }
      return u;
    }));
  };

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.mssv.includes(searchTerm);
    if (!matchSearch) return false;
    if (filterTab === 'active') return u.status === 'active';
    if (filterTab === 'locked') return u.status === 'locked';
    return true;
  });

  return (
    <div className="flex bg-slate-50 min-h-[calc(100vh-64px)]">
      <AdminSidebar activeTab="users" />

      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Quản lý tài khoản</h1>
            <p className="text-xs text-slate-500 mt-1">
              Quản trị danh sách thành viên sinh viên ĐHQG-HCM, kiểm soát quyền truy cập và bảo vệ môi trường giao dịch học liệu an toàn.
            </p>
          </div>

          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-[#1557A0] text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-sm transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Đồng bộ SSO ĐHQG-HCM</span>
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-semibold block">Tổng sinh viên</span>
              <div className="text-3xl font-bold text-slate-900 mt-1">1.240</div>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-[#1557A0] text-xs font-semibold">
              Đã đăng ký
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-semibold block">Đã xác thực ĐHQG</span>
              <div className="text-3xl font-bold text-emerald-600 mt-1">100%</div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
              Email .edu.vn
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-semibold block">Đang vi phạm / Bị khóa</span>
              <div className="text-3xl font-bold text-red-600 mt-1">22</div>
            </div>
            <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold">
              Cần xử lý
            </span>
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo email hoặc MSSV..."
              className="w-full px-4 py-2.5 pl-10 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1557A0]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterTab === 'all'
                  ? 'bg-[#1557A0] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Tất cả tài khoản (1.240)
            </button>
            <button
              onClick={() => setFilterTab('active')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterTab === 'active'
                  ? 'bg-[#1557A0] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Đang hoạt động (1.218)
            </button>
            <button
              onClick={() => setFilterTab('locked')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterTab === 'locked'
                  ? 'bg-[#1557A0] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Bị khóa (22)
            </button>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Họ và Tên</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Trường ĐH</th>
                  <th className="py-3 px-4">Trạng thái</th>
                  <th className="py-3 px-4 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-500">{u.id}</td>
                    
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-[#1557A0] font-bold text-xs flex items-center justify-center shrink-0">
                          {u.initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900">{u.name}</span>
                            {u.isVerified && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">
                                Đã xác thực
                              </span>
                            )}
                          </div>
                          <p className={`text-[11px] ${u.warning ? 'text-red-500 font-medium' : 'text-slate-400'}`}>
                            {u.warning && 'Báo cáo gian lận đặt cọc | '}MSSV: {u.mssv}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600">{u.email}</td>

                    <td className="py-3.5 px-4 text-slate-700 font-medium">{u.school}</td>

                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                        u.status === 'active' ? 'text-emerald-600' : 'text-red-500'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          u.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'
                        }`} />
                        {u.statusText}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => toggleLock(u.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-colors ${
                          u.status === 'active'
                            ? 'text-red-600 hover:bg-red-50'
                            : 'text-[#1557A0] hover:bg-blue-50'
                        }`}
                      >
                        {u.status === 'active' ? (
                          <>
                            <Lock className="w-3.5 h-3.5" />
                            <span>Khóa</span>
                          </>
                        ) : (
                          <>
                            <Unlock className="w-3.5 h-3.5" />
                            <span>Mở khóa</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Hiển thị 1 - 6 trên tổng số 1.240 tài khoản</span>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50">Trước</button>
              <button className="px-3 py-1 rounded-lg bg-[#1557A0] text-white font-bold">1</button>
              <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50">2</button>
              <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50">3</button>
              <span>...</span>
              <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50">124</button>
              <button className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50">Sau</button>
            </div>
          </div>
        </div>

        {/* AI Security Banner */}
        <div className="p-5 rounded-2xl bg-[#EBF4FF]/80 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#1557A0] text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Hệ thống giám sát bảo mật AI Campus</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Tự động phát hiện 3 tài khoản nghi vấn đăng tin lừa đảo giả mạo sinh viên tuần này. Tất cả dữ liệu đối soát trực tiếp với cơ sở dữ liệu xác thực SSO VNUHCM.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-white border border-[#1557A0] text-[#1557A0] hover:bg-blue-50 text-xs font-bold shrink-0 transition-colors"
          >
            Xem báo cáo AI
          </button>
        </div>

      </div>
    </div>
  );
};
