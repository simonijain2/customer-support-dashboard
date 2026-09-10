import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useTicketStore } from '../store/useTicketStore';

export const ToastNotification = () => {
  const { toast } = useTicketStore();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
    error: <AlertCircle className="w-4 h-4 text-rose-400" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-400" />,
    info: <Info className="w-4 h-4 text-indigo-400" />
  };

  const borders = {
    success: 'border-emerald-500/30 bg-emerald-950/80 text-emerald-200',
    error: 'border-rose-500/30 bg-rose-950/80 text-rose-200',
    warning: 'border-amber-500/30 bg-amber-950/80 text-amber-200',
    info: 'border-indigo-500/30 bg-slate-900/90 text-slate-100'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-md text-xs font-semibold max-w-md ${borders[toast.type] || borders.info}`}>
        {icons[toast.type] || icons.info}
        <span className="flex-1">{toast.message}</span>
      </div>
    </div>
  );
};
