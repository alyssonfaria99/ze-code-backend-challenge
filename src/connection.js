require("dotenv").config();

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DB
    },
    migrations: {
        directory: './migrations'
    },
    seeds: {
        directory: './seeds'
    }

});

module.exports = knex;


