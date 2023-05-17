// const knex = require('knex');

// const shortUrlSchema = () => {
//   return knex.schema.createTableIfNotExists('shortenUrls', (table) => {
//     table.increments('id').primary();
//     table.string('url').notNullable();
//     table.string('urlId').notNullable();
//     table.string('shortUrl').notNullable();
//     table.timestamp('createdAt').defaultTo(knex.fn.now());
//   });
// };

// module.exports = shortUrlSchema;

// const knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: './db.sqlite3'
//   }
// });
const sqlite3 = require('sqlite3').verbose();
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite3',
    ssl: {rejectUnauthorized: false}
  },
  useNullAsDefault: true
});

knex.schema.hasTable('shortenUrls').then(function (exists) {
  if (!exists) {
    return knex.schema.createTable('shortenUrls', function (table) {
      table.increments('id').primary();
      table.string('url').notNullable();
      table.string('urlId').notNullable();
      table.string('shortUrl').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    })
    .then(() => {
      console.log('Table created successfully');
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      knex.destroy();
    });
  }
});


module.exports = knex;



