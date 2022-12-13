import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import viteEslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

/**
 * ?url: 表示获取资源的路径，这在只想获取文件路径而不是内容的场景将会很有用
 * ?raw: 表示获取资源的字符串内容，如果你只想拿到资源的原始内容，可以使用这个后缀
 * ?inline: 表示资源强制内联，而不是打包成单独的文件
 */

// https://vitejs.dev/config/
export default defineConfig({
  root: path.join(__dirname, 'src'),
  plugins: [react(), viteEslint(), svgr()],
  resolve: {
    alias: {
      '@assets': path.join(__dirname, 'src/assets')
    }
  },
  /**
   * Vite 也对下面几类格式提供了内置的支持
   * 媒体类文件，包括mp4、webm、ogg、mp3、wav、flac和aac
   * 字体类文件。包括woff、woff2、eot、ttf 和 otf
   * 文本类。包括webmanifest、pdf和txt
   * 都可以当做一个es模块
   * 如果你的项目中还存在其它格式的静态资源，你可以通过assetsInclude配置让 Vite 来支持加载
   */
  assetsInclude: ['.gltf']
});
