<template lang="pug">
#menu
  v-navigation-drawer(v-model="drawer" hide-overlay app :mini-variant="mini" dark enable-resize-watcher)
    v-list.pa-1
      v-list-tile(avatar tag="div" )
        v-list-tile-avatar
          img(src="/parnet_logo.png")
        v-list-tile-content
          v-list-tile-title PARNET
    v-list.pt-0(dense)
      v-divider(light)
      template(v-for="item in items" )
       template(v-if="!item.subitems")
        v-list-tile(:key="item.title" :to="item.path" active-class="indigo darken-1")
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ item.title }}
       v-list-group(:prepend-icon="item.icon" v-if="item.subitems" )
        template(v-slot:activator)
         v-list-tile(:key="item.title")
          v-list-tile-title {{ item.title }}
        v-list-tile(v-for="subitem in item.subitems" :key="subitem.title" :to="subitem.path" active-class="indigo darken-1")
          v-list-tile-action
           v-icon {{ subitem.icon }}
          v-list-tile-content
           v-list-tile-title {{ subitem.title}}
  v-toolbar(fixed app :clipped-left="clipped")
    v-toolbar-side-icon(@click.stop="mini = !mini")
    v-toolbar-title Sistema Cotización
    v-spacer
    v-toolbar-items.hidden-sm-and-down
      v-btn(flat) Cerrar Sesión
</template>

<script>
export default {
  menu: 'Menu',
  data: () => ({
    drawer: true,
    mini: true,
    right: null,
    clipped: false,
    items: [
      {
        title: 'Dashboard', icon: 'fas fa-tachometer-alt', action: '', path: '/',
      },
      {
        title: 'Proyectos', icon: 'fas fa-project-diagram', action: '', path: '/proyectos',
      },
      {
        title: 'OCP', icon: 'fas fa-shopping-cart', action: '', path: '/ordenes-compra-proveedores',
      },
      {
        title: 'Clientes', icon: 'fas fa-user-tie', action: '', path: '/clientes',
      },
      {
        title: 'Provedores', icon: 'fas fa-users-cog', action: '', path: '/proveedores',
      },
      {
        title: 'Almacen',
        icon: 'fas fa-warehouse',
        subitems: [
          {
            title: 'Productos', action: '', path: '/productos', icon: 'fas fa-box-open',
          },
          {
            title: 'Servicios', action: '', path: '/servicios', icon: 'fas fa-hand-holding',
          },
          {
            title: 'Categorias', action: '', path: '/categorias', icon: 'fas fa-boxes',
          },
        ],
      },
      {
        title: 'Usuarios', icon: 'fas fa-user-friends', action: '', path: '/usuarios',
      },
      {
        title: 'Empleados', icon: 'fas fa-people-carry', action: '', path: '/empleados',
      },
    ],
  }),
};
</script>}

<style lang="scss">


</style>
