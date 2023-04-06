import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
// import { PrismaClient } from './prisma/outDir'
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import path = require('path');
import resolvers from './resolvers';
import typeDefs from './types';

const prisma = new PrismaClient()

const plugins = [
    ApolloServerPluginLandingPageLocalDefault({ embed: true })
]

const server = new ApolloServer({
    plugins,
    typeDefs,
    resolvers,
    csrfPrevention: true,
    context: async ({ req }) => {
        const token = req.headers.token as string || '';

        let isLoggedIn = true

        return { db: prisma as PrismaClient, isAuth: isLoggedIn as Boolean };
    },
})
    
server
.listen({ port: 4000 }, () =>
    console.log('🚀 Server ready at: <http://localhost:4000>')
)