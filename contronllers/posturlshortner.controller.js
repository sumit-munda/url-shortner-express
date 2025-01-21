import crypto from "crypto";
import { loadLinks, saveLinks } from "../models/shorturl.model.js";

export const getShortnerPage = async (req, res) => {
	try {
		const links = await loadLinks();

		return res.render("index", { links, host: req.host });
	} catch (error) {
		console.error(chalk.blueBright.bgRed(error.message));
		return res.status(500).send("Internal Server Error!");
	}
};

export const postURLShortner = async (req, res) => {
	// Handle POST request to create a new shortened
	try {
		const { url, shorturl } = req.body;
		const finalShortUrl = shorturl || crypto.randomBytes(4).toString("hex");
		const links = await loadLinks();

		// Check if the short URL already exists
		if (links[finalShortUrl]) {
			return res
				.status(400)
				.send("Short URL already exists. Please try another one.");
		}

		// Save the new shortened URL
		links[finalShortUrl] = url;
		await saveLinks(links);

		// Redirect back to the home page to show updated list
		return res.redirect("/");
	} catch (error) {
		console.error(chalk.blueBright.bgRed(error.message));
		return res.status(500).send("Internal Server Error!");
	}
};

export const redirectToShortLink = async (req, res) => {
	try {
		const { shorturl } = req.params;
		const links = await loadLinks();

		// If the short URL doesn't exist, show 404
		if (!links[shorturl]) {
			return res.status(404).send("404 error occurred");
		}

		// Redirect to the original URL
		return res.redirect(links[shorturl]);
	} catch (error) {
		console.error(chalk.blueBright.bgRed(error.message));
		return res.status(500).send("Internal Server Error!");
	}
};
