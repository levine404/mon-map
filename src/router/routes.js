
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'list', component: () => import('pages/List.vue') },
      { path: 'details/:id', component: () => import('pages/Details.vue') },
      { path: 'edit', component: () => import('pages/Edit.vue') },
      { path: 'edit/:id', component: () => import('pages/Edit.vue') }
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
