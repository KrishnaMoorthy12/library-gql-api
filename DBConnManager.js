import faunadb from 'faunadb';
import 'dotenv/config';

const db = new faunadb.Client({ secret: process.env.SECRET });
export const FQL = faunadb.query;

export default db;
