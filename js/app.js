/**
 * DrizzleOS — Core SaaS Engine & Multi-Tenant SIM Architecture
 * LocalStorage Key: 'drizzle_sim_db'
 * 6 Relational Collections: services, customers, orders, materials, purchaseOrders, financeLedger
 * + tenantConfig (Multi-Tenant SaaS Configuration)
 */

const DRIZZLE_SIM_DB_KEY = 'drizzle_sim_db';

// 1. TENANT CONFIGURATION (Multi-Tenant SaaS Ready)
const DEFAULT_TENANT_CONFIG = {
  tenantId: 'TENANT-DRIZZLE-SOLO',
  businessName: 'Drizzle Project',
  brandLabel: 'DRIZZLE THE LABEL',
  tagline: 'Customize Your Merchandise — We Handle What You Need',
  philosophy: 'Human Help Human (All Product Include Packaging)',
  establishedYear: 2023,
  contactWA: '+62 882-0075-46920',
  contactEmail: 'drizzlethelabel@gmail.com',
  contactIG: '@drizzleproject',
  studioLocation: 'Surakarta (Solo), Jawa Tengah',
  defaultPackagingRatio: 1.0, // 1:1 Rule
  defaultDpPercentage: 0.5,   // 50% DP
  currency: 'IDR',
  activeTheme: 'warm-studio',
  version: 'DrizzleOS v2.4 SaaS Multi-Tenant'
};

// 2. SERVICES CATALOG (12 Apparel & Merch + 7 Creative Services)
const INITIAL_SERVICES = [
  // APPAREL
  {
    serviceId: 'SRV-01',
    category: 'APPAREL',
    name: 'T-Shirt',
    basePrice: 65000,
    hppUnit: 42000,
    leadTimeDays: 7,
    minQty: 24,
    badge: 'BESTSELLER',
    desc: 'Cotton Combed 30s/24s Reactive super lembut, sablon DTF & Plastisol high density.',
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
    name: 'Shirt / PDH',
    basePrice: 110000,
    hppUnit: 72000,
    leadTimeDays: 10,
    minQty: 12,
    badge: 'CAMPUS & BEM',
    desc: 'American & Japan Drill premium, bordir komputer presisi instansi & ventilasi furing.',
    bomRecipe: [
      { materialId: 'MAT-02', qtyPerUnit: 0.04, name: 'Kain American/Japan Drill (Roll)' },
      { materialId: 'MAT-05', qtyPerUnit: 1.0, name: 'Polymailer/Box Drizzle (1:1)' },
      { materialId: 'MAT-06', qtyPerUnit: 1.0, name: 'Thank You Card (1:1)' }
    ]
  },
  {
    serviceId: 'SRV-03',
    category: 'APPAREL',
    name: 'Hoodie',
    basePrice: 145000,
    hppUnit: 98000,
    leadTimeDays: 10,
    minQty: 12,
    badge: 'HEAVYWEIGHT',
    desc: 'Cotton Fleece 330gsm tebal, tali katun bulat, eyelet metal, saku kangguru.',
    bomRecipe: [
      { materialId: 'MAT-03', qtyPerUnit: 0.05, name: 'Kain Cotton Fleece (Roll)' },
      { materialId: 'MAT-05', qtyPerUnit: 1.0, name: 'Polymailer/Box Drizzle (1:1)' },
      { materialId: 'MAT-06', qtyPerUnit: 1.0, name: 'Thank You Card (1:1)' }
    ]
  },
  {
    serviceId: 'SRV-04',
    category: 'APPAREL',
    name: 'Coach Jacket',
    basePrice: 135000,
    hppUnit: 88000,
    leadTimeDays: 10,
    minQty: 15,
    badge: 'STREETWEAR',
    desc: 'Windbreaker coach jacket, kancing snap logam anti karat & sablon punggung A3.',
    bomRecipe: [
      { materialId: 'MAT-03', qtyPerUnit: 0.04, name: 'Kain Taslan/Fleece (Roll)' },
      { materialId: 'MAT-05', qtyPerUnit: 1.0, name: 'Polymailer/Box Drizzle (1:1)' },
      { materialId: 'MAT-06', qtyPerUnit: 1.0, name: 'Thank You Card (1:1)' }
    ]
  },
  {
    serviceId: 'SRV-05',
    category: 'APPAREL',
    name: 'Vest',
    basePrice: 125000,
    hppUnit: 82000,
    leadTimeDays: 10,
    minQty: 15,
    badge: 'TACTICAL',
    desc: 'Rompi tactical/formal padding dacron ringan dengan resleting YKK multi-pocket utility.',
    bomRecipe: [
      { materialId: 'MAT-02', qtyPerUnit: 0.035, name: 'Kain Drill (Roll)' },
      { materialId: 'MAT-05', qtyPerUnit: 1.0, name: 'Polymailer/Box Drizzle (1:1)' },
      { materialId: 'MAT-06', qtyPerUnit: 1.0, name: 'Thank You Card (1:1)' }
    ]
  },
  {
    serviceId: 'SRV-06',
    category: 'APPAREL',
    name: 'Varsity',
    basePrice: 175000,
    hppUnit: 115000,
    leadTimeDays: 14,
    minQty: 12,
    badge: 'SIGNATURE',
    desc: 'Wool blend body, leather sleeve & towel chenille patch embroidery berkelas.',
    bomRecipe: [
      { materialId: 'MAT-03', qtyPerUnit: 0.05, name: 'Kain Wool/Fleece (Roll)' },
      { materialId: 'MAT-05', qtyPerUnit: 1.0, name: 'Polymailer/Box Drizzle (1:1)' },
      { materialId: 'MAT-06', qtyPerUnit: 1.0, name: 'Thank You Card (1:1)' }
    ]
  },
  {
    serviceId: 'SRV-07',
    category: 'APPAREL',
    name: 'Bomber Jacket',
    basePrice: 165000,
    hppUnit: 108000,
    leadTimeDays: 12,
    minQty: 12,
    badge: 'MILITARY FIT',
    desc: 'Classic flight jacket, furing oranye dacron tebal & saku zipper lengan utility.',
    bomRecipe: [
      { materialId: 'MAT-03', qtyPerUnit: 0.045, name: 'Kain Taslan/Fleece (Roll)' },
      { materialId: 'MAT-05', qtyPerUnit: 1.0, name: 'Polymailer/Box Drizzle (1:1)' },
      { materialId: 'MAT-06', qtyPerUnit: 1.0, name: 'Thank You Card (1:1)' }
    ]
  },
  {
    serviceId: 'SRV-08',
    category: 'APPAREL',
    name: 'Polo Shirt',
    basePrice: 85000,
    hppUnit: 56000,
    leadTimeDays: 8,
    minQty: 20,
    badge: 'SEMI-FORMAL',
    desc: 'Lacoste CVC Pique adem, kerah rajut padat & bordir dada presisi.',
    bomRecipe: [
      { materialId: 'MAT-01', qtyPerUnit: 0.036, name: 'Kain Pique/Combed (Roll)' },
      { materialId: 'MAT-05', qtyPerUnit: 1.0, name: 'Polymailer/Box Drizzle (1:1)' },
      { materialId: 'MAT-06', qtyPerUnit: 1.0, name: 'Thank You Card (1:1)' }
    ]
  },
  {
    serviceId: 'SRV-09',
    category: 'APPAREL',
    name: 'All-Weather Jacket',
    basePrice: 140000,
    hppUnit: 92000,
    leadTimeDays: 10,
    minQty: 15,
    badge: 'ALL-WEATHER',
    desc: 'Taslan/Microfiber water-repellent, furing jaring bernapas & saku resleting.',
    bomRecipe: [
      { materialId: 'MAT-03', qtyPerUnit: 0.04, name: 'Kain Taslan (Roll)' },
      { materialId: 'MAT-05', qtyPerUnit: 1.0, name: 'Polymailer/Box Drizzle (1:1)' },
      { materialId: 'MAT-06', qtyPerUnit: 1.0, name: 'Thank You Card (1:1)' }
    ]
  },
  // MERCHANDISE
  {
    serviceId: 'SRV-10',
    category: 'MERCH',
    name: 'Custom Hat',
    basePrice: 45000,
    hppUnit: 28000,
    leadTimeDays: 7,
    minQty: 24,
    badge: 'ACCESSORY',
    desc: 'Topi twill/kanvas custom, bordir 3D puff atau sablon presisi.',
    bomRecipe: [
      { materialId: 'MAT-02', qtyPerUnit: 0.015, name: 'Kain Twill/Drill (Roll)' },
      { materialId: 'MAT-05', qtyPerUnit: 1.0, name: 'Polymailer/Box Drizzle (1:1)' },
      { materialId: 'MAT-06', qtyPerUnit: 1.0, name: 'Thank You Card (1:1)' }
    ]
  },
  {
    serviceId: 'SRV-11',
    category: 'MERCH',
    name: 'Sublimation Lanyard',
    basePrice: 15000,
    hppUnit: 9000,
    leadTimeDays: 5,
    minQty: 50,
    badge: 'EVENT MERCH',
    desc: 'Tali tisu polyester 2-2.5cm, print full-color sublimasi presisi + stopper.',
    bomRecipe: [
      { materialId: 'MAT-05', qtyPerUnit: 1.0, name: 'Kemasan Plastik Drizzle (1:1)' },
      { materialId: 'MAT-06', qtyPerUnit: 1.0, name: 'Thank You Card (1:1)' }
    ]
  },
  {
    serviceId: 'SRV-12',
    category: 'MERCH',
    name: 'Canvas Tote Bag',
    basePrice: 35000,
    hppUnit: 21000,
    leadTimeDays: 6,
    minQty: 30,
    badge: 'ECO CANVAS',
    desc: 'Kanvas tebal 12oz atau blacu natural, sablon awet untuk souvenir & goodie bag.',
    bomRecipe: [
      { materialId: 'MAT-02', qtyPerUnit: 0.02, name: 'Kain Kanvas/Blacu (Roll)' },
      { materialId: 'MAT-05', qtyPerUnit: 1.0, name: 'Polymailer/Box Drizzle (1:1)' },
      { materialId: 'MAT-06', qtyPerUnit: 1.0, name: 'Thank You Card (1:1)' }
    ]
  },
  // 7 CREATIVE & BRAND CONSULTANCY SERVICES
  {
    serviceId: 'SRV-13',
    category: 'DESIGN',
    name: 'Merchandising Consultant',
    basePrice: 500000,
    hppUnit: 150000,
    leadTimeDays: 3,
    minQty: 1,
    badge: 'CONSULTING',
    desc: 'Konsultasi kurasi material, budgeting HPP, dan manajemen alur produksi merchandise.',
    bomRecipe: []
  },
  {
    serviceId: 'SRV-14',
    category: 'DESIGN',
    name: 'Brand Identities',
    basePrice: 1500000,
    hppUnit: 450000,
    leadTimeDays: 7,
    minQty: 1,
    badge: 'IDENTITY',
    desc: 'Pembuatan logo, visual guidelines, color palette, typography system, dan brand collateral.',
    bomRecipe: []
  },
  {
    serviceId: 'SRV-15',
    category: 'DESIGN',
    name: 'Graphic Design',
    basePrice: 350000,
    hppUnit: 100000,
    leadTimeDays: 3,
    minQty: 1,
    badge: 'ARTWORK',
    desc: 'Desain visual kustom untuk kaos, merchandise, poster event, dan packaging unik.',
    bomRecipe: []
  },
  {
    serviceId: 'SRV-16',
    category: 'DESIGN',
    name: 'Infographic',
    basePrice: 400000,
    hppUnit: 120000,
    leadTimeDays: 3,
    minQty: 1,
    badge: 'DATA VISUAL',
    desc: 'Penyajian data visual terstruktur, infografis korporat, materi presentasi edukatif.',
    bomRecipe: []
  },
  {
    serviceId: 'SRV-17',
    category: 'DESIGN',
    name: 'Editorial Layout',
    basePrice: 750000,
    hppUnit: 250000,
    leadTimeDays: 5,
    minQty: 1,
    badge: 'EDITORIAL',
    desc: 'Tata letak majalah, katalog lookbook apparel, annual report, booklet organisasi.',
    bomRecipe: []
  },
  {
    serviceId: 'SRV-18',
    category: 'DESIGN',
    name: 'Digital Media',
    basePrice: 650000,
    hppUnit: 200000,
    leadTimeDays: 4,
    minQty: 1,
    badge: 'DIGITAL',
    desc: 'Desain banner web, display ads, materi promo interaktif, dan visual digital lookbook.',
    bomRecipe: []
  },
  {
    serviceId: 'SRV-19',
    category: 'DESIGN',
    name: 'Content Plan & Social Media',
    basePrice: 1200000,
    hppUnit: 400000,
    leadTimeDays: 7,
    minQty: 1,
    badge: 'SOCIAL MEDIA',
    desc: 'Strategi content planning, feeds Instagram template, carousel visual, dan copy caption.',
    bomRecipe: []
  }
];

