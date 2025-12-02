// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
// })


// claude........
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: 'dist',
//     sourcemap: false,
//     minify: 'terser',
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ['react', 'react-dom'],
//           router: ['react-router-dom'],
//           charts: ['recharts'],
//           ui: ['react-toastify', 'react-helmet-async']
//         }
//       }
//     }
//   },
//   server: {
//     port: 3000,
//     open: true
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      // Explicitly enable Fast Refresh
      fastRefresh: true,
      // Include JSX runtime for better compatibility
      jsxRuntime: 'automatic',
      // Fix for preamble detection
      babel: {
        plugins: []
      }
    })
  ],
  // Ensure proper file processing
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: []
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true
    }
  }
})