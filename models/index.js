const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const config = require("../nuxt.config.js");

const server = config.mongo.reduce(
  (server, mongo) => mongo.server || server,
  "127.0.0.1"
);

const database = config.mongo.reduce(
  (database, mongo) => mongo.database || database,
  "test"
);

mongoose.connect(`mongodb://${server}/${database}`);

const User = require("./user")({ mongoose, Schema });

module.exports = { User };
