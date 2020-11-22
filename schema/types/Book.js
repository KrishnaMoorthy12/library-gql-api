import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

import AuthorType from './Author';
import db from '../../DBConnManager';

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: book => {
        return db.find('/authors', author => {
          if (book.authorId === author.id) {
            return author;
          }
        });
      }
    }
  })
});

export default BookType;
