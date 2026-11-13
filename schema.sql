-- ==============================================================================
-- Drizzle Project SaaS - Database Schema (Integrasi CRM, ERP & SCM)
-- Order Management, Production Pipeline & Supply Chain System
-- Compatible with SQLite / Cloudflare D1, MySQL, & PostgreSQL
-- ==============================================================================

-- 1. Customers Table (CRM Module)
CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    organization VARCHAR(255),
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255)
);

-- 2. Products Table (Catalog - 11 Items)
CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name VARCHAR(100) NOT NULL,
    base_price DECIMAL(12, 2) NOT NULL DEFAULT 0.00
);

-- 3. Orders Table (ERP Module)
CREATE TABLE IF NOT EXISTS orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    total_pcs INTEGER NOT NULL DEFAULT 0,
    status_payment VARCHAR(50) NOT NULL DEFAULT 'Pending DP', -- 'Pending DP', 'DP Verified', 'Paid Full'
    order_status VARCHAR(50) NOT NULL DEFAULT 'Pending',     -- 'Pending', 'In Production', 'Completed', 'Cancelled'
    tracking_code VARCHAR(50) NOT NULL UNIQUE,              -- contoh: 'DRZ-2026-001'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

-- 4. Order Details Table (ERP Specifications)
CREATE TABLE IF NOT EXISTS order_details (
    detail_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    size_breakdown TEXT NOT NULL, -- Format JSON: {"S": 0, "M": 0, "L": 0, "XL": 0, "XXL": 0}
    mockup_url TEXT,
    notes TEXT,                   -- Spesifikasi sablon (DTF/Plastisol), bordir komputer, warna kain, dll.
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- 5. Production Logs Table (Tracking & Kanban Pipeline)
-- 6 Tahapan Visual:
-- 1. Design Approved
-- 2. Down Payment (DP)
-- 3. Bahan & Potong
-- 4. Sablon/Bordir
-- 5. Jahit & Finishing
-- 6. Siap Kirim/Ambil
CREATE TABLE IF NOT EXISTS production_logs (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    stage_name VARCHAR(100) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);

-- 6. Materials SCM Table (Supply Chain & Inventory Management)
CREATE TABLE IF NOT EXISTS materials_scm (
    material_id INTEGER PRIMARY KEY AUTOINCREMENT,
    material_name VARCHAR(100) NOT NULL,
    unit VARCHAR(50) NOT NULL,                              -- Roll, Spool, Pcs, Gross, Meter
    stock_qty INTEGER NOT NULL DEFAULT 0,
    min_stock INTEGER NOT NULL DEFAULT 10,
    supplier_name VARCHAR(255) NOT NULL,
    restock_status VARCHAR(50) NOT NULL DEFAULT 'Aman'      -- 'Aman', 'Menipis', 'Perlu Restock', 'PO Sent'
);

-- ==============================================================================
-- Initial Seed Data
-- ==============================================================================

-- 11 Product Catalog Items
INSERT OR IGNORE INTO products (product_id, category_name, base_price) VALUES
(1, 'T-Shirt', 65000.00),
(2, 'Kemeja/PDH', 110000.00),
(3, 'Hoodie', 145000.00),
(4, 'Polo', 85000.00),
(5, 'Jacket', 140000.00),
(6, 'Coach', 135000.00),
(7, 'Vest', 125000.00),
(8, 'Varsity', 175000.00),
(9, 'Bomber', 165000.00),
(10, 'Lanyard', 15000.00),
(11, 'Tote Bag', 35000.00);

-- SCM Main Raw Materials
INSERT OR IGNORE INTO materials_scm (material_id, material_name, unit, stock_qty, min_stock, supplier_name, restock_status) VALUES
(1, 'Kain Cotton Combed 30s (Roll)', 'Roll', 25, 5, 'CV Tekstil Mandiri', 'Aman'),
(2, 'Kain American Drill / PDH (Roll)', 'Roll', 18, 5, 'PT Sinar Sandang Utama', 'Aman'),
(3, 'Kain Fleece Cotton / Hoodie (Roll)', 'Roll', 12, 4, 'PT Dunia Tekstil Bandung', 'Aman'),
(4, 'Benang Jahit Polyester', 'Spool', 80, 20, 'Toko Benang Sejahtera', 'Aman'),
(5, 'Kancing Kemeja Standar', 'Gross', 50, 15, 'Mitra Aksesoris Garmen', 'Aman'),
(6, 'Zipper Metal & Coil', 'Pcs', 120, 30, 'YKK Supplier Mitra', 'Aman'),
(7, 'Plastik Kemasan / Packaging Premium', 'Pcs', 500, 100, 'CV Kemasan Packindo', 'Aman');
