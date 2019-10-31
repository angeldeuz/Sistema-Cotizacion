import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import Proyectos from './views/Proyectos.vue';
import CrearProyeto from './components/proyectos/crear.vue';
import Clientes from './views/Clientes.vue';
import Productos from './views/Productos.vue';
import Servicios from './views/Servicios.vue';
import Categorias from './views/Categorias.vue';
import OrdenesCompraProveedores from './views/OrdenesCompraProveedores.vue';

import Usuarios from './views/Usuarios.vue';
import Empleados from './views/Empleados.vue';
import Proveedores from './views/Proveedores';
import Plantillas from './views/Plantillas';
import Login from './views/Login';

import store from './store'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard,
    },
    {
      path: '/proyectos',
      name: 'proyectos',
      component: Proyectos,
    },
    {
      name: 'CrearProyecto',
      path: '/proyectos/crear',
      component: CrearProyeto,
    },
    {
      name: 'clientes',
      path: '/clientes',
      component: Clientes,
    },
    {
      name: 'productos',
      path: '/productos',
      component: Productos,
    },
    {
      name: 'servicios',
      path: '/servicios',
      component: Servicios,
    },
    {
      name: 'categorias',
      path: '/categorias',
      component: Categorias,
    },
    {
      name: 'usuarios',
      path: '/usuarios',
      component: Usuarios,
    },
    {
      name: 'empleados',
      path: '/empleados',
      component: Empleados,
    },
    {
      name: 'proveedores',
      path: '/proveedores',
      component: Proveedores,
    },
    {
      name: 'plantillas',
      path: '/plantillas',
      component: Plantillas,
    },
    {
      name: 'login',
      path: '/login',
      component: Login,
    },
    {
      name: 'ordenesCompraProveedores',
      path: '/ordenes-compra-proveedores',
      component: OrdenesCompraProveedores,
    },
  ],
})

// router.beforeEach((to, from, next)=>{
//   if (to.matched.some(record => record.meta.libre)){
//     next()
//   }else if (store.state.usuario && store.state.usuario.rol == 'Administrador'){
//     if(to.matched.some(record => record.meta.administrador)){
//       next()
//     }
//   }else if (store.state.usuario && store.state.usuario.rol == 'Almacenero'){
//     if(to.matched.some(record => record.meta.almacenero)){
//       next()
//     }
//   }
//   else if (store.state.usuario && store.state.usuario.rol == 'Vendedor'){
//     if(to.matched.some(record => record.meta.vendedor)){
//       next()
//     }
//   }else{
//     next({
//       name: 'login'
//     })
//   }
// })

// export default router
