import { GraphQLSchema } from 'graphql';

import RootQuery from './RootQuery';
import Mutation from './Mutation';

const Schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
export default Schema;
