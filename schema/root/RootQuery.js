import { GraphQLID, GraphQLList, GraphQLObjectType } from 'graphql';

import { AuthorType, BookType } from '../types';
import db, { FQL } from '../../DBConnManager';

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: async (_parent, args) => {
        const result = await db.query(FQL.Get(FQL.Match(FQL.Index('book_by_id'), args.id)));
        return result.data;
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: async (_parent, args) => {
        const result = await db.query(FQL.Get(FQL.Match(FQL.Index('author_by_id'), args.id)));
        return result.data;
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: async () => {
        const booksRef = await db.query(FQL.Paginate(FQL.Match(FQL.Index('allBooks'))));
        return booksRef.data.map(async bookRef => {
          const book = await db.query(FQL.Get(bookRef));
          return book.data;
        });
      }
    },
    authors: {
      type: new GraphQLList(BookType),
      resolve: async () => {
        const authorsRef = await db.query(FQL.Paginate(FQL.Match(FQL.Index('allAuthors'))));
        return authorsRef.data.map(async authorRef => {
          const author = await db.query(FQL.Get(authorRef));
          return author.data;
        });
      }
    }
  })
});

export default RootQuery;
