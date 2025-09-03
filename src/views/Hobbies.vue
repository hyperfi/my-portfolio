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

      <!-- GitHub Projects -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-nuclear-glow mb-4 text-center">GitHub Projects</h2>
        <div class="max-w-4xl mx-auto bg-card-bg p-6 rounded-xl border border-nuclear-blue/20">
          <p class="text-gray-300 leading-relaxed mb-4">
            My GitHub hosts a mix of simulation code, teaching resources, and tooling for research reproducibility. You'll find high-performance FORTRAN simulation code, Python packages and notebooks for analysis and visualization, small web demos and data-visualization projects, and experimental quantum/ML code.
          </p>
          <p class="text-gray-300 leading-relaxed mb-4">
            Browse the full list of repositories to explore code, example notebooks, and project READMEs. I keep most projects open-source and add documentation and examples to make them easy to try.
          </p>
          <div class="text-right">
            <a href="https://github.com/hyperfi?tab=repositories" target="_blank" rel="noopener noreferrer" class="btn-glow">View my repositories</a>
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
          
          
        </div>
      </section>

  <!-- Personal Projects & Achievements section intentionally hidden -->

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
      <!-- Science Communication & Other -->
      <!-- <section class="mb-12">
        <div class="bg-card-bg p-8 rounded-xl border border-nuclear-blue/20">
          <h2 class="text-3xl font-bold text-nuclear-glow mb-4">Science Communication & Other</h2>
          <p class="text-gray-300 leading-relaxed mb-4">
            Abhishek is a brilliant, inquisitive mind at the intersection of nuclear physics and quantum computing. With a keen focus on simulating atomic nuclei under extreme conditions, Abhishek has mastered the art of blending complex computer simulations with cutting-edge physics. A true innovator, they’ve developed powerful tools in FORTRAN and Python to predict nuclear phenomena like Giant Dipole Resonances and designed a high-performance quantum algorithm for studying the linear response of atomic nuclei.
          </p>
          <p class="text-gray-300 leading-relaxed mb-4">
            But it's not just about raw science. Abhishek's teaching style is equally compelling. They create interactive resources, making Python feel like a breeze for students, and infuse fun and engagement into every lesson. Whether it's through hands-on coding tutorials or 3D physics animations made in Blender, they make complex concepts digestible without compromising depth.
          </p>
          <p class="text-gray-300 leading-relaxed mb-4">
            On top of their technical prowess, Abhishek’s curiosity is boundless. Whether it's exploring the mysteries of evaporation, the physiology of yeast fermentation, or delving into the nature of chemical bonds, they ask questions that challenge conventional thinking and push the boundaries of understanding.
          </p>
          <p class="text-gray-300 leading-relaxed mb-4">
            When they’re not developing quantum algorithms or creating mind-bending simulations, Abhishek is brainstorming game concepts to teach programming or contemplating the quirks of everyday physics. Curious, driven, and never satisfied with surface-level answers — that’s Abhishek in a nutshell!
          </p>
        </div>
      </section> -->
      
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
  description: "Abhishek blends deep technical work with clear, engaging teaching. They write articles, build interactive Python resources, and create 3D animations to make complex physics accessible without losing depth.",
  tags: ['Writing', 'Public Speaking', 'Education']
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
  'Python', 'Fortran', 'C++', 'MATLAB', 'R',
  'NumPy', 'SciPy', 'Pandas',
  'Vue.js', 'JavaScript', 'TypeScript', 'Git', 'Linux',
  'Qiskit/Quantum Algorithms', 'TensorFlow / PyTorch', 'Machine Learning',
  'HPC / MPI', 'Docker', 'LaTeX', 'ROOT', 'Geant4'
])

// TODO: Add your actual creative interests
const creativeInterests = ref([
  'Astrophotography',
  '3D Modeling & Animation (Blender)',
  'Game Design for Education',
  'Guitar', 'Piano',
  'Creative Coding / Data Viz',
  'Writing & Science Communication',
  'Instrument Building & DIY Electronics',
  'Cooking & Fermentation'
])

</script>
