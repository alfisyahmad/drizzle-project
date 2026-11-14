# Drizzle Project — Integrated CRM, SCM & ERP Studio Management System

Web-based Order, Supply Chain & Enterprise Resource Planning System untuk **Drizzle Project** (Vendor merchandise, konveksi apparel custom, dan creative studio berbasis di Surakarta, Solo).

## 🚀 Ringkasan Modul Terintegrasi (DrizzleOS)

Sistem mengintegrasikan 3 pilar operasional studio ke dalam satu database relasional browser (`localStorage` key: `drizzle_sim_db`) dengan palet warna studio hangat (*Warm Studio Light Theme*: Canvas `#FAF7F4`, Card `#FFFFFF`, Brand Orange `#FF791D`, Dark `#33302D`):

### 1. 👥 Modul CRM (Customer Relationship Management)
- **Deteksi Pelanggan Otomatis via WhatsApp:** Pencocokan nomor WhatsApp otomatis saat pemesanan; menentukan segmen secara dinamis (*Baru*, *Repeat*, atau *Instansi* jika menyertakan nama organisasi) serta mengakumulasi total belanja.
- **Katalog Layanan & Portofolio:** Menyajikan 12 lini custom apparel (*Cotton Combed, Drill, Fleece, Taslan*) dan 7 layanan *creative design & branding* lengkap dengan 17 rekap proyek klien nyata.
- **Formulir Pemesanan Mandiri (`order.html`):** Input matrix ukuran S–XXL, brief teknis, pemilihan ekspedisi kargo, serta otomatisasi penetapan tagihan DP 50% dan kode pesanan berurutan (`DRZ-2026-XXX`).
- **Portal Tracking Publik (`tracking.html`):** Pencarian real-time via Kode Order atau Nomor WhatsApp dengan visualisasi stepper 6 tahap, timeline log riwayat produksi, status pembayaran, dan tombol reorder 1-klik.
- **Direktori Pelanggan CRM (`admin.html`):** Tabel direktori seluruh klien lengkap dengan filter segmen, statistik transaksi, dan riwayat pesanan per klien.

### 2. 📦 Modul SCM (Supply Chain Management)
- **Kalkulasi MRP & Aturan Wajib Kemasan 1:1:** Setiap 1 unit produk apparel fisik otomatis mengalokasikan 1 unit Polymailer/Box Drizzle (`MAT-05`) dan 1 unit Thank You Card (`MAT-06`), ditambah buffer toleransi bahan baku 3%. Layanan desain (*DESIGN_ONLY*) otomatis membypass pemotongan fisik.
- **Kontrol Inventaris Gudang:** Monitoring stok bahan baku (*Cotton Combed Roll, American Drill, Cotton Fleece, Tinta DTF/Plastisol*) dan indikator stok kritis (`currentStock <= minThreshold`).
- **Auto-Procurement Purchase Order (PO):** Penerbitan PO otomatis ke vendor rekanan saat stok menipis (`PO-2026-XXX`). Fitur *Receive PO* otomatis menambah stok gudang, mencatat pengeluaran (*EXPENSE*) ke Buku Kas, dan menambah HPP pesanan terkait.
- **Outbound Logistics & Fulfillment:** Form input nomor resi kurir (J&T Cargo, Baraka Sarana Tama, Lion Parcel, dll) untuk pesanan yang telah lolos QC dan berstatus LUNAS. Resi otomatis tersinkronisasi ke portal lacak pelanggan.

