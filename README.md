# Customer Support Dashboard

A modern, responsive **Customer Support Dashboard** built with **React.js**, **Tailwind CSS**, **Zustand** state management, and a **Mock REST API** service.

## 🚀 Features

- **Dashboard Statistics**: Interactive metrics showing *Total Tickets*, *Open*, *In Progress*, and *Resolved* counts with instant status filtering.
- **Search & Filters**: Multi-field search (Customer name, email, issue subject, category) with Status & Priority dropdowns.
- **Multi-View Modes**: Switch between **Table View**, **Grid Cards View**, and **Kanban Status Board**.
- **Quick Inline Status Modification**: Change ticket status directly from list view, card view, or kanban board.
- **Ticket Details Side Panel Drawer**: View customer info, issue summary, priority/status controls, conversation history, canned quick replies, and internal team notes.
- **State & REST API Handling**: Powered by Zustand with simulated REST API network latency, LocalStorage caching, and controllable API error testing mode.
- 
 ## Technology Stack
Core Framework: React 19 + Vite for rapid development and clean component modularity.
Styling: Tailwind CSS + Lucide Icons + Framer Motion (for micro-animations, slide-over drawers, state transitions, and toast notifications).
State Management: Zustand store (useTicketStore) managing tickets, search/filter criteria, active views, loading/error states, and async API operations.
Mock REST API: Modular API service layer (services/ticketApi.js) simulating realistic network requests (GET, POST, PUT), network latency, LocalStorage caching, and controllable error handling.

## live deployment link
 https://customer-support-dashboard-kappa.vercel.app/
 
## 🛠️ Getting Started 

### Installation

```bash
cd customer-support-dashboard
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```
