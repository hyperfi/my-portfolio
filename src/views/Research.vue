<template>
  <div class="min-h-screen py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-white mb-6">
          My <span class="text-nuclear-glow">Research</span>
        </h1>
        <p class="text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
          My research tackles core problems in nuclear many‑body physics using complementary classical and
          quantum techniques. On the classical side, I develop microscopic descriptions of collective
          excitations (giant dipole/monopole resonances) with linear‑response theory and TDHF (Sky3D),
          benchmarked against RPA and experimental data. On the quantum side, I designed a first‑of‑its‑kind
          algorithm for nuclear linear response that maps fermionic operators to qubits (Jordan–Wigner),
          prepares time‑dependent states, and employs the SWAP test—achieving O(N) scaling and excellent
          agreement with data on  <sup>120</sup>Sn and <sup>208</sup>Pb, with careful NISQ noise studies and mitigation.
        </p>
      </div>

      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-bold text-nuclear-glow mb-0 text-center">Research Areas</h2>
        <div class="ml-4">
          <template v-if="isAdmin">
            <button v-if="!editMode" @click="enterEdit" class="px-3 py-2 rounded bg-nuclear-blue text-white">Edit</button>
            <div v-else class="space-x-2">
              <button @click="saveEdits" :disabled="saving" class="px-3 py-2 rounded bg-nuclear-glow text-white">Save</button>
              <button @click="cancelEdits" class="px-3 py-2 rounded border">Cancel</button>
            </div>
          </template>
        </div>
      </div>
      <!-- Research Areas -->
      <section class="mb-20">
        <h2 class="sr-only">Research Areas</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- TODO: Customize these research areas based on your actual work -->
          <div v-for="(area, idx) in (editMode ? areasEdit : researchAreas)" :key="(area.title || idx) + idx" class="bg-card-bg p-6 rounded-xl border border-nuclear-blue/20 card-hover relative">
            <template v-if="!editMode">
              <div class="text-3xl mb-4">{{ area.icon }}</div>
              <h3 class="text-xl font-bold text-white mb-3">{{ area.title }}</h3>
              <p class="text-gray-300 text-sm leading-relaxed">{{ area.description }}</p>
            </template>
            <template v-else>
              <div class="flex items-start gap-4">
                <input v-model="areasEdit[idx].icon" class="w-12 h-12 text-center rounded bg-transparent border" />
                <div class="flex-1">
                  <input v-model="areasEdit[idx].title" placeholder="Title" class="w-full mb-2 p-2 rounded bg-transparent border" />
                  <textarea v-model="areasEdit[idx].description" rows="3" placeholder="Description" class="w-full p-2 rounded bg-transparent border"></textarea>
                </div>
              </div>
              <button @click="deleteArea(idx)" class="absolute top-3 right-3 text-sm text-red-400">Delete</button>
            </template>
          </div>
        </div>
      </section>

      <!-- Publications -->
      <section class="mb-20">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-3xl font-bold text-nuclear-glow mb-0 text-center">Publications</h2>
          <div class="flex items-center gap-3">
            <template v-if="isAdmin && editMode">
              <button @click="addJournal" class="px-3 py-2 rounded border">Add Journal</button>
              <button @click="addConference" class="px-3 py-2 rounded border">Add Conference</button>
              <button @click="savePublications" :disabled="savingPubs" class="px-3 py-2 rounded bg-nuclear-glow text-black">{{ savingPubs ? 'Saving…' : 'Save Pubs' }}</button>
              <button @click="revertPublications" class="px-3 py-2 rounded border">Revert Pubs</button>
            </template>
          </div>
        </div>
        <div class="space-y-12">
          <!-- Journal Articles -->
          <div>
            <h3 class="text-2xl font-semibold text-white mb-6 text-center">Journal Articles ({{ (editMode ? journalEdit.length : journalArticles.length) }})</h3>
            <div class="space-y-6">
              <div v-for="(paper, idx) in (editMode ? journalEdit : journalArticles)" :key="'j-' + idx" class="bg-card-bg p-6 rounded-xl border border-nuclear-blue/20 card-hover relative">
                <template v-if="!editMode">
                  <div class="flex flex-col md:flex-row md:items-start gap-4">
                    <div class="flex-1">
                      <h4 class="text-lg font-bold text-white mb-2" v-html="paper.title || paper.raw"></h4>
                      <p class="text-nuclear-glow text-sm mb-2" v-if="paper.journal || paper.year">
                        {{ [paper.journal, paper.year].filter(Boolean).join(' • ') }}
                      </p>
                    </div>
                    <div class="flex-shrink-0" v-if="paper.url">
                      <a :href="paper.url" target="_blank" rel="noopener" class="btn-glow text-sm">Read Paper</a>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input v-model="journalEdit[idx].title" placeholder="Title" class="col-span-2 p-2 rounded bg-transparent border" />
                    <input v-model="journalEdit[idx].journal" placeholder="Journal" class="p-2 rounded bg-transparent border" />
                    <input v-model="journalEdit[idx].year" placeholder="Year" class="p-2 rounded bg-transparent border" />
                    <input v-model="journalEdit[idx].url" placeholder="URL" class="col-span-3 p-2 rounded bg-transparent border" />
                    <textarea v-model="journalEdit[idx].raw" rows="2" placeholder="Raw citation" class="col-span-3 p-2 rounded bg-transparent border"></textarea>
                  </div>
                  <button @click="deleteJournal(idx)" class="absolute top-3 right-3 text-sm text-red-400">Delete</button>
                </template>
              </div>
            </div>
          </div>

          <!-- Conference Proceedings -->
          <div>
            <h3 class="text-2xl font-semibold text-white mb-6 text-center">Conference Proceedings ({{ (editMode ? confEdit.length : conferenceProceedings.length) }})</h3>
            <div class="space-y-6">
              <div v-for="(paper, idx) in (editMode ? confEdit : conferenceProceedings)" :key="'c-' + idx" class="bg-card-bg p-6 rounded-xl border border-nuclear-blue/20 card-hover relative">
                <template v-if="!editMode">
                  <div class="flex flex-col md:flex-row md:items-start gap-4">
                    <div class="flex-1">
                      <h4 class="text-lg font-bold text-white mb-2" v-html="paper.title || paper.raw"></h4>
                      <p class="text-nuclear-glow text-sm mb-2" v-if="paper.journal || paper.year">
                        {{ [paper.journal, paper.year].filter(Boolean).join(' • ') }}
                      </p>
                    </div>
                    <div class="flex-shrink-0" v-if="paper.url">
                      <a :href="paper.url" target="_blank" rel="noopener" class="btn-glow text-sm">Read Paper</a>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input v-model="confEdit[idx].title" placeholder="Title" class="col-span-2 p-2 rounded bg-transparent border" />
                    <input v-model="confEdit[idx].journal" placeholder="Venue" class="p-2 rounded bg-transparent border" />
                    <input v-model="confEdit[idx].year" placeholder="Year" class="p-2 rounded bg-transparent border" />
                    <input v-model="confEdit[idx].url" placeholder="URL" class="col-span-3 p-2 rounded bg-transparent border" />
                    <textarea v-model="confEdit[idx].raw" rows="2" placeholder="Raw citation" class="col-span-3 p-2 rounded bg-transparent border"></textarea>
                  </div>
                  <button @click="deleteConference(idx)" class="absolute top-3 right-3 text-sm text-red-400">Delete</button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Current Projects -->
      <section class="mb-20">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-3xl font-bold text-nuclear-glow mb-0 text-center">Current Projects</h2>
          <div>
            <template v-if="isAdmin && editMode">
              <button @click="addProject" class="px-3 py-2 rounded border">Add Project</button>
            </template>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- TODO: Replace with your actual current projects -->
          <div v-for="(project, pidx) in (editMode ? projectsEdit : currentProjects)" :key="(project.title || pidx) + pidx" class="bg-card-bg p-6 rounded-xl border border-nuclear-blue/20 card-hover relative">
            <template v-if="!editMode">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-gradient-to-r from-nuclear-blue to-nuclear-glow rounded-lg flex items-center justify-center flex-shrink-0">
                  <span class="text-xl">{{ project.icon }}</span>
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-white mb-3">{{ project.title }}</h3>
                  <p class="text-gray-300 text-sm leading-relaxed mb-4">{{ project.description }}</p>
                  <div class="text-nuclear-glow text-sm">Status: {{ project.status }}</div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="flex items-start gap-4">
                <input v-model="projectsEdit[pidx].icon" class="w-12 h-12 text-center rounded bg-transparent border" />
                <div class="flex-1">
                  <input v-model="projectsEdit[pidx].title" placeholder="Title" class="w-full mb-2 p-2 rounded bg-transparent border" />
                  <textarea v-model="projectsEdit[pidx].description" rows="3" placeholder="Description" class="w-full p-2 rounded bg-transparent border"></textarea>
                  <input v-model="projectsEdit[pidx].status" placeholder="Status" class="w-full mt-2 p-2 rounded bg-transparent border" />
                </div>
              </div>
              <button @click="deleteProject(pidx)" class="absolute top-3 right-3 text-sm text-red-400">Delete</button>
            </template>
          </div>
        </div>
      </section>

      <!-- Collaboration -->
      <section class="text-center">
        <div class="bg-gradient-to-r from-nuclear-blue/10 to-nuclear-glow/10 p-12 rounded-2xl border border-nuclear-blue/30">
          <h2 class="text-3xl font-bold text-white mb-6">Interested in Collaboration?</h2>
          <p class="text-gray-300 mb-8 max-w-2xl mx-auto">
            I'm always open to discussing research opportunities, academic partnerships, 
            and innovative projects in nuclear physics and related fields.
          </p>
          <a href="mailto:abi00779@gmail.com" class="btn-glow">
            Get In Touch
          </a>
        </div>
      </section>
      <!-- Sticky action bar while editing -->
      <div v-if="editMode" class="fixed inset-x-0 bottom-4 flex justify-center pointer-events-none">
        <div class="bg-card-bg/90 backdrop-blur-md px-4 py-2 rounded-full border border-nuclear-blue/30 flex items-center gap-3 pointer-events-auto">
          <button @click="saveEdits" :disabled="saving" class="px-4 py-2 rounded bg-nuclear-glow text-black">{{ saving ? 'Saving…' : 'Save' }}</button>
          <button @click="cancelEdits" class="px-4 py-2 rounded border">Cancel</button>
          <span v-if="saving" class="ml-2 text-sm text-gray-300">Saving changes to database…</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import publications from '../data/publications.json'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/auth'

