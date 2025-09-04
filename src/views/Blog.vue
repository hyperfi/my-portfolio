<template>
  <div class="min-h-screen py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-white mb-6">
          Physics <span class="text-nuclear-glow">Blog</span>
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
            <article v-for="post in posts" :key="post.id" @click="openPost(post)" tabindex="0" @keydown.enter="openPost(post)" class="bg-card-bg p-8 rounded-xl border border-nuclear-blue/20 card-hover cursor-pointer">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h2 class="text-2xl font-bold text-white mb-2">{{ post.title }}</h2>
                  <div class="text-sm text-gray-400">
                    {{ formatDate(post.created_at) }}
                    <template v-if="post.tags && post.tags.length">
                      • <span v-for="(tag, i) in post.tags" :key="tag">{{ tag }}<span v-if="i < post.tags.length-1">, </span></span>
                    </template>
                  </div>
                </div>
                <div v-if="session" class="flex items-center gap-2">
                  <router-link @click.stop :to="`/admin/edit/${post.id}`" class="text-sm px-3 py-1 bg-nuclear-blue/20 rounded text-nuclear-glow">Edit</router-link>
                  <button @click.stop="promptDelete(post)" class="text-sm px-3 py-1 bg-red-600/80 rounded text-white">Delete</button>
                </div>
              </div>

              <div class="prose prose-invert max-w-none">
                <div v-html="render(excerpt(post.content))"></div>
                <div class="mt-4">
                  <router-link :to="`/blog/${post.id}`" class="text-nuclear-glow hover:underline">Read full post →</router-link>
                </div>
              </div>
            </article>
          </div>
          <div class="text-center mt-6">
            <button v-if="!allLoaded" @click="loadMore" :disabled="loading" class="btn-glow">
              {{ loading ? 'Loading...' : 'Load more' }}
            </button>
            <div v-else class="text-sm text-gray-400 mt-2">No more posts.</div>
          </div>
        </div>
      </section>

      <!-- Delete confirmation modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/50" aria-hidden="true"></div>
        <div class="relative bg-card-bg p-6 rounded-lg border border-nuclear-blue/30 max-w-lg mx-4">
          <h3 class="text-xl font-bold text-white mb-2">Confirm delete</h3>
          <p class="text-sm text-gray-300 mb-4">Are you sure you want to delete "<span class="font-semibold text-white">{{ deleteTarget?.title }}</span>"? This action cannot be undone.</p>
          <p v-if="deleteErrorMessage" class="text-sm text-red-400 mb-2">{{ deleteErrorMessage }}</p>
          <div class="flex justify-end gap-3">
            <button @click="cancelDelete" class="px-4 py-2 border rounded text-gray-300">Cancel</button>
            <button @click="confirmDelete" :disabled="isDeleting" class="btn-glow">{{ isDeleting ? 'Deleting...' : 'Delete forever' }}</button>
          </div>
        </div>
      </div>

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
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/auth'
import { renderMarkdownToSafeHtml } from '../lib/markdown'

// Auth state (shared)
const { session } = useAuth()
const router = useRouter()

// Blog posts state
const posts = ref([])
const loading = ref(true)
const pageSize = ref(5)
const page = ref(0)
const allLoaded = ref(false)

// Delete modal state
const showDeleteModal = ref(false)
const deleteTarget = ref(null)
const isDeleting = ref(false)
const deleteErrorMessage = ref('')

const render = (md) => renderMarkdownToSafeHtml(md || '')
const formatDate = (iso) => new Date(iso).toLocaleDateString()

const excerpt = (md, length = 300) => {
  if (!md) return ''
  // strip markdown to plain text then truncate
  const html = renderMarkdownToSafeHtml(md)
  const div = document.createElement('div')
  div.innerHTML = html
  const text = div.textContent || div.innerText || ''
  return text.length > length ? text.slice(0, length).trim() + '…' : text
}

onMounted(async () => {
  page.value = 0
  allLoaded.value = false
  await fetchPosts(0, false)
})

const fetchPosts = async (p = 0, append = false) => {
  loading.value = true
  const start = p * pageSize.value
  const end = start + pageSize.value - 1
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .range(start, end)

  if (!error && data) {
    if (append) posts.value = posts.value.concat(data)
    else posts.value = data
    if (data.length < pageSize.value) allLoaded.value = true
  }
  loading.value = false
}

const loadMore = async () => {
  if (loading.value || allLoaded.value) return
  page.value += 1
  await fetchPosts(page.value, true)
}

const openPost = (post) => {
  // navigate to post detail
  if (!post || !post.id) return
  router.push({ name: 'PostDetail', params: { id: post.id } })
}


const promptDelete = (post) => {
  if (!session.value) {
    deleteErrorMessage.value = 'Please log in to delete posts.'
    showDeleteModal.value = false
    return
  }
  deleteTarget.value = post
  deleteErrorMessage.value = ''
  showDeleteModal.value = true
}

const cancelDelete = () => {
  deleteTarget.value = null
  deleteErrorMessage.value = ''
  showDeleteModal.value = false
}

const confirmDelete = async () => {
  if (!deleteTarget.value) return
  if (!session.value) {
    deleteErrorMessage.value = 'Please log in to delete posts.'
    return
  }
  isDeleting.value = true
  deleteErrorMessage.value = ''

  const post = deleteTarget.value
  const original = [...posts.value]
  posts.value = posts.value.filter(p => p.id !== post.id)

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', post.id)

  if (error) {
    posts.value = original
    deleteErrorMessage.value = error.message || 'Failed to delete.'
    isDeleting.value = false
  } else {
    // success
    isDeleting.value = false
    showDeleteModal.value = false
    deleteTarget.value = null
  }
}

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
