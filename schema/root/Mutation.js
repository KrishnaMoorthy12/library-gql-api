import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { v4 as uuidv4 } from 'uuid';

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
        const newAuthor = { ...args, id: uuidv4() };
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
        const newBook = { ...args, id: uuidv4() };
        db.push('/books', [newBook], false);
        return newBook;
      }
    }
  }
});

export default Mutation;
