## 性能利器——Esbuild

### 依赖预构建——作为 Bundle 工具

一般来说，node_modules 依赖的大小动辄几百 MB 甚至上 GB ，会远超项目源代码，相信大家都深有体会。如果这些依赖直接在 Vite 中使用，会出现一系列的问题，这些问题我们在依赖预构建的小节已经详细分析过，主要是 ESM 格式的兼容性问题和海量请求的问题，不再赘述。总而言之，对于第三方依赖，需要在应用启动前进行打包并且转换为 ESM 格式

Esbuild 作为打包工具也有一些缺点

- 不支持降级到 ES5 的代码。这意味着在低端浏览器代码会跑不起来
- 不支持 const enum 等语法。这意味着单独使用这些语法在 esbuild 中会直接抛错
- 不提供操作打包产物的接口，像 Rollup 中灵活处理打包产物的能力(如 renderChunk 钩子)在 Esbuild 当中完全没有
- 不支持自定义 Code Splitting 策略。传统的 Webpack 和 Rollup 都提供了自定义拆包策略的 API，而 Esbuild 并未提供，从而降级了拆包优化的灵活性

### 单文件编译——作为 TS 和 JSX 编译工具

在依赖预构建阶段， Esbuild 作为 Bundler 的角色存在。而在 TS(X)/JS(X) 单文件编译上面，Vite 也使用 Esbuild 进行语法转译，也就是将 Esbuild 作为 Transformer 来用

这部分能力用来替换原先 Babel 或者 TSC 的功能，因为无论是 Babel 还是 TSC 都有性能问题，大家对这两个工具普遍的认知都是: 慢，太慢了

### 代码压缩——作为压缩工具

传统的方式都是使用 Terser 这种 JS 开发的压缩器来实现，在 Webpack 或者 Rollup 中作为一个 Plugin 来完成代码打包后的压缩混淆的工作。但 Terser 其实很慢，主要有 2 个原因

1. 压缩这项工作涉及大量 AST 操作，并且在传统的构建流程中，AST 在各个工具之间无法共享，比如 Terser 就无法与 Babel 共享同一个 AST，造成了很多重复解析的过程
2. JS 本身属于解释性 + JIT（即时编译） 的语言，对于压缩这种 CPU 密集型的工作，其性能远远比不上 Golang 这种原生语言。

因此，Esbuild 这种从头到尾共享 AST 以及原生语言编写的 Minifier 在性能上能够甩开传统工具的好几十倍。

## 构建基石——Rollup

### 生产环境 Bundle

虽然 ESM 已经得到众多浏览器的原生支持，但生产环境做到完全 no-bundle 也不行，会有网络性能问题。为了在生产环境中也能取得优秀的产物性能，Vite 默认选择在生产环境中利用 Rollup 打包，并基于 Rollup 本身成熟的打包能力进行扩展和优化，主要包含 3 个方面:

1. CSS 代码分割。如果某个异步模块中引入了一些 CSS 代码，Vite 就会自动将这些 CSS 抽取出来生成单独的文件，提高线上产物的缓存复用率。
2. 自动预加载。Vite 会自动为入口 chunk 的依赖自动生成预加载标签<link rel="moduelpreload">
   ```html
   <head>
     <!-- 省略其它内容 -->
     <!-- 入口 chunk -->
     <script type="module" crossorigin src="/assets/index.250e0340.js"></script>
     <!--  自动预加载入口 chunk 所依赖的 chunk-->
     <link rel="modulepreload" href="/assets/vendor.293dca09.js" />
   </head>
   ```
   这种适当预加载的做法会让浏览器提前下载好资源，优化页面性能
3. 异步 Chunk 加载优化。在异步引入的 Chunk 中，通常会有一些公用的模块，如现有两个异步引入的 Chunk: A 和 B，而且两者有一个公共依赖 C
   一般情况下，Rollup 打包之后，会先请求 A，然后浏览器在加载 A 的过程中才决定请求和加载 C，但 Vite 进行优化之后，请求 A 的同时会自动预加载 C，通过优化 Rollup 产物依赖加载方式节省了不必要的网络开销

### 兼容插件机制

在开发阶段，Vite 借鉴了 [WMR](https://github.com/preactjs/wmr) 的思路，自己实现了一个 Plugin Container，用来模拟 Rollup 调度各个 Vite 插件的执行逻辑，而 Vite 的插件写法完全兼容 Rollup，因此在生产环境中将所有的 Vite 插件传入 Rollup 也没有问题
