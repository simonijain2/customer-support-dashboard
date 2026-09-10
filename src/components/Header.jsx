import React from 'react';
import { 
  Headphones, 
  Plus, 
  RotateCcw, 
  AlertTriangle, 
  Bell, 
  Search
} from 'lucide-react';
import { useTicketStore } from '../store/useTicketStore';
import { AvatarPlaceholder } from './AvatarPlaceholder';

export const Header = () => {
  const { 
    simulateError, 
    toggleSimulateError, 
    resetToMockData, 
    setCreateModalOpen,
    searchQuery,
    setSearchQuery,
    tickets
  } = useTicketStore();

  const openTicketsCount = tickets.filter(t => t.status === 'open').length;

  return (
    <header className="sticky top-0 z-30 bg-black/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25">
              <Headphones className="w-5.5 h-5.5 text-white" />
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-black"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  OmniDesk <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Pro</span>
                </h1>
              </div>
              <p className="text-xs text-zinc-400 font-medium hidden sm:block">Customer Support & Operations Engine</p>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Quick search tickets (e.g. TCK-8902, Webhook, Sarah)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleSimulateError}
              title={simulateError ? "Disable API Error Simulation" : "Simulate REST API Error state"}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                simulateError 
                  ? "bg-rose-500/15 text-rose-400 border-rose-500/30 hover:bg-rose-500/25 animate-pulse" 
                  : "bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <AlertTriangle className={`w-3.5 h-3.5 ${simulateError ? "text-rose-400" : "text-amber-400"}`} />
              <span className="hidden lg:inline">{simulateError ? "Error Simulation ON" : "Simulate API Error"}</span>
            </button>

            <button
              onClick={resetToMockData}
              title="Reset dataset to initial mock seed"
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg border border-transparent hover:border-zinc-800 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="relative">
              <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg border border-transparent hover:border-zinc-800 transition-all">
                <Bell className="w-4 h-4" />
                {openTicketsCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
                )}
              </button>
            </div>

            <div className="h-6 w-[1px] bg-zinc-800 mx-0.5"></div>

            <button
              onClick={() => setCreateModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 rounded-xl shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>New Ticket</span>
            </button>

            {/* Profile Avatar with Add Photo Icon */}
            <div className="flex items-center pl-1">
              <AvatarPlaceholder name="Agent" size="md" />
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
