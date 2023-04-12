import * as z from "zod"
import type { PlanValidationResponse, CreatePlanArgs, CreatePlanInput, GraphQLContext, UpdatePlanArgs } from '../types/types'

const PlanSchema = z.object({
  name: z.string(),
  desc: z.string().nullable(),
  price: z.number(),
})

async function validate(input: CreatePlanInput): Promise<PlanValidationResponse> {
    const data = PlanSchema.safeParse(input)

    if (data.success != true) {
        return { issues: data.error.issues, data: null }
    }

    return { issues: [], data: data.data }
}

const PlanResolvers = {
    resolvers: {
        async getPlan(_: any, { id }: any, { isAuth, db }: GraphQLContext) {
            if (!isAuth) return null

            const plan = await db.plan.findUnique({
                where: {
                    id: id
                }
            })

            if(plan != null){
                return plan
            }else{
                return null
            }
        },
        async getPlans(_: any, { }: any, { isAuth, db }: GraphQLContext) {
            if (!isAuth) return null

            const plans = await db.plan.findMany()

            if(plans != null){
                return plans
            }else{
                return null
            }
        },
    },

    mutations: {
        async createPlan(_: any, args: CreatePlanArgs, {isAuth, db}: GraphQLContext) {
            if (!isAuth) return null

            const input = await validate(args.input)

            if (input.data != null) {
                const plan = await db.plan.create({
                    data: {
                        name: input.data.name,
                        price: input.data.price,
                        desc: input.data.desc ?? null
                    }
                })
    
                return plan
            } else {
                return { issues: input.issues }
            }
        },
        async updatePlan(_: any, args: UpdatePlanArgs, {isAuth, db}: GraphQLContext) {
            if (!isAuth) return null

            const input = await validate(args.input)

            if (input.data != null) {
                const plan = await db.plan.update({
                    where: {
                        id: args.id
                    },
                    data: {
                        name: input.data.name,
                        price: input.data.price,
                        desc: input.data.desc ?? null
                    }
                })
    
                return plan
            } else {
                return { issues: input.issues }
            }
        }
    }
}

export default PlanResolvers
