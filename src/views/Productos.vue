<template lang="pug">
#Productos
  h1 Productos
  listado-productos
</template>

<script>
import ListadoProductos from '@/components/productos/listadoProductos.vue';

export default {
  name: 'Productos',
  components: { ListadoProductos },
};
</script>

<style lang="scss" scoped>

</style>
