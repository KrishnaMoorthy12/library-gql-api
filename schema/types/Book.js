import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

import AuthorType from './Author';
import db, { FQL } from '../../DBConnManager';

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: async book => {
        const result = await db.query(FQL.Get(FQL.Match(FQL.Index('author_by_id'), book.authorId)));
        return result.data;
      }
    }
  })
});

export default BookType;