// Admin email - change to your admin account
const ADMIN_EMAIL = 'abi00779@gmail.com'

const { session, ready } = useAuth()

const isAdmin = computed(() => {
  return !!session.value && session.value.user?.email === ADMIN_EMAIL
})

// Edit mode state
const editMode = ref(false)
const saving = ref(false)
const savingPubs = ref(false)

// Local editable copies
const areasEdit = ref([])
const projectsEdit = ref([])

// Load / Save helpers
const STORAGE_KEY = 'research_page_local'

// Editable publication copies
const journalEdit = ref([])
const confEdit = ref([])

async function loadSaved() {
  // try Supabase site_data table first
  try {
    const { data, error } = await supabase.from('site_data').select('value').eq('key', 'research_page').single()
    if (!error && data && data.value) {
      const parsed = typeof data.value === 'string' ? JSON.parse(data.value) : data.value
      if (parsed?.researchAreas) researchAreas.value = parsed.researchAreas
    if (parsed?.currentProjects) currentProjects.value = parsed.currentProjects
    if (parsed?.journalArticles) journalArticles.value = parsed.journalArticles
    if (parsed?.conferenceProceedings) conferenceProceedings.value = parsed.conferenceProceedings
  // keep local fallback current
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed)) } catch (e) {}
      return
    }
  } catch (e) {
    // ignore and fallback to local
  }

  // fallback local JSON file + localStorage
  const local = localStorage.getItem(STORAGE_KEY)
  if (local) {
    try {
      const parsed = JSON.parse(local)
  if (parsed.researchAreas) researchAreas.value = parsed.researchAreas
  if (parsed.currentProjects) currentProjects.value = parsed.currentProjects
  if (parsed.journalArticles) journalArticles.value = parsed.journalArticles
  if (parsed.conferenceProceedings) conferenceProceedings.value = parsed.conferenceProceedings
      return
    } catch (e) {}
  }

  // default: use bundled publications+defaults already in file
  // ensure local fallback is seeded with the current (bundled) data
  try {
    const seed = {
      researchAreas: researchAreas.value,
      currentProjects: currentProjects.value,
      journalArticles: journalArticles.value,
      conferenceProceedings: conferenceProceedings.value
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
  } catch (e) {}
}

