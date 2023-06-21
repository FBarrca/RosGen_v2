import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      atoms: "/src/atoms",
    },
  },
  base: '/RosGen_v2/',
  server: {
    host: true
  }
})
