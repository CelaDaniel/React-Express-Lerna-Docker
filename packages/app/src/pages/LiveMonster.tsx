/* eslint-disable no-case-declarations */
import React, { useReducer, useEffect } from "react";
import {
	Typography,
	Card,
	CardContent,
	CardMedia,
	Grid,
	styled,
} from "@mui/material";
import MonstersService from "../api/services/MonstersService";
import { Monster } from "../api/services/types/MonstersService.types";

const StyledCard = styled(Card)(({ theme }) => ({
	maxWidth: 345,
	margin: theme.spacing(2),
	transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
	"&:hover": {
		transform: "translateY(-4px)",
		boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
	},
}));

// Reducer to manage monster state
const monsterReducer = (
	state: Monster[],
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	action: { type: string; payload?: any },
) => {
	switch (action.type) {
		case "ADD_MONSTER":
			// Adding a monster and removing duplicates
			const newState = [...state, action.payload];
			// eslint-disable-next-line no-case-declarations
			const uniqueMonsters = newState.filter(
				(monster, index, self) =>
					index ===
					self.findIndex(
						(m) =>
							m.name === monster.name &&
							m.type.species === monster.type.species,
					),
			);
			return uniqueMonsters;
		case "REMOVE_OLD_MONSTERS":
			const now = new Date().getTime();
			return state.filter(
				(monster) => now - new Date(monster.createdAt!).getTime() < 10000,
			);
		case "REMOVE_DUPLICATES":
			// Periodically remove duplicates
			return state.filter(
				(monster, index, self) =>
					index ===
					self.findIndex(
						(m) =>
							m.name === monster.name &&
							m.type.species === monster.type.species,
					),
			);
		default:
			return state;
	}
};

const LiveMonsters: React.FC = () => {
	const [monsters, dispatch] = useReducer(monsterReducer, []);

	useEffect(() => {
		const fetchMonster = async () => {
			const data = await MonstersService.GET_RANDOM_MONSTER();
			return {
				id: data.id,
				name: data.name,
				level: data.level,
				type: data.type,
				imageUrl: data.imageUrl || "https://via.placeholder.com/150",
				createdAt: new Date(),
			} as Monster;
		};

		const intervalId = setInterval(async () => {
			const newMonster = await fetchMonster();
			dispatch({ type: "ADD_MONSTER", payload: newMonster });
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			dispatch({ type: "REMOVE_OLD_MONSTERS" });
			// dispatch({ type: "REMOVE_DUPLICATES" }); // Also remove duplicates periodically
		}, 1000); // Check every second to remove old monsters and duplicates

		return () => clearInterval(intervalId);
	}, []);

	return (
		<Grid container justifyContent="center" spacing={2}>
			{monsters.map((monster) => (
				<Grid item key={monster.id} xs={12} sm={6} md={4}>
					<StyledCard>
						<CardMedia
							component="img"
							height="140"
							image={monster.imageUrl}
							alt={`Image of ${monster.name}`}
							onError={(e) => {
								e.currentTarget.src = "https://via.placeholder.com/150"; // Fallback image on error
							}}
						/>
						<CardContent>
							<Typography variant="h5">{monster.name}</Typography>
							<Typography variant="body1">Level: {monster.level}</Typography>
							<Typography variant="body2">
								Type: {monster.type.species} - {monster.type.subSpecies}
							</Typography>
						</CardContent>
					</StyledCard>
				</Grid>
			))}
		</Grid>
	);
};

export default LiveMonsters;