async function persistSaved(payload) {
  // attempt upsert into site_data
  try {
    const up = { key: 'research_page', value: JSON.stringify(payload) }
    const res = await supabase.from('site_data').upsert(up, { onConflict: 'key' })
    // prefer explicit error handling and console visibility for debugging
    if (res && res.error) {
      console.error('[supabase] upsert error:', res.error)
      return false
    }
    // success
    console.debug('[supabase] upsert ok', res.data)
  // mirror successful DB save to localStorage so fallback is current
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)) } catch (e) {}
    return true
  } catch (e) {
    console.error('[persistSaved] unexpected error', e)
  }
  // fallback to localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    return true
  } catch (e) {
    return false
  }
}

onMounted(() => {
  loadSaved()
})

// Research areas sourced from provided text
const researchAreas = ref([
  {
    icon: '🧮',
    title: 'Quantum Linear Response (GDR)',
    description: 'First‑of‑its‑kind quantum algorithm for nuclear linear response using Jordan–Wigner mapping, time‑dependent state prep, SWAP test, and O(N) scaling.'
  },
  {
    icon: '🧭',
    title: 'Microscopic GDR in Deformed Nuclei',
    description: 'Linear‑response theory with triaxial Woods–Saxon potential; wavelet analysis; improved fits vs macroscopic models for Nd/Sm isotopes.'
  },
  {
    icon: '🌀',
    title: 'TDHF / Sky3D',
    description: 'Development of Sky3D v1.2 for external multipole boosts and strength functions; benchmarking vs RPA and applications to collectivity studies.'
  },
  {
    icon: '⚙️',
    title: 'RPA & Density Functionals',
    description: 'Random Phase Approximation and Skyrme energy‑density functionals for nuclear structure and dynamics.'
  },
  {
    icon: '🔗',
    title: 'Hybrid Quantum‑Classical',
    description: 'Combining quantum algorithms with classical microscopic models to push precision and scalability.'
  }
])

