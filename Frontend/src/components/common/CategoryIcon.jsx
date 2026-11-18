import React from 'react';
import { BookOpen, PencilRuler, Laptop, Lamp, Home, LayoutGrid } from 'lucide-react';

/**
 * CategoryIcon - Biểu tượng danh mục dạng nét vector chuyên nghiệp (Line-art outline)
 * Đồng bộ với phong cách vector stroke của hệ thống icon học liệu
 */
export const CategoryIcon = ({ id, className = 'w-6 h-6', strokeWidth = 2.4 }) => {
  switch (id) {
    case 'hoc-lieu':
      return <BookOpen className={className} strokeWidth={strokeWidth} />;
    case 'do-dung-hoc-tap':
      return <PencilRuler className={className} strokeWidth={strokeWidth} />;
    case 'thiet-bi-hoc-tap':
      return <Laptop className={className} strokeWidth={strokeWidth} />;
    case 'vat-dung-sinh-vien':
      return <Lamp className={className} strokeWidth={strokeWidth} />;
    case 'all':
    default:
      return <LayoutGrid className={className} strokeWidth={strokeWidth} />;
  }
};

export default CategoryIcon;
