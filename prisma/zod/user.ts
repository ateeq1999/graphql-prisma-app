import * as z from "zod"
import { CompleteOrder, RelatedOrderModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.string(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  address: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  orders: CompleteOrder[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  orders: RelatedOrderModel.array(),
}))
