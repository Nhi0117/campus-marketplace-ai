import React from 'react';
import { cn } from '../../utils/format';

export const Badge = ({
  children,
  variant = 'default', // 'default' | 'success' | 'warning' | 'info' | 'school'
  className = '',
  size = 'md'
}) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    school: 'bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-full font-medium border',
      variants[variant],
      sizes[size],
      className
    )}>
      {children}
    </span>
  );
};
