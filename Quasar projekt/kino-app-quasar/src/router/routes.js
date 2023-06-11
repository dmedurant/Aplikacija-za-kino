
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/log', component: () => import('pages/LoginPage.vue') },
      { path: '/red', component: () => import('pages/PrikazRedatelja.vue'),  },
      { path: '/redUnos', component: () => import('pages/UnosRedatelja.vue') },
      { path: '/filmUnos', component: () => import('pages/UnosFilm.vue') },
      { path: '/filmPrikaz', component: () => import('pages/FilmoviPrikaz.vue'), meta: {requiresAuth: true}},
      { path: '/korPrikaz', component: () => import('pages/PrikazKorisnika.vue') },
      { path: '/korUnos', component: () => import('pages/UnosKorisnika.vue') },
    ]
  },

  {
    path: "/",
    component: () => import("layouts/BlankLayout.vue")
  },
    {
    path: "/detalji",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {name: "detalji", path: ":id", component: () => import("pages/FilmPage.vue") },

    ],
  },
  {
    path: "/rezervacija",
    component: () => import("layouts/BlankLayout.vue"),
    children: [
      {name: "rezervacija", path: ":id_filma/:id_prikaza", component: () => import("pages/RezervacijaPage.vue") },

    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
  
 
]

export default routes;
