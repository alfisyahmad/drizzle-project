/**
 * Drizzle Project — Integrated Central Data Store
 * Key: 'drizzle_integrated_db' in localStorage
 * Integrates CRM (Orders/Clients) + ERP (Production & SPK) + SCM (Materials & Suppliers)
 */

const DRIZZLE_DB_KEY = 'drizzle_integrated_db';

// 12 Products for Apparel & Merchandise
const DRIZZLE_PRODUCTS = [
  { id: 1, name: 'T-Shirt', price: 65000, category: 'Apparel', minQty: 24, badge: 'BESTSELLER', desc: 'Cotton Combed 30s/24s Reactive super lembut, sablon DTF & Plastisol.' },
  { id: 2, name: 'Shirt / PDH', price: 110000, category: 'Apparel', minQty: 12, badge: 'CAMPUS & BEM', desc: 'American & Japan Drill premium, bordir komputer presisi instansi.' },
  { id: 3, name: 'Hoodie', price: 145000, category: 'Outerwear', minQty: 12, badge: 'HEAVYWEIGHT', desc: 'Cotton Fleece 330gsm, tali katun tebal, eyelet metal, saku kangguru.' },
  { id: 4, name: 'Coach', price: 135000, category: 'Outerwear', minQty: 15, badge: 'STREETWEAR', desc: 'Windbreaker coach jacket, kancing snap logam anti karat & sablon punggung.' },
  { id: 5, name: 'Vest', price: 125000, category: 'Outerwear', minQty: 15, badge: 'TACTICAL', desc: 'Rompi tactical/formal padding dacron ringan dengan resleting YKK.' },
  { id: 6, name: 'Varsity', price: 175000, category: 'Outerwear', minQty: 12, badge: 'SIGNATURE', desc: 'Wool blend body, leather sleeve & towel chenille patch embroidery.' },
  { id: 7, name: 'Bomber', price: 165000, category: 'Outerwear', minQty: 12, badge: 'MILITARY FIT', desc: 'Flight jacket klasik, saku zipper lengan utility, rib elastis tebal.' },
  { id: 8, name: 'Polo', price: 85000, category: 'Apparel', minQty: 20, badge: 'SEMI-FORMAL', desc: 'Lacoste CVC Pique adem, kerah rajut padat & bordir dada berkelas.' },
  { id: 9, name: 'Jacket', price: 140000, category: 'Outerwear', minQty: 15, badge: 'ALL-WEATHER', desc: 'Taslan/Microfiber tahan angin & percikan air, furing jaring bernapas.' },
  { id: 10, name: 'Hat', price: 45000, category: 'Accessories', minQty: 24, badge: 'ACCESSORY', desc: 'Topi twill/kanvas custom, bordir 3D puff atau sablon presisi.' },
  { id: 11, name: 'Lanyard', price: 15000, category: 'Accessories', minQty: 50, badge: 'EVENT MERCH', desc: 'Tali tisu polyester 2-2.5cm, print full-color sublimasi presisi + stopper.' },
  { id: 12, name: 'Tote Bag', price: 35000, category: 'Accessories', minQty: 30, badge: 'ECO CANVAS', desc: 'Kanvas tebal 12oz atau blacu natural, sablon awet untuk goodie bag.' }
];

// Creative Studio & Brand Consultation Services
const DRIZZLE_CREATIVE_SERVICES = [
  { id: 'cs-1', name: 'Merchandising Consultant', basePrice: 500000, desc: 'Konsultasi kurasi material, budgeting HPP, dan manajemen alur produksi merchandise.' },
  { id: 'cs-2', name: 'Brand Identities', basePrice: 1500000, desc: 'Pembuatan logo, visual guidelines, color palette, typography system, dan brand collateral.' },
  { id: 'cs-3', name: 'Graphic Design', basePrice: 350000, desc: 'Desain visual kustom untuk kaos, merchandise, poster event, dan packaging unik.' },
  { id: 'cs-4', name: 'Infographic', basePrice: 400000, desc: 'Penyajian data visual terstruktur, infografis korporat, materi presentasi edukatif.' },
  { id: 'cs-5', name: 'Editorial Layout', basePrice: 750000, desc: 'Tata letak majalah, katalog lookbook apparel, annual report, booklet organisasi.' },
  { id: 'cs-6', name: 'Digital Media & Social Media Management', basePrice: 1200000, desc: 'Strategi content planning, feeds Instagram template, banner web, microblog visual.' }
];

