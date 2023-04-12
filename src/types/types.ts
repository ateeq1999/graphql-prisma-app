import { PrismaClient, ProductType, Unit } from '@prisma/client'
 
const prisma = new PrismaClient()
 
export type GraphQLContext = {
    db: PrismaClient
    isAuth: Boolean
}

export type CategoryInput = {
    name: String
}

export type ZodError = {
    code: String
    maximum: Number
    type: String
    inclusive: Boolean
    exact: Boolean
    message: String
    path: [String]
}

export type ZodIssue = {
    code: String
    fatal: boolean | undefined
    message: String
    path: [String]
}

export type CreateCategoryInput = {
    name: string
}

export type CategoryValidationResponse = {
    data: CreateCategoryInput | null
    issues: Array<any>
}

export type CreateCategoryArgs = {
    input: CreateCategoryInput
}

export type UpdateCategoryArgs = {
    id: string
    input: CreateCategoryInput
}

export type CreateAdminInput = {
    email: string
    password: string
}

export type AdminValidationResponse = {
    data: CreateAdminInput | null
    issues: Array<any>
}

export type CreateAdminArgs = {
    input: CreateAdminInput
}

export type UpdateAdminArgs = {
    id: string
    input: CreateAdminInput
}

export type CreateProductInput = {
    name_ar: string
    name_en: string
    secintefic_name: string
    active_material: string
    trade_name: string
    unit: Unit
    type: ProductType
    quantity: number
    price: number
}

export type ProductValidationResponse = {
    data: CreateProductInput | null
    issues: Array<any>
}

export type CreateProductArgs = {
    input: CreateProductInput
}

export type CreateProductWithIdsArgs = {
    id: string
    input: CreateProductInput
    ids: Array<string>
}

export type UpdateProductArgs = {
    id: string
    input: CreateProductInput
}
export type UpdateProductWithIdsArgs = {
    id: string
    input: CreateProductInput
    ids: Array<string>
}

export type CreatePlanInput = {
    name: string
    price: number
    desc: string | null
}

export type PlanValidationResponse = {
    data: CreatePlanInput | null
    issues: Array<any>
}

export type CreatePlanArgs = {
    input: CreatePlanInput
}

export type UpdatePlanArgs = {
    id: string
    input: CreatePlanInput
}
