import * as z from "zod"

export const AdminModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.string(),
  password: z.string(),
})

export const AdminValidator = z.object({
  email: z.string(),
  password: z.string(),
})
