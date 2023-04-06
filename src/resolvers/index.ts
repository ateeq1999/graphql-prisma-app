import { DateTime } from "luxon";
import { GraphQLScalarType, Kind } from 'graphql'
import categoryResolver from './category.resolver';
import AdminResolvers from "./admin.resolver";
import ProductResolvers from "./product.resolver";

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

      if (size === 11) {
        return "Product"
      }

      if (size != 11) {
        return "ValidationError"
      }

      return null; // GraphQLError is thrown
    },
  },

  Query: {
    ...AdminResolvers.resolvers,
    ...categoryResolver.resolvers,
    ...ProductResolvers.resolvers,
  },
  
  Mutation: {
    ...AdminResolvers.mutations,
    ...categoryResolver.mutations,
    ...ProductResolvers.mutations,
  }
}

export default resolvers
