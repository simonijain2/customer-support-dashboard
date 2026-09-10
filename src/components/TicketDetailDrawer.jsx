import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Building, 
  Clock, 
  Send, 
  Lock, 
  Sparkles, 
  FileText
} from 'lucide-react';
import { useTicketStore } from '../store/useTicketStore';
import { AvatarPlaceholder } from './AvatarPlaceholder';

export const TicketDetailDrawer = () => {
  const { 
    selectedTicketId, 
    setSelectedTicketId, 
    tickets, 
    updateTicketStatus, 
    updateTicketPriority,
    addMessageToTicket 
  } = useTicketStore();

  const [replyText, setReplyText] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ticket = tickets.find((t) => t.id === selectedTicketId);

  if (!ticket) return null;

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSubmitting(true);
    await addMessageToTicket(ticket.id, replyText.trim(), isInternalNote);
    setReplyText('');
    setIsSubmitting(false);
  };

  const handleQuickTemplate = (templateText) => {
    setReplyText(templateText);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={() => setSelectedTicketId(null)}
      />

      <div className="relative w-full max-w-3xl bg-black border-l border-zinc-800 shadow-2xl flex flex-col h-full z-10">
        
        <div className="px-6 py-4 border-b border-zinc-800 bg-black/90 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-extrabold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
              {ticket.id}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800">
              {ticket.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedTicketId(null)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
              title="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-4 leading-snug">
              {ticket.subject}
            </h2>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800/80">
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-400">Status:</span>
                <select
                  value={ticket.status}
                  onChange={(e) => updateTicketStatus(ticket.id, e.target.value)}
                  className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer transition-all ${
                    ticket.status === 'open' 
                      ? 'bg-amber-500/15 text-amber-400 border-amber-500/40' 
                      : ticket.status === 'in_progress' 
                      ? 'bg-sky-500/15 text-sky-400 border-sky-500/40' 
                      : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                  }`}
                >
                  <option value="open" className="bg-black text-amber-400">Open</option>
                  <option value="in_progress" className="bg-black text-sky-400">In Progress</option>
                  <option value="resolved" className="bg-black text-emerald-400">Resolved</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-400">Priority:</span>
                <select
                  value={ticket.priority}
                  onChange={(e) => updateTicketPriority(ticket.id, e.target.value)}
                  className="text-xs font-extrabold px-3 py-1.5 rounded-xl bg-black text-zinc-200 border border-zinc-800 focus:outline-none cursor-pointer"
                >
                  <option value="high" className="text-rose-400">High 🔴</option>
                  <option value="medium" className="text-amber-400">Medium 🟡</option>
                  <option value="low" className="text-emerald-400">Low 🟢</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                <span>Created {formatDate(ticket.createdAt)}</span>
              </div>

            </div>
          </div>

          {/* Customer Details Card */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3.5 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" />
              Customer Details
            </h3>

            <div className="flex items-start gap-4">
              <AvatarPlaceholder name={ticket.customer.name} size="lg" />
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    {ticket.customer.name}
                    {ticket.customer.tier && (
                      <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {ticket.customer.tier} Tier
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400 mt-1">
                    <Mail className="w-3 h-3 text-zinc-500" />
                    <a href={`mailto:${ticket.customer.email}`} className="hover:underline text-indigo-300">
                      {ticket.customer.email}
                    </a>
                  </div>
                </div>

                <div className="space-y-1 text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3 h-3 text-zinc-500" />
                    <span>Company: <strong className="text-zinc-200">{ticket.customer.company}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-zinc-500" />
                    <span>Phone: {ticket.customer.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              Issue Summary & Context
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-normal whitespace-pre-line bg-black p-4 rounded-xl border border-zinc-800/80">
              {ticket.description}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
              <span>Conversation Thread ({ticket.messages?.length || 0})</span>
              <span className="text-[11px] text-zinc-500 normal-case">Latest updates on top</span>
            </h3>

            <div className="space-y-4">
              {ticket.messages && ticket.messages.map((msg) => {
                const isAgent = msg.sender === 'agent';
                const isInternal = msg.isInternalNote;

                return (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isInternal
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                        : isAgent
                        ? 'bg-indigo-950/40 border-indigo-500/30 text-zinc-100 ml-4'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-200 mr-4'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <AvatarPlaceholder name={msg.author} size="sm" />
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          {msg.author}
                          {isAgent && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">
                              Support Agent
                            </span>
                          )}
                          {isInternal && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" /> Internal Note
                            </span>
                          )}
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-400 font-medium">
                        {formatDate(msg.timestamp)}
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed font-normal whitespace-pre-line pl-9">
                      {msg.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        <div className="p-5 border-t border-zinc-800 bg-black space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px]">
            <span className="text-zinc-500 font-semibold flex items-center gap-1 whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-indigo-400" /> Quick Replies:
            </span>
            <button
              onClick={() => handleQuickTemplate("We are currently investigating your issue and will report back within 30 minutes.")}
              className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 whitespace-nowrap border border-zinc-800 transition-colors"
            >
              Investigating 🔍
            </button>
            <button
              onClick={() => handleQuickTemplate("We have applied a hotfix to resolve this issue. Please verify on your dashboard.")}
              className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 whitespace-nowrap border border-zinc-800 transition-colors"
            >
              Fixed & Deployed ✅
            </button>
            <button
              onClick={() => handleQuickTemplate("Could you please provide your system logs or screenshot details?")}
              className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 whitespace-nowrap border border-zinc-800 transition-colors"
            >
              Request Info ❓
            </button>
          </div>

          <form onSubmit={handleSendReply} className="space-y-3">
            <div className="relative">
              <textarea
                rows="3"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={isInternalNote ? "Write an internal team note (not visible to customer)..." : "Write a response to customer..."}
                className={`w-full text-xs p-3.5 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                  isInternalNote
                    ? 'bg-amber-950/20 border-amber-500/40 text-amber-100 placeholder-amber-500/50 focus:ring-amber-500/30'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:ring-indigo-500/20'
                }`}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-zinc-400 hover:text-zinc-200">
                <input
                  type="checkbox"
                  checked={isInternalNote}
                  onChange={(e) => setIsInternalNote(e.target.checked)}
                  className="rounded border-zinc-700 bg-black text-amber-500 focus:ring-amber-500/20"
                />
                <span className={isInternalNote ? "text-amber-400" : ""}>
                  Internal Team Note (Private)
                </span>
              </label>

              <button
                type="submit"
                disabled={!replyText.trim() || isSubmitting}
                className={`flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl transition-all shadow-md ${
                  isInternalNote
                    ? 'bg-amber-600 hover:bg-amber-500 text-black shadow-amber-500/20'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isInternalNote ? 'Save Internal Note' : 'Send Reply'}</span>
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
