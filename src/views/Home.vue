<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center justify-center relative overflow-hidden">
      <!-- Animated background elements (Physical hard-sphere simulation on Canvas) -->
      <canvas ref="simulationCanvas" class="absolute inset-0 w-full h-full pointer-events-none opacity-70 dark:opacity-45"></canvas>

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
              <div class="w-full h-full rounded-full profile-avatar-frost overflow-hidden">
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
import { ref, onMounted, onBeforeUnmount } from 'vue';

const simulationCanvas = ref(null);
let animationId = null;
let width = 0;
let height = 0;
let balls = [];
let initialEnergy = 0;
let frameCount = 0;

const getDelta = (a, b, w, h) => {
  let dx = b.x - a.x;
  let dy = b.y - a.y;
  
  if (dx > w / 2) dx -= w;
  else if (dx < -w / 2) dx += w;
  
  if (dy > h / 2) dy -= h;
  else if (dy < -h / 2) dy += h;
  
  return { dx, dy };
};

const getKineticEnergy = () => {
  let energy = 0;
  for (const ball of balls) {
    energy += 0.5 * ball.mass * (ball.vx * ball.vx + ball.vy * ball.vy);
  }
  return energy;
};

const scaleEnergy = () => {
  const currentEnergy = getKineticEnergy();
  if (currentEnergy > 0 && initialEnergy > 0) {
    const scale = Math.sqrt(initialEnergy / currentEnergy);
    for (const ball of balls) {
      ball.vx *= scale;
      ball.vy *= scale;
    }
  }
};

const handleResize = () => {
  const canvas = simulationCanvas.value;
  if (!canvas) return;
  const oldWidth = width;
  const oldHeight = height;
  
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = width;
  canvas.height = height;
  
  if (oldWidth > 0 && oldHeight > 0) {
    balls.forEach(ball => {
      ball.x = (ball.x / oldWidth) * width;
      ball.y = (ball.y / oldHeight) * height;
    });
  }
};

