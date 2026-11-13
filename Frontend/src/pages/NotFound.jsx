import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
      <div className="text-8xl font-black text-blue-600/20 mb-4 select-none">404</div>
      <h1 className="text-2xl font-black text-slate-800 mb-2">Trang không tồn tại</h1>
      <p className="text-sm text-slate-500 max-w-sm mb-6">
        Đường dẫn bạn truy cập có thể đã bị thay đổi hoặc không còn tồn tại trên chợ sinh viên.
      </p>
      <Link to="/">
        <Button variant="primary" size="md" icon={Home}>
          Trở về Trang chủ
        </Button>
      </Link>
    </div>
  );
};
