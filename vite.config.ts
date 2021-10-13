import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

import copy from 'rollup-plugin-copy';

import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		WindiCSS(),
		copy({
			targets: [
				{ src: 'src/index.html', dest: 'dist/public' },
				{ src: 'src/assets/*', dest: 'dist/src/assets' },
			],
			hook: 'writeBundle', // notice here
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(import.meta.url, 'src'),
		},
	},
});
