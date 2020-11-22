import express from 'express';
import morgan from 'morgan';
import { graphqlHTTP as GraphQLHandler } from 'express-graphql';

import Schema from './schema/Schema';

const server = express();

server.use(morgan('dev'));
server.use('/api', GraphQLHandler({ schema: Schema, graphiql: true }));

server.listen(5000, () => {
  console.log('Server started');
});
