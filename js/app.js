/**
 * Drizzle Project - Core Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Drizzle Project initialized.');

  // Helper function to generate mock order codes: e.g. DRZ-2026-001
  window.generateOrderCode = function () {
    const randomNum = Math.floor(100 + Math.random() * 900);
    return `DRZ-2026-${randomNum}`;
  };
});
