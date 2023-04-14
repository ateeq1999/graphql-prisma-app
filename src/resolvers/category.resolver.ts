import * as z from "zod"
import type { CreateCategoryArgs, CreateCategoryInput, CategoryValidationResponse, GraphQLContext, UpdateCategoryArgs } from '../types/types'

const CategorySchema = z.object({
  name: z.string().max(20),
})

async function validate(input: CreateCategoryInput): Promise<CategoryValidationResponse> {
    const data = CategorySchema.safeParse(input)

    if (data.success != true) {
        return { issues: data.error.issues, data: null }
    }

    return { issues: [], data: data.data }
}

const CategoryResolver = {
    resolvers: {
        async getCategory(_: any, { id }: any, { isAuth, db }: GraphQLContext) {
            if (!isAuth) return null

            const category = await db.category.findUnique({
                where: {
                    id: id
                }
            })

            if(category != null){
                return category
            }else{
                return null
            }
        },
        async getCategories(_: any, { }: any, { isAuth, db }: GraphQLContext) {
            if (!isAuth) return null

            const categories = await db.category.findMany({
                include: {
                    products: true,
                },
                
            })

            if(categories != null){
                return categories
            }else{
                return null
            }
        },
    },

    mutations: {
        async createCategory(_: any, args: CreateCategoryArgs, {isAuth, db}: GraphQLContext) {
            if (!isAuth) return null

            const input = await validate(args.input)

            if (input.data != null) {
                const category = await db.category.create({
                    data: {
                        name: input.data.name
                    }
                })
    
                return category
            } else {
                return { issues: input.issues }
            }
        },
        async updateCategory(_: any, args: UpdateCategoryArgs, {isAuth, db}: GraphQLContext) {
            if (!isAuth) return null

            const input = await validate(args.input)

            if (input.data != null) {
                const category = await db.category.update({
                    where: {
                        id: args.id
                    },
                    data: {
                        name: input.data.name
                    }
                })
    
                return category
            } else {
                return { issues: input.issues }
            }
        }
    }
}

export default CategoryResolver
