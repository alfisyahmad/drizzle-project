/**
 * Drizzle Project - Tracking Engine & Timeline Visualizer
 * Integrates CRM & ERP order states with 6-stage visual production timeline.
 */

const PRODUCTION_STAGES = [
  {
    name: 'Design Approved',
    desc: 'Desain mockup, spesifikasi warna kain, dan penempatan sablon/bordir disetujui pemesan.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    name: 'Down Payment (DP)',
    desc: 'Uang muka (DP 50%) diverifikasi oleh tim ERP Finance untuk validasi antrean produksi.',
    icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
  },
  {
    name: 'Bahan & Potong',
    desc: 'Pemotongan pola kain rol di seksi cutting sesuai breakdown ukuran pesanan.',
    icon: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z'
  },
  {
    name: 'Sablon/Bordir',
    desc: 'Proses aplikasi grafis: sablon DTF/Plastisol presisi tinggi atau bordir komputer timbul.',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
  },
  {
    name: 'Jahit & Finishing',
    desc: 'Perakitan garmen, pemasangan rib/zipper, pembersihan sisa benang, dan steam press.',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
  },
  {
    name: 'Siap Kirim/Ambil',
    desc: 'Quality Control final lolos standar, packing plastik ziplock rapi, siap diambil atau dikirim.',
    icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
  }
];

/**
 * Ensure seed data for DRZ-2026-001 and DRZ-2026-002 exists without overwriting new orders
 */
function ensureTrackingSeeds() {
  const orders = window.Drizzle.getStorage('drizzle_orders');
  const customers = window.Drizzle.getStorage('drizzle_customers');
  const details = window.Drizzle.getStorage('drizzle_order_details');
  const logs = window.Drizzle.getStorage('drizzle_production_logs');

  let updated = false;

  // 1. DRZ-2026-001 (Target stage: Sablon/Bordir)
  let order1 = orders.find(o => o.tracking_code === 'DRZ-2026-001');
  if (!order1) {
    order1 = {
      order_id: 1,
      customer_id: 1,
      total_pcs: 36,
      status_payment: 'DP Verified',
      order_status: 'In Production',
      tracking_code: 'DRZ-2026-001',
      created_at: '2026-11-10 14:30:00'
    };
    orders.push(order1);
    updated = true;
  }

  if (!customers.some(c => c.customer_id === 1)) {
    customers.push({
      customer_id: 1,
      name: 'Dimas Wicaksono',
      organization: 'Himpunan Mahasiswa Informatika',
      phone: '081234567890',
      email: 'dimas@hmif.org'
    });
    updated = true;
  }

  if (!details.some(d => d.order_id === 1)) {
    details.push({
      detail_id: 1,
      order_id: 1,
      product_id: 8,
      product_name: 'Varsity',
      size_breakdown: { S: 5, M: 12, L: 14, XL: 4, XXL: 1 },
      mockup_url: '',
      print_type: 'Bordir Komputer + Chenille Towel',
      fabric_color: 'Forest Green & Cream Leather',
      notes: 'Bordir dada kiri logo Himpunan, punggung inisial angkatan 2026, furing quilted padding tebal.',
      estimated_total: 36 * 175000
    });
    updated = true;
  }

  // Ensure logs for order 1 up to 'Sablon/Bordir'
  const expectedLogs1 = [
    { order_id: 1, stage_name: 'Design Approved', updated_at: '2026-11-10 14:45:00' },
    { order_id: 1, stage_name: 'Down Payment (DP)', updated_at: '2026-11-11 10:00:00' },
    { order_id: 1, stage_name: 'Bahan & Potong', updated_at: '2026-11-12 11:30:00' },
    { order_id: 1, stage_name: 'Sablon/Bordir', updated_at: '2026-11-13 16:00:00' }
  ];

  expectedLogs1.forEach(exp => {
    if (!logs.some(l => l.order_id === exp.order_id && l.stage_name === exp.stage_name)) {
      const nextLogId = logs.length ? (Math.max(...logs.map(l => l.log_id || 0)) + 1) : 1;
      logs.push({ log_id: nextLogId, ...exp });
      updated = true;
    }
  });

  // 2. DRZ-2026-002 (Target stage: Down Payment (DP))
  let order2 = orders.find(o => o.tracking_code === 'DRZ-2026-002');
  if (!order2) {
    order2 = {
      order_id: 2,
      customer_id: 2,
      total_pcs: 50,
      status_payment: 'DP Verified',
      order_status: 'In Production',
      tracking_code: 'DRZ-2026-002',
      created_at: '2026-11-12 09:15:00'
    };
    orders.push(order2);
    updated = true;
  }

  if (!customers.some(c => c.customer_id === 2)) {
    customers.push({
      customer_id: 2,
      name: 'Siti Sarah',
      organization: 'Apex Motorsport Club',
      phone: '088211223344',
      email: 'sarah@apexmotorsport.com'
    });
    updated = true;
  }

  if (!details.some(d => d.order_id === 2)) {
    details.push({
      detail_id: 2,
      order_id: 2,
      product_id: 1,
      product_name: 'T-Shirt',
      size_breakdown: { S: 10, M: 20, L: 15, XL: 5, XXL: 0 },
      mockup_url: '',
      print_type: 'Sablon DTF High Density',
      fabric_color: 'Jet Black Cotton Combed 30s',
      notes: 'Desain racing typography motorsport dada depan dan grafis mobil balap di punggung A3.',
      estimated_total: 50 * 65000
    });
    updated = true;
  }

  // Ensure logs for order 2 up to 'Down Payment (DP)'
  const expectedLogs2 = [
    { order_id: 2, stage_name: 'Design Approved', updated_at: '2026-11-12 09:20:00' },
    { order_id: 2, stage_name: 'Down Payment (DP)', updated_at: '2026-11-12 15:30:00' }
  ];

  expectedLogs2.forEach(exp => {
    if (!logs.some(l => l.order_id === exp.order_id && l.stage_name === exp.stage_name)) {
      const nextLogId = logs.length ? (Math.max(...logs.map(l => l.log_id || 0)) + 1) : 1;
      logs.push({ log_id: nextLogId, ...exp });
      updated = true;
    }
  });

  if (updated) {
    window.Drizzle.setStorage('drizzle_orders', orders);
    window.Drizzle.setStorage('drizzle_customers', customers);
    window.Drizzle.setStorage('drizzle_order_details', details);
    window.Drizzle.setStorage('drizzle_production_logs', logs);
  }
}

