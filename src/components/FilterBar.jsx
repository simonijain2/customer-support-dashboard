import React from 'react';
import { 
  Search, 
  X, 
  LayoutList, 
  LayoutGrid, 
  Columns, 
  ArrowUpDown, 
  ChevronDown
} from 'lucide-react';
import { useTicketStore } from '../store/useTicketStore';

export const FilterBar = () => {
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    getFilteredTickets,
    tickets
  } = useTicketStore();

  const filteredCount = getFilteredTickets().length;
  const hasActiveFilters = searchQuery !== '' || statusFilter !== 'all' || priorityFilter !== 'all';

  const clearAllFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 mb-6 backdrop-blur-md shadow-sm">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Filter by customer, issue title, ID, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black border border-zinc-800 focus:border-indigo-500 rounded-xl pl-10 pr-9 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-black border border-zinc-800 focus:border-indigo-500 rounded-xl pl-3 pr-8 py-2 text-xs font-medium text-zinc-300 focus:outline-none cursor-pointer"
            >
              <option value="all">Status: All</option>
              <option value="open">Status: Open</option>
              <option value="in_progress">Status: In Progress</option>
              <option value="resolved">Status: Resolved</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="appearance-none bg-black border border-zinc-800 focus:border-indigo-500 rounded-xl pl-3 pr-8 py-2 text-xs font-medium text-zinc-300 focus:outline-none cursor-pointer"
            >
              <option value="all">Priority: All</option>
              <option value="high">Priority: High 🔴</option>
              <option value="medium">Priority: Medium 🟡</option>
              <option value="low">Priority: Low 🟢</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-black border border-zinc-800 focus:border-indigo-500 rounded-xl pl-8 pr-8 py-2 text-xs font-medium text-zinc-300 focus:outline-none cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="priority">Sort: Highest Priority</option>
            </select>
            <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl transition-all"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <div className="h-6 w-[1px] bg-zinc-800 mx-1 hidden sm:block"></div>

          <div className="flex items-center bg-black border border-zinc-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => setViewMode('table')}
              title="Table View"
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('cards')}
              title="Card Grid View"
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'cards'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              title="Kanban Board View"
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'kanban'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Columns className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800/60 text-xs text-zinc-400 font-medium">
        <div>
          Showing <span className="text-white font-bold">{filteredCount}</span> of <span className="text-zinc-300 font-semibold">{tickets.length}</span> tickets
          {hasActiveFilters && <span className="text-indigo-400 ml-1.5">(Filtered)</span>}
        </div>
        <div className="hidden sm:block text-zinc-500">
          Click any row or card to open full ticket details & conversation thread
        </div>
      </div>

    </div>
  );
};
