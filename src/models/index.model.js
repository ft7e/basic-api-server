'use strict';
require('dotenv').config();

const POSTGRES_URI =
  process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require('sequelize');

const food = require('./food.model');
const Clothes = require('./clothes.model');

let sequelizeOptions =
  process.env.NODE_ENV === 'production'
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
//Note on this
module.exports = {
  db: sequelize,
  Food: food(sequelize, DataTypes),
  Clothes: Clothes(sequelize, DataTypes),
};
