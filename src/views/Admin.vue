<template>
  <div class="min-h-screen py-20">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Auth Section -->
      <section class="mb-12">
        <div class="bg-card-bg p-8 rounded-xl border border-nuclear-blue/20">
          <h1 class="text-3xl font-bold text-white mb-6">Admin</h1>

          <div v-if="!session">
            <p class="text-gray-300 mb-6">Log in to create and manage blog posts.</p>
            <form @submit.prevent="handleLogin" class="space-y-4">
              <input
                v-model="email"
                type="email"
                placeholder="Email"
                class="w-full px-4 py-3 bg-dark-bg border border-nuclear-blue/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-nuclear-glow focus:ring-1 focus:ring-nuclear-glow"
                required
              />
              <input
                v-model="password"
                type="password"
                placeholder="Password"
                class="w-full px-4 py-3 bg-dark-bg border border-nuclear-blue/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-nuclear-glow focus:ring-1 focus:ring-nuclear-glow"
                required
              />
              <button type="submit" class="btn-glow" :disabled="loading">
                {{ loading ? 'Signing in...' : 'Sign In' }}
              </button>
              <p v-if="authError" class="text-red-400 mt-2 text-sm">{{ authError }}</p>
            </form>
          </div>

          <div v-else>
            <div class="flex items-center justify-between mb-6">
              <p class="text-gray-300">Signed in as <span class="text-nuclear-glow">{{ session.user.email }}</span></p>
              <button @click="handleLogout" class="px-4 py-2 border border-nuclear-glow text-nuclear-glow rounded-lg hover:bg-nuclear-glow hover:text-dark-bg transition">Logout</button>
            </div>
          </div>
        </div>
      </section>

      <!-- New Post Section -->
      <section v-if="session">
        <div class="bg-card-bg p-8 rounded-xl border border-nuclear-blue/20">
          <h2 class="text-2xl font-bold text-white mb-6">Create New Post</h2>
          <form @submit.prevent="handleCreatePost" class="space-y-4">
            <div>
              <label class="block text-sm text-gray-400 mb-1">Title</label>
              <input v-model="title" type="text" required class="w-full px-4 py-3 bg-dark-bg border border-nuclear-blue/30 rounded-lg text-white focus:outline-none focus:border-nuclear-glow focus:ring-1 focus:ring-nuclear-glow" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-1">Slug (auto-generated, you can edit)</label>
              <input v-model="slug" type="text" required class="w-full px-4 py-3 bg-dark-bg border border-nuclear-blue/30 rounded-lg text-white focus:outline-none focus:border-nuclear-glow focus:ring-1 focus:ring-nuclear-glow" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-1">Tags (comma separated)</label>
              <input v-model="tagsInput" type="text" placeholder="e.g. quantum,nuclear,computational" class="w-full px-4 py-3 bg-dark-bg border border-nuclear-blue/30 rounded-lg text-white focus:outline-none focus:border-nuclear-glow focus:ring-1 focus:ring-nuclear-glow" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-1">Content (Markdown supported)</label>
              <textarea v-model="content" rows="12" required class="w-full px-4 py-3 bg-dark-bg border border-nuclear-blue/30 rounded-lg text-white focus:outline-none focus:border-nuclear-glow focus:ring-1 focus:ring-nuclear-glow"></textarea>
            </div>

            <div class="flex items-center gap-4">
              <button type="submit" class="btn-glow" :disabled="creating">
                {{ creating ? 'Publishing...' : 'Publish Post' }}
              </button>
              <span v-if="createMessage" class="text-sm" :class="createSuccess ? 'text-nuclear-glow' : 'text-red-400'">{{ createMessage }}</span>
            </div>
          </form>

          <!-- Live Markdown Preview -->
          <div class="mt-10">
            <h3 class="text-xl font-bold text-white mb-4">Preview</h3>
            <div class="prose prose-invert max-w-none" v-html="renderedHtml"></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'
import { supabase } from '../lib/supabase'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const session = ref(null)
const email = ref('')
const password = ref('')
const loading = ref(false)
const authError = ref('')

const title = ref('')
const slug = ref('')
const tagsInput = ref('')
const content = ref('')
const creating = ref(false)
const createMessage = ref('')
const createSuccess = ref(false)

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

// Auto-generate slug from title
watchEffect(() => {
  if (title.value && !slug.value) {
    slug.value = slugify(title.value)
  }
})

const renderedHtml = computed(() => {
  const html = marked.parse(content.value || '')
  return DOMPurify.sanitize(html)
})

const handleLogin = async () => {
  loading.value = true
  authError.value = ''
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  loading.value = false
  if (error) {
    authError.value = error.message
  } else {
    session.value = data.session
  }
}

const handleLogout = async () => {
  await supabase.auth.signOut()
  session.value = null
}

const handleCreatePost = async () => {
  creating.value = true
  createMessage.value = ''
  createSuccess.value = false
  
  const tags = tagsInput.value
    ? tagsInput.value.split(',').map(t => t.trim()).filter(Boolean)
    : []

  const { error } = await supabase.from('posts').insert({
    title: title.value,
    slug: slug.value,
    content: content.value,
    tags,
    author_id: session.value?.user?.id || null,
  })

  creating.value = false
  if (error) {
    createMessage.value = error.message
    createSuccess.value = false
  } else {
    createMessage.value = 'Post published successfully!'
    createSuccess.value = true
    // Reset form
    title.value = ''
    slug.value = ''
    tagsInput.value = ''
    content.value = ''
  }
}

onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  session.value = data.session
  supabase.auth.onAuthStateChange((_event, newSession) => {
    session.value = newSession
  })
})
</script>

