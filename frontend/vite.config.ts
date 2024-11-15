import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { // Habilita Hot Module Replacement
    watch: {
      usePolling: true, // Adicione isto caso esteja usando WSL ou sistemas de arquivos em rede
    },
  },
})