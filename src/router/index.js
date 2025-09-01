import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Research from '../views/Research.vue'
import Hobbies from '../views/Hobbies.vue'
import Blog from '../views/Blog.vue'
import Admin from '../views/Admin.vue'
import EditPost from '../views/EditPost.vue'
import PostDetail from '../views/PostDetail.vue'
import { supabase } from '../lib/supabase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/research',
    name: 'Research',
    component: Research
  },
  {
    path: '/hobbies',
    name: 'Hobbies',
    component: Hobbies
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/blog/:id',
    name: 'PostDetail',
    component: PostDetail
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/admin/edit/:id',
    name: 'EditPost',
    component: EditPost
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Protect edit route: require authenticated session
router.beforeEach(async (to, _from, next) => {
  if (to.name === 'EditPost') {
    try {
      const { data } = await supabase.auth.getSession()
      if (!data?.session) {
        return next({ name: 'Admin' })
      }
    } catch (e) {
      return next({ name: 'Admin' })
    }
  }
  return next()
})

export default router
