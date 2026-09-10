import React from 'react';
import { 
  RotateCcw, 
  FilterX, 
  ShieldAlert
} from 'lucide-react';
import { useTicketStore } from '../store/useTicketStore';

export const LoadingStateView = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-zinc-950 border border-zinc-800 animate-pulse p-5">
            <div className="h-4 w-24 bg-zinc-800 rounded mb-4" />
            <div className="h-8 w-16 bg-zinc-800 rounded" />
          </div>
        ))}
      </div>

      <div className="h-16 rounded-2xl bg-zinc-950 border border-zinc-800 animate-pulse" />

      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-14 bg-zinc-900 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );
};

export const ErrorStateView = () => {
  const { error, fetchTickets, toggleSimulateError, simulateError } = useTicketStore();

  return (
    <div className="bg-black border border-rose-500/30 rounded-3xl p-8 max-w-2xl mx-auto my-12 text-center backdrop-blur-md shadow-2xl">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-4 animate-bounce">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-extrabold text-white mb-2">
        REST API Service Interrupted
      </h3>

      <p className="text-xs text-rose-300 font-mono bg-rose-950/40 p-3 rounded-xl border border-rose-500/20 max-w-md mx-auto mb-6 text-left break-words">
        {error}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => fetchTickets()}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/20 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retry Request</span>
        </button>

        {simulateError && (
          <button
            onClick={toggleSimulateError}
            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs rounded-xl border border-zinc-800 transition-all"
          >
            <span>Disable Error Simulation</span>
          </button>
        )}
      </div>
    </div>
  );
};

export const EmptyStateView = () => {
  const { setSearchQuery, setStatusFilter, setPriorityFilter } = useTicketStore();

  const handleReset = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
  };

  return (
    <div className="bg-black border border-zinc-800 rounded-3xl p-12 text-center my-8 backdrop-blur-md">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 text-zinc-400 border border-zinc-800 mb-4">
        <FilterX className="w-8 h-8 text-indigo-400" />
      </div>

      <h3 className="text-base font-bold text-white mb-1">
        No Matching Support Tickets Found
      </h3>

      <p className="text-xs text-zinc-400 max-w-md mx-auto mb-6">
        No tickets matched your current search keywords or status/priority filters. Try adjusting your search query or clear all filters.
      </p>

      <button
        onClick={handleReset}
        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition-all shadow-md shadow-indigo-500/20"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset All Search Filters</span>
      </button>
    </div>
  );
};
