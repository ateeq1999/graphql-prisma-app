import { gql } from "apollo-server";
import categoryType from "./category.type";
import adminType from "./admin.type";
import productType from "./product.type";
import unionType from "./union.type";
import planType from "./plan.type";
import companyType from "./company.type";

const typeDefs = gql`
    scalar DateTime

    ${unionType.type}
    ${adminType.type}
    ${categoryType.type}
    ${productType.type}
    ${planType.type}
    ${companyType.type}

    ${adminType.input}
    ${categoryType.input}
    ${productType.input}
    ${planType.input}
    ${companyType.input}

    type Query {
        ${adminType.queries}
        ${categoryType.queries}
        ${productType.queries}
        ${planType.queries}
        ${companyType.queries}
    }

    type Mutation {
        ${adminType.mutations}
        ${categoryType.mutations}
        ${productType.mutations}
        ${planType.mutations}
        ${companyType.mutations}
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
