const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

const urlShortnerRoute = require("./routes/urlShortner");

const port = process.env.PORT || 4000;

require("dotenv/config");

app.set("view engine", "html");

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(bodyParser.json());

app.use("/urlShortner", urlShortnerRoute);

app.listen(port);
