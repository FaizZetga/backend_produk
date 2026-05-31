const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

/*
====================================
GET /api/products
Menampilkan semua produk
====================================
*/
app.get('/api/products', (req, res) => {

    const sql = 'SELECT * FROM products';

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: 'Gagal mengambil data produk',
                error: err
            });
        }

        res.json(result);
    });
});

/*
====================================
POST /api/products
Menambah produk baru
====================================
*/
app.post('/api/products', (req, res) => {

    const { name, price, stock, category } = req.body;

    const sql = `
        INSERT INTO products (name, price, stock, category)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, price, stock, category],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: 'Gagal menambah produk',
                    error: err
                });
            }

            res.status(201).json({
                message: 'Produk berhasil ditambahkan',
                productId: result.insertId
            });
        }
    );
});

/*
====================================
PUT /api/products/:id
Update harga dan stok produk
====================================
*/
app.put('/api/products/:id', (req, res) => {

    const id = req.params.id;
    const { price, stock } = req.body;

    const sql = `
        UPDATE products
        SET price = ?, stock = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [price, stock, id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: 'Gagal update produk',
                    error: err
                });
            }

            res.json({
                message: 'Produk berhasil diupdate'
            });
        }
    );
});

/*
====================================
DELETE /api/products/:id
Menghapus produk berdasarkan ID
====================================
*/
app.delete('/api/products/:id', (req, res) => {

    const id = req.params.id;

    const sql = 'DELETE FROM products WHERE id = ?';

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: 'Gagal menghapus produk',
                error: err
            });
        }

        res.json({
            message: 'Produk berhasil dihapus'
        });
    });
});

/*
====================================
Jalankan Server
====================================
*/
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});