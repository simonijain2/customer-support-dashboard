import React from 'react';
import { 
  Calendar, 
  ChevronRight
} from 'lucide-react';
import { useTicketStore } from '../store/useTicketStore';
import { PriorityBadge, QuickStatusDropdown } from './TicketBadges';
import { AvatarPlaceholder } from './AvatarPlaceholder';

export const TicketCardGrid = () => {
  const { getFilteredTickets, setSelectedTicketId } = useTicketStore();
  const tickets = getFilteredTickets();

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          onClick={() => setSelectedTicketId(ticket.id)}
          className="group relative flex flex-col justify-between rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-indigo-500/40 p-5 backdrop-blur-md cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-extrabold text-indigo-400">
                  {ticket.id}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-black text-zinc-400 border border-zinc-800">
                  {ticket.category}
                </span>
              </div>
              <PriorityBadge priority={ticket.priority} />
            </div>

            <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 mb-2">
              {ticket.subject}
            </h3>

            <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed font-normal">
              {ticket.description}
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-800/80">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <AvatarPlaceholder name={ticket.customer.name} size="sm" />
                <div className="text-xs font-semibold text-zinc-200">
                  {ticket.customer.name}
                </div>
              </div>
              <QuickStatusDropdown ticket={ticket} />
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-500 font-medium">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-zinc-500" />
                {formatDate(ticket.createdAt)}
              </div>
              <div className="flex items-center gap-1 text-indigo-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                <span>View Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
