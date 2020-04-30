
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/reclamos/Index.vue'),
        meta: {
          breadcrumb: [
            { name: 'Reclamos' }
          ]
        }
      },
      {
        path: '/comunas',
        component: () => import('pages/tablasbasicas/comunas.vue'),
        meta: {
          breadcrumb: [
            { name: 'Tablas Básicas' },
            { name: 'Comunas', link: 'comunas' }
          ]
        }
      },
      {
        path: '/altaReclamo',
        component: () => import('pages/Reclamos/altaReclamo.vue'),
        meta: {
          breadcrumb: [
            { name: 'Reclamos' },
            { name: 'Alta de reclamo', link: 'altaReclamo' }
          ]
        }
      }
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
