import { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { v4 as uuidv4 } from 'uuid';

import { AuthorType, BookType } from '../types';
import db, { FQL } from '../../DBConnManager';

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
      resolve: async (_parent, args) => {
        const data = { ...args, id: uuidv4() };
        const newAuthor = await db.query(FQL.Create(FQL.Collection('authors'), { data }));
        return newAuthor.data;
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLID) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: async (_parent, args) => {
        const data = { ...args, id: uuidv4() };
        const newBook = await db.query(FQL.Create(FQL.Collection('books'), { data }));
        return newBook.data;
      }
    }
  }
});

export default Mutation;
