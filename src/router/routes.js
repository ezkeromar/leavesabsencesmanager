
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '/login', component: () => import('pages/Index.vue'), name: 'login' },
      { path: '/logout', component: () => import('pages/logout.vue'), name: 'logout' },
      { path: '/modules/', component: () => import('pages/chooseModule.vue'), name: 'modules', meta: { requiresAuth: true } },
      { path: '/', component: () => import('pages/Index.vue'), name: 'logintow' }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/dashboard.vue'),
    children: [
      // conge
      { path: '/admin/', component: () => import('pages/homeDashboard.vue'), name: 'admin', meta: { requiresAuth: true } },
      { path: '/admin/redirect/:id', component: () => import('pages/redirect.vue'), name: 'redirect', meta: { requiresAuth: true } },
      { path: '/admin/conge/create', component: () => import('pages/conge/create.vue'), name: 'createConge', meta: { requiresAuth: true } },
      { path: '/admin/conge/list', component: () => import('pages/conge/list.vue'), name: 'listConge', meta: { requiresAuth: true } },
      { path: '/admin/conge/listEquipe', component: () => import('pages/conge/listEquipe.vue'), name: 'listCongeTeam', meta: { requiresAuth: true } },
      { path: '/admin/conge/payment', component: () => import('pages/conge/pay.vue'), name: 'payConge', meta: { requiresAuth: true } },
      { path: '/admin/conge/historique', component: () => import('pages/conge/history.vue'), name: 'historyConge', meta: { requiresAuth: true } },
      { path: '/admin/conge/administration/holiday', component: () => import('pages/conge/holidays.vue'), name: 'holidays', meta: { requiresAuth: true } },
      { path: '/admin/conge/administration/blockUnblockUser', component: () => import('pages/conge/blockUnblock.vue'), name: 'blockUnblock', meta: { requiresAuth: true } },
      { path: '/admin/conge/abondonee', component: () => import('pages/conge/expiredDemandes.vue'), name: 'chartExemple', meta: { requiresAuth: true } },
      { path: '/admin/conge/chart-exemple', component: () => import('pages/chartExemple.vue'), name: 'expiredDemandes', meta: { requiresAuth: true } },
      { path: '/admin/conge/previous/create', component: () => import('pages/conge/congeAnterieure.vue'), name: 'congeAnterieure', meta: { requiresAuth: true } },
      { path: '/admin/conge/help', component: () => import('pages/help.vue'), name: 'congeHelp', meta: { requiresAuth: true } },
      // absence
      {
        path: '/admin/absence/create',
        component: () => import('pages/absence/create.vue'),
        name: 'absenceCreation',
        meta: { requiresAuth: true },
        children: [
          { path: '/admin/absence/create/absence-not-paid/:isadmin?', component: () => import('pages/absence/notpaidcreate.vue'), name: 'absenceNotPaidCreation', meta: { requiresAuth: true } },
          { path: '/admin/absence/create/legal-family-absence/:isadmin?', component: () => import('pages/absence/legalFamilyAbsence.vue'), name: 'legalFamilyAbsenceCreation', meta: { requiresAuth: true } },
          { path: '/admin/absence/create/sickness/:isadmin?', component: () => import('pages/absence/sickness.vue'), name: 'sicknessCreattion', meta: { requiresAuth: true } },
          { path: '/admin/absence/create/work-accident/:isadmin?', component: () => import('pages/absence/workAccident.vue'), name: 'workAccidentCreation', meta: { requiresAuth: true } },
          { path: '/admin/absence/create/maternity/:isadmin?', component: () => import('pages/absence/maternity.vue'), name: 'maternityCreation', meta: { requiresAuth: true } }
        ]
      },
      { path: '/admin/absence/list', component: () => import('pages/absence/listeabsence.vue'), name: 'listeAbsence', meta: { requiresAuth: true } },
      { path: '/admin/absence/listEquipe', component: () => import('pages/absence/listeabsenceequipe.vue'), name: 'listeAbsenceequipe', meta: { requiresAuth: true } },
      { path: '/admin/absence/traitement', component: () => import('pages/absence/listeabsencecc.vue'), name: 'listeAbsencecc', meta: { requiresAuth: true } }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
