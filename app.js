import express from "express";
import chalk from "chalk";
import { router } from "./routes/shorturl.routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// by default vies folder ko render karta hai
app.set("view engine", "ejs");

app.use(router);

// Start the Express server
const start = async () => {
	try {
		await app.listen(PORT, () => {
			console.log(
				chalk.blueBright.bgGreen(
					`Server is running on http://localhost:${PORT}.`
				)
			);
		});
	} catch (error) {
		console.error(chalk.blueBright.bgRed(error.message));
	}
};

start();
