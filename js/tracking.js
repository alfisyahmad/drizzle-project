/**
 * Drizzle Project - Tracking Module
 */

document.addEventListener('DOMContentLoaded', () => {
  const trackingForm = document.getElementById('tracking-form');
  const orderCodeInput = document.getElementById('order-code-input');
  const trackingResult = document.getElementById('tracking-result');

  if (trackingForm) {
    trackingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = orderCodeInput ? orderCodeInput.value.trim().toUpperCase() : '';
      if (!code) return;

      if (trackingResult) {
        trackingResult.classList.remove('hidden');
        const codeDisplay = document.getElementById('display-order-code');
        if (codeDisplay) codeDisplay.textContent = code;
      }
    });
  }
});
