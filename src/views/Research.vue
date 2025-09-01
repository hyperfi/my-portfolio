<template>
  <div class="min-h-screen py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-white mb-6">
          My <span class="glow-text">Research</span>
        </h1>
        <p class="text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
          My research tackles core problems in nuclear many‑body physics using complementary classical and
          quantum techniques. On the classical side, I develop microscopic descriptions of collective
          excitations (giant dipole/monopole resonances) with linear‑response theory and TDHF (Sky3D),
          benchmarked against RPA and experimental data. On the quantum side, I designed a first‑of‑its‑kind
          algorithm for nuclear linear response that maps fermionic operators to qubits (Jordan–Wigner),
          prepares time‑dependent states, and employs the SWAP test—achieving O(N) scaling and excellent
          agreement with data on  <sup>120</sup>Sn and <sup>208</sup>Pb, with careful NISQ noise studies and mitigation.
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

      <!-- Publications -->
      <section class="mb-20">
        <h2 class="text-3xl font-bold text-nuclear-glow mb-12 text-center">Publications</h2>
        <div class="space-y-12">
          <!-- Journal Articles -->
          <div>
            <h3 class="text-2xl font-semibold text-white mb-6 text-center">Journal Articles ({{ journalArticles.length }})</h3>
            <div class="space-y-6">
              <div v-for="(paper, idx) in journalArticles" :key="'j-' + idx" class="bg-card-bg p-6 rounded-xl border border-nuclear-blue/20 card-hover">
                <div class="flex flex-col md:flex-row md:items-start gap-4">
                  <div class="flex-1">
                    <h4 class="text-lg font-bold text-white mb-2" v-html="paper.title || paper.raw"></h4>
                    <p class="text-nuclear-glow text-sm mb-2" v-if="paper.journal || paper.year">
                      {{ [paper.journal, paper.year].filter(Boolean).join(' • ') }}
                    </p>
                  </div>
                  <div class="flex-shrink-0" v-if="paper.url">
                    <a :href="paper.url" target="_blank" rel="noopener" class="btn-glow text-sm">
                      Read Paper
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Conference Proceedings -->
          <div v-if="conferenceProceedings.length">
            <h3 class="text-2xl font-semibold text-white mb-6 text-center">Conference Proceedings ({{ conferenceProceedings.length }})</h3>
            <div class="space-y-6">
              <div v-for="(paper, idx) in conferenceProceedings" :key="'c-' + idx" class="bg-card-bg p-6 rounded-xl border border-nuclear-blue/20 card-hover">
                <div class="flex flex-col md:flex-row md:items-start gap-4">
                  <div class="flex-1">
                    <h4 class="text-lg font-bold text-white mb-2" v-html="paper.title || paper.raw"></h4>
                    <p class="text-nuclear-glow text-sm mb-2" v-if="paper.journal || paper.year">
                      {{ [paper.journal, paper.year].filter(Boolean).join(' • ') }}
                    </p>
                  </div>
                  <div class="flex-shrink-0" v-if="paper.url">
                    <a :href="paper.url" target="_blank" rel="noopener" class="btn-glow text-sm">
                      Read Paper
                    </a>
                  </div>
                </div>
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
          <a href="mailto:abi00779@gmail.com" class="btn-glow">
            Get In Touch
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import publications from '../data/publications.json'

// Research areas sourced from provided text
const researchAreas = ref([
  {
    icon: '🧮',
    title: 'Quantum Linear Response (GDR)',
    description: 'First‑of‑its‑kind quantum algorithm for nuclear linear response using Jordan–Wigner mapping, time‑dependent state prep, SWAP test, and O(N) scaling.'
  },
  {
    icon: '🧭',
    title: 'Microscopic GDR in Deformed Nuclei',
    description: 'Linear‑response theory with triaxial Woods–Saxon potential; wavelet analysis; improved fits vs macroscopic models for Nd/Sm isotopes.'
  },
  {
    icon: '🌀',
    title: 'TDHF / Sky3D',
    description: 'Development of Sky3D v1.2 for external multipole boosts and strength functions; benchmarking vs RPA and applications to collectivity studies.'
  },
  {
    icon: '⚙️',
    title: 'RPA & Density Functionals',
    description: 'Random Phase Approximation and Skyrme energy‑density functionals for nuclear structure and dynamics.'
  },
  {
    icon: '🔗',
    title: 'Hybrid Quantum‑Classical',
    description: 'Combining quantum algorithms with classical microscopic models to push precision and scalability.'
  }
])

// Publications data from generated JSON
const journalArticles = ref((publications && publications.journal_articles) ? publications.journal_articles : [])
const conferenceProceedings = ref((publications && publications.conference_proceedings) ? publications.conference_proceedings : [])
// Current projects and directions
const currentProjects = ref([
  {
    icon: '🧮',
    title: 'Refining Quantum Linear‑Response Algorithms',
    description: 'Extend to broader multipoles and open‑shell systems; optimize circuits; systematic NISQ noise mitigation.',
    status: 'Active'
  },
  {
    icon: '🔗',
    title: 'Hybrid Quantum‑Classical Frameworks',
    description: 'Bridge TDHF/DFT with quantum subroutines to accelerate many‑body response calculations.',
    status: 'Design Phase'
  },
  {
    icon: '🌀',
    title: 'Sky3D Enhancements',
    description: 'New external fields, improved strength‑function analysis, and validation against RPA/experiment.',
    status: 'Development'
  },
  {
    icon: '📊',
    title: 'Deformation & Fine‑Structure Systematics',
    description: 'Microscopic studies of GDR/ISM in deformed nuclei with wavelet analysis and comparisons to data.',
    status: 'In Progress'
  }
])
</script>
