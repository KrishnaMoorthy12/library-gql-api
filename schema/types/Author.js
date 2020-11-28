import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import BookType from './Book';
import db, { FQL } from '../../DBConnManager';

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    sex: { type: GraphQLString },
    books: {
      type: GraphQLList(BookType),
      resolve: async author => {
        const booksRef = await db.query(FQL.Paginate(FQL.Match(FQL.Index('books_by_authorId'), author.id)));
        return booksRef.data.map(async bookRef => {
          const book = await db.query(FQL.Get(bookRef));
          return book.data;
        });
      }
    }
  })
});

export default AuthorType;
