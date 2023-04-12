import * as z from "zod"
import { CompleteOrder, RelatedOrderModel, CompletePlan, RelatedPlanModel, CompleteCompany, RelatedCompanyModel } from "./index"

export const CustomerModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.string(),
  phone: z.string(),
  name: z.string(),
  planId: z.string().nullish(),
  companyId: z.string().nullish(),
})

export interface CompleteCustomer extends z.infer<typeof CustomerModel> {
  orders: CompleteOrder[]
  plan?: CompletePlan | null
  company?: CompleteCompany | null
}

/**
 * RelatedCustomerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCustomerModel: z.ZodSchema<CompleteCustomer> = z.lazy(() => CustomerModel.extend({
  orders: RelatedOrderModel.array(),
  plan: RelatedPlanModel.nullish(),
  company: RelatedCompanyModel.nullish(),
}))
