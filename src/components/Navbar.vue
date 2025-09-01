<template>
  <nav class="fixed top-0 left-0 right-0 bg-card-bg/90 backdrop-blur-md border-b border-nuclear-blue/30 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Name -->
        <router-link to="/" class="flex items-center space-x-2 group">
          <img :src="'/images/logo.png'" alt="Site logo" class="w-10 h-10 rounded-full" />
          <span class="text-xl font-bold text-nuclear-glow group-hover:text-white transition-colors">
            Nuclear Physicist
          </span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link 
            v-for="link in navLinks" 
            :key="link.name"
            :to="link.path"
            class="text-gray-300 hover:text-nuclear-glow transition-colors duration-300 relative group"
            :class="{ 'text-nuclear-glow': $route.path === link.path }"
          >
            {{ link.name }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-nuclear-glow transition-all duration-300 group-hover:w-full"></span>
          </router-link>
          <!-- Theme toggle -->
          <button @click="toggleTheme" class="px-3 py-2 rounded border bg-card-bg/80 text-sm text-gray-200">
            <span v-if="theme === 'dark'">🌙</span>
            <span v-else>☀️</span>
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-300 hover:text-nuclear-glow transition-colors"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-nuclear-blue/30">
        <div class="flex flex-col space-y-2">
          <router-link 
            v-for="link in navLinks" 
            :key="link.name"
            :to="link.path"
            @click="mobileMenuOpen = false"
            class="text-gray-300 hover:text-nuclear-glow transition-colors py-2 px-4 rounded"
            :class="{ 'text-nuclear-glow bg-nuclear-blue/20': $route.path === link.path }"
          >
            {{ link.name }}
          </router-link>
          <div class="px-4">
            <button @click="toggleTheme" class="w-full text-left px-3 py-2 rounded border bg-card-bg/80 text-sm text-gray-200">
              <span v-if="theme === 'dark'">Switch to Light</span>
              <span v-else>Switch to Dark</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const mobileMenuOpen = ref(false)
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

const toggleTheme = () => applyTheme(theme.value === 'dark' ? 'light' : 'dark')

onMounted(() => {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') applyTheme(stored)
  else applyTheme((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light')
})

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Research', path: '/research' },
  { name: 'Hobbies', path: '/hobbies' },
  { name: 'Blog', path: '/blog' },
  { name: 'Admin', path: '/admin' }
]
</script>
