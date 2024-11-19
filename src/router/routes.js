
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    name : 'Home'
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
