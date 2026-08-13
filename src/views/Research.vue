<template>
  <div class="inner-page research-page">
    <section class="page-hero research-hero section-shell">
      <div class="page-hero-grid">
        <span class="page-number">01 / Research</span>
        <div class="research-hero-content">
          <div class="research-hero-heading research-reveal">
            <h1>Questions at the scale<br>of the <em>nucleus.</em></h1>
            <div class="page-hero-copy">
              <p>
                I combine microscopic many-body theory, time-dependent simulation, and quantum information
                science to understand collective nuclear dynamics and build better ways of computing them.
              </p>
            </div>
          </div>
          <div class="research-reveal">
            <ResearchResponseLab />
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell inner-section research-domain-section">
      <div class="inner-section-header research-reveal">
        <h2>Core research domains</h2>
        <span>Five connected directions</span>
      </div>

      <div class="research-flow research-reveal" aria-label="Research workflow">
        <span class="research-flow-label">Research flow</span>
        <div class="research-flow-track">
          <button
            v-for="(stage, index) in flowStages"
            :key="stage.key"
            type="button"
            :class="{ active: activeDomain === stage.key }"
            @mouseenter="activeDomain = stage.key"
            @focus="activeDomain = stage.key"
            @click="selectActiveDomain(stage.key)"
          >
            <span>0{{ index + 1 }}</span>
            {{ stage.label }}
          </button>
        </div>
      </div>

      <div class="domain-grid research-domain-grid">
        <article
          v-for="(area, index) in researchAreas"
          :key="area.title"
          class="domain-card research-reveal"
          :class="{
            'is-active': activeDomain === area.key,
            'is-muted': activeDomain && activeDomain !== area.key
          }"
          role="button"
          tabindex="0"
          :aria-pressed="activeDomain === area.key"
          @mouseenter="activeDomain = area.key"
          @focusin="activeDomain = area.key"
          @click="selectActiveDomain(area.key)"
          @keydown.enter.prevent="selectActiveDomain(area.key)"
          @keydown.space.prevent="selectActiveDomain(area.key)"
        >
          <div class="domain-card-top">
            <span class="domain-index">0{{ index + 1 }}</span>
            <span>{{ area.signal }}</span>
          </div>
          <div class="domain-visual" :class="`domain-visual--${area.visual}`" aria-hidden="true">
            <span></span><span></span><span></span><span></span>
          </div>
          <h3>{{ area.title }}</h3>
          <p>{{ area.description }}</p>
          <div class="domain-methods" aria-label="Methods">
            <span v-for="method in area.methods" :key="method">{{ method }}</span>
          </div>
        </article>
      </div>
    </section>

    <section class="section-shell inner-section">
      <div class="inner-section-header research-reveal">
        <h2>Work in progress</h2>
        <span>Current research programme</span>
      </div>

      <div class="project-context research-reveal" aria-live="polite">
        <span>{{ activeDomain ? 'Connected programme' : 'Research connections' }}</span>
        <p>{{ activeDomainDescription }}</p>
        <button v-if="activeDomain" type="button" @click="clearActiveDomain">Show all</button>
      </div>

      <div class="project-list">
        <article
          v-for="(project, index) in currentProjects"
          :key="project.title"
          class="project-row research-reveal"
          :class="{
            'is-related': activeDomain && project.domains.includes(activeDomain),
            'is-muted': activeDomain && !project.domains.includes(activeDomain)
          }"
        >
          <span class="project-index">0{{ index + 1 }}</span>
          <div class="project-title-block">
            <h3>{{ project.title }}</h3>
            <div class="project-methods">
              <span v-for="method in project.methods" :key="method">{{ method }}</span>
            </div>
          </div>
          <p>{{ project.description }}</p>
          <span class="status-pill">{{ project.status }}</span>
        </article>
      </div>
    </section>

    <section class="publication-section">
      <div class="section-shell">
        <div class="inner-section-header research-reveal">
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
              @click="setActiveTab(tab.key)"
            >
              {{ tab.label }} <span>{{ getTabCount(tab.key) }}</span>
            </button>
          </div>
        </div>

        <article v-if="activeTab === 'journals' && featuredPaper" class="publication-spotlight research-reveal">
          <div class="publication-spotlight-label">
            <span class="eyebrow"><span></span>Latest publication</span>
            <strong>{{ featuredPaper.year }}</strong>
          </div>
          <div class="publication-spotlight-body">
            <h3 v-html="renderTitle(featuredPaper.title)"></h3>
            <p class="publication-authors" v-html="highlightAuthor(featuredPaper.author)"></p>
            <div class="publication-meta">
              <span>{{ featuredPaper.journal }}</span>
              <span v-if="featuredPaper.doi">DOI {{ normalizeDoi(featuredPaper.doi) }}</span>
            </div>
          </div>
          <div class="publication-spotlight-actions">
            <a v-if="featuredPaper.url" :href="featuredPaper.url" target="_blank" rel="noopener noreferrer">
              Read paper <span>↗</span>
            </a>
            <button type="button" @click="copyCitation(featuredPaper)">
              {{ copiedCitationKey === featuredPaper.key ? 'Citation copied' : 'Copy citation' }}
            </button>
          </div>
        </article>

        <div class="publication-tools research-reveal">
          <label class="publication-search">
            <span>Search this record</span>
            <input
              v-model="publicationQuery"
              type="search"
              placeholder="Title, author, journal, or method"
              autocomplete="off"
            >
          </label>
          <label class="publication-year-filter">
            <span>Year</span>
            <select v-model="yearFilter">
              <option value="all">All years</option>
              <option v-for="year in availableYears" :key="year" :value="String(year)">{{ year }}</option>
            </select>
          </label>
          <p>{{ filteredPublicationList.length }} {{ filteredPublicationList.length === 1 ? 'result' : 'results' }}</p>
        </div>

        <div v-if="filteredPublicationList.length" class="publication-list">
          <article v-for="(paper, index) in filteredPublicationList" :key="paper.key || index" class="publication-card">
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
              <button type="button" @click="copyCitation(paper)">
                {{ copiedCitationKey === paper.key ? 'Copied' : 'Copy citation' }}
              </button>
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
        <p v-else class="empty-state">No publications match the current search.</p>
      </div>
    </section>

    <section class="section-shell inner-section research-reveal">
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
import { computed, onBeforeUnmount, ref } from 'vue'
import ResearchResponseLab from '../components/ResearchResponseLab.vue'
import publications from '../data/publications.json'
import { renderMarkdownToSafeHtml } from '../lib/markdown'

