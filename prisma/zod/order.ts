import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, RelatedUserModel, CompleteProduct, RelatedProductModel } from "./index"

export const OrderModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string().nullish(),
})

export interface CompleteOrder extends z.infer<typeof OrderModel> {
  customer?: CompleteUser | null
  products: CompleteProduct[]
}

/**
 * RelatedOrderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrderModel: z.ZodSchema<CompleteOrder> = z.lazy(() => OrderModel.extend({
  customer: RelatedUserModel.nullish(),
  products: RelatedProductModel.array(),
}))
