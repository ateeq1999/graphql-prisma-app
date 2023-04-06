import { gql } from "apollo-server";
import categoryType from "./category.type";
import adminType from "./admin.type";
import productType from "./product.type";

const typeDefs = gql`
    scalar DateTime

    ${adminType.type}
    ${categoryType.type}
    ${productType.type}

    ${adminType.input}
    ${categoryType.input}
    ${productType.input}

    type Query {
        ${adminType.queries}
        ${categoryType.queries}
        ${productType.queries}
    }

    type Mutation {
        ${adminType.mutations}
        ${categoryType.mutations}
        ${productType.mutations}
    }

    type ZodError {
        code: String
        maximum: Int
        type: String
        inclusive: Boolean
        exact: Boolean
        message: String
        path: [String]
    }
`
export default typeDefs
