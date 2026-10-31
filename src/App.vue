<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { navigationIssue } from './router'

onMounted(() => {
  const storedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  const theme = storedTheme || (prefersDark ? 'dark' : 'light')

  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
})
</script>

<template>
  <div class="site-shell">
    <Navbar />
    <main>
      <div v-if="navigationIssue" class="navigation-notice" role="alert">
        <p>{{ navigationIssue.offline ? 'You’re offline. Reconnect, then open the page again.' : 'This page couldn’t load. Try opening it again.' }}</p>
        <a :href="navigationIssue.href">Open page again</a>
      </div>
      <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.navigation-notice { position: sticky; top: 80px; z-index: 10; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px 24px; padding: 20px 32px; color: var(--ink); background: var(--surface); border-bottom: 1px solid var(--line-strong); }
.navigation-notice p { margin: 0; }
.navigation-notice a { display: inline-flex; align-items: center; min-height: 44px; color: var(--accent); text-decoration: underline; text-underline-offset: 4px; }
</style>
