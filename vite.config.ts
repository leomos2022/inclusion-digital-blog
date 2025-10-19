import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/inclusion-digital-blog/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
