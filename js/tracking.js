/**
 * DrizzleOS — Tracking Engine & 5-Stage Stepper
 * Relies on window.DrizzleApp (drizzle_sim_db)
 */

document.addEventListener('DOMContentLoaded', () => {
  const inputCode = document.getElementById('tracking-input');
  const searchForm = document.getElementById('tracking-search-form');
  const resultBox = document.getElementById('tracking-result-box');
  const notFoundBox = document.getElementById('tracking-not-found');
  const chipsContainer = document.getElementById('sample-chips');

  const KANBAN_STAGES = [
    { key: 'DESIGN', label: '1. Design & Approval', desc: 'Mockup disetujui & verifikasi DP.' },
    { key: 'PRINTING', label: '2. Printing & Cutting', desc: 'Potong bahan & sablon/bordir.' },
    { key: 'SEWING', label: '3. Sewing & Assembly', desc: 'Perakitan garmen & label woven.' },
    { key: 'QC', label: '4. Quality Control', desc: 'Steam press & kemasan 1:1.' },
    { key: 'SHIPPED', label: '5. Shipped & Completed', desc: 'Serah terima / kurir kargo.' }
  ];

  // 1. Populate Sample Chips
  if (chipsContainer && window.DrizzleApp) {
    const db = window.DrizzleApp.getDB();
    const orders = db.orders || [];
    chipsContainer.innerHTML = '';
    orders.slice(0, 6).forEach(o => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'px-3 py-1 rounded-lg bg-card hover:bg-subtle text-xs font-mono font-bold text-dark border border-borderCard transition shadow-sm';
      btn.textContent = o.orderId;
      btn.addEventListener('click', () => {
        if (inputCode) inputCode.value = o.orderId;
        lookupTracking(o.orderId);
      });
      chipsContainer.appendChild(btn);
    });
  }

  // 2. Form Submit
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = inputCode ? inputCode.value.trim().toUpperCase() : '';
      lookupTracking(code);
    });
  }

  // 3. Check Query URL
  const urlParams = new URLSearchParams(window.location.search);
  const paramCode = urlParams.get('code') || urlParams.get('orderId');
  if (paramCode && inputCode) {
    inputCode.value = paramCode;
    lookupTracking(paramCode);
  }

  // Main Lookup Function
  window.lookupTracking = function(rawCode) {
    const code = (rawCode || '').trim().toUpperCase();
    if (!code || !window.DrizzleApp) return;

    const db = window.DrizzleApp.getDB();
    const order = (db.orders || []).find(o => o.orderId === code || o.tracking_code === code);

    if (!order) {
      if (resultBox) resultBox.classList.add('hidden');
      if (notFoundBox) notFoundBox.classList.remove('hidden');
      return;
    }

    if (notFoundBox) notFoundBox.classList.add('hidden');
    if (resultBox) resultBox.classList.remove('hidden');

    const customer = (db.customers || []).find(c => c.customerId === order.customerId) || {};

    // Fill Summary Cards
    const codeEl = document.getElementById('res-code');
    if (codeEl) codeEl.textContent = order.orderId;

    const custNameEl = document.getElementById('res-cust-name');
    if (custNameEl) custNameEl.textContent = customer.name || 'Klien Drizzle';

    const custOrgEl = document.getElementById('res-cust-org');
    if (custOrgEl) custOrgEl.textContent = customer.organization || 'Umum';

    const prodNameEl = document.getElementById('res-prod-name');
    if (prodNameEl) prodNameEl.textContent = order.serviceName || 'Custom Apparel';

    const totalPcsEl = document.getElementById('res-total-pcs');
    if (totalPcsEl) totalPcsEl.textContent = `${order.qty} Pcs`;

    const totalPriceEl = document.getElementById('res-total-price');
    if (totalPriceEl) totalPriceEl.textContent = window.DrizzleApp.formatRupiah(order.totalPrice);

    const createdAtEl = document.getElementById('res-created-at');
    if (createdAtEl) createdAtEl.textContent = `Dipesan: ${order.createdAt || '-'}`;

    // Payment Badge
    const payBadge = document.getElementById('res-pay-badge');
    if (payBadge) {
      if (order.paymentStatus === 'LUNAS') {
        payBadge.textContent = 'LUNAS (100%)';
        payBadge.className = 'text-xs font-bold font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200';
      } else if (order.paymentStatus === 'DP_50_PAID') {
        payBadge.textContent = 'DP 50% TERVERIFIKASI';
        payBadge.className = 'text-xs font-bold font-mono px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200';
      } else {
        payBadge.textContent = 'MENUNGGU DP';
        payBadge.className = 'text-xs font-bold font-mono px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200';
      }
    }

    // Breakdown Ukuran
    const bdBox = document.getElementById('res-breakdown-box');
    if (bdBox) {
      if (order.sizeBreakdown) {
        bdBox.classList.remove('hidden');
        const sEl = document.getElementById('res-s'); if (sEl) sEl.textContent = order.sizeBreakdown.S || 0;
        const mEl = document.getElementById('res-m'); if (mEl) mEl.textContent = order.sizeBreakdown.M || 0;
        const lEl = document.getElementById('res-l'); if (lEl) lEl.textContent = order.sizeBreakdown.L || 0;
        const xlEl = document.getElementById('res-xl'); if (xlEl) xlEl.textContent = order.sizeBreakdown.XL || 0;
        const xxlEl = document.getElementById('res-xxl'); if (xxlEl) xxlEl.textContent = order.sizeBreakdown.XXL || 0;
      } else {
        bdBox.classList.add('hidden');
      }
    }

    // Specs
    const specsEl = document.getElementById('res-specs');
    if (specsEl) specsEl.textContent = order.briefUrl || '-';

    // Address
    const addrEl = document.getElementById('res-cust-address');
    if (addrEl) addrEl.textContent = customer.address || 'Studio Drizzle Solo (Pick-up)';

    // Shipping Box (Outbound SCM)
    const shipBox = document.getElementById('res-shipping-box');
    if (shipBox) {
      if (order.trackingResi || order.shippingCarrier) {
        shipBox.classList.remove('hidden');
        const carrierEl = document.getElementById('res-shipping-carrier');
        if (carrierEl) carrierEl.textContent = `${order.shippingCarrier || 'Ekspedisi Rekanan'} (${order.kanbanStage === 'SHIPPED' ? 'Terkirim' : 'Dalam Pengiriman'})`;
        const resiEl = document.getElementById('res-shipping-resi');
        if (resiEl) resiEl.textContent = order.trackingResi || 'Resi Segera Diupdate';
      } else {
        shipBox.classList.add('hidden');
      }
    }

    // Reorder Button
    const reorderBtn = document.getElementById('res-reorder-btn');
    if (reorderBtn) {
      reorderBtn.href = `order.html?reorder=${encodeURIComponent(order.orderId)}`;
    }

    // Render 5-Stage Stepper
    renderStepper(order.kanbanStage);

    // Render History Logs Timeline
    renderHistoryTimeline(order.historyLogs || []);
  };

  function renderStepper(currentStageKey) {
    const container = document.getElementById('stepper-container');
    if (!container) return;
    container.innerHTML = '';

    const stageKeys = ['DESIGN', 'PRINTING', 'SEWING', 'QC', 'SHIPPED'];
    const currentIdx = stageKeys.indexOf(currentStageKey);
    const activeIdx = currentIdx >= 0 ? currentIdx : 0;

    KANBAN_STAGES.forEach((st, idx) => {
      const isDone = idx < activeIdx;
      const isActive = idx === activeIdx;
      const isPending = idx > activeIdx;

      const item = document.createElement('div');
      item.className = 'flex-1 text-center relative';

      let circleClass = '';
      let circleText = '';
      if (isDone) {
        circleClass = 'bg-emerald-500 text-white border-emerald-500';
        circleText = '✓';
      } else if (isActive) {
        circleClass = 'bg-brand text-white border-brand ring-4 ring-brand/20 animate-pulse';
        circleText = idx + 1;
      } else {
        circleClass = 'bg-card text-muted border-borderCard';
        circleText = idx + 1;
      }

      item.innerHTML = `
        <div class="w-8 h-8 mx-auto rounded-full border-2 flex items-center justify-center font-bold text-xs font-mono shadow-sm transition-all ${circleClass}">
          ${circleText}
        </div>
        <div class="mt-2 text-[11px] font-bold ${isActive ? 'text-brand' : (isDone ? 'text-dark' : 'text-muted')}">
          ${st.label}
        </div>
        <p class="text-[10px] text-muted hidden sm:block mt-0.5">${st.desc}</p>
      `;
      container.appendChild(item);
    });
  }

  function renderHistoryTimeline(logs) {
    const container = document.getElementById('timeline-logs-container');
    if (!container) return;
    container.innerHTML = '';

    if (!logs || logs.length === 0) {
      container.innerHTML = '<p class="text-xs text-muted">Belum ada catatan log progres.</p>';
      return;
    }

    logs.forEach(log => {
      const item = document.createElement('div');
      item.className = 'relative flex items-start gap-3 pl-4 pb-4 border-l-2 border-borderCard last:pb-0';
      item.innerHTML = `
        <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-brand"></div>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-dark font-mono">[${log.stage}]</span>
            <span class="text-[10px] text-muted font-mono">${log.timestamp}</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded bg-subtle text-muted">${log.author || 'Sistem'}</span>
          </div>
          <p class="text-xs text-dark mt-1">${log.note}</p>
        </div>
      `;
      container.appendChild(item);
    });
  }
});