// 3. MATERIALS & SCM INVENTORY (Rule Wajib Kemasan 1:1)
const INITIAL_MATERIALS = [
  {
    materialId: 'MAT-01',
    materialName: 'Kain Cotton Combed 30s/24s',
    unit: 'Roll',
    currentStock: 48,
    minThreshold: 12,
    unitCost: 1250000,
    supplierName: 'CV Tekstil Mandiri Bandung',
    isMandatoryPack1to1: false
  },
  {
    materialId: 'MAT-02',
    materialName: 'Kain American & Japan Drill',
    unit: 'Roll',
    currentStock: 25,
    minThreshold: 8,
    unitCost: 1450000,
    supplierName: 'PT Sinar Sandang Utama',
    isMandatoryPack1to1: false
  },
  {
    materialId: 'MAT-03',
    materialName: 'Kain Cotton Fleece 330gsm',
    unit: 'Roll',
    currentStock: 16,
    minThreshold: 6,
    unitCost: 1650000,
    supplierName: 'PT Dunia Tekstil Bandung',
    isMandatoryPack1to1: false
  },
  {
    materialId: 'MAT-04',
    materialName: 'Tinta Plastisol & DTF Film',
    unit: 'Kg',
    currentStock: 55,
    minThreshold: 15,
    unitCost: 180000,
    supplierName: 'Mitra Kimia Sablon Grafika',
    isMandatoryPack1to1: false
  },
  {
    materialId: 'MAT-05',
    materialName: 'Polymailer & Box Packaging Drizzle',
    unit: 'Pcs',
    currentStock: 1200,
    minThreshold: 300,
    unitCost: 2500,
    supplierName: 'CV Packindo Solusindo',
    isMandatoryPack1to1: true // WAJIB 1:1
  },
  {
    materialId: 'MAT-06',
    materialName: 'Thank You Card & Care Label',
    unit: 'Pcs',
    currentStock: 1500,
    minThreshold: 300,
    unitCost: 500,
    supplierName: 'Percetakan Grafika Solo',
    isMandatoryPack1to1: true // WAJIB 1:1
  }
];

