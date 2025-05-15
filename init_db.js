const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('partners.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Partners (
            partner_id INTEGER PRIMARY KEY AUTOINCREMENT,
            partner_type TEXT NOT NULL,
            partner_name TEXT NOT NULL UNIQUE,
            director TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            legal_address TEXT NOT NULL,
            inn TEXT NOT NULL UNIQUE,
            rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 10)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS ProductTypes (
            type_id INTEGER PRIMARY KEY AUTOINCREMENT,
            type_name TEXT NOT NULL UNIQUE,
            type_coefficient REAL NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS MaterialTypes (
            material_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
            material_type_name TEXT NOT NULL UNIQUE,
            defect_percentage REAL NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Products (
            product_id INTEGER PRIMARY KEY AUTOINCREMENT,
            type_id INTEGER NOT NULL,
            product_name TEXT NOT NULL UNIQUE,
            article TEXT NOT NULL UNIQUE,
            min_partner_price REAL NOT NULL,
            FOREIGN KEY (type_id) REFERENCES ProductTypes(type_id) ON DELETE RESTRICT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Sales (
            sale_id INTEGER PRIMARY KEY AUTOINCREMENT,
            partner_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            sale_date TEXT NOT NULL,
            FOREIGN KEY (partner_id) REFERENCES Partners(partner_id) ON DELETE RESTRICT,
            FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE RESTRICT
        )
    `);
});

db.close((err) => {
    if (err) {
        console.error('Ошибка при закрытии базы данных:', err);
    } else {
        console.log('База данных partners.db создана');
    }
});