import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useTicketStore } from '../store/useTicketStore';

export const CreateTicketModal = () => {
  const { isCreateModalOpen, setCreateModalOpen, createTicket } = useTicketStore();

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    company: '',
    tier: 'Pro',
    subject: '',
    category: 'API & Webhooks',
    priority: 'medium',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCreateModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerEmail || !formData.subject || !formData.description) return;

    setIsSubmitting(true);
    await createTicket(formData);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={() => setCreateModalOpen(false)}
      />

      <div className="relative w-full max-w-lg bg-black border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden z-10 animate-scaleUp">
        
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Create Support Ticket</h3>
              <p className="text-xs text-zinc-400">File a new customer inquiry into the operations queue</p>
            </div>
          </div>
          <button
            onClick={() => setCreateModalOpen(false)}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Customer Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Jordan Lee"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Customer Email *</label>
              <input
                type="email"
                required
                placeholder="jordan@company.com"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Company</label>
              <input
                type="text"
                placeholder="e.g. Acme Tech"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none"
              >
                <option value="API & Webhooks">API & Webhooks</option>
                <option value="Authentication">Authentication</option>
                <option value="Billing">Billing</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Integration">Integration</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none"
              >
                <option value="low">Low 🟢</option>
                <option value="medium">Medium 🟡</option>
                <option value="high">High 🔴</option>
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">Account Tier</label>
              <select
                value={formData.tier}
                onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none"
              >
                <option value="Enterprise">Enterprise</option>
                <option value="VIP">VIP</option>
                <option value="Pro">Pro</option>
                <option value="Starter">Starter</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 font-semibold mb-1">Issue Subject *</label>
            <input
              type="text"
              required
              placeholder="Short title describing the issue..."
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-semibold mb-1">Description / Details *</label>
            <textarea
              rows="3"
              required
              placeholder="Provide full issue details..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setCreateModalOpen(false)}
              className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Submit Ticket'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
