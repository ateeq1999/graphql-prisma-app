import { Customer, PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient()

const SECRET = 'ANTONIO-REST-API';

export const authentication = (salt: string, password: string): string => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

export const hashPassword = (password: string): string => {
  return crypto.createHmac('sha256', password).update(SECRET).digest('hex');
}

export const isAuth = async (token: string): Promise<Boolean> => {
    const customer = await prisma.customer.findUnique({
        where: {
            phone: token
        }
    })

    if (customer != null) {
        return true
    }

    return false
}

export const random = () => crypto.randomBytes(128).toString('base64');