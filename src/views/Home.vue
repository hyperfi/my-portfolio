<template>
  <div class="home-page">
    <section class="home-hero section-shell">
      <div class="hero-copy reveal">
        <div class="eyebrow"><span></span>Theoretical physics × quantum computation</div>
        <h1>Mapping the nucleus.<br><em>Reframing computation.</em></h1>
        <p class="hero-lede">
          I study collective phenomena in atomic nuclei and build computational methods—from microscopic
          many-body models to quantum algorithms—that make their dynamics measurable and understandable.
        </p>
        <div class="hero-actions">
          <router-link to="/research" class="button button-primary">Explore research <span>↗</span></router-link>
          <a href="mailto:abhishek@ph.iitr.ac.in" class="button button-quiet">Get in touch <span>→</span></a>
        </div>
        <div class="hero-disciplines" aria-label="Areas of expertise">
          <span>Nuclear many-body theory</span>
          <span>Quantum algorithms</span>
          <span>Scientific computing</span>
        </div>
      </div>

      <div class="hero-visual reveal reveal-delay">
        <div class="visual-header">
          <span>Collective response field</span>
          <span class="live-indicator">Live model</span>
        </div>
        <NuclearField />
        <div class="portrait-card">
          <img src="/images/Abhishek.png" alt="Portrait of Dr Abhishek" fetchpriority="high" />
          <div>
            <strong>Dr Abhishek</strong>
            <span>Nuclear physicist & quantum researcher</span>
          </div>
        </div>
        <div class="visual-coordinate" aria-hidden="true">Ψ(r,t) · 08—24</div>
      </div>
    </section>

    <section class="proof-strip" aria-label="Research profile">
      <div class="section-shell proof-grid">
        <div>
          <strong>{{ publicationCount }}+</strong>
          <span>Peer-reviewed works</span>
        </div>
        <div>
          <strong>TDHF</strong>
          <span>Microscopic dynamics</span>
        </div>
        <div>
          <strong>QIS</strong>
          <span>Quantum information science</span>
        </div>
        <div>
          <strong>Open</strong>
          <span>Reproducible research tools</span>
        </div>
      </div>
    </section>

    <section class="section-shell focus-section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Selected focus</span>
          <h2>Research at the edge of<br>models and machines.</h2>
        </div>
        <p>
          My work connects first-principles questions with usable computational systems—turning dense
          theoretical frameworks into predictions, tools, and experiments.
        </p>
      </div>

      <div class="focus-list">
        <article v-for="(area, index) in focusAreas" :key="area.title" class="focus-item">
          <span class="focus-index">0{{ index + 1 }}</span>
          <div>
            <p class="focus-kicker">{{ area.kicker }}</p>
            <h3>{{ area.title }}</h3>
          </div>
          <p>{{ area.description }}</p>
          <router-link to="/research" :aria-label="`Read about ${area.title}`">↗</router-link>
        </article>
      </div>
    </section>

    <section class="lab-section">
      <div class="section-shell">
        <div class="section-heading section-heading-light">
          <div>
            <span class="eyebrow">Open computational lab</span>
            <h2>Theory you can<br>interact with.</h2>
          </div>
          <p>Browser-based scientific tools for exploring how nuclear and quantum systems behave.</p>
        </div>

        <div class="simulation-grid">
          <a
            v-for="(simulation, index) in simulations"
            :key="simulation.title"
            :href="simulation.url"
            target="_blank"
            rel="noopener noreferrer"
            class="simulation-card"
          >
            <div class="simulation-topline">
              <span>0{{ index + 1 }}</span>
              <span>{{ simulation.domain }}</span>
            </div>
            <div class="simulation-graphic" :class="`graphic-${index + 1}`" aria-hidden="true">
              <i></i><i></i><i></i>
            </div>
            <h3>{{ simulation.title }}</h3>
            <p>{{ simulation.description }}</p>
            <span class="card-link">Launch simulation ↗</span>
          </a>
        </div>
      </div>
    </section>

    <section class="section-shell perspective-section">
      <span class="eyebrow">Working perspective</span>
      <blockquote>
        “The most useful computation is not merely faster—it makes a difficult physical question
        <em>clear enough to test.</em>”
      </blockquote>
      <div class="perspective-meta">
        <span>Research philosophy</span>
        <router-link to="/hobbies">Beyond the lab →</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
const NuclearField = defineAsyncComponent(() => import('../components/NuclearField.vue'))
import publications from '../data/publications.json'

const publicationCount = computed(() => (
  (publications.journal_articles?.length || 0)
  + (publications.preprints?.length || 0)
  + (publications.conference_proceedings?.length || 0)
))

const focusAreas = [
  {
    kicker: 'Quantum response',
    title: 'Algorithms for nuclear dynamics',
    description: 'Designing quantum circuits that extract linear-response observables, moving beyond eigenvalues toward physically useful predictions.'
  },
  {
    kicker: 'Microscopic structure',
    title: 'Collective motion in deformed nuclei',
    description: 'Resolving giant resonances and fine structure with linear-response models, triaxial potentials, and wavelet analysis.'
  },
  {
    kicker: 'Scientific software',
    title: 'High-fidelity many-body simulation',
    description: 'Extending tools such as Sky3D to connect three-dimensional time evolution with experimental strength functions.'
  }
]

const simulations = [
  {
    domain: 'Nuclear structure',
    title: 'Interactive Nilsson Model',
    description: 'Trace how deformation, spin–orbit coupling, and shell structure reshape single-particle energy levels.',
    url: 'https://hyperfi.github.io/Nilsson-Model-Interactive/'
  },
  {
    domain: 'Quantum mechanics',
    title: '1D Schrödinger Dynamics',
    description: 'Create potentials and observe wave packets propagate, scatter, bind, and tunnel in real time.',
    url: 'https://hyperfi.github.io/Time-Dependent-Schrodinger-Equation-1D/'
  },
  {
    domain: 'Computational physics',
    title: 'Potential Energy Surfaces',
    description: 'Explore deformation landscapes, shell corrections, and predicted nuclear ground-state shapes.',
    url: 'https://hyperfi.github.io/PES-Visualizer/'
  }
]
</script>
