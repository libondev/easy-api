import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import pages from 'vite-plugin-pages'
import layouts from 'vite-plugin-vue-layouts'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
// z-lazy-show/v-show.lazy
import { transformLazyShow } from 'v-lazy-show'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: './',

  build: {
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules'))
            return 'chunk'

          if (id.includes('vue'))
            return 'vue'

          return 'vendors'
        },
      },
    },
  },

  css: {
    devSourcemap: true,
  },

  esbuild: {
    target: 'esnext',
    // 在生产环境下去掉 console/debugger
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },

  optimizeDeps: {
    exclude: ['vue-demi'],
    include: [
      'vue',
      'vue-router',
      'class-variance-authority',
      'radix-vue',
      'clsx',
      'tailwind-merge',
      'es-toolkit',
      'qs',
      'mentions.js',
    ],
  },

  plugins: [
    vue({
      template: {
        compilerOptions: {
          nodeTransforms: [
            transformLazyShow,
          ],
        },
      },
    }),

    jsx(),

    components({
      dts: './shims/components.d.ts',
      extensions: ['vue', 'tsx'],
      // globs: ['src/components/**/index.{vue,tsx,ts}']
    }),

    layouts({
      defaultLayout: 'default',
      extensions: ['vue', 'tsx'],
      layoutsDirs: 'src/layouts',
    }),

    pages({
      dirs: 'src/views',
      routeBlockLang: 'yaml',
      extensions: ['vue', 'tsx'],
      exclude: [
        '**/*/components/**/*',
        '**/*/composables/**/*',
        '**/*/styles/**/*',
        '**/*/utils/**/*',
      ],
    }),

    autoImport({
      dirs: [
        './src/composables/**',
      ],
      dts: './shims/auto-imports.d.ts',
      imports: [
        'vue',
        'vue-router',
        { 'vue-sonner': [['toast', 'useToast']] },
      ],
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // server: {
  //   open: true,
  //   proxy: {
  //     '/api': {
  //       changeOrigin: true,
  //       target: 'http://localhost:3000',
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
}))
