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

## Arsitektur Integrasi Terpusat (CRM + ERP + SCM)
- State terpusat tunggal di `localStorage`: `drizzle_integrated_db`
- Data Rekap Klien Riil Awal Drizzle Project:
  - SMANKRAPFANS — 652 Pcs T-Shirt
  - BUSHWACKER — 379 Pcs T-Shirt
  - SPRTN — 190 Pcs T-Shirt
  - MPD UNS — 75 Pcs PDH
  - IMAKA UNDIP — 32 Pcs Shirt
  - PT. Surya Nakula — 16 Pcs Shirt
- Alur Kerja Sistem:
  1. **CRM / Order Form (`order.html`)**:
     - Mendukung 2 jenis layanan: **Produksi Apparel Custom** (dengan input breakdown ukuran S–XXL) dan **Jasa Desain & Konsultasi Brand**.
     - Otomatis menghasilkan kode pelacakan unik (`DRZ-2026-XXX`).
  2. **Admin ERP (`admin.html`)**:
     - Sinkronisasi real-time data pesanan masuk.
     - Verifikasi status pembayaran (Menunggu DP -> DP Terverifikasi -> Lunas).
     - Pengelolaan 6 tahapan produksi:
       1. Design Approved
       2. Down Payment (DP)
       3. Bahan & Potong
       4. Sablon/Bordir
       5. Jahit & Finishing
       6. Siap Kirim/Ambil
     - Fitur cetak Work Order / SPK otomatis.
  3. **SCM / Inventory Management (`admin.html`)**:
     - Saat pesanan berstatus masuk proses potong/produksi, stok bahan baku kain, benang, aksesoris, dan packaging otomatis dipotong sesuai kuantitas pesanan.
     - Restock supplier / PO vendor otomatis menambah kembali ketersediaan stok.
  4. **Pelanggan / Tracking Portal (`tracking.html`)**:
     - Pelacakan 6 tahap progres produksi secara live menggunakan kode pesanan (`DRZ-2026-XXX`).
