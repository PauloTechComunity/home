const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'banco_do_povo', 
});

// Conectar ao banco
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err);
        return;
    }
    console.log('Conectado ao banco de dados!');
});

app.get('/users', (req, res) => {
    const query = 'SELECT id, name, telephone, email FROM users';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.post('/users', (req, res) => {
    const { name, telephone, email } = req.body; 
    const query = 'INSERT INTO usuarios_banco (name, telephone, email) VALUES (?, ?, ?)';
    db.query(query, [name, telephone, email], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ id: result.insertId, name, telephone, email });
        }
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
