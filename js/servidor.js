
const express = require('express');
const app = express();
const cors = require ("cors");
const jwt = require('jsonwebtoken');
const mariadb = require('mariadb');
const fs = require('fs').promises;


app.use(express.json());
const port = 3001; 
app.use(cors({
    origin: '*',
    methods: 'GET,POST', 
    allowedHeaders: 'Content-Type, Authorization', 
  }));

  const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'usersdb',
    connectionLimit: 5,
  });

  //partee1 
app.get("/", (req, res) => {
    res.send("<h1>a ver</h1>");
  });

let cart = require("../json/cart/buy.json");  //UN MSG XD
app.get("/json/cart", (req, res) => {
    res.json(cart);
});
let cats = require("../json/cats/cat.json");     //CATS = CATEGORTIAS
app.get('/json/cats', (req, res) => {
    res.json(cats);
});
app.get('/json/cats_products/:id'+".json", (req, res) => {                   //PRODCUTOS POR CATEGORIAA
    res.json(require("../json/cats_products/" + req.params.id + ".json"));
});
app.get('/json/products/:id'+".json", (req, res) => {
    res.json(require("../json/products/" + req.params.id + ".json"));   //DETALLE DEL PRODUCTOO
});
app.get('/json/products_comments/:id'+'.json', (req, res) => {
    res.json(require("../json/products_comments/" + req.params.id + ".json"));  //COMENTARIOS DE X PRODUCTO
});
let sell = require("../json/sell/publish.json");                   //OTRO MENSAJE XD
app.get('/json/sell', (req, res) => {                
    res.json(sell);
});
let user_cart = require("../json/user_cart/25801.json");  
const { log } = require('console');
app.get('/json/user_cart', (req, res) => {
    res.json(user_cart);          //CARRITO DE USUARIO muestra solo el onix
});






const users = [];
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  const existingUser = users.find(u => u.username === username);

  if (existingUser) {
    return res.status(400).json({ error: 'Usuario ya usado' });
  }

  const newUser = {
    username,
    password,
    email,
  };
  users.push(newUser);

  res.status(201).json({ message: 'Usuario registrado' });
});

// Inicio de sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  }

  const token = jwt.sign({ userId: user.id }, 'xddd', { expiresIn: '1h' });
  res.json({ token });
});

const verificacion = (req, res, next) => {
  const token = req.header('access_token');
  if (!token) {
    return res.status(400).json({ message: 'Error: Token no proporcionado' });
  }

  try {
    const verificationUser = jwt.verify(token, 'xddd');
    req.usuario = verificationUser.userId;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Verificación incorrecta o token inválido' });
  }
};

// Ruta protegida 
app.post('/cart', verificacion, async (req, res) => {
  const filePath = `${__dirname}/../json/user_cart/25801.json`;

  try {
    // Lee los datos del carrito desde el archivo JSON
    const fileData = await fs.readFile(filePath, 'utf8');
    const cartData = JSON.parse(fileData);

    // Conecta a la base de datos
    const connection = await pool.getConnection();

    console.log('Antes de la consulta SQL');

    // Utiliza placeholders en la consulta SQL para evitar SQL injection
    const result = await connection.query(
      'INSERT INTO carrito (datos_carrito) VALUES (?) ON DUPLICATE KEY UPDATE datos_carrito = ?',
      [JSON.stringify(cartData), JSON.stringify(cartData)]
    );
    
    console.log('Después de la consulta SQL');

    connection.release();

    res.json({ message: 'Datos del carrito guardados correctamente' });
  } catch (error) {
    console.error('Error al procesar datos del carrito y guardar en la base de datos:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
});
app.listen(3001, () => {
    console.log('Servidor iniciado en el puerto 3001');
})