// Production Stages (6 Steps)
const PRODUCTION_STAGES = [
  { step: 1, name: 'Design Approved', label: '1. Design Approved', desc: 'Mockup & spesifikasi disetujui pemesan.' },
  { step: 2, name: 'Down Payment (DP)', label: '2. Down Payment (DP)', desc: 'DP terverifikasi untuk antrean produksi.' },
  { step: 3, name: 'Bahan & Potong', label: '3. Bahan & Potong', desc: 'Pemotongan pola kain rol di cutting section.' },
  { step: 4, name: 'Sablon/Bordir', label: '4. Sablon/Bordir', desc: 'Aplikasi sablon DTF/Plastisol / bordir komputer.' },
  { step: 5, name: 'Jahit & Finishing', label: '5. Jahit & Finishing', desc: 'Perakitan garmen, pasang label, steam press & QC.' },
  { step: 6, name: 'Siap Kirim/Ambil', label: '6. Siap Kirim/Ambil', desc: 'Packing kemasan siap diambil/dikirim.' }
];

// Initial SCM Raw Materials
const INITIAL_MATERIALS = [
  { id: 1, name: 'Kain Cotton Combed (Roll)', unit: 'Roll', stock: 45, minStock: 10, supplier: 'CV Tekstil Mandiri Bandung' },
  { id: 2, name: 'Kain American Drill (Roll)', unit: 'Roll', stock: 28, minStock: 8, supplier: 'PT Sinar Sandang Utama' },
  { id: 3, name: 'Kain Cotton Fleece (Roll)', unit: 'Roll', stock: 18, minStock: 5, supplier: 'PT Dunia Tekstil Bandung' },
  { id: 4, name: 'Tinta Sablon (Plastisol/DTF)', unit: 'Kg', stock: 60, minStock: 15, supplier: 'Mitra Kimia Sablon Grafika' },
  { id: 5, name: 'Kemasan / Packaging Drizzle', unit: 'Pcs', stock: 850, minStock: 200, supplier: 'CV Packindo Solusindo' }
];

