import * as z from "zod"
import { CompleteCustomer, RelatedCustomerModel } from "./index"

export const CompanyModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  desc: z.string().nullish(),
  logo: z.string().nullish(),
})

export interface CompleteCompany extends z.infer<typeof CompanyModel> {
  customers: CompleteCustomer[]
}

/**
 * RelatedCompanyModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCompanyModel: z.ZodSchema<CompleteCompany> = z.lazy(() => CompanyModel.extend({
  customers: RelatedCustomerModel.array(),
}))
