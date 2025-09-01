<template>
  <div class="min-h-screen py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-white mb-6">
          Physics <span class="glow-text">Blog</span>
        </h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Thoughts, insights, and discoveries from the world of nuclear physics
        </p>
      </div>

      <!-- Posts List -->
      <section class="mb-16">
        <div v-if="loading" class="text-center text-gray-400">Loading posts...</div>
        <div v-else>
          <div v-if="posts.length === 0" class="text-center text-gray-400">
            No posts yet. Log in via the Admin page to publish your first article.
          </div>
          <div v-else class="space-y-8">
            <article v-for="post in posts" :key="post.id" class="bg-card-bg p-8 rounded-xl border border-nuclear-blue/20 card-hover">
              <h2 class="text-2xl font-bold text-white mb-2">{{ post.title }}</h2>
              <div class="text-sm text-gray-400 mb-4">
                {{ formatDate(post.created_at) }}
                <template v-if="post.tags && post.tags.length">
                  • <span v-for="(tag, i) in post.tags" :key="tag">{{ tag }}<span v-if="i < post.tags.length-1">, </span></span>
                </template>
              </div>
              <div class="prose prose-invert max-w-none" v-html="render(post.content)"></div>
            </article>
          </div>
        </div>
      </section>

      <!-- Newsletter Signup -->
      <div class="bg-gradient-to-r from-nuclear-blue/10 to-nuclear-glow/10 p-8 rounded-xl border border-nuclear-blue/30">
        <div class="text-center">
          <h3 class="text-2xl font-bold text-white mb-4">Stay Updated</h3>
          <p class="text-gray-300 mb-6">
            Be the first to know when I publish new articles and research insights!
          </p>
          
          <!-- Newsletter Form -->
          <form @submit.prevent="handleSubscribe" class="max-w-md mx-auto">
            <div class="flex gap-3">
              <input 
                v-model="email"
                type="email" 
                placeholder="Enter your email"
                required
                class="flex-1 px-4 py-3 bg-card-bg border border-nuclear-blue/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-nuclear-glow focus:ring-1 focus:ring-nuclear-glow"
              >
              <button 
                type="submit"
                :disabled="isSubscribing"
                class="btn-glow whitespace-nowrap"
                :class="{ 'opacity-50 cursor-not-allowed': isSubscribing }"
              >
                {{ isSubscribing ? 'Subscribing...' : 'Subscribe' }}
              </button>
            </div>
            <p v-if="subscribeMessage" class="mt-3 text-sm" :class="subscribeSuccess ? 'text-nuclear-glow' : 'text-red-400'">
              {{ subscribeMessage }}
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// Blog posts state
const posts = ref([])
const loading = ref(true)

const render = (md) => DOMPurify.sanitize(marked.parse(md || ''))
const formatDate = (iso) => new Date(iso).toLocaleDateString()

onMounted(async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (!error && data) posts.value = data
  loading.value = false
})

// Newsletter subscription state (demo only)
const email = ref('')
const isSubscribing = ref(false)
const subscribeMessage = ref('')
const subscribeSuccess = ref(false)

const handleSubscribe = async () => {
  if (!email.value) return
  isSubscribing.value = true
  subscribeMessage.value = ''
  setTimeout(() => {
    subscribeSuccess.value = true
    subscribeMessage.value = 'Thanks for subscribing!'
    email.value = ''
    isSubscribing.value = false
    setTimeout(() => (subscribeMessage.value = ''), 5000)
  }, 1200)
}
</script>
