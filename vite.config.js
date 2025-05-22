import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: [
      '.ngrok-free.app' 
    ]
  },
  plugins: [react()],
})
