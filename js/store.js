/**
 * Drizzle Project — Integrated Central Data Store
 * Key: 'drizzle_integrated_db' in localStorage
 * Integrates CRM (Orders/Clients) + 5 ERP Submodules + SCM (Materials & Suppliers)
 */

const DRIZZLE_DB_KEY = 'drizzle_integrated_db';

// 12 Products for Apparel & Merchandise
const DRIZZLE_PRODUCTS = [
  { id: 1, name: 'T-Shirt', price: 65000, hppUnit: 42000, category: 'Apparel', minQty: 24, badge: 'BESTSELLER', desc: 'Cotton Combed 30s/24s Reactive super lembut, sablon DTF & Plastisol.' },
  { id: 2, name: 'Shirt / PDH', price: 110000, hppUnit: 72000, category: 'Apparel', minQty: 12, badge: 'CAMPUS & BEM', desc: 'American & Japan Drill premium, bordir komputer presisi instansi.' },
  { id: 3, name: 'Hoodie', price: 145000, hppUnit: 98000, category: 'Outerwear', minQty: 12, badge: 'HEAVYWEIGHT', desc: 'Cotton Fleece 330gsm, tali katun tebal, eyelet metal, saku kangguru.' },
  { id: 4, name: 'Coach', price: 135000, hppUnit: 88000, category: 'Outerwear', minQty: 15, badge: 'STREETWEAR', desc: 'Windbreaker coach jacket, kancing snap logam anti karat & sablon punggung.' },
  { id: 5, name: 'Vest', price: 125000, hppUnit: 82000, category: 'Outerwear', minQty: 15, badge: 'TACTICAL', desc: 'Rompi tactical/formal padding dacron ringan dengan resleting YKK.' },
  { id: 6, name: 'Varsity', price: 175000, hppUnit: 115000, category: 'Outerwear', minQty: 12, badge: 'SIGNATURE', desc: 'Wool blend body, leather sleeve & towel chenille patch embroidery.' },
  { id: 7, name: 'Bomber', price: 165000, hppUnit: 108000, category: 'Outerwear', minQty: 12, badge: 'MILITARY FIT', desc: 'Flight jacket klasik, saku zipper lengan utility, rib elastis tebal.' },
  { id: 8, name: 'Polo', price: 85000, hppUnit: 56000, category: 'Apparel', minQty: 20, badge: 'SEMI-FORMAL', desc: 'Lacoste CVC Pique adem, kerah rajut padat & bordir dada berkelas.' },
  { id: 9, name: 'Jacket', price: 140000, hppUnit: 92000, category: 'Outerwear', minQty: 15, badge: 'ALL-WEATHER', desc: 'Taslan/Microfiber tahan angin & percikan air, furing jaring bernapas.' },
  { id: 10, name: 'Hat', price: 45000, hppUnit: 28000, category: 'Accessories', minQty: 24, badge: 'ACCESSORY', desc: 'Topi twill/kanvas custom, bordir 3D puff atau sablon presisi.' },
  { id: 11, name: 'Lanyard', price: 15000, hppUnit: 9000, category: 'Accessories', minQty: 50, badge: 'EVENT MERCH', desc: 'Tali tisu polyester 2-2.5cm, print full-color sublimasi presisi + stopper.' },
  { id: 12, name: 'Tote Bag', price: 35000, hppUnit: 21000, category: 'Accessories', minQty: 30, badge: 'ECO CANVAS', desc: 'Kanvas tebal 12oz atau blacu natural, sablon awet untuk goodie bag.' }
];

