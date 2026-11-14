# Drizzle Project — Integrated Order & Studio Management System

Web-based Order & Studio Management System untuk **Drizzle Project** (Vendor merchandise, konveksi apparel custom, dan jasa desain kreatif & branding).

## 🚀 Fitur Utama
- **Public Catalog & Unified Order Form**: Pemesanan konveksi apparel (12 item produk lengkap dengan rincian ukuran S–XXL) serta pemesanan jasa desain kreatif & konsultasi brand.
- **Customer Order Tracking**: Pelacakan status pengerjaan secara real-time menggunakan Kode Tracking unik (`DRZ-2026-XXX`) dengan visual 6 tahapan progres.
- **Admin ERP & SCM Dashboard**: Pengelolaan pesanan masuk, verifikasi status pembayaran (DP & Lunas), pencetakan Surat Perintah Kerja (SPK), serta pengurangan otomatis stok bahan baku & kemasan saat pesanan masuk produksi.

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
