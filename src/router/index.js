import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import pageMeta from '../data/page-meta.json'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/research',
    name: 'Research',
    component: () => import('../views/Research.vue')
  },
  {
    path: '/hobbies',
    name: 'Hobbies',
    component: () => import('../views/Hobbies.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, top: 96, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }
    return savedPosition || { top: 0 }
  }
})

router.afterEach((to) => {
  const meta = pageMeta[to.path] || pageMeta['/']
  document.title = meta.title
  const canonical = `https://www.dr-abhishek.com${to.path}`
  document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title)
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description)
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical)
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical)
})

export default router
