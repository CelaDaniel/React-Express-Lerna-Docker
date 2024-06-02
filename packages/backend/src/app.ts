import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import monsterRoutes from "./routes/monsterRoutes";

dotenv.config();

const app = express();

// Middleware setup
function setupMiddleware(app: express.Application): void {
	app.use(express.json()); // Body parser middleware

	// CORS middleware
	const corsOptions = {
		origin: "http://localhost:3000", // Your frontend origin
		optionsSuccessStatus: 200,
	};
	app.use(cors(corsOptions));
}

// Route handlers
function setupRoutes(app: express.Application): void {
	app.use(monsterRoutes); // Register monster routes

	// Root URL route
	app.get("/", (req: Request, res: Response) => {
		res.send("Welcome to the Monsters API");
	});
}

// Initialize middleware and routes
setupMiddleware(app);
setupRoutes(app);

export default app;