// Publications data from generated JSON
const journalArticles = ref((publications && publications.journal_articles) ? publications.journal_articles : [])
const conferenceProceedings = ref((publications && publications.conference_proceedings) ? publications.conference_proceedings : [])
// Current projects and directions
const currentProjects = ref([
  {
    icon: '🧮',
    title: 'Refining Quantum Linear‑Response Algorithms',
    description: 'Extend to broader multipoles and open‑shell systems; optimize circuits; systematic NISQ noise mitigation.',
    status: 'Active'
  },
  {
    icon: '🔗',
    title: 'Hybrid Quantum‑Classical Frameworks',
    description: 'Bridge TDHF/DFT with quantum subroutines to accelerate many‑body response calculations.',
    status: 'Design Phase'
  },
  {
    icon: '🌀',
    title: 'Sky3D Enhancements',
    description: 'New external fields, improved strength‑function analysis, and validation against RPA/experiment.',
    status: 'Development'
  },
  {
    icon: '📊',
    title: 'Deformation & Fine‑Structure Systematics',
    description: 'Microscopic studies of GDR/ISM in deformed nuclei with wavelet analysis and comparisons to data.',
    status: 'In Progress'
  }
])

// --- Admin edit actions ---

function enterEdit() {
  editMode.value = true
  areasEdit.value = JSON.parse(JSON.stringify(researchAreas.value))
  projectsEdit.value = JSON.parse(JSON.stringify(currentProjects.value))
  journalEdit.value = JSON.parse(JSON.stringify(journalArticles.value))
  confEdit.value = JSON.parse(JSON.stringify(conferenceProceedings.value))
}

