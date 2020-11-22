import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';

import { AuthorType, BookType } from '../types';
import db from '../../DBConnManager';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        sex: { type: GraphQLString }
      },
      resolve: (_parent, args) => {
        const count = db.count('/authors');
        const newAuthor = { ...args, id: (count + 1).toString() };
        db.push('/authors', [newAuthor], false);
        return newAuthor;
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLID },
        authorId: { type: GraphQLID }
      },
      resolve: (_parent, args) => {
        const count = db.count('/books');
        const newBook = { ...args, id: (count + 1).toString() };
        db.push('/books', [newBook], false);
        return newBook;
      }
    }
  }
});

export default Mutation;
