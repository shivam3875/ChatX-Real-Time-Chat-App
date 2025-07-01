import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":{
        target:"https://github.com/shivam3875/ChatX-Real-Time-Chat-App",
      },
    },
  },
})
