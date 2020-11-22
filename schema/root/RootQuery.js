import { GraphQLID, GraphQLList, GraphQLObjectType } from 'graphql';

import { AuthorType, BookType } from '../types';
import db from '../../DBConnManager';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (_parent, args) => {
        return db.find('/books', book => {
          if (book.id === args.id) {
            return book;
          }
        });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (_parent, args) => {
        return db.find('/authors', author => {
          if (author.id === args.id) {
            return author;
          }
        });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: () => db.filter('/books', () => true)
    },
    authors: {
      type: new GraphQLList(BookType),
      resolve: () => db.filter('/authors', () => true)
    }
  })
});

export default RootQuery;
