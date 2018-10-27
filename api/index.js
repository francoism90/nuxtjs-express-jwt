// Create express instance
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

// Parse application/json and application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Require Modules
const auth = require("../utils/auth");
const models = require("../models");

// Import API Routes
app.use("/", require("./routes/auth")({ router, auth, models }));
app.use("/users", require("./routes/users")({ router, auth, models }));

// Export the server middleware
module.exports = {
  path: "/api",
  handler: app
};
