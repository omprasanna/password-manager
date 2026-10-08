import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react' // This was missing!

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
})