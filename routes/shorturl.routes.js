import { Router } from "express";
import {
	postURLShortner,
	getShortnerPage,
	redirectToShortLink,
} from "../contronllers/posturlshortner.controller.js";

const router = Router();

router.get("/report", (req, res) => {
	const student = [
		{
			name: "Aarav",
			grade: "10th",
			favouriteSubject: "Mathematics",
		},
		{
			name: "Ishita",
			grade: "9th",
			favouriteSubject: "Science",
		},
		{
			name: "Rohan",
			grade: "8th",
			favouriteSubject: "History",
		},
	];
	return res.render("report", { students: student });
});

// Handle GET request to display form and list of shortened URLs
router.get("/", getShortnerPage);

router.post("/", postURLShortner);

// Handle GET request for shortened URLs
router.get("/:shorturl", redirectToShortLink);
export { router };
