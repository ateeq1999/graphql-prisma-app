import * as z from "zod"
import { CompleteOrder, RelatedOrderModel, CompleteProductCategory, RelatedProductCategoryModel } from "./index"

export const ProductModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name_ar: z.string(),
  name_en: z.string(),
  secintefic_name: z.string(),
  active_material: z.string().nullish(),
  trade_name: z.string().nullish(),
  units: z.string().nullish(),
  price: z.number().int(),
  quantity: z.number().int(),
})

export interface CompleteProduct extends z.infer<typeof ProductModel> {
  orders: CompleteOrder[]
  categories: CompleteProductCategory[]
}

/**
 * RelatedProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductModel: z.ZodSchema<CompleteProduct> = z.lazy(() => ProductModel.extend({
  orders: RelatedOrderModel.array(),
  categories: RelatedProductCategoryModel.array(),
}))
