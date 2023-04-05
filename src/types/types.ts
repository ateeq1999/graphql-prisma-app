import { PrismaClient } from '@prisma/client'
 
const prisma = new PrismaClient()
 
export type GraphQLContext = {
    db: PrismaClient,
    isAuth: Boolean
}

export type CategoryInput = {
    name: String,
}
