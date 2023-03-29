const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
const app = express();

const middleware = require("./utils/middleware");

app.use(express.json());
app.use(express.static("build"));
app.use(cors());
app.use(middleware.requestLogger);

app.use(middleware.errorHandler);
module.exports = app;
