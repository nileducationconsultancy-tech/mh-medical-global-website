/**
 * Mock Lead Data and LocalStorage Manager for MH GLOBAL EDUCATION CONSULTANT CRM
 */

const STORAGE_KEY = "mh_medical_leads_data";

export const initialMockLeads = [
  {
    id: "lead-1001",
    name: "Aman Sharma",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "aman.sharma@example.com",
    city: "New Delhi",
    state: "Delhi",
    neetStatus: "Qualified",
    neetScore: 485,
    pcbPercentage: 82,
    preferredUniversity: "Tashkent Medical Academy",
    budget: "₹20L - ₹25L",
    intake: "September 2026",
    status: "New",
    source: "Eligibility Checker",
    assignedCounsellor: "Dr. A. Sharma",
    notes: "Student interested in TMA. NEET score is 485. Parent requested phone consultation about hostel facilities.",
    createdAt: "2026-10-04T14:32:00Z"
  },
  {
    id: "lead-1002",
    name: "Pooja Verma",
    phone: "+91 98123 45678",
    whatsapp: "+91 98123 45678",
    email: "pooja.v99@example.com",
    city: "Jaipur",
    state: "Rajasthan",
    neetStatus: "Qualified",
    neetScore: 410,
    pcbPercentage: 74,
    preferredUniversity: "Samarkand State Medical University",
    budget: "₹18L - ₹22L",
    intake: "September 2026",
    status: "Contacted",
    source: "Fee Calculator",
    assignedCounsellor: "Vikram Malhotra",
    notes: "Spoke with father. Looking for university with on-campus Indian mess and high FMGE pass rate. Scheduled zoom session.",
    createdAt: "2026-10-03T11:15:00Z"
  },
  {
    id: "lead-1003",
    name: "Mohd. Zeeshan",
    phone: "+91 99200 11223",
    whatsapp: "+91 99200 11223",
    email: "zeeshan.m@example.com",
    city: "Hyderabad",
    state: "Telangana",
    neetStatus: "Qualified",
    neetScore: 512,
    pcbPercentage: 88,
    preferredUniversity: "Bukhara State Medical Institute",
    budget: "₹20L - ₹25L",
    intake: "September 2026",
    status: "Documents Pending",
    source: "University Page (BSMI)",
    assignedCounsellor: "Dr. A. Sharma",
    notes: "Wants admission in new 2023 campus of Bukhara. 10th/12th marksheets submitted, waiting for MEA Apostille.",
    createdAt: "2026-10-02T09:40:00Z"
  },
  {
    id: "lead-1004",
    name: "Rohan Patel",
    phone: "+91 97234 56789",
    whatsapp: "+91 97234 56789",
    email: "rohan.patel@example.com",
    city: "Ahmedabad",
    state: "Gujarat",
    neetStatus: "Qualified",
    neetScore: 395,
    pcbPercentage: 68,
    preferredUniversity: "Andijan State Medical Institute",
    budget: "Under ₹20L",
    intake: "September 2026",
    status: "Admission Received",
    source: "Google Search (Organic)",
    assignedCounsellor: "Priya Nair",
    notes: "Official university offer letter issued. Processing visa teletex at Uzbekistan Ministry.",
    createdAt: "2026-09-28T16:20:00Z"
  }
];

export const getStoredLeads = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockLeads));
    return initialMockLeads;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initialMockLeads;
  }
};

export const saveLead = (leadData) => {
  const current = getStoredLeads();
  const newLead = {
    id: `lead-${Date.now()}`,
    ...leadData,
    status: "New",
    createdAt: new Date().toISOString()
  };
  const updated = [newLead, ...current];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newLead;
};

export const updateLeadStatus = (leadId, newStatus, newNotes) => {
  const current = getStoredLeads();
  const updated = current.map((lead) => {
    if (lead.id === leadId) {
      return {
        ...lead,
        status: newStatus || lead.status,
        notes: newNotes !== undefined ? newNotes : lead.notes
      };
    }
    return lead;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};
