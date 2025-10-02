import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  //server: {
  //  host: '0.0.0.0',
  //  hmr: {
  //    //clientPort: 5173,
  //    host: '192.168.0.3',
  //  },
  //},  
  server: {
    host: '0.0.0.0',
    hmr: {
      //clientPort: 5173,
      host:'127.0.0.1:3000'
      //host: '192.168.2.94',
    },
  },  
  plugins: [react()],
  base: '/tablero',
})