const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',   
  password: '123456',
  database: 'bdnode'
});


db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});


app.get('/api/productos', (req, res) => {
  const sql = 'SELECT * FROM productos';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


app.post('/api/productos', (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    const sql = 'INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)';
    db.query(sql, [nombre, descripcion, precio], (err, result) => {
      if (err) throw err;
      res.send({ id: result.insertId, nombre, descripcion, precio });
    });
  });
  

app.put('/api/productos/:id', (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ? WHERE idproductos = ?';
    db.query(sql, [nombre, descripcion, precio, id], (err, result) => {
      if (err) throw err;
      res.send({ id, nombre, descripcion, precio });
    });
  });
  

app.delete('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM productos WHERE idproductos = ?';
    db.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.send({ message: 'Producto eliminado', id });
    });
  });
  
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});
