import { gql } from "apollo-server";
import categoryType from "./category.type";
import adminType from "./admin.type";

const typeDefs = gql`
    scalar DateTime

    ${adminType.type}
    ${categoryType.type}

    ${adminType.input}
    ${categoryType.input}

    type Query {
        ${adminType.queries}
        ${categoryType.queries}
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

    type Mutation {
        ${adminType.mutations}
        ${categoryType.mutations}
    }
`
export default typeDefs
