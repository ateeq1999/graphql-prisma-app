import { gql } from "apollo-server";
import categoryType from "./category.type";
import adminType from "./admin.type";
import productType from "./product.type";
import unionType from "./union.type";
import planType from "./plan.type";

const typeDefs = gql`
    scalar DateTime

    ${unionType.type}
    ${adminType.type}
    ${categoryType.type}
    ${productType.type}
    ${planType.type}

    ${adminType.input}
    ${categoryType.input}
    ${productType.input}
    ${planType.input}

    type Query {
        ${adminType.queries}
        ${categoryType.queries}
        ${productType.queries}
        ${planType.queries}
    }

    type Mutation {
        ${adminType.mutations}
        ${categoryType.mutations}
        ${productType.mutations}
        ${planType.mutations}
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
