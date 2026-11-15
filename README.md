# Drizzle Project — Integrated CRM, SCM & ERP System (DrizzleOS)

Sistem manajemen operasional terintegrasi berbasis web untuk **Drizzle Project** (vendor *merchandise*, konveksi *apparel custom*, dan *creative studio* di Surakarta, Solo). Seluruh modul terhubung secara *real-time* menggunakan satu database relasional di browser (`localStorage`: `drizzle_sim_db`).

---

## Ringkasan Modul Terintegrasi

| Modul | Fitur & Aturan Otomatisasi Utama |
| :--- | :--- |
| **CRM**<br>*(Customer Relationship)* | • **Auto-Segmentasi Klien:** Deteksi nomor WhatsApp otomatis (`Baru`, `Repeat`, atau `Instansi`).<br>• **Katalog & Portofolio:** 12 lini *custom apparel*, 7 layanan *creative design*, dan 17 rekap proyek klien.<br>• **Self-Service Order (`order.html`):** Input matriks ukuran (S–XXL), *brief*, kurir, auto-ID `DRZ-2026-XXX`, dan hitung DP 50%.<br>• **Live Tracking (`tracking.html`):** Lacak status via kode order / WhatsApp dengan *stepper* 6 tahap & riwayat log. |
| **SCM**<br>*(Supply Chain & Gudang)* | • **MRP & Kemasan Wajib 1:1:** Setiap 1 unit produk fisik otomatis mengalokasikan `1 Polymailer/Box` + `1 Thank You Card` (+3% *buffer* bahan). Mode `DESIGN_ONLY` otomatis melewati pemotongan stok.<br>• **Kontrol Stok & Auto-PO:** Peringatan stok kritis (`currentStock <= minThreshold`) dan penerbitan `PO-2026-XXX` otomatis ke vendor.<br>• **Outbound Logistics:** Input nomor resi (J&T Cargo, Baraka, Lion Parcel, dll.) untuk order lolos QC & lunas. |
| **ERP**<br>*(Produksi & Finance)* | • **Kanban Produksi 6 Tahap:** `MENUNGGU_DP` → `DESIGN` → `PRINTING` → `SEWING` → `QC` → `SHIPPED` (*auto-bypass* ke QC untuk jasa desain murni).<br>• **Buku Kas & HPP:** Verifikasi DP/Pelunasan (`INCOME`), pencatatan PO (`EXPENSE`), dan kalkulasi margin laba bersih.<br>• **4 KPI Eksekutif:** Total Order Aktif, Omzet Masuk, Material Stok Kritis, dan Margin Keuntungan (%). |

---

## Struktur Halaman & Arsitektur Database

### Antarmuka (Warm Studio Light Theme)

| Halaman | Fungsi |
| :--- | :--- |
| `index.html` | Landing page — Katalog layanan & portofolio proyek klien |
| `order.html` | Form pemesanan mandiri — Matriks ukuran, brief, kalkulasi DP |
| `tracking.html` | Portal lacak publik — Stepper 6 tahap & timeline historyLogs |
| `admin.html` | Dasbor terpadu — Kanban, CRM, SCM, Buku Kas, KPI Eksekutif |

> **Palet Warna:** Canvas `#FAF7F4` · Card `#FFFFFF` · Brand Orange `#FF791D` · Dark Charcoal `#33302D`

### Skema Database (`drizzle_sim_db`)

| Koleksi | PK | Deskripsi |
| :--- | :--- | :--- |
| `services` | `SRV-XX` | Katalog layanan, kategori, harga dasar, HPP, dan resep BOM |
| `customers` | `CUST-XXX` | Profil klien, nomor WhatsApp, segmen otomatis, akumulasi transaksi |
| `orders` | `DRZ-2026-XXX` | Transaksi utama, mode layanan, status pembayaran, tahap Kanban, resi, `historyLogs` |
| `materials` | `MAT-XX` | Inventaris bahan baku, batas stok aman, flag kemasan wajib 1:1 |
| `purchaseOrders` | `PO-2026-XXX` | Pengadaan bahan baku ke vendor rekanan & sinkronisasi stok masuk |
| `financeLedger` | `TRX-XXX` | Jurnal arus kas masuk (`INCOME`) dan keluar (`EXPENSE`) |
| `tenantConfig` | — | Konfigurasi identitas studio (kesiapan arsitektur *multi-tenant* SaaS) |

---

## Arsitektur Real-Time Reactive State Engine

Seluruh modul terhubung melalui **`saveAndSyncDB()`** — fungsi tunggal yang:
1. Menyimpan perubahan ke `localStorage` (`drizzle_sim_db`)
2. Menerbitkan `CustomEvent('drizzle:sync')` untuk listener di tab yang sama
3. Menangkap `window.addEventListener('storage', ...)` untuk sinkronisasi lintas tab browser

```
order.html ──[submit]──► app.js: saveAndSyncDB()
                               │
                 ┌─────────────┼──────────────────┐
                 ▼             ▼                   ▼
          drizzle:sync    localStorage         storage event
          (same-tab)      drizzle_sim_db      (cross-tab)
                 │                                 │
         admin.html                         tracking.html
         renderAll()                        renderOrderView()
```

### 5 Rantai Trigger End-to-End

| # | Trigger | Efek Otomatis |
| :- | :--- | :--- |
| 1 | **CRM Order Baru** (`order.html` submit) | Buat tiket `orders`, perbarui/buat profil `customers`, kartu masuk kolom `MENUNGGU_DP` di Kanban |
| 2 | **ERP Verifikasi DP 50%** | Catat `INCOME` ke `financeLedger`, jalankan MRP (`deductOrderMaterials`), potong stok + kemasan 1:1, auto-PO jika kurang |
| 3 | **SCM Terima Barang PO** | Stok gudang bertambah, catat `EXPENSE`, hitung ulang `hppTotal` order, lepas blokir `waitingPO` |
| 4 | **ERP Geser Tahap Kanban** | Tambah log timestamp ke `historyLogs`, stepper & timeline `tracking.html` bergerak real-time |
| 5 | **ERP Verifikasi Lunas + Input Resi** | Status `SHIPPED`, nomor resi live di `tracking.html`, order selesai |

---

## Struktur Berkas

```
drizzle-project/
├── index.html          # Landing page — Katalog & Portofolio Klien
├── order.html          # Form Pemesanan Mandiri (Matriks Ukuran, DP, Brief)
├── tracking.html       # Portal Lacak Publik (Order ID & WhatsApp)
├── admin.html          # Dasbor Terpadu (Kanban 6 Tahap, CRM, SCM, Buku Kas)
├── assets/             # Aset portofolio & identitas visual studio
├── js/
│   ├── app.js          # Core Engine: DB relasional, MRP, Finance, Reactive Sync
│   └── tracking.js     # Tracking Engine: Stepper 6 tahap & History Timeline
├── schema.sql          # Blueprint skema database (PostgreSQL/SQLite reference)
├── wrangler.json       # Konfigurasi deployment Cloudflare Pages / Workers
├── PROMPT.md           # Master context & profil resmi Drizzle Project
└── README.md           # Dokumentasi teknis sistem terpadu CRM, SCM & ERP
```

---

## Tech Stack

- **Frontend:** HTML5 Semantic, Tailwind CSS CDN, Vanilla JavaScript (ES6)
- **Tipografi:** Inter & JetBrains Mono (`tabular-nums`)
- **State Management:** Browser `localStorage` + `CustomEvent` + `window.storage`
- **Hosting & CI/CD:** GitHub + Cloudflare Pages (*auto-deploy on push*)