// 4. CUSTOMERS DIRECTORY (CRM Segmentation: Baru / Repeat / Instansi)
const INITIAL_CUSTOMERS = [
  {
    customerId: 'CUST-001',
    name: 'Alif Kurniawan',
    organization: 'SMANKRAPFANS 1982',
    whatsapp: '081234567890',
    email: 'smankrap@gmail.com',
    address: 'Jl. Slamet Riyadi No. 45, Laweyan, Surakarta',
    segment: 'Instansi',
    totalOrders: 1,
    totalSpent: 652 * 52000
  },
  {
    customerId: 'CUST-002',
    name: 'Bagus Pratama',
    organization: 'Bushwacker Finest',
    whatsapp: '088211223344',
    email: 'bushwacker@gmail.com',
    address: 'Jl. Veteran No. 12, Pasar Kliwon, Surakarta',
    segment: 'Repeat',
    totalOrders: 1,
    totalSpent: 379 * 55250
  },
  {
    customerId: 'CUST-003',
    name: 'Fandi Ahmad',
    organization: 'SMEA FAMS 1963',
    whatsapp: '085712348899',
    email: 'smeafams@gmail.com',
    address: 'Jl. Kolonel Sugiyono No. 18, Banjarsari, Surakarta',
    segment: 'Instansi',
    totalOrders: 1,
    totalSpent: 200 * 58500
  },
  {
    customerId: 'CUST-004',
    name: 'Rendra Wijaya',
    organization: 'Spartan Stately MMXIX',
    whatsapp: '085712345678',
    email: 'spartan@gmail.com',
    address: 'Jl. Ir. Sutami No. 88, Jebres, Surakarta',
    segment: 'Repeat',
    totalOrders: 1,
    totalSpent: 190 * 58500
  },
  {
    customerId: 'CUST-005',
    name: 'Guruh Prasetyo',
    organization: 'Emperor Club',
    whatsapp: '081399881122',
    email: 'emperor@gmail.com',
    address: 'Jl. Gajah Mada No. 34, Ketelan, Surakarta',
    segment: 'Baru',
    totalOrders: 1,
    totalSpent: 77 * 61750
  },
  {
    customerId: 'CUST-006',
    name: 'Fajar Nugroho',
    organization: 'MPD UNS (Manajemen Perdagangan)',
    whatsapp: '081398765432',
    email: 'mpd.uns@gmail.com',
    address: 'Gedung BEM MPD UNS, Kampus Mesen, Surakarta',
    segment: 'Instansi',
    totalOrders: 1,
    totalSpent: 75 * 104500
  },
  {
    customerId: 'CUST-007',
    name: 'Satria Adhi',
    organization: 'Assolous Class MMXXIII',
    whatsapp: '087812993344',
    email: 'assolous@gmail.com',
    address: 'Jl. Urip Sumoharjo No. 70, Jebres, Surakarta',
    segment: 'Baru',
    totalOrders: 1,
    totalSpent: 39 * 65000
  },
  {
    customerId: 'CUST-008',
    name: 'Rian Pratama',
    organization: 'Gengga Genius Official',
    whatsapp: '089622334455',
    email: 'gengga@gmail.com',
    address: 'Jl. Adisucipto No. 102, Manahan, Surakarta',
    segment: 'Baru',
    totalOrders: 1,
    totalSpent: 36 * 65000
  },
  {
    customerId: 'CUST-009',
    name: 'Zulfikar Ali',
    organization: 'Rohis SMNSA',
    whatsapp: '085288991122',
    email: 'rohis.smnsa@gmail.com',
    address: 'Kompleks SMAN 1 Surakarta, Jl. Monginsidi',
    segment: 'Instansi',
    totalOrders: 1,
    totalSpent: 35 * 110000
  },
  {
    customerId: 'CUST-010',
    name: 'Hendra Gunawan',
    organization: 'Excellent Apparel',
    whatsapp: '081266778899',
    email: 'excellent@gmail.com',
    address: 'Jl. Kapten Mulyadi No. 55, Pasar Kliwon, Surakarta',
    segment: 'Baru',
    totalOrders: 1,
    totalSpent: 33 * 65000
  },
  {
    customerId: 'CUST-011',
    name: 'Ilham Maulana',
    organization: 'HSTRC Community',
    whatsapp: '082133445566',
    email: 'hstrc@gmail.com',
    address: 'Jl. Bhayangkara No. 20, Tipes, Surakarta',
    segment: 'Repeat',
    totalOrders: 1,
    totalSpent: 32 * 135000
  },
  {
    customerId: 'CUST-012',
    name: 'Dewi Anggraini',
    organization: 'IMAKA UNDIP',
    whatsapp: '082155443322',
    email: 'imaka.undip@gmail.com',
    address: 'Sekretariat IMAKA, Jl. Prof. Soedarto, Tembalang, Semarang',
    segment: 'Instansi',
    totalOrders: 1,
    totalSpent: 32 * 110000
  },
  {
    customerId: 'CUST-013',
    name: 'Bayu Saputra',
    organization: 'IATMI SM UPNVYK',
    whatsapp: '081377889900',
    email: 'iatmi.upn@gmail.com',
    address: 'Kampus UPN Veteran Yogyakarta, Condongcatur, Sleman',
    segment: 'Instansi',
    totalOrders: 1,
    totalSpent: 30 * 140000
  },
  {
    customerId: 'CUST-014',
    name: 'Taufiq Hidayat',
    organization: 'Adventure Team (ADVNTR)',
    whatsapp: '085699001122',
    email: 'advntr@gmail.com',
    address: 'Jl. Ahmad Yani No. 15, Kartasura, Sukoharjo',
    segment: 'Repeat',
    totalOrders: 1,
    totalSpent: 30 * 85000
  },
  {
    customerId: 'CUST-015',
    name: 'Hendri Setiawan',
    organization: 'PT. Surya Nakula',
    whatsapp: '081122334455',
    email: 'procurement@suryanakula.com',
    address: 'Kawasan Industri Solo Baru Blok C-4, Sukoharjo',
    segment: 'Instansi',
    totalOrders: 1,
    totalSpent: 16 * 110000
  },
  {
    customerId: 'CUST-016',
    name: 'Eko Prasetyo',
    organization: 'Machine Collective 1998',
    whatsapp: '081822446688',
    email: 'machine1998@gmail.com',
    address: 'Jl. Honggowongso No. 89, Serengan, Surakarta',
    segment: 'Baru',
    totalOrders: 1,
    totalSpent: 24 * 65000
  },
  {
    customerId: 'CUST-017',
    name: 'Aldo Kusuma',
    organization: 'Propundt Banana Crew',
    whatsapp: '087788990011',
    email: 'propundt@gmail.com',
    address: 'Jl. Dr. Radjiman No. 210, Laweyan, Surakarta',
    segment: 'Repeat',
    totalOrders: 1,
    totalSpent: 20 * 165000
  }
];

