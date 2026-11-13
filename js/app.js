/**
 * Drizzle Project - Core SaaS Engine (CRM, ERP, SCM Integration)
 * Manages localStorage synchronization, materials inventory, order workflows, and integration logs.
 */

// 11 Product Catalog Definition
const DRIZZLE_PRODUCTS = [
  { id: 1, name: 'T-Shirt', price: 65000, category: 'Apparel', minQty: 24, badge: 'BESTSELLER', desc: 'Cotton Combed 30s/24s Reactive, sablon DTF & Plastisol high density' },
  { id: 2, name: 'Kemeja/PDH', price: 110000, category: 'Formal Apparel', minQty: 12, badge: 'CAMPUS & BEM', desc: 'American/Japan Drill premium, bordir komputer presisi & ventilasi furing' },
  { id: 3, name: 'Hoodie', price: 145000, category: 'Outerwear', minQty: 12, badge: 'HEAVYWEIGHT', desc: 'Cotton Fleece 330gsm, tali katun bulat, saku kangguru & custom embroidery' },
  { id: 4, name: 'Polo', price: 85000, category: 'Apparel', minQty: 20, badge: 'SEMI-FORMAL', desc: 'Lacoste CVC Pique adem, kerah rajut premium, bordir dada & lengan' },
  { id: 5, name: 'Jacket', price: 140000, category: 'Outerwear', minQty: 15, badge: 'ALL-WEATHER', desc: 'Taslan / Microfiber water-repellent, furing jaring & saku multifungsi' },
  { id: 6, name: 'Coach', price: 135000, category: 'Streetwear', minQty: 15, badge: 'STREETWEAR', desc: 'Windbreaker coach jacket, kancing snap button metal & sablon punggung A3' },
  { id: 7, name: 'Vest', price: 125000, category: 'Outerwear', minQty: 15, badge: 'TACTICAL', desc: 'Tactical / formal padding vest dengan resleting YKK & multi-pocket utility' },
  { id: 8, name: 'Varsity', price: 175000, category: 'Streetwear', minQty: 12, badge: 'SIGNATURE', desc: 'Wool blend body, leather sleeve & towel chenille patch embroidery' },
  { id: 9, name: 'Bomber', price: 165000, category: 'Outerwear', minQty: 12, badge: 'MILITARY FIT', desc: 'Classic flight jacket, furing oranye berkelas & saku zipper lengan utility' },
  { id: 10, name: 'Lanyard', price: 15000, category: 'Accessories', minQty: 50, badge: 'MERCHANDISE', desc: 'Tisu polyester halus 2-2.5cm, print full-color sublimasi presisi + stopper' },
  { id: 11, name: 'Tote Bag', price: 35000, category: 'Accessories', minQty: 30, badge: 'ECO-FRIENDLY', desc: 'Kanvas tebal premium 12oz / blacu, sablon awet untuk event & souvenir' }
];

// 5 Main SCM Raw Materials Initial Seed
const DRIZZLE_INITIAL_MATERIALS = [
  { material_id: 1, material_name: 'Kain Roll (Meter)', unit: 'meter', stock_qty: 45, min_stock: 15, supplier_name: 'CV Tekstil Mandiri Bandung', restock_status: 'Aman' },
  { material_id: 2, material_name: 'Benang (Cones)', unit: 'cones', stock_qty: 24, min_stock: 10, supplier_name: 'Toko Benang Sejahtera Mitra', restock_status: 'Aman' },
  { material_id: 3, material_name: 'Kancing (Gross)', unit: 'gross', stock_qty: 12, min_stock: 8, supplier_name: 'Mitra Aksesoris Garmen Prima', restock_status: 'Aman' },
  { material_id: 4, material_name: 'Zipper (Pcs)', unit: 'pcs', stock_qty: 6, min_stock: 20, supplier_name: 'PT YKK Fastening Indonesia', restock_status: 'Menipis' },
  { material_id: 5, material_name: 'Kemasan / Packaging (Pcs)', unit: 'pcs', stock_qty: 350, min_stock: 100, supplier_name: 'CV Packindo Solusindo', restock_status: 'Aman' }
];

// Sample Initial Orders
const DRIZZLE_SAMPLE_ORDERS = [
  {
    order_id: 1,
    customer_id: 1,
    total_pcs: 36,
    status_payment: 'DP Verified',
    order_status: 'In Production',
    tracking_code: 'DRZ-2026-001',
    created_at: '2026-11-10 14:30:00',
    materials_deducted: true
  },
  {
    order_id: 2,
    customer_id: 2,
    total_pcs: 50,
    status_payment: 'Menunggu DP',
    order_status: 'Pending',
    tracking_code: 'DRZ-2026-002',
    created_at: '2026-11-12 09:15:00',
    materials_deducted: false
  }
];

