<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center justify-center relative overflow-hidden">
      <!-- Animated background elements (Atomic Orbitals SVG) -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-40">
        <!-- Top Left Large Atom -->
        <div class="absolute top-16 -left-10 w-96 h-96">
          <svg class="w-full h-full text-nuclear-glow" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="8" fill="url(#nucleus-grad)" class="animate-pulse" />
            <ellipse cx="100" cy="100" rx="75" ry="22" stroke="url(#orbit-grad-1)" stroke-width="1.5" transform="rotate(30, 100, 100)" class="animate-spin-slow" />
            <circle r="4" fill="#00ffff" transform="rotate(30, 100, 100)">
              <animateMotion dur="10s" repeatCount="indefinite" path="M 25,100 A 75,22 0 1,1 175,100 A 75,22 0 1,1 25,100" />
            </circle>
            <ellipse cx="100" cy="100" rx="75" ry="22" stroke="url(#orbit-grad-2)" stroke-width="1.5" transform="rotate(90, 100, 100)" class="animate-spin-mid" />
            <circle r="4" fill="#0066cc" transform="rotate(90, 100, 100)">
              <animateMotion dur="13s" repeatCount="indefinite" path="M 25,100 A 75,22 0 1,1 175,100 A 75,22 0 1,1 25,100" />
            </circle>
            <ellipse cx="100" cy="100" rx="75" ry="22" stroke="url(#orbit-grad-3)" stroke-width="1.5" transform="rotate(150, 100, 100)" class="animate-spin-fast" />
            <circle r="4" fill="#00ffff" transform="rotate(150, 100, 100)">
              <animateMotion dur="8s" repeatCount="indefinite" path="M 25,100 A 75,22 0 1,1 175,100 A 75,22 0 1,1 25,100" />
            </circle>
          </svg>
        </div>

        <!-- Bottom Right Medium Atom -->
        <div class="absolute -bottom-16 -right-16 w-80 h-80">
          <svg class="w-full h-full text-nuclear-glow" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="6" fill="url(#nucleus-grad)" class="animate-pulse" />
            <ellipse cx="100" cy="100" rx="65" ry="18" stroke="url(#orbit-grad-1)" stroke-width="1.2" transform="rotate(45, 100, 100)" class="animate-spin-slow" />
            <circle r="3" fill="#00ffff" transform="rotate(45, 100, 100)">
              <animateMotion dur="9s" repeatCount="indefinite" path="M 35,100 A 65,18 0 1,1 165,100 A 65,18 0 1,1 35,100" />
            </circle>
            <ellipse cx="100" cy="100" rx="65" ry="18" stroke="url(#orbit-grad-2)" stroke-width="1.2" transform="rotate(115, 100, 100)" class="animate-spin-mid" />
            <circle r="3" fill="#0066cc" transform="rotate(115, 100, 100)">
              <animateMotion dur="12s" repeatCount="indefinite" path="M 35,100 A 65,18 0 1,1 165,100 A 65,18 0 1,1 35,100" />
            </circle>
          </svg>
        </div>

        <!-- Standard Gradients & Definitions (hidden at root) -->
        <svg class="hidden" aria-hidden="true">
          <defs>
            <radialGradient id="nucleus-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#00ffff" stop-opacity="1" />
              <stop offset="60%" stop-color="#0066cc" stop-opacity="0.8" />
              <stop offset="100%" stop-color="transparent" stop-opacity="0" />
            </radialGradient>
            <linearGradient id="orbit-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00ffff" stop-opacity="0.6" />
              <stop offset="100%" stop-color="#0066cc" stop-opacity="0.15" />
            </linearGradient>
            <linearGradient id="orbit-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0066cc" stop-opacity="0.6" />
              <stop offset="100%" stop-color="#00ffff" stop-opacity="0.15" />
            </linearGradient>
            <linearGradient id="orbit-grad-3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#00ffff" stop-opacity="0.4" />
              <stop offset="100%" stop-color="#0066cc" stop-opacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <!-- Decorative animated orbs (CSS-only, subtle) -->
      <div class="landing-bg pointer-events-none" aria-hidden="true">
        <span class="orb orb-1"></span>
        <span class="orb orb-2"></span>
        <span class="orb orb-3"></span>
        <span class="orb orb-4"></span>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div class="space-y-8">
          <!-- Profile Image Placeholder -->
          <div class="flex justify-center">
            <div class="w-64 h-64 rounded-full bg-gradient-to-r from-nuclear-blue to-nuclear-glow p-1 ">
              <div class="w-full h-full rounded-full bg-card-bg overflow-hidden">
                <img :src="'/images/Abhishek.png'" alt="Dr Abhishek" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <!-- Main Heading -->
          <div class="space-y-4">
            <h1 class="text-5xl md:text-7xl font-bold">
              <span class="text-white">Dr </span>
              <span class="text-nuclear-glow animate-pulse">Abhishek</span>
            </h1>
            <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Nuclear Physicist & Quantum Researcher
            </p>
            <p class="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              I address fundamental challenges in nuclear many‑body physics using advanced theoretical and
              computational methods. My work spans microscopic models (linear‑response theory, TDHF/Sky3D,
              RPA and density‑functional approaches) and pioneering quantum algorithms for nuclear structure
              and dynamics, with an emphasis on giant resonances and deformed nuclei.
            </p>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <router-link to="/research" class="btn-glow">
              Explore My Research
            </router-link>
            <router-link to="/hobbies" class="btn-outline-glow">
              Discover My Hobbies
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Overview Section -->
    <section class="py-20 bg-gradient-to-b from-dark-bg to-card-bg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-4">
            About My Work
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Bridging theoretical physics with experimental research
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Research Card -->
          <div class="bg-card-bg p-8 rounded-xl border border-nuclear-blue/20 card-hover">
            <div class="text-4xl mb-4 text-center">🔬</div>
            <h3 class="text-xl font-bold text-nuclear-glow mb-4 text-center">Research</h3>
            <p class="text-gray-300 text-center">
              <!-- TODO: Customize research areas -->
              Quantum mechanics, nuclear structure, particle physics, and computational modeling
            </p>
            <div class="mt-6 text-center">
              <router-link to="/research" class="text-nuclear-glow hover:text-white transition-colors">
                Learn More →
              </router-link>
            </div>
          </div>

          <!-- Publications Card -->
          <div class="bg-card-bg p-8 rounded-xl border border-nuclear-blue/20 card-hover">
            <div class="text-4xl mb-4 text-center">📚</div>
            <h3 class="text-xl font-bold text-nuclear-glow mb-4 text-center">Publications</h3>
            <p class="text-gray-300 text-center">
              <!-- TODO: Add your publication count -->
              8+ peer-reviewed papers in top-tier physics journals
            </p>
            <div class="mt-6 text-center">
              <router-link to="/research" class="text-nuclear-glow hover:text-white transition-colors">
                View Papers →
              </router-link>
            </div>
          </div>

          <!-- Hobbies Card -->
          <div class="bg-card-bg p-8 rounded-xl border border-nuclear-blue/20 card-hover">
            <div class="text-4xl mb-4 text-center">🎯</div>
            <h3 class="text-xl font-bold text-nuclear-glow mb-4 text-center">Beyond Physics</h3>
            <p class="text-gray-300 text-center">
              <!-- TODO: Customize your hobbies -->
              Photography, hiking, coding side projects, and exploring the cosmos
            </p>
            <div class="mt-6 text-center">
              <router-link to="/hobbies" class="text-nuclear-glow hover:text-white transition-colors">
                Discover More →
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Interactive Simulations Section -->
    <section class="py-20 bg-dark-bg border-t border-nuclear-blue/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-4">
            Interactive <span class="text-nuclear-glow">Simulations</span>
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto font-light">
            Bringing theoretical and mathematical physics to life directly in your browser.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <!-- Simulation 1: Nilsson Model -->
          <div class="bg-card-bg/60 backdrop-blur-sm p-8 rounded-2xl border border-nuclear-blue/20 hover:border-nuclear-glow/40 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_8px_30px_rgb(0,255,255,0.03)] group">
            <div>
              <div class="flex items-center justify-between mb-6">
                <span class="text-3xl">⚛️</span>
                <span class="px-3 py-1 bg-nuclear-blue/10 text-nuclear-glow text-xs font-semibold rounded-full border border-nuclear-blue/20 uppercase tracking-wider">Nuclear Physics</span>
              </div>
              <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-nuclear-glow transition-colors">
                Interactive Nilsson Model Solver
              </h3>
              <p class="text-gray-300 text-sm font-light leading-relaxed mb-6">
                Visualize single-particle energy levels in a deformed nuclear potential. This tool solves the Nilsson Hamiltonian in real-time, allowing users to adjust deformation parameters (&epsilon;, spin-orbit strength, and orbit-orbit coupling) to explore how nuclear shells split and form magic numbers.
              </p>
            </div>
            <div>
              <a href="https://hyperfi.github.io/Nilsson-Model-Interactive/" target="_blank" rel="noopener noreferrer" class="w-full inline-block text-center btn-outline-glow text-sm uppercase tracking-wider">
                Run Simulation
              </a>
            </div>
          </div>

          <!-- Simulation 2: TDSE -->
          <div class="bg-card-bg/60 backdrop-blur-sm p-8 rounded-2xl border border-nuclear-blue/20 hover:border-nuclear-glow/40 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_8px_30px_rgb(0,255,255,0.03)] group">
            <div>
              <div class="flex items-center justify-between mb-6">
                <span class="text-3xl">🌊</span>
                <span class="px-3 py-1 bg-nuclear-glow/10 text-nuclear-glow text-xs font-semibold rounded-full border border-nuclear-glow/20 uppercase tracking-wider">Quantum Mechanics</span>
              </div>
              <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-nuclear-glow transition-colors">
                1D Time-Dependent Schrödinger Solver
              </h3>
              <p class="text-gray-300 text-sm font-light leading-relaxed mb-6">
                Simulate quantum wave packet dynamics under arbitrary potentials. Watch wave functions propagate, tunnel through potential barriers, scatter, or remain bound, with full real-time control over physical parameters.
              </p>
            </div>
            <div>
              <a href="https://hyperfi.github.io/Time-Dependent-Schrodinger-Equation-1D/" target="_blank" rel="noopener noreferrer" class="w-full inline-block text-center btn-outline-glow text-sm uppercase tracking-wider">
                Run Simulation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote Section -->
    <section class="py-20 bg-card-bg">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <blockquote class="text-2xl md:text-3xl text-gray-300 italic leading-relaxed">
          <!-- TODO: Replace with your favorite physics quote or personal motto -->
          "The important thing is not to stop questioning. Curiosity has its own reason for existing."
        </blockquote>
        <cite class="block mt-6 text-nuclear-glow font-semibold">
          — Albert Einstein
        </cite>
      </div>
    </section>
  </div>
</template>

<script setup>
// Add any reactive data or methods here
</script>
