import { create } from 'zustand';
import { ticketApi, setSimulateError, getSimulateError } from '../services/ticketApi';

export const useTicketStore = create((set, get) => ({
  tickets: [],
  loading: true,
  error: null,
  simulateError: false,

  searchQuery: '',
  statusFilter: 'all',
  priorityFilter: 'all',
  sortBy: 'newest',

  viewMode: 'table',
  selectedTicketId: null,
  isCreateModalOpen: false,
  toast: null,

  showToast: (message, type = 'info') => {
    set({ toast: { message, type } });
    setTimeout(() => {
      set({ toast: null });
    }, 4000);
  },

  fetchTickets: async () => {
    set({ loading: true, error: null });
    try {
      const data = await ticketApi.getTickets();
      set({ tickets: data, loading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch support tickets', loading: false });
    }
  },

  toggleSimulateError: async () => {
    const nextState = !get().simulateError;
    setSimulateError(nextState);
    set({ simulateError: nextState });
    get().showToast(
      nextState ? "Simulated API Error mode ENABLED. Re-fetching..." : "Simulated API Error mode DISABLED.",
      nextState ? "warning" : "success"
    );
    await get().fetchTickets();
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setPriorityFilter: (priority) => set({ priorityFilter: priority }),
  setSortBy: (sortBy) => set({ sortBy: sortBy }),
  setViewMode: (mode) => set({ viewMode: mode }),

  setSelectedTicketId: (id) => set({ selectedTicketId: id }),
  setCreateModalOpen: (isOpen) => set({ isCreateModalOpen: isOpen }),

  updateTicketStatus: async (ticketId, newStatus) => {
    const previousTickets = get().tickets;
    
    set({
      tickets: previousTickets.map((t) =>
        t.id === ticketId ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } : t
      )
    });

    try {
      const updated = await ticketApi.updateStatus(ticketId, newStatus);
      get().showToast(`Ticket ${ticketId} status updated to ${newStatus.replace('_', ' ').toUpperCase()}`, 'success');
      if (get().selectedTicketId === ticketId) {
        set((state) => ({
          tickets: state.tickets.map((t) => (t.id === ticketId ? updated : t))
        }));
      }
    } catch (err) {
      set({ tickets: previousTickets });
      get().showToast(err.message || 'Failed to update ticket status', 'error');
    }
  },

  updateTicketPriority: async (ticketId, newPriority) => {
    const previousTickets = get().tickets;

    set({
      tickets: previousTickets.map((t) =>
        t.id === ticketId ? { ...t, priority: newPriority, updatedAt: new Date().toISOString() } : t
      )
    });

    try {
      await ticketApi.updatePriority(ticketId, newPriority);
      get().showToast(`Ticket ${ticketId} priority set to ${newPriority.toUpperCase()}`, 'info');
    } catch (err) {
      set({ tickets: previousTickets });
      get().showToast(err.message || 'Failed to update priority', 'error');
    }
  },

  addMessageToTicket: async (ticketId, messageContent, isInternalNote = false) => {
    try {
      const updatedTicket = await ticketApi.addMessage(ticketId, messageContent, isInternalNote);
      set((state) => ({
        tickets: state.tickets.map((t) => (t.id === ticketId ? updatedTicket : t))
      }));
      get().showToast(isInternalNote ? "Internal team note added" : "Reply sent to customer", "success");
    } catch (err) {
      get().showToast(err.message || "Failed to post message", "error");
    }
  },

  createTicket: async (ticketData) => {
    try {
      const created = await ticketApi.createTicket(ticketData);
      set((state) => ({
        tickets: [created, ...state.tickets],
        isCreateModalOpen: false
      }));
      get().showToast(`New ticket ${created.id} created successfully!`, "success");
    } catch (err) {
      get().showToast(err.message || "Failed to create ticket", "error");
    }
  },

  resetToMockData: async () => {
    set({ loading: true });
    try {
      const reset = await ticketApi.resetData();
      set({ tickets: reset, loading: false, searchQuery: '', statusFilter: 'all', priorityFilter: 'all' });
      get().showToast("Reset all tickets to initial demo dataset", "info");
    } catch (err) {
      set({ loading: false });
      get().showToast("Failed to reset dataset", "error");
    }
  },

  getFilteredTickets: () => {
    const { tickets, searchQuery, statusFilter, priorityFilter, sortBy } = get();

    return tickets
      .filter((t) => {
        if (statusFilter !== 'all' && t.status !== statusFilter) return false;
        if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchId = t.id.toLowerCase().includes(q);
          const matchCustomer = t.customer.name.toLowerCase().includes(q) || t.customer.email.toLowerCase().includes(q);
          const matchSubject = t.subject.toLowerCase().includes(q);
          const matchCategory = t.category.toLowerCase().includes(q);
          const matchDescription = t.description?.toLowerCase().includes(q);
          return matchId || matchCustomer || matchSubject || matchCategory || matchDescription;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (sortBy === 'oldest') {
          return new Date(a.createdAt) - new Date(b.createdAt);
        } else if (sortBy === 'priority') {
          const pMap = { high: 3, medium: 2, low: 1 };
          return pMap[b.priority] - pMap[a.priority];
        }
        return 0;
      });
  },

  getStats: () => {
    const { tickets } = get();
    const total = tickets.length;
    const open = tickets.filter((t) => t.status === 'open').length;
    const inProgress = tickets.filter((t) => t.status === 'in_progress').length;
    const resolved = tickets.filter((t) => t.status === 'resolved').length;
    const highPriority = tickets.filter((t) => t.priority === 'high' && t.status !== 'resolved').length;
    const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

    return {
      total,
      open,
      inProgress,
      resolved,
      highPriority,
      resolutionRate
    };
  }
}));
