import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { v4 as uuidv4 } from 'uuid';

import { AuthorType, BookType } from '../types';
import db from '../../DBConnManager';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        sex: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (_parent, args) => {
        const newAuthor = { ...args, id: uuidv4() };
        db.push('/authors', [newAuthor], false);
        return newAuthor;
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLID) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (_parent, args) => {
        const newBook = { ...args, id: uuidv4() };
        db.push('/books', [newBook], false);
        return newBook;
      }
    }
  }
});

export default Mutation;
