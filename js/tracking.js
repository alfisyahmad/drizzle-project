/**
 * DrizzleOS — Tracking Engine & 5-Stage Stepper
 * Relies on window.DrizzleApp (drizzle_sim_db)
 * Supports searching by: Order ID (DRZ-2026-XXX) or WhatsApp Number
 */

document.addEventListener('DOMContentLoaded', () => {
  const inputCode = document.getElementById('tracking-input');
  const searchForm = document.getElementById('tracking-search-form');
  const resultBox = document.getElementById('tracking-result-box');
  const notFoundBox = document.getElementById('tracking-not-found');
  const chipsContainer = document.getElementById('sample-chips');
  const multiOrdersNav = document.getElementById('multi-orders-nav');

  const KANBAN_STAGES = [
    { key: 'MENUNGGU_DP', label: '1. Menunggu DP', desc: 'Verifikasi DP 50% masuk ke kas ERP.' },
    { key: 'DESIGN', label: '2. Desain & Brief', desc: 'Mockup disetujui & approval desain.' },
    { key: 'PRINTING', label: '3. Sablon & Bordir', desc: 'Potong bahan & sablon/bordir presisi.' },
    { key: 'SEWING', label: '4. Jahit & Assembly', desc: 'Perakitan garmen & label woven Drizzle.' },
    { key: 'QC', label: '5. Quality Control', desc: 'Steam press & kemasan wajib 1:1.' },
    { key: 'SHIPPED', label: '6. Siap Kirim / Selesai', desc: 'Serah terima / kurir kargo ekspedisi.' }
  ];

  // 1. Populate Sample Chips (Orders + WhatsApp Numbers)
  if (chipsContainer && window.DrizzleApp) {
    const db = window.DrizzleApp.getDB();
    const orders = db.orders || [];
    const customers = db.customers || [];
    chipsContainer.innerHTML = '';

    // Sample Order Chips
    orders.slice(0, 4).forEach(o => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'px-2.5 py-1 rounded-lg bg-card hover:bg-canvas text-xs font-mono font-bold text-dark border border-borderCard transition shadow-sm';
      btn.textContent = o.orderId;
      btn.title = `Lacak Order ${o.orderId}`;
      btn.addEventListener('click', () => {
        if (inputCode) inputCode.value = o.orderId;
        lookupTracking(o.orderId);
      });
      chipsContainer.appendChild(btn);
    });

    // Sample WhatsApp Chips
    const phoneChips = customers.filter(c => c.whatsapp).slice(0, 2);
    phoneChips.forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'px-2.5 py-1 rounded-lg bg-brandLight text-brand hover:bg-brand hover:text-white text-xs font-mono font-bold border border-brand/20 transition shadow-sm flex items-center gap-1';
      btn.innerHTML = `<span>WA: ${c.whatsapp}</span>`;
      btn.title = `Lacak via WhatsApp (${c.name})`;
      btn.addEventListener('click', () => {
        if (inputCode) inputCode.value = c.whatsapp;
        lookupTracking(c.whatsapp);
      });
      chipsContainer.appendChild(btn);
    });
  }

  // 2. Form Submit
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = inputCode ? inputCode.value.trim() : '';
      lookupTracking(code);
    });
  }

  // 3. Check Query URL
  const urlParams = new URLSearchParams(window.location.search);
  const paramCode = urlParams.get('code') || urlParams.get('orderId') || urlParams.get('wa') || urlParams.get('phone');
  if (paramCode && inputCode) {
    inputCode.value = paramCode;
    lookupTracking(paramCode);
  }

  // Main Lookup Function (Order ID or WhatsApp Number)
  window.lookupTracking = function(rawQuery) {
    const query = (rawQuery || '').trim();
    if (!query || !window.DrizzleApp) return;

    const result = window.DrizzleApp.searchOrdersOrCustomer ? window.DrizzleApp.searchOrdersOrCustomer(query) : null;

    if (!result || !result.activeOrder) {
      if (resultBox) resultBox.classList.add('hidden');
      if (notFoundBox) notFoundBox.classList.remove('hidden');
      if (multiOrdersNav) multiOrdersNav.classList.add('hidden');
      return;
    }

    if (notFoundBox) notFoundBox.classList.add('hidden');
    if (resultBox) resultBox.classList.remove('hidden');

    const customer = result.customer || {};
    const allOrders = result.allOrders || [result.activeOrder];

    // Render Multi-Orders Navigation if client has more than 1 order
    renderMultiOrdersNav(allOrders, result.activeOrder.orderId, customer);

    // Render the active order details
    renderOrderView(result.activeOrder, customer);
  };

  function renderMultiOrdersNav(orders, activeOrderId, customer) {
    if (!multiOrdersNav) return;
    if (!orders || orders.length <= 1) {
      multiOrdersNav.classList.add('hidden');
      multiOrdersNav.innerHTML = '';
      return;
    }

    multiOrdersNav.classList.remove('hidden');
    multiOrdersNav.innerHTML = `
      <div class="p-3.5 bg-brandLight/70 border border-brand/20 rounded-xl space-y-2">
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold text-dark">Ditemukan ${orders.length} Pesanan untuk: <strong>${customer.name || 'Pelanggan'}</strong> (${customer.whatsapp || '-'})</span>
          <span class="text-[10px] font-mono font-bold text-brand uppercase bg-card px-2 py-0.5 rounded border border-brand/20">CRM WhatsApp Filter</span>
        </div>
        <div class="flex flex-wrap gap-2 pt-1" id="multi-orders-btn-list"></div>
      </div>
    `;

    const btnList = multiOrdersNav.querySelector('#multi-orders-btn-list');
    orders.forEach(ord => {
      const isSelected = ord.orderId === activeOrderId;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = isSelected 
        ? 'px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-brand text-white shadow-sm transition'
        : 'px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-card text-dark border border-borderCard hover:border-brand transition shadow-sm';
      btn.textContent = `${ord.orderId} (${ord.serviceName || ord.serviceId})`;
      btn.addEventListener('click', () => {
        renderMultiOrdersNav(orders, ord.orderId, customer);
        renderOrderView(ord, customer);
      });
      btnList.appendChild(btn);
    });
  }

  function renderOrderView(order, customer) {
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

    // Payment Badge (Belum Bayar / DP 50% Lunas / Lunas)
    const payBadge = document.getElementById('res-pay-badge');
    if (payBadge) {
      if (order.paymentStatus === 'LUNAS') {
        payBadge.textContent = 'Lunas';
        payBadge.className = 'text-xs font-bold font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200';
      } else if (order.paymentStatus === 'DP_50_PAID') {
        payBadge.textContent = 'DP 50% Lunas';
        payBadge.className = 'text-xs font-bold font-mono px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200';
      } else {
        payBadge.textContent = 'Belum Bayar';
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

    // Render 6-Stage Stepper
    renderStepper(order.kanbanStage, order.serviceMode);

    // Render History Logs Timeline
    renderHistoryTimeline(order.historyLogs || []);
  }

  function renderStepper(currentStageKey, serviceMode = 'PRODUCTION') {
    const container = document.getElementById('stepper-container');
    if (!container) return;
    container.innerHTML = '';

    const stageKeys = ['MENUNGGU_DP', 'DESIGN', 'PRINTING', 'SEWING', 'QC', 'SHIPPED'];
    const currentIdx = stageKeys.indexOf(currentStageKey);
    const activeIdx = currentIdx >= 0 ? currentIdx : 0;
    const isDesignOnly = serviceMode === 'DESIGN_ONLY';

    KANBAN_STAGES.forEach((st, idx) => {
      const isBypassed = isDesignOnly && (st.key === 'PRINTING' || st.key === 'SEWING');
      let isDone = idx < activeIdx;
      let isActive = idx === activeIdx;

      // In DESIGN_ONLY mode, if we are at QC or SHIPPED, PRINTING and SEWING are marked as bypassed (completed/skipped)
      if (isBypassed) {
        if (activeIdx > 1) { // active is QC (idx 4) or SHIPPED (idx 5)
          isDone = true;
          isActive = false;
        } else {
          isActive = false;
          isDone = false;
        }
      }

      const item = document.createElement('div');
      item.className = 'flex-1 text-center relative';

      let circleClass = '';
      let circleText = '';
      if (isBypassed && !isDone) {
        circleClass = 'bg-canvas text-muted border-dashed border-borderCard opacity-60';
        circleText = '—';
      } else if (isDone) {
        circleClass = 'bg-emerald-500 text-white border-emerald-500';
        circleText = '✓';
      } else if (isActive) {
        circleClass = 'bg-brand text-white border-brand ring-4 ring-brand/20 animate-pulse';
        circleText = idx + 1;
      } else {
        circleClass = 'bg-card text-muted border-borderCard';
        circleText = idx + 1;
      }

      const labelDesc = isBypassed ? '<span class="text-amber-600 font-semibold">(Bypass Desain)</span>' : st.desc;

      item.innerHTML = `
        <div class="w-8 h-8 mx-auto rounded-full border-2 flex items-center justify-center font-bold text-xs font-mono shadow-sm transition-all ${circleClass}">
          ${circleText}
        </div>
        <div class="mt-2 text-[11px] font-bold ${isActive ? 'text-brand' : (isDone ? 'text-dark' : 'text-muted')}">
          ${st.label}
        </div>
        <p class="text-[10px] text-muted hidden sm:block mt-0.5">${labelDesc}</p>
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
            <span class="text-[10px] px-1.5 py-0.5 rounded bg-canvas text-muted">${log.author || 'Sistem'}</span>
          </div>
          <p class="text-xs text-dark mt-1">${log.note}</p>
        </div>
      `;
      container.appendChild(item);
    });
  }
});
