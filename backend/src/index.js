const express = require('express');

const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');

const app = express();
const PORT = 3000;

app.use(express.json());

// Rutas
app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});