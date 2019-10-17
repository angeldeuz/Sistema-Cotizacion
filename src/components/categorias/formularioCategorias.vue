<template lang="pug">
#FormularioCategorias
  v-container(grid-list-md)
    v-form(ref="form")
      v-layout(wrap)
        v-flex(xs12)
          v-text-field(label='Nombre Categoria: ' v-model='nombre')
        v-flex
           combo-box-servicios
</template>

<script>
import ComboBoxServicios from '@/components/servicios/comboBoxServicios.vue';
import { mapState } from 'vuex';

export default {
  name: 'FormularioCategorias',
  components: { ComboBoxServicios },
  computed: {
    ...mapState(['Categoria']),
    nombre: {
      get() { return this.Categoria.nombre; },
      set(nombre) { this.$store.commit('set_categoria_new', { nombre }); },
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
