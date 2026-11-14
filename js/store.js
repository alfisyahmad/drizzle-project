/**
 * Drizzle Project — Data Store Adapter
 * Mirrors and proxies to js/app.js (drizzle_sim_db)
 */

if (typeof window !== 'undefined' && window.DrizzleApp) {
  window.DrizzleStore = window.DrizzleApp;
} else if (typeof document !== 'undefined') {
  // If app.js not yet loaded, load it or initialize alias
  window.DrizzleStore = window.DrizzleApp || {};
}
