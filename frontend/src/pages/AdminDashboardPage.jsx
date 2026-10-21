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
  Check
} from "lucide-react";
import SEOHead from "../components/common/SEOHead";
import { getStoredLeads, updateLeadStatus, saveLead } from "../data/mockLeads";
import {
  getGoogleSheetWebhookUrl,
  setGoogleSheetWebhookUrl,
  submitToGoogleSheet,
  GOOGLE_APPS_SCRIPT_CODE
} from "../services/googleSheetService";

export function AdminDashboardPage() {
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
    setLeads(getStoredLeads());
  }, []);

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
      source: "Google Sheet Connection Test",
      notes: "This is a test lead sent from the MH GLOBAL EDUCATION CONSULTANT Admin Panel to verify Google Sheet automation."
    };

    await submitToGoogleSheet(testLead);
    setLeads(getStoredLeads());
    setIsTestingSheet(false);
    alert("Test lead dispatched! Please check your Google Sheet row.");
  };

  const currentWebhook = getGoogleSheetWebhookUrl();

  return (
    <div className="space-y-8 pb-16 font-sans">
      <SEOHead
        title="Admin CRM & Lead Portal | MH GLOBAL EDUCATION CONSULTANT"
        description="Internal admissions management portal for MH GLOBAL EDUCATION CONSULTANT advisors."
      />

      {/* Top Banner */}
      <section className="bg-linear-to-r from-[#063280] to-[#1558A9] text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[#9ABAD9] text-xs font-bold uppercase tracking-wider">
                Admissions Desk CRM
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {currentWebhook ? "Google Sheet Connected" : "Local Storage Mode"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Lead Management & Student Pipeline
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowSheetModal(true)}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#9B193A] hover:bg-[#851430] text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
            >
              <Sheet className="w-4 h-4" />
              <span>Google Sheet Setup</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-100 text-[#063280] font-bold rounded-xl text-xs transition-colors shadow-xs border border-white/20"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#063280]" />
              <span>Export CSV</span>
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
            <p className="text-2xl font-black text-[#1558A9]">
              {leads.filter((l) => l.status === "Documents Pending" || l.status === "Visa Processing").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-[#D9E2EC] shadow-2xs space-y-1">
            <span className="text-slate-500 font-semibold uppercase">Admissions Issued</span>
            <p className="text-2xl font-black text-[#063280]">
              {leads.filter((l) => l.status === "Admission Received" || l.status === "Joined").length}
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#D9E2EC] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, phone, city..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#063280] focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-slate-500 font-semibold">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-bold text-[#063280]"
            >
              <option value="all">All Statuses ({leads.length})</option>
              {leadStatuses.map((st) => (
                <option key={st} value={st}>
                  {st} ({leads.filter((l) => l.status === st).length})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 font-bold uppercase tracking-wider">
                  <th className="p-3.5">Student Name</th>
                  <th className="p-3.5">Contact (Phone / WhatsApp)</th>
                  <th className="p-3.5">NEET & PCB %</th>
                  <th className="p-3.5">Preferred College</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Source</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-slate-400">
                      No leads match your current search or filter.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5">
                        <p className="font-bold text-slate-900">{lead.name}</p>
                        <p className="text-[10px] text-slate-500">{lead.city || "India"}</p>
                      </td>
                      <td className="p-3.5">
                        <p className="font-semibold text-slate-800">{lead.phone}</p>
                        <p className="text-[10px] text-teal-700">{lead.email || "No email"}</p>
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-slate-900">Score: {lead.neetScore || "N/A"}</span>
                        <p className="text-[10px] text-slate-500">PCB: {lead.pcbPercentage || "--"}%</p>
                      </td>
                      <td className="p-3.5 font-medium text-slate-800">
                        {lead.preferredUniversity || "Any Recognized Uni"}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            lead.status === "New"
                              ? "bg-teal-100 text-teal-900"
                              : lead.status === "Contacted"
                              ? "bg-blue-100 text-blue-900"
                              : lead.status === "Admission Received"
                              ? "bg-emerald-100 text-emerald-900"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-500 text-[10px]">
                        {lead.source || "Website"}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleOpenLead(lead)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-[#0F2744] hover:text-white rounded-lg font-bold text-slate-700 transition-colors"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Lead Edit Drawer/Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-xs">
            <div className="bg-[#0F2744] text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white">{selectedLead.name}</h3>
                <p className="text-teal-300 text-[10px]">ID: {selectedLead.id}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Phone</span>
                  <p className="font-bold text-slate-800">{selectedLead.phone}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Email</span>
                  <p className="font-bold text-slate-800">{selectedLead.email || "N/A"}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Target College</span>
                  <p className="font-bold text-slate-800">{selectedLead.preferredUniversity}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Budget</span>
                  <p className="font-bold text-slate-800">{selectedLead.budget || "₹20L - ₹25L"}</p>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Pipeline Status</label>
                <select
                  value={editingStatus}
                  onChange={(e) => setEditingStatus(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
                >
                  {leadStatuses.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Counselor Call Notes</label>
                <textarea
                  rows="4"
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Record conversation outcome, documents received, or next follow-up date..."
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-hidden text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveLeadChanges}
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition-colors"
                >
                  Save Lead Updates
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Google Sheets Integration Modal */}
      {showSheetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-xs my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-linear-to-r from-[#0F2744] to-[#1E3A8A] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                  <Sheet className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Google Sheet Lead Automation</h3>
                  <p className="text-teal-200 text-[10px]">Save 100% of website student leads into your Google Sheet</p>
                </div>
              </div>
              <button
                onClick={() => setShowSheetModal(false)}
                className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Webhook Input Field */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-800 text-xs">
                  Your Google Apps Script Web App URL:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={webhookUrlInput}
                    onChange={(e) => setWebhookUrlInput(e.target.value)}
                    placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                    className="flex-1 p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-hidden text-xs font-mono"
                  />
                  <button
                    onClick={handleSaveWebhookUrl}
                    className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors shrink-0"
                  >
                    Save URL
                  </button>
                </div>
                {sheetSaveStatus && (
                  <p className="text-emerald-700 font-bold text-[11px]">{sheetSaveStatus}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={handleSendTestLeadToSheet}
                  disabled={isTestingSheet}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{isTestingSheet ? "Dispatching..." : "Send Test Lead to Sheet"}</span>
                </button>

                <button
                  onClick={handleCopyAppsScriptCode}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Apps Script Code Copied!</span>
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
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
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
                    className="text-teal-600 hover:text-teal-800 font-bold flex items-center gap-1"
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
                className="px-5 py-2 bg-[#0F2744] hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
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
      <div className="w-20 h-20 bg-teal-50 text-teal-700 rounded-full flex items-center justify-center mx-auto text-3xl font-black">
        404
      </div>
      <h1 className="text-3xl font-black text-[#0F2744]">Page Not Found</h1>
      <p className="text-slate-600 text-sm max-w-md mx-auto">
        The admission guide, university profile, or tool page you are looking for might have moved or is temporarily unavailable.
      </p>
      <div className="pt-4 flex items-center justify-center gap-3">
        <a
          href="/"
          className="px-6 py-3 bg-[#0F2744] hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
        >
          Return to Homepage
        </a>
        <a
          href="/universities/uzbekistan"
          className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors"
        >
          Explore Universities
        </a>
      </div>
    </div>
  );
}
