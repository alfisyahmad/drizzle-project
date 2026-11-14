# Drizzle Project — Integrated Order & Studio Management System

Web-based Order & Studio Management System untuk **Drizzle Project** (Vendor merchandise, konveksi apparel custom, dan jasa desain kreatif & branding).

## 🚀 Fitur Utama
- **Modul CRM (*Customer Relationship Management*)**: Digitalisasi interaksi klien organisasi/komunitas, form pemesanan mandiri (12 kategori apparel & 7 layanan desain kreatif/branding), pelacakan progres real-time, dan fitur *Repeat Order* 1-klik.
- **Modul ERP (*Enterprise Resource Planning*)**: Pengelolaan pesanan terpadu, matrix ukuran S–XXL, kontrol kuota revisi pra-produksi (maks. 3x), alur 6 tahap produksi makloon & QC, pencetakan lembar kerja SPK, serta kalkulasi termin pembayaran & HPP.
- **Modul SCM (*Supply Chain Management*)**: Direktori pemasok & mitra makloon, kalkulasi kebutuhan material otomatis (*MRP* dengan *buffer* 3% & *packaging* 1:1), draf *Purchase Order (PO)*, kontrol gudang (*Inbound QC* & *Goods Issue*), serta integrasi nomor resi kargo *outbound*.

## 🤝 Rancangan Modul CRM (Drizzle Project)
Modul CRM mendigitalisasi alur interaksi klien (organisasi kampus, komunitas, dan perusahaan) untuk menggantikan pendataan pesanan melalui chat grup WhatsApp:

1. **Manajemen Pelanggan & Segmentasi (*Customer Database*):** Menyimpan database PIC, nama instansi/komunitas, kontak WhatsApp, dan alamat pengiriman secara terpusat untuk mendukung kebutuhan lintas periode kepengurusan.
2. **Katalog Layanan & Portofolio (*Service Portal*):** Menyajikan 12 kategori apparel custom (*all product include packaging*) dan 7 layanan *creative & brand consultancy* beserta portofolio produksi riil Drizzle Project.
3. **Pengajuan Pesanan Mandiri (*Self-Service Order Entry*):** Menyediakan formulir dinamis untuk input *matrix* ukuran S–XXL, daftar *nickname*/divisi PDH, pengajuan *alternative design*, maupun *brief* konsultasi brand dengan penerbitan kode tracking otomatis (`DRZ-2026-XXX`).
4. **Pelacakan Progres Real-Time (*Order Tracking*):** Memungkinkan klien memantau status pembayaran (DP/Lunas), progres produksi 6 tahap dari ERP, serta nomor resi pengiriman dari SCM tanpa perlu bertanya manual di grup chat.
5. **Riwayat Pesanan & Retensi (*Order History & Reorder*):** Mengarsipkan spesifikasi desain dan ukuran proyek terdahulu untuk mempermudah pemesanan ulang (*repeat order*) satu klik.

## 🏢 Rancangan Modul ERP (5 Sub-Modul Terintegrasi)
1. **Penjualan (*Sales & Order Management*):** Mengelola 12 kategori produk apparel (matrix ukuran S–XXL & daftar *nickname*/divisi PDH) dan paket jasa kreatif studio, skema *tiered pricing* (16 hingga 650+ pcs), serta penerbitan kode tracking otomatis.
2. **Pra-Produksi (*Design & Sampling*):** Mengatur alur pengajuan *alternative designs*, kontrol batas kuota revisi (maks. 3x), serta persetujuan *sample* sebelum Surat Perintah Kerja (SPK) diterbitkan.
3. **Produksi & QC (*Production Pipeline & Makloon*):** Memantau pengerjaan 6 tahap (*Design Approved -> DP Verified -> Potong & Bahan -> Sablon/Bordir -> Jahit & QC -> Packaging & Siap Kirim*), pembagian vendor *makloon*, dan pencatatan hasil QC (*passed* vs *reject*).
4. **Persediaan (*Inventory & Packaging - SCM*):** Mengontrol stok kain roll, perlengkapan sablon/bordir, *buffer* bahan 3%, serta stok wajib *packaging* (rasio 1:1 per produk) yang otomatis terpotong saat pesanan masuk produksi.
5. **Keuangan (*Finance & HPP*):** Mengelola termin pembayaran klien (DP 50% dan pelunasan), menghitung Harga Pokok Produksi (HPP) per proyek, serta menyajikan rekapitulasi kas masuk, piutang, dan laba bersih.

## 📦 Rancangan Modul SCM (Drizzle Project)
Modul SCM mengelola aliran material dan distribusi dari pemasok hingga ke tangan klien untuk mendukung produksi 12 lini apparel custom Drizzle Project melalui 5 pilar terpadu:

1. **Manajemen Pemasok & Mitra Makloon (*Supplier & Vendor*):** Mengelola database pemasok kain (*Combed, Drill, Fleece, Taslan*), aksesoris, *Drizzle Packaging*, serta mitra *makloon* (sablon, bordir, jahit) untuk menopang pesanan skala kecil maupun massal (16 hingga 650+ pcs).
2. **Perencanaan Material (*MRP*):** Menghitung otomatis kebutuhan bahan baku dari setiap SPK ERP lengkap dengan *buffer* toleransi cacat 3% dan rasio wajib kemasan 1:1 (*all product include packaging*).
3. **Pengadaan (*Procurement & PO*):** Menerbitkan draf *Purchase Order (PO)* otomatis saat stok menyentuh batas minimum dan menghubungkan biaya pembelian ke pencatatan HPP modul Keuangan ERP.
4. **Manajemen Gudang (*Warehouse Control*):** Mencatat pemeriksaan kualitas bahan masuk (*Inbound QC*) dan alokasi pengeluaran bahan per kode pesanan (`Goods Issue`).
5. **Logistik & Distribusi (*Outbound Fulfillment*):** Mengatur serah terima atau pengiriman kargo setelah status pembayaran lunas serta menyinkronkan nomor resi langsung ke halaman *Order Tracking* pelanggan.

## 🛠️ Tech Stack
- **Frontend**: HTML5, Tailwind CSS, JavaScript (ES6)
- **Storage & Schema**: Browser localStorage (`drizzle_integrated_db`)
- **Development Tool**: Antigravity AI
- **Deployment**: Cloudflare Workers & Pages via GitHub Repository

## 📁 Struktur Proyek
```plaintext
drizzle-project/
├── index.html          # Landing Page & Katalog Studio
├── order.html          # Form Pemesanan Terpadu (Apparel & Desain)
├── tracking.html       # Portal Lacak Status Pesanan Pelanggan
├── admin.html          # Dashboard ERP & SCM Terintegrasi
├── assets/             # Gambar portofolio & aset Drizzle
├── js/
│   └── store.js        # Pusat Data Terintegrasi (drizzle_integrated_db)
├── schema.sql          # Skema database relasional
├── wrangler.json       # Konfigurasi deployment Cloudflare
├── PROMPT.md           # Panduan konteks resmi Drizzle Project
└── README.md
```
