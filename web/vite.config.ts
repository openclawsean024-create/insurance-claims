import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({base: '/insurance-claims/',
  plugins: [react(),tailwindcss()],server:{port:5182}})
