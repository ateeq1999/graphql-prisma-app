import * as z from "zod"
import { CompleteCustomer, RelatedCustomerModel } from "./index"

export const PlanModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  desc: z.string().nullish(),
  price: z.number(),
})

export interface CompletePlan extends z.infer<typeof PlanModel> {
  customers: CompleteCustomer[]
}

/**
 * RelatedPlanModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPlanModel: z.ZodSchema<CompletePlan> = z.lazy(() => PlanModel.extend({
  customers: RelatedCustomerModel.array(),
}))
