import React from 'react';

export default function StatusBadge({ status, size = 'md' }) {
  const getStyles = () => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'accepted':
      case 'active':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'completed':
        return 'bg-blue-50 text-blue-700 border-blue-200/80';
      case 'pending':
      case 'recommended':
        return 'bg-amber-50 text-amber-700 border-amber-200/80';
      case 'cancelled':
      case 'rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200/80';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-semibold',
    lg: 'px-3.5 py-1.5 text-sm font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${getStyles()} ${sizeStyles[size]} tracking-wide shadow-xs`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-80" />
      {status}
    </span>
  );
}
