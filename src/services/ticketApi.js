import { INITIAL_TICKETS } from '../data/mockTickets';

const STORAGE_KEY = 'omnidesk_tickets_black_v2';
let errorSimulationActive = false;

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const setSimulateError = (shouldError) => {
  errorSimulationActive = shouldError;
};

export const getSimulateError = () => errorSimulationActive;

export const ticketApi = {
  async getTickets() {
    await delay(500);

    if (errorSimulationActive) {
      throw new Error("503 Service Unavailable: Failed to establish REST API connection to ticket service backend.");
    }

    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error("Failed to parse cached tickets, resetting...", e);
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TICKETS));
    return INITIAL_TICKETS;
  },

  async updateStatus(ticketId, newStatus) {
    await delay(300);
    if (errorSimulationActive) {
      throw new Error("400 Bad Request: Unable to update ticket status.");
    }

    const tickets = await this.getTickets();
    const updatedTickets = tickets.map((t) => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: newStatus,
          updatedAt: new Date().toISOString()
        };
      }
      return t;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTickets));
    return updatedTickets.find((t) => t.id === ticketId);
  },

  async updatePriority(ticketId, newPriority) {
    await delay(300);
    if (errorSimulationActive) {
      throw new Error("400 Bad Request: Unable to update ticket priority.");
    }

    const tickets = await this.getTickets();
    const updatedTickets = tickets.map((t) => {
      if (t.id === ticketId) {
        return {
          ...t,
          priority: newPriority,
          updatedAt: new Date().toISOString()
        };
      }
      return t;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTickets));
    return updatedTickets.find((t) => t.id === ticketId);
  },

  async addMessage(ticketId, messageContent, isInternalNote = false) {
    await delay(400);
    if (errorSimulationActive) {
      throw new Error("500 Internal Error: Failed to append message to ticket thread.");
    }

    const tickets = await this.getTickets();
    let updatedTicket = null;

    const updatedTickets = tickets.map((t) => {
      if (t.id === ticketId) {
        const newMessage = {
          id: `msg-${Date.now()}`,
          sender: "agent",
          author: "Support Agent",
          text: messageContent,
          timestamp: new Date().toISOString(),
          isInternalNote
        };

        const newMessages = [...t.messages, newMessage];
        const newStatus = t.status === "open" && !isInternalNote ? "in_progress" : t.status;

        updatedTicket = {
          ...t,
          status: newStatus,
          messages: newMessages,
          updatedAt: new Date().toISOString()
        };
        return updatedTicket;
      }
      return t;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTickets));
    return updatedTicket;
  },

  async createTicket(newTicketData) {
    await delay(500);
    if (errorSimulationActive) {
      throw new Error("422 Unprocessable Entity: Invalid ticket payload.");
    }

    const tickets = await this.getTickets();
    const newId = `TCK-${Math.floor(8000 + Math.random() * 2000)}`;

    const createdTicket = {
      id: newId,
      customer: {
        name: newTicketData.customerName,
        email: newTicketData.customerEmail,
        phone: newTicketData.customerPhone || "+1 (555) 000-0000",
        company: newTicketData.company || "Standard User",
        tier: newTicketData.tier || "Pro"
      },
      subject: newTicketData.subject,
      description: newTicketData.description,
      priority: newTicketData.priority || "medium",
      status: "open",
      category: newTicketData.category || "General Inquiry",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedTo: {
        name: "Alex Rivera",
        role: "Senior Staff Engineer"
      },
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: "customer",
          author: newTicketData.customerName,
          text: newTicketData.description,
          timestamp: new Date().toISOString()
        }
      ]
    };

    const updatedTickets = [createdTicket, ...tickets];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTickets));
    return createdTicket;
  },

  async resetData() {
    await delay(300);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TICKETS));
    return INITIAL_TICKETS;
  }
};
