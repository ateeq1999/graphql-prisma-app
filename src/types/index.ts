import { gql } from "apollo-server";
import categoryType from "./category.type";

const typeDefs = gql`
    scalar DateTime

    ${categoryType.type}

    ${categoryType.input}

    # interface TokenType{
    #     token: String
    #     key: String
    # }

    # type AuthUser{
    #     id: String
    #     phone: String
    #     password: String
    #     createdAt: String
    #     updatedAt: String
    # }

    # interface VerifyTokenType{
    #     user: AuthUser
    #     isLoggedIn: Boolean
    # }

    # type AuthResponse {
    #     token: String
    #     user: User
    # }

    type Query {
        # me: User
        ${categoryType.queries}
    }

    type Mutation {
        # login(input: userInput): AuthResponse
        # register(input: userInput): AuthResponse
        ${categoryType.mutations}
    }
`
export default typeDefs
