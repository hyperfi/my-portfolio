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
  /* nuclear color tweaks for light mode: slightly deeper, more saturated to keep "glow" interesting */
  --nuclear-blue: #005bb5; /* slightly richer than tailwind base */
  --nuclear-glow: #0077cc; /* deeper cyan so it shows up on white */
  /* pulse glow color (rgb) used by the animate-pulse color animation */
  --pulse-rgb: 0,119,204; /* light-mode: richer blue */
}
.dark {
  --bg: #0a0a0a;
  --text: #ffffff;
  --card-bg: #1a1a1a;
  --muted: #9ca3af; /* lighter muted in dark mode */
  --muted-2: #9ca3af;
  --muted-3: #6b7280;
  /* restore vivid neon colors for dark mode */
  --nuclear-blue: #0066cc;
  --nuclear-glow: #00ffff;
  --pulse-rgb: 0,255,255; /* dark-mode: neon cyan */
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

/* Use the CSS variables so the glow color adapts between light/dark modes */
.text-nuclear-glow { color: var(--nuclear-glow) !important; text-shadow: 0 2px 10px rgba(0,0,0,0.06); }

/* Improve button glow visibility in light mode while keeping subtlety in dark mode */
.btn-glow { box-shadow: 0 8px 28px rgba(3,102,153,0.08); }
/* stronger shadow & slight inset highlight on light backgrounds */
:not(.dark) .btn-glow { box-shadow: 0 12px 40px rgba(3,102,153,0.12), inset 0 1px 0 rgba(255,255,255,0.06); }

/* Make borders / card accents slightly more visible in light mode */
:not(.dark) .bg-card-bg { box-shadow: 0 1px 0 rgba(2,6,23,0.02), 0 6px 18px rgba(3,102,153,0.035); }
</style>
