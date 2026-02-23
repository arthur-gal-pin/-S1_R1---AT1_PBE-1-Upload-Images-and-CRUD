import prisma from '../models/prisma.client.js';

const produtoController = {
    criar: async (req, res) => {
        try {
            const { nome, preco, categoria } = req.body;
            if (typeof nome !== "string" || isNaN(preco) || typeof categoria !== "string")


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
            const result = await prisma.produto.delete({ where: { idProduto: produtoId } });
            console.log("Feita a requisição corretamente (delete).");
            return res.status(200).json({ data: result });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor da aplicação.',
                errorMessage: error.message
            })
        }
    },
    atualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, preco, categoria } = req.body;

            // 1. Verificar se o produto existe
            const produtoAtual = await prisma.produto.findUnique({
                where: { idProduto: id }
            });

            if (!produtoAtual) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }

            // 2. Lógica para Categoria (se fornecida)
            let idCategoriaFinal = produtoAtual.idCategoria;

            if (categoria !== undefined) {
                const categoriaFormatada = String(categoria).toLowerCase();
                const categoriaEncontrada = await prisma.categoria.findFirst({
                    where: { descricaoCategoria: categoriaFormatada }
                });

                if (!categoriaEncontrada) {
                    return res.status(400).json({ message: 'Categoria não existente.' });
                }
                idCategoriaFinal = categoriaEncontrada.idCategoria;
            }

            // 3. Atualização no Banco de Dados
            const produtoAtualizado = await prisma.produto.update({
                where: { idProduto: id },
                data: {
                    nomeProduto: nome !== undefined ? nome.trim() : produtoAtual.nomeProduto,
                    valorProduto: preco !== undefined ? Number(preco) : produtoAtual.valorProduto,
                    idCategoria: idCategoriaFinal
                }
            });

            return res.status(200).json({
                message: 'Produto atualizado com sucesso!',
                data: produtoAtualizado
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Erro interno no servidor.',
                error: error.message
            });
        }
    }
}

export default produtoController;