import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist', // 打包输出目录
    assetsDir: 'assets' // 静态资源目录
  },
  base: './', // 静态资源公共路径（适配非根目录部署）,
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    // 自动导入 Element Plus 相关 API
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    // 自动导入 Element Plus 组件
    Components({
      resolvers: [ElementPlusResolver()]
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
