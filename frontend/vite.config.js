import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Define API base URL dynamically
const API_BASE_URL = import.meta.env.NODE_ENV === "production"
  ? "/api"  
  : "http://localhost:5000"; 

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: API_BASE_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