const activeTab = ref('journals')
const activeDomain = ref('')
const showAbstracts = ref({})
const publicationQuery = ref('')
const yearFilter = ref('all')
const copiedCitationKey = ref('')

let citationTimer

const tabs = [
  { key: 'journals', label: 'Journals' },
  { key: 'preprints', label: 'Preprints' },
  { key: 'conferences', label: 'Conferences' }
]

const flowStages = [
  { key: 'structure', label: 'Structure' },
  { key: 'resonance', label: 'Excitation' },
  { key: 'dynamics', label: 'Evolution' },
  { key: 'quantum', label: 'Response' },
  { key: 'hybrid', label: 'Computation' }
]

const researchAreas = [
  {
    key: 'quantum',
    visual: 'response',
    signal: 'Response',
    title: 'Quantum linear response',
    description: 'Quantum algorithms for nuclear response using Jordan–Wigner mapping, time-dependent state preparation, SWAP tests, and resource-aware circuit design.',
    methods: ['Jordan–Wigner', 'SWAP test', 'Circuits']
  },
  {
    key: 'resonance',
    visual: 'resonance',
    signal: 'Excitation',
    title: 'Giant resonances in deformed nuclei',
    description: 'Microscopic linear-response theory with triaxial Woods–Saxon potentials, wavelet analysis, and systematic comparison with experimental structure.',
    methods: ['GDR', 'Wavelets', 'Deformation']
  },
  {
    key: 'dynamics',
    visual: 'density',
    signal: 'Evolution',
    title: 'TDHF and Sky3D',
    description: 'Three-dimensional time-dependent Hartree–Fock methods, external multipole boosts, and benchmarked strength-function calculations.',
    methods: ['TDHF', 'Sky3D', 'Multipoles']
  },
  {
    key: 'structure',
    visual: 'levels',
    signal: 'Structure',
    title: 'RPA and density functionals',
    description: 'Random Phase Approximation and Skyrme energy-density functionals for collective nuclear structure and dynamics.',
    methods: ['RPA', 'Skyrme EDF', 'Mean field']
  },
  {
    key: 'hybrid',
    visual: 'hybrid',
    signal: 'Computation',
    title: 'Hybrid quantum–classical methods',
    description: 'Connecting quantum subroutines with established microscopic models to improve the reach and precision of many-body calculations.',
    methods: ['VQE', 'Classical models', 'Qubits']
  }
]

