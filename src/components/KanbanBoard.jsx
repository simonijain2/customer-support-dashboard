import React from 'react';
import { 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft
} from 'lucide-react';
import { useTicketStore } from '../store/useTicketStore';
import { PriorityBadge } from './TicketBadges';
import { AvatarPlaceholder } from './AvatarPlaceholder';

export const KanbanBoard = () => {
  const { getFilteredTickets, setSelectedTicketId, updateTicketStatus } = useTicketStore();
  const tickets = getFilteredTickets();

  const columns = [
    {
      id: 'open',
      title: 'Open',
      icon: AlertCircle,
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      headerBg: 'bg-amber-500/5 border-amber-500/20'
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      icon: Clock,
      badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      headerBg: 'bg-sky-500/5 border-sky-500/20'
    },
    {
      id: 'resolved',
      title: 'Resolved',
      icon: CheckCircle2,
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      headerBg: 'bg-emerald-500/5 border-emerald-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((col) => {
        const IconComp = col.icon;
        const columnTickets = tickets.filter((t) => t.status === col.id);

        return (
          <div
            key={col.id}
            className="flex flex-col rounded-2xl bg-zinc-950 border border-zinc-800 backdrop-blur-md overflow-hidden min-h-[500px]"
          >
            <div className={`p-4 border-b border-zinc-800 flex items-center justify-between ${col.headerBg}`}>
              <div className="flex items-center gap-2.5">
                <IconComp className="w-4 h-4 text-zinc-300" />
                <h3 className="font-bold text-sm text-zinc-100">{col.title}</h3>
              </div>
              <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${col.badgeColor}`}>
                {columnTickets.length}
              </span>
            </div>

            <div className="p-3 flex-1 flex flex-col gap-3 overflow-y-auto max-h-[700px]">
              {columnTickets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-500 text-xs font-medium">
                  No tickets in {col.title}
                </div>
              ) : (
                columnTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicketId(ticket.id)}
                    className="group rounded-xl bg-black border border-zinc-800 hover:border-indigo-500/40 p-4 cursor-pointer transition-all hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-bold text-indigo-400">
                        {ticket.id}
                      </span>
                      <PriorityBadge priority={ticket.priority} />
                    </div>

                    <h4 className="text-xs font-bold text-white line-clamp-2 mb-2 group-hover:text-indigo-300 transition-colors">
                      {ticket.subject}
                    </h4>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-zinc-800/60 text-[11px] text-zinc-400">
                      <div className="flex items-center gap-2">
                        <AvatarPlaceholder name={ticket.customer.name} size="sm" />
                        <span className="truncate max-w-[100px] font-medium text-zinc-300">
                          {ticket.customer.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                        {col.id !== 'open' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const prev = col.id === 'resolved' ? 'in_progress' : 'open';
                              updateTicketStatus(ticket.id, prev);
                            }}
                            title="Move back"
                            className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                        )}

                        {col.id !== 'resolved' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const next = col.id === 'open' ? 'in_progress' : 'resolved';
                              updateTicketStatus(ticket.id, next);
                            }}
                            title="Move forward"
                            className="p-1 rounded hover:bg-zinc-800 text-indigo-400 hover:text-indigo-300"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
};
