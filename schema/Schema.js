import { GraphQLSchema } from 'graphql';

import { Mutation, RootQuery } from './root';

const Schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
export default Schema;
