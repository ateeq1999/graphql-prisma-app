import * as z from "zod"
import * as imports from "../null"
import { CompleteCategory, RelatedCategoryModel, CompleteOrder, RelatedOrderModel } from "./index"

export const ProductModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  sku: z.string(),
  description: z.string().nullish(),
  quantity: z.number().int(),
})

export interface CompleteProduct extends z.infer<typeof ProductModel> {
  categories: CompleteCategory[]
  orders: CompleteOrder[]
}

/**
 * RelatedProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductModel: z.ZodSchema<CompleteProduct> = z.lazy(() => ProductModel.extend({
  categories: RelatedCategoryModel.array(),
  orders: RelatedOrderModel.array(),
}))
