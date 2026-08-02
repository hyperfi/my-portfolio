<template>
  <header ref="headerRef" class="site-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="nav-shell">
      <router-link to="/" class="brand" aria-label="Dr Abhishek — home">
        <span class="brand-mark" aria-hidden="true">A</span>
        <span class="brand-copy">
          <strong>Dr Abhishek</strong>
          <small>Nuclear physicist</small>
        </span>
      </router-link>

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
        <a class="nav-contact" href="mailto:abhishek@ph.iitr.ac.in">Let’s talk</a>
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
        <a href="mailto:abhishek@ph.iitr.ac.in">Start a conversation</a>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const headerRef = ref(null)
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const theme = ref('light')

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Research', path: '/research' },
  { name: 'Beyond the lab', path: '/hobbies' }
]

const syncScroll = () => {
  isScrolled.value = window.scrollY > 18
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
  syncScroll()
  window.addEventListener('scroll', syncScroll, { passive: true })
  document.addEventListener('pointerdown', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', syncScroll)
  document.removeEventListener('pointerdown', handleClickOutside)
})
</script>
