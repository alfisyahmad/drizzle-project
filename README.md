# Drizzle Project — Integrated Order & Studio Management System

Web-based Order & Studio Management System untuk **Drizzle Project** (Vendor merchandise, konveksi apparel custom, dan jasa desain kreatif & branding).

## 🚀 Fitur Utama
- **Public Catalog & Unified Order Form**: Pemesanan konveksi apparel (12 item produk lengkap dengan rincian ukuran S–XXL) serta pemesanan jasa desain kreatif & konsultasi brand.
- **Customer Order Tracking**: Pelacakan status pengerjaan secara real-time menggunakan Kode Tracking unik (`DRZ-2026-XXX`) dengan visual 6 tahapan progres.
- **Admin ERP & SCM Dashboard**: Pengelolaan pesanan masuk, verifikasi status pembayaran (DP & Lunas), pencetakan Surat Perintah Kerja (SPK), serta pengurangan otomatis stok bahan baku & kemasan saat pesanan masuk produksi.

## 🏢 Rancangan Modul ERP (5 Sub-Modul Terintegrasi)
1. **Penjualan (*Sales & Order Management*):** Mengelola 12 kategori produk apparel (matrix ukuran S–XXL & daftar *nickname*/divisi PDH) dan paket jasa kreatif studio, skema *tiered pricing* (16 hingga 650+ pcs), serta penerbitan kode tracking otomatis.
2. **Pra-Produksi (*Design & Sampling*):** Mengatur alur pengajuan *alternative designs*, kontrol batas kuota revisi (maks. 3x), serta persetujuan *sample* sebelum Surat Perintah Kerja (SPK) diterbitkan.
3. **Produksi & QC (*Production Pipeline & Makloon*):** Memantau pengerjaan 6 tahap (*Design Approved -> DP Verified -> Potong & Bahan -> Sablon/Bordir -> Jahit & QC -> Packaging & Siap Kirim*), pembagian vendor *makloon*, dan pencatatan hasil QC (*passed* vs *reject*).
4. **Persediaan (*Inventory & Packaging - SCM*):** Mengontrol stok kain roll, perlengkapan sablon/bordir, *buffer* bahan 3%, serta stok wajib *packaging* (rasio 1:1 per produk) yang otomatis terpotong saat pesanan masuk produksi.
5. **Keuangan (*Finance & HPP*):** Mengelola termin pembayaran klien (DP 50% dan pelunasan), menghitung Harga Pokok Produksi (HPP) per proyek, serta menyajikan rekapitulasi kas masuk, piutang, dan laba bersih.

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
