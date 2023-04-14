import { DateTime } from "luxon";
import { GraphQLScalarType, Kind } from 'graphql'
import CategoryResolver from './category.resolver';
import AdminResolver from "./admin.resolver";
import ProductResolver from "./product.resolver";
import PlanResolver from "./plan.resolver";
import CompanyResolver from "./company.resolver";

const dateScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Date custom scalar type',
  serialize(value) {
    return value; // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return value;  // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return DateTime.fromMillis(Number(ast.value));  // Convert hard-coded AST string to integer and then to DateTime
    }

    return null; // Invalid hard-coded value (not an integer)
  },
});


const resolvers = {
  DateTime: dateScalar,

   CreateCompanyResponse: {
      __resolveType(obj: any) {
  
        const size = Object.keys(obj).length
  
        if (size === 6) {
          return "Company"
        }
  
        if (size != 6) {
          return "ValidationError"
        }
  
        return null; // GraphQLError is thrown
      },
    },

  CreateCategoryResponse: {
    __resolveType(obj: any) {

      const size = Object.keys(obj).length

      if (size === 4) {
        return "Category"
      }

      if (size != 4) {
        return "ValidationError"
      }

      return null; // GraphQLError is thrown
    },
  },

  CreateProductResponse: {
    __resolveType(obj: any) {

      const size = Object.keys(obj).length

      if (size === 12) {
        return "Product"
      }

      if (size != 12) {
        return "ValidationError"
      }

      return null; // GraphQLError is thrown
    },
  },

  CreatePlanResponse: {
    __resolveType(obj: any) {

      const size = Object.keys(obj).length

      if (size === 6) {
        return "Plan"
      }

      if (size != 6) {
        return "ValidationError"
      }

      return null; // GraphQLError is thrown
    },
  },

  CreateAdminResponse: {
    __resolveType(obj: any) {

      const size = Object.keys(obj).length

      if (size === 5) {
        return "Admin"
      }

      if (size != 5) {
        return "ValidationError"
      }

      return null; // GraphQLError is thrown
    },
  },


  Query: {
    ...AdminResolver.resolvers,
    ...CategoryResolver.resolvers,
    ...ProductResolver.resolvers,
    ...PlanResolver.resolvers,
    ...CompanyResolver.resolvers,
  },
  
  Mutation: {
    ...AdminResolver.mutations,
    ...CategoryResolver.mutations,
    ...ProductResolver.mutations,
    ...PlanResolver.mutations,
    ...CompanyResolver.mutations,
  }
}

export default resolvers
