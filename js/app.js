/**
 * DrizzleOS — Core SaaS Engine & Multi-Tenant SIM Architecture
 * LocalStorage Key: 'drizzle_sim_db_clean_v1'
 * 6 Relational Collections: services, customers, orders, materials, purchaseOrders, financeLedger
 * + tenantConfig (Multi-Tenant SaaS Configuration)
 *
 * v3.1 — Clean slate transactions, fresh DB key, flexible payment, cancel/return support
 */

const DRIZZLE_SIM_DB_KEY = 'drizzle_sim_db_clean_v1';
const CURRENT_SCHEMA_VERSION = 'v3.2.0';

// Daftar seluruh key legacy/usang yang dibersihkan otomatis dari localStorage
const DRIZZLE_LEGACY_KEYS = [
  'drizzle_sim_db',
  'drizzle_integrated_db',
  'drizzle_db',
  'drizzle_orders',
  'drizzle_customers',
  'drizzle_materials',
  'drizzle_finance',
  'drizzle_pos',
  'drizzle_app_db',
  'drizzle_sim_db_v1',
  'drizzle_sim_db_v2',
  'drizzle_state',
  'drizzle_cache'
];

/**
 * Pembersih Cache & Key Usang Otomatis:
 * Menghapus semua key localStorage versi lama/duplikat dan mempertahankan hanya 1 key aktif
 */
function purgeLegacyCaches() {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    // 1. Bersihkan key legacy eksplisit
    DRIZZLE_LEGACY_KEYS.forEach(oldKey => {
      if (localStorage.getItem(oldKey) !== null) {
        localStorage.removeItem(oldKey);
        console.info(`[DrizzleOS] Legacy key '${oldKey}' dihapus otomatis.`);
      }
    });

    // 2. Pindai dan bersihkan key ber-prefix 'drizzle_' lainnya yang bukan versi aktif
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith('drizzle_') && key !== DRIZZLE_SIM_DB_KEY) {
        localStorage.removeItem(key);
        console.info(`[DrizzleOS] Cache usang '${key}' dihapus otomatis.`);
      }
    }
  } catch (err) {
    console.warn('[DrizzleOS] Gagal membersihkan cache lama:', err);
  }
}

// Jalankan auto-purge segera saat script dimuat
purgeLegacyCaches();

// 1. TENANT CONFIGURATION (Multi-Tenant SaaS Ready)
const DEFAULT_TENANT_CONFIG = {
  tenantId: 'TENANT-DRIZZLE-SOLO',
  businessName: 'Drizzle Project',
  brandLabel: 'DRIZZLE THE LABEL',
  tagline: 'Customize Your Merchandise — We Handle What You Need',
  philosophy: 'Human Help Human (All Product Include Packaging)',
  establishedYear: 2023,
  contactWA: '+62 895-2295-1860',
  contactWALink: 'https://wa.me/6289522951860',
  contactEmail: 'drizzlethelabel@gmail.com',
  contactIG: '@drizzleproject',
  studioLocation: 'Surakarta, Jawa Tengah',
  defaultPackagingRatio: 1.0, // 1:1 Rule
  defaultDpPercentage: 0.5,   // 50% DP (default, now flexible)
  currency: 'IDR',
  activeTheme: 'warm-studio',
  version: 'DrizzleOS v3.1 SaaS Multi-Tenant'
};

// 2. MASTER KATALOG LAYANAN (5 Layanan Utama Siap Pakai)
const INITIAL_SERVICES = [
  {
    serviceId: 'SRV-01',
    category: 'APPAREL',
    name: 'Kaos Cotton Combed 24s',
    basePrice: 73000,
    hppUnit: 47000,
    leadTimeDays: 7,
    minQty: 12,
    badge: 'BESTSELLER',
    desc: 'Cotton Combed 24s Reactive super lembut & adem, sablon DTF & Plastisol high density.',
    bomRecipe: [
      { materialId: 'MAT-01', qtyPerUnit: 0.034, name: 'Kain Cotton Combed (Roll)' },
      { materialId: 'MAT-04', qtyPerUnit: 0.05, name: 'Tinta Sablon (Kg)' },
      { materialId: 'MAT-05', qtyPerUnit: 1.0, name: 'Polymailer/Box Drizzle (1:1)' },
      { materialId: 'MAT-06', qtyPerUnit: 1.0, name: 'Thank You Card (1:1)' }
    ]
  },
  {
    serviceId: 'SRV-02',
    category: 'APPAREL',
    name: 'Hoodie / Crewneck Fleece',
    basePrice: 155000,
    hppUnit: 105000,
    leadTimeDays: 10,
    minQty: 12,
    badge: 'HEAVYWEIGHT',
    desc: 'Cotton Fleece 330gsm tebal hangat, tali katun, saku kangguru atau crewneck rapi.',
    bomRecipe: [
      { materialId: 'MAT-03', qtyPerUnit: 0.05, name: 'Kain Fleece (Roll)' },
      { materialId: 'MAT-05', qtyPerUnit: 1.0, name: 'Polymailer/Box Drizzle (1:1)' },
      { materialId: 'MAT-06', qtyPerUnit: 1.0, name: 'Thank You Card (1:1)' }
    ]
  },
  {
    serviceId: 'SRV-03',
    category: 'APPAREL',
    name: 'Kemeja PDH / Workshirt American Drill',
    basePrice: 120000,
    hppUnit: 78000,
    leadTimeDays: 10,
    minQty: 12,
    badge: 'KOMUNITAS & KANTOR',
    desc: 'American Drill premium, jahitan kokoh, bordir komputer presisi instansi & ventilasi furing.',
    bomRecipe: [
      { materialId: 'MAT-02', qtyPerUnit: 0.04, name: 'Kain American Drill (Roll)' },
      { materialId: 'MAT-05', qtyPerUnit: 1.0, name: 'Polymailer/Box Drizzle (1:1)' },
      { materialId: 'MAT-06', qtyPerUnit: 1.0, name: 'Thank You Card (1:1)' }
    ]
  },
  {
    serviceId: 'SRV-04',
    category: 'MERCH',
    name: 'Totebag / Merchandise Custom',
    basePrice: 35000,
    hppUnit: 21000,
    leadTimeDays: 5,
    minQty: 24,
    badge: 'MERCHANDISE',
    desc: 'Bahan kanvas tebal 12oz atau blacu natural dengan sablon awet untuk souvenir dan event.',
    bomRecipe: [
      { materialId: 'MAT-02', qtyPerUnit: 0.02, name: 'Kain American Drill / Kanvas (Roll)' },
      { materialId: 'MAT-05', qtyPerUnit: 1.0, name: 'Polymailer/Box Drizzle (1:1)' },
      { materialId: 'MAT-06', qtyPerUnit: 1.0, name: 'Thank You Card (1:1)' }
    ]
  },
  {
    serviceId: 'SRV-05',
    category: 'DESIGN',
    name: 'Jasa Desain Grafis & Mockup',
    basePrice: 0,
    hppUnit: 0,
    leadTimeDays: 3,
    minQty: 24,
    badge: 'GRATIS (MIN 2 LUSIN)',
    desc: 'Pembuatan artwork kaos, apparel mockup 3D visual, tracing logo vector, dan brief teknis produksi (Gratis dengan minimal pemesanan 2 lusin / 24 pcs).',
    bomRecipe: []
  }
];

