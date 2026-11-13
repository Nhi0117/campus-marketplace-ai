import React from 'react';
import { cn } from '../../utils/format';

export const Button = ({ children, variant = 'primary', size = 'md', className = '', disabled = false, loading = false, type = 'button', icon: Icon, ...props }) => {
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    primary:   'bg-[#1D6FD4] hover:bg-[#1557A0] text-white shadow-sm',
    campus:    'bg-[#1557A0] hover:bg-[#0F3E73] text-white shadow-sm',
    secondary: 'bg-slate-800 hover:bg-slate-900 text-white',
    outline:   'border border-slate-300 bg-white hover:bg-slate-50 text-slate-700',
    ghost:     'hover:bg-slate-100 text-slate-700',
    danger:    'bg-red-600 hover:bg-red-700 text-white',
    success:   'bg-emerald-600 hover:bg-emerald-700 text-white',
  };
  const sizes = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-4.5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };
  return (
    <button type={type} disabled={disabled || loading} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : Icon ? <Icon className="w-4 h-4" /> : null}
      {children}
    </button>
  );
};