// Creative Studio & Brand Consultation Services
const DRIZZLE_CREATIVE_SERVICES = [
  { id: 'cs-1', name: 'Merchandising Consultant', basePrice: 500000, hppUnit: 150000, desc: 'Konsultasi kurasi material, budgeting HPP, dan manajemen alur produksi merchandise.' },
  { id: 'cs-2', name: 'Brand Identities', basePrice: 1500000, hppUnit: 450000, desc: 'Pembuatan logo, visual guidelines, color palette, typography system, dan brand collateral.' },
  { id: 'cs-3', name: 'Graphic Design', basePrice: 350000, hppUnit: 100000, desc: 'Desain visual kustom untuk kaos, merchandise, poster event, dan packaging unik.' },
  { id: 'cs-4', name: 'Infographic', basePrice: 400000, hppUnit: 120000, desc: 'Penyajian data visual terstruktur, infografis korporat, materi presentasi edukatif.' },
  { id: 'cs-5', name: 'Editorial Layout', basePrice: 750000, hppUnit: 250000, desc: 'Tata letak majalah, katalog lookbook apparel, annual report, booklet organisasi.' },
  { id: 'cs-6', name: 'Digital Media & Social Media Management', basePrice: 1200000, hppUnit: 400000, desc: 'Strategi content planning, feeds Instagram template, banner web, microblog visual.' }
];

// 6 Production Stages
const PRODUCTION_STAGES = [
  { step: 1, name: 'Design Approved', label: '1. Design Approved', desc: 'Mockup & spesifikasi disetujui pemesan.' },
  { step: 2, name: 'DP Verified', label: '2. DP Verified', desc: 'DP 50% terverifikasi untuk antrean produksi.' },
  { step: 3, name: 'Potong & Bahan', label: '3. Potong & Bahan', desc: 'Pemotongan pola kain di cutting section (Buffer 3%).' },
  { step: 4, name: 'Sablon/Bordir', label: '4. Sablon/Bordir', desc: 'Aplikasi sablon DTF/Plastisol atau bordir makloon.' },
  { step: 5, name: 'Jahit & QC', label: '5. Jahit & QC', desc: 'Perakitan garmen, pasang label, steam press & QC.' },
  { step: 6, name: 'Packaging & Siap Kirim', label: '6. Packaging & Siap Kirim', desc: 'Packing kemasan rasio 1:1 siap diambil/dikirim.' }
];

// Initial SCM Raw Materials
const INITIAL_MATERIALS = [
  { id: 1, name: 'Kain Cotton Combed (Roll)', unit: 'Roll', stock: 45, minStock: 10, unitCost: 1250000, supplier: 'CV Tekstil Mandiri Bandung' },
  { id: 2, name: 'Kain American Drill (Roll)', unit: 'Roll', stock: 28, minStock: 8, unitCost: 1450000, supplier: 'PT Sinar Sandang Utama' },
  { id: 3, name: 'Kain Cotton Fleece (Roll)', unit: 'Roll', stock: 18, minStock: 5, unitCost: 1650000, supplier: 'PT Dunia Tekstil Bandung' },
  { id: 4, name: 'Tinta Sablon (Plastisol/DTF)', unit: 'Kg', stock: 60, minStock: 15, unitCost: 180000, supplier: 'Mitra Kimia Sablon Grafika' },
  { id: 5, name: 'Kemasan / Packaging Drizzle', unit: 'Pcs', stock: 850, minStock: 200, unitCost: 2500, supplier: 'CV Packindo Solusindo' }
];

