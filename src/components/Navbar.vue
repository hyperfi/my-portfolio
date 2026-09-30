<template>
  <span ref="scrollSentinel" class="header-scroll-sentinel" aria-hidden="true"></span>
  <header
    ref="headerRef"
    class="site-header"
    :class="{ 'is-scrolled': isScrolled, 'on-home': $route.path === '/' }"
  >
    <div class="nav-shell">
      <BrandLogo />

      <nav class="desktop-nav" aria-label="Primary navigation">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          :class="{ active: $route.path === link.path }"
        >
          {{ link.name }}
        </router-link>
      </nav>

      <div class="nav-actions">
        <a class="nav-contact" href="mailto:abhishek@ph.iitr.ac.in">Get in touch</a>
        <button
          class="theme-toggle"
          type="button"
          :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
          @click="toggleTheme"
        >
          <span aria-hidden="true">{{ theme === 'dark' ? 'Light' : 'Dark' }}</span>
        </button>
        <button
          class="menu-toggle"
          ref="menuToggle"
          type="button"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation"
          @click.stop="mobileMenuOpen = !mobileMenuOpen"
        >
          <span></span><span></span>
        </button>
      </div>
    </div>

    <transition name="menu">
      <nav v-if="mobileMenuOpen" id="mobile-navigation" class="mobile-nav" aria-label="Mobile navigation">
        <router-link
          v-for="(link, index) in navLinks"
          :key="link.path"
          :to="link.path"
          :class="{ active: $route.path === link.path }"
          @click="mobileMenuOpen = false"
        >
          <span>0{{ index + 1 }}</span>{{ link.name }}
        </router-link>
        <a href="mailto:abhishek@ph.iitr.ac.in" @click="mobileMenuOpen = false">Get in touch</a>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BrandLogo from './BrandLogo.vue'

const route = useRoute()
const headerRef = ref(null)
const scrollSentinel = ref(null)
const menuToggle = ref(null)
let scrollObserver
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const theme = ref('light')

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Research', path: '/research' },
  { name: 'Beyond the lab', path: '/hobbies' }
]

const handleKeyDown = (event) => {
  if (event.key === 'Escape' && mobileMenuOpen.value) {
    mobileMenuOpen.value = false
    menuToggle.value?.focus()
  }
}

const handleClickOutside = (event) => {
  if (mobileMenuOpen.value && headerRef.value && !headerRef.value.contains(event.target)) {
    mobileMenuOpen.value = false
  }
}

const applyTheme = (nextTheme) => {
  theme.value = nextTheme
  document.documentElement.classList.toggle('dark', nextTheme === 'dark')
  document.documentElement.style.colorScheme = nextTheme
  localStorage.setItem('theme', nextTheme)
}

const toggleTheme = () => applyTheme(theme.value === 'dark' ? 'light' : 'dark')

watch(() => route.path, () => {
  mobileMenuOpen.value = false
})

onMounted(() => {
  const stored = localStorage.getItem('theme')
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  applyTheme(stored || (prefersDark ? 'dark' : 'light'))
  scrollObserver = new IntersectionObserver(([entry]) => { isScrolled.value = !entry.isIntersecting })
  scrollObserver.observe(scrollSentinel.value)
  document.addEventListener('pointerdown', handleClickOutside)
  document.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  scrollObserver?.disconnect()
  document.removeEventListener('pointerdown', handleClickOutside)
  document.removeEventListener('keydown', handleKeyDown)
})
</script>
