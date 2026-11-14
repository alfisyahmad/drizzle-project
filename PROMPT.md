# Project Context: Drizzle Project — Integrated Order & Studio Management System

## Identitas Mitra (Sesuai Company Profile Resmi)
- Nama Brand: Drizzle Project (Drizzle)
- Kontak: WA +62 882-0075-46920 | Email: drizzlethelabel@gmail.com | IG: @drizzleproject
- Filosofi: "Customize Your Merchandise — We Handle What You Need" & "Human Help Human" (semua produk sudah termasuk packaging).
- Lini Bisnis Utama:
  1. **Vendor Merchandise & Konveksi Apparel Custom**: T-Shirt, Shirt/PDH, Hoodie, Coach, Vest, Varsity, Bomber, Polo, Jacket, Hat, Lanyard, Tote Bag.
  2. **Jasa Desain Kreatif & Konsultasi Brand**: Merchandising Consultant, Brand Identities, Graphic Design, Infographic, Editorial Layout, Digital Media, Content Plan & Social Media Management.

## Arahan Desain UI/UX (Wajib Simple & Minimalis)
- Gaya: **Clean Studio Minimalist**
  - Latar: Putih `#FFFFFF` & abu-abu lembut `#F8FAFC`
  - Teks: Gelap `#18181B` & subteks `#71717A`
  - Aksen Utama: Oranye `#FF791D`
  - Garis / Border: Halus `#E4E4E7`
- Larangan: Dilarang menggunakan tema gelap/cyberpunk/motorsport atau paragraf panjang yang bertele-tele.
- Navigasi ringkas dan konsisten di seluruh halaman:
  1. Beranda & Katalog (`index.html`)
  2. Buat Pesanan (`order.html`)
  3. Lacak Pesanan (`tracking.html`)
  4. Dashboard Admin ERP & SCM (`admin.html`)

## Rancangan Modul ERP (Drizzle Project)

Modul ERP mengintegrasikan lima sub-modul operasional internal untuk mengelola layanan **Konveksi Apparel & Merchandise Custom** serta **Jasa Desain Kreatif & Konsultasi Brand**:

1. **Penjualan (*Sales & Order Management*):**
   - Mengelola pesanan dari 12 kategori produk apparel (termasuk *matrix* ukuran S–XXL dan daftar *nickname*/divisi untuk PDH) maupun paket jasa kreatif.
   - Skema *tiered pricing* (16 hingga 650+ pcs) dengan penerbitan kode tracking otomatis (`DRZ-2026-XXX`).
2. **Pra-Produksi (*Design & Sampling*):**
   - Mengatur alur pengajuan *alternative designs*.
   - Batas kuota revisi desain (maks. 3x).
   - Persetujuan *sample* fisik/digital sebelum Surat Perintah Kerja (SPK) diterbitkan.
3. **Produksi & QC (*Production Pipeline & Makloon*):**
   - Memantau pengerjaan 6 tahap:
     1. Design Approved
     2. Down Payment (DP)
     3. Potong & Bahan
     4. Sablon/Bordir
     5. Jahit & QC
     6. Packaging & Siap Kirim
   - Pembagian vendor *makloon* (Cutting, Sablon/Bordir, Jahit/Sewing).
   - Pencatatan hasil QC (*passed* vs *reject*).
4. **Persediaan (*Inventory & Packaging - SCM*):**
   - Mengontrol stok kain roll, perlengkapan sablon/bordir, *buffer* bahan 3%, serta stok wajib *packaging* (rasio 1:1 per produk).
   - Pengurangan stok otomatis saat SPK berjalan yang terhubung ke peringatan *restock* SCM.
5. **Keuangan (*Finance & HPP*):**
   - Termin pembayaran klien (DP 50% dan pelunasan).
   - Perhitungan Harga Pokok Produksi (HPP) per proyek (bahan + makloon + packaging + operasional).
   - Rekap kas masuk, piutang klien, dan margin laba bersih.

## Rancangan Modul SCM (Drizzle Project)

Modul SCM mengelola aliran material dan distribusi dari pemasok hingga ke tangan klien untuk mendukung produksi 12 lini apparel custom Drizzle Project:

1. **Manajemen Pemasok & Mitra Makloon (*Supplier & Vendor*):**
   - Mengelola database pemasok kain (*Combed, Drill, Fleece, Taslan*), aksesoris, *Drizzle Packaging*, serta mitra *makloon* (sablon, bordir, jahit) untuk menopang pesanan skala kecil maupun massal (16 hingga 650+ pcs).
2. **Perencanaan Material (*MRP*):**
   - Menghitung otomatis kebutuhan bahan baku dari setiap SPK ERP lengkap dengan *buffer* toleransi cacat 3% dan rasio wajib kemasan 1:1 (*all product include packaging*).
3. **Pengadaan (*Procurement & PO*):**
   - Menerbitkan draf *Purchase Order (PO)* otomatis saat stok menyentuh batas minimum dan menghubungkan biaya pembelian ke pencatatan HPP modul Keuangan ERP.
4. **Manajemen Gudang (*Warehouse Control*):**
   - Mencatat pemeriksaan kualitas bahan masuk (*Inbound QC*) dan alokasi pengeluaran bahan per kode pesanan (`Goods Issue`).
5. **Logistik & Distribusi (*Outbound Fulfillment*):**
   - Mengatur serah terima atau pengiriman kargo setelah status pembayaran lunas serta menyinkronkan nomor resi langsung ke halaman *Order Tracking* pelanggan.

## Arsitektur Integrasi Terpusat (CRM + ERP + SCM)
- State terpusat tunggal di `localStorage`: `drizzle_integrated_db`
- Data Rekap Klien Riil Awal Drizzle Project:
  - SMANKRAPFANS — 652 Pcs T-Shirt
  - BUSHWACKER — 379 Pcs T-Shirt
  - SPRTN — 190 Pcs T-Shirt
  - MPD UNS — 75 Pcs PDH
  - IMAKA UNDIP — 32 Pcs Shirt
  - PT. Surya Nakula — 16 Pcs Shirt
