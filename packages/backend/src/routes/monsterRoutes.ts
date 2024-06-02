import { Router } from "express";
import {
	createMonster,
	createRandomMonsters,
	deleteMonster,
	getMonsters,
	getRandomMonster,
	updateMonster,
	deleteAllMonsters,
} from "../controllers/monsterController";

const router = Router();

router.get("/monsters", getMonsters);
router.get("/monsters/random", getRandomMonster);
router.post("/monsters/create", createMonster);
router.post("/monsters/create-random", createRandomMonsters);
router.put("/monsters/:id", updateMonster);
router.delete("/monsters/:id", deleteMonster);
router.delete("/monsters", deleteAllMonsters);

export default router;
