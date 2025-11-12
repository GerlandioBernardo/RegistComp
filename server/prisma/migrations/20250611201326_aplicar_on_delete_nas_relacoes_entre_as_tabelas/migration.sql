-- DropForeignKey
ALTER TABLE "clientes" DROP CONSTRAINT "clientes_comercianteId_fkey";

-- DropForeignKey
ALTER TABLE "compras" DROP CONSTRAINT "compras_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "itensCompras" DROP CONSTRAINT "itensCompras_compraId_fkey";

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_comercianteId_fkey" FOREIGN KEY ("comercianteId") REFERENCES "comerciantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compras" ADD CONSTRAINT "compras_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itensCompras" ADD CONSTRAINT "itensCompras_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "compras"("id") ON DELETE CASCADE ON UPDATE CASCADE;
