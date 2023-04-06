import type { GraphQLContext } from '../types/types'

const ProductResolvers = {
    resolvers: {
        async getProduct(_, { id }, { isAuth, db }: GraphQLContext) {
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
        async getProducts(_, { }, { isAuth, db }: GraphQLContext) {
            if (!isAuth) return null

            const products = await db.product.findMany()

            if(products != null){
                return products
            }else{
                return null
            }
        },
    },

    mutations: {
        async createProduct(_,
            {
                input: {
                    name_ar,
                    name_en,
                    secintefic_name,
                    active_material,
                    trade_name,
                    units,
                    quantity,
                    price
                }
            },
            { isAuth, db }: GraphQLContext
        ) {
            if (!isAuth) return null

            const product = await db.product.create({
                data: {
                    name_ar,
                    name_en,
                    secintefic_name,
                    active_material,
                    trade_name,
                    units,
                    quantity,
                    price
                }
            })

            return product
        },
        async createProductWithCategories(_,
            {
                input: {
                    name_ar,
                    name_en,
                    secintefic_name,
                    active_material,
                    trade_name,
                    units,
                    quantity,
                    price
                },
                ids
            },
            { isAuth, db }: GraphQLContext
        ) {
            if (!isAuth) return null

            const product = await db.product.create({
                data: {
                    name_ar,
                    name_en,
                    secintefic_name,
                    active_material,
                    trade_name,
                    units,
                    quantity,
                    price
                }
            })

            return product
        },
        async updateProduct(_, { id,
            input: {
                name_ar,
                name_en,
                secintefic_name,
                active_material,
                trade_name,
                units,
                quantity,
                price
            }
        }, { isAuth, db }: GraphQLContext) {
            if (!isAuth) return null

            const product = await db.product.update({
                where: {
                    id: id
                },
                data: {
                    name_ar,
                    name_en,
                    secintefic_name,
                    active_material,
                    trade_name,
                    units,
                    quantity,
                    price
                }
            })

            return product
        }
    }
}

export default ProductResolvers
