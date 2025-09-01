<template>
  <footer class="bg-card-bg border-t border-nuclear-blue/30 mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- About Section -->
        <div>
          <h3 class="text-xl font-bold text-nuclear-glow mb-4">Nuclear Physicist</h3>
          <p class="text-gray-400 text-sm leading-relaxed">
            Exploring the fundamental nature of matter and energy through cutting-edge research 
            in nuclear physics and quantum mechanics.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks" :key="link.name">
              <router-link 
                :to="link.path" 
                class="text-gray-400 hover:text-nuclear-glow transition-colors text-sm"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-lg font-semibold text-white mb-4">Connect</h3>
          <div class="space-y-2">
            <!-- TODO: Replace with your actual contact information -->
            <p class="text-gray-400 text-sm">📧 your.email@university.edu</p>
            <p class="text-gray-400 text-sm">🏢 Your University</p>
            <p class="text-gray-400 text-sm">🔬 Nuclear Physics Department</p>
          </div>
          <!-- Social Links -->
          <div class="flex space-x-4 mt-4">
            <!-- TODO: Add your actual social media links -->
            <a href="#" class="text-gray-400 hover:text-nuclear-glow transition-colors">
              <span class="sr-only">LinkedIn</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-nuclear-glow transition-colors">
              <span class="sr-only">ORCID</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947 0 .525-.422.947-.947.947a.946.946 0 01-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.881-1.303 3.881-3.722 0-2.222-1.303-3.722-3.881-3.722h-2.297z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-nuclear-blue/30 mt-8 pt-8 text-center">
        <p class="text-gray-400 text-sm">
          © {{ currentYear }} Nuclear Physicist Portfolio. Built with Vue 3 & Tailwind CSS.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const footerLinks = [
  { name: 'Home', path: '/' },
  { name: 'Research', path: '/research' },
  { name: 'Hobbies', path: '/hobbies' },
  { name: 'Blog', path: '/blog' }
]
</script>
