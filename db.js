const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'toko_db'
});

connection.connect((err) => {
    if (err) {
        console.log('Koneksi gagal:', err);
    } else {
        console.log('Database terkoneksi');
    }
});

module.exports = connection;