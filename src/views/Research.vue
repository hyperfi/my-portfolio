<template>
  <div class="min-h-screen py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-white mb-6">
          My <span class="glow-text">Research</span>
        </h1>
        <p class="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          <!-- TODO: Customize your research overview -->
          Advancing our understanding of nuclear physics through theoretical analysis, 
          experimental investigation, and computational modeling of atomic nuclei and their interactions.
        </p>
      </div>

      <!-- Research Areas -->
      <section class="mb-20">
        <h2 class="text-3xl font-bold text-nuclear-glow mb-12 text-center">Research Areas</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- TODO: Customize these research areas based on your actual work -->
          <div v-for="area in researchAreas" :key="area.title" class="bg-card-bg p-6 rounded-xl border border-nuclear-blue/20 card-hover">
            <div class="text-3xl mb-4">{{ area.icon }}</div>
            <h3 class="text-xl font-bold text-white mb-3">{{ area.title }}</h3>
            <p class="text-gray-300 text-sm leading-relaxed">{{ area.description }}</p>
          </div>
        </div>
      </section>

      <!-- Featured Publications -->
      <section class="mb-20">
        <h2 class="text-3xl font-bold text-nuclear-glow mb-12 text-center">Featured Publications</h2>
        <div class="space-y-6">
          <!-- TODO: Replace with your actual publications -->
          <div v-for="paper in featuredPapers" :key="paper.title" class="bg-card-bg p-6 rounded-xl border border-nuclear-blue/20 card-hover">
            <div class="flex flex-col md:flex-row md:items-start gap-4">
              <div class="flex-1">
                <h3 class="text-lg font-bold text-white mb-2">{{ paper.title }}</h3>
                <p class="text-nuclear-glow text-sm mb-2">{{ paper.journal }} • {{ paper.year }}</p>
                <p class="text-gray-300 text-sm leading-relaxed mb-4">{{ paper.abstract }}</p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="tag in paper.tags" :key="tag" class="px-3 py-1 bg-nuclear-blue/20 text-nuclear-glow text-xs rounded-full">
                    {{ tag }}
                  </span>
                </div>
              </div>
              <div class="flex-shrink-0">
                <a :href="paper.link" target="_blank" class="btn-glow text-sm">
                  Read Paper
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Current Projects -->
      <section class="mb-20">
        <h2 class="text-3xl font-bold text-nuclear-glow mb-12 text-center">Current Projects</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- TODO: Replace with your actual current projects -->
          <div v-for="project in currentProjects" :key="project.title" class="bg-card-bg p-6 rounded-xl border border-nuclear-blue/20 card-hover">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-gradient-to-r from-nuclear-blue to-nuclear-glow rounded-lg flex items-center justify-center flex-shrink-0">
                <span class="text-xl">{{ project.icon }}</span>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white mb-3">{{ project.title }}</h3>
                <p class="text-gray-300 text-sm leading-relaxed mb-4">{{ project.description }}</p>
                <div class="text-nuclear-glow text-sm">
                  Status: {{ project.status }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Collaboration -->
      <section class="text-center">
        <div class="bg-gradient-to-r from-nuclear-blue/10 to-nuclear-glow/10 p-12 rounded-2xl border border-nuclear-blue/30">
          <h2 class="text-3xl font-bold text-white mb-6">Interested in Collaboration?</h2>
          <p class="text-gray-300 mb-8 max-w-2xl mx-auto">
            I'm always open to discussing research opportunities, academic partnerships, 
            and innovative projects in nuclear physics and related fields.
          </p>
          <a href="mailto:your.email@university.edu" class="btn-glow">
            Get In Touch
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// TODO: Replace with your actual research areas
const researchAreas = ref([
  {
    icon: '⚛️',
    title: 'Nuclear Structure',
    description: 'Investigating the properties and behavior of atomic nuclei using advanced theoretical models and experimental techniques.'
  },
  {
    icon: '🌊',
    title: 'Quantum Mechanics',
    description: 'Exploring quantum phenomena in nuclear systems and developing new approaches to understanding quantum interactions.'
  },
  {
    icon: '💥',
    title: 'Particle Physics',
    description: 'Studying fundamental particles and their interactions, particularly in high-energy nuclear collisions.'
  },
  {
    icon: '🖥️',
    title: 'Computational Physics',
    description: 'Developing and implementing numerical methods and simulations for complex nuclear physics problems.'
  },
  {
    icon: '🔍',
    title: 'Experimental Methods',
    description: 'Designing and conducting experiments using state-of-the-art detection systems and analysis techniques.'
  },
  {
    icon: '📊',
    title: 'Data Analysis',
    description: 'Advanced statistical analysis and machine learning applications in nuclear physics research.'
  }
])

// TODO: Replace with your actual publications
const featuredPapers = ref([
  {
    title: 'Quantum Effects in Heavy Nuclei: A Computational Approach',
    journal: 'Physical Review C',
    year: '2024',
    abstract: 'This study presents a novel computational framework for analyzing quantum effects in heavy atomic nuclei, revealing new insights into nuclear stability and decay processes.',
    tags: ['Quantum Mechanics', 'Heavy Nuclei', 'Computational Physics'],
    link: '#' // Replace with actual DOI or link
  },
  {
    title: 'Nuclear Structure Analysis Using Machine Learning Techniques',
    journal: 'Nature Physics',
    year: '2023',
    abstract: 'We demonstrate the application of advanced machine learning algorithms to predict nuclear properties and identify patterns in nuclear structure data.',
    tags: ['Machine Learning', 'Nuclear Structure', 'Data Analysis'],
    link: '#' // Replace with actual DOI or link
  },
  {
    title: 'Experimental Investigation of Rare Nuclear Decay Modes',
    journal: 'Journal of Physics G',
    year: '2023',
    abstract: 'Detailed experimental study of rare nuclear decay processes using high-precision detection systems and novel analysis methods.',
    tags: ['Experimental Physics', 'Nuclear Decay', 'Detection Systems'],
    link: '#' // Replace with actual DOI or link
  }
])

// TODO: Replace with your actual current projects
const currentProjects = ref([
  {
    icon: '🚀',
    title: 'Next-Generation Nuclear Detector',
    description: 'Developing advanced detection systems for measuring nuclear properties with unprecedented precision and sensitivity.',
    status: 'In Progress'
  },
  {
    icon: '🧮',
    title: 'Quantum Simulation Platform',
    description: 'Building a comprehensive simulation framework for modeling complex nuclear interactions using quantum mechanical principles.',
    status: 'Design Phase'
  },
  {
    icon: '🤝',
    title: 'International Collaboration',
    description: 'Leading a multi-institutional research initiative focused on understanding exotic nuclear matter under extreme conditions.',
    status: 'Active'
  },
  {
    icon: '📖',
    title: 'Nuclear Physics Textbook',
    description: 'Authoring a comprehensive textbook on modern nuclear physics for graduate students and researchers.',
    status: 'Writing'
  }
])
</script>