// Initial SCM Suppliers & Makloon Partners (SCM Pilar 1: Supplier & Vendor Directory)
const INITIAL_SUPPLIERS = [
  { id: 1, name: 'CV Tekstil Mandiri Bandung', type: 'Pemasok Bahan', category: 'Kain Cotton Combed 24s/30s Reactive', leadTime: '2-3 Hari', contact: '+62 812-9988-7711', status: 'Active' },
  { id: 2, name: 'PT Sinar Sandang Utama', type: 'Pemasok Bahan', category: 'Kain American & Japan Drill', leadTime: '3-4 Hari', contact: '+62 813-2233-4455', status: 'Active' },
  { id: 3, name: 'PT Dunia Tekstil Bandung', type: 'Pemasok Bahan', category: 'Kain Cotton Fleece 330gsm & Taslan', leadTime: '2-3 Hari', contact: '+62 818-4455-6677', status: 'Active' },
  { id: 4, name: 'Mitra Kimia Sablon Grafika', type: 'Pemasok Aksesoris', category: 'Tinta Plastisol & Pet Film DTF', leadTime: '1-2 Hari', contact: '+62 856-7788-9900', status: 'Active' },
  { id: 5, name: 'CV Packindo Solusindo', type: 'Pemasok Kemasan', category: 'Drizzle Packaging Zipper (1:1 Ratio)', leadTime: '3 Hari', contact: '+62 877-3344-5566', status: 'Active' },
  { id: 6, name: 'CV Grafika Sablonindo', type: 'Mitra Makloon', category: 'Makloon Sablon DTF & Plastisol HD', leadTime: 'Kapasitas 1.000 pcs/mgg', contact: '+62 899-1234-5678', status: 'Active Partner' },
  { id: 7, name: 'Bordir Komputer Makmur', type: 'Mitra Makloon', category: 'Makloon Bordir Komputer Tajima (PDH)', leadTime: 'Kapasitas 500 pcs/mgg', contact: '+62 822-4567-8901', status: 'Active Partner' },
  { id: 8, name: 'CV Makloon Jahit Sejahtera', type: 'Mitra Makloon', category: 'Makloon Jahit & Assembling Garmen', leadTime: 'Kapasitas 800 pcs/mgg', contact: '+62 852-9876-5432', status: 'Active Partner' },
  { id: 9, name: 'Solo Cutting Specialist', type: 'Mitra Makloon', category: 'Makloon Pemotongan Pola Presisi', leadTime: 'Kapasitas 1.500 pcs/mgg', contact: '+62 815-6789-0123', status: 'Active Partner' }
];

// Initial Inbound QC Logs (SCM Pilar 4: Warehouse Control)
const INITIAL_INBOUND_QC = [
  { id: 'QC-INB-01', date: '2026-11-01', supplier: 'CV Tekstil Mandiri Bandung', material: 'Kain Cotton Combed 30s Black (25 Roll)', passed: '25 Roll', reject: '0 Roll', status: 'PASSED', notes: 'Gramasi & setting warna reaktif seragam.' },
  { id: 'QC-INB-02', date: '2026-11-04', supplier: 'PT Sinar Sandang Utama', material: 'Kain American Drill Khaki (15 Roll)', passed: '15 Roll', reject: '0 Roll', status: 'PASSED', notes: 'Anyaman rapat, serat drill presisi.' },
  { id: 'QC-INB-03', date: '2026-11-09', supplier: 'CV Packindo Solusindo', material: 'Drizzle Packaging Bag Zipper (500 Pcs)', passed: '500 Pcs', reject: '0 Pcs', status: 'PASSED', notes: 'Sablon logo packaging jelas, ziplock berfungsi baik.' }
];

