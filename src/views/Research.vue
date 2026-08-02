<template>
  <div class="inner-page research-page">
    <section class="page-hero section-shell">
      <div class="page-hero-grid">
        <span class="page-number">01 / Research</span>
        <div>
          <h1>Questions at the scale<br>of the <em>nucleus.</em></h1>
          <div class="page-hero-copy">
            <p>
              I combine microscopic many-body theory, time-dependent simulation, and quantum information
              science to understand collective nuclear dynamics and build better ways of computing them.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell inner-section">
      <div class="inner-section-header">
        <h2>Core research domains</h2>
        <span>Five connected directions</span>
      </div>
      <div class="domain-grid">
        <article v-for="(area, index) in researchAreas" :key="area.title" class="domain-card">
          <span class="domain-index">0{{ index + 1 }}</span>
          <h3>{{ area.title }}</h3>
          <p>{{ area.description }}</p>
        </article>
      </div>
    </section>

    <section class="section-shell inner-section">
      <div class="inner-section-header">
        <h2>Work in progress</h2>
        <span>Current research programme</span>
      </div>
      <div class="project-list">
        <article v-for="(project, index) in currentProjects" :key="project.title" class="project-row">
          <span class="project-index">0{{ index + 1 }}</span>
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <span class="status-pill">{{ project.status }}</span>
        </article>
      </div>
    </section>

    <section class="publication-section">
      <div class="section-shell">
        <div class="inner-section-header">
          <div>
            <span class="eyebrow">Research record</span>
            <h2>Publications</h2>
          </div>
          <div class="publication-controls" role="tablist" aria-label="Publication categories">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              type="button"
              role="tab"
              :aria-selected="activeTab === tab.key"
              :class="{ active: activeTab === tab.key }"
              @click="activeTab = tab.key"
            >
              {{ tab.label }} <span>{{ getTabCount(tab.key) }}</span>
            </button>
          </div>
        </div>

        <div v-if="activeTabList.length" class="publication-list">
          <article v-for="(paper, index) in activeTabList" :key="paper.key || index" class="publication-card">
            <span class="publication-year">{{ paper.year || 'Not dated' }}</span>
            <div class="publication-body">
              <h3 v-html="renderTitle(paper.title)"></h3>
              <p class="publication-authors" v-html="highlightAuthor(paper.author)"></p>
              <div class="publication-meta">
                <span v-if="paper.journal">{{ paper.journal }}</span>
                <span v-if="paper.volume">Vol. {{ paper.volume }}</span>
                <span v-if="paper.pages">{{ paper.pages }}</span>
                <span v-if="paper.doi">DOI available</span>
              </div>
            </div>
            <div class="publication-actions">
              <a v-if="paper.url" :href="paper.url" target="_blank" rel="noopener noreferrer">Read paper ↗</a>
              <button
                v-if="paper.abstract"
                type="button"
                :class="{ active: showAbstracts[paper.key] }"
                :aria-expanded="Boolean(showAbstracts[paper.key])"
                @click="toggleAbstract(paper.key)"
              >
                {{ showAbstracts[paper.key] ? 'Close abstract' : 'View abstract' }}
              </button>
            </div>
            <transition name="page">
              <p v-if="paper.abstract && showAbstracts[paper.key]" class="publication-abstract">
                {{ paper.abstract }}
              </p>
            </transition>
          </article>
        </div>
        <p v-else class="empty-state">No papers are listed in this section yet.</p>
      </div>
    </section>

    <section class="section-shell inner-section">
      <div class="collaboration-band">
        <div>
          <span class="eyebrow">Collaboration</span>
          <h2>Have a difficult physical question worth computing?</h2>
        </div>
        <a href="mailto:abhishek@ph.iitr.ac.in" class="button">Start a conversation <span>↗</span></a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import publications from '../data/publications.json'
import { renderMarkdownToSafeHtml } from '../lib/markdown'

const activeTab = ref('journals')
const showAbstracts = ref({})

const tabs = [
  { key: 'journals', label: 'Journals' },
  { key: 'preprints', label: 'Preprints' },
  { key: 'conferences', label: 'Conferences' }
]

const researchAreas = [
  {
    title: 'Quantum linear response',
    description: 'Quantum algorithms for nuclear response using Jordan–Wigner mapping, time-dependent state preparation, SWAP tests, and resource-aware circuit design.'
  },
  {
    title: 'Giant resonances in deformed nuclei',
    description: 'Microscopic linear-response theory with triaxial Woods–Saxon potentials, wavelet analysis, and systematic comparison with experimental structure.'
  },
  {
    title: 'TDHF and Sky3D',
    description: 'Three-dimensional time-dependent Hartree–Fock methods, external multipole boosts, and benchmarked strength-function calculations.'
  },
  {
    title: 'RPA and density functionals',
    description: 'Random Phase Approximation and Skyrme energy-density functionals for collective nuclear structure and dynamics.'
  },
  {
    title: 'Hybrid quantum–classical methods',
    description: 'Connecting quantum subroutines with established microscopic models to improve the reach and precision of many-body calculations.'
  }
]

const currentProjects = [
  {
    title: 'Quantum response algorithms',
    description: 'Extending the method to broader multipoles and open-shell systems while reducing circuit cost and improving noise resilience.',
    status: 'Active'
  },
  {
    title: 'Hybrid many-body frameworks',
    description: 'Bridging TDHF and density-functional workflows with quantum subroutines for response calculations.',
    status: 'Design'
  },
  {
    title: 'Sky3D extensions',
    description: 'Adding external fields, analysis tools, and validation pathways for reproducible strength-function studies.',
    status: 'Development'
  },
  {
    title: 'Deformation systematics',
    description: 'Resolving the fine structure of giant resonances in deformed nuclei through microscopic modelling and data comparison.',
    status: 'In progress'
  }
]

const journals = computed(() => publications?.journal_articles || [])
const conferences = computed(() => publications?.conference_proceedings || [])
const preprints = computed(() => publications?.preprints || [])

const activeTabList = computed(() => {
  if (activeTab.value === 'preprints') return preprints.value
  if (activeTab.value === 'conferences') return conferences.value
  return journals.value
})

const getTabCount = (tab) => {
  if (tab === 'preprints') return preprints.value.length
  if (tab === 'conferences') return conferences.value.length
  return journals.value.length
}

const toggleAbstract = (key) => {
  showAbstracts.value[key] = !showAbstracts.value[key]
}

const highlightAuthor = (authors) => {
  if (!authors) return ''
  return authors.replace(/\bAbhishek\b/g, '<span class="author-highlight">Abhishek</span>')
}

const renderTitle = (title) => {
  if (!title) return ''
  const html = renderMarkdownToSafeHtml(title)
  return html.startsWith('<p>') && html.endsWith('</p>') ? html.slice(3, -4) : html
}
</script>
