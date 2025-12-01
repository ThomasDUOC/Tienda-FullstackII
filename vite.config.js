import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //base: "/Tienda-FullstackII",
  test: {
    globals: true,
    environment: 'jsdom', // <-- ESTA LÍNEA CREA EL NAVEGADOR SIMULADO
  },
})
