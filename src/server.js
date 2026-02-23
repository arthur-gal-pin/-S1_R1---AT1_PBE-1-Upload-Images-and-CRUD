import express from 'express';
import produtoRoutes from './routes/produto.routes.js';
import categoriaRoutes from './routes/categoria.routes.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use('/', produtoRoutes);
app.use('/', categoriaRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.SERVER_PORT}`)
});