onMounted(() => {
  const canvas = simulationCanvas.value;
  if (!canvas) return;
  
  // Set dimensions
  width = canvas.clientWidth;
  height = canvas.clientHeight;
  canvas.width = width;
  canvas.height = height;
  
  // Create 6 balls with sizes 25-55 and mass proportional to area
  const numBalls = 6;
  const minRadius = 25;
  const maxRadius = 55;
  
  for (let i = 0; i < numBalls; i++) {
    const radius = minRadius + Math.random() * (maxRadius - minRadius);
    const mass = radius * radius;
    let x, y, overlap;
    let attempts = 0;
    
    do {
      x = Math.random() * width;
      y = Math.random() * height;
      overlap = false;
      attempts++;
      
      for (const other of balls) {
        const { dx, dy } = getDelta({ x, y }, other, width, height);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < (radius + other.radius + 15)) {
          overlap = true;
          break;
        }
      }
    } while (overlap && attempts < 100);
    
    // Initial random velocity (low to moderate speed for a relaxing and elegant backdrop)
    const speed = 0.6 + Math.random() * 0.8;
    const angle = Math.random() * Math.PI * 2;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    
    balls.push({
      x,
      y,
      vx,
      vy,
      radius,
      mass,
      colorType: i % 2 === 0 ? 'cyan' : 'blue'
    });
  }
  
  initialEnergy = getKineticEnergy();
  
  window.addEventListener('resize', handleResize);
  
  const ctx = canvas.getContext('2d');
  
  const tick = () => {
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // 1. Move balls and wrap
    for (const ball of balls) {
      ball.x += ball.vx;
      ball.y += ball.vy;
      
      ball.x = (ball.x % width + width) % width;
      ball.y = (ball.y % height + height) % height;
    }
    
    // 2. Handle collisions
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const ballA = balls[i];
        const ballB = balls[j];
        
        const { dx, dy } = getDelta(ballA, ballB, width, height);
        const distSq = dx * dx + dy * dy;
        const minDist = ballA.radius + ballB.radius;
        
        if (distSq < minDist * minDist) {
          const dist = Math.sqrt(distSq);
          const nx = dist > 0 ? dx / dist : 1;
          const ny = dist > 0 ? dy / dist : 0;
          
          // Resolve overlap
          const overlap = minDist - dist;
          const totalInvMass = (1 / ballA.mass) + (1 / ballB.mass);
          
          const corrX = (overlap / totalInvMass) * nx;
          const corrY = (overlap / totalInvMass) * ny;
          
          ballA.x -= (1 / ballA.mass) * corrX;
          ballA.y -= (1 / ballA.mass) * corrY;
          
          ballB.x += (1 / ballB.mass) * corrX;
          ballB.y += (1 / ballB.mass) * corrY;
          
          // Re-wrap
          ballA.x = (ballA.x % width + width) % width;
          ballA.y = (ballA.y % height + height) % height;
          
          ballB.x = (ballB.x % width + width) % width;
          ballB.y = (ballB.y % height + height) % height;
          
          // Velocities relative along normal
          const rvx = ballB.vx - ballA.vx;
          const rvy = ballB.vy - ballA.vy;
          const velAlongNormal = rvx * nx + rvy * ny;
          
          if (velAlongNormal < 0) {
            const impulse = -(2 * velAlongNormal) / totalInvMass;
            
            ballA.vx -= (1 / ballA.mass) * impulse * nx;
            ballA.vy -= (1 / ballA.mass) * impulse * ny;
            
            ballB.vx += (1 / ballB.mass) * impulse * nx;
            ballB.vy += (1 / ballB.mass) * impulse * ny;
          }
        }
      }
    }
    
    // 3. Rescale energy thermostat every 120 frames to counteract floating point drift
    frameCount++;
    if (frameCount % 120 === 0) {
      scaleEnergy();
    }
    
    // 4. Render
    for (const ball of balls) {
      // Periodic image rendering for seamless wrapping
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const px = ball.x + dx * width;
          const py = ball.y + dy * height;
          
          if (px + ball.radius >= 0 && px - ball.radius <= width &&
              py + ball.radius >= 0 && py - ball.radius <= height) {
            
            const isDark = document.documentElement.classList.contains('dark');
            const grad = ctx.createRadialGradient(px, py, 0, px, py, ball.radius);
            if (isDark) {
              if (ball.colorType === 'cyan') {
                grad.addColorStop(0, 'rgba(6, 182, 212, 0.45)');
                grad.addColorStop(0.3, 'rgba(6, 182, 212, 0.18)');
                grad.addColorStop(1, 'rgba(6, 182, 212, 0)');
              } else {
                grad.addColorStop(0, 'rgba(59, 130, 246, 0.45)');
                grad.addColorStop(0.3, 'rgba(59, 130, 246, 0.18)');
                grad.addColorStop(1, 'rgba(59, 130, 246, 0)');
              }
            } else {
              // Light mode: use darker, higher contrast, and more saturated colors
              if (ball.colorType === 'cyan') {
                grad.addColorStop(0, 'rgba(3, 105, 120, 0.65)'); // deeper cyan-700
                grad.addColorStop(0.3, 'rgba(3, 105, 120, 0.3)');
                grad.addColorStop(1, 'rgba(3, 105, 120, 0)');
              } else {
                grad.addColorStop(0, 'rgba(29, 78, 216, 0.65)'); // deeper blue-700
                grad.addColorStop(0.3, 'rgba(29, 78, 216, 0.3)');
                grad.addColorStop(1, 'rgba(29, 78, 216, 0)');
              }
            }
            
            ctx.beginPath();
            ctx.arc(px, py, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(px, py, 3.5, 0, Math.PI * 2);
            if (isDark) {
              ctx.fillStyle = ball.colorType === 'cyan' ? '#06b6d4' : '#3b82f6';
            } else {
              ctx.fillStyle = ball.colorType === 'cyan' ? '#0891b2' : '#1d4ed8'; // cyan-600 / blue-700
            }
            ctx.fill();
          }
        }
      }
    }
    
    animationId = requestAnimationFrame(tick);
  };
  
  tick();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
});
</script>
