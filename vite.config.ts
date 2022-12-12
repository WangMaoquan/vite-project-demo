import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import viteEslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, 'src'),
  plugins: [react(), viteEslint()]
});
