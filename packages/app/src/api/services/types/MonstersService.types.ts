export interface Monster {
	id: string;
	name: string;
	level: number;
	type: {
		species: string;
		subSpecies: string;
	};
	imageUrl: string;
	createdAt?: Date;
}

export interface MonstersFetchRequest {
	page: number;
	limit: number;
}

export interface MonsterRequest {
	id?: string;
	name?: string;
	level: number;
	species: string;
	subSpecies: string;
}

export interface RandomMonsterInput {
	count: number;
}

export interface MonstersGetAllResponse {
	monsters: Monster[];
	total: number;
	page: number;
	limit: number;
}

export interface DeleteMonsterResponse {
	message: string;
}

export interface UpdateMonsterRequest {
	request: {
		name: string;
		level: number;
		species: string;
		subSpecies: string;
	};
	id: string;
}
