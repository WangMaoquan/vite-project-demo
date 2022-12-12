import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import { normalizePath } from 'vite';

const variablePath = normalizePath(path.resolve('./src/variable.scss'));

// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, 'src'),
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${variablePath}";`,
      },
    },
  },
});
