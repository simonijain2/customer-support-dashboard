export const INITIAL_TICKETS = [
  {
    id: "TCK-8902",
    customer: {
      name: "Sarah Jenkins",
      email: "sarah.jenkins@acmecorp.com",
      phone: "+1 (555) 234-5678",
      company: "Acme Enterprise",
      tier: "Enterprise"
    },
    subject: "Webhook delivery failure on high throughput events",
    description: "Our webhook endpoint is dropping payload signatures during peak traffic hours (around 14:00 UTC). We are seeing 502 Bad Gateway responses retried endlessly without backoff.",
    priority: "high",
    status: "open",
    category: "API & Webhooks",
    createdAt: "2026-09-10T08:30:00Z",
    updatedAt: "2026-09-10T09:15:00Z",
    assignedTo: {
      name: "Alex Rivera",
      role: "Senior Staff Engineer"
    },
    messages: [
      {
        id: "msg-101",
        sender: "customer",
        author: "Sarah Jenkins",
        text: "Our production webhook system is experiencing severe delivery drops. Is there a rate limit cap enabled on our tier?",
        timestamp: "2026-09-10T08:30:00Z"
      },
      {
        id: "msg-102",
        sender: "agent",
        author: "Alex Rivera",
        text: "Hi Sarah, thanks for reaching out. I am currently inspecting our edge load balancers to check your organization's event pipeline queue.",
        timestamp: "2026-09-10T09:15:00Z"
      }
    ]
  },
  {
    id: "TCK-8898",
    customer: {
      name: "Marcus Vance",
      email: "marcus@nexustech.io",
      phone: "+1 (555) 876-5432",
      company: "Nexus Technologies",
      tier: "VIP"
    },
    subject: "OAuth2 Refresh Token expiring prematurely",
    description: "Tokens configured for 30-day longevity are expiring after 12 hours. Users are forced to re-authenticate daily.",
    priority: "high",
    status: "in_progress",
    category: "Authentication",
    createdAt: "2026-09-10T06:15:00Z",
    updatedAt: "2026-09-10T09:45:00Z",
    assignedTo: {
      name: "Elena Rostova",
      role: "Security Lead"
    },
    messages: [
      {
        id: "msg-201",
        sender: "customer",
        author: "Marcus Vance",
        text: "Our mobile app users are constantly getting logged out. Our auth server logs show error `ERR_TOKEN_EXPIRED_EARLY`.",
        timestamp: "2026-09-10T06:15:00Z"
      },
      {
        id: "msg-202",
        sender: "agent",
        author: "Elena Rostova",
        text: "We identified a TTL sync discrepancy on Redis Cluster #4. Applying a hotfix deployment right now.",
        timestamp: "2026-09-10T08:00:00Z"
      },
      {
        id: "msg-203",
        sender: "agent",
        author: "Elena Rostova",
        text: "Internal note: Verified fix on staging. Monitoring production propagation.",
        timestamp: "2026-09-10T09:45:00Z",
        isInternalNote: true
      }
    ]
  },
  {
    id: "TCK-8875",
    customer: {
      name: "David Chen",
      email: "david.chen@cloudscale.net",
      phone: "+1 (555) 432-1098",
      company: "CloudScale Systems",
      tier: "Pro"
    },
    subject: "Requesting custom CSV export format for monthly billing",
    description: "Can we add line item breakdown by region/datacenter in the automated monthly accounting report?",
    priority: "medium",
    status: "in_progress",
    category: "Billing",
    createdAt: "2026-09-09T16:20:00Z",
    updatedAt: "2026-09-10T07:10:00Z",
    assignedTo: {
      name: "Alex Rivera",
      role: "Senior Staff Engineer"
    },
    messages: [
      {
        id: "msg-301",
        sender: "customer",
        author: "David Chen",
        text: "Hello support team, our finance department requires breakdown tags in our monthly invoices.",
        timestamp: "2026-09-09T16:20:00Z"
      },
      {
        id: "msg-302",
        sender: "agent",
        author: "Alex Rivera",
        text: "Great request David! I have submitted this feature flag request to our billing team.",
        timestamp: "2026-09-10T07:10:00Z"
      }
    ]
  },
  {
    id: "TCK-8850",
    customer: {
      name: "Emily Watson",
      email: "emily@designcraft.co",
      phone: "+1 (555) 901-2345",
      company: "DesignCraft Studio",
      tier: "Starter"
    },
    subject: "Unable to update profile avatar in dashboard settings",
    description: "Uploading PNG images larger than 2MB causes a quiet error toast and fails to update the user thumbnail.",
    priority: "low",
    status: "open",
    category: "Bug Report",
    createdAt: "2026-09-09T11:45:00Z",
    updatedAt: "2026-09-09T11:45:00Z",
    assignedTo: {
      name: "Sophia Martinez",
      role: "Frontend Specialist"
    },
    messages: [
      {
        id: "msg-401",
        sender: "customer",
        author: "Emily Watson",
        text: "Whenever I drag a file into the upload zone, the progress bar hits 99% and freezes.",
        timestamp: "2026-09-09T11:45:00Z"
      }
    ]
  },
  {
    id: "TCK-8821",
    customer: {
      name: "Robert Sterling",
      email: "r.sterling@fintechglobal.org",
      phone: "+1 (555) 654-3210",
      company: "FinTech Global",
      tier: "Enterprise"
    },
    subject: "SSO SAML Metadata Cert renewal assistance",
    description: "Our Okta identity provider certificate expires next week. We need to upload our updated x509 public key file.",
    priority: "high",
    status: "resolved",
    category: "Authentication",
    createdAt: "2026-09-08T09:00:00Z",
    updatedAt: "2026-09-09T14:30:00Z",
    assignedTo: {
      name: "Elena Rostova",
      role: "Security Lead"
    },
    messages: [
      {
        id: "msg-501",
        sender: "customer",
        author: "Robert Sterling",
        text: "We need seamless rollover for Okta SAML certs without downtime for our 4,000 active employees.",
        timestamp: "2026-09-08T09:00:00Z"
      },
      {
        id: "msg-502",
        sender: "agent",
        author: "Elena Rostova",
        text: "We have enabled dual-cert verification on your SSO tenant. You can now safely upload the new key.",
        timestamp: "2026-09-08T14:00:00Z"
      },
      {
        id: "msg-503",
        sender: "customer",
        author: "Robert Sterling",
        text: "Verified! All SSO logins succeeded smoothly. Thanks for the quick support!",
        timestamp: "2026-09-09T14:30:00Z"
      }
    ]
  },
  {
    id: "TCK-8810",
    customer: {
      name: "Jessica Taylor",
      email: "jtaylor@growthmetrics.com",
      phone: "+1 (555) 321-7654",
      company: "Growth Metrics",
      tier: "VIP"
    },
    subject: "Analytics dashboard reporting 0 metrics for yesterday",
    description: "The daily rollup job seems to have missed processing standard analytics events between 00:00 and 23:59 UTC on Sept 7.",
    priority: "medium",
    status: "resolved",
    category: "Integration",
    createdAt: "2026-09-08T04:10:00Z",
    updatedAt: "2026-09-08T18:00:00Z",
    assignedTo: {
      name: "Sophia Martinez",
      role: "Frontend Specialist"
    },
    messages: [
      {
        id: "msg-601",
        sender: "customer",
        author: "Jessica Taylor",
        text: "Our executive dashboard shows zero conversion data for Sept 7.",
        timestamp: "2026-09-08T04:10:00Z"
      },
      {
        id: "msg-602",
        sender: "agent",
        author: "Sophia Martinez",
        text: "A backfill cron job was triggered and all metrics have been re-indexed. Everything is now up to date.",
        timestamp: "2026-09-08T18:00:00Z"
      }
    ]
  }
];
