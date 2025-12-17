const { Pool } = require('pg')
require('dotenv').config();

const pool = new Pool({
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE,
  host: process.env.HOST,
  port: 5432
})

module.exports = pool;