### 3. 🏢 Modul ERP (Enterprise Resource Planning & Finance)
- **Verifikasi Pembayaran Cepat:** Tombol aksi pada tiket order untuk verifikasi *DP 50%* dan *Pelunasan 50%*, yang otomatis mencatat arus kas masuk (*INCOME*) ke Buku Kas dan memajukan status pesanan.
- **Papan Kanban Produksi (6 Tahap):**
  1. `MENUNGGU_DP` (Menunggu Pembayaran DP 50%)
  2. `DESIGN` (Desain & Brief Mockup Approval)
  3. `PRINTING` (Sablon DTF/Plastisol & Bordir Komputer)
  4. `SEWING` (Jahit & Assembly Garmen)
  5. `QC` (Quality Control & Kemasan 1:1)
  6. `SHIPPED` (Siap Kirim / Terkirim)
  - *Bypass Otomatis:* Pesanan dengan mode `DESIGN_ONLY` otomatis melompati tahap Sablon dan Jahit langsung ke QC.
  - Setiap pemindahan tahap kartu otomatis mencatat riwayat log dengan timestamp ke `historyLogs`.
- **Buku Kas & Analisis HPP (Finance Ledger):**
  - Jurnal transaksi arus kas masuk (`INCOME`) dari termin pembayaran klien vs arus kas keluar (`EXPENSE`) dari penerimaan PO vendor.
  - Analisis margin laba kotor, perbandingan nilai jual terhadap Harga Pokok Produksi (HPP/COGS), dan persentase laba per proyek.
- **Dasbor Ringkasan Eksekutif (4 KPI Dinamis):**
  1. *Total Order Aktif* (jumlah proyek aktif & akumulasi volume pcs)
  2. *Total Omzet Masuk (Rp)* (realisasi kas masuk & piutang klien)
  3. *Jumlah Material Stok Kritis* (indikator bahan menipis & stok kemasan 1:1)
  4. *Persentase Margin Keuntungan Bersih* ($\frac{\text{Kas Masuk} - \text{Kas Keluar}}{\text{Kas Masuk}} \times 100\%$)

---

## 🛠️ Tech Stack & Arsitektur Database

- **Frontend**: HTML5 Semantic, Tailwind CSS (CDN), Vanilla JavaScript (ES6 Modules)
- **Database Architecture**: Browser `localStorage` (`drizzle_sim_db`) dengan 6 koleksi relasional:
  - `services` (PK: `serviceId` SRV-XX, kategori, harga dasar, HPP, resep BOM)
  - `customers` (PK: `customerId` CUST-XXX, nama, WhatsApp, segmen, akumulasi belanja)
  - `orders` (PK: `orderId` DRZ-2026-XXX, FK: `customerId`, `serviceId`, mode, DP, HPP, resi, log)
  - `materials` (PK: `materialId` MAT-XX, stok gudang, batas aman, rasio kemasan 1:1)
  - `purchaseOrders` (PK: `poId` PO-2026-XXX, FK: `orderId`, `materialId`, vendor, status PO)
  - `financeLedger` (PK: `txId` TRX-XXX, FK: `orderId`, `poId`, tipe INCOME/EXPENSE, nominal)
  - `tenantConfig` (Konfigurasi identitas multi-tenant Drizzle Project Studio Solo)
- **Design Philosophy**: *"Warm Studio Light Theme"* (Palet warna hangat studio konveksi, tipografi Inter & JetBrains Mono, border halus, responsive mobile-first)

---

## 📁 Struktur Berkas

```plaintext
drizzle-project/
├── index.html          # Landing Page Studio, Portofolio Klien, & Quick Catalog
├── order.html          # Form Pemesanan Mandiri, Kalkulator Matrix Ukuran & DP
├── tracking.html       # Portal Lacak Status Pesanan (Order ID & WhatsApp)
├── admin.html          # Pusat Kendali Terpadu (Kanban 6 Tahap, CRM, SCM, & Buku Kas)
├── assets/             # Aset portofolio & identitas visual studio
├── js/
│   ├── app.js          # Core SaaS Engine, Database Relasional, Kalkulasi MRP & Finance
│   └── tracking.js     # Tracking Engine, Stepper 6 Tahap, & History Timeline
├── schema.sql          # Blueprint skema database relasional (PostgreSQL/SQLite)
├── wrangler.json       # Konfigurasi deployment Cloudflare Pages / Workers
├── PROMPT.md           # Master context & profil resmi Drizzle Project
└── README.md           # Dokumentasi teknis sistem terpadu CRM, SCM & ERP
```
