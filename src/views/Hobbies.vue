<template>
  <div class="inner-page beyond-page">
    <section class="page-hero section-shell">
      <div class="page-hero-grid">
        <span class="page-number">02 / Beyond the lab</span>
        <div>
          <h1>A wider field<br>of <em>view.</em></h1>
          <div class="page-hero-copy">
            <span class="page-hero-kicker">Making, observing, and explaining</span>
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
      <div class="practice-grid">
        <article v-for="(practice, index) in practices" :key="practice.title" class="practice-card">
          <div class="practice-card-top">
            <span>0{{ index + 1 }}</span>
            <span>{{ practice.type }}</span>
          </div>
          <div class="practice-mark" :class="`practice-mark--${practice.icon}`" aria-hidden="true">
            <span class="practice-mark__primary"></span>
            <span class="practice-mark__secondary"></span>
            <span class="practice-mark__tertiary"></span>
          </div>
          <h3>{{ practice.title }}</h3>
          <p>{{ practice.description }}</p>
          <div class="practice-tags">
            <span v-for="tag in practice.tags" :key="tag">{{ tag }}</span>
          </div>
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
              <img :src="app.screenshot" :alt="app.screenshotAlt" loading="lazy" />
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
const apps = [
  {
    name: 'EverMove: Video Live Wallpaper',
    category: 'Personalization',
    description: 'Turn videos from your gallery into live wallpapers with preview, trim, crop, speed, loop, sound, and rotation controls. Your files stay on your device and the original video is never modified.',
    facts: ['1K+ downloads', '5.0 rating', 'No data collected'],
    url: 'https://play.google.com/store/apps/details?id=com.hyperfi.evermove',
    icon: '/images/apps/evermove-icon.png',
    screenshot: '/images/apps/evermove-interface.png',
    screenshotAlt: 'EverMove tablet interface showing video wallpaper controls and a wallpaper collection'
  },
  {
    name: 'EigenSpace: Quantum Physics 3D',
    category: 'Education',
    description: 'Solve quantum eigenvalue problems and explore energy states, wavefunctions, probability densities, hydrogen orbitals, and custom potentials through interactive 2D and 3D visualizations.',
    facts: ['Ad-free', 'Interactive solver', 'No data collected'],
    url: 'https://play.google.com/store/apps/details?id=com.eigenspace.app',
    icon: '/images/apps/eigenspace-icon.png',
    screenshot: '/images/apps/eigenspace-interface.png',
    screenshotAlt: 'EigenSpace tablet interface showing wavefunctions, energy levels, and probability density visualizations'
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
