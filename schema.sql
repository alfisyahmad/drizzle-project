-- ==============================================================================
-- Drizzle Project - Database Schema
-- Order Management & Tracking System
-- Compatible with SQLite / Cloudflare D1, MySQL, & PostgreSQL
-- ==============================================================================

-- 1. Customers Table
CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    organization VARCHAR(255),
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255)
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name VARCHAR(100) NOT NULL,
    base_price DECIMAL(12, 2) NOT NULL DEFAULT 0.00
);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    total_pcs INTEGER NOT NULL DEFAULT 0,
    status_payment VARCHAR(50) NOT NULL DEFAULT 'Pending DP',
    tracking_code VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

-- 4. Order Details Table
CREATE TABLE IF NOT EXISTS order_details (
    detail_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    size_breakdown TEXT NOT NULL, -- Stored as JSON string: {"S": 0, "M": 0, "L": 0, "XL": 0, "XXL": 0}
    mockup_url TEXT,
    notes TEXT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- 5. Production Logs Table
CREATE TABLE IF NOT EXISTS production_logs (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    stage_name VARCHAR(100) NOT NULL, -- 'Design Approved', 'DP Verified', 'In Production', 'Ready to Ship'
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);

-- Optional: Initial Seed Data for Product Categories
INSERT OR IGNORE INTO products (product_id, category_name, base_price) VALUES
(1, 'T-Shirt', 65000.00),
(2, 'PDH/Shirt', 110000.00),
(3, 'Hoodie', 145000.00),
(4, 'Coach', 135000.00),
(5, 'Vest', 125000.00),
(6, 'Varsity', 175000.00),
(7, 'Bomber', 165000.00),
(8, 'Lanyard', 15000.00),
(9, 'Tote Bag', 35000.00);