// 5. ORDERS COLLECTION (17 Real Client Projects)
// Kanban Stages: DESIGN, PRINTING, SEWING, QC, SHIPPED
const INITIAL_ORDERS = [
  {
    orderId: 'DRZ-2026-001',
    customerId: 'CUST-001',
    serviceId: 'SRV-01',
    serviceName: 'T-Shirt',
    serviceMode: 'PRODUCTION',
    qty: 652,
    sizeBreakdown: { S: 100, M: 220, L: 200, XL: 100, XXL: 32 },
    briefUrl: 'Desain artwork ultras depan dan punggung A3, Sablon Plastisol High Density, Jet Black 30s.',
    totalPrice: 652 * 52000,
    dpAmount: (652 * 52000) * 0.5,
    paidAmount: (652 * 52000) * 0.5,
    paymentStatus: 'DP_50_PAID',
    kanbanStage: 'PRINTING',
    hppTotal: 652 * 42000,
    trackingResi: '',
    shippingCarrier: 'Baraka Sarana Tama Cargo',
    createdAt: '2026-11-02 10:15',
    historyLogs: [
      { timestamp: '2026-11-02 10:15', stage: 'DESIGN', note: 'Pesanan masuk dan mockup disetujui pemesan.', author: 'Sales CRM' },
      { timestamp: '2026-11-02 11:30', stage: 'DESIGN', note: 'DP 50% sebesar Rp 16.952.000 terverifikasi.', author: 'Finance ERP' },
      { timestamp: '2026-11-03 08:30', stage: 'PRINTING', note: 'Kain dipotong di cutting section & naik meja sablon Plastisol HD.', author: 'Produksi' }
    ]
  },
  {
    orderId: 'DRZ-2026-002',
    customerId: 'CUST-002',
    serviceId: 'SRV-01',
    serviceName: 'T-Shirt',
    serviceMode: 'PRODUCTION',
    qty: 379,
    sizeBreakdown: { S: 50, M: 120, L: 130, XL: 60, XXL: 19 },
    briefUrl: 'T-Shirt Official "Eternal For Bushwacker Finest Badge", Sablon DTF Full Color, White Combed 24s.',
    totalPrice: 379 * 55250,
    dpAmount: (379 * 55250) * 0.5,
    paidAmount: (379 * 55250) * 0.5,
    paymentStatus: 'DP_50_PAID',
    kanbanStage: 'PRINTING',
    hppTotal: 379 * 42000,
    trackingResi: '',
    shippingCarrier: 'J&T Cargo',
    createdAt: '2026-11-05 14:20',
    historyLogs: [
      { timestamp: '2026-11-05 14:20', stage: 'DESIGN', note: 'Artwork badge Bushwacker final disetujui.', author: 'Sales CRM' },
      { timestamp: '2026-11-05 15:00', stage: 'PRINTING', note: 'Bahan Combed 24s teralokasi, proses cetak DTF film.', author: 'Produksi' }
    ]
  },
  {
    orderId: 'DRZ-2026-003',
    customerId: 'CUST-003',
    serviceId: 'SRV-01',
    serviceName: 'T-Shirt',
    serviceMode: 'PRODUCTION',
    qty: 200,
    sizeBreakdown: { S: 30, M: 70, L: 70, XL: 25, XXL: 5 },
    briefUrl: 'T-Shirt Alumni Edition "Never Forget History", Sablon Plastisol Doff, Black Combed 30s.',
    totalPrice: 200 * 58500,
    dpAmount: (200 * 58500) * 0.5,
    paidAmount: 200 * 58500,
    paymentStatus: 'LUNAS',
    kanbanStage: 'SHIPPED',
    hppTotal: 200 * 42000,
    trackingResi: 'JTC-2026-196300',
    shippingCarrier: 'J&T Cargo',
    createdAt: '2026-10-25 09:00',
    historyLogs: [
      { timestamp: '2026-10-25 09:00', stage: 'DESIGN', note: 'Pesanan SMEA FAMS 1963 disetujui.', author: 'Sales CRM' },
      { timestamp: '2026-10-28 14:00', stage: 'SEWING', note: 'Perakitan garmen selesai, steam press & QC passed.', author: 'QC' },
      { timestamp: '2026-10-30 11:00', stage: 'SHIPPED', note: 'Pelunasan 100% diterima. Dikirim via J&T Cargo No. Resi: JTC-2026-196300.', author: 'Outbound SCM' }
    ]
  },
  {
    orderId: 'DRZ-2026-004',
    customerId: 'CUST-004',
    serviceId: 'SRV-01',
    serviceName: 'T-Shirt',
    serviceMode: 'PRODUCTION',
    qty: 190,
    sizeBreakdown: { S: 30, M: 70, L: 60, XL: 25, XXL: 5 },
    briefUrl: 'Spartan Stately "Natus Vincere", Sablon Plastisol Doff, Navy Blue 30s.',
    totalPrice: 190 * 58500,
    dpAmount: (190 * 58500) * 0.5,
    paidAmount: (190 * 58500) * 0.5,
    paymentStatus: 'DP_50_PAID',
    kanbanStage: 'PRINTING',
    hppTotal: 190 * 42000,
    trackingResi: '',
    shippingCarrier: 'Baraka Sarana Tama Cargo',
    createdAt: '2026-11-08 09:30',
    historyLogs: [
      { timestamp: '2026-11-08 09:30', stage: 'DESIGN', note: 'Artwork Spartan Natus Vincere disetujui.', author: 'Sales CRM' },
      { timestamp: '2026-11-09 10:00', stage: 'PRINTING', note: 'Proses sablon plastisol doff meja afdruk.', author: 'Produksi' }
    ]
  },
  {
    orderId: 'DRZ-2026-005',
    customerId: 'CUST-005',
    serviceId: 'SRV-01',
    serviceName: 'T-Shirt',
    serviceMode: 'PRODUCTION',
    qty: 77,
    sizeBreakdown: { S: 10, M: 25, L: 25, XL: 12, XXL: 5 },
    briefUrl: 'T-Shirt "Mesin Penebar Teror", Sablon Discharge Vintage, Charcoal 30s.',
    totalPrice: 77 * 61750,
    dpAmount: (77 * 61750) * 0.5,
    paidAmount: (77 * 61750) * 0.5,
    paymentStatus: 'DP_50_PAID',
    kanbanStage: 'DESIGN',
    hppTotal: 77 * 42000,
    trackingResi: '',
    shippingCarrier: 'J&T Cargo',
    createdAt: '2026-11-12 11:00',
    historyLogs: [
      { timestamp: '2026-11-12 11:00', stage: 'DESIGN', note: 'Brief masuk, pembuatan mockup alternatif.', author: 'Creative' }
    ]
  },
  {
    orderId: 'DRZ-2026-006',
    customerId: 'CUST-006',
    serviceId: 'SRV-02',
    serviceName: 'Shirt / PDH',
    serviceMode: 'PRODUCTION',
    qty: 75,
    sizeBreakdown: { S: 10, M: 25, L: 25, XL: 12, XXL: 3 },
    briefUrl: 'Kemeja PDH Mahasiswa MPD UNS, American Drill Khaki & Hitam, Bordir Komputer Tajima (75 Nickname).',
    totalPrice: 75 * 104500,
    dpAmount: (75 * 104500) * 0.5,
    paidAmount: 75 * 104500,
    paymentStatus: 'LUNAS',
    kanbanStage: 'SHIPPED',
    hppTotal: 75 * 72000,
    trackingResi: 'BST-2026-881920',
    shippingCarrier: 'Baraka Sarana Tama Cargo',
    createdAt: '2026-11-01 11:00',
    historyLogs: [
      { timestamp: '2026-11-01 11:00', stage: 'DESIGN', note: 'Desain PDH & lampiran 75 nama BEM tervalidasi.', author: 'Sales CRM' },
      { timestamp: '2026-11-04 14:00', stage: 'PRINTING', note: 'Bordir komputer Tajima presisi selesai.', author: 'Makloon Bordir' },
      { timestamp: '2026-11-07 16:00', stage: 'QC', note: 'QC passed 75 pcs, packing rasio 1:1 Drizzle.', author: 'QC Gudang' },
      { timestamp: '2026-11-10 14:00', stage: 'SHIPPED', note: 'Pesanan lunas, diserahkan ke Baraka Sarana Tama Cargo (Resi: BST-2026-881920).', author: 'Outbound SCM' }
    ]
  },
  {
    orderId: 'DRZ-2026-007',
    customerId: 'CUST-007',
    serviceId: 'SRV-01',
    serviceName: 'T-Shirt',
    serviceMode: 'PRODUCTION',
    qty: 39,
    sizeBreakdown: { S: 5, M: 15, L: 14, XL: 4, XXL: 1 },
    briefUrl: 'T-Shirt Angkatan Kelas MMXXIII, Sablon Plastisol White on Maroon Combed 30s.',
    totalPrice: 39 * 65000,
    dpAmount: (39 * 65000) * 0.5,
    paidAmount: 39 * 65000,
    paymentStatus: 'LUNAS',
    kanbanStage: 'SHIPPED',
    hppTotal: 39 * 42000,
    trackingResi: 'PICKUP-ASSO-07',
    shippingCarrier: 'Pick-Up Studio Solo',
    createdAt: '2026-10-20 13:00',
    historyLogs: [
      { timestamp: '2026-10-20 13:00', stage: 'DESIGN', note: 'Pesanan diterima.', author: 'Sales CRM' },
      { timestamp: '2026-10-27 15:30', stage: 'SHIPPED', note: 'Telah diserahkan ke perwakilan kelas di Studio Drizzle.', author: 'Outbound SCM' }
    ]
  },
  {
    orderId: 'DRZ-2026-008',
    customerId: 'CUST-008',
    serviceId: 'SRV-01',
    serviceName: 'T-Shirt',
    serviceMode: 'PRODUCTION',
    qty: 36,
    sizeBreakdown: { S: 6, M: 12, L: 12, XL: 5, XXL: 1 },
    briefUrl: 'T-Shirt Gengga "Genius" Edition, Sablon DTF High Density, Dark Grey Combed 24s.',
    totalPrice: 36 * 65000,
    dpAmount: (36 * 65000) * 0.5,
    paidAmount: (36 * 65000) * 0.5,
    paymentStatus: 'DP_50_PAID',
    kanbanStage: 'SEWING',
    hppTotal: 36 * 42000,
    trackingResi: '',
    shippingCarrier: 'Pick-Up Studio Solo',
    createdAt: '2026-11-09 15:00',
    historyLogs: [
      { timestamp: '2026-11-09 15:00', stage: 'DESIGN', note: 'Mockup disetujui pemesan.', author: 'Creative' },
      { timestamp: '2026-11-11 11:00', stage: 'PRINTING', note: 'Sablon DTF selesai, masuk ke antrean jahit.', author: 'Produksi' },
      { timestamp: '2026-11-13 14:00', stage: 'SEWING', note: 'Perakitan garmen & pemasangan label woven Drizzle.', author: 'Jahit' }
    ]
  },
  {
    orderId: 'DRZ-2026-009',
    customerId: 'CUST-009',
    serviceId: 'SRV-02',
    serviceName: 'Shirt / PDH',
    serviceMode: 'PRODUCTION',
    qty: 35,
    sizeBreakdown: { S: 5, M: 12, L: 12, XL: 5, XXL: 1 },
    briefUrl: 'PDH Pengurus Rohis SMAN 1 Surakarta, Japan Drill Putih & Hijau Sage, Bordir Logo Rohis & Nama.',
    totalPrice: 35 * 110000,
    dpAmount: (35 * 110000) * 0.5,
    paidAmount: 35 * 110000,
    paymentStatus: 'LUNAS',
    kanbanStage: 'SHIPPED',
    hppTotal: 35 * 72000,
    trackingResi: 'DLV-SMNSA-09',
    shippingCarrier: 'Kurir Internal Drizzle',
    createdAt: '2026-10-18 10:00',
    historyLogs: [
      { timestamp: '2026-10-18 10:00', stage: 'DESIGN', note: 'Approval sample kemeja.', author: 'Sales CRM' },
      { timestamp: '2026-10-26 14:00', stage: 'SHIPPED', note: 'Diantar kurir internal ke sekolah SMAN 1 Surakarta.', author: 'Outbound SCM' }
    ]
  },
  {
    orderId: 'DRZ-2026-010',
    customerId: 'CUST-010',
    serviceId: 'SRV-01',
    serviceName: 'T-Shirt',
    serviceMode: 'PRODUCTION',
    qty: 33,
    sizeBreakdown: { S: 5, M: 12, L: 10, XL: 5, XXL: 1 },
    briefUrl: 'T-Shirt Excellent Minimalist Typography, Sablon Plastisol HD, Combed 30s Sand Khaki.',
    totalPrice: 33 * 65000,
    dpAmount: (33 * 65000) * 0.5,
    paidAmount: (33 * 65000) * 0.5,
    paymentStatus: 'DP_50_PAID',
    kanbanStage: 'SEWING',
    hppTotal: 33 * 42000,
    trackingResi: '',
    shippingCarrier: 'J&T Cargo',
    createdAt: '2026-11-10 16:00',
    historyLogs: [
      { timestamp: '2026-11-10 16:00', stage: 'DESIGN', note: 'Desain disetujui.', author: 'Sales CRM' },
      { timestamp: '2026-11-12 13:00', stage: 'PRINTING', note: 'Sablon HD selesai.', author: 'Produksi' },
      { timestamp: '2026-11-14 09:30', stage: 'SEWING', note: 'Jahit rantai pundak & stik leher.', author: 'Jahit' }
    ]
  },
  {
    orderId: 'DRZ-2026-011',
    customerId: 'CUST-011',
    serviceId: 'SRV-04',
    serviceName: 'Coach Jacket',
    serviceMode: 'PRODUCTION',
    qty: 32,
    sizeBreakdown: { S: 4, M: 10, L: 12, XL: 5, XXL: 1 },
    briefUrl: 'Coach Jacket Windbreaker HSTRC, Taslan ZN Milky, Sablon Punggung A3 Plastisol White on Navy.',
    totalPrice: 32 * 135000,
    dpAmount: (32 * 135000) * 0.5,
    paidAmount: 32 * 135000,
    paymentStatus: 'LUNAS',
    kanbanStage: 'SHIPPED',
    hppTotal: 32 * 88000,
    trackingResi: 'ILC-2026-32011',
    shippingCarrier: 'Indah Logistik Cargo',
    createdAt: '2026-10-15 11:00',
    historyLogs: [
      { timestamp: '2026-10-15 11:00', stage: 'DESIGN', note: 'Pesanan coach jacket diverifikasi.', author: 'Sales CRM' },
      { timestamp: '2026-10-24 16:00', stage: 'SHIPPED', note: 'Terkirim via Indah Logistik Cargo (Resi: ILC-2026-32011).', author: 'Outbound SCM' }
    ]
  },
  {
    orderId: 'DRZ-2026-012',
    customerId: 'CUST-012',
    serviceId: 'SRV-02',
    serviceName: 'Shirt / PDH',
    serviceMode: 'PRODUCTION',
    qty: 32,
    sizeBreakdown: { S: 5, M: 12, L: 10, XL: 4, XXL: 1 },
    briefUrl: 'Kemeja PDH Pengurus Harian IMAKA Karanganyar UNDIP, Japan Drill Navy, Bordir Komputer Tajima (32 Nama).',
    totalPrice: 32 * 110000,
    dpAmount: (32 * 110000) * 0.5,
    paidAmount: 32 * 110000,
    paymentStatus: 'LUNAS',
    kanbanStage: 'SHIPPED',
    hppTotal: 32 * 72000,
    trackingResi: 'PICKUP-IMAKA-01',
    shippingCarrier: 'Pick-Up Studio Solo',
    createdAt: '2026-10-28 13:40',
    historyLogs: [
      { timestamp: '2026-10-28 13:40', stage: 'DESIGN', note: 'Approval mockup kemeja IMAKA.', author: 'Sales CRM' },
      { timestamp: '2026-11-04 10:00', stage: 'QC', note: 'QC Passed 32 pcs, finishing packing 1:1 zipper.', author: 'QC' },
      { timestamp: '2026-11-05 15:00', stage: 'SHIPPED', note: 'Pesanan telah diambil langsung oleh pengurus di studio.', author: 'Outbound SCM' }
    ]
  },
  {
    orderId: 'DRZ-2026-013',
    customerId: 'CUST-013',
    serviceId: 'SRV-09',
    serviceName: 'All-Weather Jacket',
    serviceMode: 'PRODUCTION',
    qty: 30,
    sizeBreakdown: { S: 4, M: 10, L: 10, XL: 5, XXL: 1 },
    briefUrl: 'Jacket Lapangan IATMI SM UPN Veteran Yogyakarta, Taslan Waterproof, Furing Quilting, Bordir Komputer.',
    totalPrice: 30 * 140000,
    dpAmount: (30 * 140000) * 0.5,
    paidAmount: (30 * 140000) * 0.5,
    paymentStatus: 'DP_50_PAID',
    kanbanStage: 'QC',
    hppTotal: 30 * 92000,
    trackingResi: '',
    shippingCarrier: 'J&T Cargo',
    createdAt: '2026-11-06 14:00',
    historyLogs: [
      { timestamp: '2026-11-06 14:00', stage: 'DESIGN', note: 'Pesanan jacket IATMI masuk sistem.', author: 'Sales CRM' },
      { timestamp: '2026-11-10 11:00', stage: 'SEWING', note: 'Jahit assembling & furing quilting selesai.', author: 'Jahit' },
      { timestamp: '2026-11-13 16:00', stage: 'QC', note: 'Tahap inspeksi resleting YKK & steam press.', author: 'QC' }
    ]
  },
  {
    orderId: 'DRZ-2026-014',
    customerId: 'CUST-014',
    serviceId: 'SRV-08',
    serviceName: 'Polo Shirt',
    serviceMode: 'PRODUCTION',
    qty: 30,
    sizeBreakdown: { S: 5, M: 10, L: 10, XL: 4, XXL: 1 },
    briefUrl: 'Polo Shirt Lacoste CVC Pique Black, Kerah Rajut Kuning Mustard, Bordir Dada Kiri & Lengan.',
    totalPrice: 30 * 85000,
    dpAmount: (30 * 85000) * 0.5,
    paidAmount: (30 * 85000) * 0.5,
    paymentStatus: 'DP_50_PAID',
    kanbanStage: 'SEWING',
    hppTotal: 30 * 56000,
    trackingResi: '',
    shippingCarrier: 'Pick-Up Studio Solo',
    createdAt: '2026-11-09 10:00',
    historyLogs: [
      { timestamp: '2026-11-09 10:00', stage: 'DESIGN', note: 'Desain polo shirt disetujui.', author: 'Sales CRM' },
      { timestamp: '2026-11-12 14:00', stage: 'SEWING', note: 'Pasang kerah rajut & kancing snap.', author: 'Jahit' }
    ]
  },
  {
    orderId: 'DRZ-2026-015',
    customerId: 'CUST-015',
    serviceId: 'SRV-02',
    serviceName: 'Shirt / PDH',
    serviceMode: 'PRODUCTION',
    qty: 16,
    sizeBreakdown: { S: 2, M: 6, L: 5, XL: 3, XXL: 0 },
    briefUrl: 'Seragam Kemeja Teknisi Lapangan PT Surya Nakula, American Drill Abu Tua, Bordir Logo Perusahaan (16 Nama).',
    totalPrice: 16 * 110000,
    dpAmount: (16 * 110000) * 0.5,
    paidAmount: 0,
    paymentStatus: 'UNPAID',
    kanbanStage: 'DESIGN',
    hppTotal: 16 * 72000,
    trackingResi: '',
    shippingCarrier: 'Kurir Internal Drizzle',
    createdAt: '2026-11-13 16:10',
    historyLogs: [
      { timestamp: '2026-11-13 16:10', stage: 'DESIGN', note: 'Invoice dan SPK diterbitkan, menunggu pembayaran DP.', author: 'Finance ERP' }
    ]
  },
  {
    orderId: 'DRZ-2026-016',
    customerId: 'CUST-016',
    serviceId: 'SRV-01',
    serviceName: 'T-Shirt',
    serviceMode: 'PRODUCTION',
    qty: 24,
    sizeBreakdown: { S: 4, M: 8, L: 8, XL: 4, XXL: 0 },
    briefUrl: 'T-Shirt Machine "This Story 1998 Wont End", Sablon Discharge Vintage, Heavyweight Cotton 20s.',
    totalPrice: 24 * 65000,
    dpAmount: (24 * 65000) * 0.5,
    paidAmount: (24 * 65000) * 0.5,
    paymentStatus: 'DP_50_PAID',
    kanbanStage: 'DESIGN',
    hppTotal: 24 * 42000,
    trackingResi: '',
    shippingCarrier: 'J&T Cargo',
    createdAt: '2026-11-13 10:00',
    historyLogs: [
      { timestamp: '2026-11-13 10:00', stage: 'DESIGN', note: 'Approval sample discharge vintage.', author: 'Creative' }
    ]
  },
  {
    orderId: 'DRZ-2026-017',
    customerId: 'CUST-017',
    serviceId: 'SRV-07',
    serviceName: 'Bomber Jacket',
    serviceMode: 'PRODUCTION',
    qty: 20,
    sizeBreakdown: { S: 3, M: 7, L: 7, XL: 3, XXL: 0 },
    briefUrl: 'Bomber Flight Jacket Propundt / Banana "Gaslur Let\'s Riding Together", Parasut Taslan Army Green, Furing Orange Dacron.',
    totalPrice: 20 * 165000,
    dpAmount: (20 * 165000) * 0.5,
    paidAmount: (20 * 165000) * 0.5,
    paymentStatus: 'DP_50_PAID',
    kanbanStage: 'QC',
    hppTotal: 20 * 108000,
    trackingResi: '',
    shippingCarrier: 'J&T Cargo',
    createdAt: '2026-11-04 11:00',
    historyLogs: [
      { timestamp: '2026-11-04 11:00', stage: 'DESIGN', note: 'Pesanan bomber disetujui.', author: 'Sales CRM' },
      { timestamp: '2026-11-08 14:00', stage: 'SEWING', note: 'Jahit rib elastis tebal & zipper utility lengan.', author: 'Jahit' },
      { timestamp: '2026-11-12 16:30', stage: 'QC', note: 'QC Passed, packing kemasan Drizzle 1:1 ratio.', author: 'QC' }
    ]
  }
];

