import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    strictPort: true, // Cố định duy nhất cổng 5175, không bao giờ tự động nhảy sang cổng khác
    open: true,
  },
});
