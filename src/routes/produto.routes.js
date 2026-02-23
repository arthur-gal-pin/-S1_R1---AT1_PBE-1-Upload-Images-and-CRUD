import { Router } from "express";
import uploadImage from "../middlewares/uploadImage.middleware.js";
import produtoController from "../controllers/produto.controller.js";

const produtoRoutes = Router();

produtoRoutes.post('/produtos/', uploadImage, produtoController.criar);
produtoRoutes.get('/produtos/', produtoController.listar);
produtoRoutes.delete('/produtos/', produtoController.deletar);

export default produtoRoutes;