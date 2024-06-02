import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { generateName, validateOptions, transformMonster } from "../utils";
import { handleError } from "../middleware/errorHandling";

const prisma = new PrismaClient();

export const getMonsters = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { page = 1, limit = 10 } = req.query;
	const skip = (Number(page) - 1) * Number(limit);
	try {
		const monsters = await prisma.monster.findMany({
			skip,
			take: Number(limit),
		});
		const total = await prisma.monster.count();
		res.status(200).json({
			success: true,
			data: {
				monsters: monsters.map(transformMonster),
				total,
				page: Number(page),
				limit: Number(limit),
			},
		});
	} catch (error) {
		handleError(error, req, res, next);
	}
};

export const createMonster = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	let { name, level, species, subSpecies } = req.body;
	name = name || generateName();

	const existingMonster = await prisma.monster.findUnique({ where: { name } });
	if (existingMonster) {
		return res.status(400).json({
			success: false,
			message: "A monster with this name already exists.",
		});
	}

	if (!validateOptions(species, subSpecies, level)) {
		return res.status(400).json({
			success: false,
			message:
				"Invalid species, sub-species, or level exceeds maximum allowed (100).",
		});
	}

	try {
		const imageUrl = `https://robohash.org/${uuidv4()}?200x200`;
		const newMonster = await prisma.monster.create({
			data: {
				name,
				level,
				species,
				subSpecies,
				imageUrl,
			},
		});
		res.status(201).json({ success: true, data: transformMonster(newMonster) });
	} catch (error) {
		handleError(error, req, res, next);
	}
};

export const createRandomMonsters = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { count } = req.body;
	const randomMonsters = Array.from({ length: count }, () => ({
		name: generateName(),
		level: Math.floor(Math.random() * 100),
		species: ["Humanoid", "Reptile", "Beast"][Math.floor(Math.random() * 3)],
		subSpecies: ["Forest", "Mountain", "Fire"][Math.floor(Math.random() * 3)],
		imageUrl: `https://robohash.org/${uuidv4()}?200x200`,
	}));

	try {
		await prisma.monster.createMany({
			data: randomMonsters,
			skipDuplicates: true,
		});
		const names = randomMonsters.map((monster) => monster.name);
		const fetchedMonsters = await prisma.monster.findMany({
			where: { name: { in: names } },
		});
		res
			.status(201)
			.json({ success: true, data: fetchedMonsters.map(transformMonster) });
	} catch (error) {
		handleError(error, req, res, next);
	}
};

export const updateMonster = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { id } = req.params;
	const { name, level, species, subSpecies } = req.body;

	const existingMonster = await prisma.monster.findUnique({ where: { id } });
	if (!existingMonster) {
		return res.status(404).json({
			success: false,
			message: "Monster not found. Unable to update.",
		});
	}

	if (!validateOptions(species, subSpecies, level)) {
		return res.status(400).json({
			success: false,
			message:
				"Invalid species, sub-species, or level exceeds maximum allowed (100).",
		});
	}

	try {
		const updatedMonster = await prisma.monster.update({
			where: { id },
			data: {
				name,
				level,
				species,
				subSpecies,
			},
		});
		res
			.status(200)
			.json({ success: true, data: transformMonster(updatedMonster) });
	} catch (error) {
		handleError(error, req, res, next);
	}
};

export const getRandomMonster = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const monsters = await prisma.monster.findMany();
		if (monsters.length === 0) {
			return res
				.status(404)
				.json({ success: false, message: "No monsters found." });
		}
		const randomIndex = Math.floor(Math.random() * monsters.length);
		res
			.status(200)
			.json({ success: true, data: transformMonster(monsters[randomIndex]) });
	} catch (error) {
		handleError(error, req, res, next);
	}
};

export const deleteMonster = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { id } = req.params;
	const existingMonster = await prisma.monster.findUnique({ where: { id } });
	if (!existingMonster) {
		return res.status(404).json({
			success: false,
			message: "Monster not found. Unable to delete.",
		});
	}

	try {
		await prisma.monster.delete({ where: { id } });
		res
			.status(200)
			.json({ success: true, message: "Monster deleted successfully." });
	} catch (error) {
		handleError(error, req, res, next);
	}
};

export const deleteAllMonsters = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const count = await prisma.monster.count();
		if (count === 0) {
			return res.status(404).json({
				success: false,
				message: "No monsters found to delete.",
			});
		}

		await prisma.monster.deleteMany({});
		res.status(200).json({
			success: true,
			message: "All monsters have been deleted successfully.",
		});
	} catch (error) {
		handleError(error, req, res, next);
	}
};
