/**
 * Danh mục sản phẩm theo Figma thiết kế chính thức
 * 4 danh mục chính + 1 "Tất cả"
 */
export const CATEGORIES = [
  {
    id: 'all',
    name: 'Tất cả danh mục',
    iconName: 'LayoutGrid',
    icon: '📦',
    description: '',
    color: 'bg-slate-100 text-slate-700'
  },
  {
    id: 'hoc-lieu',
    name: 'Học liệu',
    iconName: 'BookOpen',
    icon: '📚',
    description: 'Giáo trình, tài liệu ôn thi',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    id: 'do-dung-hoc-tap',
    name: 'Đồ dùng học tập',
    iconName: 'PencilRuler',
    icon: '✏️',
    description: 'Bút vẽ kỹ thuật, thước kẻ',
    color: 'bg-indigo-50 text-indigo-700'
  },
  {
    id: 'thiet-bi-hoc-tap',
    name: 'Thiết bị học tập',
    iconName: 'Laptop',
    icon: '💻',
    description: 'Máy tính bỏ túi, tai nghe, laptop',
    color: 'bg-violet-50 text-violet-700'
  },
  {
    id: 'vat-dung-sinh-vien',
    name: 'Vật dụng sinh viên',
    iconName: 'Lamp',
    icon: '🏠',
    description: 'Đèn học, quạt mini, đồ điện',
    color: 'bg-sky-50 text-sky-700'
  },
];

/** Loại tin đăng */
export const LISTING_TYPES = [
  { id: 'sell',  label: 'Bán',         color: 'bg-[#1557A0] text-white' },
  { id: 'give',  label: 'Tặng',        color: 'bg-emerald-600 text-white' },
  { id: 'trade', label: 'Trao đổi',    color: 'bg-slate-500 text-white' },
  { id: 'want',  label: 'Cần mua',     color: 'bg-amber-500 text-white' },
];

export const listingTypeLabel = (type) => {
  const map = { sell: 'Bán', give: 'Tặng', trade: 'Trao đổi', want: 'Cần mua' };
  return map[type] || type;
};
