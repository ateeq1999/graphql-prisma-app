import { AdminValidator } from '../../prisma/zod'
import type { GraphQLContext } from '../types/types'

const AdminResolvers = {
    resolvers: {
        async getAdmin(_, { id }, { isAuth, db }: GraphQLContext) {
            if (!isAuth) return null

            const admin = await db.admin.findUnique({
                where: {
                    id: id
                }
            })

            if(admin != null){
                return admin
            }else{
                return null
            }
        },
        async getAdmins(_, { }, { isAuth, db }: GraphQLContext) {
            if (!isAuth) return null

            const admins = await db.admin.findMany()

            if(admins != null){
                return admins
            }else{
                return null
            }
        },
    },

    mutations: {
        async createAdmin(_, { input }, { isAuth, db }: GraphQLContext) {
            if (!isAuth) return null

            const validatedData = AdminValidator.safeParse(input)

            if (validatedData.success != true) {
                return  { data: null, msg: "Failure", error: validatedData.error.errors }
            }

            const admin = await db.admin.create({
                data: {
                    email: validatedData.data.email,
                    password: validatedData.data.password
                }
            })

            return { data: admin, msg: "Success", error: null }
        },
        async updateAdmin(_, {id, input: {email, password}}, {isAuth, db}: GraphQLContext) {
            if (!isAuth) return null

            const admin = await db.admin.update({
                where: {
                    id
                },
                data: {
                    email,
                    password
                }
            })

            return admin
        }
    }
}

export default AdminResolvers