// Seed Real Client Orders with ERP Attributes
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
    unit_price: 65000,
    hpp_unit: 42000,
    status_payment: 'DP Verified',
    stage: 'Sablon/Bordir',
    created_at: '2026-11-02 10:15:00',
    materials_deducted: true,
    revisions_used: 1,
    sample_approved: true,
    makloon_vendor: 'CV Grafika Sablonindo',
    qc_passed: 650,
    qc_reject: 2,
    paid_amount: (652 * 65000) * 0.5
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
    unit_price: 65000,
    hpp_unit: 42000,
    status_payment: 'DP Verified',
    stage: 'Potong & Bahan',
    created_at: '2026-11-05 14:20:00',
    materials_deducted: true,
    revisions_used: 2,
    sample_approved: true,
    makloon_vendor: 'Solo Cutting Specialist',
    qc_passed: 379,
    qc_reject: 0,
    paid_amount: (379 * 65000) * 0.5
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
    unit_price: 65000,
    hpp_unit: 42000,
    status_payment: 'DP Verified',
    stage: 'DP Verified',
    created_at: '2026-11-08 09:30:00',
    materials_deducted: false,
    revisions_used: 1,
    sample_approved: true,
    makloon_vendor: 'CV Makloon Jahit Sejahtera',
    qc_passed: 0,
    qc_reject: 0,
    paid_amount: (190 * 65000) * 0.5
  },
  {
    tracking_code: 'DRZ-2026-004',
    service_type: 'apparel',
    customer: { name: 'Fajar Nugroho', organization: 'MPD UNS (Manajemen Perdagangan)', phone: '081398765432', email: 'mpd.uns@gmail.com' },
    product_name: 'Shirt / PDH',
    total_pcs: 75,
    size_breakdown: { S: 10, M: 25, L: 25, XL: 12, XXL: 3 },
    specs: { print_type: 'Bordir Komputer Presisi', fabric_color: 'American Drill Khaki & Hitam', notes: 'Bordir logo UNS dada kiri, bendera lengan kanan, nama mahasiswa dada kanan.' },
    nicknames: 'Terlampir 75 nama mahasiswa & divisi BEM',
    total_price: 75 * 110000,
    unit_price: 110000,
    hpp_unit: 72000,
    status_payment: 'Lunas',
    stage: 'Packaging & Siap Kirim',
    created_at: '2026-11-01 11:00:00',
    materials_deducted: true,
    revisions_used: 3,
    sample_approved: true,
    makloon_vendor: 'Bordir Komputer Makmur',
    qc_passed: 75,
    qc_reject: 0,
    paid_amount: 75 * 110000,
    shipping_carrier: 'Baraka Sarana Tama Cargo',
    shipping_resi: 'BST-2026-881920',
    shipping_status: 'Dalam Pengiriman'
  },
  {
    tracking_code: 'DRZ-2026-005',
    service_type: 'apparel',
    customer: { name: 'Dewi Anggraini', organization: 'IMAKA UNDIP', phone: '082155443322', email: 'imaka.undip@gmail.com' },
    product_name: 'Shirt / PDH',
    total_pcs: 32,
    size_breakdown: { S: 5, M: 12, L: 10, XL: 4, XXL: 1 },
    specs: { print_type: 'Bordir Komputer', fabric_color: 'Japan Drill Navy', notes: 'Kemeja pengurus harian IMAKA Karanganyar.' },
    nicknames: 'Terlampir 32 nama pengurus harian',
    total_price: 32 * 110000,
    unit_price: 110000,
    hpp_unit: 72000,
    status_payment: 'Lunas',
    stage: 'Packaging & Siap Kirim',
    created_at: '2026-10-28 13:40:00',
    materials_deducted: true,
    revisions_used: 1,
    sample_approved: true,
    makloon_vendor: 'Bordir Komputer Makmur',
    qc_passed: 32,
    qc_reject: 0,
    paid_amount: 32 * 110000,
    shipping_carrier: 'Pick-Up Studio Solo',
    shipping_resi: 'PICKUP-IMAKA-01',
    shipping_status: 'Telah Diterima Klien'
  },
  {
    tracking_code: 'DRZ-2026-006',
    service_type: 'apparel',
    customer: { name: 'Hendri Setiawan', organization: 'PT. Surya Nakula', phone: '081122334455', email: 'procurement@suryanakula.com' },
    product_name: 'Shirt / PDH',
    total_pcs: 16,
    size_breakdown: { S: 2, M: 6, L: 5, XL: 3, XXL: 0 },
    specs: { print_type: 'Bordir Komputer Logo Perusahaan', fabric_color: 'American Drill Abu Tua', notes: 'Seragam teknisi lapangan PT Surya Nakula.' },
    nicknames: '16 Nama Teknisi & Divisi Lapangan',
    total_price: 16 * 110000,
    unit_price: 110000,
    hpp_unit: 72000,
    status_payment: 'Menunggu DP',
    stage: 'Design Approved',
    created_at: '2026-11-13 16:10:00',
    materials_deducted: false,
    revisions_used: 1,
    sample_approved: false,
    makloon_vendor: 'Antrean Cutting Solo',
    qc_passed: 0,
    qc_reject: 0,
    paid_amount: 0
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
      suppliers: INITIAL_SUPPLIERS,
      inbound_qc: INITIAL_INBOUND_QC,
      logs: [
        { id: 1, type: 'CRM -> ERP', message: 'Pesanan SMANKRAPFANS (652 pcs T-Shirt) berhasil masuk sistem.', time: '2026-11-02 10:15:00' },
        { id: 2, type: 'ERP -> SCM', message: 'Alokasi bahan baku SMANKRAPFANS: Kain Roll -22 roll (Buffer 3%), Kemasan -652 pcs.', time: '2026-11-03 08:30:00' },
        { id: 3, type: 'CRM -> ERP', message: 'Pesanan BUSHWACKER (379 pcs T-Shirt) masuk ke antrean potong & bahan.', time: '2026-11-05 14:20:00' },
        { id: 4, type: 'SCM -> ERP', message: 'Restock bahan baku: Kemasan Drizzle +500 pcs dari CV Packindo.', time: '2026-11-09 11:00:00' },
        { id: 5, type: 'SCM -> Outbound', message: 'Pesanan MPD UNS (75 pcs PDH) dikirim via Baraka Sarana Tama Cargo (Resi: BST-2026-881920).', time: '2026-11-10 14:00:00' }
      ]
    };
    localStorage.setItem(DRIZZLE_DB_KEY, JSON.stringify(initData));
    return initData;
  }
  try {
    const data = JSON.parse(raw);
    if (!data.suppliers) data.suppliers = INITIAL_SUPPLIERS;
    if (!data.inbound_qc) data.inbound_qc = INITIAL_INBOUND_QC;

    // Ensure sample orders have shipping info if missing
    const o4 = (data.orders || []).find(o => o.tracking_code === 'DRZ-2026-004');
    if (o4 && !o4.shipping_carrier) {
      o4.shipping_carrier = 'Baraka Sarana Tama Cargo';
      o4.shipping_resi = 'BST-2026-881920';
      o4.shipping_status = 'Dalam Pengiriman';
    }
    const o5 = (data.orders || []).find(o => o.tracking_code === 'DRZ-2026-005');
    if (o5 && !o5.shipping_carrier) {
      o5.shipping_carrier = 'Pick-Up Studio Solo';
      o5.shipping_resi = 'PICKUP-IMAKA-01';
      o5.shipping_status = 'Telah Diterima Klien';
    }

    return data;
  } catch (e) {
    console.error('Error parsing central DB:', e);
    return { orders: INITIAL_ORDERS, materials: INITIAL_MATERIALS, suppliers: INITIAL_SUPPLIERS, inbound_qc: INITIAL_INBOUND_QC, logs: [] };
  }
}

