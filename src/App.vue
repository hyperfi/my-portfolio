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
  --bg: #f8fafc; /* premium slate-50 off-white background */
  --text: #0f172a; /* slate-900 */
  --card-bg: rgba(255, 255, 255, 0.7); /* sleek translucent glassmorphism */
  --muted: #1e293b; /* slate-800: maps to text-gray-200 in light mode */
  --muted-2: #475569; /* slate-600: maps to text-gray-300 in light mode */
  --muted-3: #64748b; /* slate-500: maps to text-gray-400/500/600 in light mode */
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
  --muted: #e2e8f0; /* slate-200: maps to text-gray-200 in dark mode */
  --muted-2: #cbd5e1; /* slate-300: maps to text-gray-300 in dark mode */
  --muted-3: #94a3b8; /* slate-400: maps to text-gray-400/500/600 in dark mode */
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

/* Force standard white text utility when contrast requires it on dark/gradient buttons */
.text-force-white { color: #ffffff !important }

/* Improve visibility for commonly used utility text colors across themes */
.text-gray-200 { color: var(--muted) !important }
.text-gray-300 { color: var(--muted-2) !important }
.text-gray-400 { color: var(--muted-3) !important }
.text-gray-500 { color: var(--muted-3) !important }
.text-gray-600 { color: var(--muted-3) !important }

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
