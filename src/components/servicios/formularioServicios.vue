<template lang="pug">
#FormularioServicios
  v-container(grid-list-md)
    v-form(ref="form")
      v-layout(wrap)
        v-flex(xs12)
          v-text-field(label='Nombre Servicio: ' v-model='nombre')
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FormularioServicios',
  computed: {
    ...mapState(['Servicio']),
    nombre: {
      get() { return this.Servicio.nombre; },
      set(nombre) { this.$store.commit('set_servicio_new', { nombre }); },
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
