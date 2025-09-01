<template>
  <div class="min-h-screen py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="loading" class="text-center text-gray-400">Loading post...</div>
      <div v-else-if="post">
        <h1 class="text-4xl font-bold text-white mb-4">{{ post.title }}</h1>
        <div class="text-sm text-gray-400 mb-6">{{ formatDate(post.created_at) }}</div>
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
  }
  loading.value = false
})
</script>
