import type { CreateProductArgs, CreateProductInput, CreateProductWithIdsArgs, GraphQLContext, ProductValidationResponse, UpdateProductArgs, UpdateProductWithIdsArgs } from '../types/types'
import * as z from "zod"

const productSchema = z.object({
  name_ar: z.string().max(20),
  name_en: z.string().max(20),
  secintefic_name: z.string().max(20),
  active_material: z.string().max(20),
  trade_name: z.string().max(20),
  units: z.string().max(20),
  quantity: z.number(),
  price: z.number(),
})

async function validate(input: CreateProductInput): Promise<ProductValidationResponse> {
    const data = productSchema.safeParse(input)

    if (data.success != true) {
        return { issues: data.error.issues, data: null }
    }

    return { issues: [], data: data.data }
}

const ProductResolvers = {
    resolvers: {
        async getProduct(_: any, { id }: any, { isAuth, db }: GraphQLContext) {
            if (!isAuth) return null

            const product = await db.product.findUnique({
                where: {
                    id: id
                }
            })

            if(product != null){
                return product
            }else{
                return null
            }
        },
        async getProducts(_: any, { }, { isAuth, db }: GraphQLContext) {
            if (!isAuth) return null

            const products = await db.product.findMany({
                include: {
                    categories: true
                },
                skip: 0,
                take: 20
            })

            if(products != null){
                return products
            }else{
                return null
            }
        },
    },

    mutations: {
        async createProduct(_: any, args: CreateProductArgs,{ isAuth, db }: GraphQLContext) {
            if (!isAuth) return null

            const input = await validate(args.input)

            if (input.data != null) {
                const product = await db.product.create({
                    data: input.data
                })
    
                return product
            } else {
                return input.issues
            }
        },
        async createProductWithCategories(_: any, args: CreateProductWithIdsArgs,{ isAuth, db }: GraphQLContext) {
            if (!isAuth) return null

            const input = await validate(args.input)

            if (input.data != null) {

                const ids = args.ids.map(id => {
                    return {
                        id: id
                    }
                })

                const product = await db.product.create({
                    data: {
                        ...input.data,
                        categories: {
                            connect: ids
                        }
                    }
                })

                return product
            } else {
                return input.issues
            }
        },
        async updateProduct(_: any, args: UpdateProductArgs, { isAuth, db }: GraphQLContext) {
            if (!isAuth) return null

            const input = await validate(args.input)

            if (input.data != null) {
                const product = await db.product.update({
                    where: {
                        id: args.id
                    },
                    data: input.data
                })
    
                return product
            } else {
                return input.issues
            }
        },
        async updateProductWithCategories(_: any, args: UpdateProductWithIdsArgs, { isAuth, db }: GraphQLContext) {
            if (!isAuth) return null

            const input = await validate(args.input)

            if (input.data != null) {
                const ids = args.ids.map(id => {
                    return {
                        id: id
                    }
                })

                const product = await db.product.update({
                    where: {
                        id: args.id
                    },
                    data: {
                        ...input.data,
                        categories: {
                            connect: ids
                        }
                    }
                })
    
                return product
            } else {
                return input.issues
            }
        }
    }
}

export default ProductResolvers