const DRIZZLE_SAMPLE_CUSTOMERS = [
  {
    customer_id: 1,
    name: 'Dimas Wicaksono',
    organization: 'Himpunan Mahasiswa Informatika',
    phone: '081234567890',
    email: 'dimas@hmif.org'
  },
  {
    customer_id: 2,
    name: 'Siti Sarah',
    organization: 'Apex Motorsport Club',
    phone: '088211223344',
    email: 'sarah@apexmotorsport.com'
  }
];

const DRIZZLE_SAMPLE_DETAILS = [
  {
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
  },
  {
    detail_id: 2,
    order_id: 2,
    product_id: 1,
    product_name: 'T-Shirt',
    size_breakdown: { S: 10, M: 20, L: 15, XL: 5, XXL: 0 },
    mockup_url: '',
    print_type: 'Sablon DTF High Density',
    fabric_color: 'Jet Black 30s',
    notes: 'Desain racing typography motorsport dada depan dan grafis mobil di punggung A3.',
    estimated_total: 50 * 65000
  }
];

const DRIZZLE_SAMPLE_LOGS = [
  { log_id: 1, order_id: 1, stage_name: 'Design Approved', updated_at: '2026-11-10 14:45:00' },
  { log_id: 2, order_id: 1, stage_name: 'Down Payment (DP)', updated_at: '2026-11-11 10:00:00' },
  { log_id: 3, order_id: 1, stage_name: 'Bahan & Potong', updated_at: '2026-11-12 11:30:00' },
  { log_id: 4, order_id: 1, stage_name: 'Sablon/Bordir', updated_at: '2026-11-13 16:00:00' },
  { log_id: 5, order_id: 2, stage_name: 'Design Approved', updated_at: '2026-11-12 09:20:00' }
];

const DRIZZLE_INITIAL_INTEGRATION_LOGS = [
  {
    id: 1,
    type: 'CRM -> ERP',
    message: 'Pesanan baru DRZ-2026-001 (36 pcs Varsity) berhasil dibuat oleh Dimas Wicaksono. Status: Pending, Tahap: Design Approved.',
    timestamp: '2026-11-10 14:30:00'
  },
  {
    id: 2,
    type: 'ERP -> SCM',
    message: 'DP Verified untuk DRZ-2026-001: Alokasi material otomatis terpotong (Kain Roll -2 meter, Benang -1 cones, Packaging -36 pcs).',
    timestamp: '2026-11-11 10:00:00'
  },
  {
    id: 3,
    type: 'CRM -> ERP',
    message: 'Pesanan baru DRZ-2026-002 (50 pcs T-Shirt) berhasil dibuat oleh Siti Sarah. Status: Pending, Menunggu verifikasi DP.',
    timestamp: '2026-11-12 09:15:00'
  },
  {
    id: 4,
    type: 'SCM -> ERP',
    message: 'Restock bahan baku berhasil: Kemasan / Packaging +200 pcs dari CV Packindo Solusindo.',
    timestamp: '2026-11-13 08:30:00'
  }
];

/**
 * Storage helpers
 */
function getStorage(key, defaultValue = []) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error('Storage read error:', e);
    return defaultValue;
  }
}

function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage write error:', e);
  }
}

/**
 * Initialize Storage with seed data
 */
function initDrizzleStorage() {
  if (!localStorage.getItem('drizzle_products')) {
    setStorage('drizzle_products', DRIZZLE_PRODUCTS);
  }
  if (!localStorage.getItem('drizzle_materials')) {
    setStorage('drizzle_materials', DRIZZLE_INITIAL_MATERIALS);
  }
  if (!localStorage.getItem('drizzle_customers')) {
    setStorage('drizzle_customers', DRIZZLE_SAMPLE_CUSTOMERS);
  }
  if (!localStorage.getItem('drizzle_orders')) {
    setStorage('drizzle_orders', DRIZZLE_SAMPLE_ORDERS);
  }
  if (!localStorage.getItem('drizzle_order_details')) {
    setStorage('drizzle_order_details', DRIZZLE_SAMPLE_DETAILS);
  }
  if (!localStorage.getItem('drizzle_production_logs')) {
    setStorage('drizzle_production_logs', DRIZZLE_SAMPLE_LOGS);
  }
  if (!localStorage.getItem('drizzle_integration_logs')) {
    setStorage('drizzle_integration_logs', DRIZZLE_INITIAL_INTEGRATION_LOGS);
  }
}