function cancelEdits() {
  editMode.value = false
  areasEdit.value = []
  projectsEdit.value = []
  journalEdit.value = []
  confEdit.value = []
}

function addProject() {
  projectsEdit.value.unshift({ icon: '📌', title: 'New Project', description: '', status: 'Proposed' })
}

function addJournal() {
  journalEdit.value.unshift({ title: 'New Article', journal: '', year: '', url: '', raw: '' })
}

function deleteJournal(idx) {
  journalEdit.value.splice(idx, 1)
}

function addConference() {
  confEdit.value.unshift({ title: 'New Proceeding', journal: '', year: '', url: '', raw: '' })
}

function deleteConference(idx) {
  confEdit.value.splice(idx, 1)
}

function deleteProject(idx) {
  projectsEdit.value.splice(idx, 1)
}

function deleteArea(idx) {
  areasEdit.value.splice(idx, 1)
}

async function saveEdits() {
  saving.value = true
  const payload = {
    researchAreas: areasEdit.value,
    currentProjects: projectsEdit.value
  }
  // include publications when present
  if (journalEdit.value) payload.journalArticles = journalEdit.value
  if (confEdit.value) payload.conferenceProceedings = confEdit.value
  const ok = await persistSaved(payload)
  if (ok) {
    // apply edits
    researchAreas.value = JSON.parse(JSON.stringify(areasEdit.value))
    currentProjects.value = JSON.parse(JSON.stringify(projectsEdit.value))
  // apply publications as well
  if (journalEdit.value) journalArticles.value = JSON.parse(JSON.stringify(journalEdit.value))
  if (confEdit.value) conferenceProceedings.value = JSON.parse(JSON.stringify(confEdit.value))
    editMode.value = false
    areasEdit.value = []
    projectsEdit.value = []
  journalEdit.value = []
  confEdit.value = []
  } else {
    alert('Failed to save changes. Check console or network.')
  }
  saving.value = false
}

async function savePublications() {
  if (!isAdmin.value) return
  savingPubs.value = true
  // merge current edits and existing site payload to avoid clobbering other fields
  const payload = {
    researchAreas: researchAreas.value,
    currentProjects: currentProjects.value,
    journalArticles: journalEdit.value,
    conferenceProceedings: confEdit.value
  }
  const ok = await persistSaved(payload)
  if (ok) {
    // apply to reactive lists but keep edit mode open
    journalArticles.value = JSON.parse(JSON.stringify(journalEdit.value))
    conferenceProceedings.value = JSON.parse(JSON.stringify(confEdit.value))
  } else {
    alert('Failed to save publications. Check console or network.')
  }
  savingPubs.value = false
}

function revertPublications() {
  // discard publication edits and reload from current reactive state
  journalEdit.value = JSON.parse(JSON.stringify(journalArticles.value))
  confEdit.value = JSON.parse(JSON.stringify(conferenceProceedings.value))
}

</script>
