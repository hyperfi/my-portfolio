<template>
  <div class="home-page">
    <section class="home-hero">
      <div class="hero-stage reveal">
        <ParticleCollisionField />

        <div class="hero-simulation-meta" aria-hidden="true">
          <span>2D elastic ensemble</span>
          <span class="live-indicator">Elastic collisions</span>
        </div>

        <div class="hero-stage-grid">
          <div class="hero-copy">
            <div class="eyebrow"><span></span>Theoretical physics × quantum computation</div>
            <div class="hero-identity">
              <strong>Dr Abhishek</strong>
              <span>Nuclear physicist<br>& quantum researcher</span>
            </div>
            <h1>Mapping the nucleus.<br><em>Reframing computation.</em></h1>
            <p class="hero-lede">
              I study collective phenomena in atomic nuclei. I also build computational methods, from microscopic
              many-body models to quantum algorithms, that make their dynamics measurable and understandable.
            </p>
            <div class="hero-actions">
              <router-link to="/research" class="button button-primary">Explore research <span>↗</span></router-link>
              <a href="mailto:abhishek@ph.iitr.ac.in" class="button button-quiet">Get in touch <span>→</span></a>
            </div>
          </div>

          <figure class="hero-portrait">
            <div class="portrait-orbit" aria-hidden="true"></div>
            <img src="/images/Abhishek.png" alt="Portrait of Dr Abhishek" fetchpriority="high" />
            <figcaption>
              <span>Research focus</span>
              <strong>Atomic nuclei / many-body dynamics / quantum information</strong>
            </figcaption>
          </figure>
        </div>

        <div class="hero-stage-footer">
          <div class="hero-disciplines" aria-label="Areas of expertise">
            <span>Nuclear many-body theory</span>
            <span>Quantum algorithms</span>
            <span>Scientific computing</span>
          </div>
          <span class="simulation-coordinate" aria-hidden="true">e = 1 · friction = 0 · planar</span>
        </div>
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
          My work connects first-principles questions with usable computational systems. It turns dense
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
            <figure class="simulation-preview">
              <img
                :src="simulation.thumbnail"
                :alt="simulation.thumbnailAlt"
                loading="lazy"
              />
              <span>Live interface</span>
            </figure>
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
        “The most useful computation is not merely faster. It makes a difficult physical question
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
import { computed } from 'vue'
import ParticleCollisionField from '../components/ParticleCollisionField.vue'
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
    title: 'Nilsson Live: Level Diagram',
    description: 'Trace how deformation, spin–orbit coupling, and shell structure reshape single-particle energy levels.',
    url: 'https://hyperfi.github.io/Nilsson-Model-Interactive/',
    thumbnail: '/images/demos/nilsson-model.png',
    thumbnailAlt: 'Live Nilsson level diagram with proton and neutron energy states'
  },
  {
    domain: 'Quantum mechanics',
    title: 'Quantum TDSE Simulator',
    description: 'Create potentials and observe wave packets propagate, scatter, bind, and tunnel in real time.',
    url: 'https://hyperfi.github.io/Time-Dependent-Schrodinger-Equation-1D/',
    thumbnail: '/images/demos/tdse-1d.png',
    thumbnailAlt: 'Quantum TDSE simulator showing a wave packet and potential barrier'
  },
  {
    domain: 'Computational physics',
    title: 'Shell Correction & PES Visualizer',
    description: 'Explore deformation landscapes, shell corrections, and predicted nuclear ground-state shapes.',
    url: 'https://hyperfi.github.io/PES-Visualizer/',
    thumbnail: '/images/demos/pes-visualizer.png',
    thumbnailAlt: 'Strutinsky shell correction and potential energy surface dashboard'
  }
]
</script>
