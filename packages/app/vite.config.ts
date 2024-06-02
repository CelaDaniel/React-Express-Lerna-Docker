// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	plugins: [react()],
	server: {
		host: "0.0.0.0",
		port: 3000,
		watch: {
			usePolling: true, // Enable polling
			interval: 100, // Poll every 100 milliseconds (adjust as necessary)
			ignored: ["**/node_modules/**", "**/.git/**", "**/dist/**"],
		},
	},
});
