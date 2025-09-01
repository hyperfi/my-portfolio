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
          <a :href="whatsAppShareUrl" target="_blank" rel="noopener noreferrer" class="px-3 py-2 bg-card-bg border rounded text-green-400">WhatsApp</a>
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
const whatsAppShareUrl = ref('')
const copied = ref(false)

const setMeta = (post) => {
  document.title = post.title + ' — Nuclear Physicist'
  const url = window.location.href

  // helper to upsert meta tags (supports property and name)
  const upsertMeta = (key, value, asProperty = true) => {
    if (!value) return
    let sel = asProperty ? `meta[property="${key}"]` : `meta[name="${key}"]`
    let el = document.head.querySelector(sel)
    if (!el) {
      el = document.createElement('meta')
      if (asProperty) el.setAttribute('property', key)
      else el.setAttribute('name', key)
      document.head.appendChild(el)
    }
    el.setAttribute('content', value)
  }


  // generate a short plain-text description from available sources with fallbacks
  let description = ''
  // prefer explicit excerpt field if available
  if (post.excerpt && post.excerpt.trim()) {
    description = post.excerpt.trim().slice(0, 200)
  } else {
    try {
      const tmp = document.createElement('div')
      tmp.innerHTML = renderMarkdownToSafeHtml(post.content || '')
      description = (tmp.textContent || tmp.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 200)
    } catch (e) {
      description = (post.content || '').slice(0, 200)
    }
  }
  // final fallback: use title if still empty
  if (!description || !description.trim()) {
    description = `${post.title} — ${siteName}`
  }

  const siteName = 'Nuclear Physicist'
  const image = (post.cover_image && post.cover_image.startsWith('http')) ? post.cover_image : `${window.location.origin}/images/Abhishek.png`

  upsertMeta('description', description, false)
  upsertMeta('og:title', post.title)
  upsertMeta('og:description', description)
  upsertMeta('og:url', url)
  upsertMeta('og:image', image)
  upsertMeta('og:type', 'article')
  upsertMeta('og:site_name', siteName)
  if (post.created_at) upsertMeta('article:published_time', new Date(post.created_at).toISOString())

  // Twitter card
  upsertMeta('twitter:card', 'summary_large_image', false)
  upsertMeta('twitter:title', post.title, false)
  upsertMeta('twitter:description', description, false)
  upsertMeta('twitter:image', image, false)

  // canonical link
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)

  // share URLs
  twitterShareUrl.value = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(url)}`
  linkedInShareUrl.value = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  whatsAppShareUrl.value = `https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + url)}`
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