// 6. INITIAL PURCHASE ORDERS (SCM & Auto-PO)
const INITIAL_PURCHASE_ORDERS = [
  {
    poId: 'PO-2026-001',
    orderId: 'DRZ-2026-001',
    materialId: 'MAT-01',
    materialName: 'Kain Cotton Combed 30s/24s',
    vendorName: 'CV Tekstil Mandiri Bandung',
    qtyOrdered: 22,
    unit: 'Roll',
    totalCost: 27500000,
    poStatus: 'RECEIVED',
    createdAt: '2026-11-02 11:00'
  },
  {
    poId: 'PO-2026-002',
    orderId: 'DRZ-2026-001',
    materialId: 'MAT-05',
    materialName: 'Polymailer & Box Packaging Drizzle',
    vendorName: 'CV Packindo Solusindo',
    qtyOrdered: 652,
    unit: 'Pcs',
    totalCost: 1630000,
    poStatus: 'RECEIVED',
    createdAt: '2026-11-02 11:30'
  },
  {
    poId: 'PO-2026-003',
    orderId: 'DRZ-2026-002',
    materialId: 'MAT-01',
    materialName: 'Kain Cotton Combed 30s/24s',
    vendorName: 'CV Tekstil Mandiri Bandung',
    qtyOrdered: 13,
    unit: 'Roll',
    totalCost: 16250000,
    poStatus: 'RECEIVED',
    createdAt: '2026-11-05 14:40'
  },
  {
    poId: 'PO-2026-004',
    orderId: 'DRZ-2026-006',
    materialId: 'MAT-02',
    materialName: 'Kain American & Japan Drill',
    vendorName: 'PT Sinar Sandang Utama',
    qtyOrdered: 3,
    unit: 'Roll',
    totalCost: 4350000,
    poStatus: 'RECEIVED',
    createdAt: '2026-11-01 13:00'
  },
  {
    poId: 'PO-2026-005',
    orderId: null,
    materialId: 'MAT-05',
    materialName: 'Polymailer & Box Packaging Drizzle',
    vendorName: 'CV Packindo Solusindo',
    qtyOrdered: 500,
    unit: 'Pcs',
    totalCost: 1250000,
    poStatus: 'DRAFT',
    createdAt: '2026-11-14 08:30'
  }
];

