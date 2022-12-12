import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import winc from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, 'src'),
  plugins: [react(), winc()],
});
