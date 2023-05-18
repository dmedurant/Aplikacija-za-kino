
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/log', component: () => import('pages/LoginPage.vue') },
      { path: '/red', component: () => import('pages/PrikazRedatelja.vue') },
      { path: '/redUnos', component: () => import('pages/UnosRedatelja.vue') }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
