import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import BookType from './Book';
import db from '../../DBConnManager';

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    sex: { type: GraphQLString },
    books: {
      type: GraphQLList(BookType),
      resolve: author => {
        return db.filter('/books', book => book.authorId === author.id);
      }
    }
  })
});

export default AuthorType;
