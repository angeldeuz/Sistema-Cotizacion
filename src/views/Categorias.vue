<template lang="pug">
#Categorias
 h1 Categorías
 listado-categorias
</template>

<script>
import ListadoCategorias from '@/components/categorias/listadoCategorias.vue';

export default {
  name: 'Categorias',
  components: { ListadoCategorias },
};
</script>

<style lang="scss" scoped>

</style>