initDrizzleStorage();

/**
 * Ensure seed data for DRZ-2026-001 and DRZ-2026-002 exists
 */
function ensureSeedData() {
  const orders = getStorage('drizzle_orders');
  const customers = getStorage('drizzle_customers');
  const details = getStorage('drizzle_order_details');
  const logs = getStorage('drizzle_production_logs');

  let updated = false;

  // Order 1
  if (!orders.some(o => o.tracking_code === 'DRZ-2026-001')) {
    orders.unshift(DRIZZLE_SAMPLE_ORDERS[0]);
    updated = true;
  }
  if (!customers.some(c => c.customer_id === 1)) {
    customers.unshift(DRIZZLE_SAMPLE_CUSTOMERS[0]);
    updated = true;
  }
  if (!details.some(d => d.order_id === 1)) {
    details.unshift(DRIZZLE_SAMPLE_DETAILS[0]);
    updated = true;
  }
  DRIZZLE_SAMPLE_LOGS.filter(l => l.order_id === 1).forEach(l => {
    if (!logs.some(x => x.order_id === 1 && x.stage_name === l.stage_name)) {
      logs.push(l);
      updated = true;
    }
  });

  // Order 2
  if (!orders.some(o => o.tracking_code === 'DRZ-2026-002')) {
    orders.push(DRIZZLE_SAMPLE_ORDERS[1]);
    updated = true;
  }
  if (!customers.some(c => c.customer_id === 2)) {
    customers.push(DRIZZLE_SAMPLE_CUSTOMERS[1]);
    updated = true;
  }
  if (!details.some(d => d.order_id === 2)) {
    details.push(DRIZZLE_SAMPLE_DETAILS[1]);
    updated = true;
  }
  DRIZZLE_SAMPLE_LOGS.filter(l => l.order_id === 2).forEach(l => {
    if (!logs.some(x => x.order_id === 2 && x.stage_name === l.stage_name)) {
      logs.push(l);
      updated = true;
    }
  });

  if (updated) {
    setStorage('drizzle_orders', orders);
    setStorage('drizzle_customers', customers);
    setStorage('drizzle_order_details', details);
    setStorage('drizzle_production_logs', logs);
  }
}

/**
 * Add an integration log event
 */
function addIntegrationLog(type, message) {
  const logs = getStorage('drizzle_integration_logs', []);
  const now = new Date();
  const timestampStr = now.toISOString().replace('T', ' ').substring(0, 19);
  const nextId = logs.length ? (Math.max(...logs.map(l => l.id || 0)) + 1) : 1;

  logs.unshift({
    id: nextId,
    type: type,
    message: message,
    timestamp: timestampStr
  });

  // Keep last 100 logs
  if (logs.length > 100) logs.pop();

  setStorage('drizzle_integration_logs', logs);
}

/**
 * Deduct SCM materials for an order (ERP -> SCM Rule)
 */
