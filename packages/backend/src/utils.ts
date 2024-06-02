import {
	uniqueNamesGenerator,
	Config,
	adjectives,
	colors,
	animals,
} from "unique-names-generator";

export const nameConfig: Config = {
	dictionaries: [adjectives, colors, animals],
	separator: " ",
	length: 2,
	style: "capital",
};

export const generateName = () => uniqueNamesGenerator(nameConfig);

export const validateOptions = (
	species: string,
	subSpecies: string,
	level: number,
) => {
	const speciesOptions = ["Humanoid", "Reptile", "Beast"];
	const subSpeciesOptions = ["Forest", "Mountain", "Fire"];
	return (
		speciesOptions.includes(species) &&
		subSpeciesOptions.includes(subSpecies) &&
		level <= 100
	);
};

export const transformMonster = (monster: any) => ({
	id: monster.id,
	name: monster.name,
	level: monster.level,
	type: {
		species: monster.species,
		subSpecies: monster.subSpecies,
	},
	imageUrl: monster.imageUrl,
});
