<template>
  <div class="publication-authors">
    <p><template v-for="(author, index) in summary" :key="`${author}-${index}`"><span :class="{ 'author-highlight': /\bAbhishek\b/.test(author) }">{{ author }}</span>{{ index < summary.length - 1 ? ', ' : '' }}</template><span v-if="isLong"> and collaborators</span></p>
    <details v-if="isLong">
      <summary>Full author list ({{ names.length }})</summary>
      <p><template v-for="(author, index) in names" :key="`${author}-${index}`"><span :class="{ 'author-highlight': /\bAbhishek\b/.test(author) }">{{ author }}</span>{{ index < names.length - 1 ? ', ' : '' }}</template></p>
    </details>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ authors: { type: String, default: '' } })
const names = computed(() => props.authors.split(/\s+and\s+|,\s*/).map((name) => name.trim().replace(/^and\s+/, '')).filter(Boolean))
const isLong = computed(() => names.value.length > 5)
const summary = computed(() => {
  if (!isLong.value) return names.value
  const first = names.value.slice(0, 2)
  const owner = names.value.find((name) => /\bAbhishek\b/.test(name))
  return owner && !first.includes(owner) ? [...first, owner] : first
})
</script>
