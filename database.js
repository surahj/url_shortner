const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.sqlite3');

const config = {
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite3',
    ssl: {rejectUnauthorized: false}
  },
  useNullAsDefault: true
};

module.exports = config;