// 7. INITIAL FINANCE LEDGER (Buku Kas & HPP)
const INITIAL_FINANCE_LEDGER = [
  {
    txId: 'TRX-001',
    orderId: 'DRZ-2026-001',
    poId: null,
    txType: 'INCOME',
    amount: (652 * 52000) * 0.5,
    description: 'Penerimaan DP 50% Pesanan SMANKRAPFANS 1982 (652 pcs T-Shirt)',
    txDate: '2026-11-02 11:30'
  },
  {
    txId: 'TRX-002',
    orderId: null,
    poId: 'PO-2026-001',
    txType: 'EXPENSE',
    amount: 27500000,
    description: 'Pembayaran PO-2026-001 Kain Combed 22 Roll ke CV Tekstil Mandiri',
    txDate: '2026-11-02 14:00'
  },
  {
    txId: 'TRX-003',
    orderId: 'DRZ-2026-006',
    poId: null,
    txType: 'INCOME',
    amount: 75 * 104500,
    description: 'Pelunasan 100% Pesanan PDH MPD UNS (75 pcs)',
    txDate: '2026-11-10 13:00'
  },
  {
    txId: 'TRX-004',
    orderId: 'DRZ-2026-012',
    poId: null,
    txType: 'INCOME',
    amount: 32 * 110000,
    description: 'Pelunasan 100% Pesanan Kemeja IMAKA UNDIP (32 pcs)',
    txDate: '2026-11-05 14:00'
  },
  {
    txId: 'TRX-005',
    orderId: 'DRZ-2026-002',
    poId: null,
    txType: 'INCOME',
    amount: (379 * 55250) * 0.5,
    description: 'Penerimaan DP 50% Pesanan Bushwacker Finest (379 pcs T-Shirt)',
    txDate: '2026-11-05 14:45'
  },
  {
    txId: 'TRX-006',
    orderId: null,
    poId: 'PO-2026-004',
    txType: 'EXPENSE',
    amount: 4350000,
    description: 'Pembayaran PO-2026-004 Kain Drill 3 Roll ke PT Sinar Sandang Utama',
    txDate: '2026-11-01 15:00'
  }
];

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
  const srv = (db.services || []).find(s => s.serviceId === serviceId || s.name.toLowerCase() === serviceId.toLowerCase());
  if (!srv) return 65000;
  const base = srv.basePrice;

  // Volume Tier Discount
  if (totalPcs >= 650) return Math.round(base * 0.80); // 20% disc
  if (totalPcs >= 350) return Math.round(base * 0.85); // 15% disc
  if (totalPcs >= 150) return Math.round(base * 0.90); // 10% disc
  if (totalPcs >= 50) return Math.round(base * 0.95);  // 5% disc
  return base;
}

