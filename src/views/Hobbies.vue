<template>
  <div class="min-h-screen py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-white mb-6">
          Beyond <span class="glow-text">Physics</span>
        </h1>
        <p class="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          <!-- TODO: Customize your hobbies overview -->
          When I'm not exploring the mysteries of the atomic nucleus, I find inspiration and balance 
          through various creative and adventurous pursuits that keep me grounded and energized.
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
    description: 'Capturing the beauty of nature and urban landscapes, with a special interest in astrophotography and long-exposure techniques.',
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
    description: 'Building web applications, data visualization tools, and automation scripts that combine my love for technology with problem-solving.',
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
    description: 'Writing articles and giving talks to make complex physics concepts accessible to the general public.',
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
    link: '#' // Replace with actual link
  },
  {
    icon: '🏔️',
    title: 'Mountain Peak Challenge',
    description: 'Documenting my journey to climb the highest peaks in each state, combining my love for adventure with physical fitness. Currently at 15/50 peaks, with detailed trail guides and photography from each summit.',
    tags: ['Adventure', 'Fitness', 'Travel'],
    link: '#' // Replace with actual link
  },
  {
    icon: '🛠️',
    title: 'Physics Simulation Engine',
    description: 'An open-source JavaScript library for creating interactive physics simulations in the browser. Perfect for educational purposes and making complex concepts visually accessible.',
    tags: ['JavaScript', 'Education', 'Open Source'],
    link: '#' // Replace with actual link
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
