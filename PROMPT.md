# Project Context: Drizzle Project SaaS (Integrasi CRM, ERP & SCM)

## Overview & Mitra
- Mitra: Drizzle Project (Custom Merchandise & Apparel)
- Kontak Resmi: WhatsApp +62 882-0075-46920 | Email: drizzlethelabel@gmail.com | Instagram: @drizzleproject
- Tujuan SIM: Sistem SaaS terintegrasi antara CRM (pelanggan), ERP (pesanan & produksi), dan SCM (bahan baku & vendor) sehingga setiap perubahan data saling terhubung secara real-time di localStorage.

## 1. Komponen Front-End & CRM Portal (index.html, order.html, tracking.html)
- Katalog Produk (11 Item): T-Shirt, Kemeja/PDH, Hoodie, Polo, Jacket, Coach, Vest, Varsity, Bomber, Lanyard, Tote Bag.
- Layanan Pendukung: Design, Merchandising Consultant, Brand Identity.
- Form Pemesanan Custom (order.html): Input identitas (Nama, Instansi/Komunitas, No. WA, Email), pilihan produk, breakdown ukuran (S, M, L, XL, XXL), upload file mockup/logo, spesifikasi sablon (DTF/Plastisol)/bordir komputer/warna kain. Generate kode unik (contoh: DRZ-2026-001).
- Order Tracking (tracking.html): Lacak via kode pesanan dengan 6 tahap timeline visual:
  1. Design Approved
  2. Down Payment (DP)
  3. Bahan & Potong
  4. Sablon/Bordir
  5. Jahit & Finishing
  6. Siap Kirim/Ambil
- Portal Contact & FAQ: Tombol cepat menuju WhatsApp (+62 882-0075-46920), Email (drizzlethelabel@gmail.com), dan Instagram (drizzleproject).

## 2. Komponen Back-End Admin: ERP & SCM (admin.html)
- Order Management ERP: Tabel rekap pesanan masuk dengan filter status (Pending, In Production, Completed, Cancelled), tombol verifikasi pembayaran (DP & Pelunasan), serta fitur cetak/print lembar kerja produksi (Work Order / SPK) otomatis.
- Production Pipeline (Kanban Board): Tampilan papan kanban interaktif (drag-and-drop atau pindah tahap cepat) antarseksi produksi untuk memantau bottleneck pengerjaan.
- Manajemen Pasokan & Vendor (SCM / Inventory): Pencatatan stok bahan baku utama (Kain Roll, Benang, Kancing, Zipper, Kemasan/Packaging) dan daftar vendor/supplier beserta status pemesanan material (PO ke supplier).

## 3. Aturan Uji Integrasi (CRM <-> ERP <-> SCM)
- CRM -> ERP: Pesanan baru dari order.html otomatis masuk ke tabel ERP (admin.html) dan muncul di tracking.html.
- ERP -> SCM: Saat admin memverifikasi DP atau memindahkan status pesanan ke tahap "Bahan & Potong" / "In Production", stok bahan baku di modul SCM otomatis berkurang sesuai jumlah pcs pesanan, dan log aktivitas integrasi tercatat.
- SCM -> ERP: Restock material dari vendor di tab SCM langsung menambah ketersediaan stok bahan baku untuk produksi.

## 4. Database Schema Structure (localStorage & schema.sql)
1. Customers: customer_id, name, organization, phone, email
2. Products: product_id, category_name, base_price
3. Orders: order_id, customer_id, total_pcs, status_payment, order_status, tracking_code, created_at
4. Order_Details: detail_id, order_id, product_id, size_breakdown (JSON), mockup_url, notes
5. Production_Logs: log_id, order_id, stage_name, updated_at
6. Materials_SCM: material_id, material_name, unit, stock_qty, min_stock, supplier_name, restock_status
