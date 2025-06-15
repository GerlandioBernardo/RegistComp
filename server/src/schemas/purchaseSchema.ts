import {z} from "zod";

const itemCompraSchema = z.object({

    nome: z.string()
    .trim()
    .min(3, {message: "O nome do item deve ter pelo menos 3 caracteres"})
    .max(150, {message: "O nome do item deve ter no maximo 150 caracteres"}),

    quantidade: z.number()
    .min(1, {message: "A quantidade de itens comprados deve ter pelo menos 1"}),

    precoUnitario: z.number()
    .min(0.01, { message: "O preço unitário deve ser maior que zero" }),
})


export const compraSchema = z.object({

    itens: z.array(itemCompraSchema).min(1, {
        message: "Deve haver pelo menos um item a ser comprado",
    }),

})