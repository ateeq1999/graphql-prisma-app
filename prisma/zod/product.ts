import * as z from "zod"
import { Unit, ProductType } from "@prisma/client"
import { CompleteOrder, RelatedOrderModel, CompleteCategory, RelatedCategoryModel } from "./index"

export const ProductModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name_ar: z.string(),
  name_en: z.string(),
  secintefic_name: z.string(),
  active_material: z.string().nullish(),
  trade_name: z.string().nullish(),
  unit: z.nativeEnum(Unit),
  type: z.nativeEnum(ProductType),
  price: z.number(),
  quantity: z.number().int(),
})

export interface CompleteProduct extends z.infer<typeof ProductModel> {
  orders: CompleteOrder[]
  categories: CompleteCategory[]
}

/**
 * RelatedProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductModel: z.ZodSchema<CompleteProduct> = z.lazy(() => ProductModel.extend({
  orders: RelatedOrderModel.array(),
  categories: RelatedCategoryModel.array(),
}))
