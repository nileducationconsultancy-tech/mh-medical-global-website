/**
 * Lead Data and LocalStorage Manager for MH GLOBAL EDUCATION CONSULTANT CRM
 * Production clean state: zero mock/dummy data.
 */

const STORAGE_KEY = "mh_medical_leads_data";

// Zero dummy data in production
export const initialMockLeads = [];

/**
 * Retrieves stored leads from localStorage, automatically purging any legacy mock leads.
 */
export const getStoredLeads = () => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return [];
  }
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return [];
  }
  try {
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];

    // Filter out any legacy dummy/mock leads
    const cleaned = parsed.filter((l) => {
      if (!l) return false;
      const isLegacyMockId = typeof l.id === "string" && l.id.startsWith("lead-100");
      const isExampleEmail = typeof l.email === "string" && l.email.includes("@example.com");
      const isMockName = ["Aman Sharma", "Pooja Verma", "Mohd. Zeeshan", "Rohan Patel"].includes(l.name);
      return !isLegacyMockId && !isExampleEmail && !isMockName;
    });

    if (cleaned.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    }
    return cleaned;
  } catch {
    return [];
  }
};

/**
 * Saves a new verified student lead to localStorage
 */
export const saveLead = (leadData) => {
  const current = getStoredLeads();
  const newLead = {
    id: `lead-${Date.now()}`,
    ...leadData,
    status: "New",
    createdAt: new Date().toISOString()
  };
  const updated = [newLead, ...current];
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }
  return newLead;
};

/**
 * Updates status or notes for a lead
 */
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
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }
  return updated;
};

/**
 * Clears all leads from localStorage
 */
export const clearAllLeads = () => {
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
  return [];
};
