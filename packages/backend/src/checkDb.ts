import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkDatabaseConnection() {
	console.log("Checking database connection...");
	try {
		await prisma.$connect();
		console.log("Connection successful!");

		// Test a basic query
		const allMonsters = await prisma.monster.findMany();
		console.log("All monsters:", allMonsters);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Unable to connect to the database:", error.message);
			console.error("Error details:", error);
		} else {
			console.error("Unknown error occurred while connecting to the database.");
		}
	} finally {
		await prisma.$disconnect();
		console.log("Database connection closed.");
	}
}

checkDatabaseConnection();
