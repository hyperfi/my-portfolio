import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Expose the vendored Hairline kernel to ESM without modifying its source.
const hairlineKernel = {
  name: 'hairline-kernel-module',
  enforce: 'pre',
  transform(source, id) {
    if (id.endsWith('/src/lib/hairline/kernel.js')) {
      return { code: `${source}\nexport default HL\n`, map: null }
    }
  }
}

export default defineConfig({
  plugins: [hairlineKernel, vue()],
})
