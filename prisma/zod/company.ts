import * as z from "zod"

export const CompanyModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  logo: z.string(),
  desc: z.string(),
})