// Seed Real Client Orders
const INITIAL_ORDERS = [
  {
    tracking_code: 'DRZ-2026-001',
    service_type: 'apparel',
    customer: { name: 'Alif Kurniawan', organization: 'SMANKRAPFANS 1982', phone: '081234567890', email: 'smankrap@gmail.com' },
    product_name: 'T-Shirt',
    total_pcs: 652,
    size_breakdown: { S: 100, M: 220, L: 200, XL: 100, XXL: 32 },
    specs: { print_type: 'Sablon Plastisol High Density', fabric_color: 'Jet Black 30s', notes: 'Desain artwork ultras depan dan punggung A3, label woven Drizzle.' },
    total_price: 652 * 65000,
    status_payment: 'DP Verified',
    stage: 'Sablon/Bordir',
    created_at: '2026-11-02 10:15:00',
    materials_deducted: true
  },
  {
    tracking_code: 'DRZ-2026-002',
    service_type: 'apparel',
    customer: { name: 'Bagus Pratama', organization: 'BUSHWACKER', phone: '088211223344', email: 'bushwacker@gmail.com' },
    product_name: 'T-Shirt',
    total_pcs: 379,
    size_breakdown: { S: 50, M: 120, L: 130, XL: 60, XXL: 19 },
    specs: { print_type: 'Sablon DTF Full Color', fabric_color: 'White Combed 24s', notes: 'Eternal For Bushwacker Finest Badge edition.' },
    total_price: 379 * 65000,
    status_payment: 'DP Verified',
    stage: 'Bahan & Potong',
    created_at: '2026-11-05 14:20:00',
    materials_deducted: true
  },
  {
    tracking_code: 'DRZ-2026-003',
    service_type: 'apparel',
    customer: { name: 'Rendra Wijaya', organization: 'Spartan Stately (SPRTN)', phone: '085712345678', email: 'spartan@gmail.com' },
    product_name: 'T-Shirt',
    total_pcs: 190,
    size_breakdown: { S: 30, M: 70, L: 60, XL: 25, XXL: 5 },
    specs: { print_type: 'Sablon Plastisol Doff', fabric_color: 'Navy Blue 30s', notes: 'Natus Vincere edition, logo dada kiri & typogafi punggung.' },
    total_price: 190 * 65000,
    status_payment: 'DP Verified',
    stage: 'Down Payment (DP)',
    created_at: '2026-11-08 09:30:00',
    materials_deducted: false
  },
  {
    tracking_code: 'DRZ-2026-004',
    service_type: 'apparel',
    customer: { name: 'Fajar Nugroho', organization: 'MPD UNS (Manajemen Perdagangan)', phone: '081398765432', email: 'mpd.uns@gmail.com' },
    product_name: 'Shirt / PDH',
    total_pcs: 75,
    size_breakdown: { S: 10, M: 25, L: 25, XL: 12, XXL: 3 },
    specs: { print_type: 'Bordir Komputer Presisi', fabric_color: 'American Drill Khaki & Hitam', notes: 'Bordir logo UNS dada kiri, bendera lengan kanan, nama mahasiswa dada kanan.' },
    total_price: 75 * 110000,
    status_payment: 'Lunas',
    stage: 'Siap Kirim/Ambil',
    created_at: '2026-11-01 11:00:00',
    materials_deducted: true
  },
  {
    tracking_code: 'DRZ-2026-005',
    service_type: 'apparel',
    customer: { name: 'Dewi Anggraini', organization: 'IMAKA UNDIP', phone: '082155443322', email: 'imaka.undip@gmail.com' },
    product_name: 'Shirt / PDH',
    total_pcs: 32,
    size_breakdown: { S: 5, M: 12, L: 10, XL: 4, XXL: 1 },
    specs: { print_type: 'Bordir Komputer', fabric_color: 'Japan Drill Navy', notes: 'Kemeja pengurus harian IMAKA Karanganyar.' },
    total_price: 32 * 110000,
    status_payment: 'Lunas',
    stage: 'Siap Kirim/Ambil',
    created_at: '2026-10-28 13:40:00',
    materials_deducted: true
  },
  {
    tracking_code: 'DRZ-2026-006',
    service_type: 'apparel',
    customer: { name: 'Hendri Setiawan', organization: 'PT. Surya Nakula', phone: '081122334455', email: 'procurement@suryanakula.com' },
    product_name: 'Shirt / PDH',
    total_pcs: 16,
    size_breakdown: { S: 2, M: 6, L: 5, XL: 3, XXL: 0 },
    specs: { print_type: 'Bordir Komputer Logo Perusahaan', fabric_color: 'American Drill Abu Tua', notes: 'Seragam teknisi lapangan PT Surya Nakula.' },
    total_price: 16 * 110000,
    status_payment: 'Menunggu DP',
    stage: 'Design Approved',
    created_at: '2026-11-13 16:10:00',
    materials_deducted: false
  }
];

// Helper to format currency
function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num || 0);
}

// Get or Init Central Store
function getDrizzleDB() {
  const raw = localStorage.getItem(DRIZZLE_DB_KEY);
  if (!raw) {
    const initData = {
      orders: INITIAL_ORDERS,
      materials: INITIAL_MATERIALS,
      logs: [
        { id: 1, type: 'CRM -> ERP', message: 'Pesanan SMANKRAPFANS (652 pcs T-Shirt) berhasil masuk sistem.', time: '2026-11-02 10:15:00' },
        { id: 2, type: 'ERP -> SCM', message: 'Alokasi bahan baku SMANKRAPFANS: Kain Roll -22 roll, Kemasan -652 pcs.', time: '2026-11-03 08:30:00' },
        { id: 3, type: 'CRM -> ERP', message: 'Pesanan BUSHWACKER (379 pcs T-Shirt) masuk ke antrean produksi.', time: '2026-11-05 14:20:00' },
        { id: 4, type: 'SCM -> ERP', message: 'Restock bahan baku: Kemasan Drizzle +500 pcs dari CV Packindo.', time: '2026-11-09 11:00:00' }
      ]
    };
    localStorage.setItem(DRIZZLE_DB_KEY, JSON.stringify(initData));
    return initData;
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error parsing central DB:', e);
    return { orders: INITIAL_ORDERS, materials: INITIAL_MATERIALS, logs: [] };
  }
}

