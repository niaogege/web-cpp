import { defineConfig, normalizePath } from 'vite';
import react from '@vitejs/plugin-react';
import fibPlugin from './plugins/virtual-modules';
import path from 'path';
import inspect from 'vite-plugin-inspect';
//
// const variablePath = normalizePath(path.resolve('./src/variable.scss'));
// https://vitejs.dev/config
console.log(path, 'PATH');
export default defineConfig({
  // css: {
  //   modules: {
  //     generateScopedName: "[name]__[local]__[hash:base64:5]"
  //   },
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "${variablePath}";`
  //     }
  //   }
  // },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  },
  plugins: [react(), fibPlugin(), inspect()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-cpp': ['react', 'react-dom']
        }
      }
    }
  }
});
