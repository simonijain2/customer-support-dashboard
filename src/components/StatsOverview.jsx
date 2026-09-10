import React from 'react';
import { 
  Inbox, 
  Clock, 
  AlertCircle, 
  CheckCircle2
} from 'lucide-react';
import { useTicketStore } from '../store/useTicketStore';

export const StatsOverview = () => {
  const { getStats, statusFilter, setStatusFilter } = useTicketStore();
  const stats = getStats();

  const cards = [
    {
      id: 'all',
      title: 'Total Tickets',
      value: stats.total,
      badge: 'Lifetime Pool',
      icon: Inbox,
      color: 'indigo',
      gradient: 'from-indigo-500/20 via-indigo-500/5 to-transparent',
      borderColor: 'border-indigo-500/30',
      activeBorder: 'border-indigo-500 ring-2 ring-indigo-500/20 bg-zinc-900',
      textColor: 'text-indigo-400',
      iconBg: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
    },
    {
      id: 'open',
      title: 'Open',
      value: stats.open,
      badge: stats.highPriority > 0 ? `${stats.highPriority} Urgent High Priority` : 'Needs Action',
      icon: AlertCircle,
      color: 'amber',
      gradient: 'from-amber-500/20 via-amber-500/5 to-transparent',
      borderColor: 'border-amber-500/30',
      activeBorder: 'border-amber-500 ring-2 ring-amber-500/20 bg-zinc-900',
      textColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      value: stats.inProgress,
      badge: 'Active Investigation',
      icon: Clock,
      color: 'sky',
      gradient: 'from-sky-500/20 via-sky-500/5 to-transparent',
      borderColor: 'border-sky-500/30',
      activeBorder: 'border-sky-500 ring-2 ring-sky-500/20 bg-zinc-900',
      textColor: 'text-sky-400',
      iconBg: 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
    },
    {
      id: 'resolved',
      title: 'Resolved',
      value: stats.resolved,
      badge: `${stats.resolutionRate}% Success Rate`,
      icon: CheckCircle2,
      color: 'emerald',
      gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
      borderColor: 'border-emerald-500/30',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/20 bg-zinc-900',
      textColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => {
        const IconComponent = card.icon;
        const isActive = statusFilter === card.id;

        return (
          <div
            key={card.id}
            onClick={() => setStatusFilter(card.id)}
            className={`group relative overflow-hidden rounded-2xl bg-zinc-950 p-5 cursor-pointer border transition-all duration-200 hover:-translate-y-0.5 ${
              isActive 
                ? card.activeBorder 
                : 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-40 transition-opacity group-hover:opacity-70`} />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`p-2 rounded-xl ${card.iconBg} transition-transform group-hover:scale-110`}>
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-white tracking-tight">
                  {card.value}
                </span>
                
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${card.iconBg}`}>
                  {card.badge}
                </span>
              </div>

              {isActive && (
                <div className={`mt-3 h-1 w-full rounded-full bg-${card.color}-500 transition-all`} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
