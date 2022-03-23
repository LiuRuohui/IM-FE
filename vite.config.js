import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { visualizer } from "rollup-plugin-visualizer"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		visualizer({
			filename: "./dist/status.html",
			open: false,
			template: "treemap",
			// @ts-ignore
			gzipSize: true,
			// @ts-ignore
			brotliSize: true,
		}),
	],
	server: {
		host: "0.0.0.0",
	},
})
