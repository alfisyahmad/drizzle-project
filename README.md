# Drizzle Project — Integrated CRM, SCM & ERP System (DrizzleOS)

Sistem manajemen operasional terintegrasi berbasis web untuk Drizzle Project (vendor merchandise, konveksi apparel custom, dan creative studio di Surakarta). Seluruh modul terhubung secara real-time menggunakan database relasional di browser (localStorage: drizzle_sim_db_clean_v1).

---

## Ringkasan Modul & Alur Sistem

* **CRM (Customer Relationship):** Auto-segmentasi klien via WhatsApp (Baru, Repeat, Instansi), katalog layanan, form pemesanan mandiri (auto-ID DRZ-2026-XXX & kalkulasi DP 50%), serta pelacakan status real-time 6 tahap.
* **SCM (Supply Chain & Gudang):** Alokasi otomatis bahan baku dan kemasan wajib 1:1 (Polymailer/Box + Thank You Card) dengan buffer +3%, peringatan stok kritis, auto-PO ke vendor (PO-2026-XXX), dan input resi pengiriman.
* **ERP (Produksi & Finance):** Papan Kanban 6 tahap (MENUNGGU_DP → DESIGN → PRINTING → SEWING → QC → SHIPPED, dengan auto-bypass ke QC untuk jasa desain), buku kas otomatis (INCOME/EXPENSE/REFUND), serta 4 KPI eksekutif.
* **Database Lokal (drizzle_sim_db_clean_v1):** Mencakup entitas services, customers, orders, materials, purchaseOrders, financeLedger, dan tenantConfig yang tersinkronisasi otomatis antar-tab.

---

## Kontak & Layanan Resmi

* **WhatsApp Resmi:** +62 895-2295-1860
* **Lokasi Studio:** Surakarta (Solo), Jawa Tengah
* **Layanan Utama:** Kaos Cotton Combed 24s, Hoodie/Crewneck, Kemeja PDH/Workshirt, Totebag/Merchandise Custom, dan Jasa Desain Grafis.
* **Status Data:** Clean slate operasional (0 transaksi awal, dilengkapi fitur reset transaksi & backup JSON).

---

## Struktur Berkas

* **index.html** — Landing page & katalog layanan
* **order.html** — Form pemesanan mandiri
* **tracking.html** — Portal pelacakan pesanan publik
* **admin.html** — Dasbor terpadu (Kanban, CRM, SCM, Finance)
* **assets/** — Aset visual & portofolio
* **js/app.js** — Core engine (Database, MRP, Finance, Sync)
* **js/tracking.js** — Logika stepper & riwayat tracking
* **schema.sql** — Referensi skema database
* **wrangler.json** — Konfigurasi Cloudflare Pages
* **PROMPT.md** — Konteks & profil bisnis Drizzle Project
* **README.md** — Dokumentasi sistem

---

## Tech Stack

* **Frontend:** HTML5 Semantic, Tailwind CSS CDN, Vanilla JavaScript (ES6)
* **Tipografi:** Inter & JetBrains Mono
* **Database & Sync:** Browser localStorage, CustomEvent, dan window.storage
* **Hosting & CI/CD:** GitHub + Cloudflare Pages (auto-deploy)

---

## Keamanan Sistem (Cybersecurity)

Aplikasi DrizzleOS telah diaudit dan diperkeras keamanannya melalui analisis kerentanan claude-security dengan 4 lapisan proteksi utama:

1. **Proteksi Anti-XSS (Output Sanitization):** Seluruh input pengguna (nama, instansi, nomor WhatsApp, alamat, catatan, serta detail item pesanan) disanitasi menggunakan fungsi escapeHTML pada rendering dashboard admin maupun halaman pelacakan pelanggan untuk mencegah injeksi skrip berbahaya.
2. **Gerbang Autentikasi Admin (PIN Gate):** Akses ke halaman admin.html dilindungi layar otorisasi PIN berbasis sessionStorage serta tombol Kunci Admin pada header console. PIN demo presentasi: DRZ2026.
3. **Validasi Input & Safe Storage:** Form pemesanan menerapkan validasi ketat (kuantitas minimal 1 pcs, batas panjang karakter pada seluruh kolom input, dan validasi format nomor WhatsApp), sementara pembacaan maupun penyimpanan localStorage dibungkus blok try-catch untuk mencegah kegagalan akibat data korup.
4. **HTTP Security Headers (Cloudflare Pages):** Konfigurasi header _headers aktif di root proyek meliputi X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy, serta Content-Security-Policy yang membatasi sumber skrip, gaya, dan font hanya ke origin resmi (self, Tailwind CSS CDN, dan Google Fonts).

---

## Tim Pengembang (Kelompok 7)

* **Alfi Syahrin Ramadhan** (12010225140068) — Full-Stack Development, Database & Deployment
- **Muhammad Rozaki** (12010225140078) — System Analysis, Business Process & Testing
* **Dewa Arungjiwa Mahardika** (12010225140093) — UI/UX Design & Quality Assurance
* **Brocklyn Diga Pratama** (12010225140080) — Documentation & Data Modeling


---

Status Verifikasi UAT: Seluruh alur logika bisnis CRM, SCM Gudang, ERP Kanban 6-tahap, kalkulasi MRP bahan & kemasan 1:1, serta pelacakan pesanan real-time telah diuji secara menyeluruh dan diverifikasi lulus UAT oleh Muhammad Rozaki.