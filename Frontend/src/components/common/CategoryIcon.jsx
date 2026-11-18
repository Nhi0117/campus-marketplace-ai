import React from 'react';
import { LayoutGrid, BookOpen, PencilRuler, Laptop, Lamp, HelpCircle } from 'lucide-react';

const ICON_MAP = {
  all: LayoutGrid,
  'hoc-lieu': BookOpen,
  'do-dung-hoc-tap': PencilRuler,
  'thiet-bi-hoc-tap': Laptop,
  'vat-dung-sinh-vien': Lamp,
  LayoutGrid,
  BookOpen,
  PencilRuler,
  Laptop,
  Lamp,
};

export const CategoryIcon = ({ id, iconName, className = 'w-4 h-4', strokeWidth = 2, ...props }) => {
  const IconComponent = ICON_MAP[id] || ICON_MAP[iconName] || HelpCircle;
  return <IconComponent className={className} strokeWidth={strokeWidth} {...props} />;
};

export default CategoryIcon;
