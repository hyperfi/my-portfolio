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
              <textarea 
                ref="contentTextarea"
                v-model="content" 
                rows="12" 
                required 
                class="w-full px-4 py-3 bg-dark-bg border border-nuclear-blue/30 rounded-lg text-white focus:outline-none focus:border-nuclear-glow focus:ring-1 focus:ring-nuclear-glow"></textarea>

              <!-- Media helpers -->
              <div class="mt-4 space-y-3">
                <div class="text-sm text-gray-400">Embed images and videos via upload or URL. Images use Markdown; videos use HTML or YouTube/Vimeo iframes.</div>

                <div class="flex flex-wrap items-center gap-3">
                  <label class="px-3 py-2 border border-nuclear-blue/40 rounded text-gray-200 cursor-pointer hover:border-nuclear-glow">
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" class="hidden" @change="onPickImage" :disabled="mediaUploading || !storageAvailable" />
                  </label>
                  <label class="px-3 py-2 border border-nuclear-blue/40 rounded text-gray-200 cursor-pointer hover:border-nuclear-glow">
                    <span>Upload Video</span>
                    <input type="file" accept="video/*" class="hidden" @change="onPickVideo" :disabled="mediaUploading || !storageAvailable" />
                  </label>
                  <span v-if="!storageAvailable" class="text-xs text-yellow-400">Supabase storage not configured. Use URL-based embeds.</span>
                </div>

                <div class="flex flex-wrap items-center gap-3">
                  <input v-model="imageUrl" placeholder="Image URL (https://...)" class="flex-1 min-w-[260px] px-3 py-2 bg-dark-bg border border-nuclear-blue/30 rounded text-white placeholder-gray-400 focus:outline-none focus:border-nuclear-glow" />
                  <button type="button" @click="insertImageByUrl" class="px-3 py-2 border border-nuclear-glow text-nuclear-glow rounded hover:bg-nuclear-glow hover:text-dark-bg">Insert Image</button>
                </div>
                <div class="flex flex-wrap items-center gap-3">
                  <input v-model="videoUrl" placeholder="YouTube/Vimeo/MP4 URL" class="flex-1 min-w-[260px] px-3 py-2 bg-dark-bg border border-nuclear-blue/30 rounded text-white placeholder-gray-400 focus:outline-none focus:border-nuclear-glow" />
                  <button type="button" @click="insertVideoByUrl" class="px-3 py-2 border border-nuclear-glow text-nuclear-glow rounded hover:bg-nuclear-glow hover:text-dark-bg">Insert Video</button>
                </div>

                <p v-if="mediaMessage" class="text-sm" :class="mediaError ? 'text-red-400' : 'text-nuclear-glow'">
                  {{ mediaMessage }}
                </p>
              </div>
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
import { sanitizeHTML } from '../lib/sanitize'

const session = ref(null)
const email = ref('')
const password = ref('')
const loading = ref(false)
const authError = ref('')

const title = ref('')
const slug = ref('')
const tagsInput = ref('')
const content = ref('')
const contentTextarea = ref(null)
const creating = ref(false)
const createMessage = ref('')
const createSuccess = ref(false)

// Media helpers state
const mediaUploading = ref(false)
const mediaMessage = ref('')
const mediaError = ref(false)
const imageUrl = ref('')
const videoUrl = ref('')

const MEDIA_BUCKET = 'media'
const storageAvailable = computed(() => !!supabase.storage)

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
  return sanitizeHTML(html)
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

// Insert text at cursor in content textarea
const insertAtCursor = (snippet) => {
  const el = contentTextarea.value
  if (!el) {
    content.value += snippet
    return
  }
  const start = el.selectionStart || 0
  const end = el.selectionEnd || 0
  const before = content.value.slice(0, start)
  const after = content.value.slice(end)
  content.value = `${before}${snippet}${after}`
  // restore cursor after inserted snippet
  requestAnimationFrame(() => {
    const pos = start + snippet.length
    el.setSelectionRange(pos, pos)
    el.focus()
  })
}

const onPickImage = async (e) => {
  const file = e.target.files?.[0]
  e.target.value = '' // reset so selecting the same file again still triggers change
  if (!file) return
  await uploadFile(file, 'image')
}

const onPickVideo = async (e) => {
  const file = e.target.files?.[0]
  e.target.value = ''
  if (!file) return
  await uploadFile(file, 'video')
}

const uploadFile = async (file, kind) => {
  if (!storageAvailable.value) {
    mediaMessage.value = 'Storage not configured. Use URL-based embeds instead.'
    mediaError.value = true
    return
  }
  mediaUploading.value = true
  mediaMessage.value = ''
  mediaError.value = false
  try {
    const owner = session.value?.user?.id || 'anon'
    const safeName = slugify(file.name).replace(/\.+$/, '')
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    const path = `${owner}/${Date.now()}-${safeName}.${ext}`

    const { error: upErr } = await supabase.storage
      .from(MEDIA_BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false })
    if (upErr) throw upErr

    const { data: pub } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path)
    const url = pub?.publicUrl
    if (!url) throw new Error('Failed to retrieve public URL')

    if (kind === 'image') {
      insertAtCursor(`\n![${safeName}](${url})\n`)
      mediaMessage.value = 'Image uploaded and inserted.'
    } else {
      insertAtCursor(`\n<video controls src="${url}"></video>\n`)
      mediaMessage.value = 'Video uploaded and inserted.'
    }
    mediaError.value = false
  } catch (err) {
    mediaMessage.value = err?.message || 'Upload failed.'
    mediaError.value = true
  } finally {
    mediaUploading.value = false
  }
}

const insertImageByUrl = () => {
  if (!imageUrl.value) return
  insertAtCursor(`\n![image](${imageUrl.value})\n`)
  imageUrl.value = ''
}

const insertVideoByUrl = () => {
  if (!videoUrl.value) return
  const url = videoUrl.value.trim()
  let snippet = ''
  const yt = toYouTubeEmbed(url)
  const vm = toVimeoEmbed(url)
  if (yt) {
    snippet = `\n<iframe width="560" height="315" src="${yt}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n`
  } else if (vm) {
    snippet = `\n<iframe src="${vm}" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>\n`
  } else if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) {
    snippet = `\n<video controls src="${url}"></video>\n`
  } else {
    mediaMessage.value = 'Unsupported video URL. Provide YouTube/Vimeo link or a direct MP4/WebM/Ogg file.'
    mediaError.value = true
    return
  }
  insertAtCursor(snippet)
  mediaMessage.value = 'Video embed inserted.'
  mediaError.value = false
  videoUrl.value = ''
}

const toYouTubeEmbed = (url) => {
  try {
    const u = new URL(url)
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1)
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
  } catch {}
  return null
}

const toVimeoEmbed = (url) => {
  try {
    const u = new URL(url)
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean).pop()
      return id ? `https://player.vimeo.com/video/${id}` : null
    }
  } catch {}
  return null
}

onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  session.value = data.session
  supabase.auth.onAuthStateChange((_event, newSession) => {
    session.value = newSession
  })
})
</script>