function saveDrizzleDB(data) {
  try {
    localStorage.setItem(DRIZZLE_DB_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving central DB:', e);
  }
}

// Tiered Pricing Calculator
function calculateTieredPrice(productName, totalPcs) {
  const prod = DRIZZLE_PRODUCTS.find(p => p.name.toLowerCase() === productName.toLowerCase());
  if (!prod) return 65000;
  let base = prod.price;

  // Tier discount based on volume:
  // 1-49 pcs: normal price
  // 50-149 pcs: 5% discount
  // 150-349 pcs: 10% discount
  // 350-649 pcs: 15% discount
  // 650+ pcs: 20% discount
  if (totalPcs >= 650) return Math.round(base * 0.80);
  if (totalPcs >= 350) return Math.round(base * 0.85);
  if (totalPcs >= 150) return Math.round(base * 0.90);
  if (totalPcs >= 50) return Math.round(base * 0.95);
  return base;
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

// Deduct SCM Materials for an Order with 3% Buffer Margin
function deductOrderMaterials(orderCode) {
  const db = getDrizzleDB();
  const order = db.orders.find(o => o.tracking_code === orderCode);
  if (!order || order.materials_deducted) return { success: true };

  const qty = order.total_pcs || 0;
  const pName = (order.product_name || '').toLowerCase();

  // 3% Buffer included: total fabric needed includes safety margin
  const qtyWithBuffer = Math.ceil(qty * 1.03);
  let rollNeeded = Math.max(1, Math.ceil(qtyWithBuffer / 30));
  let pkgNeeded = qty; // 1:1 packaging ratio per finished product

  let matTarget = db.materials.find(m => m.id === 1); // default combed
  if (pName.includes('shirt') || pName.includes('pdh')) {
    matTarget = db.materials.find(m => m.id === 2); // drill
  } else if (pName.includes('hoodie') || pName.includes('fleece')) {
    matTarget = db.materials.find(m => m.id === 3); // fleece
  }
  const pkgMat = db.materials.find(m => m.id === 5); // packaging

  if (matTarget && matTarget.stock < rollNeeded) {
    return { success: false, reason: `Stok ${matTarget.name} tidak mencukupi (Tersedia: ${matTarget.stock} ${matTarget.unit}, Butuh: ${rollNeeded} ${matTarget.unit} inc. buffer 3%). Harap restock di tab SCM.` };
  }
  if (pkgMat && pkgMat.stock < pkgNeeded) {
    return { success: false, reason: `Stok Kemasan tidak mencukupi (Tersedia: ${pkgMat.stock} pcs, Butuh: ${pkgNeeded} pcs rasio 1:1). Harap restock di tab SCM.` };
  }

  // Deduct
  if (matTarget) matTarget.stock -= rollNeeded;
  if (pkgMat) pkgMat.stock -= pkgNeeded;
  order.materials_deducted = true;

  saveDrizzleDB(db);
  logIntegration('ERP -> SCM', `Pemotongan stok otomatis untuk ${order.tracking_code} (${qty} pcs ${order.product_name} + 3% buffer): ${matTarget ? matTarget.name : 'Kain'} -${rollNeeded} roll, Packaging -${pkgNeeded} pcs (rasio 1:1).`);
  return { success: true };
}

// Update Outbound Shipping Details (SCM Pilar 5: Logistik & Distribusi)
function updateOrderShipping(orderCode, carrier, resi, status) {
  const db = getDrizzleDB();
  const order = (db.orders || []).find(o => o.tracking_code === orderCode);
  if (!order) return { success: false, reason: 'Pesanan tidak ditemukan' };

  order.shipping_carrier = carrier;
  order.shipping_resi = resi;
  order.shipping_status = status || 'Dalam Pengiriman';

  saveDrizzleDB(db);
  logIntegration('SCM -> Outbound', `Pembaruan logistik pengiriman ${orderCode}: ${carrier} - No. Resi: ${resi} (${order.shipping_status}). Sinkron ke Order Tracking.`);
  return { success: true };
}

// Global Export
window.DrizzleStore = {
  products: DRIZZLE_PRODUCTS,
  services: DRIZZLE_CREATIVE_SERVICES,
  stages: PRODUCTION_STAGES,
  suppliers: INITIAL_SUPPLIERS,
  inboundQC: INITIAL_INBOUND_QC,
  getDB: getDrizzleDB,
  saveDB: saveDrizzleDB,
  formatRupiah: formatRupiah,
  calculateTieredPrice: calculateTieredPrice,
  generateNextCode: generateNextTrackingCode,
  logIntegration: logIntegration,
  deductMaterials: deductOrderMaterials,
  updateShipping: updateOrderShipping
};
