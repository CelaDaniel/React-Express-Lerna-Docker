import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
	TextField,
	Button,
	Tabs,
	Tab,
	Box,
	Container,
	MenuItem,
	Typography,
	Paper,
} from "@mui/material";
import MonstersService from "../api/services/MonstersService";
import {
	MonsterRequest,
	RandomMonsterInput,
} from "../api/services/types/MonstersService.types";

interface ManualMonsterInput {
	name: string;
	species: string;
	subSpecies: string;
	level: number;
}

const speciesOptions = ["Humanoid", "Reptile", "Beast"];
const subSpeciesOptions = ["Forest", "Mountain", "Fire"];

const CreateMonster: React.FC = () => {
	const [tabValue, setTabValue] = useState(0);
	const {
		control: controlManual,
		handleSubmit: handleSubmitManual,
		reset: resetManual,
		formState: { errors: errorsManual },
	} = useForm<ManualMonsterInput>({
		defaultValues: {
			name: "",
			species: "",
			subSpecies: "",
			level: 1,
		},
		mode: "onChange",
	});
	const {
		control: controlRandom,
		handleSubmit: handleSubmitRandom,
		reset: resetRandom,
		formState: { errors: errorsRandom },
	} = useForm<RandomMonsterInput>({
		defaultValues: {
			count: 1,
		},
		mode: "onChange",
	});

	const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
		resetManual();
		resetRandom();
	};

	const onSubmitManual = (data: ManualMonsterInput) => {
		const monsterRequest: MonsterRequest = {
			...(data.name && { name: data.name }),
			level: data.level,
			species: data.species,
			subSpecies: data.subSpecies,
		};

		MonstersService.CREATE_MONSTER(monsterRequest)
			.then((createdMonster) => {
				console.log("Monster created:", createdMonster);
				resetManual();
			})
			.catch((error) => {
				console.error("Error creating monster:", error);
			});
	};

	const onSubmitRandom = (data: RandomMonsterInput) => {
		MonstersService.CREATE_RANDOM_MONSTERS({ count: data.count })
			.then((randomMonsters) => {
				console.log("Random monsters created:", randomMonsters);
				resetRandom();
			})
			.catch((error) => {
				console.error("Error creating random monsters:", error);
			});
	};

	return (
		<Container maxWidth="sm">
			<Paper elevation={3} sx={{ p: 3, mt: 4 }}>
				<Typography variant="h4" gutterBottom align="center">
					Monster Creation
				</Typography>
				<Tabs
					value={tabValue}
					onChange={handleTabChange}
					textColor="secondary"
					indicatorColor="secondary"
					variant="fullWidth"
					aria-label="monster creation tabs"
					sx={{ mb: 2 }}
				>
					<Tab label="Create Monster Manually" />
					<Tab label="Create Random Monsters" />
				</Tabs>

				{tabValue === 0 && (
					<form onSubmit={handleSubmitManual(onSubmitManual)}>
						<Controller
							name="name"
							control={controlManual}
							render={({ field }) => (
								<TextField
									{...field}
									label="Name"
									variant="outlined"
									fullWidth
									margin="normal"
									helperText="If empty will be auto generated"
								/>
							)}
						/>
						<Controller
							name="species"
							control={controlManual}
							rules={{ required: "Species is required" }}
							render={({ field }) => (
								<TextField
									{...field}
									select
									label="Species"
									variant="outlined"
									fullWidth
									margin="normal"
									error={!!errorsManual.species}
									helperText={errorsManual.species?.message || ""}
								>
									{speciesOptions.map((option) => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
						<Controller
							name="subSpecies"
							control={controlManual}
							rules={{ required: "Sub-species is required" }}
							render={({ field }) => (
								<TextField
									{...field}
									select
									label="Sub-Species"
									variant="outlined"
									fullWidth
									margin="normal"
									error={!!errorsManual.subSpecies}
									helperText={errorsManual.subSpecies?.message || ""}
								>
									{subSpeciesOptions.map((option) => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
						<Controller
							name="level"
							control={controlManual}
							rules={{
								required: "Level must be between 1 and 100",
								min: { value: 1, message: "Level must be at least 1" },
								max: { value: 100, message: "Level must be at most 100" },
							}}
							render={({ field }) => (
								<TextField
									{...field}
									type="number"
									label="Level"
									variant="outlined"
									fullWidth
									margin="normal"
									error={!!errorsManual.level}
									helperText={errorsManual.level?.message || ""}
									onChange={(e) => {
										const value = parseInt(e.target.value, 10);
										if (value < 1) {
											field.onChange(1);
										} else if (value > 100) {
											field.onChange(100);
										} else {
											field.onChange(value);
										}
									}}
								/>
							)}
						/>
						<Box
							sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
						>
							<Button type="submit" variant="contained" color="secondary">
								Create Monster
							</Button>
							<Button onClick={() => resetManual()} variant="outlined">
								Clear
							</Button>
						</Box>
					</form>
				)}

				{tabValue === 1 && (
					<form onSubmit={handleSubmitRandom(onSubmitRandom)}>
						<Controller
							name="count"
							control={controlRandom}
							rules={{
								required: "Count must be between 1 and 100",
								min: { value: 1, message: "Count must be at least 1" },
								max: { value: 100, message: "Count must be at most 100" },
							}}
							render={({ field }) => (
								<TextField
									{...field}
									type="number"
									label="Number of Monsters"
									variant="outlined"
									fullWidth
									margin="normal"
									error={!!errorsRandom.count}
									helperText={errorsRandom.count?.message || ""}
									onChange={(e) => {
										const value = parseInt(e.target.value, 10);
										if (value < 1) {
											field.onChange(1);
										} else if (value > 100) {
											field.onChange(100);
										} else {
											field.onChange(value);
										}
									}}
								/>
							)}
						/>
						<Box
							sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
						>
							<Button type="submit" variant="contained" color="secondary">
								Generate
							</Button>
							<Button onClick={() => resetRandom()} variant="outlined">
								Clear
							</Button>
						</Box>
					</form>
				)}
			</Paper>
		</Container>
	);
};

export default CreateMonster;
