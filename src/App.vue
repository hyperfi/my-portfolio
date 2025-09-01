<script setup>
import { ref, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const theme = ref('dark')

const applyTheme = (t) => {
  try {
    const root = document.documentElement
    if (t === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    theme.value = t
    localStorage.setItem('theme', t)
  } catch (e) {
    // ignore
  }
}

onMounted(() => {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') {
    applyTheme(stored)
  } else {
    // prefer system preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme(prefersDark ? 'dark' : 'light')
  }
})
</script>

<template>
  <div id="app" class="min-h-screen bg-dark-bg text-white transition-colors duration-200">
    <Navbar />
    <main class="pt-16">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style>
:root {
  --bg: #ffffff;
  --text: #0a0a0a;
  --card-bg: #f5f5f5;
  --muted: #4b5563; /* maps to tailwind gray-600-ish for light mode */
  --muted-2: #6b7280; /* gray-500 */
  --muted-3: #9ca3af; /* gray-400 */
}
.dark {
  --bg: #0a0a0a;
  --text: #ffffff;
  --card-bg: #1a1a1a;
  --muted: #9ca3af; /* lighter muted in dark mode */
  --muted-2: #9ca3af;
  --muted-3: #6b7280;
}

body, #app {
  background-color: var(--bg);
  color: var(--text);
}

/* map common classes used in the app to CSS variables for graceful fallback */
.bg-dark-bg { background-color: var(--bg) !important }
.text-white { color: var(--text) !important }
.bg-card-bg { background-color: var(--card-bg) !important }

/* Improve visibility for commonly used utility text colors across themes */
.text-gray-300 { color: var(--muted-3) !important }
.text-gray-400 { color: var(--muted-2) !important }
.text-gray-200 { color: var(--muted) !important }
.text-gray-500 { color: var(--muted-2) !important }
.text-gray-600 { color: var(--muted-2) !important }

/* nuclear glow should remain vivid in both themes */
.text-nuclear-glow { color: #00ffff !important }
</style>
