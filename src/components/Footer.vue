<template>
  <footer class="site-footer">
    <div class="footer-shell">
      <div class="footer-intro">
        <span class="eyebrow">Open to collaboration</span>
        <h2>Let’s question what<br>computation can reveal.</h2>
        <a href="mailto:abhishek@ph.iitr.ac.in" class="text-link">abhishek@ph.iitr.ac.in <span>↗</span></a>
      </div>

      <div class="footer-links">
        <div>
          <span class="footer-label">Navigate</span>
          <router-link v-for="link in footerLinks" :key="link.path" :to="link.path">
            {{ link.name }}
          </router-link>
        </div>
        <div>
          <span class="footer-label">Elsewhere</span>
          <a href="https://www.linkedin.com/in/begood/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="https://orcid.org/0000-0003-2226-3146" target="_blank" rel="noopener noreferrer">ORCID ↗</a>
          <a href="https://github.com/hyperfi" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© {{ currentYear }} Dr Abhishek</span>
      <span>Nuclear physics · quantum research · computation</span>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
const footerLinks = [
  { name: 'Home', path: '/' },
  { name: 'Research', path: '/research' },
  { name: 'Beyond the lab', path: '/hobbies' }
]
</script>
