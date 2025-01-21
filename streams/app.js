import { log } from "console";
import { createReadStream, createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFilePath = path.join(__dirname, "input.txt");
const outputFilePath = path.join(__dirname, "output.txt");

const readableStream = createReadStream(inputFilePath, {
	encoding: "utf-8",
	highWaterMark: 50, // Chunk of 16 chars
});

const writableStream = createWriteStream(outputFilePath);

// Listen for data chunks
readableStream.on("data", (chunk) => {
	console.log("Buffer(chunk: ", Buffer.from(chunk)); // convert the chunk to a buffer
	console.log("Received chunk: ", chunk);
	writableStream.write(chunk);
});

readableStream.on("end", () => {
	log("File read completed...");
	writableStream.end();
});
// Pipe is used to connect readableStream to writableStream
// readableStream.pipe(writableStream);

// Handle errors
readableStream.on("error", (err) => console.error("Error:", err));
writableStream.on("error", (err) => console.error("Error:", err));
