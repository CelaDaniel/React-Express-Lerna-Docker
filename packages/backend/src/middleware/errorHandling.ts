import { Request, Response, NextFunction } from "express";

export const handleError = (
	error: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (error instanceof Error) {
		res
			.status(500)
			.json({ error: `An unexpected error occurred: ${error.message}` });
	} else {
		res.status(500).json({ error: "An unknown error occurred" });
	}
};
