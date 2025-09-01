<template>
  <div class="min-h-screen py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="loading" class="text-center text-gray-400">Loading post...</div>
      <div v-else-if="post">
        <div class="mb-6">
          <button @click="goBack" class="text-sm px-3 py-2 bg-card-bg border rounded text-gray-200 hover:bg-card-bg/80">← Back to posts</button>
        </div>
        <h1 class="text-4xl font-bold text-white mb-4">{{ post.title }}</h1>
        <div class="text-sm text-gray-400 mb-6">{{ formatDate(post.created_at) }}</div>
        <div class="flex gap-3 mb-6">
          <button @click="shareNative" class="px-3 py-2 bg-card-bg border rounded text-gray-200">Share</button>
          <a :href="twitterShareUrl" target="_blank" rel="noopener noreferrer" class="px-3 py-2 bg-card-bg border rounded text-blue-400">Twitter</a>
          <a :href="linkedInShareUrl" target="_blank" rel="noopener noreferrer" class="px-3 py-2 bg-card-bg border rounded text-blue-600">LinkedIn</a>
          <button @click="copyLink" class="px-3 py-2 bg-card-bg border rounded text-gray-200">Copy link</button>
          <span v-if="copied" class="text-sm text-nuclear-glow ml-2">Link copied!</span>
        </div>
        <div class="prose prose-invert max-w-none" v-html="render(post.content)"></div>
      </div>
      <div v-else class="text-center text-gray-400">Post not found.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import { renderMarkdownToSafeHtml } from '../lib/markdown'

const route = useRoute()
const router = useRouter()

const post = ref(null)
const loading = ref(true)

const render = (md) => renderMarkdownToSafeHtml(md || '')
const formatDate = (iso) => new Date(iso).toLocaleDateString()

const twitterShareUrl = ref('')
const linkedInShareUrl = ref('')
const copied = ref(false)

const setMeta = (post) => {
  document.title = post.title + ' — Nuclear Physicist'
  // basic OG tags
  const url = window.location.href
  const setTag = (prop, content) => {
    let el = document.querySelector(`meta[property="${prop}"]`) || document.querySelector(`meta[name="${prop}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('property', prop)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }
  setTag('og:title', post.title)
  setTag('og:description', (post.content || '').slice(0, 160))
  setTag('og:url', url)
  twitterShareUrl.value = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`
  linkedInShareUrl.value = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => (copied.value = false), 2500)
  } catch (e) {
    // ignore
  }
}

const shareNative = async () => {
  if (navigator.share && post.value) {
    try {
      await navigator.share({ title: post.value.title, text: post.value.content?.slice(0, 200), url: window.location.href })
    } catch (e) {
      // user cancelled or not available
    }
  } else {
    // fallback: copy link
    await copyLink()
  }
}

const goBack = () => {
  // prefer browser history, fallback to blog list
  try {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push({ name: 'Blog' })
    }
  } catch (e) {
    router.push({ name: 'Blog' })
  }
}

onMounted(async () => {
  const id = route.params.id
  if (!id) {
    loading.value = false
    return
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    // fallback: redirect to blog list
    router.push({ name: 'Blog' })
  } else {
    post.value = data
  setMeta(data)
  }
  loading.value = false
})
</script>
