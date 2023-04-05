import { DateTime } from "luxon";
import { GraphQLScalarType, Kind } from 'graphql'
import categoryResolver from './category.resolver';

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

  Query: {
    ...categoryResolver.resolvers,
  },
  
  Mutation: {
    ...categoryResolver.mutations,
  }
}

export default resolvers
