import React, { useState } from 'react';
import { Search, Lock, Unlock, ShieldCheck, AlertTriangle, Sparkles, RefreshCw, Trash2, UserPlus, CheckCircle2 } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { useAuth } from '../../context/AuthContext';

export const AdminUsersPage = () => {
  const { usersList, deleteUser, toggleUserLock } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState('all'); // all | active | locked
  const [actionNotice, setActionNotice] = useState('');

  // Chuẩn hoá dữ liệu người dùng từ AuthContext (lưu trữ đồng bộ trong localStorage)
  const users = (usersList || []).map((item, index) => {
    const isNew = item.id && String(item.id).startsWith('user_') && !['user_1', 'user_2', 'user_3', 'user_4', 'user_5'].includes(item.id);
    return {
      ...item,
      id: item.id || `user_${index + 1}`,
      school: item.school || item.schoolName || 'Đại học Quốc gia TP.HCM',
      mssv: item.studentId || item.mssv || '2452011',
      status: item.status || 'active',
      statusText: item.statusText || (item.status === 'locked' ? 'Bị khóa' : 'Hoạt động'),
      isNew,
    };
  });

  const totalCount = users.length;
  const activeCount = users.filter(u => u.status === 'active').length;
  const lockedCount = users.filter(u => u.status === 'locked').length;

  const handleDelete = (userItem) => {
    const confirmDelete = window.confirm(
      `XÁC NHẬN XÓA TÀI KHOẢN:\n\nBạn có chắc chắn muốn xóa vĩnh viễn tài khoản "${userItem.name}" (${userItem.email}) khỏi hệ thống?\n\nSau khi xóa, tài khoản sẽ không thể đăng nhập và sinh viên này sẽ phải đăng ký lại từ đầu nếu muốn tiếp tục sử dụng.`
    );
    if (confirmDelete) {
      deleteUser(userItem.id);
      setActionNotice(`Đã xóa vĩnh viễn tài khoản "${userItem.name}" (${userItem.email}).`);
      setTimeout(() => setActionNotice(''), 4000);
    }
  };

  const handleToggleLock = (userItem) => {
    toggleUserLock(userItem.id);
    const nextState = userItem.status === 'active' ? 'Đã khóa' : 'Đã mở khóa';
    setActionNotice(`${nextState} tài khoản "${userItem.name}".`);
    setTimeout(() => setActionNotice(''), 3000);
  };

  const filtered = users.filter(u => {
    const matchSearch = (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (u.mssv || '').includes(searchTerm);
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
              Quản trị danh sách thành viên sinh viên ĐHQG-HCM, kiểm soát quyền truy cập, khóa hoặc xóa tài khoản vi phạm.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 shadow-2xs">
              Đồng bộ dữ liệu: <strong className="text-emerald-600">Thời gian thực</strong>
            </span>
          </div>
        </div>

        {/* Thông báo kết quả thao tác (nếu có) */}
        {actionNotice && (
          <div className="mb-5 p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-[#1557A0] text-xs font-bold flex items-center gap-2 shadow-xs animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-[#1557A0] shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-semibold block">Tổng sinh viên</span>
              <div className="text-3xl font-bold text-slate-900 mt-1">{totalCount}</div>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-[#1557A0] text-xs font-semibold">
              Đã ghi nhận
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-semibold block">Đang hoạt động</span>
              <div className="text-3xl font-bold text-emerald-600 mt-1">{activeCount}</div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
              Bình thường
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-semibold block">Đang bị khóa</span>
              <div className="text-3xl font-bold text-red-600 mt-1">{lockedCount}</div>
            </div>
            <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold">
              Bị hạn chế
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
              placeholder="Tìm theo tên, email hoặc MSSV..."
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
              Tất cả ({totalCount})
            </button>
            <button
              onClick={() => setFilterTab('active')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterTab === 'active'
                  ? 'bg-[#1557A0] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Hoạt động ({activeCount})
            </button>
            <button
              onClick={() => setFilterTab('locked')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterTab === 'locked'
                  ? 'bg-[#1557A0] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Bị khóa ({lockedCount})
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
                  <th className="py-3 px-4 text-right">Hành động quản trị</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-500">{u.id}</td>
                    
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-[#1557A0] font-bold text-xs flex items-center justify-center shrink-0">
                          {u.initials || 'SV'}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-slate-900">{u.name}</span>
                            {u.isNew && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-100 text-purple-700 font-bold border border-purple-200">
                                Mới đăng ký
                              </span>
                            )}
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
                      <div className="inline-flex items-center justify-end gap-1.5">
                        {/* Nút Khóa / Mở khóa */}
                        <button
                          type="button"
                          onClick={() => handleToggleLock(u)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1 transition-colors ${
                            u.status === 'active'
                              ? 'text-amber-700 bg-amber-50 hover:bg-amber-100'
                              : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                          }`}
                          title={u.status === 'active' ? 'Khóa quyền truy cập của người dùng này' : 'Mở khóa cho người dùng'}
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

                        {/* Nút Xóa tài khoản vĩnh viễn */}
                        <button
                          type="button"
                          onClick={() => handleDelete(u)}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1 text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                          title="Xóa vĩnh viễn tài khoản khỏi hệ thống (người dùng sẽ phải đăng ký lại từ đầu)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Xóa</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Hiển thị {filtered.length} trên tổng số {totalCount} tài khoản</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-400 italic">Dữ liệu lưu trữ cục bộ (Local Database)</span>
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
