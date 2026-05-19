import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import BrowseView from '@/views/BrowseView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import StayDetailView from '@/views/StayDetailView.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'browse',
    component: BrowseView,
  },
  {
    path: '/verblijven/:stayId',
    name: 'stay-detail',
    component: StayDetailView,
  },
  {
    path: '/favorieten',
    name: 'favorites',
    component: FavoritesView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
