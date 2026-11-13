# Drizzle Project - Order Management & Tracking System

Web-based Order Management & Tracking System untuk **Drizzle Project** (Vendor custom merchandise: T-Shirt, PDH/Shirt, Hoodie, Coach, Vest, Varsity, Bomber, Lanyard, Tote Bag).

## 🚀 Fitur Utama
- **Public Catalog & Custom Order Form**: Pemesanan custom merchandise lengkap dengan breakdown ukuran dan upload desain mockup.
- **Customer Order Tracking**: Pelacakan status produksi menggunakan Kode Pesanan unik (e.g. `DRZ-2026-001`) dengan timeline visual.
- **Admin ERP & Production Dashboard**: Pengelolaan pesanan masuk, verifikasi DP/pembayaran, dan update progres produksi secara *real-time*.

## 🛠️ Tech Stack
- **Frontend**: HTML5, Tailwind CSS, JavaScript (ES6)
- **Deployment**: Cloudflare Pages via GitHub Repository

## 📁 Struktur Proyek
```plaintext
drizzle-project/
├── index.html          # Landing Page & Katalog Produk
├── order.html          # Form Pemesanan Custom Merchandise
├── tracking.html       # Portal Lacak Pesanan Pelanggan
├── admin.html          # Dashboard ERP & Pipeline Produksi Internal
├── assets/             # Gambar portofolio / logo Drizzle
├── js/
│   ├── app.js          # Navigasi & interaksi UI
│   └── tracking.js     # Logika pencarian status pesanan
├── wrangler.json       # Konfigurasi deployment Cloudflare
├── PROMPT.md           # File konteks untuk AntiGravity + Z Code
└── README.md
```
