-- CreateTable
CREATE TABLE `Categoria` (
    `idCategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `descricaoCategoria` VARCHAR(50) NOT NULL,
    `dataCad` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idCategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `idProduto` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeProduto` VARCHAR(50) NOT NULL,
    `valorProduto` DECIMAL(10, 2) NOT NULL,
    `vinculoImagem` VARCHAR(100) NOT NULL,
    `dataCad` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idCategoria` INTEGER NOT NULL,

    PRIMARY KEY (`idProduto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `Categoria`(`idCategoria`) ON DELETE RESTRICT ON UPDATE CASCADE;
