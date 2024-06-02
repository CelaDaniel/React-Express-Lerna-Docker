import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
	baseURL: "http://localhost:5000",
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		// Error handling with toast notifications
		console.log(error);
		toast.error(
			error.response?.data.message || "An unexpected error occurred!",
		);
		return await Promise.reject(error);
	},
);

export default api;
