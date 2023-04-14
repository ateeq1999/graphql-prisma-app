import * as z from "zod"
import type { AdminValidationResponse, CreateAdminArgs, CreateAdminInput, GraphQLContext, UpdateAdminArgs } from '../types/types'
import { hashPassword } from "../services/Auth"

const AdminSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

async function validate(input: CreateAdminInput): Promise<AdminValidationResponse> {
    const data = AdminSchema.safeParse(input)

    if (data.success != true) {
        return { issues: data.error.issues, data: null }
    }

    return { issues: [], data: data.data }
}

const AdminResolver = {
    resolvers: {
        async getAdmin(_: any, { id }: any, { isAuth, db }: GraphQLContext) {
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
        async getAdmins(_: any, { }: any, { isAuth, db }: GraphQLContext) {
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
        async createAdmin(_: any, args: CreateAdminArgs, {isAuth, db}: GraphQLContext) {
            if (!isAuth) return null

            const input = await validate(args.input)

            if (input.data != null) {
                const admin = await db.admin.create({
                    data: {
                        email: input.data.email,
                        password: hashPassword(input.data.password)
                    }
                })
    
                return admin
            } else {
                return { issues: input.issues }
            }
        },
        async updateAdmin(_: any, args: UpdateAdminArgs, {isAuth, db}: GraphQLContext) {
            if (!isAuth) return null

            const input = await validate(args.input)

            if (input.data != null) {
                const admin = await db.admin.update({
                    where: {
                        id: args.id
                    },
                    data: {
                        email: input.data.email,
                        password: hashPassword(input.data.password)
                    }
                })
    
                return admin
            } else {
                return { issues: input.issues }
            }
        },

        async registerAdmin(_: any, args: CreateAdminArgs, {isAuth, db}: GraphQLContext) {
            if (!isAuth) return null

            const input = await validate(args.input)

            if (input.data != null) {
                const admin = await db.admin.create({
                    data: {
                        email: input.data.email,
                        password: hashPassword(input.data.password)
                    }
                })
    
                return admin
            } else {
                return { issues: input.issues }
            }
        }
    }
}

export default AdminResolver
