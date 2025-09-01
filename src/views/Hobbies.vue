<template>
  <div class="min-h-screen py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-white mb-6">
          Beyond <span class="glow-text">Physics</span>
        </h1>
        <p class="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          When I'm not exploring the atomic nucleus, I create — I photograph the night sky and urban scenes, build 3D models and visualizations, and publish open-source code on GitHub. Follow my photography on Instagram and check my projects on GitHub.
        </p>
      </div>

      <!-- Hobbies Grid -->
      <section class="mb-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- TODO: Customize these hobbies based on your actual interests -->
          <div v-for="hobby in hobbies" :key="hobby.title" class="bg-card-bg rounded-xl border border-nuclear-blue/20 overflow-hidden card-hover">
            <div class="h-48 bg-gradient-to-br from-nuclear-blue/20 to-nuclear-glow/20 flex items-center justify-center">
              <span class="text-6xl">{{ hobby.icon }}</span>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-white mb-3">{{ hobby.title }}</h3>
              <p class="text-gray-300 text-sm leading-relaxed mb-4">{{ hobby.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in hobby.tags" :key="tag" class="px-3 py-1 bg-nuclear-blue/20 text-nuclear-glow text-xs rounded-full">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Instagram Profiles -->
      <section class="mb-20">
        <h2 class="text-3xl font-bold text-nuclear-glow mb-6 text-center">Instagram</h2>
        <p class="text-center text-gray-300 mb-6">Follow my photography and 3D work on Instagram.</p>
  <div class="flex justify-center gap-6">
          <a href="https://www.instagram.com/hyperfinephotos" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 bg-card-bg px-4 py-3 rounded-lg border border-nuclear-blue/20 hover:scale-[1.02] transition-transform">
            <svg class="h-5 w-5 text-pink-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM17.5 6a.9.9 0 11-.001 1.8A.9.9 0 0117.5 6z"/></svg>
            <span class="text-sm text-gray-200">@hyperfinephotos</span>
          </a>

          <a href="https://www.instagram.com/hyperfine3d" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 bg-card-bg px-4 py-3 rounded-lg border border-nuclear-blue/20 hover:scale-[1.02] transition-transform">
            <svg class="h-5 w-5 text-pink-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zM12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM17.5 6a.9.9 0 11-.001 1.8A.9.9 0 0117.5 6z"/></svg>
            <span class="text-sm text-gray-200">@hyperfine3d</span>
          </a>
          
          <a href="https://github.com/hyperfi" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 bg-card-bg px-4 py-3 rounded-lg border border-nuclear-blue/20 hover:scale-[1.02] transition-transform">
            <svg class="h-5 w-5 text-gray-200" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.89.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.75.4-1.25.73-1.54-2.56-.29-5.26-1.28-5.26-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.92 10.92 0 012.87-.39c.98 0 1.97.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.08 0 4.42-2.71 5.39-5.29 5.67.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56A11.5 11.5 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"/></svg>
            <span class="text-sm text-gray-200">github.com/hyperfi</span>
          </a>
        </div>
      </section>

      <!-- Featured Projects/Achievements -->
      <section class="mb-20">
        <h2 class="text-3xl font-bold text-nuclear-glow mb-12 text-center">Personal Projects & Achievements</h2>
        <div class="space-y-8">
          <!-- TODO: Replace with your actual projects and achievements -->
          <div v-for="project in personalProjects" :key="project.title" class="bg-card-bg p-8 rounded-xl border border-nuclear-blue/20 card-hover">
            <div class="flex flex-col lg:flex-row gap-6">
              <div class="lg:w-1/3">
                <div class="aspect-video bg-gradient-to-br from-nuclear-blue/20 to-nuclear-glow/20 rounded-lg flex items-center justify-center">
                  <span class="text-4xl">{{ project.icon }}</span>
                </div>
              </div>
              <div class="lg:w-2/3">
                <h3 class="text-2xl font-bold text-white mb-4">{{ project.title }}</h3>
                <p class="text-gray-300 leading-relaxed mb-6">{{ project.description }}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                  <span v-for="tag in project.tags" :key="tag" class="px-3 py-1 bg-nuclear-blue/20 text-nuclear-glow text-xs rounded-full">
                    {{ tag }}
                  </span>
                </div>
                <a v-if="project.link" :href="project.link" target="_blank" class="btn-glow text-sm">
                  View Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills & Interests -->
      <section class="mb-20">
        <h2 class="text-3xl font-bold text-nuclear-glow mb-12 text-center">Skills & Interests</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Technical Skills -->
          <div class="bg-card-bg p-6 rounded-xl border border-nuclear-blue/20">
            <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span class="text-2xl">💻</span>
              Technical Skills
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <!-- TODO: Add your actual technical skills -->
              <div v-for="skill in technicalSkills" :key="skill" class="text-gray-300 text-sm bg-nuclear-blue/10 px-3 py-2 rounded text-center">
                {{ skill }}
              </div>
            </div>
          </div>

          <!-- Creative Interests -->
          <div class="bg-card-bg p-6 rounded-xl border border-nuclear-blue/20">
            <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span class="text-2xl">🎨</span>
              Creative Interests
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <!-- TODO: Add your actual creative interests -->
              <div v-for="interest in creativeInterests" :key="interest" class="text-gray-300 text-sm bg-nuclear-glow/10 px-3 py-2 rounded text-center">
                {{ interest }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Fun Facts -->
      <section class="text-center">
        <div class="bg-gradient-to-r from-nuclear-blue/10 to-nuclear-glow/10 p-12 rounded-2xl border border-nuclear-blue/30">
          <h2 class="text-3xl font-bold text-white mb-8">Fun Facts About Me</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- TODO: Add your actual fun facts -->
            <div v-for="fact in funFacts" :key="fact.icon" class="text-center">
              <div class="text-4xl mb-3">{{ fact.icon }}</div>
              <p class="text-gray-300 text-sm">{{ fact.text }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// TODO: Replace with your actual hobbies
const hobbies = ref([
  {
    icon: '📸',
    title: 'Photography',
  description: 'Capturing nature and urban landscapes with a focus on astrophotography and long exposures — many images are shared on my Instagram @hyperfinephotos.',
  tags: ['Astrophotography', 'Landscapes', 'Long Exposure']
  },
  {
    icon: '🥾',
    title: 'Hiking & Outdoors',
    description: 'Exploring mountain trails and national parks, finding peace in nature while staying physically active and mentally refreshed.',
    tags: ['Mountains', 'National Parks', 'Adventure']
  },
  {
    icon: '💻',
    title: 'Coding Projects',
  description: 'Building web apps, data-visualization tools, simulation engines, and open-source libraries — code and releases are on my GitHub profile.',
  tags: ['Web Development', 'Data Viz', 'Python']
  },
  {
    icon: '🔭',
    title: 'Astronomy',
    description: 'Stargazing and amateur astronomy, connecting my professional understanding of physics with the wonder of the cosmos.',
    tags: ['Stargazing', 'Telescopes', 'Cosmology']
  },
  {
    icon: '📚',
    title: 'Science Communication',
  description: 'Writing articles and giving public talks to make physics accessible — I publish writeups and notebooks alongside code on GitHub.',
  tags: ['Writing', 'Public Speaking', 'Education']
  },
  {
    icon: '🎵',
    title: 'Music',
    description: 'Playing guitar and piano, appreciating how mathematical patterns in music mirror the elegance found in physics.',
    tags: ['Guitar', 'Piano', 'Composition']
  }
])

// TODO: Replace with your actual personal projects
const personalProjects = ref([
  {
    icon: '🌌',
    title: 'Astrophotography Gallery',
    description: 'A curated collection of my astrophotography work, featuring deep-sky objects, planetary photography, and time-lapse sequences of celestial events. Each image tells a story of patience, precision, and the beauty of our universe.',
    tags: ['Photography', 'Astronomy', 'Art'],
  link: 'https://github.com/hyperfi' // points to GitHub profile
  },
  {
    icon: '🏔️',
    title: 'Mountain Peak Challenge',
    description: 'Documenting my journey to climb the highest peaks in each state, combining my love for adventure with physical fitness. Currently at 15/50 peaks, with detailed trail guides and photography from each summit.',
    tags: ['Adventure', 'Fitness', 'Travel'],
  link: 'https://github.com/hyperfi' // points to GitHub profile
  },
  {
    icon: '🛠️',
    title: 'Physics Simulation Engine',
    description: 'An open-source JavaScript library for creating interactive physics simulations in the browser. Perfect for educational purposes and making complex concepts visually accessible.',
    tags: ['JavaScript', 'Education', 'Open Source'],
  link: 'https://github.com/hyperfi' // points to GitHub profile
  }
])

// TODO: Add your actual technical skills
const technicalSkills = ref([
  'Python', 'C++', 'MATLAB', 'R',
  'Vue.js', 'JavaScript', 'Git', 'Linux',
  'ROOT', 'Geant4', 'LaTeX', 'Docker'
])

// TODO: Add your actual creative interests
const creativeInterests = ref([
  'Photography', 'Guitar', 'Piano', 'Writing',
  'Sketching', 'Woodworking', 'Cooking', 'Gardening'
])

// TODO: Add your actual fun facts
const funFacts = ref([
  {
    icon: '☕',
    text: 'I\'ve calculated that I\'ve consumed approximately 2,847 cups of coffee during my PhD'
  },
  {
    icon: '🎸',
    text: 'I can play 23 songs on guitar, including some physics-themed parodies I wrote myself'
  },
  {
    icon: '🌟',
    text: 'I\'ve photographed 42 different celestial objects through my telescope'
  }
])
</script>