// 3. MASTER STOK GUDANG (Kemasan Wajib Rasio 1:1)
const INITIAL_MATERIALS = [
  {
    materialId: 'MAT-01',
    materialName: 'Kain Cotton Combed',
    unit: 'Roll',
    currentStock: 50,
    minThreshold: 10,
    unitCost: 1250000,
    supplierName: 'CV Tekstil Mandiri Bandung',
    isMandatoryPack1to1: false
  },
  {
    materialId: 'MAT-02',
    materialName: 'Kain American Drill',
    unit: 'Roll',
    currentStock: 30,
    minThreshold: 8,
    unitCost: 1450000,
    supplierName: 'PT Sinar Sandang Utama',
    isMandatoryPack1to1: false
  },
  {
    materialId: 'MAT-03',
    materialName: 'Kain Fleece',
    unit: 'Roll',
    currentStock: 25,
    minThreshold: 6,
    unitCost: 1650000,
    supplierName: 'PT Dunia Tekstil Bandung',
    isMandatoryPack1to1: false
  },
  {
    materialId: 'MAT-04',
    materialName: 'Tinta Sablon DTF/Plastisol',
    unit: 'Kg',
    currentStock: 40,
    minThreshold: 10,
    unitCost: 180000,
    supplierName: 'Mitra Kimia Sablon Grafika',
    isMandatoryPack1to1: false
  },
  {
    materialId: 'MAT-05',
    materialName: 'Polymailer & Box Packaging Drizzle',
    unit: 'Pcs',
    currentStock: 500,
    minThreshold: 100,
    unitCost: 2500,
    supplierName: 'CV Packindo Solusindo',
    isMandatoryPack1to1: true // WAJIB 1:1
  },
  {
    materialId: 'MAT-06',
    materialName: 'Thank You Card & Care Label',
    unit: 'Pcs',
    currentStock: 500,
    minThreshold: 100,
    unitCost: 500,
    supplierName: 'Percetakan Grafika Solo',
    isMandatoryPack1to1: true // WAJIB 1:1
  }
];

// ==================== DATA AWAL BERSIH ====================
// Transaksi (customers, orders, purchaseOrders, financeLedger) selalu kosong di seed baru.
// Tidak ada INITIAL_CUSTOMERS / INITIAL_ORDERS / INITIAL_PURCHASE_ORDERS / INITIAL_FINANCE_LEDGER
// berisi data nyata supaya getDB() tidak pernah me-restore data transaksi lama.

// Helper: Format Rupiah
function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num || 0);
}

// Tiered Price Calculator
function calculateTieredPrice(serviceId, totalPcs) {
  const db = getDB();
  const srv = (db.services || []).find(s => s.serviceId === serviceId || (serviceId && typeof serviceId === 'string' && s.name.toLowerCase() === serviceId.toLowerCase()));
  if (!srv) return 73000;
  const base = srv.basePrice;

  // Volume Tier Discount
  if (totalPcs >= 650) return Math.round(base * 0.80); // 20% disc
  if (totalPcs >= 350) return Math.round(base * 0.85); // 15% disc
  if (totalPcs >= 150) return Math.round(base * 0.90); // 10% disc
  if (totalPcs >= 50)  return Math.round(base * 0.95); // 5% disc
  return base;
}

