import prisma from '../models/prisma.client.js';

const categoriaController = {
    criar: async (req, res) => {
        try {
            const descricao = req.body.descricao;

            if (!descricao || typeof descricao !== 'string' || descricao.trim() === "") {
                return res.status(400).json({ message: 'Categoria inválida ou com tipo errado.' })
            }

            const result = await prisma.categoria.create({
                data: { descricaoCategoria: descricao }
            });

            return res.status(201).json({ message: 'Categoria inserida com sucesso.' });

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
            if (req.query.categoriaId) {
                const categoriaId = Number(req.query.categoriaId);
                const result = await prisma.categoria.findUnique({
                    where: { idCategoria: categoriaId }
                })
                if (result == null) {
                    return res.status(200).json({ message: "Não encontramos uma categoria com esse Id" });
                }
                return res.status(200).json({ data: result });
            }

            const result = await prisma.categoria.findMany();
            if (result = []) {
                return res.status(200).json({ message: "Não existe nenhuma categoria no banco de dados" });
            }
            return res.status(200).json({ data: result });

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
            const categoriaId = Number(req.query.categoriaId);

            if (!categoriaId || isNaN(categoriaId)) {
                return res.status(400).json({ message: 'Você deve fornecer um ID válido.' })
            }

            const totalProdutos = await prisma.produto.count({
                where: { idCategoria: categoriaId }
            });

            if (totalProdutos > 0) {
                return res.status(400).json({
                    message: `Não é possível excluir esta categoria. Ela possui ${totalProdutos} produto(s) vinculado(s).`
                });
            }

            const result = await prisma.categoria.delete({
                where: { idCategoria: categoriaId }
            });

            return res.status(200).json({ message: "Categoria deletada com sucesso.", data: result });

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
            const categoriaId = Number(req.params);
            const { descricao } = req.body;

            if(!categoriaId || isNaN(categoriaId)){
                return res.status(500).json({message: "Você deve inserir um número para encontrar a categoria"})
            }
            const categoriaAtual = await prisma.categoria.findUnique({
                where: { idCategoria: categoriaId }
            });

            if (!categoriaAtual) {
                return res.status(404).json({ message: 'Categoria não encontrada.' });
            }
            if (!descricao) {
                return res.status(400).json({ message: 'Você deve inserir pelo menos a descrição para atualizar.' })
            }

            const result = await prisma.categoria.update({
                where: { idCategoria: categoriaId },
                data: {
                    descricaoCategoria: descricao
                }
            })

            return res.status(200).json({ message: 'Categoria atualizada com sucesso', data: result })
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor da aplicação.',
                errorMessage: error.message
            })
        }

    }
}

export default categoriaController;