function saveDrizzleDB(data) {
  try {
    localStorage.setItem(DRIZZLE_DB_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving central DB:', e);
  }
}

// Generate Next Code: DRZ-2026-XXX
function generateNextTrackingCode() {
  const db = getDrizzleDB();
  let maxNum = 0;
  (db.orders || []).forEach(o => {
    if (o.tracking_code && o.tracking_code.startsWith('DRZ-2026-')) {
      const parts = o.tracking_code.split('-');
      const num = parseInt(parts[2], 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    }
  });
  const nextSeq = String(maxNum + 1).padStart(3, '0');
  return `DRZ-2026-${nextSeq}`;
}

// Add Integration Log
function logIntegration(type, message) {
  const db = getDrizzleDB();
  const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const nextId = db.logs.length ? (Math.max(...db.logs.map(l => l.id || 0)) + 1) : 1;
  db.logs.unshift({ id: nextId, type, message, time: now });
  if (db.logs.length > 50) db.logs.pop();
  saveDrizzleDB(db);
}

// Deduct SCM Materials for an Order
function deductOrderMaterials(orderCode) {
  const db = getDrizzleDB();
  const order = db.orders.find(o => o.tracking_code === orderCode);
  if (!order || order.materials_deducted) return { success: true };

  const qty = order.total_pcs || 0;
  const pName = (order.product_name || '').toLowerCase();

  // Determine needed materials
  let rollNeeded = Math.max(1, Math.ceil(qty / 30));
  let pkgNeeded = qty;

  let matTarget = db.materials.find(m => m.id === 1); // default combed
  if (pName.includes('shirt') || pName.includes('pdh')) {
    matTarget = db.materials.find(m => m.id === 2); // drill
  } else if (pName.includes('hoodie') || pName.includes('fleece')) {
    matTarget = db.materials.find(m => m.id === 3); // fleece
  }
  const pkgMat = db.materials.find(m => m.id === 5); // packaging

  if (matTarget && matTarget.stock < rollNeeded) {
    return { success: false, reason: `Stok ${matTarget.name} tidak mencukupi (Tersedia: ${matTarget.stock} ${matTarget.unit}, Butuh: ${rollNeeded} ${matTarget.unit}). Harap restock di tab SCM.` };
  }
  if (pkgMat && pkgMat.stock < pkgNeeded) {
    return { success: false, reason: `Stok Kemasan tidak mencukupi (Tersedia: ${pkgMat.stock} pcs, Butuh: ${pkgNeeded} pcs). Harap restock di tab SCM.` };
  }

  // Deduct
  if (matTarget) matTarget.stock -= rollNeeded;
  if (pkgMat) pkgMat.stock -= pkgNeeded;
  order.materials_deducted = true;

  saveDrizzleDB(db);
  logIntegration('ERP -> SCM', `Pemotongan stok otomatis untuk ${order.tracking_code} (${qty} pcs ${order.product_name}): ${matTarget ? matTarget.name : 'Kain'} -${rollNeeded} roll, Packaging -${pkgNeeded} pcs.`);
  return { success: true };
}

// Global Export
window.DrizzleStore = {
  products: DRIZZLE_PRODUCTS,
  services: DRIZZLE_CREATIVE_SERVICES,
  stages: PRODUCTION_STAGES,
  getDB: getDrizzleDB,
  saveDB: saveDrizzleDB,
  formatRupiah: formatRupiah,
  generateNextCode: generateNextTrackingCode,
  logIntegration: logIntegration,
  deductMaterials: deductOrderMaterials
};
