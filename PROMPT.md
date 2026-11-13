# Project Context: Drizzle Project Order Management & Tracking System

## Overview
Web-based Order Management & Tracking System untuk Drizzle Project (vendor custom merchandise: T-Shirt, PDH/Shirt, Hoodie, Coach, Vest, Varsity, Bomber, Lanyard, Tote Bag).

## Main Objectives
Menggantikan proses pemesanan manual via chat grup WhatsApp dengan sistem terpusat.

## Core Modules & Features
1. **Public Catalog & Custom Order Form**:
   - Pemilihan kategori produk dan estimasi quantity.
   - Input identitas pemesan & breakdown ukuran (S, M, L, XL, XXL).
   - Form upload file mockup/logo dan spesifikasi sablon/bordir.
2. **Customer Order Tracking**:
   - Lacak status produksi menggunakan Kode Pesanan unik (contoh: `DRZ-2026-001`).
   - Timeline status visual (Design Approved -> DP Verified -> In Production -> Ready to Ship).
3. **Admin ERP & Production Dashboard**:
   - Pengelolaan daftar pesanan masuk dan verifikasi pembayaran.
   - Update tahapan produksi secara *real-time*.

## Tech Stack & Target Platform
- **Frontend**: HTML5, Tailwind CSS, JavaScript (ES6)
- **Deployment**: Cloudflare Pages via GitHub Repository

## Database Schema Structure
1. Customers: customer_id, name, organization, phone, email
2. Products: product_id, category_name, base_price
3. Orders: order_id, customer_id, total_pcs, status_payment, tracking_code, created_at
4. Order_Details: detail_id, order_id, product_id, size_breakdown (JSON), mockup_url, notes
5. Production_Logs: log_id, order_id, stage_name, updated_at