// Generate Next Order ID: DRZ-2026-XXX
function generateNextOrderId(providedDb = null) {
  const db = providedDb || getDB();
  let maxNum = 0;
  (db.orders || []).forEach(o => {
    const id = o.orderId || o.tracking_code || '';
    if (id.startsWith('DRZ-2026-')) {
      const num = parseInt(id.replace('DRZ-2026-', ''), 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    }
  });
  return `DRZ-2026-${String(maxNum + 1).padStart(3, '0')}`;
}

// Generate Next PO ID: PO-2026-XXX
function generateNextPOId(providedDb = null) {
  const db = providedDb || getDB();
  let maxNum = 0;
  (db.purchaseOrders || []).forEach(p => {
    const id = p.poId || '';
    if (id.startsWith('PO-2026-')) {
      const num = parseInt(id.replace('PO-2026-', ''), 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    }
  });
  return `PO-2026-${String(maxNum + 1).padStart(3, '0')}`;
}

// Generate Next Transaction ID: TRX-XXX
function generateNextTxId(providedDb = null) {
  const db = providedDb || getDB();
  let maxNum = 0;
  (db.financeLedger || []).forEach(t => {
    const id = t.txId || '';
    if (id.startsWith('TRX-')) {
      const num = parseInt(id.replace('TRX-', ''), 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    }
  });
  return `TRX-${String(maxNum + 1).padStart(3, '0')}`;
}

// Get Database from localStorage (or initialize with master data only — NO transaction data)
function getDB() {
  // Jalankan pembersihan cache & key versi lama setiap getDB dipanggil
  purgeLegacyCaches();

  const raw = localStorage.getItem(DRIZZLE_SIM_DB_KEY);
  if (!raw) {
    // First run: seed only master data, all transaction collections start EMPTY
    const initData = {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      tenantConfig: DEFAULT_TENANT_CONFIG,
      services: INITIAL_SERVICES,
      materials: JSON.parse(JSON.stringify(INITIAL_MATERIALS)), // deep clone to protect defaults
      customers: [],
      orders: [],
      purchaseOrders: [],
      financeLedger: []
    };
    saveDB(initData);
    return initData;
  }
  try {
    const data = JSON.parse(raw);
    let changed = false;

    // Pengecekan versi skema otomatis
    if (data.schemaVersion !== CURRENT_SCHEMA_VERSION) {
      data.schemaVersion = CURRENT_SCHEMA_VERSION;
      data.services = INITIAL_SERVICES;
      changed = true;
    }

    // Ensure tenantConfig exists
    if (!data.tenantConfig) {
      data.tenantConfig = DEFAULT_TENANT_CONFIG;
      changed = true;
    }

    // Ensure services are present (master data only — never touched by transactions)
    if (!data.services || data.services.length !== INITIAL_SERVICES.length || data.services[0].name !== INITIAL_SERVICES[0].name || data.services[0].basePrice !== INITIAL_SERVICES[0].basePrice) {
      data.services = INITIAL_SERVICES;
      changed = true;
    }

    // Ensure materials are present (master data only)
    if (!data.materials || data.materials.length !== INITIAL_MATERIALS.length) {
      data.materials = JSON.parse(JSON.stringify(INITIAL_MATERIALS));
      changed = true;
    }

    // Ensure transaction collections exist as arrays (but NEVER force-restore data into them)
    if (!Array.isArray(data.customers))      { data.customers = [];       changed = true; }
    if (!Array.isArray(data.orders))         { data.orders = [];          changed = true; }
    if (!Array.isArray(data.purchaseOrders)) { data.purchaseOrders = [];  changed = true; }
    if (!Array.isArray(data.financeLedger))  { data.financeLedger = [];   changed = true; }

    if (changed) saveDB(data);
    return data;
  } catch (e) {
    console.error('Error parsing drizzle_sim_db_clean_v1:', e);
    // Corrupt data: re-initialize with clean slate
    const initData = {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      tenantConfig: DEFAULT_TENANT_CONFIG,
      services: INITIAL_SERVICES,
      materials: JSON.parse(JSON.stringify(INITIAL_MATERIALS)),
      customers: [],
      orders: [],
      purchaseOrders: [],
      financeLedger: []
    };
    saveDB(initData);
    return initData;
  }
}

// ==================== CENTRALIZED REACTIVE STATE ENGINE & REAL-TIME SYNC ====================

// Toast Notification System (Warm Studio Light Palette)
function showToast(message, type = 'info') {
  if (!message || typeof document === 'undefined') return;

  let container = document.getElementById('drizzle-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'drizzle-toast-container';
    container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'pointer-events-auto bg-[#33302D] text-[#FAF7F4] border border-[#E6DDD6]/30 rounded-xl px-4 py-2.5 shadow-2xl flex items-center gap-2.5 text-xs transition-all duration-300 transform translate-y-3 opacity-0';

  let icon = '⚡';
  if (type === 'success') icon = '✓';
  else if (type === 'warning') icon = '⚠️';
  else if (type === 'danger') icon = '✕';

  toast.innerHTML = `
    <span class="w-5 h-5 rounded-full bg-[#FF791D]/20 text-[#FF791D] flex items-center justify-center font-bold text-[11px] shrink-0">${icon}</span>
    <span class="flex-1 text-[#FAF7F4] text-[11px] leading-tight font-sans font-medium">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger smooth enter animation
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-3', 'opacity-0');
  });

  // Auto-dismiss after 3.5s
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3500);
}

// Centralized Reactive State Engine: Saves to localStorage, emits CustomEvent, and shows Live Toast
function saveAndSyncDB(data, eventMessage = '') {
  try {
    localStorage.setItem(DRIZZLE_SIM_DB_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving drizzle_sim_db_clean_v1:', e);
  }

  // 1. Dispatch custom event for current window/tab
  const syncEvent = new CustomEvent('drizzle:sync', {
    detail: {
      message: eventMessage,
      timestamp: Date.now(),
      data
    }
  });
  window.dispatchEvent(syncEvent);

  // 2. Show brief toast notification if message provided
  if (eventMessage) {
    showToast(eventMessage, 'success');
  }
}

// Cross-Tab Real-Time Sync Listener (Catches storage changes across open tabs without page reload)
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === DRIZZLE_SIM_DB_KEY && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        const syncEvent = new CustomEvent('drizzle:sync', {
          detail: {
            message: 'Sinkronisasi real-time dari tab lain aktif.',
            external: true,
            timestamp: Date.now(),
            data: parsed
          }
        });
        window.dispatchEvent(syncEvent);
        showToast('Data disinkronkan secara real-time dari tab lain', 'info');
      } catch (err) {
        console.error('Error parsing synced storage:', err);
      }
    }
  });
}

// Save Database to localStorage (Delegates to Reactive saveAndSyncDB)
function saveDB(data, eventMessage = '') {
  return saveAndSyncDB(data, eventMessage);
}

// Reset ONLY transaction data — master data (services, materials, tenantConfig) tetap utuh
function resetTransactionData() {
  const db = getDB();
  db.orders = [];
  db.customers = [];
  db.purchaseOrders = [];
  db.financeLedger = [];
  saveAndSyncDB(db, 'Data transaksi berhasil direset. Mulai dari 0 pesanan.');
  return db;
}

// Legacy alias — resets transaction data (same behavior as resetTransactionData)
function resetDB() {
  return resetTransactionData();
}

// Backup seluruh database sebagai file JSON yang dapat diunduh
function backupDatabaseJSON() {
  const db = getDB();
  const json = JSON.stringify(db, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `drizzle-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  if (window.DrizzleApp) showToast('Backup berhasil diunduh ✓', 'success');
}

// ERP Module: Kanban Multi-Tahap Stages Configuration
// CANCELLED dan RETURNED ditambahkan ke validStages sebagai terminal stages
const KANBAN_STAGES_CONFIG = [
  { key: 'MENUNGGU_DP', label: '1. Menunggu DP',          badge: 'bg-amber-100 text-amber-800 border-amber-300' },
  { key: 'DESIGN',      label: '2. Desain & Brief',        badge: 'bg-sky-100 text-sky-800 border-sky-300' },
  { key: 'PRINTING',    label: '3. Sablon & Bordir',       badge: 'bg-blue-100 text-blue-800 border-blue-300' },
  { key: 'SEWING',      label: '4. Jahit & Assembly',      badge: 'bg-purple-100 text-purple-800 border-purple-300' },
  { key: 'QC',          label: '5. Quality Control',       badge: 'bg-orange-100 text-orange-800 border-orange-300' },
  { key: 'SHIPPED',     label: '6. Siap Kirim / Terkirim', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { key: 'CANCELLED',   label: '✕ Dibatalkan',             badge: 'bg-red-100 text-red-800 border-red-300' },
  { key: 'RETURNED',    label: '↩ Dikembalikan',           badge: 'bg-rose-100 text-rose-800 border-rose-300' }
];

// Determine Next Stage with DESIGN_ONLY Bypass Logic
function getNextStage(currentStage, serviceMode = 'PRODUCTION') {
  if (currentStage === 'MENUNGGU_DP') return 'DESIGN';
  if (currentStage === 'DESIGN') {
    // Mode DESIGN_ONLY melompati tahap Sablon dan Jahit, langsung masuk ke QC
    return serviceMode === 'DESIGN_ONLY' ? 'QC' : 'PRINTING';
  }
  if (currentStage === 'PRINTING') return 'SEWING';
  if (currentStage === 'SEWING') return 'QC';
  if (currentStage === 'QC') return 'SHIPPED';
  return null;
}

// Determine Previous Stage with DESIGN_ONLY Bypass Logic
function getPrevStage(currentStage, serviceMode = 'PRODUCTION') {
  if (currentStage === 'SHIPPED') return 'QC';
  if (currentStage === 'QC') {
    // Mode DESIGN_ONLY mundur langsung ke DESIGN
    return serviceMode === 'DESIGN_ONLY' ? 'DESIGN' : 'SEWING';
  }
  if (currentStage === 'SEWING') return 'PRINTING';
  if (currentStage === 'PRINTING') return 'DESIGN';
  if (currentStage === 'DESIGN') return 'MENUNGGU_DP';
  return null;
}

// Move Kanban Stage & Append Real-Time History Log
function moveKanbanStage(orderId, newStage, note = '') {
  const db = getDB();
  const order = (db.orders || []).find(o => o.orderId === orderId || o.tracking_code === orderId);
  if (!order) return { success: false, reason: 'Order not found' };

  const validStages = ['MENUNGGU_DP', 'DESIGN', 'PRINTING', 'SEWING', 'QC', 'SHIPPED', 'CANCELLED', 'RETURNED'];
  if (!validStages.includes(newStage)) return { success: false, reason: 'Invalid stage' };

  // Otomatis kembalikan stok gudang SCM & proses refund jika status diubah ke CANCELLED
  if (newStage === 'CANCELLED') {
    return cancelOrder(orderId, note || 'Dibatalkan melalui perpindahan status Kanban');
  }
  if (newStage === 'RETURNED') {
    return returnOrder(orderId, note || 'Diretur melalui perpindahan status Kanban', 0);
  }

  const oldStage = order.kanbanStage;
  order.kanbanStage = newStage;
  if (!order.historyLogs) order.historyLogs = [];

  const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
  const stageLabels = {
    MENUNGGU_DP: 'Menunggu DP 50%',
    DESIGN: 'Desain & Brief',
    PRINTING: 'Sablon & Bordir',
    SEWING: 'Jahit & Assembly',
    QC: 'Quality Control (QC)',
    SHIPPED: 'Siap Kirim / Terkirim',
    CANCELLED: 'Dibatalkan',
    RETURNED: 'Dikembalikan'
  };

  const defaultNote = note || (order.serviceMode === 'DESIGN_ONLY' && newStage === 'QC' && oldStage === 'DESIGN'
    ? `Layanan desain disetujui — bypass sablon & jahit langsung ke tahap Quality Control (QC final aset).`
    : `Status progres pengerjaan dipindahkan dari ${stageLabels[oldStage] || oldStage} ke ${stageLabels[newStage] || newStage}.`);

  order.historyLogs.unshift({
    timestamp: now,
    stage: newStage,
    note: defaultNote,
    author: 'Drizzle ERP Admin'
  });

  // If moving into physical production for the first time, check material deduction
  if (['PRINTING', 'SEWING', 'QC', 'SHIPPED'].includes(newStage) && !order.materialsDeducted) {
    deductOrderMaterials(order);
  }

  saveAndSyncDB(db, `Tahap order ${order.orderId} dipindahkan ke ${newStage}`);
  return { success: true, order };
}

// SCM Module: MRP Calculation & Mandatory 1:1 Packaging Rule (Auto-PO on shortage or threshold)
function deductOrderMaterials(order) {
  const db = getDB();
  const targetOrder = (db.orders || []).find(o => o.orderId === order.orderId);

  // 1. Bypass if order mode is DESIGN_ONLY
  if (order.serviceMode === 'DESIGN_ONLY') {
    order.materialsDeducted = true;
    order.waitingPO = false;
    order.readyForProduction = true;
    if (targetOrder) {
      targetOrder.materialsDeducted = true;
      targetOrder.waitingPO = false;
      targetOrder.readyForProduction = true;
    }
    saveAndSyncDB(db, `Layanan desain (${order.orderId}) diverifikasi — bypass pemotongan fisik & kemasan.`);
    return { success: true, bypassed: true, reason: 'Layanan desain saja — bypass pemotongan fisik & kemasan.' };
  }

  const srv = (db.services || []).find(s => s.serviceId === order.serviceId || s.name.toLowerCase() === (order.serviceName || '').toLowerCase());
  const qty = order.qty || 1;
  const shortageMaterials = [];

  // Build full BOM list (recipes + mandatory 1:1 packaging)
  let recipes = [];
  if (srv && srv.bomRecipe && srv.bomRecipe.length > 0) {
    recipes = [...srv.bomRecipe];
  }
  // Ensure MAT-05 (Polymailer) and MAT-06 (Card) are present for physical products
  if (!recipes.some(r => r.materialId === 'MAT-05')) {
    recipes.push({ materialId: 'MAT-05', qtyPerUnit: 1.0, isMandatoryPack1to1: true, name: 'Polymailer/Box Drizzle (1:1)' });
  }
  if (!recipes.some(r => r.materialId === 'MAT-06')) {
    recipes.push({ materialId: 'MAT-06', qtyPerUnit: 1.0, isMandatoryPack1to1: true, name: 'Thank You Card (1:1)' });
  }

  recipes.forEach(item => {
    const mat = (db.materials || []).find(m => m.materialId === item.materialId);
    if (mat) {
      const isPack = mat.isMandatoryPack1to1 || item.isMandatoryPack1to1;
      const neededQty = isPack ? qty : Math.ceil(qty * 1.03 * (item.qtyPerUnit || 1));
      const remainingStock = mat.currentStock - neededQty;
      const isShortage = mat.currentStock < neededQty;
      const isLowStock = remainingStock <= (mat.minThreshold || 0);

      // Trigger Auto-PO if stock is insufficient or drops to/below minimum threshold
      if (isShortage || isLowStock) {
        const shortage = Math.max(0, neededQty - mat.currentStock);
        const autoPOQty = Math.max(shortage * 2, (mat.minThreshold || 25) * 2);

        // Check if open PO already exists for this material
        const existingPO = (db.purchaseOrders || []).find(p => p.materialId === mat.materialId && p.poStatus === 'ORDERED');
        let poId = existingPO ? existingPO.poId : null;
        if (!existingPO) {
          const newPO = {
            poId: generateNextPOId(db),
            orderId: isShortage ? order.orderId : null,
            materialId: mat.materialId,
            materialName: mat.materialName || mat.name,
            vendorName: mat.supplierName || 'Vendor Rekanan',
            qtyOrdered: autoPOQty,
            unit: mat.unit,
            totalCost: autoPOQty * mat.unitCost,
            poStatus: 'ORDERED',
            createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
          };
          if (!db.purchaseOrders) db.purchaseOrders = [];
          db.purchaseOrders.unshift(newPO);
          poId = newPO.poId;
        }

        if (isShortage) {
          shortageMaterials.push({
            materialId: mat.materialId,
            materialName: mat.materialName || mat.name,
            neededQty,
            currentStock: mat.currentStock,
            poId
          });
        }
      }

      // Lock and deduct physical stock (down to 0 min)
      mat.currentStock = Math.max(0, remainingStock);
    }
  });

  order.materialsDeducted = true;
  if (targetOrder) targetOrder.materialsDeducted = true;

  if (shortageMaterials.length > 0) {
    order.waitingPO = true;
    order.readyForProduction = false;
    order.poShortage = shortageMaterials;
    if (targetOrder) {
      targetOrder.waitingPO = true;
      targetOrder.readyForProduction = false;
      targetOrder.poShortage = shortageMaterials;
    }
    const poList = shortageMaterials.map(s => s.poId).filter(Boolean).join(', ');
    const logEntry = {
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      stage: order.kanbanStage,
      note: `Kalkulasi MRP SCM: Terdeteksi ${shortageMaterials.length} bahan kurang stok di gudang. Draf PO otomatis diterbitkan (${poList}). Status: Menunggu Stok PO.`,
      author: 'SCM MRP Engine'
    };
    if (!order.historyLogs) order.historyLogs = [];
    order.historyLogs.unshift(logEntry);
    if (targetOrder) {
      if (!targetOrder.historyLogs) targetOrder.historyLogs = [];
      targetOrder.historyLogs.unshift(logEntry);
    }
  } else {
    order.waitingPO = false;
    order.readyForProduction = true;
    if (targetOrder) {
      targetOrder.waitingPO = false;
      targetOrder.readyForProduction = true;
    }
    const logEntry = {
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      stage: order.kanbanStage,
      note: `Kalkulasi MRP & Kemasan 1:1 terpenuhi. Seluruh kebutuhan material (${order.qty} pcs kemasan & kain) tersedia di gudang. Siap masuk jalur produksi.`,
      author: 'SCM MRP Engine'
    };
    if (!order.historyLogs) order.historyLogs = [];
    order.historyLogs.unshift(logEntry);
    if (targetOrder) {
      if (!targetOrder.historyLogs) targetOrder.historyLogs = [];
      targetOrder.historyLogs.unshift(logEntry);
    }
  }

  saveAndSyncDB(db, `Kalkulasi MRP pesanan ${order.orderId}: ${shortageMaterials.length > 0 ? 'PO otomatis diterbitkan' : 'Stok bahan aman'}`);
  return { success: true, deducted: true, shortages: shortageMaterials };
}

// SCM Module: Create Purchase Order (Status: ORDERED)
function createPurchaseOrder(materialId, qtyToAdd, vendorName = null, orderId = null) {
  const db = getDB();
  const mat = (db.materials || []).find(m => m.materialId === materialId);
  if (!mat) return { success: false, reason: 'Material not found' };

  const poId = generateNextPOId(db);
  const qty = qtyToAdd || Math.max(20, mat.minThreshold * 2);
  const totalCost = qty * mat.unitCost;
  const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

  const newPO = {
    poId,
    orderId: orderId || null,
    materialId: mat.materialId,
    materialName: mat.materialName || mat.name,
    vendorName: vendorName || mat.supplierName || 'Vendor Rekanan',
    qtyOrdered: qty,
    unit: mat.unit,
    totalCost,
    poStatus: 'ORDERED', // Menunggu Pengiriman dari Vendor
    createdAt: now
  };

  db.purchaseOrders.unshift(newPO);
  saveAndSyncDB(db, `PO ${poId} berhasil diterbitkan ke ${newPO.vendorName}`);
  return { success: true, po: newPO };
}

// SCM Module: Receive Purchase Order (Status: RECEIVED -> Update Stock, Record Expense & Release Order)
function receivePurchaseOrder(poId) {
  const db = getDB();
  const po = (db.purchaseOrders || []).find(p => p.poId === poId);
  if (!po) return { success: false, reason: 'PO tidak ditemukan' };
  if (po.poStatus === 'RECEIVED') return { success: false, reason: 'PO sudah diterima sebelumnya' };

  po.poStatus = 'RECEIVED';
  const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

  // 1. Add Stock to Material Inventory
  const mat = (db.materials || []).find(m => m.materialId === po.materialId);
  if (mat) {
    mat.currentStock += po.qtyOrdered;
  }

  // 2. Record Expense into Finance Ledger
  const txId = generateNextTxId(db);
  db.financeLedger.unshift({
    txId,
    orderId: po.orderId || null,
    poId: po.poId,
    txType: 'EXPENSE',
    amount: po.totalCost,
    description: `Penerimaan PO ${po.poId} dari ${po.vendorName} (+${po.qtyOrdered} ${mat ? mat.unit : 'unit'} ${mat ? (mat.materialName || mat.name) : ''})`,
    txDate: now
  });

  // 3. Update Order HPP and release waitingPO if linked to a specific order
  if (po.orderId) {
    const linkedOrder = (db.orders || []).find(o => o.orderId === po.orderId);
    if (linkedOrder) {
      linkedOrder.hppTotal = (linkedOrder.hppTotal || 0) + po.totalCost;
    }
  }

  // Release waitingPO for all orders whose material shortages are now fulfilled
  (db.orders || []).forEach(ord => {
    if (ord.waitingPO) {
      const remainingShortages = (db.purchaseOrders || []).filter(p => (p.orderId === ord.orderId || (ord.poShortage && ord.poShortage.some(s => s.materialId === p.materialId))) && p.poStatus === 'ORDERED');
      if (remainingShortages.length === 0) {
        ord.waitingPO = false;
        ord.readyForProduction = true;
        if (!ord.historyLogs) ord.historyLogs = [];
        ord.historyLogs.unshift({
          timestamp: now,
          stage: ord.kanbanStage,
          note: `Penerimaan PO ${po.poId} selesai. Seluruh material & kemasan 1:1 telah terpenuhi di gudang. Pesanan siap produksi.`,
          author: 'SCM Warehouse'
        });
      }
    }
  });

  saveAndSyncDB(db, `Penerimaan PO ${po.poId} berhasil (+${po.qtyOrdered} ${mat ? mat.unit : 'unit'}). Arus kas keluar tercatat.`);
  return { success: true, po, material: mat };
}

// Alias for Auto-PO
function createAutoPO(materialId, qtyToAdd, orderId = null) {
  return createPurchaseOrder(materialId, qtyToAdd, null, orderId);
}

// ERP Module: Flexible Payment — mendukung nominal bebas (bukan hanya DP 50%)
function recordPayment(orderId, amountPaid, note = '') {
  const db = getDB();
  const order = (db.orders || []).find(o => o.orderId === orderId || o.tracking_code === orderId);
  if (!order) return { success: false, reason: 'Order not found' };

  const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
  if (!order.historyLogs) order.historyLogs = [];

  const prevPaid = order.paidAmount || 0;
  const newTotalPaid = prevPaid + amountPaid;
  const totalPrice = order.totalPrice || 0;
  const wasUnpaid = order.paymentStatus === 'UNPAID' || prevPaid === 0;

  // Update paidAmount
  order.paidAmount = newTotalPaid;

  // Determine new paymentStatus
  if (newTotalPaid >= totalPrice) {
    order.paymentStatus = 'LUNAS';
  } else if (newTotalPaid > 0) {
    order.paymentStatus = 'DP_PAID';
    order.dpAmount = newTotalPaid; // Store actual DP amount paid
  }

  // Record INCOME to financeLedger
  if (amountPaid > 0) {
    const txId = generateNextTxId(db);
    const description = note
      ? `Pembayaran ${formatRupiah(amountPaid)} untuk ${order.orderId} — ${note}`
      : (newTotalPaid >= totalPrice
          ? `Pelunasan 100% Pesanan ${order.orderId} (${order.serviceName || order.serviceId})`
          : `Penerimaan DP ${formatRupiah(amountPaid)} Pesanan ${order.orderId} (${order.serviceName || order.serviceId})`);

    db.financeLedger.unshift({
      txId,
      orderId: order.orderId,
      poId: null,
      txType: 'INCOME',
      amount: amountPaid,
      description,
      txDate: now
    });
  }

  // Log to historyLogs
  const payNote = note ? ` — ${note}` : '';
  const statusLabel = order.paymentStatus === 'LUNAS' ? 'LUNAS' : `DP_PAID (${formatRupiah(newTotalPaid)} / ${formatRupiah(totalPrice)})`;
  order.historyLogs.unshift({
    timestamp: now,
    stage: order.kanbanStage,
    note: `Pembayaran ${formatRupiah(amountPaid)} diterima${payNote}. Status pembayaran: ${statusLabel}.`,
    author: 'Finance ERP'
  });

  // Jika sebelumnya UNPAID dan sekarang dibayar → majukan stage (khusus DESIGN_ONLY langsung loncat ke QC)
  if (wasUnpaid && amountPaid > 0 && order.kanbanStage === 'MENUNGGU_DP') {
    if (order.serviceMode === 'DESIGN_ONLY') {
      order.kanbanStage = 'QC';
      order.historyLogs.unshift({
        timestamp: now,
        stage: 'QC',
        note: `Pembayaran DP layanan desain diverifikasi — otomatis bypass antrean produksi fisik (Sablon & Jahit) dan langsung masuk ke tahap Quality Control (QC aset digital).`,
        author: 'Finance ERP'
      });
    } else {
      order.kanbanStage = 'DESIGN';
      order.historyLogs.unshift({
        timestamp: now,
        stage: 'DESIGN',
        note: `Pembayaran awal diterima — tiket order otomatis dimajukan ke antrean Desain & Brief.`,
        author: 'Finance ERP'
      });
    }
  }

  // Jalankan MRP (deductOrderMaterials) jika belum pernah dijalankan dan ada pembayaran
  if (amountPaid > 0 && !order.materialsDeducted && order.serviceMode !== 'DESIGN_ONLY') {
    deductOrderMaterials(order);
  }

  saveAndSyncDB(db, `Pembayaran ${formatRupiah(amountPaid)} untuk ${order.orderId} dicatat. Status: ${order.paymentStatus}`);
  return { success: true, order };
}

// ERP Module: Legacy updatePaymentStatus — alias ke recordPayment untuk backward compatibility
function updatePaymentStatus(orderId, newStatus) {
  const db = getDB();
  const order = (db.orders || []).find(o => o.orderId === orderId || o.tracking_code === orderId);
  if (!order) return { success: false, reason: 'Order not found' };

  const totalPrice = order.totalPrice || 0;
  const prevPaid = order.paidAmount || 0;

  if (newStatus === 'LUNAS') {
    const remaining = Math.max(0, totalPrice - prevPaid);
    return recordPayment(orderId, remaining, 'Pelunasan via updatePaymentStatus');
  } else if (newStatus === 'DP_50_PAID') {
    const dpVal = order.dpAmount || Math.round(totalPrice * 0.5);
    const toPay = Math.max(0, dpVal - prevPaid);
    return recordPayment(orderId, toPay, 'DP 50% via updatePaymentStatus');
  } else {
    // UNPAID: reset
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    if (!order.historyLogs) order.historyLogs = [];
    order.paidAmount = 0;
    order.paymentStatus = 'UNPAID';
    order.historyLogs.unshift({
      timestamp: now,
      stage: order.kanbanStage,
      note: `Status pembayaran diubah menjadi UNPAID oleh Finance Admin.`,
      author: 'Finance ERP'
    });
    saveAndSyncDB(db, `Status pembayaran ${order.orderId} diperbarui ke UNPAID`);
    return { success: true, order };
  }
}

// ERP/SCM Module: Cancel Order — kembalikan stok, catat refund jika ada
function cancelOrder(orderId, reason = '') {
  const db = getDB();
  const order = (db.orders || []).find(o => o.orderId === orderId || o.tracking_code === orderId);
  if (!order) return { success: false, reason: 'Order not found' };

  const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
  if (!order.historyLogs) order.historyLogs = [];

  // 1. Set stage CANCELLED
  order.kanbanStage = 'CANCELLED';
  order.cancelled = true;
  order.cancelReason = reason || '';

  // 2. Kembalikan stok bahan yang sudah dialokasikan (reverse deductOrderMaterials)
  if (order.materialsDeducted && order.serviceMode !== 'DESIGN_ONLY') {
    const srv = (db.services || []).find(s => s.serviceId === order.serviceId || s.name.toLowerCase() === (order.serviceName || '').toLowerCase());
    const qty = order.qty || 1;

    let recipes = [];
    if (srv && srv.bomRecipe && srv.bomRecipe.length > 0) {
      recipes = [...srv.bomRecipe];
    }
    // Ensure MAT-05 dan MAT-06 juga dikembalikan
    if (!recipes.some(r => r.materialId === 'MAT-05')) {
      recipes.push({ materialId: 'MAT-05', qtyPerUnit: 1.0, isMandatoryPack1to1: true });
    }
    if (!recipes.some(r => r.materialId === 'MAT-06')) {
      recipes.push({ materialId: 'MAT-06', qtyPerUnit: 1.0, isMandatoryPack1to1: true });
    }

    recipes.forEach(item => {
      const mat = (db.materials || []).find(m => m.materialId === item.materialId);
      if (mat) {
        const isPack = mat.isMandatoryPack1to1 || item.isMandatoryPack1to1;
        const returnedQty = isPack ? qty : Math.ceil(qty * 1.03 * (item.qtyPerUnit || 1));
        mat.currentStock += returnedQty;
      }
    });

    order.materialsDeducted = false; // Reset flag supaya tidak dikembalikan dua kali
    order.historyLogs.unshift({
      timestamp: now,
      stage: 'CANCELLED',
      note: `Stok bahan dikembalikan ke gudang SCM karena order dibatalkan.`,
      author: 'SCM Warehouse'
    });
  }

  // 3. Jika ada paidAmount > 0 → catat REFUND di financeLedger
  const paidAmount = order.paidAmount || 0;
  if (paidAmount > 0) {
    const txId = generateNextTxId(db);
    db.financeLedger.unshift({
      txId,
      orderId: order.orderId,
      poId: null,
      txType: 'REFUND',
      amount: paidAmount,
      description: `Refund pembatalan Pesanan ${order.orderId} (${order.serviceName || order.serviceId})${reason ? ' — ' + reason : ''}`,
      txDate: now
    });
  }

  // 4. Log ke historyLogs
  order.historyLogs.unshift({
    timestamp: now,
    stage: 'CANCELLED',
    note: `Pesanan dibatalkan${reason ? ' — Alasan: ' + reason : ''}. ${paidAmount > 0 ? 'Refund ' + formatRupiah(paidAmount) + ' dicatat di buku kas.' : 'Tidak ada pembayaran yang perlu direfund.'}`,
    author: 'Drizzle ERP Admin'
  });

  // 5. saveAndSyncDB
  saveAndSyncDB(db, `Pesanan ${order.orderId} dibatalkan. ${paidAmount > 0 ? 'Refund ' + formatRupiah(paidAmount) + ' diproses.' : ''}`);
  return { success: true, order };
}

// ERP Module: Return Order — catat retur, kembalikan stok, proses refund
function returnOrder(orderId, reason = '', refundAmount = 0) {
  const db = getDB();
  const order = (db.orders || []).find(o => o.orderId === orderId || o.tracking_code === orderId);
  if (!order) return { success: false, reason: 'Order not found' };

  const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
  if (!order.historyLogs) order.historyLogs = [];

  // 1. Set stage RETURNED
  order.kanbanStage = 'RETURNED';
  order.returned = true;
  order.returnReason = reason || '';
  order.returnRefundAmount = refundAmount || 0;

  // 2. Catat log barang retur di gudang SCM — kembalikan packaging (MAT-05, MAT-06) sebagai stok retur
  const qty = order.qty || 1;
  const mat05 = (db.materials || []).find(m => m.materialId === 'MAT-05');
  const mat06 = (db.materials || []).find(m => m.materialId === 'MAT-06');
  if (mat05) mat05.currentStock += qty; // Kemasan bisa direcycle
  if (mat06) mat06.currentStock += qty; // Card bisa direcycle

  order.historyLogs.unshift({
    timestamp: now,
    stage: 'RETURNED',
    note: `Barang retur diterima di gudang SCM. Stok kemasan MAT-05 & MAT-06 dikembalikan (+${qty} pcs masing-masing).${reason ? ' Alasan retur: ' + reason : ''}`,
    author: 'SCM Warehouse'
  });

  // 3. Jika refundAmount > 0 → catat REFUND di financeLedger
  if (refundAmount > 0) {
    const txId = generateNextTxId(db);
    db.financeLedger.unshift({
      txId,
      orderId: order.orderId,
      poId: null,
      txType: 'REFUND',
      amount: refundAmount,
      description: `Refund retur Pesanan ${order.orderId} (${order.serviceName || order.serviceId})${reason ? ' — ' + reason : ''}`,
      txDate: now
    });
  }

  // 4. Log ke historyLogs
  order.historyLogs.unshift({
    timestamp: now,
    stage: 'RETURNED',
    note: `Pesanan diretur${reason ? ' — Alasan: ' + reason : ''}. ${refundAmount > 0 ? 'Refund ' + formatRupiah(refundAmount) + ' dicatat di buku kas.' : 'Tidak ada refund yang diproses.'}`,
    author: 'Drizzle ERP Admin'
  });

  // 5. saveAndSyncDB
  saveAndSyncDB(db, `Pesanan ${order.orderId} diretur. ${refundAmount > 0 ? 'Refund ' + formatRupiah(refundAmount) + ' diproses.' : ''}`);
  return { success: true, order };
}

// Update Outbound Shipping Tracking Info (Courier & Resi)
function updateShippingInfo(orderId, carrier, resi) {
  const db = getDB();
  const order = (db.orders || []).find(o => o.orderId === orderId || o.tracking_code === orderId);
  if (!order) return { success: false };

  order.shippingCarrier = carrier;
  order.trackingResi = resi;
  order.kanbanStage = 'SHIPPED';

  const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
  if (!order.historyLogs) order.historyLogs = [];
  order.historyLogs.unshift({
    timestamp: now,
    stage: 'SHIPPED',
    note: `Pesanan telah selesai QC & dikirimkan via ${carrier} dengan nomor resi/AWB: ${resi}.`,
    author: 'Outbound SCM Logistics'
  });

  saveAndSyncDB(db, `Resi ${resi} (${carrier}) disimpan untuk ${order.orderId}. Status: Terkirim.`);
  return { success: true, order };
}

// Helper: Clean & Normalize Phone Numbers for CRM Matching
function cleanPhoneNumber(phone) {
  if (!phone) return '';
  let cleaned = String(phone).replace(/[^\d+]/g, '').trim();
  if (cleaned.startsWith('+62')) {
    cleaned = '0' + cleaned.substring(3);
  } else if (cleaned.startsWith('62')) {
    cleaned = '0' + cleaned.substring(2);
  } else if (cleaned.startsWith('8')) {
    cleaned = '0' + cleaned;
  }
  return cleaned;
}

// CRM Module: Register or Detect Customer by WhatsApp & Update Segment Automatically
function registerOrUpdateCustomer(custData, orderTotalPrice = 0) {
  const db = getDB();
  if (!db.customers) db.customers = [];

  const rawPhone = custData.whatsapp || '';
  const cleanPhone = cleanPhoneNumber(rawPhone);
  const name = (custData.name || '').trim();
  const org = (custData.organization || '').trim();
  const email = (custData.email || '').trim();
  const address = (custData.address || '').trim();

  // Search existing customer by clean phone (primary) or exact name if phone not provided
  let customer = db.customers.find(c => {
    const cPhoneClean = cleanPhoneNumber(c.whatsapp);
    if (cleanPhone && cPhoneClean) {
      return cleanPhone === cPhoneClean;
    }
    if (!cleanPhone && !cPhoneClean && name && c.name) {
      return c.name.toLowerCase() === name.toLowerCase();
    }
    return false;
  });

  const now = new Date().toISOString().split('T')[0];
  const isInstansi = org && org.length > 0 && !['-', 'none', 'pribadi', 'personal', 'umum', 'individu', 'perorangan'].includes(org.toLowerCase());

  if (!customer) {
    // NEW CUSTOMER: Segment = "Instansi" (if has org) or "Baru"
    let maxNum = 0;
    (db.customers || []).forEach(c => {
      const id = c.customerId || '';
      if (id.startsWith('CUST-')) {
        const num = parseInt(id.replace('CUST-', ''), 10);
        if (!isNaN(num) && num > maxNum) maxNum = num;
      }
    });
    const custId = `CUST-${String(maxNum + 1).padStart(3, '0')}`;
    const initialSegment = isInstansi ? 'Instansi' : 'Baru';

    customer = {
      customerId: custId,
      name: name || 'Pelanggan Baru',
      organization: isInstansi ? org : '',
      whatsapp: rawPhone,
      email: email || '',
      address: address || '',
      segment: initialSegment,
      totalOrders: 1,
      totalSpent: orderTotalPrice,
      joinedAt: now,
      lastOrderAt: now
    };
    db.customers.push(customer);
  } else {
    // EXISTING CUSTOMER: Increment orders & spent, auto-upgrade segment to "Repeat" (or "Instansi" if org provided)
    customer.totalOrders = (customer.totalOrders || 0) + 1;
    customer.totalSpent = (customer.totalSpent || 0) + orderTotalPrice;
    customer.lastOrderAt = now;

    if (isInstansi) {
      customer.organization = org;
      customer.segment = 'Instansi';
    } else if (customer.segment !== 'Instansi') {
      customer.segment = 'Repeat';
    }

    if (name) customer.name = name;
    if (email) customer.email = email;
    if (address) customer.address = address;
    if (rawPhone) customer.whatsapp = rawPhone;
  }

  saveAndSyncDB(db, `Profil pelanggan ${customer.name} (Segmen: ${customer.segment}) diperbarui`);
  return customer;
}

// CRM Module: Search Orders by Order ID or WhatsApp Number
function searchOrdersOrCustomer(rawQuery) {
  const db = getDB();
  const query = (rawQuery || '').trim();
  if (!query) return null;

  const orders = db.orders || [];
  const customers = db.customers || [];
  const cleanQ = cleanPhoneNumber(query);
  const upperQ = query.toUpperCase();

  // 1. Direct Order ID match
  const directOrder = orders.find(o =>
    (o.orderId && o.orderId.toUpperCase() === upperQ) ||
    (o.tracking_code && o.tracking_code.toUpperCase() === upperQ)
  );

  if (directOrder) {
    const cust = customers.find(c => c.customerId === directOrder.customerId) || {};
    // Also find any other orders from the same customer
    const siblingOrders = orders.filter(o => o.customerId === directOrder.customerId);
    return {
      matchType: 'ORDER',
      activeOrder: directOrder,
      customer: cust,
      allOrders: siblingOrders.length > 0 ? siblingOrders : [directOrder]
    };
  }

  // 2. WhatsApp Number match or Customer Name match
  const matchedCustomer = customers.find(c => {
    const cPhoneClean = cleanPhoneNumber(c.whatsapp);
    return (cleanQ.length >= 4 && cPhoneClean && (cPhoneClean.includes(cleanQ) || cleanQ.includes(cPhoneClean))) ||
           (c.name && c.name.toLowerCase().includes(query.toLowerCase()));
  });

  if (matchedCustomer) {
    const custOrders = orders.filter(o => o.customerId === matchedCustomer.customerId);
    if (custOrders.length > 0) {
      return {
        matchType: 'CUSTOMER',
        customer: matchedCustomer,
        activeOrder: custOrders[0], // Most recent order
        allOrders: custOrders
      };
    } else {
      return {
        matchType: 'CUSTOMER_NO_ORDERS',
        customer: matchedCustomer,
        activeOrder: null,
        allOrders: []
      };
    }
  }

  return null;
}

// Global Export to Window
window.DrizzleApp = {
  // Core DB
  getDB,
  saveDB,
  saveAndSyncDB,
  showToast,
  resetDB,
  resetTransactionData,
  backupDatabaseJSON,
  purgeLegacyCaches,
  schemaVersion: CURRENT_SCHEMA_VERSION,

  // Formatting & Helpers
  formatRupiah,
  cleanPhoneNumber,

  // CRM
  registerOrUpdateCustomer,
  searchOrdersOrCustomer,

  // ERP Pricing & ID Generation
  calculateTieredPrice,
  generateNextOrderId,
  generateNextPOId,
  generateNextTxId,

  // ERP Kanban
  moveKanbanStage,
  getNextStage,
  getPrevStage,
  KANBAN_STAGES_CONFIG,

  // SCM MRP & PO
  deductOrderMaterials,
  createPurchaseOrder,
  receivePurchaseOrder,
  createAutoPO,

  // ERP Payment (flexible)
  recordPayment,
  updatePaymentStatus, // legacy alias

  // ERP Shipping
  updateShippingInfo,

  // ERP Order Lifecycle (Skenario 6)
  cancelOrder,
  returnOrder,

  // Helper aliases (read-only references)
  tenantConfig: DEFAULT_TENANT_CONFIG,
  services: INITIAL_SERVICES,
  materials: INITIAL_MATERIALS,
  contactWA: '+62 895-2295-1860',
  contactWALink: 'https://wa.me/6289522951860',
  contactEmail: 'drizzlethelabel@gmail.com',
  contactIG: '@drizzleproject'
};

// Backward-Compatibility Alias for DrizzleStore
window.DrizzleStore = window.DrizzleApp;
