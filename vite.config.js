import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base + HashRouter means `npm run build` produces a dist/ folder that
// works when opened from any path — a static host, a subdirectory, or a zip
// handed to a developer for review.
export default defineConfig({
  base: './',
  plugins: [react()],
})