// Generate Next Order ID: DRZ-2026-XXX
function generateNextOrderId() {
  const db = getDB();
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
function generateNextPOId() {
  const db = getDB();
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
function generateNextTxId() {
  const db = getDB();
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

// Get Database from localStorage (or initialize with schema)
function getDB() {
  const raw = localStorage.getItem(DRIZZLE_SIM_DB_KEY);
  if (!raw) {
    const initData = {
      tenantConfig: DEFAULT_TENANT_CONFIG,
      services: INITIAL_SERVICES,
      materials: INITIAL_MATERIALS,
      customers: INITIAL_CUSTOMERS,
      orders: INITIAL_ORDERS,
      purchaseOrders: INITIAL_PURCHASE_ORDERS,
      financeLedger: INITIAL_FINANCE_LEDGER
    };
    saveDB(initData);
    return initData;
  }
  try {
    const data = JSON.parse(raw);
    let changed = false;

    // Ensure all 6 relational collections and tenantConfig exist
    if (!data.tenantConfig) { data.tenantConfig = DEFAULT_TENANT_CONFIG; changed = true; }
    if (!data.services || data.services.length < INITIAL_SERVICES.length) { data.services = INITIAL_SERVICES; changed = true; }
    if (!data.materials || data.materials.length === 0) { data.materials = INITIAL_MATERIALS; changed = true; }
    if (!data.customers || data.customers.length < INITIAL_CUSTOMERS.length) { data.customers = INITIAL_CUSTOMERS; changed = true; }
    if (!data.orders || data.orders.length < INITIAL_ORDERS.length) { data.orders = INITIAL_ORDERS; changed = true; }
    if (!data.purchaseOrders) { data.purchaseOrders = INITIAL_PURCHASE_ORDERS; changed = true; }
    if (!data.financeLedger) { data.financeLedger = INITIAL_FINANCE_LEDGER; changed = true; }

    if (changed) saveDB(data);
    return data;
  } catch (e) {
    console.error('Error parsing drizzle_sim_db:', e);
    const initData = {
      tenantConfig: DEFAULT_TENANT_CONFIG,
      services: INITIAL_SERVICES,
      materials: INITIAL_MATERIALS,
      customers: INITIAL_CUSTOMERS,
      orders: INITIAL_ORDERS,
      purchaseOrders: INITIAL_PURCHASE_ORDERS,
      financeLedger: INITIAL_FINANCE_LEDGER
    };
    saveDB(initData);
    return initData;
  }
}

// Save Database to localStorage
function saveDB(data) {
  try {
    localStorage.setItem(DRIZZLE_SIM_DB_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving drizzle_sim_db:', e);
  }
}

// Reset Database to Seed State
function resetDB() {
  const initData = {
    tenantConfig: DEFAULT_TENANT_CONFIG,
    services: INITIAL_SERVICES,
    materials: INITIAL_MATERIALS,
    customers: INITIAL_CUSTOMERS,
    orders: INITIAL_ORDERS,
    purchaseOrders: INITIAL_PURCHASE_ORDERS,
    financeLedger: INITIAL_FINANCE_LEDGER
  };
  saveDB(initData);
  return initData;
}

// Move Kanban Stage & Append History Log
function moveKanbanStage(orderId, newStage, note = '') {
  const db = getDB();
  const order = (db.orders || []).find(o => o.orderId === orderId || o.tracking_code === orderId);
  if (!order) return { success: false, reason: 'Order not found' };

  const validStages = ['DESIGN', 'PRINTING', 'SEWING', 'QC', 'SHIPPED'];
  if (!validStages.includes(newStage)) return { success: false, reason: 'Invalid stage' };

  const oldStage = order.kanbanStage;
  order.kanbanStage = newStage;
  if (!order.historyLogs) order.historyLogs = [];

  const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
  order.historyLogs.unshift({
    timestamp: now,
    stage: newStage,
    note: note || `Status progres pengerjaan dipindahkan dari ${oldStage} ke ${newStage}.`,
    author: 'Drizzle Admin'
  });

  // If moving into production for the first time, check material deduction
  if (['PRINTING', 'SEWING', 'QC', 'SHIPPED'].includes(newStage) && !order.materialsDeducted) {
    deductOrderMaterials(order);
  }

  saveDB(db);
  return { success: true, order };
}

// Deduct Materials with Buffer 3% and Mandatory 1:1 Packaging
function deductOrderMaterials(order) {
  const db = getDB();
  const srv = (db.services || []).find(s => s.serviceId === order.serviceId || s.name.toLowerCase() === (order.serviceName || '').toLowerCase());
  const qty = order.qty || 1;

  if (srv && srv.bomRecipe && srv.bomRecipe.length > 0) {
    srv.bomRecipe.forEach(item => {
      const mat = (db.materials || []).find(m => m.materialId === item.materialId);
      if (mat) {
        if (mat.isMandatoryPack1to1) {
          // Rule 1:1 Packaging
          mat.currentStock = Math.max(0, mat.currentStock - qty);
        } else {
          // Fabric & Chemical with 3% safety buffer
          const totalReq = Math.ceil(qty * 1.03 * item.qtyPerUnit);
          mat.currentStock = Math.max(0, mat.currentStock - totalReq);
        }
      }
    });
  }
  order.materialsDeducted = true;
  saveDB(db);
}

// Auto-PO Generator to Vendor
function createAutoPO(materialId, qtyToAdd, orderId = null) {
  const db = getDB();
  const mat = (db.materials || []).find(m => m.materialId === materialId);
  if (!mat) return { success: false, reason: 'Material not found' };

  const poId = generateNextPOId();
  const qty = qtyToAdd || Math.max(20, mat.minThreshold * 2);
  const totalCost = qty * mat.unitCost;
  const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

  const newPO = {
    poId,
    orderId,
    materialId: mat.materialId,
    materialName: mat.materialName,
    vendorName: mat.supplierName,
    qtyOrdered: qty,
    unit: mat.unit,
    totalCost,
    poStatus: 'RECEIVED', // Auto-received on restock execution
    createdAt: now
  };

  // Add stock to material
  mat.currentStock += qty;

  // Record into Finance Ledger
  const txId = generateNextTxId();
  db.financeLedger.unshift({
    txId,
    orderId: null,
    poId,
    txType: 'EXPENSE',
    amount: totalCost,
    description: `Pengadaan SCM ${qty} ${mat.unit} ${mat.materialName} (${poId})`,
    txDate: now
  });

  db.purchaseOrders.unshift(newPO);
  saveDB(db);
  return { success: true, po: newPO };
}

// Record Customer Payment (DP / Pelunasan)
function updatePaymentStatus(orderId, newStatus) {
  const db = getDB();
  const order = (db.orders || []).find(o => o.orderId === orderId || o.tracking_code === orderId);
  if (!order) return { success: false };

  order.paymentStatus = newStatus;
  const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

  if (newStatus === 'LUNAS') {
    const remaining = order.totalPrice - (order.paidAmount || 0);
    order.paidAmount = order.totalPrice;
    if (remaining > 0) {
      const txId = generateNextTxId();
      db.financeLedger.unshift({
        txId,
        orderId: order.orderId,
        poId: null,
        txType: 'INCOME',
        amount: remaining,
        description: `Pelunasan 100% Pesanan ${order.orderId} (${order.serviceName})`,
        txDate: now
      });
    }
  } else if (newStatus === 'DP_50_PAID') {
    order.paidAmount = order.dpAmount || (order.totalPrice * 0.5);
    const txId = generateNextTxId();
    db.financeLedger.unshift({
      txId,
      orderId: order.orderId,
      poId: null,
      txType: 'INCOME',
      amount: order.paidAmount,
      description: `Penerimaan DP 50% Pesanan ${order.orderId} (${order.serviceName})`,
      txDate: now
    });
  } else {
    order.paidAmount = 0;
  }

  saveDB(db);
  return { success: true, order };
}

// Update Outbound Shipping Tracking Info
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
    note: `Pesanan dikirimkan via ${carrier} dengan nomor resi/AWB: ${resi}.`,
    author: 'Outbound SCM'
  });

  saveDB(db);
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

  // Search existing customer by clean phone or exact name
  let customer = db.customers.find(c => {
    const cPhoneClean = cleanPhoneNumber(c.whatsapp);
    return (cleanPhone && cPhoneClean && cleanPhone === cPhoneClean) ||
           (name && c.name && c.name.toLowerCase() === name.toLowerCase());
  });

  const now = new Date().toISOString().split('T')[0];

  if (!customer) {
    // NEW CUSTOMER: Segment = "Instansi" (if has org) or "Baru"
    const nextNum = db.customers.length + 1;
    const custId = `CUST-${String(nextNum).padStart(3, '0')}`;
    const initialSegment = (org && org.length > 0) ? 'Instansi' : 'Baru';

    customer = {
      customerId: custId,
      name: name || 'Pelanggan Baru',
      organization: org || '',
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

    if (org && org.length > 0) {
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

  saveDB(db);
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
  getDB,
  saveDB,
  resetDB,
  formatRupiah,
  cleanPhoneNumber,
  registerOrUpdateCustomer,
  searchOrdersOrCustomer,
  calculateTieredPrice,
  generateNextOrderId,
  generateNextPOId,
  generateNextTxId,
  moveKanbanStage,
  createAutoPO,
  updatePaymentStatus,
  updateShippingInfo,
  // Helper aliases
  tenantConfig: DEFAULT_TENANT_CONFIG,
  services: INITIAL_SERVICES,
  materials: INITIAL_MATERIALS,
  customers: INITIAL_CUSTOMERS,
  orders: INITIAL_ORDERS
};

// Backward-Compatibility Alias for DrizzleStore
window.DrizzleStore = window.DrizzleApp;
