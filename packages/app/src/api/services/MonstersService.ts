import api from "../config";
import { Endpoints } from "../../enums/Endpoints";
import {
	MonstersGetAllResponse,
	Monster,
	DeleteMonsterResponse,
	RandomMonsterInput,
	MonsterRequest,
	MonstersFetchRequest,
	UpdateMonsterRequest,
} from "./types/MonstersService.types";
import { toast } from "react-toastify";

const MonstersService = {
	GET_ALL_MONSTERS: async (
		request: MonstersFetchRequest,
	): Promise<MonstersGetAllResponse> => {
		return api
			.get(`${Endpoints.MONSTERS}?page=${request.page}&limit=${request.limit}`)
			.then((response) => {
				return response.data.data as MonstersGetAllResponse;
			});
	},
	GET_RANDOM_MONSTER: async (): Promise<Monster> => {
		return api.get(Endpoints.GET_RANDOM_MONSTER).then((response) => {
			console.log(response.data);
			return response.data.data as Monster;
		});
	},
	CREATE_MONSTER: async (request: MonsterRequest): Promise<Monster> => {
		return api.post(Endpoints.CREATE_MONSTER, request).then((response) => {
			toast.success("Successfully created Monster");
			return response.data.data as Monster;
		});
	},
	CREATE_RANDOM_MONSTERS: async (
		request: RandomMonsterInput,
	): Promise<Monster[]> => {
		return api
			.post(Endpoints.CREATE_RANDOM_MONSTERS, request)
			.then((response) => {
				toast.success("Successfully created Monsters");
				return response.data.data as Monster[];
			});
	},
	UPDATE_MONSTER: async (request: UpdateMonsterRequest): Promise<Monster> => {
		return api
			.put(`${Endpoints.MONSTERS}/${request.id}`, request.request)
			.then((response) => {
				toast.success("Successfully updated Monster");
				return response.data.data as Monster;
			});
	},
	REMOVE_MONSTER: async (id: string): Promise<DeleteMonsterResponse> => {
		return api.delete(`${Endpoints.MONSTERS}/${id}`).then((response) => {
			toast.success("Successfully deleted Monster");
			return response.data as DeleteMonsterResponse;
		});
	},
	REMOVE_ALL_MONSTERS: async (): Promise<DeleteMonsterResponse> => {
		return api.delete(Endpoints.MONSTERS).then((response) => {
			toast.success("Successfully deleted all Monster");
			return response.data as DeleteMonsterResponse;
		});
	},
};

export default MonstersService;
