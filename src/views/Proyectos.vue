<template lang="pug">
#proyectos
  h1 Proyectos
  listado-proyectos
</template>

<script>
import ListadoProyectos from '@/components/proyectos/listadoProyectos.vue';

export default {
  el: 'Proyectos',
  components: { ListadoProyectos },
};
</script>

<style lang="scss" scoped>
</style>