function deductMaterialsForOrder(orderId) {
  const orders = getStorage('drizzle_orders');
  const details = getStorage('drizzle_order_details');
  const materials = getStorage('drizzle_materials');

  const orderIndex = orders.findIndex(o => o.order_id === orderId);
  if (orderIndex === -1) return { success: false, reason: 'Pesanan tidak ditemukan.' };

  const order = orders[orderIndex];
  if (order.materials_deducted) {
    return { success: true, message: 'Bahan baku untuk pesanan ini sudah dipotong sebelumnya.' };
  }

  const detail = details.find(d => d.order_id === orderId) || {};
  const qty = order.total_pcs || 1;
  const pName = (detail.product_name || '').toLowerCase();

  // Calculate required materials
  // 1. Kain Roll (meter)
  const reqKain = Math.max(1, Math.ceil(qty * 0.05));
  // 2. Benang (cones)
  const reqBenang = Math.max(1, Math.ceil(qty * 0.03));
  // 3. Packaging (pcs)
  const reqPackaging = qty;
  // 4. Zipper (if hoodie/jacket/coach/vest/varsity/bomber)
  const needsZipper = pName.includes('hoodie') || pName.includes('jacket') || pName.includes('coach') || pName.includes('vest') || pName.includes('varsity') || pName.includes('bomber');
  const reqZipper = needsZipper ? qty : 0;
  // 5. Kancing (if kemeja/pdh/polo)
  const needsKancing = pName.includes('kemeja') || pName.includes('pdh') || pName.includes('polo');
  const reqKancing = needsKancing ? Math.ceil(qty * 0.05) : 0;

  // Check stock availability
  const kainMat = materials.find(m => m.material_id === 1);
  const benangMat = materials.find(m => m.material_id === 2);
  const packagingMat = materials.find(m => m.material_id === 5);
  const zipperMat = materials.find(m => m.material_id === 4);
  const kancingMat = materials.find(m => m.material_id === 3);

  if (kainMat && kainMat.stock_qty < reqKain) {
    return { success: false, reason: `Stok Kain Roll tidak mencukupi (Tersedia: ${kainMat.stock_qty} meter, Dibutuhkan: ${reqKain} meter). Silakan restock terlebih dahulu di tab SCM!` };
  }
  if (packagingMat && packagingMat.stock_qty < reqPackaging) {
    return { success: false, reason: `Stok Kemasan/Packaging tidak mencukupi (Tersedia: ${packagingMat.stock_qty} pcs, Dibutuhkan: ${reqPackaging} pcs). Silakan restock di tab SCM!` };
  }
  if (reqZipper > 0 && zipperMat && zipperMat.stock_qty < reqZipper) {
    return { success: false, reason: `Stok Zipper tidak mencukupi (Tersedia: ${zipperMat.stock_qty} pcs, Dibutuhkan: ${reqZipper} pcs). Silakan restock di tab SCM!` };
  }

  // Deduct
  if (kainMat) kainMat.stock_qty -= reqKain;
  if (benangMat) benangMat.stock_qty = Math.max(0, benangMat.stock_qty - reqBenang);
  if (packagingMat) packagingMat.stock_qty -= reqPackaging;
  if (reqZipper > 0 && zipperMat) zipperMat.stock_qty -= reqZipper;
  if (reqKancing > 0 && kancingMat) kancingMat.stock_qty = Math.max(0, kancingMat.stock_qty - reqKancing);

  // Update restock status
  materials.forEach(m => {
    m.restock_status = (m.stock_qty <= m.min_stock) ? 'Menipis' : 'Aman';
  });

  // Mark order as deducted
  orders[orderIndex].materials_deducted = true;

  setStorage('drizzle_materials', materials);
  setStorage('drizzle_orders', orders);

  // Log Integration Event
  const logDesc = `Pemotongan stok bahan baku otomatis untuk ${order.tracking_code} (${qty} pcs ${detail.product_name || 'Apparel'}): Kain -${reqKain} meter, Benang -${reqBenang} cones, Packaging -${reqPackaging} pcs${reqZipper ? `, Zipper -${reqZipper} pcs` : ''}.`;
  addIntegrationLog('ERP -> SCM', logDesc);

  return { success: true, message: logDesc };
}

/**
 * Restock Material (SCM -> ERP Rule)
 */
function restockMaterial(materialId, addQty, poNotes = '') {
  const materials = getStorage('drizzle_materials');
  const matIndex = materials.findIndex(m => m.material_id === materialId);
  if (matIndex === -1) return false;

  const mat = materials[matIndex];
  mat.stock_qty += parseInt(addQty, 10);
  mat.restock_status = (mat.stock_qty <= mat.min_stock) ? 'Menipis' : 'Aman';

  setStorage('drizzle_materials', materials);

  const logDesc = `Restock bahan baku berhasil: ${mat.material_name} +${addQty} ${mat.unit} dari ${mat.supplier_name}.${poNotes ? ` (Catatan PO: ${poNotes})` : ''} Stok kini tersedia untuk produksi.`;
  addIntegrationLog('SCM -> ERP', logDesc);

  return true;
}

/**
 * Generate next unique Order Code: DRZ-2026-001, DRZ-2026-002, etc.
 */
function generateNextOrderCode() {
  const orders = getStorage('drizzle_orders');
  let maxSeq = 0;
  orders.forEach(ord => {
    if (ord.tracking_code && ord.tracking_code.startsWith('DRZ-2026-')) {
      const parts = ord.tracking_code.split('-');
      const seq = parseInt(parts[2], 10);
      if (!isNaN(seq) && seq > maxSeq) {
        maxSeq = seq;
      }
    }
  });
  const nextSeq = String(maxSeq + 1).padStart(3, '0');
  return `DRZ-2026-${nextSeq}`;
}

/**
 * Format currency to Rupiah string
 */
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
}

// Global Export
window.Drizzle = {
  products: DRIZZLE_PRODUCTS,
  initStorage: initDrizzleStorage,
  ensureSeedData: ensureSeedData,
  getStorage: getStorage,
  setStorage: setStorage,
  generateNextOrderCode: generateNextOrderCode,
  formatRupiah: formatRupiah,
  addIntegrationLog: addIntegrationLog,
  deductMaterialsForOrder: deductMaterialsForOrder,
  restockMaterial: restockMaterial
};
