import prisma from '../models/prisma.client.js';

const produtoController = {
    criar: async (req, res) => {
        try {
            const { nome, preco, categoria } = req.body;


            if (!req.file) {
                return res.status(400).json({ message: 'Arquivo de imagem não enviado' });
            }


            const categoriaFormatada = categoria ? String(categoria).toLowerCase() : "";


            const categoriaEncontrada = await prisma.categoria.findFirst({
                where: { descricaoCategoria: categoriaFormatada }
            });

            if (!categoriaEncontrada) {
                return res.status(400).json({ message: 'Categoria não existente.' });
            }

            const caminhoImagem = `src/uploads/images/${req.file.filename}`;


            const result = await prisma.produto.create({
                data: {
                    nomeProduto: nome,
                    valorProduto: Number(preco),
                    vinculoImagem: caminhoImagem,
                    idCategoria: categoriaEncontrada.idCategoria
                }
            });

            res.status(201).json({
                message: 'Registro inserido com sucesso.',
                produto: result,
                file: {
                    filename: req.file.filename,
                    size: req.file.size,
                    mimetype: req.file.mimetype,
                }
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor da aplicação.',
                errorMessage: error.message
            });
        }
    },
    listar: async (req, res) => {
        try {
            if (req.query.produtoId) {
                const produtoId = Number(req.query.produtoId);
                const result = await prisma.produto.findUnique({
                    where: { idProduto: produtoId }
                })
                console.log("Feita a requisição corretamente (findUnique).");
                return res.status(200).json({ data: result });
            }

            const result = await prisma.produto.findMany();
            //Tratar Resultado
            res.status(200).json({ data: result });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor da aplicação.',
                errorMessage: error.message
            });
        }
    },
    deletar: async (req, res) => {
        try {
            const produtoId = Number(req.query.produtoId);
            if (!produtoId || typeof produtoId !== Number) {
                return res.status(400).json({ message: 'Você deve fornecer um ID para o funcionamento do código.' })
            }
            const result = await prisma.produtos.delete({ where: { idProduto: produtoId } });
            console.log("Feita a requisição corretamente (delete).");
            return res.status(200).json({ data: result });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor da aplicação.',
                errorMessage: error.message
            })
        }
    }
}

export default produtoController;