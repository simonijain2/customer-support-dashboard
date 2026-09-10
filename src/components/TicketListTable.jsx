import React from 'react';
import { 
  ChevronRight, 
  MessageSquare, 
  Calendar, 
  Tag
} from 'lucide-react';
import { useTicketStore } from '../store/useTicketStore';
import { PriorityBadge, QuickStatusDropdown } from './TicketBadges';
import { AvatarPlaceholder } from './AvatarPlaceholder';

export const TicketListTable = () => {
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
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-black text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              <th className="py-3.5 px-4 font-bold">Ticket ID</th>
              <th className="py-3.5 px-4 font-bold">Customer</th>
              <th className="py-3.5 px-4 font-bold">Subject / Issue</th>
              <th className="py-3.5 px-4 font-bold">Priority</th>
              <th className="py-3.5 px-4 font-bold">Status</th>
              <th className="py-3.5 px-4 font-bold">Created Date</th>
              <th className="py-3.5 px-4 text-right font-bold">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800/80 text-xs font-medium">
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                onClick={() => setSelectedTicketId(ticket.id)}
                className="group hover:bg-zinc-900/60 transition-colors cursor-pointer"
              >
                <td className="py-4 px-4 whitespace-nowrap font-mono font-bold text-indigo-400">
                  {ticket.id}
                </td>

                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <AvatarPlaceholder name={ticket.customer.name} size="md" />
                    <div>
                      <div className="font-semibold text-zinc-200 group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
                        {ticket.customer.name}
                        {ticket.customer.tier && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded font-medium bg-zinc-900 text-zinc-400 border border-zinc-700">
                            {ticket.customer.tier}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-zinc-400 font-normal">
                        {ticket.customer.email}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4 max-w-xs">
                  <div className="font-semibold text-zinc-100 line-clamp-1 group-hover:text-white transition-colors">
                    {ticket.subject}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded bg-black text-zinc-400 border border-zinc-800">
                      <Tag className="w-2.5 h-2.5 text-indigo-400" />
                      {ticket.category}
                    </span>
                    {ticket.messages && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-zinc-500">
                        <MessageSquare className="w-2.5 h-2.5" />
                        {ticket.messages.length} replies
                      </span>
                    )}
                  </div>
                </td>

                <td className="py-4 px-4 whitespace-nowrap">
                  <PriorityBadge priority={ticket.priority} />
                </td>

                <td className="py-4 px-4 whitespace-nowrap">
                  <QuickStatusDropdown ticket={ticket} />
                </td>

                <td className="py-4 px-4 whitespace-nowrap text-zinc-400 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    {formatDate(ticket.createdAt)}
                  </div>
                </td>

                <td className="py-4 px-4 whitespace-nowrap text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTicketId(ticket.id);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-2.5 py-1 rounded-lg border border-indigo-500/20 transition-all"
                  >
                    Details
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
