/**
 * Analytics and DataLayer Event Tracking Utility
 * Safely dispatches custom events to Google Tag Manager and GA4.
 */

export const track = (eventName, eventParams = {}) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    timestamp: new Date().toISOString(),
    ...eventParams
  });

  // Log in development mode for easy verification
  if (import.meta.env.DEV) {
    console.log(`[Analytics Event] ${eventName}:`, eventParams);
  }
};