const currentProjects = [
  {
    title: 'Quantum response algorithms',
    description: 'Extending the method to broader multipoles and open-shell systems while reducing circuit cost and improving noise resilience.',
    status: 'Active',
    methods: ['Quantum response', 'Noise resilience'],
    domains: ['quantum', 'hybrid']
  },
  {
    title: 'Hybrid many-body frameworks',
    description: 'Bridging TDHF and density-functional workflows with quantum subroutines for response calculations.',
    status: 'Design',
    methods: ['TDHF', 'Density functional', 'Qubits'],
    domains: ['hybrid', 'dynamics', 'structure', 'quantum']
  },
  {
    title: 'Sky3D extensions',
    description: 'Adding external fields, analysis tools, and validation pathways for reproducible strength-function studies.',
    status: 'Development',
    methods: ['Sky3D', 'External fields'],
    domains: ['dynamics', 'resonance']
  },
  {
    title: 'Deformation systematics',
    description: 'Resolving the fine structure of giant resonances in deformed nuclei through microscopic modelling and data comparison.',
    status: 'In progress',
    methods: ['GDR', 'Wavelets', 'Data'],
    domains: ['resonance', 'structure']
  }
]

const journals = computed(() => publications?.journal_articles || [])
const conferences = computed(() => publications?.conference_proceedings || [])
const preprints = computed(() => publications?.preprints || [])
const featuredPaper = computed(() => journals.value[0] || null)

const activeTabList = computed(() => {
  if (activeTab.value === 'preprints') return preprints.value
  if (activeTab.value === 'conferences') return conferences.value
  return journals.value
})

const availableYears = computed(() => {
  return [...new Set(activeTabList.value.map((paper) => paper.year).filter(Boolean))].sort((a, b) => b - a)
})

const filteredPublicationList = computed(() => {
  const query = publicationQuery.value.trim().toLowerCase()
  return activeTabList.value.filter((paper) => {
    const matchesYear = yearFilter.value === 'all' || String(paper.year) === yearFilter.value
    if (!matchesYear) return false
    if (!query) return true
    const record = [paper.title, paper.author, paper.journal, paper.year, paper.doi]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return record.includes(query)
  })
})

const activeDomainDescription = computed(() => {
  if (!activeDomain.value) return 'Select a domain above to trace how it connects to the current programme.'
  const domain = researchAreas.find((area) => area.key === activeDomain.value)
  return `Projects connected to ${domain?.title || 'this domain'} are highlighted below.`
})

const getTabCount = (tab) => {
  if (tab === 'preprints') return preprints.value.length
  if (tab === 'conferences') return conferences.value.length
  return journals.value.length
}

const setActiveTab = (tab) => {
  activeTab.value = tab
  yearFilter.value = 'all'
}

const selectActiveDomain = (key) => {
  activeDomain.value = key
}

const clearActiveDomain = () => {
  activeDomain.value = ''
}

const toggleAbstract = (key) => {
  showAbstracts.value[key] = !showAbstracts.value[key]
}

const normalizeDoi = (doi) => doi?.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '') || ''

const copyCitation = async (paper) => {
  const publicationDetails = [paper.journal, paper.volume ? `Vol. ${paper.volume}` : '', paper.pages || '']
    .filter(Boolean)
    .join(', ')
  const doi = normalizeDoi(paper.doi)
  const citation = `${paper.author} (${paper.year || 'Not dated'}). ${paper.title}. ${publicationDetails}.${doi ? ` https://doi.org/${doi}` : ''}`

  try {
    await navigator.clipboard.writeText(citation)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = citation
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
  }

  copiedCitationKey.value = paper.key
  window.clearTimeout(citationTimer)
  citationTimer = window.setTimeout(() => {
    copiedCitationKey.value = ''
  }, 1800)
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

onBeforeUnmount(() => {
  window.clearTimeout(citationTimer)
})
</script>