/**
 * Main Controller for tracking.html
 */
document.addEventListener('DOMContentLoaded', () => {
  // Ensure seed data without destroying existing records
  ensureTrackingSeeds();

  const searchForm = document.getElementById('tracking-search-form');
  const searchInput = document.getElementById('search-order-code');
  const errorContainer = document.getElementById('tracking-error');
  const resultContainer = document.getElementById('tracking-result-section');
  const chipsContainer = document.getElementById('sample-chips-container');

  // Populate dynamic chips from recent orders in storage
  function renderSampleChips() {
    if (!chipsContainer) return;
    const orders = window.Drizzle.getStorage('drizzle_orders');
    chipsContainer.innerHTML = '';

    // Take up to 4 recent orders
    const chipOrders = orders.slice(-4).reverse();
    chipOrders.forEach(ord => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'px-3 py-1.5 rounded-lg bg-card hover:bg-zinc-800 border border-subtle hover:border-neon font-mono text-xs text-zinc-300 hover:text-neon transition flex items-center gap-1.5';
      btn.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-neon"></span><span>${ord.tracking_code}</span>`;
      btn.addEventListener('click', () => {
        searchInput.value = ord.tracking_code;
        performSearch(ord.tracking_code);
      });
      chipsContainer.appendChild(btn);
    });
  }

  renderSampleChips();

  // Search Action
  function performSearch(rawCode) {
    const code = (rawCode || '').trim().toUpperCase();
    if (!code) return;

    const orders = window.Drizzle.getStorage('drizzle_orders');
    const customers = window.Drizzle.getStorage('drizzle_customers');
    const details = window.Drizzle.getStorage('drizzle_order_details');
    const logs = window.Drizzle.getStorage('drizzle_production_logs');

    const order = orders.find(o => o.tracking_code === code);

    if (!order) {
      if (resultContainer) resultContainer.classList.add('hidden');
      if (errorContainer) {
        errorContainer.classList.remove('hidden');
        document.getElementById('error-searched-code').textContent = code;
      }
      return;
    }

    // Found order!
    if (errorContainer) errorContainer.classList.add('hidden');
    if (resultContainer) resultContainer.classList.remove('hidden');

    const customer = customers.find(c => c.customer_id === order.customer_id) || {
      name: 'Pemesan',
      organization: 'Umum',
      phone: '-',
      email: '-'
    };

    const detail = details.find(d => d.order_id === order.order_id) || {
      product_name: 'Custom Merchandise',
      size_breakdown: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
      print_type: 'Standar Sablon',
      fabric_color: 'Standar Kain',
      notes: '-',
      mockup_url: '',
      estimated_total: 0
    };

    const orderLogs = logs.filter(l => l.order_id === order.order_id);

    // 1. Populate Order Summary Header & Badges
    document.getElementById('display-tracking-code').textContent = order.tracking_code;
    document.getElementById('display-created-at').textContent = order.created_at || 'Baru saja';
    document.getElementById('display-cust-name').textContent = customer.name;
    document.getElementById('display-cust-org').textContent = customer.organization || 'Pribadi';
    document.getElementById('display-cust-phone').textContent = customer.phone || '-';
    document.getElementById('display-cust-email').textContent = customer.email || '-';

    document.getElementById('display-product-name').textContent = (detail.product_name || 'MERCHANDISE').toUpperCase();
    document.getElementById('display-total-pcs').textContent = `${order.total_pcs} PCS`;

    // Sizes
    const sizes = detail.size_breakdown || { S: 0, M: 0, L: 0, XL: 0, XXL: 0 };
    document.getElementById('display-size-s').textContent = sizes.S || 0;
    document.getElementById('display-size-m').textContent = sizes.M || 0;
    document.getElementById('display-size-l').textContent = sizes.L || 0;
    document.getElementById('display-size-xl').textContent = sizes.XL || 0;
    document.getElementById('display-size-xxl').textContent = sizes.XXL || 0;

    // Specs
    document.getElementById('display-print-type').textContent = detail.print_type || 'Standar';
    document.getElementById('display-fabric-color').textContent = detail.fabric_color || 'Standar';
    document.getElementById('display-notes').textContent = detail.notes || 'Tidak ada catatan tambahan.';

    // Payment Badge
    const paymentBadge = document.getElementById('display-payment-status');
    paymentBadge.textContent = order.status_payment || 'Menunggu DP';
    if (order.status_payment === 'DP Verified' || order.status_payment === 'Lunas') {
      paymentBadge.className = 'font-mono text-xs px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold';
    } else {
      paymentBadge.className = 'font-mono text-xs px-3 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold';
    }

    // Mockup Preview
    const mockupContainer = document.getElementById('display-mockup-container');
    const mockupImg = document.getElementById('display-mockup-img');
    const mockupEmpty = document.getElementById('display-mockup-empty');

    if (detail.mockup_url && detail.mockup_url.trim().length > 10) {
      mockupImg.src = detail.mockup_url;
      mockupContainer.classList.remove('hidden');
      if (mockupEmpty) mockupEmpty.classList.add('hidden');
    } else {
      mockupContainer.classList.add('hidden');
      if (mockupEmpty) mockupEmpty.classList.remove('hidden');
    }

    // 2. Render 6-Stage Visual Timeline
    renderTimeline(orderLogs);

    // Smooth scroll to result
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderTimeline(orderLogs) {
    const timelineContainer = document.getElementById('timeline-stages-container');
    if (!timelineContainer) return;
    timelineContainer.innerHTML = '';

    // Map logs by stage name for instant lookup
    const logMap = {};
    orderLogs.forEach(l => {
      logMap[l.stage_name] = l.updated_at;
    });

    // Determine latest stage index that has a log
    let activeStageIndex = 0;
    PRODUCTION_STAGES.forEach((stage, idx) => {
      if (logMap[stage.name]) {
        activeStageIndex = idx;
      }
    });

    // Current stage banner
    const currentStageName = PRODUCTION_STAGES[activeStageIndex].name;
    document.getElementById('display-current-stage').textContent = currentStageName;

    // Render 6 Stage Items
    PRODUCTION_STAGES.forEach((stage, index) => {
      const isCompleted = index < activeStageIndex;
      const isActive = index === activeStageIndex;
      const isPending = index > activeStageIndex;
      const logTime = logMap[stage.name];

      const stageItem = document.createElement('div');
      stageItem.className = 'relative flex items-start space-x-4 sm:space-x-6 group';

      // Connecting vertical line (except for last stage)
      let lineHtml = '';
      if (index < PRODUCTION_STAGES.length - 1) {
        const lineColor = (index < activeStageIndex) ? 'bg-neon' : 'bg-subtle';
        lineHtml = `<div class="absolute left-5 sm:left-6 top-12 bottom-0 w-0.5 -ml-px ${lineColor} transition-colors"></div>`;
      }

      // Icon & Marker
      let markerHtml = '';
      if (isCompleted) {
        // Completed: Neon solid with checkmark
        markerHtml = `
          <div class="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-neon text-black flex items-center justify-center font-bold shadow-[0_0_15px_rgba(210,255,0,0.4)]">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
          </div>
        `;
      } else if (isActive) {
        // Active: Glowing Neon Border with pulsing inner badge
        markerHtml = `
          <div class="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-card border-2 border-neon text-neon flex items-center justify-center font-bold shadow-[0_0_20px_rgba(210,255,0,0.5)] animate-pulse">
            <span class="w-3.5 h-3.5 rounded-full bg-neon animate-ping absolute"></span>
            <span class="w-3.5 h-3.5 rounded-full bg-neon relative"></span>
          </div>
        `;
      } else {
        // Pending: Muted Dark
        markerHtml = `
          <div class="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-card border border-subtle text-zinc-600 flex items-center justify-center font-mono text-xs">
            0${index + 1}
          </div>
        `;
      }

      // Card Content
      let cardBg = '';
      let titleColor = '';
      let badgeHtml = '';

      if (isCompleted) {
        cardBg = 'bg-card border-subtle hover:border-neon/40';
        titleColor = 'text-white';
        badgeHtml = `<span class="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">SELESAI</span>`;
      } else if (isActive) {
        cardBg = 'bg-card border-neon shadow-[0_0_25px_rgba(210,255,0,0.15)]';
        titleColor = 'text-neon';
        badgeHtml = `<span class="font-mono text-[10px] px-2.5 py-0.5 rounded bg-neon/10 text-neon border border-neon/30 font-bold animate-pulse">SEDANG DIKERJAKAN [●]</span>`;
      } else {
        cardBg = 'bg-carbon/40 border-subtle/50 opacity-60';
        titleColor = 'text-zinc-500';
        badgeHtml = `<span class="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-500">MENUNGGU</span>`;
      }

      stageItem.innerHTML = `
        ${lineHtml}
        ${markerHtml}
        <div class="flex-1 pb-10">
          <div class="${cardBg} border rounded-xl p-5 sm:p-6 transition-all duration-200">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div class="flex items-center gap-3">
                <span class="font-mono text-xs text-zinc-500">STAGE 0${index + 1}</span>
                <h4 class="font-anton text-xl sm:text-2xl ${titleColor} uppercase tracking-wide">${stage.name}</h4>
              </div>
              <div class="flex items-center gap-2">
                ${badgeHtml}
              </div>
            </div>
            
            <p class="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mb-3">${stage.desc}</p>
            
            <div class="pt-3 border-t border-subtle/60 flex items-center justify-between text-xs font-mono">
              <span class="text-zinc-500">Status Update:</span>
              <span class="${logTime ? 'text-zinc-300 font-bold' : 'text-zinc-600'}">
                ${logTime ? `Tercatat pada: ${logTime}` : 'Belum diproses'}
              </span>
            </div>
          </div>
        </div>
      `;

      timelineContainer.appendChild(stageItem);
    });
  }

  // Form submit listener
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    performSearch(searchInput.value);
  });

  // Check URL parameter ?code=
  const urlParams = new URLSearchParams(window.location.search);
  const codeParam = urlParams.get('code');
  if (codeParam) {
    searchInput.value = codeParam;
    performSearch(codeParam);
  } else {
    // Default demo: search DRZ-2026-001 so user immediately sees live timeline
    searchInput.value = 'DRZ-2026-001';
    performSearch('DRZ-2026-001');
  }
});
