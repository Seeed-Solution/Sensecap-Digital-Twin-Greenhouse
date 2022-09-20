
import { resolve } from 'path';
import { defineConfig } from 'vite';
export default defineConfig({
  envPrefix : 'V__',
  build: {
    target:'es2015',
    // rollupOptions: {
    //   input: {
    //     mini: resolve(__dirname, 'mini/index.html'),
    //   }
    // }
  },
  server:{
    cors : true,
    host: '0.0.0.0'
  }
})