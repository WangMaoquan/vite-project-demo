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
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      // 别的配置 https://github.com/madyankin/postcss-modules
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
});
