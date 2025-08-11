// server.js
// Servidor de autenticación con Express y PostgreSQL
// Este servidor maneja las rutas de registro e inicio de sesión.

// Importamos las librerías necesarias
// Express para el servidor web
const express = require('express');
// PG para la conexión a PostgreSQL
const { Pool } = require('pg');
// bcryptjs para encriptar y comparar contraseñas de forma segura
const bcrypt = require('bcryptjs');

// Inicializamos la aplicación de Express
const app = express();
const port = 3000;

// Middleware para que Express pueda parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// Configuración de la conexión a la base de datos PostgreSQL
// Usamos la URL proporcionada por el usuario
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://BushiA:Est43sl4cl4v3@localhost:5432/dashboard_db?schema=public",
});

// Función de prueba para verificar la conexión a la base de datos
const testDbConnection = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('✔ Conexión a la base de datos exitosa.');
  } catch (error) {
    console.error('❌ Error de conexión a la base de datos:', error);
  }
};

// Llamamos a la función para probar la conexión al iniciar el servidor
testDbConnection();

//
// --- Rutas de la API ---
//

// Ruta de registro de usuarios
// URL: POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;

  // Validar que se recibieron el email y la contraseña
  if (!email || !password) {
    return res.status(400).json({ message: 'Se requiere email y contraseña.' });
  }

  try {
    // Generar un "salt" y hashear la contraseña para mayor seguridad
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertar el nuevo usuario en la base de datos
    // Asumimos que existe una tabla 'users' con columnas 'email' y 'password'
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );

    // Responder con un mensaje de éxito y los datos del nuevo usuario
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: result.rows[0].id,
        email: result.rows[0].email,
      },
    });
  } catch (error) {
    // Si el usuario ya existe (ej. por una restricción UNIQUE en el email),
    // o si hay otro error, enviamos un mensaje de error
    console.error('Error al registrar el usuario:', error);
    if (error.code === '23505') { // Código de error para duplicados en PostgreSQL
      return res.status(409).json({ message: 'El email ya está registrado.' });
    }
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

// Ruta de inicio de sesión
// URL: POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // Validar que se recibieron el email y la contraseña
  if (!email || !password) {
    return res.status(400).json({ message: 'Se requiere email y contraseña.' });
  }

  try {
    // Buscar al usuario por su email en la base de datos
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    // Si el usuario no existe, enviar un error
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // Comparar la contraseña proporcionada con la contraseña hasheada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);

    // Si las contraseñas no coinciden, enviar un error
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // Si las credenciales son correctas, responder con un mensaje de éxito
    // En una aplicación real, aquí se generaría y enviaría un token JWT
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

// Iniciamos el servidor para que escuche en el puerto definido
app.listen(port, () => {
  console.log(`✔ Servidor de autenticación escuchando en http://localhost:${port}`);
});

