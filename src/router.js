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
      name: 'ordenesCompraProveedores',
      path: '/ordenes-compra-proveedores',
      component: OrdenesCompraProveedores,
    },
  ],
});
