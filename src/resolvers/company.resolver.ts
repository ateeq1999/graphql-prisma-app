import * as z from "zod"
import type { CreateCompanyArgs, CreateCompanyInput, CompanyValidationResponse, GraphQLContext, UpdateCompanyArgs } from '../types/types'

const CompanySchema = z.object({
  name: z.string(),
  logo: z.string().nullable(),
  desc: z.string().nullable(),
})

async function validate(input: CreateCompanyInput): Promise<CompanyValidationResponse> {
    const data = CompanySchema.safeParse(input)

    if (data.success != true) {
        return { issues: data.error.issues, data: null }
    }

    return { issues: [], data: data.data }
}

const CompanyResolver = {
    resolvers: {
        async getCompany(_: any, { id }: any, { isAuth, db }: GraphQLContext) {
            if (!isAuth) return null

            const company = await db.company.findUnique({
                where: {
                    id: id
                }
            })

            if(company != null){
                return company
            }else{
                return null
            }
        },
        async getCompanies(_: any, { }: any, { isAuth, db }: GraphQLContext) {
            if (!isAuth) return null

            const companies = await db.company.findMany({
                include: {
                    customers: true,
                },
            })

            if(companies != null){
                return companies
            }else{
                return null
            }
        },
    },

    mutations: {
        async createCompany(_: any, args: CreateCompanyArgs, {isAuth, db}: GraphQLContext) {
            if (!isAuth) return null

            const input = await validate(args.input)

            if (input.data != null) {
                const company = await db.company.create({
                    data: {
                        name: input.data.name,
                        logo: input.data.logo != null ? input.data.logo : "it-medica-logo",
                        desc: input.data.desc != null ? input.data.desc : "it-medica",
                    }
                })
    
                return company
            } else {
                return { issues: input.issues }
            }
        },
        async updateCompany(_: any, args: UpdateCompanyArgs, {isAuth, db}: GraphQLContext) {
            if (!isAuth) return null

            const input = await validate(args.input)

            if (input.data != null) {
                const company = await db.company.update({
                    where: {
                        id: args.id
                    },
                    data: {
                        name: input.data.name
                    }
                })
    
                return company
            } else {
                return { issues: input.issues }
            }
        }
    }
}

export default CompanyResolver
