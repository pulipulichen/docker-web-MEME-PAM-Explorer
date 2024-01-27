
// const { Sequelize, DataTypes } = require('sequelize');
const {POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_DB} = process.env

// console.log({POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_DB})
// const sequelize = new Sequelize(`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DB}`)
const { R } = require("redbean-node");

// R.setup('postgres', {
//   host: POSTGRES_HOST,
//   user: POSTGRES_USER,
//   password: POSTGRES_PASSWORD,
//   database: POSTGRES_DB
// });

R.setup('sqlite', {
  filename: '/opt/input/dbfile.db'
});

module.exports = R