import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';
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
    sex: { type: GraphQLString },
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
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        return db.filter('/books', () => true);
      }
    },
    authors: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        return db.filter('/authors', () => true);
      }
    }
  })
});

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
      resolve: (parent, args) => {
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
      resolve: (parent, args) => {
        const count = db.count('/books');
        const newBook = { ...args, id: (count + 1).toString() };
        db.push('/books', [newBook], false);
        return newBook;
      }
    }
  }
});

const Schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
export { Schema };
