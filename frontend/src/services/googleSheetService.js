/**
 * Google Sheet Integration Service for MH GLOBAL EDUCATION CONSULTANT
 * Directly posts lead submissions to a Google Apps Script Webhook endpoint.
 * Also mirrors data to LocalStorage for offline resilience & Admin CRM viewing.
 */

import { saveLead } from "../data/mockLeads";

// Default or configured Webhook URL (Can be set via .env or in /admin settings)
const DEFAULT_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbz1VKH-FJGbHBwh4YfCkR5nabyLnPyitw2U2N9-qgPLcA9El3JPhwjFPn61ZdKVOoH0yA/exec";
const DEFAULT_WEBHOOK_STORAGE_KEY = "mh_medical_google_sheet_webhook_url";

export const getGoogleSheetWebhookUrl = () => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return DEFAULT_WEBHOOK_URL;
  }
  return (
    localStorage.getItem(DEFAULT_WEBHOOK_STORAGE_KEY) ||
    import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL || DEFAULT_WEBHOOK_URL
  );
};

export const setGoogleSheetWebhookUrl = (url) => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") return;
  if (url && url.trim()) {
    localStorage.setItem(DEFAULT_WEBHOOK_STORAGE_KEY, url.trim());
  } else {
    localStorage.removeItem(DEFAULT_WEBHOOK_STORAGE_KEY);
  }
};

/**
 * Submits lead data directly to Google Sheets Webhook
 * @param {Object} leadData
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const submitToGoogleSheet = async (leadData) => {
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  
  const formattedData = {
    Timestamp: timestamp,
    Name: leadData.name || "",
    Phone: leadData.phone || leadData.whatsapp || "",
    Email: leadData.email || "",
    City_State: leadData.city || leadData.state || "",
    NEET_Status: leadData.neetStatus || (leadData.neetScore ? "Qualified" : "Appearing 2026"),
    NEET_Score: leadData.neetScore || "",
    PCB_Percentage: leadData.pcbPercentage || "",
    Preferred_University: leadData.preferredUniversity || "Tashkent Medical Academy",
    Budget_Range: leadData.budget || leadData.budgetRange || "₹20L - ₹25L",
    Source_Page: leadData.sourcePage || (typeof window !== "undefined" ? window.location.pathname : ""),
    Source_CTA: leadData.source || leadData.sourceCta || "Website Form",
    Message_Notes: leadData.message || leadData.initialNote || leadData.notes || ""
  };

  // 1. Mirror lead locally in CRM store
  try {
    saveLead({
      name: formattedData.Name,
      phone: formattedData.Phone,
      whatsapp: formattedData.Phone,
      email: formattedData.Email,
      city: formattedData.City_State,
      state: formattedData.City_State,
      neetStatus: formattedData.NEET_Status,
      neetScore: formattedData.NEET_Score,
      pcbPercentage: formattedData.PCB_Percentage,
      preferredUniversity: formattedData.Preferred_University,
      budget: formattedData.Budget_Range,
      source: formattedData.Source_CTA,
      notes: formattedData.Message_Notes
    });
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }

  // 2. Submit to Google Apps Script Webhook
  const webhookUrl = getGoogleSheetWebhookUrl();

  if (!webhookUrl) {
    console.log("[Google Sheets] No custom webhook set. Lead saved safely in local CRM & ready for Google Sheet sync:", formattedData);
    return {
      success: true,
      message: "Consultation request received successfully! Our senior counselor will connect with you on WhatsApp shortly.",
      isLocal: true
    };
  }

  try {
    // We send via form-encoded or no-cors fetch to avoid Google Script CORS redirect blocks
    const response = await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formattedData)
    });

    return {
      success: true,
      message: "Application submitted directly to admissions desk Google Sheet & CRM!",
      isGoogleSheet: true
    };
  } catch (err) {
    console.warn("[Google Sheets Error] Webhook dispatch failed:", err);
    return {
      success: true,
      message: "Consultation request received! Our senior counselor will call you within 15 minutes.",
      fallback: true
    };
  }
};

/**
 * Ready-to-use Google Apps Script code snippet for the user's Google Sheet
 */
export const GOOGLE_APPS_SCRIPT_CODE = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create Header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Student Name",
        "Phone / WhatsApp",
        "Email",
        "City / State",
        "NEET Status",
        "NEET Score",
        "12th PCB %",
        "Preferred University",
        "Budget Range",
        "Source Page",
        "Source CTA",
        "Message / Counselor Notes"
      ]);
      sheet.getRange("A1:M1").setBackground("#0F2744").setFontColor("#FFFFFF").setFontWeight("bold");
    }
    
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.Timestamp || new Date(),
      data.Name || "",
      data.Phone || "",
      data.Email || "",
      data.City_State || "",
      data.NEET_Status || "",
      data.NEET_Score || "",
      data.PCB_Percentage || "",
      data.Preferred_University || "",
      data.Budget_Range || "",
      data.Source_Page || "",
      data.Source_CTA || "",
      data.Message_Notes || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
