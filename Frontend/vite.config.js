import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 5175,
    host: true, // Mở mạng LAN: cho phép bạn bè cùng Wi-Fi xem trực tiếp
    open: true,
  },
});
