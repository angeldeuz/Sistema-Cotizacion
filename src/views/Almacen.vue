<template lang="pug">
#Almacen
 h1 Almacen
 listado-productos
</template>

<script>
import ListadoProductos from '@/components/productos/listadoProductos.vue';

export default {
  name: 'Almacen',
  components: { ListadoProductos },
};
</script>

<style lang="scss" scoped>

</style>
