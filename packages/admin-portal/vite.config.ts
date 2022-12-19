import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: process.env.ADMIN_PORTAL_PORT || 8082
  },
  plugins: [react({
    babel: {
      plugins: ["styled-components"],
    }
  })],
})
