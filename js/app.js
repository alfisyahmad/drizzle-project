/**
 * Drizzle Project - Core SaaS Engine (CRM, ERP, SCM Integration)
 * Manages localStorage synchronization and data schema.
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

// SCM Raw Materials Initial Seed
const DRIZZLE_INITIAL_MATERIALS = [
  { material_id: 1, material_name: 'Kain Cotton Combed 30s (Roll)', unit: 'Roll', stock_qty: 25, min_stock: 5, supplier_name: 'CV Tekstil Mandiri', restock_status: 'Aman' },
  { material_id: 2, material_name: 'Kain American Drill / PDH (Roll)', unit: 'Roll', stock_qty: 18, min_stock: 5, supplier_name: 'PT Sinar Sandang Utama', restock_status: 'Aman' },
  { material_id: 3, material_name: 'Kain Fleece Cotton / Hoodie (Roll)', unit: 'Roll', stock_qty: 12, min_stock: 4, supplier_name: 'PT Dunia Tekstil Bandung', restock_status: 'Aman' },
  { material_id: 4, material_name: 'Benang Jahit Polyester', unit: 'Spool', stock_qty: 80, min_stock: 20, supplier_name: 'Toko Benang Sejahtera', restock_status: 'Aman' },
  { material_id: 5, material_name: 'Kancing Kemeja Standar', unit: 'Gross', stock_qty: 50, min_stock: 15, supplier_name: 'Mitra Aksesoris Garmen', restock_status: 'Aman' },
  { material_id: 6, material_name: 'Zipper Metal & Coil', unit: 'Pcs', stock_qty: 120, min_stock: 30, supplier_name: 'YKK Supplier Mitra', restock_status: 'Aman' },
  { material_id: 7, material_name: 'Plastik Kemasan / Packaging Premium', unit: 'Pcs', stock_qty: 500, min_stock: 100, supplier_name: 'CV Kemasan Packindo', restock_status: 'Aman' }
];

// Sample Initial Orders for demonstration
const DRIZZLE_SAMPLE_ORDERS = [
  {
    order_id: 1,
    customer_id: 1,
    total_pcs: 36,
    status_payment: 'DP Verified',
    order_status: 'In Production',
    tracking_code: 'DRZ-2026-001',
    created_at: '2026-11-10 14:30:00'
  },
  {
    order_id: 2,
    customer_id: 2,
    total_pcs: 50,
    status_payment: 'Menunggu DP',
    order_status: 'Pending',
    tracking_code: 'DRZ-2026-002',
    created_at: '2026-11-12 09:15:00'
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
    print_type: 'Bordir Komputer + Chenille',
    fabric_color: 'Forest Green & Cream',
    notes: 'Bordir dada kiri logo Himpunan, punggung inisial angkatan 2026',
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
    notes: 'Desain racing typography motorsport dada depan dan grafis mobil di punggung',
    estimated_total: 50 * 65000
  }
];

const DRIZZLE_SAMPLE_LOGS = [
  { log_id: 1, order_id: 1, stage_name: 'Design Approved', updated_at: '2026-11-10 14:45:00' },
  { log_id: 2, order_id: 1, stage_name: 'Down Payment (DP)', updated_at: '2026-11-11 10:00:00' },
  { log_id: 3, order_id: 1, stage_name: 'Bahan & Potong', updated_at: '2026-11-12 11:30:00' },
  { log_id: 4, order_id: 2, stage_name: 'Design Approved', updated_at: '2026-11-12 09:20:00' }
];

/**
 * Initialize LocalStorage with seed data if not present
 */
function initDrizzleStorage() {
  if (!localStorage.getItem('drizzle_products')) {
    localStorage.setItem('drizzle_products', JSON.stringify(DRIZZLE_PRODUCTS));
  }
  if (!localStorage.getItem('drizzle_materials')) {
    localStorage.setItem('drizzle_materials', JSON.stringify(DRIZZLE_INITIAL_MATERIALS));
  }
  if (!localStorage.getItem('drizzle_customers')) {
    localStorage.setItem('drizzle_customers', JSON.stringify(DRIZZLE_SAMPLE_CUSTOMERS));
  }
  if (!localStorage.getItem('drizzle_orders')) {
    localStorage.setItem('drizzle_orders', JSON.stringify(DRIZZLE_SAMPLE_ORDERS));
  }
  if (!localStorage.getItem('drizzle_order_details')) {
    localStorage.setItem('drizzle_order_details', JSON.stringify(DRIZZLE_SAMPLE_DETAILS));
  }
  if (!localStorage.getItem('drizzle_production_logs')) {
    localStorage.setItem('drizzle_production_logs', JSON.stringify(DRIZZLE_SAMPLE_LOGS));
  }
}

// Ensure storage is initialized on load
initDrizzleStorage();

/**
 * Getters for localStorage datasets
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

// Export to window for global access
window.Drizzle = {
  products: DRIZZLE_PRODUCTS,
  initStorage: initDrizzleStorage,
  getStorage: getStorage,
  setStorage: setStorage,
  generateNextOrderCode: generateNextOrderCode,
  formatRupiah: formatRupiah
};
