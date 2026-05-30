<template>
  <div class="min-h-screen py-20 bg-dark-bg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Premium Title / Hero Area -->
      <div class="text-center mb-16 relative">
        <div class="absolute inset-0 flex items-center justify-center -top-10 opacity-10 pointer-events-none" aria-hidden="true">
          <span class="text-9xl font-extrabold tracking-widest text-nuclear-blue select-none">NPQR</span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 relative z-10">
          Research & <span class="text-nuclear-glow">Publications</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed relative z-10 font-light">
          Addressing fundamental challenges in nuclear many‑body physics using complementary classical and
          quantum techniques. My work spans microscopic models (linear‑response theory, TDHF/Sky3D,
          RPA, and density‑functional approaches) and pioneering quantum algorithms for nuclear structure
          and dynamics, with a particular focus on giant resonances and deformed nuclei.
        </p>
      </div>

      <!-- Research Areas Grid -->
      <section class="mb-24">
        <div class="flex items-center gap-4 mb-8">
          <div class="h-8 w-1.5 bg-nuclear-glow rounded-full"></div>
          <h2 class="text-3xl font-bold text-white tracking-wide">Key Research Domains</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(area, idx) in researchAreas" 
            :key="idx" 
            class="bg-card-bg/60 backdrop-blur-sm p-8 rounded-2xl border border-nuclear-blue/20 hover:border-nuclear-glow/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,255,255,0.03)] group"
          >
            <div class="w-12 h-12 rounded-xl bg-nuclear-blue/15 border border-nuclear-blue/30 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              {{ area.icon }}
            </div>
            <h3 class="text-xl font-semibold text-white mb-3 group-hover:text-nuclear-glow transition-colors">
              {{ area.title }}
            </h3>
            <p class="text-gray-400 text-sm leading-relaxed font-light">
              {{ area.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- Current Projects -->
      <section class="mb-24">
        <div class="flex items-center gap-4 mb-8">
          <div class="h-8 w-1.5 bg-nuclear-glow rounded-full"></div>
          <h2 class="text-3xl font-bold text-white tracking-wide">Current Projects</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="(project, pidx) in currentProjects" 
            :key="pidx" 
            class="bg-card-bg/60 backdrop-blur-sm p-8 rounded-2xl border border-nuclear-blue/20 hover:border-nuclear-glow/40 transition-all duration-300 flex flex-col md:flex-row gap-6 hover:shadow-[0_8px_30px_rgb(0,255,255,0.03)]"
          >
            <div class="w-14 h-14 bg-gradient-to-r from-nuclear-blue/20 to-nuclear-glow/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-nuclear-blue/30">
              <span class="text-2xl">{{ project.icon }}</span>
            </div>
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <h3 class="text-xl font-semibold text-white mb-2">{{ project.title }}</h3>
                <p class="text-gray-400 text-sm leading-relaxed mb-4 font-light">{{ project.description }}</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-nuclear-glow animate-pulse"></span>
                <span class="text-xs tracking-wider uppercase text-nuclear-glow font-medium">
                  Status: {{ project.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Publications Directory -->
      <section class="mb-24">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-nuclear-blue/20 pb-6">
          <div class="flex items-center gap-4">
            <div class="h-8 w-1.5 bg-nuclear-glow rounded-full"></div>
            <h2 class="text-3xl font-bold text-white tracking-wide">Publications</h2>
          </div>

          <!-- Modern Animated Navigation Tabs -->
          <div class="flex flex-wrap p-1 bg-card-bg rounded-xl border border-nuclear-blue/30">
            <button 
              v-for="tab in ['preprints', 'journals', 'conferences']" 
              :key="tab"
              @click="activeTab = tab"
              class="px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 uppercase cursor-pointer"
              :class="activeTab === tab 
                ? 'bg-nuclear-blue text-force-white shadow-[0_2px_12px_rgba(0,91,181,0.3)]' 
                : 'text-gray-400 hover:text-white'"
            >
              {{ tab === 'preprints' ? 'Preprints' : tab === 'journals' ? 'Journals' : 'Conferences' }}
              <span class="ml-1 text-xs px-2 py-0.5 rounded-full bg-black/30 text-nuclear-glow">
                {{ getTabCount(tab) }}
              </span>
            </button>
          </div>
        </div>

        <!-- Tab Contents -->
        <div class="space-y-8 min-h-[400px]">
          <!-- Active Tab list -->
          <div v-if="activeTabList.length === 0" class="text-center py-20 text-gray-500 font-light">
            No papers listed in this section.
          </div>
          
          <div v-else class="space-y-8">
            <div 
              v-for="(paper, idx) in activeTabList" 
              :key="paper.key || idx" 
              class="bg-card-bg/40 backdrop-blur-sm p-8 rounded-2xl border border-nuclear-blue/20 hover:border-nuclear-glow/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,255,255,0.02)]"
            >
              <div class="flex flex-col lg:flex-row items-start justify-between gap-6">
                <div class="flex-1 space-y-4">
                  <!-- Paper Title with Math Rendering -->
                  <h3 class="text-xl font-bold leading-snug text-white hover:text-nuclear-glow transition-colors duration-200" v-html="renderTitle(paper.title)"></h3>
                  
                  <!-- Authors list with Abhishek highlighted -->
                  <p class="text-gray-300 text-sm font-light leading-relaxed" v-html="highlightAuthor(paper.author)"></p>
                  
                  <!-- Journal details / Citation -->
                  <div class="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-gray-500">
                    <span class="text-nuclear-blue font-semibold uppercase tracking-wider" v-if="paper.journal">
                      {{ paper.journal }}
                    </span>
                    <span v-if="paper.year">Year: {{ paper.year }}</span>
                    <span v-if="paper.volume">Vol: {{ paper.volume }}</span>
                    <span v-if="paper.pages">Pages: {{ paper.pages }}</span>
                    <span v-if="paper.eprint" class="text-nuclear-glow">arXiv: {{ paper.eprint }}</span>
                  </div>
                </div>

                <!-- Action Links -->
                <div class="flex flex-row lg:flex-col items-center gap-3 w-full lg:w-auto flex-shrink-0 justify-end pt-4 lg:pt-0 border-t lg:border-t-0 border-nuclear-blue/15">
                  <a 
                    v-if="paper.url" 
                    :href="paper.url" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="w-full lg:w-36 text-center px-4 py-2 border border-nuclear-glow/40 hover:border-nuclear-glow text-nuclear-glow hover:bg-nuclear-glow hover:text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer"
                  >
                    Read Paper
                  </a>
                  <button 
                    v-if="paper.abstract"
                    @click="toggleAbstract(paper.key)"
                    class="w-full lg:w-36 px-4 py-2 bg-nuclear-blue/15 hover:bg-nuclear-blue/30 text-white font-medium text-xs uppercase tracking-wider rounded-lg border border-nuclear-blue/30 transition-all duration-300 cursor-pointer"
                  >
                    {{ showAbstracts[paper.key] ? 'Hide Abstract' : 'Abstract' }}
                  </button>
                </div>
              </div>

              <!-- Abstract Expandable Content -->
              <transition 
                enter-active-class="transition duration-300 ease-out" 
                enter-from-class="transform scale-95 opacity-0 -translate-y-2" 
                enter-to-class="transform scale-100 opacity-100 translate-y-0" 
                leave-active-class="transition duration-200 ease-in" 
                leave-from-class="transform scale-100 opacity-100 translate-y-0" 
                leave-to-class="transform scale-95 opacity-0 -translate-y-2"
              >
                <div 
                  v-if="paper.abstract && showAbstracts[paper.key]" 
                  class="mt-6 p-6 rounded-xl bg-black/40 border border-nuclear-blue/10 text-gray-400 text-sm font-light leading-relaxed tracking-wide italic"
                >
                  <span class="font-bold text-gray-300 uppercase not-italic text-xs tracking-wider block mb-2">Abstract:</span>
                  {{ paper.abstract }}
                </div>
              </transition>
            </div>
          </div>
        </div>
      </section>

      <!-- Collaboration Highlight Panel -->
      <section class="text-center">
        <div class="bg-gradient-to-r from-nuclear-blue/10 via-card-bg/80 to-nuclear-glow/10 p-12 rounded-3xl border border-nuclear-blue/20 hover:border-nuclear-glow/30 transition-colors duration-500 shadow-2xl relative overflow-hidden">
          <div class="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" aria-hidden="true"></div>
          <h2 class="text-3xl font-bold text-white mb-4 relative z-10">Interested in Research Collaboration?</h2>
          <p class="text-gray-300 mb-8 max-w-2xl mx-auto font-light leading-relaxed relative z-10 text-base">
            I am always open to discussing research projects, theoretical calculations, and academic partnerships 
            at the intersection of nuclear physics, high-performance computing, and quantum algorithms.
          </p>
          <a href="mailto:abi00779@gmail.com" class="px-8 py-3.5 bg-gradient-to-r from-nuclear-blue to-nuclear-glow hover:from-nuclear-glow hover:to-nuclear-blue text-force-white font-semibold rounded-lg shadow-lg hover:shadow-nuclear-glow/20 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer inline-block relative z-10 text-sm uppercase tracking-wider">
            Initiate Contact
          </a>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import publications from '../data/publications.json'
import { renderMarkdownToSafeHtml } from '../lib/markdown'

// Page view tabs
const activeTab = ref('preprints')

// Toggleable abstract map
const showAbstracts = ref({})

// Static lists for areas and projects
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

const journalArticles = computed(() => {
  return publications?.journal_articles || []
})

const conferenceProceedings = computed(() => {
  return publications?.conference_proceedings || []
})

const preprintsList = computed(() => {
  return publications?.preprints || []
})

const activeTabList = computed(() => {
  if (activeTab.value === 'preprints') return preprintsList.value
  if (activeTab.value === 'journals') return journalArticles.value
  if (activeTab.value === 'conferences') return conferenceProceedings.value
  return []
})

const getTabCount = (tab) => {
  if (tab === 'preprints') return preprintsList.value.length
  if (tab === 'journals') return journalArticles.value.length
  if (tab === 'conferences') return conferenceProceedings.value.length
  return 0
}

const toggleAbstract = (key) => {
  showAbstracts.value[key] = !showAbstracts.value[key]
}

// Highlight the author 'Abhishek' in the list of authors
const highlightAuthor = (authorsList) => {
  if (!authorsList) return ''
  return authorsList.replace(/\bAbhishek\b/g, '<span class="text-nuclear-glow font-bold">Abhishek</span>')
}

// Safely render KaTeX math expressions in title strings
const renderTitle = (title) => {
  if (!title) return ''
  let html = renderMarkdownToSafeHtml(title)
  // Strip enclosing paragraph tag generated by the marked compiler
  if (html.startsWith('<p>') && html.endsWith('</p>')) {
    html = html.substring(3, html.length - 4)
  }
  return html
}
</script>

<style scoped>
.bg-grid-pattern {
  background-image: radial-gradient(rgba(0, 255, 255, 0.15) 1px, transparent 1px);
  background-size: 24px 24px;
}
</style>
