import React from 'react';
import { 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  ChevronDown
} from 'lucide-react';
import { useTicketStore } from '../store/useTicketStore';

export const PriorityBadge = ({ priority }) => {
  const configs = {
    high: {
      label: 'High',
      bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      dot: 'bg-rose-500'
    },
    medium: {
      label: 'Medium',
      bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      dot: 'bg-amber-500'
    },
    low: {
      label: 'Low',
      bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      dot: 'bg-emerald-500'
    }
  };

  const config = configs[priority] || configs.low;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${config.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      {config.label}
    </span>
  );
};

export const StatusBadge = ({ status }) => {
  const configs = {
    open: {
      label: 'Open',
      icon: AlertCircle,
      bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30'
    },
    in_progress: {
      label: 'In Progress',
      icon: Clock,
      bg: 'bg-sky-500/15 text-sky-400 border-sky-500/30'
    },
    resolved: {
      label: 'Resolved',
      icon: CheckCircle2,
      bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
    }
  };

  const config = configs[status] || configs.open;
  const IconComponent = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${config.bg}`}>
      <IconComponent className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
};

export const QuickStatusDropdown = ({ ticket }) => {
  const { updateTicketStatus } = useTicketStore();

  const handleChange = (e) => {
    e.stopPropagation();
    const newStatus = e.target.value;
    if (newStatus !== ticket.status) {
      updateTicketStatus(ticket.id, newStatus);
    }
  };

  const getSelectStyle = (st) => {
    if (st === 'open') return 'bg-amber-500/15 text-amber-400 border-amber-500/40 focus:border-amber-400';
    if (st === 'in_progress') return 'bg-sky-500/15 text-sky-400 border-sky-500/40 focus:border-sky-400';
    if (st === 'resolved') return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 focus:border-emerald-400';
    return 'bg-slate-800 text-slate-300 border-slate-700';
  };

  return (
    <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
      <select
        value={ticket.status}
        onChange={handleChange}
        className={`appearance-none text-xs font-bold px-2.5 py-1 pr-6 rounded-lg border focus:outline-none cursor-pointer transition-colors ${getSelectStyle(ticket.status)}`}
      >
        <option value="open" className="bg-slate-900 text-amber-400">Open</option>
        <option value="in_progress" className="bg-slate-900 text-sky-400">In Progress</option>
        <option value="resolved" className="bg-slate-900 text-emerald-400">Resolved</option>
      </select>
      <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none opacity-80" />
    </div>
  );
};
