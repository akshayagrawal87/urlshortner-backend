const express = require("express");

require("dotenv/config");

const ShortUrl = require("../models/shortUrl");

const mongoose = require("mongoose");

const router = express.Router();

mongoose.connect(process.env.DB_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
	console.log("Connected");
});

router.get("/", async (req, res) => {
	const shortUrls = await ShortUrl.find();
	res.send(shortUrls);
});

router.post("/", async (req, res) => {
	const data = await ShortUrl.create({ full: req.body.fullUrl });

	// const data = await ShortUrl.findOne({ full: req.body.fullUrl });

	res.send(data);
});


router.get("/chartData", async (req, res) => {
	const shortUrls = await ShortUrl.find();

	let count = {};

	for (let a of shortUrls) {
		count[a.createdOn] = count[a.createdOn] ? count[a.createdOn] + 1 : 1;
	}
	console.log(count);
	res.send(count);
});

router.get("/:shortUrl", async (req, res) => {
	const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
	if (shortUrl == null) return res.sendStatus(404);

	shortUrl.clicks++;
	shortUrl.save();

	res.redirect(shortUrl.full);
});



module.exports = router;
