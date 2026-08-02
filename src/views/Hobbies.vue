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
          <div class="practice-mark" aria-hidden="true"></div>
          <h3>{{ practice.title }}</h3>
          <p>{{ practice.description }}</p>
          <div class="practice-tags">
            <span v-for="tag in practice.tags" :key="tag">{{ tag }}</span>
          </div>
        </article>
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
const practices = [
  {
    type: 'Image',
    title: 'Photography',
    description: 'I photograph night skies, landscapes, and urban scenes—using long exposures to make time and light visible.',
    tags: ['Astrophotography', 'Landscape', 'Long exposure']
  },
  {
    type: 'Code',
    title: 'Creative computation',
    description: 'I build interactive simulations and data visualizations that let people explore an idea instead of only reading about it.',
    tags: ['WebGL', 'Data visualization', 'Open source']
  },
  {
    type: 'Communication',
    title: 'Making difficult physics accessible',
    description: 'Through teaching resources, writing, video, and 3D animation, I translate technical ideas without flattening their depth.',
    tags: ['Teaching', '3D animation', 'Writing']
  },
  {
    type: 'Field',
    title: 'Hiking and the outdoors',
    description: 'Mountain trails offer a slower mode of observation: long horizons, changing systems, and space to think clearly.',
    tags: ['Mountains', 'Exploration', 'Landscape']
  },
  {
    type: 'Observation',
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
