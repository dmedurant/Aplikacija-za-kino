import LoginPage from 'src/pages/LoginPage';
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/log', component: () => import('pages/LoginPage.vue') },
      { path: '/red', component: () => import('pages/PrikazRedatelja.vue'),  },
      { path: '/sign', component: () => import('pages/SignUp.vue'),  },
      { path: '/filmPrikaz', component: () => import('pages/FilmoviPrikaz.vue')},
      { path: '/rezervacije', component: () => import('pages/RezervacijaPrikaz.vue')},
      //{ path: '/red', component: () => import('pages/PrikazRedatelja.vue'), meta: {requiresAuth: true} },         
      //{ path: '/redUnos', component: () => import('pages/UnosRedatelja.vue') },
      //{ path: '/filmUnos', component: () => import('pages/UnosFilm.vue') },      
      //{ path: '/korPrikaz', component: () => import('pages/PrikazKorisnika.vue') },
      //{ path: '/korUnos', component: () => import('pages/UnosKorisnika.vue') },
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
