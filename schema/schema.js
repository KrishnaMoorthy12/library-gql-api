import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import db from '../DBConnManager';

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, args) => {
        return db.find('/authors', (entry, index) => {
          if (parent.authorId === entry.id) {
            return entry;
          }
        });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: GraphQLList(BookType),
      resolve: (parent, args) => {
        return db.filter('/books', (entry, index) => entry.authorId === parent.id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (parent, args) => {
        return db.find('/books', (entry, index) => {
          if (entry.id === args.id) {
            return entry;
          }
        });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (parent, args) => {
        return db.find('/authors', (entry, index) => {
          if (entry.id === args.id) {
            return entry;
          }
        });
      }
    }
  })
});

const Schema = new GraphQLSchema({ query: RootQuery });
export { Schema };
