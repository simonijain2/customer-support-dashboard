import React, { useEffect } from 'react';
import { useTicketStore } from './store/useTicketStore';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { FilterBar } from './components/FilterBar';
import { TicketListTable } from './components/TicketListTable';
import { TicketCardGrid } from './components/TicketCardGrid';
import { KanbanBoard } from './components/KanbanBoard';
import { TicketDetailDrawer } from './components/TicketDetailDrawer';
import { CreateTicketModal } from './components/CreateTicketModal';
import { LoadingStateView, ErrorStateView, EmptyStateView } from './components/StateViews';
import { ToastNotification } from './components/ToastNotification';

export function App() {
  const { 
    fetchTickets, 
    loading, 
    error, 
    getFilteredTickets, 
    viewMode,
    simulateError
  } = useTicketStore();

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const filteredTickets = getFilteredTickets();

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <StatsOverview />

        <FilterBar />

        {loading ? (
          <LoadingStateView />
        ) : error ? (
          <ErrorStateView />
        ) : filteredTickets.length === 0 ? (
          <EmptyStateView />
        ) : viewMode === 'cards' ? (
          <TicketCardGrid />
        ) : viewMode === 'kanban' ? (
          <KanbanBoard />
        ) : (
          <TicketListTable />
        )}

      </main>

      <TicketDetailDrawer />
      <CreateTicketModal />
      <ToastNotification />

      <footer className="border-t border-zinc-800 bg-black py-4 px-6 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${simulateError ? 'bg-rose-400' : 'bg-emerald-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${simulateError ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
            </span>
            <span className="font-semibold text-zinc-400">
              REST API Status: <strong className={simulateError ? 'text-rose-400' : 'text-emerald-400'}>{simulateError ? '503 Error Simulated' : 'Healthy (200 OK)'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-zinc-500">
            <span>React.js + Tailwind CSS</span>
            <span>•</span>
            <span>Zustand State Store</span>
            <span>•</span>
            <span>OmniDesk v2.4</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
