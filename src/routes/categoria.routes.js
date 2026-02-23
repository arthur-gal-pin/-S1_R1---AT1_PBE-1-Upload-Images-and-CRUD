import { Router } from "express";
import categoriaController from "../controllers/categoria.controller.js";

const categoriaRoutes = Router();

categoriaRoutes.post('/categorias', categoriaController.criar);
categoriaRoutes.get('/categorias/', categoriaController.listar);
categoriaRoutes.delete('/categorias/', categoriaController.deletar);
categoriaRoutes.put('/produtos/', categoriaController.atualizar);


export default categoriaRoutes;