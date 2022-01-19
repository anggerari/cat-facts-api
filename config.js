import dotenv from 'dotenv';
dotenv.config();

export default {
  service: {
    port: 3000
  },
  source: {
    url: "https://cat-fact.herokuapp.com"
  },
  db_uri: process.env.DB_URI
}