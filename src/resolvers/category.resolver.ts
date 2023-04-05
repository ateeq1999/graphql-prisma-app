const CategoryResolvers = {
    resolvers: {
        async getCategory(_, { id }, { isAuth, db }) {
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
        async getCategories(_, { }, { isAuth, db }) {
            if (!isAuth) return null

            const categories = await db.category.findMany()

            if(categories != null){
                return categories
            }else{
                return null
            }
        },
    },

    mutations: {
        async createCategory(_, {input: {name}}, {isAuth, db}) {
            if (!isAuth) return null

            const category = await db.category.create({
                data: {
                    name: name
                }
            })

            return category
        }
    }
}

export default CategoryResolvers
