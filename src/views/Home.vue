<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center justify-center relative overflow-hidden">
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-20 left-20 w-32 h-32 border border-nuclear-glow/20 rounded-full animate-pulse"></div>
        <div class="absolute top-40 right-32 w-24 h-24 border border-nuclear-blue/30 rounded-full animate-float"></div>
        <div class="absolute bottom-32 left-1/4 w-20 h-20 border border-nuclear-glow/10 rounded-full animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-28 h-28 border border-nuclear-blue/20 rounded-full animate-float"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div class="space-y-8">
          <!-- Profile Image Placeholder -->
          <div class="flex justify-center">
            <div class="w-32 h-32 rounded-full bg-gradient-to-r from-nuclear-blue to-nuclear-glow p-1 animate-pulse-glow">
              <div class="w-full h-full rounded-full bg-card-bg flex items-center justify-center">
                <!-- TODO: Replace with your actual photo -->
                <span class="text-4xl">👨‍🔬</span>
              </div>
            </div>
          </div>

          <!-- Main Heading -->
          <div class="space-y-4">
            <h1 class="text-5xl md:text-7xl font-bold">
              <span class="text-white">Dr.</span>
              <span class="glow-text animate-pulse">Your Name</span>
            </h1>
            <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Nuclear Physicist & Quantum Researcher
            </p>
            <p class="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              <!-- TODO: Customize this description -->
              Investigating the fundamental properties of atomic nuclei and their interactions, 
              pushing the boundaries of our understanding of matter and energy at the quantum level.
            </p>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <router-link to="/research" class="btn-glow">
              Explore My Research
            </router-link>
            <router-link to="/hobbies" class="px-6 py-3 border border-nuclear-glow text-nuclear-glow hover:bg-nuclear-glow hover:text-dark-bg transition-all duration-300 rounded-lg">
              Discover My Hobbies
            </router-link>
          </div>

          <!-- Scroll Indicator -->
          <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg class="w-6 h-6 text-nuclear-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
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
              25+ peer-reviewed papers in top-tier physics journals
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
