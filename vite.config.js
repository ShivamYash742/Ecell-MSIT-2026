import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.jpg', '**/*.JPG', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.svg', '**/*.webp', '**/*.bmp', '**/*.tiff'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
