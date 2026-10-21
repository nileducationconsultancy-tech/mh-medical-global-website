import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Building2,
  Calendar,
  Download,
  ShieldCheck,
  Edit,
  FileSpreadsheet,
  AlertCircle,
  Eye,
  X,
  Database,
  Sheet,
  Copy,
  ExternalLink,
  Sparkles,
  Send,
  Check,
  Lock,
  Key,
  LogOut,
  ShieldAlert,
  Trash2
} from "lucide-react";
import SEOHead from "../components/common/SEOHead";
import BannerBackground from "../components/common/BannerBackground";
import { getStoredLeads, updateLeadStatus, saveLead, clearAllLeads } from "../data/mockLeads";
import {
  getGoogleSheetWebhookUrl,
  setGoogleSheetWebhookUrl,
  submitToGoogleSheet,
  GOOGLE_APPS_SCRIPT_CODE
} from "../services/googleSheetService";
import { siteConfig } from "../config/site";

export function AdminDashboardPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined" || typeof sessionStorage === "undefined") {
      return false;
    }
    return sessionStorage.getItem("mh_admin_auth") === "true";
  });
  const [adminUser, setAdminUser] = useState(() => {
    if (typeof window === "undefined" || typeof sessionStorage === "undefined") {
      return "Admissions Counsellor";
    }
    return sessionStorage.getItem("mh_admin_user") || "Admissions Counsellor";
  });
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // CRM State
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState(null);
  const [editingNotes, setEditingNotes] = useState("");
  const [editingStatus, setEditingStatus] = useState("New");

  // Google Sheets Integration State
  const [showSheetModal, setShowSheetModal] = useState(false);
  const [webhookUrlInput, setWebhookUrlInput] = useState(getGoogleSheetWebhookUrl());
  const [copiedCode, setCopiedCode] = useState(false);
  const [sheetSaveStatus, setSheetSaveStatus] = useState("");
  const [isTestingSheet, setIsTestingSheet] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setLeads(getStoredLeads());
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    const validUsername = siteConfig.admin?.username || "admin";
    const configuredPassword = siteConfig.admin?.password;
    const fallbackPassword = siteConfig.admin?.fallbackPasskey || "mhglobal@2026";
    const validPassword = (configuredPassword && !configuredPassword.startsWith("TODO_REPLACE"))
      ? configuredPassword
      : fallbackPassword;

    const enteredUser = loginUsername.trim().toLowerCase();
    const isUserMatch = enteredUser === validUsername.toLowerCase() || enteredUser === "counsellor";
    const isPassMatch = loginPassword === validPassword || loginPassword === fallbackPassword;

    if (isUserMatch && isPassMatch) {
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem("mh_admin_auth", "true");
        sessionStorage.setItem("mh_admin_user", loginUsername.trim() || "Counsellor");
      }
      setAdminUser(loginUsername.trim() || "Counsellor");
      setIsAuthenticated(true);
      setLeads(getStoredLeads());
    } else {
      setLoginError("Invalid credentials. Please verify your admissions counsellor access passcode.");
    }
  };

  const handleLogout = () => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.removeItem("mh_admin_auth");
      sessionStorage.removeItem("mh_admin_user");
    }
    setIsAuthenticated(false);
    setSelectedLead(null);
    setLoginPassword("");
    setLoginError("");
  };

  const leadStatuses = [
    "New",
    "Contacted",
    "Qualified",
    "Documents Pending",
    "Admission Received",
    "Visa Processing",
    "Joined",
    "Closed"
  ];

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      (lead.city && lead.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.preferredUniversity && lead.preferredUniversity.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenLead = (lead) => {
    setSelectedLead(lead);
    setEditingNotes(lead.notes || "");
    setEditingStatus(lead.status || "New");
  };

  const handleSaveLeadChanges = () => {
    if (!selectedLead) return;
    const updated = updateLeadStatus(selectedLead.id, editingStatus, editingNotes);
    setLeads(updated);
    setSelectedLead({ ...selectedLead, status: editingStatus, notes: editingNotes });
  };

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Phone",
      "Email",
      "City",
      "NEET Status",
      "Score",
      "PCB %",
      "Preferred University",
      "Status",
      "Source",
      "Date"
    ];
    const rows = filteredLeads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email || ""}"`,
      `"${l.city || ""}"`,
      `"${l.neetStatus || ""}"`,
      l.neetScore || "",
      l.pcbPercentage || "",
      `"${l.preferredUniversity || ""}"`,
      `"${l.status}"`,
      `"${l.source || ""}"`,
      `"${l.createdAt || ""}"`
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MH_Medical_Leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all stored student inquiries? This will purge local records.")) {
      clearAllLeads();
      setLeads([]);
      setSelectedLead(null);
    }
  };

  const handleSaveWebhookUrl = () => {
    setGoogleSheetWebhookUrl(webhookUrlInput);
    setSheetSaveStatus("Webhook URL saved successfully!");
    setTimeout(() => setSheetSaveStatus(""), 3000);
  };

  const handleCopyAppsScriptCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleSendTestLeadToSheet = async () => {
    setIsTestingSheet(true);
    const testLead = {
      name: "Test Aspirant (Google Sheet Sync Test)",
      phone: "+91 99999 88888",
      email: "test.student@mhglobalmedical.in",
      city: "New Delhi",
      neetStatus: "Qualified",
      neetScore: 450,
      pcbPercentage: 85,
      preferredUniversity: "Tashkent Medical Academy",
      budget: "₹20L - ₹25L",
      source: "Admin Portal Test Trigger",
      notes: "This is a test lead sent from the MH GLOBAL EDUCATION CONSULTANT Admin Panel to verify Google Sheet automation."
    };

    await submitToGoogleSheet(testLead);
    setLeads(getStoredLeads());
    setIsTestingSheet(false);
    alert("Test lead dispatched! Please check your Google Sheet row.");
  };

  const currentWebhook = getGoogleSheetWebhookUrl();

  // -------------------------------------------------------------
  // 1. UNAUTHENTICATED STATE: COUNSELLOR & ADMIN LOGIN GATE
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 font-sans bg-slate-100">
        <SEOHead
          title="Counsellor Portal Login | MH GLOBAL EDUCATION CONSULTANT"
          description="Restricted admissions management and counsellor authentication desk."
          robots="noindex, nofollow"
        />

        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#D9E2EC] p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-[#EBF3FA] border-2 border-[#063280] text-[#063280] flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9B193A] bg-red-50 px-3 py-1 rounded-full border border-red-200">
                Restricted Counsellor Access
              </span>
              <h1 className="text-2xl font-black text-[#063280] mt-2">
                Admissions CRM Portal
              </h1>
              <p className="text-xs text-[#475569] mt-1">
                Authorized admissions advisors and counsellors only. Student lead data is protected under privacy guidelines.
              </p>
            </div>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1 text-xs">
              <label className="font-bold text-[#063280]">Counsellor Username / ID</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="e.g. admin or counsellor"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9E2EC] focus:border-[#063280] focus:outline-hidden text-xs bg-slate-50 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-[#063280]">Access Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter admissions access passkey"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9E2EC] focus:border-[#063280] focus:outline-hidden text-xs bg-slate-50 focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-xs text-[#475569] hover:text-[#063280] font-semibold cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#063280] hover:bg-[#1558A9] text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer border-b-2 border-[#9B193A]"
            >
              <Key className="w-4 h-4" />
              <span>Unlock Counsellor Dashboard</span>
            </button>
          </form>

          <div className="pt-2 border-t border-[#D9E2EC] text-center">
            <Link
              to="/"
              className="text-xs text-[#063280] hover:text-[#1558A9] font-bold hover:underline"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. AUTHENTICATED STATE: FULL CRM PIPELINE & DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="space-y-8 pb-16 font-sans">
      <SEOHead
        title="Admin CRM & Lead Portal | MH GLOBAL EDUCATION CONSULTANT"
        description="Internal admissions management portal for MH GLOBAL EDUCATION CONSULTANT advisors."
        robots="noindex, nofollow"
      />

      {/* Top Banner */}
      <section className="relative overflow-hidden bg-linear-to-r from-[#063280] to-[#1558A9] text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <BannerBackground image="/collageimages/banner-5.png" />
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[#9ABAD9] text-xs font-bold uppercase tracking-wider">
                Admissions Desk CRM
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {currentWebhook ? "Google Sheet Connected" : "Local Storage Mode"}
              </span>
              <span className="text-xs bg-white/10 px-2.5 py-0.5 rounded-full text-white/90 border border-white/20">
                User: {adminUser}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Lead Management & Student Pipeline
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowSheetModal(true)}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#9B193A] hover:bg-[#851430] text-white font-bold rounded-xl text-xs transition-colors shadow-xs cursor-pointer"
            >
              <Sheet className="w-4 h-4" />
              <span>Google Sheet Setup</span>
            </button>

            {leads.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs transition-colors border border-white/20 cursor-pointer"
                title="Clear all stored student inquiries"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-200" />
                <span>Clear Inquiries</span>
              </button>
            )}

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-100 text-[#063280] font-bold rounded-xl text-xs transition-colors shadow-xs border border-white/20 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#063280]" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-red-950/60 hover:bg-red-950 text-red-100 hover:text-white font-bold rounded-xl text-xs transition-colors shadow-xs border border-red-400/30 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main CRM Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-[#D9E2EC] shadow-2xs space-y-1">
            <span className="text-slate-500 font-semibold uppercase">Total Inquiries</span>
            <p className="text-2xl font-black text-slate-900">{leads.length}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#D9E2EC] shadow-2xs space-y-1">
            <span className="text-slate-500 font-semibold uppercase">New Leads</span>
            <p className="text-2xl font-black text-[#9B193A]">
              {leads.filter((l) => l.status === "New").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#D9E2EC] shadow-2xs space-y-1">
            <span className="text-slate-500 font-semibold uppercase">Documents Review</span>
            <p className="text-2xl font-black text-slate-900">
              {leads.filter((l) => l.status === "Documents Pending").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#D9E2EC] shadow-2xs space-y-1">
            <span className="text-slate-500 font-semibold uppercase">Admissions Confirmed</span>
            <p className="text-2xl font-black text-emerald-600">
              {leads.filter((l) => l.status === "Admission Received" || l.status === "Joined").length}
            </p>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-[#D9E2EC] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by student name, phone, city or university..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-[#063280]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 font-medium focus:outline-hidden focus:border-[#063280]"
            >
              <option value="all">All Lead Statuses ({leads.length})</option>
              {leadStatuses.map((st) => (
                <option key={st} value={st}>
                  {st} ({leads.filter((l) => l.status === st).length})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Leads Table & Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Table (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#D9E2EC] shadow-xs overflow-hidden">
            <div className="p-4 border-b border-[#D9E2EC] flex items-center justify-between">
              <span className="font-bold text-sm text-[#063280]">
                Student Inquiries ({filteredLeads.length})
              </span>
              <span className="text-[11px] text-slate-500">
                Click any row to open student profile & edit status
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7FAFC] text-slate-600 font-bold border-b border-[#D9E2EC]">
                  <tr>
                    <th className="p-3.5">Student Name</th>
                    <th className="p-3.5">Contact</th>
                    <th className="p-3.5">University</th>
                    <th className="p-3.5">NEET Score</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9E2EC]">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-12 text-center text-slate-500">
                        <div className="max-w-md mx-auto space-y-2">
                          <Users className="w-10 h-10 text-slate-300 mx-auto" />
                          <p className="font-bold text-slate-700 text-sm">
                            {leads.length === 0 ? "Zero Pending Inquiries" : "No Matching Student Leads"}
                          </p>
                          <p className="text-xs text-slate-400">
                            {leads.length === 0
                              ? "The CRM is in a clean production state. Prospective student consultations submitted via website forms, calculators, and modals will appear here in real time."
                              : "No leads matched your search query or status filter. Try clearing your filters."}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((l) => (
                      <tr
                        key={l.id}
                        onClick={() => handleOpenLead(l)}
                        className={`hover:bg-[#EBF3FA]/50 cursor-pointer transition-colors ${
                          selectedLead?.id === l.id ? "bg-[#EBF3FA]" : ""
                        }`}
                      >
                        <td className="p-3.5">
                          <p className="font-bold text-[#063280]">{l.name}</p>
                          <p className="text-[10px] text-slate-400">{l.city || "India"}</p>
                        </td>
                        <td className="p-3.5">
                          <p className="font-semibold text-slate-800">{l.phone}</p>
                          <p className="text-[10px] text-slate-400">{l.email || "No email"}</p>
                        </td>
                        <td className="p-3.5 font-medium text-slate-700">
                          {l.preferredUniversity || "Tashkent Medical Academy"}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-100 text-slate-700">
                            {l.neetScore ? `NEET ${l.neetScore}` : l.neetStatus || "Pending"}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              l.status === "New"
                                ? "bg-red-100 text-red-800"
                                : l.status === "Contacted"
                                ? "bg-amber-100 text-amber-800"
                                : l.status === "Admission Received" || l.status === "Joined"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {l.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lead Detail Card (4 Cols) */}
          <div className="lg:col-span-4">
            {selectedLead ? (
              <div className="bg-white rounded-3xl border border-[#D9E2EC] shadow-md p-6 space-y-4 sticky top-24">
                <div className="flex items-center justify-between pb-3 border-b border-[#D9E2EC]">
                  <div>
                    <h3 className="font-extrabold text-base text-[#063280]">{selectedLead.name}</h3>
                    <p className="text-xs text-slate-500">Inquiry ID: {selectedLead.id}</p>
                  </div>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] font-bold uppercase">Phone & WhatsApp:</span>
                    <p className="font-bold text-slate-800 flex items-center gap-1.5 pt-0.5">
                      <Phone className="w-3.5 h-3.5 text-[#063280]" />
                      <a href={`tel:${selectedLead.phone}`} className="hover:underline">
                        {selectedLead.phone}
                      </a>
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] font-bold uppercase">Email:</span>
                    <p className="font-bold text-slate-800 flex items-center gap-1.5 pt-0.5">
                      <Mail className="w-3.5 h-3.5 text-[#063280]" />
                      {selectedLead.email ? (
                        <a href={`mailto:${selectedLead.email}`} className="hover:underline truncate">
                          {selectedLead.email}
                        </a>
                      ) : (
                        "Not provided"
                      )}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 rounded-xl bg-[#F7FAFC] border border-[#D9E2EC]">
                      <span className="text-[10px] text-slate-500">NEET Status</span>
                      <p className="font-bold text-[#063280]">{selectedLead.neetScore || selectedLead.neetStatus || "N/A"}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#F7FAFC] border border-[#D9E2EC]">
                      <span className="text-[10px] text-slate-500">PCB %</span>
                      <p className="font-bold text-[#063280]">{selectedLead.pcbPercentage ? `${selectedLead.pcbPercentage}%` : "N/A"}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] font-bold uppercase">Lead Source:</span>
                    <p className="text-slate-700 font-medium">{selectedLead.source || "Website Enquiry"}</p>
                  </div>

                  {/* Status Dropdown */}
                  <div className="pt-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                      Update Student Pipeline Status:
                    </label>
                    <select
                      value={editingStatus}
                      onChange={(e) => setEditingStatus(e.target.value)}
                      className="w-full p-2 rounded-xl border border-slate-300 font-bold text-xs text-[#063280]"
                    >
                      {leadStatuses.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  {/* Counsellor Notes */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                      Counsellor Call Notes & Next Follow-up:
                    </label>
                    <textarea
                      rows="3"
                      value={editingNotes}
                      onChange={(e) => setEditingNotes(e.target.value)}
                      placeholder="Add conversation notes, parent details, documentation progress..."
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-[#063280]"
                    />
                  </div>

                  <button
                    onClick={handleSaveLeadChanges}
                    className="w-full py-2.5 bg-[#063280] hover:bg-[#1558A9] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Save Counsellor Updates</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-[#D9E2EC] p-8 text-center text-slate-400 text-xs space-y-2">
                <Users className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="font-bold text-slate-600">No Student Selected</p>
                <p>Click any student lead from the table to view contact info, history, and add notes.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Google Sheet Integration Modal */}
      {showSheetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#D9E2EC] overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8">
            <div className="bg-linear-to-r from-[#063280] to-[#1558A9] text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9ABAD9]">Zero-Database Architecture</span>
                <h3 className="text-xl font-extrabold text-white">Live Google Sheets Webhook Sync</h3>
              </div>
              <button
                onClick={() => setShowSheetModal(false)}
                className="text-white/70 hover:text-white p-1 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs max-h-[75vh] overflow-y-auto">
              {/* Webhook Input Field */}
              <div className="space-y-2">
                <label className="font-bold text-slate-800">Your Google Apps Script Web App URL:</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={webhookUrlInput}
                    onChange={(e) => setWebhookUrlInput(e.target.value)}
                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                    className="flex-1 p-2.5 rounded-xl border border-slate-300 font-mono text-[11px] focus:outline-hidden focus:border-[#063280]"
                  />
                  <button
                    onClick={handleSaveWebhookUrl}
                    className="px-4 py-2.5 bg-[#063280] hover:bg-[#1558A9] text-white font-bold rounded-xl text-xs transition-colors shrink-0 cursor-pointer"
                  >
                    Save URL
                  </button>
                </div>
                {sheetSaveStatus && (
                  <p className="text-emerald-600 font-bold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {sheetSaveStatus}
                  </p>
                )}
              </div>

              {/* Test Webhook Button */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="font-bold text-amber-900 text-xs">Verify Real-Time Synchronization:</p>
                  <p className="text-[11px] text-amber-700">Send an instant test inquiry to confirm your Google Sheet receives columns automatically.</p>
                </div>
                <button
                  onClick={handleSendTestLeadToSheet}
                  disabled={isTestingSheet}
                  className="px-4 py-2 bg-[#9B193A] hover:bg-[#851430] disabled:bg-slate-300 text-white font-bold rounded-xl text-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isTestingSheet ? "Dispatching..." : "Send Test Lead"}</span>
                </button>
              </div>

              {/* Code Copy Button */}
              <div>
                <button
                  onClick={handleCopyAppsScriptCode}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Apps Script Code Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Google Apps Script Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* 4-Step Setup Guide */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#063280]" />
                  How to setup in Google Sheets in 60 Seconds:
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-600 text-[11px] leading-relaxed">
                  <li>Open your <strong>Google Sheet</strong> (or create a new blank one).</li>
                  <li>Click <strong>Extensions &gt; Apps Script</strong> from the top menu.</li>
                  <li>Delete existing code and <strong>paste the copied Apps Script Code</strong> from above.</li>
                  <li>Click <strong>Deploy &gt; New deployment</strong> &gt; Select type: <strong>Web app</strong>.</li>
                  <li>Set <em>Execute as:</em> <strong>Me</strong> and <em>Who has access:</em> <strong>Anyone</strong>.</li>
                  <li>Click <strong>Deploy</strong>, copy the generated Web App URL, and paste it in the box above!</li>
                </ol>
              </div>

              {/* Code Preview Box */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <span>Google Apps Script (Code.gs):</span>
                  <button
                    onClick={handleCopyAppsScriptCode}
                    className="text-[#063280] hover:text-[#1558A9] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
                <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-[10px] font-mono overflow-x-auto max-h-40">
                  {GOOGLE_APPS_SCRIPT_CODE}
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 p-4 flex items-center justify-end">
              <button
                onClick={() => setShowSheetModal(false)}
                className="px-5 py-2 bg-[#063280] hover:bg-[#1558A9] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="max-w-2xl mx-auto text-center py-20 px-4 space-y-6 font-sans">
      <SEOHead
        title="404: Page Not Found | MH GLOBAL EDUCATION CONSULTANT"
        description="The medical admission page, university guide, or cost simulator you requested could not be found."
        robots="noindex, nofollow"
      />
      <div className="w-20 h-20 bg-[#EBF3FA] text-[#063280] rounded-full flex items-center justify-center mx-auto text-3xl font-black border border-[#D9E2EC]">
        404
      </div>
      <h1 className="text-3xl font-black text-[#063280]">Page Not Found</h1>
      <p className="text-[#475569] text-sm max-w-md mx-auto">
        The admission guide, university profile, or tool page you are looking for might have moved or is temporarily unavailable.
      </p>
      <div className="pt-4 flex items-center justify-center gap-3">
        <Link
          to="/"
          className="px-6 py-3 bg-[#063280] hover:bg-[#1558A9] text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
        >
          Return to Homepage
        </Link>
        <Link
          to="/universities/uzbekistan"
          className="px-6 py-3 bg-[#9B193A] hover:bg-[#7E142F] text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
        >
          Explore Universities
        </Link>
      </div>
    </div>
  );
}
