<template>
  <div class="inner-page beyond-page">
    <section class="page-hero section-shell">
      <div class="page-hero-grid">
        <span class="page-number">Beyond the lab</span>
        <div>
          <h1>A wider field<br>of view.</h1>
          <div class="page-hero-copy">
            <p>
              Photography, creative coding, and science communication are not detours from my research.
              They sharpen the same habits: patience, visual thinking, and curiosity about hidden structure.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell inner-section">
      <div class="inner-section-header">
        <h2>Creative practice</h2>
        <span>What keeps me looking closely</span>
      </div>
      <div class="creative-work-grid">
        <a v-for="work in creativeWork" :key="work.title" :href="work.url" target="_blank" rel="noopener noreferrer" class="creative-work">
          <figure>
            <img :src="work.image" :srcset="`${work.image.replace('.png', '-640.webp')} 640w, ${work.image.replace('.png', '-1280.webp')} 1280w`" sizes="(max-width: 620px) calc(100vw - 28px), 600px" :alt="work.alt" loading="lazy" width="1280" height="720" />
            <figcaption><strong>{{ work.title }} ↗</strong><span>{{ work.caption }}</span></figcaption>
          </figure>
        </a>
      </div>
      <div class="practice-grid">
        <article v-for="practice in practices" :key="practice.title" class="practice-card">
          <div class="practice-card-top">
            <span>{{ practice.type }}</span>
          </div>
          <h3>{{ practice.title }}</h3>
          <p>{{ practice.description }}</p>
        </article>
      </div>
    </section>

    <section class="app-section">
      <div class="section-shell">
        <div class="inner-section-header app-section-header">
          <div>
            <span class="eyebrow">Published products</span>
            <h2>Apps on Google Play</h2>
          </div>
          <span>Designed and built by Dr Abhishek</span>
        </div>

        <div class="app-grid">
          <article v-for="app in apps" :key="app.name" class="app-card">
            <a
              :href="app.url"
              target="_blank"
              rel="noopener noreferrer"
              class="app-media"
              :aria-label="`View ${app.name} on Google Play`"
            >
              <div class="app-media-gallery">
                <img
                  v-for="screenshot in app.screenshots"
                  :key="screenshot.src"
                  :src="screenshot.src"
                  :alt="screenshot.alt"
                  loading="lazy"
                />
              </div>
            </a>

            <div class="app-card-body">
              <div class="app-title-row">
                <img :src="app.icon" alt="" class="app-icon" loading="lazy" />
                <div>
                  <span>{{ app.category }}</span>
                  <h3>{{ app.name }}</h3>
                </div>
              </div>
              <p>{{ app.description }}</p>
              <div class="app-facts" :aria-label="`${app.name} details`">
                <span v-for="fact in app.facts" :key="fact">{{ fact }}</span>
              </div>
              <a :href="app.url" target="_blank" rel="noopener noreferrer" class="app-store-link">
                View on Google Play <span>↗</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section-shell inner-section">
      <div class="inner-section-header">
        <h2>Open channels</h2>
        <span>Code, images, and ideas</span>
      </div>
      <div class="channel-grid">
        <a
          v-for="channel in channels"
          :key="channel.name"
          :href="channel.url"
          target="_blank"
          rel="noopener noreferrer"
          class="channel-card"
        >
          <span>{{ channel.type }}</span>
          <strong>{{ channel.name }} ↗</strong>
        </a>
      </div>
    </section>

    <section class="section-shell inner-section">
      <div class="skill-layout">
        <h2>Tools I think<br>and build with.</h2>
        <div class="skill-columns">
          <div class="skill-column">
            <h3>Scientific & technical</h3>
            <div class="skill-cloud">
              <span v-for="skill in technicalSkills" :key="skill">{{ skill }}</span>
            </div>
          </div>
          <div class="skill-column">
            <h3>Visual & creative</h3>
            <div class="skill-cloud">
              <span v-for="interest in creativeInterests" :key="interest">{{ interest }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const creativeWork = [
  { title: 'Wave packets in motion', caption: 'An interactive teaching tool for scattering and tunnelling.', image: '/images/demos/tdse-1d.png', alt: 'My TDSE simulator displaying the evolution of a quantum wave packet', url: 'https://hyperfi.github.io/Time-Dependent-Schrodinger-Equation-1D/' },
  { title: 'Making nuclear landscapes visible', caption: 'Visual exploration of shell corrections and deformation.', image: '/images/demos/pes-visualizer.png', alt: 'My potential energy surface visualizer displaying a nuclear deformation landscape', url: 'https://hyperfi.github.io/PES-Visualizer/' }
]
const apps = [
  {
    name: 'EverMove: Video Live Wallpaper',
    category: 'Personalization',
    description: 'Turn a video from your gallery into a live wallpaper, then shape it with Looks, framing, trim, speed, looping, resting frames, sound, and collection controls. Videos remain on your device, and Pro is a one-time unlock with no subscription.',
    facts: ['5K+ downloads', 'Updated Sep 2026', 'One-time Pro unlock', 'No data collected'],
    url: 'https://play.google.com/store/apps/details?id=com.hyperfi.evermove',
    icon: '/images/apps/evermove-icon.png',
    screenshots: [
      {
        src: '/images/apps/evermove-interface.png',
        alt: 'EverMove phone interface showing a video live wallpaper and playback controls'
      },
      {
        src: '/images/apps/evermove-preview.png',
        alt: 'EverMove phone interface for choosing, previewing, and applying a video wallpaper'
      }
    ]
  },
  {
    name: 'EigenSpace: Quantum Physics 3D',
    category: 'Education',
    description: 'Make the Schrödinger equation visible by solving eigenvalue problems and exploring spectra, wavefunctions, probability densities, basis composition, orbitals, and custom potentials in interactive 2D and 3D workspaces. Pro adds research-ready exports through a one-time unlock.',
    facts: ['100+ downloads', 'Updated Sep 2026', 'Ad-free', 'No data collected'],
    url: 'https://play.google.com/store/apps/details?id=com.eigenspace.app',
    icon: '/images/apps/eigenspace-icon.png',
    screenshots: [
      {
        src: '/images/apps/eigenspace-interface.png',
        alt: 'EigenSpace phone interface showing a quantum potential and calculated energy eigenstates'
      },
      {
        src: '/images/apps/eigenspace-visualizer.png',
        alt: 'EigenSpace phone interface showing wavefunctions, probability density, and basis decomposition in 2D'
      }
    ]
  }
]

const practices = [
  {
    type: 'Image',
    icon: 'camera',
    title: 'Photography',
    description: 'I photograph night skies, landscapes, and urban scenes, using long exposures to make time and light visible.',
    tags: ['Astrophotography', 'Landscape', 'Long exposure']
  },
  {
    type: 'Code',
    icon: 'code',
    title: 'Creative computation',
    description: 'I build interactive simulations and data visualizations that let people explore an idea instead of only reading about it.',
    tags: ['WebGL', 'Data visualization', 'Open source']
  },
  {
    type: 'Communication',
    icon: 'communication',
    title: 'Making difficult physics accessible',
    description: 'Through teaching resources, writing, video, and 3D animation, I translate technical ideas without flattening their depth.',
    tags: ['Teaching', '3D animation', 'Writing']
  },
  {
    type: 'Field',
    icon: 'mountain',
    title: 'Hiking and the outdoors',
    description: 'Mountain trails offer a slower mode of observation: long horizons, changing systems, and space to think clearly.',
    tags: ['Mountains', 'Exploration', 'Landscape']
  },
  {
    type: 'Observation',
    icon: 'telescope',
    title: 'Amateur astronomy',
    description: 'Stargazing reconnects formal physics with the direct experience of scale, uncertainty, and wonder.',
    tags: ['Night sky', 'Telescopes', 'Cosmos']
  }
]

const channels = [
  { type: 'Code', name: 'GitHub / hyperfi', url: 'https://github.com/hyperfi?tab=repositories' },
  { type: 'Photography', name: 'Hyperfine Photos', url: 'https://www.instagram.com/hyperfinephotos' },
  { type: '3D work', name: 'Hyperfine 3D', url: 'https://www.instagram.com/hyperfine3d' },
  { type: 'Video', name: 'Abi Universe', url: 'https://www.youtube.com/@abiuniverse' }
]

const technicalSkills = [
  'Python', 'Fortran', 'C++', 'MATLAB', 'R', 'NumPy', 'SciPy', 'Pandas',
  'Vue.js', 'JavaScript', 'Qiskit', 'Machine learning', 'HPC / MPI', 'Git', 'Linux', 'LaTeX'
]

const creativeInterests = [
  'Astrophotography', 'Blender', '3D animation', 'Creative coding',
  'Data visualization', 'Science writing', 'Educational design', 'DIY electronics'
]
</script>
