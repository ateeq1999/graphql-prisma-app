import * as z from "zod"
import { CompleteProduct, RelatedProductModel, CompleteCategory, RelatedCategoryModel } from "./index"

export const CategoriesOnProductsModel = z.object({
  productId: z.string(),
  categoryId: z.string(),
  assignedAt: z.date(),
})

export interface CompleteCategoriesOnProducts extends z.infer<typeof CategoriesOnProductsModel> {
  product: CompleteProduct
  category: CompleteCategory
}

/**
 * RelatedCategoriesOnProductsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCategoriesOnProductsModel: z.ZodSchema<CompleteCategoriesOnProducts> = z.lazy(() => CategoriesOnProductsModel.extend({
  product: RelatedProductModel,
  category: RelatedCategoryModel,
}))
